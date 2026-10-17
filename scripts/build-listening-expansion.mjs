import fs from 'node:fs';
import assert from 'node:assert/strict';
import {part1} from './content/listening-part1.mjs';
import {part2} from './content/listening-part2.mjs';
import {part3} from './content/listening-part3.mjs';
import {part4} from './content/listening-part4.mjs';
import {gaps,matches,choices,multi} from './content/helpers.mjs';

const mapSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 480" role="img" aria-label="Site plan: entrance at the south, seven lettered positions linked by paths">'+
  '<rect x="10" y="10" width="600" height="460" rx="16" fill="#f3f6ed" stroke="#69785d"/>'+
  '<path d="M310 430V95M140 350H480M140 245H480M140 95H480" stroke="#d5c5a3" stroke-width="22" fill="none"/>'+
  '<text x="310" y="458" text-anchor="middle" font-size="20" fill="#263429">ENTRANCE</text>'+
  '<path d="M565 85V35l-9 14m9-14 9 14" fill="none" stroke="#263429" stroke-width="3"/>'+
  '<text x="565" y="108" text-anchor="middle" font-size="19" fill="#263429">N</text>'+
  [['A',140,350],['B',480,350],['C',140,245],['D',480,245],['E',310,170],['F',140,95],['G',480,95]].map(([l,x,y])=>
    `<rect x="${x-36}" y="${y-27}" width="72" height="54" rx="8" fill="#fff" stroke="#526849" stroke-width="2"/><text x="${x}" y="${y+8}" text-anchor="middle" font-size="27" fill="#263429">${l}</text>`).join('')+'</svg>';
const titles=['Outdoor Visits & Seed Collections','Housing, Libraries & Design','Courses, Science & Oral History',
  'Travel, Nature & Urban Climate','Volunteering, Access & Archaeology','Camping, Sport & Communication',
  'Animal Care, Recycling & Fieldwork','Photography, Theatre & Learning'];
function section(record,part) {
  const speakerNames=[];
  const script=record.lines.map(line=>{
    const [speaker,text]=Array.isArray(line)?line:['Speaker',line];
    if(!speakerNames.includes(speaker))speakerNames.push(speaker);
    return {speaker,voice:['f','m','f2','m2'][speakerNames.indexOf(speaker)],text,q:[]};
  });
  const s={id:'L'+record.test+'-S'+part,part,title:record.title,context:record.context,audio:null,script};
  if(record.references)s.references=record.references;
  if(part===1)s.groups=[gaps(s,'form',record.form.map((row,i)=>[i+1,...row]),'Booking and enquiry notes')];
  if(part===2){
    const options=record.map?'ABCDEFG'.split('').map(k=>[k,'Position '+k]):record.places.map((text,i)=>['ABCDEF'[i],text]);
    const match=matches(s,record.map?'map':'matching',11,options,record.match,record.map?'Label the plan. Choose the correct letter, A–G.':'Match each description with the correct place. There are more options than questions.');
    if(record.map)match.image=mapSvg;
    s.groups=[match,choices(s,16,record.mcq),gaps(s,'sentence',record.short.map((row,i)=>[19+i,...row]))];
  }
  if(part===3)s.groups=[choices(s,21,record.mcq),matches(s,'matching',25,record.options.map((text,i)=>['ABCDE'[i],text]),record.match,
    'Match each item with the correct option. You may use a letter more than once.',true),multi(s,29,...record.multi)];
  if(part===4){
    const completion=gaps(s,record.completionType,record.completion.map((row,i)=>[36+i,...row]),record.completionType==='flow'?'Process overview':record.completionType==='table'?'Examples and requirements':'Complete the summary','NO MORE THAN TWO WORDS');
    if(record.completionType==='flow')completion.content='<ol>'+record.completion.map(([prompt],i)=>'<li>'+prompt.replace('___','{{'+(36+i)+'}}')+'</li>').join('')+'</ol>';
    if(record.completionType==='table')completion.content='<table><thead><tr><th>Item</th><th>Notes</th></tr></thead><tbody>'+record.completion.map(([prompt],i)=>'<tr><th>'+ (36+i) +'</th><td>'+prompt.replace('___','{{'+(36+i)+'}}')+'</td></tr>').join('')+'</tbody></table>';
    s.groups=[gaps(s,'note',record.notes.map((row,i)=>[31+i,...row]),'Lecture notes','NO MORE THAN TWO WORDS'),completion];
  }
  for(const group of s.groups){
    const evidence=group.kind==='gap'?Object.entries(group.explain).map(([n,explain])=>({ns:[Number(n)],explain})):
      group.questions.map(q=>({ns:q.ns||[q.n],explain:q.explain}));
    for(const row of evidence){
      const line=Number(row.explain.match(/Transcript dòng (\d+)/)?.[1])-1;
      assert(script[line],s.id+' missing evidence line');
      row.ns.forEach(n=>{if(!script[line].q.includes(n))script[line].q.push(n);});
    }
  }
  const words=script.map(l=>l.text).join(' ').trim().split(/\s+/).length;
  assert(words>=450&&words<=750,s.id+' script words: '+words);
  return s;
}
const tests=titles.map((title,i)=>({id:'L'+(i+5),title:'Practice Test '+(i+5)+' — '+title,
  source:'Biên soạn cho luyện tập · audio TTS · không phải đề thi thật',provenance:{kind:'original',addedOn:'2026-10-16'},
  sections:[part1,part2,part3,part4].map((records,j)=>section(records.find(r=>r.test===i+5),j+1))}));
fs.writeFileSync('app/data/listening-expansion.js','/* 8 additional full tests with original scripts. Rebuild: node scripts/build-listening-expansion.mjs */\n(function(){"use strict";\nvar tests = '+JSON.stringify(tests,null,2)+';\ntests.forEach(function(test){window.IELTS.data.listeningTests.push(test);});\n})();\n');
console.log(JSON.stringify(tests.map(t=>({id:t.id,parts:t.sections.map(s=>({id:s.id,words:s.script.map(l=>l.text).join(' ').split(/\s+/).length}))})),null,2));
