// ═══════════════════════════════════════
// QUIZ BANK (30+ questions from books)
// ═══════════════════════════════════════
export const QUIZ_BANK = [
  {q:"Stokes says the PRIMARY business reason for testing is?",o:["Regulatory compliance","It saves money","QA requires it","Tradition"],a:1,e:"Stokes Ch.3: Cost-effectiveness is the overriding reason. Tested systems cost less to maintain.",m:"m1"},
  {q:"Which GAMP 5 category was removed?",o:["Cat 1","Cat 2 (firmware)","Cat 3","Cat 4"],a:1,e:"Category 2 covered firmware in GAMP 4. Now reclassified as Cat 3/4/5 by complexity.",m:"m3"},
  {q:"URS traces to which qualification?",o:["IQ","OQ","PQ","DQ"],a:2,e:"In the V-Model: URS→PQ, FRS→OQ, DS→IQ.",m:"m3"},
  {q:"Ex-FDA inspector Clark debunks which myth?",o:["Validation needs evidence","Validation through use is sufficient","Risk should drive effort","Testing finds flaws"],a:1,e:"Clark (Andrews Ch.2): using a system for years ≠ validation.",m:"m10"},
  {q:"'C' in ALCOA stands for?",o:["Complete","Consistent","Contemporaneous","Controlled"],a:2,e:"Contemporaneous — recorded when it happened, not retrospectively.",m:"m5"},
  {q:"What is a 'predicate rule'?",o:["Validation protocol","Existing FDA regulation requiring records","E-signature type","Risk method"],a:1,e:"When required records are electronic, Part 11 applies on top of the predicate rule.",m:"m2"},
  {q:"SCADA typically classified as?",o:["Cat 1","Cat 3","Cat 4 + possible Cat 5","Cat 5 only"],a:2,e:"Cat 4 configurable with possible Cat 5 custom scripts/logic.",m:"m9"},
  {q:"Which technique uses Severity × Occurrence × Detection?",o:["FTA","HACCP","FMEA","GAMP"],a:2,e:"FMEA: Risk Priority Number = S × O × D.",m:"m4"},
  {q:"Data integrity failures = what % of GMP non-compliance?",o:["~20%","~40%",">60%","~80%"],a:2,e:"Over 60% of global GMP non-compliance findings relate to data integrity.",m:"m5"},
  {q:"Ireland's pharma regulator is?",o:["FDA","EMA","MHRA","HPRA"],a:3,e:"HPRA — Health Products Regulatory Authority.",m:"m1"},
  {q:"Why track REJECTED changes?",o:["Audit trail only","Patterns indicate underlying problems","Penalize requestors","Don't need to"],a:1,e:"Andrews Ch.2: patterns in rejected changes reveal system/process/training issues.",m:"m7"},
  {q:"CSA stands for?",o:["Computer System Assessment","Computer Software Assurance","Clinical System Analysis","Computerised System Audit"],a:1,e:"Computer Software Assurance — FDA's 2025 risk-based framework.",m:"m11"},
  {q:"What can invalidate an entire test program?",o:["Too many testers","Poor test cases + missing signatures","Testing too fast","Automated tools"],a:1,e:"Stokes Ch.8: minor errors build up to compromise entire testing programs.",m:"m6"},
  {q:"LIMS typically classified as?",o:["Cat 1","Cat 3","Cat 4","Cat 5"],a:2,e:"LIMS = GAMP Category 4 — configurable software.",m:"m9"},
  {q:"Every test MUST have?",o:["Test harness","Unambiguous acceptance criteria","Automated execution","Risk score"],a:1,e:"Stokes Ch.7: unambiguous acceptance criteria for defined input conditions.",m:"m6"},
  {q:"Annex 11 is primary for?",o:["US","Japan","EU including Ireland","Australia"],a:2,e:"EU GMP Annex 11 — Ireland's HPRA inspects against it.",m:"m2"},
  {q:"Irish validation platform companies?",o:["SAP/Oracle","KNEAT/ValGenesis","Emerson/Siemens","Pfizer/MSD"],a:1,e:"KNEAT (Limerick) and ValGenesis (Dublin) — Irish-founded.",m:"m9"},
  {q:"FAT/SAT same as IQ/OQ?",o:["Yes, identical","Different but can be leveraged","FAT replaces IQ","SAT replaces PQ"],a:1,e:"Stokes: Different purposes but results can be referenced/leveraged.",m:"m6"},
  {q:"Inspector warning flag for access?",o:["Too many users","Admin rights without oversight","Different time zones","Password policies"],a:1,e:"Andrews Ch.2: admin rights allowing data overwrite without oversight = red flag.",m:"m10"},
  {q:"Stokes' max risk score?",o:["50","75","100","150"],a:2,e:"Stokes Ch.16: Maximum = 100 from weighted risk factors.",m:"m4"},
  {q:"If >40% test incidents are script errors after week 1?",o:["Continue","Speed up","HALT and retrain","Report to FDA"],a:2,e:"Stokes: halt testing for review and retraining.",m:"m6"},
  {q:"TCA in AZ LIMS case study?",o:["Technical Config Assessment","Threats and Controls Analysis","Test Coverage Analysis","Technology Compliance Audit"],a:1,e:"AZ used Threats and Controls Analysis — 23-area checklist.",m:"m9"},
  {q:"Part 11 e-signatures need how many components?",o:["One","Two","Three","Four"],a:1,e:"§11.200: At least TWO distinct components (user ID + password).",m:"m2"},
  {q:"E-signature must include?",o:["Name only","Printed name + date/time + meaning","Biometric scan","Digital certificate"],a:1,e:"Printed name, date/time, meaning (review/approval/responsibility/authorship).",m:"m2"},
  {q:"GAMP 5 published by?",o:["FDA","EMA","ISPE","WHO"],a:2,e:"International Society for Pharmaceutical Engineering.",m:"m3"},
  {q:"High RPN indicates?",o:["Low risk","Needs more rigorous validation","Can skip testing","Supplier-tested"],a:1,e:"Higher RPN = higher risk = more rigorous testing needed.",m:"m4"},
  {q:"Purpose of regression testing?",o:["Test boundaries","Ensure changes don't break existing functions","First-time testing","Test UI"],a:1,e:"Verifies changes haven't broken existing validated functionality.",m:"m6"},
  {q:"'Paper is patient' means?",o:["Paper lasts forever","Can't verify contemporaneous recording on paper","Paper is cheap","Needs patience"],a:1,e:"Impossible to verify at review whether paper entries were made in real-time.",m:"m5"},
  {q:"Black-box testing is?",o:["Screens off","Testing outputs vs inputs without knowing internal code","Security testing","UI-only testing"],a:1,e:"Most common CSV approach — test WHAT the system does, not HOW internally.",m:"m6"},
  {q:"AZ LIMS: FS+DS was 167 pages. Protocol was?",o:["167 pages","83 pages","41 pages","25 pages"],a:2,e:"Using generic test scripts reduced the protocol to just 41 pages.",m:"m9"},
];

