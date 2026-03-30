// ═══════════════════════════════════════
// QUIZ BANK — 40 questions from 3 books
// ═══════════════════════════════════════
export const QUIZ_BANK = [
  {q:"Stokes says the PRIMARY business reason for testing is?",o:["Regulatory compliance","It saves money","QA requires it","Tradition"],a:1,e:"Stokes Ch.3: Cost-effectiveness is the overriding reason.",m:"m1"},
  {q:"Which GAMP 5 category was removed?",o:["Cat 1","Cat 2 (firmware)","Cat 3","Cat 4"],a:1,e:"Cat 2 covered firmware in GAMP 4. Now reclassified as Cat 3/4/5.",m:"m3"},
  {q:"URS traces to which qualification?",o:["IQ","OQ","PQ","DQ"],a:2,e:"V-Model: URS→PQ, FRS→OQ, DS→IQ.",m:"m3"},
  {q:"Ex-FDA inspector Clark debunks which myth?",o:["Validation needs evidence","Validation through use is sufficient","Risk should drive effort","Testing finds flaws"],a:1,e:"Clark: using a system for years ≠ validation.",m:"m10"},
  {q:"'C' in ALCOA stands for?",o:["Complete","Consistent","Contemporaneous","Controlled"],a:2,e:"Contemporaneous — recorded when it happened.",m:"m5"},
  {q:"What is a 'predicate rule'?",o:["Validation protocol","Existing FDA regulation requiring records","E-signature type","Risk method"],a:1,e:"When records are electronic, Part 11 applies on top of predicate rule.",m:"m2"},
  {q:"SCADA typically classified as?",o:["Cat 1","Cat 3","Cat 4 + possible Cat 5","Cat 5 only"],a:2,e:"Cat 4 configurable with possible Cat 5 custom scripts.",m:"m9"},
  {q:"Which technique uses Severity × Occurrence × Detection?",o:["FTA","HACCP","FMEA","GAMP"],a:2,e:"FMEA: Risk Priority Number = S × O × D.",m:"m4"},
  {q:"DI failures = what % of GMP non-compliance?",o:["~20%","~40%",">60%","~80%"],a:2,e:"Over 60% of global GMP non-compliance relates to data integrity.",m:"m5"},
  {q:"Ireland's pharma regulator is?",o:["FDA","EMA","MHRA","HPRA"],a:3,e:"HPRA — Health Products Regulatory Authority.",m:"m1"},
  {q:"Why track REJECTED changes?",o:["Audit trail only","Patterns indicate problems","Penalize requestors","Don't need to"],a:1,e:"Andrews: patterns in rejected changes reveal issues.",m:"m7"},
  {q:"CSA stands for?",o:["Computer System Assessment","Computer Software Assurance","Clinical System Analysis","Computerised System Audit"],a:1,e:"Computer Software Assurance — FDA 2025.",m:"m11"},
  {q:"What can invalidate an entire test program?",o:["Too many testers","Poor test cases + missing signatures","Testing too fast","Automated tools"],a:1,e:"Stokes: minor errors build up to compromise programs.",m:"m6"},
  {q:"LIMS typically classified as?",o:["Cat 1","Cat 3","Cat 4","Cat 5"],a:2,e:"LIMS = GAMP Category 4 — configurable.",m:"m9"},
  {q:"Every test MUST have?",o:["Test harness","Unambiguous acceptance criteria","Automated execution","Risk score"],a:1,e:"Stokes Ch.7: unambiguous acceptance criteria.",m:"m6"},
  {q:"Annex 11 is primary for?",o:["US","Japan","EU/Ireland","Australia"],a:2,e:"EU GMP Annex 11 — HPRA inspects against it.",m:"m2"},
  {q:"Irish validation platform companies?",o:["SAP/Oracle","KNEAT/ValGenesis","Emerson/Siemens","Pfizer/MSD"],a:1,e:"KNEAT (Limerick) and ValGenesis (Dublin).",m:"m9"},
  {q:"FAT/SAT same as IQ/OQ?",o:["Yes","Different but can be leveraged","FAT replaces IQ","SAT replaces PQ"],a:1,e:"Different purposes but results can be leveraged.",m:"m6"},
  {q:"Inspector warning flag for access?",o:["Too many users","Admin rights without oversight","Time zones","Passwords"],a:1,e:"Admin rights without oversight = red flag.",m:"m10"},
  {q:"Stokes' max risk score?",o:["50","75","100","150"],a:2,e:"Maximum = 100 from weighted risk factors.",m:"m4"},
  {q:"If >40% incidents are script errors after week 1?",o:["Continue","Speed up","HALT and retrain","Report to FDA"],a:2,e:"Stokes: halt for review and retraining.",m:"m6"},
  {q:"TCA in AZ LIMS case study?",o:["Technical Config Assessment","Threats and Controls Analysis","Test Coverage Analysis","Tech Compliance Audit"],a:1,e:"AZ used Threats and Controls Analysis — 23-area checklist.",m:"m9"},
  {q:"Part 11 e-signatures need how many components?",o:["One","Two","Three","Four"],a:1,e:"At least TWO distinct components (ID + password).",m:"m2"},
  {q:"E-signature must include?",o:["Name only","Printed name + date/time + meaning","Biometric","Digital cert"],a:1,e:"Printed name, date/time, meaning of signature.",m:"m2"},
  {q:"GAMP 5 published by?",o:["FDA","EMA","ISPE","WHO"],a:2,e:"International Society for Pharmaceutical Engineering.",m:"m3"},
  {q:"High RPN indicates?",o:["Low risk","Needs more validation","Can skip","Supplier-tested"],a:1,e:"Higher RPN = more rigorous testing needed.",m:"m4"},
  {q:"Purpose of regression testing?",o:["Test boundaries","Ensure changes don't break existing functions","First-time test","Test UI"],a:1,e:"Verifies changes haven't broken existing functionality.",m:"m6"},
  {q:"'Paper is patient' means?",o:["Lasts forever","Can't verify contemporaneous recording","Paper is cheap","Needs patience"],a:1,e:"Can't verify at review whether paper entries were real-time.",m:"m5"},
  {q:"Black-box testing is?",o:["Screens off","Testing outputs vs inputs without knowing code","Security test","UI-only"],a:1,e:"Most common CSV approach — test WHAT, not HOW.",m:"m6"},
  {q:"AZ LIMS: FS+DS=167pg. Protocol was?",o:["167pg","83pg","41pg","25pg"],a:2,e:"Generic scripts reduced protocol to 41 pages.",m:"m9"},
  {q:"Key benefit of structural testing per Wingate?",o:["Replaces functional testing","Catches defects at cheapest phase","Required by FDA","Improves UI"],a:1,e:"Wingate Ch.15: Catches defects early — cheapest time to fix.",m:"m6"},
  {q:"Change Requests must be traceable to?",o:["Budget approval","The implemented change in code/document","Project manager","Vendor notes"],a:1,e:"Wingate: traceable from implemented change back to original request.",m:"m7"},
  {q:"URS security requirements should include?",o:["Security is optional","Only passwords","Unauthorized access detection, auto-logout, profiles, password controls","Only physical"],a:2,e:"Andrews Ch.6: detection, auto-logout, authorized users, profiles, password controls.",m:"m2"},
  {q:"Electronic records must be retrievable throughout?",o:["1 year","5 years","Specified retention period (may exceed system lifetime)","Until next audit"],a:2,e:"Andrews: retention period may extend beyond system's lifetime.",m:"m5"},
  {q:"AZ LIMS PQ could only run?",o:["Any time","During plant shutdown","Weekends","After FDA approval"],a:1,e:"PQ required production machine, only available during shutdowns.",m:"m9"},
  {q:"Failed test data objects should be handled by?",o:["Deleting them","Sequencing tests, partial saves, or flexible scripts","Ignoring","New databases"],a:1,e:"Stokes Ch.8: three approaches for test data management.",m:"m6"},
  {q:"White-box testing is?",o:["Without docs","Testing internal code logic and structure","UI only","Blank screens"],a:1,e:"Examines internal code. Complements black-box functional testing.",m:"m6"},
  {q:"How to tell if a QMS has fallen into disuse?",o:["SOPs look new","SOPs unchanged for years despite business evolution","Employees complain","Auditors approve"],a:1,e:"Wingate: moribund SOPs unchanged for years betray disuse.",m:"m10"},
  {q:"SAT results should establish?",o:["Nothing","Performance baseline for future monitoring","Vendor relationship","Training plan"],a:1,e:"Stokes Ch.15: baseline for meaningful future comparisons.",m:"m6"},
];

