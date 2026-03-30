import { useState, useEffect, useCallback, useMemo } from "react";
import { store } from "./store.js";
import { MODULES, QUIZ_BANK } from "./data/content.js";
import { INTERVIEW_DATA, GLOSSARY, RISK_FACTORS, RISK_BANDS, FLOWCHARTS, FEYNMAN_TOPICS, STUDY_PLAN, RESOURCES, CAREER_DATA, TEMPLATES } from "./data/tools.js";
import { CASE_STUDY } from "./data/casestudy.js";
import { COMPANIES, SCENARIO_QUIZZES } from "./data/companies.js";
import { SearchBox, Flashcards, StreakDisplay, PeerComparison, DarkModeToggle, AudioReader, JobTracker, LinkedInShare, AIDocReviewer, MockInspection, SpacedRepetition } from "./components/Features.jsx";
import LIMSSimulator from "./simulators/LIMSSimulator.jsx";
import KNEATSimulator from "./simulators/KNEATSimulator.jsx";
import SCADASimulator from "./simulators/SCADASimulator.jsx";

const SK="csv-v6";
const DS={page:"home",section:null,done:[],quizH:[],feynH:[],simH:[],mockIntH:[],notes:{},planTasks:{},wrongQs:[],onboarded:false,jobApps:[],cfg:{apiKey:"",model:"minimax/MiniMax-M1"}};

