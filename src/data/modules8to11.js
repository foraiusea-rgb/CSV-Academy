// Modules 8-11: Supplier, Platforms, Inspection, CSA

export const M8 = {
  id:"m8", title:"Supplier & Vendor Management", icon:"🤝", color:"#DC2626",
  level:"Practical", hours:3,
  bookRefs:["Wingate Ch.14-15","Andrews Ch.5"],
  overview:"Better supplier quality = less user validation effort. This module covers supplier auditing, quality assessments, cloud/SaaS vendor management, and leveraging supplier documentation.",
  lessons:[{
    id:"m8l1", title:"Supplier Assessment, Auditing & Cloud Validation",
    duration:"45 min",
    objectives:["Plan and scope a supplier audit","Evaluate supplier quality management systems","Leverage supplier testing to reduce validation effort","Manage cloud/SaaS vendor relationships","Understand the Irish validation platform landscape"],
    content:`Supplier management is a regulatory requirement under EU GMP Annex 11 Section 5 and a practical necessity for efficient CSV. The quality of your software supplier directly determines how much validation work you must do as the user — a supplier with a mature quality system, comprehensive testing, and good documentation allows you to leverage their work and significantly reduce your own validation effort.

Wingate dedicates two full chapters to supplier auditing. Chapter 14 covers auditing suppliers of standard software packages, and Chapter 15 covers auditing software integrators and hardware manufacturers. The principles are the same: assess the supplier's capability to deliver a product that meets your quality needs.

THE SCOPE OF A SUPPLIER AUDIT

A supplier audit typically evaluates seven key areas:

QUALITY MANAGEMENT SYSTEM: Does the supplier have a formal QMS? Is it certified (ISO 9001, SOC 2 Type II)? More importantly — is it actually followed in practice? Wingate provides a revealing indicator: check the revision dates of their SOPs. If procedures remain unchanged for years despite obvious business evolution, the QMS has likely fallen into disuse. The procedures exist on paper but are no longer followed in practice. An alert auditor can quickly expose this by asking staff to discuss the usefulness of specific procedures as presented for inspection.

DEVELOPMENT METHODOLOGY: What software development lifecycle (SDLC) do they follow? Is there version control for source code? Are there documented coding standards? Wingate emphasises that documented programming standards — including examples of prohibited practices — are essential for software quality. The standards should cover variable naming conventions, code commenting requirements, error handling patterns, and security considerations.

TESTING PRACTICES: Do they perform both structural testing (code walkthroughs) and functional testing? Wingate argues that structural testing is one of the most efficient ways of building quality into software because it catches defects at the earliest and cheapest phase. Functional testing alone has "fundamental limitations in exposing the true level of defects." The auditor should seek evidence of structured test plans formally traceable to the design specification.

CHANGE CONTROL: How are changes managed? Can you trace from a change request through to the implemented code change and back? The change control records should show: what was requested, how it was evaluated, who approved it, what was changed, how it was tested, and how it was released. Wingate emphasises that both elements must be present: (1) procedures describing the process, and (2) actual records proving the process was followed.

DOCUMENTATION: Is there adequate document control with author, reviewer, revision numbers, and change history? Are documents actually current, or are they moribund artefacts that no longer reflect reality?

SUPPORT MODEL: What are the SLAs for incident response? How are patches and updates managed? How are customers notified of changes before they are released? What is the process for handling critical defects in validated environments?

SECURITY: Data protection practices, access controls, encryption, vulnerability management.

CLOUD/SaaS VENDOR CONSIDERATIONS

Cloud-based pharmaceutical systems introduce additional considerations that traditional on-premises software does not:

SHARED RESPONSIBILITY MODEL: The vendor is typically responsible for infrastructure qualification (servers, network, storage) while the user is responsible for application configuration validation. The boundary of responsibility must be clearly defined in the service agreement. You need to understand exactly what the vendor validates and what you must validate.

DATA RESIDENCY: Where is your data physically stored? This is critical for GDPR compliance in Ireland and the EU. If your data is hosted in US data centres, there may be legal implications under EU data protection regulations. Many Irish pharma companies require European data centres.

CONTINUOUS DEPLOYMENT: Cloud vendors may deploy updates continuously — potentially changing the validated state of your system without your explicit approval. You need to understand: how the vendor manages their release cycle, how you are notified of changes, whether you can defer updates, and how you maintain validation documentation when the system changes frequently.

MULTI-TENANCY: In a multi-tenant environment, your data coexists with other customers' data on shared infrastructure. What security controls isolate your data? What happens if another tenant's activities affect system performance?

IRISH VALIDATION PLATFORMS

Two Irish-founded companies have become significant players in the validation platform market:

KNEAT (headquartered in Limerick): Provides a cloud-based platform for paperless validation execution. Instead of paper-based qualification protocols, KNEAT Gx allows test steps to be executed digitally with electronic evidence attachment (screenshots, certificates, data extracts), automated deviation tracking, electronic signature workflows compliant with Part 11, and auto-generated validation reports. The platform eliminates the paper-to-digital scanning bottleneck and provides real-time visibility into validation project status. Experience with KNEAT is increasingly valued in Irish pharma — many job postings specifically mention it.

ValGenesis (headquartered in Dublin): Provides a Validation Lifecycle Management System (VLMS) that manages the entire validation programme from planning through periodic review. Features include risk assessment management, requirements traceability, protocol authoring and execution, deviation and CAPA tracking, periodic review scheduling and execution, and compliance dashboards. ValGenesis focuses on the management and governance layer — ensuring the right things are validated at the right time with the right level of rigour.

Understanding these platforms and their capabilities gives Irish job seekers a genuine competitive advantage. Even if you haven't used them professionally, being able to discuss their features and how they support the validation lifecycle demonstrates industry awareness that interviewers value.`,

    exercise:{
      type:"audit-planning",
      title:"Supplier Audit Preparation",
      instructions:`You are preparing to audit a LIMS vendor for a new deployment at your Irish pharma site. The LIMS will manage QC testing for batch release of tablet products.

Create an audit plan covering:
1. Five specific documents you would request from the vendor BEFORE the audit visit
2. Five key areas you would focus on during the on-site audit day
3. Three specific questions about their change control process
4. Two questions specifically about Part 11 compliance support
5. One question about their track record with Irish pharma customers`,
      modelAnswer:`PRE-AUDIT DOCUMENTS:
1. QMS manual / quality system overview (to assess maturity before visiting)
2. Software Development Lifecycle procedure (to understand their methodology)
3. Latest product release testing summary (to see testing rigour)
4. Change control / release management procedure
5. List of pharmaceutical customers with reference contact details

ON-SITE FOCUS AREAS:
1. QMS maturity — ask staff about SOP usefulness, check revision dates, verify QMS is actually followed not just documented
2. Development practices — coding standards, version control system, code review process, verify with live demonstration
3. Testing — ask to see actual test plans and results, verify traceability to design specs, check for structural testing evidence
4. Change management — select a recent change and trace the complete trail from request to release
5. Support operations — review incident handling process, response time data, customer notification procedures

CHANGE CONTROL QUESTIONS:
1. "Can you walk me through the complete trail for a specific recent change — from the customer report or request, through evaluation, approval, code change, testing, to release?"
2. "How do you notify pharmaceutical customers of upcoming releases, and how much advance notice do they receive?"
3. "What is your process when a customer reports a critical defect in a validated production environment? Show me a recent example."

PART 11 QUESTIONS:
1. "Does your product support compliant audit trails per §11.10(e) — secure, timestamped, non-obscuring? Can you demonstrate this?"
2. "How does your product support electronic signatures with the Part 11 requirements — two-component authentication, printed name, date/time, and meaning?"

IRISH TRACK RECORD:
1. "Which Irish pharmaceutical companies currently use your LIMS, and could you provide a reference contact at one of them for us to discuss their validation experience?"`
    },
    keyTerms:["Supplier audit","QMS","SDLC","SOC 2","Cloud validation","SaaS","Shared responsibility","KNEAT","ValGenesis","Data residency","GDPR"],
    checkpoints:["What are the 7 key areas of a supplier audit?","Why is the rate of SOP change a quality indicator?","What is the shared responsibility model for cloud?","What are KNEAT and ValGenesis and why do they matter in Ireland?","What additional considerations apply for SaaS vendors?"]
  }]
};

