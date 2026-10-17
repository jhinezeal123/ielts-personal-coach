/* Góp ý cho nhà phát triển — #/feedback (SPEC §12). Sending lives in js/feedback.js. */
(function () {
  "use strict";
  var I = window.IELTS;

  var MAX_LEN = 3500;

  function esc(s) { return I.esc(s == null ? "" : String(s)); }
  function ic(n, s) { return I.icon ? I.icon(n, s || 18) : ""; }
  function fb() { return I.feedback || null; }
  function isConfigured() { try { return !!(fb() && fb().configured()); } catch (e) { return false; } }

  function render() {
    var F = fb();
    var ok = isConfigured();
    var d = (F && F.loadDraft()) || {};
    var type = d.type || "bug";
    var info = d.includeInfo !== false;
    var types = (F ? F.TYPES : [{ id: "other", label: "Khác" }]).map(function (t) {
      return '<option value="' + esc(t.id) + '"' + (t.id === type ? " selected" : "") + ">" + esc(t.label) + "</option>";
    }).join("");
    var msg = String(d.message || "");

    return '<div class="page fb-page">' +
      '<header class="page-head"><div><div class="page-kicker">Theo dõi</div><h1 class="page-title">Góp ý cho nhà phát triển</h1>' +
        '<p class="page-sub">Gặp lỗi, thấy nội dung sai hay muốn có tính năng mới? Viết vài dòng — tin nhắn được gửi thẳng tới người làm app qua Telegram.</p></div></header>' +

      '<section class="card st-card fb-card">' +
        '<div class="card-title">' + ic("message-square", 18) + " Gửi góp ý</div>" +
        (ok ? "" : '<div class="st-info small fb-off">' + ic("info", 15) + "<span>Kênh góp ý <b>chưa được cấu hình</b> trên bản app này nên chưa gửi được. Bạn vẫn có thể viết trước — nội dung được giữ lại trên máy.</span></div>") +
        '<form class="fb-form stack" autocomplete="off" onsubmit="return false">' +
          '<label class="field"><span class="field-label">Loại góp ý</span><select class="select" name="type">' + types + "</select></label>" +
          '<label class="field"><span class="field-label">Nội dung <span class="fb-req" aria-hidden="true">*</span></span>' +
            '<textarea class="textarea" name="message" rows="6" maxlength="' + MAX_LEN + '" required placeholder="Ví dụ: Ở Reading Test 3, câu 14 đáp án hình như sai… / Mong app có thêm…">' + esc(msg) + "</textarea>" +
            '<span class="field-hint fb-count">' + msg.length + "/" + MAX_LEN + " · tối thiểu 10 ký tự</span></label>" +
          '<label class="field"><span class="field-label">Liên hệ (không bắt buộc)</span>' +
            '<input class="input" name="contact" maxlength="120" value="' + esc(d.contact || "") + '" placeholder="Email, Zalo hoặc Telegram — nếu muốn được trả lời"></label>' +
          '<label class="row fb-check"><input type="checkbox" class="checkbox" name="includeInfo"' + (info ? " checked" : "") + ">" +
            "<span>Đính kèm thông tin kỹ thuật (phiên bản, trình duyệt)</span></label>" +
          '<p class="tiny muted fb-note">Gồm: phiên bản app, trang đang mở, thời gian, trình duyệt và kích thước màn hình. Không gửi tên, bài làm hay dữ liệu học của bạn.</p>' +
          '<div class="row wrap"><button type="button" class="btn primary" data-act="send"' + (ok ? "" : " disabled") + ">" + ic("send", 15) + " Gửi góp ý</button>" +
            '<span class="tiny muted">Ctrl + Enter để gửi nhanh</span></div>' +
        "</form>" +
        '<div class="fb-result small" aria-live="polite"></div>' +
      "</section>" +
    "</div>";
  }

  I.registerPage({
    id: "feedback",
    label: "Góp ý",
    icon: "message-square",
    skill: null,
    group: "track",
    order: 31,
    render: render,
    mount: function (root) {
      var el = root.querySelector(".fb-page") || root;
      var form = el.querySelector(".fb-form");
      var out = el.querySelector(".fb-result");
      var btn = el.querySelector('[data-act="send"]');
      var sending = false;
      if (!form) return;

      function field(n) { return form.querySelector('[name="' + n + '"]'); }
      function read() {
        return {
          type: field("type").value,
          message: field("message").value,
          contact: field("contact").value,
          includeInfo: !!field("includeInfo").checked
        };
      }
      function persist() { if (fb()) fb().saveDraft(read()); }
      function count() {
        var c = el.querySelector(".fb-count");
        if (c) c.textContent = field("message").value.length + "/" + MAX_LEN + " · tối thiểu 10 ký tự";
      }
      function show(kind, html) {
        if (out) out.innerHTML = html ? '<div class="' + (kind === "ok" ? "st-info fb-ok" : "st-warn") + '">' + ic(kind === "ok" ? "check" : "alert-triangle", 15) + "<span>" + html + "</span></div>" : "";
      }

      function submit() {
        if (sending || !btn || btn.disabled) return;
        var f = read();
        if (f.message.trim().length < 10) {
          show("err", "Nội dung góp ý cần ít nhất 10 ký tự.");
          try { field("message").focus(); } catch (e) { /* ignore */ }
          return;
        }
        sending = true;
        btn.disabled = true;
        btn.innerHTML = ic("send", 15) + " Đang gửi…";
        show("", "");
        fb().send(f).then(function () {
          if (fb()) fb().clearDraft();
          field("message").value = "";
          field("contact").value = "";
          count();
          show("ok", "<b>Cảm ơn bạn!</b> Góp ý đã được gửi tới nhà phát triển.");
          I.toast("Đã gửi góp ý. Cảm ơn bạn!", "success");
        }, function (err) {
          var why = String((err && err.message) || "Không gửi được góp ý").replace(/[.\s]+$/, "") + ".";
          show("err", esc(why) + " Nội dung vẫn được giữ nguyên để bạn gửi lại.");
        }).then(function () {
          sending = false;
          if (btn.isConnected === false) return;
          btn.disabled = !isConfigured();
          btn.innerHTML = ic("send", 15) + " Gửi góp ý";
        });
      }

      function onClick(e) {
        var t = e.target.closest ? e.target.closest("[data-act]") : null;
        if (t && el.contains(t) && t.getAttribute("data-act") === "send") submit();
      }
      function onInput(e) {
        if (e.target && e.target.name === "message") count();
        persist();
      }
      function onKey(e) {
        if (e.key !== "Enter") return;
        var tag = e.target && e.target.tagName;
        if ((tag === "TEXTAREA" && (e.ctrlKey || e.metaKey)) || (tag === "INPUT" && e.target.type !== "checkbox")) {
          e.preventDefault();
          submit();
        }
      }
      form.addEventListener("input", onInput);
      form.addEventListener("change", persist);
      form.addEventListener("keydown", onKey);
      el.addEventListener("click", onClick);
      return function () {
        persist();
        form.removeEventListener("input", onInput);
        form.removeEventListener("change", persist);
        form.removeEventListener("keydown", onKey);
        el.removeEventListener("click", onClick);
      };
    }
  });
})();
