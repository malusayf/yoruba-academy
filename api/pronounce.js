// Server-side Yoruba pronunciation. Set NAIJA_ASR_KEY in Vercel project settings.
// Provider requires a separate commercial license for commercial use.
export default async function handler(req,res){
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
 const key=process.env.NAIJA_ASR_KEY;
 if(!key)return res.status(503).json({error:'Yoruba audio is not configured yet. An API key is required.'});
 const text=req.body?.text;
 if(typeof text!=='string'||!text.trim()||text.length>150)return res.status(400).json({error:'Provide a Yoruba word or short phrase (up to 150 characters).'});
 if(!/^[\p{L}\p{M}\s?!.,'’\-]+$/u.test(text))return res.status(400).json({error:'Only words and short phrases are supported.'});
 try{
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
  let response;
  try{response=await fetch('https://asr.naijallm.com/v1/audio/speech',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({input:text,language:'yo',voice:'yoruba_clear',response_format:'mp3'}),signal:controller.signal});}finally{clearTimeout(timeout)}
  if(!response.ok)return res.status(response.status===429?429:502).json({error:response.status===429?'Audio rate limit reached. Try again shortly.':'Yoruba speech provider is unavailable.'});
  const bytes=await response.arrayBuffer();if(bytes.byteLength>3000000)return res.status(502).json({error:'Audio response too large'});
  res.setHeader('Content-Type','audio/mpeg');res.setHeader('Cache-Control','public, max-age=86400, s-maxage=604800');return res.status(200).send(Buffer.from(bytes));
 }catch{return res.status(502).json({error:'Could not generate Yoruba audio right now.'})}
}