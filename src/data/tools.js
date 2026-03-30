// ═══ INTERVIEW DATA ═══
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
    {q:"Batch from invalid system?",a:"Critical event. Assess timing. DI assessment. Patient safety risk. Deviation/CAPA. Batch disposition. Regulatory notification.",c:"Problem Solving"},
    {q:"Migration data integrity?",a:"Plan. Data mapping. Pre-migration counts/checksums. Execute + rollback. Post verify. Reconciliation. Retain source.",c:"Data Integrity"},
    {q:"SCADA vendor audit?",a:"Questionnaire. QMS. SDLC. Testing. Config mgmt. Part 11 support. References. Findings. Conditions for use.",c:"Supplier"},
    {q:"Test data management?",a:"Stokes: sequence tests, partial saves/restores, flexible scripts using any suitable object. Critical for irreversible changes.",c:"Testing"},
    {q:"LIMS periodic review?",a:"Changes, incidents/trends, audit findings, config vs docs, access, backups, supplier, training, fitness. Document all.",c:"Lifecycle"},
  ]
};

// ═══ GLOSSARY ═══
export const GLOSSARY = [
  {term:"CSV",def:"Computer System Validation — documented process proving systems meet specifications."},
  {term:"GxP",def:"Good Practice — umbrella for GMP, GLP, GCP, GDP quality regulations."},
  {term:"GAMP 5",def:"Good Automated Manufacturing Practice guide by ISPE for risk-based validation."},
  {term:"21 CFR Part 11",def:"FDA regulation for trustworthy electronic records and signatures."},
  {term:"EU Annex 11",def:"European GMP guideline for computerised systems in pharma manufacturing."},
  {term:"URS",def:"User Requirements Specification — defines WHAT the system must do."},
  {term:"FRS",def:"Functional Requirements Specification — describes HOW the system meets requirements."},
  {term:"DS",def:"Design Specification — technical details of how the system is built/configured."},
  {term:"IQ",def:"Installation Qualification — confirms hardware/software installed correctly."},
  {term:"OQ",def:"Operational Qualification — tests system functions against requirements."},
  {term:"PQ",def:"Performance Qualification — proves reliable performance in production."},
  {term:"VMP",def:"Validation Master Plan — top-level validation strategy document."},
  {term:"VP",def:"Validation Plan — system-specific validation approach document."},
  {term:"VSR",def:"Validation Summary Report — concludes whether system is validated."},
  {term:"RTM",def:"Requirements Traceability Matrix — links requirements to tests."},
  {term:"ALCOA+",def:"Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available."},
  {term:"FMEA",def:"Failure Mode and Effects Analysis — risk technique: S×O×D = RPN."},
  {term:"RPN",def:"Risk Priority Number — Severity × Occurrence × Detection."},
  {term:"CAPA",def:"Corrective and Preventive Action — systematic problem resolution."},
  {term:"SOP",def:"Standard Operating Procedure — documented task instructions."},
  {term:"FAT",def:"Factory Acceptance Test — testing at supplier's premises."},
  {term:"SAT",def:"Site Acceptance Test — testing at user's site after installation."},
  {term:"HPRA",def:"Health Products Regulatory Authority — Ireland's pharma regulator."},
  {term:"LIMS",def:"Laboratory Information Management System — manages lab workflows."},
  {term:"SCADA",def:"Supervisory Control and Data Acquisition — process monitoring/control."},
  {term:"PLC",def:"Programmable Logic Controller — industrial process automation."},
  {term:"DCS",def:"Distributed Control System — large-scale process control."},
  {term:"MES",def:"Manufacturing Execution System — shop floor operations management."},
  {term:"ERP",def:"Enterprise Resource Planning — integrated business system (e.g., SAP)."},
  {term:"QMS",def:"Quality Management System — manages deviations, CAPA, documents."},
  {term:"CSA",def:"Computer Software Assurance — FDA's 2025 risk-based framework."},
  {term:"Predicate Rule",def:"Existing FDA regulation requiring records; Part 11 applies on top."},
  {term:"Audit Trail",def:"Secure, computer-generated, timestamped log of all actions."},
  {term:"V-Model",def:"Validation model: URS↔PQ, FRS↔OQ, DS↔IQ with traceability."},
  {term:"Data Integrity",def:"Completeness, consistency, and accuracy of data throughout lifecycle."},
  {term:"Change Control",def:"Formal process for managing modifications to validated systems."},
  {term:"Periodic Review",def:"Regular reassessment confirming validated system remains fit for use."},
  {term:"TCA",def:"Threats and Controls Analysis — AstraZeneca's 23-area risk checklist."},
  {term:"KNEAT",def:"Irish company (Limerick) — cloud paperless validation platform."},
  {term:"ValGenesis",def:"Irish company (Dublin) — Validation Lifecycle Management System."},
];

