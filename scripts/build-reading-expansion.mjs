import fs from 'node:fs';
import vm from 'node:vm';
import {originals} from './content/reading-original.mjs';
import {sourceQuestions} from './content/reading-source-questions.mjs';
import {originalQuestions} from './content/reading-original-questions.mjs';
import {extraVocabulary} from './content/reading-vocabulary.mjs';

const ctx={window:{IELTS:{data:{readingTests:[],vocab:{words:[]}}}}};
vm.createContext(ctx);
for(const path of ['vocab-bank','reading-1','reading-2','reading-3','reading-4']) vm.runInContext(fs.readFileSync('app/data/'+path+'.js','utf8'),ctx);
const oldData=ctx.window.IELTS.data;
const dictionary=[...extraVocabulary,...oldData.vocab.words,...oldData.readingTests.flatMap(t=>t.passages.flatMap(p=>p.vocab))];
const texts=JSON.parse(fs.readFileSync('research/reading-expansion-texts.json','utf8'));
const titles=['Planets, Light & Public Space','Venus, Manufacture & Working Time','Mars, Inquiry & Learning',
  'Jupiter, Glaciers & Museum Copies','Saturn, Industry & Food Labels','The Moon, Literature & Waiting',
  'Exoplanets, Craft & Digital Memory','Stars, Island Wildlife & Transport'];
const report=[];
const tests=titles.map((title,i)=>{
  const id='R'+(i+5);
  const original=originals.find(p=>p.id===id+'-P3');
  const third={...original,part:3,paragraphs:original.paragraphs.map((text,i)=>({label:'ABCDEFGH'[i],text})),
    provenance:{kind:'original',note:'Bài luận nguyên bản cho luyện đọc IELTS. Các địa danh, tổ chức và dự án nêu trong ví dụ là tình huống minh họa hư cấu; không phải báo cáo nghiên cứu thực tế hay đề thi chính thức.'}};
  const passages=[texts.find(p=>p.id===id+'-P1'),texts.find(p=>p.id===id+'-P2'),third].map(p=>{
    const start=p.part===1?1:p.part===2?14:27,end=p.part===1?13:p.part===2?26:40;
    p.intro=`You should spend about 20 minutes on Questions ${start}–${end}, which are based on Reading Passage ${p.part} below.`;
    p.groups=p.part===3?originalQuestions[p.id](p):sourceQuestions(p);
    const whole=p.paragraphs.map(p=>p.text).join(' ');
    const sentences=whole.split(/(?<=[.!?])\s+(?=[A-Z“])/);
    const seen=new Set();
    p.vocab=dictionary.filter(w=>{
      if(seen.has(w.word.toLowerCase())) return false;
      const re=new RegExp('\\b'+w.word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?:s|es|d|ed|ing)?\\b','i');
      if(!re.test(whole)) return false;
      seen.add(w.word.toLowerCase());return true;
    }).slice(0,14).map(w=>({...w,id:w.word.toLowerCase().replace(/[^a-z0-9 -]/g,'').replace(/\s+/g,'-'),topic:p.topic,
      example:sentences.find(s=>s.toLowerCase().includes(w.word.toLowerCase())) || w.example}));
    report.push({id:p.id,words:whole.split(/\s+/).length,vocab:p.vocab.length});
    return p;
  });
  return {id,title:'Practice Test '+(i+5)+' — '+title,source:'Bài luyện biên soạn · văn bản có ghi nguồn · không phải đề thi thật',passages};
});
fs.writeFileSync('app/data/reading-expansion.js','/* 8 additional full tests; frozen content, no network required. Rebuild: node scripts/build-reading-expansion.mjs */\n(function(){"use strict";\nvar tests = '+JSON.stringify(tests,null,2)+';\ntests.forEach(function(test){window.IELTS.data.readingTests.push(test);});\n})();\n');
console.log(JSON.stringify(report,null,2));
