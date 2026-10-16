/* =============================================================================
 * IELTS Coach — Speaking page (owner: S)
 * Tabs: Chủ đề | Forecast | Part 1 | Part 2 | Part 3.
 * Topic detail: Học (sample answers with red phrases + gloss, phrase panel → vocab SRS)
 *               Luyện (record per question / Part 2 cue-card timer, compare with sample,
 *               submit → self/teacher assessment; bands are estimates only).
 * Route params: tab=topics|forecast|part1|part2|part3, start=<topicId>,
 *               part=1|2|3, mode=learn|practice (optional).
 * Recordings are stored in IndexedDB immediately (IELTS.audioDB); draft ids live in
 * IELTS.state.drafts["speaking:<topicId>"] = { part1|part2|part3: { key, answers:{idx:audioId}, notes } }.
 * ========================================================================== */
(function () {
  "use strict";

  var I = window.IELTS;
  if (!I || typeof I.registerPage !== "function") return;

  /* ---------------------------------------------------------------- utils */
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function esc(s) { return I.esc(s); }
  function ic(name, size) { return safe(function () { return I.icon(name, size || 18); }, ""); }
  function toast(msg, kind) { safe(function () { I.toast(msg, kind || "info"); }); }
  function mod(n, m) { return ((n % m) + m) % m; }
  function data() { return I.data && I.data.speaking ? I.data.speaking : { forecast: null, guides: {}, topics: [] }; }
  function topics() { return data().topics || []; }
  function findTopic(id) { return topics().filter(function (t) { return t.id === id; })[0] || null; }
  function drafts() { var s = I.state; if (!s.drafts || typeof s.drafts !== "object") s.drafts = {}; return s.drafts; }
  function persist() { safe(function () { I.save(); }); }
  function today() { return safe(function () { return I.todayKey(); }, new Date().toISOString().slice(0, 10)); }

  var TABS = [
    { id: "topics", label: "Chủ đề", icon: "layers" },
    { id: "forecast", label: "Forecast", icon: "sparkles" },
    { id: "part1", label: "Part 1", icon: "mic" },
    { id: "part2", label: "Part 2", icon: "timer" },
    { id: "part3", label: "Part 3", icon: "lightbulb" }
  ];
  var TOPIC_VI = {
    education: "Giáo dục", technology: "Công nghệ", environment: "Môi trường", health: "Sức khoẻ", work: "Công việc",
    society: "Xã hội", urban: "Đô thị", culture: "Văn hoá", science: "Khoa học", media: "Truyền thông", travel: "Du lịch",
    crime: "Tội phạm", government: "Chính phủ", family: "Gia đình", economy: "Kinh tế", food: "Ẩm thực", sport: "Thể thao",
    history: "Lịch sử", animals: "Động vật", energy: "Năng lượng"
  };
  var PART_HINT = { 1: "Gợi ý: 15–30 giây", 2: "Nói 1–2 phút", 3: "Gợi ý: 40–60 giây" };
  var DESCRIPTORS = {
    fc: {
      4: "Ngắt quãng nhiều, lặp từ, khó nối các ý với nhau.",
      5: "Duy trì được lời nói nhưng chậm, hay lặp lại; từ nối đơn giản và dùng quá mức.",
      6: "Sẵn sàng nói dài, đôi lúc mất mạch vì lặp/tự sửa; dùng nhiều từ nối nhưng chưa luôn phù hợp.",
      7: "Nói dài dễ dàng, ít ngập ngừng; dùng từ nối và discourse markers linh hoạt.",
      8: "Trôi chảy, hiếm khi lặp hoặc tự sửa; ngập ngừng chủ yếu để tìm ý; phát triển ý mạch lạc.",
      9: "Hoàn toàn trôi chảy, mạch lạc; phát triển ý đầy đủ và tự nhiên."
    },
    lr: {
      4: "Từ vựng cơ bản, đủ cho chủ đề quen thuộc; hay dùng sai từ.",
      5: "Nói được chủ đề quen và lạ nhưng vốn từ hạn chế; ít khi paraphrase.",
      6: "Đủ từ để bàn luận dài; nghĩa rõ dù đôi khi dùng từ chưa chuẩn; paraphrase được.",
      7: "Dùng từ linh hoạt, có từ ít phổ biến và cụm idiomatic; có ý thức collocation, vẫn còn vài lựa chọn chưa chuẩn.",
      8: "Vốn từ rộng, dùng cụm từ ít phổ biến/idiomatic khéo léo; paraphrase hiệu quả.",
      9: "Dùng từ chính xác, tự nhiên và linh hoạt ở mọi chủ đề."
    },
    gra: {
      4: "Chủ yếu câu đơn; câu phức hiếm và thường sai.",
      5: "Câu đơn khá chuẩn; câu phức hạn chế và thường có lỗi.",
      6: "Kết hợp câu đơn và phức nhưng chưa linh hoạt; lỗi khá thường xuyên nhưng hiếm khi gây khó hiểu.",
      7: "Dùng nhiều cấu trúc phức khá linh hoạt; nhiều câu không lỗi dù vẫn còn một số lỗi.",
      8: "Cấu trúc đa dạng, linh hoạt; phần lớn câu không lỗi, chỉ thỉnh thoảng sai nhỏ.",
      9: "Cấu trúc đa dạng, tự nhiên và chính xác hoàn toàn."
    },
    p: {
      4: "Phát âm hạn chế; lỗi thường xuyên gây khó hiểu.",
      5: "Có một số đặc điểm của band 6 nhưng chưa ổn định; đôi lúc khó hiểu.",
      6: "Dùng được nhiều đặc điểm phát âm nhưng kiểm soát chưa đều; nhìn chung dễ hiểu.",
      7: "Có đủ đặc điểm band 6 và một số của band 8; dễ hiểu, ngữ điệu khá tự nhiên.",
      8: "Dùng đa dạng đặc điểm phát âm; dễ hiểu xuyên suốt, giọng mẹ đẻ ảnh hưởng rất ít.",
      9: "Phát âm chính xác, tinh tế; dễ hiểu hoàn toàn."
    }
  };

  /* --------------------------------------------------------- markup helpers */
  var MARK_RE = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;
  function stripMarkup(s) { return String(s || "").replace(MARK_RE, "$1"); }
  function renderMarkup(s) {
    return esc(s).replace(MARK_RE, function (_, p, g) {
      return '<span class="phrase">' + p + '</span> <span class="gloss">(' + g + ")</span>";
    });
  }
  function renderParas(s) {
    return String(s || "").split(/\n\s*\n/).map(function (p) { return "<p>" + renderMarkup(p.trim()) + "</p>"; }).join("");
  }
  function sentenceAround(text, start, end) {
    var before = text.slice(0, start), after = text.slice(end);
    var b = Math.max(before.lastIndexOf(". "), before.lastIndexOf("? "), before.lastIndexOf("! "), before.lastIndexOf("\n"));
    var s = b >= 0 ? b + 1 : 0;
    var m = after.search(/[.!?](\s|$)/);
    var e = m >= 0 ? end + m + 1 : text.length;
    return stripMarkup(text.slice(s, e)).replace(/\s+/g, " ").trim();
  }
  function samplesOf(t) {
    var out = [];
    (t.part1 && t.part1.questions || []).forEach(function (q, i) { out.push({ key: "p1-" + i, part: 1, label: "P1 · Câu " + (i + 1), q: q.q, text: q.sample }); });
    if (t.part2) out.push({ key: "p2", part: 2, label: "P2 · Cue card", q: t.part2.cue, text: t.part2.sample });
    (t.part3 || []).forEach(function (q, i) { out.push({ key: "p3-" + i, part: 3, label: "P3 · Câu " + (i + 1), q: q.q, text: q.sample }); });
    return out;
  }
  function sampleByKey(t, key) { return samplesOf(t).filter(function (s) { return s.key === key; })[0] || null; }
  function phrasesOf(t) {
    var seen = {}, out = [];
    samplesOf(t).forEach(function (s) {
      var re = new RegExp(MARK_RE.source, "g"), m;
      while ((m = re.exec(s.text))) {
        var phrase = m[1].trim(), k = phrase.toLowerCase();
        if (seen[k]) continue;
        seen[k] = 1;
        out.push({ phrase: phrase, vi: m[2].trim(), part: s.part, label: s.label, id: I.wordId(phrase),
          example: sentenceAround(s.text, m.index, re.lastIndex) });
      }
    });
    return out;
  }
  function isAdded(id) { return !!safe(function () { return I.state.vocab.items[id]; }, null); }

  /* ---------------------------------------------------------- data helpers */
  function partQuestions(t, part) {
    if (part === 1) return (t.part1 && t.part1.questions) || [];
    if (part === 2) return t.part2 ? [{ q: t.part2.cue, sample: t.part2.sample }] : [];
    return t.part3 || [];
  }
  function partDraft(tid, part, create) {
    var all = drafts(), k = "speaking:" + tid, d = all[k];
    if (!d) { if (!create) return null; d = all[k] = {}; }
    var p = "part" + part;
    if (!d[p]) { if (!create) return null; d[p] = { key: I.uid("spk"), answers: {}, notes: "" }; }
    if (!d[p].answers) d[p].answers = {};
    return d[p];
  }
  function answerOf(tid, part, idx) { var d = partDraft(tid, part, false); return d ? d.answers[idx] || null : null; }
  function answerCount(tid, part) { var d = partDraft(tid, part, false); return d ? Object.keys(d.answers).filter(function (k) { return d.answers[k]; }).length : 0; }
  function speakingSubs(refId) {
    return (I.state.submissions || []).filter(function (s) { return s.skill === "speaking" && (!refId || s.refId === refId); })
      .slice().sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); });
  }
  function doneParts(tid) {
    var r = {};
    speakingSubs(tid).forEach(function (s) { var m = /^part(\d)$/.exec(s.kind || ""); if (m) r[m[1]] = true; });
    return r;
  }
  function dailyPick() {
    var list = topics(); if (!list.length) return null;
    var idx = safe(function () { return I.dailyIndex(today()); }, 0) || 0;
    var dt = safe(function () { return I.getDailyTopic(); }, null);
    var m = dt ? list.filter(function (t) { return t.topic === dt; }) : [];
    if (m.length) {
      m.sort(function (a, b) { return (a.tag === "forecast" ? 0 : 1) - (b.tag === "forecast" ? 0 : 1); });
      return { t: m[mod(idx, m.length)], same: dt };
    }
    return { t: list[mod(idx, list.length)], same: null };
  }
  function criteriaList() {
    var c = safe(function () { return I.CRITERIA.speaking; }, null);
    if (Array.isArray(c)) return c.map(function (x) { return { key: x.key, name: x.name, short: x.short || x.key.toUpperCase() }; });
    if (c && typeof c === "object") return Object.keys(c).map(function (k) {
      var v = c[k]; return { key: k, name: typeof v === "string" ? v : v.name, short: (v && v.short) || k.toUpperCase() };
    });
    return [{ key: "fc", name: "Fluency & Coherence", short: "FC" }, { key: "lr", name: "Lexical Resource", short: "LR" },
      { key: "gra", name: "Grammatical Range & Accuracy", short: "GRA" }, { key: "p", name: "Pronunciation", short: "P" }];
  }
  function bandPill(s) {
    var sc = s.score || {};
    if (sc.status === "assessed" && sc.band != null) {
      return '<span class="pill good">Band ' + esc(I.fmtBand(sc.band)) + ' · ước tính</span>' +
        (sc.bandSource ? ' <span class="tiny muted">' + esc(sc.bandSource) + "</span>" : "");
    }
    return '<span class="pill muted">Chưa chấm</span>';
  }

  /* ------------------------------------------------------------- recording */
  function canRecord() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  }
  function micMessage(e) {
    var n = e && e.name;
    if (n === "unsupported") return "Trình duyệt này không hỗ trợ ghi âm trực tiếp. Hãy dùng Chrome/Edge bản mới, hoặc ghi âm bằng điện thoại rồi đính kèm file bên dưới.";
    if (n === "NotAllowedError" || n === "SecurityError" || n === "PermissionDeniedError") return "Micro đang bị chặn. Bấm biểu tượng ổ khoá / micro trên thanh địa chỉ để cho phép rồi thử lại — hoặc đính kèm một file ghi âm có sẵn bên dưới.";
    if (n === "NotFoundError" || n === "DevicesNotFoundError" || n === "OverconstrainedError") return "Không tìm thấy micro trên thiết bị. Hãy cắm micro/tai nghe rồi thử lại, hoặc đính kèm file ghi âm có sẵn.";
    if (n === "NotReadableError" || n === "TrackStartError") return "Micro đang được ứng dụng khác sử dụng. Hãy đóng ứng dụng đó rồi thử lại, hoặc đính kèm file ghi âm có sẵn.";
    return "Không bật được micro (" + esc((e && (e.message || e.name)) || "lỗi không rõ") + "). Bạn có thể đính kèm file ghi âm có sẵn bên dưới.";
  }
  function pickMime() {
    var opts = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];
    for (var i = 0; i < opts.length; i++) { if (safe(function () { return MediaRecorder.isTypeSupported(opts[i]); }, false)) return opts[i]; }
    return "";
  }

  /* ================================================================ render */
  function headHTML() {
    return '<div class="page-head"><div>' +
      '<div class="page-kicker">Luyện tập · Speaking</div>' +
      '<h1 class="page-title">Speaking</h1>' +
      '<p class="page-sub">Câu hỏi theo topic, đủ cả 3 part. Câu trả lời mẫu band 7.5–8 với <span class="phrase">cụm từ hay</span> <span class="gloss">(giải thích nghĩa)</span> — học, ghi âm, rồi tự chấm.</p>' +
      "</div></div>";
  }
  function tabsHTML(active) {
    return '<div class="tabs sp-tabs" role="tablist">' + TABS.map(function (t) {
      return '<button type="button" class="tab' + (t.id === active ? " active" : "") + '" data-act="tab" data-tab="' + t.id + '" role="tab" aria-selected="' + (t.id === active) + '">' +
        ic(t.icon, 16) + " " + esc(t.label) + "</button>";
    }).join("") + "</div>";
  }
  function guideHTML(part, open) {
    var g = (data().guides || {})["part" + part];
    if (!g) return "";
    return '<details class="sp-guide card soft"' + (open ? " open" : "") + ">" +
      '<summary class="sp-guide-sum">' + ic("lightbulb", 18) + ' <span>Cách trả lời ' + esc(g.title || ("Part " + part)) + '</span><span class="spacer"></span>' + ic("chevron-down", 18) + "</summary>" +
      '<div class="sp-guide-body">' +
      '<div class="pill sk">' + ic("clock", 14) + " " + g.duration + "</div>" +
      "<p>" + (g.summary || "") + "</p>" +
      '<ol class="sp-steps">' + (g.structure || []).map(function (s) {
        return '<li><span class="sp-step-name">' + s.step + "</span><span>" + s.desc + "</span></li>";
      }).join("") + "</ol>" +
      ((g.timing || []).length ? '<ul class="sp-guide-list">' + g.timing.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" : "") +
      '<div class="grid g-2 sp-dodont">' +
      '<div class="sp-do"><div class="sp-dd-title">' + ic("check", 16) + " Nên</div><ul>" + (g.dos || []).map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>" +
      '<div class="sp-dont"><div class="sp-dd-title">' + ic("x", 16) + " Tránh</div><ul>" + (g.donts || []).map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>" +
      "</div></div></details>";
  }
  function topicCardHTML(t) {
    var done = doneParts(t.id);
    var ticks = [1, 2, 3].map(function (p) {
      return '<span class="sp-tick' + (done[p] ? " on" : "") + '" title="' + (done[p] ? "Đã nộp" : "Chưa nộp") + " Part " + p + '">P' + p + "</span>";
    }).join("");
    return '<button type="button" class="card clickable sp-tcard" data-act="open" data-id="' + esc(t.id) + '">' +
      '<span class="row between sp-tcard-top">' +
      (t.tag === "forecast" ? '<span class="pill warn sm">' + ic("sparkles", 12) + " Forecast</span>" : '<span class="pill muted sm">Evergreen</span>') +
      '<span class="tiny muted">' + esc(TOPIC_VI[t.topic] || t.topic) + "</span></span>" +
      '<span class="sp-tcard-title">' + esc(t.title) + "</span>" +
      '<span class="sp-tcard-vi">' + esc(t.titleVi) + "</span>" +
      '<span class="sp-tcard-cue">' + esc(t.part2 ? t.part2.cue : "") + "</span>" +
      '<span class="row between sp-tcard-foot"><span class="sp-ticks">' + ticks + "</span>" +
      '<span class="tiny muted">P1: ' + esc(t.part1 ? t.part1.name : "") + "</span></span>" +
      "</button>";
  }
  function dailyCardHTML() {
    var d = dailyPick(); if (!d) return "";
    var t = d.t;
    var why = d.same ? "Cùng chủ đề với bài Reading hôm nay (" + esc(TOPIC_VI[d.same] || d.same) + ") — dễ tái sử dụng từ vựng."
      : "Topic xoay vòng theo ngày — ổn định đến 06:00 sáng mai.";
    return '<div class="card tape sk-speaking sp-daily">' +
      '<div class="row between wrap"><div>' +
      '<div class="page-kicker">Gợi ý hôm nay · ' + esc(I.fmtDay(today(), "long")) + "</div>" +
      '<div class="sp-daily-title">' + esc(t.title) + ' <span class="sp-daily-vi">· ' + esc(t.titleVi) + "</span></div>" +
      '<div class="small muted">' + why + "</div>" +
      '<div class="sp-daily-cue">“' + esc(t.part2.cue) + "”</div>" +
      "</div>" +
      '<div class="row wrap sp-daily-act">' +
      '<button type="button" class="btn ghost" data-act="open" data-id="' + esc(t.id) + '" data-mode="learn" data-part="1">' + ic("book-open", 16) + " Học câu mẫu</button>" +
      '<button type="button" class="btn sk" data-act="open" data-id="' + esc(t.id) + '" data-mode="practice" data-part="2">' + ic("mic", 16) + " Luyện Part 2</button>" +
      "</div></div></div>";
  }
  function emptyHTML(emoji, title, text) {
    return '<div class="card empty"><div class="empty-emoji">' + emoji + '</div><div class="empty-title">' + esc(title) +
      '</div><div class="empty-text">' + esc(text) + "</div></div>";
  }

  /* ---- list views */
  function topicsTabHTML(V) {
    var list = topics();
    if (!list.length) return emptyHTML("🎙️", "Chưa có bộ đề Speaking", "Không tải được dữ liệu speaking-bank.js. Hãy kiểm tra lại file dữ liệu.");
    var f = V.filter || "all";
    var shown = list.filter(function (t) { return f === "all" || t.tag === f; });
    var nF = list.filter(function (t) { return t.tag === "forecast"; }).length;
    return dailyCardHTML() +
      '<div class="row between wrap sp-listhead"><h2 class="section-title sk-speaking">Tất cả chủ đề</h2>' +
      '<div class="row wrap">' +
      [["all", "Tất cả", list.length], ["forecast", "Forecast", nF], ["evergreen", "Evergreen", list.length - nF]].map(function (c) {
        return '<button type="button" class="chip sk-speaking' + (f === c[0] ? " active" : "") + '" data-act="filter" data-f="' + c[0] + '">' + c[1] + ' <span class="count">' + c[2] + "</span></button>";
      }).join("") + "</div></div>" +
      '<div class="grid g-auto sp-tgrid">' + shown.map(topicCardHTML).join("") + "</div>" +
      historySectionHTML(null, "Bài nói gần đây", 8);
  }
  function forecastTabHTML() {
    var fc = data().forecast || {};
    var list = topics().filter(function (t) { return t.tag === "forecast"; });
    var upd = fc.updated ? fc.updated.split("-").reverse().join("/") : "";
    return '<div class="card sp-fbanner">' +
      '<div class="sp-fbanner-ic">' + ic("sparkles", 26) + "</div>" +
      '<div><div class="page-kicker">Bộ đề dự đoán</div>' +
      '<div class="sp-fbanner-title">' + esc(fc.period || "Forecast") + "</div>" +
      '<div class="small">' + esc(fc.note || "") + "</div>" +
      (upd ? '<div class="tiny muted">Cập nhật: ' + esc(upd) + " · " + list.length + " topic</div>" : "") +
      "</div></div>" +
      (list.length ? '<div class="grid g-auto sp-tgrid">' + list.map(topicCardHTML).join("") + "</div>"
        : emptyHTML("🔮", "Chưa có topic forecast", "Bộ forecast sẽ xuất hiện ở đây khi được cập nhật."));
  }
  function partTabHTML(part) {
    var list = topics();
    var rows = list.map(function (t) {
      var main, sub;
      if (part === 1) { main = t.part1.name; sub = t.part1.questions.map(function (q) { return q.q; }).slice(0, 2).join(" · ") + (t.part1.questions.length > 2 ? " …" : ""); }
      else if (part === 2) { main = t.part2.cue; sub = t.part2.bullets.slice(1).join(" · "); }
      else { main = t.title + " — thảo luận"; sub = t.part3[0] ? t.part3[0].q : ""; }
      var cnt = part === 2 ? "Cue card" : (part === 1 ? t.part1.questions.length : t.part3.length) + " câu";
      return '<div class="card sp-prow">' +
        '<div class="sp-prow-main"><div class="row wrap sp-prow-tags">' +
        (t.tag === "forecast" ? '<span class="pill warn sm">Forecast</span>' : '<span class="pill muted sm">Evergreen</span>') +
        '<span class="tiny muted">' + esc(t.titleVi) + " · " + esc(cnt) + "</span>" + (doneParts(t.id)[part] ? '<span class="pill good sm">' + ic("check", 12) + " Đã nộp</span>" : "") + "</div>" +
        '<div class="sp-prow-title">' + esc(main) + "</div>" +
        '<div class="small muted">' + esc(sub) + "</div></div>" +
        '<div class="row sp-prow-act">' +
        '<button type="button" class="btn ghost sm" data-act="open" data-id="' + esc(t.id) + '" data-part="' + part + '" data-mode="learn">' + ic("book-open", 14) + " Học</button>" +
        '<button type="button" class="btn sk sm" data-act="open" data-id="' + esc(t.id) + '" data-part="' + part + '" data-mode="practice">' + ic("mic", 14) + " Luyện</button>" +
        "</div></div>";
    }).join("");
    return guideHTML(part, true) + (rows ? '<div class="stack sp-plist">' + rows + "</div>" : emptyHTML("🎙️", "Chưa có câu hỏi", "Dữ liệu Speaking chưa được tải."));
  }

  /* ---- history */
  function historySectionHTML(refId, title, limit) {
    var list = speakingSubs(refId);
    var body;
    if (!list.length) {
      body = '<div class="sp-hempty"><span class="sp-hempty-emoji">🎧</span><div><div class="hand">Chưa có bài nói nào</div>' +
        '<div class="small muted">Ghi âm và nộp một part — bài nộp, bản ghi và band tự chấm (ước tính) sẽ hiện ở đây.</div></div></div>';
    } else {
      body = '<div class="sp-hlist">' + list.slice(0, limit || 50).map(historyRowHTML).join("") + "</div>";
    }
    return '<section class="sp-history"><h2 class="section-title sk-speaking">' + esc(title) + "</h2>" + '<div class="card">' + body + "</div></section>";
  }
  var _openHist = {};
  function historyRowHTML(s) {
    var d = s.detail || {};
    var qs = Array.isArray(d.questions) ? d.questions : [];
    var ids = qs.length ? qs.filter(function (q) { return q.audioId; }) : (d.audioId ? [{ q: s.title, audioId: d.audioId }] : []);
    var open = !!_openHist[s.id];
    var assessed = s.score && s.score.status === "assessed";
    return '<div class="sp-hrow">' +
      '<div class="sp-hrow-top">' +
      '<div class="sp-hmain"><div class="sp-htitle">' + esc(s.title || "Bài nói") + "</div>" +
      '<div class="tiny muted">' + esc(I.fmtDay(s.day, "full")) + " · " + esc(I.fmtDuration(s.seconds || 0)) + " · " + ids.length + " bản ghi" +
      (s.repeat ? " · làm lại" : "") + "</div></div>" +
      '<div class="sp-hband">' + bandPill(s) + "</div>" +
      '<div class="row sp-hact">' +
      (ids.length ? '<button type="button" class="btn ghost sm" data-act="hist-toggle" data-id="' + esc(s.id) + '" aria-expanded="' + open + '">' + ic(open ? "eye-off" : "volume", 14) + (open ? " Ẩn" : " Nghe") + "</button>" : "") +
      '<button type="button" class="btn ghost sm" data-act="assess" data-id="' + esc(s.id) + '">' + ic("award", 14) + (assessed ? " Sửa điểm" : " Chấm") + "</button>" +
      '<button type="button" class="btn ghost sm" data-act="error" data-ref="' + esc(s.refId || "") + '" data-src="' + esc(s.title || "") + '">' + ic("alert-triangle", 14) + " Ghi lỗi</button>" +
      "</div></div>" +
      (open ? '<div class="sp-haudio">' + ids.map(function (q, i) {
        return '<div class="sp-haudio-row"><div class="small"><b>' + (i + 1) + ".</b> " + esc(q.q || "") + "</div>" +
          '<audio controls preload="metadata" data-sp-audio="' + esc(q.audioId) + '"></audio></div>';
      }).join("") + (d.notes ? '<div class="small muted sp-hnotes"><b>Ghi chú:</b> ' + esc(d.notes) + "</div>" : "") + "</div>" : "") +
      "</div>";
  }

  /* ---- topic detail */
  function topicHeadHTML(t, V) {
    var done = doneParts(t.id);
    return '<div class="card sp-thead">' +
      '<div class="row between wrap">' +
      '<button type="button" class="btn ghost sm" data-act="back">' + ic("chevron-left", 16) + " Danh sách</button>" +
      '<button type="button" class="btn ghost sm" data-act="error" data-ref="' + esc(t.id) + '" data-src="' + esc(t.title) + '">' + ic("alert-triangle", 14) + " Ghi lỗi</button>" +
      "</div>" +
      '<div class="sp-thead-title">' + esc(t.title) + "</div>" +
      '<div class="row wrap sp-thead-tags"><span class="muted">' + esc(t.titleVi) + "</span>" +
      (t.tag === "forecast" ? '<span class="pill warn sm">' + ic("sparkles", 12) + " Forecast</span>" : '<span class="pill muted sm">Evergreen</span>') +
      '<span class="pill sk sm">' + esc(TOPIC_VI[t.topic] || t.topic) + "</span></div>" +
      '<div class="row between wrap sp-thead-ctl">' +
      '<div class="seg" role="group" aria-label="Chế độ">' +
      '<button type="button" class="' + (V.mode === "learn" ? "active" : "") + '" data-act="mode" data-mode="learn">' + ic("book-open", 15) + " Học</button>" +
      '<button type="button" class="' + (V.mode === "practice" ? "active" : "") + '" data-act="mode" data-mode="practice">' + ic("mic", 15) + " Luyện</button>" +
      "</div>" +
      '<div class="seg" role="group" aria-label="Part">' + [1, 2, 3].map(function (p) {
        return '<button type="button" class="' + (V.part === p ? "active" : "") + '" data-act="part" data-part="' + p + '">Part ' + p + (done[p] ? " ✓" : "") + "</button>";
      }).join("") + "</div></div></div>";
  }
  function ttsBtn(key, S) {
    var on = S && S.ttsKey === key;
    return '<button type="button" class="btn ghost sm sp-tts" data-act="tts" data-key="' + key + '">' + ic(on ? "square" : "volume", 14) + (on ? " Dừng" : " Nghe mẫu") + "</button>";
  }
  function learnHTML(t, V, S) {
    var part = V.part, main = "";
    if (part === 1) {
      main = '<div class="card sp-block"><div class="sp-block-head"><span class="pill sk">Part 1</span> <span class="hand sp-block-name">' + esc(t.part1.name) + "</span></div>" +
        t.part1.questions.map(function (q, i) { return qaHTML(q.q, q.sample, "p1-" + i, i + 1, S); }).join("") + "</div>";
    } else if (part === 2) {
      main = '<div class="card sp-block">' + cueCardHTML(t) +
        '<div class="sp-notes-sample"><div class="sp-mini-title">' + ic("list", 15) + " Ghi chú 1 phút mẫu</div>" +
        '<div class="row wrap">' + (t.part2.notes || []).map(function (n) { return '<span class="sp-note-chip">' + esc(n) + "</span>"; }).join("") + "</div></div>" +
        '<div class="sp-qa"><div class="row between wrap"><div class="sp-mini-title">' + ic("star", 15) + " Bài nói mẫu (~2 phút)</div>" + ttsBtn("p2", S) + "</div>" +
        '<div class="sp-sample">' + renderParas(t.part2.sample) + "</div></div></div>";
    } else {
      main = '<div class="card sp-block"><div class="sp-block-head"><span class="pill sk">Part 3</span> <span class="hand sp-block-name">Thảo luận mở rộng</span></div>' +
        t.part3.map(function (q, i) { return qaHTML(q.q, q.sample, "p3-" + i, i + 1, S); }).join("") + "</div>";
    }
    return '<div class="sp-learn">' +
      '<div class="sp-learn-main stack">' + guideHTML(part, false) + main +
      '<div class="row wrap sp-cta"><button type="button" class="btn sk lg" data-act="mode" data-mode="practice">' + ic("mic", 18) + " Luyện Part " + part + " ngay</button>" +
      '<span class="small muted">Ghi âm câu trả lời của bạn, sau đó so sánh với câu mẫu.</span></div>' +
      "</div>" +
      '<aside class="sp-learn-side">' + phrasePanelHTML(t) + "</aside></div>";
  }
  function qaHTML(q, sample, key, n, S) {
    return '<div class="sp-qa"><div class="row between wrap sp-qa-head"><div class="sp-q"><span class="sp-qn">' + n + "</span>" + esc(q) + "</div>" + ttsBtn(key, S) + "</div>" +
      '<div class="sp-sample">' + renderParas(sample) + "</div></div>";
  }
  function cueCardHTML(t) {
    var b = t.part2.bullets || [];
    return '<div class="sp-cue"><div class="sp-cue-label">Cue card</div>' +
      '<div class="sp-cue-title">' + esc(t.part2.cue) + "</div>" +
      (b[0] ? '<div class="sp-cue-say">' + esc(b[0]) + "</div>" : "") +
      "<ul>" + b.slice(1).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
  }
  function phrasePanelHTML(t) {
    var ph = phrasesOf(t);
    var pending = ph.filter(function (p) { return !isAdded(p.id); }).length;
    var groups = [1, 2, 3].map(function (part) {
      var items = ph.filter(function (p) { return p.part === part; });
      if (!items.length) return "";
      return '<div class="sp-ph-group"><div class="sp-ph-gtitle">Part ' + part + "</div>" + items.map(function (p) {
        var added = isAdded(p.id);
        return '<div class="sp-ph-row">' +
          '<div class="sp-ph-text"><span class="phrase">' + esc(p.phrase) + '</span> <span class="gloss">(' + esc(p.vi) + ")</span>" +
          '<div class="tiny muted sp-ph-ex" title="' + esc(p.example) + '">' + esc(p.label) + "</div></div>" +
          (added ? '<span class="pill good sm sp-ph-done">' + ic("check", 12) + " Đã thêm</span>"
            : '<button type="button" class="btn ghost sm sp-ph-add" data-act="learn-phrase" data-pid="' + esc(p.id) + '">' + ic("plus", 13) + " Học</button>") +
          "</div>";
      }).join("") + "</div>";
    }).join("");
    return '<div class="card sp-phrases">' +
      '<div class="row between"><div class="card-title">' + ic("bookmark", 18) + " Cụm từ hay</div><span class=\"pill sk sm\">" + ph.length + "</span></div>" +
      '<p class="tiny muted">Bấm “+ Học” để đưa cụm từ vào lịch ôn từ vựng (1–2–5–7–14–30 ngày) kèm câu ví dụ.</p>' +
      (pending ? '<button type="button" class="btn sk sm sp-ph-all" data-act="learn-all">' + ic("plus", 14) + " Học tất cả (" + pending + ")</button>" : '<div class="small muted">Bạn đã thêm hết cụm từ của topic này 🎉</div>') +
      '<div class="sp-ph-list">' + (groups || '<div class="small muted">Chưa có cụm từ.</div>') + "</div></div>";
  }

  /* ---- practice */
  function recorderHTML(t, part, idx, S) {
    var rec = S.rec && S.rec.ctx.tid === t.id && S.rec.ctx.part === part && S.rec.ctx.idx === idx;
    var aid = answerOf(t.id, part, idx);
    var html = '<div class="sp-rec' + (rec ? " recording" : "") + '">';
    if (rec) {
      html += '<div class="sp-rec-live"><span class="sp-rec-dot"></span><span class="hand">Đang ghi âm</span>' +
        '<span class="sp-rec-time mono" data-sp-rectime>00:00</span></div>' +
        '<button type="button" class="btn danger" data-act="rec-stop">' + ic("square", 16) + " Dừng & lưu</button>";
    } else if (aid) {
      html += '<div class="sp-rec-done"><div class="small"><b>' + ic("check", 14) + " Đã lưu bản ghi</b> <span class=\"muted\">(lưu trên máy này)</span></div>" +
        '<audio controls preload="metadata" data-sp-audio="' + esc(aid) + '"></audio></div>' +
        '<div class="row wrap"><button type="button" class="btn ghost sm" data-act="rec-start" data-idx="' + idx + '">' + ic("rotate-ccw", 14) + " Ghi lại</button>" +
        '<button type="button" class="btn ghost sm" data-act="rec-del" data-idx="' + idx + '">' + ic("trash", 14) + " Xoá</button></div>";
    } else {
      html += '<button type="button" class="btn sk lg sp-rec-big" data-act="rec-start" data-idx="' + idx + '"' + (S.rec ? " disabled" : "") + ">" + ic("mic", 20) + " Bắt đầu ghi âm</button>" +
        '<span class="small muted">' + PART_HINT[part] + "</span>";
    }
    html += "</div>";
    html += micFallbackHTML(part, idx, S, !!aid);
    return html;
  }
  function micFallbackHTML(part, idx, S, hasAnswer) {
    var msg = S.micError ? '<div class="sp-micerr">' + ic("alert-triangle", 16) + "<span>" + S.micError + "</span></div>" : "";
    return msg + '<label class="sp-file' + (S.micError ? " strong" : "") + '">' + ic("upload", 14) +
      " " + (hasAnswer ? "Thay bằng file ghi âm có sẵn" : "Hoặc đính kèm file ghi âm có sẵn") +
      '<input type="file" accept="audio/*" data-sp-file data-part="' + part + '" data-idx="' + idx + '"></label>';
  }
  function compareHTML(t, part, idx, sample, S) {
    var aid = answerOf(t.id, part, idx);
    if (!aid) return '<div class="sp-compare locked small muted">' + ic("eye-off", 14) + " Ghi âm (hoặc đính kèm) câu trả lời để mở câu mẫu so sánh.</div>";
    var key = part === 2 ? "p2" : "p" + part + "-" + idx;
    var open = !!S.showSample[key];
    return '<div class="sp-compare">' +
      '<button type="button" class="btn ghost sm" data-act="toggle-sample" data-key="' + key + '">' + ic(open ? "eye-off" : "eye", 14) + (open ? " Ẩn câu mẫu" : " So sánh với câu mẫu") + "</button>" +
      (open ? '<div class="sp-sample sp-sample-cmp">' + renderParas(sample) + '<div class="row">' + ttsBtn(key, S) + "</div></div>" : "") +
      "</div>";
  }
  function practiceHTML(t, V, S) {
    if (V.part === 2) return practiceP2HTML(t, S);
    var part = V.part, qs = partQuestions(t, part), n = qs.length;
    var i = Math.max(0, Math.min(n - 1, V.qIndex || 0)), q = qs[i];
    var answered = answerCount(t.id, part);
    var dots = qs.map(function (_, k) {
      var has = !!answerOf(t.id, part, k);
      return '<button type="button" class="sp-dot' + (k === i ? " cur" : "") + (has ? " has" : "") + '" data-act="goto-q" data-i="' + k + '" aria-label="Câu ' + (k + 1) + '">' + (k + 1) + "</button>";
    }).join("");
    return '<div class="sp-prac stack">' +
      '<div class="card sp-pcard">' +
      '<div class="row between wrap"><div class="row"><span class="pill sk">Part ' + part + '</span><span class="small muted">Câu ' + (i + 1) + "/" + n + "</span></div>" +
      '<div class="sp-dots">' + dots + "</div></div>" +
      '<div class="sp-pq">' + esc(q.q) + "</div>" +
      '<div class="row wrap"><button type="button" class="btn ghost sm" data-act="tts-q" data-text="' + esc(q.q) + '">' + ic("volume", 14) + " Nghe câu hỏi</button></div>" +
      recorderHTML(t, part, i, S) +
      compareHTML(t, part, i, q.sample, S) +
      '<div class="row between wrap sp-pnav">' +
      '<button type="button" class="btn ghost" data-act="goto-q" data-i="' + (i - 1) + '"' + (i === 0 ? " disabled" : "") + ">" + ic("chevron-left", 16) + " Câu trước</button>" +
      (i < n - 1 ? '<button type="button" class="btn primary" data-act="goto-q" data-i="' + (i + 1) + '">' + (answerOf(t.id, part, i) ? "Câu tiếp" : "Bỏ qua") + " " + ic("chevron-right", 16) + "</button>"
        : '<button type="button" class="btn sk" data-act="submit" data-part="' + part + '"' + (answered && !S.rec ? "" : " disabled") + ">" + ic("check", 16) + " Nộp Part " + part + " (" + answered + "/" + n + ")</button>") +
      "</div>" +
      (i < n - 1 && answered ? '<div class="small muted sp-early">Đã ghi ' + answered + "/" + n + ' câu · <button type="button" class="linkish" data-act="submit" data-part="' + part + '"' + (S.rec ? " disabled" : "") + ">Nộp luôn Part " + part + "</button></div>" : "") +
      "</div>" + guideHTML(part, false) + "</div>";
  }
  function practiceP2HTML(t, S) {
    var P = S.p2 || { phase: "cue" };
    var aid = answerOf(t.id, 2, 0);
    var phase = P.phase;
    if (phase === "cue" && aid) phase = "done";
    var d = partDraft(t.id, 2, false);
    var notes = d ? d.notes || "" : "";
    var left = "", right = "";
    left = cueCardHTML(t);
    if (phase === "cue") {
      right = '<div class="sp-p2-stage"><div class="sp-p2-ring">' + I.ring(0, { size: 150, stroke: 10, label: "1:00" }) + "</div>" +
        '<div class="hand sp-p2-label">Sẵn sàng?</div>' +
        '<p class="small muted">Bạn có 1 phút chuẩn bị và ghi chú, sau đó app tự bật ghi âm và đếm 2 phút nói.</p>' +
        '<div class="row wrap center"><button type="button" class="btn sk lg" data-act="p2-prep">' + ic("timer", 18) + " Bắt đầu 1 phút chuẩn bị</button>" +
        '<button type="button" class="btn ghost" data-act="p2-speak">Bỏ qua, nói luôn</button></div></div>';
    } else if (phase === "prep" || phase === "speak") {
      var speak = phase === "speak";
      right = '<div class="sp-p2-stage' + (speak ? " speaking" : "") + '"><div class="sp-p2-ring" data-sp-ring>' + I.ring(100, { size: 150, stroke: 10, label: speak ? "2:00" : "1:00" }) + "</div>" +
        '<div class="hand sp-p2-label">' + (speak ? (S.rec ? '<span class="sp-rec-dot"></span> Đang ghi âm — hãy nói!' : "Đang đếm giờ nói") : "Chuẩn bị & ghi chú") + "</div>" +
        (speak ? '<button type="button" class="btn danger" data-act="p2-stop">' + ic("square", 16) + " Dừng sớm & lưu</button>"
          : '<button type="button" class="btn sk" data-act="p2-speak">' + ic("mic", 16) + " Nói luôn</button>") +
        "</div>" + (speak && !S.rec ? micFallbackHTML(2, 0, S, false) : "");
    } else {
      right = '<div class="sp-p2-stage done">' +
        (S.rec ? '<div class="hand sp-p2-label">Đang lưu bản ghi…</div>' : aid ? '<div class="hand sp-p2-label">' + ic("check", 18) + " Đã lưu bài nói</div>" +
          '<audio controls preload="metadata" data-sp-audio="' + esc(aid) + '"></audio>'
          : '<div class="hand sp-p2-label">Chưa có bản ghi</div><p class="small muted">Hết giờ nhưng chưa có bản ghi. Bạn có thể đính kèm file hoặc làm lại.</p>') +
        '<div class="row wrap center"><button type="button" class="btn ghost" data-act="p2-reset">' + ic("rotate-ccw", 16) + " Làm lại</button>" +
        '<button type="button" class="btn sk" data-act="submit" data-part="2"' + (aid ? "" : " disabled") + ">" + ic("check", 16) + " Nộp Part 2</button></div>" +
        "</div>" + micFallbackHTML(2, 0, S, !!aid);
    }
    return '<div class="sp-prac stack"><div class="card sp-pcard sp-p2">' +
      '<div class="sp-p2-grid"><div class="sp-p2-left">' + left +
      '<label class="field sp-p2-notes"><span class="field-label">' + ic("pen-line", 14) + " Ghi chú của bạn (keyword)</span>" +
      '<textarea class="textarea" data-sp-notes rows="5" placeholder="Ví dụ: who – aunt Lan / how – neighbour / help – lifts to hospital / why – grew up poor…">' + esc(notes) + "</textarea></label>" +
      "</div>" +
      '<div class="sp-p2-right">' + right + "</div></div>" +
      (phase === "done" ? compareHTML(t, 2, 0, t.part2.sample, S) +
        (aid && S.showSample.p2 ? '<div class="sp-notes-sample"><div class="sp-mini-title">' + ic("list", 15) + " Ghi chú mẫu</div><div class=\"row wrap\">" +
          (t.part2.notes || []).map(function (n) { return '<span class="sp-note-chip">' + esc(n) + "</span>"; }).join("") + "</div></div>" : "") : "") +
      "</div>" + guideHTML(2, false) + "</div>";
  }

  /* ---- body by view */
  function bodyHTML(V, S) {
    S = S || { showSample: {} };
    if (V.topicId) {
      var t = findTopic(V.topicId);
      if (t) {
        return topicHeadHTML(t, V) +
          (V.mode === "practice" ? practiceHTML(t, V, S) : learnHTML(t, V, S)) +
          historySectionHTML(t.id, "Lịch sử bài nói — " + t.title, 30);
      }
    }
    if (V.tab === "forecast") return forecastTabHTML();
    if (V.tab === "part1") return partTabHTML(1);
    if (V.tab === "part2") return partTabHTML(2);
    if (V.tab === "part3") return partTabHTML(3);
    return topicsTabHTML(V);
  }
  function viewFromParams(params) {
    params = params || {};
    var tab = TABS.some(function (t) { return t.id === params.tab; }) ? params.tab : "topics";
    var topicId = params.start && findTopic(params.start) ? params.start : null;
    var part = +params.part;
    if (!(part >= 1 && part <= 3)) part = tab === "part2" || tab === "forecast" ? 2 : tab === "part3" ? 3 : 1;
    var mode = params.mode === "practice" ? "practice" : "learn";
    return { tab: tab, topicId: topicId, part: part, mode: mode, qIndex: 0, filter: "all" };
  }

  /* ============================================================ register */
  I.registerPage({
    id: "speaking", label: "Speaking", icon: "mic", skill: "speaking", group: "practice", order: 7,
    render: function (params) {
      var V = viewFromParams(params);
      return '<div class="page sk-speaking sp-page">' + headHTML() + tabsHTML(V.tab) +
        '<div class="sp-body">' + bodyHTML(V, null) + "</div></div>";
    },
    mount: function (root, params) {
      var V = viewFromParams(params);
      var S = {
        alive: true, rec: null, stream: null, tick: null, micError: "", showSample: {}, urls: {},
        ttsKey: null, p2: { phase: "cue", endAt: 0 }, p2Timer: null, practiceStart: null
      };
      var body = root.querySelector(".sp-body");
      if (params && params.start && !V.topicId) toast("Không tìm thấy topic này — hiển thị danh sách.", "warn");
      if (V.topicId && V.mode === "practice") S.practiceStart = I.beginPractice("speaking");

      function paint() {
        if (!S.alive || !body) return;
        body.innerHTML = bodyHTML(V, S);
        hydrateAudio();
      }
      function syncHash() {
        if (!V.topicId) return;
        var h = safe(function () { return I._buildHash("speaking", { tab: V.tab, start: V.topicId, part: V.part, mode: V.mode }); }, null);
        if (h && window.history && history.replaceState) safe(function () { history.replaceState(null, "", h); });
      }
      function hydrateAudio() {
        Array.prototype.forEach.call(body.querySelectorAll("audio[data-sp-audio]"), function (el) {
          var id = el.getAttribute("data-sp-audio");
          loadUrl(id).then(function (url) {
            if (!S.alive) return;
            if (url) el.src = url;
            else {
              var note = document.createElement("div");
              note.className = "tiny muted";
              note.textContent = "Không tìm thấy bản ghi trên máy này (có thể đã bị xoá hoặc chưa khôi phục từ backup).";
              if (el.parentNode) el.parentNode.replaceChild(note, el);
            }
          });
        });
      }
      function loadUrl(id) {
        if (S.urls[id]) return Promise.resolve(S.urls[id]);
        return I.audioDB.get(id).then(function (blob) {
          if (!blob || !S.alive) return null;
          var u = URL.createObjectURL(blob);
          S.urls[id] = u;
          return u;
        }).catch(function () { return null; });
      }
      function forgetUrl(id) { if (S.urls[id]) { safe(function () { URL.revokeObjectURL(S.urls[id]); }); delete S.urls[id]; } }

      /* ---------- answers */
      function setAnswer(ctx, id) {
        var d = partDraft(ctx.tid, ctx.part, true);
        var old = d.answers[ctx.idx];
        d.answers[ctx.idx] = id;
        persist();
        if (old && old !== id) { forgetUrl(old); safe(function () { I.audioDB.del(old).catch(function () {}); }); }
      }
      function delAnswer(ctx) {
        var d = partDraft(ctx.tid, ctx.part, false); if (!d) return;
        var old = d.answers[ctx.idx];
        delete d.answers[ctx.idx];
        persist();
        if (old) { forgetUrl(old); safe(function () { I.audioDB.del(old).catch(function () {}); }); }
      }

      /* ---------- recorder */
      function releaseStream() {
        if (S.stream) { safe(function () { S.stream.getTracks().forEach(function (tr) { tr.stop(); }); }); S.stream = null; }
      }
      function ensureStream() {
        if (S.stream && S.stream.active) return Promise.resolve(S.stream);
        if (!canRecord()) return Promise.reject({ name: "unsupported" });
        return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (st) {
          if (!S.alive) { st.getTracks().forEach(function (tr) { tr.stop(); }); throw { name: "aborted" }; }
          S.stream = st; S.micError = "";
          return st;
        });
      }
      function startTick() {
        stopTick();
        S.tick = setInterval(function () {
          if (!S.rec) return stopTick();
          var el = body && body.querySelector("[data-sp-rectime]");
          if (el) el.textContent = I.fmtClock(Math.floor((Date.now() - S.rec.startedAt) / 1000));
        }, 250);
      }
      function stopTick() { if (S.tick) { clearInterval(S.tick); S.tick = null; } }
      function startRec(ctx) {
        if (S.rec) return Promise.resolve(false);
        safe(function () { I.tts.stop(); }); S.ttsKey = null;
        return ensureStream().then(function (stream) {
          var mime = pickMime(), rec;
          try { rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream); }
          catch (e) { rec = new MediaRecorder(stream); }
          var chunks = [];
          rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
          rec.onstop = function () {
            var r = S.rec; S.rec = null; stopTick();
            I.confirmLeave = null;
            releaseStream();
            var blob = new Blob(chunks, { type: rec.mimeType || mime || "audio/webm" });
            if (!blob.size) { toast("Bản ghi trống — hãy thử lại.", "warn"); if (S.alive) paint(); return; }
            I.audioDB.put(blob).then(function (id) {
              setAnswer(r ? r.ctx : ctx, id);
              if (S.alive) { toast("Đã lưu bản ghi.", "success"); paint(); }
            }).catch(function () {
              toast("Không lưu được bản ghi vào bộ nhớ trình duyệt.", "error");
              if (S.alive) paint();
            });
          };
          rec.start(1000);
          S.rec = { rec: rec, ctx: ctx, startedAt: Date.now() };
          I.confirmLeave = function () {
            return I.confirm("Bạn đang ghi âm. Rời trang sẽ dừng và lưu đoạn đã ghi. Tiếp tục?", { okLabel: "Rời trang" });
          };
          startTick();
          paint();
          return true;
        }).catch(function (e) {
          if (e && e.name === "aborted") return false;
          S.micError = micMessage(e);
          paint();
          return false;
        });
      }
      function stopRec() {
        if (S.rec && S.rec.rec && S.rec.rec.state !== "inactive") { try { S.rec.rec.stop(); } catch (e) { S.rec = null; } }
      }

      /* ---------- Part 2 flow */
      function clearP2Timer() { if (S.p2Timer) { clearInterval(S.p2Timer); S.p2Timer = null; } }
      function runP2Timer(total, onEnd) {
        clearP2Timer();
        S.p2.endAt = Date.now() + total * 1000;
        S.p2Timer = setInterval(function () {
          var left = Math.max(0, (S.p2.endAt - Date.now()) / 1000);
          var el = body && body.querySelector("[data-sp-ring]");
          if (el) el.innerHTML = I.ring(left / total * 100, { size: 150, stroke: 10, label: I.fmtClock(Math.ceil(left)).replace(/^0/, "") });
          if (left <= 0) { clearP2Timer(); onEnd(); }
        }, 200);
      }
      function p2Prep(t) {
        S.p2 = { phase: "prep" };
        paint();
        if (canRecord()) ensureStream().catch(function (e) { if (e && e.name !== "aborted") { S.micError = micMessage(e); } });
        runP2Timer(60, function () { p2Speak(t); });
      }
      function p2Speak(t) {
        clearP2Timer();
        S.p2 = { phase: "speak" };
        paint();
        startRec({ tid: t.id, part: 2, idx: 0 }).then(function () { if (S.alive) paint(); });
        runP2Timer(120, function () { p2Finish(); });
      }
      function p2Finish() {
        clearP2Timer();
        stopRec();
        S.p2 = { phase: "done" };
        paint();
      }
      function resetPractice() {
        stopRec(); clearP2Timer();
        S.p2 = { phase: "cue" };
        S.showSample = {};
      }

      /* ---------- submit + assess */
      function submitPart(t, part) {
        if (S.rec) { toast("Hãy dừng ghi âm trước khi nộp.", "warn"); return; }
        var d = partDraft(t.id, part, false);
        var qs = partQuestions(t, part);
        var questions = qs.map(function (q, i) { return { q: q.q, audioId: d && d.answers[i] ? d.answers[i] : null }; });
        var audioIds = questions.filter(function (q) { return q.audioId; }).map(function (q) { return q.audioId; });
        if (!audioIds.length) { toast("Chưa có bản ghi nào để nộp.", "warn"); return; }
        var secs = S.practiceStart ? I.endPractice(S.practiceStart) : 0;
        secs = Math.min(secs, 3 * 3600);
        var sub = I.recordSubmission({
          skill: "speaking", kind: "part" + part, refId: t.id, title: "Part " + part + " — " + t.title,
          seconds: secs, clientKey: d.key, practiceHint: { tab: part === 1 ? "part1" : "forecast" },
          score: { raw: null, total: null, accuracy: null, band: null, bandSource: null, criteria: null, status: "ungraded" },
          detail: { audioIds: audioIds, audioId: audioIds[0], questions: questions, notes: part === 2 ? (d.notes || "") : "" }
        });
        var all = drafts()["speaking:" + t.id];
        if (all) { delete all["part" + part]; if (!Object.keys(all).length) delete drafts()["speaking:" + t.id]; }
        persist();
        // recordings now belong to the submission: drop cached URLs mapping from the draft but keep blobs
        S.practiceStart = I.beginPractice("speaking");
        if (part === 2) S.p2 = { phase: "cue" };
        V.qIndex = 0; S.showSample = {};
        toast("Đã nộp Part " + part + " (" + audioIds.length + " bản ghi).", "success");
        paint();
        openAssess(sub.id);
      }
      function openAssess(subId) {
        var sub = safe(function () { return I.findSubmission(subId); }, null) ||
          (I.state.submissions || []).filter(function (s) { return s.id === subId; })[0];
        if (!sub) return;
        var crit = criteriaList();
        var prev = (sub.score && sub.score.criteria) || {};
        var src = sub.score && sub.score.bandSource === "giáo viên" ? "teacher" : "self";
        var bands = []; for (var b = 4; b <= 9; b += 0.5) bands.push(b);
        var mEl = null;
        var html = '<div class="sp-assess">' +
          '<p class="small">App <b>không tự chấm</b> bài nói. Hãy nghe lại bản ghi và chọn band cho từng tiêu chí — kết quả là <b>band ước tính</b>.</p>' +
          '<div class="seg sp-src" role="group" aria-label="Nguồn chấm">' +
          '<button type="button" data-src="self" class="' + (src === "self" ? "active" : "") + '">Tự đánh giá</button>' +
          '<button type="button" data-src="teacher" class="' + (src === "teacher" ? "active" : "") + '">Giáo viên chấm</button></div>' +
          crit.map(function (c) {
            var v = prev[c.key];
            return '<div class="field sp-crit"><span class="field-label">' + esc(c.name) + " <span class=\"tiny muted\">(" + esc(c.short) + ")</span></span>" +
              '<select class="select" data-crit="' + esc(c.key) + '"><option value="">— Chọn band —</option>' +
              bands.map(function (x) { return '<option value="' + x + '"' + (v === x ? " selected" : "") + ">" + x.toFixed(1) + "</option>"; }).join("") +
              '</select><div class="tiny muted sp-desc" data-desc="' + esc(c.key) + '">' + descFor(c.key, v) + "</div></div>";
          }).join("") +
          '<div class="sp-assess-total">Band Speaking (ước tính): <b data-total>—</b></div></div>';
        I.modal({
          title: "Chấm bài nói — " + (sub.title || ""),
          html: html,
          actions: [
            { label: "Để sau", kind: "ghost", onClick: function (close) { close(); } },
            { label: "Lưu đánh giá", kind: "primary", onClick: function (close) {
              var el = mEl; if (!el) return close();
              var vals = {}, ok = true;
              crit.forEach(function (c) {
                var s = el.querySelector('[data-crit="' + c.key + '"]');
                var v = s && s.value !== "" ? Number(s.value) : null;
                if (v == null) ok = false; vals[c.key] = v;
              });
              if (!ok) { toast("Hãy chọn band cho đủ 4 tiêu chí.", "warn"); return; }
              var avg = crit.reduce(function (a, c) { return a + vals[c.key]; }, 0) / crit.length;
              var srcBtn = el.querySelector(".sp-src .active");
              var teacher = srcBtn && srcBtn.getAttribute("data-src") === "teacher";
              I.updateSubmission(sub.id, { score: { band: I.roundOverall(avg), criteria: vals, bandSource: teacher ? "giáo viên" : "tự đánh giá", status: "assessed" } });
              toast("Đã lưu band ước tính " + I.fmtBand(I.roundOverall(avg)) + ".", "success");
              close();
              paint();
            } }
          ],
          onMount: function (el) {
            mEl = el;
            function upd() {
              var vals = [];
              crit.forEach(function (c) {
                var s = el.querySelector('[data-crit="' + c.key + '"]');
                var v = s && s.value !== "" ? Number(s.value) : null;
                var d = el.querySelector('[data-desc="' + c.key + '"]'); if (d) d.innerHTML = descFor(c.key, v);
                if (v != null) vals.push(v);
              });
              var tot = el.querySelector("[data-total]");
              if (tot) tot.textContent = vals.length === crit.length ? I.fmtBand(I.roundOverall(vals.reduce(function (a, x) { return a + x; }, 0) / vals.length)) : "—";
            }
            el.addEventListener("change", upd);
            el.addEventListener("click", function (e) {
              var b = e.target.closest(".sp-src button"); if (!b) return;
              Array.prototype.forEach.call(el.querySelectorAll(".sp-src button"), function (x) { x.classList.toggle("active", x === b); });
            });
            upd();
          }
        });
      }
      function descFor(key, v) {
        if (v == null || isNaN(v)) return "Chọn band để xem mô tả tham khảo.";
        var f = Math.floor(v), d = (DESCRIPTORS[key] || {})[f] || "";
        return "<b>Band " + f + ":</b> " + esc(d) + (v !== f ? " <i>(giữa band " + f + " và " + (f + 1) + ")</i>" : "");
      }
      function openError(refId, srcTitle) {
        var t = findTopic(refId), fEl = null;
        var html = '<div class="stack sp-errform">' +
          '<label class="field"><span class="field-label">Lỗi lặp lại *</span><input class="input" data-f="error" placeholder="VD: Quên chia động từ quá khứ khi kể chuyện Part 2"></label>' +
          '<label class="field"><span class="field-label">Ví dụ của mình</span><textarea class="textarea" data-f="example" rows="2" placeholder="Câu bạn đã nói…"></textarea></label>' +
          '<label class="field"><span class="field-label">Vì sao sai</span><textarea class="textarea" data-f="why" rows="2"></textarea></label>' +
          '<label class="field"><span class="field-label">Cách sửa</span><textarea class="textarea" data-f="fix" rows="2"></textarea></label>' +
          '<p class="tiny muted">Lỗi do bạn tự xác nhận (không có đáp án tự động). App sẽ hẹn kiểm tra lại sau 7 ngày.</p></div>';
        I.modal({
          title: "Ghi lỗi Speaking", html: html,
          actions: [
            { label: "Huỷ", kind: "ghost" },
            { label: "Lưu vào Sổ lỗi", kind: "primary", onClick: function (close) {
              var el = fEl; if (!el) return close();
              function val(k) { var x = el.querySelector('[data-f="' + k + '"]'); return x ? x.value.trim() : ""; }
              if (!val("error")) { toast("Hãy nhập lỗi lặp lại.", "warn"); return; }
              I.addError({ skill: "speaking", basis: "self", qtype: V.topicId ? "part" + V.part : "", source: srcTitle || (t ? t.title : "Speaking"),
                error: val("error"), example: val("example"), why: val("why"), fix: val("fix") });
              toast("Đã ghi vào Sổ lỗi — kiểm tra lại sau 7 ngày.", "success");
              close();
            } }
          ],
          onMount: function (el) { fEl = el; }
        });
      }

      /* ---------- TTS */
      function speakText(key, text) {
        if (!safe(function () { return I.tts.available(); }, false)) { toast("Trình duyệt không có giọng đọc tiếng Anh để phát câu mẫu.", "warn"); return; }
        if (S.ttsKey === key) { safe(function () { I.tts.stop(); }); S.ttsKey = null; paint(); return; }
        safe(function () { I.tts.stop(); });
        S.ttsKey = key; paint();
        var p = safe(function () { return I.tts.speak(text, { voice: "f" }); }, null);
        var fin = function () { if (S.alive && S.ttsKey === key) { S.ttsKey = null; paint(); } };
        if (p && p.then) p.then(fin, fin); else fin();
      }

      /* ---------- events */
      function leaveTopicState() { resetPractice(); S.micError = ""; releaseStream(); }
      function onClick(e) {
        var b = e.target.closest("[data-act]");
        if (!b || !root.contains(b) || b.disabled) return;
        var act = b.getAttribute("data-act");
        var t = V.topicId ? findTopic(V.topicId) : null;
        switch (act) {
          case "tab": I.go("speaking", { tab: b.getAttribute("data-tab") }); break;
          case "filter": V.filter = b.getAttribute("data-f"); paint(); break;
          case "open": {
            var p = { tab: V.tab, start: b.getAttribute("data-id") };
            if (b.getAttribute("data-part")) p.part = b.getAttribute("data-part");
            if (b.getAttribute("data-mode")) p.mode = b.getAttribute("data-mode");
            I.go("speaking", p); break;
          }
          case "back": I.go("speaking", { tab: V.tab }); break;
          case "mode":
            if (S.rec) { toast("Hãy dừng ghi âm trước.", "warn"); break; }
            leaveTopicState();
            V.mode = b.getAttribute("data-mode"); V.qIndex = 0;
            if (V.mode === "practice" && !S.practiceStart) S.practiceStart = I.beginPractice("speaking");
            syncHash(); paint(); safe(function () { root.querySelector(".sp-thead").scrollIntoView({ block: "start", behavior: "smooth" }); });
            break;
          case "part":
            if (S.rec) { toast("Hãy dừng ghi âm trước.", "warn"); break; }
            leaveTopicState();
            V.part = +b.getAttribute("data-part"); V.qIndex = 0;
            syncHash(); paint(); break;
          case "tts": if (t) { var s = sampleByKey(t, b.getAttribute("data-key")); if (s) speakText(s.key, stripMarkup(s.text)); } break;
          case "tts-q": speakText("q:" + b.getAttribute("data-text"), b.getAttribute("data-text")); break;
          case "learn-phrase": case "learn-all":
            if (!t) break;
            var list = phrasesOf(t).filter(function (p) { return act === "learn-all" ? !isAdded(p.id) : p.id === b.getAttribute("data-pid"); });
            list.forEach(function (p) {
              I.addCustomWord({ id: p.id, word: p.phrase, ipa: "", pos: "phr.", band: "7.0", vi: p.vi, example: p.example, topic: t.topic });
              I.learnWord(p.id, "speaking:" + t.id);
            });
            if (list.length) toast(list.length === 1 ? "Đã thêm “" + list[0].phrase + "” vào từ cần ôn." : "Đã thêm " + list.length + " cụm từ vào từ cần ôn.", "success");
            paint(); break;
          case "goto-q": {
            if (S.rec) { toast("Hãy dừng ghi âm trước khi chuyển câu.", "warn"); break; }
            var n = +b.getAttribute("data-i");
            if (n >= 0 && t && n < partQuestions(t, V.part).length) { V.qIndex = n; safe(function () { I.tts.stop(); }); S.ttsKey = null; paint(); }
            break;
          }
          case "rec-start": if (t) startRec({ tid: t.id, part: V.part, idx: +b.getAttribute("data-idx") }); break;
          case "rec-stop": stopRec(); break;
          case "rec-del":
            if (!t) break;
            I.confirm("Xoá bản ghi của câu này?", { okLabel: "Xoá", danger: true }).then(function (ok) {
              if (!ok || !S.alive) return; delAnswer({ tid: t.id, part: V.part, idx: +b.getAttribute("data-idx") }); paint();
            });
            break;
          case "toggle-sample": { var k = b.getAttribute("data-key"); S.showSample[k] = !S.showSample[k]; paint(); break; }
          case "p2-prep": if (t) p2Prep(t); break;
          case "p2-speak": if (t) p2Speak(t); break;
          case "p2-stop": p2Finish(); break;
          case "p2-reset":
            if (!t) break;
            (answerOf(t.id, 2, 0) ? I.confirm("Làm lại Part 2? Bản ghi hiện tại sẽ bị xoá.", { okLabel: "Làm lại", danger: true }) : Promise.resolve(true)).then(function (ok) {
              if (!ok || !S.alive) return;
              delAnswer({ tid: t.id, part: 2, idx: 0 });
              S.p2 = { phase: "cue" }; S.showSample = {}; paint();
            });
            break;
          case "submit": if (t) submitPart(t, +b.getAttribute("data-part")); break;
          case "hist-toggle": { var id = b.getAttribute("data-id"); _openHist[id] = !_openHist[id]; paint(); break; }
          case "assess": openAssess(b.getAttribute("data-id")); break;
          case "error": openError(b.getAttribute("data-ref"), b.getAttribute("data-src")); break;
        }
      }
      function onInput(e) {
        var ta = e.target.closest && e.target.closest("[data-sp-notes]");
        if (ta && V.topicId) {
          var d = partDraft(V.topicId, 2, true);
          d.notes = ta.value;
          clearTimeout(S.notesSave);
          S.notesSave = setTimeout(persist, 400);
        }
      }
      function onChange(e) {
        var inp = e.target.closest && e.target.closest("input[data-sp-file]");
        if (!inp || !V.topicId) return;
        var f = inp.files && inp.files[0]; if (!f) return;
        if (f.type && !/^audio\//.test(f.type) && !/^video\/webm/.test(f.type)) { toast("File này không phải file âm thanh.", "warn"); inp.value = ""; return; }
        if (f.size > 60 * 1024 * 1024) { toast("File quá lớn (tối đa 60 MB).", "warn"); inp.value = ""; return; }
        var ctx = { tid: V.topicId, part: +inp.getAttribute("data-part"), idx: +inp.getAttribute("data-idx") };
        I.audioDB.put(f).then(function (id) {
          setAnswer(ctx, id);
          if (!S.alive) return;
          if (ctx.part === 2) { clearP2Timer(); S.p2 = { phase: "done" }; }
          toast("Đã đính kèm file ghi âm.", "success");
          paint();
        }).catch(function () { toast("Không lưu được file vào bộ nhớ trình duyệt.", "error"); });
      }
      root.addEventListener("click", onClick);
      root.addEventListener("input", onInput);
      root.addEventListener("change", onChange);
      hydrateAudio();

      return function cleanup() {
        if (S.notesSave) { clearTimeout(S.notesSave); persist(); }
        S.alive = false;
        root.removeEventListener("click", onClick);
        root.removeEventListener("input", onInput);
        root.removeEventListener("change", onChange);
        clearP2Timer(); stopTick();
        if (S.rec) stopRec(); else releaseStream();
        if (I.confirmLeave) I.confirmLeave = null;
        safe(function () { I.tts.stop(); });
        Object.keys(S.urls).forEach(function (k) { safe(function () { URL.revokeObjectURL(S.urls[k]); }); });
        S.urls = {};
      };
    }
  });
})();