// ═══════════════════════════════════════
// INTERVIEW QUESTIONS
// ═══════════════════════════════════════
export const INTERVIEW_DATA = {
  entry:[
    {q:"What is CSV and why does it matter?",a:"Documented process ensuring computerized systems meet specifications. Protects patient safety, product quality, data integrity.",c:"Fundamentals"},
    {q:"Explain IQ, OQ, PQ.",a:"IQ: correct installation per specs. OQ: functions correctly per requirements. PQ: reliable performance in production with real data.",c:"Lifecycle"},
    {q:"What are GAMP 5 categories?",a:"Cat 1 (infrastructure), Cat 3 (non-configurable COTS), Cat 4 (configurable — LIMS/SAP), Cat 5 (custom). Cat 2 removed. Higher = more validation.",c:"GAMP"},
    {q:"ALCOA+ meaning?",a:"Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available. >60% of GMP non-compliance is DI-related.",c:"Data Integrity"},
    {q:"What is an audit trail?",a:"Secure, computer-generated, timestamped log of who/what/when/why. Can't obscure prior data. Retained for life of record.",c:"Data Integrity"},
    {q:"Explain the V-Model.",a:"Connects specs to testing: URS→PQ, FRS→OQ, DS→IQ. Ensures every requirement verified with full traceability.",c:"Lifecycle"},
    {q:"What is a URS?",a:"User Requirements Spec — WHAT the system must do from user perspective. Foundation of validation. Must be clear, testable, traceable.",c:"Documentation"},
    {q:"Part 11 vs Annex 11?",a:"Part 11: US FDA, e-records/signatures. Annex 11: EU GMP, full lifecycle. Irish companies comply with both.",c:"Regulatory"},
    {q:"What is an RTM?",a:"Requirements Traceability Matrix — links each requirement to spec, design, test case, result. Gap = audit red flag.",c:"Documentation"},
    {q:"How validate Excel spreadsheet?",a:"GxP impact, classify Cat 3+5 if macros. URS. Verify formulas vs known results. Boundaries. Protect cells. Version control. Periodic review.",c:"Practical"},
    {q:"What is change control?",a:"Formal process: request, impact/risk assessment, approval, implementation, testing, review, closure. Without it, validated state is lost.",c:"Lifecycle"},
    {q:"What is a deviation?",a:"Actual ≠ expected. Document immediately, investigate root cause, GxP impact, corrective action, retest, document. Doesn't auto-mean failure.",c:"Testing"},
    {q:"Name 3 testing types.",a:"Black-box (outputs vs inputs), boundary (edge of ranges), negative (invalid inputs to confirm rejection). Also: regression, stress, UAT.",c:"Testing"},
    {q:"What is periodic review?",a:"Annual reassessment: changes, incidents, access, backups, supplier, training, fitness. Document findings and actions.",c:"Lifecycle"},
    {q:"Difference between FAT and SAT?",a:"FAT at supplier's premises before shipping. SAT at user's site after installation. Different from IQ/OQ/PQ but results can be leveraged.",c:"Testing"},
  ],
  mid:[
    {q:"Risk-based strategy for new LIMS?",a:"GxP impact all functions. Classify Cat 4. FMEA per function. Map risk→testing. Leverage supplier audit. Document in VP with rationale.",c:"Risk"},
    {q:"SAP upgrade validation?",a:"Review vendor changes. Impact assess GxP modules. Risk assess. Regression test critical. Test interfaces. Verify config. UAT. Update docs. Via change control.",c:"Platform"},
    {q:"System without change control?",a:"Document as-is. Gap analysis. Risk assess. Investigate via config comparison + audit trails. Remediation. Establish CC. Report to QA. Data integrity concern.",c:"Problem Solving"},
    {q:"CSV vs CSA?",a:"CSV: traditional scripted. CSA (FDA 2025): risk-based — high-risk scripted, medium/low exploratory. CSA reframes CSV. Use CSA with mature risk capabilities.",c:"Strategy"},
    {q:"Validate cloud/SaaS?",a:"Shared responsibility. Vendor assessment (SOC 2). Infrastructure vs app config. Continuous deployment. DI controls. Part 11/Annex 11. SLA. GDPR. Periodic reassessment.",c:"Platform"},
    {q:"Batch released from invalid system?",a:"Critical event. Assess cause/timing. DI assessment. Risk assess patient safety. Deviation/CAPA. Batch disposition. Regulatory notification. Revalidation.",c:"Problem Solving"},
    {q:"Data integrity during migration?",a:"Plan with criteria. Data mapping. Pre-migration counts/checksums. Controlled execution + rollback. Post-migration verification. Reconciliation report. Retain source.",c:"Data Integrity"},
    {q:"Supplier audit for SCADA vendor?",a:"Questionnaire. QMS assessment. SDLC review. Testing practices. Config management. Part 11 support. Reference customers. Findings and conditions for use.",c:"Supplier"},
    {q:"Test data management for complex systems?",a:"Per Stokes: sequence tests, partial data saves/restores, or flexible scripts using any suitable object in required state. Critical for irreversible status changes.",c:"Testing"},
    {q:"Periodic review of validated LIMS?",a:"Changes, incidents/trends, audit findings, config vs docs, user access, backup testing, supplier status, training, overall fitness. Document everything.",c:"Lifecycle"},
  ]
};