// ═══════════════════════════════════════
// INTERVIEW QUESTIONS
// ═══════════════════════════════════════
export const INTERVIEW_DATA = {
  entry:[
    {q:"What is CSV and why does it matter?",a:"Documented process ensuring computerized systems meet specifications. Protects patient safety, product quality, data integrity. Required by regulators so electronic systems produce reliable data.",c:"Fundamentals"},
    {q:"Explain IQ, OQ, PQ.",a:"IQ: correct installation per specs. OQ: functions correctly per functional requirements under normal and stress conditions. PQ: reliable performance in production with real data and workloads.",c:"Lifecycle"},
    {q:"What are the GAMP 5 categories?",a:"Cat 1 (infrastructure), Cat 3 (non-configurable COTS), Cat 4 (configurable — LIMS/SAP), Cat 5 (custom). Cat 2 removed. Higher categories need more validation.",c:"GAMP"},
    {q:"ALCOA+ meaning?",a:"Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available. Framework for data integrity. >60% of GMP non-compliance is DI-related.",c:"Data Integrity"},
    {q:"What is an audit trail?",a:"Secure, computer-generated, timestamped log of who/what/when/why. Can't obscure prior data. Retained for life of record. Required by Part 11 §11.10(e) and Annex 11.",c:"Data Integrity"},
    {q:"Explain the V-Model.",a:"Connects specifications to testing: URS→PQ, FRS→OQ, DS→IQ. Each spec has matching test. Ensures every requirement verified with full traceability.",c:"Lifecycle"},
    {q:"What is a URS?",a:"User Requirements Specification — defines WHAT the system must do from user perspective. Foundation of validation. Must be clear, testable, traceable via RTM.",c:"Documentation"},
    {q:"Part 11 vs Annex 11?",a:"Part 11: US FDA, focused on e-records/signatures. Annex 11: EU GMP, full lifecycle. Irish companies comply with both for US+EU market. Annex 11 is primary for HPRA inspections.",c:"Regulatory"},
    {q:"What is an RTM?",a:"Requirements Traceability Matrix — links each requirement to functional spec, design, test case, result. Proves every requirement was tested. A gap = audit red flag.",c:"Documentation"},
    {q:"How validate an Excel spreadsheet?",a:"Assess GxP impact, classify (Cat 3+5 if macros). Document URS. Verify all formulas vs known results. Test boundaries and error handling. Protect cells. Version control. Periodic review.",c:"Practical"},
    {q:"What is change control?",a:"Formal process for managing modifications: request, impact/risk assessment, approval, implementation, testing, post-implementation review, closure. Without it, validated state is lost.",c:"Lifecycle"},
    {q:"What is a deviation during testing?",a:"When actual results don't match expected. Document immediately, investigate root cause, assess GxP impact, determine corrective action, implement fix, retest, document resolution. Doesn't auto-mean failure.",c:"Testing"},
    {q:"Name 3 testing types in CSV.",a:"Black-box (outputs vs inputs without knowing code — most common), boundary (edge of ranges), negative (invalid inputs to confirm rejection). Also: regression, stress, user acceptance.",c:"Testing"},
  ],
  mid:[
    {q:"Risk-based validation strategy for new LIMS?",a:"1) GxP impact assess all functions (sample mgmt, results, OOS, CoA). 2) Classify Cat 4. 3) FMEA per function — S×O×D. 4) Map risk→testing intensity. 5) Leverage supplier audit. 6) Document in VP with risk rationale.",c:"Risk"},
    {q:"SAP upgrade validation approach?",a:"1) Review vendor change docs. 2) Impact assess affected GxP modules/transactions. 3) Risk assess. 4) Regression test critical functions. 5) Test interfaces (MES, LIMS). 6) Verify config unchanged where expected. 7) UAT. 8) Update docs. All via change control.",c:"Platform"},
    {q:"System operating without change control — what do you do?",a:"1) Document as-is state. 2) Gap analysis vs validated docs. 3) Risk assess uncontrolled changes. 4) Investigate via config comparison + audit trails. 5) Remediation plan — may need partial revalidation. 6) Establish proper CC. 7) Report to QA. Data integrity concern possibly requiring regulatory notification.",c:"Problem Solving"},
    {q:"CSV vs CSA — when use each?",a:"CSV: traditional scripted. CSA (FDA 2025): risk-based — high-risk still scripted, medium/low may use exploratory. CSA reframes CSV, doesn't replace it. Use CSA with mature risk assessment capabilities. Maintain traditional elements for critical functions.",c:"Strategy"},
    {q:"Validate cloud/SaaS application?",a:"1) Shared responsibility model. 2) Vendor assessment (SOC 2, ISO 27001). 3) Infrastructure (vendor) vs app config (you). 4) Continuous deployment management. 5) DI — backup, archiving, export. 6) Part 11/Annex 11 controls. 7) SLA. 8) GDPR data residency. 9) Periodic vendor reassessment.",c:"Platform"},
    {q:"Batch released from system that lost validated status?",a:"Critical event. 1) Assess cause and timing. 2) DI assessment via audit trails, backups, independent checks. 3) Risk assess patient safety. 4) Formal deviation/CAPA. 5) Batch disposition — quarantine unreleased, review released for recall. 6) Regulatory notification if required. 7) Revalidation.",c:"Problem Solving"},
    {q:"Ensure data integrity during system migration?",a:"1) Plan with acceptance criteria. 2) Data mapping source→target. 3) Pre-migration counts/checksums. 4) Controlled execution + rollback plan. 5) Post-migration: counts, sample comparison, critical fields, calculations. 6) Reconciliation report. 7) Retain source data for retention period.",c:"Data Integrity"},
    {q:"How would you conduct a supplier audit for a SCADA vendor?",a:"1) Pre-audit: questionnaire, docs review, define scope. 2) QMS assessment. 3) Development — SDLC, version control. 4) Testing practices. 5) Config management. 6) Part 11 support — audit trails, e-signatures? 7) Reference pharma customers. 8) Document findings, assess risk, conditions for use. Based on GAMP audit framework from Wingate Ch.15.",c:"Supplier"},
  ]
};

