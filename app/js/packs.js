/* IELTS Coach — js/packs.js (content channel, SPEC §11 / content/CONTRACT.md)
 * - IELTS.registerPack(pack): merges a content pack's collections into IELTS.data (duplicate IDs are skipped).
 * - IELTS.resolveAudio(ref) → { local, remote } for "asset:<file>" references (or a plain URL).
 * - Loader: reads the optional, git-ignored `content-packs/index.js` (written by scripts/sync-content.ps1),
 *   injects every pack whose minAppVersion ≤ IELTS_VERSION, and releases app boot (IELTS.whenPacksReady) once all
 *   packs have loaded or errored. No index → boot immediately.
 * Loaded after every built-in data file and before js/exam.js, so built-in IDs are known when packs register.
 */
(function () {
  "use strict";
  var W = window;
  var I = W.IELTS = W.IELTS || {};
  var BASE = "content-packs/";
  var SAFETY_MS = 8000; // never hold boot longer than this, whatever happens

  I.data = I.data || {};
  if (!Array.isArray(I.data.listeningClips)) I.data.listeningClips = [];

  var P = I.packs = { loaded: [], skipped: [], failed: [], assets: {}, ready: false };

  function warn() { try { if (W.console) console.warn.apply(console, ["[IELTS packs]"].concat([].slice.call(arguments))); } catch (e) { /* ignore */ } }
  function arr(v) { return Array.isArray(v) ? v : []; }

  /* ---------------- semver ---------------- */
  function parse(v) {
    var m = /^\s*v?(\d+)(?:\.(\d+))?(?:\.(\d+))?/.exec(String(v == null ? "" : v));
    return m ? [Number(m[1]), Number(m[2] || 0), Number(m[3] || 0)] : null;
  }
  function cmp(a, b) {
    var x = parse(a), y = parse(b);
    if (!x || !y) return null;
    for (var i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
    return 0;
  }
  function appVersion() { return String(W.IELTS_VERSION || "0.0.0"); }
  /* true when the pack may run on this app version (missing minAppVersion = any version) */
  function compatible(minV) {
    if (minV == null || minV === "") return true;
    var c = cmp(minV, appVersion());
    return c !== null && c <= 0;
  }
  P.compareVersions = cmp;
  P.compatible = compatible;

  /* ---------------- ID registry (built-in + already merged) ---------------- */
  function idSet() {
    var d = I.data, s = {};
    function add(kind, id) { if (id != null) s[kind + ":" + id] = 1; }
    arr(d.listeningTests).forEach(function (t) { add("lt", t && t.id); arr(t && t.sections).forEach(function (x) { add("ls", x && x.id); }); });
    arr(d.readingTests).forEach(function (t) { add("rt", t && t.id); arr(t && t.passages).forEach(function (x) { add("rp", x && x.id); }); });
    arr(d.listeningClips).forEach(function (c) { add("lc", c && c.id); });
    arr(d.dictation).forEach(function (x) { add("d", x && x.id); });
    arr(d.vocab && d.vocab.words).forEach(function (w) { add("w", w && w.id); });
    return s;
  }

  /* ---------------- registerPack ---------------- */
  I.registerPack = function (pack) {
    try {
      if (!pack || typeof pack !== "object" || !pack.id) { warn("pack without id ignored"); return false; }
      var pid = String(pack.id);
      if (P.loaded.some(function (x) { return x.id === pid; })) { warn("pack " + pid + " already registered — skipped"); return false; }
      if (!compatible(pack.minAppVersion)) {
        P.skipped.push({ id: pid, minAppVersion: pack.minAppVersion, reason: "app-version" });
        warn("pack " + pid + " needs app v" + pack.minAppVersion + " (this is v" + appVersion() + ") — skipped");
        return false;
      }
      var seen = idSet(), d = I.data, counts = {};
      function has(kind, id) { return !!seen[kind + ":" + id]; }
      function mark(kind, id) { seen[kind + ":" + id] = 1; }
      function dup(what, id) { warn("pack " + pid + ": duplicate " + what + " id \"" + id + "\" — skipped"); }

      arr(pack.assets).forEach(function (a) {
        if (a && a.file) P.assets[String(a.file)] = { url: a.url ? String(a.url) : null, pack: pid };
      });

      arr(pack.listeningTests).forEach(function (t) {
        if (!t || !t.id) return;
        if (has("lt", t.id)) return dup("listening test", t.id);
        var clash = arr(t.sections).filter(function (x) { return x && has("ls", x.id); })[0];
        if (clash) return dup("listening section", clash.id);
        t.pack = pid;
        d.listeningTests.push(t); mark("lt", t.id);
        arr(t.sections).forEach(function (x) { if (x) mark("ls", x.id); });
        counts.listeningTests = (counts.listeningTests || 0) + 1;
      });
      arr(pack.listeningClips).forEach(function (c) {
        if (!c || !c.id) return;
        if (has("lc", c.id)) return dup("listening clip", c.id);
        c.pack = pid;
        d.listeningClips.push(c); mark("lc", c.id);
        counts.listeningClips = (counts.listeningClips || 0) + 1;
      });
      arr(pack.readingTests).forEach(function (t) {
        if (!t || !t.id) return;
        if (has("rt", t.id)) return dup("reading test", t.id);
        var clash = arr(t.passages).filter(function (x) { return x && has("rp", x.id); })[0];
        if (clash) return dup("reading passage", clash.id);
        t.pack = pid;
        d.readingTests.push(t); mark("rt", t.id);
        arr(t.passages).forEach(function (x) { if (x) mark("rp", x.id); });
        counts.readingTests = (counts.readingTests || 0) + 1;
      });
      if (!Array.isArray(d.dictation)) d.dictation = [];
      arr(pack.dictation).forEach(function (x) {
        if (!x || !x.id) return;
        if (has("d", x.id)) return dup("dictation", x.id);
        d.dictation.push(x); mark("d", x.id);
        counts.dictation = (counts.dictation || 0) + 1;
      });
      if (!d.vocab || typeof d.vocab !== "object") d.vocab = { words: [] };
      if (!Array.isArray(d.vocab.words)) d.vocab.words = [];
      arr(pack.vocabWords).forEach(function (w) {
        if (!w || !w.id) return;
        if (has("w", w.id)) return dup("word", w.id);
        d.vocab.words.push(w); mark("w", w.id);
        counts.vocabWords = (counts.vocabWords || 0) + 1;
      });

      P.loaded.push({ id: pid, version: pack.version, title: pack.title || pid, source: pack.source || "", counts: counts });
      return true;
    } catch (e) {
      warn("pack registration failed", e);
      return false;
    }
  };

  /* ---------------- audio resolution ---------------- */
  /* "asset:<file>" → { local: "content-packs/audio/<file>", remote: <asset url>|null }; plain URL → { local: url, remote: null } */
  I.resolveAudio = function (ref) {
    if (ref == null || ref === "") return null;
    var s = String(ref);
    var m = /^asset:(.+)$/.exec(s);
    if (!m) return { local: s, remote: null };
    var file = m[1].replace(/^\/+/, "");
    var a = P.assets[file];
    var local = BASE + "audio/" + file.split("/").map(encodeURIComponent).join("/");
    return { local: local, remote: a && a.url && /^https?:\/\//i.test(a.url) ? a.url : null };
  };

  /* ---------------- boot gate ---------------- */
  var waiters = [];
  function release() {
    if (P.ready) return;
    P.ready = true;
    var list = waiters.splice(0);
    list.forEach(function (fn) { try { fn(); } catch (e) { if (W.console) console.error("[IELTS packs] boot callback failed", e); } });
    try { W.dispatchEvent(new CustomEvent("ielts:packs", { detail: { loaded: P.loaded.length } })); } catch (e) { /* ignore */ }
  }
  /* app.js calls this; cb runs once every pack has loaded or errored (or immediately when there is nothing to load) */
  I.whenPacksReady = function (cb) {
    if (typeof cb !== "function") return;
    if (P.ready) cb(); else waiters.push(cb);
  };

  function inject(src, onDone) {
    var d = document, s = d.createElement("script"), fired = false;
    function done(ok) {
      if (fired) return; fired = true;
      if (s.parentNode) s.parentNode.removeChild(s);
      onDone(ok);
    }
    s.src = src;
    s.async = false;
    s.onload = function () { done(true); };
    s.onerror = function () { done(false); };
    (d.head || d.documentElement).appendChild(s);
  }

  function loadPacks() {
    var idx = W.IELTS_CONTENT_INDEX;
    var list = idx && typeof idx === "object" ? arr(idx.packs) : [];
    var queue = list.filter(function (p) {
      if (!p || !p.id || !p.file) return false;
      if (!/^[A-Za-z0-9._\/-]+\.js$/.test(String(p.file)) || /\.\./.test(String(p.file))) { warn("bad pack file name", p.file); return false; }
      if (!compatible(p.minAppVersion)) {
        P.skipped.push({ id: String(p.id), minAppVersion: p.minAppVersion, reason: "app-version" });
        return false;
      }
      return true;
    });
    var i = 0;
    (function next() {
      if (i >= queue.length) { release(); return; }
      var p = queue[i++];
      var before = P.loaded.length;
      inject(BASE + p.file + "?v=" + encodeURIComponent(String(p.version == null ? "" : p.version)) + "-" + encodeURIComponent(String(idx.contentVersion == null ? "" : idx.contentVersion)), function (ok) {
        if (!ok) { P.failed.push({ id: String(p.id), reason: "load-error" }); warn("could not load pack " + p.id); }
        else if (P.loaded.length === before && !P.skipped.some(function (x) { return x.id === String(p.id); })) {
          P.failed.push({ id: String(p.id), reason: "not-registered" });
        }
        next();
      });
    })();
  }

  setTimeout(release, SAFETY_MS);
  try {
    if (W.IELTS_CONTENT_INDEX) loadPacks();
    else {
      /* Optional file (git-ignored). On file:// Chrome/Edge print one net::ERR_FILE_NOT_FOUND line while it does not
         exist — same accepted tradeoff as update-status.js (SPEC §9). */
      inject(BASE + "index.js?t=" + Date.now(), function (ok) {
        if (ok && W.IELTS_CONTENT_INDEX) loadPacks(); else release();
      });
    }
  } catch (e) {
    warn("loader failed", e);
    release();
  }
})();
