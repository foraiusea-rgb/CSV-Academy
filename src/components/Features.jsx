// All new interactive features as separate exported components
import { useState, useEffect, useMemo, useRef } from "react";

// ═══ CONTENT SEARCH ═══
export function SearchBox({ modules, glossary, onNavigate }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q || q.length < 2) return [];
    const s = q.toLowerCase();
    const r = [];
    (modules || []).forEach(m => (m.lessons || []).forEach(l => {
      if (l.title.toLowerCase().includes(s) || (l.content || "").toLowerCase().includes(s))
        r.push({ type: "lesson", icon: m.icon, title: l.title, module: m.title, id: l.id });
    }));
    (glossary || []).forEach(g => {
      if (g.term.toLowerCase().includes(s) || g.def.toLowerCase().includes(s))
        r.push({ type: "glossary", icon: "📖", title: g.term, module: g.def.slice(0, 60) });
    });
    return r.slice(0, 8);
  }, [q, modules, glossary]);

  return <div style={{ position: "relative" }}>
    <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍 Search lessons, glossary..."
      style={{ width: 200, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.35rem 0.6rem", color: "var(--text)", fontSize: "0.78rem", fontFamily: "var(--font-body)", outline: "none" }} />
    {results.length > 0 && <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-md)", maxHeight: 250, overflow: "auto", zIndex: 200, marginTop: 4 }}>
      {results.map((r, i) => <div key={i} onClick={() => { onNavigate?.(r); setQ(""); }}
        style={{ padding: "0.45rem 0.7rem", cursor: "pointer", borderBottom: "1px solid var(--surface2)", fontSize: "0.78rem" }}
        onMouseEnter={e => e.target.style.background = "var(--surface2)"} onMouseLeave={e => e.target.style.background = "transparent"}>
        <span style={{ marginRight: "0.3rem" }}>{r.icon}</span><strong>{r.title}</strong>
        <div style={{ fontSize: "0.68rem", color: "var(--text3)" }}>{r.module}</div>
      </div>)}
    </div>}
  </div>;
}

