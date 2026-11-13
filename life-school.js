/* School curriculum and after-school dialogues for Ìrìnàjò Ayé. */
window.YorubaLifeSchool=(()=>{
const units=[
{topic:'Ìkíni',en:'Greetings',teach:[['Ẹ káàárọ̀','Good morning'],['Ẹ káàsán','Good afternoon'],['Ẹ kú alẹ́','Good evening']],q:'Kí ni a máa sọ ní òwúrọ̀?',options:['Ẹ káàárọ̀','Ẹ káàsán','Ẹ kú alẹ́'],correct:0},
{topic:'Orúkọ',en:'Names',teach:[['Orúkọ mi ni','My name is'],['Kí ni orúkọ rẹ?','What is your name?'],['Mo wà dáadáa','I am fine']],q:'Báwo ni o ṣe máa sọ “My name is”?',options:['Mo wà dáadáa','Orúkọ mi ni','Kí ni orúkọ rẹ?'],correct:1},
{topic:'Ìdílé',en:'Family',teach:[['Ìyá','Mother'],['Bàbá','Father'],['Ọmọ','Child']],q:'Kí ni “mother” ní Yorùbá?',options:['Ọmọ','Bàbá','Ìyá'],correct:2},
{topic:'Oúnjẹ',en:'Food',teach:[['Omi','Water'],['Oúnjẹ','Food'],['Ìrẹsì','Rice']],q:'Kí ni “water” ní Yorùbá?',options:['Omi','Ìrẹsì','Oúnjẹ'],correct:0},
{topic:'Àwọn ibi',en:'Places',teach:[['Ilé','Home'],['Ọjà','Market'],['Ilé ẹ̀kọ́','School']],q:'Kí ni “market” ní Yorùbá?',options:['Ilé','Ọjà','Ilé ẹ̀kọ́'],correct:1},
{topic:'Ìbéèrè',en:'Questions',teach:[['Kí ni?','What?'],['Ibo?','Where?'],['Ta ni?','Who?']],q:'Kí ni “who?” ní Yorùbá?',options:['Ibo?','Kí ni?','Ta ni?'],correct:2},
{topic:'Ìṣirò',en:'Counting',teach:[['Ọ̀kan','One'],['Méjì','Two'],['Mẹ́ta','Three']],q:'Kí ni “one” ní Yorùbá?',options:['Ọ̀kan','Mẹ́ta','Méjì'],correct:0},
{topic:'Àwọn ìṣe',en:'Actions',teach:[['Rìn','Walk'],['Jẹun','Eat'],['Kàwé','Read or study']],q:'Kí ni “eat” ní Yorùbá?',options:['Rìn','Jẹun','Kàwé'],correct:1},
{topic:'Àkókò',en:'Time',teach:[['Òní','Today'],['Ọ̀la','Tomorrow'],['Alẹ́','Night']],q:'Kí ni “night” ní Yorùbá?',options:['Òní','Ọ̀la','Alẹ́'],correct:2},
{topic:'Ìrànlọ́wọ́',en:'Asking for help',teach:[['Jọ̀wọ́','Please'],['Ràn mí lọ́wọ́','Help me'],['Ẹ ṣé','Thank you']],q:'Kí ni “please” ní Yorùbá?',options:['Jọ̀wọ́','Ẹ ṣé','Ràn mí lọ́wọ́'],correct:0},
{topic:'Ìlera',en:'Health',teach:[['Ìlera','Health'],['Ilé ìwòsàn','Hospital'],['Ó rẹ̀ mí','I am tired']],q:'Kí ni “hospital” ní Yorùbá?',options:['Ìlera','Ilé ìwòsàn','Ó rẹ̀ mí'],correct:1},
{topic:'Ọ̀rọ̀ ojoojúmọ́',en:'Everyday conversation',teach:[['Báwo ni?','How are you?'],['Mo wà dáadáa','I am fine'],['A ó ríra','See you later']],q:'Kí ni “see you later” ní Yorùbá?',options:['Báwo ni?','Mo wà dáadáa','A ó ríra'],correct:2}
];
const scenes=[
{who:'👩🏾 Ìyá',where:'🏠 Ilé',say:'Báwo ni?',english:'How are you?',choices:[['Mo wà dáadáa.','I am fine.',{family:5,joy:3}],['Ó rẹ̀ mí.','I am tired.',{family:3,health:2}]]},
{who:'👨🏾 Olùtajà',where:'🛒 Ọjà',say:'Kí ni o fẹ́?',english:'What do you want?',choices:[['Omi, jọ̀wọ́.','Water, please.',{cash:-100,joy:4}],['Oúnjẹ, jọ̀wọ́.','Food, please.',{cash:-300,health:4}]]},
{who:'🧒🏾 Ọ̀rẹ́',where:'🌳 Pápá ìṣeré',say:'Ṣé a lè ṣeré pọ̀?',english:'Can we play together?',choices:[['Bẹ́ẹ̀ ni!','Yes!',{friends:7,joy:5}],['Rárá, mo fẹ́ kàwé.','No, I want to study.',{school:5,friends:-2}]]},
{who:'👨🏾 Aládùúgbò',where:'🏘️ Adúgbò',say:'Ibo ni ọjà?',english:'Where is the market?',choices:[['Ọjà wà níbẹ̀.','The market is over there.',{reputation:5}],['Mi ò mọ̀.','I do not know.',{reputation:0}]]}
];
function unit(age){return units[Math.max(0,Math.min(units.length-1,age-6))]}
function scene(age){return scenes[Math.abs(age-6)%scenes.length]}
return {unit,scene};
})();
