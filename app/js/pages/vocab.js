/* IELTS Coach — Vocabulary page (owner: V)
 * Route: #/vocab?tab=today|review|learned
 * Uses core SRS API: getTodayWords, learnWord, reviewWord, dueWords, reviewingWords, learnedWords, addCustomWord.
 */
(function () {
  "use strict";

  var I = window.IELTS;
  if (!I || typeof I.registerPage !== "function") return;

  var STAGE_SHORT = ["1n", "2n", "5n", "1t", "2t", "1th"];
  var STAGE_FULL = ["1 ngày", "2 ngày", "5 ngày", "1 tuần", "2 tuần", "1 tháng"];
  var POS_LIST = ["n.", "v.", "adj.", "adv.", "phr.", "collocation"];
  var BAND_LIST = ["6.5", "7.0", "7.5+", "8.0+"];
  var TOPIC_VI = {
    education: "Giáo dục", technology: "Công nghệ", environment: "Môi trường", health: "Sức khoẻ", work: "Công việc",
    society: "Xã hội", urban: "Đô thị", culture: "Văn hoá", science: "Khoa học", media: "Truyền thông", travel: "Du lịch",
    crime: "Tội phạm", government: "Chính phủ", family: "Gia đình", economy: "Kinh tế", food: "Ẩm thực", sport: "Thể thao",
    history: "Lịch sử", animals: "Động vật", energy: "Năng lượng"
  };
  var TABS = [
    { id: "today", label: "Hôm nay", icon: "sun" },
    { id: "review", label: "Cần ôn", icon: "rotate-ccw" },
    { id: "learned", label: "Đã học", icon: "award" }
  ];

  // Page-local UI state (not persisted)
  var ui = { mode: "list", fcIdx: 0, fcFlip: false, fcChecked: false, rvReveal: false, rvSkip: [], rvFront: null, search: "" };
  var cur = { root: null, params: {} };

  /* ---------------- helpers ---------------- */
  function esc(s) { return I.esc ? I.esc(s == null ? "" : s) : String(s == null ? "" : s); }
  function ic(name, size) { return I.icon ? I.icon(name, size || 18) : ""; }
  function srs() { return I.SRS || [1, 2, 5, 7, 14, 30]; }
  function today() { return I.todayKey(); }
  function fd(key) { return key ? I.fmtDay(key, "short") : "—"; }
  function diff(a, b) { return I.diffDays(a, b); }
  function items() { return (I.state && I.state.vocab && I.state.vocab.items) || {}; }
  function itemOf(id) { return items()[id] || null; }
  function safe(fn, fb) { try { var r = fn(); return r == null ? fb : r; } catch (e) { console.error(e); return fb; } }
  function dailyCount() { return Math.max(1, Math.floor(Number(((I.state || {}).profile || {}).dailyWords) || 8)); }
  function topicName(t) { return TOPIC_VI[t] || (t ? String(t) : "Tự thêm"); }
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  }
  function plural(n, unit) { return n + " " + unit; }

  function highlight(example, word) {
    var ex = esc(example || "");
    if (!ex || !word) return ex;
    var w = String(word).trim();
    var cands = [w, w.replace(/^(a|an|the|be)\s+/i, ""), w.replace(/^(a|an|the|be)\s+/i, "").replace(/\s+(to|on|of|with|into|in)$/i, "")];
    for (var i = 0; i < cands.length; i++) {
      var c = cands[i];
      if (!c || c.length < 3) continue;
      var re = new RegExp(esc(c).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      if (re.test(ex)) return ex.replace(re, function (m) { return '<mark class="vc-hl">' + m + "</mark>"; });
    }
    return ex;
  }

  function speak(text) {
    var tts = I.tts;
    if (!tts || typeof tts.speak !== "function") { I.toast("Trình duyệt chưa hỗ trợ đọc phát âm.", "warn"); return; }
    var go = function () {
      if (typeof tts.available === "function" && !tts.available()) {
        I.toast("Chưa có giọng đọc tiếng Anh — hãy thử Chrome hoặc Edge.", "warn"); return;
      }
      try { if (tts.stop) tts.stop(); } catch (e) { /* ignore */ }
      var p = tts.speak(text, { voice: "f" });
      if (p && p.catch) p.catch(function () {});
    };
    if (typeof tts.ready === "function") tts.ready().then(go, go); else go();
  }

  function nextDueText(it) {
    if (!it) return "";
    if (it.status === "learned") return "Đã thuộc";
    return "Ôn lại ngày " + fd(it.due);
  }
  function overdueDays(it) {
    if (!it || it.status !== "review" || !it.due) return 0;
    return Math.max(0, diff(it.due, today()));
  }

  /* ---------------- data snapshot ---------------- */
  function snapshot() {
    var t = today();
    var todayWords = safe(function () { return I.getTodayWords(); }, []);
    var due = safe(function () { return I.dueWords(); }, []);
    var reviewing = safe(function () { return I.reviewingWords(); }, []);
    var learned = safe(function () { return I.learnedWords(); }, []);
    var its = items();
    var learnedToday = todayWords.filter(function (w) { return !!its[w.id]; }).length;
    var overdue = due.filter(function (w) { return overdueDays(w.srs || its[w.id]) > 0; }).length;
    var custom = ((I.state && I.state.vocab && I.state.vocab.custom) || []).filter(function (w) {
      var id = w.id || I.wordId(w.word); return id && !its[id];
    }).map(function (w) { var o = Object.assign({}, w); o.id = o.id || I.wordId(o.word); return o; });
    return { t: t, todayWords: todayWords, due: orderDue(due), reviewing: reviewing, learned: learned,
      learnedToday: learnedToday, overdue: overdue, customPending: custom };
  }

  function orderDue(list) {
    var dueIds = {};
    list.forEach(function (w) { dueIds[w.id] = 1; });
    ui.rvSkip = ui.rvSkip.filter(function (id) { return dueIds[id]; });
    if (ui.rvFront && !dueIds[ui.rvFront]) ui.rvFront = null;
    var front = [], rest = [], skipped = [];
    list.forEach(function (w) {
      if (w.id === ui.rvFront) front.push(w);
      else if (ui.rvSkip.indexOf(w.id) >= 0) skipped.push(w);
      else rest.push(w);
    });
    skipped.sort(function (a, b) { return ui.rvSkip.indexOf(a.id) - ui.rvSkip.indexOf(b.id); });
    return front.concat(rest, skipped);
  }

  /* ---------------- shared fragments ---------------- */
  function stageDots(stage, mini) {
    var s = Math.max(0, Number(stage) || 0);
    var title = s >= 6 ? "Đã hoàn thành 6/6 mốc" : "Đang ở mốc " + (s + 1) + "/6 (" + STAGE_FULL[s] + ")";
    return '<div class="vc-dots' + (mini ? " mini" : "") + '" title="' + esc(title) + '" aria-label="' + esc(title) + '">' +
      STAGE_SHORT.map(function (l, i) {
        var cls = i < s ? "done" : (i === s ? "cur" : "");
        return '<span class="vc-dot ' + cls + '"><i></i>' + (mini ? "" : "<b>" + l + "</b>") + "</span>";
      }).join("") + "</div>";
  }

  function vrow(w) {
    return '<div class="vrow">' +
      '<div class="v-word">' + esc(w.word) + "</div>" +
      '<div class="v-ipa">' + esc(w.ipa || "—") + "</div>" +
      '<div class="v-pos">' + esc(w.pos || "—") + "</div>" +
      '<div class="v-band" title="Band tham khảo (nhãn biên tập, không phải điểm thi)">' + (w.band ? esc(w.band) : "—") + "</div>" +
      '<div class="v-vi">' + esc(w.vi || "—") + "</div>" +
      '<div class="v-ex">' + (w.example ? highlight(w.example, w.word) : "—") + "</div>" +
      "</div>";
  }

  function passageChip(w) {
    if (!w.fromPassage) return "";
    var p = safe(function () { return I.findPassage(w.fromPassage); }, null);
    var title = p && p.passage ? p.passage.title : "";
    return '<button type="button" class="vc-chip" data-act="go-reading" title="' + esc(title ? "Bài đọc: " + title : "Mở bài đọc đề xuất hôm nay") + '">' +
      ic("book-open", 14) + " Có trong bài đọc hôm nay</button>";
  }

  function wordItem(w, opts) {
    opts = opts || {};
    var it = itemOf(w.id);
    var action = it
      ? '<span class="pill good vc-saved">' + ic("check", 14) + " " + esc(nextDueText(it)) + "</span>"
      : '<button type="button" class="btn sk sm" data-act="learn" data-id="' + esc(w.id) + '" data-src="' + esc(opts.source || "daily") + '">Đã học ' + ic("check", 15) + "</button>";
    return '<article class="card vc-item' + (it ? " is-done" : "") + '">' +
      vrow(w) +
      '<div class="vc-item-foot">' +
        '<button type="button" class="btn ghost sm icon" data-act="speak" data-text="' + esc(w.word) + '" title="Nghe phát âm" aria-label="Nghe phát âm ' + esc(w.word) + '">' + ic("volume", 16) + "</button>" +
        passageChip(w) +
        '<span class="pill muted vc-topic">' + esc(topicName(w.topic)) + "</span>" +
        '<span class="spacer"></span>' + action +
      "</div>" +
    "</article>";
  }

  function emptyState(emoji, title, text, extra) {
    return '<div class="card pad-lg empty vc-empty"><div class="empty-emoji">' + emoji + '</div><div class="empty-title">' + title +
      '</div><div class="empty-text">' + text + "</div>" + (extra || "") + "</div>";
  }

  /* ---------------- header ---------------- */
  function renderStats(d) {
    var n = d.todayWords.length;
    var pct = n ? Math.round(d.learnedToday / n * 100) : 0;
    return '<div class="grid g-4 vc-stats">' +
      '<button type="button" class="card stat clickable vc-stat" data-tab="today">' +
        '<div class="stat-label">' + ic("sun", 16) + " Từ mới hôm nay</div>" +
        '<div class="stat-value">' + d.learnedToday + '<small>/' + n + "</small></div>" +
        '<div class="progress"><div class="progress-bar" style="width:' + pct + '%"></div></div>' +
        '<div class="stat-foot">đã học · đổi bộ từ lúc 06:00</div>' +
      "</button>" +
      '<button type="button" class="card stat clickable vc-stat' + (d.overdue ? " is-alert" : "") + '" data-tab="review">' +
        '<div class="stat-label">' + ic("rotate-ccw", 16) + " Đến hạn ôn</div>" +
        '<div class="stat-value">' + d.due.length + "</div>" +
        '<div class="stat-foot">' + (d.overdue ? '<span class="pill bad">' + d.overdue + " từ quá hạn</span>" : (d.due.length ? "ôn ngay hôm nay" : "không có từ đến hạn")) + "</div>" +
      "</button>" +
      '<button type="button" class="card stat clickable vc-stat" data-tab="review">' +
        '<div class="stat-label">' + ic("layers", 16) + " Đang ôn</div>" +
        '<div class="stat-value">' + d.reviewing.length + "</div>" +
        '<div class="stat-foot">trong chu kỳ 6 mốc</div>' +
      "</button>" +
      '<button type="button" class="card stat clickable vc-stat" data-tab="learned">' +
        '<div class="stat-label">' + ic("award", 16) + " Đã học</div>" +
        '<div class="stat-value">' + d.learned.length + "</div>" +
        '<div class="stat-foot">hoàn thành chu kỳ ôn</div>' +
      "</button>" +
    "</div>";
  }

  function timerSig() {
    var t = I.timer || {};
    return [t.running ? 1 : 0, t.paused ? 1 : 0, t.skill || ""].join("|");
  }
  function renderTimerInner() {
    var t = I.timer || {};
    var secs = safe(function () { return I.dayMinutes(today()).vocab; }, 0);
    var mins = I.fmtDuration ? I.fmtDuration(secs) : Math.round(secs / 60) + " phút";
    var left, btns;
    if (t.running && t.skill === "vocab" && !t.paused) {
      left = '<span class="vc-pulse" aria-hidden="true"></span><div><b>Đang tính giờ học từ vựng</b>' +
        '<div class="small muted">Đồng hồ chạy ở thanh trên cùng. Bấm Kết thúc để ghi phiên học.</div></div>';
      btns = '<button type="button" class="btn ghost sm" data-act="timer-pause">' + ic("pause", 15) + " Tạm dừng</button>" +
        '<button type="button" class="btn sk sm" data-act="timer-finish">' + ic("check", 15) + " Kết thúc</button>";
    } else if (t.running && t.skill === "vocab" && t.paused) {
      left = ic("pause", 18) + '<div><b>Đã tạm dừng giờ học từ vựng</b><div class="small muted">Bấm Tiếp tục khi bạn quay lại học.</div></div>';
      btns = '<button type="button" class="btn sk sm" data-act="timer-resume">' + ic("play", 15) + " Tiếp tục</button>" +
        '<button type="button" class="btn ghost sm" data-act="timer-finish">' + ic("check", 15) + " Kết thúc</button>";
    } else {
      var other = t.running && t.skill && t.skill !== "vocab";
      left = ic("timer", 18) + "<div><b>Bấm Bắt đầu để tính giờ học từ vựng</b>" +
        '<div class="small muted">' + (other
          ? "Đồng hồ đang tính cho " + esc(I.skillName ? I.skillName(t.skill) : t.skill) + ". Bắt đầu sẽ kết thúc phiên đó và chuyển sang Từ vựng."
          : "Mở trang không tự cộng giờ — chỉ thời gian bạn bấm giờ mới được ghi.") + "</div></div>";
      btns = '<button type="button" class="btn sk sm" data-act="timer-start">' + ic("play", 15) + " Bắt đầu</button>";
    }
    return '<div class="vc-timer-left">' + left + "</div>" +
      '<div class="vc-timer-right"><span class="small muted">Hôm nay: <b>' + esc(mins) + "</b></span>" + btns + "</div>";
  }

  function renderTabs(tab, d) {
    return '<div class="tabs vc-tabs" role="tablist">' + TABS.map(function (t) {
      var count = t.id === "today" ? (d.todayWords.length - d.learnedToday) : t.id === "review" ? d.due.length : d.learned.length;
      var pillCls = t.id === "review" && d.overdue ? "bad" : "sk";
      return '<button type="button" role="tab" class="tab' + (tab === t.id ? " active" : "") + '" data-tab="' + t.id + '" aria-selected="' + (tab === t.id) + '">' +
        ic(t.icon, 16) + " " + t.label + (count > 0 ? ' <span class="pill ' + pillCls + ' vc-count">' + count + "</span>" : "") + "</button>";
    }).join("") + "</div>";
  }

  /* ---------------- tab: today ---------------- */
  function renderToday(d) {
    var words = d.todayWords, html = "";
    var threshold = Math.max(5, dailyCount());
    if (d.due.length >= threshold || (d.overdue >= 3)) {
      html += '<div class="vc-banner warn">' + ic("alert-triangle", 20) +
        "<div><b>Bạn có " + d.due.length + " từ đến hạn ôn" + (d.overdue ? " (" + d.overdue + " từ quá hạn)" : "") + ".</b>" +
        '<div class="small">Nên ôn trước rồi mới học từ mới — lượt ôn quá hạn được ưu tiên để không quên.</div></div>' +
        '<button type="button" class="btn sk sm" data-tab="review">Ôn ngay</button></div>';
    } else if (d.due.length) {
      html += '<div class="vc-banner">' + ic("rotate-ccw", 18) + "<div>Có <b>" + d.due.length + " từ</b> đến hạn ôn hôm nay.</div>" +
        '<button type="button" class="btn ghost sm" data-tab="review">Ôn trước</button></div>';
    }

    if (!words.length) {
      html += emptyState("📚", "Bạn đã học hết kho từ vựng",
        "Kho hiện không còn từ mới. Hãy ôn các từ đến hạn hoặc thêm từ của riêng bạn.",
        '<div class="row vc-empty-act"><button type="button" class="btn sk" data-act="add">' + ic("plus", 16) + " Thêm từ</button></div>");
      return html + renderCustomPending(d);
    }

    var n = words.length, pct = Math.round(d.learnedToday / n * 100);
    html += '<div class="vc-toolbar">' +
      '<div class="seg" role="group" aria-label="Chế độ hiển thị">' +
        '<button type="button" class="' + (ui.mode === "list" ? "active" : "") + '" data-act="mode" data-mode="list">' + ic("list", 15) + " Danh sách</button>" +
        '<button type="button" class="' + (ui.mode === "card" ? "active" : "") + '" data-act="mode" data-mode="card">' + ic("layers", 15) + " Flashcard</button>" +
      "</div>" +
      '<div class="vc-prog"><span class="small">Đã học <b>' + d.learnedToday + "/" + n + "</b></span>" +
        '<div class="progress"><div class="progress-bar" style="width:' + pct + '%"></div></div></div>' +
    "</div>" +
    '<div class="tiny muted vc-legend">Thứ tự: từ tiếng Anh · phiên âm · loại từ · band (tham khảo — nhãn biên tập, không phải điểm thi) · nghĩa tiếng Việt · câu ví dụ</div>';

    if (d.learnedToday === n) {
      html += '<div class="vc-banner good">' + ic("sparkles", 20) +
        "<div><b>Hoàn thành " + n + " từ mới hôm nay 🎉</b><div class=\"small\">Tất cả đã vào mục Cần ôn. 06:00 sáng mai sẽ có bộ từ mới.</div></div></div>";
    }

    html += ui.mode === "card" ? renderFlashcards(words) : '<div class="stack vc-list">' + words.map(function (w) { return wordItem(w); }).join("") + "</div>";
    return html + renderCustomPending(d);
  }

  function renderCustomPending(d) {
    if (!d.customPending.length) return "";
    return '<h2 class="section-title vc-sec">Từ bạn tự thêm — chưa học</h2>' +
      '<div class="stack vc-list">' + d.customPending.map(function (w) { return wordItem(w, { source: "custom" }); }).join("") + "</div>";
  }

  function renderFlashcards(words) {
    var n = words.length;
    if (ui.fcIdx >= n) ui.fcIdx = n - 1;
    if (ui.fcIdx < 0) ui.fcIdx = 0;
    var w = words[ui.fcIdx], it = itemOf(w.id);
    var flipped = ui.fcFlip;
    var pips = words.map(function (x, i) {
      return '<button type="button" class="vc-pip' + (itemOf(x.id) ? " done" : "") + (i === ui.fcIdx ? " cur" : "") +
        '" data-act="fc-go" data-i="' + i + '" aria-label="Thẻ ' + (i + 1) + '"></button>';
    }).join("");
    var actions;
    if (it) {
      actions = '<span class="pill good vc-saved">' + ic("check", 14) + " " + esc(nextDueText(it)) + "</span>";
    } else if (!flipped) {
      actions = '<button type="button" class="btn ghost" data-act="flip">' + ic("eye", 16) + " Lật thẻ</button>";
    } else {
      actions = '<button type="button" class="btn ' + (ui.fcChecked ? "good-on" : "ghost") + ' vc-check" data-act="fc-check" aria-pressed="' + ui.fcChecked + '">' +
          ic(ui.fcChecked ? "check-square" : "square", 16) + " Đã nhớ nghĩa</button>" +
        '<button type="button" class="btn sk" data-act="learn" data-id="' + esc(w.id) + '" data-src="daily"' + (ui.fcChecked ? "" : ' disabled title="Tự kiểm tra: tick “Đã nhớ nghĩa” trước"') + ">Đã học " + ic("check", 15) + "</button>";
    }
    return '<div class="vc-fc">' +
      '<div class="vc-fc-top"><span class="small muted">Thẻ ' + (ui.fcIdx + 1) + "/" + n + '</span><div class="vc-pips">' + pips + "</div></div>" +
      '<div class="vc-flash' + (flipped ? " flipped" : "") + '" data-act="flip" role="button" tabindex="0" aria-label="Lật thẻ (phím Space)">' +
        '<div class="vc-flash-inner">' +
          '<div class="vc-face vc-front">' +
            '<span class="vc-face-tag">' + esc(topicName(w.topic)) + "</span>" +
            '<div class="vc-fc-word">' + esc(w.word) + "</div>" +
            '<div class="vc-fc-ipa">' + esc(w.ipa || "") + "</div>" +
            '<span class="pill sk">' + esc(w.pos || "—") + "</span>" +
            '<div class="tiny muted vc-fc-hint">Đoán nghĩa rồi bấm để lật · <span class="kbd">Space</span></div>' +
          "</div>" +
          '<div class="vc-face vc-back">' +
            '<div class="vc-fc-vi">' + esc(w.vi || "—") + "</div>" +
            '<div class="vc-fc-ex">' + (w.example ? highlight(w.example, w.word) : "") + "</div>" +
            '<span class="pill muted" title="Band tham khảo">Band ' + esc(w.band || "—") + " · tham khảo</span>" +
            (w.fromPassage ? '<div class="vc-fc-chip">' + passageChip(w) + "</div>" : "") +
          "</div>" +
        "</div>" +
      "</div>" +
      '<div class="vc-fc-actions">' +
        '<button type="button" class="btn ghost icon" data-act="fc-prev" aria-label="Thẻ trước"' + (ui.fcIdx === 0 ? " disabled" : "") + ">" + ic("chevron-left") + "</button>" +
        '<button type="button" class="btn ghost icon" data-act="speak" data-text="' + esc(w.word) + '" aria-label="Nghe phát âm">' + ic("volume") + "</button>" +
        '<div class="vc-fc-main">' + actions + "</div>" +
        '<button type="button" class="btn ghost icon" data-act="fc-next" aria-label="Thẻ sau"' + (ui.fcIdx >= n - 1 ? " disabled" : "") + ">" + ic("chevron-right") + "</button>" +
      "</div>" +
      '<div class="tiny muted vc-kbd-hint"><span class="kbd">Space</span> lật thẻ · <span class="kbd">←</span> <span class="kbd">→</span> chuyển thẻ</div>' +
    "</div>";
  }

  /* ---------------- tab: review ---------------- */
  function renderReview(d) {
    var html = "";
    if (!d.due.length) {
      var upcoming = d.reviewing.filter(function (w) { return w.srs && w.srs.due > d.t; });
      if (upcoming.length) {
        html += emptyState("🎉", "Chưa có từ nào đến hạn",
          "Bạn đã ôn xong cho hôm nay. Lượt ôn tiếp theo: <b>" + fd(upcoming[0].srs.due) + "</b> (" + upcoming.length + " từ đang trong chu kỳ).");
      } else {
        html += emptyState("🎉", "Chưa có từ nào đến hạn",
          "Học từ mới ở tab Hôm nay — mỗi từ “Đã học” sẽ quay lại đây để ôn sau 1 ngày.",
          '<div class="row vc-empty-act"><button type="button" class="btn sk" data-tab="today">' + ic("sun", 16) + " Học từ hôm nay</button></div>");
      }
    } else {
      html += renderReviewCard(d.due[0], d.due.length);
      if (d.due.length > 1) {
        html += '<h2 class="section-title vc-sec">Đến hạn hôm nay <span class="pill sk">' + d.due.length + "</span></h2>" +
          '<div class="card vc-rlist">' + d.due.slice(1).map(function (w) { return reviewRow(w, true); }).join("") + "</div>";
      }
    }
    var later = d.reviewing.filter(function (w) { return w.srs && w.srs.due > d.t; });
    if (later.length) {
      html += '<h2 class="section-title vc-sec">Sắp đến hạn <span class="pill muted">' + later.length + "</span></h2>" +
        '<div class="card vc-rlist">' + later.map(function (w) { return reviewRow(w, false); }).join("") + "</div>";
    }
    return html;
  }

  function renderReviewCard(w, total) {
    var it = w.srs || itemOf(w.id) || { stage: 0 };
    var od = overdueDays(it);
    var stage = Number(it.stage) || 0;
    var nextStage = stage + 1;
    var rememberNote = nextStage >= srs().length ? "→ hoàn thành chu kỳ" : "→ ôn lại " + fd(I.addDays(today(), srs()[nextStage]));
    var body;
    if (!ui.rvReveal) {
      body = '<button type="button" class="btn primary lg vc-reveal" data-act="reveal">' + ic("eye", 18) + " Hiện nghĩa</button>" +
        '<div class="tiny muted vc-kbd-hint">Tự nhớ nghĩa trước khi lật · <span class="kbd">Space</span></div>';
    } else {
      body = '<div class="vc-rv-back">' +
          '<div class="vc-rv-vi">' + esc(w.vi || "—") + "</div>" +
          (w.example ? '<div class="vc-rv-ex">' + highlight(w.example, w.word) + "</div>" : "") +
        "</div>" +
        '<div class="vc-rv-btns">' +
          '<button type="button" class="btn lg vc-forgot" data-act="forgot" data-id="' + esc(w.id) + '">' + ic("x", 18) + " Quên<small>→ quay lại mốc 1 ngày</small></button>" +
          '<button type="button" class="btn lg sk vc-remember" data-act="remember" data-id="' + esc(w.id) + '">' + ic("check", 18) + " Nhớ<small>" + esc(rememberNote) + "</small></button>" +
        "</div>" +
        '<div class="tiny muted vc-kbd-hint"><span class="kbd">1</span> Quên · <span class="kbd">2</span> Nhớ</div>';
    }
    return '<div class="card tape vc-review">' +
      '<div class="vc-rv-top"><span class="pill sk">Còn ' + total + " từ đến hạn</span>" +
        (od > 0 ? '<span class="pill bad">Quá hạn ' + od + " ngày</span>" : '<span class="pill good">Đến hạn hôm nay</span>') + "</div>" +
      '<div class="vc-rv-word">' + esc(w.word) +
        ' <button type="button" class="btn ghost sm icon" data-act="speak" data-text="' + esc(w.word) + '" aria-label="Nghe phát âm">' + ic("volume", 16) + "</button></div>" +
      '<div class="vc-rv-meta"><span class="ipa">' + esc(w.ipa || "") + "</span>" + (w.pos ? ' · <span class="pill muted">' + esc(w.pos) + "</span>" : "") +
        (w.band ? ' · <span class="small muted" title="Band tham khảo">Band ' + esc(w.band) + "</span>" : "") + "</div>" +
      stageDots(stage, false) +
      body +
      (total > 1 ? '<div class="vc-rv-skip"><button type="button" class="btn ghost sm" data-act="skip" data-id="' + esc(w.id) + '">Để sau ' + ic("chevron-right", 14) + "</button></div>" : "") +
    "</div>";
  }

  function reviewRow(w, isDue) {
    var it = w.srs || itemOf(w.id) || {};
    var od = overdueDays(it);
    var right;
    if (isDue) {
      right = '<div class="vc-rrow-due">' + (od > 0 ? '<span class="pill bad">Quá hạn ' + od + " ngày</span>" : '<span class="pill good">Hôm nay</span>') + "</div>" +
        '<button type="button" class="btn sk sm" data-act="review-now" data-id="' + esc(w.id) + '">Ôn ngay</button>';
    } else {
      var left = Math.max(0, diff(today(), it.due));
      right = '<div class="vc-rrow-due"><b>Đến hạn ' + fd(it.due) + '</b><div class="tiny muted">còn ' + plural(left, "ngày") + "</div></div>" +
        '<span class="vc-tip" title="Chưa đến hạn — ôn sớm không được tính vào chu kỳ"><button type="button" class="btn ghost sm" disabled>Ôn</button></span>';
    }
    return '<div class="vc-rrow">' +
      '<div class="vc-rrow-main"><div><b>' + esc(w.word) + '</b> <span class="small muted"><span class="ipa">' + esc(w.ipa || "") + "</span>" + " · " + esc(w.pos || "") + "</span></div>" +
        '<div class="small vc-rrow-vi">' + esc(w.vi || "") + "</div></div>" +
      stageDots(it.stage, true) + right +
    "</div>";
  }

  /* ---------------- tab: learned ---------------- */
  function learnedSorted(d) {
    return d.learned.slice().sort(function (a, b) {
      var x = doneDay(a), y = doneDay(b);
      return x < y ? 1 : x > y ? -1 : 0;
    });
  }
  function doneDay(w) {
    var it = w.srs || itemOf(w.id) || {};
    if (it.masteredOn) return it.masteredOn;
    var h = it.history || [];
    return h.length ? h[h.length - 1].day : "";
  }
  function learnedRows(list) {
    var q = norm(ui.search.trim());
    var rows = list.filter(function (w) { return !q || norm(w.word).indexOf(q) >= 0 || norm(w.vi).indexOf(q) >= 0; });
    if (!rows.length) {
      return { count: 0, html: '<tr><td colspan="7" class="vc-td-empty">Không tìm thấy từ phù hợp “' + esc(ui.search) + "”.</td></tr>" };
    }
    return { count: rows.length, html: rows.map(function (w) {
      return "<tr>" +
        '<td class="v-word"><b>' + esc(w.word) + '</b> <button type="button" class="btn ghost sm icon vc-mini-speak" data-act="speak" data-text="' + esc(w.word) + '" aria-label="Nghe phát âm">' + ic("volume", 14) + "</button></td>" +
        '<td class="v-ipa">' + esc(w.ipa || "—") + "</td>" +
        '<td class="v-pos">' + esc(w.pos || "—") + "</td>" +
        '<td class="v-band">' + esc(w.band || "—") + "</td>" +
        '<td class="v-vi">' + esc(w.vi || "—") + "</td>" +
        '<td class="v-ex">' + esc(w.example || "—") + "</td>" +
        '<td class="vc-td-date">' + fd(doneDay(w)) + "</td>" +
      "</tr>";
    }).join("") };
  }
  function renderLearned(d) {
    if (!d.learned.length) {
      return emptyState("🌱", "Chưa có từ nào hoàn thành chu kỳ",
        "Một từ vào mục này khi bạn bấm “Nhớ” ở đủ 6 mốc ôn (1 → 2 → 5 → 7 → 14 → 30 ngày, khoảng 59 ngày). Cứ đều đặn mỗi ngày nhé!");
    }
    var r = learnedRows(learnedSorted(d));
    return '<div class="vc-toolbar">' +
        '<label class="vc-search">' + ic("search", 16) +
          '<input class="input" type="search" data-vc-search placeholder="Tìm từ hoặc nghĩa tiếng Việt…" value="' + esc(ui.search) + '" aria-label="Tìm từ đã học"></label>' +
        '<span class="small muted" data-vc-count>' + r.count + " / " + d.learned.length + " từ</span>" +
      "</div>" +
      '<div class="card vc-table-card"><div class="table-wrap"><table class="table vtable">' +
        "<thead><tr><th>Từ tiếng Anh</th><th>Phiên âm</th><th>Loại từ</th><th>Band <span class=\"tiny muted\">(tham khảo)</span></th>" +
        "<th>Nghĩa tiếng Việt</th><th>Câu ví dụ</th><th>Hoàn thành</th></tr></thead>" +
        "<tbody data-vc-learned>" + r.html + "</tbody></table></div></div>";
  }

  /* ---------------- aside ---------------- */
  function renderSrsExplainer() {
    var steps = srs().map(function (n, i) {
      return '<li class="vc-srs-step"><span class="vc-srs-node">' + n + '</span><span class="tiny">' + STAGE_FULL[i] + "</span></li>";
    }).join("");
    return '<div class="card soft vc-srs">' +
      '<div class="card-title">' + ic("rotate-ccw", 16) + " Chu kỳ ôn tập</div>" +
      '<ol class="vc-srs-track"><li class="vc-srs-step start"><span class="vc-srs-node">' + ic("check", 14) + '</span><span class="tiny">Học</span></li>' + steps +
        '<li class="vc-srs-step end"><span class="vc-srs-node">' + ic("award", 14) + '</span><span class="tiny">Đã học</span></li></ol>' +
      '<ul class="vc-srs-notes small">' +
        "<li>Bấm <b>Đã học</b> → từ vào mục <b>Cần ôn</b>, quay lại sau 1 ngày.</li>" +
        "<li><b>Nhớ</b> → sang mốc tiếp theo; <b>Quên</b> → quay về mốc 1 ngày.</li>" +
        "<li>Nhớ đủ 6 mốc (≈ 59 ngày) → chuyển sang <b>Đã học</b>.</li>" +
        "<li>Lượt ôn quá hạn được ưu tiên trước từ mới.</li>" +
      "</ul></div>";
  }

  function renderAside(tab, d) {
    var html = "";
    if (tab === "today") {
      var dp = safe(function () { return I.getDailyPassage(); }, null);
      var inPassage = d.todayWords.filter(function (w) { return w.fromPassage; }).length;
      var chips = d.todayWords.slice(0, 10).map(function (w) { return '<span class="pill sk">' + esc(w.word) + "</span>"; }).join("");
      html += '<div class="card tape sk-writing vc-apply">' +
        '<div class="card-title">' + ic("pen-line", 16) + " Vận dụng ngay</div>" +
        '<p class="small">Dùng ít nhất 3 từ hôm nay trong bài Writing Task 2 hôm nay — viết ra là nhớ lâu hơn.</p>' +
        (chips ? '<div class="vc-chips">' + chips + "</div>" : "") +
        '<button type="button" class="btn sk sm" data-act="go-writing">Viết Task 2 hôm nay ' + ic("arrow-right", 15) + "</button></div>";
      html += '<div class="card sk-reading vc-apply">' +
        '<div class="card-title">' + ic("book-open", 16) + " Bài đọc đề xuất hôm nay</div>" +
        '<p class="small">' + (dp && dp.passage ? "<b>" + esc(dp.passage.title) + "</b><br>" : "") +
          (inPassage ? inPassage + " từ hôm nay xuất hiện trong bài — gặp lại trong ngữ cảnh thật." : "Đọc bài hôm nay và để ý các từ vựng cùng chủ đề.") + "</p>" +
        '<button type="button" class="btn sk sm" data-act="go-reading">Mở bài đọc ' + ic("arrow-right", 15) + "</button></div>";
    } else if (tab === "review") {
      html += '<div class="card vc-tips"><div class="card-title">' + ic("lightbulb", 16) + " Mẹo ôn hiệu quả</div>" +
        '<ul class="small"><li>Nhìn từ, tự nói nghĩa và đặt một câu trước khi bấm <b>Hiện nghĩa</b>.</li>' +
        "<li>Trung thực: chưa chắc thì chọn <b>Quên</b> — từ sẽ quay lại sớm hơn.</li>" +
        "<li>Ôn sớm không được tính: mỗi mốc chỉ mở khi đến hạn.</li></ul></div>";
    } else {
      html += '<div class="card vc-tips"><div class="card-title">' + ic("award", 16) + " Kho từ của bạn</div>" +
        '<p class="small">Đã học <b>' + d.learned.length + "</b> · Đang ôn <b>" + d.reviewing.length + "</b>.<br>Hãy dùng lại các từ này trong Writing và Speaking để giữ chúng “sống”.</p></div>";
    }
    return html + renderSrsExplainer();
  }

  /* ---------------- page ---------------- */
  function tabOf(params) {
    var t = params && params.tab;
    return (t === "review" || t === "learned") ? t : "today";
  }

  function renderPage(params) {
    var tab = tabOf(params);
    var d = snapshot();
    var main = tab === "review" ? renderReview(d) : tab === "learned" ? renderLearned(d) : renderToday(d);
    return '<div class="page sk-vocab vc-page">' +
      '<div class="page-head">' +
        "<div>" +
          '<div class="page-kicker">Luyện tập · Từ vựng</div>' +
          '<h1 class="page-title">Từ vựng</h1>' +
          '<div class="page-sub">Mỗi ngày ' + dailyCount() + " từ mới · Ngày học " + esc(I.fmtDay(d.t, "long")) + " · Bộ từ mới lúc 06:00 (giờ Việt Nam)</div>" +
        "</div>" +
        '<div class="page-actions"><button type="button" class="btn sk" data-act="add">' + ic("plus", 16) + " Thêm từ</button></div>" +
      "</div>" +
      renderStats(d) +
      '<div class="card soft vc-timer" data-vc-timer>' + renderTimerInner() + "</div>" +
      renderTabs(tab, d) +
      '<div class="vc-layout"><div class="vc-main">' + main + '</div><aside class="vc-aside">' + renderAside(tab, d) + "</aside></div>" +
    "</div>";
  }

  function rerender() {
    if (!cur.root) return;
    cur.root.innerHTML = renderPage(cur.params);
  }

  /* ---------------- actions ---------------- */
  function doLearn(id, source) {
    var w = I.findWord(id);
    var ok = I.learnWord(id, source || "daily");
    var it = itemOf(id);
    if (ok) I.toast("Đã lưu “" + (w ? w.word : id) + "” vào Cần ôn — ôn lại ngày " + fd(it && it.due), "success");
    else I.toast("Từ này đã có trong lịch ôn.", "info");
    if (ui.mode === "card") {
      ui.fcFlip = false; ui.fcChecked = false;
      var words = safe(function () { return I.getTodayWords(); }, []);
      for (var k = 1; k <= words.length; k++) {
        var j = (ui.fcIdx + k) % words.length;
        if (!itemOf(words[j].id)) { ui.fcIdx = j; break; }
      }
    }
    rerender();
  }

  function doReview(id, remembered) {
    var w = I.findWord(id);
    var name = w ? w.word : id;
    var ok = I.reviewWord(id, remembered);
    var it = itemOf(id);
    if (!ok) I.toast("Từ này chưa đến hạn ôn — ôn sớm không được tính.", "warn");
    else if (!remembered) I.toast("“" + name + "” quay lại mốc 1 ngày — ôn lại ngày mai.", "info");
    else if (it && it.status === "learned") I.toast("🎉 “" + name + "” đã hoàn thành chu kỳ — chuyển sang Đã học!", "success");
    else I.toast("Nhớ ✓ — “" + name + "” ôn lại ngày " + fd(it && it.due) + ".", "success");
    ui.rvReveal = false;
    if (ui.rvFront === id) ui.rvFront = null;
    ui.rvSkip = ui.rvSkip.filter(function (x) { return x !== id; });
    rerender();
  }

  function openAddModal() {
    var topics = Object.keys(TOPIC_VI);
    var html = '<form class="vc-form" novalidate>' +
      '<div class="grid g-2">' +
        '<label class="field"><span class="field-label">Từ / cụm từ tiếng Anh *</span><input class="input" name="word" maxlength="80" placeholder="vd. mitigate, pose a threat to" autofocus></label>' +
        '<label class="field"><span class="field-label">Phiên âm (IPA)</span><input class="input" name="ipa" maxlength="80" placeholder="/ˈmɪtɪɡeɪt/"></label>' +
        '<label class="field"><span class="field-label">Loại từ</span><select class="select" name="pos">' +
          POS_LIST.map(function (p) { return '<option value="' + p + '">' + p + "</option>"; }).join("") + "</select></label>" +
        '<label class="field"><span class="field-label">Band (tham khảo)</span><select class="select" name="band">' +
          BAND_LIST.map(function (b) { return '<option value="' + b + '"' + (b === "7.0" ? " selected" : "") + ">" + b + "</option>"; }).join("") + "</select></label>" +
      "</div>" +
      '<label class="field"><span class="field-label">Nghĩa tiếng Việt *</span><input class="input" name="vi" maxlength="160" placeholder="vd. giảm nhẹ, hạn chế"></label>' +
      '<label class="field"><span class="field-label">Câu ví dụ</span><textarea class="textarea" name="example" rows="2" maxlength="300" placeholder="Một câu tự nhiên, giọng văn Writing/Speaking"></textarea></label>' +
      '<label class="field"><span class="field-label">Chủ đề</span><select class="select" name="topic">' +
        topics.map(function (t) { return '<option value="' + t + '">' + TOPIC_VI[t] + "</option>"; }).join("") + "</select></label>" +
      '<div class="vc-form-err small" role="alert" hidden></div>' +
      '<button type="submit" class="vc-hidden-submit" tabindex="-1" aria-hidden="true"></button>' +
    "</form>";
    var formEl = null;

    function save(learnNow, close) {
      if (!formEl) return;
      var f = formEl.elements;
      var word = String(f.word.value || "").trim().replace(/\s+/g, " ");
      var vi = String(f.vi.value || "").trim();
      var ipa = String(f.ipa.value || "").trim();
      var err = formEl.querySelector(".vc-form-err");
      function fail(msg, field) {
        err.textContent = msg; err.hidden = false;
        if (field && f[field]) f[field].focus();
      }
      if (!word) return fail("Hãy nhập từ hoặc cụm từ tiếng Anh.", "word");
      if (!vi) return fail("Hãy nhập nghĩa tiếng Việt.", "vi");
      var id = I.wordId(word);
      if (!id) return fail("Từ chưa hợp lệ — hãy dùng chữ cái tiếng Anh.", "word");
      if (ipa) ipa = "/" + ipa.replace(/^\/+|\/+$/g, "").trim() + "/";
      var existing = I.findWord(id);
      if (existing) {
        if (learnNow) {
          var ok = I.learnWord(id, "custom");
          I.toast(ok ? "“" + existing.word + "” đã có trong kho — đã thêm vào Cần ôn." : "“" + existing.word + "” đã có trong lịch ôn.", ok ? "success" : "info");
        } else {
          I.toast("“" + existing.word + "” đã có trong kho từ vựng.", "info");
        }
        close(); rerender(); return;
      }
      var w = { id: id, word: word, ipa: ipa, pos: f.pos.value, band: f.band.value, vi: vi,
        example: String(f.example.value || "").trim(), topic: f.topic.value };
      var added = I.addCustomWord(w);
      if (!added) return fail("Không lưu được từ này — có thể đã tồn tại.");
      if (learnNow) {
        I.learnWord(id, "custom");
        I.toast("Đã thêm “" + word + "” và đưa vào Cần ôn — ôn lại ngày " + fd(I.addDays(today(), 1)) + ".", "success");
      } else {
        I.toast("Đã thêm “" + word + "”. Bấm “Đã học” ở tab Hôm nay khi bạn sẵn sàng.", "success");
      }
      close(); rerender();
    }

    I.modal({
      title: "Thêm từ vựng",
      html: html,
      className: "vc-modal",
      actions: [
        { label: "Huỷ", kind: "ghost", onClick: function (close) { close(); } },
        { label: "Lưu từ", kind: "", onClick: function (close) { save(false, close); } },
        { label: "Lưu & học ngay", kind: "primary", onClick: function (close) { save(true, close); } }
      ],
      onMount: function (el, close) {
        formEl = el.querySelector(".vc-form");
        if (formEl) formEl.addEventListener("submit", function (e) { e.preventDefault(); save(true, close); });
      }
    });
  }

  function onClick(e) {
    var tabBtn = e.target.closest("[data-tab]");
    if (tabBtn && cur.root.contains(tabBtn)) {
      var t = tabBtn.getAttribute("data-tab");
      if (t !== tabOf(cur.params)) I.go("vocab", { tab: t });
      return;
    }
    var el = e.target.closest("[data-act]");
    if (!el || !cur.root.contains(el) || el.disabled) return;
    var act = el.getAttribute("data-act"), id = el.getAttribute("data-id");
    switch (act) {
      case "add": openAddModal(); break;
      case "speak": e.stopPropagation(); speak(el.getAttribute("data-text") || ""); break;
      case "learn": e.stopPropagation(); doLearn(id, el.getAttribute("data-src")); break;
      case "go-reading": e.stopPropagation(); I.go("reading", { daily: 1 }); break;
      case "go-writing": I.go("writing", { daily: 1 }); break;
      case "mode":
        ui.mode = el.getAttribute("data-mode") === "card" ? "card" : "list";
        ui.fcFlip = false; ui.fcChecked = false;
        if (ui.mode === "card") {
          var words = safe(function () { return I.getTodayWords(); }, []);
          var first = -1;
          for (var i = 0; i < words.length; i++) { if (!itemOf(words[i].id)) { first = i; break; } }
          ui.fcIdx = first >= 0 ? first : 0;
        }
        rerender(); break;
      case "flip": ui.fcFlip = !ui.fcFlip; if (!ui.fcFlip) ui.fcChecked = false; rerender(); focusFlash(); break;
      case "fc-check": ui.fcChecked = !ui.fcChecked; rerender(); break;
      case "fc-prev": moveCard(-1); break;
      case "fc-next": moveCard(1); break;
      case "fc-go": ui.fcIdx = Number(el.getAttribute("data-i")) || 0; ui.fcFlip = false; ui.fcChecked = false; rerender(); break;
      case "reveal": ui.rvReveal = true; rerender(); break;
      case "remember": doReview(id, true); break;
      case "forgot": doReview(id, false); break;
      case "skip":
        ui.rvSkip = ui.rvSkip.filter(function (x) { return x !== id; }); ui.rvSkip.push(id);
        if (ui.rvFront === id) ui.rvFront = null;
        ui.rvReveal = false; rerender(); break;
      case "review-now":
        ui.rvFront = id; ui.rvReveal = false; rerender();
        var card = cur.root.querySelector(".vc-review");
        if (card && card.scrollIntoView) card.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      case "timer-start": I.timerStart("vocab"); I.toast("Bắt đầu tính giờ học từ vựng.", "info"); break;
      case "timer-pause": I.timerPause(); break;
      case "timer-resume": I.timerResume(); break;
      case "timer-finish":
        var r = I.timerFinish();
        if (r && r.saved) I.toast("Đã ghi " + I.fmtDuration(r.seconds) + " Từ vựng.", "success");
        else I.toast("Phiên dưới 30 giây nên chưa được ghi.", "info");
        rerender(); break;
      default: break;
    }
  }

  function moveCard(step) {
    var n = safe(function () { return I.getTodayWords().length; }, 0);
    var next = Math.min(Math.max(0, ui.fcIdx + step), Math.max(0, n - 1));
    if (next === ui.fcIdx) return;
    ui.fcIdx = next; ui.fcFlip = false; ui.fcChecked = false;
    rerender(); focusFlash();
  }
  function focusFlash() {
    var f = cur.root && cur.root.querySelector(".vc-flash");
    if (f && f.focus) { try { f.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }

  function onKey(e) {
    if (!cur.root || e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.body && document.body.classList.contains("modal-open")) return;
    var tg = e.target, tag = tg && tg.tagName ? tg.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select" || (tg && tg.isContentEditable)) return;
    var onButton = tag === "button" || tag === "a";
    var isSpace = e.key === " " || e.key === "Spacebar";
    var tab = tabOf(cur.params);
    if (tab === "review" && cur.root.querySelector(".vc-review")) {
      if ((isSpace || e.key === "Enter") && !onButton && !ui.rvReveal) { e.preventDefault(); ui.rvReveal = true; rerender(); return; }
      if (ui.rvReveal && (e.key === "1" || e.key === "2")) {
        var b = cur.root.querySelector(e.key === "1" ? ".vc-forgot" : ".vc-remember");
        if (b) { e.preventDefault(); doReview(b.getAttribute("data-id"), e.key === "2"); }
      }
      return;
    }
    if (tab === "today" && ui.mode === "card" && cur.root.querySelector(".vc-flash")) {
      var onFlash = tg && tg.classList && tg.classList.contains("vc-flash");
      if ((isSpace || (e.key === "Enter" && onFlash)) && (!onButton || onFlash)) {
        e.preventDefault(); ui.fcFlip = !ui.fcFlip; if (!ui.fcFlip) ui.fcChecked = false; rerender(); focusFlash();
      } else if (e.key === "ArrowLeft") { e.preventDefault(); moveCard(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); moveCard(1); }
    }
  }

  function onInput(e) {
    var inp = e.target;
    if (!inp || !inp.hasAttribute || !inp.hasAttribute("data-vc-search")) return;
    ui.search = inp.value || "";
    var d = { learned: safe(function () { return I.learnedWords(); }, []) };
    var r = learnedRows(learnedSorted(d));
    var tb = cur.root.querySelector("[data-vc-learned]");
    if (tb) tb.innerHTML = r.html;
    var c = cur.root.querySelector("[data-vc-count]");
    if (c) c.textContent = r.count + " / " + d.learned.length + " từ";
  }

  I.registerPage({
    id: "vocab",
    label: "Từ vựng",
    icon: "layers",
    skill: "vocab",
    group: "practice",
    order: 8,
    render: function (params) {
      return renderPage(params || {});
    },
    mount: function (root, params) {
      var prevTab = tabOf(cur.params);
      cur.root = root;
      cur.params = params || {};
      if (prevTab !== tabOf(cur.params)) { ui.rvReveal = false; ui.fcFlip = false; ui.fcChecked = false; }
      var sig = timerSig();
      function onTimer() {
        var s = timerSig();
        if (s === sig) return;
        sig = s;
        var box = root.querySelector("[data-vc-timer]");
        if (box) box.innerHTML = renderTimerInner();
      }
      function onDay() {
        ui.fcIdx = 0; ui.fcFlip = false; ui.fcChecked = false; ui.rvReveal = false; ui.rvSkip = []; ui.rvFront = null;
        rerender();
      }
      root.addEventListener("click", onClick);
      root.addEventListener("input", onInput);
      document.addEventListener("keydown", onKey);
      if (I.on) { I.on("timer", onTimer); I.on("day", onDay); }
      return function () {
        root.removeEventListener("click", onClick);
        root.removeEventListener("input", onInput);
        document.removeEventListener("keydown", onKey);
        if (I.off) { I.off("timer", onTimer); I.off("day", onDay); }
        try { if (I.tts && I.tts.stop) I.tts.stop(); } catch (e) { /* ignore */ }
        if (cur.root === root) cur.root = null;
      };
    }
  });
})();
