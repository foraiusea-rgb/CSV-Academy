// Irish Pharma Company Profiles + Scenario Quizzes

export const COMPANIES = [
  {name:"Pfizer Ireland",locations:"Ringaskiddy (Cork), Grange Castle (Dublin), Newbridge (Kildare)",products:"Biologics, small molecules, vaccines",systems:"SAP, MES (Syncade), LIMS (STARLIMS), SCADA, KNEAT",csvRoles:"CSV Engineer, Validation Lead, Computer Systems Quality",interviewStyle:"Technical depth + scenario-based. Expect GAMP 5 and Part 11 deep dives. Often use competency-based (STAR method).",tipFromInsiders:"Pfizer Grange Castle is one of the most advanced biopharma sites globally. They value CSA awareness and cloud validation experience."},
  {name:"Eli Lilly",locations:"Kinsale (Cork)",products:"Diabetes treatments (insulin), oncology",systems:"SAP, MES (Emerson), LIMS (LabWare), DeltaV DCS",csvRoles:"CSV Engineer, Validation Analyst, IT Quality",interviewStyle:"Structured competency interviews. Strong emphasis on data integrity and ALCOA+.",tipFromInsiders:"Kinsale site is expanding significantly. High demand for CSV engineers with LIMS and MES experience."},
  {name:"MSD (Merck)",locations:"Ballydine (Tipperary), Carlow, Brinny (Cork)",products:"Vaccines (including Gardasil), biologics",systems:"SAP, LIMS, MES (Werum PAS-X), OSIsoft PI Historian",csvRoles:"CSV Engineer, Validation Specialist, Digital Quality",interviewStyle:"Mix of technical and behavioural. Often include a case study exercise during interview.",tipFromInsiders:"MSD Ballydine is their largest manufacturing site outside the US. Strong focus on MES validation and digital transformation."},
  {name:"Johnson & Johnson",locations:"Limerick (DePuy Synthes), Cork (Janssen)",products:"Medical devices (Limerick), pharmaceuticals (Cork)",systems:"SAP, Trackwise QMS, various LIMS, SCADA",csvRoles:"Computer Systems Validation Engineer, Quality Systems Engineer",interviewStyle:"Values-based interview aligned to J&J Credo. Technical questions plus 'Our Credo' alignment.",tipFromInsiders:"J&J Limerick (DePuy) focuses on medical device software validation — slightly different regulations (21 CFR 820 vs 211)."},
  {name:"AbbVie",locations:"Sligo, Cork (Carrigtwohill)",products:"Biologics (Humira biosimilars), small molecules",systems:"SAP, LIMS, MES, ValGenesis VLMS",csvRoles:"CSV Engineer, Validation Lead, Computer Systems Quality Lead",interviewStyle:"Technical interviews with emphasis on risk-based validation and GAMP 5.",tipFromInsiders:"AbbVie Cork is a newer site with modern systems. Good opportunity for greenfield validation projects."},
  {name:"Regeneron",locations:"Limerick (Raheen Industrial Estate)",products:"Biologics, monoclonal antibodies",systems:"SAP, MES, LIMS, Emerson DeltaV",csvRoles:"Computer Validation Engineer, IT GxP Analyst",interviewStyle:"US-influenced culture. Strong technical interviews with data integrity focus.",tipFromInsiders:"Massive expansion in Limerick. Hiring aggressively for CSV roles. Relatively new site = lots of new system validations."},
  {name:"Takeda",locations:"Dunboyne (Meath), Bray (Wicklow)",products:"Rare diseases, plasma-derived therapies",systems:"SAP S/4HANA, MES, LIMS",csvRoles:"CSV Engineer, Quality Systems Specialist",interviewStyle:"Structured interviews with competency framework. Value patient-centric mindset.",tipFromInsiders:"Dunboyne is a state-of-the-art biologics facility. S/4HANA implementation = demand for SAP validation experience."},
  {name:"BMS (Bristol-Myers Squibb)",locations:"Cruiserath (Dublin), Blanchardstown",products:"Biologics, cell therapy",systems:"SAP, MES, LIMS, SCADA/DCS",csvRoles:"CSV Engineer, Validation Specialist",interviewStyle:"Technical depth expected. Emphasis on deviation handling and CAPA experience.",tipFromInsiders:"Cruiserath campus is expanding into cell therapy manufacturing — cutting-edge validation challenges."},
];

