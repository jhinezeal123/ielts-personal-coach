// Shared helpers for the content channel (content/CONTRACT.md, SPEC §11):
// load built-in app data + exam engine in node:vm, load content/packs/*.js with a stub IELTS.registerPack,
// validate packs with the same rules as built-in data. Used by build-content-manifest.mjs and check-content.mjs.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const TOPICS = new Set('education technology environment health work society urban culture science media travel crime government family economy food sport history animals energy'.split(' '));
export const READING_TYPES = new Set('tfng ynng headings info features endings mcq mcq-multi sentence summary note diagram short'.split(' '));
export const LISTENING_TYPES = new Set('form note table flow summary sentence mcq mcq-multi matching map diagram short'.split(' '));
const SEMVER = /^\d+\.\d+\.\d+$/;
const ASSET_FILE = /^[A-Za-z0-9._-]+(\/[A-Za-z0-9._-]+)*$/;

const words = text => String(text || '').trim().split(/\s+/).filter(Boolean).length;
const own = value => JSON.parse(JSON.stringify(value));
export const wordId = w => String(w || '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
export const semverCmp = (a, b) => {
  const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
  for (let i = 0; i < 3; i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0);
  return 0;
};

/** Built-in app data (data/*.js in index.html order) + IELTS.exam, in a vm context. */
export function loadApp(root = ROOT) {
  const html = fs.readFileSync(path.join(root, 'app/index.html'), 'utf8');
  const files = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
  const data = { readingTests: [], listeningTests: [], listeningClips: [], dictation: [], vocab: { words: [] } };
  const context = { window: { IELTS: { data } }, console };
  vm.createContext(context);
  for (const file of files.filter(f => f.startsWith('data/')).concat('js/exam.js')) {
    vm.runInContext(fs.readFileSync(path.join(root, 'app', file), 'utf8'), context, { filename: file });
  }
  const version = /IELTS_VERSION\s*=\s*"([^"]+)"/.exec(fs.readFileSync(path.join(root, 'app/version.js'), 'utf8'))?.[1] || '0.0.0';
  return { data, exam: context.window.IELTS.exam, files, version };
}

/** Text as served by raw.githubusercontent.com (git stores LF; Windows checkouts may have CRLF). */
export function normalizedBytes(file) {
  return Buffer.from(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'), 'utf8');
}
export function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

/** Executes one pack file with a stub IELTS.registerPack; returns the registered pack object. */
export function loadPackFile(file) {
  const calls = [];
  const IELTS = { registerPack: p => calls.push(p) };
  const context = { window: { IELTS }, IELTS, console };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: path.basename(file), timeout: 5000 });
  if (calls.length !== 1) throw new Error(path.basename(file) + ': expected exactly one IELTS.registerPack() call, got ' + calls.length);
  return own(calls[0]);
}

export function listPackFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort().map(f => path.join(dir, f));
}

/** IDs already used by built-in data, by namespace. */
export function builtinIds(data) {
  const ids = new Map();
  const add = (id, where) => { if (id != null) ids.set(String(id), where); };
  for (const t of data.listeningTests) { add(t.id, 'built-in listening test'); for (const s of t.sections || []) add(s.id, 'built-in section'); }
  for (const t of data.readingTests) { add(t.id, 'built-in reading test'); for (const p of t.passages || []) add(p.id, 'built-in passage'); }
  for (const c of data.listeningClips || []) add(c.id, 'built-in clip');
  for (const d of data.dictation) add(d.id, 'built-in dictation');
  for (const w of data.vocab.words) add('word:' + w.id, 'built-in vocab');
  return ids;
}

const answersFor = groups => {
  const answers = {};
  for (const g of groups) {
    if (g.kind === 'gap') for (const [n, variants] of Object.entries(g.answers || {})) answers[n] = variants[0];
    else for (const q of g.questions || []) {
      if (g.kind === 'multi') (q.ns || []).forEach((n, i) => { answers[n] = (q.answer || [])[i]; });
      else answers[q.n] = q.answer;
    }
  }
  return answers;
};