// ═══════════════════════════════════════
// SIMULATORS — 27 scenarios across 6 platforms
// ═══════════════════════════════════════
export const SIMULATORS = [
  {id:"lims",n:"LIMS",i:"🔬",c:"#4ECDC4",sc:[
    {id:"s1",t:"Write URS for Sample Login",l:"Basic",d:"Define requirements for sample registration: types, fields, auto-numbering, labels, chain of custody."},
    {id:"s2",t:"OQ — Results & Calculations",l:"Mid",d:"Write/execute OQ test scripts for results entry, calculations, spec comparison."},
    {id:"s3",t:"Handle OOS Result",l:"Advanced",d:"Manage out-of-spec result: investigation, retest, disposition."},
    {id:"s4",t:"LIMS-SAP Interface",l:"Expert",d:"Validate bidirectional LIMS-SAP QM interface for batch release."},
    {id:"s5",t:"Audit Trail Review",l:"Advanced",d:"Review LIMS audit trail: identify anomalies, assess DI, document findings."},
  ]},
  {id:"kneat",n:"KNEAT",i:"📝",c:"#A78BFA",sc:[
    {id:"s1",t:"Create IQ Template",l:"Basic",d:"Build reusable IQ protocol template with sections, steps, evidence, approvals."},
    {id:"s2",t:"Execute PQ Digitally",l:"Mid",d:"Execute PQ: evidence, results, deviation, e-signatures."},
    {id:"s3",t:"Manage OQ Deviation",l:"Advanced",d:"Test fails during OQ. Document, investigate, impact, resolve."},
    {id:"s4",t:"Build VSR",l:"Advanced",d:"Compile Validation Summary Report: results, deviations, resolutions, conclusion."},
  ]},
  {id:"scada",n:"SCADA/PLC",i:"⚙️",c:"#FF6B6B",sc:[
    {id:"s1",t:"I/O Verification",l:"Basic",d:"Verify analog/digital I/O against hardware design spec."},
    {id:"s2",t:"Alarm Testing",l:"Mid",d:"Test alarm setpoints for critical process parameters."},
    {id:"s3",t:"Historian Integrity",l:"Advanced",d:"Validate historian timestamps, resolution, compression, retrieval."},
    {id:"s4",t:"Server Failover",l:"Expert",d:"Test redundant server failover: switchover, data continuity, no loss."},
  ]},
  {id:"sap",n:"SAP ERP",i:"📊",c:"#38BDF8",sc:[
    {id:"s1",t:"GxP Transaction Mapping",l:"Basic",d:"Identify GxP-relevant SAP transactions in QM/PP."},
    {id:"s2",t:"Batch Disposition",l:"Mid",d:"Test electronic batch disposition: usage decision, stock, CoA."},
    {id:"s3",t:"Data Migration",l:"Advanced",d:"Validate material master migration: plan, execute, verify."},
    {id:"s4",t:"Upgrade Regression Plan",l:"Expert",d:"Develop regression test plan for SAP upgrade: affected transactions, scope, risk rationale."},
  ]},
  {id:"mes",n:"MES",i:"🏭",c:"#FB923C",sc:[
    {id:"s1",t:"eBR Setup",l:"Basic",d:"Configure electronic batch record template: phases, steps, CPPs, signatures."},
    {id:"s2",t:"Recipe Enforcement",l:"Mid",d:"Validate CPP enforcement: limits, warnings, holds, recording."},
    {id:"s3",t:"Equipment Cleaning",l:"Advanced",d:"Test cleaning status, hold-times, campaign tracking."},
  ]},
  {id:"vlms",n:"ValGenesis",i:"✅",c:"#22C55E",sc:[
    {id:"s1",t:"Create VP",l:"Basic",d:"Create Validation Plan for Cat 4 system."},
    {id:"s2",t:"Build RTM",l:"Mid",d:"URS→FRS→test cases→results traceability."},
    {id:"s3",t:"Periodic Review",l:"Advanced",d:"Annual review: changes, incidents, access, backups, fitness."},
  ]},
];

