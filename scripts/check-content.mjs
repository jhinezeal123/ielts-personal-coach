// Validate the added practice pack against the real exam grader and loaded app data.
// Run from the project root: node scripts/check-content.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync('app/index.html', 'utf8');
const files = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
for (const file of files) assert(fs.existsSync('app/' + file), 'Missing script: ' + file);
const data = { readingTests: [], listeningTests: [], dictation: [], vocab: { words: [] } };
const context = { window: { IELTS: { data } }, console };
vm.createContext(context);
for (const file of files.filter(f => f.startsWith('data/')).concat('js/exam.js')) {
  vm.runInContext(fs.readFileSync('app/' + file, 'utf8'), context, { filename: file });
}
const exam = context.window.IELTS.exam;
const words = text => text.trim().split(/\s+/).filter(Boolean).length;
const own = value => JSON.parse(JSON.stringify(value));
const unique = (items, label) => assert.equal(new Set(items.map(x => x.id)).size, items.length, 'Duplicate ' + label);
const answersFor = groups => {
  const answers = {};
  for (const g of groups) {
    if (g.kind === 'gap') for (const [n, variants] of Object.entries(g.answers)) answers[n] = variants[0];
    else for (const q of g.questions) {
      if (g.kind === 'multi') q.ns.forEach((n, index) => { answers[n] = q.answer[index]; });
      else answers[q.n] = q.answer;
    }
  }
  return answers;
};
const expectedCounts = { reading: 12, listening: 12, task1: 42, task2: 55, speaking: 30, dictation: 24 };
const counts = { reading: data.readingTests.length, listening: data.listeningTests.length,
  task1: data.writing.task1Prompts.length, task2: data.writing.task2Prompts.length,
  speaking: data.speaking.topics.length, dictation: data.dictation.length };