// ═══ FLASHCARD MODE ═══
export function Flashcards({ glossary }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const cards = (glossary || []).filter(g => !known.includes(g.term));
  const card = cards[idx % Math.max(cards.length, 1)];

  if (!card) return <div style={{ textAlign: "center", padding: "3rem", color: "var(--ok)" }}>
    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎉</div>
    <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>All {glossary?.length} terms mastered!</div>
    <button onClick={() => { setKnown([]); setIdx(0); }} style={{ marginTop: "1rem", background: "var(--accent)", color: "#fff", border: "none", padding: "0.5rem 1.2rem", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>Reset & Start Over</button>
  </div>;

  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.82rem" }}>
      <span style={{ color: "var(--text3)" }}>{cards.length} cards remaining</span>
      <span style={{ color: "var(--ok)" }}>{known.length} mastered</span>
    </div>
    <div onClick={() => setFlipped(!flipped)} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "2.5rem 2rem", textAlign: "center", cursor: "pointer", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)", transition: "transform 0.2s" }}>
      {!flipped ? <>
        <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginBottom: "0.5rem" }}>TERM (click to flip)</div>
        <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--accent)" }}>{card.term}</div>
      </> : <>
        <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginBottom: "0.5rem" }}>DEFINITION</div>
        <div style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--text)" }}>{card.def}</div>
      </>}
    </div>
    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", justifyContent: "center" }}>
      <button onClick={() => { setKnown([...known, card.term]); setFlipped(false); setIdx(idx + 1); }} style={{ background: "var(--ok)", color: "#fff", border: "none", padding: "0.5rem 1.5rem", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>✓ I Know This</button>
      <button onClick={() => { setFlipped(false); setIdx(idx + 1); }} style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", padding: "0.5rem 1.5rem", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>→ Next Card</button>
    </div>
  </div>;
}

// ═══ STREAKS & STUDY CALENDAR ═══
export function StreakDisplay({ quizH, feynH, simH, done }) {
  const today = new Date().toISOString().slice(0, 10);
  const allDates = [...(quizH || []).map(q => q.d?.slice(0, 10)), ...(feynH || []).map(f => f.d?.slice(0, 10)), ...(simH || []).map(s => s.d?.slice(0, 10))].filter(Boolean);
  const uniqueDates = [...new Set(allDates)].sort();

  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 60; i++) {
    const dateStr = d.toISOString().slice(0, 10);
    if (uniqueDates.includes(dateStr) || (i === 0 && (done || []).length > 0)) { streak++; }
    else if (i > 0) break;
    d.setDate(d.getDate() - 1);
  }

  const last30 = [];
  const d2 = new Date();
  for (let i = 29; i >= 0; i--) {
    const dt = new Date(d2);
    dt.setDate(dt.getDate() - i);
    const ds = dt.toISOString().slice(0, 10);
    last30.push({ date: ds, active: uniqueDates.includes(ds), day: dt.getDate() });
  }

  return <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.25rem", boxShadow: "var(--shadow)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
      <div style={{ fontSize: "2rem" }}>🔥</div>
      <div>
        <div style={{ fontSize: "1.8rem", fontFamily: "var(--font-display)", color: streak > 0 ? "var(--accent)" : "var(--text3)" }}>{streak}</div>
        <div style={{ fontSize: "0.78rem", color: "var(--text3)" }}>day streak</div>
      </div>
      <div style={{ marginLeft: "auto", textAlign: "right" }}>
        <div style={{ fontSize: "1.2rem", fontFamily: "var(--font-display)", color: "var(--text)" }}>{uniqueDates.length}</div>
        <div style={{ fontSize: "0.72rem", color: "var(--text3)" }}>total study days</div>
      </div>
    </div>
    <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginBottom: "0.3rem" }}>Last 30 days</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)", gap: 3 }}>
      {last30.map((d, i) => <div key={i} title={d.date} style={{ width: "100%", aspectRatio: "1", borderRadius: 3, background: d.active ? "var(--accent)" : "var(--surface2)", opacity: d.active ? 1 : 0.4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", color: d.active ? "#fff" : "var(--text3)" }}>{d.day}</div>)}
    </div>
  </div>;
}

// ═══ PEER COMPARISON ═══
export function PeerComparison({ pP, quizAvg, lessonsCompleted, totalLessons }) {
  const percentile = Math.min(95, Math.max(10, pP * 1.2 + (quizAvg || 0) * 0.3));
  return <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1rem", boxShadow: "var(--shadow)" }}>
    <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>📊 How You Compare</div>
    <div style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6 }}>
      Based on your progress ({pP}% course, {quizAvg || 0}% quiz avg), you're estimated to be ahead of <strong style={{ color: "var(--accent)" }}>{Math.round(percentile)}%</strong> of learners at a similar stage.
    </div>
    <div style={{ height: 8, background: "var(--surface2)", borderRadius: 4, marginTop: "0.5rem" }}>
      <div style={{ height: "100%", width: `${percentile}%`, background: "var(--accent)", borderRadius: 4, transition: "width 0.5s" }} />
    </div>
    <div style={{ fontSize: "0.68rem", color: "var(--text3)", marginTop: "0.25rem" }}>
      {percentile >= 80 ? "🏆 Top performer! Keep it up." : percentile >= 50 ? "📈 Good progress. Stay consistent." : "💪 Keep going — every session counts."}
    </div>
  </div>;
}

// ═══ DARK MODE TOGGLE ═══
export function DarkModeToggle() {
  const [dark, setDark] = useState(localStorage.getItem("csv-dark") === "true");
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.style.setProperty("--bg", "#0B0E13");
      root.style.setProperty("--surface", "#141820");
      root.style.setProperty("--surface2", "#1C2333");
      root.style.setProperty("--border", "#252D3D");
      root.style.setProperty("--text", "#E8ECF4");
      root.style.setProperty("--text2", "#A0AAB8");
      root.style.setProperty("--text3", "#6B7588");
      root.style.setProperty("--shadow", "0 1px 3px rgba(0,0,0,0.3)");
      root.style.setProperty("--shadow-md", "0 4px 6px rgba(0,0,0,0.25)");
    } else {
      root.style.setProperty("--bg", "#F6F8FB");
      root.style.setProperty("--surface", "#FFFFFF");
      root.style.setProperty("--surface2", "#EEF1F6");
      root.style.setProperty("--border", "#DDE2EB");
      root.style.setProperty("--text", "#1A2332");
      root.style.setProperty("--text2", "#4A5568");
      root.style.setProperty("--text3", "#8896A6");
      root.style.setProperty("--shadow", "0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)");
      root.style.setProperty("--shadow-md", "0 4px 6px rgba(0,0,0,0.05),0 2px 4px rgba(0,0,0,0.04)");
    }
    localStorage.setItem("csv-dark", dark);
  }, [dark]);

  return <button onClick={() => setDark(!dark)} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.35rem 0.65rem", cursor: "pointer", fontSize: "0.82rem", fontFamily: "var(--font-body)", color: "var(--text2)" }} title="Toggle dark/light mode">
    {dark ? "☀️" : "🌙"}
  </button>;
}

