/* Dashboard (A2) — Tổng quan */
(function () {
  "use strict";
  var I = window.IELTS;

  /* ---------- local helpers ---------- */
  function esc(s) { return I.esc(s == null ? "" : String(s)); }
  function ic(n, s) { return I.icon ? I.icon(n, s || 18) : ""; }
  function skName(k) { return I.skillName ? I.skillName(k) : k; }
  function fmtBand(b) { return I.fmtBand ? I.fmtBand(b) : (b == null ? "—" : Number(b).toFixed(1)); }
  function fmtDur(sec) { return I.fmtDuration ? I.fmtDuration(sec || 0) : Math.round((sec || 0) / 60) + " phút"; }
  function prof() { return I.state.profile; }
  function pct(a) {
    if (a == null || isNaN(a)) return null;
    a = Number(a);
    return Math.round(a > 0 && a <= 1 ? a * 100 : a);
  }
  function lookup(map, skill, key) {
    var m = map && map[skill];
    if (!m || !key) return key || "";
    var v = null;
    if (Array.isArray(m)) { m.forEach(function (x) { if (x && x.key === key) v = x; }); }
    else v = m[key];
    if (!v) return key;
    return typeof v === "string" ? v : (v.name || v.label || key);
  }
  function qtName(skill, key) {
    if (skill === "writing" || skill === "speaking") return lookup(I.CRITERIA, skill, key);
    return lookup(I.QTYPES, skill, key);
  }
  function bandOptions(sel, allowNull, min) {
    var out = allowNull ? '<option value="">Chưa biết</option>' : "";
    for (var b = min || 4; b <= 9.001; b += 0.5) {
      var v = b.toFixed(1);
      out += '<option value="' + v + '"' + (sel != null && Number(sel) === b ? " selected" : "") + ">" + v + "</option>";
    }
    return out;
  }
  function safe(fn, fallback) { try { var r = fn(); return r == null ? fallback : r; } catch (e) { return fallback; } }

  var KIND_LABEL = {
    section: "Section lẻ", full: "Full test", passage: "Passage lẻ", dictation: "Dictation",
    task1: "Task 1", task2: "Task 2", part1: "Part 1", part2: "Part 2", part3: "Part 3", manual: "Ngoài app"
  };
  var PRACTICE_ROUTE = {
    listening: function (type) { return { page: "listening", params: type ? { tab: "section", type: type } : { tab: "section" } }; },
    reading: function (type) { return { page: "reading", params: type ? { tab: "passage", type: type } : { tab: "passage" } }; },
    writing: function () { return { page: "writing", params: { tab: "task2" } }; },
    speaking: function () { return { page: "speaking", params: { tab: "forecast" } }; }
  };

  /* ---------- module view-state ---------- */
  var calYM = null;
  var hist = { skill: "listening", wtask: "task1", from: "", to: "" };
  var audioURLs = [];
  function revokeAudio() { audioURLs.forEach(function (u) { try { URL.revokeObjectURL(u); } catch (e) {} }); audioURLs = []; }

  /* ---------- 1. Hero ---------- */
  function heroHTML() {
    var p = prof(), aims = p.aims || {};
    var ov = safe(function () { return I.overallBand(); }, { band: null, complete: false });
    var missing = [], sources = {}, bands = {};
    I.skills.forEach(function (k) {
      var sb = safe(function () { return I.skillBand(k); }, { band: null, source: null });
      bands[k] = sb;
      if (sb.band == null) missing.push(skName(k));
      else { var src = sb.source || "không rõ nguồn"; (sources[src] = sources[src] || []).push(skName(k)); }
    });
    var note;
    if (ov.band != null) {
      note = "Trung bình 4 kỹ năng, làm tròn theo quy tắc IELTS. Nguồn: " +
        Object.keys(sources).map(function (s) { return esc(s) + " (" + sources[s].join(", ") + ")"; }).join("; ") + ".";
    } else if (missing.length === 4) {
      note = "Chưa có band nào. Nhập band hiện tại trong Cài đặt hoặc làm một full test để app ước tính.";
    } else {
      note = "Chưa đủ dữ liệu để ước tính overall — còn thiếu band " + missing.join(", ") + ".";
    }
    var gap = ov.band != null && aims.overall != null ? Math.round((aims.overall - ov.band) * 10) / 10 : null;
    var gapPill = gap == null ? "" : gap <= 0
      ? '<span class="pill good">Đã chạm aim</span>'
      : '<span class="pill warn">Còn ' + gap.toFixed(1) + " band</span>";

    var chips = I.skills.map(function (k) {
      var b = bands[k].band, a = aims[k];
      var reached = b != null && a != null && b >= a;
      return '<span class="db-chip sk-' + k + (reached ? " is-reached" : "") + '" title="' + esc(skName(k)) + ': hiện tại → aim">' +
        '<i class="db-dot"></i><span class="db-chip-name">' + esc(skName(k)) + "</span>" +
        "<b>" + fmtBand(b) + '</b><span class="db-chip-arrow">→</span><b>' + fmtBand(a) + "</b></span>";
    }).join("");

    var dte = safe(function () { return I.daysToExam(); }, null);
    var examCard;
    if (dte == null) {
      examCard = '<div class="db-stat-num"><span class="db-big db-big-l">—</span></div>' +
        '<div class="stat-foot">Chưa đặt ngày thi. <button class="db-link" data-act="go" data-page="settings">Đặt ngày thi</button></div>';
    } else {
      var startKey = safe(function () { return I.dayKeyOf(new Date(I.state.createdAt)); }, null) || I.calendarTodayVN();
      var span = Math.max(1, safe(function () { return I.diffDays(startKey, p.examDate); }, 1));
      var pct = Math.max(4, Math.min(100, Math.round((1 - dte / span) * 100)));
      var weeks = Math.floor(dte / 7), rest = dte % 7;
      examCard = '<div class="db-stat-num"><span class="db-big db-big-l">' + dte + '</span><span class="db-unit">ngày</span></div>' +
        '<div class="db-stat-mid">' + (dte === 0 ? "Hôm nay là ngày thi — chúc bạn bình tĩnh!" :
          (weeks ? "≈ " + weeks + " tuần" + (rest ? " " + rest + " ngày" : "") : "Chỉ còn vài ngày") + " nữa") + "</div>" +
        '<div class="db-stat-bottom"><div class="progress db-exam-bar" title="Đã đi được ' + pct + '% chặng đường"><div class="progress-bar" style="width:' + pct + '%"></div></div>' +
        '<div class="stat-foot">Thi ' + esc(I.fmtDay(p.examDate, "long")) + "</div></div>";
    }

    var streak = safe(function () { return I.streak(); }, 0);
    var checked = safe(function () { return I.isCheckedIn(I.todayKey()); }, false);
    var WDS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"], todayK = I.todayKey(), week = "";
    for (var wi = 6; wi >= 0; wi--) {
      var dk = I.addDays(todayK, -wi), on = safe(function () { return I.isCheckedIn(dk); }, false);
      week += '<span class="db-wk' + (on ? " on" : "") + (wi === 0 ? " today" : "") + '" title="' + esc(I.fmtDay(dk, "full")) + (on ? " · đã điểm danh" : "") + '">' +
        '<i>' + (on ? ic("check", 12) : "") + "</i><small>" + WDS[I.weekday(dk)] + "</small></span>";
    }
    var weekCount = 0;
    for (var wj = 0; wj < 7; wj++) { if (safe(function () { return I.isCheckedIn(I.addDays(todayK, -wj)); }, false)) weekCount++; }

    return '<section class="db-hero">' +
      '<div class="card tape db-hero-main">' +
        '<div class="db-hero-top">' +
          '<div class="db-hero-col">' +
            '<div class="stat-label">Overall ước tính</div>' +
            '<div class="db-big db-big-xl">' + fmtBand(ov.band) + "</div>" +
            '<span class="pill muted">ước tính · tham khảo</span>' +
          "</div>" +
          '<div class="db-hero-col db-hero-aim">' +
            '<div class="stat-label">Aim overall</div>' +
            '<div class="db-big db-big-xl db-aimnum">' + fmtBand(aims.overall) + "</div>" + gapPill +
          "</div>" +
        "</div>" +
        '<p class="small muted db-src">' + note + "</p>" +
        '<div class="db-chips">' + chips + "</div>" +
        '<div class="row db-hero-actions"><button class="btn ghost sm" data-act="edit-aims">' + ic("edit", 15) + " Sửa aim</button></div>" +
      "</div>" +
      '<div class="card stat db-hero-stat">' +
        '<div class="stat-label">' + ic("calendar-check", 16) + " Ngày đến kỳ thi</div>" + examCard +
      "</div>" +
      '<div class="card stat db-hero-stat db-streak' + (streak > 0 ? " is-on" : "") + '">' +
        '<div class="stat-label">' + ic("flame", 16) + " Chuỗi ngày học</div>" +
        '<div class="db-stat-num"><span class="db-big db-big-l">' + streak + '</span><span class="db-unit">ngày liên tiếp</span></div>' +
        '<div class="db-stat-mid">' + (checked ? "Đã điểm danh hôm nay ✓" : streak > 0 ? "Điểm danh hôm nay để giữ chuỗi" : "Điểm danh hôm nay để bắt đầu chuỗi") + "</div>" +
        '<div class="db-stat-bottom"><div class="db-week">' + week + "</div>" +
        '<div class="stat-foot">' + weekCount + "/7 ngày học trong tuần qua</div></div>" +
      "</div>" +
    "</section>";
  }

  /* ---------- 2. Attendance calendar + daily stats ---------- */
  var WD = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function shiftYM(ym, d) {
    var y = +ym.slice(0, 4), m = +ym.slice(5, 7) + d;
    while (m < 1) { m += 12; y--; }
    while (m > 12) { m -= 12; y++; }
    return y + "-" + pad(m);
  }
  function calHTML() {
    var today = I.todayKey(), curYM = today.slice(0, 7);
    if (!calYM) calYM = curYM;
    var y = +calYM.slice(0, 4), m = +calYM.slice(5, 7);
    var dim = new Date(Date.UTC(y, m, 0)).getUTCDate();
    var lead = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7;
    var att = I.state.attendance || {};
    var cells = "", nChecked = 0;
    for (var i = 0; i < lead; i++) cells += '<div class="db-day is-blank" aria-hidden="true"></div>';
    for (var d = 1; d <= dim; d++) {
      var key = calYM + "-" + pad(d);
      var isChecked = !!att[key];
      if (isChecked) nChecked++;
      var cls = "db-day" + (isChecked ? " is-checked" : "") + (key === today ? " is-today" : "") + (key > today ? " is-future" : "");
      var mins = key <= today ? safe(function () { return I.dayMinutes(key).total; }, 0) : 0;
      var title = I.fmtDay(key, "long") + (isChecked ? " — đã điểm danh" : "") + (mins ? " · " + fmtDur(mins) : "");
      cells += '<div class="' + cls + '" title="' + esc(title) + '"><span class="db-dnum">' + d + "</span>" +
        (isChecked ? '<span class="db-stamp" style="--rot:' + (((d * 37) % 17) - 8) + 'deg">' + ic("check", 14) + "</span>" : "") +
        (!isChecked && mins ? '<span class="db-studied"></span>' : "") + "</div>";
    }
    var checkedToday = !!att[today];
    return '<div class="card db-cal">' +
      '<div class="row between db-cal-head">' +
        '<button class="btn icon ghost sm" data-act="cal-prev" aria-label="Tháng trước">' + ic("chevron-left", 16) + "</button>" +
        '<div class="db-cal-title"><span class="hand">Tháng ' + m + ", " + y + '</span><span class="tiny muted">' + nChecked + " ngày điểm danh</span></div>" +
        '<button class="btn icon ghost sm" data-act="cal-next" aria-label="Tháng sau"' + (calYM >= curYM ? " disabled" : "") + ">" + ic("chevron-right", 16) + "</button>" +
      "</div>" +
      '<div class="db-cal-grid">' + WD.map(function (w) { return '<div class="db-wd">' + w + "</div>"; }).join("") + cells + "</div>" +
      '<div class="row between db-cal-foot">' +
        (calYM !== curYM ? '<button class="btn ghost sm" data-act="cal-today">Về tháng này</button>' : '<span class="tiny muted"><span class="db-legend-stamp"></span> đã điểm danh · <span class="db-legend-ring"></span> hôm nay</span>') +
        (checkedToday
          ? '<button class="btn sm" disabled>' + ic("check", 15) + " Đã điểm danh</button>"
          : '<button class="btn accent sm" data-act="checkin">' + ic("calendar-check", 15) + " Điểm danh hôm nay</button>") +
      "</div>" +
    "</div>";
  }
  function statsHTML() {
    var today = I.todayKey(), rows = "", any = false;
    for (var i = 0; i < 14; i++) {
      var day = I.addDays(today, -i);
      var c = safe(function () { return I.dayCounts(day); }, {}) || {};
      var tot = safe(function () { return I.dayMinutes(day).total; }, 0) || 0;
      var w1 = c.writingT1 || 0, w2 = c.writingT2 || 0;
      var empty = !(c.reading || c.listening || w1 || w2 || c.writing || c.speaking || tot);
      if (!empty) any = true;
      var n = function (v) { return v ? "<b>" + v + "</b>" : '<span class="db-zero">0</span>'; };
      rows += '<tr class="' + (empty ? "db-row-empty" : "") + (day === today ? " db-row-today" : "") + '">' +
        "<td>" + esc(I.fmtDay(day, "full")) + (day === today ? ' <span class="pill sm muted">hôm nay</span>' : "") + "</td>" +
        '<td class="sk-reading db-num">' + n(c.reading) + "</td>" +
        '<td class="sk-listening db-num">' + n(c.listening) + "</td>" +
        '<td class="sk-writing db-num">' + n(w1) + ' <span class="db-sep">·</span> ' + n(w2) + "</td>" +
        '<td class="sk-speaking db-num">' + n(c.speaking) + "</td>" +
        '<td class="db-total">' + (tot ? esc(fmtDur(tot)) : '<span class="db-zero">—</span>') + "</td></tr>";
    }
    return '<div class="card db-stats">' +
      '<div class="card-title">Thống kê 14 ngày học gần nhất</div>' +
      (any ? "" : '<p class="small muted db-stats-hint">Chưa có hoạt động nào. Số bài nộp và thời gian học sẽ hiện ở đây khi bạn nộp bài hoặc bấm giờ học.</p>') +
      '<div class="table-wrap"><table class="table db-stats-table"><thead><tr>' +
        "<th>Ngày/tháng/năm</th><th>Reading</th><th>Listening</th><th>Writing (T1 · T2)</th><th>Speaking</th><th>Tổng thời gian học</th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
      '<p class="tiny muted">Số bài = số lần nộp trong ngày học (bắt đầu 06:00). Tổng thời gian gồm cả Từ vựng.</p>' +
    "</div>";
  }

  /* ---------- 3. Four-skill profile ---------- */
  function skillCard(k) {
    var p = prof(), aim = (p.aims || {})[k];
    var sb = safe(function () { return I.skillBand(k); }, { band: null, source: null });
    var band = sb.band;
    var wa = safe(function () { return I.weakAreas(k); }, null) || {};
    var weak = wa.weak || [], strong = wa.strong || [], insuf = wa.insufficient || [];
    var manual = wa.manual != null ? wa.manual : ((p.manualWeak || {})[k] || "");
    var gap = band != null && aim != null ? Math.round((aim - band) * 10) / 10 : null;
    var width = band != null && aim ? Math.max(4, Math.min(100, band / aim * 100)) : 0;

    var accLine = "";
    if (k === "listening" || k === "reading") {
      var ra = safe(function () { return I.recentAccuracy(k, 5); }, null);
      if (ra && ra.count) accLine = '<div class="tiny muted">Accuracy gần đây ' + pct(ra.acc) + "% · " + ra.count + " bài</div>";
    }

    var weakHTML = weak.length ? '<ul class="db-areas db-weak">' + weak.slice(0, 3).map(function (w) {
      return "<li><div class=\"row between\"><b>" + esc(w.name || qtName(k, w.key)) + "</b>" +
        (w.acc != null ? '<span class="pill bad sm">' + (k === "writing" || k === "speaking" ? fmtBand(w.acc) : pct(w.acc) + "%") + "</span>" : "") + "</div>" +
        (w.advice ? '<div class="small muted">' + esc(w.advice) + "</div>" : "") + "</li>";
    }).join("") + "</ul>" : "";
    var strongHTML = strong.length ? '<div class="db-strong small"><span class="muted">Điểm mạnh:</span> ' + strong.slice(0, 4).map(function (s) {
      return '<span class="pill good sm">' + esc(s.name || qtName(k, s.key)) + "</span>";
    }).join(" ") + "</div>" : "";
    var improving = wa.improving || [];
    var impHTML = improving.length ? '<div class="db-strong small"><span class="muted">Đang cải thiện:</span> ' + improving.slice(0, 4).map(function (s) {
      return '<span class="pill warn sm">' + esc(s.name || qtName(k, s.key)) + "</span>";
    }).join(" ") + "</div>" : "";
    var insufHTML = insuf.length ? '<div class="db-insuf tiny muted">Chưa đủ dữ liệu: ' + insuf.slice(0, 5).map(function (s) {
      return esc(s.name || qtName(k, s.key)) + (s.total != null ? " (" + s.total + " câu)" : "");
    }).join(", ") + (insuf.length > 5 ? "…" : "") + "</div>" : "";
    var noData = !weak.length && !strong.length && !improving.length;
    var emptyAreas = noData
      ? '<div class="db-nodata small"><span class="pill muted">Chưa đủ dữ liệu</span> ' +
        (k === "listening" || k === "reading"
          ? "Cần ít nhất 20 câu ở 3 bộ bài khác nhau cho mỗi dạng để đánh giá điểm yếu."
          : "Cần bài đã tự đánh giá / giáo viên chấm theo tiêu chí để phân tích.") + "</div>"
      : "";

    // weakest type for deep link
    var type = weak[0] && weak[0].key;
    if (!type && (k === "listening" || k === "reading")) {
      var ts = safe(function () { return I.typeStats(k, { days: 30 }); }, []) || [];
      ts = ts.filter(function (t) { return t.total > 0; }).sort(function (a, b) { return (a.acc || 0) - (b.acc || 0); });
      if (ts[0]) type = ts[0].type;
    }
    var route = PRACTICE_ROUTE[k](k === "listening" || k === "reading" ? type : null);
    var goLabel = type && (k === "listening" || k === "reading") ? "Luyện ngay — " + qtName(k, type) : "Luyện ngay";

    return '<article class="card db-skill sk-' + k + '">' +
      '<div class="row between db-skill-head">' +
        '<div><div class="db-skill-name"><i class="db-dot"></i>' + esc(skName(k)) + "</div>" +
          '<div class="tiny muted">' + (band != null ? "Nguồn: " + esc(sb.source || "—") : "Chưa có band") + "</div>" + accLine + "</div>" +
        '<div class="db-skill-band"><span class="db-big">' + fmtBand(band) + '</span><span class="tiny muted">ước tính</span></div>' +
      "</div>" +
      '<div class="progress db-gapbar"><div class="progress-bar" style="width:' + width + '%"></div></div>' +
      '<div class="row between small db-gapline"><span>Aim <b>' + fmtBand(aim) + "</b></span>" +
        (gap == null ? '<span class="pill muted sm">Chưa đủ dữ liệu</span>'
          : gap <= 0 ? '<span class="pill good sm">Đạt aim</span>'
          : '<span class="pill warn sm">Cách aim ' + gap.toFixed(1) + "</span>") + "</div>" +
      '<div class="db-areas-wrap">' + (weak.length ? '<div class="tiny db-areas-title">Cần cải thiện</div>' : "") + weakHTML + impHTML + strongHTML + emptyAreas + insufHTML + "</div>" +
      '<div class="db-manual small">' + (manual ? '<span class="muted">Ghi chú của bạn:</span> ' + esc(manual) : '<span class="muted">Chưa có ghi chú điểm yếu.</span>') +
        ' <button class="db-link" data-act="edit-weak" data-skill="' + k + '">' + (manual ? "Sửa" : "Thêm ghi chú") + "</button></div>" +
      '<div class="row db-skill-foot"><button class="btn sk sm" data-act="go" data-page="' + route.page + '" data-params="' + esc(JSON.stringify(route.params)) + '">' +
        ic("play", 14) + " " + esc(goLabel) + "</button></div>" +
    "</article>";
  }

  /* ---------- 4. Submission history ---------- */
  function histFiltered(skill, wtask) {
    var subs = (I.state.submissions || []).filter(function (s) { return s.skill === skill; });
    if (skill === "writing" && wtask) {
      subs = subs.filter(function (s) {
        return s.kind === wtask || (s.kind === "manual" && s.detail && s.detail.task === wtask);
      });
    }
    if (hist.from) subs = subs.filter(function (s) { return s.day >= hist.from; });
    if (hist.to) subs = subs.filter(function (s) { return s.day <= hist.to; });
    return subs.slice().sort(function (a, b) { return String(b.at || "").localeCompare(String(a.at || "")); });
  }
  function kindLabel(s) {
    var l = KIND_LABEL[s.kind] || s.kind || "—";
    if (s.detail && s.detail.manual && s.kind !== "manual") l += " · ngoài app";
    return l;
  }
  function scoreHTML(s) {
    var sc = s.score || {}, parts = [];
    if (sc.raw != null && sc.total) parts.push("<b>" + sc.raw + "/" + sc.total + "</b>");
    if (sc.accuracy != null) parts.push(pct(sc.accuracy) + "%");
    var out = parts.join(" · ");
    if (sc.band != null) {
      out += (out ? " " : "") + '<span class="pill sk sm" title="Band ' + esc(sc.bandSource || "") + '">Band ' + fmtBand(sc.band) + "</span>" +
        (sc.bandSource ? '<div class="tiny muted">' + esc(sc.bandSource) + " · tham khảo</div>" : "");
    }
    return out || '<span class="muted">—</span>';
  }
  function statusHTML(s) {
    var st = (s.score || {}).status;
    var h = st === "graded" ? '<span class="pill good sm">Đã chấm</span>'
      : st === "assessed" ? '<span class="pill sk sm">Đã đánh giá</span>'
      : '<span class="pill muted sm">Chưa chấm</span>';
    if (s.repeat) h += ' <span class="pill muted sm" title="Đã làm đề này trước đó — không tính là bằng chứng chẩn đoán mới">Làm lại</span>';
    return h;
  }
  var EMPTY_HIST = {
    listening: { e: "🎧", t: "Chưa có bài Listening nào", x: "Làm một section lẻ hoặc một full test — kết quả và bài review sẽ được lưu ở đây.", page: "listening" },
    reading: { e: "📖", t: "Chưa có bài Reading nào", x: "Bắt đầu với bài đọc đề xuất hôm nay để có dữ liệu đầu tiên.", page: "reading" },
    writing: { e: "✍️", t: "Chưa có bài Writing nào ở mục này", x: "Viết một bài trong app hoặc ghi lại bài đã viết trên giấy.", page: "writing" },
    speaking: { e: "🎙️", t: "Chưa có bài Speaking nào", x: "Ghi âm một câu trả lời Part 2 để nghe lại và tự đánh giá.", page: "speaking" }
  };
  function historyHTML() {
    var tabs = I.skills.map(function (k) {
      var n = (I.state.submissions || []).filter(function (s) { return s.skill === k; }).length;
      return '<button class="tab' + (hist.skill === k ? " active" : "") + '" data-act="hist-tab" data-skill="' + k + '">' + esc(skName(k)) +
        (n ? ' <span class="db-count">' + n + "</span>" : "") + "</button>";
    }).join("");
    var sub = hist.skill === "writing"
      ? '<div class="seg db-wseg">' + ["task1", "task2"].map(function (t) {
          return '<button class="' + (hist.wtask === t ? "active" : "") + '" data-act="hist-wtask" data-task="' + t + '">' + (t === "task1" ? "Task 1" : "Task 2") + "</button>";
        }).join("") + "</div>"
      : "";
    var list = histFiltered(hist.skill, hist.skill === "writing" ? hist.wtask : null);
    var body;
    if (!list.length) {
      var em = EMPTY_HIST[hist.skill];
      var filtered = hist.from || hist.to;
      body = '<div class="empty db-empty">' +
        '<div class="empty-emoji">' + (filtered ? "🗓️" : em.e) + "</div>" +
        '<div class="empty-title">' + (filtered ? "Không có bài nào trong khoảng ngày này" : em.t) + "</div>" +
        '<div class="empty-text">' + (filtered ? "Thử nới rộng khoảng ngày hoặc xoá bộ lọc." : em.x) + "</div>" +
        (filtered ? '<button class="btn ghost sm" data-act="hist-clear">Xoá bộ lọc</button>'
          : '<div class="row wrap db-empty-actions"><button class="btn sk sm sk-' + hist.skill + '" data-act="go" data-page="' + em.page + '">Mở ' + esc(skName(hist.skill)) + '</button>' +
            '<button class="btn ghost sm" data-act="manual">' + ic("plus", 14) + " Ghi bài làm ngoài app</button></div>") +
      "</div>";
    } else {
      body = '<div class="table-wrap"><table class="table db-hist-table"><thead><tr>' +
        "<th>Ngày</th><th>Bài làm</th><th>Loại</th><th>Điểm</th><th>Thời gian</th><th>Trạng thái</th><th></th></tr></thead><tbody>" +
        list.map(function (s) {
          return "<tr><td class=\"db-nowrap\">" + esc(I.fmtDay(s.day, "full")) + "</td>" +
            "<td><div class=\"db-htitle\">" + esc(s.title || "(không tên)") + "</div></td>" +
            '<td class="db-nowrap">' + esc(kindLabel(s)) + "</td>" +
            "<td>" + scoreHTML(s) + "</td>" +
            '<td class="db-nowrap">' + esc(fmtDur(s.seconds)) + "</td>" +
            "<td>" + statusHTML(s) + "</td>" +
            '<td><button class="btn ghost sm" data-act="view" data-id="' + esc(s.id) + '">' + ic("eye", 14) + " Xem</button></td></tr>";
        }).join("") + "</tbody></table></div>";
    }
    return '<div class="card db-hist sk-' + hist.skill + '">' +
      '<div class="row between wrap db-hist-bar">' +
        '<div class="tabs">' + tabs + "</div>" +
        '<button class="btn primary sm" data-act="manual">' + ic("plus", 14) + " Ghi bài làm ngoài app</button>" +
      "</div>" +
      '<div class="row between wrap db-hist-filters">' + (sub || "<span></span>") +
        '<div class="row wrap db-dates">' +
          '<label class="db-date"><span class="tiny muted">Từ ngày</span><input type="date" class="input" data-act="hist-from" value="' + esc(hist.from) + '"></label>' +
          '<label class="db-date"><span class="tiny muted">Đến ngày</span><input type="date" class="input" data-act="hist-to" value="' + esc(hist.to) + '"></label>' +
          (hist.from || hist.to ? '<button class="btn ghost sm" data-act="hist-clear">' + ic("x", 14) + " Xoá lọc</button>" : "") +
        "</div>" +
      "</div>" + body +
    "</div>";
  }

  /* ---------- detail modal ---------- */
  function ansText(a) {
    if (a == null || a === "") return '<span class="muted">(bỏ trống)</span>';
    if (Array.isArray(a)) return esc(a.join(" / "));
    return esc(a);
  }
  function criteriaTable(skill, crit) {
    if (!crit) return "";
    var keys = Object.keys(crit);
    if (!keys.length) return "";
    return '<table class="table db-crit"><thead><tr><th>Tiêu chí</th><th>Band</th></tr></thead><tbody>' +
      keys.map(function (c) { return "<tr><td>" + esc(lookup(I.CRITERIA, skill, c)) + "</td><td><b>" + fmtBand(crit[c]) + "</b></td></tr>"; }).join("") +
      "</tbody></table>";
  }
  function detailHTML(s) {
    var d = s.detail || {}, sc = s.score || {};
    var head = '<div class="db-detail-meta">' +
      '<span class="pill sk sm sk-' + s.skill + '">' + esc(skName(s.skill)) + "</span> " +
      '<span class="pill muted sm">' + esc(kindLabel(s)) + "</span> " +
      '<span class="small muted">' + esc(I.fmtDay(s.day, "long")) + " · " + esc(fmtDur(s.seconds)) + "</span></div>" +
      '<div class="db-detail-score">' + scoreHTML(s) + " " + statusHTML(s) + "</div>";
    var body = "";
    var results = d.results || [];
    if (results.length) {
      var right = results.filter(function (r) { return r.correct; }).length;
      body += '<div class="card-title">Đáp án từng câu <span class="small muted">(' + right + "/" + results.length + " đúng)</span></div>" +
        '<div class="table-wrap"><table class="table db-ans"><thead><tr><th>Câu</th><th>Dạng</th><th>Bạn trả lời</th><th>Đáp án đúng</th><th></th></tr></thead><tbody>' +
        results.map(function (r) {
          return '<tr class="' + (r.correct ? "is-ok" : "is-bad") + '"><td><b>' + esc(r.n) + "</b></td>" +
            '<td class="small">' + esc(qtName(s.skill, r.type)) + "</td>" +
            "<td>" + ansText(r.user) + "</td><td>" + ansText(r.answer) + "</td>" +
            '<td class="db-mark">' + (r.correct ? '<span class="db-ok">✓</span>' : '<span class="db-bad">✗</span>') + "</td></tr>";
        }).join("") + "</tbody></table></div>";
    }
    if (Array.isArray(d.perPassage) && d.perPassage.length) {
      body += '<div class="row wrap db-perpass">' + d.perPassage.map(function (pp) {
        return '<span class="pill muted">' + esc(pp.title || pp.id || "") + (pp.raw != null ? ": " + pp.raw + "/" + (pp.total || "?") : "") + "</span>";
      }).join(" ") + "</div>";
    }
    if (d.text) {
      var words = d.words || String(d.text).trim().split(/\s+/).filter(Boolean).length;
      body += '<div class="card-title">' + (s.skill === "speaking" ? "Nội dung / transcript" : "Bài viết") + ' <span class="small muted">(' + words + " từ)</span></div>" +
        '<div class="db-essay">' + esc(d.text) + "</div>";
    }
    body += criteriaTable(s.skill, sc.criteria);
    if (d.audioId) body += '<div class="card-title">Bản ghi âm</div><div class="db-audio" id="db-audio-slot"><span class="small muted">Đang tải bản ghi…</span></div>';
    if (d.notes) body += '<div class="card-title">Ghi chú</div><div class="db-essay db-notes">' + esc(d.notes) + "</div>";
    if (!body) body = '<div class="empty"><div class="empty-emoji">🗒️</div><div class="empty-text">Bài này không có chi tiết bổ sung.</div></div>';
    return '<div class="db-detail">' + head + body + "</div>";
  }
  function openDetail(id) {
    var s = (I.state.submissions || []).filter(function (x) { return x.id === id; })[0];
    if (!s) return;
    revokeAudio();
    I.modal({
      title: s.title || "Chi tiết bài làm",
      wide: true,
      html: detailHTML(s),
      actions: [{ label: "Đóng", kind: "primary", onClick: function (close) { close(); } }],
      onMount: function (el) {
        var aid = s.detail && s.detail.audioId;
        if (!aid) return;
        var slot = el.querySelector("#db-audio-slot");
        if (!I.audioDB || !I.audioDB.get) { if (slot) slot.innerHTML = '<span class="small muted">Trình duyệt không hỗ trợ lưu bản ghi.</span>'; return; }
        I.audioDB.get(aid).then(function (blob) {
          if (!slot) return;
          if (!blob) { slot.innerHTML = '<span class="small muted">Không tìm thấy bản ghi (có thể đã bị xoá khỏi trình duyệt).</span>'; return; }
          var url = URL.createObjectURL(blob);
          audioURLs.push(url);
          slot.innerHTML = '<audio controls preload="metadata" src="' + url + '"></audio>';
        }).catch(function () {
          if (slot) slot.innerHTML = '<span class="small muted">Không mở được bản ghi.</span>';
        });
      }
    });
  }

  /* ---------- modals: aims, weak note, manual submission ---------- */
  function openAims() {
    var p = prof(), aims = p.aims || {}, el = null;
    var rows = ["overall"].concat(I.skills).map(function (k) {
      return '<label class="field' + (k === "overall" ? " db-aim-overall" : " sk-" + k) + '"><span class="field-label">' +
        (k === "overall" ? "Aim overall" : esc(skName(k))) + '</span><select class="select" name="' + k + '">' + bandOptions(aims[k], false, 4) + "</select></label>";
    }).join("");
    I.modal({
      title: "Sửa mục tiêu (aim)",
      html: '<p class="small muted">Aim dùng để tính khoảng cách và phân bổ thời gian học mỗi ngày.</p><div class="grid g-2 db-aims-form">' + rows + "</div>",
      onMount: function (m) { el = m; },
      actions: [
        { label: "Huỷ", kind: "ghost", onClick: function (close) { close(); } },
        { label: "Lưu aim", kind: "primary", onClick: function (close) {
          if (!el) return close();
          var a = p.aims || (p.aims = {});
          ["overall"].concat(I.skills).forEach(function (k) {
            var v = el.querySelector('[name="' + k + '"]');
            if (v && v.value) a[k] = Number(v.value);
          });
          I.save();
          I.toast("Đã lưu aim mới", "success");
          close();
        } }
      ]
    });
  }
  function openWeak(k) {
    var p = prof(), el = null;
    p.manualWeak = p.manualWeak || {};
    I.modal({
      title: "Ghi chú điểm yếu — " + skName(k),
      html: '<label class="field"><span class="field-label">Điều bạn hoặc giáo viên nhận thấy</span>' +
        '<textarea class="textarea" name="note" rows="4" placeholder="VD: hay nghe nhầm số; chưa phát triển ý trong body paragraph…">' + esc(p.manualWeak[k] || "") + "</textarea></label>",
      onMount: function (m) { el = m; var t = m.querySelector("textarea"); if (t) t.focus(); },
      actions: [
        { label: "Huỷ", kind: "ghost", onClick: function (close) { close(); } },
        { label: "Lưu ghi chú", kind: "primary", onClick: function (close) {
          p.manualWeak[k] = el ? el.querySelector("textarea").value.trim() : "";
          I.save();
          I.toast("Đã lưu ghi chú", "success");
          close();
        } }
      ]
    });
  }
  function openManual(defSkill) {
    var el = null, clientKey = (I.uid ? I.uid("mk") : "mk" + Date.now());
    var sk = defSkill || hist.skill || "writing";
    var html = '<div class="stack db-mform">' +
      '<p class="small muted">Ghi lại bài bạn đã làm trên giấy, sách hoặc với giáo viên. Bài được tính vào thống kê ngày và thời gian học hôm nay.</p>' +
      '<div class="grid g-2">' +
        '<label class="field"><span class="field-label">Kỹ năng</span><select class="select" name="skill">' +
          I.skills.map(function (k) { return '<option value="' + k + '"' + (k === sk ? " selected" : "") + ">" + esc(skName(k)) + "</option>"; }).join("") + "</select></label>" +
        '<label class="field db-m-task"><span class="field-label">Loại bài Writing</span><select class="select" name="task">' +
          '<option value="task1"' + (hist.wtask === "task1" ? " selected" : "") + '>Task 1</option><option value="task2"' + (hist.wtask === "task2" ? " selected" : "") + ">Task 2</option></select></label>" +
      "</div>" +
      '<label class="field"><span class="field-label">Tên bài</span><input class="input" name="title" maxlength="140" placeholder="VD: Cambridge 18 Test 2 — Passage 3"></label>' +
      '<div class="grid g-3">' +
        '<label class="field"><span class="field-label">Thời gian (phút)</span><input class="input" name="mins" type="number" min="0" max="600" step="5" value="30"></label>' +
        '<label class="field db-m-lr"><span class="field-label">Số câu đúng</span><input class="input" name="raw" type="number" min="0" max="40" placeholder="tuỳ chọn"></label>' +
        '<label class="field db-m-lr"><span class="field-label">Tổng số câu</span><input class="input" name="total" type="number" min="1" max="40" placeholder="tuỳ chọn"></label>' +
      "</div>" +
      '<label class="field"><span class="field-label db-m-textlabel">Ghi chú</span><textarea class="textarea" name="text" rows="6" placeholder=""></textarea></label>' +
      '<div class="grid g-2">' +
        '<label class="field"><span class="field-label">Band tự chấm / giáo viên chấm</span><select class="select" name="band"><option value="">Không chấm</option>' + bandOptions(null, false, 1) + "</select></label>" +
        '<label class="field"><span class="field-label">Nguồn band</span><select class="select" name="src"><option value="tự đánh giá">Tự đánh giá</option><option value="giáo viên">Giáo viên chấm</option></select></label>' +
      "</div>" +
    "</div>";
    function sync() {
      if (!el) return;
      var s = el.querySelector('[name="skill"]').value;
      el.querySelector(".db-m-task").style.display = s === "writing" ? "" : "none";
      Array.prototype.forEach.call(el.querySelectorAll(".db-m-lr"), function (n) { n.style.display = (s === "listening" || s === "reading") ? "" : "none"; });
      var lab = el.querySelector(".db-m-textlabel"), ta = el.querySelector('[name="text"]');
      if (s === "writing") { lab.textContent = "Bài viết hoặc ghi chú"; ta.placeholder = "Dán bài viết của bạn (nếu có) hoặc ghi chú nhận xét…"; }
      else if (s === "speaking") { lab.textContent = "Ghi chú / ý chính đã nói"; ta.placeholder = "Đề bài, ý chính, nhận xét của giáo viên…"; }
      else { lab.textContent = "Ghi chú"; ta.placeholder = "Dạng câu sai nhiều, lý do, điều cần nhớ…"; }
    }
    I.modal({
      title: "Ghi bài làm ngoài app",
      wide: true,
      html: html,
      onMount: function (m) {
        el = m; sync();
        m.querySelector('[name="skill"]').addEventListener("change", sync);
        var t = m.querySelector('[name="title"]'); if (t) t.focus();
      },
      actions: [
        { label: "Huỷ", kind: "ghost", onClick: function (close) { close(); } },
        { label: "Lưu bài làm", kind: "primary", onClick: function (close) {
          if (!el) return;
          var v = function (n) { var x = el.querySelector('[name="' + n + '"]'); return x ? x.value : ""; };
          var skill = v("skill"), title = v("title").trim();
          if (!title) { I.toast("Hãy nhập tên bài làm", "warn"); el.querySelector('[name="title"]').focus(); return; }
          var mins = Math.max(0, Math.min(600, Number(v("mins")) || 0));
          var text = v("text").trim();
          var band = v("band") === "" ? null : Number(v("band"));
          var raw = null, total = null, acc = null;
          if (skill === "listening" || skill === "reading") {
            if (v("raw") !== "" && v("total") !== "") {
              raw = Math.max(0, Number(v("raw"))); total = Math.max(1, Number(v("total")));
              if (raw > total) { I.toast("Số câu đúng không thể lớn hơn tổng số câu", "warn"); return; }
              acc = Math.round(raw / total * 100);
            }
          }
          var kind = skill === "writing" ? v("task") : "manual";
          var detail = { manual: true, notes: skill === "writing" ? "" : text };
          if (skill === "writing") {
            detail.text = text;
            detail.words = text ? text.split(/\s+/).filter(Boolean).length : 0;
            detail.task = kind;
          }
          var sub = {
            skill: skill, kind: kind, refId: I.uid ? I.uid("manual") : "manual-" + Date.now(), title: title,
            seconds: mins * 60, clientKey: clientKey,
            score: {
              raw: raw, total: total, accuracy: acc, band: band,
              bandSource: band != null ? v("src") : null, criteria: null,
              status: band != null ? "assessed" : (raw != null ? "graded" : "ungraded")
            },
            detail: detail
          };
          try {
            I.recordSubmission(sub);
            I.toast("Đã ghi bài làm ngoài app" + (mins ? " (" + mins + " phút " + skName(skill) + ")" : ""), "success");
            hist.skill = skill;
            if (skill === "writing") hist.wtask = kind;
            close();
          } catch (e) {
            I.toast((e && e.message) || "Không lưu được bài làm", "error");
          }
        } }
      ]
    });
  }

  /* ---------- page ---------- */
  function inner() {
    var p = prof(), today = I.todayKey();
    var name = (p.name || "").trim();
    return '<header class="page-head">' +
        '<div><div class="page-kicker">' + esc(I.fmtDay(today, "long")) + '</div>' +
        '<h1 class="page-title">' + (name ? "Chào " + esc(name) + "!" : "Tổng quan") + "</h1>" +
        '<p class="page-sub">Bức tranh hiện tại của bạn: band ước tính, chuyên cần và những gì cần luyện tiếp.</p></div>' +
        '<div class="page-actions"><button class="btn primary" data-act="go" data-page="today">' + ic("sun", 16) + " Kế hoạch hôm nay</button></div>" +
      "</header>" +
      heroHTML() +
      '<section class="db-att"><div class="db-att-cal">' + calHTML() + '</div><div class="db-att-stats">' + statsHTML() + "</div></section>" +
      '<h2 class="section-title">Hồ sơ bốn kỹ năng</h2>' +
      '<section class="grid g-2 db-skills">' + I.skills.map(skillCard).join("") + "</section>" +
      '<h2 class="section-title">Lịch sử bài làm</h2>' +
      '<section id="db-hist-slot">' + historyHTML() + "</section>";
  }

  I.registerPage({
    id: "dashboard",
    label: "Tổng quan",
    icon: "home",
    skill: null,
    group: "study",
    order: 1,
    render: function () {
      return '<div class="page db-page">' + inner() + "</div>";
    },
    mount: function (root, params) {
      var el = root.querySelector(".db-page") || root;
      var pending = 0;
      function rerender() {
        if (pending) return;
        pending = setTimeout(function () {
          pending = 0;
          if (el.isConnected !== false) el.innerHTML = inner();
        }, 30);
      }
      function rerenderHist() {
        var slot = el.querySelector("#db-hist-slot");
        if (slot) slot.innerHTML = historyHTML();
      }
      function rerenderCal() {
        var c = el.querySelector(".db-att-cal");
        if (c) c.innerHTML = calHTML();
      }
      function onClick(e) {
        var t = e.target.closest ? e.target.closest("[data-act]") : null;
        if (!t || !el.contains(t)) return;
        var act = t.getAttribute("data-act");
        if (t.tagName === "INPUT") return;
        switch (act) {
          case "go": {
            var prm = null;
            try { prm = JSON.parse(t.getAttribute("data-params") || "null"); } catch (err) { prm = null; }
            I.go(t.getAttribute("data-page"), prm || {});
            break;
          }
          case "edit-aims": openAims(); break;
          case "edit-weak": openWeak(t.getAttribute("data-skill")); break;
          case "cal-prev": calYM = shiftYM(calYM, -1); rerenderCal(); break;
          case "cal-next": calYM = shiftYM(calYM, 1); rerenderCal(); break;
          case "cal-today": calYM = null; rerenderCal(); break;
          case "checkin":
            if (safe(function () { return I.isCheckedIn(I.todayKey()); }, false)) {
              I.toast("Bạn đã điểm danh hôm nay rồi", "info");
            } else {
              I.checkIn();
              I.toast("Đã điểm danh hôm nay — giữ vững chuỗi nhé!", "success");
            }
            rerender();
            break;
          case "hist-tab": hist.skill = t.getAttribute("data-skill"); rerenderHist(); break;
          case "hist-wtask": hist.wtask = t.getAttribute("data-task"); rerenderHist(); break;
          case "hist-clear": hist.from = ""; hist.to = ""; rerenderHist(); break;
          case "view": openDetail(t.getAttribute("data-id")); break;
          case "manual": openManual(); break;
        }
      }
      function onChange(e) {
        var t = e.target, act = t && t.getAttribute && t.getAttribute("data-act");
        if (act === "hist-from") { hist.from = t.value || ""; rerenderHist(); }
        if (act === "hist-to") { hist.to = t.value || ""; rerenderHist(); }
      }
      el.addEventListener("click", onClick);
      el.addEventListener("change", onChange);
      I.on("change", rerender);
      I.on("day", rerender);
      if (params && params.add === "1") openManual(params.skill);
      return function () {
        el.removeEventListener("click", onClick);
        el.removeEventListener("change", onChange);
        I.off("change", rerender);
        I.off("day", rerender);
        if (pending) clearTimeout(pending);
        revokeAudio();
      };
    }
  });
})();
