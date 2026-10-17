/* App version — single source of truth.
 * Release process: bump this value, commit, push, then `gh release create vX.Y.Z`
 * (the tag must equal "v" + IELTS_VERSION). scripts/auto-update.ps1 reads this line.
 *
 * Also loads the optional, git-ignored `update-status.js` written by the local
 * auto-updater (scripts/auto-update.ps1). The file may not exist; load failures are
 * ignored (script tag + onerror). Note: on file:// Chrome/Edge still print one
 * "net::ERR_FILE_NOT_FOUND" line for a missing file — this only happens until the
 * auto-updater has run once (the installer runs it immediately).
 */
(function () {
  "use strict";
  window.IELTS_VERSION = "1.0.0";

  try {
    if (window.IELTS_UPDATE_STATUS) return;
    var d = document;
    var s = d.createElement("script");
    s.src = "update-status.js?t=" + Date.now();
    s.async = true;
    s.onload = function () {
      try { window.dispatchEvent(new CustomEvent("ielts:update-status")); } catch (e) { /* ignore */ }
      if (s.parentNode) s.parentNode.removeChild(s);
    };
    s.onerror = function () { if (s.parentNode) s.parentNode.removeChild(s); };
    (d.head || d.documentElement).appendChild(s);
  } catch (e) { /* ignore */ }
})();
