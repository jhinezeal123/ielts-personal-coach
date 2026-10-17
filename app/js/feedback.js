/* Feedback channel (SPEC §12) — sends "Góp ý cho nhà phát triển" to a Telegram bot.
 * Config comes from app/feedback-config.js (window.IELTS_FEEDBACK); missing/empty = not configured.
 * Form-encoded POST (no custom headers) → CORS simple request, no preflight from file://.
 * Draft + last-sent time live in their own localStorage keys (not in state, not in backups).
 */
(function () {
  "use strict";
  var I = window.IELTS = window.IELTS || {};
  var W = window;

  var API = "https://api.telegram.org/bot";
  var LIMIT = 4096;           // Telegram sendMessage text limit
  var COOLDOWN_MS = 30000;    // at most one successful send per 30 s
  var TIMEOUT_MS = 15000;
  var LS_LAST = "ielts-coach-feedback-last";
  var LS_DRAFT = "ielts-coach-feedback-draft";
  var TYPES = [
    { id: "bug", label: "Lỗi" },
    { id: "feature", label: "Góp ý tính năng" },
    { id: "content", label: "Nội dung sai" },
    { id: "other", label: "Khác" }
  ];

  /* Icons used by the feedback page/card, added to core's shared map (IELTS.ICONS) without editing core.js. */
  var EXTRA_ICONS = {
    "message-square": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    "send": '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'
  };
  if (I.ICONS) Object.keys(EXTRA_ICONS).forEach(function (k) { if (!I.ICONS[k]) I.ICONS[k] = EXTRA_ICONS[k]; });

  var mem = {};   // fallback when localStorage is unavailable
  function lsGet(k) {
    try { var s = W.localStorage; if (s) return s.getItem(k); } catch (e) { /* ignore */ }
    return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null;
  }
  function lsSet(k, v) {
    mem[k] = v;
    try { var s = W.localStorage; if (s) { if (v == null) s.removeItem(k); else s.setItem(k, v); } } catch (e) { /* ignore */ }
    if (v == null) delete mem[k];
  }

  /* Read at call time so a late/changed config is picked up. */
  function config() {
    var c = W.IELTS_FEEDBACK;
    if (!c || typeof c !== "object") return null;
    var token = String(c.telegramBotToken == null ? "" : c.telegramBotToken).trim();
    var chat = String(c.telegramChatId == null ? "" : c.telegramChatId).trim();
    return token && chat ? { token: token, chat: chat } : null;
  }
  function configured() { return !!config(); }

  function typeLabel(id) {
    for (var i = 0; i < TYPES.length; i++) if (TYPES[i].id === id) return TYPES[i].label;
    return "Khác";
  }

  /* Last non-feedback route, so the report says where the problem was. */
  var lastRoute = "";
  function hashOf(r) {
    try { return I._buildHash ? I._buildHash(r.id, r.params) : "#/" + r.id; } catch (e) { return "#/" + r.id; }
  }
  if (typeof I.on === "function") {
    I.on("route", function (r) { if (r && r.id && r.id !== "feedback") lastRoute = hashOf(r); });
  }

  function techInfo() {
    var loc = "";
    try { loc = String((W.location && W.location.hash) || ""); } catch (e) { /* ignore */ }
    var when = "";
    try { when = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }); } catch (e) { when = new Date().toISOString(); }
    var scr = "";
    try { if (W.screen) scr = W.screen.width + "×" + W.screen.height; } catch (e) { /* ignore */ }
    try { if (W.innerWidth) scr += (scr ? " · cửa sổ " : "cửa sổ ") + W.innerWidth + "×" + W.innerHeight; } catch (e) { /* ignore */ }
    var ua = "";
    try { ua = String((W.navigator && W.navigator.userAgent) || ""); } catch (e) { /* ignore */ }
    return [
      "— Thông tin kỹ thuật —",
      "Phiên bản: v" + String(W.IELTS_VERSION || "?"),
      "Trang: " + (loc || "—") + (lastRoute && lastRoute !== loc ? " (trước đó: " + lastRoute + ")" : ""),
      "Thời gian: " + when + " (giờ VN)",
      "Màn hình: " + (scr || "—"),
      "Trình duyệt: " + (ua || "—").slice(0, 400)
    ].join("\n");
  }

  /* Plain text (no parse_mode → nothing to escape). The user message is cut so the total stays ≤ 4096. */
  function buildText(f) {
    f = f || {};
    var head = "📝 IELTS Coach — Góp ý\nLoại: " + typeLabel(f.type) + "\n\n";
    var contact = String(f.contact == null ? "" : f.contact).trim().slice(0, 200);
    var tail = (contact ? "\n\nLiên hệ: " + contact : "") + (f.includeInfo ? "\n\n" + techInfo() : "");
    var msg = String(f.message == null ? "" : f.message).trim();
    var room = LIMIT - head.length - tail.length;
    var cut = "… (đã cắt bớt)";
    if (msg.length > room) msg = msg.slice(0, Math.max(0, room - cut.length)) + cut;
    var text = head + msg + tail;
    return text.length > LIMIT ? text.slice(0, LIMIT) : text;
  }

  function lastSent() { var n = Number(lsGet(LS_LAST)); return isFinite(n) ? n : 0; }
  /* Seconds left before another send is allowed (0 = allowed). */
  function cooldownLeft() {
    var left = COOLDOWN_MS - (Date.now() - lastSent());
    return left > 0 && left <= COOLDOWN_MS ? Math.ceil(left / 1000) : 0;
  }

  function fail(code, message) { var e = new Error(message); e.code = code; return e; }

  /* send({type, message, contact, includeInfo}) → Promise<{ok:true, messageId}>; rejects with Error(.code, Vietnamese .message). */
  function send(f) {
    var cfg = config();
    if (!cfg) return Promise.reject(fail("not-configured", "Kênh góp ý chưa được cấu hình."));
    var msg = String((f && f.message) || "").trim();
    if (msg.length < 10) return Promise.reject(fail("too-short", "Nội dung góp ý cần ít nhất 10 ký tự."));
    var wait = cooldownLeft();
    if (wait) return Promise.reject(fail("rate-limit", "Bạn vừa gửi một góp ý. Đợi " + wait + " giây rồi gửi tiếp nhé."));
    if (typeof W.fetch !== "function") return Promise.reject(fail("no-fetch", "Trình duyệt này không hỗ trợ gửi góp ý. Hãy dùng Chrome hoặc Edge mới nhất."));
    if (W.navigator && W.navigator.onLine === false) return Promise.reject(fail("offline", "Máy đang mất mạng. Kết nối Internet rồi thử lại."));

    var body = new W.URLSearchParams();
    body.set("chat_id", cfg.chat);
    body.set("text", buildText(f));
    body.set("disable_web_page_preview", "true");

    var ctrl = typeof W.AbortController === "function" ? new W.AbortController() : null;
    var timedOut = false;
    var timer = setTimeout(function () { timedOut = true; if (ctrl) { try { ctrl.abort(); } catch (e) { /* ignore */ } } }, TIMEOUT_MS);
    var status = 0;

    return W.fetch(API + cfg.token + "/sendMessage", { method: "POST", body: body, cache: "no-store", signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) {
        status = r.status;
        return r.json().catch(function () { return null; });
      }, function () {
        throw fail(timedOut ? "timeout" : "network", timedOut
          ? "Quá thời gian chờ (15 giây) mà Telegram chưa phản hồi. Kiểm tra mạng rồi thử lại."
          : "Không kết nối được tới Telegram. Kiểm tra mạng (hoặc mạng có chặn Telegram) rồi thử lại.");
      })
      .then(function (json) {
        if (timedOut) throw fail("timeout", "Quá thời gian chờ (15 giây) mà Telegram chưa phản hồi. Kiểm tra mạng rồi thử lại.");
        if (!json || typeof json !== "object") throw fail("bad-response", "Telegram trả về phản hồi không hợp lệ (HTTP " + status + "). Thử lại sau ít phút.");
        if (json.ok !== true) {
          var d = String(json.description || ("HTTP " + status));
          throw fail("telegram", "Telegram từ chối tin nhắn: " + d + (status === 401 || status === 404 ? " — token trong feedback-config.js có thể sai hoặc đã bị thu hồi." : ""));
        }
        lsSet(LS_LAST, String(Date.now()));
        return { ok: true, messageId: json.result && json.result.message_id };
      })
      .then(function (res) { clearTimeout(timer); return res; }, function (err) { clearTimeout(timer); throw err; });
  }

  /* Unsent form draft (survives reload; cleared after a successful send). */
  function loadDraft() {
    try { var d = JSON.parse(lsGet(LS_DRAFT) || "null"); return d && typeof d === "object" ? d : null; } catch (e) { return null; }
  }
  function saveDraft(d) {
    var empty = !d || (!String(d.message || "").trim() && !String(d.contact || "").trim());
    try { lsSet(LS_DRAFT, empty ? null : JSON.stringify(d)); } catch (e) { /* ignore */ }
  }
  function clearDraft() { lsSet(LS_DRAFT, null); }

  I.feedback = {
    TYPES: TYPES, MIN_LENGTH: 10, COOLDOWN_MS: COOLDOWN_MS,
    configured: configured, send: send, buildText: buildText, typeLabel: typeLabel, cooldownLeft: cooldownLeft,
    loadDraft: loadDraft, saveDraft: saveDraft, clearDraft: clearDraft
  };
})();