assert.deepEqual(counts, expectedCounts);
unique(data.readingTests.concat(data.listeningTests), 'test ids');
unique(data.writing.task1Prompts.concat(data.writing.task2Prompts), 'writing ids');
unique(data.speaking.topics, 'speaking ids');
unique(data.dictation, 'dictation ids');
const allParts=data.readingTests.flatMap(t=>t.passages).concat(data.listeningTests.flatMap(t=>t.sections));
unique(allParts,'passage/section ids');
const bodies=allParts.map(p=>(p.paragraphs||p.script).map(x=>x.text).join(' ').toLowerCase().replace(/\s+/g,' ').trim());
assert.equal(new Set(bodies).size,bodies.length,'Duplicate passage or listening script');
const readingTypes = new Set('tfng ynng headings info features endings mcq mcq-multi sentence summary note diagram short'.split(' '));
const listeningTypes = new Set('form note table flow summary sentence mcq mcq-multi matching map diagram short'.split(' '));
const reports = [];
for (const [skill, tests] of [['reading', data.readingTests], ['listening', data.listeningTests]]) {
  for (const test of tests.filter(t => Number(t.id.slice(1)) >= 3)) {
    const parts = test.passages || test.sections;
    assert.equal(parts.length, skill === 'reading' ? 3 : 4);
    const groups = parts.flatMap(p => p.groups);
    const numbers = groups.flatMap(g => own(exam.groupNumbers(g)));
    assert.deepEqual([...numbers].sort((a,b) => a-b), Array.from({length:40}, (_,i) => i+1), test.id + ' numbering');
    assert.equal(new Set(numbers).size, 40);
    for (const g of groups) {
      assert((skill === 'reading' ? readingTypes : listeningTypes).has(g.type), test.id + ' unknown type ' + g.type);
      if (g.kind === 'gap') for (const n of exam.groupNumbers(g)) {
        assert(g.content.includes('{{' + n + '}}'), test.id + ' missing blank ' + n);
        assert(g.explain[n], test.id + ' missing explanation ' + n);
        for (const variant of g.answers[n]) assert(exam.withinLimit(variant, g.wordLimit), test.id + ' answer exceeds word limit: ' + variant);
      } else for (const q of g.questions) {
        assert(q.explain, test.id + ' missing question explanation');
        if(g.kind==='match')assert(g.options.some(o=>o.key===q.answer),test.id+' invalid matching option');
        if(g.kind==='mcq')assert(q.options.some(o=>o.startsWith(q.answer+' ')),test.id+' invalid MCQ answer');
        if(g.kind==='multi')assert(q.answer.every(a=>q.options.some(o=>o.startsWith(a+' '))),test.id+' invalid multiple answer');
      }
      assert(!/undefined|NaN/.test(exam.renderGroups([g], {})), test.id + ' render artefact');
    }
    const correct = answersFor(groups);
    const result = exam.summarize(exam.gradeGroups(groups, correct));
    assert.equal(result.raw, 40, test.id + ' gold answers');
    for(const group of groups.filter(g=>g.kind==='gap'))for(const [n,variants]of Object.entries(group.answers))for(const variant of variants){
      assert.equal(exam.summarize(exam.gradeGroups(groups,{...correct,[n]:variant})).raw,40,test.id+' rejected answer variant '+variant);
    }
    assert.equal(exam.summarize(exam.gradeGroups(groups, {})).raw, 0, test.id + ' blanks');
    const incorrect = { ...correct, 1: '__incorrect__' };
    assert.equal(exam.summarize(exam.gradeGroups(groups, incorrect)).raw, 39, test.id + ' single wrong answer');
    for (const g of groups.filter(g => g.kind === 'multi')) for (const q of g.questions) {
      const reverse = { ...correct };
      q.ns.forEach((n,index) => { reverse[n] = q.answer[q.answer.length-1-index]; });
      assert.equal(exam.summarize(exam.gradeGroups(groups, reverse)).raw, 40, test.id + ' unordered multi');
    }
    for (const [index, part] of parts.entries()) {
      assert.equal(part.part, index + 1);
      const partNumbers = part.groups.flatMap(g => own(exam.groupNumbers(g)));
      const start = skill === 'listening' ? index*10+1 : index === 0 ? 1 : index === 1 ? 14 : 27;
      const end = skill === 'listening' ? start+9 : index === 0 ? 13 : index === 1 ? 26 : 40;
      assert.deepEqual([...partNumbers].sort((a,b)=>a-b), Array.from({length:end-start+1},(_,i)=>start+i), part.id);
      if (skill === 'reading') {
        const text = part.paragraphs.map(p => p.text).join(' ');
        assert(words(text) >= 750 && words(text) <= 950, part.id + ' passage length');
        assert(part.vocab.length >= 14);
        assert(part.provenance?.note);
        for (const word of part.vocab) {
          assert(text.toLowerCase().includes(word.word.toLowerCase()), part.id + ' missing vocabulary ' + word.word);
          assert(word.ipa && word.pos && word.vi && word.example, part.id + ' incomplete vocabulary ' + word.word);
          if(Number(test.id.slice(1))>=5)assert(text.includes(word.example),part.id+' vocabulary example must be from passage');
        }
      } else {
        const text = part.script.map(line => line.text).join(' ');
        assert(words(text) >= 450 && words(text) <= 750, part.id + ' script length');
        const tagged = new Set(part.script.flatMap(line => line.q || []));
        assert(partNumbers.every(n=>tagged.has(n)), part.id + ' missing transcript evidence tag');
        assert([...tagged].every(n=>partNumbers.includes(n)), part.id + ' invalid evidence tag');
      }
    }
    if (skill === 'reading') assert(new Set(groups.map(g=>g.type)).size >= 8);
    reports.push({test:test.id, questions:40, goldScore:result.raw});
  }
}
function checkChart(chart) {
  if (chart.kind === 'mixed') return chart.charts.forEach(checkChart);
  if (chart.kind === 'line' || chart.kind === 'bar') {
    const labels = chart.xLabels || chart.categories;
    for (const series of chart.series) {
      assert.equal(series.values.length, labels.length);
      assert(series.values.every(v=>typeof v==='number' && Number.isFinite(v) && v>=0));
    }
  } else if (chart.kind === 'pie') for (const pie of chart.pies) assert.equal(pie.slices.reduce((n,s)=>n+s.value,0),100);
  else if (chart.kind === 'table') for (const row of chart.rows) assert.equal(row.length, chart.headers.length);
  else if (chart.kind === 'map') for (const map of chart.maps) for (const f of map.features) assert(f.x>=0 && f.y>=0 && f.x+f.w<=100 && f.y+f.h<=70);
  else if (chart.kind === 'process') assert(chart.steps.length>=5);
  else assert.fail('Unknown chart: '+chart.kind);
}
for (const p of data.writing.task1Prompts.filter(p=>p.id.includes('-extra-'))) checkChart(p.chart);
for (const p of data.writing.task2Prompts.filter(p=>p.id.includes('-extra-'))) {
  assert(Object.keys(p.ideas).length===2 && Object.values(p.ideas).every(a=>a.length>=3));
  assert(p.collocations.length>=5 && p.source);
}
const plain = text => text.replace(/\[\[([^|]+)\|[^\]]+\]\]/g, '$1');
for (const topic of data.speaking.topics.filter(t=>Number(t.id.slice(3))>=21)) {
  assert.equal(topic.part1.questions.length,4);
  assert.equal(topic.part3.length,3);
  assert(words(plain(topic.part2.sample))>=250 && words(plain(topic.part2.sample))<=320, topic.id+' Part 2 length');
  for (const text of [...topic.part1.questions.map(q=>q.sample),topic.part2.sample,...topic.part3.map(q=>q.sample)]) {
    const markers = [...text.matchAll(/\[\[([^|]+)\|([^\]]+)\]\]/g)];
    assert(markers.length>=3 && markers.length<=7,topic.id+' phrase markers');
    assert(!/\[\[|\]\]/.test(plain(text)),topic.id+' malformed phrase');
  }
}
for (const lesson of data.dictation.filter(l=>Number(l.id.slice(1))>=13)) assert(lesson.sentences.length>=8 && lesson.sentences.length<=15);
console.log(JSON.stringify({counts, tests:reports, checkedQuestions:reports.length*40,
  latestAddedQuestions:reports.filter(t=>Number(t.test.slice(1))>=5).length*40,status:'passed'}, null, 2));
