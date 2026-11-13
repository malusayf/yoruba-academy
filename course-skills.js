
// Structured speaking drills: no AI or automatic Yoruba speech grading is claimed.
const COURSE_GRAMMAR=[
{title:'Greetings and respect',rule:'Ẹ is a respectful form often used when greeting elders or groups. Practice the correct greeting for the time of day.',pattern:'Ẹ káàárọ̀ → Good morning',prompt:'Greet an elder politely in the morning.',answer:'Ẹ káàárọ̀'},
{title:'Introducing yourself',rule:'Orúkọ mi ni … means “My name is …”. Replace the name with your own.',pattern:'Orúkọ mi ni Tádé.',prompt:'Say “My name is Tádé.”',answer:'Orúkọ mi ni Tádé'},
{title:'Counting things',rule:'Learn numbers as a sequence and apply them to objects. Yoruba numbers beyond ten follow patterns worth practicing separately.',pattern:'Ọ̀kan · Méjì · Mẹ́ta',prompt:'Count one, two, three.',answer:'Ọ̀kan méjì mẹ́ta'},
{title:'Possession with mi',rule:'Mi can mean “my” after a noun in phrases such as ìyá mi (my mother).',pattern:'Ìyá mi → My mother',prompt:'Say “my mother.”',answer:'Ìyá mi'},
{title:'Polite requests',rule:'Jọ̀wọ́ means “please.” Use it when requesting something.',pattern:'Omi, jọ̀wọ́ → Water, please',prompt:'Ask for water politely.',answer:'Omi jọ̀wọ́'},
{title:'Asking where',rule:'Ibo ni …? is a common way to ask where something is.',pattern:'Ibo ni ọjà? → Where is the market?',prompt:'Ask “Where is the market?”',answer:'Ibo ni ọjà'},
{title:'First speaking check',rule:'Review greetings, names, food and family without reading. A fluent speaker should assess your tones.',pattern:'Ẹ káàárọ̀. Orúkọ mi ni Tádé.',prompt:'Say “Good morning. My name is Tádé.”',answer:'Ẹ káàárọ̀ Orúkọ mi ni Tádé'},
{title:'Talking about yourself',rule:'Mo introduces many first-person statements. Learn complete patterns rather than translating word by word.',pattern:'Mo wà dáadáa → I am fine',prompt:'Say “I am fine.”',answer:'Mo wà dáadáa'},
{title:'Asking names',rule:'Kí ni orúkọ rẹ? asks someone’s name informally. Practice answering as well.',pattern:'Kí ni orúkọ rẹ?',prompt:'Ask “What is your name?”',answer:'Kí ni orúkọ rẹ'},
{title:'Ongoing actions',rule:'Mo ń + verb phrase commonly describes an action in progress.',pattern:'Mo ń kàwé → I am reading/studying',prompt:'Say “I am reading.”',answer:'Mo ń kàwé'},
{title:'Descriptions',rule:'Practice noun–description combinations as complete expressions.',pattern:'Ilé ńlá → A big house',prompt:'Say “a big house.”',answer:'Ilé ńlá'},
{title:'Asking for help',rule:'Ràn mí lọ́wọ́ means “help me.” Add jọ̀wọ́ to make a polite request.',pattern:'Jọ̀wọ́, ràn mí lọ́wọ́.',prompt:'Say “Please help me.”',answer:'Jọ̀wọ́ ràn mí lọ́wọ́'},
{title:'Today and tomorrow',rule:'Òní means today; ọ̀la means tomorrow. Use these words in short plans.',pattern:'Òní · Ọ̀la',prompt:'Say “today, tomorrow.”',answer:'Òní ọ̀la'},
{title:'Sentence-building check',rule:'Combine questions, responses and requests without looking at the answers.',pattern:'Kí ni orúkọ rẹ? Orúkọ mi ni Tádé.',prompt:'Ask someone’s name, then answer with Tádé.',answer:'Kí ni orúkọ rẹ Orúkọ mi ni Tádé'},
{title:'Meeting someone',rule:'Respond to greetings naturally. Yoruba greetings depend on context and social relationships.',pattern:'Báwo ni? Mo wà dáadáa.',prompt:'Ask how someone is and reply “I am fine.”',answer:'Báwo ni Mo wà dáadáa'},
{title:'At the market',rule:'Learn the vocabulary for a market, buying and money. Practice a role-play with a partner.',pattern:'Ọjà · Rà · Owó',prompt:'Say “market, buy, money.”',answer:'Ọjà rà owó'},
{title:'Ordering food',rule:'Use a polite request to order a drink. Extend the conversation by asking what is available.',pattern:'Omi, jọ̀wọ́.',prompt:'Ask for water politely.',answer:'Omi jọ̀wọ́'},
{title:'Asking directions',rule:'Ask where a place is. Listen for the location in the reply.',pattern:'Ibo ni ilé?',prompt:'Ask “Where is the house?”',answer:'Ibo ni ilé'},
{title:'Talking about family',rule:'Introduce people using simple noun phrases and a complete sentence.',pattern:'Ẹbí mi nìyí → This is my family',prompt:'Say “This is my family.”',answer:'Ẹbí mi nìyí'},
{title:'Making plans',rule:'Practice saying goodbye and arranging to meet tomorrow.',pattern:'A ó ríra lọ́la → See you tomorrow',prompt:'Say “See you tomorrow.”',answer:'A ó ríra lọ́la'},
{title:'Final conversation assessment',rule:'Have a real conversation with a fluent Yoruba speaker. An app quiz alone cannot certify conversational ability.',pattern:'Ẹ káàárọ̀! Kí ni orúkọ rẹ?',prompt:'Say “Good morning! What is your name?”',answer:'Ẹ káàárọ̀ Kí ni orúkọ rẹ'}
];
function courseTextNorm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[ẹọṣ]/g,c=>({ẹ:'e',ọ:'o',ṣ:'s'}[c])).replace(/[^a-z\s]/g,'').replace(/\s+/g,' ').trim()}
function courseExtra(d,area){
 const grammar=COURSE_GRAMMAR[d.day-1];
 const panel=courseEl('div',undefined,'course-extra');
 panel.append(courseEl('h3','📘 Sentence pattern & grammar'),courseEl('strong',grammar.title),courseEl('p',grammar.rule),courseEl('p',grammar.pattern,'course-yoruba'));
 panel.append(courseButton('🔊 Hear the example',()=>speak(grammar.pattern.split('→')[0].trim())));
 panel.append(courseEl('h3','🧩 Build it from memory'),courseEl('p',grammar.prompt));
 const answer=document.createElement('input');answer.placeholder='Type the Yoruba expression from memory';answer.autocomplete='off';answer.setAttribute('aria-label','Your Yoruba sentence');panel.append(answer);
 const result=courseEl('p','','muted');panel.append(courseButton('Check my sentence',()=>{const ok=courseTextNorm(answer.value)===courseTextNorm(grammar.answer);result.textContent=ok?'✓ Correct words! Tone marks and pronunciation still need checking.':'Try again. Suggested answer: '+grammar.answer;result.className=ok?'good':'bad';if(ok){const p=courseProgress();p[d.day]={...(p[d.day]||{}),sentencePassed:true};saveCourseProgress(p)}}),result);
 panel.append(courseEl('h3','👂 Listening comprehension'));
 const listenPrompt=courseEl('p','Listen without reading, then choose what you heard.');panel.append(listenPrompt);
 const words=d.cards;
 const target=words[(d.day+1)%words.length];
 panel.append(courseButton('🔊 Play listening challenge',()=>speak(target.yo)));
 const options=courseEl('div',undefined,'course-choices'),listenResult=courseEl('p','','muted');
 const sorted=[...words].sort((a,b)=>a.en.localeCompare(b.en));
 sorted.forEach(w=>options.append(courseButton(w.en,()=>{const ok=w.en===target.en;listenResult.textContent=ok?'✓ Correct listening answer!':'Try again. Listen for the sounds and tones.';listenResult.className=ok?'good':'bad';if(ok){const p=courseProgress();p[d.day]={...(p[d.day]||{}),listeningPassed:true};saveCourseProgress(p)}})));
 panel.append(options,listenResult);
 if([7,14,21].includes(d.day)){panel.append(courseEl('h3','🏅 Speaking checkpoint'),courseEl('p',d.day===7?'Speak for one minute: greet, introduce yourself, count, and name family and food.':d.day===14?'Speak for two minutes: ask questions, make requests and create at least five original sentences.':'Speak for three minutes with another person: introductions, questions, shopping, directions and plans.'));panel.append(courseEl('p','Record yourself and ask a fluent Yoruba speaker to check your tones, comprehension and natural responses. This is not automatically graded.','muted'))}
 area.append(panel)
}
