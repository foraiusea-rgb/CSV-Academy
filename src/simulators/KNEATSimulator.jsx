// KNEAT-style Protocol Execution Simulator
// Simulates paperless validation execution workflow

import { useState } from "react";

const S = {
  bg:'#0F1218', card:'#161B24', border:'#252D3D', surface:'#1C2333',
  text:'#E8ECF4', dim:'#8892A8', accent:'#A78BFA', warn:'#FF6B6B', ok:'#22C55E', yellow:'#FFE66D'
};

const PROTOCOL = {
  title: "IQ Protocol — LabWare LIMS v7.5",
  system: "LabWare LIMS v7.5.2",
  site: "Pfizer Grange Castle, Dublin",
  docId: "IQ-LIMS-2026-001",
  sections: [
    {
      id:"s1", title:"1. Hardware Verification", 
      steps:[
        {id:"1.1",desc:"Verify server hostname matches Design Specification",expected:"Server hostname = GCLIMS-PROD-01",type:"verify"},
        {id:"1.2",desc:"Verify server operating system version",expected:"Windows Server 2022 Standard (Build 20348)",type:"verify"},
        {id:"1.3",desc:"Verify database software version",expected:"Oracle 19c Enterprise Edition (19.18.0)",type:"verify"},
        {id:"1.4",desc:"Verify server RAM meets minimum specification",expected:"≥ 64 GB RAM installed",type:"verify"},
        {id:"1.5",desc:"Verify network connectivity to application server",expected:"Ping response < 5ms, 0% packet loss",type:"verify"},
      ]
    },
    {
      id:"s2", title:"2. Software Installation Verification",
      steps:[
        {id:"2.1",desc:"Verify LabWare LIMS application version",expected:"LabWare LIMS v7.5.2 (Build 7520.4361)",type:"verify"},
        {id:"2.2",desc:"Verify LIMS client installation on QC workstations",expected:"Client v7.5.2 installed on all 12 QC terminals",type:"verify"},
        {id:"2.3",desc:"Verify instrument interface service is running",expected:"LabWare Interface Engine service status = Running",type:"verify"},
        {id:"2.4",desc:"Verify PDF report generator component",expected:"Crystal Reports Runtime v13.0.31 installed",type:"verify"},
      ]
    },
    {
      id:"s3", title:"3. Configuration Verification",
      steps:[
        {id:"3.1",desc:"Verify user access roles match Access Control Matrix",expected:"5 roles configured: Analyst, Senior Analyst, QC Manager, System Admin, QA Reviewer",type:"verify"},
        {id:"3.2",desc:"Verify audit trail is enabled and capturing events",expected:"Audit trail active, test entry captured with user/timestamp",type:"test"},
        {id:"3.3",desc:"Verify password policy meets Part 11 requirements",expected:"Min 8 chars, complexity enforced, 90-day expiry, lockout after 5 attempts",type:"verify"},
        {id:"3.4",desc:"Verify session timeout configured per SOP",expected:"Auto-logout after 15 minutes of inactivity",type:"test"},
        {id:"3.5",desc:"Verify backup schedule is configured and operational",expected:"Daily full backup at 02:00, transaction logs every 15 min",type:"verify"},
      ]
    },
    {
      id:"s4", title:"4. Documentation Verification",
      steps:[
        {id:"4.1",desc:"Verify SOPs are available and current revision",expected:"SOP-LIMS-001 Rev 3, SOP-LIMS-002 Rev 2 in document control",type:"verify"},
        {id:"4.2",desc:"Verify training records for all LIMS users",expected:"Training completion records on file for all 28 named users",type:"verify"},
        {id:"4.3",desc:"Verify supplier documentation package received",expected:"Installation manual, config guide, release notes, FAT report on file",type:"verify"},
      ]
    }
  ]
};