export const M9 = {
  id:"m9", title:"Platform Deep Dives", icon:"💻", color:"#2563EB",
  level:"Advanced", hours:6,
  bookRefs:["Andrews Ch.10,14,16","Wingate Ch.8-12"],
  overview:"This module covers the specific systems you will encounter most frequently: LIMS, SCADA/PLC, ERP/SAP, and MES. Use the interactive simulators alongside this lesson for hands-on practice.",
  lessons:[{
    id:"m9l1", title:"LIMS, SCADA, ERP & MES Validation",
    duration:"60 min",
    objectives:["Understand LIMS validation using the AZ case study","Know SCADA/PLC qualification requirements","Approach ERP/SAP validation effectively","Understand MES and electronic batch records"],
    content:`This lesson covers the major system types you will encounter as a CSV engineer. The interactive simulators on this platform (LIMS, KNEAT, SCADA) provide hands-on experience with these systems — use them alongside this lesson.

LIMS VALIDATION — THE ASTRAZENECA CASE STUDY

Andrews Chapter 16 (Hogg & Pedeconi) documents AstraZeneca's validation of a LIMS system at a UK manufacturing site. This case study is one of the most detailed publicly available accounts of a real pharmaceutical validation project and provides invaluable lessons.

LIMS FUNCTIONS: A typical LIMS manages sample registration and login, test method and specification management, results entry with automated calculations, specification checking with OOS alert triggering, Certificate of Analysis (CoA) generation, stability study management, environmental monitoring data, and instrument integration for automated data capture.

CLASSIFICATION: GAMP Category 4 (configurable software), with possible Category 5 elements for custom reports or instrument interfaces.

AZ DOCUMENTATION APPROACH: The project split documentation responsibilities between AZ staff and external consultants. AZ owned the Validation Plan, Hardware Design Spec, Validation Report, and Procedures. Consultants produced the Functional Spec, Software Design Spec, and Protocol (with AZ review and approval). This division leveraged each party's expertise while maintaining AZ ownership of the overall validation.

KEY LESSONS FROM AZ: The team used generic test scripts (one script per function, reused for instances) rather than linear scripts (every instance spelled out). This reduced the protocol from an expected 167+ pages to just 41 pages. The Threats and Controls Analysis (TCA) covered 23 specific risk areas. And critically, the PQ could only be performed during a scheduled plant shutdown because it required the production machine — demonstrating that real-world constraints, not just documentation requirements, drive validation project timelines.

SCADA/PLC QUALIFICATION

Andrews Chapter 14 (Lopez) covers the qualification of SCADA systems. SCADA (Supervisory Control and Data Acquisition) systems monitor and control manufacturing processes in real time — temperature, pressure, pH, flow rates, agitation speeds. In biopharmaceutical manufacturing, SCADA systems control fermentation processes that run for 14+ days; in solid dosage manufacturing, they control granulation, drying, and coating processes.

CLASSIFICATION: Typically Category 4 with possible Category 5 elements (custom control scripts, calculated values, custom alarm logic).

KEY QUALIFICATION AREAS: I/O Point Verification — every analog and digital input/output must be verified against the P&ID (Piping & Instrumentation Diagram) and hardware design specification. This means applying a known signal to each input and verifying the system reads it correctly, and commanding each output and verifying the field device responds. Alarm Testing — every alarm setpoint must be tested by forcing the monitored parameter beyond the alarm limit and verifying the alarm activates correctly. Control Loop Testing — setpoint response, tuning parameters, and stability must be verified. Historian Data Integrity — verify that the data recording frequency, timestamp accuracy, and data compression settings produce reliable historical records. Server Failover — for redundant systems, verify that automatic switchover occurs correctly with no data loss.

PART 11 FOR SCADA: Process data generated by SCADA systems constitutes electronic records. Operator actions (acknowledging alarms, changing setpoints, initiating batch operations) require audit trail capture. Batch-related approvals may require electronic signatures. Access controls must distinguish between operator, engineer, and administrator roles.

Try the SCADA Simulator on this platform — it demonstrates real-time process monitoring, alarm generation, I/O verification, and historian data recording.

ERP/SAP VALIDATION

Enterprise Resource Planning systems like SAP manage virtually every aspect of pharmaceutical business operations. The GxP-relevant modules typically include: QM (Quality Management — batch disposition, CoA, deviations, change control), PP (Production Planning — batch scheduling, recipe management), MM (Materials Management — procurement, goods receipt, inventory), WM (Warehouse Management — storage, picking, shipping), and PM (Plant Maintenance — equipment management, calibration scheduling).

CLASSIFICATION: Category 4 for the configured application, with Category 5 elements for custom ABAP reports, custom interfaces (IDocs, RFCs), and custom workflow programs.

VALIDATION APPROACH: The key challenge is determining the GxP boundary — which of the hundreds of SAP transactions are GxP-relevant? The approach is to: (1) map business processes to SAP functions, (2) identify GxP-relevant transactions through process flow analysis, (3) risk-assess each GxP function, (4) document all configuration settings, (5) test end-to-end business processes (not just individual transactions), and (6) validate all interfaces with other systems (MES, LIMS, WMS).

MES VALIDATION: Manufacturing Execution Systems manage shop-floor operations through electronic batch records (eBR), recipe enforcement, material tracking, and equipment management. Key validation areas include: eBR accuracy and completeness, recipe enforcement (critical process parameters must be within limits), material genealogy (full traceability of materials through the process), equipment status tracking (cleaning status, calibration status), and integration with ERP for batch release.`,

    exercise:{
      type:"platform-exercise",
      title:"LIMS Simulator Practicum",
      instructions:`Complete the following exercises using the LIMS Simulator:

1. SAMPLE REGISTRATION: Register 3 samples for Paracetamol 500mg Tablets with different batch numbers. Verify that sample IDs are auto-generated sequentially.

2. RESULTS ENTRY: For one sample, enter results for all tests. Include at least one result that PASSES specification and one that FAILS (triggers OOS).

3. OOS INVESTIGATION: Walk through all 4 phases of the OOS investigation workflow. Document your investigation notes at each phase.

4. AUDIT TRAIL REVIEW: Navigate to the Audit Trail and verify that all your actions (registration, results entry, modifications) are captured with timestamps and user identification.

5. VALIDATION POINTS: For each screen, read the "CSV Validation Points" callout and list 3 OQ test cases you would write for that screen.

Then complete one exercise in the KNEAT Simulator:
6. Execute the first section (Hardware Verification) of the IQ protocol. Record actual results, mark at least one step as Pass and one as Fail, and raise a deviation for the failed step.`,
      modelAnswer:`See the simulators directly — the learning happens by DOING, not reading answers. Key things to verify:

Sample Registration: IDs should be QC-2026-0001, QC-2026-0002, QC-2026-0003 (sequential, unique)
Results Entry: Entering a result below 80% dissolution should trigger OOS alert
OOS Investigation: All 4 phases must be completed in sequence
Audit Trail: Should show all registration, entry, and modification events with timestamps

OQ test cases for Sample Registration screen:
1. Verify mandatory fields (product, batch, analyst) are enforced — test by leaving each blank
2. Verify sample ID auto-generation is unique and sequential
3. Verify correct specification loads when product is selected
4. Verify audit trail captures registration with user ID and timestamp`
    },
    keyTerms:["LIMS","SCADA","PLC","DCS","ERP","SAP","MES","eBR","TCA","I/O verification","Historian","KNEAT","ValGenesis"],
    checkpoints:["What were the key lessons from the AZ LIMS case study?","What are the 5 key SCADA qualification areas?","How do you determine the GxP boundary for an ERP system?","What is an electronic batch record and what must be validated?"]
  }]
};