export const SCENARIO_QUIZZES = [
  {
    id:"sq1",
    scenario:"You arrive at your desk Monday morning and receive an urgent email: the QC Manager reports that the LIMS audit trail was found to be disabled for the 'Results Entry' table over the weekend. Approximately 40 batch results were entered during this period.",
    question:"What are your immediate actions, in order of priority?",
    options:[
      "Fix the audit trail configuration and continue as normal",
      "Quarantine affected batches, investigate root cause, assess data integrity, formal deviation, re-enable audit trail",
      "Report to the FDA immediately",
      "Delete the 40 results and ask analysts to re-enter them"
    ],
    correct:1,
    explanation:"This is a serious data integrity event. Priority order: (1) Re-enable audit trail immediately to prevent further unaudited entries. (2) Quarantine all batches with results entered during the gap — they cannot be released until data integrity is confirmed. (3) Investigate root cause — how was the audit trail disabled? Was it deliberate or accidental? Who had admin access? (4) Assess data integrity of the 40 results — compare against raw instrument data, check for anomalies, verify analyst identities. (5) Raise formal deviation with full investigation. (6) QA to determine if regulatory notification is required. Option A is insufficient — you can't ignore a data integrity gap. Option C is premature — investigate first. Option D would destroy evidence.",
    modules:["m5","m10"],
    difficulty:"Advanced"
  },
  {
    id:"sq2",
    scenario:"During OQ testing of a new MES system, you discover that the 'Electronic Batch Record' calculation for active ingredient weight incorrectly rounds to 1 decimal place instead of 2. The specification requires precision to 0.01g. The vendor says this is 'by design' and would require a code change to fix.",
    question:"How do you handle this?",
    options:[
      "Accept it as vendor design — it's close enough",
      "Raise as deviation, assess GxP impact, require vendor fix before go-live, retest after fix",
      "Change the specification to match the system",
      "Add a manual check step in the SOP to work around it"
    ],
    correct:1,
    explanation:"A calculation precision issue in an electronic batch record is a genuine defect that could affect product quality. The system must meet the specification, not the other way around. Raise a formal deviation (DEV-OQ-xxx), document the deficiency, assess the GxP impact (could a 0.05g rounding error affect product quality?), and require the vendor to provide a fix. The fix is Category 5 custom code — it needs its own requirements, design, code review, and testing before integration. Go-live should not proceed until this is resolved and retested. Option A compromises quality. Option C is backwards — requirements drive design, not vice versa. Option D is a workaround that adds human error risk.",
    modules:["m6","m9"],
    difficulty:"Advanced"
  },
  {
    id:"sq3",
    scenario:"Your company is implementing a new cloud-based QMS (Veeva Vault Quality). The vendor deploys updates every 3 weeks. Your QA director asks: 'How do we maintain validated state when the vendor changes the system every 3 weeks?'",
    question:"What is your recommended approach?",
    options:[
      "Refuse to use cloud systems — they can't be validated",
      "Validate once and ignore vendor updates",
      "Establish vendor change assessment process: review release notes, impact assess each update, regression test affected GxP functions, maintain validation documentation",
      "Let the vendor handle all validation since it's their system"
    ],
    correct:2,
    explanation:"Cloud/SaaS validation requires a continuous validation approach: (1) Establish a formal process for reviewing vendor release notes before each update. (2) Impact assess each release — categorise changes as affecting GxP functions or not. (3) For changes affecting GxP: regression test the affected functions using a pre-defined test suite. (4) Maintain updated validation documentation reflecting the current system state. (5) Include in your quality agreement with the vendor: advance notification of changes, release notes, option to defer non-critical updates, access to vendor testing evidence. This is the 'shared responsibility model' — the vendor validates their infrastructure and core product, you validate your configuration and assess each change.",
    modules:["m8","m11"],
    difficulty:"Mid"
  },
  {
    id:"sq4",
    scenario:"An HPRA inspector asks to see the periodic review for your LIMS. The last periodic review was completed 18 months ago (6 months overdue). There have been 3 changes, 2 incidents, and 1 user who left the company but still has an active account.",
    question:"What is the inspector likely to conclude?",
    options:[
      "This is fine — 18 months is close enough to annual",
      "Minor finding — just complete the review now",
      "Significant finding — overdue review suggests inadequate lifecycle management, active leaver account is a data integrity risk, incidents may not have been properly assessed",
      "Critical finding — the system should be shut down immediately"
    ],
    correct:2,
    explanation:"An overdue periodic review is a clear finding against Annex 11 Section 14. The active account for a departed employee violates access control requirements (Part 11 §11.10(d)) and raises data integrity concerns — could that account have been used by someone else? The 2 incidents may not have been assessed for their impact on validated state. The inspector will likely conclude that lifecycle management is inadequate, which undermines confidence in the validated state of the system. This is typically a 'major' observation requiring CAPA. The corrective action: complete the overdue review immediately, remove the leaver's access, investigate whether the leaver's account was used after departure, assess the incidents, and implement controls to prevent recurrence (e.g., automated alerts for overdue reviews, regular access reconciliation).",
    modules:["m7","m10"],
    difficulty:"Mid"
  },
  {
    id:"sq5",
    scenario:"You are writing a URS for a new SCADA system. The process engineer gives you this requirement: 'The system should monitor temperature properly and alert the operator if there's a problem.'",
    question:"Why is this a bad requirement and how would you fix it?",
    options:[
      "It's fine — it clearly states what's needed",
      "It's too short — just make it longer",
      "It's not testable — 'properly' and 'problem' are ambiguous. Rewrite with specific values, ranges, and response criteria",
      "It's a functional requirement, not a user requirement"
    ],
    correct:2,
    explanation:"This requirement fails the fundamental test of a URS requirement: it is not TESTABLE. What does 'properly' mean? What constitutes a 'problem'? A tester cannot objectively determine pass or fail against these criteria.\n\nRewritten properly:\nUR-015: The system shall monitor reactor temperature (TT-101) continuously with a sampling rate of ≤2 seconds.\nUR-016: The system shall display the current temperature value on the operator HMI with resolution of 0.1°C.\nUR-017: The system shall generate a HIGH alarm when temperature exceeds 39.0°C.\nUR-018: The system shall generate a LOW alarm when temperature drops below 35.0°C.\nUR-019: The system shall generate a HIGH-HIGH alarm (process interlock) when temperature exceeds 41.0°C, automatically closing the steam valve.\n\nEach of these can be objectively tested with specific input conditions and expected results.",
    modules:["m3","m6"],
    difficulty:"Entry"
  },
];
