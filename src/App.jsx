import { useState, useEffect, useCallback, useMemo } from "react";
import { storage } from "./storage.js";
import { MODULES } from "./data/courses.js";
import { QUIZ_BANK, INTERVIEW_DATA, SIMULATORS, FLOWCHARTS, FEYNMAN_TOPICS, STUDY_PLAN, RESOURCES, GLOSSARY, RISK_FACTORS, RISK_BANDS } from "./data/content.js";

const SK = "csv-academy-v5";
const DS = {
  tab:"dashboard",done:[],quizH:[],feynH:[],simH:[],mockIntH:[],
  notes:{},planTasks:{},wrongQs:[],askH:[],
  cfg:{apiKey:"",model:"minimax/MiniMax-M1"},lastVisit:null
};

export default function App() {
  const [s,setS]=useState(DS);
  const [ld,setLd]=useState(false);
  // UI state
  const [xL,setXL]=useState(null);
  const [cq,setCq]=useState(null);
  const [qi,setQi]=useState(0);
  const [qs,setQs]=useState(0);
  const [qa,setQa]=useState(false);
  const [selA,setSelA]=useState(null);
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
  const [noteEdit,setNoteEdit]=useState(null);
  const [noteText,setNoteText]=useState("");
  const [riskSel,setRiskSel]=useState({});
  const [searchQ,setSearchQ]=useState("");
  const [glossFilter,setGlossFilter]=useState("");
  const [askInput,setAskInput]=useState("");

  // Persistence
  useEffect(()=>{(async()=>{try{const r=await storage.get(SK);if(r?.value){const parsed=JSON.parse(r.value);setS(p=>({...DS,...p,...parsed}));}}catch(e){}setLd(true);})();},[]);
  useEffect(()=>{if(!ld)return;const t=setTimeout(async()=>{try{await storage.set(SK,JSON.stringify(s));}catch(e){}},500);return()=>clearTimeout(t);},[s,ld]);

  const u=useCallback(up=>setS(p=>({...p,...up})),[]);
  const togL=id=>{if(!s.done.includes(id))u({done:[...s.done,id]});setXL(xL===id?null:id);};
  const tL=MODULES.reduce((a,m)=>a+m.ls.length,0);
  const pP=tL>0?Math.round((s.done.length/tL)*100):0;

  // Search
  const searchResults = useMemo(()=>{
    if(!searchQ||searchQ.length<2) return [];
    const q=searchQ.toLowerCase();
    const results=[];
    MODULES.forEach(m=>{m.ls.forEach(l=>{
      if(l.t.toLowerCase().includes(q)||l.ct.toLowerCase().includes(q))
        results.push({type:'lesson',module:m.t,icon:m.i,title:l.t,id:l.id});
    });});
    GLOSSARY.forEach(g=>{
      if(g.term.toLowerCase().includes(q)||g.def.toLowerCase().includes(q))
        results.push({type:'glossary',title:g.term,desc:g.def});
    });
    return results.slice(0,8);
  },[searchQ]);

  // AI
  const callAI=async(prompt,sys="You are a CSV expert tutor for pharma professionals in Ireland.")=>{
    if(!s.cfg.apiKey){setAR("⚠️ Set OpenRouter API key in Settings.");return null;}
    setAL(true);setAR("");
    try{
      const r=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${s.cfg.apiKey}`},body:JSON.stringify({model:s.cfg.model||"minimax/MiniMax-M1",messages:[{role:"system",content:sys},{role:"user",content:prompt}],max_tokens:2500})});
      const d=await r.json();const t=d.choices?.[0]?.message?.content||"No response.";setAR(t);setAL(false);return t;
    }catch(e){setAR("Error: "+e.message);setAL(false);return null;}
  };

  // Quiz with wrong-answer tracking
  const startQ=(mid=null,retryWrong=false)=>{
    let p;
    if(retryWrong&&s.wrongQs.length>0){
      p=QUIZ_BANK.filter(q=>s.wrongQs.includes(q.id));
    } else {
      p=mid?QUIZ_BANK.filter(q=>q.m===mid):[...QUIZ_BANK];
    }
    p.sort(()=>Math.random()-0.5);
    setCq(p.slice(0,Math.min(10,p.length)));setQi(0);setQs(0);setQa(false);setSelA(null);
  };
  const ansQ=i=>{
    if(qa)return;setSelA(i);setQa(true);
    const correct=i===cq[qi].a;
    if(correct){
      setQs(v=>v+1);
      // Remove from wrong list if previously wrong
      if(cq[qi].id&&s.wrongQs.includes(cq[qi].id)){
        u({wrongQs:s.wrongQs.filter(id=>id!==cq[qi].id)});
      }
    } else {
      // Add to wrong list for spaced repetition
      if(cq[qi].id&&!s.wrongQs.includes(cq[qi].id)){
        u({wrongQs:[...s.wrongQs,cq[qi].id]});
      }
    }
  };
  const nxtQ=()=>{if(qi+1>=cq.length){u({quizH:[...s.quizH,{d:new Date().toISOString(),s:qs,t:cq.length,p:Math.round((qs/cq.length)*100)}]});setQi(qi+1);}else{setQi(qi+1);setQa(false);setSelA(null);}};

  // Feynman
  const subFeyn=async()=>{
    if(!fI.trim()||!fT)return;
    const r=await callAI(`Learner explains "${fT}" (Feynman technique):\n"${fI}"\n\nScore 1-10: ACCURACY, COMPLETENESS, CLARITY.\nFormat: Overall: X/10\nThen feedback and correct explanation.`);
    if(r){const m=r.match(/overall[:\s]*(\d+)/i)||r.match(/(\d+)\s*\/\s*10/);u({feynH:[...s.feynH,{d:new Date().toISOString(),topic:fT,score:m?parseInt(m[1]):5}]});}
  };

  // Mock interview
  const startMock=lv=>{const pool=INTERVIEW_DATA[lv];setMockQ(pool[Math.floor(Math.random()*pool.length)]);setMockAns("");setMockLv(lv);setMockMode(true);setAR("");};
  const submitMock=async()=>{
    if(!mockAns.trim()||!mockQ)return;
    const r=await callAI(`Mock interview: ${mockLv} CSV Engineer, Ireland.\nQ: "${mockQ.q}" (${mockQ.c})\nAnswer: "${mockAns}"\nModel: "${mockQ.a}"\n\nScore 1-10. STRENGTHS, GAPS, IMPROVEMENT, INTERVIEWER TIP.`);
    if(r){const m=r.match(/score[:\s]*(\d+)/i)||r.match(/(\d+)\s*\/\s*10/);u({mockIntH:[...s.mockIntH,{d:new Date().toISOString(),q:mockQ.q,level:mockLv,score:m?parseInt(m[1]):5}]});}
  };

  // Ask AI Tutor
  const askTutor=async()=>{
    if(!askInput.trim())return;
    const r=await callAI(`A CSV learner studying for pharma roles in Ireland asks:\n"${askInput}"\n\nProvide a clear, practical answer. Reference specific regulations (Part 11, Annex 11), GAMP 5 principles, or industry best practices where relevant. Keep it focused and actionable.`);
    if(r) u({askH:[...s.askH,{d:new Date().toISOString(),q:askInput,a:r}]});
    setAskInput("");
  };

  // Risk calculator
  const riskScore = useMemo(()=>Object.values(riskSel).reduce((a,v)=>a+v,0),[riskSel]);
  const riskBand = RISK_BANDS.find(b=>riskScore>=b.min&&riskScore<=b.max)||RISK_BANDS[0];

  // Plan tasks
  const togglePlan=(wk,task)=>{const k=`${wk}::${task}`;u({planTasks:{...s.planTasks,[k]:!s.planTasks[k]}});};
  const saveNote=lid=>{u({notes:{...s.notes,[lid]:noteText}});setNoteEdit(null);};

  // Export
  const exportProgress=()=>{
    const data={date:new Date().toISOString(),course:`${pP}%`,lessons:`${s.done.length}/${tL}`,quizzes:s.quizH.length,avgQuiz:s.quizH.length?Math.round(s.quizH.reduce((a,x)=>a+x.p,0)/s.quizH.length):0,feynman:s.feynH.length,mocks:s.mockIntH.length,sims:s.simH.length,wrongQs:s.wrongQs.length,notes:s.notes,quizH:s.quizH,feynH:s.feynH};
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)]));a.download=`csv-progress-${new Date().toISOString().slice(0,10)}.json`;a.click();
  };
  const clearD=async()=>{if(confirm("⚠️ Reset ALL progress?")){setS(DS);try{await storage.delete(SK);}catch(e){}}};

  if(!ld)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0C0F14',color:'#4ECDC4',fontFamily:'system-ui'}}>🏛 Loading...</div>;

  // Styles
  const C={background:'#141820',border:'1px solid #2A3348',borderRadius:12,padding:'1.5rem'};
  const Cs={...C,padding:'1rem'};
  const B=(bg='#4ECDC4')=>({background:bg,color:'#0C0F14',border:'none',padding:'0.5rem 1.25rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.8rem',fontFamily:'inherit'});
  const inp={width:'100%',background:'#1E2536',border:'1px solid #2A3348',borderRadius:6,padding:'0.45rem 0.65rem',color:'#E8ECF4',fontSize:'0.82rem',fontFamily:'inherit'};

  // Badges
  const badges = MODULES.filter(m=>m.ls.every(l=>s.done.includes(l.id)));

  // FC render
  const renderFC=fc=>{const ns=fc.n;const W=600;const H=ns.length*48+20;
    return(<svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:520,background:'#0C0F14',borderRadius:8,border:'1px solid #1E2536'}}>
      <defs><marker id="arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#4ECDC4"/></marker></defs>
      {ns.map((_,i)=>i<ns.length-1?<line key={`e${i}`} x1={W/2} y1={i*48+36} x2={W/2} y2={(i+1)*48+6} stroke="#2A3348" strokeWidth={1.5} markerEnd="url(#arr)"/>:null)}
      {ns.map((n,i)=><g key={i}><rect x={W/2-105} y={i*48+8} width={210} height={26} rx={5} fill="#1E2536" stroke={i===0?"#4ECDC4":i===ns.length-1?"#22C55E":"#2A3348"} strokeWidth={i===0||i===ns.length-1?1.5:0.5}/><text x={W/2} y={i*48+25} textAnchor="middle" fill="#E8ECF4" fontSize={10} fontFamily="system-ui">{n}</text></g>)}
    </svg>);
  };

  const tabs=[
    {id:"dashboard",l:"📊 Dash"},{id:"course",l:"📚 Course"},{id:"plan",l:"📅 Plan"},
    {id:"sims",l:"💻 Sims"},{id:"interview",l:"🎯 Interview"},{id:"test",l:"🧠 Tests"},
    {id:"risk",l:"🎚️ Risk Calc"},{id:"glossary",l:"📖 Glossary"},{id:"ask",l:"🤖 Ask AI"},
    {id:"flow",l:"🔀 Flows"},{id:"jobs",l:"🇮🇪 Jobs"},{id:"resources",l:"📎 Refs"},
    {id:"cfg",l:"⚙️"}
  ];

  return(<div style={{minHeight:'100vh',background:'#0C0F14',color:'#E8ECF4',fontFamily:"'Source Sans 3',system-ui,sans-serif"}}>
    {/* NAV */}
    <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(12,15,20,0.92)',backdropFilter:'blur(20px)',borderBottom:'1px solid #2A3348',display:'flex',alignItems:'center',padding:'0 0.4rem',overflowX:'auto',gap:'0.05rem'}}>
      <div style={{fontFamily:"'DM Serif Display',Georgia,serif",fontSize:'0.95rem',padding:'0.6rem 0.3rem',marginRight:'0.2rem',color:'#4ECDC4',whiteSpace:'nowrap',cursor:'pointer'}} onClick={()=>u({tab:'dashboard'})}>CSV Academy</div>
      {tabs.map(t=><button key={t.id} onClick={()=>{u({tab:t.id});if(!['jobs','sims','ask'].includes(t.id))setAR("");}} style={{background:s.tab===t.id?'rgba(78,205,196,0.15)':'transparent',border:'none',color:s.tab===t.id?'#4ECDC4':'#8892A8',padding:'0.45rem 0.4rem',borderRadius:5,cursor:'pointer',fontSize:'0.66rem',fontWeight:500,whiteSpace:'nowrap',fontFamily:'inherit'}}>{t.l}</button>)}
    </nav>

    <div style={{maxWidth:1200,margin:'0 auto',padding:'1rem'}}>

    {/* ═══ DASHBOARD ═══ */}
    {s.tab==="dashboard"&&<div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'0.75rem'}}>
        <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif"}}>Dashboard</h1>
        <div style={{display:'flex',gap:'0.3rem'}}>
          {/* Search */}
          <div style={{position:'relative'}}>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="🔍 Search..." style={{...inp,width:180,fontSize:'0.72rem',padding:'0.3rem 0.5rem'}}/>
            {searchResults.length>0&&<div style={{position:'absolute',top:'100%',left:0,right:0,background:'#141820',border:'1px solid #2A3348',borderRadius:8,marginTop:4,maxHeight:200,overflow:'auto',zIndex:50}}>
              {searchResults.map((r,i)=><div key={i} onClick={()=>{if(r.id){u({tab:'course'});setXL(r.id);}else u({tab:'glossary'});setSearchQ("");}} style={{padding:'0.4rem 0.6rem',borderBottom:'1px solid #1E2536',cursor:'pointer',fontSize:'0.72rem'}}>
                <span style={{color:'#4ECDC4',marginRight:'0.3rem'}}>{r.type==='lesson'?r.icon:'📖'}</span>{r.title}
              </div>)}
            </div>}
          </div>
          <button onClick={exportProgress} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8',fontSize:'0.65rem',padding:'0.3rem 0.6rem'}}>📥 Export</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:'0.4rem',marginBottom:'1rem'}}>
        {[
          {l:"Course",v:`${pP}%`,su:`${s.done.length}/${tL}`,c:'#4ECDC4'},
          {l:"Quizzes",v:s.quizH.length,su:s.quizH.length?`${Math.round(s.quizH.reduce((a,x)=>a+x.p,0)/s.quizH.length)}%`:"—",c:'#A78BFA'},
          {l:"Feynman",v:s.feynH.length,su:s.feynH.length?`${(s.feynH.reduce((a,x)=>a+x.score,0)/s.feynH.length).toFixed(1)}/10`:"—",c:'#FF6B6B'},
          {l:"Mock Int",v:s.mockIntH.length,su:s.mockIntH.length?`${(s.mockIntH.reduce((a,x)=>a+x.score,0)/s.mockIntH.length).toFixed(1)}/10`:"—",c:'#22C55E'},
          {l:"Weak Qs",v:s.wrongQs.length,su:s.wrongQs.length?"review needed":"all clear!",c:s.wrongQs.length>0?'#FF6B6B':'#22C55E'},
          {l:"Sims",v:s.simH.length,su:"done",c:'#38BDF8'},
        ].map((x,i)=><div key={i} style={{...Cs,padding:'0.7rem'}}><div style={{fontSize:'0.55rem',color:'#5A6580',textTransform:'uppercase',letterSpacing:'0.04em'}}>{x.l}</div><div style={{fontSize:'1.3rem',fontFamily:"'DM Serif Display',serif",color:x.c}}>{x.v}</div><div style={{fontSize:'0.65rem',color:'#8892A8'}}>{x.su}</div></div>)}
      </div>

      {/* Progress bar */}
      <div style={{...Cs,padding:'0.8rem',marginBottom:'0.75rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.2rem'}}><span style={{fontSize:'0.78rem',fontWeight:600}}>Course Progress</span><span style={{fontSize:'0.78rem',color:'#4ECDC4'}}>{pP}%</span></div>
        <div style={{height:5,background:'#1E2536',borderRadius:3}}><div style={{height:'100%',width:`${pP}%`,background:'linear-gradient(90deg,#4ECDC4,#38BDF8)',borderRadius:3,transition:'width 0.5s'}}/></div>
      </div>

      {/* Badges */}
      {badges.length>0&&<div style={{...Cs,marginBottom:'0.75rem'}}>
        <h3 style={{fontSize:'0.78rem',marginBottom:'0.4rem',color:'#FFE66D'}}>🏆 Completed Modules</h3>
        <div style={{display:'flex',gap:'0.3rem',flexWrap:'wrap'}}>
          {badges.map(m=><div key={m.id} style={{background:'rgba(255,230,109,0.1)',border:'1px solid rgba(255,230,109,0.3)',borderRadius:6,padding:'0.25rem 0.5rem',fontSize:'0.72rem',color:'#FFE66D'}}>{m.i} {m.t}</div>)}
        </div>
      </div>}

      {/* Module grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'0.4rem',marginBottom:'0.75rem'}}>
        {MODULES.map(m=>{const dn=m.ls.filter(l=>s.done.includes(l.id)).length;const pc=Math.round((dn/m.ls.length)*100);return<div key={m.id} style={{...Cs,padding:'0.65rem',cursor:'pointer'}} onClick={()=>u({tab:'course'})}>
          <div style={{display:'flex',alignItems:'center',gap:'0.3rem',marginBottom:'0.2rem'}}><span style={{fontSize:'0.85rem'}}>{m.i}</span><span style={{fontSize:'0.72rem',fontWeight:600,flex:1}}>{m.t}</span><span style={{fontSize:'0.6rem',color:pc===100?'#22C55E':'#8892A8'}}>{pc===100?'✅':pc+'%'}</span></div>
          <div style={{height:3,background:'#1E2536',borderRadius:2}}><div style={{height:'100%',width:`${pc}%`,background:m.c,borderRadius:2}}/></div>
        </div>;})}
      </div>

      {/* Score history */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'0.5rem'}}>
        {s.quizH.length>0&&<div style={Cs}><h3 style={{fontSize:'0.75rem',marginBottom:'0.35rem',color:'#A78BFA'}}>Quiz History</h3><div style={{display:'flex',gap:'0.2rem',flexWrap:'wrap'}}>{s.quizH.slice(-10).map((x,i)=><div key={i} style={{background:'#1E2536',borderRadius:4,padding:'0.15rem 0.35rem',textAlign:'center'}}><div style={{fontSize:'0.78rem',fontWeight:700,color:x.p>=80?'#22C55E':x.p>=60?'#FFE66D':'#FF6B6B'}}>{x.p}%</div></div>)}</div></div>}
        {s.feynH.length>0&&<div style={Cs}><h3 style={{fontSize:'0.75rem',marginBottom:'0.35rem',color:'#FF6B6B'}}>Feynman</h3><div style={{display:'flex',gap:'0.2rem',flexWrap:'wrap'}}>{s.feynH.slice(-10).map((x,i)=><div key={i} style={{background:'#1E2536',borderRadius:4,padding:'0.15rem 0.35rem',textAlign:'center'}}><div style={{fontSize:'0.78rem',fontWeight:700,color:x.score>=8?'#22C55E':x.score>=6?'#FFE66D':'#FF6B6B'}}>{x.score}/10</div></div>)}</div></div>}
      </div>
    </div>}

    {/* ═══ COURSE ═══ */}
    {s.tab==="course"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.1rem'}}>Course Modules</h1>
      <p style={{color:'#8892A8',fontSize:'0.78rem',marginBottom:'1rem'}}>Click lessons to expand. Add personal notes.</p>
      {MODULES.map(m=><div key={m.id} style={{marginBottom:'1.1rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.4rem'}}>
          <span style={{fontSize:'1rem'}}>{m.i}</span>
          <div><h2 style={{fontSize:'0.95rem',fontFamily:"'DM Serif Display',serif",margin:0}}>{m.t} {m.ls.every(l=>s.done.includes(l.id))&&<span style={{fontSize:'0.65rem',color:'#FFE66D'}}>🏆</span>}</h2>
          <div style={{display:'flex',gap:'0.4rem',fontSize:'0.62rem',color:'#5A6580'}}><span style={{color:m.c}}>{m.lv}</span><span>⏱~{m.h}h</span><span>📖 {m.br.join(', ')}</span></div></div>
        </div>
        {m.ls.map(l=>{const ic=s.done.includes(l.id);const io=xL===l.id;return<div key={l.id} style={{marginLeft:'0.8rem',marginBottom:'0.25rem'}}>
          <div onClick={()=>togL(l.id)} style={{background:io?'#1A2030':'#141820',border:`1px solid ${io?m.c:'#2A3348'}`,borderRadius:io?'8px 8px 0 0':8,padding:'0.45rem 0.7rem',cursor:'pointer',display:'flex',alignItems:'center',gap:'0.3rem'}}>
            <span style={{color:ic?'#22C55E':'#5A6580',fontSize:'0.75rem'}}>{ic?'✓':'○'}</span>
            <span style={{fontSize:'0.8rem',fontWeight:io?600:400,flex:1}}>{l.t}</span>
            {s.notes[l.id]&&<span style={{fontSize:'0.55rem',color:'#FFE66D'}}>📝</span>}
            <span style={{fontSize:'0.65rem',color:'#5A6580'}}>{io?'▾':'▸'}</span>
          </div>
          {io&&<div style={{background:'#141820',border:'1px solid #2A3348',borderTop:'none',borderRadius:'0 0 8px 8px',padding:'0.8rem'}}>
            <div style={{fontSize:'0.78rem',lineHeight:1.75,color:'#C8CDD8',whiteSpace:'pre-wrap',marginBottom:'0.6rem'}}>{l.ct}</div>
            <div style={{borderTop:'1px solid #2A3348',paddingTop:'0.5rem'}}>
              {noteEdit===l.id?<div>
                <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Your notes..." style={{...inp,minHeight:50,resize:'vertical',marginBottom:'0.25rem'}}/>
                <div style={{display:'flex',gap:'0.25rem'}}><button onClick={()=>saveNote(l.id)} style={{...B(),fontSize:'0.68rem',padding:'0.25rem 0.6rem'}}>💾 Save</button><button onClick={()=>setNoteEdit(null)} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8',fontSize:'0.68rem',padding:'0.25rem 0.6rem'}}>Cancel</button></div>
              </div>:<div>
                {s.notes[l.id]&&<div style={{fontSize:'0.75rem',color:'#FFE66D',background:'rgba(255,230,109,0.05)',padding:'0.4rem',borderRadius:5,marginBottom:'0.3rem',whiteSpace:'pre-wrap'}}>📝 {s.notes[l.id]}</div>}
                <button onClick={()=>{setNoteEdit(l.id);setNoteText(s.notes[l.id]||"");}} style={{fontSize:'0.65rem',color:'#8892A8',background:'#1E2536',border:'1px solid #2A3348',padding:'0.2rem 0.5rem',borderRadius:4,cursor:'pointer',fontFamily:'inherit'}}>{s.notes[l.id]?'✏️ Edit':'📝 Note'}</button>
              </div>}
            </div>
          </div>}
        </div>;})}
      </div>)}
    </div>}

    {/* ═══ PLAN ═══ */}
    {s.tab==="plan"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.1rem'}}>12-Week Study Plan</h1>
      <p style={{color:'#8892A8',fontSize:'0.78rem',marginBottom:'1rem'}}>Check off tasks as you go.</p>
      {STUDY_PLAN.map((wk,wi)=>{const done=wk.tasks.filter(t=>s.planTasks[`${wk.wk}::${t}`]).length;const pc=Math.round((done/wk.tasks.length)*100);
        return<div key={wi} style={{...C,marginBottom:'0.6rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.3rem'}}>
            <span style={{fontSize:'0.6rem',color:'#4ECDC4',fontFamily:'monospace',background:'rgba(78,205,196,0.1)',padding:'0.12rem 0.35rem',borderRadius:4}}>WK {wk.wk}</span>
            <h3 style={{fontSize:'0.9rem',fontFamily:"'DM Serif Display',serif",flex:1}}>{wk.t}</h3>
            <span style={{fontSize:'0.65rem',color:pc===100?'#22C55E':'#8892A8'}}>{pc}%</span>
          </div>
          <p style={{fontSize:'0.75rem',color:'#8892A8',marginBottom:'0.4rem'}}>{wk.desc}</p>
          {wk.tasks.map((task,ti)=>{const k=`${wk.wk}::${task}`;const ch=s.planTasks[k];
            return<div key={ti} onClick={()=>togglePlan(wk.wk,task)} style={{display:'flex',alignItems:'center',gap:'0.35rem',padding:'0.3rem 0.45rem',background:'#1E2536',borderRadius:5,cursor:'pointer',fontSize:'0.75rem',color:ch?'#22C55E':'#C8CDD8',marginBottom:'0.15rem'}}>
              <span>{ch?'☑':'☐'}</span><span style={{textDecoration:ch?'line-through':'none',opacity:ch?0.6:1}}>{task}</span>
            </div>;
          })}
        </div>;
      })}
    </div>}

    {/* ═══ SIMS ═══ */}
    {s.tab==="sims"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.1rem'}}>Simulators</h1>
      <p style={{color:'#8892A8',fontSize:'0.78rem',marginBottom:'1rem'}}>AI-powered scenarios across 6 platforms.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'0.6rem'}}>
        {SIMULATORS.map(sim=><div key={sim.id} style={C}>
          <div style={{display:'flex',alignItems:'center',gap:'0.35rem',marginBottom:'0.5rem'}}><span style={{fontSize:'1.1rem'}}>{sim.i}</span><h3 style={{fontSize:'0.92rem',fontFamily:"'DM Serif Display',serif"}}>{sim.n}</h3></div>
          {sim.sc.map(sc=>{const k=`${sim.id}-${sc.id}`;const act=sA===k;const lc=sc.l==='Basic'?'#22C55E':sc.l==='Mid'?'#FFE66D':sc.l==='Advanced'?'#FB923C':'#FF6B6B';
          return<div key={sc.id} style={{marginBottom:'0.2rem'}}>
            <div onClick={()=>{setSA(act?null:k);setAR("");}} style={{background:act?'#1A2030':'#1E2536',border:`1px solid ${act?sim.c:'#2A3348'}`,borderRadius:act?'7px 7px 0 0':7,padding:'0.4rem 0.55rem',cursor:'pointer',fontSize:'0.75rem'}}>
              <span style={{fontSize:'0.52rem',color:lc,background:`${lc}22`,padding:'0.06rem 0.22rem',borderRadius:3,fontWeight:600,marginRight:'0.2rem'}}>{sc.l}</span>{sc.t}
            </div>
            {act&&<div style={{background:'#141820',border:'1px solid #2A3348',borderTop:'none',borderRadius:'0 0 7px 7px',padding:'0.55rem'}}>
              <p style={{fontSize:'0.72rem',color:'#8892A8',marginBottom:'0.35rem'}}>{sc.d}</p>
              <button onClick={async()=>{const r=await callAI(`Simulate ${sim.n} CSV training, Irish pharma.\nScenario: "${sc.t}" (${sc.l})\n${sc.d}\n\n1.BACKGROUND 2.TASK(step-by-step) 3.DOCUMENTATION 4.OUTCOMES 5.MISTAKES 6.REGULATORY REFS`);if(r)u({simH:[...s.simH,{d:new Date().toISOString(),sim:sim.n,sc:sc.t}]});}} style={B(sim.c)}>{aL?'⏳':'▶ Launch'}</button>
              {aR&&act&&<div style={{marginTop:'0.4rem',background:'#1E2536',borderRadius:7,padding:'0.65rem',fontSize:'0.75rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:380,overflow:'auto'}}>{aR}</div>}
            </div>}
          </div>;})}
        </div>)}
      </div>
    </div>}

    {/* ═══ INTERVIEW ═══ */}
    {s.tab==="interview"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.6rem'}}>Interview Prep</h1>
      <div style={{...C,marginBottom:'1rem',borderColor:mockMode?'#22C55E':'#2A3348'}}>
        <h3 style={{fontSize:'0.88rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.25rem'}}>🎤 AI Mock Interview</h3>
        <p style={{fontSize:'0.72rem',color:'#8892A8',marginBottom:'0.5rem'}}>Type your answer. AI scores 1-10.</p>
        {!mockMode?<div style={{display:'flex',gap:'0.3rem'}}><button onClick={()=>startMock('entry')} style={B('#4ECDC4')}>🟢 Entry</button><button onClick={()=>startMock('mid')} style={B('#A78BFA')}>🟣 Mid</button></div>
        :mockQ?<div>
          <div style={{background:'#1E2536',borderRadius:7,padding:'0.7rem',marginBottom:'0.5rem'}}>
            <div style={{fontSize:'0.55rem',color:mockLv==='entry'?'#4ECDC4':'#A78BFA',textTransform:'uppercase',fontWeight:600,marginBottom:'0.15rem'}}>{mockLv} — {mockQ.c}</div>
            <div style={{fontSize:'0.9rem',fontWeight:600,lineHeight:1.4}}>"{mockQ.q}"</div>
          </div>
          <textarea value={mockAns} onChange={e=>setMockAns(e.target.value)} placeholder="Your answer..." style={{...inp,minHeight:80,resize:'vertical',marginBottom:'0.3rem'}}/>
          <div style={{display:'flex',gap:'0.3rem',flexWrap:'wrap'}}>
            <button onClick={submitMock} style={B('#22C55E')}>{aL?'⏳':'📝 Submit'}</button>
            <button onClick={()=>{setMockMode(false);setMockQ(null);setAR("");}} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8'}}>Exit</button>
            <button onClick={()=>startMock(mockLv)} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8'}}>Next Q</button>
          </div>
          {aR&&<div style={{marginTop:'0.5rem',background:'#1E2536',borderRadius:7,padding:'0.7rem',fontSize:'0.75rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:300,overflow:'auto',borderLeft:'3px solid #22C55E'}}>{aR}</div>}
        </div>:null}
      </div>
      {["entry","mid"].map(lv=><div key={lv} style={{marginBottom:'1rem'}}>
        <h2 style={{fontSize:'0.9rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.4rem',color:lv==='entry'?'#4ECDC4':'#A78BFA'}}>{lv==='entry'?'🟢 Entry':'🟣 Mid'} — {INTERVIEW_DATA[lv].length} Qs</h2>
        {INTERVIEW_DATA[lv].map((x,i)=>{const k=`${lv}-${i}`;const op=xI===k;return<div key={k} style={{marginBottom:'0.2rem'}}>
          <div onClick={()=>setXI(op?null:k)} style={{background:'#141820',border:'1px solid #2A3348',borderRadius:op?'7px 7px 0 0':7,padding:'0.45rem 0.65rem',cursor:'pointer',display:'flex',gap:'0.25rem'}}>
            <span style={{color:'#5A6580',fontSize:'0.65rem',marginTop:'0.1rem'}}>{op?'▾':'▸'}</span>
            <div style={{flex:1}}><div style={{fontSize:'0.8rem',fontWeight:500}}>{x.q}</div><span style={{fontSize:'0.52rem',color:lv==='entry'?'#4ECDC4':'#A78BFA',background:lv==='entry'?'rgba(78,205,196,0.1)':'rgba(167,139,250,0.1)',padding:'0.05rem 0.22rem',borderRadius:3}}>{x.c}</span></div>
          </div>
          {op&&<div style={{background:'#1A2030',border:'1px solid #2A3348',borderTop:'none',borderRadius:'0 0 7px 7px',padding:'0.65rem',fontSize:'0.75rem',lineHeight:1.7,color:'#C8CDD8'}}>
            <div style={{color:'#4ECDC4',fontSize:'0.58rem',fontWeight:600,marginBottom:'0.2rem',textTransform:'uppercase'}}>Model Answer:</div>{x.a}
          </div>}
        </div>;})}
      </div>)}
    </div>}

    {/* ═══ TESTS ═══ */}
    {s.tab==="test"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.1rem'}}>Test Center</h1>
      <p style={{color:'#8892A8',fontSize:'0.78rem',marginBottom:'0.7rem'}}>{QUIZ_BANK.length} Qs + Feynman game. Wrong answers tracked for spaced repetition.</p>

      {!cq?<div>
        <h3 style={{fontSize:'0.85rem',marginBottom:'0.4rem'}}>📝 Quizzes</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'0.35rem',marginBottom:'1rem'}}>
          <div onClick={()=>startQ()} style={{...Cs,cursor:'pointer'}}><span>🎲</span> <span style={{fontSize:'0.8rem',fontWeight:600}}>Random 10</span><div style={{fontSize:'0.62rem',color:'#8892A8'}}>All {QUIZ_BANK.length}</div></div>
          {s.wrongQs.length>0&&<div onClick={()=>startQ(null,true)} style={{...Cs,cursor:'pointer',borderColor:'#FF6B6B'}}><span>🔄</span> <span style={{fontSize:'0.8rem',fontWeight:600,color:'#FF6B6B'}}>Retry Wrong ({s.wrongQs.length})</span><div style={{fontSize:'0.62rem',color:'#8892A8'}}>Spaced repetition</div></div>}
          {MODULES.filter(m=>QUIZ_BANK.some(q=>q.m===m.id)).slice(0,5).map(m=><div key={m.id} onClick={()=>startQ(m.id)} style={{...Cs,cursor:'pointer'}}><span>{m.i}</span> <span style={{fontSize:'0.8rem',fontWeight:600}}>{m.t}</span><div style={{fontSize:'0.62rem',color:'#8892A8'}}>{QUIZ_BANK.filter(q=>q.m===m.id).length} Qs</div></div>)}
        </div>

        <div style={C}>
          <h3 style={{fontSize:'0.88rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.25rem'}}>🧠 Feynman Game</h3>
          <p style={{fontSize:'0.72rem',color:'#8892A8',marginBottom:'0.4rem'}}>Explain simply. AI scores. Saved to dashboard.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.18rem',marginBottom:'0.4rem'}}>
            {FEYNMAN_TOPICS.map(t=><button key={t} onClick={()=>{setFT(t);setAR("");setFI("");}} style={{background:fT===t?'rgba(78,205,196,0.2)':'#1E2536',border:`1px solid ${fT===t?'#4ECDC4':'#2A3348'}`,color:fT===t?'#4ECDC4':'#8892A8',padding:'0.15rem 0.35rem',borderRadius:4,cursor:'pointer',fontSize:'0.63rem',fontFamily:'inherit'}}>{t}</button>)}
          </div>
          {fT&&<div>
            <textarea value={fI} onChange={e=>setFI(e.target.value)} placeholder={`Explain "${fT}"...`} style={{...inp,minHeight:80,resize:'vertical'}}/>
            <button onClick={subFeyn} style={{...B(),marginTop:'0.25rem'}}>{aL?'⏳':'📝 Score'}</button>
            {aR&&<div style={{marginTop:'0.4rem',background:'#1E2536',borderRadius:7,padding:'0.65rem',fontSize:'0.75rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:300,overflow:'auto',borderLeft:'3px solid #FF6B6B'}}>{aR}</div>}
          </div>}
        </div>
      </div>

      :qi>=cq.length?
        <div style={{...C,textAlign:'center',maxWidth:400,margin:'0 auto'}}>
          <div style={{fontSize:'2rem',fontFamily:"'DM Serif Display',serif",color:qs/cq.length>=0.8?'#22C55E':qs/cq.length>=0.6?'#FFE66D':'#FF6B6B'}}>{qs}/{cq.length}</div>
          <div style={{color:'#8892A8',margin:'0.25rem 0 0.7rem'}}>{Math.round((qs/cq.length)*100)}%</div>
          <button onClick={()=>setCq(null)} style={B()}>Back</button>
        </div>
      :
        <div style={{...C,maxWidth:600}}>
          <div style={{fontSize:'0.65rem',color:'#4ECDC4',fontFamily:'monospace',marginBottom:'0.2rem'}}>Q {qi+1}/{cq.length}{s.wrongQs.includes(cq[qi].id)?' 🔄 Previously wrong':''}</div>
          <div style={{fontSize:'0.92rem',fontWeight:600,marginBottom:'0.75rem',lineHeight:1.5}}>{cq[qi].q}</div>
          <div style={{display:'grid',gap:'0.25rem'}}>
            {cq[qi].o.map((opt,i)=>{let bg='#1E2536',bd='#2A3348',cl='#C8CDD8';if(qa){if(i===cq[qi].a){bg='rgba(34,197,94,0.1)';bd='#22C55E';cl='#22C55E';}else if(i===selA&&i!==cq[qi].a){bg='rgba(255,107,107,0.1)';bd='#FF6B6B';cl='#FF6B6B';}}
            return<div key={i} onClick={()=>ansQ(i)} style={{padding:'0.45rem 0.65rem',background:bg,border:`1px solid ${bd}`,borderRadius:7,cursor:qa?'default':'pointer',fontSize:'0.8rem',color:cl}}>{String.fromCharCode(65+i)}. {opt}</div>;})}
          </div>
          {qa&&<div style={{marginTop:'0.4rem',padding:'0.55rem',background:'#1E2536',borderRadius:7,borderLeft:'3px solid #4ECDC4',fontSize:'0.75rem',color:'#8892A8',lineHeight:1.6}}>{cq[qi].e}</div>}
          {qa&&<button onClick={nxtQ} style={{...B(),marginTop:'0.4rem'}}>{qi+1>=cq.length?'Results':'Next →'}</button>}
        </div>
      }
    </div>}

    {/* ═══ RISK CALCULATOR ═══ */}
    {s.tab==="risk"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.1rem'}}>Risk Calculator</h1>
      <p style={{color:'#8892A8',fontSize:'0.78rem',marginBottom:'1rem'}}>Based on Stokes Ch.16 weighted risk factor scoring. Max score = 75.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:'1rem',alignItems:'start'}}>
        <div style={C}>
          {RISK_FACTORS.map((rf,fi)=><div key={fi} style={{marginBottom:'0.8rem'}}>
            <div style={{fontSize:'0.78rem',fontWeight:600,marginBottom:'0.3rem'}}>{rf.name}</div>
            <div style={{display:'flex',gap:'0.25rem',flexWrap:'wrap'}}>
              {rf.options.map((opt,oi)=>{const sel=riskSel[fi]===opt.w;
                return<button key={oi} onClick={()=>setRiskSel({...riskSel,[fi]:opt.w})} style={{background:sel?'rgba(78,205,196,0.15)':'#1E2536',border:`1px solid ${sel?'#4ECDC4':'#2A3348'}`,color:sel?'#4ECDC4':'#8892A8',padding:'0.25rem 0.55rem',borderRadius:5,cursor:'pointer',fontSize:'0.72rem',fontFamily:'inherit'}}>
                  {opt.label} <span style={{opacity:0.5,fontSize:'0.6rem'}}>({opt.w})</span>
                </button>;
              })}
            </div>
          </div>)}
        </div>
        <div style={{...C,textAlign:'center',position:'sticky',top:80}}>
          <div style={{fontSize:'0.65rem',color:'#5A6580',textTransform:'uppercase',marginBottom:'0.3rem'}}>Risk Score</div>
          <div style={{fontSize:'2.5rem',fontFamily:"'DM Serif Display',serif",color:riskBand.color}}>{riskScore}</div>
          <div style={{fontSize:'0.85rem',fontWeight:700,color:riskBand.color,marginBottom:'0.5rem'}}>{riskBand.label} Risk</div>
          <div style={{height:6,background:'#1E2536',borderRadius:3,marginBottom:'0.5rem'}}><div style={{height:'100%',width:`${riskScore}%`,background:riskBand.color,borderRadius:3,transition:'all 0.3s'}}/></div>
          <div style={{fontSize:'0.72rem',color:'#8892A8',textAlign:'left',lineHeight:1.5}}>{riskBand.strategy}</div>
        </div>
      </div>
    </div>}

    {/* ═══ GLOSSARY ═══ */}
    {s.tab==="glossary"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.1rem'}}>Glossary</h1>
      <p style={{color:'#8892A8',fontSize:'0.78rem',marginBottom:'0.6rem'}}>{GLOSSARY.length} key terms.</p>
      <input value={glossFilter} onChange={e=>setGlossFilter(e.target.value)} placeholder="🔍 Filter terms..." style={{...inp,maxWidth:300,marginBottom:'0.75rem',fontSize:'0.75rem'}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'0.4rem'}}>
        {GLOSSARY.filter(g=>!glossFilter||g.term.toLowerCase().includes(glossFilter.toLowerCase())||g.def.toLowerCase().includes(glossFilter.toLowerCase())).map((g,i)=>
          <div key={i} style={{...Cs}}>
            <div style={{fontSize:'0.82rem',fontWeight:700,color:'#4ECDC4',fontFamily:'monospace',marginBottom:'0.15rem'}}>{g.term}</div>
            <div style={{fontSize:'0.75rem',color:'#C8CDD8',lineHeight:1.5}}>{g.def}</div>
          </div>
        )}
      </div>
    </div>}

    {/* ═══ ASK AI ═══ */}
    {s.tab==="ask"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.1rem'}}>Ask AI Tutor</h1>
      <p style={{color:'#8892A8',fontSize:'0.78rem',marginBottom:'0.75rem'}}>Ask any CSV question. AI answers with regulatory references.</p>
      <div style={{display:'flex',gap:'0.35rem',marginBottom:'0.75rem'}}>
        <input value={askInput} onChange={e=>setAskInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&askTutor()} placeholder="Type your CSV question..." style={{...inp,flex:1}}/>
        <button onClick={askTutor} style={B()}>{aL?'⏳':'Ask'}</button>
      </div>
      {!s.cfg.apiKey&&<div style={{background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.3)',borderRadius:7,padding:'0.5rem',fontSize:'0.75rem',color:'#FF6B6B',marginBottom:'0.5rem'}}>⚠️ Set API key in Settings.</div>}
      {aR&&s.tab==="ask"&&<div style={{...C,marginBottom:'0.5rem',fontSize:'0.78rem',lineHeight:1.7,whiteSpace:'pre-wrap',maxHeight:400,overflow:'auto'}}>{aR}</div>}
      {s.askH.length>0&&<div>
        <h3 style={{fontSize:'0.8rem',color:'#5A6580',marginBottom:'0.4rem'}}>Previous Questions</h3>
        {s.askH.slice(-5).reverse().map((h,i)=><div key={i} style={{...Cs,marginBottom:'0.3rem'}}>
          <div style={{fontSize:'0.72rem',color:'#4ECDC4',fontWeight:600,marginBottom:'0.15rem'}}>Q: {h.q}</div>
          <div style={{fontSize:'0.72rem',color:'#8892A8',maxHeight:80,overflow:'hidden'}}>{h.a.slice(0,200)}...</div>
        </div>)}
      </div>}
    </div>}

    {/* ═══ FLOWCHARTS ═══ */}
    {s.tab==="flow"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.6rem'}}>Flowcharts</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'0.4rem',marginBottom:'0.7rem'}}>
        {FLOWCHARTS.map(fc=><div key={fc.id} onClick={()=>setFS(fS===fc.id?null:fc.id)} style={{...Cs,cursor:'pointer',borderColor:fS===fc.id?'#4ECDC4':'#2A3348'}}>
          <div style={{fontSize:'0.8rem',fontWeight:600}}>{fc.t}</div><div style={{fontSize:'0.62rem',color:'#5A6580'}}>{fc.n.length} steps</div>
        </div>)}
      </div>
      {fS&&<div style={C}><h3 style={{fontSize:'0.88rem',marginBottom:'0.5rem',fontFamily:"'DM Serif Display',serif"}}>{FLOWCHARTS.find(f=>f.id===fS).t}</h3>{renderFC(FLOWCHARTS.find(f=>f.id===fS))}</div>}
    </div>}

    {/* ═══ JOBS ═══ */}
    {s.tab==="jobs"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.5rem'}}>🇮🇪 Ireland CSV Jobs</h1>
      {!s.cfg.apiKey&&<div style={{background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.3)',borderRadius:7,padding:'0.5rem',fontSize:'0.75rem',color:'#FF6B6B',marginBottom:'0.5rem'}}>⚠️ Set API key in Settings.</div>}
      <button onClick={()=>callAI(`List 10 CSV/Validation Engineer jobs Ireland March 2026:\nTitle, Company, Location, Level, Requirements (KNEAT/ValGenesis/SAP/LIMS), Salary €\nPfizer, Lilly, MSD, J&J, AbbVie + PharmaLex, DPS, PM Group.`,"Irish pharma recruiter.")} style={B()}>{aL?'⏳':'🔍 Search'}</button>
      {aR&&s.tab==="jobs"&&<div style={{...C,marginTop:'0.5rem',fontSize:'0.78rem',lineHeight:1.75,whiteSpace:'pre-wrap',maxHeight:500,overflow:'auto'}}>{aR}</div>}
    </div>}

    {/* ═══ RESOURCES ═══ */}
    {s.tab==="resources"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.5rem'}}>Resources</h1>
      <div style={{display:'grid',gap:'0.3rem',marginBottom:'1rem'}}>
        {RESOURCES.map((r,i)=><a key={i} href={r.u} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.6rem',background:'#141820',border:'1px solid #2A3348',borderRadius:7,textDecoration:'none',color:'#E8ECF4'}}>
          <span style={{fontSize:'0.55rem',color:'#4ECDC4',background:'rgba(78,205,196,0.1)',padding:'0.1rem 0.3rem',borderRadius:3,fontWeight:600}}>{r.ty}</span>
          <span style={{fontSize:'0.78rem',flex:1}}>{r.t}</span><span style={{color:'#5A6580'}}>↗</span>
        </a>)}
      </div>
      <h3 style={{fontSize:'0.9rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.4rem'}}>📚 Reference Books</h3>
      {[{t:"Testing Computer Systems for FDA/MHRA Compliance",a:"David Stokes",f:"Testing methodology, strategies, IQ/OQ/PQ, risk-based testing"},
        {t:"Validating Corporate Computer Systems",a:"Guy Wingate",f:"IT strategy, ERP, supplier audits, e-signatures, change control"},
        {t:"Validating Pharmaceutical Systems",a:"John Andrews",f:"SCADA, LIMS case study, risk assessment, inspector's viewpoint"},
      ].map((b,i)=><div key={i} style={{...Cs,marginBottom:'0.3rem'}}><div style={{fontSize:'0.82rem',fontWeight:600}}>{b.t}</div><div style={{fontSize:'0.68rem',color:'#8892A8'}}>{b.a}</div><div style={{fontSize:'0.65rem',color:'#5A6580'}}>{b.f}</div></div>)}
    </div>}

    {/* ═══ SETTINGS ═══ */}
    {s.tab==="cfg"&&<div>
      <h1 style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.7rem'}}>Settings</h1>
      <div style={{...C,maxWidth:460,marginBottom:'0.7rem'}}>
        <h3 style={{fontSize:'0.85rem',marginBottom:'0.4rem'}}>🔑 OpenRouter API</h3>
        <div style={{marginBottom:'0.4rem'}}><label style={{fontSize:'0.68rem',color:'#8892A8'}}>API Key</label><input type="password" value={s.cfg.apiKey} placeholder="sk-or-v1-..." onChange={e=>u({cfg:{...s.cfg,apiKey:e.target.value}})} style={{...inp,marginTop:'0.1rem'}}/></div>
        <div style={{marginBottom:'0.4rem'}}><label style={{fontSize:'0.68rem',color:'#8892A8'}}>Model</label><input type="text" value={s.cfg.model} onChange={e=>u({cfg:{...s.cfg,model:e.target.value}})} style={{...inp,marginTop:'0.1rem'}}/></div>
        <div style={{fontSize:'0.68rem',color:'#5A6580',background:'#1E2536',padding:'0.4rem',borderRadius:5}}>ℹ️ Stored locally only.</div>
      </div>
      <div style={{...C,maxWidth:460}}>
        <h3 style={{fontSize:'0.85rem',marginBottom:'0.4rem'}}>🗑️ Data</h3>
        <div style={{fontSize:'0.68rem',color:'#5A6580',marginBottom:'0.4rem',background:'#1E2536',padding:'0.35rem',borderRadius:5}}>
          Lessons:{s.done.length} Quiz:{s.quizH.length} Feynman:{s.feynH.length} Mock:{s.mockIntH.length} Sims:{s.simH.length} Notes:{Object.keys(s.notes).length} Wrong:{s.wrongQs.length} Ask:{s.askH.length}
        </div>
        <div style={{display:'flex',gap:'0.3rem'}}><button onClick={exportProgress} style={B()}>📥 Export</button><button onClick={clearD} style={{background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.3)',color:'#FF6B6B',padding:'0.4rem 0.8rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.7rem',fontFamily:'inherit'}}>⚠️ Reset</button></div>
      </div>
    </div>}

    </div>
  </div>);
}