export default function App(){
  const[s,setS]=useState(DS);
  const[ld,setLd]=useState(false);
  const[xL,setXL]=useState(null);
  const[cq,setCq]=useState(null);
  const[qi,setQi]=useState(0);
  const[qs,setQs]=useState(0);
  const[qa,setQa]=useState(false);
  const[selA,setSelA]=useState(null);
  const[xI,setXI]=useState(null);
  const[aR,setAR]=useState("");
  const[aL,setAL]=useState(false);
  const[fT,setFT]=useState("");
  const[fI,setFI]=useState("");
  const[fS,setFS]=useState(null);
  const[mockMode,setMockMode]=useState(false);
  const[mockQ,setMockQ]=useState(null);
  const[mockAns,setMockAns]=useState("");
  const[mockLv,setMockLv]=useState("entry");
  const[noteEdit,setNoteEdit]=useState(null);
  const[noteText,setNoteText]=useState("");
  const[riskSel,setRiskSel]=useState({});
  const[glossF,setGlossF]=useState("");
  const[showEx,setShowEx]=useState(null);
  const[showAns,setShowAns]=useState(null);
  const[menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>{const d=store.get(SK);if(d)setS(p=>({...DS,...p,...d}));setLd(true);},[]);
  useEffect(()=>{if(ld)store.set(SK,s);},[s,ld]);

  const u=useCallback(up=>setS(p=>({...p,...up})),[]);
  const nav=(page,section=null)=>{u({page,section});setMenuOpen(false);setAR("");};
  const tL=MODULES.reduce((a,m)=>a+(m.lessons||[]).length,0);
  const pP=tL>0?Math.round((s.done.length/tL)*100):0;
  const togL=id=>{if(!s.done.includes(id))u({done:[...s.done,id]});setXL(xL===id?null:id);setShowEx(null);setShowAns(null);};

  // AI
  const callAI=async(prompt,sys="You are a CSV expert tutor for pharma in Ireland.")=>{
    if(!s.cfg.apiKey){setAR("⚠️ Add your OpenRouter API key in Settings to use AI features.");return null;}
    setAL(true);setAR("");
    try{const r=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${s.cfg.apiKey}`},body:JSON.stringify({model:s.cfg.model||"minimax/MiniMax-M1",messages:[{role:"system",content:sys},{role:"user",content:prompt}],max_tokens:2500})});const d=await r.json();const t=d.choices?.[0]?.message?.content||"No response.";setAR(t);setAL(false);return t;}catch(e){setAR("Error: "+e.message);setAL(false);return null;}
  };

  // Quiz
  const startQ=(mid=null,retry=false)=>{let p=retry?QUIZ_BANK.filter(q=>s.wrongQs.includes(q.id)):mid?QUIZ_BANK.filter(q=>q.m===mid):[...QUIZ_BANK];p.sort(()=>Math.random()-0.5);setCq(p.slice(0,Math.min(10,p.length)));setQi(0);setQs(0);setQa(false);setSelA(null);};
  const ansQ=i=>{if(qa)return;setSelA(i);setQa(true);const correct=i===cq[qi].a;if(correct){setQs(v=>v+1);if(cq[qi].id&&s.wrongQs.includes(cq[qi].id))u({wrongQs:s.wrongQs.filter(x=>x!==cq[qi].id)});}else if(cq[qi].id&&!s.wrongQs.includes(cq[qi].id))u({wrongQs:[...s.wrongQs,cq[qi].id]});};
  const nxtQ=()=>{if(qi+1>=cq.length){u({quizH:[...s.quizH,{d:new Date().toISOString(),s:qs,t:cq.length,p:Math.round((qs/cq.length)*100)}]});setQi(qi+1);}else{setQi(qi+1);setQa(false);setSelA(null);}};

  // Mock
  const startMock=lv=>{const pool=INTERVIEW_DATA[lv];setMockQ(pool[Math.floor(Math.random()*pool.length)]);setMockAns("");setMockLv(lv);setMockMode(true);setAR("");};
  const submitMock=async()=>{if(!mockAns.trim())return;await callAI(`Mock interview: ${mockLv} CSV Engineer Ireland.\nQ:"${mockQ.q}" (${mockQ.c})\nAnswer:"${mockAns}"\nModel:"${mockQ.a}"\nScore 1-10. STRENGTHS, GAPS, IMPROVEMENT, INTERVIEWER TIP.`);};

  // Helpers
  const togglePlan=(wk,task)=>u({planTasks:{...s.planTasks,[`${wk}::${task}`]:!s.planTasks[`${wk}::${task}`]}});
  const saveNote=lid=>{u({notes:{...s.notes,[lid]:noteText}});setNoteEdit(null);};
  const riskScore=useMemo(()=>Object.values(riskSel).reduce((a,v)=>a+v,0),[riskSel]);
  const riskBand=(RISK_BANDS||[]).find(b=>riskScore>=b.min&&riskScore<=b.max)||{label:"—",color:"#888",strategy:"Select risk factors above."};
  const exportP=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({...s,date:new Date().toISOString(),progress:`${pP}%`},null,2)]));a.download=`csv-progress-${new Date().toISOString().slice(0,10)}.json`;a.click();};
  const clearD=()=>{if(confirm("Reset ALL progress?")){setS(DS);store.del(SK);}};

  // Next step suggestion
  const getNextStep=()=>{
    const allLessons=MODULES.flatMap(m=>(m.lessons||[]).map(l=>({...l,modTitle:m.title,modIcon:m.icon,modId:m.id})));
    const next=allLessons.find(l=>!s.done.includes(l.id));
    if(next) return {text:`Continue: ${next.modIcon} ${next.title}`,action:()=>{nav('course');setTimeout(()=>setXL(next.id),100);}};
    if(s.quizH.length===0) return {text:"Take your first quiz →",action:()=>nav('quiz')};
    if(s.simH.length===0) return {text:"Try the LIMS Simulator →",action:()=>nav('lims')};
    return {text:"Review weak areas or practice interviews",action:()=>nav('quiz')};
  };

  if(!ld)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'var(--bg)',fontFamily:'var(--font-body)'}}>
    <div style={{textAlign:'center'}}><div style={{fontSize:'2rem',marginBottom:'0.5rem',animation:'pulse 1.5s infinite'}}>💊</div><div style={{color:'var(--text2)',fontSize:'0.9rem'}}>Loading CSV Academy...</div></div>
  </div>;

  // ═══ STYLES ═══
  const card={background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'1.5rem',boxShadow:'var(--shadow)'};
  const cardSm={...card,padding:'1rem'};
  const btn=(bg='var(--accent)')=>({background:bg,color:bg.includes('var(--accent)')||bg==='var(--accent)'?'#fff':bg==='var(--ok)'?'#fff':bg==='var(--warn)'?'#fff':'var(--text)',border:'none',padding:'0.5rem 1.25rem',borderRadius:'var(--radius-sm)',cursor:'pointer',fontWeight:600,fontSize:'0.82rem',fontFamily:'var(--font-body)',transition:'opacity 0.15s'});
  const btnOut={...btn('transparent'),border:'1px solid var(--border)',color:'var(--text2)'};
  const inp={width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'0.5rem 0.75rem',color:'var(--text)',fontSize:'0.85rem',fontFamily:'var(--font-body)',outline:'none',transition:'border-color 0.15s'};
  const tag=(color='var(--accent)',bgColor='var(--accent-bg)')=>({display:'inline-block',padding:'0.15rem 0.5rem',borderRadius:4,fontSize:'0.68rem',fontWeight:600,background:bgColor,color});
  const heading=(size='1.8rem')=>({fontSize:size,fontFamily:'var(--font-display)',fontWeight:400,lineHeight:1.3,color:'var(--text)'});

  // ═══ NAVIGATION ═══
  const sections=[
    {id:"learn",label:"Learn",icon:"📚",items:[
      {id:"home",label:"Dashboard"},{id:"course",label:"Course Modules"},{id:"casestudy",label:"Case Study"},{id:"plan",label:"Study Plan"},
    ]},
    {id:"practice",label:"Practice",icon:"🔬",items:[
      {id:"lims",label:"LIMS Simulator"},{id:"kneat",label:"KNEAT Protocol"},{id:"scada",label:"SCADA Dashboard"},
      {id:"quiz",label:"Quizzes"},{id:"scenarios",label:"Scenario Quizzes"},{id:"flashcards",label:"Flashcards"},
    ]},
    {id:"prepare",label:"Prepare",icon:"🎯",items:[
      {id:"interview",label:"Interview Prep"},{id:"inspection",label:"Mock Inspection"},{id:"career",label:"Career Tools"},
      {id:"companies",label:"Company Profiles"},{id:"jobtracker",label:"Job Tracker"},{id:"jobs",label:"AI Job Search"},
    ]},
    {id:"reference",label:"Reference",icon:"📖",items:[
      {id:"glossary",label:"Glossary"},{id:"risk",label:"Risk Calculator"},{id:"flows",label:"Flowcharts"},
      {id:"resources",label:"Resources"},{id:"templates",label:"Templates"},{id:"docreview",label:"AI Doc Reviewer"},{id:"settings",label:"Settings"},
    ]},
  ];

  return<div style={{minHeight:'100vh',background:'var(--bg)',fontFamily:'var(--font-body)'}}>
    {/* ═══ TOP BAR ═══ */}
    <header style={{position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.85)',backdropFilter:'blur(20px)',borderBottom:'1px solid var(--border)',padding:'0 1.5rem',display:'flex',alignItems:'center',height:56}}>
      <div onClick={()=>nav('home')} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'0.5rem',marginRight:'2rem'}}>
        <span style={{fontSize:'1.2rem'}}>💊</span>
        <span style={{fontFamily:'var(--font-display)',fontSize:'1.15rem',color:'var(--text)'}}>CSV Academy</span>
        <span style={{...tag('var(--accent)','var(--accent-bg)'),fontSize:'0.58rem'}}>v6</span>
      </div>

      {/* Desktop nav */}
      <nav style={{display:'flex',gap:'0.25rem',flex:1}}>
        {sections.map(sec=><div key={sec.id} style={{position:'relative'}}>
          <button onClick={()=>u({section:s.section===sec.id?null:sec.id})} style={{background:s.section===sec.id?'var(--accent-bg)':'transparent',border:'none',padding:'0.4rem 0.75rem',borderRadius:'var(--radius-sm)',cursor:'pointer',fontSize:'0.82rem',fontWeight:500,color:s.section===sec.id?'var(--accent)':'var(--text2)',fontFamily:'var(--font-body)',display:'flex',alignItems:'center',gap:'0.3rem'}}>
            <span style={{fontSize:'0.9rem'}}>{sec.icon}</span>{sec.label}
          </button>
          {s.section===sec.id&&<div style={{position:'absolute',top:'100%',left:0,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',boxShadow:'var(--shadow-md)',padding:'0.4rem',minWidth:180,marginTop:4,zIndex:50,animation:'fadeIn 0.15s ease'}}>
            {sec.items.map(item=><div key={item.id} onClick={()=>{nav(item.id);u({section:null});}} style={{padding:'0.45rem 0.75rem',borderRadius:'var(--radius-sm)',cursor:'pointer',fontSize:'0.82rem',color:s.page===item.id?'var(--accent)':'var(--text)',fontWeight:s.page===item.id?600:400,background:s.page===item.id?'var(--accent-bg)':'transparent'}} onMouseEnter={e=>e.target.style.background='var(--surface2)'} onMouseLeave={e=>e.target.style.background=s.page===item.id?'var(--accent-bg)':'transparent'}>{item.label}</div>)}
          </div>}
        </div>)}
      </nav>

      <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
        <SearchBox modules={MODULES} glossary={GLOSSARY} onNavigate={r=>{if(r.id){nav('course');setTimeout(()=>setXL(r.id),100);}else nav('glossary');}} />
        <DarkModeToggle />
        <div style={{...tag('var(--ok)','var(--ok-bg)'),fontSize:'0.72rem'}}>{pP}%</div>
      </div>
    </header>

    {/* Click overlay to close dropdowns */}
    {s.section&&<div onClick={()=>u({section:null})} style={{position:'fixed',inset:0,zIndex:40}}/>}

    {/* Mobile bottom nav */}
    <div className="mobile-nav" style={{display:'none',position:'fixed',bottom:0,left:0,right:0,zIndex:100,background:'var(--surface)',borderTop:'1px solid var(--border)',padding:'0.4rem',gap:'0.2rem',justifyContent:'space-around'}}>
      {[{id:'home',icon:'📊',l:'Dash'},{id:'course',icon:'📚',l:'Learn'},{id:'lims',icon:'🔬',l:'Sim'},{id:'quiz',icon:'🧠',l:'Quiz'},{id:'interview',icon:'🎯',l:'Prep'},{id:'settings',icon:'⚙️',l:'More'}].map(t=>
        <button key={t.id} onClick={()=>nav(t.id)} style={{background:s.page===t.id?'var(--accent-bg)':'transparent',border:'none',padding:'0.3rem 0.5rem',borderRadius:6,cursor:'pointer',textAlign:'center',fontFamily:'var(--font-body)',color:s.page===t.id?'var(--accent)':'var(--text3)',fontSize:'0.62rem'}}>
          <div style={{fontSize:'1.1rem'}}>{t.icon}</div>{t.l}
        </button>
      )}
    </div>

    <main style={{maxWidth:1100,margin:'0 auto',padding:'1.5rem',animation:'fadeIn 0.3s ease'}}>

    {/* ═══ ONBOARDING ═══ */}
    {!s.onboarded&&s.page==="home"&&<div style={{...card,marginBottom:'1.5rem',borderLeft:'4px solid var(--accent)',background:'linear-gradient(135deg,var(--surface) 0%,var(--accent-bg) 100%)'}}>
      <h2 style={{...heading('1.4rem'),marginBottom:'0.5rem'}}>Welcome to CSV Academy 👋</h2>
      <p style={{color:'var(--text2)',fontSize:'0.9rem',lineHeight:1.7,marginBottom:'1rem'}}>You're about to learn Computer System Validation — the skill that pharmaceutical companies in Ireland need most. This platform will take you from zero to interview-ready with deep course content, interactive simulators, and practical tools.</p>
      <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap',marginBottom:'1rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.3rem',fontSize:'0.82rem',color:'var(--text2)'}}><span style={{color:'var(--accent)'}}>✓</span> 11 course modules from 3 textbooks</div>
        <div style={{display:'flex',alignItems:'center',gap:'0.3rem',fontSize:'0.82rem',color:'var(--text2)'}}><span style={{color:'var(--accent)'}}>✓</span> 3 interactive simulators (LIMS, KNEAT, SCADA)</div>
        <div style={{display:'flex',alignItems:'center',gap:'0.3rem',fontSize:'0.82rem',color:'var(--text2)'}}><span style={{color:'var(--accent)'}}>✓</span> Interview prep with AI mock scoring</div>
      </div>
      <button onClick={()=>{u({onboarded:true});nav('course');}} style={btn()}>Start Learning →</button>
    </div>}

    {/* ═══ DASHBOARD ═══ */}
    {s.page==="home"&&<div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1.25rem'}}>
        <div><h1 style={heading()}>Dashboard</h1><p style={{color:'var(--text3)',fontSize:'0.88rem',marginTop:'0.2rem'}}>Your CSV learning journey at a glance</p></div>
        <button onClick={exportP} style={btnOut}>📥 Export</button>
      </div>

      {/* Next step */}
      {(()=>{const ns=getNextStep();return ns?<div onClick={ns.action} style={{...card,marginBottom:'1rem',cursor:'pointer',borderLeft:'4px solid var(--accent)',display:'flex',alignItems:'center',gap:'0.75rem',padding:'1rem 1.25rem'}}>
        <div style={{width:36,height:36,borderRadius:'50%',background:'var(--accent)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>→</div>
        <div><div style={{fontSize:'0.72rem',color:'var(--accent)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Recommended Next</div><div style={{fontSize:'0.95rem',fontWeight:500}}>{ns.text}</div></div>
      </div>:null;})()}

      {/* Stats grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'0.75rem',marginBottom:'1.25rem'}}>
        {[{l:"Course",v:`${pP}%`,sub:`${s.done.length}/${tL} lessons`,c:'var(--accent)',bg:'var(--accent-bg)'},
          {l:"Quizzes",v:s.quizH.length,sub:s.quizH.length?`${Math.round(s.quizH.reduce((a,x)=>a+x.p,0)/s.quizH.length)}% avg`:"Not started",c:'var(--purple)',bg:'var(--purple-bg)'},
          {l:"Simulators",v:s.simH.length,sub:"completed",c:'var(--blue)',bg:'var(--blue-bg)'},
          {l:"Weak Questions",v:s.wrongQs.length,sub:s.wrongQs.length?"needs review":"all clear",c:s.wrongQs.length?'var(--warn)':'var(--ok)',bg:s.wrongQs.length?'var(--warn-bg)':'var(--ok-bg)'},
        ].map((x,i)=><div key={i} style={cardSm}>
          <div style={{fontSize:'0.68rem',color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'0.2rem'}}>{x.l}</div>
          <div style={{fontSize:'1.6rem',fontFamily:'var(--font-display)',color:x.c}}>{x.v}</div>
          <div style={{fontSize:'0.75rem',color:'var(--text3)'}}>{x.sub}</div>
        </div>)}
      </div>

      {/* Progress bar */}
      <div style={{...cardSm,marginBottom:'1rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem'}}><span style={{fontSize:'0.85rem',fontWeight:600}}>Overall Progress</span><span style={{fontSize:'0.85rem',color:'var(--accent)',fontFamily:'var(--font-mono)'}}>{pP}%</span></div>
        <div style={{height:8,background:'var(--surface2)',borderRadius:4}}><div style={{height:'100%',width:`${pP}%`,background:'var(--accent)',borderRadius:4,transition:'width 0.5s'}}/></div>
      </div>

      {/* Module cards */}
      <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'0.6rem'}}>Course Modules</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'0.6rem',marginBottom:'1rem'}}>
        {MODULES.map(m=>{const ls=m.lessons||[];const dn=ls.filter(l=>s.done.includes(l.id)).length;const pc=ls.length?Math.round((dn/ls.length)*100):0;
          return<div key={m.id} onClick={()=>nav('course')} style={{...cardSm,cursor:'pointer',transition:'box-shadow 0.15s'}} onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--shadow-md)'} onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow)'}>
            <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.3rem'}}>
              <span style={{fontSize:'1rem'}}>{m.icon}</span>
              <span style={{fontSize:'0.82rem',fontWeight:600,flex:1}}>{m.title}</span>
              <span style={{fontSize:'0.72rem',color:pc===100?'var(--ok)':'var(--text3)',fontFamily:'var(--font-mono)'}}>{pc===100?'✓':pc+'%'}</span>
            </div>
            <div style={{height:3,background:'var(--surface2)',borderRadius:2}}><div style={{height:'100%',width:`${pc}%`,background:m.color||'var(--accent)',borderRadius:2,transition:'width 0.3s'}}/></div>
          </div>;
        })}
      </div>

      {/* Quick actions */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'0.6rem'}}>
        {[{icon:"🔬",title:"LIMS Simulator",desc:"Practice lab workflows",page:"lims"},
          {icon:"📝",title:"KNEAT Protocol",desc:"Execute IQ steps",page:"kneat"},
          {icon:"⚙️",title:"SCADA Dashboard",desc:"Monitor live process",page:"scada"},
          {icon:"🎯",title:"Mock Interview",desc:"AI-scored practice",page:"interview"},
        ].map(q=><div key={q.page} onClick={()=>nav(q.page)} style={{...cardSm,cursor:'pointer',display:'flex',alignItems:'center',gap:'0.6rem',transition:'box-shadow 0.15s'}} onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--shadow-md)'} onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow)'}>
          <span style={{fontSize:'1.3rem'}}>{q.icon}</span>
          <div><div style={{fontSize:'0.85rem',fontWeight:600}}>{q.title}</div><div style={{fontSize:'0.72rem',color:'var(--text3)'}}>{q.desc}</div></div>
        </div>)}
      </div>

      {/* Motivation + review widgets */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'0.75rem',marginTop:'1.25rem'}}>
        <StreakDisplay quizH={s.quizH} feynH={s.feynH} simH={s.simH} done={s.done}/>
        <div><PeerComparison pP={pP} quizAvg={s.quizH.length?Math.round(s.quizH.reduce((a,x)=>a+x.p,0)/s.quizH.length):0} lessonsCompleted={s.done.length} totalLessons={tL}/><div style={{marginTop:'0.6rem'}}><SpacedRepetition wrongQs={s.wrongQs} quizH={s.quizH} feynH={s.feynH}/></div></div>
      </div>
      {pP>0&&<div style={{marginTop:'0.75rem',display:'flex',alignItems:'center',gap:'0.6rem'}}><LinkedInShare moduleName={`${s.done.length} CSV lessons`} progress={pP}/><span style={{fontSize:'0.78rem',color:'var(--text3)'}}>Share your progress</span></div>}
    </div>}

    {/* ═══ COURSE ═══ */}
    {s.page==="course"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>Course Modules</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.5rem'}}>Deep content from three reference textbooks. Each lesson includes exercises with model answers.</p>
      {MODULES.map(m=>{const ls=m.lessons||[];const dn=ls.filter(l=>s.done.includes(l.id)).length;const pc=ls.length?Math.round((dn/ls.length)*100):0;
        return<div key={m.id} style={{marginBottom:'2rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.6rem'}}>
            <span style={{fontSize:'1.3rem'}}>{m.icon}</span>
            <div style={{flex:1}}>
              <h2 style={{fontSize:'1.1rem',fontFamily:'var(--font-display)',margin:0}}>{m.title}</h2>
              <div style={{display:'flex',gap:'0.5rem',fontSize:'0.72rem',color:'var(--text3)',flexWrap:'wrap',marginTop:'0.1rem'}}>
                <span style={tag(m.color||'var(--accent)',`${m.color||'var(--accent)'}15`)}>{m.level}</span>
                <span>⏱ ~{m.hours}h</span>
                {m.bookRefs&&<span>📖 {m.bookRefs.join(', ')}</span>}
                <span style={{marginLeft:'auto',fontFamily:'var(--font-mono)',color:pc===100?'var(--ok)':'var(--text3)'}}>{pc}%</span>
              </div>
            </div>
          </div>
          {m.overview&&<div style={{marginLeft:'1.5rem',marginBottom:'0.6rem',fontSize:'0.85rem',color:'var(--text2)',lineHeight:1.7,padding:'0.75rem 1rem',background:'var(--surface2)',borderRadius:'var(--radius)',borderLeft:`3px solid ${m.color||'var(--accent)'}`}}>{m.overview}</div>}
          {ls.map(l=>{const ic=s.done.includes(l.id);const io=xL===l.id;
            return<div key={l.id} style={{marginLeft:'1.5rem',marginBottom:'0.4rem'}}>
              <div onClick={()=>togL(l.id)} style={{background:io?'var(--surface)':'transparent',border:`1px solid ${io?'var(--border)':'var(--border)'}`,borderRadius:io?'var(--radius) var(--radius) 0 0':'var(--radius)',padding:'0.6rem 0.9rem',cursor:'pointer',display:'flex',alignItems:'center',gap:'0.4rem',transition:'background 0.15s',boxShadow:io?'var(--shadow)':'none'}}>
                <span style={{width:20,height:20,borderRadius:'50%',border:`2px solid ${ic?'var(--ok)':'var(--border)'}`,background:ic?'var(--ok)':'transparent',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'0.65rem',flexShrink:0}}>{ic?'✓':''}</span>
                <div style={{flex:1}}>
                  <span style={{fontSize:'0.88rem',fontWeight:io?600:400}}>{l.title}</span>
                  {l.duration&&<span style={{fontSize:'0.68rem',color:'var(--text3)',marginLeft:'0.5rem'}}>{l.duration}</span>}
                </div>
                {s.notes[l.id]&&<span style={{fontSize:'0.62rem',color:'var(--orange)'}}>📝</span>}
                <span style={{fontSize:'0.72rem',color:'var(--text3)',transition:'transform 0.15s',transform:io?'rotate(180deg)':'rotate(0)'}}>▾</span>
              </div>
              {io&&<div style={{...card,borderTop:'none',borderRadius:'0 0 var(--radius) var(--radius)',padding:'1.25rem'}}>
                {l.objectives&&<div style={{marginBottom:'1rem',padding:'0.75rem 1rem',background:'var(--accent-bg)',borderRadius:'var(--radius-sm)',borderLeft:'3px solid var(--accent)'}}>
                  <div style={{fontSize:'0.75rem',fontWeight:600,color:'var(--accent)',marginBottom:'0.3rem'}}>🎯 Learning Objectives</div>
                  <ul style={{fontSize:'0.82rem',color:'var(--text2)',paddingLeft:'1.2rem',lineHeight:1.6,margin:0}}>{l.objectives.map((o,i)=><li key={i}>{o}</li>)}</ul>
                </div>}
                <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'0.3rem'}}><AudioReader text={l.content}/></div>
                <div style={{fontSize:'0.88rem',lineHeight:1.85,color:'var(--text)',whiteSpace:'pre-wrap',marginBottom:'1rem'}}>{l.content}</div>
                {l.exercise&&<div style={{marginBottom:'1rem',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
                  <div onClick={()=>setShowEx(showEx===l.id?null:l.id)} style={{padding:'0.75rem 1rem',background:'var(--surface2)',cursor:'pointer',display:'flex',alignItems:'center',gap:'0.4rem'}}>
                    <span>✍️</span><span style={{fontSize:'0.88rem',fontWeight:600,flex:1}}>Exercise: {l.exercise.title}</span><span style={{fontSize:'0.72rem',color:'var(--text3)'}}>{showEx===l.id?'▴':'▾'}</span>
                  </div>
                  {showEx===l.id&&<div style={{padding:'1rem',borderTop:'1px solid var(--border)'}}>
                    <div style={{fontSize:'0.85rem',color:'var(--text)',whiteSpace:'pre-wrap',lineHeight:1.7,marginBottom:'0.75rem'}}>{l.exercise.instructions}</div>
                    <button onClick={()=>setShowAns(showAns===l.id?null:l.id)} style={btn('var(--orange)')}>{showAns===l.id?'Hide':'Show'} Model Answer</button>
                    {showAns===l.id&&<div style={{marginTop:'0.6rem',padding:'0.85rem',background:'var(--ok-bg)',borderRadius:'var(--radius-sm)',borderLeft:'3px solid var(--ok)',fontSize:'0.85rem',color:'var(--text)',whiteSpace:'pre-wrap',lineHeight:1.7}}>{l.exercise.modelAnswer}</div>}
                  </div>}
                </div>}
                {l.checkpoints&&<div style={{padding:'0.75rem 1rem',background:'var(--surface2)',borderRadius:'var(--radius-sm)',marginBottom:'0.75rem'}}>
                  <div style={{fontSize:'0.75rem',fontWeight:600,color:'var(--orange)',marginBottom:'0.3rem'}}>✅ Self-Check</div>
                  <ul style={{fontSize:'0.82rem',color:'var(--text2)',paddingLeft:'1.2rem',lineHeight:1.6,margin:0}}>{l.checkpoints.map((c,i)=><li key={i}>{c}</li>)}</ul>
                </div>}
                {l.keyTerms&&<div style={{display:'flex',gap:'0.3rem',flexWrap:'wrap',marginBottom:'0.75rem'}}>
                  {l.keyTerms.map((t,i)=><span key={i} style={tag()}>{t}</span>)}
                </div>}
                <div style={{borderTop:'1px solid var(--border)',paddingTop:'0.6rem'}}>
                  {noteEdit===l.id?<div><textarea value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Your notes..." style={{...inp,minHeight:60,resize:'vertical',marginBottom:'0.3rem'}}/><div style={{display:'flex',gap:'0.3rem'}}><button onClick={()=>saveNote(l.id)} style={btn()}>Save</button><button onClick={()=>setNoteEdit(null)} style={btnOut}>Cancel</button></div></div>
                  :<div>{s.notes[l.id]&&<div style={{fontSize:'0.82rem',color:'var(--orange)',background:'var(--orange-bg)',padding:'0.5rem 0.75rem',borderRadius:'var(--radius-sm)',marginBottom:'0.4rem',whiteSpace:'pre-wrap'}}>📝 {s.notes[l.id]}</div>}
                    <button onClick={()=>{setNoteEdit(l.id);setNoteText(s.notes[l.id]||"");}} style={{fontSize:'0.75rem',color:'var(--text3)',background:'var(--surface2)',border:'1px solid var(--border)',padding:'0.3rem 0.6rem',borderRadius:'var(--radius-sm)',cursor:'pointer',fontFamily:'var(--font-body)'}}>{s.notes[l.id]?'✏️ Edit Note':'📝 Add Note'}</button></div>}
                </div>
              </div>}
            </div>;
          })}
        </div>;
      })}
    </div>}

    {/* ═══ SIMULATORS ═══ */}
    {s.page==="lims"&&<LIMSSimulator onComplete={d=>u({simH:[...s.simH,{d:new Date().toISOString(),sim:'LIMS'}]})}/>}
    {s.page==="kneat"&&<KNEATSimulator onComplete={d=>u({simH:[...s.simH,{d:new Date().toISOString(),sim:'KNEAT'}]})}/>}
    {s.page==="scada"&&<SCADASimulator onComplete={d=>u({simH:[...s.simH,{d:new Date().toISOString(),sim:'SCADA'}]})}/>}

    {/* ═══ STUDY PLAN ═══ */}
    {s.page==="plan"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>12-Week Study Plan</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>Structured path from beginner to interview-ready. Check tasks as you complete them.</p>
      {(STUDY_PLAN||[]).map((wk,wi)=>{const done=wk.tasks.filter(t=>s.planTasks[`${wk.wk}::${t}`]).length;const pc=Math.round((done/wk.tasks.length)*100);
        return<div key={wi} style={{...card,marginBottom:'0.75rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.35rem'}}>
            <span style={{...tag(),fontFamily:'var(--font-mono)',fontSize:'0.7rem'}}>WEEKS {wk.wk}</span>
            <h3 style={{fontSize:'1rem',fontFamily:'var(--font-display)',flex:1}}>{wk.t}</h3>
            <span style={{fontSize:'0.75rem',color:pc===100?'var(--ok)':'var(--text3)',fontFamily:'var(--font-mono)'}}>{pc}%</span>
          </div>
          <p style={{fontSize:'0.82rem',color:'var(--text2)',marginBottom:'0.5rem'}}>{wk.desc}</p>
          <div style={{display:'grid',gap:'0.2rem'}}>
            {wk.tasks.map((task,ti)=>{const k=`${wk.wk}::${task}`;const ch=s.planTasks[k];
              return<div key={ti} onClick={()=>togglePlan(wk.wk,task)} style={{display:'flex',alignItems:'center',gap:'0.4rem',padding:'0.4rem 0.6rem',background:ch?'var(--ok-bg)':'var(--surface2)',borderRadius:'var(--radius-sm)',cursor:'pointer',fontSize:'0.82rem',color:ch?'var(--ok)':'var(--text)',transition:'background 0.15s'}}>
                <span style={{width:18,height:18,borderRadius:4,border:`2px solid ${ch?'var(--ok)':'var(--border)'}`,background:ch?'var(--ok)':'transparent',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'0.6rem',flexShrink:0}}>{ch?'✓':''}</span>
                <span style={{textDecoration:ch?'line-through':'none',opacity:ch?0.6:1}}>{task}</span>
              </div>;
            })}
          </div>
        </div>;
      })}
    </div>}

    {/* ═══ QUIZ ═══ */}
    {s.page==="quiz"&&<div>
      <h1 style={{...heading(),marginBottom:'1rem'}}>Test Center</h1>
      {!cq?<div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'0.6rem',marginBottom:'1.5rem'}}>
          <div onClick={()=>startQ()} style={{...cardSm,cursor:'pointer'}}>🎲 <strong>Random 10</strong><div style={{fontSize:'0.72rem',color:'var(--text3)'}}>{QUIZ_BANK.length} questions</div></div>
          {s.wrongQs.length>0&&<div onClick={()=>startQ(null,true)} style={{...cardSm,cursor:'pointer',borderColor:'var(--warn)'}}><strong style={{color:'var(--warn)'}}>🔄 Retry Wrong ({s.wrongQs.length})</strong></div>}
        </div>
        <div style={card}>
          <h3 style={{fontSize:'1.05rem',fontFamily:'var(--font-display)',marginBottom:'0.4rem'}}>🧠 Feynman Technique</h3>
          <p style={{fontSize:'0.82rem',color:'var(--text2)',marginBottom:'0.6rem'}}>Explain a concept simply. AI scores your accuracy, completeness, and clarity.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.25rem',marginBottom:'0.6rem'}}>
            {(FEYNMAN_TOPICS||[]).map(t=><button key={t} onClick={()=>{setFT(t);setAR("");setFI("");}} style={{background:fT===t?'var(--accent-bg)':'var(--surface2)',border:`1px solid ${fT===t?'var(--accent)':'var(--border)'}`,color:fT===t?'var(--accent)':'var(--text2)',padding:'0.2rem 0.5rem',borderRadius:'var(--radius-sm)',cursor:'pointer',fontSize:'0.72rem',fontFamily:'var(--font-body)'}}>{t}</button>)}
          </div>
          {fT&&<div><textarea value={fI} onChange={e=>setFI(e.target.value)} placeholder={`Explain "${fT}" as simply as possible...`} style={{...inp,minHeight:90,resize:'vertical'}}/><button onClick={async()=>{if(!fI.trim())return;const r=await callAI(`Feynman technique. Learner explains "${fT}":\n"${fI}"\nScore 1-10. Format: Overall: X/10. Feedback.`);if(r){const m=r.match(/(\d+)\s*\/\s*10/);u({feynH:[...s.feynH,{d:new Date().toISOString(),topic:fT,score:m?parseInt(m[1]):5}]});}}} style={{...btn(),marginTop:'0.4rem'}}>{aL?'Scoring...':'Score My Explanation'}</button>{aR&&<div style={{marginTop:'0.6rem',...card,borderLeft:'3px solid var(--purple)',fontSize:'0.85rem',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{aR}</div>}</div>}
        </div>
      </div>
      :qi>=cq.length?<div style={{...card,textAlign:'center',maxWidth:420,margin:'0 auto'}}>
        <div style={{fontSize:'2.5rem',fontFamily:'var(--font-display)',color:qs/cq.length>=0.8?'var(--ok)':qs/cq.length>=0.6?'var(--orange)':'var(--warn)'}}>{qs}/{cq.length}</div>
        <div style={{color:'var(--text2)',margin:'0.3rem 0 1rem',fontSize:'0.95rem'}}>{Math.round((qs/cq.length)*100)}% — {qs/cq.length>=0.8?"Excellent!":qs/cq.length>=0.6?"Good progress.":"Keep studying."}</div>
        <button onClick={()=>setCq(null)} style={btn()}>Back to Tests</button>
      </div>
      :<div style={{...card,maxWidth:640}}>
        <div style={{fontSize:'0.72rem',color:'var(--accent)',fontFamily:'var(--font-mono)',marginBottom:'0.3rem'}}>Question {qi+1} of {cq.length}{s.wrongQs.includes(cq[qi]?.id)?' • 🔄 Previously wrong':''}</div>
        <div style={{fontSize:'1.05rem',fontWeight:500,marginBottom:'1rem',lineHeight:1.5}}>{cq[qi].q}</div>
        <div style={{display:'grid',gap:'0.35rem'}}>
          {cq[qi].o.map((opt,i)=>{let bg='var(--surface2)',bd='var(--border)',cl='var(--text)';if(qa){if(i===cq[qi].a){bg='var(--ok-bg)';bd='var(--ok)';cl='var(--ok)';}else if(i===selA&&i!==cq[qi].a){bg='var(--warn-bg)';bd='var(--warn)';cl='var(--warn)';}}
          return<div key={i} onClick={()=>ansQ(i)} style={{padding:'0.6rem 0.85rem',background:bg,border:`1.5px solid ${bd}`,borderRadius:'var(--radius)',cursor:qa?'default':'pointer',fontSize:'0.88rem',color:cl,transition:'all 0.15s'}}>{String.fromCharCode(65+i)}. {opt}</div>;})}
        </div>
        {qa&&<div style={{marginTop:'0.6rem',padding:'0.75rem',background:'var(--accent-bg)',borderRadius:'var(--radius)',borderLeft:'3px solid var(--accent)',fontSize:'0.85rem',color:'var(--text2)',lineHeight:1.6}}>{cq[qi].e}</div>}
        {qa&&<button onClick={nxtQ} style={{...btn(),marginTop:'0.6rem'}}>{qi+1>=cq.length?'See Results':'Next Question →'}</button>}
      </div>}
    </div>}

    {/* ═══ INTERVIEW ═══ */}
    {s.page==="interview"&&<div>
      <h1 style={{...heading(),marginBottom:'0.75rem'}}>Interview Preparation</h1>
      <div style={{...card,marginBottom:'1.5rem',borderColor:mockMode?'var(--ok)':'var(--border)'}}>
        <h3 style={{fontSize:'1.05rem',fontFamily:'var(--font-display)',marginBottom:'0.3rem'}}>🎤 AI Mock Interview</h3>
        <p style={{fontSize:'0.82rem',color:'var(--text2)',marginBottom:'0.6rem'}}>Practice answering real interview questions. AI scores your response 1-10.</p>
        {!mockMode?<div style={{display:'flex',gap:'0.5rem'}}><button onClick={()=>startMock('entry')} style={btn()}>Entry Level</button><button onClick={()=>startMock('mid')} style={btn('var(--purple)')}>Mid Level</button></div>
        :mockQ?<div>
          <div style={{background:'var(--surface2)',borderRadius:'var(--radius)',padding:'1rem',marginBottom:'0.6rem'}}>
            <div style={{fontSize:'0.68rem',color:'var(--accent)',textTransform:'uppercase',fontWeight:600}}>{mockLv} Level — {mockQ.c}</div>
            <div style={{fontSize:'1.05rem',fontWeight:500,marginTop:'0.2rem',lineHeight:1.5}}>"{mockQ.q}"</div>
          </div>
          <textarea value={mockAns} onChange={e=>setMockAns(e.target.value)} placeholder="Type your answer as you would say it in an interview..." style={{...inp,minHeight:100,resize:'vertical',marginBottom:'0.5rem'}}/>
          <div style={{display:'flex',gap:'0.4rem'}}><button onClick={submitMock} style={btn('var(--ok)')}>{aL?'Scoring...':'Submit Answer'}</button><button onClick={()=>{setMockMode(false);setAR("");}} style={btnOut}>Exit</button><button onClick={()=>startMock(mockLv)} style={btnOut}>Next Question</button></div>
          {aR&&<div style={{marginTop:'0.75rem',...card,borderLeft:'3px solid var(--ok)',fontSize:'0.88rem',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{aR}</div>}
        </div>:null}
      </div>
      {["entry","mid"].map(lv=><div key={lv} style={{marginBottom:'1.5rem'}}>
        <h2 style={{fontSize:'1.05rem',fontFamily:'var(--font-display)',marginBottom:'0.5rem',color:lv==='entry'?'var(--accent)':'var(--purple)'}}>{lv==='entry'?'Entry Level':'Mid Level'} — {INTERVIEW_DATA[lv].length} Questions</h2>
        {INTERVIEW_DATA[lv].map((x,i)=>{const k=`${lv}-${i}`;const op=xI===k;return<div key={k} style={{marginBottom:'0.35rem'}}>
          <div onClick={()=>setXI(op?null:k)} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:op?'var(--radius) var(--radius) 0 0':'var(--radius)',padding:'0.6rem 0.85rem',cursor:'pointer',display:'flex',gap:'0.4rem',boxShadow:'var(--shadow)'}}>
            <span style={{color:'var(--text3)',fontSize:'0.72rem',marginTop:'0.1rem'}}>{op?'▴':'▾'}</span>
            <div style={{flex:1}}><div style={{fontSize:'0.88rem',fontWeight:500}}>{x.q}</div><span style={tag(lv==='entry'?'var(--accent)':'var(--purple)',lv==='entry'?'var(--accent-bg)':'var(--purple-bg)')}>{x.c}</span></div>
          </div>
          {op&&<div style={{background:'var(--surface)',border:'1px solid var(--border)',borderTop:'none',borderRadius:'0 0 var(--radius) var(--radius)',padding:'0.85rem',fontSize:'0.88rem',lineHeight:1.7,boxShadow:'var(--shadow)'}}>
            <div style={{fontSize:'0.68rem',fontWeight:600,color:'var(--ok)',marginBottom:'0.3rem',textTransform:'uppercase'}}>Model Answer</div>{x.a}
          </div>}
        </div>;})}
      </div>)}
    </div>}

    {/* ═══ CAREER TOOLS ═══ */}
    {s.page==="career"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>Career Tools</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>Everything you need to land a CSV role in Ireland.</p>

      {(CAREER_DATA||[]).map((section,si)=><div key={si} style={{...card,marginBottom:'1rem'}}>
        <h3 style={{fontSize:'1.05rem',fontFamily:'var(--font-display)',marginBottom:'0.5rem'}}>{section.title}</h3>
        <div style={{fontSize:'0.88rem',lineHeight:1.8,whiteSpace:'pre-wrap',color:'var(--text)'}}>{section.content}</div>
      </div>)}
    </div>}

    {/* ═══ TEMPLATES ═══ */}
    {s.page==="templates"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>Downloadable Templates</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>Reference templates to study from and practice with.</p>
      {(TEMPLATES||[]).map((tpl,ti)=><div key={ti} style={{...card,marginBottom:'0.75rem'}}>
        <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'0.3rem'}}>{tpl.title}</h3>
        <p style={{fontSize:'0.82rem',color:'var(--text2)',marginBottom:'0.6rem'}}>{tpl.desc}</p>
        <pre style={{background:'var(--surface2)',padding:'1rem',borderRadius:'var(--radius-sm)',fontSize:'0.78rem',fontFamily:'var(--font-mono)',lineHeight:1.6,overflow:'auto',maxHeight:400,whiteSpace:'pre-wrap',color:'var(--text)'}}>{tpl.template}</pre>
        <button onClick={()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([tpl.template]));a.download=tpl.filename;a.click();}} style={{...btn(),marginTop:'0.5rem'}}>📥 Download as {tpl.filename.split('.').pop().toUpperCase()}</button>
      </div>)}
    </div>}

    {/* ═══ JOBS ═══ */}
    {s.page==="jobs"&&<div>
      <h1 style={{...heading(),marginBottom:'0.75rem'}}>🇮🇪 Ireland CSV Jobs</h1>
      {!s.cfg.apiKey&&<div style={{...cardSm,borderLeft:'3px solid var(--warn)',marginBottom:'0.75rem',fontSize:'0.85rem',color:'var(--warn)'}}>Add your OpenRouter API key in Settings to enable job search.</div>}
      <button onClick={()=>callAI(`List 10 CSV/Validation Engineer jobs in Ireland. Title, Company, Location, Level, Requirements, Salary €.`,"Irish pharma recruiter.")} style={btn()}>{aL?'Searching...':'🔍 Search CSV Jobs in Ireland'}</button>
      {aR&&s.page==="jobs"&&<div style={{...card,marginTop:'0.75rem',fontSize:'0.88rem',lineHeight:1.8,whiteSpace:'pre-wrap'}}>{aR}</div>}
    </div>}

    {/* ═══ GLOSSARY ═══ */}
    {s.page==="glossary"&&<div>
      <h1 style={{...heading(),marginBottom:'0.5rem'}}>Glossary</h1>
      <input value={glossF} onChange={e=>setGlossF(e.target.value)} placeholder="🔍 Filter terms..." style={{...inp,maxWidth:300,marginBottom:'1rem'}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'0.5rem'}}>
        {(GLOSSARY||[]).filter(g=>!glossF||g.term.toLowerCase().includes(glossF.toLowerCase())||g.def.toLowerCase().includes(glossF.toLowerCase())).map((g,i)=><div key={i} style={cardSm}>
          <div style={{fontSize:'0.88rem',fontWeight:700,color:'var(--accent)',fontFamily:'var(--font-mono)',marginBottom:'0.15rem'}}>{g.term}</div>
          <div style={{fontSize:'0.82rem',color:'var(--text2)',lineHeight:1.5}}>{g.def}</div>
        </div>)}
      </div>
    </div>}

    {/* ═══ RISK CALCULATOR ═══ */}
    {s.page==="risk"&&<div>
      <h1 style={{...heading(),marginBottom:'0.15rem'}}>Risk Calculator</h1>
      <p style={{color:'var(--text2)',fontSize:'0.85rem',marginBottom:'1rem'}}>Based on Stokes Ch.16 weighted scoring system.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:'1rem',alignItems:'start'}}>
        <div style={card}>{(RISK_FACTORS||[]).map((rf,fi)=><div key={fi} style={{marginBottom:'1rem'}}>
          <div style={{fontSize:'0.85rem',fontWeight:600,marginBottom:'0.3rem'}}>{rf.name}</div>
          <div style={{display:'flex',gap:'0.3rem',flexWrap:'wrap'}}>{rf.options.map((opt,oi)=>{const sel=riskSel[fi]===opt.w;
            return<button key={oi} onClick={()=>setRiskSel({...riskSel,[fi]:opt.w})} style={{background:sel?'var(--accent-bg)':'var(--surface2)',border:`1.5px solid ${sel?'var(--accent)':'var(--border)'}`,color:sel?'var(--accent)':'var(--text2)',padding:'0.3rem 0.6rem',borderRadius:'var(--radius-sm)',cursor:'pointer',fontSize:'0.78rem',fontFamily:'var(--font-body)'}}>{opt.label} <span style={{opacity:0.4,fontFamily:'var(--font-mono)',fontSize:'0.68rem'}}>({opt.w})</span></button>;
          })}</div></div>)}</div>
        <div style={{...card,textAlign:'center',position:'sticky',top:80}}>
          <div style={{fontSize:'0.68rem',color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Risk Score</div>
          <div style={{fontSize:'3rem',fontFamily:'var(--font-display)',color:riskBand.color}}>{riskScore}</div>
          <div style={{fontSize:'0.95rem',fontWeight:700,color:riskBand.color,marginBottom:'0.6rem'}}>{riskBand.label}</div>
          <div style={{height:8,background:'var(--surface2)',borderRadius:4,marginBottom:'0.6rem'}}><div style={{height:'100%',width:`${Math.min(riskScore,100)}%`,background:riskBand.color,borderRadius:4,transition:'all 0.3s'}}/></div>
          <div style={{fontSize:'0.78rem',color:'var(--text2)',textAlign:'left',lineHeight:1.6}}>{riskBand.strategy}</div>
        </div>
      </div>
    </div>}

    {/* ═══ FLOWCHARTS ═══ */}
    {s.page==="flows"&&<div>
      <h1 style={{...heading(),marginBottom:'0.75rem'}}>Process Flowcharts</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'0.5rem',marginBottom:'1rem'}}>
        {(FLOWCHARTS||[]).map(fc=><div key={fc.id} onClick={()=>setFS(fS===fc.id?null:fc.id)} style={{...cardSm,cursor:'pointer',borderColor:fS===fc.id?'var(--accent)':'var(--border)'}}>
          <div style={{fontSize:'0.88rem',fontWeight:600}}>{fc.t}</div><div style={{fontSize:'0.72rem',color:'var(--text3)'}}>{fc.n.length} steps</div>
        </div>)}
      </div>
      {fS&&(()=>{const fc=FLOWCHARTS.find(f=>f.id===fS);const ns=fc.n;const W=580;const H=ns.length*46+16;return<div style={card}><h3 style={{fontSize:'1rem',fontFamily:'var(--font-display)',marginBottom:'0.6rem'}}>{fc.t}</h3><svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:520}}><defs><marker id="a" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="var(--accent)"/></marker></defs>{ns.map((_,i)=>i<ns.length-1?<line key={`e${i}`} x1={W/2} y1={i*46+34} x2={W/2} y2={(i+1)*46+6} stroke="var(--border)" strokeWidth={1.5} markerEnd="url(#a)"/>:null)}{ns.map((n,i)=><g key={i}><rect x={W/2-100} y={i*46+8} width={200} height={24} rx={6} fill="var(--surface)" stroke={i===0?"var(--accent)":i===ns.length-1?"var(--ok)":"var(--border)"} strokeWidth={i===0||i===ns.length-1?2:1}/><text x={W/2} y={i*46+24} textAnchor="middle" fill="var(--text)" fontSize={10} fontFamily="var(--font-body)">{n}</text></g>)}</svg></div>;})()}
    </div>}

    {/* ═══ RESOURCES ═══ */}
    {s.page==="resources"&&<div>
      <h1 style={{...heading(),marginBottom:'0.75rem'}}>Resources & References</h1>
      <div style={{display:'grid',gap:'0.4rem'}}>
        {(RESOURCES||[]).map((r,i)=><a key={i} href={r.u} target="_blank" rel="noopener noreferrer" style={{...cardSm,display:'flex',alignItems:'center',gap:'0.6rem',textDecoration:'none',color:'var(--text)'}}>
          <span style={tag()}>{r.ty}</span><span style={{flex:1,fontSize:'0.88rem'}}>{r.t}</span><span style={{color:'var(--text3)'}}>↗</span>
        </a>)}
      </div>
    </div>}

    {/* ═══ SETTINGS ═══ */}
    {s.page==="settings"&&<div>
      <h1 style={{...heading(),marginBottom:'1rem'}}>Settings</h1>
      <div style={{...card,maxWidth:480,marginBottom:'1rem'}}>
        <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'0.5rem'}}>🔑 OpenRouter API</h3>
        <div style={{marginBottom:'0.5rem'}}><label style={{fontSize:'0.78rem',color:'var(--text2)'}}>API Key</label><input type="password" value={s.cfg.apiKey} placeholder="sk-or-..." onChange={e=>u({cfg:{...s.cfg,apiKey:e.target.value}})} style={{...inp,marginTop:'0.15rem'}}/></div>
        <div style={{marginBottom:'0.5rem'}}><label style={{fontSize:'0.78rem',color:'var(--text2)'}}>Model</label><input value={s.cfg.model} onChange={e=>u({cfg:{...s.cfg,model:e.target.value}})} style={{...inp,marginTop:'0.15rem'}}/></div>
        <p style={{fontSize:'0.78rem',color:'var(--text3)',background:'var(--surface2)',padding:'0.5rem',borderRadius:'var(--radius-sm)'}}>Your key is stored locally in your browser only.</p>
      </div>
      <div style={{...card,maxWidth:480}}>
        <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'0.5rem'}}>Data Management</h3>
        <div style={{fontSize:'0.78rem',color:'var(--text3)',background:'var(--surface2)',padding:'0.5rem',borderRadius:'var(--radius-sm)',marginBottom:'0.5rem',fontFamily:'var(--font-mono)'}}>
          Lessons: {s.done.length} | Quizzes: {s.quizH.length} | Wrong: {s.wrongQs.length} | Notes: {Object.keys(s.notes).length} | Sims: {s.simH.length}
        </div>
        <div style={{display:'flex',gap:'0.4rem'}}><button onClick={exportP} style={btn()}>📥 Export Progress</button><button onClick={clearD} style={btn('var(--warn)')}>Reset All</button></div>
      </div>
    </div>}

    {/* ═══ CASE STUDY ═══ */}
    {s.page==="casestudy"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>{CASE_STUDY.title}</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'0.3rem'}}>{CASE_STUDY.subtitle}</p>
      <div style={{display:'flex',gap:'0.5rem',marginBottom:'1rem',fontSize:'0.78rem',color:'var(--text3)',flexWrap:'wrap'}}>
        <span>🏭 {CASE_STUDY.company}</span><span>💻 {CASE_STUDY.system}</span><span>📅 {CASE_STUDY.duration}</span>
      </div>
      <div style={{...card,marginBottom:'1.25rem',borderLeft:'4px solid var(--accent)',fontSize:'0.88rem',lineHeight:1.8,whiteSpace:'pre-wrap'}}>{CASE_STUDY.overview}</div>
      {CASE_STUDY.phases.map((p,i)=><div key={p.id} style={{...card,marginBottom:'0.75rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.5rem'}}>
          <span style={tag()}>{p.week}</span>
          <h3 style={{fontSize:'1.05rem',fontFamily:'var(--font-display)'}}>{p.title}</h3>
        </div>
        <div style={{fontSize:'0.88rem',lineHeight:1.85,whiteSpace:'pre-wrap',color:'var(--text)'}}>{p.content}</div>
      </div>)}
      {CASE_STUDY.keyLessons&&<div style={{...card,borderLeft:'4px solid var(--ok)'}}>
        <h3 style={{fontSize:'1rem',fontFamily:'var(--font-display)',marginBottom:'0.5rem',color:'var(--ok)'}}>🎓 Key Lessons Learned</h3>
        <ul style={{fontSize:'0.85rem',lineHeight:1.8,paddingLeft:'1.2rem',color:'var(--text)'}}>{CASE_STUDY.keyLessons.map((l,i)=><li key={i}>{l}</li>)}</ul>
      </div>}
    </div>}

    {/* ═══ SCENARIO QUIZZES ═══ */}
    {s.page==="scenarios"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>Scenario-Based Questions</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>Real-world situations you'll face as a CSV engineer. These test critical thinking, not memorisation.</p>
      {(SCENARIO_QUIZZES||[]).map((sq,si)=><div key={sq.id} style={{...card,marginBottom:'1rem'}}>
        <div style={{display:'flex',gap:'0.3rem',marginBottom:'0.4rem'}}><span style={tag(sq.difficulty==='Entry'?'var(--ok)':sq.difficulty==='Mid'?'var(--orange)':'var(--warn)',sq.difficulty==='Entry'?'var(--ok-bg)':sq.difficulty==='Mid'?'var(--orange-bg)':'var(--warn-bg)')}>{sq.difficulty}</span></div>
        <div style={{fontSize:'0.9rem',lineHeight:1.7,marginBottom:'0.6rem',padding:'0.75rem',background:'var(--surface2)',borderRadius:'var(--radius-sm)',borderLeft:'3px solid var(--purple)'}}>{sq.scenario}</div>
        <div style={{fontSize:'0.95rem',fontWeight:600,marginBottom:'0.5rem'}}>{sq.question}</div>
        <div style={{display:'grid',gap:'0.3rem',marginBottom:'0.6rem'}}>{sq.options.map((o,oi)=><div key={oi} style={{padding:'0.5rem 0.75rem',background:oi===sq.correct?'var(--ok-bg)':'var(--surface2)',border:`1px solid ${oi===sq.correct?'var(--ok)':'var(--border)'}`,borderRadius:'var(--radius-sm)',fontSize:'0.85rem',color:oi===sq.correct?'var(--ok)':'var(--text)',cursor:'default'}}>{String.fromCharCode(65+oi)}. {o} {oi===sq.correct&&' ✓'}</div>)}</div>
        <div style={{padding:'0.75rem',background:'var(--accent-bg)',borderRadius:'var(--radius-sm)',borderLeft:'3px solid var(--accent)',fontSize:'0.85rem',lineHeight:1.7,whiteSpace:'pre-wrap'}}><strong style={{color:'var(--accent)'}}>Explanation:</strong> {sq.explanation}</div>
      </div>)}    </div>}

    {/* ═══ FLASHCARDS ═══ */}
    {s.page==="flashcards"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>Flashcards</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>Swipeable study cards for all {(GLOSSARY||[]).length} key terms. Mark cards as mastered to remove them from the deck.</p>
      <div style={{maxWidth:500,margin:'0 auto'}}><Flashcards glossary={GLOSSARY}/></div>
    </div>}

    {/* ═══ COMPANY PROFILES ═══ */}
    {s.page==="companies"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>Irish Pharma Company Profiles</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>Intelligence on the companies you'll be interviewing at. What they make, what systems they use, and insider tips.</p>
      <div style={{display:'grid',gap:'0.75rem'}}>
        {(COMPANIES||[]).map((c,ci)=><div key={ci} style={card}>
          <h3 style={{fontSize:'1.1rem',fontFamily:'var(--font-display)',marginBottom:'0.4rem'}}>{c.name}</h3>
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:'0.2rem 1rem',fontSize:'0.85rem',lineHeight:1.6}}>
            <span style={{color:'var(--text3)',fontWeight:500}}>📍 Locations:</span><span>{c.locations}</span>
            <span style={{color:'var(--text3)',fontWeight:500}}>💊 Products:</span><span>{c.products}</span>
            <span style={{color:'var(--text3)',fontWeight:500}}>💻 Systems:</span><span style={{fontFamily:'var(--font-mono)',fontSize:'0.78rem'}}>{c.systems}</span>
            <span style={{color:'var(--text3)',fontWeight:500}}>👤 CSV Roles:</span><span>{c.csvRoles}</span>
            <span style={{color:'var(--text3)',fontWeight:500}}>🎯 Interview:</span><span>{c.interviewStyle}</span>
          </div>
          <div style={{marginTop:'0.6rem',padding:'0.6rem',background:'var(--accent-bg)',borderRadius:'var(--radius-sm)',fontSize:'0.82rem',borderLeft:'3px solid var(--accent)'}}>
            <strong style={{color:'var(--accent)'}}>💡 Insider Tip:</strong> {c.tipFromInsiders}
          </div>
        </div>)}
      </div>
    </div>}

    {/* ═══ JOB TRACKER ═══ */}
    {s.page==="jobtracker"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>Job Application Tracker</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>Track your CSV job applications across Irish pharma companies.</p>
      <JobTracker jobs={s.jobApps} onUpdate={j=>u({jobApps:j})}/>
    </div>}

    {/* ═══ AI DOCUMENT REVIEWER ═══ */}
    {s.page==="docreview"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>AI Document Reviewer</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>Paste your URS, OQ test script, or VP draft. AI reviews it against CSV best practices and gives specific improvement suggestions.</p>
      {!s.cfg.apiKey&&<div style={{...cardSm,borderLeft:'3px solid var(--warn)',marginBottom:'0.75rem',color:'var(--warn)',fontSize:'0.85rem'}}>Set your OpenRouter API key in Settings to use this feature.</div>}
      <AIDocReviewer callAI={callAI} isLoading={aL} response={aR}/>
    </div>}

    {/* ═══ MOCK HPRA INSPECTION ═══ */}
    {s.page==="inspection"&&<div>
      <h1 style={{...heading(),marginBottom:'0.2rem'}}>Mock HPRA Inspection</h1>
      <p style={{color:'var(--text2)',fontSize:'0.88rem',marginBottom:'1.25rem'}}>AI plays an HPRA inspector. You play the CSV lead defending your validation programme. Get scored on your responses.</p>
      {!s.cfg.apiKey&&<div style={{...cardSm,borderLeft:'3px solid var(--warn)',marginBottom:'0.75rem',color:'var(--warn)',fontSize:'0.85rem'}}>Set your OpenRouter API key in Settings to use this feature.</div>}
      <MockInspection callAI={callAI} isLoading={aL} response={aR}/>
    </div>}

    </main>
  </div>;
}
