/* IELTS Coach — js/pages/listening.js (builder B)
 * Tabs: Section lẻ | Full đề | Audio thật (content-pack clips) | Dictation | Phân tích dạng bài
 * Real-exam listening (TTS or <audio>), results + transcript evidence + error log, dictation trainer.
 */
(function () {
  "use strict";
  var I = window.IELTS;
  if (!I || typeof I.registerPage !== "function") return;

  /* ---------------- helpers ---------------- */
  function X() { return I.exam; }
  function esc(s) { return typeof I.esc === "function" ? I.esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function ic(n, s) { try { return typeof I.icon === "function" ? I.icon(n, s || 18) : ""; } catch (e) { return ""; } }
  function api(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    try { return typeof I[name] === "function" ? I[name].apply(I, args) : undefined; }
    catch (e) { if (window.console) console.warn("[listening] " + name, e); return undefined; }
  }
  function toast(m, k) { if (typeof I.toast === "function") I.toast(m, k || "info"); }
  function toArr(v) { return v == null ? [] : Array.isArray(v) ? v : [v]; }
  function go(params) {
    var p = {};
    Object.keys(params || {}).forEach(function (k) { if (params[k] != null && params[k] !== "") p[k] = params[k]; });
    if (typeof I.go === "function") I.go("listening", p);
  }
  function rate() { var p = I.state && I.state.profile; return (p && p.tts && +p.tts.rate) || 0.95; }
  function tests() { return (I.data && I.data.listeningTests) || []; }
  function allSections() {
    var r = api("allSections");
    if (Array.isArray(r)) return r;
    var out = [];
    tests().forEach(function (t) { toArr(t.sections).forEach(function (s) { out.push({ test: t, section: s }); }); });
    return out;
  }
  function findSection(id) { return allSections().filter(function (x) { return x.section.id === id; })[0] || null; }
  function findTest(id) { return tests().filter(function (t) { return t.id === id; })[0] || null; }
  function lessons() { return (I.data && I.data.dictation) || []; }
  /* real-audio clips from content packs (SPEC §11) */
  function clips() { return (I.data && Array.isArray(I.data.listeningClips)) ? I.data.listeningClips : []; }
  function findClip(id) { return clips().filter(function (c) { return c && c.id === id; })[0] || null; }
  /* a clip as a pseudo-section so the exam player/results reuse the section flow; voices alternate per speaker for the TTS fallback */
  function clipSection(c) {
    var voices = ["f", "m", "f2", "m2"], bySpeaker = {}, k = 0;
    var script = toArr(c.transcript).map(function (l) {
      var sp = String((l && l.speaker) || "");
      if (!bySpeaker[sp]) bySpeaker[sp] = l && l.voice ? l.voice : voices[k++ % voices.length];
      return { speaker: sp, voice: bySpeaker[sp], text: (l && l.text) || "", q: l && l.q };
    });
    return { id: c.id, part: "", isClip: true, title: c.title || c.id, context: c.context || "", audio: c.audio || null, script: script, groups: toArr(c.groups) };
  }
  function secLabel(s) { return s && s.isClip ? "Audio" : "Part " + (s ? s.part : ""); }
  function tabOf(kind) { return kind === "full" ? "full" : kind === "clip" ? "clips" : "section"; }
  /* "6:12" -> whole minutes (rounded up) */
  function durMins(d) {
    var m = /^(\d+):(\d{1,2})$/.exec(String(d || "").trim());
    return m ? Math.max(1, Math.ceil((+m[1] * 60 + +m[2]) / 60)) : null;
  }
  /* audio URL candidates for a section: local copy first, then the remote asset URL (content channel) */
  function audioSrcs(ref) {
    var r = null;
    try { r = typeof I.resolveAudio === "function" ? I.resolveAudio(ref) : null; } catch (e) { r = null; }
    if (!r) return ref ? [String(ref)] : [];
    return [r.local, r.remote].filter(function (u, i, a) { return u && a.indexOf(u) === i; });
  }
  function findLesson(id) { return lessons().filter(function (l) { return l.id === id; })[0] || null; }
  function qNums(sec) { var a = []; toArr(sec.groups).forEach(function (g) { X().groupNumbers(g).forEach(function (n) { a.push(n); }); }); return a.sort(function (x, y) { return x - y; }); }
  function words(s) { return String(s || "").split(/\s+/).filter(Boolean).length; }
  /* one estimate for list cards and the intro screen: script length at TTS rate + per-part pauses + check time */
  function estMins(secs, full) {
    var w = 0; secs = toArr(secs);
    secs.forEach(function (s) { toArr(s && s.script).forEach(function (l) { w += words(l.text); }); });
    return Math.round(w / 140 / rate() + secs.length * 0.5 + (full ? 2 : 1));
  }
  function ttsAvailable() { try { return !!(I.tts && I.tts.available && I.tts.available()); } catch (e) { return false; } }
  function withTimeout(p, ms) { return Promise.race([p, new Promise(function (r) { setTimeout(r, ms); })]); }
  function checkTts() {
    if (!I.tts || typeof I.tts.ready !== "function") return Promise.resolve(false);
    return withTimeout(Promise.resolve(I.tts.ready()).catch(function () { return null; }), 4000).then(ttsAvailable);
  }

  /* ---------------- view state ---------------- */
  var V = null;
  function cleanupView() {
    if (!V) return;
    var list = V.vc.splice(0);
    list.forEach(function (f) { try { f(); } catch (e) { if (window.console) console.warn(e); } });
    V.token++;
  }
  function onView(fn) { if (V) V.vc.push(fn); }

  /* ======================================================================
   * Landing
   * ====================================================================== */
  var TABS = [
    { k: "section", label: "Section lẻ", icon: "list" },
    { k: "full", label: "Full đề", icon: "headphones" },
    { k: "clips", label: "Audio thật", icon: "volume" },
    { k: "dictation", label: "Dictation", icon: "edit" },
    { k: "analysis", label: "Phân tích dạng bài", icon: "bar-chart" }
  ];
  function landingHtml(p) {
    var tab = TABS.some(function (t) { return t.k === p.tab; }) ? p.tab : "section";
    var body = tab === "section" ? sectionTab(p) : tab === "full" ? fullTab() : tab === "clips" ? clipsTab() : tab === "dictation" ? dictTab() : X().ui.analysisHtml("listening");
    var nSec = allSections().length;
    return '<div class="page-head"><div><div class="page-kicker">Luyện tập · Listening</div><h1 class="page-title">Listening</h1>' +
      '<p class="page-sub">Giao diện thi trên máy như CD-IELTS · audio đọc bằng giọng máy (Web Speech)' + (clips().length ? " · " + clips().length + " bài audio thật" : "") + "</p></div>" +
      '<div class="page-actions"><span class="pill sk">' + tests().length + " đề · " + nSec + " section</span>" +
      '<span class="pill muted">' + lessons().length + " bài dictation</span></div></div>" +
      '<div class="tabs pr-tabs" role="tablist">' + TABS.map(function (t) {
        return '<button type="button" class="tab' + (t.k === tab ? " active" : "") + '" role="tab" aria-selected="' + (t.k === tab) + '" data-la="tab" data-tab="' + t.k + '">' + ic(t.icon, 16) + " " + t.label + "</button>";
      }).join("") + "</div>" +
      '<div class="pr-tabbody">' + body + "</div>";
  }
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
  function sectionTab(p) {
    var all = allSections();
    if (!all.length) return emptyCard("🎧", "Chưa có đề Listening", "Dữ liệu đề đang được bổ sung. Bạn có thể luyện Dictation trong lúc chờ nhé.");
    var present = [];
    all.forEach(function (x) { toArr(x.section.groups).forEach(function (g) { if (g.type && present.indexOf(g.type) < 0) present.push(g.type); }); });
    var order = X().qtypeKeys("listening");
    present.sort(function (a, b) { return (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99); });
    var type = p.type && present.indexOf(p.type) >= 0 ? p.type : (p.type || "");
    var chips = '<div class="pr-filter"><span class="pr-filter-l">' + ic("filter", 15) + ' Dạng bài</span><button type="button" class="chip' + (!type ? " active" : "") + '" data-la="type" data-type="">Tất cả</button>' +
      present.map(function (k) { return '<button type="button" class="chip' + (type === k ? " active" : "") + '" data-la="type" data-type="' + esc(k) + '">' + esc(X().qtype("listening", k).name) + "</button>"; }).join("") + "</div>";
    var list = all.filter(function (x) { return !type || toArr(x.section.groups).some(function (g) { return g.type === type; }); });
    var byTest = {}, ord = [];
    list.forEach(function (x) { if (!byTest[x.test.id]) { byTest[x.test.id] = []; ord.push(x.test); } byTest[x.test.id].push(x); });
    var body = list.length ? ord.map(function (t) {
      return '<div class="pr-testgroup"><h3 class="pr-testgroup-title">' + esc(t.title) + '<span class="tiny muted"> · ' + esc(t.source || "") + '</span></h3><div class="grid g-auto pr-cards">' +
        byTest[t.id].map(function (x) { return sectionCard(x.test, x.section); }).join("") + "</div></div>";
    }).join("") : emptyCard("🔎", "Không có section nào chứa dạng này", "Thử chọn dạng khác hoặc bấm “Tất cả”.");
    return chips + body;
  }
  function sectionCard(t, s) {
    var h = X().ui.historyFor("listening", s.id, ["section"]);
    var n = qNums(s).length;
    return '<article class="card clickable pr-card sk-listening" tabindex="0" data-la="open-section" data-id="' + esc(s.id) + '">' +
      '<div class="pr-card-top"><span class="pill sk">Part ' + esc(s.part) + '</span><span class="tiny muted">' + esc(t.title) + "</span>" + draftBadge("exam:" + s.id) + "</div>" +
      '<h3 class="pr-card-title">' + esc(s.title || "Section " + s.part) + "</h3>" +
      (s.context ? '<p class="small muted pr-ctx">' + esc(s.context) + "</p>" : "") +
      '<div class="pr-types">' + X().ui.typePills(s.groups, "listening") + "</div>" +
      '<div class="pr-card-foot"><span>' + ic("list", 14) + " " + n + " câu</span><span>" + bestLine(h, false) + "</span></div>" +
      (h.last && h.last.detail && Array.isArray(h.last.detail.results) ? '<button type="button" class="pr-link" data-la="last" data-id="' + esc(s.id) + '">Xem kết quả gần nhất →</button>' : "") +
      "</article>";
  }
  function fullTab() {
    var ts = tests();
    if (!ts.length) return emptyCard("🎧", "Chưa có full đề", "Dữ liệu đề đang được bổ sung.");
    return '<div class="grid g-2 pr-cards">' + ts.map(function (t) {
      var h = X().ui.historyFor("listening", t.id, ["full"]);
      var n = 0; toArr(t.sections).forEach(function (s) { n += qNums(s).length; });
      return '<article class="card clickable tape pr-card pr-fullcard sk-listening" tabindex="0" data-la="open-full" data-id="' + esc(t.id) + '">' +
        '<div class="pr-card-top"><span class="pill sk">Full test</span><span class="tiny muted">' + esc(t.source || "") + "</span>" + draftBadge("exam:" + t.id) + "</div>" +
        '<h3 class="pr-card-title">' + esc(t.title) + "</h3>" +
        '<ol class="pr-partlist">' + toArr(t.sections).map(function (s) { return "<li><b>Part " + esc(s.part) + "</b> " + esc(s.title || "") + "</li>"; }).join("") + "</ol>" +
        '<div class="pr-card-foot"><span>' + ic("clock", 14) + " " + n + " câu · ~" + estMins(t.sections, true) + " phút</span><span>" + bestLine(h, true) + "</span></div>" +
        (h.last && h.last.detail && Array.isArray(h.last.detail.results) ? '<button type="button" class="pr-link" data-la="last" data-id="' + esc(t.id) + '">Xem kết quả gần nhất →</button>' : "") +
        "</article>";
    }).join("") + "</div>";
  }
  function clipsTab() {
    var cs = clips();
    if (!cs.length) {
      return emptyCard("📻", "Chưa có bài nghe audio thật",
        "Bài nghe audio thật (podcast, bản tin… kèm câu hỏi) được tải về máy mỗi ngày cùng lúc với tự động cập nhật. " +
        "Muốn tải ngay: bấm đúp tệp <b>scripts/cap-nhat-ngay.cmd</b> trong thư mục app, đợi chạy xong rồi tải lại trang (F5). " +
        "Nếu chưa bật tự động cập nhật, hãy bấm đúp <b>scripts/cai-dat-tu-dong-cap-nhat.cmd</b> một lần.");
    }
    var lvLabel = { easy: "Dễ", medium: "Trung bình", hard: "Khó" };
    return '<p class="small muted pr-dict-intro">Luyện nghe bằng audio thật (giọng người bản xứ, tốc độ tự nhiên). Chế độ luyện cho phép tạm dừng, tua và chỉnh tốc độ 0.75×–1.25×. Kết quả tính như một section lẻ (chỉ accuracy, không quy ra band).</p>' +
      '<div class="grid g-auto pr-cards">' + cs.map(function (c) {
        var h = X().ui.historyFor("listening", c.id, ["section"]);
        var n = qNums(clipSection(c)).length;
        return '<article class="card clickable pr-card sk-listening" tabindex="0" data-la="open-clip" data-id="' + esc(c.id) + '">' +
          '<div class="pr-card-top">' + (c.level ? '<span class="pill sk">' + esc(lvLabel[c.level] || c.level) + "</span>" : "") +
          (c.topic ? '<span class="pill muted">' + esc(X().ui.topicName(c.topic)) + "</span>" : "") + draftBadge("exam:" + c.id) + "</div>" +
          '<h3 class="pr-card-title">' + esc(c.title || c.id) + "</h3>" +
          (c.source ? '<p class="tiny muted pr-ctx">' + esc(c.source) + "</p>" : "") +
          (c.context ? '<p class="small muted pr-ctx">' + esc(c.context) + "</p>" : "") +
          '<div class="pr-types">' + X().ui.typePills(c.groups, "listening") + "</div>" +
          '<div class="pr-card-foot"><span>' + ic("clock", 14) + " " + (c.duration ? esc(c.duration) + " · " : "") + n + " câu</span><span>" + bestLine(h, false) + "</span></div>" +
          (h.last && h.last.detail && Array.isArray(h.last.detail.results) ? '<button type="button" class="pr-link" data-la="last" data-id="' + esc(c.id) + '">Xem kết quả gần nhất →</button>' : "") +
          "</article>";
      }).join("") + "</div>";
  }
  var LEVELS = [{ k: "easy", label: "Dễ", emoji: "🌱" }, { k: "medium", label: "Trung bình", emoji: "🌿" }, { k: "hard", label: "Khó", emoji: "🌳" }];
  function dprog(id) {
    if (!I.state) return { index: 0, done: false, best: 0 };
    if (!I.state.dictationProgress) I.state.dictationProgress = {};
    var p = I.state.dictationProgress[id];
    if (!p) p = I.state.dictationProgress[id] = { index: 0, done: false, best: 0 };
    return p;
  }
  function peekProg(id) { return (I.state && I.state.dictationProgress && I.state.dictationProgress[id]) || null; }
  function dictTab() {
    var ls = lessons();
    if (!ls.length) return emptyCard("✍️", "Chưa có bài dictation", "Dữ liệu đang được bổ sung.");
    var known = LEVELS.map(function (l) { return l.k; });
    var groups = LEVELS.concat(ls.some(function (l) { return known.indexOf(l.level) < 0; }) ? [{ k: "_other", label: "Khác", emoji: "📝" }] : []);
    return '<p class="small muted pr-dict-intro">Nghe từng câu, gõ lại chính xác. Bấm <span class="kbd">Ctrl</span> để nghe lại, <span class="kbd">Enter</span> để kiểm tra.</p>' +
      groups.map(function (lv) {
        var items = ls.filter(function (l) { return lv.k === "_other" ? known.indexOf(l.level) < 0 : l.level === lv.k; });
        if (!items.length) return "";
        return '<div class="pr-testgroup"><h3 class="pr-testgroup-title">' + lv.emoji + " " + lv.label + ' <span class="tiny muted">· ' + items.length + " bài</span></h3>" +
          '<div class="grid g-auto pr-cards">' + items.map(function (l) {
            var pr = peekProg(l.id) || { index: 0, done: false, best: 0 }, N = toArr(l.sentences).length;
            var pct = pr.done ? 100 : N ? Math.round((pr.index || 0) / N * 100) : 0;
            return '<article class="card clickable pr-card pr-dictcard sk-listening" tabindex="0" data-la="open-dict" data-id="' + esc(l.id) + '">' +
              '<div class="pr-card-top"><span class="pill muted">' + esc(X().ui.topicName(l.topic)) + "</span>" + (pr.done ? '<span class="pill good">' + ic("check", 13) + " Hoàn thành</span>" : pr.index ? '<span class="pill warn">Đang học</span>' : "") + "</div>" +
              '<h3 class="pr-card-title">' + esc(l.title) + "</h3>" +
              '<div class="progress"><div class="progress-bar" style="width:' + pct + '%"></div></div>' +
              '<div class="pr-card-foot"><span>' + N + " câu</span><span>" + (pr.best ? "Tốt nhất " + Math.round(pr.best) + "%" : pr.index ? "Câu " + (pr.index + 1) + "/" + N : '<span class="muted">Chưa làm</span>') + "</span></div></article>";
          }).join("") + "</div></div>";
      }).join("");
  }
  function showLanding(p) {
    cleanupView();
    V.host.innerHTML = landingHtml(p || {});
  }

  /* ======================================================================
   * Pre-start
   * ====================================================================== */
  function refInfo(kind, id) {
    if (kind === "clip") {
      var c = findClip(id); if (!c) return null;
      return { kind: kind, id: id, clip: c, test: { id: c.id, title: c.title || c.id, source: c.source || "" }, secs: [clipSection(c)], title: c.title || c.id, sub: c.source || "" };
    }
    if (kind === "section") {
      var x = findSection(id); if (!x) return null;
      return { kind: kind, id: id, test: x.test, secs: [x.section], title: x.test.title + " — Part " + x.section.part, sub: x.section.title || "" };
    }
    var t = findTest(id); if (!t) return null;
    return { kind: "full", id: id, test: t, secs: toArr(t.sections), title: t.title + " — Full test", sub: t.source || "" };
  }
  function openPrestart(kind, id) {
    cleanupView();
    var ref = refInfo(kind, id);
    if (!ref) { toast("Không tìm thấy bài " + id, "warn"); showLanding({ tab: tabOf(kind) }); return; }
    var key = "exam:" + id, draft = X().loadDraft(key), tok = V.token;
    var nq = 0, groups = [];
    ref.secs.forEach(function (s) { nq += qNums(s).length; toArr(s.groups).forEach(function (g) { groups.push(g); }); });
    var mins = (kind === "clip" && durMins(ref.clip.duration)) ? durMins(ref.clip.duration) + 1 : estMins(ref.secs, kind === "full");
    var hasAudio = ref.secs.every(function (s) { return !!s.audio; });
    V.host.innerHTML =
      '<div class="pr-pre">' +
      '<button type="button" class="btn ghost sm" data-la="back" data-tab="' + tabOf(kind) + '">' + ic("chevron-left", 16) + " Danh sách</button>" +
      '<div class="card tape pad-lg pr-pre-card sk-listening">' +
      '<div class="page-kicker">' + (kind === "full" ? "Full đề · 4 Part" : kind === "clip" ? "Audio thật" + (ref.clip.duration ? " · " + esc(ref.clip.duration) : "") : "Section lẻ") + "</div>" +
      '<h2 class="pr-pre-title">' + esc(ref.title) + "</h2>" +
      (ref.sub ? '<p class="muted">' + esc(ref.sub) + "</p>" : "") +
      (kind !== "full" && ref.secs[0].context ? '<p class="small">' + esc(ref.secs[0].context) + "</p>" : "") +
      (kind === "clip" && /^https?:\/\//i.test(String(ref.clip.sourceUrl || "")) ? '<p class="tiny"><a href="' + esc(ref.clip.sourceUrl) + '" target="_blank" rel="noopener">Nguồn bài nghe ' + ic("external-link", 12) + "</a></p>" : "") +
      '<div class="pr-pre-facts"><span>' + ic("list", 15) + " " + nq + " câu</span><span>" + ic("clock", 15) + " ~" + mins + " phút</span><span>" + ic("headphones", 15) + " " + (hasAudio ? "File audio" : "Giọng đọc máy") + "</span></div>" +
      '<div class="pr-types">' + X().ui.typePills(groups, "listening") + "</div>" +
      (kind !== "full" ? '<div class="pr-mode"><div class="field-label">Chế độ</div><div class="seg" role="group">' +
        '<button type="button" class="active" data-la="mode" data-mode="exam">' + ic("target", 15) + " Chế độ thi</button>" +
        '<button type="button" data-la="mode" data-mode="practice">' + ic("rotate-ccw", 15) + " Chế độ luyện</button></div>" +
        '<p class="tiny muted" data-role="mode-note">Audio phát một lần, không tạm dừng/tua lại — giống thi thật.</p></div>' : "") +
      '<ul class="pr-rules">' +
      "<li>30 giây đọc câu hỏi trước " + (kind === "clip" ? "khi phát audio" : "mỗi Part") + " (có nút “Bắt đầu nghe ngay”).</li>" +
      (kind === "clip" ? "<li>Chế độ luyện: được tạm dừng, tua và chỉnh tốc độ 0.75×–1.25×. Nếu không phát được file audio, app chuyển sang giọng đọc máy.</li>" : "") +
      (kind === "full" ? "<li>Audio phát một lần cho cả 4 Part, không tua lại. Sau Part 4 có 2 phút kiểm tra rồi tự nộp bài.</li>" : "<li>Chế độ thi: sau khi audio kết thúc có 1 phút kiểm tra rồi tự nộp bài.</li>") +
      "<li>Transcript chỉ hiện sau khi nộp bài. Bài làm được lưu nháp — tải lại trang không mất đáp án.</li></ul>" +
      '<div class="pr-tts" data-role="tts"><span class="pr-spin"></span> Đang kiểm tra giọng đọc tiếng Anh…</div>' +
      (draft ? '<div class="pr-resume"><div><b>Bạn có bài làm dở</b><div class="small muted">' + esc(X().draftSummary(draft)) + (draft.meta && draft.meta.transcript ? " · chế độ transcript" : "") + "</div></div>" +
        '<div class="row wrap"><button type="button" class="btn primary" data-la="resume" disabled>' + ic("play", 16) + " Tiếp tục</button>" +
        '<button type="button" class="btn ghost" data-la="restart" disabled>Làm lại từ đầu</button></div></div>' : "") +
      '<div class="row wrap pr-pre-actions">' +
      (draft ? "" : '<button type="button" class="btn primary lg" data-la="start" disabled>' + ic("play", 18) + " Bắt đầu làm bài</button>") +
      '<button type="button" class="btn ghost" data-la="soundcheck" disabled>' + ic("volume", 16) + " Nghe thử</button></div>" +
      '<p class="tiny muted">Mẹo: đeo tai nghe, đặt âm lượng vừa phải. Giọng máy có thể khác giọng thi thật — hãy coi đây là luyện kỹ năng.</p>' +
      "</div></div>";
    V.pre = { kind: kind, id: id, practice: false, ttsOk: hasAudio, draft: draft };
    var done = function (ok) {
      if (!V || V.token !== tok) return;
      V.pre.ttsOk = ok;
      var box = V.host.querySelector("[data-role=tts]");
      if (box) {
        box.className = "pr-tts " + (ok ? "is-ok" : "is-bad");
        box.innerHTML = ok
          ? ic("check", 16) + (hasAudio ? " Sẵn sàng phát file audio." : " Giọng đọc sẵn sàng (" + ((I.tts.voices && I.tts.voices().length) || 1) + " giọng tiếng Anh).")
          : '<div><b>' + ic("alert-triangle", 16) + " Trình duyệt chưa có giọng đọc tiếng Anh</b>" +
            '<p class="small">Listening cần Web Speech API. Hãy mở bằng <b>Microsoft Edge</b> hoặc <b>Google Chrome</b>; trên Windows có thể cài thêm giọng tại Settings → Time &amp; Language → Speech → Add voices (English). Sau đó tải lại trang.</p>' +
            '<p class="small">Trong lúc chờ, bạn vẫn luyện được bằng <b>chế độ đọc transcript</b> (đọc lời thoại và trả lời — không tính vào thống kê dạng bài).</p>' +
            '<button type="button" class="btn sk" data-la="transcript">' + ic("book-open", 16) + " Chế độ đọc transcript</button></div>";
      }
      Array.prototype.forEach.call(V.host.querySelectorAll("[data-la=start],[data-la=soundcheck],[data-la=restart]"), function (b) { b.disabled = !ok; });
      var rb = V.host.querySelector("[data-la=resume]");
      if (rb) rb.disabled = !ok && !(draft && draft.meta && draft.meta.transcript);
      if (!ok && draft && !(draft.meta && draft.meta.transcript)) { var rs = V.host.querySelector("[data-la=restart]"); if (rs) rs.disabled = false; }
    };
    if (hasAudio) done(true); else checkTts().then(done);
  }

  /* ======================================================================
   * Exam
   * ====================================================================== */
  function transcriptPane(s) {
    return '<h2 class="ex-ptitle">Transcript — ' + esc(secLabel(s)) + "</h2>" + (s.context ? '<p class="ex-pctx">' + esc(s.context) + "</p>" : "") +
      toArr(s.script).map(function (l) { return '<p class="ex-tline"><b>' + esc(l.speaker || "") + ":</b> " + esc(l.text) + "</p>"; }).join("");
  }
  function startExam(kind, id, opt) {
    opt = opt || {};
    var ref = refInfo(kind, id);
    if (!ref) return;
    cleanupView();
    var key = "exam:" + id;
    var draft = opt.resume || null;
    if (!draft) X().clearDraft(key);
    var meta = draft && draft.meta ? draft.meta : { kind: kind, practice: !!opt.practice, transcript: !!opt.transcript, phase: 0, line: 0, audioTime: 0, volume: 1 };
    var practice = !!meta.practice, transcript = !!meta.transcript;
    var secs = ref.secs;
    var parts = secs.map(function (s) {
      var ns = qNums(s);
      return { id: s.id, title: s.title || "", label: secLabel(s), groups: toArr(s.groups),
        sub: transcript ? "Đọc transcript và trả lời câu hỏi " + ns[0] + "–" + ns[ns.length - 1] + "." : "Listen and answer questions " + (ns[0] || "") + "–" + (ns[ns.length - 1] || "") + ".",
        passageHtml: transcript ? transcriptPane(s) : null };
    });
    var title = ref.title + (practice ? " · luyện" : "") + (transcript ? " · transcript" : "");
    var pStart = api("beginPractice", "listening");
    api("enterExamMode");
    var run = { token: 0, stopped: false, paused: false, audio: null, volume: meta.volume != null ? +meta.volume : 1, onDone: null, sec: null,
      broken: {}, srcIdx: {}, speed: practice && meta.speed ? +meta.speed : 1 };
    /* true while this section is being played from a real audio file (not the TTS fallback) */
    function realAudio(sec) { return !!(sec && sec.audio && !run.broken[sec.id] && audioSrcs(sec.audio).length); }
    var ctl;
    var leaveGuard = function () {
      if (!ctl || ctl.isSubmitted()) return true;
      return typeof I.confirm === "function" ? I.confirm("Bạn đang làm bài thi. Rời trang? Đáp án đã lưu nháp, nhưng audio sẽ dừng.", { okLabel: "Rời trang" }) : true;
    };
    ctl = X().start(V.host, {
      key: key, skill: "listening", title: title, parts: parts, layout: transcript ? "split" : "single",
      draft: draft, meta: meta, timer: null, highlighter: transcript, fontSize: transcript,
      onSubmit: function (res) { finish(res); },
      onExit: function () {
        var p = typeof I.confirm === "function" ? I.confirm("Thoát bài thi? Đáp án được lưu nháp; khi quay lại bạn có thể tiếp tục.", { okLabel: "Thoát" }) : Promise.resolve(true);
        p.then(function (ok) { if (ok) { ctl.save(); I.confirmLeave = null; openPrestart(kind, id); } });
      }
    });
    meta = ctl.state.meta;
    V.ctl = ctl;
    I.confirmLeave = leaveGuard;
    onView(function () {
      stopAudio();
      ctl.destroy();
      api("exitExamMode");
      if (I.confirmLeave === leaveGuard) I.confirmLeave = null;
    });

    if (transcript) { ctl.setClock(ic("book-open", 16) + " Chế độ đọc transcript"); return; }

    var phases = [];
    secs.forEach(function (s, p) { phases.push({ t: "read", p: p, secs: 30 }); phases.push({ t: "play", p: p }); });
    if (!practice) phases.push({ t: "check", secs: kind === "full" ? 120 : 60 });
    phases.push({ t: "done" });

    /* ---- audio ---- */
    function stopAudio() {
      run.stopped = true; run.token++;
      try { if (I.tts && I.tts.stop) I.tts.stop(); } catch (e) { /* ignore */ }
      if (run.audio) { try { run.audio.pause(); } catch (e) { /* ignore */ } }
    }
    function haltForRestart() {
      run.token++;
      try { if (I.tts && I.tts.stop) I.tts.stop(); } catch (e) { /* ignore */ }
      if (run.audio) { try { run.audio.pause(); } catch (e) { /* ignore */ } }
    }
    function audioError(retry) {
      ctl.setAudio('<span class="ex-au-state is-err">' + ic("alert-triangle", 15) + ' Không phát được âm thanh</span><button type="button" class="ex-tbtn" data-au="retry">' + ic("rotate-ccw", 14) + " Thử lại</button>");
      run.retry = retry;
    }
    function play(sec, from, onDone) {
      haltForRestart();
      var token = run.token;
      run.stopped = false; run.paused = false; run.sec = sec; run.onDone = onDone;
      setTimeout(function () {
        if (token !== run.token || run.stopped) return;
        if (realAudio(sec)) {
          var srcs = audioSrcs(sec.audio), si = Math.min(run.srcIdx[sec.id] || 0, srcs.length - 1), src = srcs[si];
          var a = run.audio && run.audio.getAttribute("data-src") === src ? run.audio : new Audio(src);
          if (a !== run.audio && run.audio) { try { run.audio.pause(); run.audio.onerror = null; } catch (e) { /* ignore */ } }
          a.setAttribute("data-src", src);
          a.preload = "auto";
          run.audio = a;
          a.volume = run.volume;
          a.playbackRate = practice ? run.speed : 1;
          a.onended = function () { if (token === run.token) { meta.audioTime = 0; onDone(); } };
          a.ontimeupdate = function () { if (token === run.token) { meta.audioTime = a.currentTime; seekUi(); ctl.touch(); } };
          a.onloadedmetadata = function () { if (token === run.token) seekUi(); };
          a.onerror = function () {
            if (token !== run.token) return;
            try { a.pause(); } catch (e) { /* ignore */ }
            if (si + 1 < srcs.length) { run.srcIdx[sec.id] = si + 1; run.audio = null; play(sec, from, onDone); return; } // local copy missing → remote URL
            run.broken[sec.id] = true; run.audio = null;
            meta.audioTime = 0;
            if (toArr(sec.script).length) { toast("Không phát được file audio — chuyển sang giọng đọc máy.", "warn"); audioUi("play", phases[meta.phase]); play(sec, 0, onDone); }
            else audioError(function () { run.broken[sec.id] = false; run.srcIdx[sec.id] = 0; play(sec, 0, onDone); });
          };
          /* also seeks back to 0 on "replay"/"back" when the element is reused (it would otherwise keep its position) */
          var startAt = function () { try { var t = +meta.audioTime || 0; if (Math.abs((a.currentTime || 0) - t) > 0.25) a.currentTime = t; } catch (e) { /* ignore */ } };
          if (a.readyState >= 1) startAt(); else a.addEventListener("loadedmetadata", startAt, { once: true });
          var pr = a.play();
          /* a missing file rejects play() too — that case is handled by onerror; only autoplay blocks need a manual retry */
          if (pr && pr.catch) pr.catch(function (err) { if (token === run.token && err && err.name === "NotAllowedError") audioError(function () { play(sec, from, onDone); }); });
          return;
        }
        var lines = toArr(sec.script).slice(from || 0);
        if (!lines.length || !I.tts || typeof I.tts.playScript !== "function") { if (!lines.length) onDone(); else audioError(function () { play(sec, from, onDone); }); return; }
        I.tts.playScript(lines, {
          rate: rate(), volume: run.volume,
          onLine: function (i) { if (token === run.token) { meta.line = (from || 0) + i; ctl.touch(); } },
          shouldContinue: function () { return token === run.token && !run.stopped; }
        }).then(function (ok) {
          if (token !== run.token || run.stopped) return;
          if (ok === false && I.tts.available && !I.tts.available()) { audioError(function () { play(sec, meta.line || 0, onDone); }); return; }
          meta.line = 0; onDone();
        }, function () { if (token === run.token && !run.stopped) audioError(function () { play(sec, meta.line || 0, onDone); }); });
      }, 120);
    }
    function volHtml() {
      return '<label class="ex-vol" title="Âm lượng">' + ic("volume", 16) + '<input type="range" min="0" max="1" step="0.1" value="' + run.volume + '" data-au="vol" aria-label="Âm lượng"></label>';
    }
    function mmss(t) { t = Math.max(0, Math.floor(+t || 0)); return Math.floor(t / 60) + ":" + (t % 60 < 10 ? "0" : "") + (t % 60); }
    /* keeps the seek bar/time label in sync without re-rendering the whole audio bar */
    function seekUi() {
      var a = run.audio, box = ctl.el.querySelector("[data-role=audio]");
      if (!a || !box) return;
      var r = box.querySelector("[data-au=seek]"), t = box.querySelector("[data-au-time]");
      var dur = isFinite(a.duration) ? a.duration : 0;
      if (r && document.activeElement !== r) { r.max = String(Math.max(1, Math.floor(dur))); r.value = String(Math.floor(a.currentTime || 0)); }
      if (t) t.textContent = mmss(a.currentTime) + (dur ? " / " + mmss(dur) : "");
    }
    function realControls() {
      var a = run.audio, dur = a && isFinite(a.duration) ? a.duration : 0, cur = a ? a.currentTime || 0 : 0;
      return '<input type="range" class="ex-seek" min="0" max="' + Math.max(1, Math.floor(dur)) + '" step="1" value="' + Math.floor(cur) + '" data-au="seek" aria-label="Tua audio" style="width:120px">' +
        '<span class="tiny mono" data-au-time>' + mmss(cur) + (dur ? " / " + mmss(dur) : "") + "</span>" +
        [0.75, 1, 1.25].map(function (v) {
          return '<button type="button" class="ex-tbtn' + (run.speed === v ? " ex-tbtn-hi" : "") + '" data-au="speed" data-v="' + v + '" title="Tốc độ ' + v + '×" aria-pressed="' + (run.speed === v) + '">' + v + "×</button>";
        }).join("");
    }
    function audioUi(state, ph) {
      var s = "";
      if (state === "read") {
        s = '<span class="ex-au-state">' + ic("headphones", 15) + " Sắp phát " + esc(secLabel(secs[ph.p])) + "</span>" +
          '<button type="button" class="ex-tbtn ex-tbtn-hi" data-au="skip">' + ic("play", 14) + " Bắt đầu nghe ngay</button>";
      } else if (state === "play") {
        s = '<span class="ex-au-state is-live"><span class="ex-eq"><i></i><i></i><i></i></span> ' + (run.paused ? "Tạm dừng" : "Đang phát") + "</span>" +
          (practice ? '<button type="button" class="ex-tbtn" data-au="back" title="Lùi một câu">' + ic("chevron-left", 14) + '</button>' +
            '<button type="button" class="ex-tbtn" data-au="pause">' + (run.paused ? ic("play", 14) + " Tiếp" : ic("pause", 14) + " Dừng") + "</button>" +
            '<button type="button" class="ex-tbtn" data-au="replay" title="Nghe lại Part này từ đầu">' + ic("rotate-ccw", 14) + "</button>" +
            (realAudio(run.sec) ? realControls() : "") : "");
      } else {
        s = '<span class="ex-au-state">' + ic("check", 15) + " Đã phát xong</span>" +
          (practice ? '<button type="button" class="ex-tbtn" data-au="replay-view">' + ic("rotate-ccw", 14) + (kind === "clip" ? " Nghe lại audio" : " Nghe lại Part đang xem") + "</button>" : "");
      }
      ctl.setAudio(s + volHtml());
    }
    ctl.el.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-au]");
      if (!b) return;
      var a = b.getAttribute("data-au"), ph = phases[meta.phase];
      if (a === "skip" && ph && ph.t === "read") { ctl.stopCountdown(); runPhase(meta.phase + 1); }
      else if (a === "retry" && run.retry) { var f = run.retry; run.retry = null; audioUi("play", ph); f(); }
      else if (a === "pause" && practice) {
        run.paused = !run.paused;
        if (run.audio && realAudio(run.sec)) { if (run.paused) run.audio.pause(); else { var rp = run.audio.play(); if (rp && rp.catch) rp.catch(function () { /* onerror handles it */ }); } }
        else if (run.paused) I.tts.pause(); else I.tts.resume();
        audioUi("play", ph);
      } else if (a === "back" && practice && run.sec) {
        if (run.audio && realAudio(run.sec)) { meta.audioTime = Math.max(0, (run.audio.currentTime || 0) - 8); play(run.sec, 0, run.onDone); }
        else play(run.sec, Math.max(0, (meta.line || 0) - 1), run.onDone);
        audioUi("play", ph);
      } else if (a === "replay" && practice && run.sec) { meta.line = 0; meta.audioTime = 0; play(run.sec, 0, run.onDone); audioUi("play", ph); }
      else if (a === "speed" && practice) {
        run.speed = Math.min(1.25, Math.max(0.75, +b.getAttribute("data-v") || 1));
        meta.speed = run.speed;
        if (run.audio) { try { run.audio.playbackRate = run.speed; } catch (er) { /* ignore */ } }
        ctl.touch();
        audioUi("play", ph);
      }
      else if (a === "replay-view" && practice) {
        var sec = secs[ctl.state.part];
        meta.line = 0; meta.audioTime = 0;
        run.sec = sec;
        audioUi("play", ph);
        play(sec, 0, function () { audioUi("done"); });
      }
    });
    ctl.el.addEventListener("input", function (e) {
      if (e.target.matches && e.target.matches("[data-au=seek]")) {
        if (!practice || !run.audio || !realAudio(run.sec)) return;
        try { run.audio.currentTime = +e.target.value || 0; meta.audioTime = run.audio.currentTime; } catch (er) { /* ignore */ }
        seekUi(); ctl.touch();
        return;
      }
      if (!e.target.matches || !e.target.matches("[data-au=vol]")) return;
      run.volume = +e.target.value; meta.volume = run.volume;
      if (run.audio) run.audio.volume = run.volume;
      ctl.touch();
    });

    function runPhase(i, remaining) {
      if (ctl.isSubmitted() || !V || V.ctl !== ctl) return;
      var ph = phases[Math.min(i, phases.length - 1)];
      meta.phase = Math.min(i, phases.length - 1);
      if (ph.t === "read") {
        if (!remaining) { meta.line = 0; meta.audioTime = 0; }
        ctl.setPart(ph.p);
        audioUi("read", ph);
        ctl.startCountdown(remaining || ph.secs, function () { runPhase(meta.phase + 1); }, { label: "Đọc câu hỏi " + secLabel(secs[ph.p]) });
      } else if (ph.t === "play") {
        ctl.setClock('<span class="ex-live-dot"></span><span class="ex-clock-l">Đang phát</span><b class="ex-clock-t">' + esc(secLabel(secs[ph.p])) + "</b>", "is-live");
        if (ctl.state.part !== ph.p && !remaining) ctl.setPart(ph.p);
        run.sec = secs[ph.p];
        audioUi("play", ph);
        play(secs[ph.p], meta.line || 0, function () { runPhase(meta.phase + 1); });
      } else if (ph.t === "check") {
        audioUi("done");
        ctl.startCountdown(remaining || ph.secs, function () { toast("Hết thời gian kiểm tra — bài đã được nộp tự động.", "info"); ctl.submit(true); }, { label: "Thời gian kiểm tra", warnAt: 30 });
      } else {
        ctl.setClock(ic("check", 16) + ' <span class="ex-clock-l">Đã phát xong — kiểm tra và bấm Nộp bài</span>');
        audioUi("done");
      }
      ctl.save();
    }
    if (draft) {
      var ph0 = phases[Math.min(meta.phase || 0, phases.length - 1)];
      var rem = ph0 && (ph0.t === "read" || ph0.t === "check") && typeof draft.remaining === "number" && draft.remaining > 0 ? draft.remaining : null;
      runPhase(meta.phase || 0, rem || (ph0 && ph0.t === "play" ? 1 : null));
    } else runPhase(0);

    function finish(res) {
      stopAudio();
      api("endPractice", pStart);
      api("exitExamMode");
      I.confirmLeave = null;
      var full = kind === "full";
      var band = full && res.total === 40 ? api("bandFromRaw", "listening", res.raw) : null;
      if (band === undefined) band = null;
      var sub = {
        skill: "listening", kind: full ? "full" : "section", refId: id, title: ref.title + (transcript ? " (transcript)" : ""),
        seconds: res.seconds, clientKey: res.clientKey,
        score: { raw: res.raw, total: res.total, accuracy: res.accuracy, band: band, bandSource: band != null ? "full-test table" : null, criteria: null, status: "graded" },
        detail: { answers: res.answers, results: res.results }
      };
      if (kind === "clip") sub.detail.source = "clip";
      if (practice) sub.detail.notes = "Chế độ luyện (được tạm dừng / nghe lại)";
      if (transcript) { delete sub.detail.results; sub.detail.notes = "Chế độ đọc transcript — không tính vào thống kê dạng bài"; }
      var stored = api("recordSubmission", sub) || sub;
      showResults({ ref: ref, res: res, stored: stored, transcript: transcript, practice: practice });
    }
  }

  /* ======================================================================
   * Results
   * ====================================================================== */
  function transcriptHtml(sec, wrong) {
    return toArr(sec.script).map(function (l) {
      var qs = toArr(l.q).map(Number);
      var isW = qs.some(function (q) { return wrong[q]; });
      return '<p class="tl' + (isW ? " tl-wrong" : qs.length ? " tl-ev" : "") + '" data-tl=" ' + qs.join(" ") + ' ">' +
        '<span class="tl-sp">' + esc(l.speaker || "") + "</span>" + '<span class="tl-tx">' + esc(l.text) + "</span>" +
        (qs.length ? '<span class="tl-q">' + qs.map(function (q) { return "Q" + q; }).join(" ") + "</span>" : "") + "</p>";
    }).join("");
  }
  function showResults(ctx) {
    cleanupView();
    var ref = ctx.ref, res = ctx.res, stored = ctx.stored || {};
    var full = ref.kind === "full";
    var results = res.results || [];
    var wrong = {};
    results.forEach(function (r) { if (!r.correct) wrong[r.n] = true; });
    var evidence = {};
    ref.secs.forEach(function (s) { toArr(s.script).forEach(function (l) { toArr(l.q).forEach(function (q) { evidence[q] = true; }); }); });
    var band = stored.score ? stored.score.band : null;
    var perPart = full ? '<div class="card"><div class="card-title">Theo từng Part</div><div class="table-wrap"><table class="table"><thead><tr><th>Part</th><th>Nội dung</th><th>Đúng</th><th>Accuracy</th></tr></thead><tbody>' +
      ref.secs.map(function (s) {
        var ns = qNums(s), rs = results.filter(function (r) { return ns.indexOf(r.n) >= 0; }), c = rs.filter(function (r) { return r.correct; }).length;
        var acc = rs.length ? c / rs.length * 100 : 0;
        return "<tr><td><b>Part " + esc(s.part) + "</b></td><td>" + esc(s.title || "") + '</td><td class="mono">' + c + "/" + rs.length + "</td><td>" + X().ui.accBar(acc, acc >= 90 ? "strong" : acc >= 70 ? "improving" : "weak") + "</td></tr>";
      }).join("") + "</tbody></table></div></div>" : "";
    V.host.innerHTML =
      '<div class="pr-results sk-listening">' +
      '<div class="row between wrap pr-res-head"><div class="row wrap"><button type="button" class="btn ghost sm" data-la="back" data-tab="' + tabOf(ref.kind) + '">' + ic("chevron-left", 16) + " Danh sách</button>" +
      '<div><div class="page-kicker">Kết quả · ' + (full ? "Full đề" : ref.kind === "clip" ? "Audio thật" : "Section lẻ") + (ctx.practice ? " · chế độ luyện" : "") + (ctx.transcript ? " · transcript" : "") + '</div><h2 class="pr-res-title">' + esc(ref.title) + "</h2></div></div>" +
      '<div class="row wrap"><button type="button" class="btn sk" data-la="redo">' + ic("rotate-ccw", 16) + " Làm lại</button></div></div>" +
      (stored.repeat ? '<div class="pr-note">' + ic("rotate-ccw", 15) + " <b>Làm lại</b> — bạn đã làm bài này trước đó nên lần này không tính thêm vào thống kê dạng bài.</div>" : "") +
      (ctx.transcript ? '<div class="pr-note">' + ic("book-open", 15) + " Bài làm ở chế độ đọc transcript — không tính vào thống kê dạng bài Listening.</div>" : "") +
      (ctx.fromHistory ? '<div class="pr-note">' + ic("clock", 15) + " Kết quả đã lưu ngày " + esc(I.fmtDay ? I.fmtDay(stored.day, "full") : stored.day) + ".</div>" : "") +
      X().ui.scoreHero({ skill: "listening", raw: res.raw, total: res.total, accuracy: res.accuracy, band: band, showBand: full, seconds: res.seconds, blank: !!stored.blank }) +
      '<div class="grid g-2 pr-res-grid">' + X().ui.typeTable(results, "listening") + perPart + "</div>" +
      '<div class="pr-review-grid"><div class="pr-review-col">' +
      ref.secs.map(function (s) {
        var ns = qNums(s), rs = results.filter(function (r) { return ns.indexOf(r.n) >= 0; });
        return '<h3 class="section-title">' + esc(secLabel(s)) + " — " + esc(s.title || "") + "</h3>" +
          X().renderReview(s.groups, rs, { skill: "listening", evidence: evidence, allowLog: !ctx.fromHistory || true });
      }).join("") + "</div>" +
      '<aside class="pr-transcript-col"><div class="card pr-transcript"><div class="card-title">' + ic("book-open", 16) + ' Transcript</div><p class="tiny muted">Dòng đỏ: chứa đáp án câu bạn làm sai · bấm “Xem trong transcript” để tô vàng bằng chứng.</p>' +
      ref.secs.map(function (s) { return '<h4 class="pr-tr-part">' + esc(secLabel(s)) + "</h4>" + transcriptHtml(s, wrong); }).join("") + "</div></aside></div></div>";
    V.result = { ref: ref, res: res, stored: stored };
    try { window.scrollTo(0, 0); } catch (e) { /* ignore */ }
  }
  function openStoredResult(refId) {
    var kind = findTest(refId) ? "full" : findSection(refId) ? "section" : findClip(refId) ? "clip" : "section";
    var ref = refInfo(kind, refId);
    var h = X().ui.historyFor("listening", refId, [kind === "full" ? "full" : "section"]);
    var s = h.list.filter(function (x) { return x.detail && Array.isArray(x.detail.results); })[0];
    if (!ref || !s) { toast("Chưa có kết quả để xem lại.", "info"); return; }
    var sc = s.score || {};
    showResults({ ref: ref, stored: s, fromHistory: true, practice: false,
      res: { raw: sc.raw, total: sc.total, accuracy: sc.accuracy, results: s.detail.results, answers: s.detail.answers || {}, seconds: s.seconds } });
  }
  function logError(n) {
    if (!V || !V.result) return;
    var ref = V.result.ref, r = (V.result.res.results || []).filter(function (x) { return x.n === n; })[0];
    if (!r) return;
    var idx = {};
    ref.secs.forEach(function (s) { var m = X().buildIndex(s.groups); Object.keys(m).forEach(function (k) { idx[k] = m[k]; }); });
    var hit = idx[n]; if (!hit) return;
    X().openErrorModal({ skill: "listening", group: hit.g, question: hit.q, result: r, source: ref.title + " · " + ref.id }, function () {
      var b = V && V.host.querySelector('[data-logerr="' + n + '"]');
      if (b) { b.disabled = true; b.innerHTML = ic("check", 14) + " Đã ghi"; }
    });
  }
  function showEvidence(ns) {
    var col = V.host.querySelector(".pr-transcript");
    if (!col) return;
    Array.prototype.forEach.call(col.querySelectorAll(".tl-sel"), function (p) { p.classList.remove("tl-sel"); });
    var first = null;
    ns.forEach(function (n) {
      Array.prototype.forEach.call(col.querySelectorAll('[data-tl*=" ' + n + ' "]'), function (p) { p.classList.add("tl-sel"); if (!first) first = p; });
    });
    if (first) { try { first.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) { first.scrollIntoView(); } }
  }

  /* ======================================================================
   * Dictation
   * ====================================================================== */
  var NUMS = { zero: "0", one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", ten: "10", eleven: "11", twelve: "12",
    thirteen: "13", fourteen: "14", fifteen: "15", sixteen: "16", seventeen: "17", eighteen: "18", nineteen: "19", twenty: "20", thirty: "30", forty: "40",
    fifty: "50", sixty: "60", seventy: "70", eighty: "80", ninety: "90", hundred: "100" };
  function dTokens(s) {
    return String(s || "").replace(/[‘’]/g, "'").split(/[\s–—]+|(?<=[a-zA-Z])-(?=[a-zA-Z])/).filter(Boolean).map(function (w) {
      var n = w.toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9'%]+$/g, "").replace(/^'+|'+$/g, "");
      n = n.replace(/,/g, "");
      if (NUMS[n]) n = NUMS[n];
      return { orig: w, norm: n };
    }).filter(function (t) { return t.norm; });
  }
  function dDiff(expected, typed) {
    var a = dTokens(expected), b = dTokens(typed), n = a.length, m = b.length, i, j;
    var L = [];
    for (i = 0; i <= n; i++) { L[i] = []; for (j = 0; j <= m; j++) L[i][j] = 0; }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--) L[i][j] = a[i].norm === b[j].norm ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    var ops = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (a[i].norm === b[j].norm) { ops.push({ t: "eq", a: a[i], b: b[j] }); i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) { ops.push({ t: "del", a: a[i] }); i++; }
      else { ops.push({ t: "ins", b: b[j] }); j++; }
    }
    while (i < n) ops.push({ t: "del", a: a[i++] });
    while (j < m) ops.push({ t: "ins", b: b[j++] });
    // pair adjacent del/ins runs into substitutions
    var out = [], k = 0;
    while (k < ops.length) {
      if (ops[k].t === "eq") { out.push(ops[k++]); continue; }
      var dels = [], ins = [];
      while (k < ops.length && ops[k].t !== "eq") { if (ops[k].t === "del") dels.push(ops[k].a); else ins.push(ops[k].b); k++; }
      var p = Math.min(dels.length, ins.length);
      for (var x = 0; x < p; x++) out.push({ t: "sub", a: dels[x], b: ins[x] });
      for (x = p; x < dels.length; x++) out.push({ t: "del", a: dels[x] });
      for (x = p; x < ins.length; x++) out.push({ t: "ins", b: ins[x] });
    }
    var matched = out.filter(function (o) { return o.t === "eq"; }).length;
    return { ops: out, matched: matched, total: n, correct: matched === n && m === n, a: a, b: b };
  }
  function diffHtml(d, reveal) {
    return d.ops.map(function (o) {
      if (o.t === "eq") return '<span class="dw ok">' + esc(o.a.orig) + "</span>";
      if (o.t === "sub") return '<span class="dw bad"><s>' + esc(o.b.orig) + "</s> <b>" + esc(o.a.orig) + "</b></span>";
      if (o.t === "del") return reveal ? '<span class="dw miss is-rev">' + esc(o.a.orig) + "</span>" : '<span class="dw miss" title="Thiếu một từ">___</span>';
      return '<span class="dw extra"><s>' + esc(o.b.orig) + "</s></span>";
    }).join(" ");
  }
  function openLesson(id) {
    cleanupView();
    var L = findLesson(id);
    if (!L) { toast("Không tìm thấy bài dictation " + id, "warn"); showLanding({ tab: "dictation" }); return; }
    var S = toArr(L.sentences), N = S.length;
    if (!N) { toast("Bài này chưa có câu nào.", "warn"); showLanding({ tab: "dictation" }); return; }
    var prog = dprog(id), dk = "dictation:" + id;
    var dd = X().loadDraft(dk);
    if (!dd) {
      if (prog.done || prog.index >= N) prog.index = 0;
      dd = { scores: {}, clientKey: "dict:" + id + ":" + Date.now().toString(36), startedAt: new Date().toISOString(), secs: 0, hints: 0, reveals: 0, cur: "" };
      X().saveDraft(dk, dd);
    }
    var k = Math.min(prog.index || 0, N - 1), speed = 1, solved = false, revealed = false;
    var pStart = api("beginPractice", "listening");
    var ttsOk = ttsAvailable();
    V.host.innerHTML =
      '<div class="pr-dict sk-listening">' +
      '<div class="row between wrap"><button type="button" class="btn ghost sm" data-la="back" data-tab="dictation">' + ic("chevron-left", 16) + " Danh sách</button>" +
      '<span class="pill muted">' + esc((LEVELS.filter(function (l) { return l.k === L.level; })[0] || { label: L.level || "" }).label) + " · " + esc(X().ui.topicName(L.topic)) + "</span></div>" +
      '<div class="card pad-lg pr-dict-card">' +
      '<div class="pr-dict-head"><div><div class="page-kicker">Dictation</div><h2 class="pr-dict-title">' + esc(L.title) + '</h2></div><div class="pr-dict-count">Câu <b data-d="k"></b>/' + N + "</div></div>" +
      '<div class="progress"><div class="progress-bar" data-d="bar"></div></div>' +
      '<div class="pr-tts is-bad" data-d="nottsbox"' + " hidden" + ">" + ic("alert-triangle", 16) + " Chưa có giọng đọc tiếng Anh trong trình duyệt — hãy dùng Edge/Chrome để nghe. Bạn vẫn có thể bấm “Hiện đáp án” để chép lại câu.</div>" +
      '<div class="pr-dict-controls">' +
      '<button type="button" class="btn primary lg pr-play" data-d="play">' + ic("play", 20) + " <span>Nghe</span></button>" +
      '<button type="button" class="btn ghost" data-d="replay">' + ic("rotate-ccw", 16) + " Nghe lại</button>" +
      '<div class="seg" role="group" aria-label="Tốc độ"><button type="button" data-d="speed" data-v="0.75">0.75×</button><button type="button" class="active" data-d="speed" data-v="1">1×</button></div>' +
      "</div>" +
      '<textarea class="textarea pr-dict-input" rows="3" placeholder="Gõ lại những gì bạn nghe được…" spellcheck="false" autocomplete="off" data-d="input"></textarea>' +
      '<div class="pr-dict-result" data-d="result" aria-live="polite"></div>' +
      '<div class="row wrap pr-dict-actions">' +
      '<button type="button" class="btn primary" data-d="check">' + ic("check", 16) + ' Kiểm tra <span class="kbd">Enter</span></button>' +
      '<button type="button" class="btn ghost" data-d="hint">' + ic("lightbulb", 16) + " Gợi ý 1 từ</button>" +
      '<button type="button" class="btn ghost" data-d="reveal">' + ic("eye", 16) + " Hiện đáp án</button>" +
      '<span class="spacer"></span><button type="button" class="btn sk" data-d="next">Câu tiếp ' + ic("chevron-right", 16) + "</button></div>" +
      '<p class="tiny muted pr-dict-keys">Phím tắt: <span class="kbd">Ctrl</span> nghe lại · <span class="kbd">Space</span> nghe (khi không gõ) · <span class="kbd">Enter</span> kiểm tra / câu tiếp</p>' +
      "</div></div>";
    var root = V.host.querySelector(".pr-dict");
    var q = function (s) { return root.querySelector('[data-d="' + s + '"]'); };
    var input = q("input"), result = q("result");
    function saveDD() { X().saveDraft(dk, dd); }
    function paint() {
      q("k").textContent = k + 1;
      q("bar").style.width = Math.round(k / N * 100) + "%";
      solved = false; revealed = false;
      input.value = dd.cur || "";
      input.disabled = false;
      result.innerHTML = "";
      q("next").innerHTML = (k === N - 1 ? "Hoàn thành " + ic("check", 16) : "Câu tiếp " + ic("chevron-right", 16));
      q("next").classList.remove("is-pulse");
    }
    var playing = false;
    function playSentence() {
      if (!ttsOk || !I.tts) { toast("Chưa có giọng đọc tiếng Anh.", "warn"); return; }
      try { I.tts.stop(); } catch (e) { /* ignore */ }
      playing = true; q("play").classList.add("is-playing");
      var tk = V.token;
      setTimeout(function () {
        if (!V || V.token !== tk) return;
        Promise.resolve(I.tts.speak(S[k], { voice: L.voice || "f", rate: rate() * speed })).then(function () {
          if (!V || V.token !== tk) return;
          playing = false; q("play").classList.remove("is-playing");
        });
      }, 60);
    }
    function record(score) { if (!dd.scores[k]) { dd.scores[k] = score; saveDD(); } }
    function check() {
      if (solved || revealed) { next(); return; }
      var d = dDiff(S[k], input.value);
      record({ c: d.matched, t: d.total });
      if (d.correct) {
        solved = true;
        result.innerHTML = '<div class="pr-dict-ok">' + ic("check", 18) + " Chính xác! <span class=\"pr-dict-sent\">" + esc(S[k]) + "</span></div>";
        q("next").classList.add("is-pulse");
        q("next").focus();
      } else {
        result.innerHTML = '<div class="pr-dict-diff">' + diffHtml(d, false) + '</div><p class="tiny muted">' + d.matched + "/" + d.total + " từ đúng · <span class=\"dw-l ok\">đúng</span> <span class=\"dw-l bad\">sai</span> <span class=\"dw-l miss\">thiếu</span> <span class=\"dw-l extra\">thừa</span></p>";
      }
    }
    function hint() {
      if (solved || revealed) return;
      var a = dTokens(S[k]), b = dTokens(input.value), i = 0;
      while (i < a.length && i < b.length && a[i].norm === b[i].norm) i++;
      if (!dd.scores[k]) record({ c: i, t: a.length });
      if (i >= a.length) { check(); return; }
      dd.hints++; saveDD();
      input.value = a.slice(0, i + 1).map(function (t) { return t.orig; }).join(" ") + (i + 1 < a.length ? " " : "");
      dd.cur = input.value;
      input.focus();
      try { input.setSelectionRange(input.value.length, input.value.length); } catch (e) { /* ignore */ }
      if (i + 1 >= a.length) check();
    }
    function reveal() {
      if (solved) return;
      var d = dDiff(S[k], input.value);
      record({ c: input.value.trim() ? d.matched : 0, t: d.total });
      revealed = true; dd.reveals++; saveDD();
      result.innerHTML = '<div class="pr-dict-reveal"><div class="tiny muted">Đáp án</div><div class="pr-dict-sent">' + esc(S[k]) + "</div></div>" +
        (input.value.trim() ? '<div class="pr-dict-diff">' + diffHtml(d, true) + "</div>" : "");
      q("next").classList.add("is-pulse");
    }
    function next() {
      if (!dd.scores[k]) record({ c: 0, t: dTokens(S[k]).length });
      dd.cur = "";
      if (k >= N - 1) { finishLesson(); return; }
      k++; prog.index = k; saveDD(); persist();
      paint();
      input.focus();
      playSentence();
    }
    function persist() { try { if (I.save) I.save(); } catch (e) { /* ignore */ } }
    function finishLesson() {
      try { I.tts.stop(); } catch (e) { /* ignore */ }
      var raw = 0, total = 0, rows = "";
      S.forEach(function (s, i) {
        var sc = dd.scores[i] || { c: 0, t: dTokens(s).length };
        raw += sc.c; total += sc.t;
        rows += '<tr><td class="mono">' + (i + 1) + "</td><td>" + esc(s) + '</td><td class="mono">' + sc.c + "/" + sc.t + "</td></tr>";
      });
      var acc = total ? Math.round(raw / total * 1000) / 10 : 0;
      var secs = Math.max(Math.round(dd.secs || 0), 0) || api("endPractice", pStart) || 0;
      api("endPractice", pStart);
      var stored = api("recordSubmission", {
        skill: "listening", kind: "dictation", refId: L.id, title: "Dictation — " + L.title, seconds: secs, clientKey: dd.clientKey, practiceHint: { tab: "dictation" },
        score: { raw: raw, total: total, accuracy: acc, band: null, bandSource: null, criteria: null, status: "graded" },
        detail: { notes: dd.hints + " gợi ý · " + dd.reveals + " lần hiện đáp án" }
      }) || {};
      prog.done = true; prog.index = 0; prog.best = Math.max(+prog.best || 0, acc);
      X().clearDraft(dk);
      persist();
      cleanupView();
      var all = lessons(), pos = all.indexOf(L), nxt = all[pos + 1];
      V.host.innerHTML = '<div class="pr-dict sk-listening">' +
        '<div class="row between wrap"><button type="button" class="btn ghost sm" data-la="back" data-tab="dictation">' + ic("chevron-left", 16) + " Danh sách</button></div>" +
        '<div class="card tape pad-lg pr-dict-sum"><div class="page-kicker">Hoàn thành bài dictation</div><h2 class="pr-dict-title">' + esc(L.title) + "</h2>" +
        (stored.repeat ? '<div class="pr-note">' + ic("rotate-ccw", 15) + " Làm lại — đã ghi thêm một lượt luyện.</div>" : "") +
        '<div class="pr-dict-sumstats"><div class="pr-hero-big">' + raw + "<span>/" + total + '</span></div><div><div class="stat-label">từ đúng ở lần kiểm tra đầu</div><div class="stat-value">' + Math.round(acc) + "%</div>" +
        '<div class="small muted">' + dd.hints + " gợi ý · " + dd.reveals + " lần hiện đáp án · " + esc(I.fmtDuration ? I.fmtDuration(secs) : Math.round(secs / 60) + " phút") + "</div></div></div>" +
        '<div class="table-wrap"><table class="table pr-dict-table"><thead><tr><th>#</th><th>Câu</th><th>Đúng</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
        '<div class="row wrap"><button type="button" class="btn ghost" data-la="open-dict" data-id="' + esc(L.id) + '">' + ic("rotate-ccw", 16) + " Làm lại</button>" +
        (nxt ? '<button type="button" class="btn sk" data-la="open-dict" data-id="' + esc(nxt.id) + '">Bài tiếp: ' + esc(nxt.title) + " " + ic("chevron-right", 16) + "</button>" : "") + "</div></div></div>";
    }
    root.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-d]");
      if (!b) return;
      var a = b.getAttribute("data-d");
      if (a === "play" || a === "replay") { playSentence(); input.focus(); }
      else if (a === "speed") {
        speed = +b.getAttribute("data-v") || 1;
        Array.prototype.forEach.call(root.querySelectorAll("[data-d=speed]"), function (x) { x.classList.toggle("active", x === b); });
        playSentence();
      } else if (a === "check") check();
      else if (a === "hint") hint();
      else if (a === "reveal") reveal();
      else if (a === "next") next();
    });
    var ctrlOnly = false;
    var onKey = function (e) {
      if (!document.body.contains(root)) return;
      if (e.key === "Control") { ctrlOnly = !e.repeat; return; }
      ctrlOnly = false;
      if (document.querySelector(".modal-backdrop")) return;
      var inText = e.target === input;
      if (e.key === " " && !inText && !/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(e.target.tagName)) { e.preventDefault(); playSentence(); }
      else if (e.key === "Enter" && !e.shiftKey && (inText || e.target === document.body)) { e.preventDefault(); check(); }
    };
    var onKeyUp = function (e) { if (e.key === "Control" && ctrlOnly) { ctrlOnly = false; playSentence(); } };
    document.addEventListener("keydown", onKey);
    document.addEventListener("keyup", onKeyUp);
    input.addEventListener("input", function () { dd.cur = input.value; clearTimeout(input._t); input._t = setTimeout(saveDD, 600); });
    var tick = setInterval(function () { if (!document.hidden) dd.secs = (dd.secs || 0) + 1; }, 1000);
    var saveTick = setInterval(saveDD, 15000);
    onView(function () {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keyup", onKeyUp);
      clearInterval(tick); clearInterval(saveTick);
      try { if (I.tts) I.tts.stop(); } catch (e) { /* ignore */ }
      if (X().loadDraft(dk)) saveDD();
    });
    paint();
    input.focus();
    var ltok = V.token;
    checkTts().then(function (ok) {
      if (!V || V.token !== ltok) return;
      ttsOk = ok;
      var box = q("nottsbox"); if (box) box.hidden = ok;
    });
  }

  /* ======================================================================
   * Router glue
   * ====================================================================== */
  function route(p) {
    if (p.start) {
      var id = p.start;
      if (p.tab === "dictation" && findLesson(id)) return openLesson(id);
      if (p.tab === "clips" && findClip(id)) return openPrestart("clip", id);
      if (p.tab !== "full" && findSection(id)) return openPrestart("section", id);
      if (findTest(id)) return openPrestart("full", id);
      if (findSection(id)) return openPrestart("section", id);
      if (findLesson(id)) return openLesson(id);
      if (findClip(id)) return openPrestart("clip", id);
      toast("Không tìm thấy bài “" + id + "”.", "warn");
    }
    if (!V.host.querySelector(".pr-tabs")) showLanding(p);
  }
  function onHostClick(e) {
    var b = e.target.closest && e.target.closest("[data-la]");
    if (!b || !V || !V.host.contains(b)) return;
    if (b.closest(".ex-shell")) return;
    var a = b.getAttribute("data-la"), id = b.getAttribute("data-id");
    if (a === "last") { e.stopPropagation(); openStoredResult(id); return; }
    switch (a) {
      case "tab": go({ tab: b.getAttribute("data-tab") }); break;
      case "type": go({ tab: "section", type: b.getAttribute("data-type") }); break;
      case "practice-type": go({ tab: "section", type: b.getAttribute("data-type") }); break;
      case "open-section": go({ tab: "section", start: id }); break;
      case "open-full": go({ tab: "full", start: id }); break;
      case "open-clip": go({ tab: "clips", start: id }); break;
      case "open-dict":
        if (V.params.start === id && V.params.tab === "dictation") openLesson(id); else go({ tab: "dictation", start: id });
        break;
      case "back": go({ tab: b.getAttribute("data-tab") || "section" }); break;
      case "mode":
        if (!V.pre) break;
        V.pre.practice = b.getAttribute("data-mode") === "practice";
        Array.prototype.forEach.call(V.host.querySelectorAll("[data-la=mode]"), function (x) { x.classList.toggle("active", x === b); });
        var note = V.host.querySelector("[data-role=mode-note]");
        if (note) note.textContent = V.pre.practice ? "Được tạm dừng, lùi câu và nghe lại; không tự nộp bài. Kết quả vẫn được ghi nhận." : "Audio phát một lần, không tạm dừng/tua lại — giống thi thật.";
        break;
      case "start": if (V.pre && V.pre.ttsOk) startExam(V.pre.kind, V.pre.id, { practice: V.pre.practice }); break;
      case "resume": if (V.pre && V.pre.draft) startExam(V.pre.kind, V.pre.id, { resume: V.pre.draft }); break;
      case "restart":
        if (!V.pre) break;
        X().clearDraft("exam:" + V.pre.id);
        if (V.pre.ttsOk) startExam(V.pre.kind, V.pre.id, { practice: V.pre.practice }); else openPrestart(V.pre.kind, V.pre.id);
        break;
      case "transcript": if (V.pre) startExam(V.pre.kind, V.pre.id, { transcript: true }); break;
      case "soundcheck":
        if (I.tts && I.tts.speak) { try { I.tts.stop(); } catch (er) { /* ignore */ } I.tts.speak("This is a sound check. You will hear a number of different recordings.", { voice: "f", rate: rate() }); }
        break;
      case "redo":
        if (V.result) { var r = V.result.ref; openPrestart(r.kind, r.id); }
        break;
    }
  }
  function onHostClickLog(e) {
    var b = e.target.closest && e.target.closest("[data-logerr],[data-evidence]");
    if (!b || !V || b.closest(".ex-shell")) return;
    if (b.hasAttribute("data-logerr")) logError(+b.getAttribute("data-logerr"));
    else showEvidence(b.getAttribute("data-evidence").split(" ").map(Number));
  }
  function onHostKey(e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var c = e.target;
    if (c && c.matches && c.matches("article[data-la]")) { e.preventDefault(); c.click(); }
  }

  I.registerPage({
    id: "listening", label: "Listening", icon: "headphones", skill: "listening", group: "practice", order: 4,
    render: function (params) {
      params = params || {};
      var inner = params.start ? '<div class="pr-loading"><span class="pr-spin"></span> Đang mở bài…</div>' : landingHtml(params);
      return '<div class="page sk-listening pr-page" data-pr-host>' + inner + "</div>";
    },
    mount: function (root, params) {
      var host = root.querySelector("[data-pr-host]") || root;
      V = { root: root, host: host, params: params || {}, vc: [], token: 0 };
      var myV = V;
      host.addEventListener("click", onHostClick);
      host.addEventListener("click", onHostClickLog);
      host.addEventListener("keydown", onHostKey);
      route(V.params);
      return function () {
        var cur = V; V = myV;
        cleanupView();
        host.removeEventListener("click", onHostClick);
        host.removeEventListener("click", onHostClickLog);
        host.removeEventListener("keydown", onHostKey);
        V = cur === myV ? null : cur;
      };
    }
  });

  // exposed for tests / other modules
  I.listeningDictationDiff = dDiff;
})();