/** Validates a list of groups numbered exactly `expected` (array of numbers). Pushes messages into errs. */
export function checkGroups(exam, groups, expected, label, types, errs) {
  const err = m => errs.push(label + ': ' + m);
  if (!Array.isArray(groups) || !groups.length) return err('no question groups');
  let numbers;
  try { numbers = groups.flatMap(g => own(exam.groupNumbers(g))); } catch (e) { return err('cannot read numbering: ' + e.message); }
  const sorted = [...numbers].sort((a, b) => a - b);
  if (JSON.stringify(sorted) !== JSON.stringify(expected)) err('question numbers must be ' + expected[0] + '–' + expected[expected.length - 1] + ' exactly once (got ' + sorted.join(',') + ')');
  for (const g of groups) {
    const gl = 'group ' + JSON.stringify(g.range || g.type);
    if (!types.has(g.type)) err(gl + ' unknown type ' + g.type);
    if (!['gap', 'mcq', 'multi', 'match', 'tfng'].includes(g.kind)) { err(gl + ' unknown kind ' + g.kind); continue; }
    if (!g.instruction) err(gl + ' missing instruction');
    if (g.kind === 'gap') {
      for (const n of exam.groupNumbers(g)) {
        if (!String(g.content || '').includes('{{' + n + '}}')) err(gl + ' missing blank {{' + n + '}}');
        if (!g.explain || !g.explain[n]) err(gl + ' missing explanation ' + n);
        const variants = (g.answers || {})[n];
        if (!Array.isArray(variants) || !variants.length) { err(gl + ' missing answers for ' + n); continue; }
        if (!g.wordBank) for (const v of variants) if (!exam.withinLimit(v, g.wordLimit)) err(gl + ' answer exceeds word limit: ' + v);
      }
    } else for (const q of g.questions || []) {
      if (!q.explain) err(gl + ' missing explanation for question ' + (q.n ?? (q.ns || []).join('+')));
      if (g.kind === 'match' && !(g.options || []).some(o => o.key === q.answer)) err(gl + ' invalid matching answer ' + q.answer);
      if (g.kind === 'mcq' && !exam.optionList(q.options).some(o => o.key === q.answer)) err(gl + ' invalid MCQ answer ' + q.answer);
      if (g.kind === 'multi' && !(Array.isArray(q.answer) && q.answer.length === (q.ns || []).length && q.answer.every(a => exam.optionList(q.options).some(o => o.key === a)))) err(gl + ' invalid multiple answer');
      if (g.kind === 'tfng') {
        const allowed = g.variant === 'ynng' ? ['YES', 'NO', 'NOT GIVEN'] : ['TRUE', 'FALSE', 'NOT GIVEN'];
        if (!allowed.includes(q.answer)) err(gl + ' invalid ' + (g.variant || 'tfng') + ' answer ' + q.answer);
      }
    }
    try { if (/undefined|NaN/.test(exam.renderGroups([g], 'chk'))) err(gl + ' render artefact (undefined/NaN)'); } catch (e) { err(gl + ' render failed: ' + e.message); }
  }
  if (errs.some(e => e.startsWith(label + ':'))) return;
  const correct = answersFor(groups);
  const total = expected.length;
  const graded = exam.gradeGroups(groups, correct);
  const raw = exam.summarize(graded).raw;
  if (raw !== total) {
    err('gold answers score ' + raw + '/' + total + ' — the grader rejects the first listed answer of ' +
      graded.filter(r => !r.correct).map(r => 'Q' + r.n + ' (' + JSON.stringify(r.user) + ')').join(', '));
    return; // variant checks below would only repeat this failure
  }
  for (const g of groups.filter(x => x.kind === 'gap')) for (const [n, variants] of Object.entries(g.answers)) for (const v of variants) {
    if (exam.summarize(exam.gradeGroups(groups, { ...correct, [n]: v })).raw !== total) err('answer variant rejected by grader: ' + v);
  }
  if (exam.summarize(exam.gradeGroups(groups, {})).raw !== 0) err('blank answers score > 0');
}

function checkEvidence(lines, partNumbers, label, errs) {
  const tagged = new Set((lines || []).flatMap(l => l.q || []).map(Number));
  if (!partNumbers.every(n => tagged.has(n))) errs.push(label + ': every question needs a transcript line with q:[n] evidence (missing ' + partNumbers.filter(n => !tagged.has(n)).join(',') + ')');
  if (![...tagged].every(n => partNumbers.includes(n))) errs.push(label + ': evidence tag for a question that does not exist');
}

function audioRefs(pack) {
  const out = [];
  const walk = (v, where) => {
    if (Array.isArray(v)) v.forEach((x, i) => walk(x, where + '[' + i + ']'));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) {
      if (k === 'audio' && typeof x === 'string') out.push({ ref: x, where: where + '.' + k });
      else walk(x, where + '.' + k);
    }
  };
  for (const key of ['listeningTests', 'listeningClips', 'readingTests', 'dictation', 'vocabWords']) walk(pack[key], key);
  return out;
}

