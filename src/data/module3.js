// Module 3: GAMP 5 Framework
export const M3 = {
  id:"m3", title:"GAMP 5 Framework", icon:"🏗", color:"#DC2626",
  level:"Core", hours:5,
  bookRefs:["Andrews Ch.1,3,20","Wingate Ch.3-5","Stokes Ch.4-5"],
  overview:"GAMP 5 is the industry-standard framework for validating computerised systems. This module covers the five principles, software categories, the V-Model, and the documentation hierarchy. By the end, you should be able to classify any system and design an appropriate validation approach.",
  lessons:[
    {
      id:"m3l1", title:"GAMP 5 Principles & Software Categories",
      duration:"60 min",
      objectives:["Explain the 5 GAMP 5 principles and why each matters","Classify systems into correct software categories","Understand why Category 2 was removed","Apply Stokes' weighted risk scoring to determine test approaches","Recognise that a single system may span multiple categories"],
      content:`GAMP 5 — the Good Automated Manufacturing Practice Guide, 2nd Edition (2022) — is published by ISPE (International Society for Pharmaceutical Engineering) and represents the most widely used framework globally for validating computerised systems in pharmaceutical and life sciences industries.

While GAMP 5 is not legally binding — it is an industry guide, not a regulation — it is referenced and respected by the FDA, EMA, HPRA, and virtually every other regulatory agency worldwide. When an inspector asks "how did you determine your validation approach?" they expect to hear GAMP 5 principles in your answer.

THE FIVE CORE PRINCIPLES

Principle 1 — LIFECYCLE APPROACH: Validation is not a one-time event that happens before go-live and is then forgotten. It spans the entire system lifecycle: from initial concept ("we need a LIMS"), through specification and development, into operational use, and ultimately to system retirement. During the operational phase, the validated state must be actively maintained through change control, incident management, and periodic review. Many organisations fail here — they validate rigorously for go-live but then neglect ongoing lifecycle management.

Principle 2 — CRITICAL THINKING: This principle was strengthened significantly in the 2nd Edition. It means applying scientific judgment and domain expertise rather than blindly following checklists. The goal is genuine assurance that the system is fit for purpose, not merely producing documentation that satisfies a template. In practice, this means asking "does this test actually verify something meaningful?" rather than "have we filled in all the boxes on the template?"

As Andrews notes in his introduction: "Computer validation has come a long way since the early nineties. The challenge now is doing it well, pragmatically, and cost-effectively." Critical thinking is how you achieve pragmatic, cost-effective validation.

Principle 3 — RISK-BASED APPROACH: This is the most important principle and the foundation of modern CSV practice. The level of validation effort should be proportionate to the level of risk. This prevents both over-validation (wasting resources on low-risk systems that could be better spent elsewhere) and under-validation (providing insufficient assurance for high-risk systems that genuinely affect patient safety).

Risk assessment drives every validation decision: which systems to validate, how rigorously to test, how much documentation to produce, how often to review. The GAMP 5 risk model uses three stages: (1) GxP impact assessment — does the system affect regulated data or processes? (2) System classification — what GAMP category? (3) Functional risk assessment — within the system, which functions pose the highest risk?

Principle 4 — SCALABILITY: The validation approach must scale from simple standalone instruments to complex enterprise systems. A benchtop pH meter requires a different validation approach than a global SAP implementation managing the entire supply chain. GAMP 5 explicitly states that one size does not fit all — and that applying the same level of rigour to every system is itself a compliance risk because it misallocates resources away from the systems that need the most attention.

Principle 5 — LEVERAGING SUPPLIER EXPERTISE: Where a supplier has a mature quality management system and well-tested products, the user can leverage their testing and documentation to reduce duplicate validation effort. This is why supplier auditing matters (covered in Module 8) — if you can demonstrate that your LIMS vendor has a robust QMS, comprehensive development testing, and good change control, you can reference their FAT documentation rather than duplicating all of their testing at your site.

SOFTWARE CATEGORIES

GAMP 5 classifies software into categories that determine the baseline validation approach:

CATEGORY 1 — INFRASTRUCTURE SOFTWARE: Operating systems (Windows Server, Linux), database engines (Oracle, SQL Server), network infrastructure, middleware, virtualisation platforms. These provide the computing environment but do not contain user-specific business logic. Validation: document the version installed, verify correct installation, confirm compatibility with the application. This is typically covered during IQ. The infrastructure itself is not validated in isolation — it is validated implicitly as part of the application that runs on it.

CATEGORY 2 — REMOVED: In GAMP 4, Category 2 covered firmware — software embedded in hardware devices. As firmware has evolved to become increasingly complex and configurable, the GAMP 5 authors decided that a separate category was no longer appropriate. Firmware is now classified as Category 3, 4, or 5 depending on its complexity and configurability. This is a common interview question: "What happened to GAMP Category 2?"

CATEGORY 3 — NON-CONFIGURABLE SOFTWARE: Commercial off-the-shelf (COTS) products used exactly as delivered, without any configuration by the user. Examples include Microsoft Word, Adobe Acrobat, a standard scientific calculator application, or a simple data viewer. Validation: verify fitness for intended use through acceptance testing. Confirm the software performs the functions you need it to perform. Relatively low effort.

CATEGORY 4 — CONFIGURABLE SOFTWARE: This is where the majority of pharmaceutical systems fall. These are products that are tailored to specific needs through configuration — setting parameters, defining workflows, creating user roles, building reports — without changing the underlying source code. Examples include LIMS (LabWare, STARLIMS), ERP (SAP), SCADA packages (Siemens WinCC, Wonderware), QMS (TrackWise, Veeva), and document management systems (Documentum, OpenText). Validation: document all configuration settings, functionally test configured features against requirements, validate interfaces with other systems. This represents the bulk of CSV work in pharma.

CATEGORY 5 — CUSTOM SOFTWARE: Software developed specifically for the user, or existing products that have been heavily customised through coding. Examples include bespoke laboratory applications, custom data migration scripts, SAP ABAP programs, custom PLC logic, Excel macros and VBA, custom instrument interfaces, and in-house web applications. Validation: full lifecycle approach including requirements specification, design specification, code review, unit testing, integration testing, and system testing. This requires the highest level of effort because the code has not been tested by a broad user base.

CRITICAL INSIGHT — MULTI-CATEGORY SYSTEMS: A single system typically contains components from multiple categories, and you must address each at the appropriate level. For example, a LIMS installation consists of: Category 1 (Windows Server operating system and Oracle database), Category 4 (the configured LIMS application with your specific workflows, specifications, and user roles), and possibly Category 5 (custom reports, interfaces to instruments, or data migration scripts). The validation strategy must explicitly address each component. The system's overall risk equals that of its riskiest component — you cannot classify a system with custom code as Category 4 just because most of it is configured.

STOKES' WEIGHTED RISK SCORING

David Stokes enhances basic GAMP categorisation with a sophisticated multi-factor scoring system described in Chapter 16 of his book. Rather than relying solely on software category and GxP priority, Stokes proposes weighing multiple contextual factors:

GAMP Software Category: Cat 1 = 0 points, Cat 3 = 2, Cat 4 = 4, Cat 5 = 5
GxP Priority: Low = 5, Medium = 10, High = 20
Business Criticality: Low = 5, Medium = 10, High = 20
Software Complexity: Low = 1, Medium = 3, High = 5
Established History: Mature/widely used = 1, Established = 3, New/novel = 5
Speed of Development: Adequate time = 3, Normal = 5, Compressed timeline = 10
Supplier Track Record: Excellent = 0, Good = 3, Average = 5, Poor = 7, Unknown = 10

Maximum possible score: 75. The score maps to test approaches:
0-20: Verification only — no formal scripted testing required
21-40: Functional testing of key scenarios
41-60: Comprehensive scripted testing (IQ/OQ/PQ)
61-75: Exhaustive testing including stress, boundary, negative, security, and failover

This scoring system is implemented in the Risk Calculator tool in this platform. Use it to practise classifying systems and justifying test approaches.`,

      exercise:{
        type:"classification",
        title:"Classify Real-World Systems",
        instructions:`For each system below, determine:
A) GAMP Software Category (1, 3, 4, or 5)
B) Brief justification for your classification
C) Expected level of validation effort (Low/Medium/High/Very High)
D) Any components that might be a different category

Systems:
1. Windows Server 2022 hosting a LIMS database
2. LabWare LIMS configured with custom QC workflows and specifications
3. A custom Python script that extracts analytical data from LIMS and generates trending reports
4. SAP QM module configured for batch disposition, with custom ABAP reports for regulatory submissions
5. An Allen-Bradley PLC with standard ladder logic controlling a tablet press
6. Microsoft Excel spreadsheet using 15 VBA macros to calculate dissolution results
7. Veeva Vault Quality configured for deviation and CAPA management
8. A custom-built environmental monitoring dashboard pulling data from BMS sensors`,
        modelAnswer:`1. Cat 1 (Infrastructure) | Provides computing environment, no business logic | Low | Database engine itself is also Cat 1
2. Cat 4 (Configurable) | Standard product tailored through configuration | High | If any custom reports/interfaces exist, those specific components are Cat 5
3. Cat 5 (Custom) | Bespoke code for specific purpose | Very High | Full lifecycle: requirements, design, code review, testing
4. Cat 4 + Cat 5 | SAP itself = Cat 4, custom ABAP reports = Cat 5 | Very High | Must validate ABAP code with full lifecycle approach even though SAP is Cat 4
5. Cat 3 or Cat 4 | Standard PLC with vendor's standard logic = Cat 3; if any custom rungs added = Cat 4 | Medium | Depends on whether logic was modified
6. Cat 3 + Cat 5 | Excel application = Cat 3, VBA macros = Cat 5 | High | VBA is custom code — requires specification, testing, version control, protection
7. Cat 4 (Configurable) | Standard SaaS product configured for site workflows | High | Cloud/SaaS adds supplier management considerations
8. Cat 5 (Custom) | Bespoke application built for this site | Very High | Full lifecycle required — requirements, design, testing, code review`
      },
      keyTerms:["GAMP 5","ISPE","Category 1","Category 3","Category 4","Category 5","Risk-based approach","Scalability","Supplier leverage","Weighted scoring"],
      checkpoints:["Can you name and explain all 5 GAMP principles?","Why was Category 2 removed?","What category is a LIMS? An ERP? A custom script?","Why can one system span multiple categories?","What is Stokes' maximum risk score and what does it mean?"]
    },
    {
      id:"m3l2", title:"The V-Model & Validation Documentation Hierarchy",
      duration:"55 min",
      objectives:["Draw the complete V-Model from memory","Map each specification to its corresponding qualification phase","Understand the Requirements Traceability Matrix (RTM)","Know the complete documentation hierarchy from VMP to VSR","Apply lessons from the AZ LIMS case study on efficient documentation"],
      content:`The V-Model is the foundational lifecycle model used throughout the pharmaceutical industry for validation. It provides a visual framework that connects each specification phase (on the left descending arm) to its corresponding testing/qualification phase (on the right ascending arm), with system building or configuration at the bottom.

THE V-MODEL EXPLAINED

The left side of the V represents SPECIFICATION — defining what the system must do and how it will be built, with increasing levels of detail as you descend:

USER REQUIREMENTS SPECIFICATION (URS): The top of the left arm. Defines WHAT the system must do from the business and user perspective. This is the foundation document — every subsequent specification and test traces back to the URS. Requirements must be clear, measurable, testable, and traceable. A poorly written URS is the single most common root cause of validation failures — if requirements are ambiguous, testing cannot objectively verify them.

A good URS requirement: "The system shall auto-generate unique sample IDs in the format QC-YYYY-NNNN where YYYY is the current year and NNNN is a sequential number."
A bad URS requirement: "The system should have good sample numbering." (Not testable — what does "good" mean?)

FUNCTIONAL REQUIREMENTS SPECIFICATION (FRS): Describes HOW the system will meet each user requirement. Maps URS requirements to specific system functions and capabilities. One user requirement may map to multiple functional requirements. For example, the auto-generated sample ID requirement above might generate functional requirements for: the numbering algorithm, the year rollover logic, the uniqueness constraint, and the display format.

DESIGN SPECIFICATION (DS) / CONFIGURATION SPECIFICATION: The most detailed technical level. Describes exactly how the system will be built, configured, or customised to implement the functional requirements. For a GAMP Category 4 system, this typically documents all configuration settings, parameter values, workflow definitions, user role definitions, and report layouts.

At the bottom of the V: BUILD / CONFIGURE — the system is actually constructed or configured based on the design specification.

The right side of the V represents QUALIFICATION — verifying that what was built matches what was specified, with testing moving from detailed technical verification up to business-level acceptance:

INSTALLATION QUALIFICATION (IQ) ←→ Design Specification: Confirms the system has been installed correctly per the design specifications. Verifies hardware configuration, software versions, network connectivity, environment settings, and physical infrastructure. IQ answers: "Is it installed correctly?"

OPERATIONAL QUALIFICATION (OQ) ←→ Functional Requirements Specification: Tests that the system operates correctly per the functional requirements. This is the most extensive testing phase, covering all configured functions, access controls, calculations, workflows, interfaces, audit trails, and error handling. OQ answers: "Does it work correctly?"

PERFORMANCE QUALIFICATION (PQ) ←→ User Requirements Specification: Proves the system performs reliably in the production environment, meeting the original user requirements. PQ uses real or representative production data, tests end-to-end business processes, and confirms the system works under real-world conditions including concurrent users and production workloads. PQ answers: "Does it perform reliably for its intended purpose?"

THE REQUIREMENTS TRACEABILITY MATRIX (RTM)

The RTM is the document that holds the V-Model together. It creates a chain of traceability from each user requirement, through the functional specification, to a design element, to a specific test case, and finally to a test result. This end-to-end chain proves that every requirement has been addressed and tested.

A gap in the RTM — a requirement with no corresponding test — is exactly what auditors look for. It means either: (a) the requirement was not tested, which is a compliance risk; or (b) the requirement was addressed by other means, which must be documented and justified.

Consider this example: A URS has 50 requirements. The FRS expands these into 120 functional requirements (this is normal — one user requirement often maps to multiple functions). The OQ has 95 test cases. This means 25 functional requirements have no corresponding test case. This gap must be investigated — either those 25 requirements are verified by other means (such as configuration verification during IQ), or there are genuinely missing test cases that need to be written.

THE DOCUMENTATION HIERARCHY

The complete validation documentation set, from top to bottom:

VALIDATION MASTER PLAN (VMP): The top-level document defining the overall validation program for a site or organisation. Describes the validation strategy, scope, approach, responsibilities, resource requirements, and acceptance criteria at the programme level. Not system-specific — it covers the entire validation programme.

VALIDATION PLAN (VP): System-specific plan detailing the validation approach for THIS particular system. Includes: GAMP classification with justification, risk assessment reference, test strategy, deliverables list, acceptance criteria, roles and responsibilities, schedule, and any deviations from the VMP approach.

SPECIFICATION DOCUMENTS: URS, FRS, and DS as described above.

QUALIFICATION PROTOCOLS: IQ, OQ, and PQ protocol documents. Each defines: the scope of testing, prerequisites, test environment requirements, test steps with expected results, acceptance criteria, deviation handling procedures, and approval signatures.

QUALIFICATION REPORTS: IQ, OQ, and PQ report documents. Each documents: what was tested (may reference the protocol), actual results observed, any deviations encountered and their resolution, pass/fail assessment against acceptance criteria, and conclusions.

VALIDATION SUMMARY REPORT (VSR): The final document in the validation lifecycle. Summarises all qualification activities, lists all deviations and their resolutions, documents any outstanding conditions or restrictions, assesses residual risk, and concludes whether the system is validated and fit for its intended use. The VSR is what an auditor reads first — it tells them the outcome without having to review every test script.

LESSONS FROM THE AZ LIMS CASE STUDY

Andrews Chapter 16 describes AstraZeneca's validation of a LIMS system, providing valuable real-world insights:

Generic vs Linear Test Scripts: The AZ team faced a choice between "generic" test scripts (one script per function, reused for each instance) and "linear" scripts (every instance spelled out sequentially). They chose generic scripts, which reduced their qualification protocol from an expected 167+ pages (matching the combined FS+DS volume) to just 41 pages.

Generic scripts require more experienced testers (who understand how to apply the generic script to specific instances) but produce smaller, more manageable documentation. Linear scripts are simpler to execute (even less experienced testers can follow them step by step) but produce much larger documents with more potential for transcription errors.

This demonstrates a key principle: efficient documentation does not mean insufficient documentation. The AZ team achieved the same level of assurance with less paper by designing their documentation intelligently.

Another key lesson from the AZ case: the PQ could only be performed during a scheduled plant shutdown, because it required the production machine that was otherwise in active use. This timing constraint drove the entire project schedule — illustrating that practical constraints, not just documentation requirements, shape real validation projects.`,

      exercise:{
        type:"traceability",
        title:"Build a Mini RTM",
        instructions:`Given the following URS requirements for a fictional LIMS, create an RTM showing how each requirement traces through to a test:

URS Requirements:
UR-001: The system shall generate unique sample IDs automatically
UR-002: The system shall check results against product specifications and flag OOS results
UR-003: The system shall require electronic signature for result approval
UR-004: The system shall maintain an audit trail of all data changes
UR-005: The system shall prevent deletion of approved results

For each, provide:
- Functional Requirement ID and description
- Test Phase (IQ, OQ, or PQ)
- Test Case description (what you would actually test)
- Expected Result`,
        modelAnswer:`UR-001 → FR-001: "System generates sample ID in format QC-YYYY-NNNN" → OQ → Test: Register 3 samples, verify IDs are sequential and unique → Expected: QC-2026-0001, QC-2026-0002, QC-2026-0003

UR-002 → FR-002a: "System loads correct spec limits per product" → OQ → Test: Select product, verify spec limits display → Expected: Correct limits shown
UR-002 → FR-002b: "System compares result to spec and flags OOS" → OQ → Test: Enter result outside spec → Expected: OOS alert triggers, investigation workflow initiated

UR-003 → FR-003a: "Approval requires user ID + password" → OQ → Test: Approve result, verify two-component signature → Expected: System requires both ID and password
UR-003 → FR-003b: "Signature captures name, date/time, meaning" → OQ → Test: After signing, verify all 3 elements displayed → Expected: Name, timestamp, "Approved" meaning shown

UR-004 → FR-004: "All changes logged with user, timestamp, old/new value, reason" → OQ → Test: Modify a result, check audit trail → Expected: Entry shows who, when, old value, new value, reason

UR-005 → FR-005a: "Delete button disabled for approved results" → OQ → Test: Attempt to delete approved result → Expected: System prevents deletion, error message shown
UR-005 → FR-005b: "Negative test: non-approved results also cannot be deleted" → OQ → Test: Attempt to delete pending result → Expected: System prevents deletion (data integrity)`
      },
      keyTerms:["V-Model","URS","FRS","DS","IQ","OQ","PQ","VMP","VP","VSR","RTM","Generic test scripts","Linear test scripts","Traceability"],
      checkpoints:["Can you draw the V-Model from memory with all cross-links?","Which qualification maps to URS? To FRS? To DS?","What does a gap in the RTM indicate?","What is the complete documentation hierarchy from VMP to VSR?","What lesson did AZ learn about generic vs linear test scripts?"]
    }
  ]
};
