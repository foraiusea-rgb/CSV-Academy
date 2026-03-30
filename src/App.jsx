import { useState, useEffect, useCallback } from "react";
import { storage } from "./storage.js";
import { MODULES } from "./data/courses.js";
import { QUIZ_BANK, INTERVIEW_DATA, SIMULATORS, FLOWCHARTS, FEYNMAN_TOPICS } from "./data/content.js";

const SK = "csv-academy-v3";
const DS = {
  tab:"dashboard",done:[],quizH:[],feynH:[],simH:[],jobs:[],mockIntH:[],
  weakModules:{},cfg:{apiKey:"",model:"minimax/MiniMax-M1"},lastVisit:null
};

export default function App() {
  const [s,setS]=useState(DS);
  const [ld,setLd]=useState(false);
  const [xL,setXL]=useState(null);
  const [cq,setCq]=useState(null);
  const [qi,setQi]=useState(0);
  const [qs,setQs]=useState(0);
  const [qa,setQa]=useState(false);
  const [sa,setSa]=useState(null);
  const [xI,setXI]=useState(null);
  const [sA,setSA]=useState(null);
  const [aR,setAR]=useState("");
  const [aL,setAL]=useState(false);
  const [fT,setFT]=useState("");
  const [fI,setFI]=useState("");
  const [fS,setFS]=useState(null);
  const [mockMode,setMockMode]=useState(false);
  const [mockQ,setMockQ]=useState(null);
  const [mockAns,setMockAns]=useState("");
  const [mockLv,setMockLv]=useState("entry");

  // Load/save
  useEffect(()=>{(async()=>{try{const r=await storage.get(SK);if(r?.value)setS(p=>({...p,...JSON.parse(r.value)}));}catch(e){}setLd(true);})();},[]);
  useEffect(()=>{if(!ld)return;const t=setTimeout(async()=>{try{await storage.set(SK,JSON.stringify(s));}catch(e){}},500);return()=>clearTimeout(t);},[s,ld]);

  const u=useCallback(up=>setS(p=>({...p,...up})),[]);
  const togL=id=>{if(!s.done.includes(id))u({done:[...s.done,id]});setXL(xL===id?null:id);};
  const tL=MODULES.reduce((a,m)=>a+m.ls.length,0);
  const pP=tL>0?Math.round((s.done.length/tL)*100):0;

  // Weak module detection
  const getWeakModules=()=>{
    const moduleScores={};
    s.quizH.forEach(qh=>{
      if(qh.moduleScores){
        Object.entries(qh.moduleScores).forEach(([mid,{correct,total}])=>{
          if(!moduleScores[mid])moduleScores[mid]={c:0,t:0};
          moduleScores[mid].c+=correct;moduleScores[mid].t+=total;
        });
      }
    });
    return Object.entries(moduleScores).filter(([_,v])=>v.t>=2&&(v.c/v.t)<0.6).map(([k])=>k);
  };

  // AI call
  const callAI=async(prompt,sys="You are a CSV expert tutor for pharmaceutical industry professionals in Ireland.")=>{
    if(!s.cfg.apiKey){setAR("⚠️ Please set your OpenRouter API key in Settings first.");return null;}
    setAL(true);setAR("");
    try{
      const r=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${s.cfg.apiKey}`},body:JSON.stringify({model:s.cfg.model||"minimax/MiniMax-M1",messages:[{role:"system",content:sys},{role:"user",content:prompt}],max_tokens:2500})});
      const d=await r.json();const t=d.choices?.[0]?.message?.content||"No response received.";setAR(t);setAL(false);return t;
    }catch(e){setAR("Error: "+e.message);setAL(false);return null;}
  };

  // Quiz
  const startQ=(mid=null)=>{
    let p=mid?QUIZ_BANK.filter(q=>q.m===mid):[...QUIZ_BANK];
    p.sort(()=>Math.random()-0.5);
    setCq(p.slice(0,Math.min(10,p.length)));setQi(0);setQs(0);setQa(false);setSa(null);
  };
  const ansQ=i=>{if(qa)return;setSa(i);setQa(true);if(i===cq[qi].a)setQs(v=>v+1);};
  const nxtQ=()=>{
    if(qi+1>=cq.length){
      const modScores={};
      cq.forEach((q,idx)=>{
        if(!modScores[q.m])modScores[q.m]={correct:0,total:0};
        modScores[q.m].total++;
        // We need to track which were correct - approximate from final score
      });
      u({quizH:[...s.quizH,{d:new Date().toISOString(),s:qs,t:cq.length,p:Math.round((qs/cq.length)*100)}]});
      setQi(qi+1);
    }else{setQi(qi+1);setQa(false);setSa(null);}
  };

  // Feynman
  const subFeyn=async()=>{
    if(!fI.trim()||!fT)return;
    const r=await callAI(`The learner was asked to explain "${fT}" using the Feynman technique (explain it simply as if teaching a beginner in pharma).\n\nTheir explanation:\n"${fI}"\n\nScore their explanation out of 10 on:\n1. ACCURACY (is the information correct?)\n2. COMPLETENESS (did they cover the key points?)\n3. CLARITY (would a beginner understand?)\n\nFormat your response as:\nOverall: X/10\nAccuracy: X/10\nCompleteness: X/10\nClarity: X/10\n\nThen give specific feedback on what they got right, what's missing, and what could be clearer. Finally, provide the correct/complete explanation.`);
    if(r){const m=r.match(/overall[:\s]*(\d+)/i)||r.match(/(\d+)\s*\/\s*10/);const sc=m?parseInt(m[1]):5;u({feynH:[...s.feynH,{d:new Date().toISOString(),topic:fT,score:sc}]});}
  };

  // Mock interview
  const startMock=(level)=>{
    const pool=INTERVIEW_DATA[level];
    const q=pool[Math.floor(Math.random()*pool.length)];
    setMockQ(q);setMockAns("");setMockLv(level);setMockMode(true);setAR("");
  };
  const submitMock=async()=>{
    if(!mockAns.trim()||!mockQ)return;
    const r=await callAI(`You are conducting a mock interview for a ${mockLv==='entry'?'Entry Level':'Mid Level'} CSV Engineer position at a pharmaceutical company in Ireland.\n\nQuestion asked: "${mockQ.q}"\nCategory: ${mockQ.c}\n\nCandidate's answer:\n"${mockAns}"\n\nModel answer (for reference):\n"${mockQ.a}"\n\nScore the candidate's answer 1-10 and provide:\n1. SCORE: X/10\n2. STRENGTHS: What they got right\n3. GAPS: What was missing or incorrect\n4. IMPROVEMENT: How to make the answer stronger\n5. INTERVIEWER TIP: What the interviewer is really looking for with this question\n\nBe constructive and encouraging but honest.`);
    if(r){
      const m=r.match(/score[:\s]*(\d+)/i)||r.match(/(\d+)\s*\/\s*10/);
      const sc=m?parseInt(m[1]):5;
      u({mockIntH:[...s.mockIntH,{d:new Date().toISOString(),q:mockQ.q,level:mockLv,score:sc}]});
    }
  };

  // Clear
  const clearD=async()=>{if(confirm("⚠️ This will permanently reset ALL your progress, scores, and saved data. Continue?")){setS(DS);try{await storage.delete(SK);}catch(e){}}};

  if(!ld)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0C0F14',color:'#4ECDC4',fontFamily:'system-ui'}}><div style={{textAlign:'center',fontSize:'1.1rem'}}>🏛 Loading CSV Academy...</div></div>;

  // Styles
  const C={background:'#141820',border:'1px solid #2A3348',borderRadius:12,padding:'1.5rem'};
  const Cs={...C,padding:'1rem'};
  const B=(bg='#4ECDC4')=>({background:bg,color:'#0C0F14',border:'none',padding:'0.5rem 1.25rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.8rem',fontFamily:'inherit',transition:'opacity 0.2s'});
  const inp={width:'100%',background:'#1E2536',border:'1px solid #2A3348',borderRadius:6,padding:'0.45rem 0.65rem',color:'#E8ECF4',fontSize:'0.82rem',fontFamily:'inherit'};

  // SVG flowchart
  const renderFC=fc=>{
    const ns=fc.n;const W=600;const H=ns.length*48+20;
    return(<svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:520,background:'#0C0F14',borderRadius:8,border:'1px solid #1E2536'}}>
      <defs><marker id="arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#4ECDC4"/></marker></defs>
      {ns.map((_,i)=>{if(i<ns.length-1)return<line key={`e${i}`} x1={W/2} y1={i*48+36} x2={W/2} y2={(i+1)*48+6} stroke="#2A3348" strokeWidth={1.5} markerEnd="url(#arr)"/>;return null;})}
      {ns.map((n,i)=>{const y=i*48+8;return(<g key={i}>
        <rect x={W/2-105} y={y} width={210} height={26} rx={5} fill="#1E2536" stroke={i===0?"#4ECDC4":i===ns.length-1?"#22C55E":"#2A3348"} strokeWidth={i===0||i===ns.length-1?1.5:0.5}/>
        <text x={W/2} y={y+17} textAnchor="middle" fill="#E8ECF4" fontSize={10} fontFamily="system-ui">{n}</text>
      </g>);})}
    </svg>);
  };

  const tabs=[
    {id:"dashboard",l:"📊 Dashboard"},{id:"course",l:"📚 Course"},{id:"sims",l:"💻 Simulators"},
    {id:"interview",l:"🎯 Interview"},{id:"jobs",l:"🇮🇪 Jobs"},{id:"test",l:"🧠 Tests"},
    {id:"flow",l:"🔀 Flowcharts"},{id:"cfg",l:"⚙️ Settings"}
  ];

  return(<div style={{minHeight:'100vh',background:'#0C0F14',color:'#E8ECF4',fontFamily:"'Source Sans 3',system-ui,sans-serif"}}>
    {/* NAV */}
    <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(12,15,20,0.92)',backdropFilter:'blur(20px)',borderBottom:'1px solid #2A3348',display:'flex',alignItems:'center',padding:'0 0.5rem',overflowX:'auto',gap:'0.1rem'}}>
      <div style={{fontFamily:"'DM Serif Display',Georgia,serif",fontSize:'1rem',padding:'0.65rem 0.4rem',marginRight:'0.3rem',color:'#4ECDC4',whiteSpace:'nowrap',cursor:'pointer'}} onClick={()=>u({tab:'dashboard'})}>CSV Academy</div>
      {tabs.map(t=><button key={t.id} onClick={()=>{u({tab:t.id});setAR("");}} style={{background:s.tab===t.id?'rgba(78,205,196,0.15)':'transparent',border:'none',color:s.tab===t.id?'#4ECDC4':'#8892A8',padding:'0.5rem 0.55rem',borderRadius:6,cursor:'pointer',fontSize:'0.72rem',fontWeight:500,whiteSpace:'nowrap',fontFamily:'inherit'}}>{t.l}</button>)}
    </nav>

    <div style={{maxWidth:1200,margin:'0 auto',padding:'1.25rem 1rem'}}>

    {/* ═══════ DASHBOARD ═══════ */}
    {s.tab==="dashboard"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'1rem'}}>Dashboard</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(135px,1fr))',gap:'0.6rem',marginBottom:'1.25rem'}}>
        {[
          {l:"Course",v:`${pP}%`,su:`${s.done.length}/${tL}`,c:'#4ECDC4'},
          {l:"Quizzes",v:s.quizH.length,su:s.quizH.length?`Avg ${Math.round(s.quizH.reduce((a,x)=>a+x.p,0)/s.quizH.length)}%`:"—",c:'#A78BFA'},
          {l:"Feynman",v:s.feynH.length,su:s.feynH.length?`Avg ${(s.feynH.reduce((a,x)=>a+x.score,0)/s.feynH.length).toFixed(1)}/10`:"—",c:'#FF6B6B'},
          {l:"Mock Interviews",v:s.mockIntH.length,su:s.mockIntH.length?`Avg ${(s.mockIntH.reduce((a,x)=>a+x.score,0)/s.mockIntH.length).toFixed(1)}/10`:"—",c:'#22C55E'},
          {l:"Simulators",v:s.simH.length,su:"completed",c:'#38BDF8'},
          {l:"Modules",v:`${MODULES.filter(m=>m.ls.every(l=>s.done.includes(l.id))).length}/${MODULES.length}`,su:"complete",c:'#FB923C'},
        ].map((x,i)=><div key={i} style={{...Cs}}><div style={{fontSize:'0.6rem',color:'#5A6580',textTransform:'uppercase',letterSpacing:'0.05em'}}>{x.l}</div><div style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",color:x.c}}>{x.v}</div><div style={{fontSize:'0.7rem',color:'#8892A8'}}>{x.su}</div></div>)}
      </div>

      {/* Progress bar */}
      <div style={{...Cs,marginBottom:'1.25rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem'}}><span style={{fontSize:'0.82rem',fontWeight:600}}>Overall Course Progress</span><span style={{fontSize:'0.82rem',color:'#4ECDC4'}}>{pP}%</span></div>
        <div style={{height:6,background:'#1E2536',borderRadius:3,overflow:'hidden'}}><div style={{height:'100%',width:`${pP}%`,background:'linear-gradient(90deg,#4ECDC4,#38BDF8)',borderRadius:3,transition:'width 0.5s'}}/></div>
      </div>

      {/* Module grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'0.5rem',marginBottom:'1.25rem'}}>
        {MODULES.map(m=>{const dn=m.ls.filter(l=>s.done.includes(l.id)).length;const pc=Math.round((dn/m.ls.length)*100);return<div key={m.id} style={{...Cs,cursor:'pointer'}} onClick={()=>u({tab:'course'})}>
          <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.3rem'}}><span>{m.i}</span><span style={{fontSize:'0.78rem',fontWeight:600,flex:1}}>{m.t}</span><span style={{fontSize:'0.67rem',color:pc===100?'#22C55E':'#8892A8'}}>{pc}%</span></div>
          <div style={{height:3,background:'#1E2536',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:`${pc}%`,background:m.c,borderRadius:2}}/></div>
        </div>;})}
      </div>

      {/* Score history panels */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'0.75rem'}}>
        {s.quizH.length>0&&<div style={Cs}><h3 style={{fontSize:'0.82rem',marginBottom:'0.5rem',color:'#A78BFA'}}>Quiz History</h3><div style={{display:'flex',gap:'0.3rem',flexWrap:'wrap'}}>{s.quizH.slice(-10).map((x,i)=><div key={i} style={{background:'#1E2536',borderRadius:5,padding:'0.25rem 0.45rem',textAlign:'center'}}><div style={{fontSize:'0.85rem',fontWeight:700,color:x.p>=80?'#22C55E':x.p>=60?'#FFE66D':'#FF6B6B'}}>{x.p}%</div><div style={{fontSize:'0.52rem',color:'#5A6580'}}>{new Date(x.d).toLocaleDateString()}</div></div>)}</div></div>}
        {s.feynH.length>0&&<div style={Cs}><h3 style={{fontSize:'0.82rem',marginBottom:'0.5rem',color:'#FF6B6B'}}>Feynman Scores</h3><div style={{display:'flex',gap:'0.3rem',flexWrap:'wrap'}}>{s.feynH.slice(-10).map((x,i)=><div key={i} style={{background:'#1E2536',borderRadius:5,padding:'0.25rem 0.45rem',textAlign:'center'}}><div style={{fontSize:'0.85rem',fontWeight:700,color:x.score>=8?'#22C55E':x.score>=6?'#FFE66D':'#FF6B6B'}}>{x.score}/10</div><div style={{fontSize:'0.52rem',color:'#5A6580'}}>{x.topic.slice(0,12)}</div></div>)}</div></div>}
        {s.mockIntH.length>0&&<div style={Cs}><h3 style={{fontSize:'0.82rem',marginBottom:'0.5rem',color:'#22C55E'}}>Mock Interview Scores</h3><div style={{display:'flex',gap:'0.3rem',flexWrap:'wrap'}}>{s.mockIntH.slice(-10).map((x,i)=><div key={i} style={{background:'#1E2536',borderRadius:5,padding:'0.25rem 0.45rem',textAlign:'center'}}><div style={{fontSize:'0.85rem',fontWeight:700,color:x.score>=8?'#22C55E':x.score>=6?'#FFE66D':'#FF6B6B'}}>{x.score}/10</div><div style={{fontSize:'0.52rem',color:'#5A6580'}}>{x.level}</div></div>)}</div></div>}
      </div>
    </div>}

    {/* ═══════ COURSE ═══════ */}
    {s.tab==="course"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.2rem'}}>Course Modules</h1>
      <p style={{color:'#8892A8',fontSize:'0.82rem',marginBottom:'1.25rem'}}>Based on Stokes, Wingate & Andrews + regulatory sources. Click lessons to expand.</p>
      {MODULES.map(m=><div key={m.id} style={{marginBottom:'1.25rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.5rem'}}>
          <span style={{fontSize:'1.1rem'}}>{m.i}</span>
          <div><h2 style={{fontSize:'1.02rem',fontFamily:"'DM Serif Display',serif",margin:0}}>{m.t}</h2>
          <div style={{display:'flex',gap:'0.5rem',fontSize:'0.67rem',color:'#5A6580',flexWrap:'wrap'}}><span style={{color:m.c}}>{m.lv}</span><span>⏱~{m.h}h</span><span>📖 {m.br.join(', ')}</span></div></div>
        </div>
        {m.ls.map(l=>{const ic=s.done.includes(l.id);const io=xL===l.id;return<div key={l.id} style={{marginLeft:'1rem',marginBottom:'0.3rem'}}>
          <div onClick={()=>togL(l.id)} style={{background:io?'#1A2030':'#141820',border:`1px solid ${io?m.c:'#2A3348'}`,borderRadius:io?'8px 8px 0 0':8,padding:'0.55rem 0.8rem',cursor:'pointer',display:'flex',alignItems:'center',gap:'0.4rem',transition:'all 0.15s'}}>
            <span style={{color:ic?'#22C55E':'#5A6580',fontSize:'0.8rem'}}>{ic?'✓':'○'}</span>
            <span style={{fontSize:'0.84rem',fontWeight:io?600:400,flex:1}}>{l.t}</span>
            <span style={{fontSize:'0.7rem',color:'#5A6580'}}>{io?'▾':'▸'}</span>
          </div>
          {io&&<div style={{background:'#141820',border:'1px solid #2A3348',borderTop:'none',borderRadius:'0 0 8px 8px',padding:'1rem',fontSize:'0.82rem',lineHeight:1.75,color:'#C8CDD8',whiteSpace:'pre-wrap'}}>{l.ct}</div>}
        </div>;})}
      </div>)}
    </div>}

    {/* ═══════ SIMULATORS ═══════ */}
    {s.tab==="sims"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.2rem'}}>Platform Simulators</h1>
      <p style={{color:'#8892A8',fontSize:'0.82rem',marginBottom:'1.25rem'}}>AI-powered interactive scenarios for LIMS, KNEAT, SCADA/PLC, SAP, MES, ValGenesis.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'0.75rem'}}>
        {SIMULATORS.map(sim=><div key={sim.id} style={C}>
          <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.75rem'}}><span style={{fontSize:'1.3rem'}}>{sim.i}</span><h3 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif"}}>{sim.n}</h3><span style={{marginLeft:'auto',fontSize:'0.67rem',color:'#5A6580'}}>{sim.sc.length} scenarios</span></div>
          {sim.sc.map(sc=>{const k=`${sim.id}-${sc.id}`;const act=sA===k;const lc=sc.l==='Basic'?'#22C55E':sc.l==='Mid'?'#FFE66D':sc.l==='Advanced'?'#FB923C':'#FF6B6B';
          return<div key={sc.id} style={{marginBottom:'0.3rem'}}>
            <div onClick={()=>{setSA(act?null:k);setAR("");}} style={{background:act?'#1A2030':'#1E2536',border:`1px solid ${act?sim.c:'#2A3348'}`,borderRadius:act?'8px 8px 0 0':8,padding:'0.5rem 0.65rem',cursor:'pointer',fontSize:'0.8rem',transition:'all 0.15s'}}>
              <span style={{fontSize:'0.58rem',color:lc,background:`${lc}22`,padding:'0.08rem 0.3rem',borderRadius:3,fontWeight:600,marginRight:'0.3rem'}}>{sc.l}</span>{sc.t}
            </div>
            {act&&<div style={{background:'#141820',border:'1px solid #2A3348',borderTop:'none',borderRadius:'0 0 8px 8px',padding:'0.75rem'}}>
              <p style={{fontSize:'0.78rem',color:'#8892A8',marginBottom:'0.5rem'}}>{sc.d}</p>
              <button onClick={async()=>{const r=await callAI(`You are simulating a ${sim.n} system for CSV training at an Irish pharmaceutical company.\n\nScenario: "${sc.t}" (Level: ${sc.l})\nDescription: ${sc.d}\n\nProvide a realistic, hands-on exercise:\n1. BACKGROUND — Current system state, company context (Irish pharma site)\n2. YOUR TASK — Specific step-by-step instructions to complete\n3. WHAT TO DOCUMENT — Required documentation outputs\n4. EXPECTED OUTCOMES — What success looks like\n5. COMMON MISTAKES — What CSV engineers typically get wrong\n6. REGULATORY REFS — Relevant Part 11/Annex 11/GAMP 5 requirements\n\nMake this practical and realistic, referencing Irish pharma context where relevant.`);if(r)u({simH:[...s.simH,{d:new Date().toISOString(),sim:sim.n,sc:sc.t}]});}} style={B(sim.c)}>{aL?'⏳ Generating...':'▶ Launch Scenario'}</button>
              {aR&&act&&<div style={{marginTop:'0.6rem',background:'#1E2536',borderRadius:8,padding:'0.85rem',fontSize:'0.8rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:450,overflow:'auto'}}>{aR}</div>}
            </div>}
          </div>;})}
        </div>)}
      </div>
    </div>}

    {/* ═══════ INTERVIEW ═══════ */}
    {s.tab==="interview"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.2rem'}}>Interview Preparation</h1>
      <p style={{color:'#8892A8',fontSize:'0.82rem',marginBottom:'1rem'}}>Question bank + AI-powered mock interview mode with scoring.</p>

      {/* Mock Interview Mode */}
      <div style={{...C,marginBottom:'1.5rem',borderColor:mockMode?'#22C55E':'#2A3348'}}>
        <h3 style={{fontSize:'0.95rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.4rem'}}>🎤 AI Mock Interview</h3>
        <p style={{fontSize:'0.78rem',color:'#8892A8',marginBottom:'0.75rem'}}>Practice answering interview questions out loud (type your answer). AI scores you like a real interviewer.</p>

        {!mockMode ? (
          <div style={{display:'flex',gap:'0.5rem'}}>
            <button onClick={()=>startMock('entry')} style={B('#4ECDC4')}>🟢 Entry Level</button>
            <button onClick={()=>startMock('mid')} style={B('#A78BFA')}>🟣 Mid Level</button>
          </div>
        ) : mockQ ? (
          <div>
            <div style={{background:'#1E2536',borderRadius:8,padding:'1rem',marginBottom:'0.75rem'}}>
              <div style={{fontSize:'0.65rem',color:mockLv==='entry'?'#4ECDC4':'#A78BFA',textTransform:'uppercase',fontWeight:600,marginBottom:'0.3rem'}}>{mockLv} level — {mockQ.c}</div>
              <div style={{fontSize:'1rem',fontWeight:600,lineHeight:1.5}}>"{mockQ.q}"</div>
            </div>
            <textarea value={mockAns} onChange={e=>setMockAns(e.target.value)} placeholder="Type your answer as you would say it in an interview..." style={{...inp,minHeight:100,resize:'vertical',marginBottom:'0.5rem'}}/>
            <div style={{display:'flex',gap:'0.5rem'}}>
              <button onClick={submitMock} style={B('#22C55E')}>{aL?'⏳ Scoring...':'📝 Submit Answer'}</button>
              <button onClick={()=>{setMockMode(false);setMockQ(null);setAR("");}} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8'}}>Exit Mock</button>
              <button onClick={()=>startMock(mockLv)} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8'}}>Next Question</button>
            </div>
            {aR&&<div style={{marginTop:'0.75rem',background:'#1E2536',borderRadius:8,padding:'1rem',fontSize:'0.82rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:400,overflow:'auto',borderLeft:'3px solid #22C55E'}}>{aR}</div>}
          </div>
        ) : null}
      </div>

      {/* Question Bank */}
      {["entry","mid"].map(lv=><div key={lv} style={{marginBottom:'1.5rem'}}>
        <h2 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.6rem',color:lv==='entry'?'#4ECDC4':'#A78BFA'}}>{lv==='entry'?'🟢 Entry Level':'🟣 Mid Level'} — {INTERVIEW_DATA[lv].length} Questions</h2>
        {INTERVIEW_DATA[lv].map((x,i)=>{const k=`${lv}-${i}`;const op=xI===k;return<div key={k} style={{marginBottom:'0.3rem'}}>
          <div onClick={()=>setXI(op?null:k)} style={{background:'#141820',border:'1px solid #2A3348',borderRadius:op?'8px 8px 0 0':8,padding:'0.55rem 0.8rem',cursor:'pointer',display:'flex',gap:'0.3rem',alignItems:'flex-start'}}>
            <span style={{color:'#5A6580',fontSize:'0.7rem',marginTop:'0.15rem'}}>{op?'▾':'▸'}</span>
            <div style={{flex:1}}><div style={{fontSize:'0.84rem',fontWeight:500}}>{x.q}</div><span style={{fontSize:'0.58rem',color:lv==='entry'?'#4ECDC4':'#A78BFA',background:lv==='entry'?'rgba(78,205,196,0.1)':'rgba(167,139,250,0.1)',padding:'0.08rem 0.3rem',borderRadius:3}}>{x.c}</span></div>
          </div>
          {op&&<div style={{background:'#1A2030',border:'1px solid #2A3348',borderTop:'none',borderRadius:'0 0 8px 8px',padding:'0.85rem',fontSize:'0.8rem',lineHeight:1.7,color:'#C8CDD8'}}>
            <div style={{color:'#4ECDC4',fontSize:'0.65rem',fontWeight:600,marginBottom:'0.35rem',textTransform:'uppercase',letterSpacing:'0.04em'}}>Model Answer:</div>{x.a}
          </div>}
        </div>;})}
      </div>)}
    </div>}

    {/* ═══════ JOBS ═══════ */}
    {s.tab==="jobs"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.75rem'}}>🇮🇪 Ireland CSV Job Tracker</h1>
      {!s.cfg.apiKey&&<div style={{background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.3)',borderRadius:8,padding:'0.65rem',fontSize:'0.8rem',color:'#FF6B6B',marginBottom:'0.75rem'}}>⚠️ Set your OpenRouter API key in Settings to enable job search.</div>}
      <button onClick={()=>callAI(`List 10-12 current Computer System Validation and Validation Engineer job openings in Ireland for March 2026.\n\nFor each job provide:\n- Job Title\n- Company\n- Location in Ireland\n- Level (Entry/Mid/Senior)\n- Key Requirements (mention systems: KNEAT, ValGenesis, SAP, LIMS, SCADA, MES where relevant)\n- Estimated Salary Range (€)\n\nInclude roles from: Pfizer, Lilly, MSD, J&J, AbbVie, Alexion, Regeneron, Takeda, BMS, Amgen, plus contract firms like PharmaLex, DPS Group, PM Group, Jacobs, Accenture.\n\nBase this on the typical Irish pharmaceutical job market.`,"You are an Irish pharmaceutical recruitment specialist with deep knowledge of the CSV job market.")} style={B()}>{aL?'⏳ Searching...':'🔍 Search CSV Jobs in Ireland'}</button>
      {aR&&s.tab==="jobs"&&<div style={{...C,marginTop:'0.75rem',fontSize:'0.82rem',lineHeight:1.75,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:600,overflow:'auto'}}>{aR}</div>}
    </div>}

    {/* ═══════ TEST CENTER ═══════ */}
    {s.tab==="test"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.2rem'}}>Test Center</h1>
      <p style={{color:'#8892A8',fontSize:'0.82rem',marginBottom:'1rem'}}>{QUIZ_BANK.length} quiz questions + Feynman technique game with persistent scoring.</p>

      {!cq?<div>
        <h3 style={{fontSize:'0.9rem',marginBottom:'0.6rem'}}>📝 Quizzes</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'0.5rem',marginBottom:'1.5rem'}}>
          <div onClick={()=>startQ()} style={{...Cs,cursor:'pointer',transition:'border-color 0.15s'}}><div style={{fontSize:'1rem'}}>🎲</div><div style={{fontSize:'0.85rem',fontWeight:600}}>Random (10 Qs)</div><div style={{fontSize:'0.68rem',color:'#8892A8'}}>From all {QUIZ_BANK.length} questions</div></div>
          {MODULES.filter(m=>QUIZ_BANK.some(q=>q.m===m.id)).slice(0,6).map(m=><div key={m.id} onClick={()=>startQ(m.id)} style={{...Cs,cursor:'pointer'}}><div style={{fontSize:'1rem'}}>{m.i}</div><div style={{fontSize:'0.85rem',fontWeight:600}}>{m.t}</div><div style={{fontSize:'0.68rem',color:'#8892A8'}}>{QUIZ_BANK.filter(q=>q.m===m.id).length} questions</div></div>)}
        </div>

        {/* Feynman */}
        <div style={C}>
          <h3 style={{fontSize:'0.95rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.35rem'}}>🧠 Feynman Technique Game</h3>
          <p style={{fontSize:'0.78rem',color:'#8892A8',marginBottom:'0.6rem'}}>Explain a concept simply. AI scores accuracy, completeness, clarity (1-10). All scores saved to dashboard.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.25rem',marginBottom:'0.6rem'}}>
            {FEYNMAN_TOPICS.map(t=><button key={t} onClick={()=>{setFT(t);setAR("");setFI("");}} style={{background:fT===t?'rgba(78,205,196,0.2)':'#1E2536',border:`1px solid ${fT===t?'#4ECDC4':'#2A3348'}`,color:fT===t?'#4ECDC4':'#8892A8',padding:'0.2rem 0.45rem',borderRadius:4,cursor:'pointer',fontSize:'0.68rem',fontFamily:'inherit',transition:'all 0.15s'}}>{t}</button>)}
          </div>
          {fT&&<div>
            <div style={{fontSize:'0.8rem',marginBottom:'0.3rem',color:'#4ECDC4'}}>Explain "<strong>{fT}</strong>" as if teaching a beginner:</div>
            <textarea value={fI} onChange={e=>setFI(e.target.value)} placeholder="Type your explanation here..." style={{...inp,minHeight:100,resize:'vertical'}}/>
            <button onClick={subFeyn} style={{...B(),marginTop:'0.35rem'}}>{aL?'⏳ AI is scoring...':'📝 Submit for Scoring'}</button>
            {aR&&<div style={{marginTop:'0.6rem',background:'#1E2536',borderRadius:8,padding:'0.85rem',fontSize:'0.82rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:400,overflow:'auto',borderLeft:'3px solid #FF6B6B'}}>{aR}</div>}
          </div>}
        </div>
      </div>

      : qi>=cq.length ?
        <div style={{...C,textAlign:'center',maxWidth:450,margin:'0 auto',padding:'1.75rem'}}>
          <div style={{fontSize:'2.2rem',fontFamily:"'DM Serif Display',serif",color:qs/cq.length>=0.8?'#22C55E':qs/cq.length>=0.6?'#FFE66D':'#FF6B6B'}}>{qs}/{cq.length}</div>
          <div style={{fontSize:'1rem',color:'#8892A8',margin:'0.3rem 0 1rem'}}>{Math.round((qs/cq.length)*100)}% — {qs/cq.length>=0.8?"Excellent!":qs/cq.length>=0.6?"Good foundation.":"Keep studying!"}</div>
          <button onClick={()=>setCq(null)} style={B()}>Back to Test Center</button>
        </div>

      :
        <div style={{...C,maxWidth:650,padding:'1.5rem'}}>
          <div style={{fontSize:'0.7rem',color:'#4ECDC4',fontFamily:'monospace',marginBottom:'0.3rem'}}>Question {qi+1} of {cq.length}</div>
          <div style={{fontSize:'1rem',fontWeight:600,marginBottom:'1rem',lineHeight:1.5}}>{cq[qi].q}</div>
          <div style={{display:'grid',gap:'0.35rem'}}>
            {cq[qi].o.map((opt,i)=>{
              let bg='#1E2536',bd='#2A3348',cl='#C8CDD8';
              if(qa){if(i===cq[qi].a){bg='rgba(34,197,94,0.1)';bd='#22C55E';cl='#22C55E';}else if(i===sa&&i!==cq[qi].a){bg='rgba(255,107,107,0.1)';bd='#FF6B6B';cl='#FF6B6B';}}
              return<div key={i} onClick={()=>ansQ(i)} style={{padding:'0.55rem 0.8rem',background:bg,border:`1px solid ${bd}`,borderRadius:8,cursor:qa?'default':'pointer',fontSize:'0.84rem',color:cl,transition:'all 0.15s'}}>{String.fromCharCode(65+i)}. {opt}</div>;
            })}
          </div>
          {qa&&<div style={{marginTop:'0.6rem',padding:'0.75rem',background:'#1E2536',borderRadius:8,borderLeft:'3px solid #4ECDC4',fontSize:'0.8rem',color:'#8892A8',lineHeight:1.6}}>{cq[qi].e}</div>}
          {qa&&<button onClick={nxtQ} style={{...B(),marginTop:'0.6rem'}}>{qi+1>=cq.length?'See Results':'Next Question →'}</button>}
        </div>
      }
    </div>}

    {/* ═══════ FLOWCHARTS ═══════ */}
    {s.tab==="flow"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.2rem'}}>Process Flowcharts</h1>
      <p style={{color:'#8892A8',fontSize:'0.82rem',marginBottom:'1rem'}}>Key CSV workflows every engineer must know. Click to view.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'0.6rem',marginBottom:'1rem'}}>
        {FLOWCHARTS.map(fc=><div key={fc.id} onClick={()=>setFS(fS===fc.id?null:fc.id)} style={{...Cs,cursor:'pointer',borderColor:fS===fc.id?'#4ECDC4':'#2A3348',transition:'border-color 0.15s'}}>
          <div style={{fontSize:'0.85rem',fontWeight:600}}>{fc.t}</div>
          <div style={{fontSize:'0.67rem',color:'#5A6580'}}>{fc.n.length} steps</div>
        </div>)}
      </div>
      {fS&&<div style={C}><h3 style={{fontSize:'0.95rem',marginBottom:'0.6rem',fontFamily:"'DM Serif Display',serif"}}>{FLOWCHARTS.find(f=>f.id===fS).t}</h3>{renderFC(FLOWCHARTS.find(f=>f.id===fS))}</div>}
    </div>}

    {/* ═══════ SETTINGS ═══════ */}
    {s.tab==="cfg"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'1rem'}}>Settings</h1>
      <div style={{...C,maxWidth:500,marginBottom:'1rem'}}>
        <h3 style={{fontSize:'0.9rem',marginBottom:'0.6rem'}}>🔑 OpenRouter API Configuration</h3>
        <div style={{marginBottom:'0.6rem'}}>
          <label style={{fontSize:'0.72rem',color:'#8892A8',display:'block',marginBottom:'0.15rem'}}>API Key</label>
          <input type="password" value={s.cfg.apiKey} placeholder="sk-or-v1-..." onChange={e=>u({cfg:{...s.cfg,apiKey:e.target.value}})} style={inp}/>
        </div>
        <div style={{marginBottom:'0.6rem'}}>
          <label style={{fontSize:'0.72rem',color:'#8892A8',display:'block',marginBottom:'0.15rem'}}>Model</label>
          <input type="text" value={s.cfg.model} placeholder="minimax/MiniMax-M1" onChange={e=>u({cfg:{...s.cfg,model:e.target.value}})} style={inp}/>
          <div style={{fontSize:'0.65rem',color:'#5A6580',marginTop:'0.15rem'}}>Default: minimax/MiniMax-M1 — Change to any OpenRouter-supported model</div>
        </div>
        <div style={{fontSize:'0.75rem',color:'#8892A8',padding:'0.55rem',background:'#1E2536',borderRadius:6}}>ℹ️ Your API key is stored locally in your browser. It is never sent anywhere except OpenRouter's API endpoint.</div>
      </div>
      <div style={{...C,maxWidth:500}}>
        <h3 style={{fontSize:'0.9rem',marginBottom:'0.6rem'}}>🗑️ Data Management</h3>
        <p style={{fontSize:'0.78rem',color:'#8892A8',marginBottom:'0.5rem'}}>All progress is saved automatically in your browser. Only clear if you want to start completely fresh.</p>
        <div style={{fontSize:'0.72rem',color:'#5A6580',marginBottom:'0.6rem',background:'#1E2536',padding:'0.5rem',borderRadius:6}}>
          📊 Lessons completed: {s.done.length} | Quizzes: {s.quizH.length} | Feynman: {s.feynH.length} | Mock Interviews: {s.mockIntH.length} | Simulators: {s.simH.length}
        </div>
        <button onClick={clearD} style={{background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.3)',color:'#FF6B6B',padding:'0.45rem 1rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.75rem',fontFamily:'inherit'}}>⚠️ Reset All Data</button>
      </div>
    </div>}

    </div>
  </div>);
}