// ═══════════════════════════════════════
// SIMULATORS
// ═══════════════════════════════════════
export const SIMULATORS = [
  {id:"lims",n:"LIMS",i:"🔬",c:"#4ECDC4",sc:[
    {id:"s1",t:"Write URS for Sample Login",l:"Basic",d:"Define user requirements for LIMS sample registration: types, fields, auto-numbering, labels, chain of custody."},
    {id:"s2",t:"OQ — Results Entry & Calculations",l:"Mid",d:"Write and execute OQ test scripts for results entry, automated calculations, and specification comparison."},
    {id:"s3",t:"Handle an OOS Result",l:"Advanced",d:"Manage out-of-specification result: investigation, retest, disposition workflow."},
    {id:"s4",t:"LIMS-SAP Interface Validation",l:"Expert",d:"Validate bidirectional LIMS-SAP QM interface for batch release."},
  ]},
  {id:"kneat",n:"KNEAT",i:"📝",c:"#A78BFA",sc:[
    {id:"s1",t:"Create IQ Protocol Template",l:"Basic",d:"Build reusable IQ protocol template with standard sections, test steps, evidence, approvals."},
    {id:"s2",t:"Execute PQ with Digital Evidence",l:"Mid",d:"Execute PQ: attach screenshot evidence, record results, handle deviation, e-signatures."},
    {id:"s3",t:"Manage Deviation During OQ",l:"Advanced",d:"Test fails during OQ. Document, investigate root cause, assess impact, resolve, close."},
  ]},
  {id:"scada",n:"SCADA/PLC",i:"⚙️",c:"#FF6B6B",sc:[
    {id:"s1",t:"I/O Point Verification",l:"Basic",d:"Verify analog and digital I/O points against hardware design specification."},
    {id:"s2",t:"Alarm Testing Protocol",l:"Mid",d:"Write and execute alarm testing for critical process parameters."},
    {id:"s3",t:"Historian Data Integrity",l:"Advanced",d:"Validate historian timestamps, resolution, compression, retrieval accuracy."},
    {id:"s4",t:"Server Failover Testing",l:"Expert",d:"Test redundant server failover: automatic switchover, data continuity, no loss."},
  ]},
  {id:"sap",n:"SAP ERP",i:"📊",c:"#38BDF8",sc:[
    {id:"s1",t:"GxP Transaction Mapping",l:"Basic",d:"Identify and classify GxP-relevant SAP transactions in QM/PP modules."},
    {id:"s2",t:"Batch Disposition Workflow",l:"Mid",d:"Configure and test electronic batch disposition: usage decision, stock posting, CoA."},
    {id:"s3",t:"Material Master Migration",l:"Advanced",d:"Validate material master data migration: plan, execute, verify counts and critical fields."},
  ]},
  {id:"mes",n:"MES",i:"🏭",c:"#FB923C",sc:[
    {id:"s1",t:"Electronic Batch Record Setup",l:"Basic",d:"Configure eBR template: phases, steps, material additions, CPP entries, signatures."},
    {id:"s2",t:"Recipe Enforcement Testing",l:"Mid",d:"Validate CPP enforcement: setpoint limits, out-of-range warnings, process holds, recording."},
    {id:"s3",t:"Equipment Cleaning Status",l:"Advanced",d:"Test cleaning status tracking, hold-time enforcement, campaign tracking, cross-contamination prevention."},
  ]},
  {id:"vlms",n:"ValGenesis",i:"✅",c:"#22C55E",sc:[
    {id:"s1",t:"Create Validation Plan",l:"Basic",d:"Create VP for Cat 4 system: scope, approach, deliverables, roles, acceptance criteria."},
    {id:"s2",t:"Build RTM",l:"Mid",d:"Link URS→FRS→test cases→results. Demonstrate full traceability."},
    {id:"s3",t:"Execute Periodic Review",l:"Advanced",d:"Execute annual review: changes, incidents, access, backups, supplier, training, fitness."},
  ]},
];

