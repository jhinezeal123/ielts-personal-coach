/* =============================================================================
 * IELTS Coach — Writing page (owner: W)
 * Tabs: Task 1 | Task 2 | Lịch sử. Type guides, prompt bank, SVG chart renderer,
 * timed editor with autosave, submission + self-assessment (bands are estimates only).
 * Route params: tab=task1|task2|history, type=<type id>, start=<promptId>, daily=1,
 *               rev=<submissionId> (rewrite), sub=task1|task2 (history sub-tab).
 * ========================================================================== */
(function () {
  "use strict";

  var I = window.IELTS;
  if (!I || typeof I.registerPage !== "function") return;

  /* ---------------------------------------------------------------- utils */
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function esc(s) {
    if (typeof I.esc === "function") return I.esc(s);
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function ic(name, size) { return safe(function () { return I.icon(name, size || 18); }, ""); }
  function data() {
    var d = I.data && I.data.writing;
    return d || { task1Types: [], task2Types: [], task1Prompts: [], task2Prompts: [] };
  }
  function state() { return I.state || {}; }
  function drafts() { var s = state(); if (!s.drafts || typeof s.drafts !== "object") s.drafts = {}; return s.drafts; }
  function persist() { safe(function () { I.save(); }); }
  function toast(msg, kind) { safe(function () { I.toast(msg, kind || "info"); }); }
  function today() {
    return safe(function () { return I.todayKey(); }, null) || new Date().toISOString().slice(0, 10);
  }
  function nowISO() { return safe(function () { return I.now().toISOString(); }, null) || new Date().toISOString(); }
  function confirmBox(msg, opts) {
    if (typeof I.confirm === "function") return I.confirm(msg, opts || {});
    return Promise.resolve(true);
  }
  function fmtBand(b) {
    if (typeof I.fmtBand === "function") return I.fmtBand(b);
    return b == null || isNaN(b) ? "—" : Number(b).toFixed(1);
  }
  function fmtClock(sec) {
    if (typeof I.fmtClock === "function") return I.fmtClock(sec);
    sec = Math.max(0, Math.floor(sec)); var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }
  function fmtDur(sec) {
    if (typeof I.fmtDuration === "function") return I.fmtDuration(sec);
    return Math.round((sec || 0) / 60) + " phút";
  }
  function fmtDay(day, style) {
    if (typeof I.fmtDay === "function") return safe(function () { return I.fmtDay(day, style); }, day);
    if (!day) return ""; var p = day.split("-"); return p[2] + "/" + p[1] + (style === "short" ? "" : "/" + p[0]);
  }
  function roundBand(x) {
    if (typeof I.roundOverall === "function") return I.roundOverall(x);
    var f = Math.floor(x), d = x - f;
    return d < 0.25 ? f : d < 0.75 ? f + 0.5 : f + 1;
  }
  function countWords(text) {
    var t = String(text || "").trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(function (w) { return /[A-Za-z0-9À-ỹ]/.test(w); }).length;
  }
  function go(params) { safe(function () { I.go("writing", params || {}); }); }
  function hhmmss() { var d = new Date(); return [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (n) { return (n < 10 ? "0" : "") + n; }).join(":"); }

  var TOPIC_VI = {
    education: "Giáo dục", technology: "Công nghệ", environment: "Môi trường", health: "Sức khoẻ", work: "Công việc",
    society: "Xã hội", urban: "Đô thị", culture: "Văn hoá", science: "Khoa học", media: "Truyền thông",
    travel: "Du lịch", crime: "Tội phạm", government: "Chính phủ", family: "Gia đình", economy: "Kinh tế",
    food: "Ẩm thực", sport: "Thể thao", history: "Lịch sử", animals: "Động vật", energy: "Năng lượng"
  };
  function topicName(t) { return TOPIC_VI[t] || t || ""; }
  var NEW_FROM = "2026-09";
  function isNew(p) { return (p.addedOn || "") >= NEW_FROM; }

  /* --------------------------------------------------------- data lookup */
  function allTypes() { var d = data(); return d.task1Types.concat(d.task2Types); }
  function findType(id) { return allTypes().filter(function (t) { return t.id === id; })[0] || null; }
  function typesOf(task) { return task === 1 ? data().task1Types : data().task2Types; }
  function promptsOf(task) { return task === 1 ? data().task1Prompts : data().task2Prompts; }
  function findPrompt(id) {
    var d = data();
    return d.task1Prompts.concat(d.task2Prompts).filter(function (p) { return p.id === id; })[0] || null;
  }
  function taskOf(p) { return data().task1Prompts.indexOf(p) >= 0 || /^t1-/.test(p.id) ? 1 : 2; }
  function taskOfType(typeId) { return data().task1Types.some(function (t) { return t.id === typeId; }) ? 1 : 2; }

  function writingSubs() {
    return (state().submissions || []).filter(function (s) {
      return s && s.skill === "writing" && (s.kind === "task1" || s.kind === "task2");
    });
  }
  function subsFor(refId) { return writingSubs().filter(function (s) { return s.refId === refId; }); }
  function findSub(id) { return (state().submissions || []).filter(function (s) { return s && s.id === id; })[0] || null; }

  var DEFAULT_CRIT = [
    { key: "tr", name: "Task Achievement / Task Response" }, { key: "cc", name: "Coherence & Cohesion" },
    { key: "lr", name: "Lexical Resource" }, { key: "gra", name: "Grammatical Range & Accuracy" }
  ];
  function criteriaList() {
    var c = safe(function () { return I.CRITERIA.writing; }, null), out = [];
    if (Array.isArray(c)) {
      out = c.map(function (x) {
        if (typeof x === "string") return { key: x, name: (DEFAULT_CRIT.filter(function (d) { return d.key === x; })[0] || {}).name || x };
        return { key: x.key || x.id || x.code, name: x.name || x.label || x.key || x.id };
      });
    } else if (c && typeof c === "object") {
      out = Object.keys(c).map(function (k) { var v = c[k]; return { key: k, name: typeof v === "string" ? v : (v && (v.name || v.label)) || k }; });
    }
    out = out.filter(function (x) { return x.key; });
    return out.length ? out : DEFAULT_CRIT;
  }

  /* Band descriptors (Vietnamese, 1 line, bands 5/6/7/8) — editorial guidance only */
  var DESC = {
    tr1: { 5: "Mô tả máy móc, thiếu overview hoặc overview mờ; số liệu thiếu/sai.", 6: "Có overview nhưng chưa rõ; chọn được đặc điểm chính nhưng còn chi tiết thừa/thiếu.", 7: "Overview rõ ràng; đặc điểm chính được chọn lọc và minh hoạ bằng số liệu phù hợp.", 8: "Bao quát đầy đủ yêu cầu; overview sắc nét, đặc điểm chính nổi bật, số liệu chính xác." },
    tr2: { 5: "Trả lời một phần đề; quan điểm không rõ; ý phát triển sơ sài.", 6: "Trả lời đủ các phần; có quan điểm nhưng phát triển chưa đều, kết luận đôi khi mơ hồ.", 7: "Trả lời đủ mọi phần; quan điểm rõ xuyên suốt; ý chính được mở rộng và hỗ trợ.", 8: "Trả lời đầy đủ, sâu sắc; ý được phát triển tốt với ví dụ thuyết phục." },
    cc: { 5: "Có tổ chức nhưng thiếu mạch lạc; từ nối lặp/máy móc; chia đoạn chưa hợp lý.", 6: "Mạch lạc nhìn chung; từ nối dùng được nhưng đôi khi sai hoặc máy móc.", 7: "Sắp xếp logic, mỗi đoạn một ý chính rõ; từ nối đa dạng, đôi chỗ lạm dụng.", 8: "Trình tự logic, liền mạch; liên kết tự nhiên; chia đoạn hợp lý." },
    lr: { 5: "Vốn từ hạn chế, lặp lại nhiều; lỗi chính tả/chọn từ gây khó hiểu.", 6: "Đủ từ cho đề; thử dùng từ ít phổ biến nhưng còn sai; vài lỗi chính tả.", 7: "Dùng được từ ít phổ biến và collocation; đúng văn phong; đôi lỗi nhỏ.", 8: "Từ vựng phong phú, chính xác, tự nhiên; lỗi hiếm và rất nhỏ." },
    gra: { 5: "Cấu trúc hạn chế; câu phức nhiều lỗi; dấu câu sai thường xuyên.", 6: "Kết hợp câu đơn và câu phức; có lỗi nhưng hiếm khi gây khó hiểu.", 7: "Đa dạng cấu trúc phức; nhiều câu không lỗi; kiểm soát ngữ pháp tốt.", 8: "Đa dạng cấu trúc, phần lớn câu không lỗi; chỉ thỉnh thoảng sai nhỏ." }
  };
  function descriptor(key, task, band) {
    var table = key === "tr" ? DESC[task === 1 ? "tr1" : "tr2"] : DESC[key];
    if (!table || band == null || isNaN(band)) return "";
    var b = Math.max(5, Math.min(8, Math.floor(band)));
    var pre = band < 5 ? "Dưới mức 5 — " : band >= 9 ? "Gần như hoàn hảo — " : "";
    return pre + table[b];
  }
  var CHECKS = {
    1: ["Có câu overview nêu đặc điểm chính (không có số liệu)", "Đủ tối thiểu 150 từ", "Chia đoạn rõ ràng (mở bài – overview – 2 thân bài)", "Có số liệu cụ thể và so sánh giữa các đối tượng", "Không đưa ý kiến cá nhân / lý do suy đoán", "Đa dạng ngôn ngữ xu hướng & so sánh"],
    2: ["Trả lời đủ mọi phần của đề", "Quan điểm rõ ràng, nhất quán từ mở bài đến kết bài", "Đủ tối thiểu 250 từ", "Mỗi đoạn thân bài có một ý chính + giải thích + ví dụ", "Có mở bài và kết bài rõ ràng", "Từ nối tự nhiên, không lạm dụng"]
  };

  /* ------------------------------------------------------------ drafts */
  function draftKey(pid) { return "writing:" + pid; }
  function getDraft(pid) { var d = drafts()[draftKey(pid)]; return d && typeof d === "object" ? d : null; }
  function listDrafts() {
    var dr = drafts(), out = [];
    Object.keys(dr).forEach(function (k) {
      if (k.indexOf("writing:") !== 0 || k.indexOf("writing:daily:") === 0) return;
      var v = dr[k], p = findPrompt(k.slice(8));
      if (!p || !v || typeof v !== "object") return;
      if (!(v.text && v.text.trim()) && !(v.seconds >= 30)) return;
      out.push({ prompt: p, draft: v });
    });
    return out.sort(function (a, b) { return String(b.draft.updatedAt || "").localeCompare(String(a.draft.updatedAt || "")); });
  }

  function dailyPrompt(persistIt) {
    var list = data().task2Prompts;
    if (!list.length) return null;
    var day = today(), key = "writing:daily:" + day, dr = drafts();
    var stored = dr[key], id = stored && (typeof stored === "string" ? stored : stored.promptId);
    var p = id && findPrompt(id);
    if (p) return p;
    var topic = safe(function () { return I.getDailyTopic(); }, null);
    var pool = list.filter(function (x) { return x.topic === topic; });
    if (!pool.length) pool = list;
    var idx = safe(function () { return I.dailyIndex(day); }, 0) | 0;
    p = pool[((idx % pool.length) + pool.length) % pool.length];
    if (persistIt) {
      dr[key] = { promptId: p.id, topic: topic || null };
      // keep only recent daily pointers (drafts themselves are never touched)
      Object.keys(dr).forEach(function (k) {
        if (k.indexOf("writing:daily:") === 0 && k.slice(14) < safe(function () { return I.addDays(day, -14); }, "0000")) delete dr[k];
      });
      persist();
    }
    return p;
  }
  function todayWords() {
    var w = safe(function () { return I.getTodayWords(); }, []);
    return Array.isArray(w) ? w.filter(function (x) { return x && x.word; }) : [];
  }

  /* ----------------------------------------------- word-usage matching */
  function tokRe(t) {
    var e = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/-/g, "[-\\s]?"); };
    if (t.length <= 3) return e(t) + "(?:s|es)?";
    var last = t.slice(-1);
    if (last === "e") return e(t.slice(0, -1)) + "(?:e|es|ed|ing|er|ers|ement|ements)";
    if (last === "y" && !/[aeiou]y$/.test(t)) return e(t.slice(0, -1)) + "(?:y|ies|ied|ying|ier|iest|ily)";
    return e(t) + "(?:" + e(last) + "?(?:s|es|ed|ing|er|ers|est|ly))?";
  }
  function buildMatcher(phrase) {
    var p = String(phrase || "").toLowerCase().replace(/\(.*?\)/g, " ").split("/")[0]
      .replace(/[’]/g, "'").replace(/[^a-z0-9'\- ]+/g, " ").trim();
    var toks = p.split(/\s+/).filter(function (t) { return t && !/^(sb|sth|someone|something|one's|oneself)$/.test(t); });
    if (!toks.length) return null;
    var out = "", needSep = false;
    toks.forEach(function (t) {
      if (/^(a|an|the)$/.test(t)) { out += (needSep ? "[\\s,]+" : "") + "(?:(?:a|an|the)[\\s,]+)?"; needSep = false; }
      else { out += (needSep ? "[\\s,]+(?:[a-z']+\\s+)?" : "") + tokRe(t); needSep = true; }
    });
    try { return new RegExp("(?:^|[^a-z0-9])" + out + "(?![a-z0-9])", "i"); } catch (e) { return null; }
  }

  /* ======================================================================
   * CHART RENDERER (SVG)
   * ==================================================================== */
  var PAL = ["#E9725F", "#2F3E5C", "#E3A43A", "#3FA796", "#9A6FC4", "#B9473A", "#5B6EE1"];
  var INK = "#1F2A3D", MUTED = "#8A8F99", GRID = "#E8E1D3";
  var svgSeq = 0;

  function num(v) {
    var r = Math.round(v * 100) / 100;
    return r.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  function nice(max, count) {
    count = count || 5;
    if (!(max > 0)) return { max: 1, step: 0.2 };
    var raw = max / count, mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), r = raw / mag;
    var step = (r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10) * mag;
    return { max: Math.ceil(max / step - 1e-9) * step, step: step };
  }
  function wrapText(s, maxChars) {
    var words = String(s || "").split(/\s+/), lines = [], cur = "";
    words.forEach(function (w) {
      if (!w) return;
      if (cur && (cur + " " + w).length > maxChars) { lines.push(cur); cur = w; }
      else cur = cur ? cur + " " + w : w;
    });
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }
  function tspans(lines, x, lh) {
    return lines.map(function (l, i) { return '<tspan x="' + x + '" dy="' + (i ? lh : 0) + '">' + esc(l) + "</tspan>"; }).join("");
  }
  function textW(s, size) { return String(s).length * (size || 12) * 0.56; }
  function lightColor(hex) {
    var h = hex.replace("#", ""), r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 165;
  }
  function legend(items, width, y, swatch) {
    // items: [{name, color}] -> centred rows; returns {svg, height}
    var size = 12, rows = [[]], rowW = [0], maxW = width - 20;
    items.forEach(function (it) {
      var w = 20 + textW(it.name, size) + 18, r = rows.length - 1;
      if (rowW[r] + w > maxW && rows[r].length) { rows.push([]); rowW.push(0); r++; }
      rows[r].push({ it: it, w: w }); rowW[r] += w;
    });
    var svg = "";
    rows.forEach(function (row, ri) {
      var x = (width - rowW[ri]) / 2, yy = y + ri * 20;
      row.forEach(function (cell) {
        if (swatch === "line") svg += '<line x1="' + x + '" y1="' + yy + '" x2="' + (x + 14) + '" y2="' + yy + '" stroke="' + cell.it.color + '" stroke-width="3" stroke-linecap="round"/>';
        else svg += '<rect x="' + x + '" y="' + (yy - 6) + '" width="12" height="12" rx="3" fill="' + cell.it.color + '"/>';
        svg += '<text x="' + (x + 20) + '" y="' + (yy + 4) + '" font-size="' + size + '" fill="' + INK + '">' + esc(cell.it.name) + "</text>";
        x += cell.w;
      });
    });
    return { svg: svg, height: rows.length * 20 };
  }
  function svgOpen(w, h, label) {
    return '<svg class="wr-svg" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(label || "chart") + '" preserveAspectRatio="xMidYMid meet">';
  }

  function lineSVG(ch) {
    var W = 640, n = ch.xLabels.length, series = ch.series || [];
    var leg = series.length > 1 ? legend(series.map(function (s, i) { return { name: s.name, color: PAL[i % PAL.length] }; }), W, 18, "line") : { svg: "", height: 0 };
    var top = 22 + leg.height + (leg.height ? 8 : 0), L = 64, R = 22, B = 40, ph = 230, H = top + ph + B, pw = W - L - R;
    var maxV = 0; series.forEach(function (s) { s.values.forEach(function (v) { if (v > maxV) maxV = v; }); });
    var sc = nice(maxV * 1.05, 5), pad = 14;
    var X = function (i) { return L + pad + (n === 1 ? (pw - 2 * pad) / 2 : i * (pw - 2 * pad) / (n - 1)); };
    var Y = function (v) { return top + ph - (v / sc.max) * ph; };
    var s = svgOpen(W, H, ch.title) + leg.svg;
    if (ch.projectedFrom != null && ch.projectedFrom > 0 && ch.projectedFrom < n) {
      var px = (X(ch.projectedFrom - 1) + X(ch.projectedFrom)) / 2;
      s += '<rect x="' + px + '" y="' + top + '" width="' + (L + pw - px) + '" height="' + ph + '" fill="#F4EFE4" opacity=".7"/>';
      s += '<text x="' + (L + pw - 6) + '" y="' + (top + 14) + '" text-anchor="end" font-size="11" fill="' + MUTED + '" font-style="italic">* projected</text>';
    }
    for (var v = 0; v <= sc.max + 1e-9; v += sc.step) {
      var y = Y(v);
      s += '<line x1="' + L + '" x2="' + (L + pw) + '" y1="' + y + '" y2="' + y + '" stroke="' + GRID + '" ' + (v === 0 ? "" : 'stroke-dasharray="3 4"') + "/>";
      s += '<text x="' + (L - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="' + MUTED + '">' + num(v) + "</text>";
    }
    s += '<line x1="' + L + '" x2="' + L + '" y1="' + top + '" y2="' + (top + ph) + '" stroke="' + INK + '" stroke-opacity=".35"/>';
    var every = n > 12 ? Math.ceil(n / 12) : 1;
    ch.xLabels.forEach(function (lab, i) {
      if (i % every) return;
      s += '<line x1="' + X(i) + '" x2="' + X(i) + '" y1="' + (top + ph) + '" y2="' + (top + ph + 5) + '" stroke="' + INK + '" stroke-opacity=".35"/>';
      s += '<text x="' + X(i) + '" y="' + (top + ph + 20) + '" text-anchor="middle" font-size="11.5" fill="' + INK + '">' + esc(lab) + "</text>";
    });
    s += '<text transform="rotate(-90)" x="' + (-(top + ph / 2)) + '" y="16" text-anchor="middle" font-size="11.5" fill="' + MUTED + '">' + esc(ch.unit || "") + "</text>";
    series.forEach(function (se, si) {
      var col = PAL[si % PAL.length], pts = se.values.map(function (v, i) { return [X(i), Y(v)]; });
      var cut = ch.projectedFrom != null && ch.projectedFrom > 0 && ch.projectedFrom < n ? ch.projectedFrom - 1 : n - 1;
      var solid = pts.slice(0, cut + 1), dash = pts.slice(cut);
      s += '<polyline fill="none" stroke="' + col + '" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" points="' + solid.map(function (p) { return p.join(","); }).join(" ") + '"/>';
      if (dash.length > 1) s += '<polyline fill="none" stroke="' + col + '" stroke-width="2.6" stroke-dasharray="6 5" stroke-linecap="round" points="' + dash.map(function (p) { return p.join(","); }).join(" ") + '"/>';
      pts.forEach(function (p, i) {
        s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.8" fill="#fff" stroke="' + col + '" stroke-width="2"><title>' + esc(se.name + " · " + ch.xLabels[i] + ": " + num(se.values[i]) + " " + (ch.unit || "")) + "</title></circle>";
      });
    });
    return s + "</svg>";
  }

  function barSVG(ch) {
    var W = 640, cats = ch.categories || [], series = ch.series || [], n = cats.length, m = series.length;
    var leg = m > 1 ? legend(series.map(function (s, i) { return { name: s.name, color: PAL[i % PAL.length] }; }), W, 18, "box") : { svg: "", height: 0 };
    var maxV = 0; series.forEach(function (s) { s.values.forEach(function (v) { if (v > maxV) maxV = v; }); });
    var sc = nice(maxV * 1.05, 5), s, top = 22 + leg.height + (leg.height ? 8 : 0);
    if (ch.orientation === "horizontal") {
      var L = 112, R = 26, gh = Math.max(30, m * 13 + 14), ph = n * gh, B = 44, H = top + ph + B, pw = W - L - R;
      var XV = function (v) { return L + (v / sc.max) * pw; };
      s = svgOpen(W, H, ch.title) + leg.svg;
      for (var v = 0; v <= sc.max + 1e-9; v += sc.step) {
        var x = XV(v);
        s += '<line x1="' + x + '" x2="' + x + '" y1="' + top + '" y2="' + (top + ph) + '" stroke="' + GRID + '" ' + (v === 0 ? "" : 'stroke-dasharray="3 4"') + "/>";
        s += '<text x="' + x + '" y="' + (top + ph + 16) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '">' + num(v) + "</text>";
      }
      s += '<text x="' + (L + pw / 2) + '" y="' + (top + ph + 36) + '" text-anchor="middle" font-size="11.5" fill="' + MUTED + '">' + esc(ch.unit || "") + "</text>";
      var bh = (gh - 12) / m;
      cats.forEach(function (c, ci) {
        var gy = top + ci * gh;
        var lines = wrapText(c, 16);
        s += '<text x="' + (L - 10) + '" y="' + (gy + gh / 2 + 4 - (lines.length - 1) * 6.5) + '" text-anchor="end" font-size="11.5" fill="' + INK + '">' + tspans(lines, L - 10, 13) + "</text>";
        series.forEach(function (se, si) {
          var val = se.values[ci] || 0;
          s += '<rect x="' + L + '" y="' + (gy + 6 + si * bh) + '" width="' + Math.max(1, XV(val) - L) + '" height="' + Math.max(2, bh - 2) + '" rx="2.5" fill="' + PAL[si % PAL.length] + '"><title>' + esc(c + " · " + se.name + ": " + num(val) + " " + (ch.unit || "")) + "</title></rect>";
        });
      });
      s += '<line x1="' + L + '" x2="' + L + '" y1="' + top + '" y2="' + (top + ph) + '" stroke="' + INK + '" stroke-opacity=".35"/>';
      return s + "</svg>";
    }
    var Lv = 64, Rv = 18, phv = 230, maxLab = 0;
    var labLines = cats.map(function (c) { var l = wrapText(c, n > 8 ? 6 : n > 5 ? 10 : 14); if (l.length > maxLab) maxLab = l.length; return l; });
    var Bv = 26 + maxLab * 13, Hv = top + phv + Bv, pwv = W - Lv - Rv, gw = pwv / n, bw = Math.min(42, gw * 0.74 / m);
    var Yv = function (v) { return top + phv - (v / sc.max) * phv; };
    s = svgOpen(W, Hv, ch.title) + leg.svg;
    for (var vv = 0; vv <= sc.max + 1e-9; vv += sc.step) {
      var yy = Yv(vv);
      s += '<line x1="' + Lv + '" x2="' + (Lv + pwv) + '" y1="' + yy + '" y2="' + yy + '" stroke="' + GRID + '" ' + (vv === 0 ? "" : 'stroke-dasharray="3 4"') + "/>";
      s += '<text x="' + (Lv - 8) + '" y="' + (yy + 4) + '" text-anchor="end" font-size="11" fill="' + MUTED + '">' + num(vv) + "</text>";
    }
    s += '<text transform="rotate(-90)" x="' + (-(top + phv / 2)) + '" y="16" text-anchor="middle" font-size="11.5" fill="' + MUTED + '">' + esc(ch.unit || "") + "</text>";
    cats.forEach(function (c, ci) {
      var gx = Lv + ci * gw, start = gx + (gw - bw * m) / 2;
      series.forEach(function (se, si) {
        var val = se.values[ci] || 0, y = Yv(val);
        s += '<rect x="' + (start + si * bw + 1) + '" y="' + y + '" width="' + Math.max(2, bw - 2) + '" height="' + Math.max(1, top + phv - y) + '" rx="2.5" fill="' + PAL[si % PAL.length] + '"><title>' + esc(c + " · " + se.name + ": " + num(val) + " " + (ch.unit || "")) + "</title></rect>";
      });
      s += '<text x="' + (gx + gw / 2) + '" y="' + (top + phv + 18) + '" text-anchor="middle" font-size="11.5" fill="' + INK + '">' + tspans(labLines[ci], gx + gw / 2, 13) + "</text>";
    });
    s += '<line x1="' + Lv + '" x2="' + (Lv + pwv) + '" y1="' + (top + phv) + '" y2="' + (top + phv) + '" stroke="' + INK + '" stroke-opacity=".45"/>';
    return s + "</svg>";
  }

  function pieSVG(ch) {
    var pies = ch.pies || [], k = Math.max(1, pies.length), W = 640, names = [];
    pies.forEach(function (p) { p.slices.forEach(function (sl) { if (names.indexOf(sl.name) < 0) names.push(sl.name); }); });
    var color = function (name) { return PAL[names.indexOf(name) % PAL.length]; };
    var cellW = W / k, r = Math.min(cellW / 2 - 30, k === 1 ? 105 : 92), top = 34, cy = top + r + 6;
    var leg = legend(names.map(function (nm) { return { name: nm, color: color(nm) }; }), W, cy + r + 30, "box");
    var H = cy + r + 30 + leg.height + 6, s = svgOpen(W, H, ch.title);
    pies.forEach(function (p, pi) {
      var cx = cellW * pi + cellW / 2, total = p.slices.reduce(function (a, b) { return a + b.value; }, 0) || 1, ang = -Math.PI / 2;
      s += '<text x="' + cx + '" y="20" text-anchor="middle" font-size="13.5" font-weight="700" fill="' + INK + '">' + esc(p.label) + "</text>";
      p.slices.forEach(function (sl) {
        var frac = sl.value / total, a2 = ang + frac * Math.PI * 2, col = color(sl.name);
        var tip = '<title>' + esc(p.label + " · " + sl.name + ": " + num(sl.value) + "%") + "</title>";
        if (frac >= 0.9999) s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + col + '" stroke="#fff" stroke-width="2">' + tip + "</circle>";
        else {
          var x1 = cx + r * Math.cos(ang), y1 = cy + r * Math.sin(ang), x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
          s += '<path d="M' + cx + "," + cy + " L" + x1.toFixed(2) + "," + y1.toFixed(2) + " A" + r + "," + r + " 0 " + (frac > 0.5 ? 1 : 0) + " 1 " + x2.toFixed(2) + "," + y2.toFixed(2) + ' Z" fill="' + col + '" stroke="#fff" stroke-width="2" stroke-linejoin="round">' + tip + "</path>";
        }
        var mid = (ang + a2) / 2, inside = frac >= 0.07, rr = inside ? r * 0.64 : r + 13;
        var lx = cx + rr * Math.cos(mid), ly = cy + rr * Math.sin(mid);
        s += '<text x="' + lx.toFixed(1) + '" y="' + (ly + 4).toFixed(1) + '" text-anchor="middle" font-size="' + (inside ? 12 : 10.5) + '" font-weight="700" fill="' + (inside ? (lightColor(col) ? INK : "#fff") : INK) + '">' + num(sl.value) + "%</text>";
        ang = a2;
      });
    });
    return s + leg.svg + "</svg>";
  }

  function tableHTML(ch) {
    var h = '<div class="table-wrap wr-ctable-wrap"><table class="table wr-ctable"><thead><tr>';
    (ch.headers || []).forEach(function (c, i) { h += '<th class="' + (i ? "num" : "") + '">' + esc(c) + "</th>"; });
    h += "</tr></thead><tbody>";
    (ch.rows || []).forEach(function (row) {
      var total = /^total$/i.test(String(row[0]));
      h += "<tr" + (total ? ' class="wr-total"' : "") + ">" + row.map(function (c, i) { return '<td class="' + (i ? "num" : "") + '">' + esc(c) + "</td>"; }).join("") + "</tr>";
    });
    return h + "</tbody></table></div>";
  }

  var MAPSTYLE = {
    water: { fill: "#D3E7EF", stroke: "#9CC3D3", text: "#2F6F86", italic: true },
    road: { fill: "#DCD5C8", stroke: "#C9C0AF", text: "#5B5446" },
    building: { fill: "#FBE3DC", stroke: "#C8614F", text: INK },
    tree: { fill: "#E3F0DA", stroke: "#A9CC95", text: "#3E6B2E" },
    park: { fill: "#EAF4E1", stroke: "#BCD8A7", text: "#4F7A3A" },
    carpark: { fill: "#E8E8EE", stroke: "#AEAEBC", text: "#4A4F63" },
    beach: { fill: "#F6E4B8", stroke: "#E2C47E", text: "#8A6A22" }
  };
  function mapSVG(m) {
    var S = 4, W = 400, H = 280, s = svgOpen(W, H, m.label);
    s += '<rect x="0.5" y="0.5" width="' + (W - 1) + '" height="' + (H - 1) + '" rx="10" fill="#F7F2E6" stroke="#D9D0BE"/>';
    var labels = "";
    (m.features || []).forEach(function (f) {
      var st = MAPSTYLE[f.type] || MAPSTYLE.building, x = f.x * S, y = f.y * S, w = f.w * S, h = f.h * S;
      var full = f.type === "water" && f.w >= 100 && f.h >= 70;
      if (f.type === "road") {
        s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + st.fill + '"/>';
        if (w >= h) s += '<line x1="' + (x + 4) + '" x2="' + (x + w - 4) + '" y1="' + (y + h / 2) + '" y2="' + (y + h / 2) + '" stroke="#fff" stroke-width="1.4" stroke-dasharray="7 6"/>';
        else s += '<line y1="' + (y + 4) + '" y2="' + (y + h - 4) + '" x1="' + (x + w / 2) + '" x2="' + (x + w / 2) + '" stroke="#fff" stroke-width="1.4" stroke-dasharray="7 6"/>';
      } else if (f.type === "water") {
        s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" ' + (full ? 'rx="10"' : "") + ' fill="' + st.fill + '"/>';
        for (var wy = y + 10; wy < y + h - 4; wy += 16) {
          for (var wx = x + 10 + ((wy / 16) % 2) * 18; wx < x + w - 22; wx += 44) {
            s += '<path d="M' + wx + "," + wy + " q5,-4 10,0 t10,0" + '" fill="none" stroke="' + st.stroke + '" stroke-width="1.2" stroke-linecap="round"/>';
          }
        }
      } else {
        var rx = f.type === "building" ? 2 : f.type === "beach" ? 12 : 6;
        s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx + '" fill="' + st.fill + '" stroke="' + st.stroke + '" stroke-width="' + (f.type === "building" ? 1.6 : 1.2) + '"' + (f.type === "tree" || f.type === "park" ? ' stroke-dasharray="4 3"' : "") + "/>";
        if (f.type === "tree") {
          for (var ty = y + 9; ty < y + h - 5; ty += 13) for (var tx = x + 9 + (((ty - y) / 13) % 2) * 6; tx < x + w - 5; tx += 13)
            s += '<circle cx="' + tx + '" cy="' + ty + '" r="4.2" fill="#93C47D" stroke="#6E9F5A" stroke-width=".8"/>';
        } else if (f.type === "carpark") {
          for (var cx2 = x + 8; cx2 < x + w - 4; cx2 += 9) s += '<line x1="' + cx2 + '" x2="' + cx2 + '" y1="' + (y + 3) + '" y2="' + (y + Math.min(14, h / 2)) + '" stroke="#fff" stroke-width="1.4"/>';
        } else if (f.type === "beach") {
          for (var dy = y + 8; dy < y + h - 4; dy += 9) for (var dx = x + 8 + ((dy / 9) % 2) * 4; dx < x + w - 6; dx += 11)
            s += '<circle cx="' + dx + '" cy="' + dy + '" r=".9" fill="#D2AE5E"/>';
        }
      }
      if (f.label) {
        var vertical = f.type === "road" && h > w * 1.5, fs = f.type === "road" ? 11 : 12.5;
        var maxCh = Math.max(4, Math.floor((vertical ? h : w) / (fs * 0.58)));
        var lines = wrapText(f.label, maxCh), cxL = x + w / 2, cyL = y + h / 2 - (lines.length - 1) * (fs * 0.6);
        var attrs = ' text-anchor="middle" font-size="' + fs + '" font-weight="700" fill="' + st.text + '" stroke="#F7F2E6" stroke-width="3" paint-order="stroke"' + (st.italic ? ' font-style="italic"' : "");
        if (f.type === "road") attrs = attrs.replace('stroke="#F7F2E6"', 'stroke="' + st.fill + '"');
        if (vertical) labels += '<text transform="translate(' + cxL + "," + (y + h / 2) + ') rotate(-90)" x="0" y="4"' + attrs + ">" + esc(f.label) + "</text>";
        else if (f.type === "carpark") labels += '<text x="' + cxL + '" y="' + (y + h - 6) + '"' + attrs + ">" + esc(f.label) + "</text>";
        else labels += '<text x="' + cxL + '" y="' + (cyL + fs * 0.36) + '"' + attrs + ">" + tspans(lines, cxL, fs * 1.2) + "</text>";
      }
    });
    s += labels;
    s += '<g transform="translate(' + (W - 24) + ',26)"><circle r="14" fill="#fff" fill-opacity=".9" stroke="#D9D0BE"/><path d="M0,-9 L4,3 L0,0 L-4,3 Z" fill="' + INK + '"/><text y="11" text-anchor="middle" font-size="8" font-weight="700" fill="' + INK + '">N</text></g>';
    return s + "</svg>";
  }

  function processSVG(ch) {
    var steps = ch.steps || [], n = steps.length, id = "wrarr" + (++svgSeq), s, W = 640;
    var defs = '<defs><marker id="' + id + '" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#C8614F"/></marker></defs>';
    function box(st, i, x, y, w, h) {
      var out = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="#fff" stroke="#E9725F" stroke-width="1.6"/>';
      out += '<circle cx="' + (x + 2) + '" cy="' + (y + 2) + '" r="12" fill="#E9725F"/><text x="' + (x + 2) + '" y="' + (y + 6.5) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">' + (i + 1) + "</text>";
      out += '<text x="' + (x + w / 2) + '" y="' + (y + 22) + '" text-anchor="middle" font-size="13" font-weight="800" fill="' + INK + '">' + esc(st.label) + "</text>";
      if (st.note) {
        var lines = wrapText(st.note, Math.floor((w - 14) / 5.6)).slice(0, 3);
        out += '<text x="' + (x + w / 2) + '" y="' + (y + 39) + '" text-anchor="middle" font-size="10.5" fill="#4A5568">' + tspans(lines, x + w / 2, 13) + "</text>";
      }
      return out;
    }
    if (!ch.cyclic) {
      var cols = n <= 4 ? n : n <= 6 ? 3 : 4, gap = 40, bw = (W - 40 - (cols - 1) * gap) / cols, bh = 84, rows = Math.ceil(n / cols), vg = 42;
      var H = 24 + rows * bh + (rows - 1) * vg + 16, pos = [];
      for (var i = 0; i < n; i++) {
        var r = Math.floor(i / cols), c = i % cols; if (r % 2) c = cols - 1 - c;
        pos.push({ x: 20 + c * (bw + gap), y: 18 + r * (bh + vg), r: r });
      }
      s = svgOpen(W, H, ch.title) + defs;
      for (var j = 0; j < n - 1; j++) {
        var a = pos[j], b = pos[j + 1];
        if (a.r === b.r) {
          var ltr = b.x > a.x, y0 = a.y + bh / 2;
          s += '<line x1="' + (ltr ? a.x + bw + 3 : a.x - 3) + '" y1="' + y0 + '" x2="' + (ltr ? b.x - 5 : b.x + bw + 5) + '" y2="' + y0 + '" stroke="#C8614F" stroke-width="2" marker-end="url(#' + id + ')"/>';
        } else {
          s += '<line x1="' + (a.x + bw / 2) + '" y1="' + (a.y + bh + 3) + '" x2="' + (b.x + bw / 2) + '" y2="' + (b.y - 5) + '" stroke="#C8614F" stroke-width="2" marker-end="url(#' + id + ')"/>';
        }
      }
      steps.forEach(function (st, k) { s += box(st, k, pos[k].x, pos[k].y, bw, bh); });
      return s + "</svg>";
    }
    var Hc = n >= 7 ? 470 : 400, bwc = 136, bhc = 82, cx = W / 2, cy = Hc / 2, rx = W / 2 - bwc / 2 - 14, ry = Hc / 2 - bhc / 2 - 12;
    var P = steps.map(function (st, k) { var t = -Math.PI / 2 + k * 2 * Math.PI / n; return { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t) }; });
    s = svgOpen(W, Hc, ch.title) + defs;
    s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (rx - 40) + '" ry="' + (ry - 30) + '" fill="none" stroke="#F3D3CB" stroke-width="1.2" stroke-dasharray="2 6"/>';
    var tl = wrapText(ch.title || "", 18);
    s += '<text x="' + cx + '" y="' + (cy - (tl.length - 1) * 9 + 4) + '" text-anchor="middle" font-size="15" font-weight="700" fill="#B9473A">' + tspans(tl, cx, 18) + "</text>";
    s += '<text x="' + cx + '" y="' + (cy + tl.length * 9 + 16) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '">(cycle repeats)</text>';
    function trim(from, to) {
      var dx = to.x - from.x, dy = to.y - from.y, t = Math.min(dx ? (bwc / 2 + 6) / Math.abs(dx) : 9, dy ? (bhc / 2 + 6) / Math.abs(dy) : 9);
      return { x: from.x + dx * t, y: from.y + dy * t };
    }
    for (var q = 0; q < n; q++) {
      var A = P[q], Bp = P[(q + 1) % n], s1 = trim(A, Bp), e1 = trim(Bp, A);
      var mx = (s1.x + e1.x) / 2, my = (s1.y + e1.y) / 2, ox = mx - cx, oy = my - cy, ol = Math.sqrt(ox * ox + oy * oy) || 1;
      var qx = mx + ox / ol * 16, qy = my + oy / ol * 16;
      s += '<path d="M' + s1.x.toFixed(1) + "," + s1.y.toFixed(1) + " Q" + qx.toFixed(1) + "," + qy.toFixed(1) + " " + e1.x.toFixed(1) + "," + e1.y.toFixed(1) + '" fill="none" stroke="#C8614F" stroke-width="2" marker-end="url(#' + id + ')"/>';
    }
    steps.forEach(function (st, k) { s += box(st, k, P[k].x - bwc / 2, P[k].y - bhc / 2, bwc, bhc); });
    return s + "</svg>";
  }

  function chartInner(ch) {
    if (!ch) return "";
    switch (ch.kind) {
      case "line": return lineSVG(ch);
      case "bar": return barSVG(ch);
      case "pie": return pieSVG(ch);
      case "table": return tableHTML(ch);
      case "map": return '<div class="wr-maps">' + (ch.maps || []).map(function (m) {
        return '<figure class="wr-map"><figcaption>' + esc(m.label) + "</figcaption>" + mapSVG(m) + "</figure>";
      }).join("") + "</div>";
      case "process": return processSVG(ch);
      case "mixed": return (ch.charts || []).map(function (c) { return '<div class="wr-mixed-part">' + chartHTML(c) + "</div>"; }).join("");
      default: return "";
    }
  }
  function chartHTML(ch) {
    if (!ch) return "";
    if (ch.kind === "mixed") return '<div class="wr-chart wr-chart-mixed">' + chartInner(ch) + "</div>";
    var title = ch.title ? '<figcaption class="wr-chart-title">' + esc(ch.title) + "</figcaption>" : "";
    return '<figure class="wr-chart wr-chart-' + esc(ch.kind) + '">' + title + chartInner(ch) + "</figure>";
  }

  /* -------------------------------------------------- mini illustrations */
  function illus(id) {
    var c1 = "#E9725F", c2 = "#2F3E5C", c3 = "#E3A43A", soft = "#FCE9E5", ln = "#D9D0BE";
    var o = '<svg class="wr-illus" viewBox="0 0 84 56" aria-hidden="true">';
    var e = "</svg>";
    switch (id) {
      case "line": return o + '<path d="M8 6v42h70" fill="none" stroke="' + ln + '" stroke-width="2"/><polyline points="12,40 26,30 40,34 54,18 72,12" fill="none" stroke="' + c1 + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><polyline points="12,22 26,26 40,24 54,34 72,38" fill="none" stroke="' + c2 + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' + e;
      case "bar": return o + '<path d="M8 48h70" stroke="' + ln + '" stroke-width="2"/><rect x="14" y="22" width="8" height="26" rx="2" fill="' + c1 + '"/><rect x="23" y="30" width="8" height="18" rx="2" fill="' + c2 + '"/><rect x="38" y="12" width="8" height="36" rx="2" fill="' + c1 + '"/><rect x="47" y="26" width="8" height="22" rx="2" fill="' + c2 + '"/><rect x="62" y="34" width="8" height="14" rx="2" fill="' + c1 + '"/><rect x="71" y="18" width="8" height="30" rx="2" fill="' + c2 + '"/>' + e;
      case "pie": return o + '<circle cx="42" cy="28" r="22" fill="' + c2 + '"/><path d="M42 28 L42 6 A22 22 0 0 1 63.4 33 Z" fill="' + c1 + '"/><path d="M42 28 L63.4 33 A22 22 0 0 1 36 49.2 Z" fill="' + c3 + '"/><circle cx="42" cy="28" r="22" fill="none" stroke="#fff" stroke-width="2"/>' + e;
      case "table": return o + '<rect x="10" y="8" width="64" height="40" rx="5" fill="#fff" stroke="' + ln + '" stroke-width="2"/><rect x="10" y="8" width="64" height="10" rx="5" fill="' + c1 + '"/><path d="M10 28h64M10 38h64M32 18v30M54 18v30" stroke="' + ln + '" stroke-width="1.5"/>' + e;
      case "mixed": return o + '<path d="M8 48h70" stroke="' + ln + '" stroke-width="2"/><rect x="14" y="30" width="10" height="18" rx="2" fill="' + soft + '" stroke="' + c1 + '"/><rect x="30" y="22" width="10" height="26" rx="2" fill="' + soft + '" stroke="' + c1 + '"/><rect x="46" y="26" width="10" height="22" rx="2" fill="' + soft + '" stroke="' + c1 + '"/><rect x="62" y="14" width="10" height="34" rx="2" fill="' + soft + '" stroke="' + c1 + '"/><polyline points="19,20 35,30 51,14 67,22" fill="none" stroke="' + c2 + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' + e;
      case "map": return o + '<rect x="6" y="6" width="72" height="44" rx="6" fill="#F7F2E6" stroke="' + ln + '" stroke-width="2"/><rect x="6" y="6" width="72" height="8" fill="#D3E7EF"/><rect x="6" y="28" width="72" height="5" fill="#DCD5C8"/><rect x="14" y="17" width="12" height="8" rx="1.5" fill="' + soft + '" stroke="' + c1 + '"/><rect x="34" y="37" width="18" height="9" rx="1.5" fill="' + soft + '" stroke="' + c1 + '"/><circle cx="62" cy="20" r="3.5" fill="#93C47D"/><circle cx="69" cy="21" r="3.5" fill="#93C47D"/><circle cx="65" cy="40" r="3.5" fill="#93C47D"/>' + e;
      case "process": return o + '<rect x="4" y="18" width="20" height="20" rx="5" fill="#fff" stroke="' + c1 + '" stroke-width="2"/><rect x="32" y="18" width="20" height="20" rx="5" fill="#fff" stroke="' + c1 + '" stroke-width="2"/><rect x="60" y="18" width="20" height="20" rx="5" fill="' + c1 + '"/><path d="M25 28h5M53 28h5" stroke="' + c2 + '" stroke-width="2.5" stroke-linecap="round"/><path d="M28 25l3 3-3 3M56 25l3 3-3 3" fill="none" stroke="' + c2 + '" stroke-width="2"/>' + e;
      case "opinion": return o + '<path d="M12 10h46a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H30l-10 8v-8h-8a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6z" fill="' + soft + '" stroke="' + c1 + '" stroke-width="2"/><path d="M24 25l6 6 13-13" fill="none" stroke="' + c1 + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="70" cy="42" r="8" fill="' + c2 + '"/><path d="M66 42h8" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>' + e;
      case "discussion": return o + '<path d="M6 10h34a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H18l-8 7v-7H6" fill="' + soft + '" stroke="' + c1 + '" stroke-width="2" stroke-linejoin="round"/><path d="M78 20H44a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h22l8 7v-7h4" fill="#E8EBF5" stroke="' + c2 + '" stroke-width="2" stroke-linejoin="round"/><text x="22" y="27" font-size="11" font-weight="800" fill="' + c1 + '" text-anchor="middle">A</text><text x="58" y="37" font-size="11" font-weight="800" fill="' + c2 + '" text-anchor="middle">B</text>' + e;
      case "advdis": return o + '<circle cx="26" cy="28" r="17" fill="' + soft + '" stroke="' + c1 + '" stroke-width="2"/><path d="M26 20v16M18 28h16" stroke="' + c1 + '" stroke-width="3.5" stroke-linecap="round"/><circle cx="60" cy="28" r="17" fill="#E8EBF5" stroke="' + c2 + '" stroke-width="2"/><path d="M52 28h16" stroke="' + c2 + '" stroke-width="3.5" stroke-linecap="round"/>' + e;
      case "problem": return o + '<path d="M18 10l15 26H3z" fill="#FCF1DC" stroke="' + c3 + '" stroke-width="2" stroke-linejoin="round"/><path d="M18 19v8" stroke="' + c3 + '" stroke-width="2.5" stroke-linecap="round"/><circle cx="18" cy="31" r="1.5" fill="' + c3 + '"/><path d="M38 26h12M46 22l4 4-4 4" fill="none" stroke="' + c2 + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="66" cy="22" r="11" fill="' + soft + '" stroke="' + c1 + '" stroke-width="2"/><path d="M62 36h8M63 40h6" stroke="' + c1 + '" stroke-width="2.5" stroke-linecap="round"/>' + e;
      case "twopart": return o + '<circle cx="24" cy="26" r="15" fill="' + c1 + '"/><text x="24" y="31" font-size="15" font-weight="800" fill="#fff" text-anchor="middle">1</text><circle cx="60" cy="26" r="15" fill="' + c2 + '"/><text x="60" y="31" font-size="15" font-weight="800" fill="#fff" text-anchor="middle">2</text><path d="M30 46q12 6 24 0" fill="none" stroke="' + ln + '" stroke-width="2" stroke-linecap="round"/>' + e;
      default: return o + e;
    }
  }

  /* ======================================================================
   * VIEWS (HTML strings)
   * ==================================================================== */
  function tabsHTML(active) {
    var t = [["task1", "Task 1", "bar-chart"], ["task2", "Task 2", "pen-line"], ["history", "Lịch sử", "clock"]];
    return '<div class="tabs wr-tabs" role="tablist">' + t.map(function (x) {
      return '<button class="tab' + (active === x[0] ? " active" : "") + '" data-act="tab" data-tab="' + x[0] + '" role="tab">' + ic(x[2], 16) + "<span>" + x[1] + "</span></button>";
    }).join("") + "</div>";
  }
  function headHTML(active) {
    return '<div class="page-head wr-head"><div><div class="page-kicker">Luyện tập · Writing</div>' +
      '<h1 class="page-title">Writing</h1>' +
      '<p class="page-sub">Task 1 &amp; Task 2 — hướng dẫn từng dạng, kho đề cập nhật và luyện viết có tính giờ. Band luôn là <b>ước tính</b> do bạn hoặc giáo viên chấm.</p></div></div>' +
      tabsHTML(active);
  }
  function promptFirstLine(p) { return String(p.prompt || "").split("\n")[0]; }
  function promptLinesHTML(p) {
    return String(p.prompt || "").split("\n").map(function (l, i, arr) {
      var instr = /^(Summarise|Write at least|Give reasons|Discuss both|To what extent|Do the advantages|What are|Why is|Why does|What can|Is this|Is it|What could|How can)/.test(l) && i > 0;
      return '<p class="' + (instr ? "wr-p-instr" : "wr-p-main") + '">' + esc(l) + "</p>";
    }).join("");
  }
  function chipsWords(words, max) {
    return words.slice(0, max || 12).map(function (w) {
      return '<span class="chip wr-wchip-static" title="' + esc(w.vi || "") + '">' + esc(w.word) + "</span>";
    }).join("");
  }

  function dailyCardHTML() {
    var p = dailyPrompt(false);
    if (!p) return "";
    var t = findType(p.type), words = todayWords(), dr = getDraft(p.id);
    var doneToday = subsFor(p.id).some(function (s) { return s.day === today(); });
    var btn = dr && dr.text && dr.text.trim()
      ? ic("edit", 16) + " Viết tiếp (" + countWords(dr.text) + " từ)"
      : ic("pen-line", 16) + (doneToday ? " Viết thêm lần nữa" : " Viết ngay");
    return '<section class="card tape wr-daily sk-writing">' +
      '<div class="wr-daily-main">' +
      '<div class="wr-daily-kicker">' + ic("sun", 16) + " Đề viết hôm nay · " + esc(fmtDay(today(), "long")) + "</div>" +
      '<h2 class="wr-daily-title">' + esc(p.title) + "</h2>" +
      '<p class="wr-daily-prompt">' + esc(promptFirstLine(p)) + "</p>" +
      '<div class="row wrap wr-gap-sm"><span class="pill sk">Task 2 · ' + esc(t ? t.nameVi : p.type) + '</span><span class="pill muted">' + esc(topicName(p.topic)) + "</span>" +
      (isNew(p) ? '<span class="pill warn">Mới</span>' : "") +
      (doneToday ? '<span class="pill good">' + ic("check", 14) + " Đã nộp hôm nay</span>" : "") + "</div></div>" +
      '<div class="wr-daily-side"><div class="wr-wg-label">' + ic("sparkles", 15) + " Thử dùng từ hôm nay</div>" +
      (words.length ? '<div class="row wrap wr-gap-xs">' + chipsWords(words, 10) + "</div>"
        : '<p class="small muted">Chưa có từ vựng hôm nay — mở mục Từ vựng để nhận bộ từ mới.</p>') +
      '<button class="btn accent wr-daily-btn" data-act="daily">' + btn + "</button></div></section>";
  }

  function draftsStripHTML() {
    var list = listDrafts();
    if (!list.length) return "";
    return '<section class="wr-drafts"><div class="wr-sub-title">' + ic("bookmark", 16) + " Bản nháp đang viết dở</div><div class=\"wr-drafts-row\">" +
      list.slice(0, 6).map(function (x) {
        var t = findType(x.prompt.type);
        return '<button class="card soft clickable wr-draft-card" data-act="open" data-id="' + esc(x.prompt.id) + '">' +
          '<span class="tiny muted">Task ' + taskOf(x.prompt) + " · " + esc(t ? t.name : "") + "</span>" +
          '<span class="wr-draft-title">' + esc(x.prompt.title) + "</span>" +
          '<span class="tiny muted">' + countWords(x.draft.text) + " từ · " + fmtClock(x.draft.seconds || 0) + (x.draft.revisionOf ? " · viết lại" : "") + "</span></button>";
      }).join("") + "</div></section>";
  }

  function typeGridHTML(task) {
    var types = typesOf(task);
    if (!types.length) return emptyHTML("📝", "Chưa có dữ liệu Writing", "Không tải được kho đề Writing (data/writing-bank.js).");
    return '<div class="wr-type-grid">' + types.map(function (t) {
      var ps = promptsOf(task).filter(function (p) { return p.type === t.id; });
      var done = ps.filter(function (p) { return subsFor(p.id).length; }).length;
      var nNew = ps.filter(isNew).length;
      return '<button class="card clickable wr-type-card" data-act="type" data-type="' + esc(t.id) + '">' +
        '<div class="wr-type-illus">' + illus(t.id) + "</div>" +
        '<div class="wr-type-body"><div class="wr-type-name">' + esc(t.name) + "</div>" +
        '<div class="wr-type-vi">' + esc(t.nameVi) + "</div>" +
        '<div class="wr-type-short">' + esc(t.short || "") + "</div>" +
        '<div class="row wrap wr-gap-xs wr-type-meta"><span class="pill muted">' + ps.length + " đề</span>" +
        (done ? '<span class="pill good">' + ic("check", 12) + " " + done + " đã viết</span>" : "") +
        (nNew ? '<span class="pill warn">' + nNew + " mới</span>" : "") + "</div></div></button>";
    }).join("") + "</div>";
  }

  function emptyHTML(emoji, title, text, action) {
    return '<div class="empty"><div class="empty-emoji">' + emoji + '</div><div class="empty-title">' + esc(title) + '</div><div class="empty-text">' + esc(text) + "</div>" + (action || "") + "</div>";
  }

  function templateFramesHTML(t) {
    return (t.template || []).map(function (g) {
      return '<div class="wr-tpl-group"><div class="wr-tpl-part">' + esc(g.part) + "</div>" + (g.frames || []).map(function (f) {
        return '<p class="wr-frame">' + esc(f).replace(/_{3,}/g, '<span class="wr-blank"></span>') + "</p>";
      }).join("") + "</div>";
    }).join("");
  }
  function outlineHTML(t) {
    return '<ol class="wr-outline">' + (t.outline || []).map(function (o, i) {
      return '<li><div class="wr-ol-num">' + (i + 1) + '</div><div class="wr-ol-body"><div class="wr-ol-part">' + esc(o.part) + "</div>" +
        '<div class="wr-ol-how">' + esc(o.how) + "</div>" + (o.example ? '<div class="wr-ol-ex">' + esc(o.example) + "</div>" : "") + "</div></li>";
    }).join("") + "</ol>";
  }
  function languageHTML(t) {
    var lang = t.language || {};
    return Object.keys(lang).map(function (k) {
      return '<div class="wr-lang-group"><div class="wr-lang-label">' + esc(k) + '</div><div class="row wrap wr-gap-xs">' +
        lang[k].map(function (ph) { return '<span class="wr-lang-chip">' + esc(ph) + "</span>"; }).join("") + "</div></div>";
    }).join("");
  }
  function ceelHTML(t) {
    var d = t.development;
    if (!d) return "";
    var ex = esc(d.example || "").replace(/([^()]+?)\s*\((Claim|Explain|Example|Link)\)/g, function (m, seg, tag) {
      return '<span class="wr-ceel wr-ceel-' + tag.toLowerCase() + '">' + seg.trim() + ' <b>' + tag + "</b></span> ";
    });
    return '<div class="wr-ceel-steps">' + d.steps.map(function (st) {
      return '<div class="wr-ceel-step wr-ceel-' + st.step.toLowerCase() + '"><b>' + esc(st.step) + "</b><span>" + esc(st.how) + "</span></div>";
    }).join('<span class="wr-ceel-arrow">' + ic("chevron-right", 16) + "</span>") + "</div>" +
      '<div class="wr-ceel-ex"><div class="wr-tpl-part">Đoạn mẫu phân tích theo C-E-E-L</div><p>' + ex + "</p></div>";
  }
  function sampleBodyHTML(t) {
    if (!t.sample) return "";
    var p = findPrompt(t.sample.promptId), words = countWords(t.sample.text);
    return (p ? '<div class="wr-sample-prompt"><div class="wr-tpl-part">Đề bài</div>' + promptLinesHTML(p) + (p.chart ? chartHTML(p.chart) : "") + "</div>" : "") +
      '<div class="wr-sample-text"><div class="row between wrap"><div class="wr-tpl-part">Bài mẫu (' + words + ' từ)</div><span class="pill muted">Band 8 tham khảo</span></div>' +
      String(t.sample.text).split(/\n\n+/).map(function (para) { return "<p>" + esc(para) + "</p>"; }).join("") + "</div>" +
      '<div class="wr-sample-notes"><div class="wr-tpl-part">' + ic("lightbulb", 16) + " Vì sao bài này đạt điểm cao</div><ul>" +
      (t.sample.notes || []).map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul></div>";
  }

  function promptItemHTML(p) {
    var subs = subsFor(p.id), dr = getDraft(p.id), hasDraft = dr && ((dr.text && dr.text.trim()) || dr.seconds >= 30);
    return '<div class="card wr-prompt-item" data-topic="' + esc(p.topic) + '">' +
      '<div class="wr-pi-main"><div class="wr-pi-title">' + esc(p.title) + "</div>" +
      '<div class="wr-pi-text">' + esc(promptFirstLine(p)) + "</div>" +
      '<div class="row wrap wr-gap-xs"><span class="pill muted">' + esc(topicName(p.topic)) + "</span>" +
      (isNew(p) ? '<span class="pill warn">' + ic("sparkles", 12) + " Mới</span>" : "") +
      (subs.length ? '<span class="pill good">' + ic("check", 12) + " Đã nộp" + (subs.length > 1 ? " ×" + subs.length : "") + "</span>" : "") +
      (hasDraft ? '<span class="pill sk">' + ic("edit", 12) + " Nháp " + countWords(dr.text) + " từ</span>" : "") + "</div></div>" +
      '<button class="btn sk sm wr-pi-btn" data-act="open" data-id="' + esc(p.id) + '">' + ic(hasDraft ? "edit" : "pen-line", 15) + (hasDraft ? " Viết tiếp" : subs.length ? " Viết lại" : " Viết bài") + "</button></div>";
  }

  function guideHTML(task, t) {
    var ps = promptsOf(task).filter(function (p) { return p.type === t.id; });
    var topics = []; ps.forEach(function (p) { if (topics.indexOf(p.topic) < 0) topics.push(p.topic); });
    var sec = function (icon, title, body, cls) {
      return '<section class="card wr-gcard ' + (cls || "") + '"><h3 class="wr-gtitle">' + ic(icon, 18) + " " + title + "</h3>" + body + "</section>";
    };
    return '<div class="wr-guide">' +
      '<button class="btn ghost sm wr-back" data-act="tab" data-tab="task' + task + '">' + ic("chevron-left", 16) + " Tất cả dạng Task " + task + "</button>" +
      '<section class="card tape pad-lg wr-ghead"><div class="wr-ghead-illus">' + illus(t.id) + "</div><div class=\"wr-ghead-body\">" +
      '<div class="page-kicker">Task ' + task + " · Hướng dẫn dạng bài</div>" +
      '<h2 class="wr-ghead-title">' + esc(t.name) + ' <span class="wr-ghead-vi">' + esc(t.nameVi) + "</span></h2>" +
      '<p class="wr-ghead-what">' + esc(t.what) + "</p>" +
      '<div class="row wrap wr-gap-sm"><a class="btn sk" href="javascript:void(0)" data-act="jump-bank">' + ic("list", 16) + " Kho đề (" + ps.length + ")</a>" +
      '<button class="btn ghost" data-act="random" data-type="' + esc(t.id) + '">' + ic("target", 16) + " Viết một đề chưa làm</button></div></div></section>" +
      '<div class="wr-guide-grid">' +
      sec("lightbulb", "Hướng đi", '<ol class="wr-approach">' + (t.approach || []).map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ol>", "wr-span-2") +
      sec("list", "Outline " + (t.outline || []).length + " đoạn", outlineHTML(t), "") +
      sec("edit", "Template (điền vào ___)", templateFramesHTML(t), "") +
      (t.development ? sec("layers", "Phát triển ý: " + esc(t.development.method), ceelHTML(t), "wr-span-2") : "") +
      sec("book-open", "Ngôn ngữ hữu ích", languageHTML(t), "") +
      sec("alert-triangle", "Lỗi thường gặp", '<ul class="wr-mistakes">' + (t.mistakes || []).map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ul>", "wr-mistake-card") +
      "</div>" +
      (t.sample ? '<details class="card wr-sample"><summary>' + ic("award", 18) + " <span>Bài mẫu band 8 (tham khảo) & phân tích</span>" + ic("chevron-right", 16) + "</summary><div class=\"wr-sample-body\">" + sampleBodyHTML(t) + "</div></details>" : "") +
      '<div id="wr-bank" class="wr-bank"><div class="row between wrap wr-bank-head"><h2 class="section-title">Kho đề ' + esc(t.name) + "</h2>" +
      '<span class="small muted">' + ps.length + " đề · cập nhật " + esc((ps.map(function (p) { return p.addedOn; }).sort().pop() || "").split("-").reverse().join("/")) + "</span></div>" +
      (topics.length > 1 ? '<div class="row wrap wr-gap-xs wr-topic-filter"><button class="chip active" data-act="topic" data-topic="">Tất cả</button>' +
        topics.map(function (tp) { return '<button class="chip" data-act="topic" data-topic="' + esc(tp) + '">' + esc(topicName(tp)) + "</button>"; }).join("") + "</div>" : "") +
      '<div class="wr-prompt-list">' + (ps.length ? ps.slice().sort(function (a, b) { return String(b.addedOn).localeCompare(String(a.addedOn)); }).map(promptItemHTML).join("")
        : emptyHTML("🗂️", "Chưa có đề", "Dạng này chưa có đề trong kho.")) + "</div></div></div>";
  }

  function homeHTML(task) {
    return dailyCardHTML() + draftsStripHTML() +
      '<div class="row between wrap wr-sec-head"><h2 class="section-title">Các dạng Task ' + task + "</h2>" +
      '<span class="small muted">' + promptsOf(task).length + " đề · " + typesOf(task).length + " dạng · chọn một dạng để xem outline, template, hướng đi</span></div>" +
      typeGridHTML(task);
  }

  /* ---------------------------------------------------------- history */
  function statusPill(s) {
    var sc = s.score || {};
    if (sc.status === "assessed" && sc.band != null)
      return '<span class="pill good">Đã đánh giá · ' + fmtBand(sc.band) + ' <span class="wr-est">ước tính</span></span>';
    return '<span class="pill muted">Chưa chấm</span>';
  }
  function historyHTML(params) {
    var all = writingSubs().slice().sort(function (a, b) { return String(b.at || "").localeCompare(String(a.at || "")); });
    var sub = params.sub === "task1" || params.sub === "task2" ? params.sub : (all[0] ? all[0].kind : "task1");
    var list = all.filter(function (s) { return s.kind === sub; });
    var n1 = all.filter(function (s) { return s.kind === "task1"; }).length, n2 = all.length - n1;
    var assessed = list.filter(function (s) { return s.score && s.score.status === "assessed" && s.score.band != null; });
    var secs = list.reduce(function (a, s) { return a + (s.seconds || 0); }, 0);
    var html = '<div class="row between wrap wr-hist-head"><div class="seg wr-seg">' +
      '<button class="' + (sub === "task1" ? "active" : "") + '" data-act="hsub" data-sub="task1">Task 1 (' + n1 + ")</button>" +
      '<button class="' + (sub === "task2" ? "active" : "") + '" data-act="hsub" data-sub="task2">Task 2 (' + n2 + ")</button></div>" +
      '<span class="small muted">Band hiển thị là <b>ước tính</b> từ tự đánh giá hoặc giáo viên — app không tự chấm điểm.</span></div>';
    if (!list.length) {
      return html + emptyHTML("✍️", "Chưa có bài " + (sub === "task1" ? "Task 1" : "Task 2") + " nào",
        "Bài bạn nộp sẽ xuất hiện ở đây kèm số từ, thời gian và đánh giá.",
        '<button class="btn accent" data-act="tab" data-tab="' + sub + '">' + ic("pen-line", 16) + " Bắt đầu viết</button>");
    }
    html += '<div class="grid g-3 wr-hist-stats">' +
      '<div class="card stat"><div class="stat-label">Số bài</div><div class="stat-value">' + list.length + '</div><div class="stat-foot">' + assessed.length + " đã đánh giá</div></div>" +
      '<div class="card stat"><div class="stat-label">Band gần nhất (ước tính)</div><div class="stat-value">' + (assessed[0] ? fmtBand(assessed[0].score.band) : "—") + '</div><div class="stat-foot">' + (assessed[0] ? esc(assessed[0].score.bandSource || "") : "chưa có đánh giá") + "</div></div>" +
      '<div class="card stat"><div class="stat-label">Tổng thời gian viết</div><div class="stat-value wr-stat-sm">' + esc(fmtDur(secs)) + '</div><div class="stat-foot">trung bình ' + esc(fmtDur(Math.round(secs / list.length))) + " / bài</div></div></div>";
    html += '<div class="wr-hist-list">' + list.map(function (s) {
      var p = findPrompt(s.refId), t = p ? findType(p.type) : findType((s.detail || {}).type), d = s.detail || {};
      var orig = d.revisionOf ? findSub(d.revisionOf) : null;
      return '<div class="card wr-hrow">' +
        '<div class="wr-h-date"><b>' + esc(fmtDay(s.day, "short")) + '</b><span class="tiny muted">' + esc((s.at || "").slice(11, 16)) + "</span></div>" +
        '<div class="wr-h-main"><div class="wr-h-title">' + esc(s.title || (p && p.title) || s.refId) + "</div>" +
        '<div class="row wrap wr-gap-xs">' + (t ? '<span class="pill sk">' + esc(t.name) + "</span>" : "") +
        (d.revisionOf ? '<span class="pill muted">' + ic("rotate-ccw", 12) + " Viết lại" + (orig ? " bài " + esc(fmtDay(orig.day, "short")) : "") + "</span>" : "") +
        '<span class="tiny muted">' + (d.words || 0) + " từ · " + esc(fmtDur(s.seconds || 0)) + (s.repeat ? " · làm lại đề" : "") + "</span></div></div>" +
        '<div class="wr-h-status">' + statusPill(s) + "</div>" +
        '<div class="wr-h-actions">' +
        '<button class="btn ghost sm" data-act="view" data-sid="' + esc(s.id) + '">' + ic("eye", 15) + " Xem</button>" +
        '<button class="btn ' + (s.score && s.score.status === "assessed" ? "ghost" : "sk") + ' sm" data-act="assess" data-sid="' + esc(s.id) + '">' + ic("award", 15) + (s.score && s.score.status === "assessed" ? " Sửa đánh giá" : " Đánh giá") + "</button>" +
        (p ? '<button class="btn ghost sm" data-act="rewrite" data-sid="' + esc(s.id) + '">' + ic("rotate-ccw", 15) + " Viết lại</button>" : "") +
        '<button class="btn ghost sm" data-act="err" data-sid="' + esc(s.id) + '">' + ic("alert-triangle", 15) + " Ghi lỗi</button>" +
        "</div></div>";
    }).join("") + "</div>";
    return html;
  }

  /* ----------------------------------------------------------- editor */
  function wordItemsFor(p) {
    var items = [], seen = {};
    function push(word, vi, group) {
      var k = String(word).toLowerCase();
      if (!word || seen[k]) return; seen[k] = 1;
      items.push({ word: word, vi: vi || "", group: group, re: buildMatcher(word), used: false });
    }
    todayWords().forEach(function (w) { push(w.word, w.vi, "today"); });
    if (taskOf(p) === 2) (p.collocations || []).forEach(function (c) { push(c.word, c.vi, "prompt"); });
    else { var t = findType(p.type); ((t && t.vocab) || []).forEach(function (c) { push(c.word, c.vi, "prompt"); }); }
    return items;
  }
  function editorHTML(p, params) {
    var task = taskOf(p), t = findType(p.type), min = task === 1 ? 150 : 250, limit = task === 1 ? 20 : 40;
    var rev = params.rev ? findSub(params.rev) : null, dr = getDraft(p.id);
    if (!rev && dr && dr.revisionOf) rev = findSub(dr.revisionOf);
    var items = wordItemsFor(p);
    var group = function (g, label) {
      var list = items.filter(function (x) { return x.group === g; });
      if (!list.length) return g === "today" ? '<div class="wr-word-group"><div class="wr-wg-label">Từ vựng hôm nay</div><p class="tiny muted">Chưa có từ hôm nay.</p></div>' : "";
      return '<div class="wr-word-group"><div class="wr-wg-label">' + label + '</div><div class="row wrap wr-gap-xs">' + list.map(function (x) {
        return '<span class="chip wr-wchip" data-w="' + items.indexOf(x) + '" title="' + esc(x.vi) + '">' + esc(x.word) + (x.vi ? '<small>' + esc(x.vi) + "</small>" : "") + "</span>";
      }).join("") + "</div></div>";
    };
    var ideas = "";
    if (task === 2 && p.ideas) {
      var LBL = { for: "Ủng hộ / Phía A", against: "Phản đối / Phía B", advantages: "Ưu điểm", disadvantages: "Nhược điểm", causes: "Nguyên nhân", solutions: "Giải pháp", q1: "Câu hỏi 1", q2: "Câu hỏi 2" };
      ideas = '<details class="card soft wr-help"><summary>' + ic("lightbulb", 16) + " <span>Gợi ý ý tưởng (hãy tự nghĩ trước 3–5 phút)</span>" + ic("chevron-right", 16) + "</summary><div class=\"wr-ideas\">" +
        Object.keys(p.ideas).map(function (k) {
          return '<div class="wr-idea-col"><div class="wr-tpl-part">' + esc(LBL[k] || k) + "</div><ul>" + p.ideas[k].map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
        }).join("") + "</div></details>";
    }
    return '<div class="page sk-writing wr-page wr-editor-page">' +
      '<div class="row between wrap wr-ed-top"><button class="btn ghost sm" data-act="exit">' + ic("chevron-left", 16) + " " + esc(t ? t.name : "Quay lại") + "</button>" +
      '<div class="row wrap wr-gap-xs"><span class="pill sk">Task ' + task + " · " + esc(t ? t.nameVi : "") + '</span><span class="pill muted">' + esc(topicName(p.topic)) + "</span>" +
      (rev ? '<span class="pill warn">' + ic("rotate-ccw", 12) + " Viết lại bài " + esc(fmtDay(rev.day, "short")) + "</span>" : "") +
      (params.daily ? '<span class="pill good">' + ic("sun", 12) + " Đề hôm nay</span>" : "") + "</div></div>" +
      '<div class="wr-editor">' +
      '<div class="wr-ed-left">' +
      '<section class="card wr-prompt-card"><div class="wr-prompt-kicker">WRITING TASK ' + task + "</div>" +
      '<div class="tiny muted wr-prompt-time">You should spend about ' + limit + " minutes on this task.</div>" +
      '<div class="wr-prompt-text">' + promptLinesHTML(p) + "</div>" +
      (p.source ? '<p class="small muted">' + esc(p.source) + "</p>" : "") +
      (task === 1 && p.chart ? chartHTML(p.chart) : "") + "</section>" +
      (rev ? '<details class="card soft wr-help"><summary>' + ic("eye", 16) + " <span>Bài gốc (" + ((rev.detail || {}).words || 0) + " từ" + (rev.score && rev.score.band != null ? " · band ước tính " + fmtBand(rev.score.band) : "") + ")</span>" + ic("chevron-right", 16) + '</summary><div class="wr-essay wr-essay-sm">' + esc((rev.detail || {}).text || "") + "</div></details>" : "") +
      (t ? '<details class="card soft wr-help"><summary>' + ic("list", 16) + " <span>Outline & template — " + esc(t.name) + "</span>" + ic("chevron-right", 16) + "</summary>" +
        '<div class="wr-help-body">' + outlineHTML(t) + '<div class="wr-help-tpl">' + templateFramesHTML(t) + "</div></div></details>" : "") +
      ideas + "</div>" +
      '<div class="wr-ed-right">' +
      '<section class="card wr-writer">' +
      '<div class="wr-toolbar">' +
      '<div class="wr-timer" data-limit="' + limit * 60 + '">' + ic("timer", 18) + '<span class="wr-time">' + fmtClock(limit * 60) + '</span><span class="wr-time-lbl tiny">còn lại</span></div>' +
      '<button class="btn ghost sm" data-act="pause">' + ic("pause", 15) + " <span>Tạm dừng</span></button>" +
      '<div class="spacer"></div>' +
      '<div class="wr-wc"><div class="wr-wc-num"><b class="wr-wc-n">0</b> / ' + min + ' từ</div><div class="progress"><div class="progress-bar wr-wc-bar" style="width:0%"></div></div></div>' +
      "</div>" +
      '<textarea class="textarea wr-textarea" spellcheck="false" autocomplete="off" autocapitalize="sentences" aria-label="Bài viết" placeholder="' + (task === 1 ? "Bắt đầu bằng câu paraphrase đề bài, sau đó là overview…" : "Mở bài: paraphrase đề + nêu rõ quan điểm của bạn…") + '"></textarea>' +
      '<div class="row between wrap wr-ed-foot"><span class="tiny muted wr-saved">' + ic("check", 13) + " Bản nháp tự lưu mỗi vài giây</span>" +
      '<div class="row wr-gap-sm"><button class="btn ghost sm" data-act="discard">' + ic("trash", 15) + " Xoá nháp</button>" +
      '<button class="btn accent" data-act="submit">' + ic("check", 16) + " Nộp bài</button></div></div></section>" +
      '<section class="card wr-words"><div class="row between"><div class="card-title">' + ic("sparkles", 16) + " Từ nên dùng</div><span class=\"tiny muted wr-used-count\"></span></div>" +
      '<p class="tiny muted">Chip chuyển xanh khi bạn dùng từ trong bài (không phân biệt hoa thường, nhận cả dạng chia đơn giản).</p>' +
      group("today", "Từ vựng hôm nay") + group("prompt", task === 2 ? "Collocation theo chủ đề đề bài" : "Từ khoá cho dạng " + esc(t ? t.name : "")) + "</section>" +
      "</div></div></div>";
  }

  /* ======================================================================
   * MODALS
   * ==================================================================== */
  function openModal(opts) {
    if (typeof I.modal !== "function") { toast("Không mở được hộp thoại.", "error"); return function () {}; }
    return I.modal(opts);
  }

  function openAssess(subId, onSaved) {
    var s = findSub(subId);
    if (!s) return;
    var task = s.kind === "task1" ? 1 : 2, crit = criteriaList(), prev = (s.score && s.score.criteria) || {};
    var bands = []; for (var b = 4; b <= 9.001; b += 0.5) bands.push(b);
    var prevChecks = (s.score && s.score.checklist) || [];
    var src = s.score && s.score.bandSource === "giáo viên" ? "giáo viên" : "tự đánh giá";
    var html = '<div class="wr-assess">' +
      '<p class="small muted">Chọn band cho từng tiêu chí theo mô tả bên dưới. Band tổng là <b>ước tính tham khảo</b>, không phải điểm thi chính thức.</p>' +
      '<div class="wr-assess-grid">' + crit.map(function (c) {
        var v = prev[c.key];
        return '<div class="wr-crit"><label class="field"><span class="field-label">' + esc(c.name) + '</span><select class="select" data-crit="' + esc(c.key) + '"><option value="">— chọn band —</option>' +
          bands.map(function (x) { return '<option value="' + x + '"' + (v === x ? " selected" : "") + ">" + x.toFixed(1) + "</option>"; }).join("") + "</select></label>" +
          '<div class="wr-desc tiny" data-desc="' + esc(c.key) + '">' + (v != null ? esc(descriptor(c.key, task, v)) : "Chọn band để xem mô tả.") + "</div></div>";
      }).join("") + "</div>" +
      '<details class="wr-desc-all"><summary class="small">Xem mô tả band 5 · 6 · 7 · 8 của cả 4 tiêu chí</summary><div class="table-wrap"><table class="table wr-desc-table"><thead><tr><th>Tiêu chí</th><th>5</th><th>6</th><th>7</th><th>8</th></tr></thead><tbody>' +
      crit.map(function (c) { return "<tr><td><b>" + esc(c.key.toUpperCase()) + "</b></td>" + [5, 6, 7, 8].map(function (x) { return "<td>" + esc(descriptor(c.key, task, x)) + "</td>"; }).join("") + "</tr>"; }).join("") +
      "</tbody></table></div></details>" +
      '<div class="row wrap wr-gap-sm wr-assess-row"><label class="field wr-src"><span class="field-label">Nguồn đánh giá</span><select class="select" data-src>' +
      '<option value="tự đánh giá"' + (src === "tự đánh giá" ? " selected" : "") + ">Tự đánh giá</option>" +
      '<option value="giáo viên"' + (src === "giáo viên" ? " selected" : "") + ">Giáo viên chấm</option></select></label>" +
      '<div class="wr-assess-band"><span class="tiny muted">Band tổng (ước tính)</span><b class="wr-ab-val">—</b></div></div>' +
      '<div class="wr-checklist"><div class="field-label">Checklist tự kiểm tra</div>' + CHECKS[task].map(function (c, i) {
        return '<label class="check-row wr-check"><input type="checkbox" class="checkbox" data-chk="' + i + '"' + (prevChecks.indexOf(c) >= 0 ? " checked" : "") + "> <span>" + esc(c) + "</span></label>";
      }).join("") + "</div>" +
      '<p class="tiny muted">Bài: ' + esc(s.title || "") + " · " + ((s.detail || {}).words || 0) + " từ · " + esc(fmtDur(s.seconds || 0)) + "</p></div>";
    var root;
    function read() {
      var vals = {}, all = true;
      crit.forEach(function (c) { var el = root.querySelector('[data-crit="' + c.key + '"]'); var v = el && el.value ? parseFloat(el.value) : null; if (v == null) all = false; vals[c.key] = v; });
      return { vals: vals, all: all };
    }
    function update() {
      var r = read(), sum = 0, n = 0;
      crit.forEach(function (c) {
        var v = r.vals[c.key], d = root.querySelector('[data-desc="' + c.key + '"]');
        if (d) d.textContent = v != null ? descriptor(c.key, task, v) : "Chọn band để xem mô tả.";
        if (v != null) { sum += v; n++; }
      });
      var out = root.querySelector(".wr-ab-val");
      if (out) out.textContent = r.all && n ? fmtBand(roundBand(sum / n)) : "—";
    }
    openModal({
      title: "Tự đánh giá bài " + (task === 1 ? "Task 1" : "Task 2"),
      html: html, wide: true,
      onMount: function (el) { root = el; el.addEventListener("change", update); update(); },
      actions: [
        { label: "Để sau", kind: "ghost", onClick: function (close) { close(); toast("Bài được giữ ở trạng thái Chưa chấm — đánh giá sau trong tab Lịch sử.", "info"); if (onSaved) onSaved(false); } },
        { label: "Lưu đánh giá", kind: "primary", onClick: function (close) {
          var r = read();
          if (!r.all) { toast("Hãy chọn band cho đủ 4 tiêu chí.", "warn"); return; }
          var sum = 0; crit.forEach(function (c) { sum += r.vals[c.key]; });
          var band = roundBand(sum / crit.length);
          var checks = []; root.querySelectorAll("[data-chk]").forEach(function (cb) { if (cb.checked) checks.push(CHECKS[task][+cb.getAttribute("data-chk")]); });
          var srcEl = root.querySelector("[data-src]");
          var cur = findSub(subId) || s;
          var score = Object.assign({}, cur.score || {}, { band: band, criteria: r.vals, bandSource: srcEl ? srcEl.value : "tự đánh giá", status: "assessed", checklist: checks, assessedOn: today() });
          var ok = safe(function () { I.updateSubmission(subId, { score: score }); return true; }, false);
          if (!ok) { toast("Không lưu được đánh giá.", "error"); return; }
          close();
          toast("Đã lưu đánh giá — band ước tính " + fmtBand(band) + ".", "success");
          if (onSaved) onSaved(true);
        } }
      ]
    });
  }

  function openErrorModal(info) {
    // info: { type, title, refId }
    var t = findType(info.type), sugg = (t && t.mistakes) || [];
    var html = '<div class="wr-errform stack">' +
      '<p class="small muted">Ghi lại lỗi bạn hay lặp lại để hệ thống nhắc kiểm tra lại sau 7 ngày.</p>' +
      (sugg.length ? '<div><div class="field-label">Gợi ý lỗi thường gặp của dạng ' + esc(t.name) + ' (bấm để điền)</div><div class="wr-err-sugg">' +
        sugg.map(function (m, i) { return '<button type="button" class="chip" data-sugg="' + i + '">' + esc(m) + "</button>"; }).join("") + "</div></div>" : "") +
      '<label class="field"><span class="field-label">Lỗi lặp lại *</span><input class="input" data-f="error" maxlength="240" placeholder="VD: Quên viết overview / dùng sai thì quá khứ"></label>' +
      '<label class="field"><span class="field-label">Ví dụ của mình</span><textarea class="textarea" data-f="example" rows="2" placeholder="Câu bạn đã viết sai"></textarea></label>' +
      '<label class="field"><span class="field-label">Vì sao sai</span><textarea class="textarea" data-f="why" rows="2"></textarea></label>' +
      '<label class="field"><span class="field-label">Cách sửa</span><textarea class="textarea" data-f="fix" rows="2" placeholder="Câu đúng / quy tắc cần nhớ"></textarea></label>' +
      '<p class="tiny muted">Dạng: ' + esc(t ? t.name : info.type) + " · Nguồn: " + esc(info.title || "") + "</p></div>";
    var root;
    openModal({
      title: "Ghi lỗi vào sổ", html: html,
      onMount: function (el) {
        root = el;
        el.addEventListener("click", function (ev) {
          var b = ev.target.closest("[data-sugg]");
          if (b) { var inp = el.querySelector('[data-f="error"]'); inp.value = sugg[+b.getAttribute("data-sugg")]; inp.focus(); }
        });
        var first = el.querySelector('[data-f="error"]'); if (first) setTimeout(function () { first.focus(); }, 30);
      },
      actions: [
        { label: "Huỷ", kind: "ghost", onClick: function (close) { close(); } },
        { label: "Lưu vào sổ lỗi", kind: "primary", onClick: function (close) {
          var f = {}; root.querySelectorAll("[data-f]").forEach(function (x) { f[x.getAttribute("data-f")] = x.value.trim(); });
          if (!f.error) { toast("Hãy nhập lỗi lặp lại.", "warn"); return; }
          var ok = safe(function () {
            I.addError({ skill: "writing", qtype: info.type, basis: "self", error: f.error, example: f.example, why: f.why, fix: f.fix, source: (info.title || "") + (info.refId ? " (" + info.refId + ")" : "") });
            return true;
          }, false);
          if (!ok) { toast("Không lưu được lỗi.", "error"); return; }
          close(); toast("Đã ghi vào sổ lỗi — sẽ nhắc kiểm tra lại sau 7 ngày.", "success");
        } }
      ]
    });
  }

  function openView(subId) {
    var s = findSub(subId);
    if (!s) return;
    var p = findPrompt(s.refId), d = s.detail || {}, sc = s.score || {}, crit = criteriaList();
    var html = '<div class="wr-view">' +
      '<div class="row wrap wr-gap-xs">' + statusPill(s) + '<span class="pill muted">' + esc(fmtDay(s.day, "full")) + '</span><span class="pill muted">' + (d.words || 0) + " từ</span>" +
      '<span class="pill muted">' + esc(fmtDur(s.seconds || 0)) + "</span>" + (d.revisionOf ? '<span class="pill warn">Bản viết lại</span>' : "") + "</div>" +
      (p ? '<details class="wr-view-prompt"><summary class="small">Xem đề bài</summary>' + promptLinesHTML(p) + (taskOf(p) === 1 && p.chart ? chartHTML(p.chart) : "") + "</details>" : "") +
      '<div class="wr-essay">' + esc(d.text || "") + "</div>" +
      (sc.status === "assessed" && sc.criteria ? '<div class="wr-view-crit"><div class="field-label">Đánh giá (' + esc(sc.bandSource || "") + ") — band ước tính " + fmtBand(sc.band) + '</div><div class="grid g-4">' +
        crit.map(function (c) { return '<div class="card soft stat"><div class="stat-label">' + esc(c.key.toUpperCase()) + '</div><div class="stat-value">' + fmtBand(sc.criteria[c.key]) + '</div><div class="stat-foot">' + esc(c.name) + "</div></div>"; }).join("") + "</div></div>" : "") +
      ((d.usedWords || []).length ? '<div><div class="field-label">Từ gợi ý đã dùng</div><div class="row wrap wr-gap-xs">' + d.usedWords.map(function (w) { return '<span class="chip active">' + esc(w) + "</span>"; }).join("") + "</div></div>" : "") +
      "</div>";
    openModal({
      title: s.title || "Bài viết", html: html, wide: true,
      actions: [
        { label: "Đóng", kind: "ghost", onClick: function (close) { close(); } },
        { label: sc.status === "assessed" ? "Sửa đánh giá" : "Đánh giá", kind: "primary", onClick: function (close) { close(); openAssess(subId, function (saved) { if (saved) refresh(); }); } }
      ]
    });
  }

  function refresh() { safe(function () { I.refresh(); }); }

  /* ======================================================================
   * EDITOR CONTROLLER
   * ==================================================================== */
  function mountEditor(root, p, params) {
    var task = taskOf(p), limit = task === 1 ? 1200 : 2400, min = task === 1 ? 150 : 250, key = draftKey(p.id);
    var dr = getDraft(p.id);
    var E = {
      text: dr ? dr.text || "" : "", seconds: dr ? +dr.seconds || 0 : 0,
      startedAt: (dr && dr.startedAt) || nowISO(),
      revisionOf: (dr && dr.revisionOf) || params.rev || null,
      paused: false, dirty: false, lastSavedSec: dr ? +dr.seconds || 0 : 0, submitted: false
    };
    var ta = root.querySelector(".wr-textarea"), timeEl = root.querySelector(".wr-time"), timerBox = root.querySelector(".wr-timer");
    var lblEl = root.querySelector(".wr-time-lbl"), wcN = root.querySelector(".wr-wc-n"), wcBar = root.querySelector(".wr-wc-bar");
    var savedEl = root.querySelector(".wr-saved"), usedCount = root.querySelector(".wr-used-count");
    var items = wordItemsFor(p);
    if (ta) ta.value = E.text;
    safe(function () { I.beginPractice("writing"); });
    if (dr && (E.text || E.seconds)) toast("Đã mở bản nháp: " + countWords(E.text) + " từ, " + fmtClock(E.seconds) + " đã viết.", "info");

    function renderTimer() {
      var rem = limit - E.seconds;
      if (timeEl) timeEl.textContent = rem >= 0 ? fmtClock(rem) : "+" + fmtClock(-rem);
      if (lblEl) lblEl.textContent = E.paused ? "tạm dừng" : rem >= 0 ? "còn lại" : "quá giờ";
      if (timerBox) {
        timerBox.classList.toggle("over", rem < 0);
        timerBox.classList.toggle("warn", rem >= 0 && rem <= 300);
        timerBox.classList.toggle("paused", E.paused);
      }
    }
    function renderCount() {
      var n = countWords(ta ? ta.value : "");
      if (wcN) wcN.textContent = n;
      if (wcBar) { wcBar.style.width = Math.min(100, Math.round(n / min * 100)) + "%"; wcBar.parentNode.classList.toggle("wr-wc-ok", n >= min); }
      var wc = root.querySelector(".wr-wc"); if (wc) wc.classList.toggle("ok", n >= min);
    }
    function renderUsed() {
      var text = ta ? ta.value : "", used = 0;
      items.forEach(function (it, i) {
        it.used = !!(it.re && it.re.test(text));
        if (it.used) used++;
        var chip = root.querySelector('.wr-wchip[data-w="' + i + '"]');
        if (chip) chip.classList.toggle("used", it.used);
      });
      if (usedCount) usedCount.textContent = items.length ? used + "/" + items.length + " đã dùng" : "";
    }
    function saveDraft(force) {
      if (E.submitted) return;
      E.text = ta ? ta.value : E.text;
      if (!E.text.trim() && E.seconds < 30) return;
      if (!force && !E.dirty && Math.abs(E.seconds - E.lastSavedSec) < 15) return;
      drafts()[key] = { promptId: p.id, task: task, text: E.text, seconds: Math.round(E.seconds), startedAt: E.startedAt, revisionOf: E.revisionOf || null, updatedAt: nowISO() };
      persist();
      E.dirty = false; E.lastSavedSec = E.seconds;
      if (savedEl) savedEl.innerHTML = ic("check", 13) + " Đã lưu nháp lúc " + hhmmss();
    }

    var last = Date.now();
    var tick = setInterval(function () {
      var now = Date.now(), dt = (now - last) / 1000; last = now;
      if (E.submitted || E.paused || document.visibilityState === "hidden") return;
      E.seconds += Math.min(dt, 5);
      renderTimer();
    }, 1000);
    var autosave = setInterval(function () { saveDraft(false); }, 4000);
    var inputTimer = null;
    function onInput() {
      E.dirty = true; renderCount();
      clearTimeout(inputTimer); inputTimer = setTimeout(renderUsed, 160);
    }
    if (ta) {
      ta.addEventListener("input", onInput);
      ta.addEventListener("keydown", function (ev) {
        if ((ev.ctrlKey || ev.metaKey) && (ev.key === "s" || ev.key === "S")) { ev.preventDefault(); saveDraft(true); toast("Đã lưu nháp.", "success"); }
      });
      setTimeout(function () { try { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); } catch (e) { /* ignore */ } }, 40);
    }
    function onUnload() { saveDraft(true); }
    window.addEventListener("beforeunload", onUnload);
    var leave = function () {
      if (!E.submitted && ta && (ta.value.trim() || E.seconds >= 30)) {
        var unsaved = E.dirty;
        saveDraft(true);
        if (unsaved) toast("Đã lưu bản nháp — bạn có thể viết tiếp bất cứ lúc nào.", "info");
      }
      return true;
    };
    I.confirmLeave = leave;
    renderTimer(); renderCount(); renderUsed();

    function setPaused(v) {
      E.paused = v; last = Date.now();
      var b = root.querySelector('[data-act="pause"]');
      if (b) b.innerHTML = ic(v ? "play" : "pause", 15) + " <span>" + (v ? "Tiếp tục" : "Tạm dừng") + "</span>";
      renderTimer();
    }

    function submitNow(btn) {
      var text = ta ? ta.value : "";
      var n = countWords(text);
      var used = items.filter(function (it) { return it.re && it.re.test(text); }).map(function (it) { return it.word; });
      var detail = { text: text, words: n, usedWords: used, type: p.type };
      if (E.revisionOf) detail.revisionOf = E.revisionOf;
      var sub = null;
      try {
        sub = I.recordSubmission({
          skill: "writing", kind: task === 1 ? "task1" : "task2", refId: p.id, title: p.title,
          seconds: Math.max(1, Math.round(E.seconds)), clientKey: "writing:" + p.id + ":" + E.startedAt,
          practiceHint: task === 2 && (dailyPrompt(false) || {}).id === p.id ? { daily: 1 } : null,
          score: { band: null, status: "ungraded" }, detail: detail
        });
      } catch (e) { sub = null; }
      if (!sub) { toast("Không nộp được bài — bản nháp vẫn được giữ.", "error"); if (btn) btn.disabled = false; return; }
      E.submitted = true;
      clearInterval(tick); clearInterval(autosave);
      delete drafts()[key]; persist();
      if (I.confirmLeave === leave) I.confirmLeave = null;
      showSubmitted(sub);
      openAssess(sub.id, function () { updateDoneCard(sub.id); });
    }
    function showSubmitted(sub) {
      var host = root.querySelector(".wr-ed-right");
      if (!host) return;
      var d = sub.detail || {};
      host.innerHTML = '<section class="card tape pad-lg wr-done">' +
        '<div class="wr-done-badge">' + ic("check", 30) + "</div>" +
        '<h2 class="wr-done-title">Đã nộp bài!</h2>' +
        '<p class="small muted">Bài đã được lưu vào lịch sử và cộng ' + esc(fmtDur(sub.seconds || 0)) + " vào thời gian học Writing hôm nay.</p>" +
        '<div class="grid g-3 wr-done-stats"><div class="stat"><div class="stat-label">Số từ</div><div class="stat-value">' + (d.words || 0) + '</div><div class="stat-foot">tối thiểu ' + min + '</div></div>' +
        '<div class="stat"><div class="stat-label">Thời gian</div><div class="stat-value">' + fmtClock(sub.seconds || 0) + '</div><div class="stat-foot">gợi ý ' + (limit / 60) + " phút</div></div>" +
        '<div class="stat"><div class="stat-label">Band (ước tính)</div><div class="stat-value wr-done-band">—</div><div class="stat-foot wr-done-src">chưa đánh giá</div></div></div>' +
        ((d.usedWords || []).length ? '<p class="small">Bạn đã dùng ' + d.usedWords.length + " từ gợi ý: " + d.usedWords.map(function (w) { return "<b>" + esc(w) + "</b>"; }).join(", ") + "</p>" : "") +
        '<div class="row wrap wr-gap-sm wr-done-actions">' +
        '<button class="btn sk" data-act="assess" data-sid="' + esc(sub.id) + '">' + ic("award", 16) + " Tự đánh giá</button>" +
        '<button class="btn ghost" data-act="err" data-sid="' + esc(sub.id) + '">' + ic("alert-triangle", 16) + " Ghi lỗi vào sổ</button>" +
        '<button class="btn ghost" data-act="rewrite" data-sid="' + esc(sub.id) + '">' + ic("rotate-ccw", 16) + " Viết lại đề này</button>" +
        '<button class="btn primary" data-act="tab" data-tab="history" data-sub="' + esc(sub.kind) + '">' + ic("clock", 16) + " Xem lịch sử</button></div>" +
        '<details class="wr-help-done"><summary class="small">Xem lại bài đã nộp</summary><div class="wr-essay wr-essay-sm">' + esc(d.text || "") + "</div></details></section>";
      updateDoneCard(sub.id);
    }
    function updateDoneCard(id) {
      var s = findSub(id), b = root.querySelector(".wr-done-band"), src = root.querySelector(".wr-done-src");
      if (!s || !b) return;
      if (s.score && s.score.status === "assessed") { b.textContent = fmtBand(s.score.band); if (src) src.textContent = s.score.bandSource || "đã đánh giá"; }
    }

    var ctrl = {
      onAction: function (act, el) {
        if (act === "pause") { setPaused(!E.paused); return true; }
        if (act === "submit") {
          if (E.submitted) return true;
          var text = ta ? ta.value : "", n = countWords(text);
          if (!text.trim()) { toast("Bài viết đang trống.", "warn"); return true; }
          el.disabled = true;
          var msg = n < min
            ? "Bài mới có " + n + " từ, chưa đạt tối thiểu " + min + " từ (bài thi thật sẽ bị trừ điểm Task Achievement/Response). Vẫn nộp?"
            : "Nộp bài " + n + " từ? Sau khi nộp bạn có thể tự đánh giá ngay hoặc để sau.";
          confirmBox(msg, { okLabel: "Nộp bài" }).then(function (ok) {
            if (ok) submitNow(el); else el.disabled = false;
          });
          return true;
        }
        if (act === "discard") {
          confirmBox("Xoá bản nháp và bắt đầu lại từ đầu? Thao tác này không hoàn tác được.", { okLabel: "Xoá nháp", danger: true }).then(function (ok) {
            if (!ok) return;
            delete drafts()[key]; persist();
            if (ta) ta.value = "";
            E.text = ""; E.seconds = 0; E.lastSavedSec = 0; E.dirty = false; E.startedAt = nowISO();
            renderTimer(); renderCount(); renderUsed();
            if (savedEl) savedEl.innerHTML = ic("check", 13) + " Đã xoá nháp";
          });
          return true;
        }
        if (act === "exit") { go({ tab: "task" + task, type: p.type }); return true; }
        return false;
      },
      cleanup: function () {
        clearInterval(tick); clearInterval(autosave); clearTimeout(inputTimer);
        saveDraft(true);
        window.removeEventListener("beforeunload", onUnload);
        if (I.confirmLeave === leave) I.confirmLeave = null;
      }
    };
    return ctrl;
  }

  /* ======================================================================
   * PAGE
   * ==================================================================== */
  function resolve(params) {
    params = params || {};
    if (params.daily === "1" || params.daily === 1 || params.daily === true) {
      var dp = dailyPrompt(false);
      if (dp) return { view: "editor", prompt: dp, daily: true };
    }
    if (params.start) {
      var sp = findPrompt(params.start);
      if (sp) return { view: "editor", prompt: sp };
    }
    var tab = params.tab === "task2" || params.tab === "history" ? params.tab : "task1";
    if (params.type && tab !== "history") {
      var t = findType(params.type);
      if (t) { var tk = taskOfType(t.id); return { view: "guide", task: tk, type: t, tab: "task" + tk }; }
    }
    if (tab === "history") return { view: "history", tab: tab };
    return { view: "home", task: tab === "task2" ? 2 : 1, tab: tab };
  }

  function render(params) {
    var r = resolve(params);
    if (r.view === "editor") return editorHTML(r.prompt, Object.assign({}, params, { daily: r.daily ? 1 : params.daily }));
    var body = r.view === "guide" ? guideHTML(r.task, r.type) : r.view === "history" ? historyHTML(params || {}) : homeHTML(r.task);
    return '<div class="page sk-writing wr-page">' + headHTML(r.tab) + '<div class="wr-body">' + body + "</div></div>";
  }

  function mount(root, params) {
    params = params || {};
    var r = resolve(params), ctrl = null;
    if (r.view === "editor") {
      if (r.daily) dailyPrompt(true);
      ctrl = mountEditor(root, r.prompt, params);
    } else if (r.view === "home") {
      dailyPrompt(true);
    }
    function onClick(ev) {
      var el = ev.target.closest("[data-act]");
      if (!el || !root.contains(el)) return;
      var act = el.getAttribute("data-act");
      if (ctrl && ctrl.onAction(act, el)) { ev.preventDefault(); return; }
      switch (act) {
        case "tab": {
          var tp = { tab: el.getAttribute("data-tab") };
          if (el.getAttribute("data-sub")) tp.sub = el.getAttribute("data-sub");
          go(tp); break;
        }
        case "type": go({ tab: "task" + taskOfType(el.getAttribute("data-type")), type: el.getAttribute("data-type") }); break;
        case "open": go({ start: el.getAttribute("data-id") }); break;
        case "daily": go({ daily: 1 }); break;
        case "hsub": go({ tab: "history", sub: el.getAttribute("data-sub") }); break;
        case "jump-bank": {
          ev.preventDefault();
          var b = root.querySelector("#wr-bank"); if (b) b.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "random": {
          var typeId = el.getAttribute("data-type"), ps = promptsOf(taskOfType(typeId)).filter(function (p) { return p.type === typeId; });
          var todo = ps.filter(function (p) { return !subsFor(p.id).length; });
          var pool = todo.length ? todo : ps;
          if (pool.length) go({ start: pool[Math.floor(Math.random() * pool.length)].id });
          break;
        }
        case "topic": {
          var tpc = el.getAttribute("data-topic");
          root.querySelectorAll('.wr-topic-filter [data-act="topic"]').forEach(function (c) { c.classList.toggle("active", c === el); });
          root.querySelectorAll(".wr-prompt-item").forEach(function (it) { it.hidden = !!tpc && it.getAttribute("data-topic") !== tpc; });
          break;
        }
        case "assess": openAssess(el.getAttribute("data-sid"), function (saved) {
          if (!saved) return;
          if (r.view === "history") refresh();
          else {
            var s = findSub(el.getAttribute("data-sid")), bb = root.querySelector(".wr-done-band"), src = root.querySelector(".wr-done-src");
            if (s && bb && s.score) { bb.textContent = fmtBand(s.score.band); if (src) src.textContent = s.score.bandSource || ""; }
          }
        }); break;
        case "view": openView(el.getAttribute("data-sid")); break;
        case "err": {
          var s2 = findSub(el.getAttribute("data-sid"));
          if (s2) openErrorModal({ type: (findPrompt(s2.refId) || {}).type || (s2.detail || {}).type, title: s2.title, refId: s2.refId });
          break;
        }
        case "rewrite": {
          var s3 = findSub(el.getAttribute("data-sid"));
          if (!s3) break;
          var existing = getDraft(s3.refId);
          if (existing && existing.text && existing.text.trim() && existing.revisionOf !== s3.id) {
            confirmBox("Đề này đang có một bản nháp chưa nộp. Mở bản nháp đó để viết tiếp?", { okLabel: "Mở bản nháp" }).then(function (ok) { if (ok) go({ start: s3.refId }); });
          } else go({ start: s3.refId, rev: s3.id });
          break;
        }
        default: return;
      }
    }
    root.addEventListener("click", onClick);
    return function () {
      root.removeEventListener("click", onClick);
      if (ctrl) ctrl.cleanup();
    };
  }

  I.registerPage({ id: "writing", label: "Writing", icon: "pen-line", skill: "writing", group: "practice", order: 6, render: render, mount: mount });

  /* small debug/test hook (no side effects) */
  I._writing = { chartHTML: chartHTML, buildMatcher: buildMatcher, countWords: countWords, dailyPrompt: function () { return dailyPrompt(false); } };
})();
