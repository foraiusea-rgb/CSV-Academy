// SCADA/PLC Dashboard Simulator
// Simulates process monitoring and control interface

import { useState, useEffect, useRef } from "react";

const S = {
  bg:'#0F1218', card:'#161B24', border:'#252D3D', surface:'#1C2333',
  text:'#E8ECF4', dim:'#8892A8', accent:'#FF6B6B', ok:'#22C55E', yellow:'#FFE66D', blue:'#38BDF8'
};

const PROCESS_PARAMS = [
  {id:"TT-101",name:"Reactor Temperature",unit:"°C",setpoint:37.0,lsl:35.0,usl:39.0,type:"analog",area:"Bioreactor"},
  {id:"PT-201",name:"Vessel Pressure",unit:"mbar",setpoint:50.0,lsl:40.0,usl:60.0,type:"analog",area:"Bioreactor"},
  {id:"pH-301",name:"pH",unit:"pH",setpoint:7.2,lsl:6.8,usl:7.6,type:"analog",area:"Bioreactor"},
  {id:"DO-401",name:"Dissolved Oxygen",unit:"%",setpoint:40.0,lsl:30.0,usl:50.0,type:"analog",area:"Bioreactor"},
  {id:"AG-501",name:"Agitation Speed",unit:"RPM",setpoint:120,lsl:100,usl:140,type:"analog",area:"Bioreactor"},
  {id:"FT-601",name:"Feed Flow Rate",unit:"mL/min",setpoint:5.0,lsl:4.0,usl:6.0,type:"analog",area:"Feed System"},
  {id:"LT-701",name:"Vessel Level",unit:"%",setpoint:65.0,lsl:50.0,usl:80.0,type:"analog",area:"Bioreactor"},
  {id:"TT-801",name:"Jacket Temperature",unit:"°C",setpoint:35.0,lsl:33.0,usl:37.0,type:"analog",area:"Utilities"},
];

const DIGITAL_IO = [
  {id:"DI-001",name:"Vessel Door Interlock",state:true,type:"input",area:"Safety"},
  {id:"DI-002",name:"Emergency Stop Status",state:false,type:"input",area:"Safety"},
  {id:"DO-001",name:"Feed Pump",state:true,type:"output",area:"Feed System"},
  {id:"DO-002",name:"Cooling Valve",state:true,type:"output",area:"Utilities"},
  {id:"DO-003",name:"Exhaust Fan",state:true,type:"output",area:"Utilities"},
  {id:"DI-003",name:"Filter Integrity OK",state:true,type:"input",area:"Filtration"},
];

