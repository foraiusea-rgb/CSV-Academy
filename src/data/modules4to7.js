// Modules 4-7: Risk, DI, Testing, Change Control

export const M4 = {
  id:"m4", title:"Risk Assessment & Management", icon:"⚠️", color:"#2563EB",
  level:"Core", hours:4,
  bookRefs:["Andrews Ch.3","Stokes Ch.4-5,16"],
  overview:"Risk assessment is the engine driving modern CSV. It determines how much validation effort each system and function needs. This module covers FMEA, HACCP, FTA, and Stokes' weighted scoring system.",
  lessons:[{
    id:"m4l1", title:"Risk Techniques — FMEA, HACCP, FTA & Stokes Scoring",
    duration:"55 min",
    objectives:["Apply FMEA methodology to a real system","Calculate and interpret Risk Priority Numbers","Use Stokes' weighted multi-factor scoring","Determine test approaches from risk scores","Understand the AZ Threats and Controls Analysis"],
    content:`Risk assessment is the mechanism that translates the GAMP 5 principle of "effort proportional to risk" into practical validation decisions. Without a sound risk assessment, you cannot justify your testing approach — and an unjustified testing approach is a compliance finding waiting to happen.

Andrews Chapter 3 provides a comprehensive survey of risk assessment techniques applicable to computerised systems validation. The three most commonly used are FMEA, HACCP, and FTA.

FMEA — FAILURE MODE AND EFFECTS ANALYSIS

FMEA is the most widely used risk technique in CSV. It is systematic, repeatable, and produces quantifiable results that can be compared across systems and functions. For each system function, you identify potential failure modes and assess three dimensions:

SEVERITY (S): How bad would the consequence be if this failure occurred? Rated 1-10.
1 = Negligible (minor inconvenience, no quality impact)
3 = Minor (requires workaround, no product impact)
5 = Moderate (quality investigation required, no patient impact)
7 = Major (product quality affected, potential recall)
9 = Critical (direct patient safety risk)
10 = Catastrophic (patient harm, death)

OCCURRENCE (O): How likely is this failure to occur? Rated 1-10.
1 = Extremely unlikely (once in 10+ years)
3 = Low (once per year)
5 = Occasional (monthly)
7 = Frequent (weekly)
10 = Almost certain (daily or continuous)

DETECTION (D): If the failure occurred, how likely would we detect it before it causes harm? Rated 1-10.
1 = Always detected immediately (automatic system check)
3 = High detection probability (caught during routine review)
5 = Moderate (caught during periodic audit)
7 = Low (only found during detailed investigation)
10 = Undetectable (no mechanism to detect the failure)

The Risk Priority Number (RPN) is calculated: RPN = S × O × D

The maximum possible RPN is 1,000 (10 × 10 × 10). Higher RPNs indicate higher risk and drive more rigorous validation. Typical RPN thresholds for action: below 50 = acceptable risk, monitor only; 50-100 = moderate risk, standard testing; 100-200 = high risk, comprehensive testing with boundary and negative cases; above 200 = critical risk, exhaustive testing plus additional controls.

The power of FMEA is that it forces structured thinking about failure. Teams often discover failure modes they had never considered. The weakness is subjectivity — different assessors may rate the same failure differently. This is mitigated by performing FMEA as a team exercise with diverse perspectives (CSV engineer, process owner, QA, IT).

HACCP — HAZARD ANALYSIS AND CRITICAL CONTROL POINTS

Adapted from the food industry, HACCP follows seven principles: (1) Conduct hazard analysis, (2) Determine Critical Control Points (CCPs), (3) Establish critical limits, (4) Establish monitoring procedures, (5) Establish corrective actions, (6) Establish verification procedures, (7) Establish documentation and record keeping. HACCP is process-oriented — it focuses on identifying the critical points in a process where control is essential. It is particularly useful for manufacturing processes controlled by SCADA/DCS systems.

FTA — FAULT TREE ANALYSIS

FTA is a top-down deductive approach. You start with an undesired event (the "top event," such as "incorrect batch released to market") and work backward using logic gates (AND/OR) to identify all possible combinations of failures that could lead to that event. FTA produces a visual tree diagram that is powerful for communicating complex failure scenarios to non-technical stakeholders. However, it requires significant expertise to construct correctly.

STOKES' WEIGHTED MULTI-FACTOR SCORING

David Stokes recognised that GAMP category and GxP priority alone are insufficient to determine the appropriate testing approach. A module might be high GxP criticality but if it has been extensively tested by the supplier, used by hundreds of pharma companies, and has a mature track record — the actual risk may be low. Conversely, a medium GxP module developed under extreme time pressure by an inexperienced team using new technology may pose far higher risk.

His weighted scoring system (Chapter 16) considers seven factors simultaneously: GAMP Category (0-5), GxP Priority (5-20), Business Criticality (5-20), Module Complexity (1-5), Established History (1-5), Speed of Development (3-10), and Supplier Track Record (0-10). Maximum score: 75.

The AstraZeneca LIMS project (Andrews Ch.16) used a complementary approach: the Threats and Controls Analysis (TCA). This is a structured checklist covering 23 specific risk areas: security and access controls, hardware and software alarms, user interfaces, interfaces with other systems, system hardware reliability, operating system stability, application software quality, data input validation, maintenance and services, supplier management, loss of electricity/power, audit trail integrity, backup and restore, startup and shutdown procedures, disaster recovery, operating procedures, equipment environment, coding and identification, change of status workflows, traceability, management of critical parameters, allocation and reconciliation, and change control procedures.

The TCA approach is particularly practical because it provides a concrete checklist rather than requiring teams to brainstorm failure modes from scratch. For a new CSV engineer, having a TCA checklist to work from is far more effective than being told "perform a risk assessment" with no structure.

USE THE RISK CALCULATOR: The interactive Risk Calculator on this platform implements Stokes' weighted scoring system. Practice using it to classify different systems and see how changing individual factors affects the overall risk score and recommended test approach.`,

    exercise:{
      type:"fmea-calculation",
      title:"FMEA Risk Assessment for LIMS",
      instructions:`Perform a complete FMEA for these LIMS failure modes. For each, assign S (1-10), O (1-10), D (1-10), calculate RPN, and determine the appropriate test approach.

Use these scales:
Severity: 1=negligible, 5=moderate quality impact, 7=major, 9=critical patient safety, 10=catastrophic
Occurrence: 1=extremely unlikely, 3=low, 5=occasional, 7=frequent, 10=almost certain
Detection: 1=always detected immediately, 5=moderate, 7=low, 10=undetectable

Failure Modes:
1. Analyst enters wrong assay result (transposition error: 98.5 entered as 89.5)
2. System applies wrong product specification limits (configuration error)
3. OOS alert fails to trigger when result is below specification
4. Audit trail fails to record a result modification
5. Auto-calculation formula returns incorrect value (e.g., average of 3 replicate results)
6. Sample ID generated is not unique (duplicate ID created)
7. User can approve their own results (no maker-checker separation)`,
      modelAnswer:`1. Wrong result entry: S=7 (affects batch decision) × O=5 (human error, occasional) × D=3 (caught in review/approval) = RPN 105 — Medium risk, standard OQ testing

2. Wrong spec limits: S=9 (wrong pass/fail for every sample) × O=2 (config rarely changes) × D=6 (may not be noticed until audit) = RPN 108 — Medium-High, comprehensive configuration verification

3. OOS alert failure: S=10 (unsafe product could be released) × O=2 (systematic, would affect all results) × D=8 (hard to detect if alert doesn't fire) = RPN 160 — HIGH RISK, exhaustive testing with boundary values at exact spec limits

4. Audit trail failure: S=8 (data integrity compromised, regulatory) × O=2 (systematic) × D=9 (very hard to detect missing entries) = RPN 144 — HIGH RISK, dedicated audit trail verification testing

5. Wrong calculation: S=9 (affects all results using formula) × O=2 (formula configured once) × D=4 (detectable using known reference values) = RPN 72 — Medium, verify with known inputs/outputs

6. Duplicate sample ID: S=6 (sample confusion, testing integrity) × O=2 (uniqueness constraint should prevent) × D=3 (usually caught at registration) = RPN 36 — Low-Medium, verify uniqueness constraint in OQ

7. Self-approval: S=8 (bypasses independent review) × O=3 (depends on workflow config) × D=5 (may be caught in periodic review of audit trail) = RPN 120 — High, verify workflow separation in OQ with negative testing`
    },
    keyTerms:["FMEA","RPN","Severity","Occurrence","Detection","HACCP","FTA","TCA","Weighted scoring","Risk Priority Number"],
    checkpoints:["Can you calculate an RPN and explain what the number means?","What are the three dimensions of FMEA?","What factors does Stokes' weighted scoring consider?","What is TCA and how many areas does it cover?","When would you use FTA vs FMEA?"]
  }]
};

