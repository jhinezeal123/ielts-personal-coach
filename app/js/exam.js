/* IELTS Coach — js/exam.js (builder B)
 * Shared CD-IELTS style exam engine for Listening + Reading: IELTS.exam
 *  - grading (normalisation, variants, word limits, word banks, multi, match, tfng)
 *  - question-group rendering (gap/mcq/multi/match/tfng incl. tables, flow-charts, images)
 *  - exam shell controller (top bar, part header, split pane, highlighter, bottom navigator,
 *    flags, countdown, drafts in IELTS.state.drafts["exam:<key>"], auto-submit)
 *  - review rendering + "Ghi vào sổ lỗi" modal + shared result/analysis widgets (IELTS.exam.ui)
 */
(function () {
  "use strict";
  var I = (window.IELTS = window.IELTS || {});

  /* ------------------------------------------------------------------ *
   * small utils
   * ------------------------------------------------------------------ */
  function esc(s) {
    if (typeof I.esc === "function") return I.esc(s);
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ic(name, size) {
    try { return typeof I.icon === "function" ? I.icon(name, size || 18) : ""; } catch (e) { return ""; }
  }
  function api(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    try { return typeof I[name] === "function" ? I[name].apply(I, args) : undefined; }
    catch (e) { if (window.console) console.warn("[exam] " + name + " failed", e); return undefined; }
  }
  function toast(msg, kind) { if (typeof I.toast === "function") I.toast(msg, kind || "info"); }
  function toArr(v) { return v == null ? [] : Array.isArray(v) ? v : [v]; }
  function up(s) { return String(s == null ? "" : s).trim().toUpperCase(); }
  function decodeEnt(s) {
    return s.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'").replace(/&ndash;/g, "–").replace(/&mdash;/g, "—").replace(/&amp;/g, "&");
  }
  function stripTags(h, sep) {
    sep = sep == null ? " " : sep;
    return decodeEnt(String(h == null ? "" : h)
      .replace(/<br\s*\/?>/gi, sep)
      .replace(/<\/(p|div|li|td|th|tr|h\d|ul|ol)>/gi, sep)
      .replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
  }
  function clip(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s; }
  function fmtClock(sec) {
    sec = Math.max(0, Math.ceil(sec || 0));
    if (typeof I.fmtClock === "function") { try { return I.fmtClock(sec); } catch (e) { /* fallthrough */ } }
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    var p = function (x) { return (x < 10 ? "0" : "") + x; };
    return (h ? h + ":" + p(m) : p(m)) + ":" + p(s);
  }
  function fmtDur(sec) {
    if (typeof I.fmtDuration === "function") { try { return I.fmtDuration(sec); } catch (e) { /* fallthrough */ } }
    var m = Math.round((sec || 0) / 60); return m + " phút";
  }
  function fmtBand(b) {
    if (typeof I.fmtBand === "function") { try { return I.fmtBand(b); } catch (e) { /* fallthrough */ } }
    return b == null ? "—" : Number(b).toFixed(1);
  }
  function lev(a, b) {
    a = String(a); b = String(b);
    if (Math.abs(a.length - b.length) > 3) return 9;
    var prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      for (j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  }

  /* ------------------------------------------------------------------ *
   * Question types (names + advice), robust to QTYPES shape
   * ------------------------------------------------------------------ */
  var FALLBACK_TYPES = {
    listening: { form: "Form Completion", note: "Note Completion", table: "Table Completion", flow: "Flow-chart Completion",
      summary: "Summary Completion", sentence: "Sentence Completion", mcq: "Multiple Choice", "mcq-multi": "Multiple Choice (chọn 2)",
      matching: "Matching", map: "Map/Plan Labelling", diagram: "Diagram Labelling", short: "Short Answer" },
    reading: { tfng: "True/False/Not Given", ynng: "Yes/No/Not Given", headings: "Matching Headings", info: "Matching Information",
      features: "Matching Features", endings: "Matching Sentence Endings", mcq: "Multiple Choice", "mcq-multi": "Multiple Choice (chọn 2)",
      sentence: "Sentence Completion", summary: "Summary Completion", note: "Note/Table/Flow-chart Completion",
      diagram: "Diagram Label Completion", short: "Short Answer" }
  };
  function qtypeKeys(skill) {
    var Q = I.QTYPES && I.QTYPES[skill];
    if (Array.isArray(Q)) return Q.map(function (x) { return x && (x.key || x.id); }).filter(Boolean);
    if (Q && typeof Q === "object") return Object.keys(Q);
    return Object.keys(FALLBACK_TYPES[skill] || {});
  }
  function qtype(skill, key) {
    var Q = I.QTYPES && I.QTYPES[skill], e = null, name = "", advice = "";
    if (Array.isArray(Q)) e = Q.filter(function (x) { return x && (x.key === key || x.id === key); })[0];
    else if (Q) e = Q[key];
    if (typeof e === "string") name = e;
    else if (e) { name = e.name || e.label || ""; advice = e.advice || e.tip || ""; }
    return { key: key, name: name || (FALLBACK_TYPES[skill] || {})[key] || key || "—", advice: advice };
  }

  /* ------------------------------------------------------------------ *
   * Grader
   * ------------------------------------------------------------------ */
  var NUMW = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };

  function normalize(s) {
    return String(s == null ? "" : s)
      .replace(/[‘’‛ʼ´`]/g, "'").replace(/[“”]/g, '"')
      .replace(/[–—−]/g, "-").replace(/ /g, " ")
      .trim().toLowerCase().replace(/\s+/g, " ")
      .replace(/[.,;!?]+$/, "").trim();
  }
  /* "ONE WORD AND/OR A NUMBER" → {words:1, number:true}; "NO MORE THAN TWO WORDS" → {words:2, number:false};
     "A NUMBER" → {words:0, number:true}; unparseable ("ONE LETTER") → null (no limit). */
  function parseWordLimit(s) {
    if (s == null || s === "") return null;
    if (typeof s === "number") return s > 0 ? { words: s, number: false } : null;
    if (typeof s === "object") return s.words != null ? s : null;
    var t = String(s).toUpperCase();
    var number = /\bNUMBERS?\b/.test(t);
    var m = t.match(/\b(ONE|TWO|THREE|FOUR|FIVE|SIX|\d+)\s+WORDS?\b/);
    var words = m ? (/^\d+$/.test(m[1]) ? +m[1] : NUMW[m[1].toLowerCase()]) : null;
    if (words == null) { if (number && /\bA\s+NUMBER\b/.test(t)) words = 0; else return null; }
    return { words: words, number: number };
  }
  var NUM_RE = /^[£$€¥]?\d[\d.,:\/]*(?:%|s|am|pm|a\.m|p\.m|st|nd|rd|th|kg|km|cm|mm|m|ml|g|h|hrs?)?$/i;
  function tokensForLimit(s) {
    var n = normalize(s);
    if (!n) return [];
    // a run of pure digit groups separated by spaces ("07946 381 225") counts as ONE number
    n = n.replace(/\b\d+(?: \d+)+\b/g, function (x) { return x.replace(/ /g, ""); });
    return n.split(" ");
  }
  function countWords(s) { return tokensForLimit(s).length; }
  function withinLimit(s, lim) {
    lim = parseWordLimit(lim);
    if (!lim) return true;
    var t = tokensForLimit(s);
    if (!lim.number) return t.length <= lim.words;
    var nums = t.filter(function (x) { return NUM_RE.test(x); }).length;
    var words = t.length - Math.min(nums, 1); // extra numbers count as words
    return words <= lim.words;
  }
  function stripArticle(n) { return n.replace(/^(a|an|the) /, ""); }
  function variantForms(v) {
    var base = String(v == null ? "" : v), out = {};
    function add(x) { var n = normalize(x); if (n) { out[n] = 1; out[stripArticle(n)] = 1; } }
    if (/\(.*?\)/.test(base)) { add(base.replace(/[()]/g, "")); add(base.replace(/\([^)]*\)/g, " ")); }
    else add(base);
    return out;
  }
  /* Free-text gap grading. Exact listed variant → correct. A match that needs an article dropped
     ("the station" vs "station") is only correct when the user's answer respects the word limit. */
  function gradeGap(raw, variants, wordLimit) {
    var u = normalize(raw);
    if (!u) return { correct: false, over: false, blank: true };
    var over = !withinLimit(u, wordLimit);
    var exact = false, loose = false, us = stripArticle(u);
    toArr(variants).forEach(function (v) {
      var f = variantForms(v);
      if (f[u]) exact = true; else if (f[us]) loose = true;
    });
    var correct = exact || (loose && !over);
    return { correct: correct, over: over && !correct, blank: false };
  }

  /* options: ["A text", "B text"] | [{key, text}] | ["text", "text"] → [{key, text}] */
  function optionList(opts) {
    var arr = toArr(opts);
    var parsed = arr.map(function (o, i) {
      var letter = String.fromCharCode(65 + i);
      if (o && typeof o === "object") return { key: String(o.key != null ? o.key : letter), text: o.text != null ? String(o.text) : "", obj: true };
      var s = String(o == null ? "" : o).trim();
      return { key: letter, text: s, m: s.match(/^([A-Z])(?:[.):]\s*|\s+|$)([\s\S]*)$/) };
    });
    var keyed = parsed.every(function (p, i) { return p.obj || (p.m && p.m[1] === String.fromCharCode(65 + i)); });
    return parsed.map(function (p) {
      if (p.obj) return { key: p.key, text: p.text };
      if (keyed && p.m) return { key: p.m[1], text: p.m[2] };
      return { key: p.key, text: p.text };
    });
  }
  function optText(opts, key) {
    var o = opts.filter(function (x) { return up(x.key) === up(key); })[0];
    return o ? o.text : "";
  }
  function bankKey(v, bank) {
    var s = String(v == null ? "" : v).trim();
    var hit = bank.filter(function (o) { return up(o.key) === up(s); })[0];
    if (hit) return hit.key;
    var m = s.match(/^([A-Z])[\s.)]/);
    if (m && bank.some(function (o) { return o.key === m[1]; })) return m[1];
    var t = bank.filter(function (o) { return normalize(o.text) === normalize(s); })[0];
    return t ? t.key : s;
  }
  function placeholders(content) {
    var out = [], re = /\{\{\s*(\d+)\s*\}\}/g, m;
    while ((m = re.exec(String(content || "")))) out.push(+m[1]);
    return out;
  }
  function groupNumbers(g) {
    if (!g) return [];
    var out = [];
    if (g.kind === "gap") {
      var keys = Object.keys(g.answers || {}).map(Number).filter(function (n) { return !isNaN(n); });
      if (keys.length) out = keys;
      else if (placeholders(g.content).length) out = placeholders(g.content);
      else if (g.range && g.range.length === 2) for (var i = +g.range[0]; i <= +g.range[1]; i++) out.push(i);
    } else if (g.kind === "multi") {
      (g.questions || []).forEach(function (q) { toArr(q.ns).forEach(function (n) { out.push(+n); }); });
    } else {
      (g.questions || []).forEach(function (q) { if (q && q.n != null) out.push(+q.n); });
    }
    var seen = {};
    return out.filter(function (n) { if (seen[n]) return false; seen[n] = 1; return true; }).sort(function (a, b) { return a - b; });
  }
  function rangeLabel(nums) {
    if (!nums.length) return "";
    var a = nums[0], b = nums[nums.length - 1];
    return a === b ? "Question " + a : "Questions " + a + "–" + b;
  }

  function gradeGroups(groups, answers) {
    answers = answers || {};
    var res = [];
    toArr(groups).forEach(function (g) {
      if (!g) return;
      var type = g.type || g.kind;
      if (g.kind === "gap") {
        var bank = g.wordBank && g.wordBank.length ? optionList(g.wordBank) : null;
        groupNumbers(g).forEach(function (n) {
          var raw = answers[n] == null ? "" : String(answers[n]);
          var variants = toArr((g.answers || {})[n]);
          if (bank) {
            // word bank: grade by letter only (case-insensitive); no word-count rule
            var keys = variants.map(function (v) { return bankKey(v, bank); });
            var u = raw.trim();
            res.push({ n: n, type: type, correct: !!u && keys.some(function (k) { return up(k) === up(u); }), user: u, answer: keys.join(" / ") });
          } else {
            var r = gradeGap(raw, variants, g.wordLimit);
            var item = { n: n, type: type, correct: r.correct, user: raw.trim(), answer: variants.join(" / ") };
            if (r.over) item.over = true;
            res.push(item);
          }
        });
      } else if (g.kind === "multi") {
        (g.questions || []).forEach(function (q) {
          var ns = toArr(q.ns).map(Number).sort(function (a, b) { return a - b; });
          var ans = toArr(q.answer).map(up);
          var seen = {};
          var user = ns.map(function (n) { return up(answers[n]); }).filter(function (l) { if (!l || seen[l]) return false; seen[l] = 1; return true; });
          var matched = user.filter(function (l) { return ans.indexOf(l) >= 0; });
          var wrong = user.filter(function (l) { return ans.indexOf(l) < 0; });
          var rest = ans.filter(function (l) { return matched.indexOf(l) < 0; });
          var pairs = matched.map(function (l) { return [l, l]; })
            .concat(wrong.map(function (l, i) { return [l, rest[i] || ""]; }))
            .concat(rest.slice(wrong.length).map(function (l) { return ["", l]; }));
          ns.forEach(function (n, i) {
            var p = pairs[i] || ["", ans[i] || ""];
            res.push({ n: n, type: type, correct: !!p[0] && p[0] === p[1], user: p[0], answer: p[1] });
          });
        });
      } else if (g.kind === "mcq" || g.kind === "match" || g.kind === "tfng") {
        (g.questions || []).forEach(function (q) {
          var u = answers[q.n] == null ? "" : String(answers[q.n]).trim();
          var a = String(q.answer == null ? "" : q.answer).trim();
          var ok = !!u && up(u).replace(/\s+/g, " ") === up(a).replace(/\s+/g, " ");
          res.push({ n: +q.n, type: type, correct: ok, user: g.kind === "tfng" ? up(u) : u, answer: g.kind === "tfng" ? up(a) : a });
        });
      }
    });
    res.sort(function (a, b) { return a.n - b.n; });
    return res;
  }
  function summarize(results) {
    var total = (results || []).length, raw = (results || []).filter(function (r) { return r.correct; }).length;
    return { raw: raw, total: total, accuracy: total ? Math.round(raw / total * 1000) / 10 : 0 };
  }
  function byType(results, skill) {
    var map = {}, order = [];
    (results || []).forEach(function (r) {
      if (!map[r.type]) { map[r.type] = { type: r.type, name: qtype(skill, r.type).name, correct: 0, total: 0 }; order.push(r.type); }
      map[r.type].total++; if (r.correct) map[r.type].correct++;
    });
    return order.map(function (k) { var m = map[k]; m.acc = m.total ? Math.round(m.correct / m.total * 100) : 0; return m; });
  }

  /* ------------------------------------------------------------------ *
   * Drafts
   * ------------------------------------------------------------------ */
  function drafts() {
    if (!I.state) return null;
    if (!I.state.drafts || typeof I.state.drafts !== "object") I.state.drafts = {};
    return I.state.drafts;
  }
  function persist() { try { if (typeof I.save === "function") I.save(); } catch (e) { /* save shows its own toast */ } }
  function loadDraft(key) { var d = drafts(); return d && d[key] ? d[key] : null; }
  function saveDraft(key, val) { var d = drafts(); if (!d) return; d[key] = val; persist(); }
  function clearDraft(key) { var d = drafts(); if (d && Object.prototype.hasOwnProperty.call(d, key)) { delete d[key]; persist(); } }
  function draftSummary(d) {
    if (!d) return "";
    var bits = [];
    if (d.total) bits.push((d.answered || 0) + "/" + d.total + " câu");
    if (d.partLabel) bits.push(d.partLabel);
    if (typeof d.remaining === "number" && d.remaining > 0) bits.push("còn " + fmtClock(d.remaining));
    return bits.join(" · ");
  }

  /* ------------------------------------------------------------------ *
   * Rendering question groups
   * ------------------------------------------------------------------ */
  function isPlaceholderOptions(opts) {
    return opts.every(function (o) { return !o.text || /^(location|place|building|point|area)\s+[A-Z]$/i.test(stripTags(o.text)) || up(stripTags(o.text)) === up(o.key); });
  }
  function groupHtml(g, uid, gi) {
    var nums = groupNumbers(g);
    var instrU = up(stripTags(g.instruction || ""));
    var head = '<header class="qg-head"><h3 class="qg-range">' + esc(rangeLabel(nums)) + "</h3>" +
      (g.instruction ? '<div class="qg-instr">' + g.instruction + "</div>" : "") +
      (g.kind === "gap" && g.wordLimit && !g.wordBank && parseWordLimit(g.wordLimit) && instrU.indexOf(up(g.wordLimit)) < 0
        ? '<p class="qg-limit">Write <b>' + esc(g.wordLimit) + "</b> for each answer.</p>" : "") +
      "</header>";
    var body = "";
    if (g.kind === "gap") body = gapBody(g);
    else if (g.kind === "mcq") body = mcqBody(g, uid);
    else if (g.kind === "multi") body = multiBody(g);
    else if (g.kind === "match") body = matchBody(g);
    else if (g.kind === "tfng") body = tfngBody(g, uid);
    else body = '<p class="muted small">Dạng câu hỏi này chưa được hỗ trợ.</p>';
    return '<section class="qg qg-' + esc(g.kind || "x") + '" data-g="' + gi + '" data-type="' + esc(g.type || "") + '">' + head + body + "</section>";
  }
  function gapBody(g) {
    var bank = g.wordBank && g.wordBank.length ? optionList(g.wordBank) : null;
    function ctl(n) {
      if (bank) {
        return '<span class="gap" data-qbox="' + n + '"><select class="gap-select" data-qn="' + n + '" aria-label="Câu ' + n + '">' +
          '<option value="">' + n + "</option>" +
          bank.map(function (o) { return '<option value="' + esc(o.key) + '">' + esc(o.key) + (o.text ? " — " + esc(clip(stripTags(o.text), 34)) : "") + "</option>"; }).join("") +
          "</select></span>";
      }
      return '<span class="gap" data-qbox="' + n + '"><input class="gap-input" type="text" data-qn="' + n + '" placeholder="' + n +
        '" aria-label="Câu ' + n + '" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="80"></span>';
    }
    var content = String(g.content || "");
    var has = placeholders(content).length > 0;
    content = content.replace(/\{\{\s*(\d+)\s*\}\}/g, function (m, n) { return ctl(+n); });
    if (!has) content += '<ol class="qg-gaplist">' + groupNumbers(g).map(function (n) { return '<li><span class="q-num">' + n + "</span> " + ctl(n) + "</li>"; }).join("") + "</ol>";
    var bankHtml = bank ? '<div class="qg-box"><div class="qg-box-title">' + esc(g.optionsTitle || g.bankTitle || "Word bank") + '</div><ul class="qg-bank">' +
      bank.map(function (o) { return "<li><b>" + esc(o.key) + "</b><span>" + o.text + "</span></li>"; }).join("") + "</ul></div>" : "";
    var title = g.title && !/<h[1-6][\s>]/i.test(g.content || "") ? '<h4 class="qg-title">' + g.title + "</h4>" : "";
    var main = '<div class="qg-content">' + title + content + "</div>";
    if (g.image) return '<div class="qg-media-grid"><figure class="qg-figure">' + g.image + "</figure>" + main + "</div>" + bankHtml;
    return main + bankHtml;
  }
  function keyLabel(o) { return '<span class="q-key">' + esc(o.key) + "</span>"; }
  function mcqBody(g, uid) {
    return '<div class="q-list">' + (g.questions || []).map(function (q) {
      return '<div class="q q-mcq" data-qbox="' + q.n + '"><div class="q-stem"><span class="q-num">' + q.n + '</span><span class="q-text">' + (q.text || "") + "</span></div>" +
        '<div class="q-opts">' + optionList(q.options).map(function (o) {
          return '<label class="q-opt"><input type="radio" name="' + uid + "-" + q.n + '" value="' + esc(o.key) + '" data-qn="' + q.n + '">' + keyLabel(o) + '<span class="q-otext">' + o.text + "</span></label>";
        }).join("") + "</div></div>";
    }).join("") + "</div>";
  }
  function multiBody(g) {
    return '<div class="q-list">' + (g.questions || []).map(function (q) {
      var ns = toArr(q.ns).map(Number).sort(function (a, b) { return a - b; });
      var nsAttr = ns.join(" ");
      return '<div class="q q-multi" data-qbox="' + ns[0] + '" data-qns="' + nsAttr + '"><div class="q-stem"><span class="q-num">' + ns[0] + (ns.length > 1 ? "–" + ns[ns.length - 1] : "") +
        '</span><span class="q-text">' + (q.text || "") + "</span></div>" +
        '<div class="q-opts">' + optionList(q.options).map(function (o) {
          return '<label class="q-opt"><input type="checkbox" value="' + esc(o.key) + '" data-qns="' + nsAttr + '">' + keyLabel(o) + '<span class="q-otext">' + o.text + "</span></label>";
        }).join("") + '</div><p class="q-hint tiny">Chọn ' + ns.length + " đáp án.</p></div>";
    }).join("") + "</div>";
  }
  function matchBody(g) {
    var opts = optionList(g.options);
    var showBox = opts.length && !isPlaceholderOptions(opts);
    var instr = up(stripTags(g.instruction || ""));
    var box = showBox ? '<div class="qg-box"><div class="qg-box-title">' + esc(g.optionsTitle || "Options") + '</div><ul class="qg-opts-list">' +
      opts.map(function (o) { return '<li data-optkey="' + esc(o.key) + '"><b>' + esc(o.key) + "</b><span>" + o.text + "</span></li>"; }).join("") + "</ul>" +
      (g.allowReuse && instr.indexOf("MORE THAN ONCE") < 0 ? '<p class="qg-note">You may use any letter more than once.</p>' : "") + "</div>" : "";
    var list = '<div class="q-list">' + (g.questions || []).map(function (q) {
      return '<div class="q q-match" data-qbox="' + q.n + '"><span class="q-num">' + q.n + '</span><span class="q-text">' + (q.text || "") + "</span>" +
        '<select class="q-select" data-qn="' + q.n + '" aria-label="Câu ' + q.n + '"><option value=""></option>' +
        opts.map(function (o) { return '<option value="' + esc(o.key) + '">' + esc(o.key) + "</option>"; }).join("") + "</select></div>";
    }).join("") + "</div>";
    if (g.image) return '<div class="qg-media-grid"><figure class="qg-figure">' + g.image + '</figure><div class="qg-content">' + list + box + "</div></div>";
    return box + list;
  }
  function tfngBody(g, uid) {
    var vals = (g.variant || (g.type === "ynng" ? "ynng" : "tfng")) === "ynng" ? ["YES", "NO", "NOT GIVEN"] : ["TRUE", "FALSE", "NOT GIVEN"];
    return '<div class="q-list">' + (g.questions || []).map(function (q) {
      return '<div class="q q-tfng" data-qbox="' + q.n + '"><div class="q-stem"><span class="q-num">' + q.n + '</span><span class="q-text">' + (q.text || "") + "</span></div>" +
        '<div class="q-tf">' + vals.map(function (v) {
          return '<label class="q-tfopt"><input type="radio" name="' + uid + "-" + q.n + '" value="' + v + '" data-qn="' + q.n + '"><span>' + v + "</span></label>";
        }).join("") + "</div></div>";
    }).join("") + "</div>";
  }
  function renderGroups(groups, uid) {
    uid = uid || "q" + Math.random().toString(36).slice(2, 7);
    return toArr(groups).map(function (g, gi) { return groupHtml(g, uid, gi); }).join("");
  }
  function applyAnswers(box, answers) {
    answers = answers || {};
    Array.prototype.forEach.call(box.querySelectorAll("[data-qn]"), function (el) {
      var v = answers[el.getAttribute("data-qn")];
      v = v == null ? "" : String(v);
      if (el.type === "radio") el.checked = v !== "" && el.value === v;
      else el.value = v;
    });
    Array.prototype.forEach.call(box.querySelectorAll("input[data-qns]"), function (el) {
      var sel = el.getAttribute("data-qns").split(" ").map(function (n) { return answers[n]; }).filter(Boolean);
      el.checked = sel.indexOf(el.value) >= 0;
    });
  }

  /* ------------------------------------------------------------------ *
   * Highlighter (passage text)
   * ------------------------------------------------------------------ */
  function highlightSelection(root) {
    var sel = window.getSelection ? window.getSelection() : null;
    if (!sel || sel.isCollapsed || !sel.rangeCount) return false;
    var range = sel.getRangeAt(0);
    if (!root.contains(range.commonAncestorContainer)) return false;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) {
      var n = walker.currentNode;
      if (!n.nodeValue || !n.nodeValue.trim()) continue;
      if (n.parentNode && n.parentNode.closest && n.parentNode.closest("mark.hl")) continue;
      if (range.intersectsNode(n)) nodes.push(n);
    }
    var did = false;
    nodes.forEach(function (node) {
      var start = node === range.startContainer ? range.startOffset : 0;
      var end = node === range.endContainer ? range.endOffset : node.nodeValue.length;
      if (start >= end) return;
      var target = node;
      if (end < target.nodeValue.length) target.splitText(end);
      if (start > 0) target = target.splitText(start);
      if (!target.nodeValue.trim()) return;
      var mark = document.createElement("mark");
      mark.className = "hl";
      mark.title = "Bấm để xoá tô màu";
      target.parentNode.insertBefore(mark, target);
      mark.appendChild(target);
      did = true;
    });
    try { sel.removeAllRanges(); } catch (e) { /* ignore */ }
    return did;
  }
  function unwrapMark(mark) {
    var p = mark.parentNode; if (!p) return;
    while (mark.firstChild) p.insertBefore(mark.firstChild, mark);
    p.removeChild(mark);
    if (p.normalize) p.normalize();
  }

  /* ------------------------------------------------------------------ *
   * Exam controller
   * cfg = { key, skill, title, parts:[{id, label, title, sub, groups, passageHtml}], layout:"single"|"split",
   *         draft, meta, timer:{seconds, warnAt}|null, highlighter, fontSize, onSubmit(res), onExit(), onPart(i) }
   * ------------------------------------------------------------------ */
  function start(root, cfg) {
    cfg = cfg || {};
    var d = cfg.draft || {};
    var parts = toArr(cfg.parts);
    var uid = "ex" + Math.random().toString(36).slice(2, 8);
    var split = cfg.layout === "split";
    var st = {
      answers: d.answers ? Object.assign({}, d.answers) : {},
      flags: d.flags ? Object.assign({}, d.flags) : {},
      part: typeof d.part === "number" ? Math.max(0, Math.min(d.part, parts.length - 1)) : 0,
      remaining: typeof d.remaining === "number" ? d.remaining : (cfg.timer ? cfg.timer.seconds : 0),
      elapsed: +d.elapsed || 0,
      meta: d.meta || cfg.meta || {},
      hl: d.hl || {},
      clientKey: d.clientKey || ((cfg.key || "exam") + ":" + Date.now().toString(36)),
      startedAt: d.startedAt || new Date().toISOString(),
      fs: +d.fs || 0,
      split: +d.split || 50,
      current: null, currentNs: [],
      submitted: false, submitting: false
    };
    var partNums = parts.map(function (p) {
      var a = [];
      toArr(p.groups).forEach(function (g) { groupNumbers(g).forEach(function (n) { a.push(n); }); });
      return a.sort(function (x, y) { return x - y; });
    });
    var allNums = [].concat.apply([], partNums);
    var cand = (I.state && I.state.profile && I.state.profile.name) || "Thí sinh";

    root.innerHTML =
      '<div class="ex-shell ex-' + esc(cfg.skill || "exam") + (split ? " ex-is-split" : " ex-is-single") + '" role="application" aria-label="Bài thi">' +
      '<header class="ex-top">' +
      '<div class="ex-top-l"><span class="ex-logo">IELTS</span><div class="ex-cand"><span class="ex-cand-name">' + esc(cand) + '</span><span class="ex-cand-sub">' + esc(cfg.title || "") + "</span></div></div>" +
      '<div class="ex-top-c"><span class="ex-clock" data-role="clock" aria-live="off"></span></div>' +
      '<div class="ex-top-r"><div class="ex-audio" data-role="audio"></div>' +
      (cfg.fontSize ? '<div class="ex-fs" role="group" aria-label="Cỡ chữ"><button type="button" class="ex-tbtn" data-act="fs-" title="Chữ nhỏ hơn">A−</button><button type="button" class="ex-tbtn" data-act="fs+" title="Chữ lớn hơn">A+</button></div>' : "") +
      '<button type="button" class="ex-tbtn ex-exit" data-act="exit" title="Thoát (bài làm được lưu nháp)">' + ic("x", 16) + "<span>Thoát</span></button></div>" +
      "</header>" +
      '<div class="ex-parthead" data-role="parthead"></div>' +
      '<main class="ex-main" data-role="main">' + parts.map(function (p, i) {
        var qs = '<div class="ex-pane ex-questions" data-pane="q"><div class="ex-qwrap">' + renderGroups(p.groups, uid + "p" + i) + "</div></div>";
        if (!split) return '<div class="ex-part" data-part="' + i + '" hidden><div class="ex-single">' + qs + "</div></div>";
        var ph = st.hl[p.id] || p.passageHtml || "";
        return '<div class="ex-part" data-part="' + i + '" hidden><div class="ex-split">' +
          '<div class="ex-pane ex-passage" data-pane="passage"><div class="ex-ptext" data-passage="' + esc(p.id) + '">' + ph + "</div>" +
          (cfg.highlighter ? '<p class="ex-hl-hint">' + ic("edit", 13) + " Bôi đen chữ để tô vàng · bấm vào chỗ đã tô để xoá</p>" : "") + "</div>" +
          '<div class="ex-divider" role="separator" aria-orientation="vertical" tabindex="0" title="Kéo để đổi độ rộng (nhấp đúp để đặt lại)"><span></span></div>' + qs +
          "</div></div>";
      }).join("") + "</main>" +
      '<nav class="ex-nav" aria-label="Điều hướng câu hỏi">' +
      '<button type="button" class="ex-flagbtn" data-act="flag" aria-pressed="false">' + ic("flag", 15) + "<span>Review</span></button>" +
      '<div class="ex-nav-parts" data-role="nav"></div>' +
      '<div class="ex-nav-arrows"><button type="button" class="ex-arrow" data-act="prev" aria-label="Câu trước">' + ic("chevron-left", 18) +
      '</button><button type="button" class="ex-arrow" data-act="next" aria-label="Câu sau">' + ic("chevron-right", 18) + "</button></div>" +
      '<button type="button" class="ex-submit" data-act="submit">' + ic("check", 16) + "<span>Nộp bài</span></button>" +
      "</nav>" +
      '<div class="ex-overlay" data-role="overlay" hidden></div>' +
      "</div>";

    var el = root.querySelector(".ex-shell");
    var $ = function (s) { return el.querySelector(s); };
    var clockEl = $("[data-role=clock]"), navEl = $("[data-role=nav]"), headEl = $("[data-role=parthead]");
    applyAnswers(el, st.answers);
    el.style.setProperty("--ex-fs", (16 + st.fs * 2) + "px");
    el.style.setProperty("--ex-split", st.split + "%");

    function isAnswered(n) { var v = st.answers[n]; return v != null && String(v).trim() !== ""; }
    function partOf(n) { for (var i = 0; i < partNums.length; i++) if (partNums[i].indexOf(+n) >= 0) return i; return -1; }
    function boxFor(n) {
      var pe = el.querySelector('.ex-part[data-part="' + partOf(n) + '"]') || el;
      return pe.querySelector('[data-qbox="' + n + '"]') || pe.querySelector('[data-qns~="' + n + '"]');
    }
    function renderHead() {
      var p = parts[st.part] || {};
      headEl.innerHTML = '<div class="ex-ph"><strong>' + esc(p.label || "") + "</strong><span>" + (p.sub || "") + "</span></div>";
    }
    function renderNav() {
      navEl.innerHTML = parts.map(function (p, i) {
        var nums = partNums[i], done = nums.filter(isAnswered).length;
        var qs = nums.map(function (n) {
          var cls = "ex-qbtn" + (isAnswered(n) ? " is-done" : "") + (st.currentNs.indexOf(n) >= 0 ? " is-current" : "") + (st.flags[n] ? " is-flag" : "");
          return '<button type="button" class="' + cls + '" data-goto="' + n + '" aria-label="Câu ' + n + (st.flags[n] ? " (đánh dấu)" : "") + '">' + n + "</button>";
        }).join("");
        return '<div class="ex-np' + (i === st.part ? " is-active" : "") + '"><button type="button" class="ex-np-label" data-part="' + i + '">' + esc(p.label || "Part " + (i + 1)) +
          '</button><span class="ex-np-count">' + done + "/" + nums.length + '</span><div class="ex-np-qs">' + qs + "</div></div>";
      }).join("");
      var fb = el.querySelector("[data-act=flag]");
      var flagged = st.current != null && !!st.flags[st.current];
      fb.classList.toggle("is-on", flagged);
      fb.setAttribute("aria-pressed", flagged ? "true" : "false");
      Array.prototype.forEach.call(el.querySelectorAll("[data-qbox]"), function (b) {
        var ns = (b.getAttribute("data-qns") || b.getAttribute("data-qbox")).split(" ");
        b.classList.toggle("is-flagged", ns.some(function (n) { return st.flags[n]; }));
      });
    }
    function setCurrent(n, ns) {
      st.current = n == null ? null : +n;
      st.currentNs = ns || (n == null ? [] : [+n]);
      Array.prototype.forEach.call(el.querySelectorAll("[data-qbox].is-current"), function (b) { b.classList.remove("is-current"); });
      var b = n == null ? null : boxFor(n);
      if (b) b.classList.add("is-current");
      renderNav();
    }
    function setPart(i, silent) {
      i = Math.max(0, Math.min(i, parts.length - 1));
      st.part = i;
      Array.prototype.forEach.call(el.querySelectorAll(".ex-part"), function (pe) { pe.hidden = +pe.getAttribute("data-part") !== i; });
      if (st.current != null && partOf(st.current) !== i) { st.current = null; st.currentNs = []; }
      renderHead(); renderNav();
      saveSoon();
      if (!silent && typeof cfg.onPart === "function") cfg.onPart(i);
    }
    function goTo(n) {
      var pi = partOf(n); if (pi < 0) return;
      if (pi !== st.part) setPart(pi);
      var b = boxFor(n); if (!b) return;
      var ns = b.getAttribute("data-qns") ? b.getAttribute("data-qns").split(" ").map(Number) : [+n];
      setCurrent(ns[0], ns);
      try { b.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) { b.scrollIntoView(); }
      var f = b.matches("input,select") ? b : b.querySelector("input:not([type=radio]):not([type=checkbox]),select,input:checked,input");
      if (f) { try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } }
    }

    /* ----- drafts ----- */
    var lastSave = 0, saveTimer = null;
    function snapshot() {
      return {
        v: 1, answers: st.answers, flags: st.flags, part: st.part,
        remaining: cd ? Math.ceil(st.remaining) : null,
        elapsed: Math.round(st.elapsed), meta: st.meta, hl: st.hl, clientKey: st.clientKey, startedAt: st.startedAt,
        fs: st.fs, split: st.split, savedAt: new Date().toISOString(),
        answered: allNums.filter(isAnswered).length, total: allNums.length,
        partLabel: (parts[st.part] || {}).label || "", title: cfg.title || ""
      };
    }
    function saveNow() {
      if (st.submitted || !cfg.key) return;
      clearTimeout(saveTimer); saveTimer = null;
      lastSave = Date.now();
      saveDraft(cfg.key, snapshot());
    }
    function saveSoon() {
      if (st.submitted) return;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveNow, 700);
    }

    /* ----- clock / countdown ----- */
    var cd = null;
    function renderClock() {
      if (!cd) return;
      var warn = cd.warnAt && st.remaining <= cd.warnAt;
      clockEl.className = "ex-clock" + (warn ? " is-warn" : "");
      clockEl.innerHTML = (cd.label ? '<span class="ex-clock-l">' + esc(cd.label) + "</span>" : "") + '<b class="ex-clock-t">' + fmtClock(st.remaining) + "</b>";
    }
    function startCountdown(secs, onDone, opts) {
      opts = opts || {};
      st.remaining = Math.max(0, +secs || 0);
      cd = { onDone: onDone, label: opts.label || "", warnAt: opts.warnAt || 0 };
      renderClock(); saveSoon();
    }
    function stopCountdown() { cd = null; }
    function setClock(html, cls) {
      cd = null;
      clockEl.className = "ex-clock" + (cls ? " " + cls : "");
      clockEl.innerHTML = html || "";
    }
    var last = Date.now();
    var iv = setInterval(function () {
      var now = Date.now(), dt = (now - last) / 1000; last = now;
      if (dt > 2) dt = 2; // device slept / tab frozen → do not burn exam time
      if (dt < 0) dt = 0;
      if (st.submitted) return;
      if (!document.hidden) st.elapsed += dt;
      if (cd) {
        st.remaining = Math.max(0, st.remaining - dt);
        renderClock();
        if (st.remaining <= 0) { var f = cd.onDone; cd = null; if (typeof f === "function") f(); }
      }
      if (now - lastSave > 5000) saveNow();
    }, 500);

    /* ----- answers ----- */
    function readInput(t) {
      if (t.matches("input[data-qns]")) {
        var nsAttr = t.getAttribute("data-qns"), ns = nsAttr.split(" ");
        var group = t.closest("[data-qbox]") || el;
        var checked = Array.prototype.filter.call(group.querySelectorAll('input[data-qns="' + nsAttr + '"]'), function (x) { return x.checked; });
        if (checked.length > ns.length) { t.checked = false; toast("Chỉ chọn " + ns.length + " đáp án cho câu " + ns.join("–") + ".", "warn"); return ns; }
        var letters = checked.map(function (x) { return x.value; }).sort();
        ns.forEach(function (n, i) { st.answers[n] = letters[i] || ""; });
        return ns;
      }
      var n = t.getAttribute("data-qn");
      if (t.type === "radio") { if (t.checked) st.answers[n] = t.value; }
      else st.answers[n] = t.value;
      return [n];
    }
    function markUsed() {
      Array.prototype.forEach.call(el.querySelectorAll(".qg-match"), function (sec) {
        var gi = +sec.getAttribute("data-g"), pe = sec.closest(".ex-part"), p = parts[+pe.getAttribute("data-part")];
        var g = p && p.groups && p.groups[gi];
        if (!g || g.allowReuse) return;
        var used = {};
        Array.prototype.forEach.call(sec.querySelectorAll("select[data-qn]"), function (s) { if (s.value) used[s.value] = 1; });
        Array.prototype.forEach.call(sec.querySelectorAll("[data-optkey]"), function (li) { li.classList.toggle("is-used", !!used[li.getAttribute("data-optkey")]); });
      });
    }
    function onInput(e) {
      var t = e.target;
      if (!t.matches || !t.matches("[data-qn],input[data-qns]")) return;
      if (e.type === "input" && (t.type === "radio" || t.type === "checkbox" || t.tagName === "SELECT")) return;
      var ns = readInput(t);
      var b = t.closest("[data-qbox]");
      if (b) {
        var bns = b.getAttribute("data-qns") ? b.getAttribute("data-qns").split(" ").map(Number) : [+b.getAttribute("data-qbox")];
        setCurrent(bns[0], bns);
      } else renderNav();
      if (ns && t.tagName === "SELECT") markUsed();
      saveSoon();
    }
    el.addEventListener("input", onInput);
    el.addEventListener("change", onInput);
    el.addEventListener("focusin", function (e) {
      var b = e.target.closest && e.target.closest("[data-qbox]");
      if (!b) return;
      var ns = b.getAttribute("data-qns") ? b.getAttribute("data-qns").split(" ").map(Number) : [+b.getAttribute("data-qbox")];
      if (st.current !== ns[0]) setCurrent(ns[0], ns);
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.matches && e.target.matches(".gap-input")) {
        e.preventDefault();
        var inputs = Array.prototype.slice.call(el.querySelectorAll('.ex-part[data-part="' + st.part + '"] .gap-input'));
        var i = inputs.indexOf(e.target);
        if (inputs[i + 1]) inputs[i + 1].focus(); else e.target.blur();
      }
    });

    /* ----- clicks ----- */
    function stepQuestion(dir) {
      if (!allNums.length) return;
      var cur = st.current;
      var idx = cur == null ? -1 : allNums.indexOf(cur);
      if (cur != null && st.currentNs.length > 1 && dir > 0) idx = allNums.indexOf(st.currentNs[st.currentNs.length - 1]);
      var next;
      if (idx < 0) next = dir > 0 ? (partNums[st.part][0] != null ? partNums[st.part][0] : allNums[0]) : allNums[allNums.length - 1];
      else next = allNums[Math.max(0, Math.min(allNums.length - 1, idx + dir))];
      goTo(next);
    }
    el.addEventListener("click", function (e) {
      var t = e.target;
      var mk = t.closest && t.closest("mark.hl");
      if (mk && cfg.highlighter && mk.closest(".ex-ptext")) { var pt = mk.closest(".ex-ptext"); unwrapMark(mk); storeHl(pt); return; }
      var g = t.closest && t.closest("[data-goto]");
      if (g) { goTo(+g.getAttribute("data-goto")); return; }
      var p = t.closest && t.closest("[data-part]");
      if (p && p.classList.contains("ex-np-label")) { setPart(+p.getAttribute("data-part")); return; }
      var a = t.closest && t.closest("[data-act]");
      if (!a || !el.contains(a)) return;
      var act = a.getAttribute("data-act");
      if (act === "flag") {
        if (st.current == null) { toast("Chọn một câu hỏi rồi bấm Review để đánh dấu.", "info"); return; }
        var on = !st.flags[st.current];
        (st.currentNs.length ? st.currentNs : [st.current]).forEach(function (n) { if (on) st.flags[n] = true; else delete st.flags[n]; });
        renderNav(); saveSoon();
      } else if (act === "prev") stepQuestion(-1);
      else if (act === "next") stepQuestion(1);
      else if (act === "submit") submit(false);
      else if (act === "exit") { if (typeof cfg.onExit === "function") { saveNow(); cfg.onExit(); } }
      else if (act === "fs-" || act === "fs+") {
        st.fs = Math.max(-2, Math.min(4, st.fs + (act === "fs+" ? 1 : -1)));
        el.style.setProperty("--ex-fs", (16 + st.fs * 2) + "px"); saveSoon();
      }
    });

    /* ----- highlighter ----- */
    function storeHl(pt) {
      var id = pt.getAttribute("data-passage");
      if (pt.querySelector("mark.hl")) st.hl[id] = pt.innerHTML; else delete st.hl[id];
      saveSoon();
    }
    if (split && cfg.highlighter) {
      var onUp = function (e) {
        var pt = e.target.closest && e.target.closest(".ex-ptext");
        if (!pt) return;
        setTimeout(function () { if (highlightSelection(pt)) storeHl(pt); }, 10);
      };
      el.addEventListener("mouseup", onUp);
      el.addEventListener("touchend", onUp);
    }

    /* ----- divider ----- */
    if (split) {
      el.addEventListener("pointerdown", function (e) {
        var dv = e.target.closest && e.target.closest(".ex-divider");
        if (!dv) return;
        e.preventDefault();
        var box = dv.parentNode.getBoundingClientRect();
        dv.classList.add("is-drag");
        var move = function (ev) {
          var pct = (ev.clientX - box.left) / box.width * 100;
          st.split = Math.round(Math.max(25, Math.min(75, pct)));
          el.style.setProperty("--ex-split", st.split + "%");
        };
        var upH = function () {
          dv.classList.remove("is-drag");
          document.removeEventListener("pointermove", move);
          document.removeEventListener("pointerup", upH);
          saveSoon();
        };
        document.addEventListener("pointermove", move);
        document.addEventListener("pointerup", upH);
      });
      el.addEventListener("dblclick", function (e) {
        if (e.target.closest && e.target.closest(".ex-divider")) { st.split = 50; el.style.setProperty("--ex-split", "50%"); saveSoon(); }
      });
      el.addEventListener("keydown", function (e) {
        if (!(e.target.classList && e.target.classList.contains("ex-divider"))) return;
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          st.split = Math.max(25, Math.min(75, st.split + (e.key === "ArrowRight" ? 5 : -5)));
          el.style.setProperty("--ex-split", st.split + "%"); saveSoon();
        }
      });
    }

    /* ----- overlay ----- */
    var ov = $("[data-role=overlay]");
    function showOverlay(html, onMount) {
      ov.innerHTML = '<div class="ex-overlay-card">' + html + "</div>";
      ov.hidden = false;
      if (typeof onMount === "function") onMount(ov.firstChild);
    }
    function hideOverlay() { ov.hidden = true; ov.innerHTML = ""; }

    /* ----- submit ----- */
    function gradeAll() {
      var groups = [];
      parts.forEach(function (p) { toArr(p.groups).forEach(function (g) { groups.push(g); }); });
      return gradeGroups(groups, st.answers);
    }
    function submit(auto) {
      if (st.submitted) return Promise.resolve(false);
      if (st.submitting && !auto) return Promise.resolve(false);
      var go = function () {
        if (st.submitted) return false;
        st.submitted = true; cd = null; clearInterval(iv); clearTimeout(saveTimer);
        var results = gradeAll(), sum = summarize(results);
        var perPart = parts.map(function (p, i) {
          var set = partNums[i], rs = results.filter(function (r) { return set.indexOf(r.n) >= 0; }), s = summarize(rs);
          return { id: p.id, label: p.label, title: p.title || "", raw: s.raw, total: s.total, accuracy: s.accuracy };
        });
        if (cfg.key) clearDraft(cfg.key);
        hideOverlay();
        if (typeof cfg.onSubmit === "function") {
          cfg.onSubmit({ answers: Object.assign({}, st.answers), flags: Object.assign({}, st.flags), results: results,
            raw: sum.raw, total: sum.total, accuracy: sum.accuracy, perPart: perPart,
            seconds: Math.round(st.elapsed), clientKey: st.clientKey, auto: !!auto, meta: st.meta });
        }
        return true;
      };
      if (auto) return Promise.resolve(go());
      var left = allNums.filter(function (n) { return !isAnswered(n); }).length;
      var msg = left ? "Bạn còn " + left + " câu chưa trả lời. Vẫn nộp bài?" : "Nộp bài và xem kết quả?";
      st.submitting = true;
      var p = typeof I.confirm === "function" ? I.confirm(msg, { okLabel: "Nộp bài", title: "Nộp bài" }) : Promise.resolve(true);
      return p.then(function (ok) { st.submitting = false; return ok ? go() : false; });
    }

    function destroy() {
      clearInterval(iv);
      if (!st.submitted) saveNow();
      clearTimeout(saveTimer);
    }

    // initial paint
    setPart(st.part, true);
    markUsed();
    if (cfg.timer) startCountdown(st.remaining, function () { toast("Hết giờ — bài đã được nộp tự động.", "info"); submit(true); }, { label: "Còn lại", warnAt: cfg.timer.warnAt || 300 });

    return {
      el: el, state: st, parts: parts, partNums: partNums,
      setPart: setPart, goTo: goTo, startCountdown: startCountdown, stopCountdown: stopCountdown, setClock: setClock,
      setAudio: function (html) { var a = $("[data-role=audio]"); if (a) a.innerHTML = html || ""; },
      audioSlot: function () { return $("[data-role=audio]"); },
      showOverlay: showOverlay, hideOverlay: hideOverlay,
      submit: submit, save: saveNow, touch: saveSoon, destroy: destroy,
      isSubmitted: function () { return st.submitted; },
      partOf: partOf, answeredCount: function () { return allNums.filter(isAnswered).length; }, total: allNums.length
    };
  }

  /* ------------------------------------------------------------------ *
   * Review rendering
   * ------------------------------------------------------------------ */
  function buildIndex(groups) {
    var map = {};
    toArr(groups).forEach(function (g) {
      if (!g) return;
      if (g.kind === "multi") (g.questions || []).forEach(function (q) { toArr(q.ns).forEach(function (n) { map[n] = { g: g, q: q }; }); });
      else if (g.kind === "gap") groupNumbers(g).forEach(function (n) { map[n] = { g: g, q: null }; });
      else (g.questions || []).forEach(function (q) { map[q.n] = { g: g, q: q }; });
    });
    return map;
  }
  function explainOf(g, q, n) {
    if (q && q.explain) return q.explain;
    if (g && g.explain) {
      if (typeof g.explain === "string") return g.explain;
      return g.explain[n] || g.explain[String(n)] || "";
    }
    return "";
  }
  function gapContext(g, n) {
    var marker = "\u0007";
    var html = String(g.content || "").replace(/\{\{\s*(\d+)\s*\}\}/g, function (m, k) { return +k === +n ? marker : " ____ "; });
    /* split on a private block separator, drop empty segments (e.g. "</li></ul>" → two breaks), re-join */
    var t = stripTags(html, "\u0001").split("\u0001")
      .map(function (seg) { return seg.replace(/\s+/g, " ").trim(); })
      .filter(function (seg) { return seg !== ""; }).join(" · ");
    var i = t.indexOf(marker);
    if (i < 0) return { before: g.title ? stripTags(g.title) : "", after: "" };
    var a = Math.max(0, i - 80), b = Math.min(t.length, i + 60);
    var before = t.slice(a, i), after = t.slice(i + 1, b);
    var LEAD = /^(\s*·)+\s*/, TRAIL = /\s*(·\s*)+$/;
    if (a > 0) before = "…" + before.replace(/^\S*\s/, "").replace(LEAD, "");
    else before = before.replace(LEAD, "");
    if (b < t.length) after = after.replace(/\s\S*$/, "").replace(TRAIL, "") + "…";
    else after = after.replace(TRAIL, "");
    return { before: before, after: after };
  }
  function promptHtml(g, q, n) {
    if (g.kind === "gap") {
      var c = gapContext(g, n);
      return esc(c.before) + '<span class="rv-blank">(' + n + ")</span>" + esc(c.after);
    }
    return esc(stripTags(q && q.text));
  }
  function displayKey(g, q, key) {
    if (!key) return "";
    var opts = g.kind === "match" ? optionList(g.options) : g.kind === "gap" && g.wordBank ? optionList(g.wordBank) : q && q.options ? optionList(q.options) : null;
    if (!opts) return key;
    return String(key).split(" / ").map(function (k) {
      var t = stripTags(optText(opts, k));
      return t && up(t) !== up(k) && !/^(location|place|paragraph)\s+[A-Z]$/i.test(t) ? k + " — " + clip(t, 70) : k;
    }).join(" / ");
  }
  function itemHtml(g, q, ns, rmap, opts) {
    var rs = ns.map(function (n) { return rmap[n] || { n: n, correct: false, user: "", answer: "" }; });
    var ok = rs.every(function (r) { return r.correct; });
    var ex = explainOf(g, q, ns[0]);
    var isKey = g.kind !== "gap" || !!g.wordBank;
    var userTxt = rs.map(function (r) { return r.user ? esc(isKey ? displayKey(g, q, r.user) : r.user) : '<i class="rv-empty">(bỏ trống)</i>'; }).join(", ");
    var ansTxt = rs.map(function (r) { return esc(isKey ? displayKey(g, q, r.answer) : String(r.answer).split(" / ")[0]); }).join(", ");
    var alt = !isKey && rs.length === 1 && String(rs[0].answer).indexOf(" / ") >= 0
      ? '<span class="rv-alt">Chấp nhận: ' + esc(rs[0].answer) + "</span>" : "";
    var marks = ns.length > 1 ? '<span class="rv-sub">' + rs.map(function (r) { return '<span class="' + (r.correct ? "ok" : "bad") + '">' + r.n + (r.correct ? " ✓" : " ✗") + "</span>"; }).join(" ") + "</span>" : "";
    var wrongN = rs.filter(function (r) { return !r.correct; })[0];
    var evid = opts.evidence && ns.some(function (n) { return opts.evidence[n]; });
    return '<div class="rv-item ' + (ok ? "is-ok" : "is-bad") + '" data-rv="' + ns[0] + '">' +
      '<div class="rv-top"><span class="rv-mark">' + (ok ? ic("check", 15) : ic("x", 15)) + '</span><span class="rv-num">' + ns.join("–") + "</span>" +
      '<div class="rv-prompt">' + promptHtml(g, q, ns[0]) + "</div></div>" +
      '<div class="rv-answers"><span class="rv-user"><em>Bạn:</em> ' + userTxt + '</span><span class="rv-key"><em>Đáp án:</em> <b>' + ansTxt + "</b></span>" + marks +
      (rs.some(function (r) { return r.over; }) ? '<span class="pill warn">Vượt giới hạn số từ</span>' : "") + alt + "</div>" +
      (ex ? '<div class="rv-explain">' + ic("lightbulb", 15) + "<div>" + ex + "</div></div>" : "") +
      ((evid || (wrongN && opts.allowLog !== false)) ? '<div class="rv-actions">' +
        (evid ? '<button type="button" class="btn ghost sm" data-evidence="' + ns.join(" ") + '">' + ic("eye", 14) + " Xem trong transcript</button>" : "") +
        (wrongN && opts.allowLog !== false ? '<button type="button" class="btn ghost sm" data-logerr="' + wrongN.n + '">' + ic("alert-triangle", 14) + " Ghi vào sổ lỗi</button>" : "") +
        "</div>" : "") +
      "</div>";
  }
  /* opts: { skill, evidence: {n:true}, allowLog } */
  function renderReview(groups, results, opts) {
    opts = opts || {};
    var skill = opts.skill || "listening";
    var rmap = {};
    toArr(results).forEach(function (r) { rmap[r.n] = r; });
    return toArr(groups).map(function (g) {
      if (!g) return "";
      var nums = groupNumbers(g);
      if (!nums.length) return "";
      var items;
      if (g.kind === "multi") items = (g.questions || []).map(function (q) { return itemHtml(g, q, toArr(q.ns).map(Number).sort(function (a, b) { return a - b; }), rmap, opts); }).join("");
      else {
        var idx = buildIndex([g]);
        items = nums.map(function (n) { return itemHtml(g, (idx[n] || {}).q, [n], rmap, opts); }).join("");
      }
      var gr = nums.map(function (n) { return rmap[n]; }).filter(Boolean), c = gr.filter(function (r) { return r.correct; }).length;
      return '<div class="rv-group"><div class="rv-ghead"><b>' + esc(rangeLabel(nums)) + '</b><span class="pill muted">' + esc(qtype(skill, g.type).name) +
        '</span><span class="spacer"></span><span class="rv-gscore">' + c + "/" + nums.length + "</span></div>" + items + "</div>";
    }).join("");
  }

  /* ------------------------------------------------------------------ *
   * Error log modal
   * ------------------------------------------------------------------ */
  function errorShort(skill, g, r) {
    if (!r.user) return "Bỏ trống câu hỏi";
    if (r.over) return "Vượt giới hạn số từ";
    var u = up(r.user), a = up(r.answer);
    if (g.kind === "tfng") {
      if ((u === "FALSE" || u === "NO") && a === "NOT GIVEN") return "Nhầm NOT GIVEN thành " + u;
      if (u === "NOT GIVEN") return "Chọn NOT GIVEN khi bài có thông tin";
      return "Nhầm " + a + " thành " + u;
    }
    if (g.kind === "gap" && !g.wordBank) {
      var close = String(r.answer).split(" / ").some(function (v) { return lev(normalize(v), normalize(r.user)) <= 2; });
      if (close) return "Sai chính tả / số ít–số nhiều";
      return skill === "listening" ? "Nghe sót hoặc chép sai thông tin" : "Chép sai từ trong bài";
    }
    if (g.kind === "match") return skill === "reading" && g.type === "headings" ? "Chọn heading theo chi tiết, không theo ý chính" : "Ghép sai thông tin (paraphrase)";
    return "Bị phương án gây nhiễu (distractor)";
  }
  /* ctx = { skill, group, question, result, source } */
  function openErrorModal(ctx, onSaved) {
    var g = ctx.group || {}, r = ctx.result || {}, skill = ctx.skill || "listening";
    var t = qtype(skill, g.type);
    var isKey = g.kind !== "gap" || !!g.wordBank;
    var verb = isKey ? "chọn" : "viết";
    var f = {
      error: t.name + " — " + errorShort(skill, g, r),
      example: "Câu " + r.n + ": bạn " + verb + " " + (r.user ? (isKey ? r.user : "“" + r.user + "”") : "(bỏ trống)") + ", đáp án " + (isKey ? r.answer : String(r.answer).split(" / ")[0]),
      why: stripTags(explainOf(g, ctx.question, r.n)),
      fix: t.advice || ""
    };
    if (typeof I.modal !== "function" || typeof I.addError !== "function") { toast("Chưa thể mở sổ lỗi lúc này.", "warn"); return; }
    var modalEl = null;
    var field = function (k, label, multi) {
      return '<label class="field"><span class="field-label">' + label + "</span>" +
        (multi ? '<textarea class="textarea" rows="3" data-f="' + k + '">' + esc(f[k]) + "</textarea>" : '<input class="input" data-f="' + k + '" value="' + esc(f[k]) + '">') + "</label>";
    };
    I.modal({
      title: "Ghi vào sổ lỗi",
      html: '<div class="stack pr-errform"><p class="small muted">Nguồn: ' + esc(ctx.source || "") + " · " + esc(I.skillName ? I.skillName(skill) : skill) + " · " + esc(t.name) + "</p>" +
        field("error", "Lỗi lặp lại", false) + field("example", "Ví dụ của mình", true) + field("why", "Vì sao sai", true) + field("fix", "Cách sửa", true) +
        '<p class="tiny muted">Hẹn kiểm tra lại sau 7 ngày (căn cứ: đáp án).</p></div>',
      actions: [
        { label: "Huỷ", kind: "ghost", onClick: function (close) { close(); } },
        { label: "Lưu vào sổ lỗi", kind: "primary", onClick: function (close) {
          var root = modalEl || document;
          var val = function (k) { var x = root.querySelector('[data-f="' + k + '"]'); return x ? x.value.trim() : ""; };
          if (!val("error")) { toast("Hãy ghi tên lỗi.", "warn"); return; }
          api("addError", { error: val("error"), example: val("example"), why: val("why"), fix: val("fix"), skill: skill, qtype: g.type || r.type, source: ctx.source || "", basis: "answer-key" });
          toast("Đã ghi vào sổ lỗi — hẹn kiểm tra lại sau 7 ngày.", "success");
          close();
          if (typeof onSaved === "function") onSaved();
        } }
      ],
      onMount: function (m) { modalEl = m; }
    });
  }

  /* ------------------------------------------------------------------ *
   * Shared UI widgets for listening/reading pages
   * ------------------------------------------------------------------ */
  var TOPIC_VI = { education: "Giáo dục", technology: "Công nghệ", environment: "Môi trường", health: "Sức khoẻ", work: "Công việc",
    society: "Xã hội", urban: "Đô thị", culture: "Văn hoá", science: "Khoa học", media: "Truyền thông", travel: "Du lịch", crime: "Tội phạm",
    government: "Chính phủ", family: "Gia đình", economy: "Kinh tế", food: "Ẩm thực", sport: "Thể thao", history: "Lịch sử",
    animals: "Động vật", energy: "Năng lượng" };
  var LEVEL = {
    weak: { label: "Yếu", cls: "bad", color: "var(--bad)" },
    improving: { label: "Đang cải thiện", cls: "warn", color: "var(--warn)" },
    strong: { label: "Tốt", cls: "good", color: "var(--good)" },
    insufficient: { label: "Chưa đủ dữ liệu", cls: "muted", color: "var(--muted)" }
  };
  function levelPill(level) { var l = LEVEL[level] || LEVEL.insufficient; return '<span class="pill ' + l.cls + '">' + l.label + "</span>"; }
  function accBar(acc, level) {
    var l = LEVEL[level] || LEVEL.insufficient, w = acc == null ? 0 : Math.max(0, Math.min(100, acc));
    return '<div class="an-bar"><div class="progress"><div class="progress-bar" style="width:' + w + "%;background:" + l.color + '"></div></div><span class="an-acc">' + (acc == null ? "—" : Math.round(acc) + "%") + "</span></div>";
  }
  function submissionsFor(skill, refId, kinds) {
    var subs = (I.state && I.state.submissions) || [];
    return subs.filter(function (s) { return s && s.skill === skill && s.refId === refId && (!kinds || kinds.indexOf(s.kind) >= 0); })
      .sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); });
  }
  function historyFor(skill, refId, kinds) {
    var list = submissionsFor(skill, refId, kinds), best = null;
    list.forEach(function (s) {
      var sc = s.score || {}, tot = +sc.total || 0;
      if (!tot) return;
      var acc = (+sc.raw || 0) / tot * 100;
      if (!best || acc > best.acc) best = { raw: +sc.raw || 0, total: tot, acc: acc, band: sc.band };
    });
    return { count: list.length, best: best, last: list[0] || null, list: list };
  }
  function scoreHero(o) {
    var acc = Math.round(o.accuracy || 0);
    var bandBlock = o.showBand
      ? '<div class="pr-hero-stat"><div class="stat-label">Band tham khảo</div><div class="stat-value">' + (o.band != null ? fmtBand(o.band) : "—") +
        '</div><div class="stat-foot">' + (o.band != null ? "ước tính theo bảng quy đổi 40 câu" : o.blank ? esc(I.BLANK_NOTE || "Bài trống — không tính band") : "cần đủ 40 câu để quy đổi band") + "</div></div>"
      : '<div class="pr-hero-stat"><div class="stat-label">Band</div><div class="stat-value pr-muted-v">—</div><div class="stat-foot">Bài lẻ chỉ tính accuracy, không quy đổi band</div></div>';
    return '<div class="card pr-hero sk-' + esc(o.skill || "listening") + '">' +
      '<div class="pr-hero-score"><div class="pr-hero-big">' + (o.raw || 0) + "<span>/" + (o.total || 0) + '</span></div><div class="pr-hero-lbl">câu đúng</div></div>' +
      '<div class="pr-hero-stats">' +
      '<div class="pr-hero-stat"><div class="stat-label">Accuracy</div><div class="stat-value">' + acc + '%</div><div class="progress"><div class="progress-bar" style="width:' + acc + '%"></div></div></div>' +
      bandBlock +
      '<div class="pr-hero-stat"><div class="stat-label">Thời gian làm</div><div class="stat-value pr-time">' + esc(fmtDur(o.seconds || 0)) + "</div>" +
      (o.seconds ? '<div class="stat-foot">' + fmtClock(o.seconds) + "</div>" : "") + "</div>" +
      "</div></div>";
  }
  function typeTable(results, skill) {
    var rows = byType(results, skill);
    if (!rows.length) return "";
    return '<div class="card pr-typecard"><div class="card-title">Theo dạng câu hỏi</div><div class="table-wrap"><table class="table pr-typetable"><thead><tr><th>Dạng bài</th><th>Đúng</th><th>Accuracy</th></tr></thead><tbody>' +
      rows.map(function (r) {
        var lvl = r.acc >= 90 ? "strong" : r.acc >= 70 ? "improving" : "weak";
        return "<tr><td>" + esc(r.name) + '</td><td class="mono">' + r.correct + "/" + r.total + "</td><td>" + accBar(r.acc, lvl) + "</td></tr>";
      }).join("") + "</tbody></table></div></div>";
  }
  function analysisHtml(skill) {
    var stats = toArr(api("typeStats", skill, { days: 30 }));
    var keys = qtypeKeys(skill), map = {};
    stats.forEach(function (s) { if (s && s.type) map[s.type] = s; });
    var rows = keys.map(function (k) {
      var s = map[k] || {}, t = qtype(skill, k), total = +s.total || 0, correct = +s.correct || 0;
      return { key: k, name: s.name || t.name, advice: t.advice, correct: correct, total: total, acc: total ? correct / total * 100 : null, level: s.level || "insufficient", sets: +s.sets || 0 };
    });
    stats.forEach(function (s) {
      if (s && s.type && keys.indexOf(s.type) < 0) {
        var t = qtype(skill, s.type), total = +s.total || 0;
        rows.push({ key: s.type, name: s.name || t.name, advice: t.advice, correct: +s.correct || 0, total: total, acc: total ? (+s.correct || 0) / total * 100 : null, level: s.level || "insufficient", sets: +s.sets || 0 });
      }
    });
    var rank = function (r) { return r.level === "insufficient" ? (r.total ? 1 : 2) : 0; };
    rows.sort(function (a, b) { return rank(a) - rank(b) || ((a.acc == null ? 101 : a.acc) - (b.acc == null ? 101 : b.acc)) || b.total - a.total; });
    var withData = rows.filter(function (r) { return r.total > 0; });
    var worst = withData.filter(function (r) { return r.total - r.correct > 0; }).sort(function (a, b) { return (b.total - b.correct) - (a.total - a.correct) || a.acc - b.acc; })[0];
    var bestPool = withData.filter(function (r) { return r.level !== "insufficient"; });
    if (!bestPool.length) bestPool = withData.filter(function (r) { return r.total >= 5; });
    var best = bestPool.sort(function (a, b) { return b.acc - a.acc || b.total - a.total; })[0];
    var callout = function (cls, icon, label, r, foot) {
      return '<div class="card an-callout ' + cls + '"><div class="an-callout-ic">' + ic(icon, 20) + '</div><div><div class="page-kicker">' + label + "</div>" +
        (r ? '<div class="an-callout-name">' + esc(r.name) + '</div><div class="small muted">' + foot(r) + "</div>" : '<div class="an-callout-name muted">Chưa có dữ liệu</div><div class="small muted">Làm thêm vài bài để hệ thống nhận diện.</div>') + "</div></div>";
    };
    var practiceTab = skill === "listening" ? "section" : "passage";
    var intro = withData.length ? "" :
      '<div class="card soft empty an-empty"><div class="empty-emoji">📊</div><div class="empty-title">Chưa có dữ liệu dạng bài</div><div class="empty-text">Làm vài ' +
      (skill === "listening" ? "section" : "passage") + " hoặc full đề — thống kê sẽ tự cập nhật từ đáp án của bạn.</div></div>";
    return '<div class="stack an-wrap">' + intro +
      '<div class="grid g-2 an-callouts">' +
      callout("an-bad", "alert-triangle", "Sai nhiều nhất", worst, function (r) { return (r.total - r.correct) + " câu sai / " + r.total + " câu · accuracy " + Math.round(r.acc) + "%"; }) +
      callout("an-good", "award", "Làm tốt nhất", best, function (r) { return r.correct + "/" + r.total + " câu đúng · accuracy " + Math.round(r.acc) + "%"; }) +
      "</div>" +
      '<div class="card"><div class="row between wrap"><div class="card-title">Phân tích theo dạng bài</div><span class="tiny muted">30 ngày gần nhất · không tính bài làm lại · cần ≥ 20 câu từ ≥ 3 bài để xếp mức</span></div>' +
      '<div class="table-wrap"><table class="table an-table"><thead><tr><th>Dạng bài</th><th>Đúng/Tổng</th><th>Accuracy</th><th>Mức</th><th>Lời khuyên</th><th></th></tr></thead><tbody>' +
      rows.map(function (r) {
        return "<tr><td><b>" + esc(r.name) + "</b>" + (r.sets ? '<div class="tiny muted">' + r.sets + " bài</div>" : "") + '</td><td class="mono">' + r.correct + "/" + r.total +
          "</td><td>" + accBar(r.acc, r.level) + "</td><td>" + levelPill(r.level) + '</td><td class="small an-advice">' + esc(r.advice || "") +
          '</td><td><button type="button" class="btn sm sk" data-la="practice-type" data-type="' + esc(r.key) + '" data-tab="' + practiceTab + '">Luyện dạng này</button></td></tr>';
      }).join("") + "</tbody></table></div></div></div>";
  }
  function typePills(groups, skill, max) {
    var seen = {}, out = [];
    toArr(groups).forEach(function (g) { if (g && g.type && !seen[g.type]) { seen[g.type] = 1; out.push(g.type); } });
    var shown = max ? out.slice(0, max) : out;
    return shown.map(function (k) { return '<span class="pill muted pr-tpill">' + esc(qtype(skill, k).name) + "</span>"; }).join("") +
      (max && out.length > max ? '<span class="pill muted pr-tpill">+' + (out.length - max) + "</span>" : "");
  }

  I.exam = {
    // grading
    normalize: normalize, parseWordLimit: parseWordLimit, countWords: countWords, withinLimit: withinLimit,
    gradeGap: gradeGap, gradeGroups: gradeGroups, summarize: summarize, byType: byType,
    optionList: optionList, groupNumbers: groupNumbers, rangeLabel: rangeLabel,
    // types
    qtype: qtype, qtypeKeys: qtypeKeys,
    // rendering
    renderGroups: renderGroups, applyAnswers: applyAnswers, renderReview: renderReview, buildIndex: buildIndex, explainOf: explainOf,
    // controller + drafts
    start: start, loadDraft: loadDraft, saveDraft: saveDraft, clearDraft: clearDraft, draftSummary: draftSummary,
    // errors
    openErrorModal: openErrorModal, errorShort: errorShort,
    // helpers
    stripTags: stripTags, fmtClock: fmtClock,
    ui: { levelPill: levelPill, accBar: accBar, scoreHero: scoreHero, typeTable: typeTable, analysisHtml: analysisHtml,
      historyFor: historyFor, submissionsFor: submissionsFor, typePills: typePills, topicName: function (k) { return TOPIC_VI[k] || k || ""; }, LEVEL: LEVEL }
  };
})();
