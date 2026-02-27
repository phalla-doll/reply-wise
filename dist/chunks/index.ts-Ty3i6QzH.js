import{g as u}from"./storage-DuEZe3v9.js";const h="https://openrouter.ai/api/v1/chat/completions";async function p(n,o){const e=await fetch(h,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json","HTTP-Referer":chrome.runtime.getURL(""),"X-Title":"ReplyWise"},body:JSON.stringify({model:"anthropic/claude-3-haiku:beta",messages:[{role:"user",content:n}],max_tokens:300,temperature:.7})});if(!e.ok){const r=await e.text();throw new Error(`OpenRouter API error: ${e.status} - ${r}`)}return(await e.json()).choices[0].message.content.trim()}chrome.runtime.onMessage.addListener((n,o,e)=>{if(n.type==="GENERATE_COMMENT")return(async()=>{try{const t=await u();if(!t.apiKey){e({error:"API key not configured"});return}const{context:r,tone:a,length:i}=n.payload,s=`You are an expert LinkedIn engagement strategist.

Post:
"${r.postContent}"

Tone: ${a}
Length: ${i}

Write a high-value LinkedIn comment that:
- Adds unique insight
- Avoids generic praise
- Sounds human and authentic
- Encourages discussion`,c=await p(s,t.apiKey);e({text:c})}catch(t){e({error:t instanceof Error?t.message:"Unknown error"})}})(),!0});
