// Interview, Glossary, Risk Calculator, Study Plan, Resources, Simulators, Flowcharts, Feynman

export const INTERVIEW_DATA = {
  entry:[
    {q:"What is CSV?",a:"Documented process ensuring computerized systems meet specifications. Protects patient safety, product quality, data integrity.",c:"Fundamentals"},
    {q:"Explain IQ, OQ, PQ.",a:"IQ: correct installation. OQ: functions per requirements. PQ: reliable performance in production with real data.",c:"Lifecycle"},
    {q:"GAMP 5 categories?",a:"Cat 1 (infrastructure), Cat 3 (non-configurable), Cat 4 (configurable — LIMS/SAP), Cat 5 (custom). Cat 2 removed.",c:"GAMP"},
    {q:"ALCOA+ meaning?",a:"Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available. DI framework.",c:"Data Integrity"},
    {q:"What is an audit trail?",a:"Secure, timestamped log of who/what/when/why. Can't obscure prior data. Retained for life of record.",c:"Data Integrity"},
    {q:"Explain the V-Model.",a:"Connects specs to testing: URS→PQ, FRS→OQ, DS→IQ. Full traceability.",c:"Lifecycle"},
    {q:"What is a URS?",a:"User Requirements Spec — WHAT the system must do. Foundation. Must be clear, testable, traceable.",c:"Documentation"},
    {q:"Part 11 vs Annex 11?",a:"Part 11: US FDA e-records/signatures. Annex 11: EU full lifecycle. Irish companies comply with both.",c:"Regulatory"},
    {q:"What is an RTM?",a:"Requirements Traceability Matrix — links requirement→spec→design→test→result. Gap = audit flag.",c:"Documentation"},
    {q:"Validate Excel spreadsheet?",a:"GxP impact, classify, URS, verify formulas, test boundaries, protect cells, version control, periodic review.",c:"Practical"},
    {q:"What is change control?",a:"Formal process: request→impact→risk→approval→implement→test→review→close. Without it, validated state lost.",c:"Lifecycle"},
    {q:"What is a deviation?",a:"Actual≠expected. Document, investigate root cause, assess GxP, corrective action, retest, document.",c:"Testing"},
    {q:"Name 3 testing types.",a:"Black-box (outputs vs inputs), boundary (edge of ranges), negative (invalid inputs). Also regression, stress, UAT.",c:"Testing"},
    {q:"Periodic review?",a:"Annual: changes, incidents, access, backups, supplier, training, fitness. Document findings and actions.",c:"Lifecycle"},
    {q:"FAT vs SAT?",a:"FAT at supplier before shipping. SAT at user site after install. Different from IQ/OQ/PQ but leverageable.",c:"Testing"},
  ],
  mid:[
    {q:"Risk-based LIMS strategy?",a:"GxP impact all functions. Cat 4. FMEA per function. Map risk→testing. Leverage supplier. Document rationale.",c:"Risk"},
    {q:"SAP upgrade validation?",a:"Review changes. Impact GxP modules. Risk assess. Regression test. Test interfaces. Verify config. UAT. Change control.",c:"Platform"},
    {q:"System without change control?",a:"Document as-is. Gap analysis. Risk assess. Config comparison + audit trails. Remediation. Establish CC. Report QA.",c:"Problem Solving"},
    {q:"CSV vs CSA?",a:"CSV: traditional scripted. CSA (2025): risk-based — high scripted, medium/low exploratory. CSA reframes, doesn't replace.",c:"Strategy"},
    {q:"Validate cloud/SaaS?",a:"Shared responsibility. SOC 2. Infrastructure vs config. Continuous deployment. DI. Part 11/Annex 11. SLA. GDPR.",c:"Platform"},
    {q:"Batch from invalid system?",a:"Critical event. Assess timing. DI assessment. Patient safety risk. Deviation/CAPA. Batch disposition. Regulatory notification. Revalidate.",c:"Problem Solving"},
    {q:"Migration data integrity?",a:"Plan. Data mapping. Pre-migration counts/checksums. Execute + rollback. Post verify. Reconciliation. Retain source.",c:"Data Integrity"},
    {q:"SCADA vendor audit?",a:"Questionnaire. QMS. SDLC. Testing. Config mgmt. Part 11 support. References. Findings. Conditions for use.",c:"Supplier"},
    {q:"Test data management?",a:"Stokes: sequence tests, partial saves/restores, flexible scripts using any suitable object. Critical for irreversible changes.",c:"Testing"},
    {q:"LIMS periodic review?",a:"Changes, incidents/trends, audit findings, config vs docs, access, backups, supplier, training, fitness. Document all.",c:"Lifecycle"},
  ]
};

