/* Settings (A2) — Cài đặt */
(function () {
  "use strict";
  var I = window.IELTS;

  function esc(s) { return I.esc(s == null ? "" : String(s)); }
  function ic(n, s) { return I.icon ? I.icon(n, s || 18) : ""; }
  function skName(k) { return I.skillName ? I.skillName(k) : k; }
  function safe(fn, fb) { try { var r = fn(); return r == null ? fb : r; } catch (e) { return fb; } }
  function bandOptions(sel, allowNull, min) {
    var out = allowNull ? '<option value="">Chưa biết</option>' : "";
    for (var b = min || 4; b <= 9.001; b += 0.5) {
      var v = b.toFixed(1);
      out += '<option value="' + v + '"' + (sel != null && sel !== "" && Number(sel) === b ? " selected" : "") + ">" + v + "</option>";
    }
    return out;
  }
  var SOURCES = ["Tự đánh giá", "Giáo viên", "Đề thi thử", "Kết quả thi thật"];

  function ttsVoiceOptions(sel) {
    var vs = safe(function () { return I.tts.voices(); }, []) || [];
    var out = '<option value="">Tự động (giọng tốt nhất có sẵn)</option>';
    var found = !sel;
    vs.forEach(function (v) {
      var name = v.name || String(v);
      if (name === sel) found = true;
      out += '<option value="' + esc(name) + '"' + (name === sel ? " selected" : "") + ">" + esc(name) + (v.lang ? " — " + esc(v.lang) : "") + "</option>";
    });
    if (!found) out += '<option value="' + esc(sel) + '" selected>' + esc(sel) + " (không có trên máy này)</option>";
    return out;
  }

  function ttsHTML(p) {
    var t = p.tts || {};
    var avail = safe(function () { return I.tts.available(); }, true);
    var rate = t.rate || 0.95;
    return '<section class="card st-card st-tts">' +
      '<div class="card-title">' + ic("volume", 18) + " Giọng đọc Listening (Text-to-Speech)</div>" +
      '<p class="small muted">App dùng giọng đọc có sẵn của trình duyệt cho bài nghe. Trên Edge, các giọng "Online (Natural)" nghe tự nhiên nhất. Thay đổi ở mục này được lưu ngay.</p>' +
      (avail === false ? '<div class="st-warn small">' + ic("alert-triangle", 15) + " Trình duyệt này không có giọng đọc tiếng Anh. Hãy dùng Chrome hoặc Edge mới nhất để luyện Listening.</div>" : "") +
      '<div class="grid g-2">' +
        '<label class="field"><span class="field-label">Giọng nữ</span><select class="select" data-tts="voiceF">' + ttsVoiceOptions(t.voiceF) + "</select></label>" +
        '<label class="field"><span class="field-label">Giọng nam</span><select class="select" data-tts="voiceM">' + ttsVoiceOptions(t.voiceM) + "</select></label>" +
      "</div>" +
      '<label class="field st-rate"><span class="field-label">Tốc độ đọc <b class="st-rate-val">' + Number(rate).toFixed(2) + "×</b></span>" +
        '<input type="range" min="0.7" max="1.2" step="0.05" value="' + rate + '" data-tts="rate"></label>' +
      '<div class="row wrap">' +
        '<button class="btn sm" data-act="tts-test" data-voice="f"' + (avail === false ? " disabled" : "") + ">" + ic("play", 14) + " Nghe thử giọng nữ</button>" +
        '<button class="btn sm" data-act="tts-test" data-voice="m"' + (avail === false ? " disabled" : "") + ">" + ic("play", 14) + " Nghe thử giọng nam</button>" +
      "</div>" +
    "</section>";
  }

  function render() {
    var p = I.state.profile, aims = p.aims || {}, base = p.baseline || {}, mw = p.manualWeak || {};
    var st = I.state;
    var counts = (st.submissions || []).length + " bài nộp · " + (st.errors || []).length + " lỗi · " +
      Object.keys((st.vocab && st.vocab.items) || {}).length + " từ đang học · " + Object.keys(st.attendance || {}).length + " ngày điểm danh";
    var srcOpts = SOURCES.concat(SOURCES.indexOf(p.baselineSource) < 0 && p.baselineSource ? [p.baselineSource] : []).map(function (s) {
      return '<option value="' + esc(s) + '"' + (s === (p.baselineSource || "Tự đánh giá") ? " selected" : "") + ">" + esc(s) + "</option>";
    }).join("");

    return '<div class="page st-page">' +
      '<header class="page-head"><div><div class="page-kicker">Theo dõi</div><h1 class="page-title">Cài đặt</h1>' +
        '<p class="page-sub">Hồ sơ, mục tiêu và thời lượng học quyết định cách app lập kế hoạch cho bạn.</p></div>' +
        '<div class="page-actions"><button class="btn primary" data-act="save">' + ic("check", 16) + " Lưu thay đổi</button></div></header>" +

      '<form class="st-form" autocomplete="off" onsubmit="return false">' +
      '<div class="grid g-2 st-grid">' +

      '<section class="card st-card">' +
        '<div class="card-title">' + ic("star", 18) + " Hồ sơ</div>" +
        '<label class="field"><span class="field-label">Tên của bạn</span><input class="input" name="name" maxlength="60" value="' + esc(p.name || "") + '" placeholder="VD: Minh Anh"></label>' +
        '<label class="field"><span class="field-label">Ngày thi IELTS</span><input class="input" type="date" name="examDate" value="' + esc(p.examDate || "") + '"></label>' +
        '<p class="tiny muted">Số ngày đến kỳ thi tính theo lịch Việt Nam.</p>' +
      "</section>" +

      '<section class="card st-card">' +
        '<div class="card-title">' + ic("target", 18) + " Mục tiêu (aim)</div>" +
        '<div class="grid g-2">' +
          '<label class="field st-aim-overall"><span class="field-label">Aim overall</span><select class="select" name="aim_overall">' + bandOptions(aims.overall, false, 4) + "</select></label>" +
          I.skills.map(function (k) {
            return '<label class="field sk-' + k + '"><span class="field-label"><i class="st-dot"></i>' + esc(skName(k)) + '</span><select class="select" name="aim_' + k + '">' + bandOptions(aims[k], false, 4) + "</select></label>";
          }).join("") +
        "</div>" +
      "</section>" +

      '<section class="card st-card">' +
        '<div class="card-title">' + ic("bar-chart", 18) + " Band hiện tại</div>" +
        '<p class="small muted">Dùng khi chưa có full test trong app. Band từ full test (Listening/Reading) hoặc bài đã đánh giá (Writing/Speaking) sẽ được ưu tiên.</p>' +
        '<div class="grid g-2">' +
          I.skills.map(function (k) {
            return '<label class="field sk-' + k + '"><span class="field-label"><i class="st-dot"></i>' + esc(skName(k)) + '</span><select class="select" name="base_' + k + '">' + bandOptions(base[k], true, 3) + "</select></label>";
          }).join("") +
          '<label class="field"><span class="field-label">Nguồn</span><select class="select" name="baselineSource">' + srcOpts + "</select></label>" +
          '<label class="field"><span class="field-label">Ngày đánh giá</span><input class="input" type="date" name="baselineDate" value="' + esc(p.baselineDate || "") + '"></label>' +
        "</div>" +
      "</section>" +

      '<section class="card st-card">' +
        '<div class="card-title">' + ic("calendar-check", 18) + " Kế hoạch học</div>" +
        '<div class="grid g-2">' +
          '<label class="field"><span class="field-label">Thời lượng mỗi ngày (phút)</span><input class="input" type="number" name="dailyMinutes" min="60" max="600" step="5" value="' + (p.dailyMinutes || 250) + '"></label>' +
          '<label class="field"><span class="field-label">Số từ mới mỗi ngày</span><input class="input" type="number" name="dailyWords" min="3" max="30" step="1" value="' + (p.dailyWords || 8) + '"></label>' +
        "</div>" +
        '<div class="st-info small">' + ic("clock", 15) + " Ngày học mới bắt đầu lúc <b>" + String(p.resetHour == null ? 6 : p.resetHour).replace(/^(\d)$/, "0$1") + ":00</b> (giờ Việt Nam). Bài làm trước giờ này được tính cho ngày hôm trước.</div>" +
        '<p class="tiny muted">Mặc định 250 phút, chia cho Listening, Reading, Writing, Speaking và Từ vựng (mỗi phần 20–90 phút).</p>' +
      "</section>" +

      '<section class="card st-card st-wide">' +
        '<div class="card-title">' + ic("lightbulb", 18) + " Ghi chú điểm yếu</div>" +
        '<p class="small muted">Điều bạn hoặc giáo viên nhận thấy. Ghi chú hiện trên thẻ kỹ năng ở Tổng quan, bên cạnh phân tích từ dữ liệu bài làm.</p>' +
        '<div class="grid g-2">' +
          I.skills.map(function (k) {
            return '<label class="field sk-' + k + '"><span class="field-label"><i class="st-dot"></i>' + esc(skName(k)) + '</span><textarea class="textarea" rows="2" name="weak_' + k + '" maxlength="400">' + esc(mw[k] || "") + "</textarea></label>";
          }).join("") +
        "</div>" +
      "</section>" +

      "</div></form>" +

      '<div class="row st-savebar"><span class="small muted st-dirty">Có thay đổi chưa lưu</span><span class="spacer"></span>' +
        '<button class="btn primary" data-act="save">' + ic("check", 16) + " Lưu thay đổi</button></div>" +

      '<div class="grid g-2 st-grid">' +
        ttsHTML(p) +
        '<section class="card st-card st-backup">' +
          '<div class="card-title">' + ic("download", 18) + " Sao lưu & khôi phục</div>" +
          '<p class="small muted">Toàn bộ dữ liệu chỉ nằm trong trình duyệt này. Hãy tải bản sao lưu định kỳ (gồm cả bản ghi âm Speaking).</p>' +
          '<p class="tiny muted st-counts">Hiện có: ' + esc(counts) + "</p>" +
          '<div class="row wrap">' +
            '<button class="btn primary sm" data-act="export">' + ic("download", 14) + " Tải bản sao lưu</button>" +
            '<button class="btn sm" data-act="import">' + ic("upload", 14) + " Khôi phục từ tệp…</button>" +
            '<input type="file" accept=".json,application/json" class="st-file" hidden>' +
          "</div>" +
        "</section>" +
      "</div>" +

      '<section class="card st-card st-danger">' +
        '<div class="card-title">' + ic("alert-triangle", 18) + " Vùng cần cẩn thận</div>" +
        '<div class="st-danger-row"><div><b>Chạy lại hướng dẫn ban đầu</b><div class="small muted">Mở lại 3 bước thiết lập (tên, band hiện tại, aim). Dữ liệu học vẫn giữ nguyên.</div></div>' +
          '<button class="btn ghost sm" data-act="onboard">' + ic("rotate-ccw", 14) + " Chạy lại</button></div>" +
        '<div class="st-danger-row"><div><b>Xoá toàn bộ dữ liệu</b><div class="small muted">Xoá hồ sơ, bài nộp, lỗi, từ vựng, điểm danh và bản ghi âm. Không hoàn tác được — hãy tải bản sao lưu trước.</div></div>' +
          '<button class="btn danger sm" data-act="reset">' + ic("trash", 14) + " Xoá toàn bộ</button></div>" +
      "</section>" +
    "</div>";
  }

  function readForm(el) {
    var f = el.querySelector(".st-form");
    var v = function (n) { var x = f.querySelector('[name="' + n + '"]'); return x ? x.value : ""; };
    return { v: v };
  }

  function saveForm(el) {
    var p = I.state.profile, v = readForm(el).v;
    var mins = Math.round((Number(v("dailyMinutes")) || 250) / 5) * 5;
    if (mins < 60 || mins > 600) { I.toast("Thời lượng mỗi ngày cần trong khoảng 60–600 phút", "warn"); return false; }
    var words = Math.round(Number(v("dailyWords")) || 8);
    if (words < 3 || words > 30) { I.toast("Số từ mới mỗi ngày cần trong khoảng 3–30", "warn"); return false; }
    var exam = v("examDate");
    if (exam && !/^\d{4}-\d{2}-\d{2}$/.test(exam)) { I.toast("Ngày thi chưa hợp lệ", "warn"); return false; }
    var oldMins = p.dailyMinutes;

    p.name = v("name").trim();
    p.examDate = exam;
    p.aims = p.aims || {};
    p.aims.overall = Number(v("aim_overall"));
    p.baseline = p.baseline || {};
    p.manualWeak = p.manualWeak || {};
    I.skills.forEach(function (k) {
      p.aims[k] = Number(v("aim_" + k));
      var b = v("base_" + k);
      p.baseline[k] = b === "" ? null : Number(b);
      p.manualWeak[k] = v("weak_" + k).trim();
    });
    p.baselineSource = v("baselineSource") || "Tự đánh giá";
    p.baselineDate = v("baselineDate");
    p.dailyMinutes = mins;
    p.dailyWords = words;
    I.save();
    if (oldMins !== mins && I.regeneratePlan) {
      try { I.regeneratePlan(); } catch (e) {}
      I.toast("Đã lưu cài đặt · kế hoạch hôm nay đã cập nhật theo " + mins + " phút", "success");
    } else {
      I.toast("Đã lưu cài đặt", "success");
    }
    return true;
  }

  function download(obj) {
    var key = safe(function () { return I.calendarTodayVN(); }, null) || I.todayKey();
    var blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "ielts-coach-backup-" + key + ".json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }

  I.registerPage({
    id: "settings",
    label: "Cài đặt",
    icon: "settings",
    skill: null,
    group: "track",
    order: 30,
    render: render,
    mount: function (root) {
      var el = root.querySelector(".st-page") || root;
      var dirty = false;
      function setDirty(d) { dirty = d; el.classList.toggle("is-dirty", d); }

      function refillVoices() {
        var p = I.state.profile, t = p.tts || {};
        Array.prototype.forEach.call(el.querySelectorAll("select[data-tts]"), function (s) {
          s.innerHTML = ttsVoiceOptions(t[s.getAttribute("data-tts")]);
        });
      }
      if (I.tts && I.tts.ready) {
        try { I.tts.ready().then(function () { if (el.isConnected !== false) refillVoices(); }, function () {}); } catch (e) {}
      }

      function onClick(e) {
        var t = e.target.closest ? e.target.closest("[data-act]") : null;
        if (!t || !el.contains(t)) return;
        var act = t.getAttribute("data-act");
        if (act === "save") { if (saveForm(el)) setDirty(false); }
        else if (act === "tts-test") {
          var p = I.state.profile;
          try {
            if (I.tts.stop) I.tts.stop();
            I.tts.speak(t.getAttribute("data-voice") === "m"
              ? "Good afternoon. This is a sample of the male voice for your IELTS listening practice."
              : "Hello! This is a sample of the female voice for your IELTS listening practice.",
              { voice: t.getAttribute("data-voice"), rate: (p.tts && p.tts.rate) || 0.95 });
          } catch (err) { I.toast("Không phát được giọng đọc trên trình duyệt này", "error"); }
        }
        else if (act === "export") {
          t.disabled = true;
          Promise.resolve().then(function () { return I.exportBackup(); }).then(function (obj) {
            download(obj);
            I.toast("Đã tải bản sao lưu", "success");
          }).catch(function (err) {
            I.toast((err && err.message) || "Không tạo được bản sao lưu", "error");
          }).then(function () { t.disabled = false; });
        }
        else if (act === "import") { var fi = el.querySelector(".st-file"); if (fi) fi.click(); }
        else if (act === "onboard") {
          I.confirm("Mở lại hướng dẫn thiết lập ban đầu? Dữ liệu học của bạn vẫn được giữ nguyên.", { okLabel: "Chạy lại" }).then(function (ok) {
            if (!ok) return;
            I.state.profile.onboarded = false;
            I.save();
            location.reload();
          });
        }
        else if (act === "reset") {
          I.confirm("Xoá TOÀN BỘ dữ liệu (hồ sơ, bài nộp, lỗi, từ vựng, điểm danh, bản ghi âm)? Thao tác này không hoàn tác được.", { okLabel: "Xoá toàn bộ", danger: true }).then(function (ok) {
            if (!ok) return;
            Promise.resolve().then(function () { return I.resetAll(); }).then(function () {
              I.toast("Đã xoá toàn bộ dữ liệu", "success");
              setTimeout(function () { location.reload(); }, 600);
            }).catch(function (err) { I.toast((err && err.message) || "Không xoá được dữ liệu", "error"); });
          });
        }
      }

      function onChange(e) {
        var t = e.target;
        if (!t || !t.getAttribute) return;
        if (t.classList.contains("st-file")) {
          var file = t.files && t.files[0];
          t.value = "";
          if (!file) return;
          var reader = new FileReader();
          reader.onerror = function () { I.toast("Không đọc được tệp", "error"); };
          reader.onload = function () {
            var obj;
            try { obj = JSON.parse(String(reader.result || "")); }
            catch (err) { I.toast("Tệp không phải JSON hợp lệ — hãy chọn đúng tệp ielts-coach-backup-….json", "error"); return; }
            var when = obj && obj.exportedAt ? new Date(obj.exportedAt) : null;
            var whenTxt = when && !isNaN(when) ? " (tạo lúc " + when.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }) + ")" : "";
            I.confirm("Khôi phục từ " + file.name + whenTxt + "? Toàn bộ dữ liệu hiện tại sẽ được thay bằng dữ liệu trong bản sao lưu.", { okLabel: "Khôi phục", danger: true }).then(function (ok) {
              if (!ok) return;
              Promise.resolve().then(function () { return I.importBackup(obj); }).then(function () {
                I.toast("Đã khôi phục dữ liệu từ bản sao lưu", "success");
                setDirty(false);
                I.refresh();
              }).catch(function (err) {
                I.toast((err && err.message) || "Bản sao lưu không hợp lệ", "error");
              });
            });
          };
          reader.readAsText(file);
          return;
        }
        var tk = t.getAttribute("data-tts");
        if (tk) {
          var p = I.state.profile;
          p.tts = p.tts || { voiceF: "", voiceM: "", rate: 0.95 };
          p.tts[tk] = tk === "rate" ? Number(t.value) : t.value;
          I.save();
          I.toast("Đã lưu giọng đọc", "success");
          return;
        }
        if (t.closest && t.closest(".st-form")) setDirty(true);
      }
      function onInput(e) {
        var t = e.target;
        if (t && t.getAttribute && t.getAttribute("data-tts") === "rate") {
          var lab = el.querySelector(".st-rate-val");
          if (lab) lab.textContent = Number(t.value).toFixed(2) + "×";
        } else if (t && t.closest && t.closest(".st-form")) setDirty(true);
      }
      function onKey(e) {
        if (e.key === "Enter" && e.target && e.target.tagName === "INPUT" && e.target.closest && e.target.closest(".st-form")) {
          e.preventDefault();
          if (saveForm(el)) setDirty(false);
        }
      }
      el.addEventListener("click", onClick);
      el.addEventListener("change", onChange);
      el.addEventListener("input", onInput);
      el.addEventListener("keydown", onKey);
      return function () {
        el.removeEventListener("click", onClick);
        el.removeEventListener("change", onChange);
        el.removeEventListener("input", onInput);
        el.removeEventListener("keydown", onKey);
        if (I.tts && I.tts.stop) { try { I.tts.stop(); } catch (e) {} }
        if (dirty && el.querySelector(".st-form")) saveForm(el);
      };
    }
  });
})();