// ═══ RISK CALCULATOR ═══
export const RISK_FACTORS = [
  {name:"GAMP Software Category",options:[{label:"Cat 1",w:0},{label:"Cat 3",w:2},{label:"Cat 4",w:4},{label:"Cat 5",w:5}]},
  {name:"GxP Priority",options:[{label:"Low",w:5},{label:"Medium",w:10},{label:"High",w:20}]},
  {name:"Business Criticality",options:[{label:"Low",w:5},{label:"Medium",w:10},{label:"High",w:20}]},
  {name:"Software Complexity",options:[{label:"Low",w:1},{label:"Medium",w:3},{label:"High",w:5}]},
  {name:"Established History",options:[{label:"Mature",w:1},{label:"Established",w:3},{label:"New",w:5}]},
  {name:"Development Speed",options:[{label:"Adequate",w:3},{label:"Normal",w:5},{label:"Compressed",w:10}]},
  {name:"Supplier Track Record",options:[{label:"Excellent",w:0},{label:"Good",w:3},{label:"Average",w:5},{label:"Unknown",w:10}]},
];
export const RISK_BANDS = [
  {min:0,max:25,label:"Low Risk",color:"#059669",strategy:"Verification only. Document rationale for reduced testing. May use operational checks."},
  {min:26,max:50,label:"Medium-Low",color:"#D97706",strategy:"Functional testing of key scenarios. Standard documentation. Some exploratory testing acceptable."},
  {min:51,max:75,label:"Medium-High",color:"#EA580C",strategy:"Comprehensive scripted testing (IQ/OQ/PQ). Full documentation. Boundary and negative testing."},
  {min:76,max:100,label:"High Risk",color:"#DC2626",strategy:"Exhaustive testing: stress, boundary, negative, security, failover. Full lifecycle docs. Independent review."},
];

// ═══ FLOWCHARTS ═══
export const FLOWCHARTS = [
  {id:"fc1",t:"CSV Validation Lifecycle",n:["GxP Impact Assessment","System Classification","Risk Assessment","Validation Plan","URS","FRS","Design Spec","IQ","OQ","PQ","Validation Summary Report","Operational Phase","Periodic Review","Retirement"]},
  {id:"fc2",t:"Change Control Process",n:["Change Request","Impact Assessment","Risk Assessment","QA Approval","Implementation","Testing","Post-Impl Review","Doc Update","Closure"]},
  {id:"fc3",t:"Test Incident Lifecycle",n:["Incident Raised","Initial Assessment","Categorization","Allocation","Detailed Assessment","Fix Implemented","Approval to Close","Closed"]},
  {id:"fc4",t:"Deviation Management",n:["Deviation Detected","Documentation","Root Cause Investigation","GxP Impact","Corrective Action","QA Approval","Implementation","Effectiveness Check","Closure"]},
  {id:"fc5",t:"LIMS Sample Lifecycle",n:["Sample Registration","Label Printing","Test Assignment","Results Entry","Review & Approval","OOS Check","Certificate of Analysis","Archival"]},
  {id:"fc6",t:"Risk Assessment Flow",n:["Identify System","GxP Impact?","GAMP Category","Functional Risk Assessment","Calculate RPN","Test Strategy","Document Rationale","Execute Testing"]},
  {id:"fc7",t:"Supplier Audit Process",n:["Define Scope","Pre-Audit Questionnaire","Document Review","On-Site Audit","QMS Assessment","SDLC Review","Findings Report","Conditions for Use"]},
  {id:"fc8",t:"Data Migration",n:["Migration Plan","Data Mapping","Pre-Migration Verify","Execute + Rollback Plan","Post-Migration Counts","Sample Comparison","Reconciliation Report"]},
];

