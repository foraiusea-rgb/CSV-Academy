// LIMS Simulator — Interactive mock LIMS interface
// Simulates real LIMS workflows a CSV engineer would validate

import { useState } from "react";

const S = {
  bg:'#0F1218', card:'#161B24', border:'#252D3D', surface:'#1C2333',
  text:'#E8ECF4', dim:'#8892A8', accent:'#4ECDC4', warn:'#FF6B6B', ok:'#22C55E', yellow:'#FFE66D'
};

// Sample data
const PRODUCTS = [
  {code:"PROD-001",name:"Paracetamol 500mg Tablets",specs:[{test:"Assay",method:"HPLC",unit:"%",lsl:95.0,usl:105.0},{test:"Dissolution",method:"USP <711>",unit:"%",lsl:80.0,usl:null},{test:"Hardness",method:"Ph.Eur. 2.9.8",unit:"kP",lsl:4.0,usl:12.0},{test:"Friability",method:"Ph.Eur. 2.9.7",unit:"%",lsl:null,usl:1.0}]},
  {code:"PROD-002",name:"Amoxicillin 250mg Capsules",specs:[{test:"Assay",method:"HPLC",unit:"%",lsl:90.0,usl:110.0},{test:"Water Content",method:"Karl Fischer",unit:"%",lsl:null,usl:5.0},{test:"Dissolution",method:"USP <711>",unit:"%",lsl:75.0,usl:null}]},
];

const ANALYSTS = ["Sarah Murphy","Conor O'Brien","Niamh Walsh","Eoin Kelly"];

