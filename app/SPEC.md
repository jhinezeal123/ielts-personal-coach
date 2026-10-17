# IELTS Coach — Build Spec (single source of truth for all builders)

Static, no-build web app for one learner (IELTS Academic). Opens by double-clicking `app/index.html`
in Chrome/Edge (file://). Therefore:

- **Classic `<script>` tags only. No ES modules, no `import`, no `fetch` of local files, no build tools, no npm libs.**
- Every JS file is wrapped in an IIFE `(function(){ "use strict"; ... })();` and attaches to the global `window.IELTS`.
- Only external resource allowed: Google Fonts `<link>` (app must still work offline with fallbacks).
- UI language: **Vietnamese with full diacritics**; IELTS terms stay English (Listening, Task 1, Matching Headings…).
- Always escape user-entered text with `IELTS.esc()`. Content data files are trusted (may contain HTML).
- No console errors. Target modern Chrome/Edge. Must be responsive down to 380px wide.
- Every band shown must be labelled as an estimate ("ước tính" / "tham khảo"). Never invent a score.

Reference prototype: `../index.html` (do not modify it). Approved requirements: `git show HEAD:docs/build-roadmap.md`.

---

## 1. File ownership & load order

`index.html` loads, in this exact order (all files must exist; every builder creates exactly the files they own):

```
css/base.css        (A1)   design system, layout shell, shared components
css/pages.css       (A2)   dashboard / today / roadmap / errors / settings
css/exam.css        (B)    real-exam (CD-IELTS) shell for listening + reading
css/practice.css    (B)    listening/reading landing pages, analysis, dictation
css/writing.css     (W)
css/speaking.css    (S)
css/vocab.css       (V)
css/schedule.css    (SC)   Lịch học (weekly timetable) — see §10

js/core.js          (A1)   namespace, store, StudyClock, router, helpers, stats, plan, SRS, errors, TTS, audio DB
data/vocab-bank.js  (V)
data/listening-1.js (LD1)
data/listening-2.js (LD2)
data/listening-3.js (bổ sung 16/10/2026)
data/listening-4.js (bổ sung 16/10/2026)
data/listening-expansion.js (L5–L12, 8 full tests / 320 questions)
data/dictation.js   (LD2)
data/dictation-extra.js (D13–D24)
data/reading-1.js   (RD1)
data/reading-2.js   (RD2)
data/reading-3.js   (bổ sung 16/10/2026)
data/reading-4.js   (bổ sung 16/10/2026)
data/reading-expansion.js (R5–R12, 8 full tests / 320 questions)
data/writing-bank.js(W)
data/writing-extra.js (14 Task 1 + 25 Task 2; nạp sau bank gốc)
data/speaking-bank.js(S)
data/speaking-extra.js (10 topic; nạp sau bank gốc)
js/exam.js          (B)    shared exam engine
js/pages/dashboard.js (A2)
js/pages/roadmap.js   (A2)
js/pages/today.js     (A2)
js/pages/listening.js (B)
js/pages/reading.js   (B)
js/pages/writing.js   (W)
js/pages/speaking.js  (S)
js/pages/vocab.js     (V)
js/pages/errors.js    (A2)
js/pages/settings.js  (A2)
js/pages/schedule.js  (SC)   Lịch học — see §10
js/app.js           (A1)   boot: onboarding, router start, topbar, global timer widget
```

`core.js` creates `window.IELTS` and these containers **before** data files load:

```js
IELTS.data = {
  listeningTests: [],   // pushed by listening-*.js
  readingTests: [],     // pushed by reading-*.js
  dictation: [],        // pushed by dictation.js
  vocab: { words: [] }, // set by vocab-bank.js (push into IELTS.data.vocab.words)
  writing: null,        // set by writing-bank.js
  speaking: null        // set by speaking-bank.js
};
IELTS.pages = {};
```

Data files only push/assign data. They must not call any other core function at load time.

---

## 2. Visual design system (A1 implements in base.css; everyone uses these classes)

Direction: **"premium bullet journal"**. Warm paper, ink navy, soft pastel skill colours, subtle dotted-grid
background, washi-tape accents, generous white space. Cute but grown-up, not childish. Polished
micro-interactions (hover lift, focus rings, smooth 150–200ms transitions).

Fonts (Google Fonts, css2 API with `display=swap`; css2 serves the vietnamese subset automatically):
- `--font-display: "Patrick Hand", "Nunito", system-ui, sans-serif;` headings, labels, big numbers, nav.
- `--font-body: "Nunito", system-ui, "Segoe UI", sans-serif;` all body text and **all long-form surfaces**
  (passages, essays, textareas, sample answers, transcripts). Never use Patrick Hand for paragraphs.

CSS custom properties (define on `:root`):
```
--paper:#FBF8F2  --paper-2:#F4EFE4  --card:#FFFFFF  --line:#E8E1D3  --line-2:#D9D0BE
--ink:#1F2A3D    --ink-2:#4A5568    --muted:#8A8F99
--accent:#E9725F (coral)  --accent-ink:#B9473A
--good:#3F9E73 --good-50:#E6F4EC   --warn:#D9962B --warn-50:#FCF1DC   --bad:#D4574B --bad-50:#FBE7E4
--listening:#3FA796 --listening-50:#E3F3F0
--reading:#5B6EE1   --reading-50:#E8EBFC
--writing:#E9725F   --writing-50:#FCE9E5
--speaking:#E3A43A  --speaking-50:#FBF0DA
--vocab:#9A6FC4     --vocab-50:#F1E9F8
--radius:18px --radius-sm:12px
--shadow: 0 1px 0 rgba(31,42,61,.04), 0 12px 32px -16px rgba(31,42,61,.18);
```

Shared classes (A1 must implement all; others must use them rather than re-inventing):
- Layout: `.page` (page wrapper), `.page-head` (with `.page-kicker`, `.page-title`, `.page-sub`, `.page-actions`),
  `.grid`, `.g-2`, `.g-3`, `.g-4`, `.g-auto` (auto-fit minmax 240px), `.stack` (vertical gap), `.row`
  (flex, gap, align center), `.row.between`, `.wrap`, `.spacer` (flex:1), `.section-title` (h2 style with doodle underline).
- Card: `.card`, `.card.tape` (washi tape strip on top), `.card.soft` (paper-2 background, no shadow),
  `.card-title`, `.card.pad-lg`, `.card.clickable` (hover lift).
- Skill theming: add `.sk-listening|.sk-reading|.sk-writing|.sk-speaking|.sk-vocab` to any element to set
  `--sk` and `--sk-50` to that skill's colours. Components read `var(--sk)`.
- Buttons: `.btn`, `.btn.primary` (ink background), `.btn.accent` (coral), `.btn.ghost`, `.btn.danger`,
  `.btn.sm`, `.btn.lg`, `.btn.icon` (square icon button), `.btn.sk` (uses `--sk`). Disabled state styled.
- Pills/chips: `.pill`, `.pill.good|.warn|.bad|.muted|.sk`, `.chip` (selectable; `.chip.active`).
- Tabs: `.tabs` container with `<button class="tab">` children; `.tab.active`. Segmented: `.seg` + `button` + `.active`.
- Data: `.table` (with `.table-wrap` for horizontal scroll), `.stat` (`.stat-label`, `.stat-value`, `.stat-foot`),
  `.progress` > `.progress-bar` (width via inline style; colour `var(--sk, var(--ink))`), `.ring` (SVG progress ring helper output).
- Forms: `.field` (label wrapper with `.field-label`), `.input`, `.select`, `.textarea`, `.checkbox`.
- Feedback: `.empty` (illustrated empty state: `.empty-emoji`, `.empty-title`, `.empty-text`), `.toast-host`,
  `.toast.success|.error|.warn|.info`, modal (`.modal-backdrop`, `.modal`, `.modal.wide`, `.modal-head`, `.modal-body`, `.modal-foot`).
- Text: `.muted`, `.small`, `.tiny`, `.mono`, `.hand` (display font), `.kbd`.
- Vocabulary row (6 fields, used by reading + vocab + speaking): `.vrow` with children in this order
  `.v-word` `.v-ipa` `.v-pos` `.v-band` `.v-vi` `.v-ex`; and `.vtable` table variant with the same 6 column order.
- Speaking phrase highlight: `.phrase` (red `#D4362B`, semi-bold) immediately followed by `.gloss` ("(nghĩa…)", muted italic).

Body background: `var(--paper)` with dotted grid `radial-gradient(var(--line-2) 1px, transparent 1.2px) 0 0/22px 22px` at low opacity.

App shell (A1): left sidebar (248px) with logo "IELTS Coach" + small sparkle doodle, learner name, nav grouped:
"Học tập": Tổng quan, Lộ trình, Hôm nay · "Luyện tập": Listening, Reading, Writing, Speaking, Từ vựng ·
"Theo dõi": Sổ lỗi, Cài đặt. Each nav item has an icon and a skill-colour dot for skill pages.
Topbar inside main: today's study-day date (VN), streak flame + number, "Điểm danh" button (disabled + ✓ when done),
and the **global study timer widget** (see §5). <900px: sidebar collapses to icons; <640px: sidebar becomes a bottom tab bar
(icons only, scrollable).

Exam mode: `IELTS.enterExamMode()` adds `body.exam-mode` which hides sidebar/topbar so the exam fills the screen;
`IELTS.exitExamMode()` removes it.

---

## 3. Page contract & router (A1)

```js
IELTS.registerPage({
  id: "listening",               // route id
  label: "Listening",            // nav label
  icon: "headphones",            // IELTS.icon name
  skill: "listening",            // skill for timer default / colour; null for non-skill pages
  group: "practice",             // "study" | "practice" | "track"
  order: 4,                      // nav order
  render: function(params){ return "<div class='page'>...</div>"; },  // returns HTML string
  mount:  function(root, params){ /* bind events; may return cleanup fn */ }
});
```
- Hash routing: `#/listening?tab=full&start=L1`. `IELTS.go(id, params)` updates the hash; hashchange → previous page cleanup →
  `render` → `root.innerHTML` → `mount`. `IELTS.refresh()` re-renders current route with same params.
  `IELTS.route()` returns `{id, params}`. Unknown route → dashboard.
- Pages may fully manage their own sub-views inside `root` after mount (e.g. an exam) without changing the hash.
- `IELTS.confirmLeave = fn | null`: if set and returns false, navigation is cancelled (used during exams/drafts).

Route params every page must support (Today tasks deep-link with these):
- `listening`: `tab` = `section|full|dictation|analysis`; `type` (question-type key filter); `start` (sectionId | testId | dictationId → open directly).
- `reading`: `tab` = `passage|full|analysis`; `type`; `start` (passageId | testId); `daily=1` opens today's suggested passage.
- `writing`: `tab` = `task1|task2|history`; `type` (writing type id); `daily=1` opens today's Task 2 prompt editor; `start` (promptId).
- `speaking`: `tab` = `topics|forecast|part1|part2|part3`; `start` (topic set id).
- `vocab`: `tab` = `today|review|learned`.

---

## 4. Core API (A1 implements exactly; everyone else may rely on it)

### 4.1 Helpers
- `IELTS.esc(s)`, `IELTS.uid(prefix)`, `IELTS.icon(name, size=18)` → inline SVG string (Lucide-style stroke icons).
  Required names: `home map calendar-check sun headphones book-open pen-line mic layers alert-triangle settings flame clock
  target check x play pause rotate-ccw flag chevron-left chevron-right plus trash edit star sparkles download upload volume
  eye eye-off lightbulb list bar-chart award timer square check-square bookmark filter search`.
- `IELTS.toast(msg, kind="info")`.
- `IELTS.modal({title, html, wide, actions:[{label, kind, onClick(close)}], onMount(el, close)})` → returns `close`.
- `IELTS.confirm(msg, {okLabel, danger}) → Promise<boolean>`.
- `IELTS.on(evt, fn)`, `IELTS.off(evt, fn)`, `IELTS.emit(evt, payload)`. Events: `"change"` (any state save),
  `"day"` (study day rolled over), `"timer"` (timer tick/state).
- `IELTS.skills = ["listening","reading","writing","speaking"]`; `IELTS.planSkills = [...skills, "vocab"]`;
  `IELTS.skillName(k)` → "Listening" / "Reading" / "Writing" / "Speaking" / "Từ vựng".
- Formatting: `IELTS.fmtBand(b)` → "6.5" or "—"; `IELTS.fmtDuration(seconds)` → "1 giờ 25 phút" / "40 phút" / "0 phút";
  `IELTS.fmtClock(seconds)` → "mm:ss" (or "h:mm:ss"); `IELTS.fmtDay(dayKey, style)` → `"short"` "16/10", `"long"`
  "Thứ Sáu, 16/10/2026", `"full"` "16/10/2026".

### 4.2 StudyClock (all modules use this; nobody computes dates on their own)
- Study day = date in `Asia/Ho_Chi_Minh` after subtracting `state.profile.resetHour` hours (default **6**). So 05:59 on 06/10 VN belongs to study day 2026-10-05.
- `IELTS.now()` → Date (overridable for testing via `IELTS._clockOffsetMs`, settable from `localStorage["ielts-coach-clock-offset"]`).
- `IELTS.todayKey()` → `"YYYY-MM-DD"` (study day). `IELTS.dayKeyOf(date)`.
- `IELTS.addDays(key, n)`, `IELTS.diffDays(a, b)` (b − a in whole days), `IELTS.weekday(key)`.
- `IELTS.calendarTodayVN()` → VN calendar date key with no reset shift (used for days-to-exam).
- `IELTS.daysToExam()` → max(0, diff calendarTodayVN → profile.examDate) or null if no exam date.
- A 30s interval + `visibilitychange` checks for rollover; on change, run `IELTS.ensurePlan()` and emit `"day"`.

### 4.3 State (localStorage key `ielts-coach-v1`; `IELTS.state`, `IELTS.save()`)
`IELTS.save()` writes JSON, emits `"change"`, and shows an error toast if storage fails (never fail silently).
```js
{
  version: 1,
  createdAt: ISO,
  profile: {
    name: "", examDate: "",                 // "YYYY-MM-DD"
    dailyMinutes: 250, resetHour: 6, dailyWords: 8,
    aims:     { overall: 7.0, listening: 7.5, reading: 7.5, writing: 6.5, speaking: 6.5 },
    baseline: { listening: null, reading: null, writing: null, speaking: null }, // self/teacher band
    baselineSource: "Tự đánh giá", baselineDate: "",
    manualWeak: { listening: "", reading: "", writing: "", speaking: "" },     // optional free text
    tts: { voiceF: "", voiceM: "", rate: 0.95 },
    onboarded: false
  },
  attendance: { "YYYY-MM-DD": ISO },        // one check-in per study day
  sessions: [ { id, skill, start: ISO, end: ISO, seconds, source: "timer"|"practice", ref: subId|null } ],
  submissions: [ Submission ],              // see 4.5
  plan: { day: "YYYY-MM-DD", tasks: [Task], backlog: [Task], allocation: [Alloc] },
  vocab: {
    daily: { day: "", ids: [] },
    items: { [wordId]: { status: "review"|"learned", stage: 0, due: dayKey, learnedOn: dayKey,
                         history: [{ day, result: "learn"|"ok"|"forgot" }], source: "" } },
    custom: [ Word ]                        // user-added words (same Word schema)
  },
  errors: [ ErrorItem ],
  drafts: { [key]: any },                   // page-owned drafts: "exam:<id>", "writing:<promptId>", ...
  dictationProgress: { [lessonId]: { index, done, best } },
  readingHighlights: {}
}
```
Migration: if `localStorage["ieltsPersonalCoach"]` (old prototype) exists and new state does not, import
`profile.exam → examDate`, `profile.target → aims.overall`, skills bands → baseline, and old errors as error items
(map old 6-col rows into the 5-field schema as best as possible). Never delete the old key.

### 4.4 Study time (explicit sessions only — opening a page never adds time)
- One active session at a time: `IELTS.timer` = `{ running, paused, skill, startedAt, elapsed }`.
- `IELTS.timerStart(skill)`, `IELTS.timerPause()`, `IELTS.timerResume()`, `IELTS.timerFinish()` → writes a `session`
  (source `"timer"`) if ≥ 30 s. Timer state persists in `localStorage["ielts-coach-timer"]` so a refresh keeps it.
  A session crossing the reset hour is split across the two study days.
- `IELTS.logPractice(skill, seconds, ref)` — used by in-app practice on submit (exam, writing, speaking, dictation).
  If the manual timer is running for the same skill when a practice session starts, call `IELTS.timerPause()` first
  (practice pages call `IELTS.beginPractice(skill)` which does this and returns a start timestamp; `IELTS.endPractice(start)` → seconds).
- `IELTS.dayMinutes(day)` → `{listening, reading, writing, speaking, vocab, total}` in seconds, computed from `sessions`.
- Every logged session also feeds today's plan: add the seconds to the first not-done task of that skill
  (carried tasks first); mark the task done automatically when `doneSeconds >= mins*60`.

### 4.5 Submissions, grading & stats (derived from records — no separately stored totals)
```js
Submission = {
  id, skill: "listening"|"reading"|"writing"|"speaking",
  kind: "section"|"full"|"passage"|"dictation"|"task1"|"task2"|"part1"|"part2"|"part3"|"manual",
  refId, title, day, at: ISO, seconds,
  repeat: bool,              // true if the user already submitted this refId before (does not count as new diagnostic evidence)
  score: { raw, total, accuracy, band|null, bandSource: "full-test table"|"tự đánh giá"|"giáo viên"|null,
           criteria: {..}|null, status: "graded"|"ungraded"|"assessed" },
  detail: { answers, results: [{ n, type, correct, user, answer }], text, words, audioId, notes, perPassage }
}
```
- `IELTS.recordSubmission(sub)` → assigns id/day/at/repeat, pushes, saves, logs practice time (`sub.seconds`),
  auto check-in for the day, emits change, returns the stored submission. Guard against double submit:
  if a submission with the same `sub.clientKey` exists, return it instead of adding another.
- `IELTS.updateSubmission(id, patch)` (used to add a later self-assessment to writing/speaking).
- Counting: `IELTS.dayCounts(day)` → `{ listening, reading, writing, writingT1, writingT2, speaking }` (number of submissions,
  dictation counts under listening, manual counts under its skill).
- Band tables (Academic, scaled to 40):
  Listening: 39–40→9, 37–38→8.5, 35–36→8, 32–34→7.5, 30–31→7, 26–29→6.5, 23–25→6, 18–22→5.5, 16–17→5, 13–15→4.5, 10–12→4, 8–9→3.5, 6–7→3, 4–5→2.5, else 2 (0→0).
  Reading:   39–40→9, 37–38→8.5, 35–36→8, 33–34→7.5, 30–32→7, 27–29→6.5, 23–26→6, 19–22→5.5, 15–18→5, 13–14→4.5, 10–12→4, 8–9→3.5, 6–7→3, 4–5→2.5, else 2.
  `IELTS.bandFromRaw(skill, raw)` — **only for full tests (total 40)**. Sections/passages store accuracy only (band null).
- `IELTS.skillBand(skill)` → `{ band, source }`:
  - Listening/Reading: average of the last 3 non-repeat full-test bands; else `profile.baseline[skill]`; else null.
  - Writing: latest assessed Task 1 band (T1) and Task 2 band (T2) → `(T1 + 2*T2)/3` rounded to 0.5 when both exist;
    else whichever exists; else baseline; else null.
  - Speaking: average of last 3 assessed speaking bands; else baseline; else null.
- `IELTS.roundOverall(x)` → IELTS rule (.25 → up to .5, .75 → up to next whole). `IELTS.overallBand()` → `{band, complete}`
  (null if any skill band missing; `complete:false` then).
- Question-type stats: computed from `detail.results` of non-repeat listening/reading submissions (not dictation).
  `IELTS.typeStats(skill, {days:30})` → `[{ type, name, correct, total, acc, sets, level }]` where `level` is:
  `"insufficient"` unless total ≥ 20 across ≥ 3 different refIds in the window; then `"weak"` (<70%), `"improving"` (70–90), `"strong"` (>90).
  Show insufficient types too, labelled "Chưa đủ dữ liệu".
- `IELTS.criteriaStats(skill)` (writing/speaking) → average per criterion over last 5 assessed submissions.
- `IELTS.recentAccuracy(skill, n=5)` → `{ acc, count, sets, days }` over non-repeat graded L/R submissions (sections, passages, full).
- `IELTS.isStable(skill)` (listening/reading): last ≥ 5 non-repeat attempts on different refIds within 14 study days,
  spread over ≥ 3 study days, ≥ 50 questions total, and every one of those attempts > 90%.
- `IELTS.weakAreas(skill)` → `{ weak:[{key,name,acc,advice}], strong:[...], insufficient:[...], manual: profile.manualWeak[skill] }`
  using typeStats (L/R) or criteriaStats (W/S: criterion < aim − 0.5 → weak).

`IELTS.QTYPES` (A1 writes names + one-line Vietnamese advice each):
- listening: `form` Form Completion · `note` Note Completion · `table` Table Completion · `flow` Flow-chart Completion ·
  `summary` Summary Completion · `sentence` Sentence Completion · `mcq` Multiple Choice · `mcq-multi` Multiple Choice (chọn 2) ·
  `matching` Matching · `map` Map/Plan Labelling · `diagram` Diagram Labelling · `short` Short Answer
- reading: `tfng` True/False/Not Given · `ynng` Yes/No/Not Given · `headings` Matching Headings · `info` Matching Information ·
  `features` Matching Features · `endings` Matching Sentence Endings · `mcq` Multiple Choice · `mcq-multi` Multiple Choice (chọn 2) ·
  `sentence` Sentence Completion · `summary` Summary Completion · `note` Note/Table/Flow-chart Completion · `diagram` Diagram Label Completion · `short` Short Answer

`IELTS.CRITERIA`:
- writing: `tr` Task Achievement / Task Response · `cc` Coherence & Cohesion · `lr` Lexical Resource · `gra` Grammatical Range & Accuracy
- speaking: `fc` Fluency & Coherence · `lr` Lexical Resource · `gra` Grammatical Range & Accuracy · `p` Pronunciation

### 4.6 Attendance
`IELTS.checkIn()` (idempotent per study day), `IELTS.isCheckedIn(day)`, `IELTS.streak()` → consecutive checked-in study days
ending today (or ending yesterday if today not yet checked in). Missing days are never auto-filled.

### 4.7 Content lookup (A1)
- `IELTS.allSections()` → `[{ test, section }]`; `IELTS.findSection(id)`; `IELTS.findListeningTest(id)`.
- `IELTS.allPassages()` → `[{ test, passage }]`; `IELTS.findPassage(id)`; `IELTS.findReadingTest(id)`.
- `IELTS.findWord(id)` → Word from vocab bank ∪ every passage's `vocab` ∪ `state.vocab.custom` (first match wins).
- `IELTS.wordId(word)` → lowercase, trim, spaces → "-", strip non `[a-z0-9-]`.

### 4.8 Daily content bundle (stable for the whole study day)
- `IELTS.dailyIndex(day)` = diffDays("2026-01-01", day).
- `IELTS.getDailyPassage(day=today)` → `{test, passage}`: rotate over `allPassages()` by dailyIndex, preferring passages
  without a non-repeat submission (if all done, plain rotation and mark `reviewMode:true`).
- `IELTS.getTodayWords()` → Word[] (length `profile.dailyWords`, default 8). Stored in `state.vocab.daily` for the day so it
  never re-randomises on reload. Selection: words from the daily passage's `vocab` not yet in `vocab.items` first, then bank
  words with the same `topic`, then any unlearned bank words in bank order. Each returned word gets `fromPassage: passageId|null`.
- `IELTS.getDailyTopic()` → the daily passage's `topic` (writing/speaking use it to choose same-topic content).

### 4.9 Vocabulary SRS
`IELTS.SRS = [1, 2, 5, 7, 14, 30]`.
- `IELTS.learnWord(id, source)` → if not in items: `{status:"review", stage:0, due: today+1, learnedOn: today}`.
  Idempotent (second call does nothing, returns false). Logged in history.
- `IELTS.reviewWord(id, remembered)`: only acts if `due <= today` (early preview does nothing → returns false).
  remembered: `stage += 1`; if `stage >= 6` → `status:"learned"`; else `due = today + SRS[stage]`.
  forgot: `stage = 0; due = today + 1`. Always push history. Repeated clicks on the same day cannot double-advance
  (after a successful review `due > today`).
  Example: learned 2026-10-05 → due 10-06 → 10-08 → 10-13 → 10-20 → 11-03 → 12-03 → learned.
- `IELTS.dueWords()` (overdue first), `IELTS.reviewingWords()`, `IELTS.learnedWords()`, `IELTS.addCustomWord(word)` (dedup by id).

### 4.10 Daily plan (DailyPlanner)
```js
Task  = { id, day /*created*/, skill, title, detail, mins, doneSeconds, done, doneAt, carried: bool, route: { page, params } }
Alloc = { skill, mins, reason }
```
- `IELTS.ensurePlan()` (called at boot and on rollover): if `plan.day !== today`:
  1. Collect undone tasks from the old plan's tasks + backlog (keep ids, original `day`, remaining minutes = mins − doneSeconds/60 rounded up to 5).
     Done tasks are archived into `state.planHistory[day]` (keep them; never reset done → undone).
  2. Compute allocation (below): exactly `profile.dailyMinutes` (250) across the 5 plan skills.
  3. For each skill, carried tasks of that skill go in first (marked `carried:true`) while they fit in that skill's minutes;
     the rest of that skill's budget is filled with new tasks. Carried tasks that do not fit go to `plan.backlog` (visible on Today).
  4. Total of `plan.tasks` minutes must equal the budget exactly (never exceed). Never duplicate tasks on repeated calls.
- `IELTS.computeAllocation()` → Alloc[] summing to dailyMinutes, rounded to 5, each between 20 and 90:
  - No evidence for a skill (fewer than 3 non-repeat graded attempts in last 14 days for L/R; no assessed submission for W/S):
    weight 1 (→ default 50 each when nothing is known). Reason "Mặc định — chưa đủ dữ liệu".
  - `isStable(listening|reading)` → weight 0.6, reason "Ổn định >90% — duy trì".
  - Otherwise weight = 1 + 0.6·max(0, aim − band) + (acc<70 ? 0.4 : acc<80 ? 0.2 : 0), clamp 0.6–1.8, with reasons such as
    "Cách aim 1.0 band", "Accuracy gần đây 64%".
  - Vocab: weight 1 (+0.3 if > 15 words due; −0.3 if 0 due and today's words learned yesterday streak) .
  - Example acceptance case: Listening stable, Writing weak → e.g. L30 R50 W80 S60 V30.
- New task templates (route deep links!):
  - Listening: "Section lẻ — dạng {weakest type name}" → `{page:"listening", params:{tab:"section", type}}`; plus "Dictation" 15' if mins ≥ 45.
  - Reading: "Passage đề xuất hôm nay" → `{page:"reading", params:{daily:1}}`; plus "Passage lẻ — dạng {weakest}" if mins ≥ 50.
  - Writing: "Task 2 — đề hôm nay (dùng từ vựng hôm nay)" → `{page:"writing", params:{daily:1}}`; plus "Task 1 — {type}" if mins ≥ 50.
  - Speaking: "Part 2 + Part 3 — topic forecast" → `{page:"speaking", params:{tab:"forecast"}}`; plus "Part 1 — luyện ghi âm" if mins ≥ 40.
  - Vocab: "Ôn {n} từ đến hạn" (if due > 0) first, then "Học {k} từ mới hôm nay" → `{page:"vocab", params:{tab:"today"|"review"}}`.
- `IELTS.toggleTask(id)`, `IELTS.regeneratePlan()` (recompute new—not carried, not done—tasks for today using the current allocation).

### 4.11 Error log (ErrorReview)
```js
ErrorItem = { id, error /*lỗi lặp lại*/, example /*ví dụ của mình*/, why, fix, skill, qtype, source /*title/refId*/,
              createdDay, recheckDay /*createdDay + 7*/, count: 1, examples: [{day, text}],
              status: "open"|"passed", checks: [{day, result: "pass"|"fail"}], basis: "answer-key"|"self" }
```
- `IELTS.addError(fields)` → if an open error with the same `error` text (case-insensitive) and skill exists: count++, push example,
  **do not move recheckDay**; else create with `recheckDay = createdDay + 7`. Returns the item.
- `IELTS.recheckError(id, passed)`: passed → status "passed"; failed → `recheckDay = today + 7`, count++. Push to checks.
- `IELTS.dueErrors()` → open errors with `recheckDay <= today`.
- Display label for re-check: "Tuần dd/mm – dd/mm" (the 7-day week starting at recheckDay) plus a badge "Đến hạn" when due.

### 4.12 TTS & audio (A1)
Real exam audio is not shipped, so listening uses the Web Speech API; data may optionally include `audio: "url"` later.
- `IELTS.tts.ready()` → Promise (voices loaded). `IELTS.tts.voices()` → English voices, en-GB first.
- `IELTS.tts.speak(text, { voice: "f"|"m"|"f2"|"m2", rate }) → Promise` (resolves on end or cancel).
- `IELTS.tts.playScript(lines, { rate, onLine(i), shouldContinue() }) → Promise` — lines `[{ speaker, voice, text }]`, plays
  sequentially with a 350 ms gap and different voices per `voice` key (prefer Microsoft "Online (Natural)" en-GB/en-AU/en-US
  voices on Edge, "Google UK English Female/Male" on Chrome). `IELTS.tts.stop()`, `IELTS.tts.pause()`, `IELTS.tts.resume()`.
- If speechSynthesis is unavailable or has no English voice: `IELTS.tts.available() === false`; pages must detect this
  **before** starting a listening test and show a clear message (and offer transcript practice mode).
- Audio blobs (speaking recordings): IndexedDB db `ielts-coach-audio`, store `audio`.
  `IELTS.audioDB.put(blob) → Promise<id>`, `get(id) → Promise<Blob|null>`, `del(id)`, `all() → Promise<[{id, blob}]>`.
  Backup export includes audio as base64; restore validates JSON shape before writing anything.

### 4.13 Backup (A1 provides functions, A2 builds Settings UI)
- `IELTS.exportBackup() → Promise<object>` `{ app:"ielts-coach", version:1, exportedAt, state, audio:[{id, type, base64}] }`.
- `IELTS.importBackup(obj) → Promise` throws `Error("…Vietnamese reason…")` on invalid shape without touching current data.
- `IELTS.resetAll()`.

---

## 5. Global study timer widget (A1, in topbar)
Compact pill: skill selector (colour dot, defaults to current page's skill, else last used), elapsed `mm:ss`,
Start / Pause / Resume / Finish buttons. When finished: toast "Đã ghi 25 phút Writing". Also exposed on Today page cards
("Bắt đầu" on a task → `IELTS.timerStart(task.skill)` and navigate to its route).

---

## 6. Content data schemas

### 6.1 Listening (`IELTS.data.listeningTests.push(test)`)
```js
{
  id: "L1", title: "Practice Test 1", source: "Biên soạn cho luyện tập (không phải đề thi thật)",
  sections: [ Section x4 ]
}
Section = {
  id: "L1-S1", part: 1, title: "Riverside Sports Centre – membership enquiry",
  context: "A conversation between a receptionist and a caller.",   // English
  audio: null,                                                      // optional URL later
  script: [ { speaker: "Receptionist", voice: "f", text: "Good morning, ...", q: [1] } ],  // q = question numbers this line answers (for transcript evidence)
  groups: [ Group ]                                                 // numbering continuous: Part1 1–10, Part2 11–20, Part3 21–30, Part4 31–40
}
```
Part 1: everyday conversation (2 speakers, form/note/table completion). Part 2: monologue on everyday topic (map/plan labelling,
MCQ, matching). Part 3: academic discussion 2–3 speakers (MCQ, matching, mcq-multi). Part 4: academic lecture (note/summary/flow completion).
Each section's script ≈ 450–750 words, natural spoken English incl. at least 2 distractors (speaker corrects themself, rejected options),
numbers/spellings spelled out in Part 1 ("That's G-R-E-E-N-H-A-M").

### 6.2 Reading (`IELTS.data.readingTests.push(test)`)
```js
{
  id: "R1", title: "Practice Test 1", source: "Biên soạn cho luyện tập (không phải đề thi thật)",
  passages: [ Passage x3 ]
}
Passage = {
  id: "R1-P1", part: 1, title: "...", topic: "environment",   // topic from TOPICS below
  intro: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
  paragraphs: [ { label: "A", text: "..." } ],                // label "" if paragraphs are unlabeled
  groups: [ Group ],                                          // P1: 1–13, P2: 14–26, P3: 27–40
  vocab: [ Word x14–18 ]                                      // every word MUST literally occur in the passage text (word or inflected form)
}
```
Passages ≈ 750–950 words, Academic register, P3 the hardest. Across one test cover ≥ 8 different question types.

### 6.3 Question groups (shared by listening + reading; rendered by `js/exam.js`)
Every group: `{ type, kind, range: [from, to], instruction, ... }` — `type` is a QTYPES key used for stats.
- `kind:"gap"` (form/note/table/flow/summary/sentence/short/diagram completion):
  `{ title?, content: "HTML with {{n}} placeholders", wordLimit: "ONE WORD AND/OR A NUMBER", wordBank?: ["A ...", "B ..."],
     image?: "<svg ...>" (diagram), answers: { "1": ["Greenham"], "2": ["7.30", "seven thirty", "7:30"] } }`
  With `wordBank`, answers are letters (rendered as a select). Grading: trim, lowercase, collapse spaces, strip trailing ".";
  accept any listed variant; enforce wordLimit (too many words = wrong). Numbers: "7" and "seven" only if both listed.
- `kind:"mcq"`: `{ questions: [ { n, text, options: ["A ...","B ...","C ..."], answer: "B" } ] }`
- `kind:"multi"`: `{ questions: [ { ns: [21,22], text: "Which TWO ...?", options: ["A ...", ... "E ..."], answer: ["B","D"] } ] }` — order-insensitive, each number graded independently (one correct letter = 1 mark).
- `kind:"match"` (matching, headings, info, features, endings, map with letters): `{ options: [ { key: "A", text: "..." } ],
     optionsTitle?: "List of Headings", image?: "<svg>" (map), allowReuse?: true, questions: [ { n, text, answer: "C" } ] }`
- `kind:"tfng"`: `{ variant: "tfng"|"ynng", questions: [ { n, text, answer: "TRUE"|"FALSE"|"NOT GIVEN" (or YES/NO/NOT GIVEN) } ] }`
- Every question (or for gap groups, `explain: { "1": "..." }` map) has a Vietnamese explanation quoting the evidence:
  `explain: "Đoạn C: '...the figure rose to 40%...' → đáp án 40%"`.
  For mcq/multi/match/tfng questions put `explain` on each question object.
- Maps/diagrams: inline SVG strings authored in the data file (clean, labelled with letters/blank numbers, ≤ 600×400 viewBox).

### 6.4 Dictation (`IELTS.data.dictation.push(lesson)`)
`{ id: "D01", title, level: "easy"|"medium"|"hard", topic, voice: "f", sentences: ["...", "..."] }` — 8–15 sentences each.

### 6.5 Word (vocab bank, passage vocab, custom) — the 6 display fields in this order
`{ id, word, ipa: "/ˈmɪtɪɡeɪt/", pos: "v." | "n." | "adj." | "adv." | "phr." | "collocation", band: "6.5" | "7.0" | "7.5+" | "8.0+",
   vi: "giảm nhẹ, hạn chế", example: "Governments must act to mitigate the effects of climate change.", topic }`
`id = IELTS.wordId(word)` computed by hand in data (lowercase, hyphens). Band is an editorial label ("band tham khảo").

### 6.6 TOPICS (shared tag list)
`education technology environment health work society urban culture science media travel crime government family economy food sport history animals energy`

### 6.7 Writing bank (`IELTS.data.writing = {...}`), Speaking bank (`IELTS.data.speaking = {...}`) — schemas owned by W and S
(documented at the top of their data files). Speaking sample markup for highlighted phrases: `[[phrase|nghĩa tiếng Việt]]`
→ rendered `<span class="phrase">phrase</span> <span class="gloss">(nghĩa tiếng Việt)</span>`.

---

## 7. Feature requirements by page (summary of the client brief)

**Dashboard (A2)** in this order:
1. Hero row: (a) Estimated overall band (ước tính) with source note, **aim overall**, and the 4 skill aims shown as current → aim
   chips (edit button opens modal to change aims); (b) Days to exam; (c) Study streak. **No exam readiness.**
2. Attendance calendar (month grid, prev/next month, checked days stamped, today ring, "Điểm danh hôm nay" button) beside
   the daily stats table with columns exactly: **Ngày/tháng/năm | Reading | Listening | Writing (T1 · T2) | Speaking | Tổng thời gian học**
   (last 14 study days, newest first; counts of submissions; total time includes vocab).
3. Four-skill profile: per skill card — estimated band + source, aim, gap, progress bar, weak areas (with advice), strong areas,
   "chưa đủ dữ liệu" when applicable, a "Luyện ngay" deep link to the weakest type.
4. Submission history: tabs Listening / Reading / Writing (sub-tabs Task 1 | Task 2) / Speaking; filter by date range;
   rows: date, title, kind (section/full/dictation/passage), score (raw/total, accuracy, band if any), time, status, "Xem" (modal with
   detail: answers review / essay text / audio player for speaking). Also "+ Ghi bài làm ngoài app" (manual submission with notes).

**Roadmap (A2)**: keep the prototype's Roadmap UI and behaviour exactly (same 4 stage cards, same English texts, same Active/Next
logic using the overall estimate, same 2-column grid and progress bars) — only inherits the new theme tokens.

**Today (A2)**: total 250' (from profile) allocation bar coloured by skill with each skill's minutes and reason; task list grouped
by skill; carried tasks tagged "Tồn từ dd/mm"; backlog section; each task: checkbox, title, detail, progress (doneSeconds/mins),
"Bắt đầu" (starts timer + navigates). Header shows study-day date and "Ngày học mới lúc 06:00 (giờ Việt Nam)". Also shows due vocab
count and due errors (links).

**Listening (B)**: tabs Section lẻ | Full đề | Dictation | Phân tích dạng bài. Section practice = one section of a full test,
real exam UI. Full test = 4 sections in a row, real exam UI (exam mode: audio plays once, no replay, 30 s reading time before each part
(skippable in practice), 2 min check time at the end, then submit). Practice mode (section) may allow replay. Results: score, accuracy,
reference band only for full test, per-question review with user/correct answer, explanation, transcript with evidence lines highlighted,
"Ghi vào sổ lỗi" per wrong question (prefilled ErrorItem, basis "answer-key"). Dictation like dailydictation.com: lesson list by level,
sentence-by-sentence play/replay/slower, type, check → per-word diff (correct / wrong / missing / extra), hint next word, reveal,
progress saved per lesson, record a `dictation` submission at the end. Analysis: question-type table with correct/total/acc/level,
weakest first, "Luyện dạng này" filters sections containing that type. Drafts saved so refresh keeps answers and remaining time.

**Reading (B)**: tabs Passage lẻ | Full đề | Phân tích dạng bài, plus "Bài đọc đề xuất hôm nay" card (daily passage, today's words
highlighted inside the passage text). Real CD-IELTS UI: split view passage | questions, draggable divider, own scroll, timer
(20' passage, 60' full test, auto-submit at 0), bottom question navigator by part with answered/flagged states, flag for review,
text highlighter. Results like listening plus **"Lọc từ vựng"** table for each passage with the 6 columns in order
(Từ tiếng Anh | Phiên âm | Loại từ | Band | Nghĩa tiếng Việt | Câu ví dụ) and "+ Thêm vào từ cần ôn" (per word & all) → `IELTS.learnWord`.

**Writing (W)**, **Speaking (S)**, **Vocabulary (V)**: see their own task briefs (derived from the client brief).

**Error log (A2)**: table with exactly 5 columns left→right: **Lỗi lặp lại | Ví dụ của mình | Vì sao sai | Cách sửa | Tuần kiểm tra lại**.
Skill/qtype/count/source shown as small tags inside the first cell + filters (skill, status, due). Add/edit form (modal), "Đến hạn"
section on top with Đạt / Chưa đạt buttons (recheckError). Count badge "×3".

**Settings (A2)**: name, exam date, aims, baseline bands + source/date, manual weak notes, daily minutes (default 250), reset hour
(default 6, informational), daily words (default 8), TTS voice pickers (+ test button) and rate, backup export (download JSON) /
import (file picker → validate → confirm), reset all data, onboarding re-run.

Onboarding (A1, first run): friendly 3-step modal: name + exam date → current bands (or "chưa biết") → aims. Sets `onboarded`.

---

## 8. Quality bar for every builder
- Read this spec fully before coding. Use only the core API and classes above; if you need something missing, implement it
  locally inside your own file (prefixed) — do **not** edit files owned by others.
- Empty states everywhere (fresh profile must look beautiful, not broken).
- Escape user text. Persist drafts. No `alert()`/`prompt()` — use `IELTS.toast/modal/confirm`.
- Keyboard: Enter submits where natural; visible focus rings.
- Verify your JS parses: run `node --check <file>` on every JS file you create (Node is available).
- Keep strings Vietnamese with correct diacritics.

---

## 10. Lịch học (weekly school timetable) — `#/schedule` (SC)

Files: `js/pages/schedule.js` (page, registered with `group:"study"`, `order:3.5`, icon `calendar`, so it appears in the
sidebar right after "Hôm nay"; nav comes from `registerPage`, no `navDefaults` entry needed) and `css/schedule.css`
(`sc-` prefix). No other file depends on it.

- Grid: 7 columns Thứ 2 … Thứ 7, Chủ nhật (Mon→Sun) × 24 one-hour rows "00:00–01:00" … "23:00–24:00". Today's column
  is highlighted using the **VN calendar date** (`IELTS.weekday(IELTS.calendarTodayVN())`, no 06:00 study-day shift, because a
  school timetable follows the real weekday); the current VN hour row gets a dot. The grid scrolls in its own container:
  header row sticky to the top, time column sticky to the left (works at 380px).
- Every cell is optional and is a `<button>`. Mode "Sửa từng ô" (default) opens a small modal: pick one type
  (toggle) and/or a note (≤ 40 chars), Lưu / Xoá ô / Huỷ, Enter saves. Brush modes (one of the 4 types or "Xoá ô"): tap/click
  or Enter/Space paints a cell (keeps its note), mouse drag paints several cells (touch keeps native scrolling, tap to paint).
  Arrow keys move between cells, Delete/Backspace clears. Extras: "Sao chép ngày" (replaces the target day's 24 slots) and
  "Xoá tất cả" (`IELTS.confirm`, danger).
- Types and colours: `school` "Học trên trường" (`--reading`/`--reading-50`), `home` "Về đến nhà" (`--speaking`),
  `study` "Tự học ở nhà" (`--good`), `busy` "Bận việc khác" (`--vocab`); note-only cells use `--paper-2`.
- Per-day summary: "N giờ ở trường · N giờ tự học · N giờ có thể học (= trống + tự học) · về nhà HH:00" (first `home` slot).
  Plain counts, never a score.
- Storage: inside the main state (`localStorage["ielts-coach-v1"]`), therefore automatically included in
  `exportBackup` / `importBackup` and wiped by `resetAll`. Created lazily by the page (not in `defaultState`); readers must
  tolerate it being absent or malformed.
  ```js
  state.schedule = {
    version: 1,
    updatedAt: ISO | "",
    cells: { "<day>-<HH>": { type: "school"|"home"|"study"|"busy"|"", note: "" } }  // day: mon tue wed thu fri sat sun; HH "00".."23"
  }
  ```
  Empty cells are absent (a cell is stored only if it has a type or a non-empty note). Notes are user text → always `IELTS.esc()`.
- Read-only helper for other pages: `IELTS.schedule = { DAYS, TYPES, get(key), daySummary(dayId) }`.
