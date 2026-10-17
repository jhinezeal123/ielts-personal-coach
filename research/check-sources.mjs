// Check catalogue links without downloading or copying test content.
// Usage: node research/check-sources.mjs
import fs from 'node:fs';

const catalogUrl = new URL('./ielts-sources.json', import.meta.url);
const catalog = JSON.parse(fs.readFileSync(catalogUrl, 'utf8'));
const ids = new Set();
for (const source of catalog.sources) {
  if (ids.has(source.id)) throw new Error(`Duplicate source id: ${source.id}`);
  ids.add(source.id);
  if (!source.name || !source.skills.length) throw new Error(`Incomplete source: ${source.id}`);
}
const urls = [...new Set(catalog.sources.flatMap(s => [s.url, ...s.resources.map(r => r.url)]))];
for (const value of urls) {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:') throw new Error(`Expected HTTPS: ${value}`);
}
const results = [];
let next = 0;
async function worker() {
  while (next < urls.length) {
    const url = urls[next++];
    let response;
    try {
      response = await fetch(url, {
        signal: AbortSignal.timeout(10000),
        redirect: 'follow',
        headers: { 'User-Agent': 'IELTS-Coach-Source-Link-Check/1.0' }
      });
      results.push({ url, status: response.status, finalUrl: response.url,
        contentType: response.headers.get('content-type'),
        result: response.ok ? 'http-ok' : [401, 403, 429].includes(response.status) ? 'access-restricted' : 'http-error' });
    } catch (error) {
      results.push({ url, status: null, result: 'request-failed', error: error.name });
    } finally {
      if (response?.body) await response.body.cancel().catch(() => {});
    }
    if (results.length % 20 === 0) process.stdout.write(`Checked ${results.length}/${urls.length}\n`);
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
results.sort((a, b) => a.url.localeCompare(b.url));
const summary = results.reduce((out, item) => {
  out[item.result] = (out[item.result] || 0) + 1;
  return out;
}, {});
const audit = {
  checkedAt: new Date().toISOString(),
  catalogueDate: catalog.checkedOn,
  meaning: 'An HTTP availability check only. A failed automated request does not prove a site is down; HTTP 200 does not validate question quality or permissions.',
  summary, results
};
fs.writeFileSync(new URL('./ielts-link-audit.json', import.meta.url), JSON.stringify(audit, null, 2) + '\n');
process.stdout.write(JSON.stringify({ sources: ids.size, urls: urls.length, summary }) + '\n');