export default function KNEATSimulator({ onComplete }) {
  const [screen, setScreen] = useState("menu");
  const [currentSection, setCurrentSection] = useState(0);
  const [stepResults, setStepResults] = useState({});
  const [stepEvidence, setStepEvidence] = useState({});
  const [stepNotes, setStepNotes] = useState({});
  const [deviations, setDeviations] = useState([]);
  const [devForm, setDevForm] = useState({stepId:"",desc:"",impact:"",action:""});
  const [showDev, setShowDev] = useState(false);
  const [signed, setSigned] = useState({tester:false,reviewer:false});
  const [signName, setSignName] = useState("");
  const [signPwd, setSignPwd] = useState("");
  const [signRole, setSignRole] = useState("");

  const cs = {background:S.card,border:`1px solid ${S.border}`,borderRadius:10,padding:'1.25rem'};
  const btn = (bg=S.accent)=>({background:bg,color:bg===S.accent||bg===S.ok||bg===S.warn?'#0B0E13':S.text,border:'none',padding:'0.45rem 1rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.78rem',fontFamily:'inherit'});
  const input = {width:'100%',background:S.surface,border:`1px solid ${S.border}`,borderRadius:6,padding:'0.4rem 0.6rem',color:S.text,fontSize:'0.8rem',fontFamily:'inherit'};
  const badge = (color)=>({display:'inline-block',padding:'0.12rem 0.4rem',borderRadius:4,fontSize:'0.62rem',fontWeight:600,background:`${color}22`,color,border:`1px solid ${color}44`});

  const allSteps = PROTOCOL.sections.flatMap(s=>s.steps);
  const completedSteps = Object.keys(stepResults).length;
  const totalSteps = allSteps.length;
  const passedSteps = Object.values(stepResults).filter(r=>r==='pass').length;
  const failedSteps = Object.values(stepResults).filter(r=>r==='fail').length;

  const recordResult = (stepId, result) => {
    setStepResults(prev=>({...prev,[stepId]:result}));
  };

  const addDeviation = () => {
    if(!devForm.stepId||!devForm.desc) return;
    setDeviations(prev=>[...prev,{...devForm,id:`DEV-${String(prev.length+1).padStart(3,'0')}`,status:'Open',raisedAt:new Date().toLocaleString('en-IE')}]);
    setDevForm({stepId:"",desc:"",impact:"",action:""});
    setShowDev(false);
  };

  // ═══ MENU ═══
  if(screen==="menu") return <div>
    <div style={{marginBottom:'1.25rem'}}>
      <h2 style={{fontSize:'1.2rem',fontFamily:"'DM Serif Display',serif",color:S.accent,marginBottom:'0.3rem'}}>📝 KNEAT Protocol Execution</h2>
      <p style={{fontSize:'0.82rem',color:S.dim}}>Simulate paperless validation execution. Execute IQ test steps, attach evidence, raise deviations, and apply e-signatures — just like the real KNEAT Gx platform used across Irish pharma.</p>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'0.6rem'}}>
      {[
        {id:"execute",icon:"▶️",title:"Execute Protocol",desc:"Step through IQ test steps, record results, attach evidence. The core KNEAT workflow.",color:S.ok},
        {id:"deviations",icon:"⚠️",title:"Manage Deviations",desc:"View and manage test deviations — investigate root cause, assess impact, document resolution.",color:S.warn},
        {id:"sign",icon:"✍️",title:"E-Signatures & Report",desc:"Apply electronic signatures and generate the validation summary. Part 11 e-signature simulation.",color:S.accent},
      ].map(item=><div key={item.id} onClick={()=>setScreen(item.id)} style={{...cs,cursor:'pointer',transition:'border-color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.borderColor=item.color} onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
        <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.35rem'}}>
          <span style={{fontSize:'1.1rem'}}>{item.icon}</span>
          <span style={{fontSize:'0.85rem',fontWeight:600}}>{item.title}</span>
        </div>
        <p style={{fontSize:'0.72rem',color:S.dim,lineHeight:1.5}}>{item.desc}</p>
      </div>)}
    </div>
    {completedSteps>0&&<div style={{...cs,marginTop:'0.75rem'}}>
      <div style={{fontSize:'0.75rem',fontWeight:600,marginBottom:'0.3rem'}}>Protocol Progress</div>
      <div style={{display:'flex',gap:'1rem',fontSize:'0.78rem'}}>
        <span>Completed: <strong style={{color:S.accent}}>{completedSteps}/{totalSteps}</strong></span>
        <span>Pass: <strong style={{color:S.ok}}>{passedSteps}</strong></span>
        <span>Fail: <strong style={{color:S.warn}}>{failedSteps}</strong></span>
        <span>Deviations: <strong style={{color:deviations.length?S.warn:S.dim}}>{deviations.length}</strong></span>
      </div>
      <div style={{height:5,background:S.surface,borderRadius:3,marginTop:'0.4rem'}}><div style={{height:'100%',width:`${(completedSteps/totalSteps)*100}%`,background:failedSteps>0?S.warn:S.ok,borderRadius:3,transition:'width 0.3s'}}/></div>
    </div>}
  </div>;

  // ═══ EXECUTE PROTOCOL ═══
  if(screen==="execute") {
    const section = PROTOCOL.sections[currentSection];
    return <div>
      <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.75rem'}}>
        <button onClick={()=>setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
        <h2 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif"}}>▶️ Execute: {PROTOCOL.docId}</h2>
      </div>

      <div style={{...cs,marginBottom:'0.6rem',borderLeft:`3px solid ${S.accent}`,background:S.surface,padding:'0.8rem'}}>
        <div style={{fontSize:'0.75rem',color:S.dim}}>
          <strong style={{color:S.accent}}>📖 What you're learning:</strong> This simulates KNEAT's paperless protocol execution. Each test step requires: recording Pass/Fail, entering actual results, and optionally attaching evidence (screenshots, certificates). If a step fails, you must raise a deviation. This is what you'd validate when qualifying KNEAT itself — that the workflow enforces correct sequencing and mandatory fields.
        </div>
      </div>

      {/* Protocol header */}
      <div style={{...cs,marginBottom:'0.6rem',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0.5rem',fontSize:'0.72rem'}}>
        <div><span style={{color:S.dim}}>Protocol: </span><strong>{PROTOCOL.docId}</strong></div>
        <div><span style={{color:S.dim}}>System: </span><strong>{PROTOCOL.system}</strong></div>
        <div><span style={{color:S.dim}}>Site: </span><strong>{PROTOCOL.site}</strong></div>
      </div>

      {/* Section tabs */}
      <div style={{display:'flex',gap:'0.2rem',marginBottom:'0.6rem',overflowX:'auto'}}>
        {PROTOCOL.sections.map((sec,i)=>{
          const secSteps = sec.steps;
          const secDone = secSteps.filter(st=>stepResults[st.id]).length;
          return <button key={sec.id} onClick={()=>setCurrentSection(i)} style={{background:currentSection===i?'rgba(167,139,250,0.12)':'transparent',border:`1px solid ${currentSection===i?S.accent:S.border}`,color:currentSection===i?S.accent:S.dim,padding:'0.35rem 0.6rem',borderRadius:6,cursor:'pointer',fontSize:'0.68rem',fontFamily:'inherit',whiteSpace:'nowrap'}}>
            {sec.title.split('.')[0]}. <span style={{fontSize:'0.6rem'}}>({secDone}/{secSteps.length})</span>
          </button>;
        })}
      </div>

      {/* Steps */}
      <div style={cs}>
        <h3 style={{fontSize:'0.9rem',fontFamily:"'DM Serif Display',serif",marginBottom:'0.6rem',color:S.accent}}>{section.title}</h3>
        <div style={{display:'grid',gap:'0.5rem'}}>
          {section.steps.map(step=>{
            const result = stepResults[step.id];
            const evidence = stepEvidence[step.id] || "";
            const notes = stepNotes[step.id] || "";
            return <div key={step.id} style={{background:S.surface,border:`1px solid ${result==='pass'?S.ok:result==='fail'?S.warn:S.border}`,borderRadius:8,padding:'0.75rem'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'0.5rem',marginBottom:'0.4rem'}}>
                <span style={{fontFamily:'monospace',fontSize:'0.72rem',color:S.accent,fontWeight:600,minWidth:'2rem'}}>{step.id}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:'0.8rem',fontWeight:500,marginBottom:'0.15rem'}}>{step.desc}</div>
                  <div style={{fontSize:'0.72rem',color:S.dim}}>Expected: <span style={{color:S.yellow}}>{step.expected}</span></div>
                </div>
                {result && <span style={badge(result==='pass'?S.ok:S.warn)}>{result==='pass'?'✅ PASS':'❌ FAIL'}</span>}
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.35rem',marginTop:'0.35rem'}}>
                <div>
                  <label style={{fontSize:'0.62rem',color:S.dim}}>Actual Result *</label>
                  <input value={evidence} onChange={e=>setStepEvidence(prev=>({...prev,[step.id]:e.target.value}))} placeholder="Enter actual observed value..." style={{...input,fontSize:'0.75rem'}}/>
                </div>
                <div>
                  <label style={{fontSize:'0.62rem',color:S.dim}}>Notes / Evidence Reference</label>
                  <input value={notes} onChange={e=>setStepNotes(prev=>({...prev,[step.id]:e.target.value}))} placeholder="Screenshot ref, cert #, etc." style={{...input,fontSize:'0.75rem'}}/>
                </div>
              </div>

              <div style={{display:'flex',gap:'0.25rem',marginTop:'0.35rem'}}>
                <button onClick={()=>{if(!evidence){alert('Enter actual result before marking Pass/Fail.');return;}recordResult(step.id,'pass');}} style={{...btn(S.ok),fontSize:'0.7rem',padding:'0.3rem 0.7rem',opacity:result==='pass'?1:0.7}}>✅ Pass</button>
                <button onClick={()=>{if(!evidence){alert('Enter actual result before marking Pass/Fail.');return;}recordResult(step.id,'fail');setShowDev(true);setDevForm(prev=>({...prev,stepId:step.id}));}} style={{...btn(S.warn),fontSize:'0.7rem',padding:'0.3rem 0.7rem',opacity:result==='fail'?1:0.7}}>❌ Fail</button>
              </div>
            </div>;
          })}
        </div>

        {/* Section navigation */}
        <div style={{display:'flex',gap:'0.4rem',marginTop:'0.75rem',justifyContent:'space-between'}}>
          {currentSection>0&&<button onClick={()=>setCurrentSection(currentSection-1)} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Prev Section</button>}
          <div style={{flex:1}}/>
          {currentSection<PROTOCOL.sections.length-1?
            <button onClick={()=>setCurrentSection(currentSection+1)} style={btn()}>Next Section →</button>
            :<button onClick={()=>setScreen("menu")} style={btn(S.ok)}>✅ Complete Execution</button>
          }
        </div>
      </div>

      {/* Deviation popup */}
      {showDev&&<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.7)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200}} onClick={e=>{if(e.target===e.currentTarget)setShowDev(false);}}>
        <div style={{...cs,maxWidth:500,width:'90%'}}>
          <h3 style={{fontSize:'0.95rem',color:S.warn,marginBottom:'0.5rem'}}>⚠️ Raise Deviation</h3>
          <div style={{display:'grid',gap:'0.4rem'}}>
            <div><label style={{fontSize:'0.65rem',color:S.dim}}>Step</label><input disabled value={devForm.stepId} style={input}/></div>
            <div><label style={{fontSize:'0.65rem',color:S.dim}}>Description *</label><textarea value={devForm.desc} onChange={e=>setDevForm({...devForm,desc:e.target.value})} placeholder="Describe what was observed vs expected..." style={{...input,minHeight:60,resize:'vertical'}}/></div>
            <div><label style={{fontSize:'0.65rem',color:S.dim}}>Impact Assessment</label><textarea value={devForm.impact} onChange={e=>setDevForm({...devForm,impact:e.target.value})} placeholder="GxP impact? Patient safety? Data integrity?" style={{...input,minHeight:40,resize:'vertical'}}/></div>
            <div><label style={{fontSize:'0.65rem',color:S.dim}}>Proposed Corrective Action</label><textarea value={devForm.action} onChange={e=>setDevForm({...devForm,action:e.target.value})} placeholder="What needs to be done to resolve?" style={{...input,minHeight:40,resize:'vertical'}}/></div>
          </div>
          <div style={{display:'flex',gap:'0.3rem',marginTop:'0.5rem'}}>
            <button onClick={addDeviation} style={btn(S.warn)}>Submit Deviation</button>
            <button onClick={()=>setShowDev(false)} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>Cancel</button>
          </div>
        </div>
      </div>}

      <div style={{...cs,marginTop:'0.6rem',borderLeft:`3px solid ${S.yellow}`}}>
        <div style={{fontSize:'0.75rem',fontWeight:600,color:S.yellow,marginBottom:'0.15rem'}}>🎓 CSV Validation Points:</div>
        <ul style={{fontSize:'0.72rem',color:S.dim,paddingLeft:'1rem',lineHeight:1.7,margin:0}}>
          <li><strong>OQ:</strong> Verify steps must be executed in section order</li>
          <li><strong>OQ:</strong> Verify actual result is mandatory before marking Pass/Fail</li>
          <li><strong>OQ:</strong> Verify a failed step forces deviation to be raised</li>
          <li><strong>Part 11:</strong> Each step completion captured with user ID and timestamp</li>
          <li><strong>Part 11:</strong> Evidence attachments linked to specific steps (not modifiable)</li>
        </ul>
      </div>
    </div>;
  }

  // ═══ DEVIATIONS ═══
  if(screen==="deviations") return <div>
    <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.75rem'}}>
      <button onClick={()=>setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
      <h2 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif"}}>⚠️ Deviation Management</h2>
    </div>
    {deviations.length===0?
      <div style={{...cs,textAlign:'center',color:S.dim,padding:'2rem'}}>No deviations raised yet. Execute the protocol and fail a step to see deviation management in action.</div>
    :
      <div style={{display:'grid',gap:'0.5rem'}}>
        {deviations.map(dev=><div key={dev.id} style={{...cs,borderLeft:`3px solid ${S.warn}`}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.3rem'}}>
            <span style={{fontFamily:'monospace',fontWeight:700,color:S.warn}}>{dev.id}</span>
            <span style={badge(S.warn)}>{dev.status}</span>
            <span style={{fontSize:'0.65rem',color:S.dim,marginLeft:'auto'}}>Step {dev.stepId} | {dev.raisedAt}</span>
          </div>
          <div style={{fontSize:'0.8rem',marginBottom:'0.2rem'}}><strong>Description:</strong> {dev.desc}</div>
          {dev.impact&&<div style={{fontSize:'0.75rem',color:S.dim}}><strong>Impact:</strong> {dev.impact}</div>}
          {dev.action&&<div style={{fontSize:'0.75rem',color:S.dim}}><strong>Action:</strong> {dev.action}</div>}
          <button onClick={()=>{const updated=deviations.map(d=>d.id===dev.id?{...d,status:'Closed'}:d);setDeviations(updated);}} style={{...btn(S.ok),fontSize:'0.68rem',padding:'0.25rem 0.6rem',marginTop:'0.35rem'}}>Close Deviation</button>
        </div>)}
      </div>
    }
  </div>;

  // ═══ E-SIGNATURES & REPORT ═══
  if(screen==="sign") return <div>
    <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.75rem'}}>
      <button onClick={()=>setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
      <h2 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif"}}>✍️ E-Signatures & Report</h2>
    </div>

    <div style={{...cs,marginBottom:'0.6rem',borderLeft:`3px solid ${S.accent}`,background:S.surface,padding:'0.8rem'}}>
      <div style={{fontSize:'0.75rem',color:S.dim}}>
        <strong style={{color:S.accent}}>📖 Part 11 E-Signature Requirements:</strong> Each signature must include the signer's printed name, date/time of signing, and meaning of the signature. The signature must use at least two distinct identification components (user ID + password). The signature is permanently linked to the signed record.
      </div>
    </div>

    {/* Protocol summary */}
    <div style={{...cs,marginBottom:'0.6rem'}}>
      <h3 style={{fontSize:'0.88rem',marginBottom:'0.4rem'}}>Protocol Summary</h3>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.4rem',fontSize:'0.78rem'}}>
        <div>Protocol: <strong>{PROTOCOL.docId}</strong></div>
        <div>System: <strong>{PROTOCOL.system}</strong></div>
        <div>Steps Executed: <strong style={{color:completedSteps===totalSteps?S.ok:S.warn}}>{completedSteps}/{totalSteps}</strong></div>
        <div>Pass: <strong style={{color:S.ok}}>{passedSteps}</strong> | Fail: <strong style={{color:failedSteps?S.warn:S.dim}}>{failedSteps}</strong></div>
        <div>Open Deviations: <strong style={{color:deviations.filter(d=>d.status==='Open').length?S.warn:S.ok}}>{deviations.filter(d=>d.status==='Open').length}</strong></div>
        <div>Conclusion: <strong style={{color:failedSteps===0&&completedSteps===totalSteps?S.ok:S.warn}}>
          {completedSteps<totalSteps?'INCOMPLETE':failedSteps===0?'PASSED — System Qualified':deviations.every(d=>d.status==='Closed')?'PASSED WITH DEVIATIONS':'DEVIATIONS OPEN — Cannot Sign'}
        </strong></div>
      </div>
    </div>

    {/* Signature boxes */}
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem'}}>
      {[{role:"Tester",meaning:"I confirm that I executed all test steps in this protocol and the results recorded are accurate.",key:"tester"},
        {role:"QA Reviewer",meaning:"I have reviewed the protocol execution, all deviations, and confirm the protocol is acceptable for approval.",key:"reviewer"}
      ].map(sig=><div key={sig.key} style={{...cs,borderColor:signed[sig.key]?S.ok:S.border}}>
        <div style={{fontSize:'0.82rem',fontWeight:600,marginBottom:'0.2rem'}}>{sig.role} Signature</div>
        <div style={{fontSize:'0.68rem',color:S.dim,marginBottom:'0.4rem',fontStyle:'italic'}}>Meaning: "{sig.meaning}"</div>
        {signed[sig.key]?
          <div style={{padding:'0.5rem',background:`${S.ok}15`,borderRadius:6,border:`1px solid ${S.ok}33`}}>
            <div style={{fontSize:'0.78rem',color:S.ok,fontWeight:600}}>✅ Signed</div>
            <div style={{fontSize:'0.68rem',color:S.dim}}>By: {sig.key==='tester'?'Sarah Murphy':'Eoin Kelly'} | {new Date().toLocaleString('en-IE')}</div>
          </div>
        :<div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.25rem',marginBottom:'0.3rem'}}>
            <input placeholder="User ID" style={{...input,fontSize:'0.72rem'}} value={signRole===sig.key?signName:""} onChange={e=>{setSignRole(sig.key);setSignName(e.target.value);}}/>
            <input type="password" placeholder="Password" style={{...input,fontSize:'0.72rem'}} value={signRole===sig.key?signPwd:""} onChange={e=>{setSignRole(sig.key);setSignPwd(e.target.value);}}/>
          </div>
          <button onClick={()=>{
            if(!signName||!signPwd){alert('Both User ID and Password are required (Part 11: two distinct identification components).');return;}
            if(deviations.some(d=>d.status==='Open')){alert('Cannot sign: Open deviations must be closed before signing.');return;}
            if(completedSteps<totalSteps){alert('Cannot sign: Not all protocol steps have been executed.');return;}
            setSigned(prev=>({...prev,[sig.key]:true}));setSignName("");setSignPwd("");
          }} style={{...btn(S.accent),fontSize:'0.7rem',width:'100%'}}>Apply Signature</button>
        </div>}
      </div>)}
    </div>

    <div style={{...cs,marginTop:'0.6rem',borderLeft:`3px solid ${S.yellow}`}}>
      <div style={{fontSize:'0.75rem',fontWeight:600,color:S.yellow,marginBottom:'0.15rem'}}>🎓 CSV Validation Points:</div>
      <ul style={{fontSize:'0.72rem',color:S.dim,paddingLeft:'1rem',lineHeight:1.7,margin:0}}>
        <li><strong>Part 11 §11.50:</strong> Signature must be unique to individual, not reusable</li>
        <li><strong>Part 11 §11.70:</strong> Signature linked to signed record, cannot be cut/copied</li>
        <li><strong>Part 11 §11.100:</strong> Must include printed name, date/time, meaning</li>
        <li><strong>Part 11 §11.200:</strong> At least two identification components required</li>
        <li><strong>OQ Test:</strong> Verify signing blocked when deviations are still open</li>
        <li><strong>OQ Test:</strong> Verify signing blocked when steps are incomplete</li>
      </ul>
    </div>
  </div>;

  return null;
}
