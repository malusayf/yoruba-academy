// Server-side conversational Yoruba tutor. Requires OPENAI_API_KEY in Vercel settings.
export default async function handler(req,res){
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
 const key=process.env.OPENAI_API_KEY;
 if(!key)return res.status(503).json({error:'AI tutor is not configured. Use guided practice until an API key is connected.'});
 const {message,history=[],level='A1',context='market'}=req.body||{};
 if(typeof message!=='string'||!message.trim()||message.length>600||!Array.isArray(history))return res.status(400).json({error:'Invalid conversation'});
 const safeHistory=history.slice(-8).filter(x=>x&&['user','assistant'].includes(x.role)&&typeof x.content==='string').map(x=>({role:x.role,content:x.content.slice(0,600)}));
 const system='You are an encouraging Yoruba language immersion teacher in a life-simulation game. All NPC dialogue must be natural standard Yoruba with tone marks. Scene: '+String(context).slice(0,100)+'. Learner CEFR-style level: '+String(level).slice(0,8)+'. Respond with a single short natural Yoruba NPC line, followed by one concise English learning hint only for A1/A2, and one small correction when necessary. Stay in the game scenario, respond to user meaning, avoid invented proficiency ratings, do not claim to have heard audio or graded pronunciation. Avoid explicit sexual content or instructions for wrongdoing. Keep responses under 120 words.';
 try{
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
 let response;try{response=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.YORUBA_TUTOR_MODEL||'gpt-4o-mini',temperature:0.65,max_tokens:220,messages:[{role:'system',content:system},...safeHistory,{role:'user',content:message}]}),signal:controller.signal})}finally{clearTimeout(timer)}
 if(!response.ok)return res.status(502).json({error:'The tutor is temporarily unavailable.'});
 const data=await response.json();const reply=data.choices?.[0]?.message?.content;
 if(typeof reply!=='string'||!reply.trim())throw Error('empty');
 res.setHeader('Cache-Control','no-store');return res.status(200).json({reply:reply.slice(0,1300)});
 }catch{return res.status(502).json({error:'The tutor could not respond. Try again.'})}
}