// ═══ FEYNMAN, STUDY PLAN, RESOURCES ═══
export const FEYNMAN_TOPICS = ["GAMP 5 Categories","V-Model","ALCOA+","Part 11 Audit Trails","IQ vs OQ vs PQ","Risk-Based Testing","Change Control","Data Integrity","VMP","Requirements Traceability","Supplier Auditing","CSA","Periodic Review","Electronic Signatures","FMEA","LIMS Validation","SCADA Qualification","Annex 11 vs Part 11","Predicate Rules","Generic vs Linear Scripts"];

export const STUDY_PLAN = [
  {wk:"1-2",t:"Foundations",desc:"CSV fundamentals + regulatory landscape. Read Part 11 and Annex 11.",tasks:["Complete Module 1 (all 4 lessons)","Complete Module 2 (Regulatory)","Read 21 CFR Part 11 full text (see Resources)","Read EU Annex 11 (see Resources)","Take Module 1 & 2 quizzes","Download & study URS template"]},
  {wk:"3-4",t:"GAMP 5 Deep Dive",desc:"Categories, V-model, lifecycle. Practice classifying systems.",tasks:["Complete Module 3 (GAMP 5)","Use Risk Calculator to classify 5 different systems","Draw the V-Model from memory (check against flowchart)","Feynman: explain GAMP 5 Categories","Take Module 3 quiz","Review the VP template"]},
  {wk:"5-6",t:"Risk & Data Integrity",desc:"FMEA, ALCOA+. Apply risk frameworks.",tasks:["Complete Modules 4 & 5","Practice FMEA using Risk Calculator","Complete the FMEA exercise in Module 4","Feynman: explain ALCOA+","Take Module 4 & 5 quizzes","Study the Test Script template"]},
  {wk:"7-8",t:"Testing Mastery",desc:"Test strategies, writing scripts, IQ/OQ/PQ.",tasks:["Complete Module 6 (Testing)","Run LIMS Simulator: register samples + enter results","Run KNEAT Simulator: execute full IQ protocol","Write a practice test script using the template","Take Module 6 quiz","Feynman: explain IQ vs OQ vs PQ"]},
  {wk:"9-10",t:"Practical Skills",desc:"Change control, suppliers, platform deep dives.",tasks:["Complete Modules 7, 8, 9","Run SCADA Simulator: I/O verification + alarms","Run LIMS Simulator: OOS investigation workflow","Practice mock interview (entry level)","Feynman: explain Change Control","Review comparison tables in Career Tools"]},
  {wk:"11-12",t:"Advanced & Job Prep",desc:"QMS, CSA, full review, interview preparation.",tasks:["Complete Modules 10 & 11","Take full random quiz — target 80%+","Practice mock interview (mid level) — target 7/10","Review all flowcharts","Retake any quizzes scored <80%","Study CV talking points in Career Tools","Final Feynman: explain CSA"]},
];