// ═══════════════════════════════════════
// SIMULATORS
// ═══════════════════════════════════════;

export const SIMULATORS = [
  {id:"lims",n:"LIMS",i:"🔬",c:"#4ECDC4",sc:[
    {id:"s1",t:"Write URS for Sample Login",l:"Basic",d:"Define requirements for sample registration: types, fields, numbering, labels, chain of custody."},
    {id:"s2",t:"OQ — Results & Calculations",l:"Mid",d:"Write/execute OQ scripts for results entry, calculations, spec comparison."},
    {id:"s3",t:"Handle OOS Result",l:"Advanced",d:"Manage OOS: investigation, retest, disposition."},
    {id:"s4",t:"LIMS-SAP Interface",l:"Expert",d:"Validate bidirectional LIMS-SAP QM interface."},
    {id:"s5",t:"Audit Trail Review",l:"Advanced",d:"Review audit trail: identify anomalies, assess DI."},
  ]},
  {id:"kneat",n:"KNEAT",i:"📝",c:"#A78BFA",sc:[
    {id:"s1",t:"Create IQ Template",l:"Basic",d:"Build reusable IQ template with sections, steps, evidence, approvals."},
    {id:"s2",t:"Execute PQ Digitally",l:"Mid",d:"Execute PQ: evidence, results, deviation, e-signatures."},
    {id:"s3",t:"Manage OQ Deviation",l:"Advanced",d:"Test fails during OQ. Document, investigate, resolve."},
    {id:"s4",t:"Build VSR",l:"Advanced",d:"Compile Validation Summary Report."},
  ]},
  {id:"scada",n:"SCADA/PLC",i:"⚙️",c:"#FF6B6B",sc:[
    {id:"s1",t:"I/O Verification",l:"Basic",d:"Verify I/O points against hardware spec."},
    {id:"s2",t:"Alarm Testing",l:"Mid",d:"Test alarm setpoints for critical parameters."},
    {id:"s3",t:"Historian Integrity",l:"Advanced",d:"Validate historian timestamps, resolution, retrieval."},
    {id:"s4",t:"Server Failover",l:"Expert",d:"Test redundant server failover."},
  ]},
  {id:"sap",n:"SAP ERP",i:"📊",c:"#38BDF8",sc:[
    {id:"s1",t:"GxP Transaction Mapping",l:"Basic",d:"Identify GxP SAP transactions in QM/PP."},
    {id:"s2",t:"Batch Disposition",l:"Mid",d:"Test batch disposition workflow."},
    {id:"s3",t:"Data Migration",l:"Advanced",d:"Validate material master migration."},
    {id:"s4",t:"Upgrade Regression",l:"Expert",d:"Develop regression plan for SAP upgrade."},
  ]},
  {id:"mes",n:"MES",i:"🏭",c:"#FB923C",sc:[
    {id:"s1",t:"eBR Setup",l:"Basic",d:"Configure electronic batch record template."},
    {id:"s2",t:"Recipe Enforcement",l:"Mid",d:"Validate CPP enforcement."},
    {id:"s3",t:"Equipment Cleaning",l:"Advanced",d:"Test cleaning status and hold-times."},
  ]},
  {id:"vlms",n:"ValGenesis",i:"✅",c:"#22C55E",sc:[
    {id:"s1",t:"Create VP",l:"Basic",d:"Create Validation Plan for Cat 4 system."},
    {id:"s2",t:"Build RTM",l:"Mid",d:"URS→FRS→tests→results traceability."},
    {id:"s3",t:"Periodic Review",l:"Advanced",d:"Annual review execution."},
  ]},
];

