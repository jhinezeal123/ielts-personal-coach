/* IELTS Coach — app.js (A1)
 * Boot: sidebar nav, topbar (study day, streak, check-in, global study timer), onboarding, router start.
 */
(function () {
  "use strict";

  var I = window.IELTS;
  if (!I || !I.state) {
    var v = document.getElementById("view");
    if (v) v.innerHTML = '<div style="padding:32px;font-family:system-ui,sans-serif">Không tải được <b>js/core.js</b>. Hãy kiểm tra thư mục ứng dụng còn đủ tệp.</div>';
    return;
  }
  var esc = I.esc;

  var GROUPS = [
    { id: "study", label: "Học tập" },
    { id: "practice", label: "Luyện tập" },
    { id: "track", label: "Theo dõi" }
  ];
  var ui = { routeId: null, pageSkill: null, chosenSkill: null };
  var els = {};

  /* ------------------------------------------------------------------ *
   * Nav model: defaults merged with registered pages (missing pages still listed → friendly fallback)
   * ------------------------------------------------------------------ */
  function navItems() {
    var map = {}, out = [];
    (I.navDefaults || []).forEach(function (d) { map[d.id] = Object.assign({}, d, { missing: true }); });
    Object.keys(I.pages || {}).forEach(function (id) {
      var p = I.pages[id], base = map[id] || { id: id, label: id, icon: "star", skill: null, group: "track", order: 99 };
      map[id] = Object.assign({}, base, {
        label: p.label || base.label, icon: p.icon || base.icon,
        skill: p.skill !== undefined ? p.skill : base.skill,
        group: p.group || base.group, order: p.order !== undefined ? p.order : base.order,
        missing: false
      });
    });
    Object.keys(map).forEach(function (k) { out.push(map[k]); });
    out.sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    return out;
  }
  function navMeta(id) { return navItems().filter(function (n) { return n.id === id; })[0] || null; }

  function safe(fn, dflt) { try { return fn(); } catch (e) { return dflt; } }

  /* ------------------------------------------------------------------ *
   * Sidebar
   * ------------------------------------------------------------------ */
  var SPARKLE = '<svg class="brand-doodle" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" fill="currentColor"/></svg>';

  function renderSidebar() {
    if (!els.sidebar) return;
    var st = I.state, name = (st.profile.name || "").trim();
    var active = ui.routeId || I.route().id;
    var dueErr = safe(function () { return I.dueErrors().length; }, 0);
    var dueWords = safe(function () { return I.dueWords().length; }, 0);
    var items = navItems();
    var html = '<a class="brand" href="#/dashboard" aria-label="IELTS Coach — Tổng quan">' +
      '<span class="brand-mark">' + I.icon("sparkles", 20) + '</span>' +
      '<span class="brand-name">IELTS <b>Coach</b></span>' + SPARKLE + '</a>';
    html += '<div class="learner" title="' + esc(name || "Bạn học IELTS") + '">' +
      '<span class="avatar">' + esc(name ? name.charAt(0).toUpperCase() : "✿") + '</span>' +
      '<span class="learner-meta"><div class="learner-hi">Xin chào</div><div class="learner-name">' + esc(name || "Bạn học IELTS") + '</div></span></div>';
    html += '<nav class="nav">';
    GROUPS.forEach(function (g) {
      var list = items.filter(function (n) { return n.group === g.id; });
      if (!list.length) return;
      html += '<div class="nav-group"><div class="nav-group-title">' + esc(g.label) + "</div>";
      list.forEach(function (n) {
        var badge = n.id === "errors" && dueErr ? dueErr : (n.id === "vocab" && dueWords ? dueWords : 0);
        html += '<a class="nav-item' + (n.skill ? " sk-" + esc(n.skill) : "") + (n.id === active ? " active" : "") +
          '" href="#/' + esc(n.id) + '" data-nav="' + esc(n.id) + '" title="' + esc(n.label) + '"' + (n.id === active ? ' aria-current="page"' : "") + ">" +
          '<span class="nav-ic">' + I.icon(n.icon, 19) + "</span>" +
          '<span class="nav-label">' + esc(n.label) + "</span>" +
          (badge ? '<span class="nav-badge" title="Đến hạn">' + badge + "</span>" : "") +
          (n.skill ? '<span class="nav-dot" aria-hidden="true"></span>' : "") +
          "</a>";
      });
      html += "</div>";
    });
    html += "</nav>";
    var dte = safe(function () { return I.daysToExam(); }, null);
    html += '<div class="sidebar-foot">' + (dte !== null ?
      '<div class="exam-countdown" title="Ngày thi ' + esc(I.fmtDay(st.profile.examDate, "full")) + '"><div class="ec-num">' + dte + '</div>' +
      '<div class="ec-label">ngày đến kỳ thi</div><div class="ec-date">' + esc(I.fmtDay(st.profile.examDate, "long")) + "</div></div>" :
      '<div class="exam-countdown"><div class="ec-num">' + I.icon("target", 22) + '</div><div class="ec-label">Chưa đặt ngày thi</div>' +
      '<div class="ec-date"><a href="#/settings">Đặt trong Cài đặt</a></div></div>') + "</div>";
    els.sidebar.innerHTML = html;
  }

  /* ------------------------------------------------------------------ *
   * Topbar + global study timer widget
   * ------------------------------------------------------------------ */
  function widgetSkill() {
    var t = I.timer || {};
    if (t.running && t.skill) return t.skill;
    return ui.chosenSkill || ui.pageSkill || t.lastSkill || "listening";
  }
  function timerHTML() {
    var t = I.timer || {}, skill = widgetSkill();
    var elapsed = I.timerElapsed();
    var cls = "timer-widget sk-" + esc(skill) + (t.running ? " running" : "") + (t.running && t.paused ? " paused" : "");
    var opts = I.planSkills.map(function (k) {
      return '<option value="' + k + '"' + (k === skill ? " selected" : "") + ">" + esc(I.skillName(k)) + "</option>";
    }).join("");
    var btns;
    if (!t.running) {
      btns = '<button type="button" class="tw-btn go" data-tw="start" title="Bắt đầu tính giờ">' + I.icon("play", 14) + "<span>Bắt đầu</span></button>";
    } else if (t.paused) {
      btns = '<button type="button" class="tw-btn go" data-tw="resume" title="Tiếp tục">' + I.icon("play", 14) + "<span>Tiếp tục</span></button>" +
        '<button type="button" class="tw-btn finish" data-tw="finish" title="Kết thúc và ghi thời gian">' + I.icon("flag", 14) + "</button>";
    } else {
      btns = '<button type="button" class="tw-btn" data-tw="pause" title="Tạm dừng" aria-label="Tạm dừng">' + I.icon("pause", 14) + "</button>" +
        '<button type="button" class="tw-btn finish" data-tw="finish" title="Kết thúc và ghi thời gian">' + I.icon("flag", 14) + "<span>Kết thúc</span></button>";
    }
    return '<div class="' + cls + '" role="group" aria-label="Đồng hồ học">' +
      '<span class="tw-dot" aria-hidden="true"></span>' +
      '<select class="tw-skill" data-tw-skill aria-label="Kỹ năng đang học"' + (t.running ? " disabled" : "") + ">" + opts + "</select>" +
      '<span class="tw-time" data-tw-time aria-live="off">' + I.fmtClock(elapsed) + "</span>" + btns + "</div>";
  }
  function renderTopbar() {
    if (!els.topbar) return;
    var today = I.todayKey();
    var streak = safe(function () { return I.streak(); }, 0);
    var checked = I.isCheckedIn(today);
    var rh = Number(I.state.profile.resetHour);
    var rhLabel = (isNaN(rh) ? 6 : rh) < 10 ? "0" + (isNaN(rh) ? 6 : rh) : String(rh);
    els.topbar.innerHTML =
      '<div class="topbar-date"><span class="td-kicker">Ngày học · đổi ngày lúc ' + rhLabel + ':00</span>' +
      '<span class="td-date">' + esc(I.fmtDay(today, "long")) + "</span></div>" +
      '<div class="topbar-actions">' +
      '<span class="streak-pill' + (streak > 0 ? " hot" : "") + '" title="Chuỗi ngày điểm danh liên tiếp">' + I.icon("flame", 19) +
      "<span>" + streak + "</span><small>ngày liên tiếp</small></span>" +
      (checked ?
        '<button type="button" class="btn sm checkin-btn done" disabled title="Hôm nay bạn đã điểm danh">' + I.icon("check", 15) + '<span><span class="label-long">Đã </span>điểm danh ✓</span></button>' :
        '<button type="button" class="btn sm accent checkin-btn" data-checkin title="Điểm danh ngày học hôm nay">' + I.icon("calendar-check", 15) + "<span>Điểm danh</span></button>") +
      timerHTML() + "</div>";
    updateTitle();
  }
  function updateTitle() {
    var t = I.timer || {};
    document.title = t.running ? ((t.paused ? "⏸ " : "⏱ ") + I.fmtClock(I.timerElapsed()) + " · " + I.skillName(t.skill) + " — IELTS Coach") : "IELTS Coach";
  }
  function onTopbarClick(e) {
    var b = e.target.closest ? e.target.closest("[data-tw],[data-checkin]") : null;
    if (!b) return;
    if (b.hasAttribute("data-checkin")) {
      if (I.checkIn()) I.toast("Đã điểm danh hôm nay. Giữ vững chuỗi nhé! 🔥", "success");
      return;
    }
    var act = b.getAttribute("data-tw");
    if (act === "start") {
      var sel = els.topbar.querySelector("[data-tw-skill]");
      I.timerStart(sel ? sel.value : widgetSkill());
    } else if (act === "pause") I.timerPause();
    else if (act === "resume") I.timerResume();
    else if (act === "finish") {
      var res = I.timerFinish();
      if (res.saved) I.toast("Đã ghi " + I.fmtDuration(res.seconds) + " " + I.skillName(res.skill), "success");
      else I.toast("Phiên học dưới 30 giây nên chưa được ghi.", "info");
    }
  }
  function onTopbarChange(e) {
    if (e.target && e.target.hasAttribute && e.target.hasAttribute("data-tw-skill")) {
      ui.chosenSkill = e.target.value;
      renderTopbar();
    }
  }

  /* ------------------------------------------------------------------ *
   * Onboarding (3 steps)
   * ------------------------------------------------------------------ */
  function bandOptions(sel, from, allowUnknown) {
    var out = allowUnknown ? '<option value=""' + (sel === null || sel === "" || sel === undefined ? " selected" : "") + ">Chưa biết</option>" : "";
    for (var b = from; b <= 9; b += 0.5) {
      out += '<option value="' + b + '"' + (Number(sel) === b && sel !== null && sel !== "" ? " selected" : "") + ">" + b.toFixed(1) + "</option>";
    }
    return out;
  }
  I.showOnboarding = function () {
    var p = I.state.profile;
    var draft = {
      name: p.name || "", examDate: p.examDate || "",
      baseline: Object.assign({ listening: null, reading: null, writing: null, speaking: null }, p.baseline || {}),
      aims: Object.assign({ overall: 7, listening: 7.5, reading: 7.5, writing: 6.5, speaking: 6.5 }, p.aims || {})
    };
    var step = 0;
    var STEPS = [
      { emoji: "👋", title: "Chào bạn! Mình là IELTS Coach", sub: "Cho mình biết tên và ngày thi để lên lộ trình mỗi ngày nhé." },
      { emoji: "📍", title: "Bạn đang ở band nào?", sub: "Tự đánh giá hoặc theo điểm giáo viên. Chưa rõ thì chọn “Chưa biết” — app sẽ tự ước tính khi bạn làm bài." },
      { emoji: "🎯", title: "Mục tiêu của bạn", sub: "Aim từng kỹ năng giúp app chia thời gian học hợp lý hơn." }
    ];
    I.modal({
      html: '<div class="onb" data-onb></div>',
      dismissible: false,
      className: "onboarding",
      onMount: function (root, close) {
        var box = root.querySelector("[data-onb]");
        function collect() {
          if (step === 0) {
            var n = box.querySelector("[data-f=name]"), d = box.querySelector("[data-f=exam]");
            if (n) draft.name = n.value.trim();
            if (d) draft.examDate = d.value;
          } else if (step === 1) {
            I.skills.forEach(function (k) {
              var s = box.querySelector('[data-base="' + k + '"]');
              if (s) draft.baseline[k] = s.value === "" ? null : Number(s.value);
            });
          } else if (step === 2) {
            ["overall"].concat(I.skills).forEach(function (k) {
              var s = box.querySelector('[data-aim="' + k + '"]');
              if (s) draft.aims[k] = Number(s.value);
            });
          }
        }
        function skillGrid(kind) {
          return '<div class="onb-skill-grid">' + I.skills.map(function (k) {
            var val = kind === "base" ? draft.baseline[k] : draft.aims[k];
            return '<label class="onb-skill sk-' + k + '"><span class="field-label">' + I.icon(I.skillIcon(k), 16) + esc(I.skillName(k)) + "</span>" +
              '<select class="select sm" data-' + kind + '="' + k + '">' + bandOptions(val, kind === "base" ? 3 : 4, kind === "base") + "</select></label>";
          }).join("") + "</div>";
        }
        function draw() {
          var S = STEPS[step], body = "";
          if (step === 0) {
            body = '<label class="field"><span class="field-label">Tên của bạn</span>' +
              '<input class="input" data-f="name" maxlength="40" placeholder="Ví dụ: Minh Anh" value="' + esc(draft.name) + '" autofocus></label>' +
              '<label class="field"><span class="field-label">Ngày thi dự kiến</span>' +
              '<input class="input" type="date" data-f="exam" value="' + esc(draft.examDate) + '"><span class="field-hint">Có thể để trống và đặt sau trong Cài đặt.</span></label>';
          } else if (step === 1) {
            body = skillGrid("base") + '<div class="estimate-note">Đây chỉ là mốc tham khảo ban đầu, không phải điểm thi thật.</div>';
          } else {
            body = '<label class="field"><span class="field-label">' + I.icon("target", 15) + ' Aim overall</span>' +
              '<select class="select" data-aim="overall">' + bandOptions(draft.aims.overall, 4, false) + "</select></label>" + skillGrid("aim");
          }
          box.innerHTML =
            '<div class="onb-steps" aria-label="Bước ' + (step + 1) + ' / 3">' + STEPS.map(function (_, i) {
              return '<span class="onb-step-dot' + (i === step ? " active" : i < step ? " done" : "") + '"></span>';
            }).join("") + '<span class="spacer"></span><span class="tiny muted">Bước ' + (step + 1) + " / 3</span></div>" +
            '<div class="onb-hero"><div class="onb-emoji">' + S.emoji + '</div><div><div class="onb-title">' + esc(S.title) + '</div><div class="onb-sub">' + esc(S.sub) + "</div></div></div>" +
            '<div class="stack">' + body + "</div>" +
            '<div class="onb-actions">' +
            (step === 0 ? '<button type="button" class="btn ghost" data-onb-act="skip">Để sau</button>' : '<button type="button" class="btn ghost" data-onb-act="back">' + I.icon("chevron-left", 16) + " Quay lại</button>") +
            '<span class="spacer"></span>' +
            (step < 2 ? '<button type="button" class="btn primary" data-onb-act="next">Tiếp tục ' + I.icon("chevron-right", 16) + "</button>" :
              '<button type="button" class="btn accent" data-onb-act="finish">' + I.icon("sparkles", 16) + " Bắt đầu học</button>") +
            "</div>";
          var f = box.querySelector("[autofocus]") || box.querySelector("select,input");
          if (f) setTimeout(function () { try { f.focus(); } catch (e) { /* ignore */ } }, 20);
        }
        function finish(skip) {
          var prof = I.state.profile;
          if (!skip) {
            prof.name = draft.name;
            prof.examDate = /^\d{4}-\d{2}-\d{2}$/.test(draft.examDate) ? draft.examDate : "";
            prof.baseline = draft.baseline;
            prof.aims = draft.aims;
            if (I.skills.some(function (k) { return draft.baseline[k] !== null; })) {
              prof.baselineSource = prof.baselineSource || "Tự đánh giá";
              prof.baselineDate = I.todayKey();
            }
          }
          prof.onboarded = true;
          I.save();
          close();
          if (!skip) I.toast("Chào mừng " + (draft.name || "bạn") + "! Kế hoạch hôm nay đã sẵn sàng.", "success");
          I.refresh();
        }
        box.addEventListener("click", function (e) {
          var b = e.target.closest ? e.target.closest("[data-onb-act]") : null;
          if (!b) return;
          var act = b.getAttribute("data-onb-act");
          collect();
          if (act === "next") { step = Math.min(2, step + 1); draw(); }
          else if (act === "back") { step = Math.max(0, step - 1); draw(); }
          else if (act === "skip") finish(true);
          else if (act === "finish") finish(false);
        });
        box.addEventListener("keydown", function (e) {
          if (e.key === "Enter" && e.target && e.target.tagName === "INPUT") {
            e.preventDefault();
            var nb = box.querySelector('[data-onb-act="next"],[data-onb-act="finish"]');
            if (nb) nb.click();
          }
        });
        draw();
      }
    });
  };

  /* ------------------------------------------------------------------ *
   * Router fallbacks
   * ------------------------------------------------------------------ */
  function fallback(id) {
    var n = navMeta(id) || { label: id, icon: "star", skill: null };
    return '<div class="page' + (n.skill ? " sk-" + esc(n.skill) : "") + '">' +
      '<div class="page-head"><div><div class="page-kicker">IELTS Coach</div><h1 class="page-title">' + esc(n.label) + "</h1></div></div>" +
      '<div class="card tape pad-lg empty">' +
      '<div class="empty-emoji">🧩</div><div class="empty-title">Trang “' + esc(n.label) + '” đang được hoàn thiện</div>' +
      '<div class="empty-text">Chưa tải được phần này của ứng dụng (có thể tệp trang còn thiếu). Các trang khác vẫn dùng bình thường — hãy tải lại trang hoặc quay về Tổng quan.</div>' +
      '<div class="row wrap" style="justify-content:center;margin-top:14px">' +
      '<button type="button" class="btn ghost" onclick="location.reload()">' + I.icon("refresh-cw", 16) + " Tải lại</button>" +
      '<a class="btn primary" href="#/dashboard">' + I.icon("home", 16) + " Về Tổng quan</a></div></div></div>";
  }

  /* ------------------------------------------------------------------ *
   * Events & boot
   * ------------------------------------------------------------------ */
  function onRoute(r) {
    ui.routeId = r.id;
    var meta = navMeta(r.id);
    var newSkill = meta && meta.skill ? meta.skill : null;
    if (!r.refresh && newSkill !== ui.pageSkill) ui.chosenSkill = null;
    ui.pageSkill = newSkill;
    renderSidebar();
    renderTopbar();
  }
  function onTimer(p) {
    if (p && p.type === "tick") {
      var el = els.topbar && els.topbar.querySelector("[data-tw-time]");
      if (el) el.textContent = I.fmtClock(p.elapsed);
      updateTitle();
    } else renderTopbar();
  }
  function onDay() {
    renderSidebar();
    renderTopbar();
    var id = ui.routeId;
    if ((id === "today" || id === "dashboard") && typeof I.confirmLeave !== "function") I.refresh();
    I.toast("Ngày học mới đã bắt đầu — kế hoạch hôm nay đã được cập nhật.", "info");
  }

  function boot() {
    els.sidebar = document.getElementById("sidebar");
    els.topbar = document.getElementById("topbar");
    els.view = document.getElementById("view");
    if (!els.view) { els.view = document.createElement("main"); els.view.id = "view"; els.view.className = "view"; document.body.appendChild(els.view); }

    try { I.ensurePlan(); } catch (e) { console.error("[IELTS] ensurePlan failed", e); }
    I.startClock();

    if (els.topbar) {
      els.topbar.addEventListener("click", onTopbarClick);
      els.topbar.addEventListener("change", onTopbarChange);
    }
    I.on("route", onRoute);
    I.on("change", function () { renderSidebar(); renderTopbar(); });
    I.on("timer", onTimer);
    I.on("day", onDay);

    renderSidebar();
    renderTopbar();
    I.startRouter(els.view, { fallback: fallback });

    if (I.tts && I.tts.ready) I.tts.ready().catch(function () { /* ignore */ });
    if (!I.state.profile.onboarded) setTimeout(I.showOnboarding, 380);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