export const RESOURCES = [
  {t:"21 CFR Part 11 — Full Text",u:"https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11",ty:"REG"},
  {t:"FDA Part 11 Guidance (2003)",u:"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/part-11-electronic-records-electronic-signatures-scope-and-application",ty:"GUIDANCE"},
  {t:"EU GMP Annex 11",u:"https://health.ec.europa.eu/document/download/0bcd79e7-cd28-4c4f-aa56-b8c4f04e68c5_en",ty:"REG"},
  {t:"ISPE GAMP 5 (2nd Ed)",u:"https://ispe.org/publications/guidance-documents/gamp-5-guide-2nd-edition",ty:"GUIDE"},
  {t:"ICH Q9(R1) — Quality Risk Management",u:"https://database.ich.org/sites/default/files/Q9%28R1%29_Guideline_Step4_2022_1219.pdf",ty:"GUIDE"},
  {t:"FDA: Data Integrity & CGMP",u:"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/data-integrity-and-compliance-drug-cgmp-questions-and-answers",ty:"GUIDANCE"},
  {t:"Complete CSV Guide (PMC Peer-Reviewed)",u:"https://pmc.ncbi.nlm.nih.gov/articles/PMC11416705/",ty:"ARTICLE"},
  {t:"QbD Group: Complete CSV Guide (free)",u:"https://qbdgroup.com/en/a-complete-guide-to-computer-system-validation",ty:"GUIDE"},
];

