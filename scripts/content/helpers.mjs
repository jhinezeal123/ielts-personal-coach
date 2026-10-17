// Build-time helpers only. The shipped app receives ordinary static question objects.
export const quoteExplanation = (part, quote, why = '') => {
  const paragraphs = part.paragraphs || part.script?.map((line,index)=>({label:String(index+1),text:line.text}));
  const found = paragraphs.find(p=>p.text.toLowerCase().includes(quote.toLowerCase()));
  if (!found) throw new Error(part.id + ': missing evidence: ' + quote);
  return (part.paragraphs ? 'Đoạn ' : 'Transcript dòng ') + found.label + ': “' + quote + '”.' + (why ? ' ' + why : '');
};
export function gaps(part, type, rows, title = '', limit = 'NO MORE THAN TWO WORDS AND/OR A NUMBER') {
  const answers = {}, explain = {};
  for (const [n, prompt, answer, quote, variants = []] of rows) {
    answers[n] = [answer, ...variants];
    explain[n] = quoteExplanation(part, quote || answer);
    const allText = (part.paragraphs || part.script).map(p=>p.text).join(' ').toLowerCase();
    if (!allText.includes(answer.toLowerCase())) throw new Error(part.id + ': absent gap answer ' + answer);
  }
  const labels={short:'answers',note:'notes',form:'form',table:'table',flow:'flow-chart',summary:'summary',sentence:'sentences'};
  return {type,kind:'gap',range:[rows[0][0],rows.at(-1)[0]],instruction:'Complete the '+(labels[type]||'notes')+'. Write <b>'+limit+'</b> for each answer.',title,wordLimit:limit,
    content:rows.map(([n,prompt])=>'<p>'+prompt.replace('___','{{'+n+'}}')+'</p>').join(''),answers,explain};
}
export function truth(part, type, first, rows) {
  const names = type === 'tfng' ? {T:'TRUE',F:'FALSE',N:'NOT GIVEN'} : {T:'YES',F:'NO',N:'NOT GIVEN'};
  return {type,kind:'tfng',variant:type,range:[first,first+rows.length-1],
    instruction:type==='tfng'?'Do the statements agree with the information in the passage? Write <b>TRUE, FALSE or NOT GIVEN</b>.':'Do the statements agree with the writer’s views? Write <b>YES, NO or NOT GIVEN</b>.',
    questions:rows.map(([text,key,evidence,why],i)=>({n:first+i,text,answer:names[key],
      explain:key==='N'?why:quoteExplanation(part,evidence,why)}))};
}
export function matches(part, type, first, options, rows, instruction, allowReuse=false) {
  return {type,kind:'match',range:[first,first+rows.length-1],instruction,allowReuse,
    options:options.map(([key,text])=>({key,text})),
    questions:rows.map(([text,answer,quote,why],i)=>({n:first+i,text,answer,explain:quoteExplanation(part,quote,why)}))};
}
export function choices(part, first, rows) {
  return {type:'mcq',kind:'mcq',range:[first,first+rows.length-1],instruction:'Choose the correct letter, <b>A, B or C</b>.',
    questions:rows.map(([text,opts,answer,quote,why],i)=>({n:first+i,text,options:opts.map((s,j)=>'ABC'[j]+' '+s),answer,explain:quoteExplanation(part,quote,why)}))};
}
export function multi(part, first, text, opts, answer, quote, why='') {
  return {type:'mcq-multi',kind:'multi',range:[first,first+1],instruction:'Choose <b>TWO</b> letters.',
    questions:[{ns:[first,first+1],text,options:opts.map((s,i)=>'ABCDE'[i]+' '+s),answer,explain:quoteExplanation(part,quote,why)}]};
}
export const paragraphOptions = 'ABCDEFGH'.split('').map(key=>[key,'Paragraph '+key]);
