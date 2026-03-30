// Module 1: Foundations of CSV
// Source: Stokes Ch.1-4, Andrews Ch.1, Wingate Ch.1-2, Andrews Foreword
// Target: 800-1500 words per lesson with embedded exercises

export const M1 = {
  id:"m1", title:"Foundations of CSV", icon:"🏛", color:"#4ECDC4",
  level:"Foundation", hours:4,
  bookRefs:["Stokes Ch.1-4","Andrews Ch.1 & Foreword","Wingate Ch.1-2"],
  overview: `This module establishes the fundamental understanding of what Computer System Validation is, why it exists, and how it fits into the pharmaceutical regulatory landscape. You will learn the business case for validation, understand the regulatory drivers, and be able to identify which systems require validation in a pharmaceutical manufacturing environment. By the end of this module, you should be able to explain CSV to a colleague, identify GxP-relevant systems, and understand the basic regulatory framework governing computerised systems in Ireland and globally.`,
  lessons: [
    {
      id:"m1l1",
      title:"What is Computer System Validation?",
      duration:"45 min",
      objectives: [
        "Define CSV in your own words",
        "Explain why CSV exists — the patient safety argument",
        "Understand the relationship between validation and qualification",
        "Identify the key stakeholders in a CSV program"
      ],
      content: `Computer System Validation (CSV) is a documented process used to provide a high degree of assurance that a computerised system consistently performs according to pre-determined specifications and quality attributes. In simpler terms, it is the systematic proof that a computer system does what it is supposed to do, reliably and repeatedly.

But that definition alone does not capture why CSV matters so profoundly in the pharmaceutical industry. To understand that, you need to think about what happens when computerised systems fail in pharma.

THE PATIENT SAFETY ARGUMENT

Consider a Laboratory Information Management System (LIMS) at a pharmaceutical manufacturing site in Cork. This system receives analytical test results from HPLC instruments, compares those results against product specifications, and generates Certificates of Analysis that accompany every batch of medicine shipped to patients. If this system has a calculation error — perhaps it truncates a decimal point, or applies the wrong specification limit — the consequence is not a software bug report. The consequence is potentially unsafe medicine reaching patients.

This is why CSV exists. It is not bureaucracy for its own sake. It is the mechanism by which the pharmaceutical industry proves that the computerised systems controlling, monitoring, and documenting the manufacture of medicines can be trusted.

As John Andrews notes in the introduction to "Validating Pharmaceutical Systems," computer validation has come a long way since the early 1990s, when convincing project managers that validation should be involved from the beginning of a project — rather than bolted on at the end — was a major battle. Today, nobody questions the principle. The challenge now is doing it well, pragmatically, and cost-effectively.

VALIDATION vs QUALIFICATION — UNDERSTANDING THE DIFFERENCE

These two terms are frequently confused, even by experienced professionals. Here is the distinction:

Qualification focuses on individual equipment or infrastructure components. When you qualify a server, you are confirming that this specific piece of hardware has been installed correctly and operates within its specifications.

Validation encompasses the end-to-end process, including the software, its configuration, its impact on data, and its role in business processes. When you validate a LIMS, you are proving that the entire system — hardware, software, configuration, interfaces, procedures, and trained users — collectively produces reliable results that support product quality decisions.

Think of it this way: you qualify the building blocks (hardware, infrastructure), but you validate the system as a whole, including how people use it.

THE EVOLUTION OF CSV

The concept of validating computerised systems in pharma emerged in the 1980s, driven by the U.S. FDA's recognition that computers were increasingly controlling critical manufacturing processes. Key milestones include:

1983: The FDA published its "Blue Book" — the Guide to Inspection of Computerised Systems in Drug Processing. This was the first formal recognition that computerised systems needed special regulatory attention.

1991: The first GAMP Guide was published by pharmaceutical industry volunteers in the UK, establishing a framework for validating automated systems.

1997: The FDA published 21 CFR Part 11, governing electronic records and electronic signatures. This was a watershed moment — it formalised the requirements for trusting electronic data.

2001: GAMP 4 was published, significantly expanding the framework and introducing the software categorisation system still used today.

2003: The FDA issued guidance narrowing the scope of Part 11, promoting a risk-based approach rather than blanket compliance.

2022: GAMP 5 Second Edition was published, modernising guidance for cloud computing, AI/ML, and Agile development methods.

2025: The FDA finalised its Computer Software Assurance (CSA) guidance, shifting emphasis from documentation-heavy approaches toward risk-based testing that adds genuine value.

KEY STAKEHOLDERS IN A CSV PROGRAM

In any pharmaceutical organisation, CSV involves multiple stakeholders with distinct responsibilities:

The Process Owner is typically the business leader whose department uses the system. They own the user requirements and are accountable for the system's fitness for purpose. In a QC laboratory, this might be the QC Director.

The System Owner is responsible for the day-to-day operation, maintenance, and support of the system. This is often someone in the IT department.

Quality Assurance provides independent oversight of the validation process. They review and approve validation documentation, ensuring regulatory requirements are met. They do not perform the validation themselves — they assure it was done properly.

The CSV Engineer (or Validation Engineer) is the person who plans, executes, and documents the validation activities. This is likely the role your friend is targeting. They work at the intersection of IT, quality, and the business.

The Supplier provides the software and may also provide implementation services. The quality of their development process directly affects how much validation effort the user company must invest.

🇮🇪 IRELAND CONTEXT

Ireland has one of the highest concentrations of pharmaceutical manufacturing in the world. The Health Products Regulatory Authority (HPRA) is Ireland's national competent authority for pharmaceutical regulation. The HPRA inspects against EU GMP Annex 11 as the primary regulation for computerised systems, but because most Irish pharma sites manufacture for the US market, they also comply with FDA 21 CFR Part 11.

Major pharmaceutical employers in Ireland include Pfizer (Ringaskiddy, Grange Castle, Newbridge), Eli Lilly (Kinsale), MSD (Ballydine, Carlow), Johnson & Johnson (Limerick, Cork), AbbVie (Sligo, Cork), Alexion/AstraZeneca (Dublin), Regeneron (Limerick), Takeda (Dunboyne), BMS (Cruiserath), and Amgen (Dublin). Contract service providers like PharmaLex, DPS Group, PM Group, Jacobs, and Accenture also employ CSV professionals extensively.`,

      exercise: {
        type: "reflection",
        title: "Identify Systems in a Pharma Site",
        instructions: `Imagine you are walking through a pharmaceutical tablet manufacturing site. For each area listed below, identify at least one computerised system that would likely require CSV validation and explain why it impacts patient safety or product quality.

1. Raw Material Warehouse
2. Dispensing Suite  
3. Granulation/Compression Area
4. Quality Control Laboratory
5. Packaging Line
6. Shipping/Distribution

Write your answers in the notes section, then check against the model answers.`,
        modelAnswer: `1. Warehouse Management System (WMS) — controls material receipt, storage location, expiry tracking. Wrong material dispensed = wrong product.
2. Electronic Dispensing System — weighs and records raw material quantities. Incorrect weight = incorrect formulation.
3. SCADA/DCS — controls process parameters (temperature, pressure, speed). Wrong parameters = out-of-spec product.
4. LIMS — manages test results, specifications, Certificates of Analysis. Incorrect result = potentially unsafe product released.
5. Serialisation System — applies unique identifiers for track-and-trace. Failure = product cannot be verified as authentic.
6. ERP (SAP) — manages batch release, shipping, distribution records. Incorrect release = recalled product in market.`
      },

      keyTerms: ["CSV","Qualification","Validation","GxP","HPRA","Process Owner","System Owner"],
      
      checkpoints: [
        "Can you explain CSV in one sentence to a non-technical person?",
        "Do you understand the difference between validation and qualification?",
        "Can you name 3 types of computerised systems that require CSV in pharma?",
        "Do you know what HPRA stands for and its role?"
      ]
    },

    {
      id:"m1l2",
      title:"Why Do We Validate? — The Business Case",
      duration:"40 min",
      objectives: [
        "Articulate the 4 reasons for validation (per Stokes)",
        "Understand the cost-benefit argument for proper testing",
        "Recognise the consequences of inadequate validation",
        "Challenge the 'one-size-fits-all' mentality"
      ],
      content: `David Stokes dedicates an entire chapter of "Testing Computer Systems for FDA/MHRA Compliance" to answering the question "Why do we test?" His analysis reveals four common answers — but only two of them are actually good reasons.

REASON 1: "BECAUSE THE REGULATORS REQUIRE US TO"

Testing is indeed a fundamental requirement for achieving and maintaining regulatory compliance. The regulations — 21 CFR Part 11, EU GMP Annex 11, and supporting guidance documents like GAMP 5 — all require that computerised systems be validated. However, while these regulations define the need to test, they do not prescribe in detail how testing should be conducted.

The consequence of failing to validate is severe. During a regulatory inspection, inadequate validation can lead to Form 483 observations (in the US), warning letters, import alerts, product recalls, and even facility shutdowns. For an Irish site manufacturing for the US market, an FDA warning letter can mean products are placed on import alert — effectively shutting down that revenue stream until the issues are resolved.

But here is the critical point: "because regulators require it" is a necessary reason but not a sufficient one. If regulatory compliance were the only reason to test, then industries not subject to regulation would never test their software — which is obviously not the case.

REASON 2: "BECAUSE THE QA DEPARTMENT REQUIRES US TO"

In many organisations, the Quality Assurance department defines the need for and approach to computer systems testing. At its best, this means QA provides proactive, supportive oversight that helps project teams deliver compliant systems efficiently.

However, Stokes warns of a dangerous pattern: when testing happens only because "QA says we must," without the wider organisation understanding why. This creates an adversarial dynamic where QA is seen as a roadblock rather than a partner. Worse, it can lead to situations where IT and QA have incompatible standards, and the testing approach is driven by political dynamics rather than genuine risk.

The organisations that conduct the most appropriate and pragmatic level of testing are those where IT and QA work hand-in-hand. Where they work in opposition, testing becomes either excessive (wasting resources) or insufficient (risking compliance).

REASON 3: "BECAUSE WE'VE ALWAYS DONE IT THIS WAY"

This is perhaps the most damaging answer. Many organisations apply a single standard of testing to every system, regardless of complexity or risk. But as Stokes points out, one standard cannot be appropriately applied to systems that range from a global Enterprise Resource Planning system managing the entire supply chain to a small Excel spreadsheet calculating tablet hardness averages.

A scaleable, cost-effective, and risk-based approach must be taken. This principle is at the heart of modern CSV practice and is the foundation of both GAMP 5 and the FDA's CSA guidance. It means that a Category 5 custom-built application controlling critical process parameters receives far more rigorous validation than a Category 3 off-the-shelf word processor.

REASON 4: "BECAUSE IT SAVES MONEY"

This is the answer that senior management needs to hear, and it is the most compelling business justification for proper testing. Stokes is emphatic on this point: it is more cost-effective to go live with systems that are known to function correctly than to discover problems after deployment.

Most people who have been involved with projects where testing was insufficient know that problems only exposed after go-live are the most time-consuming and most expensive to correct. The costs include:

Direct costs: Emergency fixes, consultant fees for remediation, retesting, additional documentation.

Operational costs: Workarounds that reduce efficiency, manual processes replacing automated ones, overtime for staff dealing with system issues.

Compliance costs: Deviation investigations, CAPA implementation, potential regulatory action.

Opportunity costs: Delayed product launches, reduced manufacturing capacity, diverted resources from other projects.

In many organisations, there is political pressure to implement systems in unrealistic timescales and at the lowest possible capital cost. This often leads to a culture where testing is minimised to reduce project timescales and implementation costs. Although this may succeed in delivering a system on time, the real effect is to increase the total cost of ownership — though this increased cost is often hidden on operational or support budgets rather than the original project budget.

When a system is appropriately tested, it is more likely to operate correctly from go-live. This improves user confidence and acceptance of the system. It operates more reliably and costs less to maintain and support.

THE COST OF GETTING IT WRONG — REAL EXAMPLES

The pharmaceutical industry has numerous examples of costly compliance failures related to computerised systems:

Data integrity violations discovered during FDA inspections have resulted in consent decrees costing companies hundreds of millions of dollars in remediation costs, plus ongoing monitoring by independent consultants.

Manufacturing sites have been placed on import alert after inspectors found inadequate computerised system validation, effectively halting product supply to the US market.

Complete revalidation programs, triggered by findings that original validation was inadequate, have cost organisations millions and taken years to complete.

THE KEY TAKEAWAY

Proper validation is not a tax on projects. It is an investment that pays for itself through reduced operational costs, fewer compliance issues, and faster, more reliable system deployment. The challenge — and the skill of a good CSV engineer — is determining the right amount of testing for each system based on risk.`,

      exercise: {
        type: "scenario",
        title: "The Business Case Presentation",
        instructions: `Your project manager wants to skip the OQ phase for a new LIMS installation to meet the go-live deadline. They argue: "The vendor already tested it at the factory. Why do we need to test it again?"

Draft a 3-paragraph response that:
1. Acknowledges the time pressure
2. Explains why OQ is still necessary (use at least 2 specific technical reasons)
3. Proposes a pragmatic compromise that addresses the timeline concern

Write your response in the notes section.`,
        modelAnswer: `1. "I understand we're under pressure to meet the go-live date, and I want to help us find a way to do that without creating bigger problems down the road."

2. "The vendor's FAT tested their standard configuration in their controlled environment. Our OQ needs to confirm that our specific configuration — our custom workflows, our instrument interfaces, our user access matrix, and our specification limits — functions correctly in our production environment on our network. The vendor can't test these because they're unique to our site. Additionally, the system may have been affected during shipping and installation. Without OQ, we have no documented evidence that the system works correctly in situ, which is exactly what an HPRA inspector would ask for."

3. "What I can do is work with the vendor to leverage their FAT documentation where it overlaps with our OQ scope — this could reduce our OQ testing by 30-40%. I can also prioritise testing of the highest-risk functions (results entry, calculations, OOS workflow) and use a lighter touch on lower-risk administrative functions. This risk-based approach is aligned with GAMP 5 principles and should let us complete OQ within the timeline while still maintaining compliance."`
      },

      keyTerms: ["Risk-based approach","Cost of compliance failure","Form 483","Warning letter","Total cost of ownership"],

      checkpoints: [
        "Can you articulate the 4 reasons for testing and explain which are strongest?",
        "Could you make the business case for validation to a sceptical project manager?",
        "Do you understand why 'one-size-fits-all' testing is inappropriate?",
        "Can you give an example of how inadequate validation costs more in the long run?"
      ]
    },

    {
      id:"m1l3",
      title:"The Regulatory Landscape — What Drives CSV?",
      duration:"50 min",
      objectives: [
        "Identify the key regulations governing computerised systems",
        "Understand the hierarchy: laws → regulations → guidance → industry standards",
        "Explain how GxP requirements translate to CSV requirements",
        "Know which regulations are most relevant for Ireland-based roles"
      ],
      content: `To work as a CSV professional, you must understand the regulatory framework that drives everything you do. This is not about memorising regulation numbers — it is about understanding the intent behind the regulations and how they translate into practical requirements for computerised systems.

THE REGULATORY HIERARCHY

Understanding the hierarchy of regulatory documents is essential because it determines how much flexibility you have:

Laws (Acts of Parliament/Congress): These are the highest level. In the US, the Federal Food, Drug, and Cosmetic Act gives the FDA its authority. In the EU, Directive 2001/83/EC and Regulation 726/2004 establish the pharmaceutical regulatory framework. These rarely change.

Regulations: These have the force of law. In the US, the Code of Federal Regulations (CFR) Title 21 contains all FDA regulations. 21 CFR Part 11 (electronic records and signatures), 21 CFR Parts 210/211 (GMP for drugs), and 21 CFR Part 820 (quality system regulation for medical devices) are the most relevant for CSV. In the EU, EudraLex Volume 4 contains the GMP guidelines including Annex 11 on computerised systems. These change slowly, through formal rulemaking processes.

Regulatory Guidance: These represent the regulators' current thinking on how to comply with the regulations. They are not legally binding but are extremely influential. Examples include the FDA's guidance on "Part 11, Electronic Records; Electronic Signatures — Scope and Application" (2003) and the FDA's Data Integrity guidance (2018). Ignoring guidance is risky because inspectors use it as their reference.

Industry Standards and Guides: These are produced by industry groups and represent best practice. GAMP 5 is the most prominent example — published by ISPE, it is not legally binding but is referenced and respected by virtually every regulatory agency worldwide. ICH Q9 (Quality Risk Management) provides the risk management framework that underpins modern CSV approaches.

GxP — THE UMBRELLA TERM

GxP stands for "Good x Practice" where x represents the specific domain:

GMP (Good Manufacturing Practice): The most commonly encountered in CSV. Governs the manufacture, testing, and quality assurance of pharmaceutical products. Defined in 21 CFR Parts 210/211 (US) and EudraLex Volume 4 (EU). Any computerised system that supports or controls a GMP activity requires validation.

GLP (Good Laboratory Practice): Governs non-clinical safety studies — the preclinical testing of drug compounds on animals or in vitro. Defined in 21 CFR Part 58 (US) and OECD GLP Principles (international). Laboratory instruments and data management systems used in GLP studies require validation, but the approach differs from GMP because, as Andrews notes, in GLP the "product" of the scientists' work is data, not a physical drug product.

GCP (Good Clinical Practice): Governs the conduct of clinical trials on human subjects. Defined in ICH E6(R2). Clinical data management systems, electronic data capture (EDC) systems, and interactive response technology (IRT) require validation under GCP.

GDP (Good Distribution Practice): Governs the storage and distribution of pharmaceutical products. Temperature monitoring systems, warehouse management systems, and track-and-trace systems used in distribution require validation.

THE KEY REGULATIONS FOR CSV

For an Irish CSV engineer, these are the documents you must know intimately:

21 CFR Part 11 — Electronic Records; Electronic Signatures: Published in 1997, this FDA regulation establishes the criteria for trustworthy electronic records and signatures. It applies whenever a company keeps FDA-required records electronically. Key requirements include system validation, audit trails, access controls, and electronic signature controls. We will cover Part 11 in depth in Module 2.

EU GMP Annex 11 — Computerised Systems: This is Ireland's primary regulation for computerised systems in pharmaceutical manufacturing. It covers the full system lifecycle from risk management through operation and retirement. A draft revision is expected to expand Annex 11 significantly, adding requirements for cybersecurity, integration with the pharmaceutical quality system, and enhanced data handling requirements.

GAMP 5 — Good Automated Manufacturing Practice: Published by ISPE, this is the most widely used framework for planning and executing CSV. It provides a risk-based lifecycle approach with software categorisation (Categories 1, 3, 4, 5) that determines the appropriate level of validation effort. The 2nd Edition (2022) includes guidance on cloud computing, AI/ML, and Agile development.

ICH Q9 — Quality Risk Management: This harmonised guideline provides the philosophical foundation for risk-based validation. It establishes that the effort invested in managing risk should be proportionate to the level of risk itself.

PIC/S PI 011 — Good Practices for Computerised Systems in Regulated GxP Environments: Published by the Pharmaceutical Inspection Co-operation Scheme, this guidance is increasingly referenced by European inspectors.

THE CONCEPT OF PREDICATE RULES

One of the most important concepts in understanding Part 11 is the "predicate rule." A predicate rule is any existing FDA regulation that requires you to maintain records. For example:

21 CFR Part 211 (GMP) requires you to maintain batch production records. This is the predicate rule. If you choose to maintain those batch records electronically (for example, in an MES system), then Part 11 applies on top of the GMP requirement. Part 11 does not create new record-keeping requirements — it adds electronic-specific requirements (validation, audit trails, access controls, e-signatures) on top of whatever the predicate rule already requires.

This distinction matters because it determines scope. If a system does not maintain records required by a predicate rule, Part 11 does not apply to it. This is why a risk-based GxP assessment is the first step in any CSV project — you need to determine whether the system is subject to GxP requirements before you can determine what validation is needed.

🇮🇪 THE IRISH REGULATORY CONTEXT

Ireland occupies a unique position in the pharmaceutical regulatory landscape. As an EU member state, the primary regulatory framework is European — EU GMP, including Annex 11, is enforced by the HPRA. However, because Ireland is one of the world's largest exporters of pharmaceutical products, with the majority destined for the US market, most Irish manufacturing sites also maintain compliance with FDA regulations including 21 CFR Part 11.

This dual compliance requirement means Irish CSV professionals need to understand both frameworks and, critically, how they differ. The good news is that there is substantial overlap — a system validated to meet both Annex 11 and Part 11 requirements will generally satisfy both regulators. The challenge is understanding the specific areas where they diverge, particularly around electronic signature requirements and periodic review expectations.`,

      exercise: {
        type: "classification",
        title: "Regulatory Document Classification",
        instructions: `Classify each of the following documents into the correct level of the regulatory hierarchy (Law, Regulation, Guidance, or Industry Standard). Then identify which GxP domain it primarily relates to (GMP, GLP, GCP, or General).

1. 21 CFR Part 11
2. GAMP 5 (2nd Edition)
3. EU Directive 2001/83/EC
4. FDA Data Integrity Guidance (2018)
5. ICH Q9
6. EudraLex Volume 4, Annex 11
7. PIC/S PI 011
8. 21 CFR Parts 210/211`,
        modelAnswer: `1. 21 CFR Part 11 → Regulation / General (applies to all GxP)
2. GAMP 5 → Industry Standard / General
3. EU Directive 2001/83/EC → Law / GMP
4. FDA Data Integrity Guidance → Guidance / GMP
5. ICH Q9 → Industry Standard (harmonised guidance) / General
6. EudraLex Vol 4, Annex 11 → Regulation / GMP
7. PIC/S PI 011 → Guidance / General
8. 21 CFR Parts 210/211 → Regulation / GMP`
      },

      keyTerms: ["Predicate rule","GMP","GLP","GCP","GDP","21 CFR Part 11","EU Annex 11","GAMP 5","ICH Q9","PIC/S"],

      checkpoints: [
        "Can you explain the difference between a regulation and a guidance document?",
        "Do you know what a predicate rule is and why it matters?",
        "Can you list the 4 main GxP domains?",
        "Which regulations are most important for an Irish CSV engineer?"
      ]
    },

    {
      id:"m1l4",
      title:"Computerised Systems in Pharma — What Needs Validating?",
      duration:"45 min",
      objectives: [
        "Identify the major categories of computerised systems in pharma",
        "Understand GAMP software categories at a high level",
        "Determine which systems require validation based on GxP impact",
        "Recognise common systems you will encounter in Irish pharma sites"
      ],
      content: `Now that you understand what CSV is and why it exists, the practical question is: which systems actually need validating? The answer begins with a fundamental principle: any computerised system that has the potential to impact patient safety, product quality, or data integrity requires some level of validation. The key word is "potential" — even if a system is functioning perfectly today, if it could affect GxP data or processes, it needs to be validated.

THE GxP IMPACT ASSESSMENT

Before any validation work begins, the first question to answer is: does this system have a GxP impact? This assessment is typically documented and involves asking three core questions:

1. Does the system directly or indirectly affect patient safety?
2. Does the system impact product quality?
3. Does the system create, process, store, or report GxP-regulated data?

If the answer to any of these is yes, the system requires validation. The extent of validation depends on the system's complexity, the risk it poses, and its software category under GAMP 5. If the answer to all three is no, the assessment is documented and no validation is required — but the assessment itself must still be performed and retained.

CATEGORIES OF COMPUTERISED SYSTEMS

In a typical pharmaceutical manufacturing site, you will encounter the following categories of systems. Understanding what each does is essential for a CSV engineer because you need to understand the business process before you can validate the system that supports it.

PROCESS CONTROL SYSTEMS

SCADA (Supervisory Control and Data Acquisition): These systems monitor and control manufacturing processes in real time. A SCADA system at a biopharmaceutical site might monitor fermentation temperatures, control agitation speeds, and record pH values throughout a 14-day cell culture process. The data generated is GxP-critical because it proves the product was manufactured within validated parameters.

PLC (Programmable Logic Controller): These are industrial computers that directly control process equipment — opening valves, starting motors, controlling temperatures. They execute control logic and interface with sensors and actuators. PLCs are typically Category 3 or 4 under GAMP depending on how much custom logic they contain.

DCS (Distributed Control System): Similar to SCADA but typically used for larger, more complex continuous processes. Common in API (Active Pharmaceutical Ingredient) manufacturing facilities.

BMS (Building Management System): Controls and monitors environmental conditions — temperature, humidity, pressure differentials — in manufacturing areas, warehouses, and laboratories. GxP-critical where environmental conditions affect product quality (clean rooms, stability chambers, cold storage).

BUSINESS AND ENTERPRISE SYSTEMS

ERP (Enterprise Resource Planning): Systems like SAP that manage the entire business — materials management, production planning, quality management, warehouse management, financial accounting. In pharma, the GxP-relevant modules are typically QM (Quality Management), PP (Production Planning), MM (Materials Management), and WM (Warehouse Management). An ERP system is typically GAMP Category 4, with possible Category 5 elements for custom reports or interfaces (such as ABAP custom code in SAP).

MES (Manufacturing Execution System): Sits between the ERP and the shop floor control systems. Manages electronic batch records, enforces recipes and work instructions, tracks materials and equipment, and records in-process data. Systems like Emerson Syncade, Siemens Opcenter, or Honeywell MES are common in Irish pharma. MES is typically Category 4 with Category 5 elements.

LABORATORY SYSTEMS

LIMS (Laboratory Information Management System): Manages the complete laboratory workflow — sample registration, test assignment, results entry, specification checking, approval workflows, Certificate of Analysis generation, and stability study management. Common LIMS products include LabWare, STARLIMS, and SampleManager. GAMP Category 4.

CDS (Chromatography Data System): Controls chromatographic instruments (HPLC, GC) and processes the resulting data. Systems like Empower (Waters) and OpenLab (Agilent). These are particularly sensitive from a data integrity perspective because they generate the raw analytical data used for batch release decisions.

QUALITY AND DOCUMENT MANAGEMENT

QMS (Quality Management System): Manages deviations, CAPAs, change controls, complaints, audits, and training records. Systems like TrackWise, Veeva Vault Quality, or MasterControl.

EDMS/DMS (Electronic Document Management System): Controls the lifecycle of SOPs, specifications, and other quality documents — authoring, review, approval, distribution, and retirement.

VALIDATION LIFECYCLE MANAGEMENT

KNEAT: An Irish company based in Limerick, KNEAT provides a cloud-based platform for paperless validation execution. Instead of paper-based qualification protocols, test steps are executed digitally with electronic evidence attachment and e-signature workflows. Experience with KNEAT is highly valued in Irish pharma.

ValGenesis VLMS: Another Irish company (Dublin), ValGenesis provides a Validation Lifecycle Management System that manages the entire validation program — planning, risk assessment, requirements traceability, protocol management, and periodic review.

GAMP SOFTWARE CATEGORIES — A PREVIEW

You will learn GAMP 5 categories in detail in Module 3, but here is a preview of how systems are classified and what it means for validation effort:

Category 1 (Infrastructure): Operating systems, databases, network infrastructure. Minimal validation — document version, verify installation.

Category 3 (Non-configurable): Off-the-shelf software used as-is without configuration. Verify it is fit for intended use.

Category 4 (Configurable): Software configured for your specific use but without source code changes. This is where most pharma systems fall — LIMS, ERP, SCADA, QMS. Validate the configuration and configured functions.

Category 5 (Custom): Software developed specifically for you, or heavily customised existing software. Full lifecycle validation including specification, design, code review, and exhaustive testing. Highest effort.

The critical insight is that a single system often contains components from multiple categories. A LIMS installation includes Category 1 (the operating system and database), Category 4 (the configured LIMS application), and possibly Category 5 (custom reports or interfaces). The validation strategy must address each component appropriately.

WHAT DOES NOT NEED VALIDATION?

Not every computer in a pharmaceutical company requires CSV. Systems that have no GxP impact — such as the office email system, the corporate intranet, or a time-and-attendance system — do not require CSV. However, the decision not to validate must be documented through a GxP impact assessment. You cannot simply assume a system has no GxP impact; you must demonstrate it.

There are also grey areas. Microsoft Excel is used extensively in pharma and can range from non-GxP (a project budget tracker) to highly GxP-critical (a spreadsheet calculating drug potency results). The GxP impact assessment determines whether validation is needed for each specific use.`,

      exercise: {
        type: "system-mapping",
        title: "Map Systems to a Pharma Site",
        instructions: `You have just started as a CSV Engineer at a tablet manufacturing site in Ireland. During your first week, you are asked to help update the computerised systems inventory. For each system below, determine:

A) The GAMP software category (1, 3, 4, or 5)
B) Whether it likely requires CSV validation (Yes/No)
C) The primary GxP impact (Patient Safety / Product Quality / Data Integrity / None)

1. Windows Server 2022 hosting the LIMS database
2. LabWare LIMS configured for QC testing workflows
3. Custom Python script that extracts data from LIMS and generates trending reports
4. Microsoft Outlook email client
5. SAP QM module configured for batch disposition
6. Allen-Bradley PLC controlling tablet press compression force
7. Empower CDS controlling 6 HPLC instruments
8. Microsoft Excel spreadsheet used to calculate blend uniformity results
9. Corporate intranet (SharePoint) used for company news
10. KNEAT Gx used for paperless validation execution`,
        modelAnswer: `1. Windows Server 2022 → Cat 1 / Yes (infrastructure for GxP system) / Data Integrity
2. LabWare LIMS → Cat 4 / Yes / Patient Safety + Product Quality + Data Integrity
3. Custom Python script → Cat 5 / Yes (processes GxP data) / Data Integrity
4. Microsoft Outlook → Cat 3 / No (no GxP impact) / None
5. SAP QM → Cat 4 / Yes / Product Quality + Data Integrity
6. Allen-Bradley PLC → Cat 3 or 4 (depends on custom logic) / Yes / Product Quality
7. Empower CDS → Cat 4 / Yes / Data Integrity + Product Quality
8. Excel for blend uniformity → Cat 3 + Cat 5 (formulas) / Yes / Product Quality + Data Integrity
9. SharePoint intranet → Cat 4 / No (no GxP impact) / None
10. KNEAT Gx → Cat 4 / Yes (manages GxP validation records) / Data Integrity`
      },

      keyTerms: ["GxP Impact Assessment","LIMS","SCADA","PLC","DCS","MES","ERP","CDS","QMS","EDMS","KNEAT","ValGenesis","BMS"],

      checkpoints: [
        "Can you name at least 8 types of computerised systems in pharma?",
        "Do you understand why the GxP impact assessment is the first step?",
        "Can you explain why Excel might or might not need validation?",
        "Do you know what KNEAT and ValGenesis are and why they matter in Ireland?"
      ]
    }
  ]
};
