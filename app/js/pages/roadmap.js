/* Roadmap (A2) — Lộ trình. Replicates the prototype roadmap exactly; only the theme changes. */
(function () {
  "use strict";
  var I = window.IELTS;

  // Prototype: overall() = average of the four skill bands.
  // Here: IELTS.overallBand().band, falling back to the average of the available skill bands (0 if none).
  function overall() {
    var ov = null;
    try { ov = I.overallBand(); } catch (e) { ov = null; }
    if (ov && ov.band != null) return Number(ov.band);
    var sum = 0, n = 0;
    I.skills.forEach(function (k) {
      var sb = null;
      try { sb = I.skillBand(k); } catch (e) { sb = null; }
      if (sb && sb.band != null) { sum += Number(sb.band); n++; }
    });
    return n ? sum / n : 0;
  }

  function hoursLabel() {
    var m = (I.state && I.state.profile && I.state.profile.dailyMinutes) || 250;
    var h = Math.round(m / 6) / 10;
    return h + "h/day sustainable plan";
  }

  function render() {
    var o = overall();
    var stages = [
      ["Stage 1 — Diagnosis & Foundation", "Establish baseline, identify recurring errors and build sustainable routines.", true],
      ["Stage 2 — 6.5 → 7.0", "Accuracy, vocabulary, grammar, question types, Writing development, Reading speed and Listening detail.", o >= 6.3],
      ["Stage 3 — 7.0 → 7.5", "Precision, complex ideas, natural collocations, coherence and difficult questions.", o >= 7],
      ["Stage 4 — 7.5 → 8.0", "Consistency, subtle meaning, inference, lexical control and grammatical flexibility.", o >= 7.5]
    ];
    return '<div class="page rm-page">' +
      '<header class="page-head rm-head">' +
        '<div><div class="page-kicker">IELTS Personal Coach</div>' +
        '<h1 class="page-title">Personalized roadmap</h1>' +
        '<p class="page-sub">A staged path from approximately 6.0–6.5 to 7.0, then 7.5–8.0.</p></div>' +
        '<div class="page-actions"><span class="pill">' + I.esc(hoursLabel()) + "</span></div>" +
      "</header>" +
      '<div class="grid g-2 rm-grid">' +
        stages.map(function (x) {
          return '<div class="card rm-card' + (x[2] ? " is-active" : "") + '">' +
            '<span class="pill ' + (x[2] ? "good" : "warn") + '">' + (x[2] ? "Active" : "Next") + "</span>" +
            "<h3>" + x[0] + "</h3>" +
            '<p class="rm-sub">' + x[1] + "</p>" +
            '<div class="progress rm-bar"><div class="progress-bar" style="width:' + (x[2] ? 100 : 18) + '%"></div></div>' +
          "</div>";
        }).join("") +
      "</div>" +
    "</div>";
  }

  I.registerPage({
    id: "roadmap",
    label: "Lộ trình",
    icon: "map",
    skill: null,
    group: "study",
    order: 2,
    render: render,
    mount: function (root) {
      function onChange() {
        var el = root.querySelector(".rm-page");
        if (!el) return;
        var tmp = document.createElement("div");
        tmp.innerHTML = render();
        el.innerHTML = tmp.firstChild.innerHTML;
      }
      I.on("change", onChange);
      return function () { I.off("change", onChange); };
    }
  });
})();