// ═══════════════════════════════════════
// FLOWCHARTS
// ═══════════════════════════════════════;

export const FLOWCHARTS = [
  {id:"fc1",t:"CSV Validation Lifecycle",n:["GxP Impact Assessment","System Classification","Risk Assessment","Validation Plan","URS","FRS","Design Spec","IQ","OQ","PQ","Validation Summary Report","Operational Phase","Periodic Review","Retirement"]},
  {id:"fc2",t:"Change Control Process",n:["Change Request","Impact Assessment","Risk Assessment","QA Approval","Implementation","Testing","Post-Impl Review","Doc Update","Closure"]},
  {id:"fc3",t:"Test Incident Lifecycle",n:["Incident Raised","Initial Assessment","Categorization","Allocation","Detailed Assessment","Approval to Fix","Fix Implemented","Approval to Close","Closed"]},
  {id:"fc4",t:"Deviation Management",n:["Deviation Detected","Documentation","Root Cause Investigation","GxP Impact Assessment","Corrective Action Plan","QA Approval","Implementation","Effectiveness Check","Closure"]},
  {id:"fc5",t:"LIMS Sample Lifecycle",n:["Sample Registration","Label Printing","Sample Login","Test Assignment","Results Entry","Review & Approval","OOS Check","Certificate of Analysis","Archival"]},
  {id:"fc6",t:"Risk Assessment Flow",n:["Identify System","GxP Impact?","GAMP Category","Functional Risk Assessment","Calculate RPN","Test Strategy","Document Rationale","Execute Testing","Review Residual Risk"]},
  {id:"fc7",t:"Supplier Audit Process",n:["Define Scope","Pre-Audit Questionnaire","Document Review","On-Site Audit","QMS Assessment","SDLC Review","Testing Review","Findings Report","Risk Classification","Conditions for Use"]},
  {id:"fc8",t:"Data Migration Validation",n:["Migration Plan","Data Mapping","Pre-Migration Verify","Controlled Execution","Post-Migration Counts","Sample Comparison","Critical Field Check","Reconciliation Report","Source Retention"]},
];

export const FEYNMAN_TOPICS = ["GAMP 5 Categories","V-Model","ALCOA+","Part 11 Audit Trails","IQ vs OQ vs PQ","Risk-Based Testing","Change Control","Data Integrity","VMP","Requirements Traceability","Supplier Auditing","CSA","Periodic Review","Electronic Signatures","FMEA","LIMS Validation","SCADA Qualification","Annex 11 vs Part 11","Predicate Rules","Generic vs Linear Scripts"];

export const STUDY_PLAN = [
  {wk:"1-2",t:"Foundations",desc:"Modules 1-2: CSV fundamentals + regulations.",tasks:["Complete m1 lessons","Complete m2 lessons","Read 21 CFR Part 11","Read EU Annex 11","Quiz m1 & m2"],mods:["m1","m2"]},
  {wk:"3-4",t:"GAMP 5",desc:"Module 3: Categories, V-model, lifecycle.",tasks:["Complete m3 lessons","Classify 5 systems","Draw V-Model from memory","Feynman: GAMP 5"],mods:["m3"]},
  {wk:"5-6",t:"Risk & DI",desc:"Modules 4-5: FMEA, ALCOA+.",tasks:["Complete m4+m5","Practice FMEA","Use Risk Calculator","Feynman: ALCOA+"],mods:["m4","m5"]},
  {wk:"7-8",t:"Testing",desc:"Module 6: Strategies, scripts, IQ/OQ/PQ.",tasks:["Complete m6","Write IQ script","Write OQ script","LIMS + KNEAT sims"],mods:["m6"]},
  {wk:"9-10",t:"Practical",desc:"Modules 7-9: Change control, suppliers, platforms.",tasks:["Complete m7-m9","SAP + SCADA sims","Mock interview entry","Feynman: Change Control"],mods:["m7","m8","m9"]},
  {wk:"11-12",t:"Advanced",desc:"Modules 10-11 + full review.",tasks:["Complete m10-m11","Full random quiz","Mock interview mid","Review flowcharts","Retake weak quizzes"],mods:["m10","m11"]},
];

