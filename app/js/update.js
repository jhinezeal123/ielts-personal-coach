/* Update check (Cập nhật) — compares IELTS_VERSION with the newest GitHub release.
 * The browser only *checks*; the actual code pull is done by scripts/auto-update.ps1
 * (Windows Scheduled Task). Offline / API failures are silent.
 */
(function () {
  "use strict";
  var I = window.IELTS = window.IELTS || {};
  var W = window;

  var REPO = "jhinezeal123/ielts-personal-coach";
  var API = "https://api.github.com/repos/" + REPO + "/releases?per_page=10";
  var LS_KEY = "ielts-coach-update-check";

  function ls() { try { return W.localStorage || null; } catch (e) { return null; } }

  function parse(v) {
    var m = /^\s*v?(\d+)(?:\.(\d+))?(?:\.(\d+))?/.exec(String(v == null ? "" : v));
    return m ? [Number(m[1]), Number(m[2] || 0), Number(m[3] || 0)] : null;
  }
  /* >0 if a is newer than b, 0 equal, <0 older; null if unparsable. */
  function compare(a, b) {
    var x = parse(a), y = parse(b);
    if (!x || !y) return null;
    for (var i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
    return 0;
  }
  function clean(v) { return String(v == null ? "" : v).replace(/^\s*v/i, "").trim(); }
  function safeUrl(u) { return /^https:\/\/github\.com\//.test(String(u || "")) ? String(u) : "https://github.com/" + REPO + "/releases"; }

  function current() { return clean(W.IELTS_VERSION || "0.0.0"); }
  function status() { var s = W.IELTS_UPDATE_STATUS; return s && typeof s === "object" ? s : null; }

  /* Resolves { ok, newer, latest: {version, tag, name, url, publishedAt} | null, error? } — never rejects. */
  function check() {
    var cur = current();
    if (typeof W.fetch !== "function") return Promise.resolve({ ok: false, current: cur, error: "no-fetch" });
    if (W.navigator && W.navigator.onLine === false) return Promise.resolve({ ok: false, current: cur, error: "offline" });
    var ctrl = typeof W.AbortController === "function" ? new W.AbortController() : null;
    var timer = ctrl ? setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 10000) : null;
    return W.fetch(API, { headers: { Accept: "application/vnd.github+json" }, cache: "no-store", signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (list) {
        var rel = null;
        (Array.isArray(list) ? list : []).forEach(function (x) {
          if (!x || x.draft || x.prerelease || !parse(x.tag_name)) return;
          if (!rel || compare(x.tag_name, rel.tag_name) > 0) rel = x;
        });
        var res = { ok: true, current: cur, latest: null, newer: false };
        if (rel) {
          res.latest = { version: clean(rel.tag_name), tag: String(rel.tag_name), name: String(rel.name || rel.tag_name), url: safeUrl(rel.html_url), publishedAt: rel.published_at || null };
          res.newer = compare(rel.tag_name, cur) > 0;
        }
        var store = ls();
        if (store) { try { store.setItem(LS_KEY, JSON.stringify({ day: today(), at: new Date().toISOString(), latest: res.latest, newer: res.newer })); } catch (e) {} }
        return res;
      })
      .catch(function (err) { return { ok: false, current: cur, error: (err && err.message) || "network" }; })
      .then(function (res) { if (timer) clearTimeout(timer); return res; });
  }

  function today() {
    try { if (I.calendarTodayVN) return I.calendarTodayVN(); } catch (e) {}
    return new Date().toISOString().slice(0, 10);
  }
  function lastBrowserCheck() {
    var store = ls(); if (!store) return null;
    try { return JSON.parse(store.getItem(LS_KEY) || "null"); } catch (e) { return null; }
  }

  /* One silent check per day on boot; toast only when a newer release exists. */
  function bootCheck() {
    var last = lastBrowserCheck();
    if (last && last.day === today()) return;
    check().then(function (res) {
      if (res && res.ok && res.newer && res.latest && I.toast) {
        I.toast("Có bản mới v" + res.latest.version + " (bạn đang dùng v" + res.current + "). Xem Cài đặt → Cập nhật.", "info");
      }
    });
  }

  I.update = { repo: REPO, current: current, status: status, check: check, compare: compare, lastBrowserCheck: lastBrowserCheck, releasesUrl: "https://github.com/" + REPO + "/releases" };

  function schedule() { setTimeout(bootCheck, 4000); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schedule);
  else schedule();
})();
