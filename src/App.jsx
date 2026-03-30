import { useState, useEffect, useCallback, useMemo } from "react";
import { store } from "./store.js";
import { MODULES, QUIZ_BANK } from "./data/content.js";
import { INTERVIEW_DATA, GLOSSARY, RISK_FACTORS, RISK_BANDS, FLOWCHARTS, FEYNMAN_TOPICS, STUDY_PLAN, RESOURCES } from "./data/tools.js";
import LIMSSimulator from "./simulators/LIMSSimulator.jsx";

const SK = "csv-v6";
const DS = {tab:"dashboard",done:[],quizH:[],feynH:[],simH:[],mockIntH:[],notes:{},planTasks:{},wrongQs:[],cfg:{apiKey:"",model:"minimax/MiniMax-M1"}};

export default function App(){
  const [s,setS]=useState(DS);
  const [ld,setLd]=useState(false);
  const [xL,setXL]=useState(null);
  const [cq,setCq]=useState(null);
  const [qi,setQi]=useState(0);
  const [qs,setQs]=useState(0);
  const [qa,setQa]=useState(false);
  const [selA,setSelA]=useState(null);
  const [xI,setXI]=useState(null);
  const [aR,setAR]=useState("");
  const [aL,setAL]=useState(false);
  const [fT,setFT]=useState("");
  const [fI,setFI]=useState("");
  const [fS,setFS]=useState(null);
  const [mockMode,setMockMode]=useState(false);
  const [mockQ,setMockQ]=useState(null);
  const [mockAns,setMockAns]=useState("");
  const [mockLv,setMockLv]=useState("entry");
  const [noteEdit,setNoteEdit]=useState(null);
  const [noteText,setNoteText]=useState("");
  const [riskSel,setRiskSel]=useState({});
  const [glossF,setGlossF]=useState("");
  const [showExercise,setShowExercise]=useState(null);
  const [showAnswer,setShowAnswer]=useState(null);

  useEffect(()=>{const d=store.get(SK);if(d)setS(p=>({...DS,...p,...d}));setLd(true);},[]);
  useEffect(()=>{if(ld)store.set(SK,s);},[s,ld]);

  const u=useCallback(up=>setS(p=>({...p,...up})),[]);
  const tL=MODULES.reduce((a,m)=>a+(m.lessons||[]).length,0);
  const pP=tL>0?Math.round((s.done.length/tL)*100):0;

  const togL=id=>{if(!s.done.includes(id))u({done:[...s.done,id]});setXL(xL===id?null:id);setShowExercise(null);setShowAnswer(null);};

  const callAI=async(prompt,sys="You are a CSV expert tutor for pharma in Ireland.")=>{
    if(!s.cfg.apiKey){setAR("⚠️ Set API key in Settings.");return null;}
    setAL(true);setAR("");
    try{const r=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${s.cfg.apiKey}`},body:JSON.stringify({model:s.cfg.model||"minimax/MiniMax-M1",messages:[{role:"system",content:sys},{role:"user",content:prompt}],max_tokens:2500})});const d=await r.json();const t=d.choices?.[0]?.message?.content||"No response.";setAR(t);setAL(false);return t;}catch(e){setAR("Error: "+e.message);setAL(false);return null;}
  };

  const startQ=(mid=null,retryWrong=false)=>{let p=retryWrong?QUIZ_BANK.filter(q=>s.wrongQs.includes(q.id)):mid?QUIZ_BANK.filter(q=>q.m===mid):[...QUIZ_BANK];p.sort(()=>Math.random()-0.5);setCq(p.slice(0,Math.min(10,p.length)));setQi(0);setQs(0);setQa(false);setSelA(null);};
  const ansQ=i=>{if(qa)return;setSelA(i);setQa(true);if(i===cq[qi].a){setQs(v=>v+1);if(cq[qi].id&&s.wrongQs.includes(cq[qi].id))u({wrongQs:s.wrongQs.filter(x=>x!==cq[qi].id)});}else{if(cq[qi].id&&!s.wrongQs.includes(cq[qi].id))u({wrongQs:[...s.wrongQs,cq[qi].id]});}};
  const nxtQ=()=>{if(qi+1>=cq.length){u({quizH:[...s.quizH,{d:new Date().toISOString(),s:qs,t:cq.length,p:Math.round((qs/cq.length)*100)}]});setQi(qi+1);}else{setQi(qi+1);setQa(false);setSelA(null);}};

  const startMock=lv=>{const pool=INTERVIEW_DATA[lv];setMockQ(pool[Math.floor(Math.random()*pool.length)]);setMockAns("");setMockLv(lv);setMockMode(true);setAR("");};
  const submitMock=async()=>{if(!mockAns.trim())return;await callAI(`Mock interview: ${mockLv} CSV Engineer Ireland.\nQ: "${mockQ.q}" (${mockQ.c})\nAnswer: "${mockAns}"\nModel: "${mockQ.a}"\nScore 1-10. STRENGTHS, GAPS, IMPROVEMENT.`);};

  const togglePlan=(wk,task)=>{u({planTasks:{...s.planTasks,[`${wk}::${task}`]:!s.planTasks[`${wk}::${task}`]}});};
  const saveNote=lid=>{u({notes:{...s.notes,[lid]:noteText}});setNoteEdit(null);};
  const riskScore=useMemo(()=>Object.values(riskSel).reduce((a,v)=>a+v,0),[riskSel]);
  const riskBand=RISK_BANDS.find(b=>riskScore>=b.min&&riskScore<=b.max)||RISK_BANDS[0];

  const exportP=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({...s,date:new Date().toISOString(),progress:`${pP}%`},null,2)]));a.download=`csv-progress-${new Date().toISOString().slice(0,10)}.json`;a.click();};
  const clearD=()=>{if(confirm("Reset ALL progress?")){setS(DS);store.del(SK);}};

  if(!ld)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0B0E13',color:'#4ECDC4',fontFamily:'system-ui'}}>🏛 Loading CSV Academy...</div>;

  const C={background:'#141820',border:'1px solid #252D3D',borderRadius:10,padding:'1.25rem'};
  const Cs={...C,padding:'0.85rem'};
  const B=(bg='#4ECDC4')=>({background:bg,color:'#0B0E13',border:'none',padding:'0.45rem 1rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.78rem',fontFamily:'inherit'});
  const inp={width:'100%',background:'#1C2333',border:'1px solid #252D3D',borderRadius:6,padding:'0.4rem 0.6rem',color:'#E8ECF4',fontSize:'0.8rem',fontFamily:'inherit'};
  const renderFC=fc=>{const ns=fc.n;const W=580;const H=ns.length*46+16;return<svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:500,background:'#0B0E13',borderRadius:8,border:'1px solid #1C2333'}}><defs><marker id="a" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#4ECDC4"/></marker></defs>{ns.map((_,i)=>i<ns.length-1?<line key={`e${i}`} x1={W/2} y1={i*46+34} x2={W/2} y2={(i+1)*46+6} stroke="#252D3D" strokeWidth={1.5} markerEnd="url(#a)"/>:null)}{ns.map((n,i)=><g key={i}><rect x={W/2-100} y={i*46+8} width={200} height={24} rx={5} fill="#1C2333" stroke={i===0?"#4ECDC4":i===ns.length-1?"#22C55E":"#252D3D"} strokeWidth={i===0||i===ns.length-1?1.5:0.5}/><text x={W/2} y={i*46+24} textAnchor="middle" fill="#E8ECF4" fontSize={9.5} fontFamily="system-ui">{n}</text></g>)}</svg>;};

  const tabs=[
    {id:"dashboard",l:"📊 Dash"},{id:"course",l:"📚 Course"},{id:"lims-sim",l:"🔬 LIMS Sim"},
    {id:"plan",l:"📅 Plan"},{id:"test",l:"🧠 Tests"},{id:"interview",l:"🎯 Interview"},
    {id:"risk",l:"🎚️ Risk"},{id:"glossary",l:"📖 Glossary"},{id:"flow",l:"🔀 Flows"},
    {id:"jobs",l:"🇮🇪 Jobs"},{id:"resources",l:"📎 Refs"},{id:"cfg",l:"⚙️"}
  ];

  return<div style={{minHeight:'100vh',background:'#0B0E13',color:'#E8ECF4',fontFamily:"'Source Sans 3',system-ui,sans-serif"}}>
    <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(11,14,19,0.92)',backdropFilter:'blur(20px)',borderBottom:'1px solid #252D3D',display:'flex',alignItems:'center',padding:'0 0.4rem',overflowX:'auto'}}>
      <div style={{fontFamily:"'DM Serif Display',Georgia,serif",fontSize:'0.95rem',padding:'0.6rem 0.35rem',marginRight:'0.2rem',color:'#4ECDC4',whiteSpace:'nowrap',cursor:'pointer'}} onClick={()=>u({tab:'dashboard'})}>CSV Academy</div>
      {tabs.map(t=><button key={t.id} onClick={()=>{u({tab:t.id});if(!['jobs','lims-sim'].includes(t.id))setAR("");}} style={{background:s.tab===t.id?'rgba(78,205,196,0.12)':'transparent',border:'none',color:s.tab===t.id?'#4ECDC4':'#8892A8',padding:'0.45rem 0.4rem',borderRadius:5,cursor:'pointer',fontSize:'0.65rem',fontWeight:500,whiteSpace:'nowrap',fontFamily:'inherit'}}>{t.l}</button>)}
    </nav>
    <div style={{maxWidth:1200,margin:'0 auto',padding:'1rem'}}>

    {/* ═══ DASHBOARD ═══ */}
    {s.tab==="dashboard"&&<div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
        <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif"}}>Dashboard</h1>
        <button onClick={exportP} style={{...B('transparent'),border:'1px solid #252D3D',color:'#8892A8',fontSize:'0.65rem'}}>📥 Export</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:'0.4rem',marginBottom:'0.75rem'}}>
        {[{l:"Course",v:`${pP}%`,c:'#4ECDC4'},{l:"Quizzes",v:s.quizH.length,c:'#A78BFA'},{l:"Weak Qs",v:s.wrongQs.length,c:s.wrongQs.length?'#FF6B6B':'#22C55E'},{l:"Mock Int",v:s.mockIntH.length,c:'#22C55E'},{l:"Sims",v:s.simH.length,c:'#38BDF8'}].map((x,i)=>
          <div key={i} style={{...Cs,padding:'0.7rem'}}><div style={{fontSize:'0.55rem',color:'#5A6580',textTransform:'uppercase',letterSpacing:'0.04em'}}>{x.l}</div><div style={{fontSize:'1.3rem',fontFamily:"'DM Serif Display',serif",color:x.c}}>{x.v}</div></div>
        )}
      </div>
      <div style={{...Cs,marginBottom:'0.75rem'}}><div style={{display:'flex',justifyContent:'space-between',fontSize:'0.78rem',marginBottom:'0.2rem'}}><span style={{fontWeight:600}}>Course</span><span style={{color:'#4ECDC4'}}>{pP}%</span></div><div style={{height:5,background:'#1C2333',borderRadius:3}}><div style={{height:'100%',width:`${pP}%`,background:'linear-gradient(90deg,#4ECDC4,#38BDF8)',borderRadius:3,transition:'width 0.5s'}}/></div></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'0.35rem',marginBottom:'0.75rem'}}>
        {MODULES.map(m=>{const ls=m.lessons||[];const dn=ls.filter(l=>s.done.includes(l.id)).length;const pc=ls.length?Math.round((dn/ls.length)*100):0;return<div key={m.id} style={{...Cs,padding:'0.6rem',cursor:'pointer'}} onClick={()=>u({tab:'course'})}>
          <div style={{display:'flex',alignItems:'center',gap:'0.3rem',marginBottom:'0.2rem'}}><span style={{fontSize:'0.85rem'}}>{m.icon}</span><span style={{fontSize:'0.72rem',fontWeight:600,flex:1}}>{m.title}</span><span style={{fontSize:'0.6rem',color:pc===100?'#22C55E':'#8892A8'}}>{pc===100?'✅':pc+'%'}</span></div>
          <div style={{height:3,background:'#1C2333',borderRadius:2}}><div style={{height:'100%',width:`${pc}%`,background:m.color,borderRadius:2}}/></div>
        </div>;})}
      </div>
      {s.quizH.length>0&&<div style={Cs}><div style={{fontSize:'0.75rem',fontWeight:600,marginBottom:'0.3rem',color:'#A78BFA'}}>Quiz History</div><div style={{display:'flex',gap:'0.2rem',flexWrap:'wrap'}}>{s.quizH.slice(-12).map((x,i)=><div key={i} style={{background:'#1C2333',borderRadius:4,padding:'0.2rem 0.4rem'}}><span style={{fontSize:'0.8rem',fontWeight:700,color:x.p>=80?'#22C55E':x.p>=60?'#FFE66D':'#FF6B6B'}}>{x.p}%</span></div>)}</div></div>}
    </div>}

    {/* ═══ COURSE — Deep content with exercises ═══ */}
    {s.tab==="course"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.1rem'}}>Course Modules</h1>
      <p style={{color:'#8892A8',fontSize:'0.75rem',marginBottom:'1rem'}}>Deep content from Stokes, Wingate & Andrews. Each lesson includes exercises with model answers.</p>
      {MODULES.map(m=>{const ls=m.lessons||[];return<div key={m.id} style={{marginBottom:'1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.5rem'}}>
          <span style={{fontSize:'1rem'}}>{m.icon}</span>
          <div>
            <h2 style={{fontSize:'0.95rem',fontFamily:"'DM Serif Display',serif",margin:0}}>{m.title}</h2>
            <div style={{display:'flex',gap:'0.4rem',fontSize:'0.62rem',color:'#5A6580',flexWrap:'wrap'}}>
              <span style={{color:m.color}}>{m.level}</span>
              <span>⏱~{m.hours}h</span>
              {m.bookRefs&&<span>📖 {m.bookRefs.join(', ')}</span>}
            </div>
          </div>
        </div>
        {m.overview&&<div style={{marginLeft:'0.8rem',marginBottom:'0.5rem',fontSize:'0.78rem',color:'#8892A8',lineHeight:1.6,padding:'0.6rem',background:'#0F1218',borderRadius:8,borderLeft:`3px solid ${m.color}`}}>{m.overview}</div>}
        {ls.map(l=>{const ic=s.done.includes(l.id);const io=xL===l.id;return<div key={l.id} style={{marginLeft:'0.8rem',marginBottom:'0.3rem'}}>
          <div onClick={()=>togL(l.id)} style={{background:io?'#1A1F2E':'#141820',border:`1px solid ${io?m.color:'#252D3D'}`,borderRadius:io?'8px 8px 0 0':8,padding:'0.5rem 0.7rem',cursor:'pointer',display:'flex',alignItems:'center',gap:'0.3rem'}}>
            <span style={{color:ic?'#22C55E':'#5A6580',fontSize:'0.75rem'}}>{ic?'✓':'○'}</span>
            <div style={{flex:1}}>
              <span style={{fontSize:'0.8rem',fontWeight:io?600:400}}>{l.title}</span>
              {l.duration&&<span style={{fontSize:'0.6rem',color:'#5A6580',marginLeft:'0.4rem'}}>{l.duration}</span>}
            </div>
            {s.notes[l.id]&&<span style={{fontSize:'0.55rem',color:'#FFE66D'}}>📝</span>}
            <span style={{fontSize:'0.65rem',color:'#5A6580'}}>{io?'▾':'▸'}</span>
          </div>
          {io&&<div style={{background:'#141820',border:'1px solid #252D3D',borderTop:'none',borderRadius:'0 0 8px 8px',padding:'1rem'}}>
            {/* Learning Objectives */}
            {l.objectives&&<div style={{marginBottom:'0.75rem',padding:'0.6rem',background:'#0F1218',borderRadius:6,borderLeft:`3px solid ${m.color}`}}>
              <div style={{fontSize:'0.7rem',fontWeight:600,color:m.color,marginBottom:'0.25rem'}}>🎯 Learning Objectives</div>
              <ul style={{fontSize:'0.75rem',color:'#8892A8',paddingLeft:'1rem',lineHeight:1.6,margin:0}}>{l.objectives.map((o,i)=><li key={i}>{o}</li>)}</ul>
            </div>}

            {/* Main Content */}
            <div style={{fontSize:'0.82rem',lineHeight:1.8,color:'#C8CDD8',whiteSpace:'pre-wrap',marginBottom:'0.75rem'}}>{l.content}</div>

            {/* Exercise */}
            {l.exercise&&<div style={{marginBottom:'0.75rem'}}>
              <div onClick={()=>setShowExercise(showExercise===l.id?null:l.id)} style={{background:'#1C2333',border:'1px solid #252D3D',borderRadius:8,padding:'0.7rem',cursor:'pointer'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.3rem'}}>
                  <span style={{fontSize:'0.85rem'}}>✍️</span>
                  <span style={{fontSize:'0.82rem',fontWeight:600}}>Exercise: {l.exercise.title}</span>
                  <span style={{marginLeft:'auto',fontSize:'0.65rem',color:'#5A6580'}}>{showExercise===l.id?'▾':'▸'}</span>
                </div>
              </div>
              {showExercise===l.id&&<div style={{background:'#1C2333',border:'1px solid #252D3D',borderTop:'none',borderRadius:'0 0 8px 8px',padding:'0.8rem'}}>
                <div style={{fontSize:'0.78rem',color:'#C8CDD8',whiteSpace:'pre-wrap',lineHeight:1.7,marginBottom:'0.6rem'}}>{l.exercise.instructions}</div>
                <div style={{display:'flex',gap:'0.3rem'}}>
                  <button onClick={()=>setShowAnswer(showAnswer===l.id?null:l.id)} style={B('#FFE66D')}>{showAnswer===l.id?'Hide':'Show'} Model Answer</button>
                </div>
                {showAnswer===l.id&&<div style={{marginTop:'0.5rem',padding:'0.7rem',background:'#0F1218',borderRadius:6,borderLeft:'3px solid #22C55E',fontSize:'0.78rem',color:'#C8CDD8',whiteSpace:'pre-wrap',lineHeight:1.7}}>{l.exercise.modelAnswer}</div>}
              </div>}
            </div>}

            {/* Self-Check */}
            {l.checkpoints&&<div style={{padding:'0.6rem',background:'#0F1218',borderRadius:6,marginBottom:'0.6rem'}}>
              <div style={{fontSize:'0.7rem',fontWeight:600,color:'#FFE66D',marginBottom:'0.25rem'}}>✅ Self-Check — Can you...</div>
              <ul style={{fontSize:'0.72rem',color:'#8892A8',paddingLeft:'1rem',lineHeight:1.6,margin:0}}>{l.checkpoints.map((c,i)=><li key={i}>{c}</li>)}</ul>
            </div>}

            {/* Key Terms */}
            {l.keyTerms&&<div style={{display:'flex',gap:'0.2rem',flexWrap:'wrap',marginBottom:'0.6rem'}}>
              {l.keyTerms.map((t,i)=><span key={i} style={{padding:'0.12rem 0.4rem',background:'rgba(78,205,196,0.1)',border:'1px solid rgba(78,205,196,0.2)',borderRadius:4,fontSize:'0.65rem',color:'#4ECDC4'}}>{t}</span>)}
            </div>}

            {/* Notes */}
            <div style={{borderTop:'1px solid #252D3D',paddingTop:'0.5rem'}}>
              {noteEdit===l.id?<div>
                <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Your notes..." style={{...inp,minHeight:50,resize:'vertical',marginBottom:'0.2rem'}}/>
                <div style={{display:'flex',gap:'0.2rem'}}><button onClick={()=>saveNote(l.id)} style={{...B(),fontSize:'0.68rem',padding:'0.25rem 0.6rem'}}>Save</button><button onClick={()=>setNoteEdit(null)} style={{...B('transparent'),border:'1px solid #252D3D',color:'#8892A8',fontSize:'0.68rem',padding:'0.25rem 0.6rem'}}>Cancel</button></div>
              </div>:<div>
                {s.notes[l.id]&&<div style={{fontSize:'0.72rem',color:'#FFE66D',background:'rgba(255,230,109,0.05)',padding:'0.4rem',borderRadius:5,marginBottom:'0.3rem',whiteSpace:'pre-wrap'}}>📝 {s.notes[l.id]}</div>}
                <button onClick={()=>{setNoteEdit(l.id);setNoteText(s.notes[l.id]||"");}} style={{fontSize:'0.65rem',color:'#8892A8',background:'#1C2333',border:'1px solid #252D3D',padding:'0.2rem 0.5rem',borderRadius:4,cursor:'pointer',fontFamily:'inherit'}}>{s.notes[l.id]?'✏️ Edit Note':'📝 Add Note'}</button>
              </div>}
            </div>
          </div>}
        </div>;})}
      </div>;})}
    </div>}

    {/* ═══ LIMS SIMULATOR ═══ */}
    {s.tab==="lims-sim"&&<LIMSSimulator onComplete={data=>u({simH:[...s.simH,{d:new Date().toISOString(),sim:'LIMS',...data}]})}/>}

    {/* ═══ STUDY PLAN ═══ */}
    {s.tab==="plan"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.75rem'}}>12-Week Study Plan</h1>
      {STUDY_PLAN.map((wk,wi)=>{const done=wk.tasks.filter(t=>s.planTasks[`${wk.wk}::${t}`]).length;const pc=Math.round((done/wk.tasks.length)*100);return<div key={wi} style={{...C,marginBottom:'0.5rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.25rem'}}><span style={{fontSize:'0.6rem',color:'#4ECDC4',fontFamily:'monospace',background:'rgba(78,205,196,0.1)',padding:'0.1rem 0.3rem',borderRadius:4}}>WK {wk.wk}</span><h3 style={{fontSize:'0.88rem',fontFamily:"'DM Serif Display',serif",flex:1}}>{wk.t}</h3><span style={{fontSize:'0.62rem',color:pc===100?'#22C55E':'#8892A8'}}>{pc}%</span></div>
        <p style={{fontSize:'0.72rem',color:'#8892A8',marginBottom:'0.35rem'}}>{wk.desc}</p>
        {wk.tasks.map((task,ti)=>{const k=`${wk.wk}::${task}`;return<div key={ti} onClick={()=>togglePlan(wk.wk,task)} style={{display:'flex',alignItems:'center',gap:'0.3rem',padding:'0.25rem 0.4rem',background:'#1C2333',borderRadius:5,cursor:'pointer',fontSize:'0.72rem',color:s.planTasks[k]?'#22C55E':'#C8CDD8',marginBottom:'0.12rem'}}><span>{s.planTasks[k]?'☑':'☐'}</span><span style={{textDecoration:s.planTasks[k]?'line-through':'none',opacity:s.planTasks[k]?0.5:1}}>{task}</span></div>;})}
      </div>;})}
    </div>}

    {/* ═══ TEST CENTER ═══ */}
    {s.tab==="test"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.6rem'}}>Test Center</h1>
      {!cq?<div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'0.35rem',marginBottom:'1rem'}}>
          <div onClick={()=>startQ()} style={{...Cs,cursor:'pointer'}}>🎲 <span style={{fontWeight:600}}>Random 10</span><div style={{fontSize:'0.62rem',color:'#8892A8'}}>{QUIZ_BANK.length} total</div></div>
          {s.wrongQs.length>0&&<div onClick={()=>startQ(null,true)} style={{...Cs,cursor:'pointer',borderColor:'#FF6B6B'}}>🔄 <span style={{fontWeight:600,color:'#FF6B6B'}}>Retry Wrong ({s.wrongQs.length})</span></div>}
          {MODULES.filter(m=>QUIZ_BANK.some(q=>q.m===m.id)).slice(0,5).map(m=><div key={m.id} onClick={()=>startQ(m.id)} style={{...Cs,cursor:'pointer'}}>{m.icon} <span style={{fontWeight:600}}>{m.title}</span></div>)}
        </div>
        {/* Feynman */}
        <div style={C}>
          <h3 style={{fontSize:'0.88rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.3rem'}}>🧠 Feynman Game</h3>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.18rem',marginBottom:'0.4rem'}}>{FEYNMAN_TOPICS.map(t=><button key={t} onClick={()=>{setFT(t);setAR("");setFI("");}} style={{background:fT===t?'rgba(78,205,196,0.15)':'#1C2333',border:`1px solid ${fT===t?'#4ECDC4':'#252D3D'}`,color:fT===t?'#4ECDC4':'#8892A8',padding:'0.15rem 0.35rem',borderRadius:4,cursor:'pointer',fontSize:'0.62rem',fontFamily:'inherit'}}>{t}</button>)}</div>
          {fT&&<div><textarea value={fI} onChange={e=>setFI(e.target.value)} placeholder={`Explain "${fT}"...`} style={{...inp,minHeight:80,resize:'vertical'}}/><button onClick={async()=>{if(!fI.trim())return;const r=await callAI(`Feynman technique. Learner explains "${fT}":\n"${fI}"\nScore 1-10: ACCURACY, COMPLETENESS, CLARITY. Format: Overall: X/10. Then feedback.`);if(r){const m=r.match(/(\d+)\s*\/\s*10/);u({feynH:[...s.feynH,{d:new Date().toISOString(),topic:fT,score:m?parseInt(m[1]):5}]});}}} style={{...B(),marginTop:'0.25rem'}}>{aL?'⏳':'📝 Score'}</button>{aR&&<div style={{marginTop:'0.4rem',background:'#1C2333',borderRadius:7,padding:'0.6rem',fontSize:'0.75rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:300,overflow:'auto',borderLeft:'3px solid #FF6B6B'}}>{aR}</div>}</div>}
        </div>
      </div>
      :qi>=cq.length?<div style={{...C,textAlign:'center',maxWidth:400,margin:'0 auto'}}><div style={{fontSize:'2rem',fontFamily:"'DM Serif Display',serif",color:qs/cq.length>=0.8?'#22C55E':qs/cq.length>=0.6?'#FFE66D':'#FF6B6B'}}>{qs}/{cq.length}</div><div style={{color:'#8892A8',margin:'0.25rem 0 0.7rem'}}>{Math.round((qs/cq.length)*100)}%</div><button onClick={()=>setCq(null)} style={B()}>Back</button></div>
      :<div style={{...C,maxWidth:600}}><div style={{fontSize:'0.65rem',color:'#4ECDC4',fontFamily:'monospace',marginBottom:'0.2rem'}}>Q {qi+1}/{cq.length}{s.wrongQs.includes(cq[qi].id)?' 🔄':''}</div><div style={{fontSize:'0.9rem',fontWeight:600,marginBottom:'0.7rem',lineHeight:1.5}}>{cq[qi].q}</div><div style={{display:'grid',gap:'0.25rem'}}>{cq[qi].o.map((opt,i)=>{let bg='#1C2333',bd='#252D3D',cl='#C8CDD8';if(qa){if(i===cq[qi].a){bg='rgba(34,197,94,0.1)';bd='#22C55E';cl='#22C55E';}else if(i===selA&&i!==cq[qi].a){bg='rgba(255,107,107,0.1)';bd='#FF6B6B';cl='#FF6B6B';}}return<div key={i} onClick={()=>ansQ(i)} style={{padding:'0.4rem 0.6rem',background:bg,border:`1px solid ${bd}`,borderRadius:7,cursor:qa?'default':'pointer',fontSize:'0.8rem',color:cl}}>{String.fromCharCode(65+i)}. {opt}</div>;})}</div>{qa&&<div style={{marginTop:'0.4rem',padding:'0.5rem',background:'#1C2333',borderRadius:7,borderLeft:'3px solid #4ECDC4',fontSize:'0.75rem',color:'#8892A8',lineHeight:1.5}}>{cq[qi].e}</div>}{qa&&<button onClick={nxtQ} style={{...B(),marginTop:'0.4rem'}}>{qi+1>=cq.length?'Results':'Next →'}</button>}</div>}
    </div>}

    {/* ═══ INTERVIEW ═══ */}
    {s.tab==="interview"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.5rem'}}>Interview Prep</h1>
      <div style={{...C,marginBottom:'1rem',borderColor:mockMode?'#22C55E':'#252D3D'}}>
        <h3 style={{fontSize:'0.85rem',marginBottom:'0.25rem'}}>🎤 AI Mock Interview</h3>
        {!mockMode?<div style={{display:'flex',gap:'0.3rem'}}><button onClick={()=>startMock('entry')} style={B('#4ECDC4')}>🟢 Entry</button><button onClick={()=>startMock('mid')} style={B('#A78BFA')}>🟣 Mid</button></div>
        :mockQ?<div>
          <div style={{background:'#1C2333',borderRadius:7,padding:'0.6rem',marginBottom:'0.4rem'}}><div style={{fontSize:'0.55rem',color:mockLv==='entry'?'#4ECDC4':'#A78BFA',textTransform:'uppercase',fontWeight:600}}>{mockLv} — {mockQ.c}</div><div style={{fontSize:'0.88rem',fontWeight:600,lineHeight:1.4,marginTop:'0.15rem'}}>"{mockQ.q}"</div></div>
          <textarea value={mockAns} onChange={e=>setMockAns(e.target.value)} placeholder="Your answer..." style={{...inp,minHeight:80,resize:'vertical',marginBottom:'0.3rem'}}/>
          <div style={{display:'flex',gap:'0.3rem'}}><button onClick={submitMock} style={B('#22C55E')}>{aL?'⏳':'Submit'}</button><button onClick={()=>{setMockMode(false);setAR("");}} style={{...B('transparent'),border:'1px solid #252D3D',color:'#8892A8'}}>Exit</button><button onClick={()=>startMock(mockLv)} style={{...B('transparent'),border:'1px solid #252D3D',color:'#8892A8'}}>Next</button></div>
          {aR&&<div style={{marginTop:'0.4rem',background:'#1C2333',borderRadius:7,padding:'0.6rem',fontSize:'0.75rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:300,overflow:'auto',borderLeft:'3px solid #22C55E'}}>{aR}</div>}
        </div>:null}
      </div>
      {["entry","mid"].map(lv=><div key={lv} style={{marginBottom:'1rem'}}>
        <h2 style={{fontSize:'0.9rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.4rem',color:lv==='entry'?'#4ECDC4':'#A78BFA'}}>{lv==='entry'?'🟢 Entry':'🟣 Mid'} — {INTERVIEW_DATA[lv].length} Qs</h2>
        {INTERVIEW_DATA[lv].map((x,i)=>{const k=`${lv}-${i}`;const op=xI===k;return<div key={k} style={{marginBottom:'0.2rem'}}>
          <div onClick={()=>setXI(op?null:k)} style={{background:'#141820',border:'1px solid #252D3D',borderRadius:op?'7px 7px 0 0':7,padding:'0.4rem 0.6rem',cursor:'pointer',display:'flex',gap:'0.25rem'}}><span style={{color:'#5A6580',fontSize:'0.65rem'}}>{op?'▾':'▸'}</span><div style={{flex:1}}><div style={{fontSize:'0.8rem',fontWeight:500}}>{x.q}</div><span style={{fontSize:'0.52rem',color:lv==='entry'?'#4ECDC4':'#A78BFA',background:lv==='entry'?'rgba(78,205,196,0.1)':'rgba(167,139,250,0.1)',padding:'0.05rem 0.2rem',borderRadius:3}}>{x.c}</span></div></div>
          {op&&<div style={{background:'#1A1F2E',border:'1px solid #252D3D',borderTop:'none',borderRadius:'0 0 7px 7px',padding:'0.6rem',fontSize:'0.75rem',lineHeight:1.7,color:'#C8CDD8'}}><span style={{color:'#4ECDC4',fontSize:'0.58rem',fontWeight:600}}>MODEL: </span>{x.a}</div>}
        </div>;})}
      </div>)}
    </div>}

    {/* ═══ RISK CALCULATOR ═══ */}
    {s.tab==="risk"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.75rem'}}>Risk Calculator <span style={{fontSize:'0.7rem',color:'#8892A8',fontWeight:400}}>— Stokes Ch.16</span></h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 260px',gap:'0.75rem',alignItems:'start'}}>
        <div style={C}>{RISK_FACTORS.map((rf,fi)=><div key={fi} style={{marginBottom:'0.7rem'}}><div style={{fontSize:'0.75rem',fontWeight:600,marginBottom:'0.2rem'}}>{rf.name}</div><div style={{display:'flex',gap:'0.2rem',flexWrap:'wrap'}}>{rf.options.map((opt,oi)=>{const sel=riskSel[fi]===opt.w;return<button key={oi} onClick={()=>setRiskSel({...riskSel,[fi]:opt.w})} style={{background:sel?'rgba(78,205,196,0.12)':'#1C2333',border:`1px solid ${sel?'#4ECDC4':'#252D3D'}`,color:sel?'#4ECDC4':'#8892A8',padding:'0.2rem 0.45rem',borderRadius:5,cursor:'pointer',fontSize:'0.68rem',fontFamily:'inherit'}}>{opt.label} <span style={{opacity:0.4,fontSize:'0.58rem'}}>({opt.w})</span></button>;})}</div></div>)}</div>
        <div style={{...C,textAlign:'center',position:'sticky',top:70}}>
          <div style={{fontSize:'0.6rem',color:'#5A6580',textTransform:'uppercase'}}>Risk Score</div>
          <div style={{fontSize:'2.2rem',fontFamily:"'DM Serif Display',serif",color:riskBand.color}}>{riskScore}</div>
          <div style={{fontSize:'0.82rem',fontWeight:700,color:riskBand.color,marginBottom:'0.4rem'}}>{riskBand.label}</div>
          <div style={{height:5,background:'#1C2333',borderRadius:3,marginBottom:'0.4rem'}}><div style={{height:'100%',width:`${Math.min(riskScore,100)}%`,background:riskBand.color,borderRadius:3,transition:'all 0.3s'}}/></div>
          <div style={{fontSize:'0.68rem',color:'#8892A8',textAlign:'left',lineHeight:1.5}}>{riskBand.strategy}</div>
        </div>
      </div>
    </div>}

    {/* ═══ GLOSSARY ═══ */}
    {s.tab==="glossary"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.4rem'}}>Glossary</h1>
      <input value={glossF} onChange={e=>setGlossF(e.target.value)} placeholder="🔍 Filter..." style={{...inp,maxWidth:280,marginBottom:'0.6rem',fontSize:'0.72rem'}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:'0.35rem'}}>
        {GLOSSARY.filter(g=>!glossF||g.term.toLowerCase().includes(glossF.toLowerCase())||g.def.toLowerCase().includes(glossF.toLowerCase())).map((g,i)=><div key={i} style={Cs}><div style={{fontSize:'0.78rem',fontWeight:700,color:'#4ECDC4',fontFamily:'monospace',marginBottom:'0.1rem'}}>{g.term}</div><div style={{fontSize:'0.72rem',color:'#C8CDD8',lineHeight:1.5}}>{g.def}</div></div>)}
      </div>
    </div>}

    {/* ═══ FLOWCHARTS ═══ */}
    {s.tab==="flow"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.5rem'}}>Flowcharts</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'0.35rem',marginBottom:'0.6rem'}}>{FLOWCHARTS.map(fc=><div key={fc.id} onClick={()=>setFS(fS===fc.id?null:fc.id)} style={{...Cs,cursor:'pointer',borderColor:fS===fc.id?'#4ECDC4':'#252D3D'}}><div style={{fontSize:'0.78rem',fontWeight:600}}>{fc.t}</div><div style={{fontSize:'0.6rem',color:'#5A6580'}}>{fc.n.length} steps</div></div>)}</div>
      {fS&&<div style={C}><h3 style={{fontSize:'0.88rem',marginBottom:'0.4rem',fontFamily:"'DM Serif Display',serif"}}>{FLOWCHARTS.find(f=>f.id===fS).t}</h3>{renderFC(FLOWCHARTS.find(f=>f.id===fS))}</div>}
    </div>}

    {/* ═══ JOBS ═══ */}
    {s.tab==="jobs"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.5rem'}}>🇮🇪 Ireland CSV Jobs</h1>
      {!s.cfg.apiKey&&<div style={{background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.3)',borderRadius:7,padding:'0.45rem',fontSize:'0.75rem',color:'#FF6B6B',marginBottom:'0.5rem'}}>⚠️ Set API key in Settings.</div>}
      <button onClick={()=>callAI(`List 10 CSV/Validation Engineer jobs in Ireland March 2026. Title, Company, Location, Level, Requirements, Salary €. Include Pfizer, Lilly, MSD, J&J, AbbVie + PharmaLex, DPS, PM Group.`,"Irish pharma recruiter.")} style={B()}>{aL?'⏳':'🔍 Search'}</button>
      {aR&&s.tab==="jobs"&&<div style={{...C,marginTop:'0.5rem',fontSize:'0.78rem',lineHeight:1.75,whiteSpace:'pre-wrap',maxHeight:500,overflow:'auto'}}>{aR}</div>}
    </div>}

    {/* ═══ RESOURCES ═══ */}
    {s.tab==="resources"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.5rem'}}>Resources</h1>
      <div style={{display:'grid',gap:'0.3rem'}}>{RESOURCES.map((r,i)=><a key={i} href={r.u} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem',background:'#141820',border:'1px solid #252D3D',borderRadius:7,textDecoration:'none',color:'#E8ECF4',fontSize:'0.78rem'}}><span style={{fontSize:'0.55rem',color:'#4ECDC4',background:'rgba(78,205,196,0.1)',padding:'0.1rem 0.25rem',borderRadius:3,fontWeight:600}}>{r.ty}</span><span style={{flex:1}}>{r.t}</span><span style={{color:'#5A6580'}}>↗</span></a>)}</div>
    </div>}

    {/* ═══ SETTINGS ═══ */}
    {s.tab==="cfg"&&<div>
      <h1 style={{fontSize:'1.4rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.6rem'}}>Settings</h1>
      <div style={{...C,maxWidth:440,marginBottom:'0.6rem'}}>
        <h3 style={{fontSize:'0.82rem',marginBottom:'0.4rem'}}>🔑 OpenRouter API</h3>
        <div style={{marginBottom:'0.4rem'}}><label style={{fontSize:'0.65rem',color:'#8892A8'}}>API Key</label><input type="password" value={s.cfg.apiKey} placeholder="sk-or-..." onChange={e=>u({cfg:{...s.cfg,apiKey:e.target.value}})} style={{...inp,marginTop:'0.1rem'}}/></div>
        <div style={{marginBottom:'0.4rem'}}><label style={{fontSize:'0.65rem',color:'#8892A8'}}>Model</label><input value={s.cfg.model} onChange={e=>u({cfg:{...s.cfg,model:e.target.value}})} style={{...inp,marginTop:'0.1rem'}}/></div>
      </div>
      <div style={{...C,maxWidth:440}}>
        <div style={{fontSize:'0.68rem',color:'#5A6580',marginBottom:'0.4rem',background:'#1C2333',padding:'0.35rem',borderRadius:5}}>Lessons:{s.done.length} Quiz:{s.quizH.length} Wrong:{s.wrongQs.length} Notes:{Object.keys(s.notes).length}</div>
        <div style={{display:'flex',gap:'0.3rem'}}><button onClick={exportP} style={B()}>📥 Export</button><button onClick={clearD} style={{...B('rgba(255,107,107,0.1)'),border:'1px solid rgba(255,107,107,0.3)',color:'#FF6B6B'}}>⚠️ Reset</button></div>
      </div>
    </div>}

    </div>
  </div>;
}