export const RESOURCES = [
  {t:"21 CFR Part 11",u:"https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11",ty:"REG"},
  {t:"FDA Part 11 Guidance (2003)",u:"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/part-11-electronic-records-electronic-signatures-scope-and-application",ty:"GUIDANCE"},
  {t:"EU GMP Annex 11",u:"https://health.ec.europa.eu/document/download/0bcd79e7-cd28-4c4f-aa56-b8c4f04e68c5_en",ty:"REG"},
  {t:"ISPE GAMP 5 (2nd Ed)",u:"https://ispe.org/publications/guidance-documents/gamp-5-guide-2nd-edition",ty:"GUIDE"},
  {t:"ICH Q9(R1) — QRM",u:"https://database.ich.org/sites/default/files/Q9%28R1%29_Guideline_Step4_2022_1219.pdf",ty:"GUIDE"},
  {t:"FDA: Data Integrity & CGMP",u:"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/data-integrity-and-compliance-drug-cgmp-questions-and-answers",ty:"GUIDANCE"},
  {t:"CSV Guide (PMC)",u:"https://pmc.ncbi.nlm.nih.gov/articles/PMC11416705/",ty:"ARTICLE"},
  {t:"QbD CSV Guide",u:"https://qbdgroup.com/en/a-complete-guide-to-computer-system-validation",ty:"GUIDE"},
];

// ═══════════════════════════════════════
// GLOSSARY — 40 terms from books + regs
// ═══════════════════════════════════════;

export const GLOSSARY = [
  {term:"CSV",def:"Computer System Validation — documented process ensuring systems meet predefined specifications and intended purpose."},
  {term:"GxP",def:"Good Practice — umbrella for GMP, GLP, GCP, GDP and other quality regulations in regulated industries."},
  {term:"GAMP 5",def:"Good Automated Manufacturing Practice, 5th edition — ISPE's risk-based framework for validating computerised systems."},
  {term:"21 CFR Part 11",def:"FDA regulation establishing criteria for trustworthy electronic records and electronic signatures."},
  {term:"EU Annex 11",def:"European GMP guideline defining requirements for computerised systems in pharmaceutical manufacturing."},
  {term:"URS",def:"User Requirements Specification — defines WHAT the system must do from the user/business perspective."},
  {term:"FRS",def:"Functional Requirements Specification — describes HOW the system will meet each user requirement."},
  {term:"DS",def:"Design Specification — technical details of how the system is built/configured to fulfill requirements."},
  {term:"IQ",def:"Installation Qualification — confirms hardware/software installed correctly per design specifications."},
  {term:"OQ",def:"Operational Qualification — tests system functions correctly against functional requirements."},
  {term:"PQ",def:"Performance Qualification — proves reliable performance in production environment with real data."},
  {term:"VMP",def:"Validation Master Plan — top-level document defining overall validation strategy, scope, and approach."},
  {term:"VP",def:"Validation Plan — system-specific plan detailing validation approach, deliverables, and acceptance criteria."},
  {term:"VSR",def:"Validation Summary Report — final document concluding whether system is validated and fit for use."},
  {term:"RTM",def:"Requirements Traceability Matrix — links each requirement to spec, design, test case, and result."},
  {term:"ALCOA+",def:"Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available."},
  {term:"FMEA",def:"Failure Mode and Effects Analysis — risk technique using Severity × Occurrence × Detection = RPN."},
  {term:"RPN",def:"Risk Priority Number — product of Severity × Occurrence × Detection in FMEA. Higher = more risk."},
  {term:"CAPA",def:"Corrective and Preventive Action — systematic process for investigating problems and preventing recurrence."},
  {term:"SOP",def:"Standard Operating Procedure — documented procedure for performing a specific task consistently."},
  {term:"FAT",def:"Factory Acceptance Test — testing at the supplier's premises before system delivery."},
  {term:"SAT",def:"Site Acceptance Test — testing at the user's site after system installation."},
  {term:"HPRA",def:"Health Products Regulatory Authority — Ireland's national pharmaceutical regulator."},
  {term:"LIMS",def:"Laboratory Information Management System — manages lab data, samples, tests, and results."},
  {term:"SCADA",def:"Supervisory Control and Data Acquisition — monitors and controls manufacturing processes."},
  {term:"PLC",def:"Programmable Logic Controller — industrial computer for direct process automation/control."},
  {term:"DCS",def:"Distributed Control System — automated control system distributed throughout a manufacturing plant."},
  {term:"MES",def:"Manufacturing Execution System — manages shop floor operations, electronic batch records, recipes."},
  {term:"ERP",def:"Enterprise Resource Planning — integrated business system (e.g., SAP) managing materials, production, quality."},
  {term:"QMS",def:"Quality Management System — framework of processes for managing quality, deviations, CAPA, documents."},
  {term:"CSA",def:"Computer Software Assurance — FDA's 2025 risk-based framework reframing traditional CSV."},
  {term:"Predicate Rule",def:"Any existing FDA regulation requiring records. Part 11 applies on top when records are electronic."},
  {term:"Audit Trail",def:"Secure, computer-generated, timestamped log recording who did what, when, and why."},
  {term:"V-Model",def:"Validation model connecting specifications (URS/FRS/DS) to corresponding test phases (PQ/OQ/IQ)."},
  {term:"Data Integrity",def:"Completeness, consistency, and accuracy of data throughout its lifecycle. ALCOA+ is the framework."},
  {term:"Change Control",def:"Formal process for managing modifications to validated systems to maintain validated state."},
  {term:"Periodic Review",def:"Regular (typically annual) reassessment confirming a validated system remains fit for intended use."},
  {term:"TCA",def:"Threats and Controls Analysis — AstraZeneca's checklist-based risk assessment (23 areas) used for LIMS."},
  {term:"KNEAT",def:"Irish company (Limerick) providing cloud-based paperless validation lifecycle management platform."},
  {term:"ValGenesis",def:"Irish company (Dublin) providing Validation Lifecycle Management System (VLMS) platform."},
];