/**
 * Validates one pack. opts: { exam, fileId, taken: Map(id → owner) (built-in + earlier packs; updated in place), assetDir? }
 * Returns error strings (empty = valid).
 */
export function validatePack(pack, { exam, fileId, taken, assetDir }) {
  const errs = [];
  const err = m => errs.push(fileId + ': ' + m);
  if (!pack || typeof pack !== 'object') { err('registerPack() argument is not an object'); return errs; }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(pack.id || '')) err('id must be kebab-case');
  if (pack.id !== fileId) err('id "' + pack.id + '" must equal the file name "' + fileId + '"');
  if (!Number.isInteger(pack.version) || pack.version < 1) err('version must be a positive integer');
  if (!SEMVER.test(pack.minAppVersion || '')) err('minAppVersion must be semver X.Y.Z');
  if (!pack.title) err('missing title');
  if (!pack.source) err('missing source');
  const known = ['id', 'version', 'minAppVersion', 'title', 'source', 'assets', 'listeningTests', 'listeningClips', 'readingTests', 'dictation', 'vocabWords'];
  for (const k of Object.keys(pack)) if (!known.includes(k)) err('unknown key "' + k + '"');
  for (const k of known.slice(5)) if (pack[k] !== undefined && !Array.isArray(pack[k])) err(k + ' must be an array');

  // assets
  const assets = new Map();
  for (const a of pack.assets || []) {
    if (!a || !ASSET_FILE.test(a.file || '') || String(a.file).split('/').some(s => s === '.' || s === '..')) { err('bad asset file name ' + JSON.stringify(a && a.file)); continue; }
    if (!/^https:\/\//.test(a.url || '')) err('asset ' + a.file + ' needs an https url');
    if (assets.has(a.file)) err('duplicate asset ' + a.file);
    assets.set(a.file, a);
    if (assetDir && !fs.existsSync(path.join(assetDir, a.file))) err('asset file not found locally: ' + path.join(assetDir, a.file));
  }
  const used = new Set();
  for (const { ref, where } of audioRefs(pack)) {
    const m = /^asset:(.+)$/.exec(ref);
    if (m) { if (!assets.has(m[1])) err(where + ' references unknown asset "' + m[1] + '" (add it to assets)'); else used.add(m[1]); }
    else if (!/^https:\/\//.test(ref)) err(where + ' audio must be "asset:<file>" or an https URL');
  }
  for (const f of assets.keys()) if (!used.has(f)) err('asset ' + f + ' is not referenced by any audio field');

  // unique ids (across packs and built-in data)
  const claim = (id, what) => {
    if (id == null || id === '') { err(what + ' without id'); return; }
    const key = what === 'word' ? 'word:' + id : String(id);
    if (taken.has(key)) err(what + ' id "' + id + '" already used by ' + taken.get(key));
    else taken.set(key, 'pack ' + fileId);
  };

  // listening tests (same rules as built-in tests: 4 parts, 1–40)
  for (const t of pack.listeningTests || []) {
    claim(t.id, 'listening test');
    const parts = t.sections || [];
    if (parts.length !== 4) { err(t.id + ' must have 4 sections'); continue; }
    parts.forEach((s, i) => {
      claim(s.id, 'section');
      const label = fileId + ' ' + s.id;
      if (s.part !== i + 1) errs.push(label + ': part must be ' + (i + 1));
      const expected = Array.from({ length: 10 }, (_, k) => i * 10 + k + 1);
      checkGroups(exam, s.groups, expected, label, LISTENING_TYPES, errs);
      const text = (s.script || []).map(l => l.text).join(' ');
      // real recordings (audio set) carry official transcripts — the 450–750 word rule applies to TTS-only sections
      if (!s.audio && (words(text) < 450 || words(text) > 750)) errs.push(label + ': script length ' + words(text) + ' words (450–750; TTS-only section)');
      checkEvidence(s.script, expected, label, errs);
    });
  }

  // listening clips (real audio; 6–10 questions numbered from 1)
  for (const c of pack.listeningClips || []) {
    claim(c.id, 'clip');
    const label = fileId + ' ' + c.id;
    for (const k of ['title', 'source', 'context', 'audio']) if (!c[k]) errs.push(label + ': missing ' + k);
    if (!['easy', 'medium', 'hard'].includes(c.level)) errs.push(label + ': level must be medium|hard (or easy)');
    if (!TOPICS.has(c.topic)) errs.push(label + ': topic must be one of SPEC §6.6');
    if (!/^\d{1,3}:\d{2}$/.test(c.duration || '')) errs.push(label + ': duration must be "m:ss"');
    if (c.sourceUrl && !/^https:\/\//.test(c.sourceUrl)) errs.push(label + ': sourceUrl must be https');
    if (!Array.isArray(c.transcript) || !c.transcript.length || c.transcript.some(l => !l || !l.text)) { errs.push(label + ': transcript lines need text'); continue; }
    let n = 0;
    try { n = (c.groups || []).flatMap(g => own(exam.groupNumbers(g))).length; } catch (e) { /* reported by checkGroups */ }
    if (n < 6 || n > 10) errs.push(label + ': needs 6–10 questions (has ' + n + ')');
    const expected = Array.from({ length: Math.max(n, 1) }, (_, k) => k + 1);
    checkGroups(exam, c.groups, expected, label, LISTENING_TYPES, errs);
    checkEvidence(c.transcript, expected, label, errs);
  }

  // reading tests (3 passages, 1–13 / 14–26 / 27–40)
  for (const t of pack.readingTests || []) {
    claim(t.id, 'reading test');
    const parts = t.passages || [];
    if (parts.length !== 3) { err(t.id + ' must have 3 passages'); continue; }
    const ranges = [[1, 13], [14, 26], [27, 40]];
    parts.forEach((p, i) => {
      claim(p.id, 'passage');
      const label = fileId + ' ' + p.id;
      if (p.part !== i + 1) errs.push(label + ': part must be ' + (i + 1));
      if (!TOPICS.has(p.topic)) errs.push(label + ': topic must be one of SPEC §6.6');
      const [a, b] = ranges[i];
      checkGroups(exam, p.groups, Array.from({ length: b - a + 1 }, (_, k) => a + k), label, READING_TYPES, errs);
      const text = (p.paragraphs || []).map(x => x.text).join(' ');
      if (words(text) < 750 || words(text) > 950) errs.push(label + ': passage length ' + words(text) + ' words (750–950)');
      if (!Array.isArray(p.vocab) || p.vocab.length < 14) errs.push(label + ': needs ≥ 14 vocab words');
      for (const w of p.vocab || []) {
        if (!text.toLowerCase().includes(String(w.word || '').toLowerCase())) errs.push(label + ': vocab "' + w.word + '" not in passage');
        if (!(w.ipa && w.pos && w.vi && w.example)) errs.push(label + ': incomplete vocab ' + w.word);
      }
    });
    const types = new Set(parts.flatMap(p => (p.groups || []).map(g => g.type)));
    if (types.size < 8) err(t.id + ' must cover ≥ 8 question types');
  }

  for (const d of pack.dictation || []) {
    claim(d.id, 'dictation');
    if (!d.title || !['easy', 'medium', 'hard'].includes(d.level)) err(d.id + ' needs title and level easy|medium|hard');
    if (!TOPICS.has(d.topic)) err(d.id + ' topic must be one of SPEC §6.6');
    if (!Array.isArray(d.sentences) || d.sentences.length < 8 || d.sentences.length > 15) err(d.id + ' needs 8–15 sentences');
  }
  for (const w of pack.vocabWords || []) {
    claim(w.id, 'word');
    if (w.id !== wordId(w.word)) err('word "' + w.word + '" id must be "' + wordId(w.word) + '"');
    if (!(w.ipa && w.pos && w.band && w.vi && w.example)) err('word "' + w.word + '" needs ipa, pos, band, vi, example');
    if (w.topic && !TOPICS.has(w.topic)) err('word "' + w.word + '" topic must be one of SPEC §6.6');
  }
  return errs;
}

/** Loads + validates every pack in dir against built-in data. Returns { packs:[{file,id,pack,bytes,sha256}], errors, warnings }. */
export function loadAndValidatePacks(dir, app, opts = {}) {
  const taken = builtinIds(app.data);
  const packs = [], errors = [], warnings = [];
  for (const file of listPackFiles(dir)) {
    const fileId = path.basename(file, '.js');
    let pack;
    try { pack = loadPackFile(file); } catch (e) { errors.push(fileId + ': ' + e.message); continue; }
    const errs = validatePack(pack, { exam: app.exam, fileId, taken, assetDir: opts.assetDir });
    if (pack && SEMVER.test(pack.minAppVersion || '') && semverCmp(pack.minAppVersion, app.version) > 0) {
      warnings.push(fileId + ': minAppVersion ' + pack.minAppVersion + ' is newer than app/version.js ' + app.version + ' — installed apps skip it until they update');
    }
    errors.push(...errs);
    const bytes = normalizedBytes(file);
    packs.push({ file, id: fileId, pack, bytes, sha256: sha256(bytes) });
  }
  return { packs, errors, warnings };
}