// ═══════════════════════════════════════
// FLOWCHARTS — 8 process flows
// ═══════════════════════════════════════
export const FLOWCHARTS = [
  {id:"fc1",t:"CSV Validation Lifecycle",n:["GxP Impact Assessment","System Classification","Risk Assessment","Validation Plan","URS","FRS","Design Spec","IQ","OQ","PQ","Validation Summary Report","Operational Phase","Periodic Review","Retirement"]},
  {id:"fc2",t:"Change Control Process",n:["Change Request","Impact Assessment","Risk Assessment","QA Approval","Implementation","Testing","Post-Impl Review","Doc Update","Closure"]},
  {id:"fc3",t:"Test Incident Lifecycle",n:["Incident Raised","Initial Assessment","Categorization","Allocation","Detailed Assessment","Approval to Fix","Fix Implemented","Approval to Close","Closed"]},
  {id:"fc4",t:"Deviation Management",n:["Deviation Detected","Documentation","Root Cause Investigation","GxP Impact Assessment","Corrective Action Plan","QA Approval","Implementation","Effectiveness Check","Closure"]},
  {id:"fc5",t:"LIMS Sample Lifecycle",n:["Sample Registration","Label Printing","Sample Login","Test Assignment","Results Entry","Review & Approval","OOS Check","Certificate of Analysis","Archival"]},
  {id:"fc6",t:"Risk Assessment Flow",n:["Identify System","GxP Impact?","GAMP Category","Functional Risk Assessment","Calculate RPN","Determine Test Strategy","Document Rationale","Execute Testing","Review Residual Risk"]},
  {id:"fc7",t:"Supplier Audit Process",n:["Define Scope","Pre-Audit Questionnaire","Document Review","On-Site Audit","QMS Assessment","SDLC Review","Testing Review","Findings Report","Risk Classification","Conditions for Use"]},
  {id:"fc8",t:"Data Migration Validation",n:["Migration Plan","Data Mapping","Pre-Migration Verify","Controlled Execution","Post-Migration Counts","Sample Comparison","Critical Field Check","Reconciliation Report","Source Retention"]},
];