// ═══ CAREER DATA (NEW) ═══
export const CAREER_DATA = [
  {title:"🇮🇪 Day in the Life of an Irish CSV Engineer",content:`A typical day as a CSV Engineer at a pharmaceutical manufacturing site in Ireland might look like this:

08:30 — Arrive at site (e.g., Pfizer Grange Castle or MSD Ballydine). Badge in through security. Change into site-specific clothing if entering manufacturing areas.

09:00 — Morning stand-up with the validation team. Review status of ongoing qualification protocols. A colleague reports a deviation during LIMS OQ testing yesterday — the audit trail didn't capture a specific event. You're assigned to investigate.

09:30 — Investigate the LIMS audit trail deviation. Open the system, reproduce the scenario, review the audit trail configuration, check with the vendor's technical documentation. Determine it's a configuration issue, not a software defect. Draft the deviation report with root cause and proposed corrective action.

11:00 — Review meeting for a new MES Validation Plan. The project team walks through the VP for review. You check: Is the GAMP classification justified? Does the risk assessment cover all GxP functions? Are the test approach and acceptance criteria appropriate? You raise a comment about missing regression testing scope for interfaces.

12:30 — Lunch. Chat with colleagues about the upcoming HPRA inspection next month.

13:30 — Execute OQ test scripts for a new SCADA system upgrade. Follow the approved protocol step by step. Record actual results against expected results. Two test steps fail — you document the deviations and pause testing until the issue is resolved.

15:00 — Write IQ test scripts for a new QC instrument (HPLC) being installed next week. Define prerequisites, test steps, expected results, acceptance criteria.

16:30 — Weekly change control review board meeting. Review three change requests: a LIMS patch, a SAP configuration change, and a new SOP. Assess validation impact for each. Approve the LIMS patch with abbreviated regression testing.

17:00 — Update your task tracker. Send status email. Head home.

The role requires: attention to detail, good writing skills, regulatory knowledge, ability to work with IT and QC teams, and patience — a lot of validation work is methodical and document-heavy.`},

  {title:"💼 CV Talking Points by Skill Area",content:`When writing your CV or discussing experience in interviews, frame your skills using these formulas:

GAMP 5 & RISK ASSESSMENT:
"Applied GAMP 5 risk-based methodology to classify and validate [system type] systems, determining appropriate validation approach based on software category and GxP impact assessment."

TESTING & QUALIFICATION:
"Authored and executed IQ/OQ/PQ protocols for [LIMS/SCADA/MES/ERP] systems, including test script development, deviation management, and validation summary reporting."

REGULATORY KNOWLEDGE:
"Ensured compliance with 21 CFR Part 11 and EU GMP Annex 11 requirements for electronic records, electronic signatures, and audit trail functionality."

DATA INTEGRITY:
"Applied ALCOA+ principles to validate data integrity controls including audit trails, access controls, and electronic signature workflows."

CHANGE CONTROL:
"Managed change control processes for computerised systems, including impact assessment, regression testing scope determination, and post-implementation review."

If you've completed this course and the simulators, you can truthfully say:
"Completed intensive CSV self-study program covering GAMP 5, Part 11, Annex 11, ALCOA+, risk assessment, and IQ/OQ/PQ methodology. Practiced validation workflows using LIMS, KNEAT, and SCADA simulation environments."

KEY TIP: Never claim experience you don't have. But DO highlight knowledge, training, and practical exercises. Employers value people who have invested in learning before starting.`},

  {title:"💰 Irish Pharma CSV Salary Ranges (2025-2026)",content:`These are approximate ranges for CSV/Validation roles in Ireland. Actual salaries depend on location, company size, and specific experience.

ENTRY LEVEL (0-2 years):
• CSV Engineer / Validation Engineer: €35,000 — €48,000
• Validation Analyst: €32,000 — €42,000
• Quality Systems Associate (CSV focus): €34,000 — €45,000
• Contract (via agencies): €25-35/hour

MID LEVEL (2-5 years):
• Senior CSV Engineer: €50,000 — €65,000
• Validation Lead (small projects): €55,000 — €70,000
• CSV Consultant: €55,000 — €75,000
• Contract: €40-55/hour

SENIOR LEVEL (5+ years):
• Validation Manager: €70,000 — €90,000
• Head of CSV / Computer Systems Quality: €85,000 — €110,000
• Principal Consultant: €80,000 — €100,000+
• Contract: €55-75/hour

FACTORS THAT INCREASE SALARY:
• KNEAT or ValGenesis experience (+5-10%)
• SAP validation experience (+5-10%)
• CSA/modern validation approaches
• Direct HPRA/FDA inspection experience
• Cloud/SaaS validation experience
• Multiple site/system experience

TOP EMPLOYERS IN IRELAND:
Pfizer (Ringaskiddy, Grange Castle, Newbridge) | Eli Lilly (Kinsale) | MSD (Ballydine, Carlow) | J&J (Limerick, Cork) | AbbVie (Sligo, Cork) | Alexion/AZ (Dublin) | Regeneron (Limerick) | Takeda (Dunboyne) | BMS (Cruiserath) | Amgen (Dublin)

CONTRACT FIRMS: PharmaLex | DPS Group | PM Group | Jacobs | Accenture | Zenith Technologies | Life Science Compliance`},

  {title:"📊 Part 11 vs Annex 11 — Quick Comparison",content:`KEY DIFFERENCES AT A GLANCE:

SCOPE:
Part 11: Focused on electronic records and electronic signatures
Annex 11: Full system lifecycle (risk management through retirement)

AUDIT TRAILS:
Part 11 §11.10(e): Detailed requirements — secure, computer-generated, timestamped
Annex 11: Requires audit trails but less prescriptive about implementation

E-SIGNATURES:
Part 11: Very detailed — 2 components, meaning, linkage to records, uniqueness
Annex 11: Less prescriptive — requires e-signatures where needed but fewer specifics

PERIODIC REVIEW:
Part 11: Not explicitly required (but expected under predicate rules)
Annex 11: Explicitly requires periodic evaluation of computerised systems

SUPPLIER MANAGEMENT:
Part 11: Not directly addressed
Annex 11: Requires formal agreements, quality assessments, and supplier audits

RISK MANAGEMENT:
Part 11: Risk-based approach per 2003 guidance
Annex 11: Risk management throughout entire lifecycle

BUSINESS CONTINUITY:
Part 11: Not addressed
Annex 11: Requires business continuity and disaster recovery planning

IN PRACTICE (IRISH SITES):
Most Irish pharmaceutical sites comply with BOTH because they manufacture for US and EU markets. Where requirements differ, the stricter requirement is typically implemented. This means Irish CSV engineers need to understand both frameworks — a genuine competitive advantage in interviews.`},
];

