/* IELTS Coach — js/pages/reading.js (builder B)
 * Tabs: Passage lẻ | Full đề | Phân tích dạng bài  + "Bài đọc đề xuất hôm nay" card
 * Real CD-IELTS reading UI (split pane, highlighter, timer, navigator), results + "Lọc từ vựng".
 */
(function () {
  "use strict";
  var I = window.IELTS;
  if (!I || typeof I.registerPage !== "function") return;

  function X() { return I.exam; }
  function esc(s) { return typeof I.esc === "function" ? I.esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function ic(n, s) { try { return typeof I.icon === "function" ? I.icon(n, s || 18) : ""; } catch (e) { return ""; } }
  function api(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    try { return typeof I[name] === "function" ? I[name].apply(I, args) : undefined; }
    catch (e) { if (window.console) console.warn("[reading] " + name, e); return undefined; }
  }
  function toast(m, k) { if (typeof I.toast === "function") I.toast(m, k || "info"); }
  function toArr(v) { return v == null ? [] : Array.isArray(v) ? v : [v]; }
  function go(params) {
    var p = {};
    Object.keys(params || {}).forEach(function (k) { if (params[k] != null && params[k] !== "") p[k] = params[k]; });
    if (typeof I.go === "function") I.go("reading", p);
  }
  function tests() { return (I.data && I.data.readingTests) || []; }
  function allPassages() {
    var r = api("allPassages");
    if (Array.isArray(r)) return r;
    var out = [];
    tests().forEach(function (t) { toArr(t.passages).forEach(function (p) { out.push({ test: t, passage: p }); }); });
    return out;
  }
  function findPassage(id) { return allPassages().filter(function (x) { return x.passage.id === id; })[0] || null; }
  function findTest(id) { return tests().filter(function (t) { return t.id === id; })[0] || null; }
  function qNums(p) { var a = []; toArr(p.groups).forEach(function (g) { X().groupNumbers(g).forEach(function (n) { a.push(n); }); }); return a.sort(function (x, y) { return x - y; }); }
  function localWordId(w) { return String(w || "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); }
  function wid(w) { return (w && w.id) || api("wordId", w && w.word) || localWordId(w && w.word); }
  function inReview(id) { return !!(I.state && I.state.vocab && I.state.vocab.items && I.state.vocab.items[id]); }

  /* ---------------- daily passage + today's words ---------------- */
  function daily() { var d = api("getDailyPassage"); return d && d.passage ? d : null; }
  function todayWordsFor(pid) {
    if (!pid) return [];
    return toArr(api("getTodayWords")).filter(function (w) { return w && w.fromPassage === pid; });
  }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function wordRegex(word) {
    var parts = String(word || "").toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return null;
    var h = parts[0], f = {};
    [h, h + "s", h + "es", h + "ed", h + "d", h + "ing", h + "ly", h + "er", h + "ers"].forEach(function (x) { f[x] = 1; });
    if (/e$/.test(h)) { var b = h.slice(0, -1); ["ing", "ed", "er", "ers", "ion", "ions"].forEach(function (s) { f[b + s] = 1; }); }
    if (/le$/.test(h)) f[h.slice(0, -1) + "y"] = 1;
    if (/[^aeiou]y$/.test(h)) { var c = h.slice(0, -1); ["ies", "ied", "ier", "iest", "ily"].forEach(function (s) { f[c + s] = 1; }); }
    if (/[^aeiou][aeiou][bdgklmnprt]$/.test(h)) { var l = h.slice(-1); f[h + l + "ed"] = 1; f[h + l + "ing"] = 1; f[h + l + "er"] = 1; }
    var forms = Object.keys(f).sort(function (a, b) { return b.length - a.length; }).map(escRe).join("|");
    var rest = parts.slice(1).map(function (p, i, arr) { return escRe(p) + (i === arr.length - 1 ? "(?:s|es)?" : ""); });
    return new RegExp("\\b(?:" + forms + ")" + (rest.length ? "\\s+" + rest.join("\\s+") : "") + "\\b", "i");
  }
  /* wrap occurrences of today's words (text nodes only) in .tw spans with a VN tooltip */
  function markWords(html, words) {
    if (!words || !words.length || typeof document === "undefined") return html;
    var res = words.map(function (w) { return { re: wordRegex(w.word), w: w }; }).filter(function (x) { return x.re; });
    if (!res.length) return html;
    var box = document.createElement("div");
    box.innerHTML = html;
    var walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT, null), nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (node.parentNode && node.parentNode.closest && node.parentNode.closest(".rw-word,.ex-ptitle")) return;
      var cur = node;
      var guard = 0;
      while (cur && cur.nodeValue && guard++ < 50) {
        var best = null;
        res.forEach(function (x) { var m = x.re.exec(cur.nodeValue); if (m && (!best || m.index < best.m.index)) best = { m: m, w: x.w }; });
        if (!best) break;
        var mid = best.m.index > 0 ? cur.splitText(best.m.index) : cur;
        var after = mid.splitText(best.m[0].length);
        var span = document.createElement("span");
        span.className = "rw-word";
        span.setAttribute("tabindex", "0");
        span.setAttribute("data-tip", best.w.vi || "");
        span.setAttribute("title", (best.w.word || "") + " — " + (best.w.vi || ""));
        mid.parentNode.insertBefore(span, mid);
        span.appendChild(mid);
        cur = after;
      }
    });
    return box.innerHTML;
  }
  function passageHtml(p, words) {
    var html = '<h2 class="ex-ptitle">' + esc(p.title || "") + "</h2>" +
      (p.subtitle ? '<p class="ex-psub">' + p.subtitle + "</p>" : "") +
      (p.provenance ? '<details class="small muted"><summary>Xuất xứ bài luyện</summary><p>' + esc(p.provenance.note || "Bài luyện biên soạn.") +
        (p.provenance.url ? ' <a href="' + esc(p.provenance.url) + '" target="_blank" rel="noopener noreferrer">Tài liệu tham khảo: ' + esc(p.provenance.publisher || "nguồn gốc") + '</a>.' : "") + "</p></details>" : "") +
      toArr(p.paragraphs).map(function (para) {
        var o = typeof para === "string" ? { label: "", text: para } : para || {};
        return '<div class="ex-para' + (o.label ? " has-label" : "") + '">' + (o.label ? '<span class="ex-plabel">' + esc(o.label) + "</span>" : "") + "<p>" + (o.text || "") + "</p></div>";
      }).join("");
    return markWords(html, words);
  }

  /* ---------------- view state ---------------- */
  var V = null;
  function cleanupView() {
    if (!V) return;
    V.vc.splice(0).forEach(function (f) { try { f(); } catch (e) { if (window.console) console.warn(e); } });
    V.token++;
  }
  function onView(fn) { if (V) V.vc.push(fn); }

  /* ======================================================================
   * Landing
   * ====================================================================== */
  var TABS = [{ k: "passage", label: "Passage lẻ", icon: "book-open" }, { k: "full", label: "Full đề", icon: "layers" }, { k: "analysis", label: "Phân tích dạng bài", icon: "bar-chart" }];
  function emptyCard(emoji, title, text) {
    return '<div class="card empty pr-empty"><div class="empty-emoji">' + emoji + '</div><div class="empty-title">' + title + '</div><div class="empty-text">' + text + "</div></div>";
  }
  function draftBadge(key) {
    var d = X().loadDraft(key);
    return d ? '<span class="pill warn pr-draft" title="' + esc(X().draftSummary(d)) + '">' + ic("clock", 13) + " Đang làm dở</span>" : "";
  }
  function bestLine(h, full) {
    if (!h.count) return '<span class="muted">Chưa làm</span>';
    var b = h.best;
    return (b ? "Tốt nhất <b>" + b.raw + "/" + b.total + "</b> (" + Math.round(b.acc) + "%)" + (full && b.band != null ? " · band ~" + esc(I.fmtBand ? I.fmtBand(b.band) : b.band) : "") : "") +
      ' · <span class="muted">' + h.count + " lần</span>";
  }
  function dailyCard() {
    var d = daily();
    if (!d) return "";
    var p = d.passage, ws = todayWordsFor(p.id);
    var h = X().ui.historyFor("reading", p.id, ["passage"]);
    return '<div class="card tape pad-lg pr-daily sk-reading">' +
      '<div class="pr-daily-main"><div class="page-kicker">' + ic("sun", 14) + " Bài đọc đề xuất hôm nay</div>" +
      '<h2 class="pr-daily-title">' + esc(p.title || "") + "</h2>" +
      '<div class="row wrap pr-daily-meta"><span class="pill sk">' + esc(d.test.title) + " · Passage " + esc(p.part) + '</span><span class="pill muted">' + esc(X().ui.topicName(p.topic)) + "</span>" +
      '<span class="pill muted">' + qNums(p).length + " câu · 20 phút</span>" + (d.reviewMode ? '<span class="pill warn">Ôn lại — bạn đã làm hết các bài</span>' : "") + draftBadge("exam:" + p.id) + "</div>" +
      '<p class="small muted">' + bestLine(h, false) + "</p>" +
      '<button type="button" class="btn sk lg" data-la="daily">' + ic("play", 16) + " Làm bài đọc này</button></div>" +
      '<div class="pr-daily-words"><div class="field-label">Từ vựng hôm nay trong bài' + (ws.length ? " (" + ws.length + ")" : "") + "</div>" +
      (ws.length ? '<ul class="pr-wordchips">' + ws.map(function (w) {
        return '<li><b>' + esc(w.word) + "</b>" + (w.ipa ? ' <span class="tiny muted ipa">' + esc(w.ipa) + "</span>" : "") + '<span class="small">' + esc(w.vi || "") + "</span></li>";
      }).join("") + '</ul><p class="tiny muted">Các từ này được gạch chân chấm trong bài — rê chuột để xem nghĩa.</p>'
        : '<p class="small muted">Hôm nay không có từ mới nào lấy từ bài này. Xem danh sách ở trang Từ vựng.</p>') +
      "</div></div>";
  }
  function passageTab(p) {
    var all = allPassages();
    if (!all.length) return emptyCard("📖", "Chưa có bài Reading", "Dữ liệu đề đang được bổ sung — quay lại sau nhé.");
    var present = [];
    all.forEach(function (x) { toArr(x.passage.groups).forEach(function (g) { if (g.type && present.indexOf(g.type) < 0) present.push(g.type); }); });
    var order = X().qtypeKeys("reading");
    present.sort(function (a, b) { return (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99); });
    var type = p.type || "";
    var d = daily(), did = d ? d.passage.id : null;
    var chips = '<div class="pr-filter"><span class="pr-filter-l">' + ic("filter", 15) + ' Dạng bài</span><button type="button" class="chip' + (!type ? " active" : "") + '" data-la="type" data-type="">Tất cả</button>' +
      present.map(function (k) { return '<button type="button" class="chip' + (type === k ? " active" : "") + '" data-la="type" data-type="' + esc(k) + '">' + esc(X().qtype("reading", k).name) + "</button>"; }).join("") + "</div>";
    var list = all.filter(function (x) { return !type || toArr(x.passage.groups).some(function (g) { return g.type === type; }); });
    var byTest = {}, ord = [];
    list.forEach(function (x) { if (!byTest[x.test.id]) { byTest[x.test.id] = []; ord.push(x.test); } byTest[x.test.id].push(x); });
    var body = list.length ? ord.map(function (t) {
      return '<div class="pr-testgroup"><h3 class="pr-testgroup-title">' + esc(t.title) + '<span class="tiny muted"> · ' + esc(t.source || "") + '</span></h3><div class="grid g-auto pr-cards">' +
        byTest[t.id].map(function (x) {
          var ps = x.passage, h = X().ui.historyFor("reading", ps.id, ["passage"]);
          return '<article class="card clickable pr-card sk-reading" tabindex="0" data-la="open-passage" data-id="' + esc(ps.id) + '">' +
            '<div class="pr-card-top"><span class="pill sk">Passage ' + esc(ps.part) + '</span><span class="pill muted">' + esc(X().ui.topicName(ps.topic)) + "</span>" +
            (ps.id === did ? '<span class="pill good">' + ic("sun", 12) + " Hôm nay</span>" : "") + draftBadge("exam:" + ps.id) + "</div>" +
            '<h3 class="pr-card-title">' + esc(ps.title || "") + "</h3>" +
            '<div class="pr-types">' + X().ui.typePills(ps.groups, "reading") + "</div>" +
            '<div class="pr-card-foot"><span>' + ic("list", 14) + " " + qNums(ps).length + " câu · 20′</span><span>" + bestLine(h, false) + "</span></div>" +
            (h.last && h.last.detail && Array.isArray(h.last.detail.results) ? '<button type="button" class="pr-link" data-la="last" data-id="' + esc(ps.id) + '">Xem kết quả gần nhất →</button>' : "") +
            "</article>";
        }).join("") + "</div></div>";
    }).join("") : emptyCard("🔎", "Không có passage nào chứa dạng này", "Thử chọn dạng khác hoặc bấm “Tất cả”.");
    return chips + body;
  }
  function fullTab() {
    var ts = tests();
    if (!ts.length) return emptyCard("📖", "Chưa có full đề", "Dữ liệu đề đang được bổ sung.");
    return '<div class="grid g-2 pr-cards">' + ts.map(function (t) {
      var h = X().ui.historyFor("reading", t.id, ["full"]), n = 0;
      toArr(t.passages).forEach(function (p) { n += qNums(p).length; });
      return '<article class="card clickable tape pr-card pr-fullcard sk-reading" tabindex="0" data-la="open-full" data-id="' + esc(t.id) + '">' +
        '<div class="pr-card-top"><span class="pill sk">Full test</span><span class="tiny muted">' + esc(t.source || "") + "</span>" + draftBadge("exam:" + t.id) + "</div>" +
        '<h3 class="pr-card-title">' + esc(t.title) + "</h3>" +
        '<ol class="pr-partlist">' + toArr(t.passages).map(function (p) { return "<li><b>Passage " + esc(p.part) + "</b> " + esc(p.title || "") + ' <span class="tiny muted">· ' + esc(X().ui.topicName(p.topic)) + "</span></li>"; }).join("") + "</ol>" +
        '<div class="pr-card-foot"><span>' + ic("clock", 14) + " " + n + " câu · 60 phút</span><span>" + bestLine(h, true) + "</span></div>" +
        (h.last && h.last.detail && Array.isArray(h.last.detail.results) ? '<button type="button" class="pr-link" data-la="last" data-id="' + esc(t.id) + '">Xem kết quả gần nhất →</button>' : "") +
        "</article>";
    }).join("") + "</div>";
  }
  function landingHtml(p) {
    var tab = TABS.some(function (t) { return t.k === p.tab; }) ? p.tab : "passage";
    var body = tab === "passage" ? passageTab(p) : tab === "full" ? fullTab() : X().ui.analysisHtml("reading");
    return '<div class="page-head"><div><div class="page-kicker">Luyện tập · Reading</div><h1 class="page-title">Reading</h1>' +
      '<p class="page-sub">Giao diện thi trên máy: bài đọc bên trái, câu hỏi bên phải, tô vàng và đánh dấu câu hỏi</p></div>' +
      '<div class="page-actions"><span class="pill sk">' + tests().length + " đề · " + allPassages().length + " passage</span></div></div>" +
      (tab !== "analysis" ? dailyCard() : "") +
      '<div class="tabs pr-tabs" role="tablist">' + TABS.map(function (t) {
        return '<button type="button" class="tab' + (t.k === tab ? " active" : "") + '" role="tab" aria-selected="' + (t.k === tab) + '" data-la="tab" data-tab="' + t.k + '">' + ic(t.icon, 16) + " " + t.label + "</button>";
      }).join("") + "</div>" +
      '<div class="pr-tabbody">' + body + "</div>";
  }
  function showLanding(p) { cleanupView(); V.host.innerHTML = landingHtml(p || {}); }

  /* ======================================================================
   * Pre-start
   * ====================================================================== */
  function refInfo(kind, id) {
    if (kind === "passage") {
      var x = findPassage(id); if (!x) return null;
      return { kind: kind, id: id, test: x.test, passages: [x.passage], title: x.test.title + " — Passage " + x.passage.part + ": " + (x.passage.title || ""), seconds: 1200 };
    }
    var t = findTest(id); if (!t) return null;
    return { kind: "full", id: id, test: t, passages: toArr(t.passages), title: t.title + " — Full test", seconds: 3600 };
  }
  function openPrestart(kind, id, fromDaily) {
    cleanupView();
    var ref = refInfo(kind, id);
    if (!ref) { toast("Không tìm thấy bài " + id, "warn"); showLanding({ tab: kind === "full" ? "full" : "passage" }); return; }
    var draft = X().loadDraft("exam:" + id), groups = [], nq = 0;
    ref.passages.forEach(function (p) { nq += qNums(p).length; toArr(p.groups).forEach(function (g) { groups.push(g); }); });
    var d = daily(), did = d ? d.passage.id : null;
    var dailyHere = ref.passages.some(function (p) { return p.id === did; });
    var ws = dailyHere ? todayWordsFor(did) : [];
    V.pre = { kind: kind, id: id, draft: draft };
    V.host.innerHTML =
      '<div class="pr-pre">' +
      '<button type="button" class="btn ghost sm" data-la="back" data-tab="' + (kind === "full" ? "full" : "passage") + '">' + ic("chevron-left", 16) + " Danh sách</button>" +
      '<div class="card tape pad-lg pr-pre-card sk-reading">' +
      '<div class="page-kicker">' + (fromDaily || (dailyHere && kind === "passage") ? ic("sun", 14) + " Bài đọc đề xuất hôm nay" : kind === "full" ? "Full đề · 3 Passage" : "Passage lẻ") + "</div>" +
      '<h2 class="pr-pre-title">' + esc(ref.title) + "</h2>" +
      (kind === "passage" && ref.passages[0].intro ? '<p class="muted">' + esc(ref.passages[0].intro) + "</p>" : "") +
      (kind === "full" ? '<ol class="pr-partlist">' + ref.passages.map(function (p) { return "<li><b>Passage " + esc(p.part) + "</b> " + esc(p.title || "") + "</li>"; }).join("") + "</ol>" : "") +
      '<div class="pr-pre-facts"><span>' + ic("list", 15) + " " + nq + " câu</span><span>" + ic("timer", 15) + " " + Math.round(ref.seconds / 60) + " phút · tự nộp khi hết giờ</span></div>" +
      '<div class="pr-types">' + X().ui.typePills(groups, "reading") + "</div>" +
      '<ul class="pr-rules"><li>Bài đọc bên trái, câu hỏi bên phải — kéo thanh giữa để đổi độ rộng, A−/A+ để đổi cỡ chữ.</li>' +
      "<li>Bôi đen chữ trong bài để tô vàng; bấm vào chỗ đã tô để xoá.</li>" +
      "<li>Nút <b>Review</b> đánh dấu câu cần xem lại; thanh dưới cùng hiển thị câu đã làm / đang làm / đã đánh dấu.</li>" +
      "<li>Bài làm và thời gian còn lại được lưu nháp — tải lại trang không mất.</li></ul>" +
      (ws.length ? '<div class="pr-daily-words"><div class="field-label">Từ vựng hôm nay xuất hiện trong bài</div><ul class="pr-wordchips">' +
        ws.map(function (w) { return "<li><b>" + esc(w.word) + '</b><span class="small">' + esc(w.vi || "") + "</span></li>"; }).join("") + "</ul></div>" : "") +
      (draft ? '<div class="pr-resume"><div><b>Bạn có bài làm dở</b><div class="small muted">' + esc(X().draftSummary(draft)) + "</div></div>" +
        '<div class="row wrap"><button type="button" class="btn primary" data-la="resume">' + ic("play", 16) + " Tiếp tục</button>" +
        '<button type="button" class="btn ghost" data-la="restart">Làm lại từ đầu</button></div></div>'
        : '<div class="row wrap pr-pre-actions"><button type="button" class="btn primary lg" data-la="start">' + ic("play", 18) + " Bắt đầu làm bài</button></div>") +
      "</div></div>";
  }

  /* ======================================================================
   * Exam
   * ====================================================================== */
  function startExam(kind, id, opt) {
    opt = opt || {};
    var ref = refInfo(kind, id);
    if (!ref) return;
    cleanupView();
    var key = "exam:" + id, draft = opt.resume || null;
    if (!draft) X().clearDraft(key);
    var d = daily(), did = d ? d.passage.id : null, ws = todayWordsFor(did);
    var parts = ref.passages.map(function (p) {
      var ns = qNums(p);
      return { id: p.id, title: p.title || "", label: "Part " + p.part, groups: toArr(p.groups),
        sub: "Read the text and answer questions " + (ns[0] || "") + "–" + (ns[ns.length - 1] || "") + ".",
        passageHtml: (p.intro ? '<p class="ex-pintro">' + esc(p.intro) + "</p>" : "") + passageHtml(p, p.id === did ? ws : []) };
    });
    var pStart = api("beginPractice", "reading");
    api("enterExamMode");
    var ctl;
    var leaveGuard = function () {
      if (!ctl || ctl.isSubmitted()) return true;
      return typeof I.confirm === "function" ? I.confirm("Bạn đang làm bài thi. Rời trang? Đáp án và thời gian còn lại đã được lưu nháp.", { okLabel: "Rời trang" }) : true;
    };
    ctl = X().start(V.host, {
      key: key, skill: "reading", title: ref.title, parts: parts, layout: "split", draft: draft,
      timer: { seconds: ref.seconds, warnAt: 300 }, highlighter: true, fontSize: true,
      onSubmit: function (res) { finish(res); },
      onExit: function () {
        var p = typeof I.confirm === "function" ? I.confirm("Thoát bài thi? Đáp án và thời gian còn lại được lưu nháp để làm tiếp.", { okLabel: "Thoát" }) : Promise.resolve(true);
        p.then(function (ok) { if (ok) { ctl.save(); I.confirmLeave = null; openPrestart(kind, id); } });
      }
    });
    V.ctl = ctl;
    I.confirmLeave = leaveGuard;
    ctl.setAudio('<span class="ex-au-state">' + ic("book-open", 15) + " Reading</span>");
    onView(function () {
      ctl.destroy();
      api("exitExamMode");
      if (I.confirmLeave === leaveGuard) I.confirmLeave = null;
    });
    function finish(res) {
      api("endPractice", pStart);
      api("exitExamMode");
      I.confirmLeave = null;
      var full = kind === "full";
      var band = full && res.total === 40 ? api("bandFromRaw", "reading", res.raw) : null;
      if (band === undefined) band = null;
      var detail = { answers: res.answers, results: res.results };
      if (full) detail.perPassage = res.perPart.map(function (pp, i) { return { id: pp.id, part: ref.passages[i].part, title: pp.title, raw: pp.raw, total: pp.total, accuracy: pp.accuracy }; });
      var stored = api("recordSubmission", {
        skill: "reading", kind: full ? "full" : "passage", refId: id, title: ref.title, seconds: res.seconds, clientKey: res.clientKey,
        practiceHint: !full && id === did ? { daily: 1 } : null,
        score: { raw: res.raw, total: res.total, accuracy: res.accuracy, band: band, bandSource: band != null ? "full-test table" : null, criteria: null, status: "graded" },
        detail: detail
      }) || {};
      showResults({ ref: ref, res: res, stored: stored });
    }
  }

  /* ======================================================================
   * Results
   * ====================================================================== */
  function vocabTable(p) {
    var vs = toArr(p.vocab);
    if (!vs.length) return "";
    var rows = vs.map(function (w) {
      var id = wid(w), added = inReview(id);
      var ex = esc(w.example || "");
      var re = wordRegex(w.word);
      if (re && ex) ex = ex.replace(new RegExp(re.source, "gi"), function (m) { return "<b>" + m + "</b>"; });
      return '<tr data-wid="' + esc(id) + '"><td class="v-word"><b>' + esc(w.word) + '</b></td><td class="v-ipa">' + esc(w.ipa || "") + '</td><td class="v-pos">' + esc(w.pos || "") +
        '</td><td class="v-band">' + (w.band ? '<span class="pill muted">' + esc(w.band) + "</span>" : "") + '</td><td class="v-vi">' + esc(w.vi || "") + '</td><td class="v-ex">' + ex +
        '</td><td class="v-act">' + addBtn(id, p.id, added) + "</td></tr>";
    }).join("");
    var left = vs.filter(function (w) { return !inReview(wid(w)); }).length;
    return '<div class="card pr-vocab sk-vocab" data-vpid="' + esc(p.id) + '"><div class="row between wrap"><div><div class="card-title">' + ic("layers", 16) + " Lọc từ vựng — " + esc(p.title || "") + "</div>" +
      '<p class="tiny muted">Từ vựng học thuật trong bài · band là nhãn tham khảo</p></div>' +
      '<button type="button" class="btn sm sk" data-la="add-all" data-pid="' + esc(p.id) + '"' + (left ? "" : " disabled") + ">" + (left ? ic("plus", 14) + " Thêm tất cả (" + left + ")" : ic("check", 14) + " Đã thêm tất cả") + "</button></div>" +
      '<div class="table-wrap"><table class="table vtable"><thead><tr><th>Từ tiếng Anh</th><th>Phiên âm</th><th>Loại từ</th><th>Band</th><th>Nghĩa tiếng Việt</th><th>Câu ví dụ</th><th></th></tr></thead><tbody>' +
      rows + "</tbody></table></div></div>";
  }
  function addBtn(id, pid, added) {
    return added ? '<span class="pr-added">' + ic("check", 14) + " Đã thêm</span>"
      : '<button type="button" class="btn sm ghost" data-la="add-word" data-wid="' + esc(id) + '" data-pid="' + esc(pid) + '">' + ic("plus", 14) + " Thêm vào từ cần ôn</button>";
  }
  function addWord(w, pid) {
    var id = wid(w);
    if (!id) return false;
    if (!api("findWord", id)) api("addCustomWord", Object.assign({}, w, { id: id }));
    var r = api("learnWord", id, "reading:" + pid);
    return r !== false && r !== undefined ? true : inReview(id);
  }
  function findVocab(pid, id) {
    var x = findPassage(pid);
    return x ? toArr(x.passage.vocab).filter(function (w) { return wid(w) === id; })[0] || null : null;
  }
  function refreshVocabCard(pid) {
    var card = V.host.querySelector('[data-vpid="' + pid + '"]'), x = findPassage(pid);
    if (!card || !x) return;
    var tmp = document.createElement("div");
    tmp.innerHTML = vocabTable(x.passage);
    if (tmp.firstChild) card.parentNode.replaceChild(tmp.firstChild, card);
  }
  function showResults(ctx) {
    cleanupView();
    var ref = ctx.ref, res = ctx.res, stored = ctx.stored || {}, full = ref.kind === "full";
    var results = res.results || [];
    var band = stored.score ? stored.score.band : null;
    var perPart = full ? '<div class="card"><div class="card-title">Theo từng Passage</div><div class="table-wrap"><table class="table"><thead><tr><th>Passage</th><th>Bài đọc</th><th>Đúng</th><th>Accuracy</th></tr></thead><tbody>' +
      ref.passages.map(function (p) {
        var ns = qNums(p), rs = results.filter(function (r) { return ns.indexOf(r.n) >= 0; }), c = rs.filter(function (r) { return r.correct; }).length;
        var acc = rs.length ? c / rs.length * 100 : 0;
        return "<tr><td><b>" + esc(p.part) + "</b></td><td>" + esc(p.title || "") + '</td><td class="mono">' + c + "/" + rs.length + "</td><td>" + X().ui.accBar(acc, acc >= 90 ? "strong" : acc >= 70 ? "improving" : "weak") + "</td></tr>";
      }).join("") + "</tbody></table></div></div>" : "";
    V.host.innerHTML =
      '<div class="pr-results sk-reading">' +
      '<div class="row between wrap pr-res-head"><div class="row wrap"><button type="button" class="btn ghost sm" data-la="back" data-tab="' + (full ? "full" : "passage") + '">' + ic("chevron-left", 16) + " Danh sách</button>" +
      '<div><div class="page-kicker">Kết quả · ' + (full ? "Full đề" : "Passage lẻ") + '</div><h2 class="pr-res-title">' + esc(ref.title) + "</h2></div></div>" +
      '<div class="row wrap"><button type="button" class="btn sk" data-la="redo">' + ic("rotate-ccw", 16) + " Làm lại</button></div></div>" +
      (stored.repeat ? '<div class="pr-note">' + ic("rotate-ccw", 15) + " <b>Làm lại</b> — bạn đã làm bài này trước đó nên lần này không tính thêm vào thống kê dạng bài.</div>" : "") +
      (ctx.fromHistory ? '<div class="pr-note">' + ic("clock", 15) + " Kết quả đã lưu ngày " + esc(I.fmtDay ? I.fmtDay(stored.day, "full") : stored.day) + ".</div>" : "") +
      X().ui.scoreHero({ skill: "reading", raw: res.raw, total: res.total, accuracy: res.accuracy, band: band, showBand: full, seconds: res.seconds, blank: !!stored.blank }) +
      '<div class="grid g-2 pr-res-grid">' + X().ui.typeTable(results, "reading") + perPart + "</div>" +
      ref.passages.map(function (p) {
        var ns = qNums(p), rs = results.filter(function (r) { return ns.indexOf(r.n) >= 0; });
        return '<section class="pr-res-passage"><h3 class="section-title">Passage ' + esc(p.part) + " — " + esc(p.title || "") + "</h3>" +
          '<div class="pr-review-col">' + X().renderReview(p.groups, rs, { skill: "reading" }) + "</div>" + vocabTable(p) + "</section>";
      }).join("") + "</div>";
    V.result = { ref: ref, res: res, stored: stored };
    try { window.scrollTo(0, 0); } catch (e) { /* ignore */ }
  }
  function openStoredResult(refId) {
    var kind = findTest(refId) ? "full" : "passage", ref = refInfo(kind, refId);
    var h = X().ui.historyFor("reading", refId, [kind]);
    var s = h.list.filter(function (x) { return x.detail && Array.isArray(x.detail.results); })[0];
    if (!ref || !s) { toast("Chưa có kết quả để xem lại.", "info"); return; }
    var sc = s.score || {};
    showResults({ ref: ref, stored: s, fromHistory: true, res: { raw: sc.raw, total: sc.total, accuracy: sc.accuracy, results: s.detail.results, answers: s.detail.answers || {}, seconds: s.seconds } });
  }
  function logError(n) {
    if (!V || !V.result) return;
    var ref = V.result.ref, r = (V.result.res.results || []).filter(function (x) { return x.n === n; })[0];
    if (!r) return;
    var idx = {};
    ref.passages.forEach(function (p) { var m = X().buildIndex(p.groups); Object.keys(m).forEach(function (k) { idx[k] = m[k]; }); });
    var hit = idx[n]; if (!hit) return;
    X().openErrorModal({ skill: "reading", group: hit.g, question: hit.q, result: r, source: ref.title + " · " + ref.id }, function () {
      var b = V && V.host.querySelector('[data-logerr="' + n + '"]');
      if (b) { b.disabled = true; b.innerHTML = ic("check", 14) + " Đã ghi"; }
    });
  }

  /* ======================================================================
   * Router glue
   * ====================================================================== */
  function route(p) {
    if (String(p.daily) === "1" && !p.start) {
      var d = daily();
      if (d) return openPrestart("passage", d.passage.id, true);
      toast("Chưa có bài đọc đề xuất — dữ liệu Reading đang được bổ sung.", "info");
    }
    if (p.start) {
      if (p.tab !== "full" && findPassage(p.start)) return openPrestart("passage", p.start, String(p.daily) === "1");
      if (findTest(p.start)) return openPrestart("full", p.start);
      if (findPassage(p.start)) return openPrestart("passage", p.start);
      toast("Không tìm thấy bài “" + p.start + "”.", "warn");
    }
    if (!V.host.querySelector(".pr-tabs")) showLanding(p);
  }
  function onHostClick(e) {
    var b = e.target.closest && e.target.closest("[data-la],[data-logerr]");
    if (!b || !V || !V.host.contains(b) || b.closest(".ex-shell")) return;
    if (b.hasAttribute("data-logerr")) { logError(+b.getAttribute("data-logerr")); return; }
    var a = b.getAttribute("data-la"), id = b.getAttribute("data-id");
    if (a === "last") { e.stopPropagation(); openStoredResult(id); return; }
    switch (a) {
      case "tab": go({ tab: b.getAttribute("data-tab") }); break;
      case "type": go({ tab: "passage", type: b.getAttribute("data-type") }); break;
      case "practice-type": go({ tab: "passage", type: b.getAttribute("data-type") }); break;
      case "open-passage": go({ tab: "passage", start: id }); break;
      case "open-full": go({ tab: "full", start: id }); break;
      case "daily": go({ daily: 1 }); break;
      case "back": go({ tab: b.getAttribute("data-tab") || "passage" }); break;
      case "start": if (V.pre) startExam(V.pre.kind, V.pre.id, {}); break;
      case "resume": if (V.pre && V.pre.draft) startExam(V.pre.kind, V.pre.id, { resume: V.pre.draft }); break;
      case "restart": if (V.pre) { X().clearDraft("exam:" + V.pre.id); startExam(V.pre.kind, V.pre.id, {}); } break;
      case "redo": if (V.result) openPrestart(V.result.ref.kind, V.result.ref.id); break;
      case "add-word": {
        var pid = b.getAttribute("data-pid"), w = findVocab(pid, b.getAttribute("data-wid"));
        if (w && addWord(w, pid)) { toast("Đã thêm “" + w.word + "” vào danh sách ôn.", "success"); refreshVocabCard(pid); }
        break;
      }
      case "add-all": {
        var pid2 = b.getAttribute("data-pid"), x = findPassage(pid2), n = 0;
        if (!x) break;
        toArr(x.passage.vocab).forEach(function (vw) { if (!inReview(wid(vw)) && addWord(vw, pid2)) n++; });
        toast(n ? "Đã thêm " + n + " từ vào danh sách ôn." : "Tất cả từ đã có trong danh sách ôn.", n ? "success" : "info");
        refreshVocabCard(pid2);
        break;
      }
    }
  }
  function onHostKey(e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var c = e.target;
    if (c && c.matches && c.matches("article[data-la]")) { e.preventDefault(); c.click(); }
  }

  I.registerPage({
    id: "reading", label: "Reading", icon: "book-open", skill: "reading", group: "practice", order: 5,
    render: function (params) {
      params = params || {};
      var inner = params.start || String(params.daily) === "1" ? '<div class="pr-loading"><span class="pr-spin"></span> Đang mở bài…</div>' : landingHtml(params);
      return '<div class="page sk-reading pr-page" data-pr-host>' + inner + "</div>";
    },
    mount: function (root, params) {
      var host = root.querySelector("[data-pr-host]") || root;
      V = { root: root, host: host, params: params || {}, vc: [], token: 0 };
      var myV = V;
      host.addEventListener("click", onHostClick);
      host.addEventListener("keydown", onHostKey);
      route(V.params);
      return function () {
        var cur = V; V = myV;
        cleanupView();
        host.removeEventListener("click", onHostClick);
        host.removeEventListener("keydown", onHostKey);
        V = cur === myV ? null : cur;
      };
    }
  });

  I.readingMarkWords = markWords;
})();
