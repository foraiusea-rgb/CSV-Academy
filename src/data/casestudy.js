// End-to-End Case Study: Validating a LIMS at Pharmatech Ireland
// Walks through the COMPLETE validation lifecycle for a real-world project

export const CASE_STUDY = {
  title: "Case Study: Validating LabWare LIMS at Pharmatech Ireland",
  subtitle: "A complete walkthrough from GxP assessment to Validation Summary Report",
  company: "Pharmatech Ireland Ltd, Limerick",
  system: "LabWare LIMS v7.5",
  duration: "16 weeks",
  overview: `This case study walks you through the entire validation lifecycle for a new LIMS deployment at a fictional Irish pharmaceutical company. Every decision, document, and test is explained — showing how all the concepts from this course connect in practice.

Pharmatech Ireland is a mid-sized tablet manufacturing facility in Limerick. They are replacing their legacy paper-based QC laboratory system with LabWare LIMS v7.5 to manage sample registration, analytical testing, results review, Certificate of Analysis generation, and stability studies. The site manufactures for both EU and US markets, requiring compliance with EU GMP Annex 11 and FDA 21 CFR Part 11.`,

  phases: [
    {
      id: "p1",
      title: "Phase 1: GxP Impact Assessment & System Classification",
      week: "Week 1-2",
      content: `The first step in any validation project is determining whether the system requires validation — and if so, how rigorously.

GxP IMPACT ASSESSMENT:
We assess three questions:
1. Does the system affect patient safety? YES — LIMS generates Certificates of Analysis that confirm product quality before release to patients.
2. Does it impact product quality? YES — LIMS manages test results and specification checking. Incorrect results could lead to release of out-of-specification product.
3. Does it create/store GxP data? YES — analytical results, specifications, analyst identifiers, approval records are all GxP electronic records.

CONCLUSION: The LIMS has DIRECT GxP impact. Full validation required.

GAMP CLASSIFICATION:
- LabWare LIMS application: Category 4 (configurable software — standard product configured for our workflows)
- Custom Crystal Reports for CoA generation: Category 5 (custom code)
- Oracle 19c database: Category 1 (infrastructure)
- Windows Server 2022: Category 1 (infrastructure)

REGULATORY SCOPE:
- EU GMP Annex 11: Required (HPRA inspections)
- 21 CFR Part 11: Required (US market)
- GAMP 5 2nd Edition: Framework for validation approach

RISK SCORING (using Stokes' weighted system):
- GAMP Category 4: 4 points
- GxP Priority High: 20 points
- Business Criticality High: 20 points
- Complexity Medium: 3 points
- History Established: 3 points
- Development Speed Normal: 5 points
- Supplier Excellent: 0 points
Total: 55/75 → Medium-High Risk → Comprehensive scripted testing (IQ/OQ/PQ)

📝 DOCUMENT PRODUCED: GxP Impact Assessment (signed by Process Owner, System Owner, QA)`
    },
    {
      id: "p2",
      title: "Phase 2: Supplier Audit & Assessment",
      week: "Week 2-3",
      content: `Before writing our validation plan, we assess the supplier's quality system. The outcome directly affects how much testing we need to do.

SUPPLIER AUDIT OF LABWARE:
We conduct a 2-day on-site audit at LabWare's development centre, focusing on:

QMS: ISO 9001:2015 certified. SOPs current and actively maintained. Document control system in place. ✅

SDLC: Waterfall methodology with defined phases. Coding standards documented (Java, PL/SQL). Version control using Git. Code review process with defined criteria. ✅

Testing: Unit testing (automated, >85% coverage), integration testing, system testing, regression testing suite with >3,000 automated test cases. Formal test plans traceable to design specifications. ✅ (Impressive)

Change Control: Formal change control board. Changes tracked from request through release. Customer notification 60 days before major releases. ✅

AUDIT CONCLUSION: "Mature quality system with comprehensive testing programme. Supplier testing can be leveraged to reduce user qualification scope, particularly for core LIMS functions that are tested as part of LabWare's standard regression suite."

PRACTICAL IMPACT: Because LabWare has excellent testing, we can:
- Reference their FAT documentation for core functionality
- Focus our OQ on site-specific configuration rather than retesting standard features
- Reduce OQ scope by ~30% compared to a supplier with no quality system

📝 DOCUMENTS PRODUCED: Supplier Audit Report, Supplier Quality Assessment, Quality Agreement`
    },
    {
      id: "p3",
      title: "Phase 3: Validation Plan & User Requirements",
      week: "Week 3-5",
      content: `The Validation Plan (VP) is the roadmap for the entire project. The URS defines what the system must do.

VALIDATION PLAN KEY DECISIONS:

Test Strategy: Based on our risk score of 55/75, we will perform comprehensive scripted testing:
- IQ: Hardware, software, infrastructure, network, backup verification
- OQ: All configured functions, access controls, audit trails, interfaces, calculations
- PQ: End-to-end business processes with representative production data

Documentation Approach: We will use GENERIC test scripts (per the AZ LIMS approach) rather than linear scripts. Estimated reduction: FRS is 142 pages; with generic scripts our OQ protocol should be ~50 pages.

Roles:
- Process Owner: QC Director (Dr. Sarah Collins) — owns URS, accepts PQ
- System Owner: IT Manager (James Murphy) — owns infrastructure, support
- CSV Engineer: You — plans, executes, documents validation
- QA Reviewer: QA Manager (Eoin O'Sullivan) — independent review and approval

USER REQUIREMENTS SPECIFICATION (excerpts):
UR-001: The system shall automatically generate unique sample identification numbers in the format QC-YYYY-NNNN
UR-002: The system shall check analytical results against product specifications and flag out-of-specification results
UR-003: The system shall require electronic signature (user ID + password) for result approval
UR-004: The system shall maintain a secure audit trail recording all data creation, modification, and deletion with user ID, timestamp, old value, new value, and reason
UR-005: The system shall prevent deletion of approved results
UR-006: The system shall enforce sequential workflow: registration → testing → review → approval
UR-007: The system shall generate Certificates of Analysis meeting EU and US regulatory requirements
UR-008: The system shall interface with Empower CDS for automated HPLC result transfer
...
(52 requirements total, each with priority and GxP classification)

📝 DOCUMENTS PRODUCED: Validation Plan (VP-LIMS-2026-001), User Requirements Specification (URS-LIMS-2026-001), Risk Assessment (RA-LIMS-2026-001)`
    },
    {
      id: "p4",
      title: "Phase 4: Functional & Design Specifications",
      week: "Week 5-8",
      content: `The FRS translates user requirements into system functions. The DS documents how the system is configured.

FUNCTIONAL REQUIREMENTS (mapping from URS):
UR-001 → FR-001a: Sample ID format QC-YYYY-NNNN with auto-increment
UR-001 → FR-001b: Year rollover resets sequence to 0001
UR-001 → FR-001c: Uniqueness constraint prevents duplicate IDs

UR-002 → FR-002a: Product specification table stores test name, method, unit, LSL, USL
UR-002 → FR-002b: Results entry screen compares entered value to spec limits in real-time
UR-002 → FR-002c: OOS condition (result outside LSL-USL) triggers alert and locks sample from approval
UR-002 → FR-002d: OOS investigation workflow with 4 mandatory phases

UR-004 → FR-004a: Audit trail captures: user ID, timestamp, table, field, old value, new value
UR-004b: Audit trail entries cannot be modified or deleted by any user including administrators
UR-004c: Audit trail viewer with filtering by date range, user, action type
...
(Total: 186 functional requirements mapped from 52 user requirements)

DESIGN SPECIFICATION (configuration details):
- 5 user roles configured: Analyst, Senior Analyst, QC Manager, System Admin, QA Reviewer
- Each role has specific menu access, function permissions, and approval authority
- 12 product specifications configured with tests, methods, limits
- 3 instrument interfaces: Empower CDS, Karl Fischer, Dissolution bath
- Audit trail configuration: all GxP tables enabled, retention = indefinite
- Password policy: min 8 chars, complexity, 90-day expiry, 5-attempt lockout, 15-min timeout
- Backup schedule: daily full at 02:00, transaction logs every 15 minutes

REQUIREMENTS TRACEABILITY MATRIX:
52 URS requirements → 186 functional requirements → 186 design elements → 142 OQ test cases

RTM GAP ANALYSIS: 186 FRS → 142 OQ test cases = 44 requirements with no OQ test. Investigation reveals:
- 28 are infrastructure items verified during IQ (server specs, network, backup config)
- 12 are procedural requirements verified through SOP review
- 4 are genuinely missing test cases → ADDED to OQ protocol before approval

📝 DOCUMENTS PRODUCED: Functional Requirements Specification (FRS-LIMS-2026-001), Design Specification (DS-LIMS-2026-001), Requirements Traceability Matrix (RTM-LIMS-2026-001)`
    },
    {
      id: "p5",
      title: "Phase 5: IQ — Installation Qualification",
      week: "Week 9-10",
      content: `IQ verifies the system is installed correctly per the Design Specification.

IQ PROTOCOL STRUCTURE:
Section 1: Server Hardware (6 test steps)
- Verify server model, serial number, RAM, storage match DS
- Verify RAID configuration for data protection
- Verify UPS connection for power protection

Section 2: Operating System (4 test steps)
- Verify Windows Server 2022 version and patch level
- Verify domain membership and network connectivity
- Verify NTP time synchronisation (±1 second of reference)

Section 3: Database (5 test steps)
- Verify Oracle 19c version
- Verify database instance configuration
- Verify tablespace allocation
- Verify backup agent installation and configuration

Section 4: Application (4 test steps)
- Verify LabWare LIMS v7.5.2 installation
- Verify client deployment to 12 QC workstations
- Verify licence activation

Section 5: Infrastructure (3 test steps)
- Verify backup schedule operational (daily full + 15-min logs)
- Verify network connectivity between all components
- Verify antivirus exclusions configured per LabWare recommendations

IQ EXECUTION RESULTS:
22 test steps executed. 21 PASSED. 1 DEVIATION:
- DEV-IQ-001: Server RAM was 32GB instead of specified 64GB
- Root cause: Procurement ordered wrong configuration
- Impact assessment: System will function but may experience performance issues under peak load
- Corrective action: RAM upgrade ordered, installed within 5 days, step re-executed → PASS
- Deviation closed

IQ CONCLUSION: All 22 steps pass (after deviation resolution). System installed per design specification.

📝 DOCUMENTS PRODUCED: IQ Protocol (IQ-LIMS-2026-001), IQ Report (IQR-LIMS-2026-001), Deviation DEV-IQ-001`
    },
    {
      id: "p6",
      title: "Phase 6: OQ — Operational Qualification",
      week: "Week 10-13",
      content: `OQ is the most extensive testing phase — verifying every configured function works correctly.

OQ PROTOCOL STRUCTURE (142 test cases across 12 sections):

Section 1: User Access & Security (18 tests)
- Login with valid credentials → success
- Login with invalid password → rejected after 5 attempts, account locked
- Access restricted functions with Analyst role → denied (negative test)
- Session timeout after 15 minutes inactivity
- Password change enforced at 90 days

Section 2: Sample Management (16 tests)
- Register sample → unique ID generated
- Mandatory field enforcement (product, batch, analyst required)
- Duplicate batch number detection
- Sample status workflow (Pending → In Progress → Complete → Approved)

Section 3: Results Entry & Calculations (22 tests)
- Enter result within spec → Pass status
- Enter result at lower boundary (95.0%) → Pass (boundary inclusive)
- Enter result below spec (94.9%) → OOS alert triggers
- Average calculation: enter 3 replicates, verify average correct to 1 decimal
- Non-numeric input rejection

Section 4: OOS Investigation Workflow (12 tests)
- OOS triggers → investigation form mandatory
- 4 phases must complete in sequence
- Sample cannot be approved while investigation open
- Investigation requires QC Manager signature

Section 5: Electronic Signatures (14 tests)
- Signature requires user ID + password (two components)
- Signed record shows: printed name, date/time, meaning
- Different user required for approval vs entry (maker-checker)
- Signature linked to record — cannot be copied

Section 6: Audit Trail (16 tests)
- Create record → audit trail entry captured
- Modify record → old value, new value, reason captured
- Delete attempt → prevented (or captured if allowed with reason)
- Audit trail entries not modifiable by any user
- Audit trail viewer: filter by date, user, action

Section 7: Instrument Interfaces (8 tests)
Section 8: Report Generation / CoA (10 tests)
Section 9: Stability Studies (8 tests)
Section 10: Environmental Monitoring (6 tests)
Section 11: System Administration (6 tests)
Section 12: Backup & Recovery (6 tests)

OQ EXECUTION RESULTS:
142 test cases. 137 PASSED. 5 DEVIATIONS:
- DEV-OQ-001: Audit trail did not capture "reason for change" on one specific field (CONFIG FIX, retested → PASS)
- DEV-OQ-002: CoA report showed wrong date format (DD/MM/YYYY instead of DD-MMM-YYYY) (CONFIG FIX → PASS)
- DEV-OQ-003: Session timeout was 20 minutes instead of specified 15 (CONFIG FIX → PASS)
- DEV-OQ-004: Empower interface timeout under high load (VENDOR PATCH applied → PASS)
- DEV-OQ-005: Stability study scheduling calculated day count incorrectly for leap years (VENDOR DEFECT → fix in v7.5.3, workaround documented, risk accepted by QA)

OQ CONCLUSION: All 142 tests pass after deviation resolution. One accepted risk (DEV-OQ-005) documented with approved workaround.

📝 DOCUMENTS PRODUCED: OQ Protocol (OQ-LIMS-2026-001), OQ Report (OQR-LIMS-2026-001), 5 Deviation Reports`
    },
    {
      id: "p7",
      title: "Phase 7: PQ — Performance Qualification",
      week: "Week 13-14",
      content: `PQ proves the system performs reliably in production with real data and real users.

PQ APPROACH:
Unlike IQ and OQ which test specific technical functions, PQ tests end-to-end business processes using representative production data. PQ is performed by actual QC analysts (not the validation team) to verify the system works in the hands of its intended users.

PQ SCENARIOS (8 end-to-end processes):

Scenario 1: Routine Batch Release
Register incoming sample → assign tests per product spec → enter analytical results (assay, dissolution, hardness, friability) → review results → approve → generate CoA → verify CoA content matches approved results

Scenario 2: OOS Investigation
Enter a deliberate OOS result → verify alert triggers → complete 4-phase investigation → document conclusion → close investigation → verify sample status updated

Scenario 3: Multi-User Concurrent Access
3 analysts working simultaneously on different samples → verify no data corruption, no cross-contamination of results, no performance degradation

Scenario 4: Instrument Interface
Run HPLC analysis in Empower → verify results automatically transfer to LIMS → verify transferred values match instrument output → verify audit trail captures transfer

Scenario 5: Stability Study
Create 12-month stability protocol → register initial samples → enter T=0 results → verify scheduling calculates correct pull dates → verify alerts for upcoming pulls

Scenario 6: Environmental Monitoring
Register EM samples by location → enter plate counts → verify limits checking → generate trending report

Scenario 7: Backup and Recovery
Initiate backup during active use → verify no data loss → simulate server failure → restore from backup → verify all data intact → verify audit trail continuity

Scenario 8: Year-End Rollover
Set system date to 31-Dec → register sample (ID should be QC-2026-NNNN) → advance to 01-Jan → register sample (ID should be QC-2027-0001)

PQ RESULTS:
8 scenarios executed. ALL PASSED. No deviations.
Performance baseline established: average response time 1.2 seconds, concurrent users tested: 8 simultaneous.

📝 DOCUMENTS PRODUCED: PQ Protocol (PQ-LIMS-2026-001), PQ Report (PQR-LIMS-2026-001)`
    },
    {
      id: "p8",
      title: "Phase 8: VSR, Go-Live & Operational Handover",
      week: "Week 14-16",
      content: `The Validation Summary Report is the final document — it concludes whether the system is validated and fit for use.

VALIDATION SUMMARY REPORT:

System: LabWare LIMS v7.5.2
Site: Pharmatech Ireland Ltd, Limerick
GAMP Classification: Category 4 + Category 5 (custom reports)
Risk Score: 55/75 (Medium-High)

QUALIFICATION SUMMARY:
| Phase | Tests | Passed | Failed | Deviations | Status |
|-------|-------|--------|--------|------------|--------|
| IQ    | 22    | 22     | 0      | 1 (closed) | PASSED |
| OQ    | 142   | 142    | 0      | 5 (4 closed, 1 accepted) | PASSED |
| PQ    | 8     | 8      | 0      | 0          | PASSED |

DEVIATIONS: 6 total. 5 closed with corrective action verified. 1 accepted risk (leap year calculation — workaround in place, vendor fix scheduled for v7.5.3).

OPEN CONDITIONS: One accepted risk requiring monitoring until vendor patch applied.

CONCLUSION: "The LabWare LIMS v7.5.2 system at Pharmatech Ireland has been validated in accordance with the approved Validation Plan VP-LIMS-2026-001. All qualification phases (IQ, OQ, PQ) have been completed satisfactorily. The system is considered VALIDATED and FIT FOR INTENDED USE, subject to the one documented accepted risk condition."

OPERATIONAL HANDOVER CHECKLIST:
✅ All SOPs approved and in document control
✅ All 28 users trained and training records on file
✅ Backup schedule operational and tested
✅ Disaster recovery plan approved
✅ Change control procedure in place
✅ Periodic review scheduled (annual — first review due March 2027)
✅ Support agreement with LabWare active (24/7 critical, 8-hour response)
✅ System added to site computerised systems inventory

GO-LIVE: System went live on schedule. First production sample registered Day 1.

📝 DOCUMENTS PRODUCED: Validation Summary Report (VSR-LIMS-2026-001), Operational Handover Checklist, Training Records`
    }
  ],

  keyLessons: [
    "The supplier audit reduced our OQ scope by ~30% — investing 2 days in auditing saved weeks of testing",
    "Generic test scripts kept our OQ protocol to 50 pages instead of 140+ — same assurance, less paper",
    "The RTM gap analysis caught 4 missing test cases BEFORE testing began — this is why traceability matters",
    "5 out of 6 deviations were configuration issues fixed in hours — proper testing finds these before go-live",
    "PQ was performed by actual users, not the validation team — this is what 'performance' qualification means",
    "The entire project took 16 weeks — validation was ~40% of the total project effort, which is typical for a well-managed project",
    "Total documentation: VP, URS, FRS, DS, RTM, RA, IQ protocol+report, OQ protocol+report, PQ protocol+report, VSR, 6 deviation reports, supplier audit report = 14 key documents"
  ]
};