export const M10 = {
  id:"m10", title:"Inspection Readiness & QMS", icon:"🔍", color:"#D97706",
  level:"Advanced", hours:3,
  bookRefs:["Andrews Ch.2"],
  overview:"Sam Clark, a former FDA investigator with 21+ years of experience, shares what inspectors actually look for. This module covers inspection preparation, common findings, and the two myths every CSV professional must understand.",
  lessons:[{
    id:"m10l1", title:"What Inspectors Look For — From an Ex-FDA Investigator",
    duration:"45 min",
    objectives:["Prepare a site for regulatory inspection","Understand the 10 areas inspectors evaluate","Debunk the two persistent validation myths","Recognise common inspection findings","Know how to respond when an inspector asks questions"],
    content:`Sam Clark contributed Chapter 2 of Andrews' book from the unique perspective of a former FDA national expert on computer validation with over 21 years of investigation experience. His insights are arguably the most valuable content in any of the three reference books for this course, because they tell you exactly what the person across the table at an inspection is thinking.

THE TEN AREAS INSPECTORS EVALUATE

When an inspector arrives at your site and begins reviewing computerised systems, they are evaluating these areas — usually in roughly this order:

1. SYSTEM INVENTORY: Does the site maintain a complete list of all computerised systems, including their validation status? A missing or incomplete inventory suggests the site does not have adequate control over its computerised systems. This is often the first document an inspector requests.

2. RISK ASSESSMENTS: For each system in the inventory, has a documented risk assessment been performed? Does it justify the validation approach? Is the risk rationale consistent across systems of similar type and criticality?

3. VALIDATION DOCUMENTATION: Is there complete lifecycle evidence? VP, URS, FRS, IQ/OQ/PQ protocols and reports, VSR? Are documents current and properly controlled? Are they signed and dated?

4. CHANGE CONTROL: Are changes to validated systems properly managed? Can you show the change history for a specific system? Are changes evaluated for GxP impact before implementation?

5. AUDIT TRAILS: This is the area that receives the most scrutiny. Are audit trails enabled for all GxP-relevant systems? Do they capture who, what, when, and why? Can audit trail entries be modified or deleted? Are audit trails reviewed as part of normal operations?

6. USER ACCESS: Is the current user access list accurate? Have leavers been removed promptly? Are there any shared or generic accounts? Are administrator rights controlled with appropriate oversight? Admin rights that allow data overwrite without oversight are a major red flag.

7. TRAINING: Are all system users documented as trained? Is training role-based and competency-assessed? Is training current (not expired)?

8. SOPs: Do standard operating procedures exist for system use, data entry, backup, recovery, change management, and periodic review? Are they current revisions? Are they actually followed?

9. PERIODIC REVIEWS: Has each system been periodically reviewed within the required timeframe? Are review findings documented and actioned?

10. BACKUP AND RESTORE: Has the backup system been tested? Can you demonstrate that data can be recovered from backup? When was the last successful restore test?

THE TWO PERSISTENT MYTHS

Clark debunks two myths that persist stubbornly despite decades of regulatory enforcement:

MYTH 1: "VALIDATED THROUGH USE" — The belief that a system is validated because it has been widely used for many years without problems. Clark is unequivocal: this is wrong. Simply using a system for years does not constitute validation. Normal system use does not intentionally seek to find flaws — users work around problems rather than documenting them. Different users use systems in different ways, so widespread use does not test all functions. And the absence of reported problems does not mean the absence of actual problems — it may simply mean problems are not being detected or reported.

Validation requires structured, documented testing specifically designed to reveal defects. It is a scientific study to find flaws, not a passive observation that nothing has gone obviously wrong.

MYTH 2: "REGULATORS DIDN'T OBJECT, SO WE MUST BE COMPLIANT" — The assumption that surviving a previous inspection without findings related to computerised systems means those systems are validated. Clark explains that an inspection is a sample at a point in time, limited by: the specific inspector's knowledge and experience with computerised systems, the systems selected for review during that particular inspection, the time available for the inspection, and the current regulatory focus areas. A different inspector, with different expertise, examining different systems at a different time may find significant issues that the previous inspector missed.

Clark concludes with a powerful recommendation: "All healthcare companies are encouraged to far exceed minimum regulatory expectations. The benefits include: higher quality systems, lower development and support costs (by catching problems early), better system understanding and control, more effective ongoing maintenance, and longer useful system lives."

PRACTICAL INSPECTION READINESS

If your site receives notification of an upcoming HPRA or FDA inspection that will cover computerised systems, these are your preparation priorities:

WEEK 1: Verify the system inventory is complete and current. Ensure all validation documents are accessible and organised (not buried in boxes in a storage room). Confirm all periodic reviews are up to date.

WEEK 2: Conduct a user access review for all key systems — remove any leavers, check for shared accounts, verify admin rights are properly controlled. Verify audit trail functionality by performing a test action and confirming it is captured correctly.

WEEK 3: Verify backup/restore testing is documented and current. Ensure all SOPs are current revisions. Confirm training records are complete for all system users.

WEEK 4: Prepare a summary document for each key system: name, version, GAMP category, validation status, last periodic review date, any open issues. Designate system subject matter experts who can answer detailed questions during the inspection. Brief the SMEs on common inspector questions.

RESPONDING TO INSPECTORS: Answer the question that was asked — no more, no less. Do not volunteer information that was not requested. If you do not know the answer, say "I will need to find that information for you" — never guess. Have documents organised so they can be retrieved quickly when requested.`,

    exercise:{
      type:"inspection-prep",
      title:"Mock Inspection Preparation",
      instructions:`Your site has received notification that the HPRA will conduct a GMP inspection in 4 weeks. The scope includes computerised systems. As the CSV lead, you need to prepare.

Create a comprehensive preparation plan covering:
1. Five documents you need to have ready for immediate presentation
2. Three systems you would prioritise for pre-inspection review (and why)
3. Three "quick wins" — things you can check and fix in the next 4 weeks
4. Two potential vulnerabilities you would flag to management
5. How you would brief system SMEs to handle inspector questions`,
      modelAnswer:`DOCUMENTS READY:
1. Computerised systems inventory (master list with validation status, GAMP category, last review date)
2. Validation Master Plan (current, approved version)
3. Most recent periodic review reports for LIMS, MES, and ERP
4. Change control log for the past 12 months
5. Training matrix showing CSV-relevant training for all system users

PRIORITY SYSTEMS:
1. LIMS — highest GxP impact, generates batch release data, most audit trail scrutiny
2. MES/eBR — electronic batch records are heavily scrutinised, direct manufacturing control
3. ERP QM module — batch disposition, CoA generation, material management

QUICK WINS:
1. User access review — scan all systems for leavers, shared accounts, excessive admin rights
2. Audit trail spot-check — verify functionality on each key system with a test action
3. Periodic review check — if any are overdue, either complete them or have a documented plan

VULNERABILITIES TO FLAG:
1. Any system with overdue periodic review — this is the easiest finding for an inspector
2. Any system where the validation documentation is incomplete or cannot be located quickly

SME BRIEFING:
Tell them: "Answer what is asked. Don't volunteer extra information. If you don't know, say 'I'll get that for you.' Never guess. Speak to facts, not opinions. If the inspector asks to see a document, we should be able to retrieve it within 15 minutes. Let me know now if there are any areas where you have concerns so we can address them before the inspection."`
    },
    keyTerms:["HPRA inspection","FDA 483","Warning letter","Inspection readiness","System inventory","Periodic review"],
    checkpoints:["What are the 10 areas inspectors evaluate?","Can you debunk both validation myths?","What documents should be ready for an inspection?","How should you respond to inspector questions?","What is the single most common easy finding?"]
  }]
};

