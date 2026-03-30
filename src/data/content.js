// Content aggregator — imports all deep module files
import { M1 } from './module1.js';
import { M2 } from './module2.js';
import { M3 } from './module3.js';
import { M4, M5, M6, M7 } from './modules4to7.js';
import { M8, M9, M10, M11 } from './modules8to11.js';

export const MODULES = [M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11];

// 40 Quiz Questions
export const QUIZ_BANK = [
  {id:"q1",q:"Stokes: PRIMARY business reason for testing?",o:["Regulatory compliance","It saves money","QA requires it","Tradition"],a:1,e:"Cost-effectiveness is the overriding reason.",m:"m1"},
  {id:"q2",q:"Which GAMP 5 category was removed?",o:["Cat 1","Cat 2 (firmware)","Cat 3","Cat 4"],a:1,e:"Cat 2 firmware now reclassified.",m:"m3"},
  {id:"q3",q:"URS traces to which qualification?",o:["IQ","OQ","PQ","DQ"],a:2,e:"V-Model: URS→PQ, FRS→OQ, DS→IQ.",m:"m3"},
  {id:"q4",q:"Inspector Clark debunks which myth?",o:["Validation needs evidence","Validation through use","Risk drives effort","Testing finds flaws"],a:1,e:"Using system for years ≠ validation.",m:"m10"},
  {id:"q5",q:"'C' in ALCOA?",o:["Complete","Consistent","Contemporaneous","Controlled"],a:2,e:"Contemporaneous — recorded when it happened.",m:"m5"},
  {id:"q6",q:"What is a predicate rule?",o:["Validation protocol","Existing FDA reg requiring records","E-sig type","Risk method"],a:1,e:"Part 11 applies on top when records are electronic.",m:"m2"},
  {id:"q7",q:"SCADA classified as?",o:["Cat 1","Cat 3","Cat 4 + Cat 5","Cat 5 only"],a:2,e:"Cat 4 + possible Cat 5 custom scripts.",m:"m9"},
  {id:"q8",q:"S×O×D used by?",o:["FTA","HACCP","FMEA","GAMP"],a:2,e:"FMEA: RPN = Severity × Occurrence × Detection.",m:"m4"},
  {id:"q9",q:"DI failures = ?% of GMP non-compliance",o:["~20%","~40%",">60%","~80%"],a:2,e:"Over 60% globally.",m:"m5"},
  {id:"q10",q:"Ireland's pharma regulator?",o:["FDA","EMA","MHRA","HPRA"],a:3,e:"Health Products Regulatory Authority.",m:"m1"},
  {id:"q11",q:"Why track REJECTED changes?",o:["Audit only","Patterns indicate problems","Penalize","Don't need to"],a:1,e:"Patterns reveal underlying issues.",m:"m7"},
  {id:"q12",q:"CSA stands for?",o:["Computer System Assessment","Computer Software Assurance","Clinical System Analysis","Audit"],a:1,e:"FDA 2025 risk-based framework.",m:"m11"},
  {id:"q13",q:"What invalidates test programs?",o:["Too many testers","Poor tests + missing signatures","Too fast","Auto tools"],a:1,e:"Minor errors build up.",m:"m6"},
  {id:"q14",q:"LIMS classified as?",o:["Cat 1","Cat 3","Cat 4","Cat 5"],a:2,e:"Category 4 — configurable.",m:"m9"},
  {id:"q15",q:"Every test MUST have?",o:["Harness","Unambiguous acceptance criteria","Automation","Risk score"],a:1,e:"Stokes Ch.7.",m:"m6"},
  {id:"q16",q:"Annex 11 primary for?",o:["US","Japan","EU/Ireland","Australia"],a:2,e:"HPRA inspects against it.",m:"m2"},
  {id:"q17",q:"Irish validation platforms?",o:["SAP/Oracle","KNEAT/ValGenesis","Emerson/Siemens","Pfizer/MSD"],a:1,e:"KNEAT (Limerick) + ValGenesis (Dublin).",m:"m9"},
  {id:"q18",q:"FAT/SAT same as IQ/OQ?",o:["Yes","Different but leverageable","FAT=IQ","SAT=PQ"],a:1,e:"Different purposes, results leverageable.",m:"m6"},
  {id:"q19",q:"Inspector access red flag?",o:["Many users","Admin without oversight","Time zones","Passwords"],a:1,e:"Admin overwrite without oversight.",m:"m10"},
  {id:"q20",q:"Stokes max risk score?",o:["50","75","100","150"],a:1,e:"75 from weighted factors.",m:"m4"},
  {id:"q21",q:">40% script errors after week 1?",o:["Continue","Speed up","HALT retrain","Report FDA"],a:2,e:"Halt for review and retraining.",m:"m6"},
  {id:"q22",q:"TCA in AZ LIMS?",o:["Tech Config","Threats & Controls Analysis","Test Coverage","Tech Compliance"],a:1,e:"23-area checklist.",m:"m9"},
  {id:"q23",q:"Part 11 e-sig components?",o:["One","Two","Three","Four"],a:1,e:"At least two (ID + password).",m:"m2"},
  {id:"q24",q:"E-sig must include?",o:["Name only","Name+date/time+meaning","Biometric","Cert"],a:1,e:"Printed name, date/time, meaning.",m:"m2"},
  {id:"q25",q:"GAMP 5 published by?",o:["FDA","EMA","ISPE","WHO"],a:2,e:"ISPE.",m:"m3"},
  {id:"q26",q:"High RPN means?",o:["Low risk","More validation needed","Skip","Supplier-tested"],a:1,e:"Higher RPN = more testing.",m:"m4"},
  {id:"q27",q:"Regression testing?",o:["Boundaries","Changes don't break existing","First test","UI"],a:1,e:"Verifies changes don't break things.",m:"m6"},
  {id:"q28",q:"'Paper is patient'?",o:["Lasts forever","Can't verify contemporaneous","Cheap","Patience"],a:1,e:"Can't verify paper was real-time.",m:"m5"},
  {id:"q29",q:"Black-box testing?",o:["Screens off","Outputs vs inputs without code","Security","UI only"],a:1,e:"Test WHAT not HOW.",m:"m6"},
  {id:"q30",q:"AZ LIMS protocol size?",o:["167pg","83pg","41pg","25pg"],a:2,e:"Generic scripts: 167pg→41pg.",m:"m9"},
  {id:"q31",q:"Structural testing benefit?",o:["Replaces functional","Catches defects cheapest","FDA required","Improves UI"],a:1,e:"Cheapest phase to fix.",m:"m6"},
  {id:"q32",q:"Change Requests traceable to?",o:["Budget","Implemented change","PM only","Vendor"],a:1,e:"From change back to request.",m:"m7"},
  {id:"q33",q:"URS security should include?",o:["Optional","Passwords only","Auth detection, logout, profiles, controls","Physical only"],a:2,e:"Andrews Ch.6.",m:"m2"},
  {id:"q34",q:"E-records retrievable throughout?",o:["1yr","5yr","Retention period (may exceed system)","Until audit"],a:2,e:"May exceed system lifetime.",m:"m5"},
  {id:"q35",q:"AZ PQ could only run?",o:["Anytime","During shutdown","Weekends","After FDA"],a:1,e:"Needed production machine.",m:"m9"},
  {id:"q36",q:"Failed test data objects?",o:["Delete","Sequence/save/flexible scripts","Ignore","New DB"],a:1,e:"Stokes: three approaches.",m:"m6"},
  {id:"q37",q:"White-box testing?",o:["No docs","Internal code logic","UI only","Blank"],a:1,e:"Examines code. Complements black-box.",m:"m6"},
  {id:"q38",q:"QMS disuse sign?",o:["New SOPs","SOPs unchanged for years","Complaints","Approved"],a:1,e:"Wingate: moribund SOPs.",m:"m10"},
  {id:"q39",q:"SAT results establish?",o:["Nothing","Performance baseline","Vendor relationship","Training"],a:1,e:"Baseline for future monitoring.",m:"m6"},
  {id:"q40",q:"VMP stands for?",o:["Validation Method Protocol","Validation Master Plan","Vendor Management Plan","Version Mgmt"],a:1,e:"Top-level validation strategy.",m:"m3"},
];
