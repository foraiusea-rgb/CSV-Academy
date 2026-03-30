import { useState, useEffect, useCallback } from "react";
import { storage } from "./storage.js";
import { MODULES } from "./data/courses.js";
import { QUIZ_BANK, INTERVIEW_DATA, SIMULATORS, FLOWCHARTS, FEYNMAN_TOPICS, STUDY_PLAN, RESOURCES } from "./data/content.js";

const SK = "csv-academy-v4";
const DS = {
  tab:"dashboard",done:[],quizH:[],feynH:[],simH:[],mockIntH:[],
  notes:{},planTasks:{},cfg:{apiKey:"",model:"minimax/MiniMax-M1"},lastVisit:null
};

export default function App() {
  const [s,setS]=useState(DS);
  const [ld,setLd]=useState(false);
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

  useEffect(()=>{(async()=>{try{const r=await storage.get(SK);if(r?.value)setS(p=>({...p,...JSON.parse(r.value)}));}catch(e){}setLd(true);})();},[]);
  useEffect(()=>{if(!ld)return;const t=setTimeout(async()=>{try{await storage.set(SK,JSON.stringify(s));}catch(e){}},500);return()=>clearTimeout(t);},[s,ld]);

  const u=useCallback(up=>setS(p=>({...p,...up})),[]);
  const togL=id=>{if(!s.done.includes(id))u({done:[...s.done,id]});setXL(xL===id?null:id);};
  const tL=MODULES.reduce((a,m)=>a+m.ls.length,0);
  const pP=tL>0?Math.round((s.done.length/tL)*100):0;

  const callAI=async(prompt,sys="You are a CSV expert tutor for pharmaceutical industry professionals in Ireland.")=>{
    if(!s.cfg.apiKey){setAR("⚠️ Set your OpenRouter API key in Settings.");return null;}
    setAL(true);setAR("");
    try{
      const r=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${s.cfg.apiKey}`},body:JSON.stringify({model:s.cfg.model||"minimax/MiniMax-M1",messages:[{role:"system",content:sys},{role:"user",content:prompt}],max_tokens:2500})});
      const d=await r.json();const t=d.choices?.[0]?.message?.content||"No response.";setAR(t);setAL(false);return t;
    }catch(e){setAR("Error: "+e.message);setAL(false);return null;}
  };

  const startQ=(mid=null)=>{let p=mid?QUIZ_BANK.filter(q=>q.m===mid):[...QUIZ_BANK];p.sort(()=>Math.random()-0.5);setCq(p.slice(0,Math.min(10,p.length)));setQi(0);setQs(0);setQa(false);setSelA(null);};
  const ansQ=i=>{if(qa)return;setSelA(i);setQa(true);if(i===cq[qi].a)setQs(v=>v+1);};
  const nxtQ=()=>{if(qi+1>=cq.length){u({quizH:[...s.quizH,{d:new Date().toISOString(),s:qs,t:cq.length,p:Math.round((qs/cq.length)*100)}]});setQi(qi+1);}else{setQi(qi+1);setQa(false);setSelA(null);}};

  const subFeyn=async()=>{
    if(!fI.trim()||!fT)return;
    const r=await callAI(`Learner explains "${fT}" (Feynman technique):\n"${fI}"\n\nScore 1-10 on ACCURACY, COMPLETENESS, CLARITY.\nFormat: Overall: X/10\nThen feedback and correct explanation.`);
    if(r){const m=r.match(/overall[:\s]*(\d+)/i)||r.match(/(\d+)\s*\/\s*10/);u({feynH:[...s.feynH,{d:new Date().toISOString(),topic:fT,score:m?parseInt(m[1]):5}]});}
  };

  const startMock=lv=>{const pool=INTERVIEW_DATA[lv];setMockQ(pool[Math.floor(Math.random()*pool.length)]);setMockAns("");setMockLv(lv);setMockMode(true);setAR("");};
  const submitMock=async()=>{
    if(!mockAns.trim()||!mockQ)return;
    const r=await callAI(`Mock interview for ${mockLv==='entry'?'Entry':'Mid'} Level CSV Engineer in Ireland.\n\nQ: "${mockQ.q}" (${mockQ.c})\nCandidate: "${mockAns}"\nModel answer: "${mockQ.a}"\n\nScore 1-10. Give: SCORE, STRENGTHS, GAPS, IMPROVEMENT, INTERVIEWER TIP.`);
    if(r){const m=r.match(/score[:\s]*(\d+)/i)||r.match(/(\d+)\s*\/\s*10/);u({mockIntH:[...s.mockIntH,{d:new Date().toISOString(),q:mockQ.q,level:mockLv,score:m?parseInt(m[1]):5}]});}
  };

  const togglePlanTask=(wk,task)=>{
    const key=`${wk}::${task}`;
    const pt={...s.planTasks};
    pt[key]=!pt[key];
    u({planTasks:pt});
  };

  const saveNote=(lessonId)=>{
    const n={...s.notes};
    n[lessonId]=noteText;
    u({notes:n});
    setNoteEdit(null);
  };

  const exportProgress=()=>{
    const data={
      date:new Date().toISOString(),
      courseProgress:`${pP}%`,
      lessonsCompleted:`${s.done.length}/${tL}`,
      modulesCompleted:MODULES.filter(m=>m.ls.every(l=>s.done.includes(l.id))).length,
      quizzesTaken:s.quizH.length,
      avgQuizScore:s.quizH.length?Math.round(s.quizH.reduce((a,x)=>a+x.p,0)/s.quizH.length):0,
      feynmanSessions:s.feynH.length,
      avgFeynmanScore:s.feynH.length?(s.feynH.reduce((a,x)=>a+x.score,0)/s.feynH.length).toFixed(1):0,
      mockInterviews:s.mockIntH.length,
      avgMockScore:s.mockIntH.length?(s.mockIntH.reduce((a,x)=>a+x.score,0)/s.mockIntH.length).toFixed(1):0,
      simulatorsCompleted:s.simH.length,
      studyPlanTasks:Object.values(s.planTasks).filter(Boolean).length,
      quizHistory:s.quizH,
      feynmanHistory:s.feynH,
      notes:s.notes,
    };
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download=`csv-academy-progress-${new Date().toISOString().slice(0,10)}.json`;
    a.click();URL.revokeObjectURL(url);
  };

  const clearD=async()=>{if(confirm("⚠️ Reset ALL progress permanently?")){setS(DS);try{await storage.delete(SK);}catch(e){}}};

  if(!ld)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#0C0F14',color:'#4ECDC4',fontFamily:'system-ui'}}>🏛 Loading CSV Academy...</div>;

  const C={background:'#141820',border:'1px solid #2A3348',borderRadius:12,padding:'1.5rem'};
  const Cs={...C,padding:'1rem'};
  const B=(bg='#4ECDC4')=>({background:bg,color:'#0C0F14',border:'none',padding:'0.5rem 1.25rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.8rem',fontFamily:'inherit'});
  const inp={width:'100%',background:'#1E2536',border:'1px solid #2A3348',borderRadius:6,padding:'0.45rem 0.65rem',color:'#E8ECF4',fontSize:'0.82rem',fontFamily:'inherit'};

  const renderFC=fc=>{
    const ns=fc.n;const W=600;const H=ns.length*48+20;
    return(<svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:520,background:'#0C0F14',borderRadius:8,border:'1px solid #1E2536'}}>
      <defs><marker id="arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#4ECDC4"/></marker></defs>
      {ns.map((_,i)=>{if(i<ns.length-1)return<line key={`e${i}`} x1={W/2} y1={i*48+36} x2={W/2} y2={(i+1)*48+6} stroke="#2A3348" strokeWidth={1.5} markerEnd="url(#arr)"/>;return null;})}
      {ns.map((n,i)=>{const y=i*48+8;return(<g key={i}><rect x={W/2-105} y={y} width={210} height={26} rx={5} fill="#1E2536" stroke={i===0?"#4ECDC4":i===ns.length-1?"#22C55E":"#2A3348"} strokeWidth={i===0||i===ns.length-1?1.5:0.5}/><text x={W/2} y={y+17} textAnchor="middle" fill="#E8ECF4" fontSize={10} fontFamily="system-ui">{n}</text></g>);})}
    </svg>);
  };

  const tabs=[
    {id:"dashboard",l:"📊 Dashboard"},{id:"course",l:"📚 Course"},{id:"plan",l:"📅 Study Plan"},
    {id:"sims",l:"💻 Simulators"},{id:"interview",l:"🎯 Interview"},{id:"jobs",l:"🇮🇪 Jobs"},
    {id:"test",l:"🧠 Tests"},{id:"flow",l:"🔀 Flowcharts"},{id:"resources",l:"📎 Resources"},
    {id:"cfg",l:"⚙️ Settings"}
  ];

  return(<div style={{minHeight:'100vh',background:'#0C0F14',color:'#E8ECF4',fontFamily:"'Source Sans 3',system-ui,sans-serif"}}>
    <nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(12,15,20,0.92)',backdropFilter:'blur(20px)',borderBottom:'1px solid #2A3348',display:'flex',alignItems:'center',padding:'0 0.5rem',overflowX:'auto',gap:'0.1rem'}}>
      <div style={{fontFamily:"'DM Serif Display',Georgia,serif",fontSize:'1rem',padding:'0.65rem 0.4rem',marginRight:'0.3rem',color:'#4ECDC4',whiteSpace:'nowrap',cursor:'pointer'}} onClick={()=>u({tab:'dashboard'})}>CSV Academy</div>
      {tabs.map(t=><button key={t.id} onClick={()=>{u({tab:t.id});if(t.id!=='jobs'&&t.id!=='sims')setAR("");}} style={{background:s.tab===t.id?'rgba(78,205,196,0.15)':'transparent',border:'none',color:s.tab===t.id?'#4ECDC4':'#8892A8',padding:'0.5rem 0.5rem',borderRadius:6,cursor:'pointer',fontSize:'0.7rem',fontWeight:500,whiteSpace:'nowrap',fontFamily:'inherit'}}>{t.l}</button>)}
    </nav>

    <div style={{maxWidth:1200,margin:'0 auto',padding:'1.25rem 1rem'}}>

    {/* ═══ DASHBOARD ═══ */}
    {s.tab==="dashboard"&&<div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem'}}>
        <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif"}}>Dashboard</h1>
        <button onClick={exportProgress} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8',fontSize:'0.7rem',padding:'0.35rem 0.75rem'}}>📥 Export Progress</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'0.5rem',marginBottom:'1rem'}}>
        {[
          {l:"Course",v:`${pP}%`,su:`${s.done.length}/${tL}`,c:'#4ECDC4'},
          {l:"Quizzes",v:s.quizH.length,su:s.quizH.length?`${Math.round(s.quizH.reduce((a,x)=>a+x.p,0)/s.quizH.length)}% avg`:"—",c:'#A78BFA'},
          {l:"Feynman",v:s.feynH.length,su:s.feynH.length?`${(s.feynH.reduce((a,x)=>a+x.score,0)/s.feynH.length).toFixed(1)}/10`:"—",c:'#FF6B6B'},
          {l:"Mock Int.",v:s.mockIntH.length,su:s.mockIntH.length?`${(s.mockIntH.reduce((a,x)=>a+x.score,0)/s.mockIntH.length).toFixed(1)}/10`:"—",c:'#22C55E'},
          {l:"Sims",v:s.simH.length,su:"done",c:'#38BDF8'},
          {l:"Plan",v:`${Object.values(s.planTasks).filter(Boolean).length}/${STUDY_PLAN.reduce((a,w)=>a+w.tasks.length,0)}`,su:"tasks",c:'#FB923C'},
        ].map((x,i)=><div key={i} style={{...Cs,padding:'0.85rem'}}><div style={{fontSize:'0.58rem',color:'#5A6580',textTransform:'uppercase',letterSpacing:'0.05em'}}>{x.l}</div><div style={{fontSize:'1.35rem',fontFamily:"'DM Serif Display',serif",color:x.c}}>{x.v}</div><div style={{fontSize:'0.68rem',color:'#8892A8'}}>{x.su}</div></div>)}
      </div>
      <div style={{...Cs,marginBottom:'1rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.25rem'}}><span style={{fontSize:'0.8rem',fontWeight:600}}>Course Progress</span><span style={{fontSize:'0.8rem',color:'#4ECDC4'}}>{pP}%</span></div>
        <div style={{height:6,background:'#1E2536',borderRadius:3,overflow:'hidden'}}><div style={{height:'100%',width:`${pP}%`,background:'linear-gradient(90deg,#4ECDC4,#38BDF8)',borderRadius:3,transition:'width 0.5s'}}/></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:'0.45rem',marginBottom:'1rem'}}>
        {MODULES.map(m=>{const dn=m.ls.filter(l=>s.done.includes(l.id)).length;const pc=Math.round((dn/m.ls.length)*100);return<div key={m.id} style={{...Cs,padding:'0.7rem',cursor:'pointer'}} onClick={()=>u({tab:'course'})}>
          <div style={{display:'flex',alignItems:'center',gap:'0.35rem',marginBottom:'0.25rem'}}><span style={{fontSize:'0.9rem'}}>{m.i}</span><span style={{fontSize:'0.76rem',fontWeight:600,flex:1}}>{m.t}</span><span style={{fontSize:'0.65rem',color:pc===100?'#22C55E':'#8892A8'}}>{pc}%</span></div>
          <div style={{height:3,background:'#1E2536',borderRadius:2}}><div style={{height:'100%',width:`${pc}%`,background:m.c,borderRadius:2}}/></div>
        </div>;})}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'0.6rem'}}>
        {s.quizH.length>0&&<div style={Cs}><h3 style={{fontSize:'0.8rem',marginBottom:'0.4rem',color:'#A78BFA'}}>Quiz History</h3><div style={{display:'flex',gap:'0.25rem',flexWrap:'wrap'}}>{s.quizH.slice(-10).map((x,i)=><div key={i} style={{background:'#1E2536',borderRadius:4,padding:'0.2rem 0.4rem',textAlign:'center'}}><div style={{fontSize:'0.82rem',fontWeight:700,color:x.p>=80?'#22C55E':x.p>=60?'#FFE66D':'#FF6B6B'}}>{x.p}%</div><div style={{fontSize:'0.5rem',color:'#5A6580'}}>{new Date(x.d).toLocaleDateString()}</div></div>)}</div></div>}
        {s.feynH.length>0&&<div style={Cs}><h3 style={{fontSize:'0.8rem',marginBottom:'0.4rem',color:'#FF6B6B'}}>Feynman Scores</h3><div style={{display:'flex',gap:'0.25rem',flexWrap:'wrap'}}>{s.feynH.slice(-10).map((x,i)=><div key={i} style={{background:'#1E2536',borderRadius:4,padding:'0.2rem 0.4rem',textAlign:'center'}}><div style={{fontSize:'0.82rem',fontWeight:700,color:x.score>=8?'#22C55E':x.score>=6?'#FFE66D':'#FF6B6B'}}>{x.score}/10</div><div style={{fontSize:'0.5rem',color:'#5A6580'}}>{x.topic.slice(0,10)}</div></div>)}</div></div>}
        {s.mockIntH.length>0&&<div style={Cs}><h3 style={{fontSize:'0.8rem',marginBottom:'0.4rem',color:'#22C55E'}}>Mock Interviews</h3><div style={{display:'flex',gap:'0.25rem',flexWrap:'wrap'}}>{s.mockIntH.slice(-10).map((x,i)=><div key={i} style={{background:'#1E2536',borderRadius:4,padding:'0.2rem 0.4rem',textAlign:'center'}}><div style={{fontSize:'0.82rem',fontWeight:700,color:x.score>=8?'#22C55E':x.score>=6?'#FFE66D':'#FF6B6B'}}>{x.score}/10</div><div style={{fontSize:'0.5rem',color:'#5A6580'}}>{x.level}</div></div>)}</div></div>}
      </div>
    </div>}

    {/* ═══ COURSE ═══ */}
    {s.tab==="course"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.15rem'}}>Course Modules</h1>
      <p style={{color:'#8892A8',fontSize:'0.8rem',marginBottom:'1rem'}}>Based on Stokes, Wingate & Andrews. Click to expand. Add notes per lesson.</p>
      {MODULES.map(m=><div key={m.id} style={{marginBottom:'1.2rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.45rem',marginBottom:'0.45rem'}}>
          <span style={{fontSize:'1.05rem'}}>{m.i}</span>
          <div><h2 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif",margin:0}}>{m.t}</h2>
          <div style={{display:'flex',gap:'0.4rem',fontSize:'0.65rem',color:'#5A6580',flexWrap:'wrap'}}><span style={{color:m.c}}>{m.lv}</span><span>⏱~{m.h}h</span><span>📖 {m.br.join(', ')}</span></div></div>
        </div>
        {m.ls.map(l=>{const ic=s.done.includes(l.id);const io=xL===l.id;const hasNote=s.notes[l.id];return<div key={l.id} style={{marginLeft:'0.9rem',marginBottom:'0.3rem'}}>
          <div onClick={()=>togL(l.id)} style={{background:io?'#1A2030':'#141820',border:`1px solid ${io?m.c:'#2A3348'}`,borderRadius:io?'8px 8px 0 0':8,padding:'0.5rem 0.75rem',cursor:'pointer',display:'flex',alignItems:'center',gap:'0.35rem'}}>
            <span style={{color:ic?'#22C55E':'#5A6580',fontSize:'0.78rem'}}>{ic?'✓':'○'}</span>
            <span style={{fontSize:'0.82rem',fontWeight:io?600:400,flex:1}}>{l.t}</span>
            {hasNote&&<span style={{fontSize:'0.6rem',color:'#FFE66D'}}>📝</span>}
            <span style={{fontSize:'0.68rem',color:'#5A6580'}}>{io?'▾':'▸'}</span>
          </div>
          {io&&<div style={{background:'#141820',border:'1px solid #2A3348',borderTop:'none',borderRadius:'0 0 8px 8px',padding:'0.9rem'}}>
            <div style={{fontSize:'0.8rem',lineHeight:1.75,color:'#C8CDD8',whiteSpace:'pre-wrap',marginBottom:'0.75rem'}}>{l.ct}</div>
            {/* Notes */}
            <div style={{borderTop:'1px solid #2A3348',paddingTop:'0.6rem'}}>
              {noteEdit===l.id?(<div>
                <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Your notes for this lesson..." style={{...inp,minHeight:60,resize:'vertical',marginBottom:'0.3rem'}}/>
                <div style={{display:'flex',gap:'0.3rem'}}>
                  <button onClick={()=>saveNote(l.id)} style={{...B(),fontSize:'0.7rem',padding:'0.3rem 0.8rem'}}>💾 Save</button>
                  <button onClick={()=>setNoteEdit(null)} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8',fontSize:'0.7rem',padding:'0.3rem 0.8rem'}}>Cancel</button>
                </div>
              </div>):(
                <div>
                  {s.notes[l.id]&&<div style={{fontSize:'0.78rem',color:'#FFE66D',background:'rgba(255,230,109,0.05)',padding:'0.5rem',borderRadius:6,marginBottom:'0.4rem',whiteSpace:'pre-wrap'}}>📝 {s.notes[l.id]}</div>}
                  <button onClick={()=>{setNoteEdit(l.id);setNoteText(s.notes[l.id]||"");}} style={{fontSize:'0.68rem',color:'#8892A8',background:'#1E2536',border:'1px solid #2A3348',padding:'0.25rem 0.6rem',borderRadius:4,cursor:'pointer',fontFamily:'inherit'}}>{s.notes[l.id]?'✏️ Edit Note':'📝 Add Note'}</button>
                </div>
              )}
            </div>
          </div>}
        </div>;})}
      </div>)}
    </div>}

    {/* ═══ STUDY PLAN ═══ */}
    {s.tab==="plan"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.15rem'}}>12-Week Study Plan</h1>
      <p style={{color:'#8892A8',fontSize:'0.8rem',marginBottom:'1rem'}}>Structured path from beginner to practice-ready. Check off tasks as you complete them.</p>
      <div style={{display:'grid',gap:'0.75rem'}}>
        {STUDY_PLAN.map((wk,wi)=>{
          const done=wk.tasks.filter(t=>s.planTasks[`${wk.wk}::${t}`]).length;
          const pc=Math.round((done/wk.tasks.length)*100);
          return<div key={wi} style={C}>
            <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.4rem'}}>
              <span style={{fontSize:'0.65rem',color:'#4ECDC4',fontFamily:'monospace',background:'rgba(78,205,196,0.1)',padding:'0.15rem 0.4rem',borderRadius:4}}>WEEKS {wk.wk}</span>
              <h3 style={{fontSize:'0.95rem',fontFamily:"'DM Serif Display',serif",flex:1}}>{wk.t}</h3>
              <span style={{fontSize:'0.7rem',color:pc===100?'#22C55E':'#8892A8'}}>{pc}%</span>
            </div>
            <p style={{fontSize:'0.78rem',color:'#8892A8',marginBottom:'0.6rem'}}>{wk.desc}</p>
            <div style={{display:'grid',gap:'0.2rem'}}>
              {wk.tasks.map((task,ti)=>{
                const key=`${wk.wk}::${task}`;const checked=s.planTasks[key];
                return<div key={ti} onClick={()=>togglePlanTask(wk.wk,task)} style={{display:'flex',alignItems:'center',gap:'0.4rem',padding:'0.35rem 0.5rem',background:'#1E2536',borderRadius:6,cursor:'pointer',fontSize:'0.78rem',color:checked?'#22C55E':'#C8CDD8'}}>
                  <span style={{fontSize:'0.75rem'}}>{checked?'☑':'☐'}</span>
                  <span style={{textDecoration:checked?'line-through':'none',opacity:checked?0.6:1}}>{task}</span>
                </div>;
              })}
            </div>
          </div>;
        })}
      </div>
    </div>}

    {/* ═══ SIMULATORS ═══ */}
    {s.tab==="sims"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.15rem'}}>Platform Simulators</h1>
      <p style={{color:'#8892A8',fontSize:'0.8rem',marginBottom:'1rem'}}>AI-powered scenarios. {SIMULATORS.reduce((a,s)=>a+s.sc.length,0)} scenarios across {SIMULATORS.length} platforms.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:'0.7rem'}}>
        {SIMULATORS.map(sim=><div key={sim.id} style={C}>
          <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.6rem'}}><span style={{fontSize:'1.2rem'}}>{sim.i}</span><h3 style={{fontSize:'0.95rem',fontFamily:"'DM Serif Display',serif"}}>{sim.n}</h3><span style={{marginLeft:'auto',fontSize:'0.65rem',color:'#5A6580'}}>{sim.sc.length}</span></div>
          {sim.sc.map(sc=>{const k=`${sim.id}-${sc.id}`;const act=sA===k;const lc=sc.l==='Basic'?'#22C55E':sc.l==='Mid'?'#FFE66D':sc.l==='Advanced'?'#FB923C':'#FF6B6B';
          return<div key={sc.id} style={{marginBottom:'0.25rem'}}>
            <div onClick={()=>{setSA(act?null:k);setAR("");}} style={{background:act?'#1A2030':'#1E2536',border:`1px solid ${act?sim.c:'#2A3348'}`,borderRadius:act?'8px 8px 0 0':8,padding:'0.45rem 0.6rem',cursor:'pointer',fontSize:'0.78rem'}}>
              <span style={{fontSize:'0.55rem',color:lc,background:`${lc}22`,padding:'0.08rem 0.25rem',borderRadius:3,fontWeight:600,marginRight:'0.25rem'}}>{sc.l}</span>{sc.t}
            </div>
            {act&&<div style={{background:'#141820',border:'1px solid #2A3348',borderTop:'none',borderRadius:'0 0 8px 8px',padding:'0.65rem'}}>
              <p style={{fontSize:'0.75rem',color:'#8892A8',marginBottom:'0.4rem'}}>{sc.d}</p>
              <button onClick={async()=>{const r=await callAI(`Simulate ${sim.n} for CSV training at Irish pharma company.\nScenario: "${sc.t}" (${sc.l})\n${sc.d}\n\nProvide:\n1. BACKGROUND\n2. TASK — step-by-step\n3. DOCUMENTATION required\n4. EXPECTED OUTCOMES\n5. COMMON MISTAKES\n6. REGULATORY REFS`);if(r)u({simH:[...s.simH,{d:new Date().toISOString(),sim:sim.n,sc:sc.t}]});}} style={B(sim.c)}>{aL?'⏳...':'▶ Launch'}</button>
              {aR&&act&&<div style={{marginTop:'0.5rem',background:'#1E2536',borderRadius:8,padding:'0.75rem',fontSize:'0.78rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:400,overflow:'auto'}}>{aR}</div>}
            </div>}
          </div>;})}
        </div>)}
      </div>
    </div>}

    {/* ═══ INTERVIEW ═══ */}
    {s.tab==="interview"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.15rem'}}>Interview Preparation</h1>
      <p style={{color:'#8892A8',fontSize:'0.8rem',marginBottom:'0.75rem'}}>Question bank + AI mock interview with scoring.</p>

      <div style={{...C,marginBottom:'1.25rem',borderColor:mockMode?'#22C55E':'#2A3348'}}>
        <h3 style={{fontSize:'0.92rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.3rem'}}>🎤 AI Mock Interview</h3>
        <p style={{fontSize:'0.75rem',color:'#8892A8',marginBottom:'0.6rem'}}>Type your answer. AI scores like a real interviewer. Scores saved to dashboard.</p>
        {!mockMode?(<div style={{display:'flex',gap:'0.4rem'}}>
          <button onClick={()=>startMock('entry')} style={B('#4ECDC4')}>🟢 Entry Level</button>
          <button onClick={()=>startMock('mid')} style={B('#A78BFA')}>🟣 Mid Level</button>
        </div>):mockQ?(<div>
          <div style={{background:'#1E2536',borderRadius:8,padding:'0.85rem',marginBottom:'0.6rem'}}>
            <div style={{fontSize:'0.6rem',color:mockLv==='entry'?'#4ECDC4':'#A78BFA',textTransform:'uppercase',fontWeight:600,marginBottom:'0.2rem'}}>{mockLv} — {mockQ.c}</div>
            <div style={{fontSize:'0.95rem',fontWeight:600,lineHeight:1.5}}>"{mockQ.q}"</div>
          </div>
          <textarea value={mockAns} onChange={e=>setMockAns(e.target.value)} placeholder="Type your answer as you would in an interview..." style={{...inp,minHeight:90,resize:'vertical',marginBottom:'0.4rem'}}/>
          <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
            <button onClick={submitMock} style={B('#22C55E')}>{aL?'⏳...':'📝 Submit'}</button>
            <button onClick={()=>{setMockMode(false);setMockQ(null);setAR("");}} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8'}}>Exit</button>
            <button onClick={()=>startMock(mockLv)} style={{...B('transparent'),border:'1px solid #2A3348',color:'#8892A8'}}>Next Q</button>
          </div>
          {aR&&<div style={{marginTop:'0.6rem',background:'#1E2536',borderRadius:8,padding:'0.85rem',fontSize:'0.78rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:350,overflow:'auto',borderLeft:'3px solid #22C55E'}}>{aR}</div>}
        </div>):null}
      </div>

      {["entry","mid"].map(lv=><div key={lv} style={{marginBottom:'1.25rem'}}>
        <h2 style={{fontSize:'0.95rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.5rem',color:lv==='entry'?'#4ECDC4':'#A78BFA'}}>{lv==='entry'?'🟢 Entry':'🟣 Mid'} Level — {INTERVIEW_DATA[lv].length} Qs</h2>
        {INTERVIEW_DATA[lv].map((x,i)=>{const k=`${lv}-${i}`;const op=xI===k;return<div key={k} style={{marginBottom:'0.25rem'}}>
          <div onClick={()=>setXI(op?null:k)} style={{background:'#141820',border:'1px solid #2A3348',borderRadius:op?'8px 8px 0 0':8,padding:'0.5rem 0.7rem',cursor:'pointer',display:'flex',gap:'0.3rem',alignItems:'flex-start'}}>
            <span style={{color:'#5A6580',fontSize:'0.68rem',marginTop:'0.12rem'}}>{op?'▾':'▸'}</span>
            <div style={{flex:1}}><div style={{fontSize:'0.82rem',fontWeight:500}}>{x.q}</div><span style={{fontSize:'0.55rem',color:lv==='entry'?'#4ECDC4':'#A78BFA',background:lv==='entry'?'rgba(78,205,196,0.1)':'rgba(167,139,250,0.1)',padding:'0.06rem 0.25rem',borderRadius:3}}>{x.c}</span></div>
          </div>
          {op&&<div style={{background:'#1A2030',border:'1px solid #2A3348',borderTop:'none',borderRadius:'0 0 8px 8px',padding:'0.75rem',fontSize:'0.78rem',lineHeight:1.7,color:'#C8CDD8'}}>
            <div style={{color:'#4ECDC4',fontSize:'0.62rem',fontWeight:600,marginBottom:'0.25rem',textTransform:'uppercase'}}>Model Answer:</div>{x.a}
          </div>}
        </div>;})}
      </div>)}
    </div>}

    {/* ═══ JOBS ═══ */}
    {s.tab==="jobs"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.6rem'}}>🇮🇪 Ireland CSV Jobs</h1>
      {!s.cfg.apiKey&&<div style={{background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.3)',borderRadius:8,padding:'0.55rem',fontSize:'0.78rem',color:'#FF6B6B',marginBottom:'0.6rem'}}>⚠️ Set API key in Settings.</div>}
      <button onClick={()=>callAI(`List 10 CSV/Validation Engineer jobs in Ireland March 2026:\n- Title, Company, Location, Level, Requirements (KNEAT/ValGenesis/SAP/LIMS), Salary €\nCompanies: Pfizer, Lilly, MSD, J&J, AbbVie + PharmaLex, DPS, PM Group, Jacobs.`,"Irish pharma recruiter.")} style={B()}>{aL?'⏳...':'🔍 Search Jobs'}</button>
      {aR&&s.tab==="jobs"&&<div style={{...C,marginTop:'0.65rem',fontSize:'0.8rem',lineHeight:1.75,whiteSpace:'pre-wrap',maxHeight:550,overflow:'auto'}}>{aR}</div>}
    </div>}

    {/* ═══ TESTS ═══ */}
    {s.tab==="test"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.15rem'}}>Test Center</h1>
      <p style={{color:'#8892A8',fontSize:'0.8rem',marginBottom:'0.75rem'}}>{QUIZ_BANK.length} quiz questions + Feynman game with persistent scoring.</p>

      {!cq?<div>
        <h3 style={{fontSize:'0.88rem',marginBottom:'0.5rem'}}>📝 Quizzes</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))',gap:'0.4rem',marginBottom:'1.25rem'}}>
          <div onClick={()=>startQ()} style={{...Cs,cursor:'pointer'}}><span style={{fontSize:'0.95rem'}}>🎲</span><div style={{fontSize:'0.82rem',fontWeight:600}}>Random (10)</div><div style={{fontSize:'0.65rem',color:'#8892A8'}}>All {QUIZ_BANK.length} Qs</div></div>
          {MODULES.filter(m=>QUIZ_BANK.some(q=>q.m===m.id)).slice(0,6).map(m=><div key={m.id} onClick={()=>startQ(m.id)} style={{...Cs,cursor:'pointer'}}><span style={{fontSize:'0.95rem'}}>{m.i}</span><div style={{fontSize:'0.82rem',fontWeight:600}}>{m.t}</div><div style={{fontSize:'0.65rem',color:'#8892A8'}}>{QUIZ_BANK.filter(q=>q.m===m.id).length} Qs</div></div>)}
        </div>

        <div style={C}>
          <h3 style={{fontSize:'0.92rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.3rem'}}>🧠 Feynman Technique Game</h3>
          <p style={{fontSize:'0.75rem',color:'#8892A8',marginBottom:'0.5rem'}}>Explain a concept simply. AI scores accuracy, completeness, clarity. Saved to dashboard.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.2rem',marginBottom:'0.5rem'}}>
            {FEYNMAN_TOPICS.map(t=><button key={t} onClick={()=>{setFT(t);setAR("");setFI("");}} style={{background:fT===t?'rgba(78,205,196,0.2)':'#1E2536',border:`1px solid ${fT===t?'#4ECDC4':'#2A3348'}`,color:fT===t?'#4ECDC4':'#8892A8',padding:'0.18rem 0.4rem',borderRadius:4,cursor:'pointer',fontSize:'0.66rem',fontFamily:'inherit'}}>{t}</button>)}
          </div>
          {fT&&<div>
            <div style={{fontSize:'0.78rem',marginBottom:'0.25rem',color:'#4ECDC4'}}>Explain "<strong>{fT}</strong>":</div>
            <textarea value={fI} onChange={e=>setFI(e.target.value)} placeholder="Your explanation..." style={{...inp,minHeight:90,resize:'vertical'}}/>
            <button onClick={subFeyn} style={{...B(),marginTop:'0.3rem'}}>{aL?'⏳...':'📝 Score'}</button>
            {aR&&<div style={{marginTop:'0.5rem',background:'#1E2536',borderRadius:8,padding:'0.75rem',fontSize:'0.78rem',lineHeight:1.7,whiteSpace:'pre-wrap',color:'#C8CDD8',maxHeight:350,overflow:'auto',borderLeft:'3px solid #FF6B6B'}}>{aR}</div>}
          </div>}
        </div>
      </div>

      :qi>=cq.length?
        <div style={{...C,textAlign:'center',maxWidth:420,margin:'0 auto',padding:'1.5rem'}}>
          <div style={{fontSize:'2rem',fontFamily:"'DM Serif Display',serif",color:qs/cq.length>=0.8?'#22C55E':qs/cq.length>=0.6?'#FFE66D':'#FF6B6B'}}>{qs}/{cq.length}</div>
          <div style={{color:'#8892A8',margin:'0.3rem 0 0.8rem'}}>{Math.round((qs/cq.length)*100)}% — {qs/cq.length>=0.8?"Excellent!":qs/cq.length>=0.6?"Good.":"Keep studying!"}</div>
          <button onClick={()=>setCq(null)} style={B()}>Back</button>
        </div>
      :
        <div style={{...C,maxWidth:620,padding:'1.25rem'}}>
          <div style={{fontSize:'0.68rem',color:'#4ECDC4',fontFamily:'monospace',marginBottom:'0.25rem'}}>Q {qi+1}/{cq.length}</div>
          <div style={{fontSize:'0.95rem',fontWeight:600,marginBottom:'0.85rem',lineHeight:1.5}}>{cq[qi].q}</div>
          <div style={{display:'grid',gap:'0.3rem'}}>
            {cq[qi].o.map((opt,i)=>{let bg='#1E2536',bd='#2A3348',cl='#C8CDD8';if(qa){if(i===cq[qi].a){bg='rgba(34,197,94,0.1)';bd='#22C55E';cl='#22C55E';}else if(i===selA&&i!==cq[qi].a){bg='rgba(255,107,107,0.1)';bd='#FF6B6B';cl='#FF6B6B';}}
            return<div key={i} onClick={()=>ansQ(i)} style={{padding:'0.5rem 0.7rem',background:bg,border:`1px solid ${bd}`,borderRadius:8,cursor:qa?'default':'pointer',fontSize:'0.82rem',color:cl}}>{String.fromCharCode(65+i)}. {opt}</div>;})}
          </div>
          {qa&&<div style={{marginTop:'0.5rem',padding:'0.65rem',background:'#1E2536',borderRadius:8,borderLeft:'3px solid #4ECDC4',fontSize:'0.78rem',color:'#8892A8',lineHeight:1.6}}>{cq[qi].e}</div>}
          {qa&&<button onClick={nxtQ} style={{...B(),marginTop:'0.5rem'}}>{qi+1>=cq.length?'Results':'Next →'}</button>}
        </div>
      }
    </div>}

    {/* ═══ FLOWCHARTS ═══ */}
    {s.tab==="flow"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.15rem'}}>Process Flowcharts</h1>
      <p style={{color:'#8892A8',fontSize:'0.8rem',marginBottom:'0.75rem'}}>{FLOWCHARTS.length} key CSV workflows.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:'0.5rem',marginBottom:'0.75rem'}}>
        {FLOWCHARTS.map(fc=><div key={fc.id} onClick={()=>setFS(fS===fc.id?null:fc.id)} style={{...Cs,cursor:'pointer',borderColor:fS===fc.id?'#4ECDC4':'#2A3348'}}>
          <div style={{fontSize:'0.82rem',fontWeight:600}}>{fc.t}</div><div style={{fontSize:'0.65rem',color:'#5A6580'}}>{fc.n.length} steps</div>
        </div>)}
      </div>
      {fS&&<div style={C}><h3 style={{fontSize:'0.92rem',marginBottom:'0.5rem',fontFamily:"'DM Serif Display',serif"}}>{FLOWCHARTS.find(f=>f.id===fS).t}</h3>{renderFC(FLOWCHARTS.find(f=>f.id===fS))}</div>}
    </div>}

    {/* ═══ RESOURCES ═══ */}
    {s.tab==="resources"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.15rem'}}>Resources & References</h1>
      <p style={{color:'#8892A8',fontSize:'0.8rem',marginBottom:'0.75rem'}}>Primary regulatory documents, guides, and learning resources.</p>
      <div style={{display:'grid',gap:'0.4rem'}}>
        {RESOURCES.map((r,i)=><a key={i} href={r.u} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:'0.7rem',padding:'0.75rem',background:'#141820',border:'1px solid #2A3348',borderRadius:8,textDecoration:'none',color:'#E8ECF4',transition:'border-color 0.15s'}}>
          <span style={{fontSize:'0.6rem',color:'#4ECDC4',background:'rgba(78,205,196,0.1)',padding:'0.15rem 0.35rem',borderRadius:3,fontWeight:600,whiteSpace:'nowrap'}}>{r.ty}</span>
          <span style={{fontSize:'0.82rem'}}>{r.t}</span>
          <span style={{marginLeft:'auto',fontSize:'0.7rem',color:'#5A6580'}}>↗</span>
        </a>)}
      </div>

      <h3 style={{fontSize:'0.95rem',fontFamily:"'DM Serif Display',serif",marginTop:'1.5rem',marginBottom:'0.5rem'}}>📚 Reference Books (Course Bibles)</h3>
      <div style={{display:'grid',gap:'0.4rem'}}>
        {[
          {t:"Testing Computer Systems for FDA/MHRA Compliance",a:"David Stokes",y:"2004",p:"CRC Press",f:"Testing methodology, test strategies, IQ/OQ/PQ, deviations, risk-based testing"},
          {t:"Validating Corporate Computer Systems",a:"Guy Wingate (Editor)",y:"2000",p:"Interpharm Press",f:"IT strategy, infrastructure, ERP, networks, supplier audits, e-signatures, change control"},
          {t:"Validating Pharmaceutical Systems",a:"John Andrews (Editor)",y:"2005",p:"CRC Press/Taylor & Francis",f:"SCADA, LIMS case study, ERP, risk assessment, inspector's viewpoint, legacy systems, traceability"},
        ].map((b,i)=><div key={i} style={{...Cs}}>
          <div style={{fontSize:'0.85rem',fontWeight:600}}>{b.t}</div>
          <div style={{fontSize:'0.72rem',color:'#8892A8'}}>{b.a} ({b.y}) — {b.p}</div>
          <div style={{fontSize:'0.7rem',color:'#5A6580',marginTop:'0.2rem'}}>Covers: {b.f}</div>
        </div>)}
      </div>
    </div>}

    {/* ═══ SETTINGS ═══ */}
    {s.tab==="cfg"&&<div>
      <h1 style={{fontSize:'1.6rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.75rem'}}>Settings</h1>
      <div style={{...C,maxWidth:480,marginBottom:'0.75rem'}}>
        <h3 style={{fontSize:'0.88rem',marginBottom:'0.5rem'}}>🔑 OpenRouter API</h3>
        <div style={{marginBottom:'0.5rem'}}><label style={{fontSize:'0.7rem',color:'#8892A8',display:'block',marginBottom:'0.12rem'}}>API Key</label><input type="password" value={s.cfg.apiKey} placeholder="sk-or-v1-..." onChange={e=>u({cfg:{...s.cfg,apiKey:e.target.value}})} style={inp}/></div>
        <div style={{marginBottom:'0.5rem'}}><label style={{fontSize:'0.7rem',color:'#8892A8',display:'block',marginBottom:'0.12rem'}}>Model</label><input type="text" value={s.cfg.model} placeholder="minimax/MiniMax-M1" onChange={e=>u({cfg:{...s.cfg,model:e.target.value}})} style={inp}/><div style={{fontSize:'0.62rem',color:'#5A6580',marginTop:'0.1rem'}}>Default: minimax/MiniMax-M1</div></div>
        <div style={{fontSize:'0.72rem',color:'#8892A8',padding:'0.45rem',background:'#1E2536',borderRadius:6}}>ℹ️ Stored locally. Only sent to OpenRouter.</div>
      </div>
      <div style={{...C,maxWidth:480}}>
        <h3 style={{fontSize:'0.88rem',marginBottom:'0.5rem'}}>🗑️ Data</h3>
        <div style={{fontSize:'0.7rem',color:'#5A6580',marginBottom:'0.4rem',background:'#1E2536',padding:'0.4rem',borderRadius:6}}>
          Lessons: {s.done.length} | Quizzes: {s.quizH.length} | Feynman: {s.feynH.length} | Mock: {s.mockIntH.length} | Sims: {s.simH.length} | Notes: {Object.keys(s.notes).length} | Plan tasks: {Object.values(s.planTasks).filter(Boolean).length}
        </div>
        <div style={{display:'flex',gap:'0.4rem'}}>
          <button onClick={exportProgress} style={B()}>📥 Export Progress</button>
          <button onClick={clearD} style={{background:'rgba(255,107,107,0.1)',border:'1px solid rgba(255,107,107,0.3)',color:'#FF6B6B',padding:'0.4rem 0.85rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.73rem',fontFamily:'inherit'}}>⚠️ Reset All</button>
        </div>
      </div>
    </div>}

    </div>
  </div>);
}