export const M11 = {
  id:"m11", title:"CSA & Emerging Trends", icon:"🚀", color:"#059669",
  level:"Advanced", hours:3,
  bookRefs:["FDA CSA Guidance 2025","ISPE GAMP AI Guide"],
  overview:"Computer Software Assurance (CSA) is the FDA's 2025 framework that reframes traditional CSV. This module covers what changes, what stays the same, and emerging trends in AI, cloud, Agile, and cybersecurity.",
  lessons:[{
    id:"m11l1", title:"Computer Software Assurance & Future of Validation",
    duration:"45 min",
    objectives:["Explain the key differences between traditional CSV and CSA","Determine when scripted vs unscripted testing is appropriate","Understand the implications of cloud/SaaS for validation","Know the emerging challenges of AI/ML in GxP systems","Prepare for the evolving validation landscape"],
    content:`The FDA finalised its Computer Software Assurance (CSA) guidance in September 2025, representing the most significant shift in validation philosophy since the publication of GAMP 4 in 2001. For CSV professionals, understanding CSA is no longer optional — it is increasingly expected in job interviews and is actively being adopted by Irish multinational pharmaceutical companies.

WHAT CSA CHANGES — AND WHAT IT DOESN'T

CSA does NOT replace CSV. It reframes it. The fundamental goal remains the same: assurance that computerised systems are fit for their intended purpose. What changes is how that assurance is achieved.

THE KEY PHILOSOPHICAL SHIFTS:

From documentation-heavy → to value-adding activities: Traditional CSV often produced voluminous documentation that demonstrated compliance but added little actual assurance. CSA asks: "Does this activity genuinely increase our confidence that the system works correctly?" If the answer is no — if the activity is being performed solely because a template demands it — then CSA questions its value.

From scripted testing for everything → to risk-based testing approaches: Traditional CSV typically required pre-written, step-by-step test scripts for every test, regardless of risk level. CSA introduces the concept that the testing approach should be determined by the risk level of the function being tested.

From compliance theatre → to genuine assurance: CSA explicitly criticises the phenomenon of "checking boxes" without genuine critical thinking about whether the testing actually demonstrates that the system works. It promotes an approach where every validation activity should contribute meaningfully to the assurance argument.

RISK-BASED TESTING UNDER CSA

CSA defines three tiers of testing based on risk:

HIGH RISK FUNCTIONS: Traditional scripted testing is maintained. Functions that directly impact patient safety or product quality — such as dosage calculations, batch release decisions, or critical process parameter enforcement — still require pre-written test scripts with predefined steps, expected results, and explicit acceptance criteria. The rigour of testing for high-risk functions does not decrease under CSA.

MEDIUM RISK FUNCTIONS: A combination of scripted and unscripted (exploratory) testing may be used. The test objectives are defined, but the tester has flexibility in how to achieve those objectives. For example, instead of 50 scripted test steps for an equipment cleaning status display, you might define 3 test objectives ("verify correct cleaning status transitions," "verify hold-time enforcement," "verify access controls") and allow an experienced tester to explore and document their findings.

LOW RISK FUNCTIONS: Verification through normal operation, ad-hoc testing, or operational checks may be sufficient. For example, a user preferences screen with no GxP impact might be verified simply by observing that it works during normal system use, with a brief note that the functionality was confirmed.

UNSCRIPTED TESTING — WHAT IT IS AND ISN'T

Unscripted testing (also called exploratory testing) is NOT random testing. It is NOT the absence of documentation. It is structured testing that defines clear objectives but gives the tester freedom to determine the best path to those objectives.

Unscripted testing must still document: what the test objectives were, what was actually tested, what was found (including any unexpected behaviour), and the pass/fail determination. It requires experienced, trained testers who understand both the system and the regulatory context. An inexperienced tester given "explore and find problems" as their only instruction is not performing CSA-aligned unscripted testing — they are performing inadequate testing.

EMERGING TRENDS AFFECTING CSV

CLOUD/SaaS VALIDATION: The shared responsibility model means the cloud provider is responsible for infrastructure qualification while the user is responsible for application configuration validation. The challenge is continuous deployment — cloud vendors may update the system at any time, potentially affecting the validated state. Irish pharma companies must also consider GDPR data residency requirements.

AI/ML IN GxP SYSTEMS: ISPE published the GAMP AI Guide in 2025. Key challenges include: model drift (AI performance changing over time as data distributions shift), explainability (can you explain why the AI made a particular quality decision?), training data integrity (ALCOA+ applies to the data used to train the model), and ongoing performance monitoring (how do you know the AI is still performing acceptably?).

AGILE DEVELOPMENT: GAMP 5 2nd Edition includes guidance on validating systems developed using Agile methodologies. Instead of the traditional waterfall V-Model, Agile validation uses sprint-based testing, continuous integration, and iterative qualification.

CYBERSECURITY: The draft revision of EU Annex 11 is expected to explicitly address cybersecurity as a core component of computerised system lifecycle management. This reflects the increasing recognition that cybersecurity threats can compromise data integrity just as effectively as intentional data manipulation.

INDUSTRY 4.0: IoT sensors, digital twins, continuous manufacturing, and advanced analytics are transforming pharmaceutical manufacturing. Each of these technologies introduces new computerised systems that require validation approaches adapted to their specific characteristics.

FOR YOUR CAREER: Irish pharmaceutical multinationals are actively adopting CSA approaches for new validation projects while maintaining traditional CSV for existing validated systems. Understanding both approaches — and being able to articulate when each is appropriate — is increasingly critical for career advancement. Job postings in Ireland are beginning to explicitly list CSA experience as a desirable qualification.`,

    exercise:{
      type:"comparison",
      title:"CSV vs CSA — Practical Application",
      instructions:`A pharmaceutical company is validating a new MES (Manufacturing Execution System) for electronic batch records. Compare the traditional CSV approach vs a CSA approach for three different MES functions with different risk levels:

1. BATCH RECORD EXECUTION — recording critical process parameters and enforcing recipe limits (HIGH risk)
2. EQUIPMENT CLEANING STATUS — displaying whether equipment is clean/dirty and enforcing hold times (MEDIUM risk)
3. USER DISPLAY PREFERENCES — allowing operators to customise screen layout and colour themes (LOW risk)

For each function, describe:
A) What testing would look like under traditional CSV
B) What testing would look like under CSA
C) The key difference in effort and documentation`,
      modelAnswer:`1. BATCH RECORD EXECUTION (HIGH RISK):
CSV: Full scripted OQ — step-by-step test scripts for every field, every calculation, every workflow transition, every error condition. Detailed expected results. Full documentation with screenshots. Perhaps 100+ test steps.
CSA: Identical approach — high-risk functions receive the SAME rigorous scripted testing under CSA. No reduction in effort or documentation.
Difference: None. This is the key message — CSA does NOT reduce testing for high-risk functions.

2. EQUIPMENT CLEANING STATUS (MEDIUM RISK):
CSV: Scripted test scripts for each cleaning status (Clean, Dirty, In-Progress) for each piece of equipment, each transition between statuses, hold time enforcement for each equipment type. Possibly 50+ scripted test steps.
CSA: Define 4-5 test objectives: "Verify status transitions work correctly," "Verify hold-time enforcement prevents use of expired equipment," "Verify access controls prevent unauthorised status changes," "Verify audit trail captures status changes." Experienced tester explores each objective, documents findings. Perhaps 15-20 focused tests covering the same functional scope.
Difference: ~60% reduction in documentation while maintaining equivalent functional coverage. Requires experienced tester.

3. USER DISPLAY PREFERENCES (LOW RISK):
CSV: May still produce scripted tests — change theme, verify it applies; change layout, verify it persists. Perhaps 5-10 test scripts.
CSA: Note in validation documentation: "Display preferences have zero GxP impact. Verified working during UAT. No formal qualification testing required."
Difference: 90%+ reduction. Documentation is a justified risk-based statement rather than test scripts.

OVERALL: CSA does not reduce testing for what matters (high-risk). It reduces unnecessary testing for what doesn't (low-risk). The total validation effort may decrease by 20-40%, but ALL of the reduction comes from medium and low risk areas.`
    },
    keyTerms:["CSA","Computer Software Assurance","Unscripted testing","Exploratory testing","Risk-based testing","AI/ML","Cloud validation","Agile validation","Cybersecurity","Industry 4.0"],
    checkpoints:["What are the 3 key philosophical shifts from CSV to CSA?","When is scripted testing still required under CSA?","What is unscripted testing and what are its requirements?","What challenges does AI/ML pose for validation?","How does cloud/SaaS affect the validation approach?"]
  }]
};
