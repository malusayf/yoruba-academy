/* Ìrìnàjò Ayé — original Yoruba-language life simulator */
(()=>{
'use strict';
const KEY='ya_life_game_v1';
const $g=id=>document.getElementById(id);
const random=a=>a[Math.floor(Math.random()*a.length)];
const clamp=n=>Math.max(0,Math.min(100,n));
const money=n=>'₦'+Math.max(0,Math.round(n)).toLocaleString('en-NG');
const names=['Adé','Tádé','Bísí','Kẹ́mi','Túndé','Fúnmi','Sẹ́gun','Yẹmí','Dára','Bọ́lá'];
const jobs=[{name:'Olùkọ́',pay:35000,school:65},{name:'Oníṣòwò',pay:28000,school:30},{name:'Dókítà',pay:90000,school:90},{name:'Onímọ̀ ẹ̀rọ',pay:70000,school:80},{name:'Agbẹ̀',pay:22000,school:15},{name:'Olórin',pay:40000,school:40}];
const events=[
{min:5,max:17,story:'Ọ̀rẹ́ rẹ fẹ́ kí ẹ ṣeré pọ̀ lẹ́yìn ilé ẹ̀kọ́.',choices:[['Bẹ́ẹ̀ ni, ẹ jẹ́ ká ṣeré.',{joy:13,health:3,friends:8}],['Rárá, mo fẹ́ kàwé.',{school:9,joy:-5}]]},
{min:5,max:17,story:'Olùkọ́ rẹ fún ọ ní iṣẹ́ ilé tó ṣòro.',choices:[['Mo máa ṣe é.',{school:12,joy:-4}],['Mo máa béèrè fún ìrànlọ́wọ́.',{school:8,friends:4}],['Mi ò ní ṣe é.',{school:-12,joy:5}]]},
{min:5,max:17,story:'O rí owó ní ojú ọ̀nà. Kí ni o máa ṣe?',choices:[['Mo máa fi lé ọlọ́pàá lọ́wọ́.',{reputation:12,joy:3}],['Mo máa tọ́jú owó náà.',{cash:2000,reputation:-8}]]},
{min:12,max:80,story:'Ọ̀rẹ́ kan pè ọ sí ayẹyẹ.',choices:[['Mo máa lọ.',{joy:12,friends:8,cash:-1000}],['Mo máa dúró sílé.',{health:3,joy:-3}]]},
{min:18,max:80,story:'O ní àǹfààní láti kọ́ iṣẹ́ tuntun.',choices:[['Mo fẹ́ kọ́ ẹ̀kọ́.',{school:9,cash:-5000,joy:-2}],['Mo fẹ́ sinmi.',{joy:8}]]},
{min:18,max:80,story:'Ọ̀rẹ́ rẹ nílò ìrànlọ́wọ́.',choices:[['Mo máa ràn án lọ́wọ́.',{friends:12,cash:-3000,reputation:8}],['Mi ò lè ṣe é báyìí.',{friends:-6}]]},
{min:18,max:80,story:'Ìdílé rẹ fẹ́ kí o wá bẹ̀ wọ́n wò.',choices:[['Mo máa lọ.',{family:12,joy:7,cash:-2000}],['Mo ní iṣẹ́ púpọ̀.',{family:-8,school:2}]]},
{min:18,max:80,story:'O ní àǹfààní láti bẹ̀rẹ̀ òwò kékeré.',choices:[['Mo máa gbìyànjú.',{cash:-12000,reputation:5,school:4},'business'],['Mi ò tíì ṣetán.',{joy:2}]]},
{min:18,max:80,story:'O ṣàìsàn díẹ̀. Kí ni o máa ṣe?',choices:[['Mo máa lọ sí ilé ìwòsàn.',{cash:-4500,health:17}],['Mo máa sinmi sílé.',{health:5,joy:-4}]]},
{min:18,max:80,story:'Àwọn aládùúgbò ń wá ẹni tó lè ṣe iṣẹ́ àwùjọ.',choices:[['Mo máa darapọ̀.',{reputation:13,friends:6,joy:3}],['Mo máa ṣe nǹkan mìíràn.',{joy:3}]]},
{min:60,max:120,story:'O fẹ́ lo àkókò rẹ lọ́nà tó dára.',choices:[['Mo máa bá ìdílé mi sọ̀rọ̀.',{family:12,joy:6}],['Mo máa ṣe eré ìdárayá.',{health:10,joy:5}],['Mo máa ka ìwé.',{school:5,joy:4}]]}
];
let state=null;
function fresh(name){return {name:name||random(names),age:0,health:85,joy:80,school:30,family:80,friends:40,reputation:50,cash:0,job:null,business:false,partner:false,children:0,history:[],pending:null,alive:true,year:0,schoolYearDone:false,schoolPhase:'lesson',examAttempts:0,examResults:[],npcDone:false,helpEnglish:true};}
function load(){try{const v=JSON.parse(localStorage.getItem(KEY));return v&&typeof v.name==='string'&&Number.isFinite(v.age)?v:null}catch{return null}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n}
function btn(text,fn,cls='secondary'){const b=el('button',text,cls);b.type='button';b.onclick=fn;return b}
function addLog(text){state.history.unshift('Ọdún '+state.age+': '+text);state.history=state.history.slice(0,45)}
function apply(delta){for(const [k,v] of Object.entries(delta)){if(k==='cash')state.cash=Math.max(0,state.cash+v);else if(typeof state[k]==='number')state[k]=clamp(state[k]+v)}}
function choose(i){if(!state.pending||!state.alive)return;const c=state.pending.choices[i];apply(c[1]);if(c[2]==='business'){state.business=true;addLog('O bẹ̀rẹ̀ òwò kékeré.')}addLog(c[0]);state.pending=null;persist();render()}
function nextYear(){
 if(!state||!state.alive||state.pending)return;
 if(state.age>=6&&state.age<=17&&(!state.schoolYearDone||!state.npcDone)){alert('Parí ẹ̀kọ́, ìdánwò àti ìjíròrò kí o tó dàgbà.');return}
 state.schoolYearDone=false;state.npcDone=false;state.schoolPhase='lesson';
 state.age++;state.year++;
 if(state.age>=6&&state.age<=18)apply({school:2,joy:-1});
 if(state.age>=18){if(state.job){const j=jobs.find(j=>j.name===state.job);state.cash+=(j?.pay||20000)*12;addLog('O gba owó iṣẹ́: '+money((j?.pay||20000)*12)+'.')}if(state.business){const profit=Math.round((Math.random()*.9+.3)*50000);state.cash+=profit;addLog('Òwò rẹ mú '+money(profit)+' wá.')}state.cash=Math.max(0,state.cash-18000);apply({health:-2})}
 if(state.age>=55)apply({health:-Math.floor(Math.random()*5)});
 if(state.age>=75)apply({health:-Math.floor(Math.random()*8)});
 if(state.age===6)addLog('O bẹ̀rẹ̀ ilé ẹ̀kọ́.');
 if(state.age===18)addLog('O ti di àgbàlagbà. O lè ṣiṣẹ́.');
 if(state.age===60)addLog('O ti pé ọgọ́ta ọdún!');
 if(state.age>=105||state.health<=0){state.alive=false;state.pending=null;addLog('Ìrìnàjò ayé rẹ parí.');persist();render();return}
 const possible=events.filter(e=>state.age>=e.min&&state.age<=e.max);
 if(possible.length){const ev=random(possible);state.pending={story:ev.story,choices:ev.choices};}
 else{const childhood=['O ń dàgbà láàárín ìdílé rẹ.','Ìdílé rẹ ń tọ́jú rẹ.','O ń kọ́ bí a ṣe ń sọ̀rọ̀.'];addLog(random(childhood));apply({joy:2,family:1})}
 persist();render()
}
function activity(type){
 if(!state||!state.alive||state.pending)return;
 const actions={
 study:['O kàwé fún ìgbà díẹ̀.',{school:7,joy:-3}],
 exercise:['O ṣe eré ìdárayá.',{health:8,joy:3}],
 family:['O lo àkókò pẹ̀lú ìdílé.',{family:9,joy:4}],
 friends:['O bá àwọn ọ̀rẹ́ rẹ ṣeré.',{friends:9,joy:5}],
 rest:['O sinmi dáadáa.',{health:5,joy:7}],
 doctor:['O lọ sí ilé ìwòsàn.',{health:18,cash:-7000}],
 work:['O ṣiṣẹ́ takuntakun.',{cash:Math.max(5000,Math.round((jobs.find(j=>j.name===state.job)?.pay||10000)/3)),health:-3,joy:-3}]
 };
 if(type==='work'&&!state.job)return;
 if(type==='doctor'&&state.cash<7000){alert('Owó rẹ kò tó.');return}
 const a=actions[type];if(!a)return;apply(a[1]);addLog(a[0]);persist();render()
}
function takeJob(name){const j=jobs.find(j=>j.name===name);if(!j||state.age<18||state.school<j.school||state.pending)return;state.job=name;addLog('O gba iṣẹ́: '+name+'.');persist();render()}
function relationship(type){if(!state||state.pending||!state.alive||state.age<18)return;
 if(type==='partner'&&!state.partner){state.partner=true;apply({joy:12,family:8});addLog('O bẹ̀rẹ̀ ìbáṣepọ̀ tuntun.')}
 if(type==='child'&&state.partner&&state.children<8){state.children++;apply({joy:10,family:8,cash:-12000});addLog('Ọmọ tuntun dé sí ìdílé rẹ.')}
 persist();render()
}
function stat(label,val){const wrap=el('div',undefined,'life-stat');const top=el('div',label+' · '+Math.round(val)+'%');const track=el('div',undefined,'life-track');const bar=el('div',undefined,'life-fill');bar.style.width=clamp(val)+'%';track.append(bar);wrap.append(top,track);return wrap}
function render(){
 const root=$g('lifeGame');if(!root)return;root.replaceChildren();
 if(!state){const intro=el('div',undefined,'life-intro');intro.append(el('div','🌍','life-hero'),el('h2','Ìrìnàjò Ayé'),el('p','Ṣẹ̀dá ènìyàn tuntun. Yan ọ̀nà rẹ, kọ́ ẹ̀kọ́, ṣiṣẹ́, kí o sì gbádùn ayé.'));const input=el('input');input.placeholder='Kí ni orúkọ rẹ?';input.maxLength=30;input.setAttribute('aria-label','Orúkọ');intro.append(input,btn('Bẹ̀rẹ̀ ìgbésí ayé tuntun',()=>{state=fresh(input.value.trim());addLog('A bí '+state.name+'.');persist();render()},'life-primary'));root.append(intro);return}
 const head=el('div',undefined,'life-head');head.append(el('div','👤','life-avatar'));const info=el('div');info.append(el('h2',state.name),el('p','Ọjọ́-orí: '+state.age+' ọdún'),el('p','Owó: '+money(state.cash)));head.append(info);root.append(head);
 const stats=el('div',undefined,'life-stats');[['Ìlera',state.health],['Ayọ̀',state.joy],['Ẹ̀kọ́',state.school],['Ìdílé',state.family],['Ọ̀rẹ́',state.friends],['Òkìkí',state.reputation]].forEach(s=>stats.append(stat(...s)));root.append(stats);
 const detail=el('p','Iṣẹ́: '+(state.job||'Kò sí')+' · Ìbáṣepọ̀: '+(state.partner?'Bẹ́ẹ̀ ni':'Rárá')+' · Ọmọ: '+state.children,'muted');root.append(detail);
 if(state.age>=6&&state.age<=17&&state.alive){renderSchool(root)}
 if(!state.alive){const end=el('div',undefined,'life-event');end.append(el('h3','🕊️ Ìparí ìrìnàjò'),el('p','O gbé ayé fún ọdún '+state.age+'.'),btn('Bẹ̀rẹ̀ ayé tuntun',restart,'life-primary'));root.append(end)}
 else if(state.age>=6&&state.age<=17&&(!state.schoolYearDone||!state.npcDone)){const msg=el('p',state.schoolYearDone?'🏘️ Lẹ́yìn ilé ẹ̀kọ́: bá ènìyàn sọ̀rọ̀ kí o tó dàgbà.':'🏫 Lọ sí ilé ẹ̀kọ́, kọ́ ẹ̀kọ́, kí o sì ṣe ìdánwò.','muted');root.append(msg)}
 else if(state.pending){const event=el('div',undefined,'life-event');event.append(el('h3','📖 Kí ni o máa ṣe?'),el('p',state.pending.story));state.pending.choices.forEach((c,i)=>event.append(btn(c[0],()=>choose(i),'life-choice')));root.append(event)}
 else{
 const actions=el('div',undefined,'life-actions');actions.append(btn('🎂 Ọdún tó kàn',nextYear,'life-primary'));const menu=el('div',undefined,'life-grid');
 const acts=[['📚 Kàwé','study'],['🏃 Ṣe eré ìdárayá','exercise'],['🏠 Bẹ ìdílé wò','family'],['🤝 Bá ọ̀rẹ́ ṣeré','friends'],['🛌 Sinmi','rest']];
 if(state.age>=18){acts.push(['🏥 Lọ sí ilé ìwòsàn','doctor']);if(state.job)acts.push(['💼 Ṣiṣẹ́','work'])}
 acts.forEach(([label,key])=>menu.append(btn(label,()=>activity(key))));
 actions.append(menu);root.append(actions);
 if(state.age>=18){const career=el('div',undefined,'life-career');career.append(el('h3','💼 Iṣẹ́ àti owó'),el('p','Yan iṣẹ́ tó bá ẹ̀kọ́ rẹ mu.','muted'));const list=el('div',undefined,'life-grid');jobs.forEach(j=>{const eligible=state.school>=j.school;const b=btn(j.name+' · '+money(j.pay)+'/oṣù',()=>takeJob(j.name));b.disabled=!eligible;b.title=eligible?'':'Ẹ̀kọ́ tó yẹ: '+j.school+'%';list.append(b)});career.append(list);root.append(career);
 const family=el('div',undefined,'life-career');family.append(el('h3','❤️ Ìbáṣepọ̀ àti ìdílé'));if(!state.partner)family.append(btn('Bẹ̀rẹ̀ ìbáṣepọ̀',()=>relationship('partner')));else family.append(btn('Ní ọmọ',()=>relationship('child')));root.append(family)}
 }
 const hist=el('div',undefined,'life-history');hist.append(el('h3','📜 Ìtàn ayé rẹ'));state.history.forEach(t=>hist.append(el('p',t)));root.append(hist);
 root.append(btn('🔄 Bẹ̀rẹ̀ ayé tuntun',restart,'secondary'));
}

function renderSchool(root){
 const unit=window.YorubaLifeSchool.unit(state.age);
 const block=el('div',undefined,'life-event');
 block.append(el('h3','🏫 Ilé Ẹ̀kọ́ Yorùbá · Kíláàsì '+(state.age-5)),el('p','Ẹ̀kọ́: '+unit.topic));
 if(!state.schoolYearDone){
  const help=btn(state.helpEnglish?'🌐 Ìtúmọ̀ Gẹ̀ẹ́sì: Ṣí':'🌐 Ìtúmọ̀ Gẹ̀ẹ́sì: Pa',()=>{state.helpEnglish=!state.helpEnglish;persist();render()});
  block.append(help);
  if(state.schoolPhase==='lesson'){
   block.append(el('p','Olùkọ́: Ẹ tẹ́tí sílẹ̀, ẹ tún ọ̀rọ̀ náà sọ.')); 
   unit.teach.forEach(([yo,en])=>{
    const row=el('div',undefined,'life-school-row');
    row.append(el('strong',yo));
    if(state.helpEnglish)row.append(el('span',' — '+en,'muted'));
    row.append(btn('🔊 Gbọ́',()=>speak(yo)));
    block.append(row)
   });
   block.append(btn('📝 Bẹ̀rẹ̀ ìdánwò',()=>{state.schoolPhase='exam';persist();render()},'life-primary'));
  }else{
   block.append(el('h4','📝 Ìdánwò · '+unit.topic),el('p',unit.q));
   const answer=el('div',undefined,'life-grid');
   unit.options.forEach((opt,i)=>answer.append(btn(opt,()=>{
    state.examAttempts=(state.examAttempts||0)+1;
    if(i===unit.correct){state.schoolYearDone=true;state.schoolPhase='lesson';state.examResults.push({age:state.age,passed:true,attempts:state.examAttempts});state.examAttempts=0;apply({school:5,joy:3});addLog('O yege nínú ìdánwò Yorùbá: '+unit.topic+'.')}
    else{apply({school:-2,joy:-1});addLog('Ìdáhùn kò tọ́. O ní láti tún ẹ̀kọ́ ṣe.');state.schoolPhase='review'}
    persist();render()
   })));
   if(state.schoolPhase==='review'){block.append(el('p','❌ Kò tọ́. Tún ẹ̀kọ́ náà ṣe, kí o sì gbìyànjú lẹ́ẹ̀kan sí i.','bad'));block.append(btn('📖 Padà sí ẹ̀kọ́',()=>{state.schoolPhase='lesson';persist();render()}))}
   else block.append(answer);
  }
 }else{
  block.append(el('p','✅ O yege nínú ìdánwò!'));
  if(!state.npcDone){
   const scene=window.YorubaLifeSchool.scene(state.age);
   block.append(el('h3','🏘️ Lẹ́yìn ilé ẹ̀kọ́ · '+scene.where),el('p',scene.who+': '+scene.say));
   block.append(btn('🔊 Gbọ́ ohun tí wọ́n sọ',()=>speak(scene.say)));
   if(state.helpEnglish)block.append(el('p',scene.english,'muted'));
   scene.choices.forEach(([yo,en,delta])=>block.append(btn(yo+(state.helpEnglish?' — '+en:''),()=>{
    apply(delta);state.npcDone=true;addLog(scene.who+': '+scene.say+' | '+yo);persist();render()
   },'life-choice')));
  }else block.append(el('p','✅ O ti bá ènìyàn sọ̀rọ̀. O lè tẹ̀síwájú sí ọdún tó kàn.'));
 }
 root.append(block);
}
function restart(){if(!confirm('Ṣé o fẹ́ pa ìtàn yìí rẹ́ kí o sì bẹ̀rẹ̀ tuntun?'))return;state=null;localStorage.removeItem(KEY);render()}
window.lifeGameInit=()=>{if(!state)state=load();render()};
})();