// ═══════════════════════════════════════
// FLOWCHARTS
// ═══════════════════════════════════════
export const FLOWCHARTS = [
  {id:"fc1",t:"CSV Validation Lifecycle",n:["GxP Impact Assessment","System Classification","Risk Assessment","Validation Plan","URS","FRS","Design Spec","IQ","OQ","PQ","Validation Summary Report","Operational Phase","Periodic Review","Retirement"]},
  {id:"fc2",t:"Change Control Process",n:["Change Request","Impact Assessment","Risk Assessment","QA Approval","Implementation","Testing","Post-Implementation Review","Doc Update","Closure"]},
  {id:"fc3",t:"Test Incident Lifecycle",n:["Incident Raised","Initial Assessment","Categorization","Allocation","Detailed Assessment","Approval to Fix","Fix Implemented","Approval to Close","Closed"]},
  {id:"fc4",t:"Deviation Management",n:["Deviation Detected","Documentation","Root Cause Investigation","GxP Impact Assessment","Corrective Action Plan","QA Approval","Implementation","Effectiveness Check","Closure"]},
  {id:"fc5",t:"LIMS Sample Lifecycle",n:["Sample Registration","Label Printing","Sample Login","Test Assignment","Results Entry","Review & Approval","OOS Check","Certificate of Analysis","Archival"]},
  {id:"fc6",t:"Risk Assessment Flow",n:["Identify System","GxP Impact?","GAMP Category","Functional Risk Assessment","Calculate RPN","Determine Test Strategy","Document Rationale","Execute Testing","Review Residual Risk"]},
];

// ═══════════════════════════════════════
// FEYNMAN TOPICS
// ═══════════════════════════════════════
export const FEYNMAN_TOPICS = [
  "GAMP 5 Categories","V-Model","ALCOA+ Principles","Part 11 Audit Trails",
  "IQ vs OQ vs PQ","Risk-Based Testing","Change Control","Data Integrity",
  "Validation Master Plan","Requirements Traceability","Supplier Auditing",
  "Computer Software Assurance","Periodic Review","Electronic Signatures",
  "FMEA Risk Assessment","LIMS Validation","SCADA Qualification",
  "Annex 11 vs Part 11","Predicate Rules","Generic vs Linear Test Scripts"
];