export default function LIMSSimulator({ onComplete }) {
  const [screen, setScreen] = useState("menu"); // menu, register, results, oos, audit, complete
  const [samples, setSamples] = useState([]);
  const [currentSample, setCurrentSample] = useState(null);
  const [results, setResults] = useState({});
  const [regForm, setRegForm] = useState({product:"",batch:"",analyst:"",sampleType:"Routine",priority:"Normal"});
  const [oosStep, setOosStep] = useState(0);
  const [auditLog, setAuditLog] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({correct:0,total:0});

  const addAudit = (action, detail, user="System") => {
    setAuditLog(prev => [...prev, {
      id: prev.length + 1,
      timestamp: new Date().toLocaleString('en-IE'),
      user,
      action,
      detail,
      field: detail.split(':')[0] || '-'
    }]);
  };

  const cs = {background:S.card,border:`1px solid ${S.border}`,borderRadius:10,padding:'1.25rem'};
  const btn = (bg=S.accent) => ({background:bg,color:S.bg,border:'none',padding:'0.5rem 1rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.8rem',fontFamily:'inherit'});
  const input = {width:'100%',background:S.surface,border:`1px solid ${S.border}`,borderRadius:6,padding:'0.4rem 0.6rem',color:S.text,fontSize:'0.82rem',fontFamily:'inherit'};
  const label = {fontSize:'0.72rem',color:S.dim,display:'block',marginBottom:'0.15rem',fontWeight:500};
  const badge = (color) => ({display:'inline-block',padding:'0.12rem 0.45rem',borderRadius:4,fontSize:'0.65rem',fontWeight:600,background:`${color}22`,color,border:`1px solid ${color}44`});

  // ═══ MENU ═══
  if (screen === "menu") return (
    <div>
      <div style={{marginBottom:'1.25rem'}}>
        <h2 style={{fontSize:'1.2rem',fontFamily:"'DM Serif Display',serif",color:S.accent,marginBottom:'0.3rem'}}>🔬 LIMS Simulator</h2>
        <p style={{fontSize:'0.82rem',color:S.dim}}>Interactive Laboratory Information Management System. Practice the workflows you would validate as a CSV engineer.</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'0.6rem'}}>
        {[
          {id:"register",icon:"📋",title:"Sample Registration",desc:"Register a new QC sample — select product, assign batch, generate sample ID. This is the first step in the LIMS workflow.",level:"Basic",color:S.ok},
          {id:"results",icon:"🧪",title:"Results Entry & Review",desc:"Enter analytical test results against specifications. See how OOS detection works in real time.",level:"Intermediate",color:S.yellow},
          {id:"oos",icon:"⚠️",title:"OOS Investigation Workflow",desc:"Walk through an Out-of-Specification result investigation — the critical GxP workflow every CSV engineer must understand.",level:"Advanced",color:S.warn},
          {id:"audit",icon:"📜",title:"Audit Trail Viewer",desc:"Review the system audit trail — exactly what an inspector would examine during an HPRA/FDA inspection.",level:"Advanced",color:'#A78BFA'},
        ].map(item => (
          <div key={item.id} onClick={() => setScreen(item.id)} style={{...cs,cursor:'pointer',transition:'border-color 0.2s',borderColor:S.border}} onMouseEnter={e=>e.currentTarget.style.borderColor=item.color} onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
            <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.4rem'}}>
              <span style={{fontSize:'1.2rem'}}>{item.icon}</span>
              <div>
                <div style={{fontSize:'0.85rem',fontWeight:600}}>{item.title}</div>
                <span style={badge(item.color)}>{item.level}</span>
              </div>
            </div>
            <p style={{fontSize:'0.75rem',color:S.dim,lineHeight:1.5}}>{item.desc}</p>
          </div>
        ))}
      </div>

      {samples.length > 0 && (
        <div style={{...cs,marginTop:'1rem'}}>
          <h3 style={{fontSize:'0.85rem',marginBottom:'0.5rem'}}>📊 Registered Samples ({samples.length})</h3>
          <div style={{display:'grid',gap:'0.25rem'}}>
            {samples.map((s,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.4rem 0.6rem',background:S.surface,borderRadius:6,fontSize:'0.78rem'}}>
                <span style={{fontFamily:'monospace',color:S.accent}}>{s.sampleId}</span>
                <span style={{color:S.dim}}>|</span>
                <span>{s.productName}</span>
                <span style={{color:S.dim}}>|</span>
                <span>Batch: {s.batch}</span>
                <span style={{marginLeft:'auto',...badge(s.status==='Pending'?S.yellow:s.status==='Complete'?S.ok:S.warn)}}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {score.total > 0 && (
        <div style={{...cs,marginTop:'0.75rem',textAlign:'center'}}>
          <div style={{fontSize:'0.72rem',color:S.dim}}>Simulator Score</div>
          <div style={{fontSize:'1.5rem',fontFamily:"'DM Serif Display',serif",color:score.correct/score.total>=0.8?S.ok:S.yellow}}>{score.correct}/{score.total}</div>
        </div>
      )}
    </div>
  );

  // ═══ SAMPLE REGISTRATION ═══
  if (screen === "register") return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem'}}>
        <button onClick={() => setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
        <h2 style={{fontSize:'1.1rem',fontFamily:"'DM Serif Display',serif"}}>📋 Sample Registration</h2>
      </div>

      <div style={{...cs,marginBottom:'0.75rem',borderLeft:`3px solid ${S.accent}`,background:S.surface}}>
        <div style={{fontSize:'0.78rem',color:S.dim,lineHeight:1.6}}>
          <strong style={{color:S.accent}}>📖 What you're learning:</strong> This is the entry point for all QC testing. In a real LIMS, this form creates a sample record that triggers the entire testing workflow. As a CSV engineer, you would validate that: sample IDs auto-generate uniquely, mandatory fields are enforced, product specifications load correctly, and the audit trail captures who registered what and when.
        </div>
      </div>

      <div style={cs}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
          <div>
            <label style={label}>Product *</label>
            <select value={regForm.product} onChange={e => setRegForm({...regForm, product:e.target.value})} style={{...input,cursor:'pointer'}}>
              <option value="">— Select Product —</option>
              {PRODUCTS.map(p => <option key={p.code} value={p.code}>{p.code} — {p.name}</option>)}
            </select>
          </div>
          <div>
            <label style={label}>Batch Number *</label>
            <input value={regForm.batch} onChange={e => setRegForm({...regForm, batch:e.target.value.toUpperCase()})} placeholder="e.g., B240301-01" style={input}/>
          </div>
          <div>
            <label style={label}>Analyst *</label>
            <select value={regForm.analyst} onChange={e => setRegForm({...regForm, analyst:e.target.value})} style={{...input,cursor:'pointer'}}>
              <option value="">— Select Analyst —</option>
              {ANALYSTS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label style={label}>Sample Type</label>
            <select value={regForm.sampleType} onChange={e => setRegForm({...regForm, sampleType:e.target.value})} style={{...input,cursor:'pointer'}}>
              <option>Routine</option>
              <option>Stability</option>
              <option>In-Process</option>
              <option>Raw Material</option>
              <option>Retest</option>
            </select>
          </div>
          <div>
            <label style={label}>Priority</label>
            <select value={regForm.priority} onChange={e => setRegForm({...regForm, priority:e.target.value})} style={{...input,cursor:'pointer'}}>
              <option>Normal</option>
              <option>Urgent</option>
              <option>Rush</option>
            </select>
          </div>
          <div>
            <label style={label}>Sample ID (Auto-generated)</label>
            <input disabled value={regForm.product ? `QC-${new Date().getFullYear()}-${String(samples.length+1).padStart(4,'0')}` : '—'} style={{...input,opacity:0.6,fontFamily:'monospace'}}/>
          </div>
        </div>

        {regForm.product && (
          <div style={{marginTop:'0.75rem',padding:'0.6rem',background:S.bg,borderRadius:6}}>
            <div style={{fontSize:'0.72rem',fontWeight:600,color:S.accent,marginBottom:'0.3rem'}}>Tests to be performed (from product specification):</div>
            <div style={{display:'flex',gap:'0.3rem',flexWrap:'wrap'}}>
              {PRODUCTS.find(p=>p.code===regForm.product)?.specs.map((sp,i) => (
                <span key={i} style={badge(S.accent)}>{sp.test} ({sp.method})</span>
              ))}
            </div>
          </div>
        )}

        <div style={{marginTop:'1rem',display:'flex',gap:'0.5rem',alignItems:'center'}}>
          <button onClick={() => {
            if (!regForm.product || !regForm.batch || !regForm.analyst) {
              setFeedback({type:'error',msg:'All mandatory fields (*) must be completed. This is a Part 11/Annex 11 requirement — the system must enforce data entry rules.'});
              setScore(prev => ({...prev, total: prev.total+1}));
              return;
            }
            const prod = PRODUCTS.find(p=>p.code===regForm.product);
            const sampleId = `QC-${new Date().getFullYear()}-${String(samples.length+1).padStart(4,'0')}`;
            const newSample = {
              sampleId, product:regForm.product, productName:prod.name, batch:regForm.batch,
              analyst:regForm.analyst, type:regForm.sampleType, priority:regForm.priority,
              status:'Pending', registeredAt:new Date().toLocaleString('en-IE'),
              specs: prod.specs
            };
            setSamples(prev => [...prev, newSample]);
            setCurrentSample(newSample);
            addAudit("Sample Registered", `Sample ID: ${sampleId}, Product: ${prod.name}, Batch: ${regForm.batch}`, regForm.analyst);
            setFeedback({type:'success',msg:`✅ Sample ${sampleId} registered successfully. Notice: the audit trail has captured this action with timestamp and user ID. This is what an inspector verifies during an audit trail review.`});
            setScore(prev => ({correct:prev.correct+1, total:prev.total+1}));
            setRegForm({product:"",batch:"",analyst:"",sampleType:"Routine",priority:"Normal"});
          }} style={btn()}>
            Register Sample
          </button>

          {feedback && (
            <div style={{flex:1,fontSize:'0.78rem',padding:'0.5rem 0.75rem',borderRadius:6,background:feedback.type==='error'?`${S.warn}15`:`${S.ok}15`,color:feedback.type==='error'?S.warn:S.ok,border:`1px solid ${feedback.type==='error'?S.warn:S.ok}33`}}>
              {feedback.msg}
            </div>
          )}
        </div>
      </div>

      {/* Validation learning callout */}
      <div style={{...cs,marginTop:'0.75rem',borderLeft:`3px solid ${S.yellow}`}}>
        <div style={{fontSize:'0.78rem',fontWeight:600,color:S.yellow,marginBottom:'0.2rem'}}>🎓 CSV Validation Points for this Screen:</div>
        <ul style={{fontSize:'0.75rem',color:S.dim,paddingLeft:'1.2rem',lineHeight:1.8}}>
          <li><strong>OQ Test:</strong> Verify mandatory field enforcement — try submitting with empty fields</li>
          <li><strong>OQ Test:</strong> Verify sample ID auto-generation is unique and sequential</li>
          <li><strong>OQ Test:</strong> Verify correct specification loads for selected product</li>
          <li><strong>Part 11:</strong> Audit trail must capture user ID, timestamp, and action for every registration</li>
          <li><strong>Annex 11:</strong> Data entry checks must be in place for critical values</li>
        </ul>
      </div>
    </div>
  );

  // ═══ RESULTS ENTRY ═══
  if (screen === "results") {
    const sample = currentSample || samples[samples.length-1];
    if (!sample) return (
      <div>
        <button onClick={() => setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim,marginBottom:'1rem'}}>← Back</button>
        <div style={cs}><p style={{color:S.dim}}>No samples registered yet. Go to Sample Registration first.</p></div>
      </div>
    );

    return (
      <div>
        <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem'}}>
          <button onClick={() => setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
          <h2 style={{fontSize:'1.1rem',fontFamily:"'DM Serif Display',serif"}}>🧪 Results Entry</h2>
          <span style={{marginLeft:'auto',fontFamily:'monospace',fontSize:'0.8rem',color:S.accent}}>{sample.sampleId}</span>
        </div>

        <div style={{...cs,marginBottom:'0.75rem',borderLeft:`3px solid ${S.accent}`,background:S.surface}}>
          <div style={{fontSize:'0.78rem',color:S.dim,lineHeight:1.6}}>
            <strong style={{color:S.accent}}>📖 What you're learning:</strong> Results entry is where raw analytical data enters the LIMS. As a CSV engineer, you validate that: results are checked against specification limits in real time, out-of-spec results trigger appropriate workflows, calculations are correct, and the audit trail captures every entry and modification.
          </div>
        </div>

        <div style={cs}>
          <div style={{display:'flex',gap:'0.75rem',marginBottom:'0.75rem',fontSize:'0.78rem',color:S.dim}}>
            <span>Product: <strong style={{color:S.text}}>{sample.productName}</strong></span>
            <span>Batch: <strong style={{color:S.text}}>{sample.batch}</strong></span>
            <span>Analyst: <strong style={{color:S.text}}>{sample.analyst}</strong></span>
          </div>

          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.8rem'}}>
            <thead>
              <tr style={{borderBottom:`2px solid ${S.border}`}}>
                <th style={{textAlign:'left',padding:'0.5rem',color:S.dim,fontWeight:600}}>Test</th>
                <th style={{textAlign:'left',padding:'0.5rem',color:S.dim,fontWeight:600}}>Method</th>
                <th style={{textAlign:'center',padding:'0.5rem',color:S.dim,fontWeight:600}}>Specification</th>
                <th style={{textAlign:'center',padding:'0.5rem',color:S.dim,fontWeight:600,width:120}}>Result</th>
                <th style={{textAlign:'center',padding:'0.5rem',color:S.dim,fontWeight:600}}>Unit</th>
                <th style={{textAlign:'center',padding:'0.5rem',color:S.dim,fontWeight:600}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sample.specs.map((spec, i) => {
                const val = results[`${sample.sampleId}-${spec.test}`];
                const numVal = parseFloat(val);
                let status = "—";
                let statusColor = S.dim;
                if (val && !isNaN(numVal)) {
                  const passLow = spec.lsl === null || numVal >= spec.lsl;
                  const passHigh = spec.usl === null || numVal <= spec.usl;
                  if (passLow && passHigh) { status = "✅ Pass"; statusColor = S.ok; }
                  else { status = "❌ OOS"; statusColor = S.warn; }
                }
                const specStr = `${spec.lsl !== null ? spec.lsl : '—'} – ${spec.usl !== null ? spec.usl : '—'}`;

                return (
                  <tr key={i} style={{borderBottom:`1px solid ${S.border}`}}>
                    <td style={{padding:'0.5rem',fontWeight:500}}>{spec.test}</td>
                    <td style={{padding:'0.5rem',color:S.dim,fontSize:'0.75rem'}}>{spec.method}</td>
                    <td style={{padding:'0.5rem',textAlign:'center',fontFamily:'monospace',fontSize:'0.78rem'}}>{specStr}</td>
                    <td style={{padding:'0.5rem',textAlign:'center'}}>
                      <input
                        type="number"
                        step="0.1"
                        value={val || ""}
                        onChange={e => {
                          const newResults = {...results, [`${sample.sampleId}-${spec.test}`]: e.target.value};
                          setResults(newResults);
                          if (e.target.value) {
                            addAudit("Result Entered", `${spec.test}: ${e.target.value} ${spec.unit}`, sample.analyst);
                          }
                        }}
                        style={{...input,width:100,textAlign:'center',fontFamily:'monospace'}}
                        placeholder="Enter"
                      />
                    </td>
                    <td style={{padding:'0.5rem',textAlign:'center',color:S.dim}}>{spec.unit}</td>
                    <td style={{padding:'0.5rem',textAlign:'center',color:statusColor,fontWeight:600,fontSize:'0.78rem'}}>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Check if any OOS */}
          {Object.entries(results).some(([key, val]) => {
            if (!key.startsWith(sample.sampleId)) return false;
            const testName = key.split('-').slice(1).join('-');
            const spec = sample.specs.find(s => s.test === testName);
            if (!spec || !val) return false;
            const n = parseFloat(val);
            return (spec.lsl !== null && n < spec.lsl) || (spec.usl !== null && n > spec.usl);
          }) && (
            <div style={{marginTop:'0.75rem',padding:'0.6rem',background:`${S.warn}15`,border:`1px solid ${S.warn}33`,borderRadius:6}}>
              <div style={{fontSize:'0.82rem',fontWeight:600,color:S.warn}}>⚠️ Out-of-Specification Result Detected</div>
              <div style={{fontSize:'0.75rem',color:S.dim,marginTop:'0.2rem'}}>An OOS result has been entered. In a validated LIMS, this would automatically trigger an OOS investigation workflow. The system must not allow the sample to be approved until the OOS is investigated and resolved.</div>
              <button onClick={() => setScreen("oos")} style={{...btn(S.warn),marginTop:'0.4rem'}}>→ Go to OOS Investigation</button>
            </div>
          )}
        </div>

        <div style={{...cs,marginTop:'0.75rem',borderLeft:`3px solid ${S.yellow}`}}>
          <div style={{fontSize:'0.78rem',fontWeight:600,color:S.yellow,marginBottom:'0.2rem'}}>🎓 CSV Validation Points:</div>
          <ul style={{fontSize:'0.75rem',color:S.dim,paddingLeft:'1.2rem',lineHeight:1.8}}>
            <li><strong>OQ Test:</strong> Enter a value outside specification limits — verify OOS alert triggers</li>
            <li><strong>OQ Test:</strong> Verify specification limits display correctly from product master data</li>
            <li><strong>OQ Test:</strong> Try entering non-numeric text — verify input validation rejects it</li>
            <li><strong>Part 11 §11.10(e):</strong> Every result entry must be captured in the audit trail</li>
            <li><strong>Data Integrity:</strong> Once entered, results should not be deletable — only correctible with reason</li>
          </ul>
        </div>
      </div>
    );
  }

  // ═══ OOS INVESTIGATION ═══
  if (screen === "oos") {
    const oosSteps = [
      {title:"Phase 1: Initial Assessment",desc:"QC Manager notified within 24 hours. Initial review of testing methodology, instrument calibration, and analyst technique.",fields:["Was the instrument calibrated?","Was the correct method followed?","Were there any obvious errors?"]},
      {title:"Phase 2: Laboratory Investigation",desc:"Detailed investigation including: review of raw data, check of sample preparation, review of reference standards, and instrument suitability.",fields:["Root cause hypothesis:","Evidence reviewed:","Additional testing recommended?"]},
      {title:"Phase 3: Retest/Resample Decision",desc:"Based on investigation findings, determine if retesting of original sample or resampling is justified.",fields:["Retest justified? (Yes/No with rationale)","Number of retests:","Acceptance criteria for retests:"]},
      {title:"Phase 4: Conclusion & Disposition",desc:"Final determination: is the batch acceptable, rejected, or requiring further investigation?",fields:["Final disposition (Release/Reject/Extend Investigation):","QA approval obtained?","CAPA required?"]},
    ];

    return (
      <div>
        <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem'}}>
          <button onClick={() => setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
          <h2 style={{fontSize:'1.1rem',fontFamily:"'DM Serif Display',serif"}}>⚠️ OOS Investigation Workflow</h2>
        </div>

        <div style={{...cs,marginBottom:'0.75rem',borderLeft:`3px solid ${S.warn}`,background:S.surface}}>
          <div style={{fontSize:'0.78rem',color:S.dim,lineHeight:1.6}}>
            <strong style={{color:S.warn}}>📖 What you're learning:</strong> The OOS workflow is one of the most critical GxP processes in a LIMS. As a CSV engineer, you must validate that: the workflow enforces the correct sequence of steps, required approvals cannot be bypassed, all decisions are recorded in the audit trail, and the investigation cannot be closed without proper documentation. This is exactly what an HPRA or FDA inspector will scrutinise.
          </div>
        </div>

        {/* Progress bar */}
        <div style={{display:'flex',gap:'0.2rem',marginBottom:'1rem'}}>
          {oosSteps.map((_, i) => (
            <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=oosStep?S.warn:S.border,transition:'background 0.3s'}}/>
          ))}
        </div>

        <div style={cs}>
          <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.5rem'}}>
            <span style={badge(S.warn)}>Step {oosStep+1} of {oosSteps.length}</span>
            <h3 style={{fontSize:'0.95rem'}}>{oosSteps[oosStep].title}</h3>
          </div>
          <p style={{fontSize:'0.78rem',color:S.dim,marginBottom:'0.75rem'}}>{oosSteps[oosStep].desc}</p>

          <div style={{display:'grid',gap:'0.5rem'}}>
            {oosSteps[oosStep].fields.map((field, i) => (
              <div key={i}>
                <label style={label}>{field}</label>
                <textarea style={{...input,minHeight:50,resize:'vertical'}} placeholder="Document your response..."/>
              </div>
            ))}
          </div>

          <div style={{display:'flex',gap:'0.4rem',marginTop:'0.75rem'}}>
            {oosStep > 0 && <button onClick={() => setOosStep(oosStep-1)} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Previous</button>}
            {oosStep < oosSteps.length - 1 ? (
              <button onClick={() => {
                addAudit("OOS Investigation", `${oosSteps[oosStep].title} completed`, "QC Manager");
                setOosStep(oosStep + 1);
              }} style={btn(S.warn)}>Complete Step & Continue →</button>
            ) : (
              <button onClick={() => {
                addAudit("OOS Investigation", "Investigation completed and closed", "QA Manager");
                setFeedback({type:'success',msg:'OOS Investigation completed. All steps documented in audit trail.'});
                setScore(prev => ({correct:prev.correct+1, total:prev.total+1}));
                setScreen("menu");
              }} style={btn(S.ok)}>✅ Close Investigation</button>
            )}
          </div>
        </div>

        <div style={{...cs,marginTop:'0.75rem',borderLeft:`3px solid ${S.yellow}`}}>
          <div style={{fontSize:'0.78rem',fontWeight:600,color:S.yellow,marginBottom:'0.2rem'}}>🎓 CSV Validation Points:</div>
          <ul style={{fontSize:'0.75rem',color:S.dim,paddingLeft:'1.2rem',lineHeight:1.8}}>
            <li><strong>OQ Test:</strong> Verify steps must be completed in sequence — cannot skip to Phase 4</li>
            <li><strong>OQ Test:</strong> Verify mandatory fields enforced at each phase</li>
            <li><strong>Part 11:</strong> Each phase completion requires e-signature from authorised personnel</li>
            <li><strong>Annex 11:</strong> The batch cannot be released while OOS investigation is open</li>
            <li><strong>ALCOA:</strong> All entries must be attributable, contemporaneous, and permanent</li>
          </ul>
        </div>
      </div>
    );
  }

  // ═══ AUDIT TRAIL ═══
  if (screen === "audit") return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem'}}>
        <button onClick={() => setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
        <h2 style={{fontSize:'1.1rem',fontFamily:"'DM Serif Display',serif"}}>📜 Audit Trail Viewer</h2>
      </div>

      <div style={{...cs,marginBottom:'0.75rem',borderLeft:`3px solid #A78BFA`,background:S.surface}}>
        <div style={{fontSize:'0.78rem',color:S.dim,lineHeight:1.6}}>
          <strong style={{color:'#A78BFA'}}>📖 What you're learning:</strong> The audit trail is the most inspected element of any computerised system. 21 CFR Part 11 §11.10(e) requires that audit trails be secure, computer-generated, time-stamped, and must not obscure previously recorded information. An HPRA or FDA inspector will review the audit trail to verify data integrity. As a CSV engineer, you must validate that: all GxP actions are captured, entries cannot be modified or deleted, the trail includes who/what/when, and the trail is retained for the life of the record.
        </div>
      </div>

      <div style={cs}>
        {auditLog.length === 0 ? (
          <p style={{color:S.dim,fontSize:'0.82rem',textAlign:'center',padding:'2rem 0'}}>No audit trail entries yet. Use the Sample Registration and Results Entry screens to generate entries, then return here to review them — just like an inspector would.</p>
        ) : (
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.78rem'}}>
              <thead>
                <tr style={{borderBottom:`2px solid ${S.border}`,background:S.surface}}>
                  <th style={{textAlign:'left',padding:'0.5rem',color:S.accent,fontWeight:600}}>#</th>
                  <th style={{textAlign:'left',padding:'0.5rem',color:S.accent,fontWeight:600}}>Timestamp</th>
                  <th style={{textAlign:'left',padding:'0.5rem',color:S.accent,fontWeight:600}}>User</th>
                  <th style={{textAlign:'left',padding:'0.5rem',color:S.accent,fontWeight:600}}>Action</th>
                  <th style={{textAlign:'left',padding:'0.5rem',color:S.accent,fontWeight:600}}>Detail</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry, i) => (
                  <tr key={i} style={{borderBottom:`1px solid ${S.border}`}}>
                    <td style={{padding:'0.4rem 0.5rem',color:S.dim,fontFamily:'monospace'}}>{entry.id}</td>
                    <td style={{padding:'0.4rem 0.5rem',fontFamily:'monospace',fontSize:'0.72rem'}}>{entry.timestamp}</td>
                    <td style={{padding:'0.4rem 0.5rem'}}>{entry.user}</td>
                    <td style={{padding:'0.4rem 0.5rem'}}><span style={badge(S.accent)}>{entry.action}</span></td>
                    <td style={{padding:'0.4rem 0.5rem',color:S.dim}}>{entry.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{...cs,marginTop:'0.75rem',borderLeft:`3px solid ${S.yellow}`}}>
        <div style={{fontSize:'0.78rem',fontWeight:600,color:S.yellow,marginBottom:'0.2rem'}}>🎓 Audit Trail Review Checklist (what an inspector checks):</div>
        <ul style={{fontSize:'0.75rem',color:S.dim,paddingLeft:'1.2rem',lineHeight:1.8}}>
          <li>Is every GxP action recorded? (sample registration, results entry, approvals)</li>
          <li>Does each entry have: timestamp, user ID, action description?</li>
          <li>Can entries be modified or deleted by users? (they should NOT be)</li>
          <li>Are there any gaps in the sequence? (missing entry numbers = red flag)</li>
          <li>Are there any unusual patterns? (e.g., entries at 3am, rapid repeated entries)</li>
          <li>Is the audit trail retained for the required retention period?</li>
        </ul>
      </div>
    </div>
  );

  return null;
}
