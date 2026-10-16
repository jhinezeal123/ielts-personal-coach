/* Error log (A2) — Sổ lỗi */
(function () {
  "use strict";
  var I = window.IELTS;

  function esc(s) { return I.esc(s == null ? "" : String(s)); }
  function ic(n, s) { return I.icon ? I.icon(n, s || 18) : ""; }
  function skName(k) { return I.skillName ? I.skillName(k) : k; }
  function safe(fn, fb) { try { var r = fn(); return r == null ? fb : r; } catch (e) { return fb; } }
  function listOf(map, skill) {
    var m = map && map[skill];
    if (!m) return [];
    if (Array.isArray(m)) return m.map(function (x) { return { key: x.key, name: x.name || x.label || x.key }; });
    return Object.keys(m).map(function (k) { var v = m[k]; return { key: k, name: typeof v === "string" ? v : (v && (v.name || v.label)) || k }; });
  }
  function typeList(skill) {
    if (skill === "writing" || skill === "speaking") return listOf(I.CRITERIA, skill);
    return listOf(I.QTYPES, skill);
  }
  function typeName(skill, key) {
    if (!key) return "";
    var l = typeList(skill);
    for (var i = 0; i < l.length; i++) if (l[i].key === key) return l[i].name;
    return key;
  }
  function errors() { return I.state.errors || (I.state.errors = []); }
  function isDue(e) { return e.status !== "passed" && e.recheckDay && e.recheckDay <= I.todayKey(); }
  function weekLabel(e) {
    if (typeof I.recheckLabel === "function") {
      var r = safe(function () { return I.recheckLabel(e); }, null);
      if (typeof r === "string" && r) return esc(r);
    }
    if (!e.recheckDay) return "—";
    return "Tuần " + esc(I.fmtDay(e.recheckDay, "short")) + " – " + esc(I.fmtDay(I.addDays(e.recheckDay, 6), "short"));
  }

  /* ---------- view state ---------- */
  var filt = { skill: "all", status: "open", due: false };

  function tagsHTML(e) {
    var h = "";
    if (e.skill) h += '<span class="pill sk sm sk-' + esc(e.skill) + '">' + esc(skName(e.skill)) + "</span>";
    if (e.qtype) h += '<span class="pill muted sm">' + esc(typeName(e.skill, e.qtype)) + "</span>";
    if ((e.count || 1) > 1) h += '<span class="pill bad sm er-count" title="Số lần lặp lại">×' + e.count + "</span>";
    if (e.source) h += '<span class="pill muted sm er-src" title="Bài gốc">' + ic("bookmark", 11) + " " + esc(e.source) + "</span>";
    if (e.basis === "answer-key") h += '<span class="pill muted sm" title="Căn cứ từ đáp án">đáp án</span>';
    if (e.status === "passed") h += '<span class="pill good sm">Đã đạt</span>';
    return '<div class="er-tags">' + h + "</div>";
  }

  function examplesHTML(e) {
    var ex = e.examples || [];
    var main = e.example || (ex[0] && ex[0].text) || "";
    var others = ex.filter(function (x) { return x && x.text && x.text !== main; });
    var h = main ? '<div class="er-text">' + esc(main) + "</div>" : '<span class="muted small">—</span>';
    if (others.length) {
      h += '<details class="er-more"><summary class="tiny">+' + others.length + " ví dụ khác</summary><ul>" +
        others.map(function (x) { return '<li><span class="tiny muted">' + esc(x.day ? I.fmtDay(x.day, "short") : "") + "</span> " + esc(x.text) + "</li>"; }).join("") +
        "</ul></details>";
    }
    return h;
  }

  function recheckCell(e) {
    var h = '<div class="er-week">' + weekLabel(e) + "</div>";
    if (e.status === "passed") {
      var last = (e.checks || []).filter(function (c) { return c.result === "pass"; }).pop();
      h += '<span class="pill good sm">Đạt' + (last ? " " + esc(I.fmtDay(last.day, "short")) : "") + "</span>";
    } else if (isDue(e)) {
      h += '<span class="pill bad sm er-due-badge">Đến hạn</span>';
    }
    var checks = e.checks || [];
    if (checks.length) {
      h += '<div class="er-checks" title="Lịch sử kiểm tra">' + checks.map(function (c) {
        return '<i class="' + (c.result === "pass" ? "is-pass" : "is-fail") + '" title="' + esc(I.fmtDay(c.day, "short") + (c.result === "pass" ? " — đạt" : " — chưa đạt")) + '"></i>';
      }).join("") + "</div>";
    }
    h += '<div class="er-actions">' +
      '<button class="btn icon ghost sm" data-act="edit" data-id="' + esc(e.id) + '" aria-label="Sửa lỗi" title="Sửa">' + ic("edit", 14) + "</button>" +
      '<button class="btn icon ghost sm" data-act="del" data-id="' + esc(e.id) + '" aria-label="Xoá lỗi" title="Xoá">' + ic("trash", 14) + "</button></div>";
    return h;
  }

  function dueHTML() {
    var due = safe(function () { return I.dueErrors(); }, null);
    if (!due) due = errors().filter(isDue);
    due = due.slice().sort(function (a, b) { return String(a.recheckDay).localeCompare(String(b.recheckDay)); });
    if (!due.length) {
      return '<div class="card soft er-due-empty row"><span class="er-due-ok">' + ic("check", 18) + '</span><div><b>Không có lỗi nào đến hạn kiểm tra hôm nay.</b>' +
        '<div class="small muted">Mỗi lỗi mới được hẹn kiểm tra lại sau 7 ngày học.</div></div></div>';
    }
    return '<section class="card tape er-due">' +
      '<div class="row between wrap"><div class="card-title">' + ic("target", 18) + " Đến hạn kiểm tra (" + due.length + ")</div>" +
      '<span class="small muted">Làm lại một câu tương đương, sửa lại câu Writing hoặc nói lại đoạn Speaking — rồi tự đánh giá.</span></div>' +
      '<ul class="er-due-list">' + due.map(function (e) {
        return '<li class="er-due-item sk-' + esc(e.skill || "") + '">' +
          '<div class="er-due-main"><div class="er-due-err"><b>' + esc(e.error) + "</b>" + ((e.count || 1) > 1 ? ' <span class="pill bad sm">×' + e.count + "</span>" : "") + "</div>" +
            (e.fix ? '<div class="small"><span class="muted">Cách sửa:</span> ' + esc(e.fix) + "</div>" : "") +
            '<div class="tiny muted">' + weekLabel(e) + (e.skill ? " · " + esc(skName(e.skill)) : "") + "</div></div>" +
          '<div class="row er-due-btns">' +
            '<button class="btn sm er-pass" data-act="pass" data-id="' + esc(e.id) + '">' + ic("check", 14) + " Đạt</button>" +
            '<button class="btn sm er-fail" data-act="fail" data-id="' + esc(e.id) + '">' + ic("rotate-ccw", 14) + " Chưa đạt</button>" +
          "</div></li>";
      }).join("") + "</ul></section>";
  }

  function statsHTML() {
    var all = errors();
    var open = all.filter(function (e) { return e.status !== "passed"; });
    var rep = open.filter(function (e) { return (e.count || 1) > 1; });
    var passed = all.filter(function (e) { return e.status === "passed"; });
    var due = open.filter(isDue);
    function st(label, val, cls) { return '<div class="card stat er-stat ' + (cls || "") + '"><div class="stat-label">' + label + '</div><div class="stat-value">' + val + "</div></div>"; }
    return '<div class="grid g-4 er-stats">' + st("Đang mở", open.length) + st("Đến hạn", due.length, due.length ? "is-due" : "") +
      st("Lặp lại ≥ 2 lần", rep.length) + st("Đã đạt", passed.length, "is-good") + "</div>";
  }

  function filtersHTML() {
    var skills = ["all"].concat(I.skills);
    return '<div class="row wrap between er-filters">' +
      '<div class="row wrap er-chips">' + skills.map(function (k) {
        return '<button class="chip' + (filt.skill === k ? " active" : "") + (k !== "all" ? " sk-" + k : "") + '" data-act="f-skill" data-v="' + k + '">' + (k === "all" ? "Tất cả kỹ năng" : esc(skName(k))) + "</button>";
      }).join("") + "</div>" +
      '<div class="row wrap">' +
        '<div class="seg">' + [["open", "Đang mở"], ["passed", "Đã đạt"], ["all", "Tất cả"]].map(function (s) {
          return '<button class="' + (filt.status === s[0] ? "active" : "") + '" data-act="f-status" data-v="' + s[0] + '">' + s[1] + "</button>";
        }).join("") + "</div>" +
        '<label class="er-duechk"><input type="checkbox" class="checkbox" data-act="f-due"' + (filt.due ? " checked" : "") + "> Chỉ lỗi đến hạn</label>" +
      "</div></div>";
  }

  function filtered() {
    return errors().filter(function (e) {
      if (filt.skill !== "all" && e.skill !== filt.skill) return false;
      if (filt.status === "open" && e.status === "passed") return false;
      if (filt.status === "passed" && e.status !== "passed") return false;
      if (filt.due && !isDue(e)) return false;
      return true;
    }).sort(function (a, b) {
      var da = isDue(a) ? 0 : a.status === "passed" ? 2 : 1, db = isDue(b) ? 0 : b.status === "passed" ? 2 : 1;
      if (da !== db) return da - db;
      if (da === 2) return String(b.createdDay || "").localeCompare(String(a.createdDay || ""));
      return String(a.recheckDay || "").localeCompare(String(b.recheckDay || "")) || (b.count || 1) - (a.count || 1);
    });
  }

  function tableHTML() {
    if (!errors().length) {
      return '<div class="card"><div class="empty er-empty">' +
        '<div class="empty-emoji">📒</div><div class="empty-title">Sổ lỗi còn trống</div>' +
        '<div class="empty-text">Khi làm sai trong Listening hoặc Reading, bấm "Ghi vào sổ lỗi" ở phần review. Bạn cũng có thể tự ghi lỗi Writing, Speaking hay từ vựng — mỗi lỗi sẽ được hẹn kiểm tra lại sau 7 ngày.</div>' +
        '<button class="btn accent" data-act="add">' + ic("plus", 15) + " Ghi lỗi đầu tiên</button></div></div>";
    }
    var list = filtered();
    if (!list.length) {
      return '<div class="card"><div class="empty"><div class="empty-emoji">🔍</div><div class="empty-title">Không có lỗi nào khớp bộ lọc</div>' +
        '<div class="empty-text">Thử chọn "Tất cả" hoặc bỏ lọc "Chỉ lỗi đến hạn".</div>' +
        '<button class="btn ghost sm" data-act="f-reset">Xoá bộ lọc</button></div></div>';
    }
    return '<div class="card er-table-card"><div class="table-wrap"><table class="table er-table"><thead><tr>' +
      "<th>Lỗi lặp lại</th><th>Ví dụ của mình</th><th>Vì sao sai</th><th>Cách sửa</th><th>Tuần kiểm tra lại</th>" +
      "</tr></thead><tbody>" + list.map(function (e) {
        return '<tr class="' + (isDue(e) ? "is-due" : "") + (e.status === "passed" ? " is-passed" : "") + '">' +
          '<td data-label="Lỗi lặp lại"><div class="er-err">' + esc(e.error) + "</div>" + tagsHTML(e) + "</td>" +
          '<td data-label="Ví dụ của mình">' + examplesHTML(e) + "</td>" +
          '<td data-label="Vì sao sai">' + (e.why ? '<div class="er-text">' + esc(e.why) + "</div>" : '<span class="muted small">—</span>') + "</td>" +
          '<td data-label="Cách sửa">' + (e.fix ? '<div class="er-text er-fix">' + esc(e.fix) + "</div>" : '<span class="muted small">—</span>') + "</td>" +
          '<td data-label="Tuần kiểm tra lại" class="er-recheck">' + recheckCell(e) + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<p class="tiny muted er-foot">' + list.length + " lỗi · Gặp lại cùng một lỗi trước ngày hẹn sẽ tăng số lần lặp, không đẩy lùi ngày kiểm tra.</p></div>";
  }

  function inner() {
    return '<header class="page-head">' +
        '<div><div class="page-kicker">Theo dõi</div><h1 class="page-title">Sổ lỗi</h1>' +
        '<p class="page-sub">Biến mỗi lỗi lặp lại thành một cách sửa cụ thể, rồi kiểm tra lại sau 7 ngày.</p></div>' +
        '<div class="page-actions"><button class="btn accent" data-act="add">' + ic("plus", 16) + " Thêm lỗi</button></div>" +
      "</header>" +
      statsHTML() + dueHTML() +
      '<h2 class="section-title">Danh sách lỗi</h2>' + filtersHTML() + tableHTML();
  }

  /* ---------- add / edit ---------- */
  function openForm(existing) {
    var e = existing || {}, el = null;
    var sk = e.skill || (filt.skill !== "all" ? filt.skill : "writing");
    function typeOpts(skill, sel) {
      return '<option value="">— Không chọn —</option>' + typeList(skill).map(function (t) {
        return '<option value="' + esc(t.key) + '"' + (t.key === sel ? " selected" : "") + ">" + esc(t.name) + "</option>";
      }).join("");
    }
    var html = '<div class="stack er-form">' +
      '<label class="field"><span class="field-label">Lỗi lặp lại <span class="muted">(bắt buộc)</span></span>' +
        '<input class="input" name="error" maxlength="200" value="' + esc(e.error || "") + '" placeholder="VD: Nhầm FALSE với NOT GIVEN khi câu có từ phủ định"></label>' +
      '<div class="grid g-3">' +
        '<label class="field"><span class="field-label">Kỹ năng</span><select class="select" name="skill">' +
          I.skills.map(function (k) { return '<option value="' + k + '"' + (k === sk ? " selected" : "") + ">" + esc(skName(k)) + "</option>"; }).join("") +
          '<option value="vocab"' + (sk === "vocab" ? " selected" : "") + ">" + esc(skName("vocab")) + "</option></select></label>" +
        '<label class="field"><span class="field-label er-type-label">Dạng bài / tiêu chí</span><select class="select" name="qtype">' + typeOpts(sk, e.qtype) + "</select></label>" +
        '<label class="field"><span class="field-label">Bài gốc</span><input class="input" name="source" maxlength="120" value="' + esc(e.source || "") + '" placeholder="VD: Test 1 — Passage 2, câu 9"></label>' +
      "</div>" +
      '<label class="field"><span class="field-label">Ví dụ của mình</span><textarea class="textarea" name="example" rows="2" placeholder="Câu/đáp án bạn đã viết hoặc chọn">' + esc(e.example || "") + "</textarea></label>" +
      '<div class="grid g-2">' +
        '<label class="field"><span class="field-label">Vì sao sai</span><textarea class="textarea" name="why" rows="3" placeholder="Nguyên nhân thật sự">' + esc(e.why || "") + "</textarea></label>" +
        '<label class="field"><span class="field-label">Cách sửa</span><textarea class="textarea" name="fix" rows="3" placeholder="Lần sau mình sẽ làm gì khác">' + esc(e.fix || "") + "</textarea></label>" +
      "</div>" +
      (existing ? "" : '<p class="tiny muted">Nếu lỗi này đã có trong sổ (cùng nội dung và kỹ năng), app sẽ tăng số lần lặp và lưu thêm ví dụ thay vì tạo dòng mới.</p>') +
    "</div>";
    I.modal({
      title: existing ? "Sửa lỗi" : "Thêm lỗi vào sổ",
      wide: true,
      html: html,
      onMount: function (m) {
        el = m;
        var s = m.querySelector('[name="skill"]'), q = m.querySelector('[name="qtype"]');
        s.addEventListener("change", function () { q.innerHTML = typeOpts(s.value, ""); });
        var f = m.querySelector('[name="error"]'); if (f) f.focus();
      },
      actions: [
        { label: "Huỷ", kind: "ghost", onClick: function (close) { close(); } },
        { label: existing ? "Lưu thay đổi" : "Thêm vào sổ", kind: "primary", onClick: function (close) {
          if (!el) return;
          var v = function (n) { return (el.querySelector('[name="' + n + '"]').value || "").trim(); };
          var f = { error: v("error"), example: v("example"), why: v("why"), fix: v("fix"), skill: v("skill"), qtype: v("qtype"), source: v("source") };
          if (!f.error) { I.toast("Hãy mô tả lỗi lặp lại", "warn"); el.querySelector('[name="error"]').focus(); return; }
          if (existing) {
            var item = null;
            errors().forEach(function (x) { if (x.id === existing.id) item = x; });
            if (!item) { close(); return; }
            if (f.example && f.example !== item.example) {
              item.examples = item.examples || [];
              var has = item.examples.some(function (x) { return x && x.text === f.example; });
              if (!has) item.examples.push({ day: I.todayKey(), text: f.example });
            }
            Object.keys(f).forEach(function (k) { item[k] = f[k]; });
            I.save();
            I.toast("Đã lưu thay đổi", "success");
          } else {
            f.basis = "self";
            var res = I.addError(f);
            if (res && (res.count || 1) > 1) I.toast("Lỗi này đã có trong sổ — tăng lên ×" + res.count, "warn");
            else I.toast("Đã thêm vào sổ lỗi · kiểm tra lại sau 7 ngày", "success");
          }
          close();
        } }
      ]
    });
  }

  function findErr(id) {
    var r = null;
    errors().forEach(function (x) { if (String(x.id) === String(id)) r = x; });
    return r;
  }

  I.registerPage({
    id: "errors",
    label: "Sổ lỗi",
    icon: "alert-triangle",
    skill: null,
    group: "track",
    order: 20,
    render: function (params) {
      params = params || {};
      filt.due = params.due === "1" || params.due === 1 || params.due === true;
      if (filt.due) filt.status = "open";
      if (params.skill && I.skills.indexOf(params.skill) >= 0) filt.skill = params.skill;
      return '<div class="page er-page">' + inner() + "</div>";
    },
    mount: function (root) {
      var el = root.querySelector(".er-page") || root;
      var pending = 0;
      function rerender() {
        if (pending) return;
        pending = setTimeout(function () { pending = 0; if (el.isConnected !== false) el.innerHTML = inner(); }, 30);
      }
      function onClick(ev) {
        var t = ev.target.closest ? ev.target.closest("[data-act]") : null;
        if (!t || !el.contains(t) || t.tagName === "INPUT") return;
        var act = t.getAttribute("data-act"), id = t.getAttribute("data-id");
        if (act === "add") openForm(null);
        else if (act === "edit") { var it = findErr(id); if (it) openForm(it); }
        else if (act === "del") {
          var item = findErr(id);
          if (!item) return;
          I.confirm('Xoá lỗi "' + (item.error.length > 60 ? item.error.slice(0, 60) + "…" : item.error) + '" khỏi sổ? Thao tác này không hoàn tác được.', { okLabel: "Xoá", danger: true }).then(function (ok) {
            if (!ok) return;
            var arr = errors(), i = arr.indexOf(item);
            if (i >= 0) arr.splice(i, 1);
            I.save();
            I.toast("Đã xoá lỗi", "success");
            rerender();
          });
        } else if (act === "pass" || act === "fail") {
          var okr = I.recheckError(id, act === "pass");
          if (okr === false) I.toast("Lỗi này chưa đến hạn kiểm tra lại", "info");
          else I.toast(act === "pass" ? "Tuyệt! Lỗi đã được đánh dấu đạt." : "Đã hẹn kiểm tra lại sau 7 ngày.", act === "pass" ? "success" : "info");
          rerender();
        } else if (act === "f-skill") { filt.skill = t.getAttribute("data-v"); rerender(); }
        else if (act === "f-status") { filt.status = t.getAttribute("data-v"); rerender(); }
        else if (act === "f-reset") { filt = { skill: "all", status: "all", due: false }; rerender(); }
      }
      function onChange(ev) {
        var t = ev.target;
        if (t && t.getAttribute && t.getAttribute("data-act") === "f-due") { filt.due = !!t.checked; rerender(); }
      }
      el.addEventListener("click", onClick);
      el.addEventListener("change", onChange);
      I.on("change", rerender);
      I.on("day", rerender);
      return function () {
        el.removeEventListener("click", onClick);
        el.removeEventListener("change", onChange);
        I.off("change", rerender);
        I.off("day", rerender);
        if (pending) clearTimeout(pending);
      };
    }
  });
})();
