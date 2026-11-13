/* Additional consequential choices, adult storylines, and reusable game systems. */
window.YorubaLifeWorld=(()=>{
const events=[
{min:13,max:17,story:'Àwọn ọmọ kan ń fi ọ̀rẹ́ rẹ ṣe ẹlẹ́yà ní ilé ẹ̀kọ́.',choices:[['Mo máa dáàbò bo ọ̀rẹ́ mi.',{friends:12,reputation:8,joy:-3}],['Mo máa bá wọn rẹ́rìn-ín.',{friends:-14,reputation:-10,joy:3}],['Mo máa sọ fún olùkọ́.',{school:4,reputation:4}]]},
{min:18,max:90,story:'Ẹnìkan fẹ́ kí o darapọ̀ mọ́ ìṣòwò tí kò bófin mu. Ó ṣe ìlérí owó púpọ̀.',choices:[['Mo máa kọ̀.',{reputation:9,joy:1}],['Mo máa darapọ̀.',{cash:65000,reputation:-22,joy:4},'crime'],['Mo máa ròyìn rẹ̀.',{reputation:13,friends:-4}]]},
{min:18,max:90,story:'Ẹnìkan bẹ̀rẹ̀ sí í bá ọ jà ní ibi ayẹyẹ.',choices:[['Mo máa fi ibẹ̀ sílẹ̀.',{reputation:5,health:2}],['Mo máa dáhùn pẹ̀lú ìjà.',{health:-23,reputation:-18,joy:-8},'fight'],['Mo máa pe àwọn olùṣọ́.',{reputation:7,joy:-2}]]},
{min:18,max:90,story:'O rí ẹni tí o nífẹ̀ẹ́ sí, ṣùgbọ́n ìbáṣepọ̀ yín ní ìṣòro.',choices:[['Mo máa bá a sọ̀rọ̀ ní òtítọ́.',{family:10,joy:7,reputation:4}],['Mo máa purọ́ fún un.',{family:-15,reputation:-12,joy:3}],['Mo máa fi ìbáṣepọ̀ náà sílẹ̀.',{family:-8,joy:-7}]]},
{min:18,max:90,story:'Ìwọ àti ọ̀rẹ́ rẹ ní àríyànjiyàn nípa owó.',choices:[['Mo máa wá àlàáfíà.',{friends:9,reputation:5,cash:-2500}],['Mo máa halẹ̀ mọ́ ọn.',{friends:-18,reputation:-16},'threat'],['Mo máa dá ìbáṣepọ̀ dúró.',{friends:-10,joy:-3}]]},
{min:18,max:90,story:'O lè fi owó rẹ sínú òwò tuntun. Èrè kò dájú.',choices:[['Mo máa fi ₦20,000 sínú rẹ̀.',{cash:-20000,school:3},'invest'],['Mo máa tọ́jú owó mi.',{joy:1}]]},
{min:18,max:90,story:'Ọ̀rẹ́ rẹ ń tàn ẹni mìíràn jẹ. Ó ní kí o dakẹ́.',choices:[['Mo máa sọ òtítọ́.',{reputation:13,friends:-12}],['Mo máa pa á mọ́.',{reputation:-12,friends:5}],['Mo máa bá a sọ̀rọ̀ ní ìkọ̀kọ̀.',{reputation:5,friends:3}]]},
{min:18,max:90,story:'Ọ̀rẹ́ kan fẹ́ kí o ṣe eré ìdíje pẹ̀lú owó rẹ.',choices:[['Mo máa kọ̀.',{reputation:3}],['Mo máa fi ₦10,000 ṣe eré náà.',{cash:-10000,joy:3},'gamble']]}
];
const actions=[
{key:'volunteer',label:'🤲 Ṣe iṣẹ́ àwùjọ',min:12,cost:0,delta:{reputation:8,joy:3,friends:3},log:'O ṣe iṣẹ́ àwùjọ.'},
{key:'argument',label:'💢 Bá ẹnìkan jiyàn',min:13,cost:0,delta:{friends:-8,joy:-4,reputation:-5},log:'O bá ẹnìkan jiyàn.'},
{key:'apologize',label:'🤝 Tọrọ àforíjì',min:13,cost:0,delta:{friends:5,reputation:4,joy:2},log:'O tọrọ àforíjì.'},
{key:'party',label:'🎉 Lọ sí ayẹyẹ',min:18,cost:4000,delta:{joy:12,friends:6,health:-2},log:'O lọ sí ayẹyẹ.'},
{key:'gamble',label:'🎲 Ṣe eré owó',min:18,cost:10000,delta:{reputation:-4,joy:-4},log:'O ṣe eré owó.',chance:'gamble'},
{key:'steal',label:'🕵️ Jí nǹkan',min:18,cost:0,delta:{reputation:-18,joy:-6},log:'O jí nǹkan.',chance:'crime'},
{key:'invest',label:'📈 Fi owó sínú òwò',min:18,cost:20000,delta:{school:2},log:'O fi owó sínú òwò.',chance:'invest'},
{key:'therapy',label:'🧠 Wá ìrànlọ́wọ́',min:18,cost:5000,delta:{joy:15,health:3},log:'O wá ìrànlọ́wọ́.'}
];
return {events,actions};
})();
