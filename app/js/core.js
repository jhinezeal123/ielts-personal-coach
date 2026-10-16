/* IELTS Coach — core.js (A1)
 * Namespace, store, StudyClock, router, helpers, stats, daily plan, SRS, error review, TTS, audio DB, backup.
 * Classic script, no modules. Content data files load AFTER this file and only push into IELTS.data.*;
 * nothing here touches content at load time (everything is computed lazily).
 */
(function () {
  "use strict";

  var W = (typeof window !== "undefined") ? window : this;
  var IELTS = W.IELTS = W.IELTS || {};
  IELTS.version = 1;

  /* ------------------------------------------------------------------ *
   * Containers (must exist before data files load)
   * ------------------------------------------------------------------ */
  IELTS.data = IELTS.data || {
    listeningTests: [],
    readingTests: [],
    dictation: [],
    vocab: { words: [] },
    writing: null,
    speaking: null
  };
  IELTS.pages = IELTS.pages || {};

  var LS_STATE = "ielts-coach-v1";
  var LS_OLD = "ieltsPersonalCoach";
  var LS_TIMER = "ielts-coach-timer";
  var LS_OFFSET = "ielts-coach-clock-offset";
  var VN_TZ = "Asia/Ho_Chi_Minh";
  var VN_OFFSET_MS = 7 * 3600000; // Vietnam has no DST
  var DAY_MS = 86400000;

  function ls() { try { return W.localStorage || null; } catch (e) { return null; } }
  function lsGet(k) { try { var s = ls(); return s ? s.getItem(k) : null; } catch (e) { return null; } }
  function lsSet(k, v) { var s = ls(); if (!s) throw new Error("no storage"); s.setItem(k, v); }
  function lsDel(k) { try { var s = ls(); if (s) s.removeItem(k); } catch (e) { /* ignore */ } }

  /* ------------------------------------------------------------------ *
   * 4.1 Helpers
   * ------------------------------------------------------------------ */
  IELTS.esc = function (s) {
    if (s === null || s === undefined) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  var _uidN = 0;
  IELTS.uid = function (prefix) {
    _uidN = (_uidN + 1) % 1679616;
    return (prefix || "id") + "-" + Date.now().toString(36) + "-" +
      Math.random().toString(36).slice(2, 7) + _uidN.toString(36);
  };

  function clone(o) { return o === undefined ? undefined : JSON.parse(JSON.stringify(o)); }
  function isObj(o) { return o !== null && typeof o === "object" && !Array.isArray(o); }
  function num(v, d) { var n = Number(v); return (v === null || v === "" || v === undefined || isNaN(n)) ? d : n; }
  IELTS._clone = clone;

  var ICONS = {
    "home": '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    "map": '<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/>',
    "calendar-check": '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>',
    "calendar": '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    "sun": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    "headphones": '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    "book-open": '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    "pen-line": '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    "mic": '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
    "layers": '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    "alert-triangle": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    "settings": '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    "flame": '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    "clock": '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    "target": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "x": '<path d="M18 6 6 18M6 6l12 12"/>',
    "play": '<polygon points="6 3 20 12 6 21 6 3"/>',
    "pause": '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
    "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    "flag": '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
    "chevron-left": '<path d="m15 18-6-6 6-6"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "plus": '<path d="M5 12h14M12 5v14"/>',
    "trash": '<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    "edit": '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/>',
    "star": '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    "sparkles": '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4M19 17v4M3 5h4M17 19h4"/>',
    "download": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    "upload": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    "volume": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    "volume-x": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>',
    "eye": '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    "eye-off": '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
    "lightbulb": '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
    "list": '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    "bar-chart": '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
    "award": '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    "timer": '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
    "square": '<rect width="18" height="18" x="3" y="3" rx="2"/>',
    "check-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>',
    "bookmark": '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    "filter": '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    "search": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    "info": '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    "user": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    "arrow-right": '<path d="M5 12h14M12 5l7 7-7 7"/>',
    "refresh-cw": '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    "external-link": '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    "more-horizontal": '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    "heart": '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    "square-pen": '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/>'
  };
  IELTS.ICONS = ICONS;
  IELTS.icon = function (name, size) {
    size = size || 18;
    var body = ICONS[name] || ICONS["info"];
    return '<svg class="ic ic-' + IELTS.esc(name) + '" xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      body + '</svg>';
  };

  /* SVG progress ring → '<span class="ring">…</span>'. pct 0–100; colour = var(--sk, var(--accent)). */
  IELTS.ring = function (pct, opts) {
    opts = opts || {};
    var size = opts.size || 72, sw = opts.stroke || 7, r = (size - sw) / 2, c = 2 * Math.PI * r;
    var p = Math.max(0, Math.min(100, Number(pct) || 0));
    var label = opts.label !== undefined ? opts.label : Math.round(p) + "%";
    return '<span class="ring" style="width:' + size + "px;height:" + size + 'px">' +
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '" aria-hidden="true">' +
      '<circle class="ring-track" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke-width="' + sw + '" fill="none"/>' +
      '<circle class="ring-fill" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke-width="' + sw + '" fill="none" stroke-linecap="round"' +
      ' stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + (c * (1 - p / 100)).toFixed(2) + '"/></svg>' +
      '<span class="ring-label">' + label + "</span></span>";
  };

  /* Events */
  var listeners = {};
  IELTS.on = function (evt, fn) { (listeners[evt] = listeners[evt] || []).push(fn); };
  IELTS.off = function (evt, fn) {
    var arr = listeners[evt]; if (!arr) return;
    var i = arr.indexOf(fn); if (i >= 0) arr.splice(i, 1);
  };
  IELTS.emit = function (evt, payload) {
    var arr = (listeners[evt] || []).slice();
    for (var i = 0; i < arr.length; i++) {
      try { arr[i](payload); } catch (e) { if (W.console) console.error("[IELTS] listener error for '" + evt + "'", e); }
    }
  };

  /* Skills */
  IELTS.skills = ["listening", "reading", "writing", "speaking"];
  IELTS.planSkills = IELTS.skills.concat(["vocab"]);
  var SKILL_NAMES = { listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking", vocab: "Từ vựng" };
  IELTS.skillName = function (k) { return SKILL_NAMES[k] || (k ? String(k) : ""); };
  IELTS.skillIcon = function (k) {
    return { listening: "headphones", reading: "book-open", writing: "pen-line", speaking: "mic", vocab: "layers" }[k] || "star";
  };

  /* Formatting */
  IELTS.fmtBand = function (b) {
    if (b === null || b === undefined || b === "" || isNaN(Number(b))) return "—";
    return Number(b).toFixed(1);
  };
  IELTS.fmtDuration = function (seconds) {
    var mins = Math.round(Math.max(0, num(seconds, 0)) / 60);
    var h = Math.floor(mins / 60), m = mins % 60;
    if (h > 0) return m ? (h + " giờ " + m + " phút") : (h + " giờ");
    return m + " phút";
  };
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  IELTS.fmtClock = function (seconds) {
    var s = Math.max(0, Math.floor(num(seconds, 0)));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return h > 0 ? (h + ":" + pad2(m) + ":" + pad2(sec)) : (pad2(m) + ":" + pad2(sec));
  };
  var WEEKDAYS = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  IELTS.WEEKDAYS = WEEKDAYS;
  IELTS.fmtDay = function (dayKey, style) {
    if (!dayKey || !/^\d{4}-\d{2}-\d{2}$/.test(dayKey)) return "—";
    var p = parseKey(dayKey);
    var dm = pad2(p.d) + "/" + pad2(p.m);
    if (style === "long") return WEEKDAYS[IELTS.weekday(dayKey)] + ", " + dm + "/" + p.y;
    if (style === "full") return dm + "/" + p.y;
    return dm;
  };

  /* ------------------------------------------------------------------ *
   * 4.2 StudyClock
   * ------------------------------------------------------------------ */
  IELTS._clockOffsetMs = num(lsGet(LS_OFFSET), 0);
  IELTS.now = function () { return new Date(Date.now() + (Number(IELTS._clockOffsetMs) || 0)); };
  /* test hook: pretend "now" is the given instant (ISO string or ms) */
  IELTS._setNow = function (t) {
    var ms = typeof t === "number" ? t : new Date(t).getTime();
    IELTS._clockOffsetMs = ms - Date.now();
  };
  function nowMs() { return IELTS.now().getTime(); }

  var _vnFmt = null;
  function vnParts(ms) {
    try {
      if (!_vnFmt) {
        _vnFmt = new Intl.DateTimeFormat("en-CA", {
          timeZone: VN_TZ, year: "numeric", month: "2-digit", day: "2-digit",
          hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
        });
      }
      var o = {};
      _vnFmt.formatToParts(new Date(ms)).forEach(function (p) { o[p.type] = p.value; });
      return { y: +o.year, m: +o.month, d: +o.day, h: (+o.hour) % 24, mi: +o.minute };
    } catch (e) {
      var d = new Date(ms + VN_OFFSET_MS);
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate(), h: d.getUTCHours(), mi: d.getUTCMinutes() };
    }
  }
  function keyOf(y, m, d) { return y + "-" + pad2(m) + "-" + pad2(d); }
  function parseKey(k) { var a = String(k).split("-"); return { y: +a[0], m: +a[1], d: +a[2] }; }
  function keyToUTC(k) { var p = parseKey(k); return Date.UTC(p.y, p.m - 1, p.d); }
  function utcToKey(ms) { var d = new Date(ms); return keyOf(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()); }
  function toMs(date) {
    if (date instanceof Date) return date.getTime();
    if (typeof date === "number") return date;
    return new Date(date).getTime();
  }
  function resetHour() {
    var h = IELTS.state && IELTS.state.profile ? num(IELTS.state.profile.resetHour, 6) : 6;
    return Math.max(0, Math.min(23, Math.floor(h)));
  }

  IELTS.dayKeyOf = function (date) {
    var p = vnParts(toMs(date) - resetHour() * 3600000);
    return keyOf(p.y, p.m, p.d);
  };
  IELTS.todayKey = function () { return IELTS.dayKeyOf(nowMs()); };
  IELTS.addDays = function (key, n) { return utcToKey(keyToUTC(key) + Math.round(num(n, 0)) * DAY_MS); };
  IELTS.diffDays = function (a, b) { return Math.round((keyToUTC(b) - keyToUTC(a)) / DAY_MS); };
  IELTS.weekday = function (key) { return new Date(keyToUTC(key)).getUTCDay(); };
  IELTS.calendarTodayVN = function () { var p = vnParts(nowMs()); return keyOf(p.y, p.m, p.d); };
  IELTS.daysToExam = function () {
    var ex = IELTS.state && IELTS.state.profile && IELTS.state.profile.examDate;
    if (!ex || !/^\d{4}-\d{2}-\d{2}$/.test(ex)) return null;
    return Math.max(0, IELTS.diffDays(IELTS.calendarTodayVN(), ex));
  };
  /* instant (ms) at which study day `day` ends (= next calendar day at resetHour, VN time) */
  function dayEndMs(day) { return keyToUTC(IELTS.addDays(day, 1)) + resetHour() * 3600000 - VN_OFFSET_MS; }
  IELTS._dayEndMs = dayEndMs;
  /* split [start,end) into pieces that each lie within one study day */
  function splitRange(startMs, endMs) {
    var out = [], s = startMs, guard = 0;
    while (s < endMs && guard++ < 1000) {
      var day = IELTS.dayKeyOf(s), e = Math.min(endMs, dayEndMs(day));
      if (e <= s) e = endMs;
      out.push({ day: day, start: s, end: e });
      s = e;
    }
    return out;
  }
  IELTS._splitRange = splitRange;

  var _clockTimers = null;
  IELTS._lastDay = null;
  IELTS.checkRollover = function () {
    var t = IELTS.todayKey();
    if (IELTS._lastDay && t !== IELTS._lastDay) {
      IELTS._lastDay = t;
      try { IELTS.ensurePlan(); } catch (e) { if (W.console) console.error(e); }
      IELTS.emit("day", t);
      return true;
    }
    IELTS._lastDay = t;
    return false;
  };
  /* Called once by app.js at boot: 30 s rollover check + visibilitychange + 1 s timer tick. */
  IELTS.startClock = function () {
    if (_clockTimers) return;
    IELTS._lastDay = IELTS.todayKey();
    _clockTimers = {
      roll: setInterval(IELTS.checkRollover, 30000),
      tick: setInterval(timerTick, 1000)
    };
    if (W.document && W.document.addEventListener) {
      W.document.addEventListener("visibilitychange", function () {
        if (!W.document.hidden) { IELTS.checkRollover(); timerTick(); }
      });
    }
  };

  /* ------------------------------------------------------------------ *
   * 4.3 State
   * ------------------------------------------------------------------ */
  function defaultState() {
    return {
      version: 1,
      createdAt: new Date(nowMs()).toISOString(),
      profile: {
        name: "", examDate: "",
        dailyMinutes: 250, resetHour: 6, dailyWords: 8,
        aims: { overall: 7.0, listening: 7.5, reading: 7.5, writing: 6.5, speaking: 6.5 },
        baseline: { listening: null, reading: null, writing: null, speaking: null },
        baselineSource: "Tự đánh giá", baselineDate: "",
        manualWeak: { listening: "", reading: "", writing: "", speaking: "" },
        tts: { voiceF: "", voiceM: "", rate: 0.95 },
        onboarded: false
      },
      attendance: {},
      sessions: [],
      submissions: [],
      plan: { day: "", tasks: [], backlog: [], allocation: [] },
      planHistory: {},
      vocab: { daily: { day: "", ids: [] }, items: {}, custom: [] },
      errors: [],
      drafts: {},
      dictationProgress: {},
      readingHighlights: {}
    };
  }
  IELTS.defaultState = defaultState;

  function fillDefaults(target, defs) {
    Object.keys(defs).forEach(function (k) {
      var dv = defs[k], tv = target[k];
      if (tv === undefined) target[k] = clone(dv);
      else if (tv === null && (isObj(dv) || Array.isArray(dv))) target[k] = clone(dv);
      else if (isObj(dv) && isObj(tv)) fillDefaults(tv, dv);
      else if (isObj(dv) && !isObj(tv)) target[k] = clone(dv);
      else if (Array.isArray(dv) && !Array.isArray(tv)) target[k] = clone(dv);
    });
    return target;
  }
  function normalizeState(s) {
    if (!isObj(s)) s = {};
    fillDefaults(s, defaultState());
    s.version = 1;
    if (!isObj(s.plan)) s.plan = { day: "", tasks: [], backlog: [], allocation: [] };
    ["tasks", "backlog", "allocation"].forEach(function (k) { if (!Array.isArray(s.plan[k])) s.plan[k] = []; });
    if (!isObj(s.vocab.items)) s.vocab.items = {};
    if (!isObj(s.vocab.daily)) s.vocab.daily = { day: "", ids: [] };
    if (!Array.isArray(s.vocab.daily.ids)) s.vocab.daily.ids = [];
    return s;
  }
  IELTS._normalizeState = normalizeState;

  var OLD_SKILL = { listening: "listening", reading: "reading", writing: "writing", speaking: "speaking", vocabulary: "vocab", vocab: "vocab" };
  function migrateOld(old) {
    var s = defaultState();
    try {
      var op = old.profile || {};
      if (op.exam && /^\d{4}-\d{2}-\d{2}$/.test(op.exam)) s.profile.examDate = op.exam;
      if (op.target !== undefined && !isNaN(Number(op.target))) s.profile.aims.overall = Number(op.target);
      var sk = old.skills || {};
      Object.keys(sk).forEach(function (name) {
        var key = OLD_SKILL[String(name).toLowerCase()];
        if (key && key !== "vocab" && sk[name]) {
          if (sk[name].band !== undefined && !isNaN(Number(sk[name].band))) s.profile.baseline[key] = Math.round(Number(sk[name].band) * 2) / 2;
          if (sk[name].target !== undefined && !isNaN(Number(sk[name].target))) s.profile.aims[key] = Number(sk[name].target);
          if (sk[name].weak) s.profile.manualWeak[key] = String(sk[name].weak);
        }
      });
      s.profile.baselineSource = "Tự đánh giá (từ bản cũ)";
      var today = IELTS.dayKeyOf(nowMs());
      s.profile.baselineDate = today;
      (Array.isArray(old.errors) ? old.errors : []).forEach(function (row) {
        if (!Array.isArray(row)) return;
        var day = /^\d{4}-\d{2}-\d{2}$/.test(row[0]) ? row[0] : today;
        var skill = OLD_SKILL[String(row[1] || "").toLowerCase()] || "reading";
        var count = Math.max(1, Math.floor(num(row[5], 1)));
        var example = row[3] ? ("Mình trả lời: " + row[3]) : "";
        s.errors.push({
          id: IELTS.uid("err"), error: String(row[2] || "Lỗi chưa đặt tên"), example: example,
          why: "", fix: row[4] ? ("Đáp án / cách đúng: " + row[4]) : "",
          skill: skill, qtype: "", source: "Nhập từ bản cũ",
          createdDay: day, recheckDay: IELTS.addDays(day, 7), count: count,
          examples: example ? [{ day: day, text: example }] : [],
          status: "open", checks: [], basis: "self"
        });
      });
    } catch (e) { if (W.console) console.warn("[IELTS] migration partial", e); }
    return s;
  }
  IELTS._migrateOld = migrateOld;

  function loadState() {
    var raw = lsGet(LS_STATE), s = null;
    if (raw) { try { s = JSON.parse(raw); } catch (e) { s = null; } }
    if (!s) {
      var oldRaw = lsGet(LS_OLD);
      if (oldRaw) {
        try { s = migrateOld(JSON.parse(oldRaw)); s._migrated = true; } catch (e) { s = null; }
      }
    }
    var st = normalizeState(s || defaultState());
    var migrated = !!st._migrated; delete st._migrated;
    IELTS.state = st;
    if (migrated) persist(true);
    return st;
  }

  function persist(silent) {
    try {
      lsSet(LS_STATE, JSON.stringify(IELTS.state));
      return true;
    } catch (e) {
      if (!silent) IELTS.toast("Không lưu được dữ liệu (bộ nhớ trình duyệt đầy hoặc bị chặn). Hãy xuất bản sao lưu.", "error");
      return false;
    }
  }
  IELTS.save = function () {
    var ok = persist(false);
    IELTS.emit("change", { ok: ok });
    return ok;
  };
  IELTS.reload = loadState;

  /* ------------------------------------------------------------------ *
   * UI primitives: toast / modal / confirm (DOM, lazy)
   * ------------------------------------------------------------------ */
  function doc() { return W.document || null; }
  function toastHost() {
    var d = doc(); if (!d || !d.body) return null;
    var h = d.querySelector(".toast-host");
    if (!h) { h = d.createElement("div"); h.className = "toast-host"; h.setAttribute("aria-live", "polite"); d.body.appendChild(h); }
    return h;
  }
  var TOAST_ICON = { success: "check", error: "alert-triangle", warn: "alert-triangle", info: "info" };
  IELTS.toast = function (msg, kind) {
    kind = kind || "info";
    var h = toastHost();
    if (!h) { if (W.console) console.log("[toast:" + kind + "] " + msg); return; }
    var el = doc().createElement("div");
    el.className = "toast " + kind;
    el.setAttribute("role", kind === "error" ? "alert" : "status");
    el.innerHTML = '<span class="toast-ic">' + IELTS.icon(TOAST_ICON[kind] || "info", 18) + '</span><span class="toast-msg">' + IELTS.esc(msg) + "</span>";
    h.appendChild(el);
    var remove = function () {
      el.classList.add("out");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 220);
    };
    el.addEventListener("click", remove);
    setTimeout(remove, kind === "error" ? 5200 : 3200);
  };

  var _modalStack = [];
  IELTS.modal = function (opts) {
    opts = opts || {};
    var d = doc(); if (!d) return function () {};
    var prevFocus = d.activeElement;
    var back = d.createElement("div");
    back.className = "modal-backdrop";
    var actions = opts.actions || [];
    back.innerHTML =
      '<div class="modal' + (opts.wide ? " wide" : "") + (opts.className ? " " + opts.className : "") + '" role="dialog" aria-modal="true">' +
      (opts.title !== undefined && opts.title !== null ?
        '<div class="modal-head"><h3 class="modal-title">' + IELTS.esc(opts.title) + '</h3>' +
        (opts.dismissible === false ? "" : '<button type="button" class="btn ghost icon sm modal-x" aria-label="Đóng">' + IELTS.icon("x", 18) + "</button>") +
        "</div>" : "") +
      '<div class="modal-body">' + (opts.html || "") + "</div>" +
      (actions.length ? '<div class="modal-foot">' + actions.map(function (a, i) {
        return '<button type="button" class="btn ' + IELTS.esc(a.kind || "") + '" data-modal-act="' + i + '">' + IELTS.esc(a.label) + "</button>";
      }).join("") + "</div>" : "") +
      "</div>";
    var closed = false;
    function close() {
      if (closed) return; closed = true;
      d.removeEventListener("keydown", onKey, true);
      back.classList.add("out");
      var i = _modalStack.indexOf(close); if (i >= 0) _modalStack.splice(i, 1);
      setTimeout(function () { if (back.parentNode) back.parentNode.removeChild(back); }, 160);
      if (!_modalStack.length && d.body) d.body.classList.remove("modal-open");
      if (opts.onClose) { try { opts.onClose(); } catch (e) { console.error(e); } }
      if (prevFocus && prevFocus.focus) { try { prevFocus.focus(); } catch (e) { /* ignore */ } }
    }
    function onKey(e) {
      if (_modalStack[_modalStack.length - 1] !== close) return;
      if (e.key === "Escape" && opts.dismissible !== false) { e.preventDefault(); close(); }
    }
    back.addEventListener("mousedown", function (e) {
      if (e.target === back && opts.dismissible !== false) close();
    });
    var x = back.querySelector(".modal-x"); if (x) x.addEventListener("click", close);
    Array.prototype.forEach.call(back.querySelectorAll("[data-modal-act]"), function (b) {
      b.addEventListener("click", function () {
        var a = actions[+b.getAttribute("data-modal-act")];
        if (a && typeof a.onClick === "function") a.onClick(close); else close();
      });
    });
    d.addEventListener("keydown", onKey, true);
    d.body.appendChild(back);
    d.body.classList.add("modal-open");
    _modalStack.push(close);
    var modalEl = back.querySelector(".modal");
    if (opts.onMount) { try { opts.onMount(modalEl, close); } catch (e) { console.error(e); } }
    setTimeout(function () {
      var f = modalEl.querySelector("[autofocus]") || modalEl.querySelector("input,select,textarea") ||
        modalEl.querySelector(".modal-foot .btn.primary, .modal-foot .btn.accent, .modal-foot .btn.danger") || modalEl.querySelector("button");
      if (f && f.focus) { try { f.focus(); } catch (e) { /* ignore */ } }
    }, 30);
    return close;
  };

  IELTS.confirm = function (msg, o) {
    o = o || {};
    return new Promise(function (resolve) {
      var done = false;
      function fin(v, close) { if (done) return; done = true; resolve(v); if (close) close(); }
      IELTS.modal({
        title: o.title || (o.danger ? "Xác nhận thao tác" : "Xác nhận"),
        html: '<p class="confirm-msg">' + IELTS.esc(msg) + "</p>",
        className: "confirm",
        actions: [
          { label: o.cancelLabel || "Huỷ", kind: "ghost", onClick: function (close) { fin(false, close); } },
          { label: o.okLabel || "Đồng ý", kind: o.danger ? "danger" : "primary", onClick: function (close) { fin(true, close); } }
        ],
        onClose: function () { fin(false); }
      });
    });
  };

  /* ------------------------------------------------------------------ *
   * 4.4 Study time: timer + sessions
   * ------------------------------------------------------------------ */
  function idleTimer(lastSkill) {
    return { running: false, paused: false, skill: null, startedAt: null, elapsed: 0, segStart: null, segs: [], lastSkill: lastSkill || null };
  }
  function loadTimer() {
    var t = null;
    try { t = JSON.parse(lsGet(LS_TIMER) || "null"); } catch (e) { t = null; }
    if (!isObj(t)) t = idleTimer();
    if (!Array.isArray(t.segs)) t.segs = [];
    t.running = !!t.running; t.paused = !!t.paused;
    IELTS.timer = t;
    t.elapsed = timerElapsed();
    return t;
  }
  function saveTimer() { try { lsSet(LS_TIMER, JSON.stringify(IELTS.timer)); } catch (e) { /* ignore */ } }
  function timerElapsed() {
    var t = IELTS.timer; if (!t || !t.running) return 0;
    var ms = 0;
    t.segs.forEach(function (sg) { ms += Math.max(0, sg.end - sg.start); });
    if (!t.paused && t.segStart) ms += Math.max(0, nowMs() - t.segStart);
    return Math.floor(ms / 1000);
  }
  IELTS.timerElapsed = function () { var e = timerElapsed(); if (IELTS.timer) IELTS.timer.elapsed = e; return e; };
  function timerTick() {
    if (IELTS.timer && IELTS.timer.running && !IELTS.timer.paused) {
      IELTS.timer.elapsed = timerElapsed();
      IELTS.emit("timer", { type: "tick", elapsed: IELTS.timer.elapsed });
    }
  }
  function timerChanged(kind) {
    IELTS.timer.elapsed = timerElapsed();
    saveTimer();
    IELTS.emit("timer", { type: kind || "state", elapsed: IELTS.timer.elapsed });
  }

  IELTS.timerStart = function (skill) {
    skill = skill || (IELTS.timer && IELTS.timer.lastSkill) || "listening";
    var t = IELTS.timer;
    if (t.running) {
      if (t.skill === skill) { if (t.paused) IELTS.timerResume(); return t; }
      IELTS.timerFinish();
      t = IELTS.timer;
    }
    var n = nowMs();
    IELTS.timer = { running: true, paused: false, skill: skill, startedAt: new Date(n).toISOString(), elapsed: 0, segStart: n, segs: [], lastSkill: skill };
    timerChanged("start");
    return IELTS.timer;
  };
  IELTS.timerPause = function () {
    var t = IELTS.timer;
    if (!t.running || t.paused) return t;
    var n = nowMs();
    if (t.segStart) t.segs.push({ start: t.segStart, end: n });
    t.segStart = null; t.paused = true;
    timerChanged("pause");
    return t;
  };
  IELTS.timerResume = function () {
    var t = IELTS.timer;
    if (!t.running || !t.paused) return t;
    t.segStart = nowMs(); t.paused = false;
    timerChanged("resume");
    return t;
  };
  /* → { skill, seconds, saved, sessions } ; writes a session (source "timer") when ≥ 30 s */
  IELTS.timerFinish = function () {
    var t = IELTS.timer;
    if (!t.running) return { skill: null, seconds: 0, saved: false, sessions: [] };
    var n = nowMs();
    var segs = t.segs.slice();
    if (!t.paused && t.segStart) segs.push({ start: t.segStart, end: n });
    var total = 0;
    segs.forEach(function (sg) { total += Math.max(0, sg.end - sg.start); });
    var seconds = Math.floor(total / 1000);
    var skill = t.skill, sessions = [];
    if (seconds >= 30) {
      var pieces = [];
      segs.forEach(function (sg) { pieces = pieces.concat(splitRange(sg.start, sg.end)); });
      sessions = addSessions(skill, aggregateByDay(pieces), "timer", null);
    }
    IELTS.timer = idleTimer(skill);
    timerChanged("finish");
    return { skill: skill, seconds: seconds, saved: seconds >= 30, sessions: sessions };
  };
  IELTS.timerReset = function () { var s = IELTS.timer && IELTS.timer.lastSkill; IELTS.timer = idleTimer(s); timerChanged("reset"); };

  function aggregateByDay(pieces) {
    var by = {}, order = [];
    pieces.forEach(function (p) {
      if (!by[p.day]) { by[p.day] = { day: p.day, start: p.start, end: p.end, ms: 0 }; order.push(p.day); }
      var b = by[p.day];
      b.start = Math.min(b.start, p.start); b.end = Math.max(b.end, p.end); b.ms += (p.end - p.start);
    });
    return order.map(function (d) { var b = by[d]; return { day: d, start: b.start, end: b.end, seconds: Math.round(b.ms / 1000) }; });
  }
  function addSessions(skill, chunks, source, ref, hint) {
    var out = [];
    chunks.forEach(function (c) {
      if (!(c.seconds > 0)) return;
      var sess = {
        id: IELTS.uid("ses"), skill: skill, day: c.day,
        start: new Date(c.start).toISOString(), end: new Date(c.end).toISOString(),
        seconds: c.seconds, source: source, ref: ref || null
      };
      IELTS.state.sessions.push(sess);
      feedPlan(skill, c.seconds, c.day, hint);
      out.push(sess);
    });
    if (out.length) IELTS.save();
    return out;
  }
  /* how well a plan task's route params fit a practice-context hint (e.g. {tab:"dictation"}, {daily:1}):
     each matching key +2, each key the task pins to a different value -1; no hint → 0 for every task */
  var HINT_KEYS = ["tab", "daily"];
  function hintScore(t, hint) {
    if (!isObj(hint)) return 0;
    var p = (t.route && isObj(t.route.params)) ? t.route.params : {}, sc = 0;
    HINT_KEYS.forEach(function (k) {
      if (hint[k] === undefined || hint[k] === null) return;
      if (p[k] === undefined || p[k] === null || p[k] === "") return;
      sc += String(p[k]) === String(hint[k]) ? 2 : -1;
    });
    return sc;
  }
  function feedPlan(skill, seconds, day, hint) {
    var plan = IELTS.state.plan;
    if (!plan || plan.day !== day || !Array.isArray(plan.tasks)) return;
    var cands = plan.tasks.filter(function (t) { return t.skill === skill && !t.done; });
    /* best context match first, then carried-over tasks, then plan order (stable) */
    var pos = cands.map(function (t, i) { return { t: t, i: i, h: hintScore(t, hint) }; });
    pos.sort(function (a, b) { return (b.h - a.h) || ((b.t.carried ? 1 : 0) - (a.t.carried ? 1 : 0)) || (a.i - b.i); });
    cands = pos.map(function (x) { return x.t; });
    var left = seconds;
    for (var i = 0; i < cands.length && left > 0; i++) {
      var t = cands[i];
      var room = Math.max(0, t.mins * 60 - (t.doneSeconds || 0));
      var take = (i === cands.length - 1) ? left : Math.min(room, left);
      t.doneSeconds = (t.doneSeconds || 0) + take;
      left -= take;
      if (t.doneSeconds >= t.mins * 60) { t.done = true; t.doneAt = new Date(nowMs()).toISOString(); }
    }
  }

  /* hint (optional): practice context such as {tab:"dictation"} or {daily:1}; matched against plan task route params */
  IELTS.logPractice = function (skill, seconds, ref, hint) {
    seconds = Math.round(num(seconds, 0));
    if (!(seconds > 0) || !skill) return [];
    var end = nowMs(), start = end - seconds * 1000;
    return addSessions(skill, aggregateByDay(splitRange(start, end)), "practice", ref || null, isObj(hint) ? hint : null);
  };
  IELTS.beginPractice = function (skill) {
    var t = IELTS.timer;
    if (t && t.running && !t.paused && t.skill === skill) IELTS.timerPause();
    return nowMs();
  };
  IELTS.endPractice = function (start) { return Math.max(0, Math.round((nowMs() - num(start, nowMs())) / 1000)); };

  IELTS.dayMinutes = function (day) {
    day = day || IELTS.todayKey();
    var out = { listening: 0, reading: 0, writing: 0, speaking: 0, vocab: 0, total: 0 };
    IELTS.state.sessions.forEach(function (s) {
      var d = s.day || IELTS.dayKeyOf(s.start);
      if (d !== day) return;
      var sec = num(s.seconds, 0);
      if (out[s.skill] !== undefined) out[s.skill] += sec;
      out.total += sec;
    });
    return out;
  };

  /* ------------------------------------------------------------------ *
   * 4.5 Submissions, grading & stats
   * ------------------------------------------------------------------ */
  /* Reading/Listening exam submission where the user filled in no answer at all (needs detail.answers) */
  IELTS.isBlankSubmission = function (s) {
    if (!s || (s.skill !== "reading" && s.skill !== "listening")) return false;
    var a = s.detail && s.detail.answers;
    if (!isObj(a)) return false;
    return !Object.keys(a).some(function (k) { var v = a[k]; return v !== null && v !== undefined && String(v).trim() !== ""; });
  };
  IELTS.BLANK_NOTE = "Bài trống — không tính band";
  /* practice-context hint for plan matching, derived from what was submitted */
  function practiceHint(s) {
    var h = isObj(s.practiceHint) ? Object.assign({}, s.practiceHint) : {};
    if (h.daily === undefined && s.refId) {
      var dailyId = null;
      try {
        if (s.skill === "reading" && s.kind === "passage") { var dp = IELTS.getDailyPassage(s.day); dailyId = dp && dp.passage ? dp.passage.id : null; }
        else if (s.skill === "writing" && s.kind === "task2" && IELTS._writing && IELTS._writing.dailyPrompt) { var wp = IELTS._writing.dailyPrompt(); dailyId = wp ? wp.id : null; }
      } catch (e) { dailyId = null; }
      if (dailyId && dailyId === s.refId) h.daily = 1;
    }
    if (h.tab === undefined && !h.daily) {
      var TAB_BY_KIND = { dictation: "dictation", section: "section", passage: "passage", task1: "task1", part1: "part1", part2: "forecast", part3: "forecast" };
      if (TAB_BY_KIND[s.kind]) h.tab = TAB_BY_KIND[s.kind];
    }
    return Object.keys(h).length ? h : null;
  }
  IELTS.recordSubmission = function (sub) {
    sub = sub || {};
    var st = IELTS.state;
    if (sub.clientKey) {
      var dup = st.submissions.filter(function (s) { return s.clientKey === sub.clientKey; })[0];
      if (dup) return dup;
    }
    var stored = clone(sub);
    stored.id = IELTS.uid("sub");
    stored.day = IELTS.todayKey();
    stored.at = new Date(nowMs()).toISOString();
    stored.seconds = Math.max(0, Math.round(num(stored.seconds, 0)));
    stored.repeat = !!stored.refId && st.submissions.some(function (s) {
      return s.skill === stored.skill && s.refId === stored.refId && s.kind !== "manual";
    }) && stored.kind !== "manual";
    if (!isObj(stored.score)) stored.score = { raw: null, total: null, accuracy: null, band: null, bandSource: null, criteria: null, status: "ungraded" };
    if (!isObj(stored.detail)) stored.detail = {};
    if (IELTS.isBlankSubmission(stored)) {
      stored.blank = true;
      stored.score.band = null; stored.score.bandSource = null; stored.score.status = "graded"; stored.score.note = IELTS.BLANK_NOTE;
      stored.detail.notes = stored.detail.notes ? IELTS.BLANK_NOTE + " · " + stored.detail.notes : IELTS.BLANK_NOTE;
    }
    var hint = practiceHint(stored);
    delete stored.practiceHint;
    st.submissions.push(stored);
    if (!st.attendance[stored.day]) st.attendance[stored.day] = stored.at;
    if (stored.seconds > 0) IELTS.logPractice(stored.skill, stored.seconds, stored.id, hint); // also saves
    IELTS.save();
    return stored;
  };
  IELTS.updateSubmission = function (id, patch) {
    var s = IELTS.findSubmission(id);
    if (!s) return null;
    Object.keys(patch || {}).forEach(function (k) {
      if (k === "score" && isObj(patch.score)) s.score = Object.assign({}, s.score || {}, patch.score);
      else if (k === "detail" && isObj(patch.detail)) s.detail = Object.assign({}, s.detail || {}, patch.detail);
      else if (k !== "id") s[k] = patch[k];
    });
    IELTS.save();
    return s;
  };
  IELTS.findSubmission = function (id) {
    return IELTS.state.submissions.filter(function (s) { return s.id === id; })[0] || null;
  };
  IELTS.deleteSubmission = function (id) {
    var st = IELTS.state, n = st.submissions.length;
    st.submissions = st.submissions.filter(function (s) { return s.id !== id; });
    if (st.submissions.length !== n) { IELTS.save(); return true; }
    return false;
  };
  IELTS.dayCounts = function (day) {
    day = day || IELTS.todayKey();
    var c = { listening: 0, reading: 0, writing: 0, writingT1: 0, writingT2: 0, speaking: 0 };
    IELTS.state.submissions.forEach(function (s) {
      if (s.day !== day) return;
      if (c[s.skill] !== undefined) c[s.skill]++;
      if (s.skill === "writing") {
        if (s.kind === "task1") c.writingT1++;
        else if (s.kind === "task2") c.writingT2++;
      }
    });
    return c;
  };

  var BAND_TABLE = {
    listening: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5]],
    reading: [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5]]
  };
  IELTS.BAND_TABLE = BAND_TABLE;
  /* only for full tests (raw out of 40) */
  IELTS.bandFromRaw = function (skill, raw) {
    var t = BAND_TABLE[skill]; if (!t) return null;
    raw = Math.floor(num(raw, 0));
    if (raw <= 0 && skill === "listening") return 0;
    for (var i = 0; i < t.length; i++) if (raw >= t[i][0]) return t[i][1];
    return 2;
  };
  function round05(x) { return Math.round(x * 2) / 2; }
  IELTS.roundOverall = function (x) {
    if (x === null || x === undefined || isNaN(Number(x))) return null;
    x = Math.round(Number(x) * 1000) / 1000;
    var f = Math.floor(x), frac = x - f;
    if (frac < 0.25) return f;
    if (frac < 0.75) return f + 0.5;
    return f + 1;
  };
  function hasBand(s) { return s && s.score && s.score.band !== null && s.score.band !== undefined && !isNaN(Number(s.score.band)); }
  function byAtDesc(a, b) { return String(b.at || "").localeCompare(String(a.at || "")); }
  function baselineOf(skill) {
    var b = IELTS.state.profile.baseline || {};
    return (b[skill] === null || b[skill] === undefined || b[skill] === "" || isNaN(Number(b[skill]))) ? null : Number(b[skill]);
  }
  IELTS.skillBand = function (skill) {
    var subs = IELTS.state.submissions.filter(function (s) { return s.skill === skill; });
    var base = baselineOf(skill), src = "Baseline (" + (IELTS.state.profile.baselineSource || "Tự đánh giá") + ")";
    if (skill === "listening" || skill === "reading") {
      var full = subs.filter(function (s) { return s.kind === "full" && !s.repeat && hasBand(s) && !IELTS.isBlankSubmission(s); }).sort(byAtDesc).slice(0, 3);
      if (full.length) {
        var avg = full.reduce(function (a, s) { return a + Number(s.score.band); }, 0) / full.length;
        return { band: round05(avg), source: full.length > 1 ? ("TB " + full.length + " đề full gần nhất") : "Đề full gần nhất" };
      }
    } else if (skill === "writing") {
      var t1 = subs.filter(function (s) { return s.kind === "task1" && hasBand(s); }).sort(byAtDesc)[0];
      var t2 = subs.filter(function (s) { return s.kind === "task2" && hasBand(s); }).sort(byAtDesc)[0];
      if (t1 && t2) return { band: round05((Number(t1.score.band) + 2 * Number(t2.score.band)) / 3), source: "Task 1 + Task 2 gần nhất (T2 ×2)" };
      if (t2) return { band: Number(t2.score.band), source: "Task 2 gần nhất" };
      if (t1) return { band: Number(t1.score.band), source: "Task 1 gần nhất" };
    } else if (skill === "speaking") {
      var sp = subs.filter(hasBand).sort(byAtDesc).slice(0, 3);
      if (sp.length) {
        var a2 = sp.reduce(function (a, s) { return a + Number(s.score.band); }, 0) / sp.length;
        return { band: round05(a2), source: sp.length > 1 ? ("TB " + sp.length + " bài nói gần nhất") : "Bài nói gần nhất" };
      }
    }
    if (base !== null) return { band: base, source: src };
    return { band: null, source: null };
  };
  IELTS.overallBand = function () {
    var bands = IELTS.skills.map(function (k) { return IELTS.skillBand(k).band; });
    if (bands.some(function (b) { return b === null; })) return { band: null, complete: false, bands: bands };
    var avg = bands.reduce(function (a, b) { return a + b; }, 0) / 4;
    return { band: IELTS.roundOverall(avg), complete: true, bands: bands };
  };

  /* Question types & criteria */
  IELTS.QTYPES = {
    listening: {
      "form": { name: "Form Completion", advice: "Nghe kỹ tên riêng, số và chữ được đánh vần; kiểm tra giới hạn số từ trước khi chép." },
      "note": { name: "Note Completion", advice: "Đọc trước tiêu đề ghi chú để đoán loại từ cần điền (danh từ, số, tính từ)." },
      "table": { name: "Table Completion", advice: "Đọc theo hàng và cột để biết thông tin nằm ở đâu; chú ý đơn vị và số nhiều." },
      "flow": { name: "Flow-chart Completion", advice: "Bám trình tự các bước; từ nối như 'then', 'after that' báo hiệu bước mới." },
      "summary": { name: "Summary Completion", advice: "Bản tóm tắt dùng từ đồng nghĩa — nghe ý chứ đừng chờ đúng từ in trên đề." },
      "sentence": { name: "Sentence Completion", advice: "Câu điền phải đúng ngữ pháp; đọc cả câu trước khi nghe để đoán từ loại." },
      "mcq": { name: "Multiple Choice", advice: "Cẩn thận bẫy: người nói thường nhắc cả 3 phương án rồi mới chốt đáp án cuối cùng." },
      "mcq-multi": { name: "Multiple Choice (chọn 2)", advice: "Gạch từng phương án khi nghe thấy bị phủ định; nhớ chọn đủ 2 đáp án." },
      "matching": { name: "Matching", advice: "Đọc trước danh sách lựa chọn, nghe từ đồng nghĩa thay vì chờ từ khoá y hệt." },
      "map": { name: "Map/Plan Labelling", advice: "Xác định điểm bắt đầu và từ chỉ hướng (opposite, next to, left) trước khi audio chạy." },
      "diagram": { name: "Diagram Labelling", advice: "Nắm tên các bộ phận đã cho, theo dõi người nói mô tả theo thứ tự không gian." },
      "short": { name: "Short Answer", advice: "Câu trả lời ngắn, đúng giới hạn từ; thường là danh từ hoặc con số cụ thể." }
    },
    reading: {
      "tfng": { name: "True/False/Not Given", advice: "FALSE là trái ngược với bài; NOT GIVEN là bài không nhắc tới — đừng dùng kiến thức ngoài." },
      "ynng": { name: "Yes/No/Not Given", advice: "Tìm quan điểm của tác giả, chú ý từ chỉ thái độ như 'argue', 'doubt', 'claim'." },
      "headings": { name: "Matching Headings", advice: "Đọc câu chủ đề và ý chính cả đoạn; loại heading chỉ khớp một chi tiết nhỏ." },
      "info": { name: "Matching Information", advice: "Thông tin nằm rải rác và một đoạn có thể dùng nhiều lần; scan chi tiết cụ thể, không tìm ý chính." },
      "features": { name: "Matching Features", advice: "Scan tên riêng (người, tổ chức, năm) trước rồi đọc kỹ câu quanh mỗi tên." },
      "endings": { name: "Matching Sentence Endings", advice: "Ghép phải hợp cả nghĩa lẫn ngữ pháp; câu hỏi đi theo thứ tự bài đọc." },
      "mcq": { name: "Multiple Choice", advice: "Khoanh vùng đoạn chứa thông tin rồi so từng phương án; phương án chép nguyên từ bài thường là bẫy." },
      "mcq-multi": { name: "Multiple Choice (chọn 2)", advice: "Kiểm chứng từng phương án với bài; mỗi đáp án đúng được tính 1 điểm riêng." },
      "sentence": { name: "Sentence Completion", advice: "Chép đúng từ trong bài, đúng giới hạn số từ và hợp ngữ pháp của câu." },
      "summary": { name: "Summary Completion", advice: "Xác định đoạn được tóm tắt, đoán từ loại cho từng chỗ trống, chú ý paraphrase." },
      "note": { name: "Note/Table/Flow-chart Completion", advice: "Bám theo cấu trúc ghi chú/bảng; thông tin thường nằm gọn trong vài đoạn liên tiếp." },
      "diagram": { name: "Diagram Label Completion", advice: "Đối chiếu nhãn với đoạn mô tả quy trình/cấu tạo; chép đúng từ trong bài." },
      "short": { name: "Short Answer", advice: "Trả lời ngắn bằng từ trong bài; câu hỏi thường theo thứ tự đoạn văn." }
    }
  };
  IELTS.CRITERIA = {
    writing: {
      "tr": { name: "Task Achievement / Task Response", short: "TA/TR", advice: "Trả lời đủ mọi phần của đề, quan điểm rõ ràng (Task 1: có overview) và phát triển ý bằng ví dụ cụ thể." },
      "cc": { name: "Coherence & Cohesion", short: "CC", advice: "Mỗi đoạn một ý chính, dùng từ nối đa dạng nhưng tự nhiên, tham chiếu rõ ràng." },
      "lr": { name: "Lexical Resource", short: "LR", advice: "Dùng collocation chính xác, paraphrase đề, tránh lặp từ và lỗi chính tả." },
      "gra": { name: "Grammatical Range & Accuracy", short: "GRA", advice: "Kết hợp câu phức đúng ngữ pháp; soát lỗi thì, mạo từ và hoà hợp chủ ngữ – động từ." }
    },
    speaking: {
      "fc": { name: "Fluency & Coherence", short: "FC", advice: "Nói liền mạch, mở rộng câu trả lời bằng lý do và ví dụ; hạn chế ngập ngừng dài." },
      "lr": { name: "Lexical Resource", short: "LR", advice: "Dùng collocation/idiom hợp chủ đề và biết paraphrase khi quên từ." },
      "gra": { name: "Grammatical Range & Accuracy", short: "GRA", advice: "Đa dạng cấu trúc (câu điều kiện, mệnh đề quan hệ) mà vẫn giữ độ chính xác." },
      "p": { name: "Pronunciation", short: "P", advice: "Chú ý trọng âm từ, ngữ điệu và âm cuối; luyện shadowing kết hợp ghi âm." }
    }
  };
  IELTS.qtypeName = function (skill, key) {
    var q = IELTS.QTYPES[skill] && IELTS.QTYPES[skill][key];
    if (q) return q.name;
    var any = (IELTS.QTYPES.listening[key] || IELTS.QTYPES.reading[key]);
    return any ? any.name : (key || "—");
  };
  IELTS.criterionName = function (skill, key) {
    var c = IELTS.CRITERIA[skill] && IELTS.CRITERIA[skill][key];
    return c ? c.name : (key || "—");
  };

  function inWindow(day, days) {
    if (!day) return false;
    var d = IELTS.diffDays(day, IELTS.todayKey());
    return d >= 0 && d < days;
  }
  function isGradedLR(s) {
    return (s.kind === "section" || s.kind === "passage" || s.kind === "full") && !s.repeat &&
      s.score && s.score.status === "graded" && num(s.score.total, 0) > 0;
  }

  IELTS.typeStats = function (skill, opts) {
    var days = (opts && opts.days) || 30;
    var map = {};
    var defs = IELTS.QTYPES[skill] || {};
    Object.keys(defs).forEach(function (k) { map[k] = { type: k, name: defs[k].name, correct: 0, total: 0, refs: {} }; });
    IELTS.state.submissions.forEach(function (s) {
      if (s.skill !== skill || s.repeat || s.kind === "dictation" || s.kind === "manual") return;
      if (!inWindow(s.day, days)) return;
      var res = s.detail && Array.isArray(s.detail.results) ? s.detail.results : [];
      res.forEach(function (r) {
        if (!r || !r.type) return;
        var m = map[r.type] || (map[r.type] = { type: r.type, name: IELTS.qtypeName(skill, r.type), correct: 0, total: 0, refs: {} });
        m.total++; if (r.correct) m.correct++;
        m.refs[s.refId || s.id] = 1;
      });
    });
    var out = Object.keys(map).map(function (k) {
      var m = map[k], sets = Object.keys(m.refs).length;
      var acc = m.total ? Math.round(m.correct / m.total * 100) : null;
      var level = "insufficient";
      if (m.total >= 20 && sets >= 3) level = acc < 70 ? "weak" : (acc <= 90 ? "improving" : "strong");
      return { type: m.type, name: m.name, correct: m.correct, total: m.total, acc: acc, sets: sets, level: level };
    });
    out.sort(function (a, b) {
      if ((a.total > 0) !== (b.total > 0)) return a.total > 0 ? -1 : 1;
      if (a.total > 0) { if (a.acc !== b.acc) return a.acc - b.acc; return b.total - a.total; }
      return 0;
    });
    return out;
  };

  IELTS.criteriaStats = function (skill) {
    var defs = IELTS.CRITERIA[skill] || {};
    var subs = IELTS.state.submissions.filter(function (s) {
      return s.skill === skill && s.score && isObj(s.score.criteria) && Object.keys(s.score.criteria).length;
    }).sort(byAtDesc).slice(0, 5);
    return Object.keys(defs).map(function (k) {
      var vals = subs.map(function (s) { return s.score.criteria[k]; }).filter(function (v) { return v !== null && v !== undefined && v !== "" && !isNaN(Number(v)); }).map(Number);
      var avg = vals.length ? Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length * 10) / 10 : null;
      return { key: k, name: defs[k].name, short: defs[k].short, avg: avg, count: vals.length, advice: defs[k].advice };
    });
  };

  IELTS.recentAccuracy = function (skill, n) {
    n = n || 5;
    var subs = IELTS.state.submissions.filter(function (s) { return s.skill === skill && isGradedLR(s); }).sort(byAtDesc).slice(0, n);
    var raw = 0, total = 0, refs = {}, days = {};
    subs.forEach(function (s) { raw += num(s.score.raw, 0); total += num(s.score.total, 0); refs[s.refId || s.id] = 1; days[s.day] = 1; });
    return { acc: total ? Math.round(raw / total * 100) : null, count: subs.length, sets: Object.keys(refs).length, days: Object.keys(days).length, questions: total };
  };

  IELTS.isStable = function (skill) {
    if (skill !== "listening" && skill !== "reading") return false;
    var byRef = {};
    IELTS.state.submissions.forEach(function (s) {
      if (s.skill !== skill || !isGradedLR(s) || !inWindow(s.day, 14)) return;
      var k = s.refId || s.id;
      if (!byRef[k] || String(s.at) > String(byRef[k].at)) byRef[k] = s;
    });
    var list = Object.keys(byRef).map(function (k) { return byRef[k]; });
    if (list.length < 5) return false;
    var days = {}, q = 0;
    for (var i = 0; i < list.length; i++) {
      var s = list[i], tot = num(s.score.total, 0), acc = tot ? num(s.score.raw, 0) / tot * 100 : 0;
      if (!(acc > 90)) return false;
      days[s.day] = 1; q += tot;
    }
    return Object.keys(days).length >= 3 && q >= 50;
  };

  IELTS.weakAreas = function (skill) {
    var out = { weak: [], strong: [], improving: [], insufficient: [], manual: (IELTS.state.profile.manualWeak || {})[skill] || "" };
    if (skill === "listening" || skill === "reading") {
      IELTS.typeStats(skill).forEach(function (t) {
        var it = { key: t.type, name: t.name, acc: t.acc, total: t.total, advice: (IELTS.QTYPES[skill][t.type] || {}).advice || "" };
        (out[t.level] || out.insufficient).push(it);
      });
    } else if (skill === "writing" || skill === "speaking") {
      var aim = num((IELTS.state.profile.aims || {})[skill], 6.5);
      IELTS.criteriaStats(skill).forEach(function (c) {
        var it = { key: c.key, name: c.name, acc: c.avg, advice: c.advice };
        if (c.avg === null) out.insufficient.push(it);
        else if (c.avg < aim - 0.5) out.weak.push(it);
        else if (c.avg >= aim) out.strong.push(it);
        else out.improving.push(it);
      });
    }
    return out;
  };

  /* ------------------------------------------------------------------ *
   * 4.6 Attendance
   * ------------------------------------------------------------------ */
  IELTS.isCheckedIn = function (day) { return !!IELTS.state.attendance[day || IELTS.todayKey()]; };
  IELTS.checkIn = function () {
    var d = IELTS.todayKey();
    if (IELTS.state.attendance[d]) return false;
    IELTS.state.attendance[d] = new Date(nowMs()).toISOString();
    IELTS.save();
    return true;
  };
  IELTS.streak = function () {
    var att = IELTS.state.attendance, d = IELTS.todayKey();
    if (!att[d]) d = IELTS.addDays(d, -1);
    var n = 0, guard = 0;
    while (att[d] && guard++ < 5000) { n++; d = IELTS.addDays(d, -1); }
    return n;
  };

  /* ------------------------------------------------------------------ *
   * 4.7 Content lookup
   * ------------------------------------------------------------------ */
  IELTS.wordId = function (word) {
    return String(word || "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };
  IELTS.allSections = function () {
    var out = [];
    (IELTS.data.listeningTests || []).forEach(function (t) { (t.sections || []).forEach(function (s) { out.push({ test: t, section: s }); }); });
    return out;
  };
  IELTS.findSection = function (id) { return IELTS.allSections().filter(function (x) { return x.section.id === id; })[0] || null; };
  IELTS.findListeningTest = function (id) { return (IELTS.data.listeningTests || []).filter(function (t) { return t.id === id; })[0] || null; };
  IELTS.allPassages = function () {
    var out = [];
    (IELTS.data.readingTests || []).forEach(function (t) { (t.passages || []).forEach(function (p) { out.push({ test: t, passage: p }); }); });
    return out;
  };
  IELTS.findPassage = function (id) { return IELTS.allPassages().filter(function (x) { return x.passage.id === id; })[0] || null; };
  IELTS.findReadingTest = function (id) { return (IELTS.data.readingTests || []).filter(function (t) { return t.id === id; })[0] || null; };
  IELTS.findDictation = function (id) { return (IELTS.data.dictation || []).filter(function (d) { return d.id === id; })[0] || null; };
  function wid(w) { return w ? (w.id || IELTS.wordId(w.word)) : ""; }
  function bankWords() { return (IELTS.data.vocab && Array.isArray(IELTS.data.vocab.words)) ? IELTS.data.vocab.words : []; }
  IELTS.findWord = function (id) {
    if (!id) return null;
    var i, b = bankWords();
    for (i = 0; i < b.length; i++) if (wid(b[i]) === id) return b[i];
    var ps = IELTS.allPassages();
    for (i = 0; i < ps.length; i++) {
      var v = ps[i].passage.vocab || [];
      for (var j = 0; j < v.length; j++) if (wid(v[j]) === id) return v[j];
    }
    var c = (IELTS.state.vocab && IELTS.state.vocab.custom) || [];
    for (i = 0; i < c.length; i++) if (wid(c[i]) === id) return c[i];
    return null;
  };

  /* ------------------------------------------------------------------ *
   * 4.8 Daily content bundle
   * ------------------------------------------------------------------ */
  IELTS.dailyIndex = function (day) { return IELTS.diffDays("2026-01-01", day || IELTS.todayKey()); };
  function mod(a, n) { return ((a % n) + n) % n; }
  /* Pure for a given day: only submissions made BEFORE `day` count as "done", so the pick never changes within the day. */
  IELTS.getDailyPassage = function (day) {
    day = day || IELTS.todayKey();
    var all = IELTS.allPassages();
    if (!all.length) return null;
    var done = {};
    IELTS.state.submissions.forEach(function (s) {
      if (s.skill !== "reading" || s.repeat || !s.day || s.day >= day) return;
      if (s.kind === "passage") done[s.refId] = 1;
      else if (s.kind === "full") {
        var t = IELTS.findReadingTest(s.refId);
        if (t) (t.passages || []).forEach(function (p) { done[p.id] = 1; });
      }
    });
    var idx = IELTS.dailyIndex(day);
    var fresh = all.filter(function (x) { return !done[x.passage.id]; });
    if (fresh.length) { var f = fresh[mod(idx, fresh.length)]; return { test: f.test, passage: f.passage, reviewMode: false }; }
    var r = all[mod(idx, all.length)];
    return { test: r.test, passage: r.passage, reviewMode: true };
  };
  IELTS.getDailyTopic = function (day) {
    var d = IELTS.getDailyPassage(day);
    return d && d.passage ? (d.passage.topic || null) : null;
  };
  IELTS.getTodayWords = function () {
    var st = IELTS.state, day = IELTS.todayKey();
    var dp = IELTS.getDailyPassage(day);
    var pv = {};
    if (dp) (dp.passage.vocab || []).forEach(function (w) { pv[wid(w)] = 1; });
    function decorate(ids) {
      return ids.map(function (id) {
        var w = IELTS.findWord(id); if (!w) return null;
        var o = Object.assign({}, w); o.id = id; o.fromPassage = (dp && pv[id]) ? dp.passage.id : null;
        return o;
      }).filter(Boolean);
    }
    if (st.vocab.daily && st.vocab.daily.day === day && st.vocab.daily.ids.length) return decorate(st.vocab.daily.ids);
    var n = Math.max(1, Math.floor(num(st.profile.dailyWords, 8)));
    var items = st.vocab.items, picked = [], seen = {};
    function take(w) {
      var id = wid(w);
      if (!id || seen[id] || items[id] || picked.length >= n) return;
      seen[id] = 1; picked.push(id);
    }
    if (dp) (dp.passage.vocab || []).forEach(take);
    var topic = dp ? dp.passage.topic : null;
    if (topic) bankWords().forEach(function (w) { if (w.topic === topic) take(w); });
    bankWords().forEach(take);
    if (picked.length) {
      st.vocab.daily = { day: day, ids: picked };
      persist(true);
    }
    return decorate(picked);
  };

  /* ------------------------------------------------------------------ *
   * 4.9 Vocabulary SRS
   * ------------------------------------------------------------------ */
  IELTS.SRS = [1, 2, 5, 7, 14, 30];
  IELTS.learnWord = function (id, source) {
    if (!id) return false;
    var items = IELTS.state.vocab.items;
    if (items[id]) return false;
    var today = IELTS.todayKey();
    items[id] = { status: "review", stage: 0, due: IELTS.addDays(today, 1), learnedOn: today, history: [{ day: today, result: "learn" }], source: source || "" };
    IELTS.save();
    return true;
  };
  IELTS.reviewWord = function (id, remembered) {
    var it = IELTS.state.vocab.items[id], today = IELTS.todayKey();
    if (!it || it.status !== "review" || !it.due || it.due > today) return false;
    if (remembered) {
      it.stage = (it.stage || 0) + 1;
      if (it.stage >= IELTS.SRS.length) { it.status = "learned"; it.masteredOn = today; it.due = null; }
      else it.due = IELTS.addDays(today, IELTS.SRS[it.stage]);
    } else {
      it.stage = 0; it.due = IELTS.addDays(today, 1);
    }
    (it.history = it.history || []).push({ day: today, result: remembered ? "ok" : "forgot" });
    IELTS.save();
    return true;
  };
  function wordWithItem(id) {
    var w = IELTS.findWord(id);
    var o = w ? Object.assign({}, w) : { word: id, ipa: "", pos: "", band: "", vi: "", example: "" };
    o.id = id; o.srs = IELTS.state.vocab.items[id];
    return o;
  }
  IELTS.dueWords = function () {
    var today = IELTS.todayKey(), items = IELTS.state.vocab.items;
    return Object.keys(items).filter(function (id) { var it = items[id]; return it.status === "review" && it.due && it.due <= today; })
      .sort(function (a, b) { return items[a].due < items[b].due ? -1 : items[a].due > items[b].due ? 1 : 0; })
      .map(wordWithItem);
  };
  IELTS.reviewingWords = function () {
    var items = IELTS.state.vocab.items;
    return Object.keys(items).filter(function (id) { return items[id].status === "review"; })
      .sort(function (a, b) { return String(items[a].due).localeCompare(String(items[b].due)); }).map(wordWithItem);
  };
  IELTS.learnedWords = function () {
    var items = IELTS.state.vocab.items;
    return Object.keys(items).filter(function (id) { return items[id].status === "learned"; }).map(wordWithItem);
  };
  IELTS.addCustomWord = function (word) {
    if (!word || !word.word) return false;
    var w = Object.assign({}, word);
    w.id = w.id || IELTS.wordId(w.word);
    if (!w.id) return false;
    var c = IELTS.state.vocab.custom;
    if (c.some(function (x) { return wid(x) === w.id; })) return false;
    c.push(w);
    IELTS.save();
    return w;
  };

  /* ------------------------------------------------------------------ *
   * 4.10 Daily plan (DailyPlanner)
   * ------------------------------------------------------------------ */
  function ceil5(x) { return Math.max(5, Math.ceil(x / 5) * 5); }
  function evidenceLR(skill) {
    return IELTS.state.submissions.filter(function (s) { return s.skill === skill && isGradedLR(s) && inWindow(s.day, 14); }).length >= 3;
  }
  function evidenceWS(skill) {
    return IELTS.state.submissions.some(function (s) { return s.skill === skill && hasBand(s); });
  }
  function fmtGap(g) { return (Math.round(g * 10) / 10).toFixed(1); }

  /* Water-filling proportional split of `budget` minutes into multiples of 5 within [lo, hi]. */
  function distribute(budget, weights, lo, hi) {
    var n = weights.length;
    var units = Math.floor(budget / 5), rem = budget - units * 5;
    var loU = Math.floor(lo / 5), hiU = Math.floor(hi / 5);
    if (loU * n > units) loU = Math.floor(units / n);
    if (hiU * n < units) hiU = Math.ceil(units / n);
    var fixed = new Array(n), val = new Array(n), i, guard = 0;
    for (i = 0; i < n; i++) fixed[i] = null;
    while (guard++ < n + 2) {
      var free = [], remaining = units, ws = 0;
      for (i = 0; i < n; i++) { if (fixed[i] === null) { free.push(i); ws += weights[i]; } else remaining -= fixed[i]; }
      if (!free.length) break;
      var viol = false;
      free.forEach(function (j) { val[j] = ws > 0 ? remaining * weights[j] / ws : remaining / free.length; });
      // fix the worst violators first (both directions handled across iterations)
      var lowV = free.filter(function (j) { return val[j] < loU; });
      var highV = free.filter(function (j) { return val[j] > hiU; });
      if (lowV.length) { lowV.forEach(function (j) { fixed[j] = loU; }); viol = true; }
      else if (highV.length) { highV.forEach(function (j) { fixed[j] = hiU; }); viol = true; }
      if (!viol) break;
    }
    for (i = 0; i < n; i++) if (fixed[i] !== null) val[i] = fixed[i];
    var out = val.map(function (v) { return Math.floor(v + 1e-9); });
    var sum = out.reduce(function (a, b) { return a + b; }, 0);
    var order = val.map(function (v, j) { return { j: j, f: v - Math.floor(v + 1e-9) }; }).sort(function (a, b) { return b.f - a.f || a.j - b.j; });
    var k = 0, g2 = 0;
    while (sum < units && g2++ < 1000) { var c = order[k % n].j; if (out[c] < hiU) { out[c]++; sum++; } k++; }
    g2 = 0; k = n - 1;
    while (sum > units && g2++ < 1000) { var c2 = order[((k % n) + n) % n].j; if (out[c2] > loU) { out[c2]--; sum--; } k--; }
    out = out.map(function (u) { return u * 5; });
    if (rem) { var mx = 0; for (i = 1; i < n; i++) if (weights[i] > weights[mx]) mx = i; out[mx] += rem; }
    return out;
  }
  IELTS._distribute = distribute;

  IELTS.computeAllocation = function () {
    var st = IELTS.state, p = st.profile, aims = p.aims || {};
    var budget = Math.max(0, Math.round(num(p.dailyMinutes, 250)));
    var rows = IELTS.planSkills.map(function (skill) {
      var w = 1, reasons = [];
      if (skill === "vocab") {
        var due = IELTS.dueWords().length;
        var yesterday = IELTS.addDays(IELTS.todayKey(), -1);
        var learnedY = Object.keys(st.vocab.items).filter(function (id) { return st.vocab.items[id].learnedOn === yesterday; }).length;
        if (due > 15) { w += 0.3; reasons.push(due + " từ đến hạn ôn"); }
        else if (due === 0 && learnedY >= Math.max(1, num(p.dailyWords, 8))) { w -= 0.3; reasons.push("Không có từ đến hạn — giữ nhịp"); }
        else reasons.push(due > 0 ? (due + " từ đến hạn · từ mới hôm nay") : "Học từ mới hôm nay");
        return { skill: skill, weight: w, reason: reasons.join(" · ") };
      }
      var lr = skill === "listening" || skill === "reading";
      var evidence = lr ? evidenceLR(skill) : evidenceWS(skill);
      if (!evidence) return { skill: skill, weight: 1, reason: "Mặc định — chưa đủ dữ liệu" };
      if (lr && IELTS.isStable(skill)) return { skill: skill, weight: 0.6, reason: "Ổn định >90% — duy trì" };
      var band = IELTS.skillBand(skill).band, aim = num(aims[skill], null);
      if (band !== null && aim !== null) {
        var gap = Math.max(0, aim - band);
        w += 0.6 * gap;
        reasons.push(gap > 0 ? ("Cách aim " + fmtGap(gap) + " band") : "Đã đạt aim");
      }
      if (lr) {
        var ra = IELTS.recentAccuracy(skill);
        if (ra.acc !== null) {
          if (ra.acc < 70) w += 0.4; else if (ra.acc < 80) w += 0.2;
          reasons.push("Accuracy gần đây " + ra.acc + "%");
        }
      }
      w = Math.max(0.6, Math.min(1.8, w));
      return { skill: skill, weight: Math.round(w * 100) / 100, reason: reasons.join(" · ") || "Theo dữ liệu gần đây" };
    });
    var mins = distribute(budget, rows.map(function (r) { return r.weight; }), 20, 90);
    return rows.map(function (r, i) { return { skill: r.skill, mins: mins[i], reason: r.reason, weight: r.weight }; });
  };

  function weakestType(skill, day) {
    var stats = IELTS.typeStats(skill);
    var withData = stats.filter(function (t) { return t.total > 0; });
    var suff = withData.filter(function (t) { return t.level !== "insufficient"; });
    var pick = suff[0] || withData[0];
    if (pick) return pick.type;
    var keys = Object.keys(IELTS.QTYPES[skill] || {});
    return keys.length ? keys[mod(IELTS.dailyIndex(day) + (skill === "reading" ? 3 : 0), keys.length)] : "";
  }
  var T1_TYPES = ["Line graph", "Bar chart", "Pie chart", "Table", "Process", "Map", "Mixed charts"];
  function mkTask(day, skill, mins, title, detail, route) {
    return { id: IELTS.uid("task"), day: day, skill: skill, title: title, detail: detail, mins: mins, doneSeconds: 0, done: false, doneAt: null, carried: false, route: route };
  }
  function splitTwo(mins, second) { second = Math.max(5, Math.min(mins - 5, second)); return [mins - second, second]; }
  function newTasks(skill, mins, day) {
    if (!(mins > 0)) return [];
    var out = [], parts, t;
    if (skill === "listening") {
      t = weakestType("listening", day);
      var lname = IELTS.qtypeName("listening", t);
      if (mins >= 45) {
        parts = splitTwo(mins, 15);
        out.push(mkTask(day, skill, parts[0], "Section lẻ — dạng " + lname, "Làm 1 section có dạng này, soát transcript và ghi lỗi vào sổ.", { page: "listening", params: { tab: "section", type: t } }));
        out.push(mkTask(day, skill, parts[1], "Dictation", "Nghe chép chính tả 1 bài — chú ý âm nối và âm cuối.", { page: "listening", params: { tab: "dictation" } }));
      } else {
        out.push(mkTask(day, skill, mins, "Section lẻ — dạng " + lname, "Làm 1 section có dạng này, soát transcript và ghi lỗi vào sổ.", { page: "listening", params: { tab: "section", type: t } }));
      }
    } else if (skill === "reading") {
      if (mins >= 50) {
        t = weakestType("reading", day);
        parts = splitTwo(mins, Math.floor(mins / 10) * 5);
        out.push(mkTask(day, skill, parts[0], "Passage đề xuất hôm nay", "Bài đọc theo chủ đề hôm nay; lọc từ vựng sau khi nộp.", { page: "reading", params: { daily: 1 } }));
        out.push(mkTask(day, skill, parts[1], "Passage lẻ — dạng " + IELTS.qtypeName("reading", t), "Luyện 1 passage có dạng này và phân tích vì sao sai.", { page: "reading", params: { tab: "passage", type: t } }));
      } else {
        out.push(mkTask(day, skill, mins, "Passage đề xuất hôm nay", "Bài đọc theo chủ đề hôm nay; lọc từ vựng sau khi nộp.", { page: "reading", params: { daily: 1 } }));
      }
    } else if (skill === "writing") {
      if (mins >= 50) {
        var t1 = Math.max(20, Math.min(30, Math.round(mins / 15) * 5));
        parts = splitTwo(mins, t1);
        var ty = T1_TYPES[mod(IELTS.dailyIndex(day), T1_TYPES.length)];
        out.push(mkTask(day, skill, parts[0], "Task 2 — đề hôm nay (dùng từ vựng hôm nay)", "Lập dàn ý 5 phút, viết ≥ 250 từ và cố dùng 3–5 từ mới.", { page: "writing", params: { daily: 1 } }));
        out.push(mkTask(day, skill, parts[1], "Task 1 — " + ty, "Viết ≥ 150 từ: overview rõ ràng + số liệu chọn lọc.", { page: "writing", params: { tab: "task1" } }));
      } else {
        out.push(mkTask(day, skill, mins, "Task 2 — đề hôm nay (dùng từ vựng hôm nay)", "Lập dàn ý 5 phút, viết ≥ 250 từ và cố dùng 3–5 từ mới.", { page: "writing", params: { daily: 1 } }));
      }
    } else if (skill === "speaking") {
      if (mins >= 40) {
        var p1 = Math.max(10, Math.min(20, Math.round(mins / 15) * 5));
        parts = splitTwo(mins, p1);
        out.push(mkTask(day, skill, parts[0], "Part 2 + Part 3 — topic forecast", "Ghi âm Part 2 (2 phút) rồi trả lời các câu Part 3 liên quan.", { page: "speaking", params: { tab: "forecast" } }));
        out.push(mkTask(day, skill, parts[1], "Part 1 — luyện ghi âm", "Ghi âm 4–6 câu Part 1, nghe lại và tự chấm theo 4 tiêu chí.", { page: "speaking", params: { tab: "part1" } }));
      } else {
        out.push(mkTask(day, skill, mins, "Part 2 + Part 3 — topic forecast", "Ghi âm Part 2 (2 phút) rồi trả lời các câu Part 3 liên quan.", { page: "speaking", params: { tab: "forecast" } }));
      }
    } else if (skill === "vocab") {
      var due = IELTS.dueWords().length, k = Math.max(1, Math.floor(num(IELTS.state.profile.dailyWords, 8)));
      if (due > 0 && mins >= 10) {
        var rv = Math.max(5, Math.min(mins - 5, ceil5(due * 1.2)));
        out.push(mkTask(day, skill, rv, "Ôn " + due + " từ đến hạn", "Ôn theo lịch SRS 1-2-5-7-14-30 ngày.", { page: "vocab", params: { tab: "review" } }));
        out.push(mkTask(day, skill, mins - rv, "Học " + k + " từ mới hôm nay", "Từ của bài đọc hôm nay, kèm phiên âm và câu ví dụ.", { page: "vocab", params: { tab: "today" } }));
      } else if (due > 0) {
        out.push(mkTask(day, skill, mins, "Ôn " + due + " từ đến hạn", "Ôn theo lịch SRS 1-2-5-7-14-30 ngày.", { page: "vocab", params: { tab: "review" } }));
      } else {
        out.push(mkTask(day, skill, mins, "Học " + k + " từ mới hôm nay", "Từ của bài đọc hôm nay, kèm phiên âm và câu ví dụ.", { page: "vocab", params: { tab: "today" } }));
      }
    }
    return out;
  }
  IELTS._newTasks = newTasks;

  function placeTasks(alloc, carried, keptBySkill, day) {
    var tasks = [], backlog = [];
    alloc.forEach(function (a) {
      var budget = a.mins;
      (keptBySkill[a.skill] || []).forEach(function (t) { tasks.push(t); budget -= t.mins; });
      carried.filter(function (t) { return t.skill === a.skill; })
        .sort(function (x, y) { return String(x.day).localeCompare(String(y.day)); })
        .forEach(function (t) {
          if (t.mins <= budget) { tasks.push(t); budget -= t.mins; } else backlog.push(t);
        });
      if (budget > 0) {
        // Merge a new task into an undone kept/carried task with the same deep link (e.g. yesterday's
        // "Passage đề xuất hôm nay" + today's) so the list never shows the same task twice.
        var skillTasks = tasks.filter(function (t) { return t.skill === a.skill && !t.done; });
        newTasks(a.skill, budget, day).forEach(function (nt) {
          var key = JSON.stringify(nt.route || {});
          var same = skillTasks.filter(function (t) { return JSON.stringify(t.route || {}) === key; })[0];
          if (same) {
            same.mins = num(same.mins, 0) + nt.mins;
            same.title = nt.title; same.detail = nt.detail;
          } else tasks.push(nt);
        });
      }
    });
    carried.forEach(function (t) {
      if (IELTS.planSkills.indexOf(t.skill) < 0) backlog.push(t);
    });
    return { tasks: tasks, backlog: backlog };
  }

  IELTS.ensurePlan = function () {
    var st = IELTS.state, today = IELTS.todayKey(), old = st.plan || {};
    if (old.day === today && Array.isArray(old.tasks)) return old;
    var carried = [], seen = {};
    if (old.day) {
      var hist = st.planHistory[old.day] = st.planHistory[old.day] || [];
      var histIds = {}; hist.forEach(function (t) { histIds[t.id] = 1; });
      (old.tasks || []).concat(old.backlog || []).forEach(function (t) {
        if (!t || !t.id || seen[t.id]) return;
        seen[t.id] = 1;
        if (t.done) { if (!histIds[t.id]) { hist.push(t); histIds[t.id] = 1; } return; }
        var remaining = ceil5((num(t.mins, 0)) - num(t.doneSeconds, 0) / 60);
        var c = Object.assign({}, t, { mins: remaining, doneSeconds: 0, done: false, doneAt: null, carried: true });
        if (c.origMins === undefined) c.origMins = t.mins;
        carried.push(c);
      });
      if (!hist.length) delete st.planHistory[old.day];
      // Collapse carried tasks that point to the same deep link (same skill + route) into the oldest one.
      var byRoute = {};
      carried = carried.filter(function (c) {
        var k = c.skill + "|" + JSON.stringify(c.route || {});
        var first = byRoute[k];
        if (!first) { byRoute[k] = c; return true; }
        if (String(c.day) < String(first.day)) { first.day = c.day; }
        first.mins = num(first.mins, 0) + num(c.mins, 0);
        return false;
      });
    }
    var plan = { day: today, tasks: [], backlog: [], allocation: [] };
    st.plan = plan; // set before computing so feedPlan / nested calls see today's plan
    var alloc = IELTS.computeAllocation();
    var placed = placeTasks(alloc, carried, {}, today);
    plan.tasks = placed.tasks; plan.backlog = placed.backlog; plan.allocation = alloc;
    IELTS.save();
    return plan;
  };

  IELTS.regeneratePlan = function () {
    var st = IELTS.state;
    if (!st.plan || st.plan.day !== IELTS.todayKey()) return IELTS.ensurePlan();
    var plan = st.plan, today = plan.day;
    var alloc = IELTS.computeAllocation();
    var kept = {}, carried = [];
    plan.tasks.forEach(function (t) {
      if (t.carried && !t.done && !(t.doneSeconds > 0)) carried.push(t);
      else if (t.done || t.doneSeconds > 0 || t.carried) (kept[t.skill] = kept[t.skill] || []).push(t);
    });
    var placed = placeTasks(alloc, carried, kept, today);
    plan.tasks = placed.tasks;
    plan.backlog = (plan.backlog || []).concat(placed.backlog.filter(function (t) {
      return !(plan.backlog || []).some(function (b) { return b.id === t.id; });
    }));
    plan.allocation = alloc;
    IELTS.save();
    return plan;
  };

  IELTS.findTask = function (id) {
    var p = IELTS.state.plan || {};
    return (p.tasks || []).concat(p.backlog || []).filter(function (t) { return t.id === id; })[0] || null;
  };
  IELTS.toggleTask = function (id) {
    var t = IELTS.findTask(id);
    if (!t) return null;
    t.done = !t.done;
    t.doneAt = t.done ? new Date(nowMs()).toISOString() : null;
    IELTS.save();
    return t;
  };
  IELTS.planTotal = function () {
    return ((IELTS.state.plan && IELTS.state.plan.tasks) || []).reduce(function (a, t) { return a + num(t.mins, 0); }, 0);
  };

  /* ------------------------------------------------------------------ *
   * 4.11 Error log (ErrorReview)
   * ------------------------------------------------------------------ */
  IELTS.addError = function (f) {
    f = f || {};
    var st = IELTS.state, today = IELTS.todayKey();
    var text = String(f.error || "").trim();
    var skill = f.skill || "";
    var ex = st.errors.filter(function (e) {
      return e.status === "open" && e.skill === skill && String(e.error || "").trim().toLowerCase() === text.toLowerCase();
    })[0];
    if (ex && text) {
      ex.count = (ex.count || 1) + 1;
      if (f.example) (ex.examples = ex.examples || []).push({ day: today, text: String(f.example) });
      if (!ex.why && f.why) ex.why = f.why;
      if (!ex.fix && f.fix) ex.fix = f.fix;
      IELTS.save();
      return ex;
    }
    var created = f.createdDay && /^\d{4}-\d{2}-\d{2}$/.test(f.createdDay) ? f.createdDay : today;
    var item = {
      id: IELTS.uid("err"), error: text || "Lỗi chưa đặt tên", example: f.example || "", why: f.why || "", fix: f.fix || "",
      skill: skill, qtype: f.qtype || "", source: f.source || "",
      createdDay: created, recheckDay: IELTS.addDays(created, 7), count: 1,
      examples: f.example ? [{ day: today, text: String(f.example) }] : [],
      status: "open", checks: [], basis: f.basis === "answer-key" ? "answer-key" : "self"
    };
    st.errors.push(item);
    IELTS.save();
    return item;
  };
  IELTS.findError = function (id) { return IELTS.state.errors.filter(function (e) { return e.id === id; })[0] || null; };
  IELTS.updateError = function (id, patch) {
    var e = IELTS.findError(id); if (!e) return null;
    Object.keys(patch || {}).forEach(function (k) { if (k !== "id") e[k] = patch[k]; });
    IELTS.save();
    return e;
  };
  IELTS.deleteError = function (id) {
    var n = IELTS.state.errors.length;
    IELTS.state.errors = IELTS.state.errors.filter(function (e) { return e.id !== id; });
    if (IELTS.state.errors.length !== n) { IELTS.save(); return true; }
    return false;
  };
  /* passed → "passed" (any time). failed → recheckDay = today + 7, count++ (only when due; before due it is a no-op → false). */
  IELTS.recheckError = function (id, passed) {
    var e = IELTS.findError(id), today = IELTS.todayKey();
    if (!e || e.status !== "open") return false;
    if (passed) {
      e.status = "passed";
    } else {
      if (e.recheckDay && e.recheckDay > today) return false;
      e.recheckDay = IELTS.addDays(today, 7);
      e.count = (e.count || 1) + 1;
    }
    (e.checks = e.checks || []).push({ day: today, result: passed ? "pass" : "fail" });
    IELTS.save();
    return true;
  };
  IELTS.isErrorDue = function (e) { return !!e && e.status === "open" && !!e.recheckDay && e.recheckDay <= IELTS.todayKey(); };
  IELTS.dueErrors = function () {
    return IELTS.state.errors.filter(IELTS.isErrorDue).sort(function (a, b) { return String(a.recheckDay).localeCompare(String(b.recheckDay)); });
  };
  IELTS.recheckLabel = function (item) {
    if (!item || !item.recheckDay) return "—";
    return "Tuần " + IELTS.fmtDay(item.recheckDay, "short") + " – " + IELTS.fmtDay(IELTS.addDays(item.recheckDay, 6), "short");
  };
  IELTS.recheckBadge = function (item) {
    if (!item) return "";
    if (item.status === "passed") return '<span class="pill good">Đã đạt</span>';
    return IELTS.isErrorDue(item) ? '<span class="pill bad">Đến hạn</span>' : "";
  };

  /* ------------------------------------------------------------------ *
   * 4.12 TTS (Web Speech API)
   * ------------------------------------------------------------------ */
  var synth = (W.speechSynthesis && typeof W.SpeechSynthesisUtterance === "function") ? W.speechSynthesis : null;
  var FEMALE = /(female|woman|sonia|libby|maisie|natasha|jenny|aria|michelle|hazel|susan|zira|samantha|karen|moira|tessa|serena|kate|fiona|victoria|ava|emma|clara|mia|abbi|bella|hollie|olivia|elsie|annette|freya|joanna|salli|kimberly|ivy|amy|nicole|catherine|linda|heera|neerja|leah|yan|emily|ana\b|sara|jane|nancy|kendra|molly|martha|ellie|sienna|natalie|tina)/i;
  var MALE = /(\bmale|\bman\b|ryan|thomas|william|guy|christopher|eric|roger|steffan|george|david|mark|daniel|arthur|oliver|alfie|elliot|ethan|noah|darren|duncan|ken\b|brian|liam|andrew|brandon|tony|davis|james|jason|connor|mitchell|prabhat|ravi|sam\b|fred|alex\b|rishi|aaron|tom\b|lee\b|neil|luke|kai)/i;
  function voiceRank(v) {
    var lang = String(v.lang || "").replace("_", "-").toLowerCase(), name = String(v.name || "");
    var r = 0;
    if (/online \(natural\)|natural/i.test(name)) r += 100;
    else if (/^google/i.test(name)) r += 60;
    if (lang === "en-gb") r += 30; else if (lang === "en-au") r += 20; else if (lang === "en-us") r += 15; else if (lang.indexOf("en") === 0) r += 5;
    if (v.localService === false) r += 2;
    return r;
  }
  function genderOf(v) {
    var n = String(v.name || "");
    if (/google uk english female/i.test(n)) return "f";
    if (/google uk english male/i.test(n)) return "m";
    if (FEMALE.test(n) && !/\bmale\b/i.test(n.replace(/female/i, ""))) return "f";
    if (MALE.test(n)) return "m";
    return "";
  }
  function englishVoices() {
    if (!synth) return [];
    var vs = [];
    try { vs = synth.getVoices() || []; } catch (e) { vs = []; }
    return vs.filter(function (v) { return /^en([-_]|$)/i.test(String(v.lang || "")); })
      .sort(function (a, b) { return voiceRank(b) - voiceRank(a); });
  }
  var _readyP = null;
  function findVoiceByName(name) {
    if (!name) return null;
    return englishVoices().filter(function (v) { return v.voiceURI === name || v.name === name; })[0] || null;
  }
  function pickVoice(key) {
    var vs = englishVoices(); if (!vs.length) return null;
    var prof = (IELTS.state && IELTS.state.profile && IELTS.state.profile.tts) || {};
    var g = String(key || "f").charAt(0) === "m" ? "m" : "f";
    var second = /2$/.test(String(key || ""));
    var pref = findVoiceByName(g === "f" ? prof.voiceF : prof.voiceM);
    var sameG = vs.filter(function (v) { return genderOf(v) === g; });
    var unknown = vs.filter(function (v) { return !genderOf(v); });
    var list = (pref ? [pref] : []).concat(sameG.filter(function (v) { return v !== pref; }));
    if (list.length < 2) list = list.concat(unknown);
    if (!list.length) list = vs.slice();
    if (second) {
      var primary = list[0];
      var alt = list.filter(function (v) { return v !== primary; })[0];
      return alt || primary;
    }
    return list[0];
  }
  function chunkText(text) {
    var s = String(text || "").replace(/\s+/g, " ").trim();
    if (s.length <= 220) return s ? [s] : [];
    var parts = s.match(/[^.!?;]+[.!?;]*\s*/g) || [s], out = [], cur = "";
    parts.forEach(function (p) {
      if ((cur + p).length > 220 && cur) { out.push(cur.trim()); cur = ""; }
      if (p.length > 220) {
        p.split(/,\s*/).forEach(function (q, i, arr) {
          var piece = q + (i < arr.length - 1 ? ", " : "");
          if ((cur + piece).length > 220 && cur) { out.push(cur.trim()); cur = ""; }
          cur += piece;
        });
      } else cur += p;
    });
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  var _ttsGen = 0, _pendingResolves = [];
  function settleAll() { var r = _pendingResolves; _pendingResolves = []; r.forEach(function (f) { try { f(); } catch (e) { /* ignore */ } }); }
  function speakChunk(text, voice, rate, gen) {
    return new Promise(function (resolve) {
      if (!synth || gen !== _ttsGen) return resolve(false);
      var done = false;
      function fin(v) { if (done) return; done = true; var i = _pendingResolves.indexOf(cancelFn); if (i >= 0) _pendingResolves.splice(i, 1); resolve(v); }
      function cancelFn() { fin(false); }
      _pendingResolves.push(cancelFn);
      var u = new W.SpeechSynthesisUtterance(text);
      if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-GB";
      u.rate = rate;
      u.onend = function () { fin(true); };
      u.onerror = function () { fin(false); };
      try { synth.speak(u); } catch (e) { fin(false); }
    });
  }
  IELTS.tts = {
    available: function () { return !!synth && englishVoices().length > 0; },
    supported: function () { return !!synth; },
    ready: function () {
      if (_readyP) return _readyP;
      _readyP = new Promise(function (resolve) {
        if (!synth) return resolve([]);
        if (englishVoices().length) return resolve(englishVoices());
        var done = false;
        function fin() { if (done) return; done = true; resolve(englishVoices()); }
        try { synth.addEventListener("voiceschanged", function () { if (englishVoices().length) fin(); }); } catch (e) { /* ignore */ }
        var tries = 0, iv = setInterval(function () {
          tries++;
          if (englishVoices().length || tries > 30) { clearInterval(iv); fin(); }
        }, 100);
      });
      _readyP.then(function (v) { if (!v.length) _readyP = null; });
      return _readyP;
    },
    voices: function () { return englishVoices(); },
    pickVoice: pickVoice,
    speak: function (text, opts) {
      opts = opts || {};
      if (!synth) return Promise.resolve(false);
      var gen = _ttsGen;
      var rate = num(opts.rate, num(((IELTS.state || {}).profile || {}).tts ? IELTS.state.profile.tts.rate : 0.95, 0.95));
      var voice = opts.voiceObj || pickVoice(opts.voice || "f");
      var chunks = chunkText(text);
      var p = Promise.resolve(true);
      chunks.forEach(function (c) {
        p = p.then(function (ok) { if (!ok || gen !== _ttsGen) return false; return speakChunk(c, voice, rate, gen); });
      });
      return p;
    },
    playScript: function (lines, opts) {
      opts = opts || {};
      if (!synth) return Promise.resolve(false);
      var gen = _ttsGen, i = 0;
      return new Promise(function (resolve) {
        function next() {
          if (gen !== _ttsGen) return resolve(false);
          if (i >= (lines || []).length) return resolve(true);
          if (opts.shouldContinue && opts.shouldContinue() === false) return resolve(false);
          var line = lines[i];
          if (opts.onLine) { try { opts.onLine(i, line); } catch (e) { console.error(e); } }
          IELTS.tts.speak(line.text, { voice: line.voice || "f", rate: opts.rate }).then(function (ok) {
            if (!ok && gen !== _ttsGen) return resolve(false);
            i++;
            setTimeout(next, 350);
          });
        }
        next();
      });
    },
    stop: function () {
      _ttsGen++;
      if (synth) { try { synth.cancel(); } catch (e) { /* ignore */ } }
      settleAll();
    },
    pause: function () { if (synth) { try { synth.pause(); } catch (e) { /* ignore */ } } },
    resume: function () { if (synth) { try { synth.resume(); } catch (e) { /* ignore */ } } },
    speaking: function () { return !!synth && (synth.speaking || synth.pending); }
  };

  /* ------------------------------------------------------------------ *
   * IndexedDB audio store
   * ------------------------------------------------------------------ */
  var _dbP = null;
  function openDB() {
    if (_dbP) return _dbP;
    _dbP = new Promise(function (resolve, reject) {
      if (!W.indexedDB) return reject(new Error("Trình duyệt không hỗ trợ IndexedDB"));
      var req;
      try { req = W.indexedDB.open("ielts-coach-audio", 1); } catch (e) { return reject(e); }
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains("audio")) db.createObjectStore("audio", { keyPath: "id" });
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error("Không mở được kho ghi âm")); };
    });
    _dbP.catch(function () { _dbP = null; });
    return _dbP;
  }
  function tx(mode, fn) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction("audio", mode), store = t.objectStore("audio"), out;
        var r = fn(store);
        if (r) r.onsuccess = function () { out = r.result; };
        t.oncomplete = function () { resolve(out); };
        t.onerror = function () { reject(t.error || new Error("Lỗi kho ghi âm")); };
        t.onabort = function () { reject(t.error || new Error("Lỗi kho ghi âm")); };
      });
    });
  }
  IELTS.audioDB = {
    put: function (blob, id) {
      id = id || IELTS.uid("aud");
      return tx("readwrite", function (s) { return s.put({ id: id, blob: blob, type: (blob && blob.type) || "", at: new Date(nowMs()).toISOString() }); })
        .then(function () { return id; });
    },
    get: function (id) {
      if (!id) return Promise.resolve(null);
      return tx("readonly", function (s) { return s.get(id); }).then(function (r) { return r ? r.blob : null; }).catch(function () { return null; });
    },
    del: function (id) { return tx("readwrite", function (s) { return s.delete(id); }).then(function () { return true; }); },
    all: function () {
      return tx("readonly", function (s) { return s.getAll(); }).then(function (rows) {
        return (rows || []).map(function (r) { return { id: r.id, blob: r.blob }; });
      }).catch(function () { return []; });
    },
    clear: function () { return tx("readwrite", function (s) { return s.clear(); }).then(function () { return true; }); }
  };

  /* ------------------------------------------------------------------ *
   * 4.13 Backup
   * ------------------------------------------------------------------ */
  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var fr = new W.FileReader();
      fr.onload = function () { var s = String(fr.result || ""); resolve(s.slice(s.indexOf(",") + 1)); };
      fr.onerror = function () { reject(fr.error); };
      fr.readAsDataURL(blob);
    });
  }
  function base64ToBlob(b64, type) {
    var bin = W.atob(b64), len = bin.length, bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
    return new W.Blob([bytes], { type: type || "audio/webm" });
  }
  IELTS.exportBackup = function () {
    return IELTS.audioDB.all().then(function (rows) {
      return Promise.all(rows.map(function (r) {
        if (!r.blob) return null;
        return blobToBase64(r.blob).then(function (b64) { return { id: r.id, type: r.blob.type || "", base64: b64 }; }).catch(function () { return null; });
      }));
    }).catch(function () { return []; }).then(function (audio) {
      return { app: "ielts-coach", version: 1, exportedAt: new Date(nowMs()).toISOString(), state: clone(IELTS.state), audio: (audio || []).filter(Boolean) };
    });
  };
  function validateBackup(obj) {
    if (!isObj(obj)) throw new Error("Tệp không phải bản sao lưu hợp lệ (không đọc được JSON).");
    if (obj.app !== "ielts-coach") throw new Error("Tệp này không phải bản sao lưu của IELTS Coach.");
    if (!isObj(obj.state)) throw new Error("Bản sao lưu thiếu dữ liệu học tập (state).");
    var s = obj.state;
    if (!isObj(s.profile)) throw new Error("Bản sao lưu thiếu hồ sơ học viên (profile).");
    var arrays = ["sessions", "submissions", "errors"];
    for (var i = 0; i < arrays.length; i++) {
      if (s[arrays[i]] !== undefined && !Array.isArray(s[arrays[i]])) throw new Error("Trường '" + arrays[i] + "' trong bản sao lưu bị hỏng.");
    }
    if (s.attendance !== undefined && !isObj(s.attendance)) throw new Error("Trường 'attendance' trong bản sao lưu bị hỏng.");
    if (s.vocab !== undefined && !isObj(s.vocab)) throw new Error("Trường 'vocab' trong bản sao lưu bị hỏng.");
    if (obj.audio !== undefined && !Array.isArray(obj.audio)) throw new Error("Phần ghi âm trong bản sao lưu bị hỏng.");
    (obj.audio || []).forEach(function (a) {
      if (!isObj(a) || !a.id || typeof a.base64 !== "string") throw new Error("Một bản ghi âm trong bản sao lưu bị hỏng.");
    });
  }
  IELTS.importBackup = function (obj) {
    return new Promise(function (resolve) { validateBackup(obj); resolve(); }).then(function () {
      var blobs;
      try {
        blobs = (obj.audio || []).map(function (a) { return { id: a.id, blob: base64ToBlob(a.base64, a.type) }; });
      } catch (e) { throw new Error("Không giải mã được ghi âm trong bản sao lưu."); }
      var newState = normalizeState(clone(obj.state));
      var audioP = IELTS.audioDB.clear().catch(function () { return false; }).then(function () {
        return Promise.all(blobs.map(function (b) { return IELTS.audioDB.put(b.blob, b.id).catch(function () { return null; }); }));
      });
      return audioP.then(function () {
        IELTS.state = newState;
        if (!persist(false)) throw new Error("Không ghi được dữ liệu vào bộ nhớ trình duyệt.");
        IELTS.ensurePlan();
        IELTS.emit("change", { ok: true, imported: true });
        return true;
      });
    });
  };
  IELTS.resetAll = function () {
    try { IELTS.tts.stop(); } catch (e) { /* ignore */ }
    lsDel(LS_STATE); lsDel(LS_TIMER);
    IELTS.timer = idleTimer();
    IELTS.state = normalizeState(defaultState());
    persist(true);
    return IELTS.audioDB.clear().catch(function () { return false; }).then(function () {
      IELTS.ensurePlan();
      IELTS.emit("timer", { type: "reset", elapsed: 0 });
      IELTS.emit("change", { ok: true, reset: true });
      return true;
    });
  };

  /* ------------------------------------------------------------------ *
   * Router + page registry
   * ------------------------------------------------------------------ */
  IELTS.navDefaults = [
    { id: "dashboard", label: "Tổng quan", icon: "home", skill: null, group: "study", order: 1 },
    { id: "roadmap", label: "Lộ trình", icon: "map", skill: null, group: "study", order: 2 },
    { id: "today", label: "Hôm nay", icon: "sun", skill: null, group: "study", order: 3 },
    { id: "listening", label: "Listening", icon: "headphones", skill: "listening", group: "practice", order: 4 },
    { id: "reading", label: "Reading", icon: "book-open", skill: "reading", group: "practice", order: 5 },
    { id: "writing", label: "Writing", icon: "pen-line", skill: "writing", group: "practice", order: 6 },
    { id: "speaking", label: "Speaking", icon: "mic", skill: "speaking", group: "practice", order: 7 },
    { id: "vocab", label: "Từ vựng", icon: "layers", skill: "vocab", group: "practice", order: 8 },
    { id: "errors", label: "Sổ lỗi", icon: "alert-triangle", skill: null, group: "track", order: 9 },
    { id: "settings", label: "Cài đặt", icon: "settings", skill: null, group: "track", order: 10 }
  ];
  IELTS.registerPage = function (def) {
    if (!def || !def.id) return;
    IELTS.pages[def.id] = def;
  };
  IELTS.confirmLeave = null;

  function parseHash(h) {
    h = String(h || "").replace(/^#\/?/, "");
    var qi = h.indexOf("?"), id = qi >= 0 ? h.slice(0, qi) : h, qs = qi >= 0 ? h.slice(qi + 1) : "";
    var params = {};
    qs.split("&").forEach(function (kv) {
      if (!kv) return;
      var i = kv.indexOf("="), k = i >= 0 ? kv.slice(0, i) : kv, v = i >= 0 ? kv.slice(i + 1) : "";
      try { params[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, " ")); } catch (e) { params[k] = v; }
    });
    try { id = decodeURIComponent(id); } catch (e) { /* keep */ }
    return { id: id || "dashboard", params: params };
  }
  function buildHash(id, params) {
    var q = Object.keys(params || {}).filter(function (k) { return params[k] !== null && params[k] !== undefined && params[k] !== ""; })
      .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]); }).join("&");
    return "#/" + id + (q ? "?" + q : "");
  }
  IELTS._parseHash = parseHash;
  IELTS._buildHash = buildHash;
  IELTS.route = function () { return parseHash(W.location ? W.location.hash : ""); };

  var router = { root: null, cleanup: null, current: null, lastHash: "", skipConfirm: false, ignoreNext: false, opts: {}, started: false };

  function leaveCheck(proceed, cancel) {
    var fn = IELTS.confirmLeave;
    if (typeof fn !== "function") return proceed();
    var r;
    try { r = fn(); } catch (e) { r = true; }
    if (r && typeof r.then === "function") {
      r.then(function (ok) { if (ok === false) { if (cancel) cancel(); } else proceed(); }, function () { proceed(); });
    } else if (r === false) { if (cancel) cancel(); }
    else proceed();
  }
  function defaultFallback(id) {
    return '<div class="page"><div class="card pad-lg empty">' +
      '<div class="empty-emoji">🧩</div><div class="empty-title">Trang này đang được hoàn thiện</div>' +
      '<div class="empty-text">Chưa tải được trang "' + IELTS.esc(id) + '". Bạn thử tải lại trang hoặc quay về Tổng quan nhé.</div>' +
      '<div class="row" style="justify-content:center;margin-top:14px"><a class="btn primary" href="#/dashboard">' + IELTS.icon("home", 16) + ' Về Tổng quan</a></div>' +
      "</div></div>";
  }
  function defaultErrorCard(err, id) {
    return '<div class="page"><div class="card pad-lg empty error-card">' +
      '<div class="empty-emoji">🛠️</div><div class="empty-title">Có lỗi khi hiển thị trang này</div>' +
      '<div class="empty-text">' + IELTS.esc((err && err.message) || String(err)) + "</div>" +
      '<div class="row" style="justify-content:center;margin-top:14px;gap:10px">' +
      '<button class="btn primary" type="button" data-router-retry>' + IELTS.icon("rotate-ccw", 16) + ' Thử lại</button>' +
      '<a class="btn ghost" href="#/dashboard">' + IELTS.icon("home", 16) + " Về Tổng quan</a></div></div></div>";
  }
  function knownId(id) { return IELTS.navDefaults.some(function (n) { return n.id === id; }); }

  function renderCurrent(isRefresh) {
    if (!router.root) return;
    var r = IELTS.route(), id = r.id;
    if (!IELTS.pages[id] && !knownId(id)) {
      id = "dashboard"; r = { id: id, params: {} };
      try { if (W.history && W.history.replaceState) W.history.replaceState(null, "", buildHash(id, {})); } catch (e) { /* ignore */ }
    }
    if (router.cleanup) { try { router.cleanup(); } catch (e) { console.error(e); } }
    router.cleanup = null;
    IELTS.confirmLeave = null;
    if (!isRefresh) { IELTS.exitExamMode(); try { IELTS.tts.stop(); } catch (e) { /* ignore */ } }
    var page = IELTS.pages[id];
    var html, failed = null;
    router.current = r;
    router.lastHash = W.location ? W.location.hash : "";
    if (!page) {
      html = (router.opts.fallback || defaultFallback)(id, r.params);
    } else {
      try { html = page.render(r.params || {}); } catch (e) { failed = e; console.error("[IELTS] render error in page '" + id + "'", e); html = (router.opts.errorCard || defaultErrorCard)(e, id); }
    }
    router.root.innerHTML = html || "";
    if (page && !failed && typeof page.mount === "function") {
      try {
        var c = page.mount(router.root, r.params || {});
        if (typeof c === "function") router.cleanup = c;
      } catch (e2) {
        failed = e2;
        console.error("[IELTS] mount error in page '" + id + "'", e2);
        router.root.innerHTML = (router.opts.errorCard || defaultErrorCard)(e2, id);
      }
    }
    var retry = router.root.querySelector("[data-router-retry]");
    if (retry) retry.addEventListener("click", function () { IELTS.refresh(); });
    if (!isRefresh && W.scrollTo) { try { W.scrollTo(0, 0); } catch (e) { /* ignore */ } }
    IELTS.emit("route", { id: id, params: r.params || {}, refresh: !!isRefresh, failed: !!failed, missing: !page });
  }
  function onHashChange() {
    if (router.ignoreNext) { router.ignoreNext = false; return; }
    if (router.skipConfirm) { router.skipConfirm = false; renderCurrent(false); return; }
    leaveCheck(function () { renderCurrent(false); }, function () {
      router.ignoreNext = true;
      W.location.hash = router.lastHash || "#/dashboard";
    });
  }
  IELTS.startRouter = function (root, opts) {
    router.root = root;
    router.opts = opts || {};
    if (!router.started) { W.addEventListener("hashchange", onHashChange); router.started = true; }
    if (!W.location.hash) {
      try { W.history.replaceState(null, "", "#/dashboard"); } catch (e) { /* ignore */ }
    }
    renderCurrent(false);
  };
  IELTS.go = function (id, params) {
    var h = buildHash(id, params || {});
    if (W.location.hash === h) { leaveCheck(function () { renderCurrent(false); }); return; }
    leaveCheck(function () {
      router.skipConfirm = true;
      W.location.hash = h;
    });
  };
  IELTS.refresh = function () { renderCurrent(true); };
  IELTS.currentPage = function () { var r = router.current || IELTS.route(); return IELTS.pages[r.id] || null; };

  /* Exam mode */
  IELTS.enterExamMode = function () {
    var d = doc(); if (!d || !d.body) return;
    if (!d.body.classList.contains("exam-mode")) { d.body.classList.add("exam-mode"); IELTS.emit("exam", true); }
  };
  IELTS.exitExamMode = function () {
    var d = doc(); if (!d || !d.body) return;
    if (d.body.classList.contains("exam-mode")) { d.body.classList.remove("exam-mode"); IELTS.emit("exam", false); }
  };

  /* ------------------------------------------------------------------ *
   * Init (storage only — no DOM, no content)
   * ------------------------------------------------------------------ */
  loadState();
  loadTimer();
})();