export const FEYNMAN_TOPICS = [
  "GAMP 5 Categories","V-Model","ALCOA+ Principles","Part 11 Audit Trails",
  "IQ vs OQ vs PQ","Risk-Based Testing","Change Control","Data Integrity",
  "Validation Master Plan","Requirements Traceability","Supplier Auditing",
  "Computer Software Assurance","Periodic Review","Electronic Signatures",
  "FMEA Risk Assessment","LIMS Validation","SCADA Qualification",
  "Annex 11 vs Part 11","Predicate Rules","Generic vs Linear Test Scripts"
];

export const STUDY_PLAN = [
  {wk:"1-2",t:"Foundations",desc:"Modules 1-2: CSV fundamentals + regulatory landscape.",tasks:["Complete m1 lessons","Complete m2 lessons","Read 21 CFR Part 11","Read EU Annex 11","Take Module 1 & 2 quizzes"],mods:["m1","m2"]},
  {wk:"3-4",t:"GAMP 5 Deep Dive",desc:"Module 3: Categories, V-model, lifecycle. Classify real systems.",tasks:["Complete m3 lessons","Classify 5 systems by GAMP category","Draw V-Model from memory","Feynman: GAMP 5 Categories"],mods:["m3"]},
  {wk:"5-6",t:"Risk & Data Integrity",desc:"Modules 4-5: FMEA, ALCOA+. Apply risk frameworks.",tasks:["Complete m4 + m5 lessons","Practice FMEA exercise","Feynman: ALCOA+","Take quizzes m4 & m5"],mods:["m4","m5"]},
  {wk:"7-8",t:"Testing Mastery",desc:"Module 6: Test strategies, scripts, IQ/OQ/PQ.",tasks:["Complete m6 lessons","Write practice IQ script","Write practice OQ script","Run LIMS + KNEAT simulators"],mods:["m6"]},
  {wk:"9-10",t:"Practical Skills",desc:"Modules 7-9: Change control, suppliers, platforms.",tasks:["Complete m7-m9 lessons","Run SAP + SCADA simulators","Mock interview (entry level)","Feynman: Change Control"],mods:["m7","m8","m9"]},
  {wk:"11-12",t:"Advanced & Review",desc:"Modules 10-11: QMS, CSA. Full self-assessment.",tasks:["Complete m10-m11 lessons","Full random quiz","Mock interview (mid level)","Review all flowcharts","Retake weak quizzes"],mods:["m10","m11"]},
];