export const M5 = {
  id:"m5", title:"Data Integrity & ALCOA+", icon:"🔒", color:"#D97706",
  level:"Core", hours:4,
  bookRefs:["Andrews Ch.2,8","FDA DI Guidance 2018"],
  overview:"Data integrity is the #1 area of regulatory findings globally. Over 60% of GMP non-compliance relates to DI. This module covers ALCOA+ principles, audit trail requirements, and common failure patterns.",
  lessons:[{
    id:"m5l1", title:"ALCOA+ Principles, Audit Trails & Common Failures",
    duration:"55 min",
    objectives:["Explain each ALCOA+ principle with practical examples","Identify the most common data integrity failures in pharma","Understand audit trail requirements under Part 11 and Annex 11","Apply ALCOA+ assessment to real-world scenarios","Recognise the warning signs of data integrity problems"],
    content:`Data integrity is the completeness, consistency, and accuracy of data throughout its entire lifecycle. In pharmaceutical manufacturing, data integrity is not merely a quality nice-to-have — it is fundamental to patient safety. If the data recording that a batch of medicine was tested and found to meet specifications cannot be trusted, then the safety of that medicine cannot be assured.

The scale of the problem is staggering: data integrity failures account for more than 60% of all global GMP non-compliance findings. This makes it the single most frequently cited area of regulatory concern, ahead of contamination, equipment, and facilities combined. For CSV engineers, this means that data integrity controls — particularly audit trails, access controls, and electronic record protections — will be scrutinised more than any other aspect of your validation work.

THE ALCOA FRAMEWORK

ALCOA was first articulated in the 1990s by Stan Woollen of the FDA. The acronym represents five fundamental characteristics that all data must possess to be considered trustworthy:

ATTRIBUTABLE: Every piece of data must clearly identify WHO created or modified it, WHEN the action was performed, and on WHAT system or device. In practical terms, this requires: unique user identifiers for every individual (shared accounts are never acceptable under any circumstances), automatic timestamps generated by validated system clocks, and device or instrument identification linked to the data record.

The most common Attributable failure: shared login accounts. "QC_Lab1" as a generic login used by all analysts in a laboratory makes it impossible to determine who performed a specific action. This is a critical finding in every regulatory framework.

LEGIBLE: Data must be readable and understandable both at the time of recording and throughout the entire required retention period. For electronic records, this means: data formats must remain readable even as technology changes (a critical consideration when retention periods can exceed 15 years), system configurations must be documented so that data can be interpreted correctly, and reports must accurately represent the underlying data.

CONTEMPORANEOUS: Data must be recorded at the time the activity is performed — not minutes, hours, or days later. Electronic systems with automatic timestamps provide the strongest evidence of contemporaneous recording. For paper records, this is inherently difficult to verify retrospectively, which leads to the well-known observation that "paper is patient" — you simply cannot tell from looking at a paper record whether it was actually written at the time of the event or transcribed hours later from an unofficial worksheet.

This principle is why electronic systems are generally preferred over paper for GxP records — the automatic timestamp provides objective evidence of when the record was created, which paper fundamentally cannot.

ORIGINAL: The first recording of information is the original record and must be preserved. Raw data from analytical instruments must be maintained — not just the processed, reported results. Certified true copies are acceptable only when produced through documented and validated copy procedures.

ACCURATE: Data must accurately reflect exactly what was observed or measured, without manipulation or bias. This requires: calibrated and maintained equipment, validated calculations and data processing, proper error correction procedures (visible single-line strikethrough with initials, date, and reason for paper; tracked modification with full audit trail for electronic records), and prohibition of practices that could introduce bias (such as repeating tests until a passing result is obtained and only reporting the passing result).

THE + IN ALCOA+

The original ALCOA framework was extended with four additional principles that address the practical realities of managing data in modern pharmaceutical environments:

COMPLETE: No data may be deleted. All information must be retained, including failed test results, aborted analytical runs, out-of-specification results, and preliminary data. The absence of expected data is itself a data integrity concern — if a HPLC sequence shows runs 1, 2, 3, 5, 6 with run 4 missing, the inspector will ask what happened to run 4.

CONSISTENT: Data must be in chronological order with proper timestamps. The sequence of events must be verifiable and make logical sense. Time synchronisation across all systems is essential — if the LIMS shows a result was approved at 14:30 but the HPLC system shows the analysis wasn't complete until 14:45, there is a consistency problem.

ENDURING: Records must survive for the entire required retention period, which varies by record type and jurisdiction but can be 15+ years for some pharmaceutical records. This requires: robust backup and disaster recovery procedures, media migration strategies (data on obsolete media formats must be migrated to current technology), and system retirement planning that ensures data remains accessible after the original system is decommissioned.

AVAILABLE: Data must be accessible and retrievable when needed — for batch release decisions, quality investigations, regulatory submissions, and inspections. Data locked in systems that have been decommissioned without proper archiving is effectively lost.

AUDIT TRAIL REQUIREMENTS

The audit trail is the technical implementation of several ALCOA+ principles simultaneously — it makes data Attributable (who), Contemporaneous (when), and supports Completeness (records all changes including the original value). Under 21 CFR Part 11 §11.10(e), audit trails must be: secure (users cannot modify or delete entries), computer-generated (not manually maintained), time-stamped (from a validated clock source), and must not obscure previously recorded information (the original value must remain visible alongside the new value).

COMMON DATA INTEGRITY FAILURES

Through years of regulatory inspections and enforcement actions, clear patterns of data integrity failure have emerged:

Shared login accounts — inability to attribute actions to individuals. Backdating entries — recording data as if it were captured contemporaneously when it was actually entered later. Deleting failed results — removing out-of-specification results and reporting only passing results (the most egregious form of data manipulation). Disabling audit trails — turning off the logging mechanism to hide activities. Unofficial worksheets — performing calculations or preliminary work on uncontrolled documents that are then discarded. Trial injections in chromatography — running samples before the "official" analysis to check whether they will pass, then only submitting the sequence that gives acceptable results. Manipulating integration parameters — adjusting peak integration in chromatography data systems to change the calculated result.

Each of these failures represents a situation where the data can no longer be trusted, which means product quality and patient safety cannot be assured based on that data.`,

    exercise:{
      type:"investigation",
      title:"Data Integrity Audit Trail Investigation",
      instructions:`You are reviewing the LIMS audit trail for Batch B240315-07 (Paracetamol 500mg Tablets) as part of a routine data integrity review. Analyse the following audit trail entries and identify ALL data integrity concerns. For each concern, state which ALCOA+ principle is violated and what action you would take.

Audit Trail:
Entry 1: 2024-03-15 09:12 — User: S.Murphy — Action: Sample QC-2024-0847 registered
Entry 2: 2024-03-15 09:45 — User: S.Murphy — Action: Assay result entered: 98.7%
Entry 3: 2024-03-15 09:47 — User: S.Murphy — Action: Dissolution result entered: 78.2%
Entry 4: 2024-03-15 09:48 — User: S.Murphy — Action: Hardness result entered: 8.4 kP
Entry 5: 2024-03-15 14:22 — User: S.Murphy — Action: Dissolution result MODIFIED from 78.2% to 82.4% — Reason: "data entry error"
Entry 6: 2024-03-15 14:24 — User: S.Murphy — Action: All results approved (e-signature applied)
Entry 7: 2024-03-15 14:25 — User: E.Kelly (QC Manager) — Action: Sample approved for batch release (e-signature applied)

Additional context: Product specification for Dissolution is ≥80.0%. The HPLC instrument log shows the dissolution analysis was completed at 09:40 on 15-Mar-2024.`,
      modelAnswer:`CONCERN 1 — Result Modification (Entry 5):
The dissolution result was changed from 78.2% (FAILING — below 80.0% spec) to 82.4% (PASSING). This is the single biggest red flag. The reason "data entry error" needs rigorous investigation — what evidence supports that the original entry was wrong? Where is the source data (instrument printout, raw data file) proving the correct value is 82.4%? Without supporting evidence, this looks like result manipulation.
ALCOA violated: Accurate, Original

CONCERN 2 — Time Gap (Entry 3→5):
Over 5 hours elapsed between the original dissolution entry (09:47) and the modification (14:22). If this were truly a data entry error (typo), why wasn't it corrected immediately? A genuine transcription error is typically noticed within minutes, not hours.
ALCOA violated: Contemporaneous (correction not timely)

CONCERN 3 — Self-Approval (Entry 5→6):
The same person who modified the result (S.Murphy) also approved all results just 2 minutes later. This bypasses independent review of the modification. The approver should be a different person who independently verifies the modification is justified.
ALCOA violated: Attributable (proper independent review compromised)

CONCERN 4 — Rapid QC Manager Approval (Entry 6→7):
Only 1 minute between analyst approval and QC Manager approval. This is insufficient time for the QC Manager to have reviewed the modification, checked the supporting evidence, and made an independent assessment. It suggests rubber-stamping rather than genuine review.
ALCOA violated: Accurate (review process not meaningful)

CONCERN 5 — Missing Evidence Reference:
The modification reason says "data entry error" but there is no reference to supporting evidence — no instrument printout number, no raw data file reference, no second person verification. A proper correction should reference the source data that proves the correct value.

ACTIONS:
1. Quarantine the batch immediately — do not release until investigation complete
2. Retrieve the original instrument raw data for the dissolution analysis
3. Interview S.Murphy and E.Kelly separately
4. Review S.Murphy's other recent results for similar patterns
5. Raise a formal deviation and initiate CAPA if manipulation confirmed
6. Report to QA management — potential regulatory notification required`
    },
    keyTerms:["ALCOA+","Data integrity","Attributable","Legible","Contemporaneous","Original","Accurate","Complete","Consistent","Enduring","Available","Audit trail"],
    checkpoints:["Can you explain all 9 ALCOA+ principles from memory?","What does 'paper is patient' mean and why does it matter?","What are the 5 most common data integrity failures?","How should electronic corrections be handled vs paper corrections?","What would you do if you found disabled audit trails during an inspection?"]
  }]
};

