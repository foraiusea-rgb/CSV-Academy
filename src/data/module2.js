// Module 2: Regulatory Framework
// Source: Wingate Ch.16, Andrews Ch.1-2,14, 21 CFR Part 11, EU Annex 11
export const M2 = {
  id:"m2", title:"Regulatory Framework", icon:"📜", color:"#7C3AED",
  level:"Foundation", hours:4,
  bookRefs:["Wingate Ch.16","Andrews Ch.1-2,14","21 CFR Part 11","EU Annex 11"],
  overview:"This module covers the two most important regulations for computerised systems in pharma: FDA 21 CFR Part 11 (electronic records and signatures) and EU GMP Annex 11 (computerised systems). Understanding both is essential for any CSV role in Ireland, where companies must comply with both US and EU requirements.",
  lessons:[
    {
      id:"m2l1", title:"21 CFR Part 11 — Electronic Records & Signatures",
      duration:"55 min",
      objectives:["Explain the structure and scope of Part 11","List all 11 technical controls in §11.10","Understand electronic signature requirements in detail","Explain what a predicate rule is and why it matters","Describe how the 2003 FDA guidance changed Part 11 enforcement"],
      content:`21 CFR Part 11 was published by the FDA on March 20, 1997, and became effective on August 20, 1997. It establishes the criteria under which the FDA considers electronic records, electronic signatures, and handwritten signatures executed to electronic records to be trustworthy, reliable, and generally equivalent to paper records and handwritten signatures.

For a CSV engineer, Part 11 is one of the two regulations you will reference every single day. Understanding it deeply — not just the headlines, but the specific controls and their practical implications — is what separates a competent CSV professional from someone who has merely read about it.

THE STRUCTURE OF PART 11

Part 11 is organised into three subparts:

Subpart A — General Provisions (§11.1-11.3): Defines the scope of the regulation and key definitions. Part 11 applies to records in electronic form that are created, modified, maintained, archived, retrieved, or transmitted under any records requirements set forth in FDA regulations — also known as "predicate rules."

The concept of predicate rules is critically important and frequently misunderstood. A predicate rule is any existing FDA regulation that requires you to maintain records. For example, 21 CFR Part 211 (GMP for drugs) requires you to maintain batch production records. This GMP requirement is the predicate rule. If you choose to maintain those batch records electronically — in an MES system, for example — then Part 11 applies ON TOP of the GMP requirement. Part 11 does not create new record-keeping requirements. It adds electronic-specific requirements on top of whatever the predicate rule already requires.

This distinction is crucial for scoping validation projects. If a system does not maintain records required by a predicate rule, Part 11 does not apply to it. This is why the GxP impact assessment — determining whether a system is subject to GxP requirements — is always the first step in any CSV project.

Subpart B — Electronic Records (§11.10-11.70): This is the section that CSV engineers work with most frequently. Section 11.10 lists the controls that must be implemented for closed systems (systems where access is controlled by the organisation responsible for the content):

(a) VALIDATION — Systems must be validated to ensure accuracy, reliability, consistent intended performance, and the ability to discern invalid or altered records. This is the regulatory basis for CSV itself.

(b) READABLE COPIES — The system must be able to generate accurate and complete copies of records in both human-readable and electronic form suitable for inspection, review, and copying by the FDA.

(c) RECORD PROTECTION — Records must be protected to enable their accurate and ready retrieval throughout the records retention period. This means backup, disaster recovery, and media migration over time.

(d) ACCESS CONTROLS — System access must be limited to authorised individuals. This requires unique user IDs, role-based access profiles, and procedures for granting, modifying, and revoking access.

(e) AUDIT TRAILS — This is arguably the most inspected control. The regulation requires secure, computer-generated, time-stamped audit trails to independently record the date and time of operator entries and actions that create, modify, or delete electronic records. Critically, record changes shall not obscure previously recorded information. The audit trail must be retained for a period at least as long as that required for the subject electronic records. In practice, this means: every GxP data change must be logged with who, what, when, and why. The original value must remain visible. Users cannot delete or modify audit trail entries.

(f) OPERATIONAL CHECKS — The system must enforce permitted sequencing of steps and events, as appropriate. For example, a LIMS should not allow results to be approved before they are entered, or a batch to be released before all tests are complete.

(g) AUTHORITY CHECKS — Only authorised individuals should be able to use the system, electronically sign a record, access the operation or device, alter a record, or perform the operation at hand. This links to access control but specifically addresses the authorisation to perform specific actions.

(h) DEVICE CHECKS — The system must determine, as appropriate, the validity of the source of data input or operational instruction. This addresses instrument interfaces and automated data capture.

(i) TRAINING — Persons who develop, maintain, or use electronic record/electronic signature systems must have the education, training, and experience to perform their assigned tasks. This is a regulatory requirement for documented, role-based training.

(j) WRITTEN POLICIES — The organisation must establish and adhere to written policies that hold individuals accountable and responsible for actions initiated under their electronic signatures, in order to deter record and signature falsification.

(k) DOCUMENTATION CONTROLS — Adequate controls must exist over the distribution of, access to, and use of documentation for system operation and maintenance.

Section 11.30 addresses OPEN SYSTEMS — systems where access is not controlled by the organisation responsible for the content (such as cloud-based systems accessed over the internet). Open systems must meet all closed system requirements plus additional measures such as document encryption and digital signatures.

Subpart C — Electronic Signatures (§11.50-11.200): Requires that each electronic signature be unique to one individual and not reused by or reassigned to anyone else. Non-biometric electronic signatures must employ at least two distinct identification components — typically a user ID and a password.

The regulation specifies that electronic signatures must include: the printed name of the signer, the date and time when the signature was executed, and the meaning (such as review, approval, responsibility, or authorship) associated with the signature. These three elements must be included in any human-readable display of the signed electronic record.

Section 11.200 further requires that when an individual executes a series of signings during a single continuous period of controlled system access, the first signing must use all electronic signature components. Subsequent signings during that same session must use at least one component (e.g., password re-entry).

THE 2003 FDA GUIDANCE — RISK-BASED APPROACH

In August 2003, the FDA published a landmark guidance document titled "Part 11, Electronic Records; Electronic Signatures — Scope and Application." This guidance fundamentally changed how Part 11 was applied in practice.

The guidance announced that the FDA intended to exercise enforcement discretion regarding certain Part 11 requirements — meaning they would not enforce some requirements as aggressively as others. The key message was that Part 11 should be applied using a risk-based approach. The level of controls should be commensurate with the risk posed by the system and the data it manages.

This was a response to industry concerns that blanket application of all Part 11 requirements to every system, regardless of risk, was unnecessarily costly and did not improve product quality. The guidance effectively said: focus your Part 11 compliance efforts on the systems and records that matter most for product quality and patient safety.

For CSV engineers, this means: when planning validation, the risk assessment should inform not just the testing approach but also the extent of Part 11 controls implemented. A critical production system managing batch release data requires full Part 11 compliance. A support system managing non-GxP administrative data may need only basic controls.

Andrews Ch.2 (Sam Clark, ex-FDA inspector): "Inspectors may ask to review audit trail logs for key records to see if any unreported changes or deletions occurred. They specifically check if any users have administrator rights that allow them to overwrite or delete data without oversight — this is a major warning flag during an FDA inspection."`,

      exercise:{
        type:"controls-mapping",
        title:"Part 11 Controls in Practice",
        instructions:`For each of the following real-world scenarios encountered during a validation project, identify:
A) Which Part 11 §11.10 control is being violated (a through k)
B) What the specific risk is
C) What corrective action you would recommend

Scenarios:
1. A LIMS allows QC analysts to delete test results from the database.
2. Three analysts in the QC lab share a single login account "QC_USER1."
3. A manufacturing system allows operators to approve their own batch records.
4. The system clock on the LIMS server is 45 minutes behind the actual time.
5. A new QC analyst starts using the LIMS on their first day with no formal training.
6. Electronic batch records from 2019 cannot be retrieved because the archive system was decommissioned.`,
        modelAnswer:`1. Control (e) Audit Trail — deletion obscures previously recorded data. Risk: data integrity compromised, failed results hidden. Fix: disable delete function, implement "void with reason" instead, ensure audit trail captures all modifications.

2. Control (d) Access Controls — shared accounts mean actions cannot be attributed to individuals. Risk: violates ALCOA (Attributable). Fix: create individual accounts immediately, disable shared account, retrain on accountability.

3. Controls (f) Operational Checks + (g) Authority Checks — self-approval bypasses independent review. Risk: errors or falsification go undetected. Fix: configure workflow to require different user for approval, enforce maker-checker separation.

4. Control (e) Audit Trail — inaccurate timestamps make audit trail unreliable. Risk: cannot verify when actions actually occurred, chronological integrity compromised. Fix: synchronise server clock to NTP source, validate time synchronisation, investigate any records created during the discrepancy period.

5. Control (i) Training — untrained user operating GxP system. Risk: incorrect operation, data errors, compliance violation. Fix: remove access until training complete, document training with competency assessment, assign supervised practice period.

6. Control (c) Record Protection — records not retrievable throughout retention period. Risk: regulatory requirement violated, records lost permanently. Fix: restore from backup if possible, implement proper archiving strategy with media migration plan, document the gap as a deviation.`
      },
      keyTerms:["21 CFR Part 11","Predicate rule","Closed system","Open system","Audit trail","Electronic signature","§11.10","Subpart B","Subpart C","2003 FDA Guidance"],
      checkpoints:["Can you list all 11 controls in §11.10 from memory?","Can you explain what a predicate rule is to a non-technical person?","What are the three required elements of an electronic signature?","How did the 2003 guidance change Part 11 enforcement?","What is the difference between a closed system and an open system?"]
    },
    {
      id:"m2l2", title:"EU GMP Annex 11 — Computerised Systems",
      duration:"50 min",
      objectives:["Describe the structure and scope of Annex 11","Compare Annex 11 with Part 11 across key areas","Explain the role of the HPRA in Ireland","Understand why Irish sites need dual compliance","Know what changes are expected in the draft Annex 11 revision"],
      content:`EU GMP Annex 11, titled "Computerised Systems," is the primary European regulation governing the use of computerised systems in pharmaceutical manufacturing. It was last revised in 2011 and forms part of EudraLex Volume 4 — the EU Guidelines for Good Manufacturing Practice for medicinal products.

For CSV professionals in Ireland, Annex 11 is the regulation that the HPRA (Health Products Regulatory Authority) inspects against. While Part 11 focuses specifically on electronic records and electronic signatures, Annex 11 takes a broader, lifecycle approach — covering everything from risk management and project planning through to system retirement.

THE STRUCTURE OF ANNEX 11

Unlike Part 11's numbered subsections, Annex 11 is organised around the system lifecycle:

GENERAL (Sections 1-3): Establishes that risk management should be applied throughout the lifecycle of the computerised system, taking into account patient safety, data integrity, and product quality. It defines key roles: the Process Owner (responsible for the business process the system supports), the System Owner (responsible for the availability, support, and security of the system), and the Qualified Person (who must have access to the systems and data needed for batch certification and release).

PROJECT PHASE (Sections 4-8): Covers validation documentation requirements. The URS should describe the required functions of the computerised system and be based on a documented risk assessment. Section 5 specifically addresses supplier quality — stating that the regulated user should take all reasonable steps to ensure the product is produced in accordance with a quality management system, and should include requirements in agreements with suppliers and service providers. Section 6 addresses quality management during the project, including configuration management and change control during development.

OPERATIONAL PHASE (Sections 9-17): This is the most extensive section and covers the system once it is in production use:

Section 9 — Data accuracy checks must be performed, either manually or electronically, on data which has been transferred.

Section 10 — Data storage: data should be secured against damage and backed up at regular intervals. Backup data should be stored at a separate and secure location.

Section 11 — Printouts: it should be possible to obtain clear printed copies of electronically stored data.

Section 12 — Audit trails: consideration should be given, based on risk assessment, to building into the system the creation of a record of all GMP-relevant changes and deletions.

Section 13 — Change management: any changes to a computerised system, including system configurations, should only be made in a controlled manner in accordance with a defined procedure.

Section 14 — Periodic evaluation: computerised systems should be periodically evaluated to confirm that they remain in a valid state and are compliant with GMP. This is a key difference from Part 11, which does not explicitly require periodic evaluation.

Section 15 — Security: physical and/or logical controls should be in place to restrict access to computerised systems to authorised persons.

Section 16 — Incident management: all incidents, not only system failures and data errors, should be reported and assessed.

Section 17 — Electronic signatures: electronic records may replace paper records if the authentication systems are validated to ensure data integrity.

Business continuity is addressed separately, requiring that for the availability of computerised systems supporting critical processes, provisions should be made to ensure continuity of support for those processes in the event of a system breakdown.

KEY DIFFERENCES: ANNEX 11 vs PART 11

Understanding where these two regulations converge and diverge is essential for Irish CSV engineers who must comply with both:

AUDIT TRAILS: Both require audit trails for GxP-relevant changes. Part 11 §11.10(e) is more prescriptive — specifying "secure, computer-generated, time-stamped" trails that "shall not obscure previously recorded information." Annex 11 is less prescriptive but equally clear in intent — requiring consideration of audit trails "based on risk assessment." In practice, most systems implement the Part 11 standard because it is the more detailed specification.

ELECTRONIC SIGNATURES: Part 11 is significantly more detailed, dedicating an entire subpart (Subpart C, §11.50-11.200) to e-signature requirements including two-component authentication, meaning/name/timestamp requirements, and session management. Annex 11 simply states that electronic signatures should be validated to ensure data integrity. In practice, Part 11's detailed requirements are implemented because they provide a clearer technical specification.

PERIODIC REVIEW: Annex 11 Section 14 explicitly requires periodic evaluation. Part 11 has no equivalent requirement. However, most companies perform periodic reviews for all regulated systems as a matter of good practice, regardless of which regulation applies. For Irish sites, periodic review is mandatory under Annex 11 and typically conducted annually.

SUPPLIER MANAGEMENT: Annex 11 Section 5 directly requires formal quality assessments and agreements with suppliers. Part 11 does not address supplier management. This is a significant difference — under Annex 11, you are expected to assess your software suppliers' quality systems, ideally through audit, and to have formal agreements defining quality expectations.

BUSINESS CONTINUITY: Annex 11 explicitly requires business continuity planning for systems supporting critical processes. Part 11 does not address this. However, disaster recovery and business continuity are considered good practice under the broader GMP framework.

RISK MANAGEMENT: Both promote risk-based approaches. Part 11's risk-based application was established through the 2003 guidance document, while Annex 11 embeds risk management as a fundamental principle from its opening sections.

THE DRAFT ANNEX 11 REVISION

A significant revision of Annex 11 is expected, potentially expanding the current 5-page document to approximately 17 sections. Key additions are expected to include: explicit cybersecurity requirements (reflecting the increasing threat landscape), deeper integration with the Pharmaceutical Quality System (PQS), enhanced requirements for data handling and archiving, dedicated sections for cloud computing and service providers, and strengthened requirements for data integrity beyond the current audit trail provisions.

THE IRISH REGULATORY CONTEXT

Ireland's HPRA inspects pharmaceutical manufacturing sites against EU GMP, including Annex 11, as the primary regulatory framework. However, the reality is more nuanced. Because Ireland is one of the world's largest exporters of pharmaceutical products — with the majority destined for the US market — virtually all Irish pharmaceutical manufacturing sites maintain compliance with both Annex 11 and Part 11.

This dual compliance requirement means Irish CSV professionals must understand both frameworks and, critically, how they interact. The practical approach most Irish companies take is to implement the stricter of the two requirements wherever they diverge. For example, they implement Part 11's detailed e-signature requirements (stricter than Annex 11) but also perform Annex 11's required periodic reviews (not explicitly required by Part 11).

This dual regulatory knowledge is a genuine competitive advantage in the Irish job market. A candidate who can articulate the specific differences between Part 11 and Annex 11 — and explain the practical implications for system validation — demonstrates a depth of understanding that sets them apart from candidates who have only a surface-level familiarity with "the regulations."`,

      exercise:{
        type:"comparison",
        title:"Part 11 vs Annex 11 — Detailed Comparison",
        instructions:`Create a detailed comparison covering these six areas. For each, identify: which regulation is stricter, what the practical implication is for an Irish pharma site, and what a CSV engineer would implement.

Areas to compare:
1. Audit trail requirements
2. Electronic signature requirements
3. Periodic review / evaluation
4. Supplier management
5. Business continuity
6. Risk management approach

Then answer: If you could only read ONE of these two regulations before a job interview at an Irish pharma company, which would you choose and why?`,
        modelAnswer:`1. AUDIT TRAILS: Part 11 stricter (more prescriptive language). Practical: implement Part 11 standard (secure, timestamped, non-obscuring). CSV engineer validates audit trail against §11.10(e) checklist.

2. E-SIGNATURES: Part 11 much stricter (entire Subpart C). Practical: implement Part 11 two-component authentication, meaning/name/timestamp, session management. Annex 11 is satisfied automatically.

3. PERIODIC REVIEW: Annex 11 stricter (explicitly required, Part 11 silent). Practical: conduct annual periodic reviews for all GxP systems. Document: changes, incidents, access, backups, supplier, training, fitness. CSV engineer may lead or support these reviews.

4. SUPPLIER MANAGEMENT: Annex 11 stricter (direct requirement). Practical: conduct supplier audits, establish quality agreements, assess vendor QMS. CSV engineer may participate in supplier audits.

5. BUSINESS CONTINUITY: Annex 11 stricter (explicit requirement). Practical: document DR/BCP plans, test backup/restore annually, define RPO/RTO. Part 11 satisfied through broader GMP compliance.

6. RISK MANAGEMENT: Similar approach (both risk-based). Part 11 via 2003 guidance, Annex 11 embedded from Section 1. Practical: apply GAMP 5 risk-based framework to satisfy both.

INTERVIEW CHOICE: Annex 11. Reason: It's what the HPRA inspects against in Ireland. It covers the full lifecycle (broader scope). Part 11's detailed e-signature requirements can be learned as a supplement. An interviewer at an Irish pharma company will be more impressed by deep Annex 11 knowledge because it directly relates to their inspection experience. However, mention that you also understand Part 11 and the dual compliance requirement — this shows you understand the Irish context specifically.`
      },
      keyTerms:["EU GMP Annex 11","HPRA","EudraLex Volume 4","Periodic evaluation","Process Owner","System Owner","Qualified Person","Business continuity","PIC/S","Dual compliance"],
      checkpoints:["Can you describe the three main sections of Annex 11?","Which regulation requires periodic review?","Which is more detailed on electronic signatures?","Why do Irish companies need dual compliance?","What changes are expected in the Annex 11 revision?"]
    }
  ]
};