// ═══ AUDIO READER (Web Speech API) ═══
export function AudioReader({ text }) {
  const [speaking, setSpeaking] = useState(false);
  const toggle = () => {
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); }
    else if (text) {
      const u = new SpeechSynthesisUtterance(text.slice(0, 3000));
      u.rate = 0.9; u.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(u); setSpeaking(true);
    }
  };
  return <button onClick={toggle} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.3rem 0.6rem", cursor: "pointer", fontSize: "0.72rem", color: "var(--text2)", fontFamily: "var(--font-body)" }}>
    {speaking ? "⏹ Stop" : "🔊 Listen"}
  </button>;
}

// ═══ JOB APPLICATION TRACKER ═══
export function JobTracker({ jobs, onUpdate }) {
  const [form, setForm] = useState({ company: "", role: "", status: "Applied", date: new Date().toISOString().slice(0, 10), notes: "" });
  const statuses = ["Researching", "Applied", "Phone Screen", "Interview", "Offer", "Rejected"];
  const statusColors = { Researching: "var(--text3)", Applied: "var(--blue)", "Phone Screen": "var(--orange)", Interview: "var(--purple)", Offer: "var(--ok)", Rejected: "var(--warn)" };

  return <div>
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.25rem", marginBottom: "1rem", boxShadow: "var(--shadow)" }}>
      <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.6rem" }}>Add Application</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company" style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 6, padding: "0.4rem 0.6rem", color: "var(--text)", fontSize: "0.82rem", fontFamily: "var(--font-body)" }} />
        <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Role title" style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 6, padding: "0.4rem 0.6rem", color: "var(--text)", fontSize: "0.82rem", fontFamily: "var(--font-body)" }} />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 6, padding: "0.4rem 0.6rem", color: "var(--text)", fontSize: "0.82rem", fontFamily: "var(--font-body)" }}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 6, padding: "0.4rem 0.6rem", color: "var(--text)", fontSize: "0.82rem", fontFamily: "var(--font-body)" }} />
      </div>
      <button onClick={() => { if (form.company && form.role) { onUpdate([...(jobs || []), { ...form, id: Date.now() }]); setForm({ company: "", role: "", status: "Applied", date: new Date().toISOString().slice(0, 10), notes: "" }); } }} style={{ marginTop: "0.5rem", background: "var(--accent)", color: "#fff", border: "none", padding: "0.45rem 1rem", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}>+ Add</button>
    </div>

    {(jobs || []).length > 0 && <div style={{ display: "grid", gap: "0.4rem" }}>
      {jobs.map((j, i) => <div key={j.id || i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", boxShadow: "var(--shadow)" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.88rem", fontWeight: 600 }}>{j.company}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text2)" }}>{j.role}</div>
        </div>
        <div style={{ display: "inline-block", padding: "0.15rem 0.5rem", borderRadius: 4, fontSize: "0.68rem", fontWeight: 600, background: `${statusColors[j.status] || "var(--text3)"}15`, color: statusColors[j.status] || "var(--text3)" }}>{j.status}</div>
        <div style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{j.date}</div>
        <select value={j.status} onChange={e => { const updated = [...jobs]; updated[i] = { ...j, status: e.target.value }; onUpdate(updated); }} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 4, padding: "0.2rem", fontSize: "0.68rem", color: "var(--text)", fontFamily: "var(--font-body)" }}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>)}
    </div>}
  </div>;
}