// ═══════════════════════════════════════
// RISK CALCULATOR CONFIG (from Stokes Ch.16)
// ═══════════════════════════════════════;

export const RISK_FACTORS = [
  {name:"GAMP Software Category",options:[{label:"Cat 1 (Infrastructure)",w:0},{label:"Cat 3 (Non-configurable)",w:2},{label:"Cat 4 (Configurable)",w:4},{label:"Cat 5 (Custom)",w:5}]},
  {name:"GxP Priority",options:[{label:"Low",w:5},{label:"Medium",w:10},{label:"High",w:20}]},
  {name:"Business Criticality",options:[{label:"Low",w:5},{label:"Medium",w:10},{label:"High",w:20}]},
  {name:"Software Complexity",options:[{label:"Low",w:1},{label:"Medium",w:3},{label:"High",w:5}]},
  {name:"Established History",options:[{label:"Mature (widely used)",w:1},{label:"Established",w:3},{label:"New/Novel",w:5}]},
  {name:"Speed of Development",options:[{label:"Slow (adequate time)",w:5},{label:"Normal",w:3},{label:"Fast (compressed timeline)",w:10}]},
  {name:"Supplier Track Record",options:[{label:"Excellent",w:0},{label:"Good",w:3},{label:"Average",w:5},{label:"Poor",w:7},{label:"None/Unknown",w:10}]},
];

export const RISK_BANDS = [
  {min:0,max:25,label:"Low",color:"#22C55E",strategy:"Verification only. No formal scripted testing required. Document rationale for reduced testing."},
  {min:26,max:50,label:"Medium-Low",color:"#FFE66D",strategy:"Functional testing of key scenarios. Standard documentation. May use some exploratory testing."},
  {min:51,max:75,label:"Medium-High",color:"#FB923C",strategy:"Comprehensive scripted testing (IQ/OQ/PQ). Full documentation. Boundary and negative testing for critical functions."},
  {min:76,max:100,label:"High",color:"#FF6B6B",strategy:"Exhaustive testing including stress, boundary, negative, security, and failover. Full lifecycle documentation. Independent review."},
];

