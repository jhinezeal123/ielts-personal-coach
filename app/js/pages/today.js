/* Today (A2) — Hôm nay: daily plan */
(function () {
  "use strict";
  var I = window.IELTS;

  function esc(s) { return I.esc(s == null ? "" : String(s)); }
  function ic(n, s) { return I.icon ? I.icon(n, s || 18) : ""; }
  function skName(k) { return I.skillName ? I.skillName(k) : k; }
  function safe(fn, fb) { try { var r = fn(); return r == null ? fb : r; } catch (e) { return fb; } }
  function planSkills() { return I.planSkills || ["listening", "reading", "writing", "speaking", "vocab"]; }
  function minsDone(t) { return Math.min(t.mins || 0, Math.floor((t.doneSeconds || 0) / 60)); }

  function getPlan() {
    var today = I.todayKey();
    var plan = I.state.plan;
    if ((!plan || plan.day !== today) && I.ensurePlan) { try { I.ensurePlan(); } catch (e) {} plan = I.state.plan; }
    plan = plan || {};
    return { day: plan.day || today, tasks: plan.tasks || [], backlog: plan.backlog || [], allocation: plan.allocation || [] };
  }

  /* ---------- pieces ---------- */
  function summaryHTML(plan, budget) {
    var tasks = plan.tasks;
    var doneMin = 0, nDone = 0;
    tasks.forEach(function (t) { doneMin += t.done ? (t.mins || 0) : minsDone(t); if (t.done) nDone++; });
    var all = tasks.length > 0 && nDone === tasks.length;
    var pctv = budget ? Math.min(100, Math.round(doneMin / budget * 100)) : 0;
    var studied = safe(function () { return I.dayMinutes(I.todayKey()).total; }, 0);
    if (all) {
      return '<div class="card td-celebrate">' +
        '<div class="td-confetti" aria-hidden="true">' + new Array(14).join("<i></i>") + "</div>" +
        '<div class="td-cel-icon">' + ic("award", 34) + "</div>" +
        '<div class="td-cel-text"><div class="hand td-cel-title">Xong trọn kế hoạch hôm nay!</div>' +
        '<p class="small">Bạn đã hoàn thành ' + tasks.length + " task · " + esc(I.fmtDuration(studied)) + " học thực tế. Nghỉ ngơi cũng là một phần của lộ trình — hẹn gặp lại lúc 06:00 sáng mai.</p></div>" +
      "</div>";
    }
    return '<div class="card td-summary">' +
      '<div class="td-sum-num"><span class="hand td-sum-big">' + doneMin + '</span><span class="muted">/ ' + budget + " phút</span></div>" +
      '<div class="td-sum-main">' +
        '<div class="row between small"><span>' + nDone + "/" + tasks.length + " task đã xong</span><span class=\"muted\">Đã bấm giờ hôm nay: " + esc(I.fmtDuration(studied)) + "</span></div>" +
        '<div class="progress td-sum-bar"><div class="progress-bar" style="width:' + pctv + '%"></div></div>' +
        '<div class="tiny muted">Thời gian bấm giờ hoặc làm bài trong app được tự cộng vào task đầu tiên chưa xong của kỹ năng đó.</div>' +
      "</div>" +
    "</div>";
  }

  function allocHTML(plan, budget) {
    var al = plan.allocation;
    if (!al.length) return "";
    var sum = al.reduce(function (a, x) { return a + (x.mins || 0); }, 0) || budget || 1;
    var bar = al.map(function (a) {
      var w = (a.mins || 0) / sum * 100;
      return '<div class="td-seg sk-' + a.skill + '" style="width:' + w + '%" title="' + esc(skName(a.skill) + ": " + a.mins + " phút — " + (a.reason || "")) + '">' +
        (w >= 9 ? "<span>" + a.mins + "'</span>" : "") + "</div>";
    }).join("");
    var legend = al.map(function (a) {
      return '<li class="sk-' + a.skill + '"><i class="td-dot"></i><span class="td-leg-name">' + esc(skName(a.skill)) + "</span>" +
        '<b class="td-leg-min">' + a.mins + " phút</b>" +
        '<span class="td-leg-reason small muted">' + esc(a.reason || "") + "</span></li>";
    }).join("");
    return '<div class="card td-alloc">' +
      '<div class="row between wrap"><div class="card-title">Phân bổ ' + budget + " phút hôm nay</div>" +
      '<span class="tiny muted">Tự điều chỉnh theo khoảng cách tới aim, accuracy gần đây và bài đến hạn.</span></div>' +
      '<div class="td-bar" role="img" aria-label="Phân bổ thời gian theo kỹ năng">' + bar + "</div>" +
      '<ul class="td-legend">' + legend + "</ul>" +
    "</div>";
  }

  function sideHTML() {
    var nWords = safe(function () { return I.dueWords().length; }, 0);
    var nErr = safe(function () { return I.dueErrors().length; }, 0);
    return '<div class="td-side">' +
      '<button class="card clickable td-due sk-vocab" data-act="go" data-page="vocab" data-params=\'{"tab":"' + (nWords ? "review" : "today") + '"}\'>' +
        '<span class="td-due-icon">' + ic("layers", 20) + "</span>" +
        '<span class="td-due-body"><span class="hand td-due-num">' + nWords + '</span><span class="small">' +
          (nWords ? "từ đến hạn ôn" : "từ đến hạn — học từ mới hôm nay") + "</span></span>" + ic("chevron-right", 16) +
      "</button>" +
      '<button class="card clickable td-due td-due-err' + (nErr ? " has-due" : "") + '" data-act="go" data-page="errors" data-params=\'' + (nErr ? '{"due":"1"}' : "{}") + "'>" +
        '<span class="td-due-icon">' + ic("alert-triangle", 20) + "</span>" +
        '<span class="td-due-body"><span class="hand td-due-num">' + nErr + '</span><span class="small">' +
          (nErr ? "lỗi đến hạn kiểm tra lại" : "lỗi đến hạn — sổ lỗi gọn gàng") + "</span></span>" + ic("chevron-right", 16) +
      "</button>" +
    "</div>";
  }

  function taskRow(t, inBacklog) {
    var done = !!t.done;
    var mins = t.mins || 0;
    var dm = done ? mins : minsDone(t);
    var w = mins ? Math.min(100, Math.round(dm / mins * 100)) : 0;
    var carried = t.carried || inBacklog;
    return '<li class="td-task sk-' + t.skill + (done ? " is-done" : "") + '">' +
      (inBacklog
        ? '<span class="td-check is-backlog" aria-hidden="true">' + ic("bookmark", 14) + "</span>"
        : '<button class="td-check" data-act="toggle" data-id="' + esc(t.id) + '" aria-pressed="' + done + '" aria-label="' + (done ? "Bỏ đánh dấu hoàn thành" : "Đánh dấu hoàn thành") + '">' + (done ? ic("check", 15) : "") + "</button>") +
      '<div class="td-task-main">' +
        '<div class="td-task-title">' + esc(t.title) +
          (carried && t.day ? ' <span class="pill warn sm td-carried">Tồn từ ' + esc(I.fmtDay(t.day, "short")) + "</span>" : "") + "</div>" +
        (t.detail ? '<div class="small muted td-task-detail">' + esc(t.detail) + "</div>" : "") +
        '<div class="td-task-prog"><div class="progress"><div class="progress-bar" style="width:' + w + '%"></div></div>' +
          '<span class="tiny muted">' + dm + "/" + mins + " phút</span></div>" +
      "</div>" +
      (t.route && t.route.page
        ? '<button class="btn sm ' + (done ? "ghost" : "sk") + ' td-start" data-act="start" data-id="' + esc(t.id) + '">' + ic(done ? "rotate-ccw" : "play", 14) + " " + (done ? "Mở lại" : "Bắt đầu") + "</button>"
        : "") +
    "</li>";
  }

  function tasksHTML(plan) {
    if (!plan.tasks.length) {
      return '<div class="card"><div class="empty">' +
        '<div class="empty-emoji">🌱</div><div class="empty-title">Chưa có task nào cho hôm nay</div>' +
        '<div class="empty-text">Bấm "Tính lại kế hoạch" để tạo kế hoạch theo dữ liệu mới nhất của bạn.</div>' +
        '<button class="btn primary" data-act="regen">' + ic("rotate-ccw", 15) + " Tính lại kế hoạch</button></div></div>";
    }
    var allocBy = {};
    plan.allocation.forEach(function (a) { allocBy[a.skill] = a; });
    return planSkills().map(function (k) {
      var list = plan.tasks.filter(function (t) { return t.skill === k; });
      if (!list.length) return "";
      var tot = list.reduce(function (a, t) { return a + (t.mins || 0); }, 0);
      var nd = list.filter(function (t) { return t.done; }).length;
      return '<section class="card td-group sk-' + k + (nd === list.length ? " is-complete" : "") + '">' +
        '<div class="row between td-group-head"><div class="td-group-name"><i class="td-dot"></i>' + esc(skName(k)) + "</div>" +
        '<span class="small muted">' + nd + "/" + list.length + " xong · " + (allocBy[k] ? allocBy[k].mins : tot) + " phút</span></div>" +
        '<ul class="td-tasks">' + list.map(function (t) { return taskRow(t, false); }).join("") + "</ul>" +
      "</section>";
    }).join("");
  }

  function backlogHTML(plan) {
    if (!plan.backlog.length) return "";
    var tot = plan.backlog.reduce(function (a, t) { return a + Math.max(0, (t.mins || 0) - minsDone(t)); }, 0);
    return '<h2 class="section-title">Task tồn chưa xếp vừa</h2>' +
      '<div class="card soft td-backlog">' +
        '<p class="small muted">' + plan.backlog.length + " task (≈ " + tot + " phút) không vừa ngân sách hôm nay. Chúng được giữ nguyên và ưu tiên xếp vào những ngày tới — bạn vẫn có thể làm ngay nếu còn sức.</p>" +
        '<ul class="td-tasks">' + plan.backlog.map(function (t) { return taskRow(t, true); }).join("") + "</ul>" +
      "</div>";
  }

  function inner() {
    var plan = getPlan();
    var budget = (I.state.profile && I.state.profile.dailyMinutes) || 250;
    return '<header class="page-head">' +
        '<div><div class="page-kicker">' + esc(I.fmtDay(I.todayKey(), "long")) + "</div>" +
        '<h1 class="page-title">Kế hoạch hôm nay</h1>' +
        '<p class="page-sub">' + ic("clock", 14) + " Ngày học mới lúc 06:00 (giờ Việt Nam)</p></div>" +
        '<div class="page-actions"><button class="btn ghost" data-act="regen">' + ic("rotate-ccw", 15) + " Tính lại kế hoạch</button></div>" +
      "</header>" +
      '<div class="td-top">' + summaryHTML(plan, budget) + sideHTML() + "</div>" +
      allocHTML(plan, budget) +
      '<h2 class="section-title">Task theo kỹ năng</h2>' +
      '<div class="td-groups">' + tasksHTML(plan) + "</div>" +
      backlogHTML(plan);
  }

  function findTask(id) {
    var p = I.state.plan || {};
    var all = (p.tasks || []).concat(p.backlog || []);
    for (var i = 0; i < all.length; i++) if (String(all[i].id) === String(id)) return all[i];
    return null;
  }

  function startTask(t) {
    var tm = I.timer || {};
    try {
      if (tm.running && tm.skill === t.skill) {
        if (tm.paused && I.timerResume) I.timerResume();
      } else {
        if (tm.running && I.timerFinish) I.timerFinish();
        I.timerStart(t.skill);
      }
    } catch (e) { /* timer is best-effort; still navigate */ }
    I.go(t.route.page, t.route.params || {});
  }

  I.registerPage({
    id: "today",
    label: "Hôm nay",
    icon: "sun",
    skill: null,
    group: "study",
    order: 3,
    render: function () { return '<div class="page td-page">' + inner() + "</div>"; },
    mount: function (root) {
      var el = root.querySelector(".td-page") || root;
      var pending = 0;
      function rerender() {
        if (pending) return;
        pending = setTimeout(function () { pending = 0; if (el.isConnected !== false) el.innerHTML = inner(); }, 30);
      }
      function onClick(e) {
        var t = e.target.closest ? e.target.closest("[data-act]") : null;
        if (!t || !el.contains(t)) return;
        var act = t.getAttribute("data-act");
        if (act === "toggle") {
          var task = findTask(t.getAttribute("data-id"));
          var wasDone = task && task.done;
          I.toggleTask(t.getAttribute("data-id"));
          var p = I.state.plan || {};
          var tasks = p.tasks || [];
          if (!wasDone && tasks.length && tasks.every(function (x) { return x.done; })) I.toast("Hoàn thành toàn bộ kế hoạch hôm nay!", "success");
          rerender();
        } else if (act === "start") {
          var tk = findTask(t.getAttribute("data-id"));
          if (tk && tk.route) startTask(tk);
        } else if (act === "regen") {
          try {
            I.regeneratePlan();
            I.toast("Đã tính lại kế hoạch theo dữ liệu mới nhất", "success");
          } catch (err) {
            I.toast((err && err.message) || "Không tính lại được kế hoạch", "error");
          }
          rerender();
        } else if (act === "go") {
          var prm = {};
          try { prm = JSON.parse(t.getAttribute("data-params") || "{}"); } catch (err2) { prm = {}; }
          I.go(t.getAttribute("data-page"), prm);
        }
      }
      el.addEventListener("click", onClick);
      I.on("change", rerender);
      I.on("day", rerender);
      return function () {
        el.removeEventListener("click", onClick);
        I.off("change", rerender);
        I.off("day", rerender);
        if (pending) clearTimeout(pending);
      };
    }
  });
})();