export const M6 = {
  id:"m6", title:"Testing Strategies & Protocols", icon:"🧪", color:"#0D9488",
  level:"Practical", hours:5,
  bookRefs:["Stokes Ch.5-9,15-17","Andrews Ch.9,19"],
  overview:"Testing is where CSV delivers tangible value. This module covers test strategy development, test script writing, IQ/OQ/PQ execution, deviation handling, and test incident management — all from Stokes, the definitive guide.",
  lessons:[{
    id:"m6l1", title:"Test Strategy, Script Writing & Deviation Management",
    duration:"60 min",
    objectives:["Develop a risk-based test strategy document","Write effective test scripts with clear acceptance criteria","Handle deviations during testing properly","Manage test incidents using Stokes' framework","Understand FAT/SAT and their relationship to IQ/OQ/PQ"],
    content:`Testing is the phase of CSV where you generate the objective evidence that the system meets its requirements. Everything else — the URS, the risk assessment, the validation plan — leads to this. And this is what an auditor will examine most closely, because test results are the evidence that the system actually works.

David Stokes' book is the definitive guide to testing computerised systems, and this lesson draws heavily from his work.

THE TEST STRATEGY

The test strategy documents what will be tested, how rigorously, and why. It provides the risk-based rationale for the testing approach and is a key document for audit readiness — it explains to an inspector why you tested some functions exhaustively and others less rigorously.

GAMP defines five types of test specifications: (1) Hardware Test Specification — for custom hardware components, (2) Software Module Test Specification — for custom code units, (3) Software Integration Test Specification — for verifying components work together, (4) Package Configuration Test Specification — for configured COTS software, (5) System Acceptance Test Specification — for end-to-end system testing.

Not all are needed for every system. A configured LIMS with no custom code typically needs only types 4 and 5. The test strategy must justify which types are included and which are omitted.

WRITING EFFECTIVE TEST SCRIPTS

Stokes is emphatic on this point: "In order for a test to serve a useful purpose, every test should have a defined set of unambiguous acceptance criteria for each set of defined input conditions."

A test script must contain: HEADER (project, system, document ID, revision, author, approval signatures), PREREQUISITES (system state required before testing begins, test data loaded, test user accounts created with appropriate profiles, prerequisite test scripts completed), TEST STEPS (each step specifies: Action to perform → Expected Result → space for Actual Result → Pass/Fail assessment → Tester initials and date), and ACCEPTANCE CRITERIA (an explicit, unambiguous statement of what constitutes a passing test, defined BEFORE testing begins).

TYPES OF TESTING: Black-box testing examines outputs against inputs without knowledge of internal code — this is the most common approach in CSV. White-box (structural) testing examines internal code logic — used for Category 5 custom software. Boundary testing verifies behaviour at the edges of valid ranges (enter 95.0% when spec is 95.0-105.0% — does it pass or fail?). Negative testing verifies the system correctly rejects invalid inputs (enter text in a numeric field, attempt to access functions without authorisation). Regression testing verifies that changes have not broken existing functionality — critical after system updates.

DEVIATION HANDLING DURING TESTING

When actual results do not match expected results, the tester has encountered a deviation. Stokes provides a clear framework for categorising and handling these:

Test Script Error: The test script itself contains incorrect or unclear instructions. Solution: raise a change note against the script, correct the instruction, continue testing if the error doesn't invalidate other results.

Tester Error: The tester made a mistake in executing the test (misread an instruction, entered wrong data). Solution: document the error, reset the test conditions, re-execute the affected steps.

Set-up Error: The test environment was not correctly prepared. Solution: correct the setup, re-execute from the beginning.

Application Error: The system has a genuine defect. Solution: raise a formal test incident, document the defect with evidence, assess the impact, determine whether testing can continue for other functions.

Critical rule from Stokes: "If the Tester is in any doubt, ALWAYS seek advice from the Lead Tester or QA representative." Additionally, if two or more anomalies occur within a single test script, testing should usually STOP for that script because the combined outcome becomes too difficult to evaluate and justify after the event.

Key metric: If more than 40% of test incidents after the first week of testing are due to script, setup, or tester errors, Stokes recommends HALTING the entire test programme for review and retraining. This indicates a fundamental problem with the testing programme itself, not with the system under test.

FAT, SAT, AND THEIR RELATIONSHIP TO IQ/OQ/PQ

Factory Acceptance Testing (FAT) is performed at the supplier's premises before the system is shipped to the user's site. It typically covers hardware testing, software module testing, and as much system acceptance testing as can be performed in the factory environment.

Site Acceptance Testing (SAT) is performed at the user's site after the system has been installed. It covers functions that can only be tested in the production environment — interfaces to other production systems, performance under real network conditions, and integration with site infrastructure.

FAT and SAT are NOT the same as IQ/OQ/PQ — they are different activities with different objectives. However, FAT and SAT results CAN be leveraged to support IQ/OQ/PQ documentation, potentially reducing the scope of additional testing needed. The test strategy should explicitly define how FAT/SAT relates to the qualification phases.

The typical sequence is: FAT (at supplier) → Ship to site → IQ (verify installation) → SAT (verify on-site functions) → OQ (test all functions against FRS) → PQ (prove performance in production). Some organisations combine SAT and OQ, which is acceptable if properly planned and documented.

TEST USER ACCOUNTS: Stokes specifically addresses the need to create dedicated test user accounts with appropriate profiles. Testing should clearly differentiate between actions performed by the tester (using a test account) and actions that represent user activities being tested. All test accounts should have their access removed after testing is complete.`,

    exercise:{
      type:"script-writing",
      title:"Write OQ Test Scripts",
      instructions:`Write complete OQ test steps for these two LIMS functions. For each, include: prerequisites, at least 4 test steps (including at least one boundary test and one negative test), expected results, and acceptance criteria.

Function 1: Sample Registration
- Product must be selected from a dropdown (mandatory)
- Batch number must be entered (mandatory, alphanumeric, max 15 chars)
- Sample ID auto-generated in format QC-YYYY-NNNN
- Analyst must be selected (mandatory)

Function 2: Results Entry
- Analyst enters numerical result against specification (Assay: 95.0-105.0%)
- System checks result against spec limits in real time
- Out-of-spec results trigger OOS alert
- Results require two-person approval (analyst + QC Manager)

Use the LIMS Simulator to verify your test steps work!`,
      modelAnswer:`FUNCTION 1: Sample Registration

Prerequisites: User logged in as QC Analyst. At least one product configured. System on Sample Registration screen.

Step 1 (Positive): Select product "PROD-001", enter batch "B240301-01", select analyst → Expected: Sample registered, unique ID generated (QC-2026-0001)
Step 2 (Mandatory fields): Leave product blank, try to submit → Expected: System rejects, error message "Product is required"
Step 3 (Boundary): Enter batch number with exactly 15 characters "B240301-0123456" → Expected: Accepted (at boundary)
Step 4 (Negative): Enter batch number with 16 characters → Expected: Rejected or truncated with warning
Step 5 (Uniqueness): Register second sample → Expected: ID is QC-2026-0002 (sequential, unique)

Acceptance: All 5 steps pass. Mandatory fields enforced. IDs are unique and sequential.

FUNCTION 2: Results Entry

Prerequisites: Sample registered. User logged in as QC Analyst.

Step 1 (Normal): Enter assay result 99.5% → Expected: Accepted, status "Pass", within spec highlighted green
Step 2 (Lower boundary): Enter 95.0% → Expected: Accepted, status "Pass" (boundary inclusive)
Step 3 (OOS - below): Enter 94.9% → Expected: OOS alert triggers, investigation workflow initiated, sample cannot be approved
Step 4 (Negative input): Enter "abc" in result field → Expected: System rejects non-numeric input
Step 5 (Self-approval check): Same analyst attempts to approve results → Expected: System requires different user for approval

Acceptance: Spec checking correct. OOS triggers at boundary. Invalid input rejected. Maker-checker enforced.`
    },
    keyTerms:["Test strategy","Test script","Acceptance criteria","Black-box","Boundary testing","Negative testing","Regression","Deviation","FAT","SAT","Generic script","Linear script"],
    checkpoints:["Can you write a test script with clear acceptance criteria?","What are the deviation categories per Stokes?","What happens when >40% of incidents are script errors?","How do FAT/SAT relate to IQ/OQ/PQ?","What is the difference between black-box and white-box testing?"]
  }]
};