export const RESOURCES = [
  {t:"21 CFR Part 11",u:"https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11",ty:"REG"},
  {t:"FDA Part 11 Guidance (2003)",u:"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/part-11-electronic-records-electronic-signatures-scope-and-application",ty:"GUIDANCE"},
  {t:"EU GMP Annex 11",u:"https://health.ec.europa.eu/document/download/0bcd79e7-cd28-4c4f-aa56-b8c4f04e68c5_en",ty:"REG"},
  {t:"ISPE GAMP 5 (2nd Ed)",u:"https://ispe.org/publications/guidance-documents/gamp-5-guide-2nd-edition",ty:"GUIDE"},
  {t:"ICH Q9(R1) — Quality Risk Management",u:"https://database.ich.org/sites/default/files/Q9%28R1%29_Guideline_Step4_2022_1219.pdf",ty:"GUIDE"},
  {t:"FDA: Data Integrity & CGMP (2018)",u:"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/data-integrity-and-compliance-drug-cgmp-questions-and-answers",ty:"GUIDANCE"},
  {t:"CSV Guide (PMC, 2024)",u:"https://pmc.ncbi.nlm.nih.gov/articles/PMC11416705/",ty:"ARTICLE"},
  {t:"QbD Complete CSV Guide",u:"https://qbdgroup.com/en/a-complete-guide-to-computer-system-validation",ty:"GUIDE"},
];