// ═══ LINKEDIN SHARE CARD ═══
export function LinkedInShare({ moduleName, progress }) {
  const shareText = `🎓 I just completed "${moduleName}" on CSV Academy — a free platform for learning Computer System Validation for pharmaceutical careers.\n\n📊 Progress: ${progress}% complete\n\nTopics covered: GAMP 5, 21 CFR Part 11, EU Annex 11, ALCOA+, IQ/OQ/PQ, FMEA risk assessment, and more.\n\n#CSV #Pharma #Validation #GAMP5 #PharmaCareers #Ireland`;

  return <button onClick={() => { const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://csv-academy.vercel.app")}&summary=${encodeURIComponent(shareText)}`; window.open(url, "_blank"); }}
    style={{ background: "#0A66C2", color: "#fff", border: "none", padding: "0.4rem 0.85rem", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-body)" }}>
    <span>in</span> Share on LinkedIn
  </button>;
}

// ═══ AI DOCUMENT REVIEWER ═══
export function AIDocReviewer({ callAI, isLoading, response }) {
  const [docType, setDocType] = useState("URS");
  const [docText, setDocText] = useState("");

  const review = async () => {
    if (!docText.trim()) return;
    await callAI(`You are reviewing a ${docType} (${docType === "URS" ? "User Requirements Specification" : docType === "OQ" ? "OQ Test Script" : "Validation Plan"}) draft written by a CSV learner.\n\nDocument text:\n"${docText.slice(0, 3000)}"\n\nReview against best practices. Score 1-10 and provide:\n1. OVERALL SCORE with justification\n2. STRENGTHS — what's good\n3. ISSUES — specific problems found (reference section/line)\n4. MISSING — what's absent that should be included\n5. SUGGESTIONS — concrete improvements\n\nBe constructive but thorough. Reference GAMP 5, Part 11, Annex 11 requirements where relevant.`);
  };

  return <div>
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem" }}>
      {["URS", "OQ", "VP"].map(t => <button key={t} onClick={() => setDocType(t)} style={{ background: docType === t ? "var(--accent-bg)" : "var(--surface2)", border: `1px solid ${docType === t ? "var(--accent)" : "var(--border)"}`, color: docType === t ? "var(--accent)" : "var(--text2)", padding: "0.35rem 0.75rem", borderRadius: 6, cursor: "pointer", fontSize: "0.82rem", fontWeight: 500, fontFamily: "var(--font-body)" }}>{t}</button>)}
    </div>
    <textarea value={docText} onChange={e => setDocText(e.target.value)} placeholder={`Paste your ${docType} draft here for AI review...`}
      style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.6rem 0.75rem", color: "var(--text)", fontSize: "0.85rem", fontFamily: "var(--font-body)", minHeight: 150, resize: "vertical", outline: "none" }} />
    <button onClick={review} style={{ marginTop: "0.5rem", background: "var(--accent)", color: "#fff", border: "none", padding: "0.5rem 1.25rem", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>{isLoading ? "Reviewing..." : `Review My ${docType}`}</button>
    {response && <div style={{ marginTop: "0.75rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1rem", fontSize: "0.88rem", lineHeight: 1.7, whiteSpace: "pre-wrap", borderLeft: "3px solid var(--accent)", boxShadow: "var(--shadow)" }}>{response}</div>}
  </div>;
}

// ═══ MOCK HPRA INSPECTION ═══
export function MockInspection({ callAI, isLoading, response }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [phase, setPhase] = useState(0);
  const questions = [
    "Good morning. I'd like to start by seeing your computerised systems inventory. Can you show me a complete list of all GxP systems on this site with their validation status?",
    "I see you have a LIMS listed here. When was the last periodic review conducted for this system?",
    "Can you show me the audit trail for batch B240315-07? I'd like to see all entries related to the analytical results.",
    "I notice there was a modification to a dissolution result 5 hours after the original entry. Can you explain what happened?",
    "What is your change control process for this LIMS? Show me the last 3 changes and their documentation.",
    "Who has administrator access to this LIMS? How do you ensure admin actions are independently reviewed?",
    "Final question: what is your disaster recovery plan for this LIMS? When was it last tested?"
  ];

  const respond = async () => {
    if (!userAnswer.trim()) return;
    await callAI(`You are an HPRA inspector conducting a GMP inspection at an Irish pharmaceutical site. You are role-playing an inspection scenario with a CSV learner.\n\nYou asked: "${questions[phase]}"\n\nThe CSV lead responded: "${userAnswer}"\n\nScore their response 1-10 and provide:\n1. SCORE with brief justification\n2. What was GOOD about their response\n3. What was MISSING or WEAK\n4. What the IDEAL response would include\n5. RED FLAGS an inspector would notice\n\nThen ask the next follow-up question that an inspector would naturally ask based on their response.\n\nBe realistic — an inspector is professional but thorough. They notice inconsistencies.`);
    setUserAnswer("");
    if (phase < questions.length - 1) setPhase(phase + 1);
  };

  return <div>
    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.75rem" }}>
      {questions.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= phase ? "var(--accent)" : "var(--surface2)" }} />)}
    </div>

    <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1rem", marginBottom: "0.75rem" }}>
      <div style={{ fontSize: "0.68rem", color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.3rem" }}>HPRA Inspector — Question {phase + 1} of {questions.length}</div>
      <div style={{ fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.5 }}>"{questions[phase]}"</div>
    </div>

    <textarea value={userAnswer} onChange={e => setUserAnswer(e.target.value)} placeholder="Type your response as the CSV lead..."
      style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.6rem 0.75rem", color: "var(--text)", fontSize: "0.85rem", fontFamily: "var(--font-body)", minHeight: 100, resize: "vertical", outline: "none" }} />
    <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.5rem" }}>
      <button onClick={respond} style={{ background: "var(--accent)", color: "#fff", border: "none", padding: "0.5rem 1.25rem", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>{isLoading ? "Inspector reviewing..." : "Submit Response"}</button>
      <button onClick={() => { setPhase(0); setUserAnswer(""); }} style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text2)", padding: "0.5rem 1rem", borderRadius: 6, cursor: "pointer", fontSize: "0.82rem", fontFamily: "var(--font-body)" }}>Restart Inspection</button>
    </div>

    {response && <div style={{ marginTop: "0.75rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1rem", fontSize: "0.88rem", lineHeight: 1.7, whiteSpace: "pre-wrap", borderLeft: "3px solid var(--accent)", boxShadow: "var(--shadow)" }}>{response}</div>}
  </div>;
}

// ═══ SPACED REPETITION SUGGESTIONS ═══
export function SpacedRepetition({ wrongQs, quizH, feynH }) {
  const stale = [];
  const now = Date.now();
  const topics = ["GAMP 5", "Part 11", "Annex 11", "ALCOA+", "V-Model", "FMEA", "Change Control", "IQ/OQ/PQ", "Data Integrity", "CSA"];

  topics.forEach(topic => {
    const lastStudied = [...(quizH || []), ...(feynH || [])].filter(h => JSON.stringify(h).toLowerCase().includes(topic.toLowerCase().slice(0, 6))).sort((a, b) => (b.d || "").localeCompare(a.d || ""))[0];
    const daysSince = lastStudied ? Math.floor((now - new Date(lastStudied.d).getTime()) / 86400000) : 999;
    if (daysSince > 3) stale.push({ topic, days: daysSince, urgent: daysSince > 7 });
  });

  if (stale.length === 0) return <div style={{ padding: "1rem", textAlign: "center", color: "var(--ok)", fontSize: "0.88rem" }}>✅ All topics recently reviewed. Great work!</div>;

  return <div>
    <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>📅 Topics to Review</div>
    <div style={{ display: "grid", gap: "0.3rem" }}>
      {stale.sort((a, b) => b.days - a.days).slice(0, 6).map((s, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem", background: "var(--surface)", border: `1px solid ${s.urgent ? "var(--warn)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>
        <span style={{ color: s.urgent ? "var(--warn)" : "var(--orange)" }}>{s.urgent ? "🔴" : "🟡"}</span>
        <span style={{ flex: 1 }}>{s.topic}</span>
        <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{s.days === 999 ? "Never studied" : `${s.days} days ago`}</span>
      </div>)}
    </div>
    {(wrongQs || []).length > 0 && <div style={{ marginTop: "0.6rem", padding: "0.5rem 0.75rem", background: "var(--warn-bg)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem", color: "var(--warn)" }}>
      🔄 You also have {wrongQs.length} wrong quiz questions to retry
    </div>}
  </div>;
}