export const M7 = {
  id:"m7", title:"Change Control & Lifecycle", icon:"🔄", color:"#7C3AED",
  level:"Practical", hours:3,
  bookRefs:["Wingate Ch.13","Andrews Ch.2,12"],
  overview:"Once validated, maintaining that validated state through change control and periodic review is just as important as achieving it. This module covers the change control process, periodic review, and handling legacy systems.",
  lessons:[{
    id:"m7l1", title:"Change Control, Periodic Review & Legacy Systems",
    duration:"50 min",
    objectives:["Execute a complete change control process","Conduct a meaningful periodic review","Approach legacy system validation","Understand why rejected changes should be tracked"],
    content:`The most common mistake organisations make with CSV is treating validation as a one-time event. A system is validated, the VSR is signed, and then the system is left to operate with minimal oversight until the next major upgrade. This is a compliance time bomb.

In reality, the validated state of a system begins to degrade from the moment it goes live. Software patches are applied, configurations are adjusted, users change, procedures evolve, and the regulatory landscape shifts. Without active lifecycle management — specifically change control and periodic review — the gap between the documented validated state and the actual system state grows steadily wider.

CHANGE CONTROL

Change control is the formal process by which any modification to a validated system is evaluated, approved, implemented, tested, and documented. It is the mechanism that maintains the validated state.

The change control process typically follows these nine steps:

1. CHANGE REQUEST: Any proposed change must be formally documented. The request should include: what is being changed and why, who is requesting it, the business justification, and the proposed timeline. Even apparently trivial changes must go through this process — many significant compliance issues have arisen from "minor" changes that were implemented without proper evaluation.

2. IMPACT ASSESSMENT: This is the most critical step. The change must be evaluated for its impact on: the validated state of the system (does this change affect any validated functionality?), GxP data and processes (could this change affect product quality or patient safety?), other integrated systems (does the LIMS interface with SAP that would be affected?), SOPs and work instructions (do any procedures need updating?), training requirements (do users need retraining?), and regulatory compliance (does this change affect Part 11 or Annex 11 compliance?).

3. RISK ASSESSMENT: Based on the impact assessment, determine the risk level of the change and the required scope of revalidation. A minor configuration change affecting a non-GxP function may need only verification. A major upgrade affecting critical calculations may need full requalification.

4. QA APPROVAL: Quality Assurance must review and approve the change plan BEFORE implementation. This is non-negotiable. Emergency changes may follow an expedited approval process but still require retrospective documentation and QA review.

5. IMPLEMENTATION: Execute the change per the approved plan, in the approved environment, by approved personnel.

6. TESTING: This includes both change-specific testing (does the change work as intended?) and regression testing (has the change broken any existing functionality?). The scope of regression testing should be determined by the impact assessment.

7. POST-IMPLEMENTATION REVIEW: After the change is live, verify that it achieved its objective without unintended consequences.

8. DOCUMENTATION UPDATE: Update all affected documents — validation documentation, SOPs, training materials, system descriptions.

9. CLOSURE: Close the change record with QA sign-off confirming all activities are complete.

Andrews makes a critically important point that is often overlooked: even REJECTED changes should be tracked through to closure. If similar changes are repeatedly requested and rejected, this pattern indicates an underlying problem — perhaps the system doesn't meet user needs, the procedures are impractical, or the training is inadequate. Tracking rejected changes provides valuable intelligence about system and process health.

PERIODIC REVIEW

EU GMP Annex 11 Section 14 explicitly requires periodic evaluation of computerised systems. Most organisations conduct this annually, though more frequent reviews may be appropriate for high-risk systems.

A meaningful periodic review should cover: all changes implemented since the last review (were they all properly controlled?), all incidents and deviations (are there trends indicating systematic problems?), audit findings (have all findings been addressed?), configuration verification (does the system documentation still match the actual system?), user access review (have leavers been removed? are there any shared accounts? are admin rights properly controlled?), backup and restore testing (has the backup been tested within the review period?), supplier status (is the system still supported? are there end-of-life concerns?), training records (are all users currently trained?), and an overall fitness-for-purpose assessment (is the system still meeting business and regulatory needs?).

The output should be a documented report with a clear conclusion: the system remains in a valid state, OR specific actions are required to restore the validated state.

LEGACY SYSTEMS

Andrews Chapter 12 addresses the challenge of systems that are already in operation but were never properly validated — or were validated to standards that have since been superseded.

The approach for legacy systems: (1) Document the current as-is state — what does the system do, how is it configured, who uses it? (2) Gap analysis — compare the current state against current validation standards. What documentation exists? What is missing? (3) Risk assessment — prioritise the gaps based on patient safety and data integrity risk. (4) Remediation plan — define what retrospective validation activities are needed. (5) Execute retrospective validation — this may include writing specifications for an already-operating system, performing qualification testing, and generating missing documentation. (6) Bring into ongoing maintenance — add the system to the periodic review schedule, establish change control, ensure training is current.

Legacy system validation is pragmatic, not perfect. The goal is to achieve reasonable assurance that the system is fit for purpose and to bring it into a controlled lifecycle going forward — not to retroactively create documentation that pretends the full lifecycle was followed from the beginning.`,

    exercise:{
      type:"scenario",
      title:"Change Control Decision-Making",
      instructions:`Your site's validated LIMS vendor releases critical security patch v11.5.3. The release notes state: "Fixed authentication vulnerability CVE-2026-1234. No functional changes to the application. Database schema unchanged."

Walk through the complete change control process:
1. What specific information do you need from the vendor before proceeding?
2. Write a 3-sentence impact assessment
3. What testing scope do you recommend and why?
4. What is the timeline pressure and how does it affect your approach?
5. Draft a one-paragraph justification for your recommended approach that you could present to QA for approval`,
      modelAnswer:`1. Information needed: Full patch release notes with exact files changed, vendor's own regression testing report, confirmation that no database schema changes occurred, confirmation that Part 11 controls (audit trail, e-signatures, access controls) are not affected, list of other customer sites that have already applied the patch.

2. Impact assessment: "This patch addresses a critical authentication vulnerability (Part 11 §11.10(d) access controls) with no functional or database changes per vendor release notes. The authentication module is Part 11 critical, requiring focused verification. No other GxP functions, interfaces, or data are affected based on vendor documentation."

3. Testing: Focused regression testing of authentication functions: login/logout with valid and invalid credentials, password policy enforcement (complexity, expiry, lockout), session timeout, access denied for unauthorised roles, audit trail verification for login events. Plus spot-check of 3-4 key GxP functions (sample registration, results entry, approval workflow) to verify no unintended changes. NOT full OQ reexecution — the scope is disproportionate to the change.

4. Timeline: Security patches should be implemented promptly — CVE-2026-1234 represents an active vulnerability. Leaving the system unpatched is itself a data integrity risk (potential unauthorised access). Target implementation within 2 weeks of receiving the patch.

5. Justification: "This security patch addresses authentication vulnerability CVE-2026-1234 with no functional changes confirmed by vendor documentation and testing evidence. A focused regression test of authentication and Part 11 access controls, plus spot-check of key GxP functions, provides appropriate assurance that the validated state is maintained. Full OQ reexecution is not warranted as the patch does not modify configured functionality, calculations, or data handling. Implementation is time-sensitive as the unpatched vulnerability poses a greater data integrity risk than the controlled application of a vendor-tested security fix."`
    },
    keyTerms:["Change control","Periodic review","Regression testing","Legacy system","Retrospective validation","Impact assessment","Revalidation"],
    checkpoints:["Can you walk through all 9 change control steps?","Why should rejected changes be tracked?","What does a periodic review cover?","How do you approach a legacy system?","When is full revalidation needed vs focused regression testing?"]
  }]
};
