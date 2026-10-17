// Builds content/manifest.json from content/packs/*.js (content channel — content/CONTRACT.md, SPEC §11).
// Validates every pack (id == file name, unique IDs across packs and built-in app/data, asset references, semver,
// same content rules as built-in data), hashes each pack (LF-normalised, i.e. exactly what raw.githubusercontent.com
// serves) and bumps contentVersion only when the pack list changed. Never hand-edit manifest.json.
//
//   node scripts/build-content-manifest.mjs [--packs <dir>] [--out <manifest.json>] [--check]
//   --check   validate + report whether the manifest is current, write nothing (exit 1 if stale or invalid)
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadApp, loadAndValidatePacks } from './content-pack-lib.mjs';

const args = process.argv.slice(2);
const opt = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const packsDir = path.resolve(opt('--packs') || path.join(ROOT, 'content/packs'));
const outFile = path.resolve(opt('--out') || path.join(ROOT, 'content/manifest.json'));
const checkOnly = args.includes('--check');

const app = loadApp(ROOT);
const { packs, errors, warnings } = loadAndValidatePacks(packsDir, app);
for (const w of warnings) console.warn('warning: ' + w);
if (errors.length) {
  console.error('Content packs are invalid (' + errors.length + ' problem' + (errors.length > 1 ? 's' : '') + '):');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}

const entries = packs.map(({ id, pack, sha256 }) => ({
  id, file: 'packs/' + id + '.js', version: pack.version, minAppVersion: pack.minAppVersion, title: pack.title, sha256,
  assets: (pack.assets || []).map(a => ({ file: a.file, url: a.url }))
})).sort((a, b) => a.id.localeCompare(b.id));

let previous = null;
if (fs.existsSync(outFile)) {
  try { previous = JSON.parse(fs.readFileSync(outFile, 'utf8')); } catch (e) { console.warn('warning: existing manifest is not valid JSON — it will be regenerated'); }
}
const prevPacks = previous && Array.isArray(previous.packs) ? previous.packs : [];
const changed = !previous || previous.schema !== 1 || JSON.stringify(prevPacks) !== JSON.stringify(entries);
const prevVersion = previous && Number.isInteger(previous.contentVersion) ? previous.contentVersion : 0;
const manifest = changed
  ? { schema: 1, contentVersion: prevVersion + (previous || entries.length ? 1 : 0), generatedAt: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'), packs: entries }
  : previous;

const summary = { packs: entries.length, contentVersion: manifest.contentVersion, changed, manifest: path.relative(ROOT, outFile) || outFile };
if (checkOnly) {
  console.log(JSON.stringify({ ...summary, status: changed ? 'stale — run node scripts/build-content-manifest.mjs' : 'current' }, null, 2));
  process.exit(changed ? 1 : 0);
}
if (changed) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2) + '\n');
}
console.log(JSON.stringify({ ...summary, status: changed ? 'written' : 'unchanged' }, null, 2));
