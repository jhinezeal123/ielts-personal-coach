/* Schedule — "Lịch học" (weekly school timetable)
 * Route: #/schedule. Owns css/schedule.css and IELTS.state.schedule.
 *
 * Storage (inside the main state, localStorage key "ielts-coach-v1", so backup export/import/reset include it):
 *   IELTS.state.schedule = {
 *     version: 1,
 *     updatedAt: ISO | "",
 *     cells: { "<day>-<HH>": { type: "school"|"home"|"study"|"busy"|"", note: "≤40 ký tự" } }
 *   }
 *   day = mon|tue|wed|thu|fri|sat|sun, HH = "00".."23" (slot HH:00–HH+1:00). Empty cells are simply absent.
 */
(function () {
  "use strict";
  var I = window.IELTS;
  if (!I || !I.registerPage) return;

  var DAYS = [
    { id: "mon", label: "Thứ 2", wd: 1 }, { id: "tue", label: "Thứ 3", wd: 2 }, { id: "wed", label: "Thứ 4", wd: 3 },
    { id: "thu", label: "Thứ 5", wd: 4 }, { id: "fri", label: "Thứ 6", wd: 5 }, { id: "sat", label: "Thứ 7", wd: 6 },
    { id: "sun", label: "Chủ nhật", wd: 0 }
  ];
  var TYPES = [
    { id: "school", label: "Học trên trường", short: "Ở trường", icon: "book-open" },
    { id: "home", label: "Về đến nhà", short: "Về nhà", icon: "home" },
    { id: "study", label: "Tự học ở nhà", short: "Tự học", icon: "pen-line" },
    { id: "busy", label: "Bận việc khác", short: "Bận", icon: "clock" }
  ];
  var NOTE_MAX = 40;

  function esc(s) { return I.esc(s == null ? "" : String(s)); }
  function ic(n, s) { return I.icon ? I.icon(n, s || 16) : ""; }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function typeOf(id) { return TYPES.filter(function (t) { return t.id === id; })[0] || null; }
  function dayOf(id) { return DAYS.filter(function (d) { return d.id === id; })[0] || null; }
  function slotLabel(h) { return pad2(h) + ":00–" + pad2(h + 1) + ":00"; }
  function cellKey(day, h) { return day + "-" + pad2(h); }

  /* ---------- store ---------- */
  function store() {
    var st = I.state;
    var s = st.schedule;
    if (!s || typeof s !== "object" || Array.isArray(s)) s = st.schedule = { version: 1, updatedAt: "", cells: {} };
    if (!s.cells || typeof s.cells !== "object" || Array.isArray(s.cells)) s.cells = {};
    s.version = 1;
    return s;
  }
  function getCell(key) {
    var c = store().cells[key];
    if (!c || typeof c !== "object") return null;
    var type = typeOf(c.type) ? c.type : "";
    var note = typeof c.note === "string" ? c.note.slice(0, NOTE_MAX) : "";
    if (!type && !note.trim()) return null;
    return { type: type, note: note };
  }
  /* set without saving (caller saves) */
  function putCell(key, type, note) {
    var cells = store().cells;
    type = typeOf(type) ? type : "";
    note = String(note || "").replace(/\s+/g, " ").trim().slice(0, NOTE_MAX);
    if (!type && !note) delete cells[key];
    else cells[key] = { type: type, note: note };
  }
  function commit() {
    store().updatedAt = new Date(I.now ? I.now().getTime() : Date.now()).toISOString();
    return I.save();
  }

  /* ---------- today / now (Vietnam calendar, no study-day shift) ---------- */
  function todayDayId() {
    try {
      var wd = I.weekday(I.calendarTodayVN());
      var d = DAYS.filter(function (x) { return x.wd === wd; })[0];
      return d ? d.id : null;
    } catch (e) { return null; }
  }
  function nowHourVN() {
    try { return new Date((I.now ? I.now().getTime() : Date.now()) + 7 * 3600000).getUTCHours(); } catch (e) { return -1; }
  }

  /* ---------- summary ---------- */
  function daySummary(day) {
    var school = 0, study = 0, empty = 0, home = null;
    for (var h = 0; h < 24; h++) {
      var c = getCell(cellKey(day, h));
      if (!c || !c.type) { empty++; continue; }
      if (c.type === "school") school++;
      else if (c.type === "study") study++;
      else if (c.type === "home" && home === null) home = h;
    }
    return { school: school, study: study, empty: empty, free: study + empty, home: home };
  }
  function summaryHTML() {
    var tid = todayDayId();
    var rows = DAYS.map(function (d) {
      var s = daySummary(d.id);
      var parts = [
        '<span class="sc-sum-school">' + s.school + " giờ ở trường</span>",
        '<span class="sc-sum-study">' + s.study + " giờ tự học</span>",
        '<span class="sc-sum-free">' + s.free + " giờ có thể học</span>"
      ];
      if (s.home !== null) parts.push('<span class="sc-sum-home">về nhà ' + pad2(s.home) + ":00</span>");
      return '<li class="sc-sum-row' + (d.id === tid ? " is-today" : "") + '"><b class="sc-sum-day">' + esc(d.label) + "</b>" +
        '<span class="sc-sum-parts">' + parts.join('<span class="sc-sep" aria-hidden="true">·</span>') + "</span></li>";
    }).join("");
    return '<ul class="sc-sum-list">' + rows + "</ul>" +
      '<p class="tiny muted sc-sum-note">“Có thể học” = số giờ còn trống cộng giờ đã xếp “Tự học ở nhà” (chưa trừ giờ ngủ, ăn uống).</p>';
  }

  /* ---------- grid ---------- */
  function cellInner(c) {
    if (!c) return '<span class="sc-empty" aria-hidden="true">+</span>';
    var t = typeOf(c.type);
    return (t ? '<span class="sc-type">' + esc(t.short) + "</span>" : "") +
      (c.note ? '<span class="sc-note">' + esc(c.note) + "</span>" : "");
  }
  function cellAria(day, h, c) {
    var d = dayOf(day), t = c && typeOf(c.type);
    return d.label + ", " + slotLabel(h) + ": " + (c ? (t ? t.label : "") + (c.note ? (t ? " — " : "") + c.note : "") : "trống");
  }
  function cellClass(c, day, tid) {
    return "sc-cell" + (c && c.type ? " t-" + c.type : "") + (c && !c.type ? " t-note" : "") + (day === tid ? " is-today" : "");
  }
  function gridHTML() {
    var tid = todayDayId(), nh = nowHourVN();
    var head = '<thead><tr><th scope="col" class="sc-corner">Giờ</th>' + DAYS.map(function (d) {
      return '<th scope="col" class="sc-dayh' + (d.id === tid ? " is-today" : "") + '">' + esc(d.label) +
        (d.id === tid ? '<span class="sc-today-tag">Hôm nay</span>' : "") + "</th>";
    }).join("") + "</tr></thead>";
    var body = "<tbody>";
    for (var h = 0; h < 24; h++) {
      body += '<tr class="' + (h === nh ? "is-now" : "") + '"><th scope="row" class="sc-time">' + slotLabel(h) + "</th>";
      DAYS.forEach(function (d, di) {
        var key = cellKey(d.id, h), c = getCell(key);
        body += '<td class="sc-td"><button type="button" class="' + cellClass(c, d.id, tid) + '" data-cell="' + key + '" data-r="' + h + '" data-c="' + di + '"' +
          ' aria-label="' + esc(cellAria(d.id, h, c)) + '" title="' + esc(cellAria(d.id, h, c)) + '">' + cellInner(c) + "</button></td>";
      });
      body += "</tr>";
    }
    return '<table class="sc-table">' + head + body + "</tbody></table>";
  }

  function brushHTML(brush) {
    var opts = [{ id: "edit", label: "Sửa từng ô", icon: "edit" }].concat(TYPES).concat([{ id: "erase", label: "Xoá ô", icon: "trash" }]);
    return '<div class="sc-brush" role="radiogroup" aria-label="Cách tô ô">' + opts.map(function (o) {
      var on = o.id === brush;
      return '<button type="button" class="chip sc-chip' + (typeOf(o.id) ? " t-" + o.id : "") + (on ? " active" : "") + '" role="radio" aria-checked="' + on + '" data-brush="' + o.id + '">' +
        (typeOf(o.id) ? '<span class="sc-swatch t-' + o.id + '" aria-hidden="true"></span>' : ic(o.icon, 14)) + "<span>" + esc(o.label) + "</span></button>";
    }).join("") + "</div>";
  }

  function render() {
    return '<div class="page sc-page">' +
      '<header class="page-head"><div><div class="page-kicker">Học tập</div><h1 class="page-title">Lịch học</h1>' +
        '<p class="page-sub">Ghi lại giờ học trên trường và giờ về nhà để biết khi nào có thể tự học IELTS. Mọi ô đều không bắt buộc.</p></div>' +
        '<div class="page-actions">' +
          '<button type="button" class="btn sm" data-act="copy">' + ic("layers", 15) + " Sao chép ngày</button>" +
          '<button type="button" class="btn sm ghost" data-act="clear">' + ic("trash", 15) + " Xoá tất cả</button>" +
        "</div></header>" +
      '<section class="card sc-tools">' +
        '<div class="sc-tools-label small muted">Chọn một loại rồi bấm (hoặc kéo chuột) qua nhiều ô để tô nhanh. Chọn “Sửa từng ô” để thêm ghi chú như tên môn học.</div>' +
        '<div data-brush-host>' + brushHTML("edit") + "</div>" +
      "</section>" +
      '<div class="sc-layout">' +
        '<section class="card sc-grid-card"><div class="sc-scroll" data-scroll>' + gridHTML() + "</div></section>" +
        '<section class="card soft sc-summary"><div class="card-title">' + ic("bar-chart", 18) + " Tổng kết theo ngày</div>" +
          '<div data-summary>' + summaryHTML() + "</div></section>" +
      "</div></div>";
  }

  /* ---------- editor modal ---------- */
  function openEditor(key, onDone) {
    var parts = key.split("-"), d = dayOf(parts[0]), h = +parts[1];
    var cur = getCell(key) || { type: "", note: "" };
    var chosen = cur.type;
    var html = '<div class="sc-editor">' +
      '<div class="sc-ed-types" role="radiogroup" aria-label="Loại hoạt động">' + TYPES.map(function (t) {
        var on = t.id === chosen;
        return '<button type="button" class="chip sc-chip t-' + t.id + (on ? " active" : "") + '" role="radio" aria-checked="' + on + '" data-type="' + t.id + '">' +
          '<span class="sc-swatch t-' + t.id + '" aria-hidden="true"></span><span>' + esc(t.label) + "</span></button>";
      }).join("") + "</div>" +
      '<label class="field"><span class="field-label">Ghi chú (không bắt buộc)</span>' +
        '<input class="input" data-note maxlength="' + NOTE_MAX + '" placeholder="VD: Toán, Văn, học thêm…" value="' + esc(cur.note) + '"></label>' +
      '<p class="tiny muted">Bấm lại loại đang chọn để bỏ chọn. Nhấn Enter để lưu.</p></div>';
    var root = null;
    function save(close) {
      var note = root ? root.querySelector("[data-note]").value : "";
      putCell(key, chosen, note);
      commit();
      close();
      onDone();
    }
    I.modal({
      title: d.label + " · " + slotLabel(h),
      html: html,
      className: "sc-modal",
      actions: [
        { label: "Xoá ô", kind: "ghost", onClick: function (close) { putCell(key, "", ""); commit(); close(); onDone(); } },
        { label: "Huỷ", kind: "ghost" },
        { label: "Lưu", kind: "primary", onClick: save }
      ],
      onMount: function (el, close) {
        root = el;
        var box = el.querySelector(".sc-ed-types");
        box.addEventListener("click", function (e) {
          var b = e.target.closest ? e.target.closest("[data-type]") : null;
          if (!b) return;
          var t = b.getAttribute("data-type");
          chosen = chosen === t ? "" : t;
          Array.prototype.forEach.call(box.querySelectorAll("[data-type]"), function (x) {
            var on = x.getAttribute("data-type") === chosen;
            x.classList.toggle("active", on);
            x.setAttribute("aria-checked", on ? "true" : "false");
          });
        });
        el.querySelector("[data-note]").addEventListener("keydown", function (e) {
          if (e.key === "Enter") { e.preventDefault(); save(close); }
        });
      }
    });
  }

  /* ---------- copy-day modal ---------- */
  function openCopy(onDone) {
    var tid = todayDayId() || "mon";
    function opts(sel) { return DAYS.map(function (d) { return '<option value="' + d.id + '"' + (d.id === sel ? " selected" : "") + ">" + esc(d.label) + "</option>"; }).join(""); }
    var root = null;
    I.modal({
      title: "Sao chép lịch một ngày",
      html: '<div class="grid g-2">' +
        '<label class="field"><span class="field-label">Từ ngày</span><select class="select" data-from>' + opts(tid) + "</select></label>" +
        '<label class="field"><span class="field-label">Sang ngày</span><select class="select" data-to>' + opts(DAYS[(DAYS.map(function (d) { return d.id; }).indexOf(tid) + 1) % 7].id) + "</select></label>" +
        '</div><p class="small muted">Lịch của ngày đích sẽ được thay bằng lịch của ngày nguồn (cả 24 ô).</p>',
      actions: [
        { label: "Huỷ", kind: "ghost" },
        { label: "Sao chép", kind: "primary", onClick: function (close) {
          var from = root.querySelector("[data-from]").value, to = root.querySelector("[data-to]").value;
          if (from === to) { I.toast("Hãy chọn hai ngày khác nhau.", "warn"); return; }
          for (var h = 0; h < 24; h++) {
            var c = getCell(cellKey(from, h));
            putCell(cellKey(to, h), c ? c.type : "", c ? c.note : "");
          }
          commit();
          close();
          I.toast("Đã sao chép " + dayOf(from).label + " sang " + dayOf(to).label + ".", "success");
          onDone();
        } }
      ],
      onMount: function (el) { root = el; }
    });
  }

  /* ---------- mount ---------- */
  function mount(root) {
    var page = root.querySelector(".sc-page");
    if (!page) return;
    var brush = "edit";
    var painting = null; // { dirty, mouse } while a mouse drag-paint is in progress
    var mouseHandled = false;

    function refreshCell(btn) {
      var key = btn.getAttribute("data-cell"), p = key.split("-"), c = getCell(key);
      btn.className = cellClass(c, p[0], todayDayId());
      btn.innerHTML = cellInner(c);
      var a = cellAria(p[0], +p[1], c);
      btn.setAttribute("aria-label", a);
      btn.setAttribute("title", a);
    }
    function refreshAll() {
      Array.prototype.forEach.call(page.querySelectorAll("[data-cell]"), refreshCell);
      var s = page.querySelector("[data-summary]");
      if (s) s.innerHTML = summaryHTML();
    }
    function refreshSummary() {
      var s = page.querySelector("[data-summary]");
      if (s) s.innerHTML = summaryHTML();
    }
    function paint(btn) {
      var key = btn.getAttribute("data-cell");
      if (brush === "erase") putCell(key, "", "");
      else {
        var cur = getCell(key);
        putCell(key, brush, cur ? cur.note : "");
      }
      refreshCell(btn);
      return true;
    }
    function setBrush(b) {
      brush = b;
      page.classList.toggle("is-painting", b !== "edit");
      page.querySelector("[data-brush-host]").innerHTML = brushHTML(b);
      var f = page.querySelector('[data-brush="' + b + '"]');
      if (f) f.focus();
    }
    function finishPaint() {
      if (!painting) return;
      var dirty = painting.dirty;
      painting = null;
      if (dirty) { commit(); refreshSummary(); }
    }

    function onClick(e) {
      var t = e.target.closest ? e.target.closest("[data-brush],[data-act],[data-cell]") : null;
      if (!t) return;
      if (t.hasAttribute("data-brush")) { setBrush(t.getAttribute("data-brush")); return; }
      if (t.hasAttribute("data-act")) {
        var act = t.getAttribute("data-act");
        if (act === "copy") openCopy(refreshAll);
        else if (act === "clear") {
          if (!Object.keys(store().cells).length) { I.toast("Lịch đang trống.", "info"); return; }
          I.confirm("Xoá toàn bộ lịch học của cả tuần? Thao tác này không hoàn tác được.", { okLabel: "Xoá tất cả", danger: true }).then(function (ok) {
            if (!ok) return;
            store().cells = {};
            commit();
            refreshAll();
            I.toast("Đã xoá lịch học.", "success");
          });
        }
        return;
      }
      // cell
      if (brush === "edit") {
        openEditor(t.getAttribute("data-cell"), function () { refreshCell(t); refreshSummary(); });
      } else if (mouseHandled) {
        mouseHandled = false; // mouse painting already happened in pointerdown/pointerover
      } else {
        // tap (touch/pen) or keyboard (Enter/Space) while a brush is active
        paint(t); commit(); refreshSummary();
      }
    }
    function onPointerDown(e) {
      mouseHandled = false;
      // only mouse drags paint here; touch keeps native scrolling and paints on tap (click)
      if (brush === "edit" || e.button > 0 || e.pointerType !== "mouse") return;
      var t = e.target.closest ? e.target.closest("[data-cell]") : null;
      if (!t) return;
      painting = { dirty: paint(t), mouse: true };
      mouseHandled = true;
      e.preventDefault();
    }
    function onPointerOver(e) {
      if (!painting || !painting.mouse) return;
      var t = e.target.closest ? e.target.closest("[data-cell]") : null;
      if (t && page.contains(t)) painting.dirty = paint(t) || painting.dirty;
    }
    function onKeyDown(e) {
      var t = e.target;
      if (!t || !t.hasAttribute || !t.hasAttribute("data-cell")) return;
      var r = +t.getAttribute("data-r"), c = +t.getAttribute("data-c");
      var map = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        putCell(t.getAttribute("data-cell"), "", ""); commit(); refreshCell(t); refreshSummary();
        return;
      }
      var m = map[e.key];
      if (!m) return;
      var nr = Math.max(0, Math.min(23, r + m[0])), nc = Math.max(0, Math.min(6, c + m[1]));
      var n = page.querySelector('[data-r="' + nr + '"][data-c="' + nc + '"]');
      if (n) { e.preventDefault(); n.focus(); }
    }

    page.addEventListener("click", onClick);
    page.addEventListener("pointerdown", onPointerDown);
    page.addEventListener("pointerover", onPointerOver);
    page.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerup", finishPaint);
    document.addEventListener("pointercancel", finishPaint);

    // bring the school day into view on first open (scroll to 06:00 row, or first filled row)
    var sc = page.querySelector("[data-scroll]");
    if (sc) {
      var first = page.querySelector(".sc-cell.t-school, .sc-cell.t-home, .sc-cell.t-study, .sc-cell.t-busy, .sc-cell.t-note");
      var row = first ? +first.getAttribute("data-r") : 6;
      var tr = sc.querySelectorAll("tbody tr")[Math.max(0, row - 1)];
      var headH = (sc.querySelector("thead") || {}).offsetHeight || 0;
      if (tr) sc.scrollTop = Math.max(0, tr.offsetTop - headH);
    }

    return function () {
      finishPaint();
      document.removeEventListener("pointerup", finishPaint);
      document.removeEventListener("pointercancel", finishPaint);
    };
  }

  I.schedule = { DAYS: DAYS, TYPES: TYPES, get: getCell, daySummary: daySummary };

  I.registerPage({
    id: "schedule",
    label: "Lịch học",
    icon: "calendar",
    skill: null,
    group: "study",
    order: 3.5,
    render: render,
    mount: mount
  });
})();