// ═══ DOWNLOADABLE TEMPLATES (NEW) ═══
export const TEMPLATES = [
  {title:"User Requirements Specification (URS) Template",desc:"Standard URS template structure for a GAMP Category 4 system. Fill in for practice.",filename:"urs-template.txt",template:`USER REQUIREMENTS SPECIFICATION

Document ID:      URS-[System]-[Year]-001
System:           [System Name and Version]
Author:           [Your Name]
Date:             [Date]
Revision:         1.0
Status:           Draft / For Review / Approved

1. PURPOSE
This document defines the user requirements for [system name] to be implemented at [site name]. It describes WHAT the system must do from the business/user perspective.

2. SCOPE
2.1 In Scope: [List functions/modules included]
2.2 Out of Scope: [List what is explicitly excluded]

3. REGULATORY REQUIREMENTS
3.1 21 CFR Part 11 compliance required: Yes / No
3.2 EU GMP Annex 11 compliance required: Yes / No
3.3 Other applicable regulations: [List]

4. SYSTEM CLASSIFICATION
4.1 GAMP Category: [1/3/4/5]
4.2 GxP Impact: [Direct/Indirect/None]
4.3 Justification: [Why this classification]

5. FUNCTIONAL REQUIREMENTS
ID    | Requirement                           | Priority | GxP
------|---------------------------------------|----------|-----
UR-001| [The system shall...]                 | Must     | Yes
UR-002| [The system shall...]                 | Must     | Yes
UR-003| [The system should...]                | Should   | No
[Continue for all requirements]

6. DATA REQUIREMENTS
6.1 Data types: [List]
6.2 Data volumes: [Estimate]
6.3 Retention period: [Years]
6.4 Migration requirements: [If applicable]

7. ELECTRONIC RECORDS & SIGNATURES
7.1 Audit trail required for: [List GxP data/actions]
7.2 Electronic signatures required for: [List approval points]
7.3 Access control roles: [List roles and access levels]

8. INTERFACE REQUIREMENTS
[List interfaces to other systems]

9. PERFORMANCE REQUIREMENTS
9.1 Response time: [Target]
9.2 Concurrent users: [Number]
9.3 Availability: [% uptime required]

10. ENVIRONMENTAL REQUIREMENTS
[Server location, network, physical constraints]

11. TRAINING REQUIREMENTS
[Who needs training, when, by whom]

12. SUPPORT & MAINTENANCE
[Support model, SLA requirements]

APPROVAL SIGNATURES
Author:    _________________ Date: _________
Reviewer:  _________________ Date: _________
Approver:  _________________ Date: _________`},

  {title:"OQ Test Script Template",desc:"Operational Qualification test script structure. Use as a starting point for writing test scripts.",filename:"oq-test-script-template.txt",template:`OPERATIONAL QUALIFICATION TEST SCRIPT

Document ID:    OQ-[System]-[Year]-[Script#]
System:         [System Name]
Function:       [Function Being Tested]
Author:         [Name]
Date:           [Date]
Revision:       1.0

PREREQUISITES:
□ IQ completed and approved
□ System powered on and accessible
□ Test user account created with [role] profile
□ Test data loaded: [describe]
□ Previous test script [ID] completed (if sequential dependency)

REFERENCE DOCUMENTS:
- FRS: [Document ID and section]
- URS: [Requirement IDs being tested]

TEST STEPS:

Step | Action                    | Expected Result           | Actual | P/F | Initials | Date
-----|---------------------------|---------------------------|--------|-----|----------|------
1    | Log in as [test user]     | Login successful,         |        |     |          |
     |                           | dashboard displayed       |        |     |          |
-----|---------------------------|---------------------------|--------|-----|----------|------
2    | Navigate to [function]    | [Function] screen         |        |     |          |
     |                           | displayed correctly       |        |     |          |
-----|---------------------------|---------------------------|--------|-----|----------|------
3    | Enter [valid data]        | Data accepted,            |        |     |          |
     |                           | [expected response]       |        |     |          |
-----|---------------------------|---------------------------|--------|-----|----------|------
4    | Enter [boundary value]    | Data accepted at          |        |     |          |
     | at lower limit            | boundary (inclusive)      |        |     |          |
-----|---------------------------|---------------------------|--------|-----|----------|------
5    | Enter [invalid data]      | System rejects input,     |        |     |          |
     | (negative test)           | error message displayed   |        |     |          |
-----|---------------------------|---------------------------|--------|-----|----------|------
6    | Verify audit trail        | Entry recorded with       |        |     |          |
     |                           | user, timestamp, action   |        |     |          |

ACCEPTANCE CRITERIA:
All test steps must pass. Any failures must be documented as deviations.

DEVIATIONS:
[Document any deviations here with ID, description, and impact assessment]

CONCLUSION:
□ All steps passed — function qualified
□ Steps failed — deviations raised: [list IDs]

Executed by:    _________________ Date: _________
Reviewed by:    _________________ Date: _________`},

  {title:"Interview Cheat Sheet",desc:"Quick-reference answers for the most common CSV interview questions.",filename:"csv-interview-cheatsheet.txt",template:`CSV INTERVIEW CHEAT SHEET
========================

30-SECOND ANSWERS TO TOP 10 QUESTIONS:

1. "What is CSV?"
→ Documented proof that a computerised system does what it's supposed to do, reliably. It protects patients by ensuring systems controlling medicine manufacture are trustworthy.

2. "Explain GAMP 5 categories"
→ Cat 1=infrastructure (OS), Cat 3=off-the-shelf, Cat 4=configurable (LIMS, SAP), Cat 5=custom code. Higher category = more validation. Cat 2 was removed.

3. "What's the V-Model?"
→ Links specs to tests: URS↔PQ, FRS↔OQ, DS↔IQ. Every requirement traces through to a test result via the RTM.

4. "IQ vs OQ vs PQ?"
→ IQ=installed correctly. OQ=functions work per spec. PQ=performs reliably in production with real data and users.

5. "Part 11 vs Annex 11?"
→ Part 11=US FDA, e-records/signatures focus. Annex 11=EU, full lifecycle. Irish sites need BOTH. Annex 11 is stricter on periodic review and supplier management.

6. "What is ALCOA+?"
→ Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available. Data integrity framework. >60% of GMP findings relate to DI.

7. "Risk-based approach?"
→ Effort proportional to risk. Use FMEA (S×O×D=RPN). High risk=scripted testing. Low risk=verification. Documented rationale for every decision.

8. "What's an audit trail?"
→ Secure, computer-generated, timestamped record of who/what/when/why. Cannot be modified. Retained for life of record. First thing inspectors check.

9. "Change control?"
→ Request→impact assessment→risk assessment→QA approval→implement→test→review→close. Without it, validated state is lost.

10. "What's CSA?"
→ Computer Software Assurance. FDA 2025. Risk-based: high-risk=scripted, medium/low=may use exploratory testing. Reframes CSV, doesn't replace it.

POWER PHRASES FOR INTERVIEWS:
• "risk-based approach proportionate to GxP impact"
• "documented rationale justifying the testing strategy"  
• "traceability from requirements through to test results"
• "maintaining the validated state through change control"
• "ALCOA+ principles applied to electronic records"

QUESTIONS TO ASK THE INTERVIEWER:
• "What validation platforms do you use? KNEAT? ValGenesis?"
• "Are you adopting CSA approaches for any systems?"
• "What's the typical ratio of GxP to non-GxP systems on site?"
• "How is the CSV team structured — dedicated or embedded in projects?"`},
];
