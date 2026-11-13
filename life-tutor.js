/* Immersive Yoruba tutor: real AI when configured, honest guided fallback. */
(()=>{
const $=id=>document.getElementById(id);
const lessons=[
{scene:'🏠 Ilé',context:'home family conversation',npc:'Báwo ni?',hint:'How are you?',answers:[['Mo wà dáadáa.','I am fine.'],['Ó rẹ̀ mí.','I am tired.']]},
{scene:'🛒 Ọjà',context:'buying food in a Yoruba market',npc:'Kí ni o fẹ́ rà?',hint:'What do you want to buy?',answers:[['Mo fẹ́ rà omi.','I want to buy water.'],['Mo fẹ́ rà ìrẹsì.','I want to buy rice.']]},
{scene:'🏫 Ilé ẹ̀kọ́',context:'Yoruba teacher talking to student',npc:'Kí ni orúkọ rẹ?',hint:'What is your name?',answers:[['Orúkọ mi ni Tádé.','My name is Tade.'],['Orúkọ mi ni Bísí.','My name is Bisi.']]},
{scene:'🏘️ Adúgbò',context:'asking for directions',npc:'Ibo ni o fẹ́ lọ?',hint:'Where do you want to go?',answers:[['Mo fẹ́ lọ sí ọjà.','I want to go to the market.'],['Mo fẹ́ lọ sí ilé.','I want to go home.']]}
];
const key='ya_immersion_v1';
let s;try{s=JSON.parse(localStorage.getItem(key))}catch{};if(!s||typeof s!=='object')s={scene:0,correct:0,attempts:0,history:[],weak:[],english:true};
let busy=false;
function save(){localStorage.setItem(key,JSON.stringify(s))}
function node(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e}
function button(text,fn){const b=node('button',text,'secondary');b.type='button';b.onclick=fn;return b}
function norm(t){return String(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[ẹọṣ]/g,c=>({ẹ:'e',ọ:'o',ṣ:'s'}[c])).replace(/[^a-z\s]/g,'').replace(/\s+/g,' ').trim()}
function level(){const rate=s.attempts?s.correct/s.attempts:0;return s.correct>=45&&rate>=.8?'B1':s.correct>=20&&rate>=.7?'A2':'A1'}
function play(t){if(typeof speak==='function')speak(t)}
function startSpeech(input,status){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){status.textContent='Ìmọ̀ ohùn kò sí nínú aṣàwákiri yìí. Kọ ìdáhùn rẹ. (Speech recognition unavailable; type instead.)';return}
 const r=new SR();r.lang='yo-NG';r.interimResults=false;
 status.textContent='🎙️ Sọ̀rọ̀ báyìí…';
 r.onresult=e=>{input.value=e.results[0][0].transcript;status.textContent='A gbọ́: '+input.value+' · Ṣàyẹ̀wò kí o tó fi ránṣẹ́.'};
 r.onerror=e=>{status.textContent='Ìmọ̀ ohùn kò ṣiṣẹ́: '+e.error+'. O lè kọ ọ̀rọ̀ náà.'};
 try{r.start()}catch{status.textContent='A kò lè bẹ̀rẹ̀ gbohungbohun.'}
}
async function submit(message,status,log){
 const text=message.trim();if(!text||busy)return;
 busy=true;const lesson=lessons[s.scene%lessons.length];
 s.attempts++;const correct=lesson.answers.some(([yo])=>norm(yo)===norm(text));
 if(correct){s.correct++;s.weak=s.weak.filter(x=>x!==lesson.npc)}
 else if(!s.weak.includes(lesson.npc))s.weak.push(lesson.npc);
 s.history.push({role:'user',content:text});s.history=s.history.slice(-10);
 status.textContent=correct?'✓ Ọ̀rọ̀ náà bá àpẹẹrẹ mu. A kò tíì ṣàyẹ̀wò ìró ohùn.':'📚 Ṣe àtúnyẹ̀wò. Àpẹẹrẹ: '+lesson.answers[0][0];
 save();renderLog(log);
 const msgHistory=s.history.slice(0,-1);
 try{
  const r=await fetch('/api/yoruba-tutor',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,history:msgHistory,level:level(),context:lesson.context})});
  if(!r.ok)throw Error('not configured');
  const data=await r.json();if(typeof data.reply!=='string')throw Error('bad response');
  s.history.push({role:'assistant',content:data.reply});status.textContent+=' · 🤖 Olùkọ́ AI dáhùn.';save();
 }catch{
  const reply=correct?'Ó dára! Ẹ ṣé.':'Ẹ gbìyànjú lẹ́ẹ̀kan sí i. '+lesson.answers[0][0];
  s.history.push({role:'assistant',content:reply});
  status.textContent+=' · Ẹ̀kọ́ ìtọ́sọ́nà nìkan: AI kò tíì sopọ̀. (Guided practice; AI unavailable.)';save()
 }
 busy=false;render();
}
function renderLog(area){
 area.replaceChildren();
 s.history.slice(-8).forEach(x=>{const p=node('p',(x.role==='user'?'🧑 ':'👩🏾‍🏫 ')+x.content,'life-dialogue-line');area.append(p)})
}
function render(){
 const root=$('lifeTutor');if(!root)return;root.replaceChildren();
 const l=lessons[s.scene%lessons.length];
 root.append(node('h3','👩🏾‍🏫 Olùkọ́ Yorùbá · Ìrìbọmi nínú èdè'),node('p','Ipele: '+level()+' · Ìdáhùn àpẹẹrẹ tó tọ́: '+s.correct+'/'+s.attempts,'muted'));
 const scene=node('div',undefined,'life-tutor-scene');scene.append(node('h3',l.scene),node('p','🗣️ '+l.npc));
 scene.append(button('🔊 Gbọ́',()=>play(l.npc)));
 if(s.english)scene.append(node('p',l.hint,'muted'));
 root.append(scene);
 const controls=node('div',undefined,'life-tutor-controls');
 controls.append(button(s.english?'🌐 Pa ìtúmọ̀':'🌐 Ṣí ìtúmọ̀',()=>{s.english=!s.english;save();render()}));
 controls.append(button('➡️ Ibi tó kàn',()=>{s.scene=(s.scene+1)%lessons.length;s.history=[];save();render()}));
 root.append(controls);
 const form=node('form');const input=node('textarea');input.placeholder='Kọ ìdáhùn rẹ ní Yorùbá…';input.rows=2;input.setAttribute('aria-label','Ìdáhùn Yorùbá');form.append(input);
 const status=node('p','','muted');
 const mic=button('🎙️ Sọ̀rọ̀',()=>startSpeech(input,status));const send=node('button','📨 Fi ránṣẹ́','life-primary');send.type='submit';form.append(mic,send);
 const log=node('div',undefined,'life-dialogue');form.onsubmit=e=>{e.preventDefault();submit(input.value,status,log)};
 root.append(form,status,log);
 if(s.english){const tips=node('div',undefined,'life-tutor-tips');tips.append(node('strong','Àwọn àpẹẹrẹ / Examples'));l.answers.forEach(([yo,en])=>tips.append(node('p',yo+' — '+en)));root.append(tips)}
 if(s.weak.length){const review=node('div',undefined,'life-tutor-tips');review.append(node('h4','🔁 Àtúnyẹ̀wò / Review'));s.weak.slice(-4).forEach(x=>review.append(node('p',x)));root.append(review)}
 root.append(node('p','Àwọn ìdánwò ọrọ̀ yìí kì í ṣe ìdánwò ìró ohùn. Ìmọ̀ ohùn aṣàwákiri lè má ṣiṣẹ́ fún Yorùbá.','muted'));
 renderLog(log)
}
window.lifeTutorInit=render;
})();