export default function SCADASimulator({ onComplete }) {
  const [screen, setScreen] = useState("menu");
  const [liveValues, setLiveValues] = useState({});
  const [alarms, setAlarms] = useState([]);
  const [historian, setHistorian] = useState([]);
  const [running, setRunning] = useState(false);
  const [digitalStates, setDigitalStates] = useState({});
  const [ioVerification, setIoVerification] = useState({});
  const timerRef = useRef(null);

  // Initialize values
  useEffect(()=>{
    const init = {};
    PROCESS_PARAMS.forEach(p=>{init[p.id]=p.setpoint;});
    setLiveValues(init);
    const dInit = {};
    DIGITAL_IO.forEach(d=>{dInit[d.id]=d.state;});
    setDigitalStates(dInit);
  },[]);

  // Simulate process variation when running
  useEffect(()=>{
    if(running){
      timerRef.current = setInterval(()=>{
        setLiveValues(prev=>{
          const next = {...prev};
          const newHistEntry = {time:new Date().toLocaleTimeString('en-IE'),values:{}};
          PROCESS_PARAMS.forEach(p=>{
            const drift = (Math.random()-0.5) * (p.usl-p.lsl) * 0.15;
            const newVal = Math.max(p.lsl-2, Math.min(p.usl+2, (prev[p.id]||p.setpoint) + drift));
            next[p.id] = Math.round(newVal*10)/10;
            newHistEntry.values[p.id] = next[p.id];
            // Check alarms
            if(next[p.id]<p.lsl||next[p.id]>p.usl){
              setAlarms(a=>{
                if(a.length>0&&a[a.length-1].paramId===p.id&&Date.now()-a[a.length-1].ts<5000) return a;
                return [...a,{id:`ALM-${String(a.length+1).padStart(3,'0')}`,paramId:p.id,name:p.name,value:next[p.id],limit:next[p.id]<p.lsl?`< ${p.lsl}${p.unit}`:`> ${p.usl}${p.unit}`,time:new Date().toLocaleTimeString('en-IE'),severity:Math.abs(next[p.id]-(next[p.id]<p.lsl?p.lsl:p.usl))>1?'CRITICAL':'WARNING',acked:false,ts:Date.now()}];
              });
            }
          });
          setHistorian(h=>[...h.slice(-50),newHistEntry]);
          return next;
        });
      },2000);
    } else if(timerRef.current){
      clearInterval(timerRef.current);
    }
    return ()=>{if(timerRef.current)clearInterval(timerRef.current);};
  },[running]);

  const cs = {background:S.card,border:`1px solid ${S.border}`,borderRadius:10,padding:'1.25rem'};
  const btn = (bg=S.accent)=>({background:bg,color:'#0B0E13',border:'none',padding:'0.45rem 1rem',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.78rem',fontFamily:'inherit'});
  const badge = (color)=>({display:'inline-block',padding:'0.12rem 0.4rem',borderRadius:4,fontSize:'0.62rem',fontWeight:600,background:`${color}22`,color,border:`1px solid ${color}44`});

  const getParamColor = (param, value) => {
    if(value<param.lsl||value>param.usl) return S.accent;
    const range = param.usl - param.lsl;
    const margin = range * 0.2;
    if(value<param.lsl+margin||value>param.usl-margin) return S.yellow;
    return S.ok;
  };

  // ═══ MENU ═══
  if(screen==="menu") return <div>
    <div style={{marginBottom:'1.25rem'}}>
      <h2 style={{fontSize:'1.2rem',fontFamily:"'DM Serif Display',serif",color:S.accent,marginBottom:'0.3rem'}}>⚙️ SCADA Dashboard</h2>
      <p style={{fontSize:'0.82rem',color:S.dim}}>Interactive process control simulation. Monitor a biopharmaceutical fermentation process — the type of SCADA system you would qualify at sites like Pfizer, Regeneron, or Takeda in Ireland.</p>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'0.6rem'}}>
      {[
        {id:"dashboard",icon:"📊",title:"Live Process Dashboard",desc:"Real-time monitoring of 8 process parameters with alarm detection. Start/stop the simulated process.",color:S.blue},
        {id:"io",icon:"🔌",title:"I/O Point Verification",desc:"Verify analog and digital I/O points against the hardware design specification. Core IQ activity.",color:S.ok},
        {id:"alarms",icon:"🚨",title:"Alarm Management",desc:"View active and historical alarms. Acknowledge alarms. Test alarm response workflows.",color:S.accent},
        {id:"historian",icon:"📈",title:"Historian Data",desc:"View historical process data. This is what Part 11 audit trail review covers for SCADA systems.",color:'#A78BFA'},
      ].map(item=><div key={item.id} onClick={()=>setScreen(item.id)} style={{...cs,cursor:'pointer',transition:'border-color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.borderColor=item.color} onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
        <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginBottom:'0.35rem'}}>
          <span style={{fontSize:'1.1rem'}}>{item.icon}</span>
          <span style={{fontSize:'0.85rem',fontWeight:600}}>{item.title}</span>
        </div>
        <p style={{fontSize:'0.72rem',color:S.dim,lineHeight:1.5}}>{item.desc}</p>
      </div>)}
    </div>
    {alarms.filter(a=>!a.acked).length>0&&<div style={{...cs,marginTop:'0.75rem',borderLeft:`3px solid ${S.accent}`}}>
      <div style={{fontSize:'0.82rem',fontWeight:600,color:S.accent}}>🚨 {alarms.filter(a=>!a.acked).length} Unacknowledged Alarm(s)</div>
    </div>}
  </div>;

  // ═══ LIVE DASHBOARD ═══
  if(screen==="dashboard") return <div>
    <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.75rem'}}>
      <button onClick={()=>setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
      <h2 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif"}}>📊 Live Process — Bioreactor BR-01</h2>
      <div style={{marginLeft:'auto'}}>
        <button onClick={()=>setRunning(!running)} style={btn(running?S.accent:S.ok)}>{running?'⏹ Stop Process':'▶ Start Process'}</button>
      </div>
    </div>

    <div style={{...cs,marginBottom:'0.6rem',borderLeft:`3px solid ${S.blue}`,background:S.surface,padding:'0.8rem'}}>
      <div style={{fontSize:'0.75rem',color:S.dim}}>
        <strong style={{color:S.blue}}>📖 What you're learning:</strong> This simulates a SCADA process overview screen for a biopharmaceutical fermentation. Each parameter shows real-time values against setpoints and specification limits. Start the process to see values drift and alarms trigger. As a CSV engineer qualifying this system, you would verify: each parameter displays correctly, alarms trigger at correct setpoints, historian records data at the correct frequency, and access controls prevent unauthorized changes.
      </div>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'0.4rem',marginBottom:'0.6rem'}}>
      {PROCESS_PARAMS.map(param=>{
        const val = liveValues[param.id]||param.setpoint;
        const color = getParamColor(param, val);
        const pctInRange = Math.max(0,Math.min(100,((val-param.lsl)/(param.usl-param.lsl))*100));
        return <div key={param.id} style={{...cs,padding:'0.7rem',borderColor:color===S.accent?S.accent:S.border}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.2rem'}}>
            <span style={{fontFamily:'monospace',fontSize:'0.65rem',color:S.dim}}>{param.id}</span>
            <span style={badge(color)}>{param.area}</span>
          </div>
          <div style={{fontSize:'0.78rem',fontWeight:500,marginBottom:'0.15rem'}}>{param.name}</div>
          <div style={{fontSize:'1.5rem',fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color,marginBottom:'0.15rem'}}>{val.toFixed(1)} <span style={{fontSize:'0.65rem',fontWeight:400}}>{param.unit}</span></div>
          <div style={{height:4,background:S.surface,borderRadius:2,marginBottom:'0.15rem'}}>
            <div style={{height:'100%',width:`${pctInRange}%`,background:color,borderRadius:2,transition:'all 0.5s'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.58rem',color:S.dim}}>
            <span>LSL: {param.lsl}</span>
            <span>SP: {param.setpoint}</span>
            <span>USL: {param.usl}</span>
          </div>
        </div>;
      })}
    </div>

    {/* Digital I/O status */}
    <div style={cs}>
      <h3 style={{fontSize:'0.82rem',marginBottom:'0.4rem'}}>Digital I/O Status</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'0.3rem'}}>
        {DIGITAL_IO.map(dio=>{
          const state = digitalStates[dio.id]??dio.state;
          return <div key={dio.id} style={{display:'flex',alignItems:'center',gap:'0.4rem',padding:'0.35rem 0.5rem',background:S.surface,borderRadius:6,fontSize:'0.72rem'}}>
            <div style={{width:10,height:10,borderRadius:'50%',background:state?(dio.type==='input'?S.ok:S.blue):S.dim,boxShadow:state?`0 0 6px ${dio.type==='input'?S.ok:S.blue}`:'none'}}/>
            <span style={{fontFamily:'monospace',color:S.dim,fontSize:'0.62rem'}}>{dio.id}</span>
            <span style={{flex:1}}>{dio.name}</span>
            <span style={badge(state?S.ok:S.dim)}>{state?'ON':'OFF'}</span>
          </div>;
        })}
      </div>
    </div>

    <div style={{...cs,marginTop:'0.6rem',borderLeft:`3px solid ${S.yellow}`}}>
      <div style={{fontSize:'0.75rem',fontWeight:600,color:S.yellow,marginBottom:'0.15rem'}}>🎓 CSV Validation Points:</div>
      <ul style={{fontSize:'0.72rem',color:S.dim,paddingLeft:'1rem',lineHeight:1.7,margin:0}}>
        <li><strong>IQ:</strong> Verify each I/O point tag matches the P&ID and hardware design spec</li>
        <li><strong>OQ:</strong> Verify parameter values display correctly against known calibration sources</li>
        <li><strong>OQ:</strong> Verify alarm triggers when value exceeds specification limits</li>
        <li><strong>OQ:</strong> Verify historian records at configured sample rate</li>
        <li><strong>Part 11:</strong> Operator actions (acknowledge alarm, change setpoint) must be audit-trailed</li>
        <li><strong>Annex 11:</strong> Access controls — operators can view, only engineers can change setpoints</li>
      </ul>
    </div>
  </div>;

  // ═══ I/O VERIFICATION ═══
  if(screen==="io") return <div>
    <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.75rem'}}>
      <button onClick={()=>setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
      <h2 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif"}}>🔌 I/O Point Verification</h2>
    </div>

    <div style={{...cs,marginBottom:'0.6rem',borderLeft:`3px solid ${S.ok}`,background:S.surface,padding:'0.8rem'}}>
      <div style={{fontSize:'0.75rem',color:S.dim}}>
        <strong style={{color:S.ok}}>📖 What you're learning:</strong> I/O verification is a core IQ activity for SCADA/PLC systems. Every analog and digital point must be verified against the hardware design specification. You apply a known signal to each input and verify the system reads it correctly, and you command each output and verify the field device responds. This is tedious but critical — a misconfigured I/O point could mean the wrong process parameter is being monitored.
      </div>
    </div>

    <div style={cs}>
      <h3 style={{fontSize:'0.85rem',marginBottom:'0.5rem'}}>Analog Inputs ({PROCESS_PARAMS.length} points)</h3>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.75rem'}}>
        <thead>
          <tr style={{borderBottom:`2px solid ${S.border}`}}>
            <th style={{textAlign:'left',padding:'0.4rem',color:S.dim}}>Tag</th>
            <th style={{textAlign:'left',padding:'0.4rem',color:S.dim}}>Description</th>
            <th style={{textAlign:'center',padding:'0.4rem',color:S.dim}}>Range</th>
            <th style={{textAlign:'center',padding:'0.4rem',color:S.dim}}>Applied Value</th>
            <th style={{textAlign:'center',padding:'0.4rem',color:S.dim}}>System Reading</th>
            <th style={{textAlign:'center',padding:'0.4rem',color:S.dim}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {PROCESS_PARAMS.map(p=>{
            const verified = ioVerification[p.id];
            return <tr key={p.id} style={{borderBottom:`1px solid ${S.border}`}}>
              <td style={{padding:'0.4rem',fontFamily:'monospace',color:S.blue}}>{p.id}</td>
              <td style={{padding:'0.4rem'}}>{p.name}</td>
              <td style={{padding:'0.4rem',textAlign:'center',fontSize:'0.68rem'}}>{p.lsl}–{p.usl} {p.unit}</td>
              <td style={{padding:'0.4rem',textAlign:'center'}}><input type="number" step="0.1" placeholder="Enter" style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:4,padding:'0.2rem 0.3rem',color:S.text,width:70,textAlign:'center',fontSize:'0.72rem',fontFamily:'monospace'}} onChange={e=>{if(e.target.value)setIoVerification(prev=>({...prev,[p.id]:{applied:parseFloat(e.target.value),read:parseFloat(e.target.value)+(Math.random()-0.5)*0.2}}))}}/></td>
              <td style={{padding:'0.4rem',textAlign:'center',fontFamily:'monospace',color:verified?S.ok:S.dim}}>{verified?verified.read.toFixed(2):'—'}</td>
              <td style={{padding:'0.4rem',textAlign:'center'}}>{verified?<span style={badge(Math.abs(verified.applied-verified.read)<0.5?S.ok:S.accent)}>{Math.abs(verified.applied-verified.read)<0.5?'✅ PASS':'❌ FAIL'}</span>:<span style={{color:S.dim}}>—</span>}</td>
            </tr>;
          })}
        </tbody>
      </table>

      <h3 style={{fontSize:'0.85rem',margin:'0.75rem 0 0.5rem'}}>Digital I/O ({DIGITAL_IO.length} points)</h3>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.75rem'}}>
        <thead>
          <tr style={{borderBottom:`2px solid ${S.border}`}}>
            <th style={{textAlign:'left',padding:'0.4rem',color:S.dim}}>Tag</th>
            <th style={{textAlign:'left',padding:'0.4rem',color:S.dim}}>Description</th>
            <th style={{textAlign:'center',padding:'0.4rem',color:S.dim}}>Type</th>
            <th style={{textAlign:'center',padding:'0.4rem',color:S.dim}}>Expected</th>
            <th style={{textAlign:'center',padding:'0.4rem',color:S.dim}}>Toggle & Verify</th>
          </tr>
        </thead>
        <tbody>
          {DIGITAL_IO.map(d=>{
            const state = digitalStates[d.id]??d.state;
            return <tr key={d.id} style={{borderBottom:`1px solid ${S.border}`}}>
              <td style={{padding:'0.4rem',fontFamily:'monospace',color:S.blue}}>{d.id}</td>
              <td style={{padding:'0.4rem'}}>{d.name}</td>
              <td style={{padding:'0.4rem',textAlign:'center'}}><span style={badge(d.type==='input'?S.ok:S.blue)}>{d.type}</span></td>
              <td style={{padding:'0.4rem',textAlign:'center'}}>{d.state?'ON':'OFF'}</td>
              <td style={{padding:'0.4rem',textAlign:'center'}}>
                <button onClick={()=>setDigitalStates(prev=>({...prev,[d.id]:!state}))} style={{background:state?S.ok:S.dim,color:'#0B0E13',border:'none',padding:'0.2rem 0.5rem',borderRadius:4,cursor:'pointer',fontSize:'0.68rem',fontWeight:600}}>{state?'ON':'OFF'}</button>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>

    <div style={{...cs,marginTop:'0.6rem',borderLeft:`3px solid ${S.yellow}`}}>
      <div style={{fontSize:'0.75rem',fontWeight:600,color:S.yellow,marginBottom:'0.15rem'}}>🎓 CSV Validation Points:</div>
      <ul style={{fontSize:'0.72rem',color:S.dim,paddingLeft:'1rem',lineHeight:1.7,margin:0}}>
        <li><strong>IQ:</strong> Every I/O point tag must match the P&ID drawing and hardware design spec</li>
        <li><strong>IQ:</strong> Apply known calibration signals and verify system reads within tolerance</li>
        <li><strong>IQ:</strong> Verify digital inputs correctly reflect field device status</li>
        <li><strong>IQ:</strong> Verify digital outputs correctly command field devices</li>
        <li><strong>Typical tolerance:</strong> ±0.5% of range for analog signals</li>
      </ul>
    </div>
  </div>;

  // ═══ ALARMS ═══
  if(screen==="alarms") return <div>
    <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.75rem'}}>
      <button onClick={()=>setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
      <h2 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif"}}>🚨 Alarm Management</h2>
      {!running&&<button onClick={()=>{setRunning(true);setScreen("dashboard");}} style={{...btn(S.ok),fontSize:'0.7rem',marginLeft:'auto'}}>Start Process to Generate Alarms</button>}
    </div>
    {alarms.length===0?
      <div style={{...cs,textAlign:'center',color:S.dim,padding:'2rem'}}>No alarms yet. Start the process on the Live Dashboard — values will drift and trigger alarms when parameters exceed specification limits.</div>
    :
    <div style={cs}>
      <div style={{display:'flex',gap:'0.5rem',marginBottom:'0.5rem',fontSize:'0.75rem'}}>
        <span>Total: <strong>{alarms.length}</strong></span>
        <span>Unacked: <strong style={{color:S.accent}}>{alarms.filter(a=>!a.acked).length}</strong></span>
        <span>Critical: <strong style={{color:S.accent}}>{alarms.filter(a=>a.severity==='CRITICAL').length}</strong></span>
      </div>
      <div style={{maxHeight:400,overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.72rem'}}>
          <thead><tr style={{borderBottom:`2px solid ${S.border}`,position:'sticky',top:0,background:S.card}}>
            <th style={{textAlign:'left',padding:'0.35rem',color:S.dim}}>ID</th>
            <th style={{textAlign:'left',padding:'0.35rem',color:S.dim}}>Time</th>
            <th style={{textAlign:'left',padding:'0.35rem',color:S.dim}}>Parameter</th>
            <th style={{textAlign:'center',padding:'0.35rem',color:S.dim}}>Value</th>
            <th style={{textAlign:'center',padding:'0.35rem',color:S.dim}}>Limit</th>
            <th style={{textAlign:'center',padding:'0.35rem',color:S.dim}}>Severity</th>
            <th style={{textAlign:'center',padding:'0.35rem',color:S.dim}}>Action</th>
          </tr></thead>
          <tbody>{alarms.slice().reverse().map(alm=>
            <tr key={alm.id} style={{borderBottom:`1px solid ${S.border}`,opacity:alm.acked?0.5:1}}>
              <td style={{padding:'0.35rem',fontFamily:'monospace'}}>{alm.id}</td>
              <td style={{padding:'0.35rem',fontFamily:'monospace',fontSize:'0.65rem'}}>{alm.time}</td>
              <td style={{padding:'0.35rem'}}>{alm.name} ({alm.paramId})</td>
              <td style={{padding:'0.35rem',textAlign:'center',fontFamily:'monospace',color:S.accent}}>{alm.value}</td>
              <td style={{padding:'0.35rem',textAlign:'center',fontSize:'0.65rem'}}>{alm.limit}</td>
              <td style={{padding:'0.35rem',textAlign:'center'}}><span style={badge(alm.severity==='CRITICAL'?S.accent:S.yellow)}>{alm.severity}</span></td>
              <td style={{padding:'0.35rem',textAlign:'center'}}>{!alm.acked?<button onClick={()=>setAlarms(prev=>prev.map(a=>a.id===alm.id?{...a,acked:true}:a))} style={{background:S.surface,border:`1px solid ${S.border}`,color:S.text,padding:'0.15rem 0.4rem',borderRadius:4,cursor:'pointer',fontSize:'0.62rem',fontFamily:'inherit'}}>ACK</button>:<span style={{color:S.ok,fontSize:'0.62rem'}}>✓</span>}</td>
            </tr>
          )}</tbody>
        </table>
      </div>
    </div>}
    <div style={{...cs,marginTop:'0.6rem',borderLeft:`3px solid ${S.yellow}`}}>
      <div style={{fontSize:'0.75rem',fontWeight:600,color:S.yellow,marginBottom:'0.15rem'}}>🎓 CSV Validation Points:</div>
      <ul style={{fontSize:'0.72rem',color:S.dim,paddingLeft:'1rem',lineHeight:1.7,margin:0}}>
        <li><strong>OQ:</strong> Force each alarm by taking parameter beyond limit — verify alarm activates</li>
        <li><strong>OQ:</strong> Verify alarm acknowledgment records operator ID and timestamp</li>
        <li><strong>OQ:</strong> Verify critical vs warning severity classification is correct</li>
        <li><strong>Part 11:</strong> Alarm acknowledgment is an electronic record requiring audit trail</li>
        <li><strong>GMP:</strong> Unacknowledged alarms must be investigated as potential process deviations</li>
      </ul>
    </div>
  </div>;

  // ═══ HISTORIAN ═══
  if(screen==="historian") return <div>
    <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.75rem'}}>
      <button onClick={()=>setScreen("menu")} style={{...btn(S.surface),border:`1px solid ${S.border}`,color:S.dim}}>← Back</button>
      <h2 style={{fontSize:'1rem',fontFamily:"'DM Serif Display',serif"}}>📈 Historian Data</h2>
      {!running&&<button onClick={()=>{setRunning(true);setScreen("dashboard");}} style={{...btn(S.ok),fontSize:'0.7rem',marginLeft:'auto'}}>Start Process to Record Data</button>}
    </div>
    {historian.length===0?
      <div style={{...cs,textAlign:'center',color:S.dim,padding:'2rem'}}>No historian data yet. Start the process — data records every 2 seconds.</div>
    :<div style={cs}>
      <div style={{fontSize:'0.75rem',color:S.dim,marginBottom:'0.4rem'}}>{historian.length} records | Recording every 2s | Showing last 20</div>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.68rem',fontFamily:'monospace'}}>
          <thead><tr style={{borderBottom:`2px solid ${S.border}`}}>
            <th style={{padding:'0.3rem',color:S.dim,textAlign:'left'}}>Time</th>
            {PROCESS_PARAMS.slice(0,5).map(p=><th key={p.id} style={{padding:'0.3rem',color:S.dim,textAlign:'center'}}>{p.id}</th>)}
          </tr></thead>
          <tbody>{historian.slice(-20).reverse().map((h,i)=>
            <tr key={i} style={{borderBottom:`1px solid ${S.border}`}}>
              <td style={{padding:'0.25rem',color:S.dim}}>{h.time}</td>
              {PROCESS_PARAMS.slice(0,5).map(p=>{
                const v=h.values[p.id];
                const color=v&&(v<p.lsl||v>p.usl)?S.accent:S.text;
                return<td key={p.id} style={{padding:'0.25rem',textAlign:'center',color}}>{v?v.toFixed(1):'—'}</td>;
              })}
            </tr>
          )}</tbody>
        </table>
      </div>
    </div>}
    <div style={{...cs,marginTop:'0.6rem',borderLeft:`3px solid ${S.yellow}`}}>
      <div style={{fontSize:'0.75rem',fontWeight:600,color:S.yellow,marginBottom:'0.15rem'}}>🎓 Data Integrity Points:</div>
      <ul style={{fontSize:'0.72rem',color:S.dim,paddingLeft:'1rem',lineHeight:1.7,margin:0}}>
        <li><strong>Part 11:</strong> Historian data is an electronic record — must be protected from modification</li>
        <li><strong>ALCOA:</strong> Timestamps must be from a validated, synchronized clock source</li>
        <li><strong>OQ:</strong> Verify recording frequency matches configured sample rate</li>
        <li><strong>OQ:</strong> Verify data compression settings don't lose critical excursion data</li>
        <li><strong>PQ:</strong> Verify data is retrievable for the full retention period</li>
      </ul>
    </div>
  </div>;

  return null;
}
