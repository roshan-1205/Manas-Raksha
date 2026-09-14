export type RiskLevel = "High" | "Moderate" | "Low";
export type CaseStage =
  | "Complaint Registration"
  | "Investigation"
  | "Trial"
  | "Compensation / Relief"
  | "Rehabilitation"
  | "Protection / Relocation"
  | "Case Closure"
  | "Post-case Follow-up";

export interface Case {
  id: string;
  victimId: string;
  victimName: string;
  district: string;
  policeStation: string;
  stage: CaseStage;
  riskLevel: RiskLevel;
  lastCheckIn: string;
  assignedCaseworker: string;
  followUpStatus: "Pending" | "Completed" | "Overdue";
  protectionStatus: "Active" | "Pending" | "Not Required";
  actionRequired: boolean;
  age: number;
  gender: string;
  language: string;
  contactPreference: string;
  monitoringConsent: boolean;
  caseRefNo: string;
  registeredDate: string;
}

export interface ActionLog {
  id: string;
  dateTime: string;
  caseId: string;
  caseworker: string;
  actionType: string;
  description: string;
  status: "Completed" | "Pending" | "In Progress";
  followUpDate: string;
}

export interface AIInsight {
  caseId: string;
  riskCategory: RiskLevel;
  riskTrend: "Improving" | "Stable" | "Worsening";
  checkInTrend: string;
  contributingFactors: string[];
  suggestedIntervention: string;
  alertPriority: "Immediate" | "High" | "Routine";
  confidenceIndicator: number;
}

export const DISTRICTS = [
  "Nagpur",
  "Amravati",
  "Nashik",
  "Aurangabad",
  "Pune",
  "Solapur",
  "Kolhapur",
  "Latur",
];

export const POLICE_STATIONS = [
  "Sitabuldi PS",
  "Lakadganj PS",
  "Nandanvan PS",
  "Amravati City PS",
  "Malegaon PS",
  "Nashik Road PS",
  "Cidco PS",
  "Hadapsar PS",
];

export const CASEWORKERS = [
  "Priya Deshmukh",
  "Rajesh Bhalerao",
  "Anita Meshram",
  "Suresh Pawar",
  "Meena Jadhav",
  "Vikram Shinde",
];

export const mockCases: Case[] = [
  {
    id: "MR-2024-001",
    victimId: "VIC-A7X2",
    victimName: "Sanjana P.",
    district: "Nagpur",
    policeStation: "Sitabuldi PS",
    stage: "Trial",
    riskLevel: "High",
    lastCheckIn: "2024-07-12",
    assignedCaseworker: "Priya Deshmukh",
    followUpStatus: "Overdue",
    protectionStatus: "Active",
    actionRequired: true,
    age: 32,
    gender: "Female",
    language: "Marathi",
    contactPreference: "Phone",
    monitoringConsent: true,
    caseRefNo: "CCTNS/NG/2024/0451",
    registeredDate: "2024-01-15",
  },
  {
    id: "MR-2024-002",
    victimId: "VIC-B3K9",
    victimName: "Arjun K.",
    district: "Amravati",
    policeStation: "Amravati City PS",
    stage: "Investigation",
    riskLevel: "Moderate",
    lastCheckIn: "2024-07-14",
    assignedCaseworker: "Rajesh Bhalerao",
    followUpStatus: "Pending",
    protectionStatus: "Pending",
    actionRequired: false,
    age: 45,
    gender: "Male",
    language: "Hindi",
    contactPreference: "WhatsApp",
    monitoringConsent: true,
    caseRefNo: "CCTNS/AM/2024/0182",
    registeredDate: "2024-02-20",
  },
  {
    id: "MR-2024-003",
    victimId: "VIC-C5M1",
    victimName: "Leela M.",
    district: "Nashik",
    policeStation: "Malegaon PS",
    stage: "Rehabilitation",
    riskLevel: "Low",
    lastCheckIn: "2024-07-15",
    assignedCaseworker: "Anita Meshram",
    followUpStatus: "Completed",
    protectionStatus: "Not Required",
    actionRequired: false,
    age: 28,
    gender: "Female",
    language: "Marathi",
    contactPreference: "SMS",
    monitoringConsent: true,
    caseRefNo: "CCTNS/NK/2024/0099",
    registeredDate: "2024-03-05",
  },
  {
    id: "MR-2024-004",
    victimId: "VIC-D8N4",
    victimName: "Ramesh D.",
    district: "Pune",
    policeStation: "Hadapsar PS",
    stage: "Complaint Registration",
    riskLevel: "High",
    lastCheckIn: "2024-07-10",
    assignedCaseworker: "Suresh Pawar",
    followUpStatus: "Overdue",
    protectionStatus: "Active",
    actionRequired: true,
    age: 55,
    gender: "Male",
    language: "Marathi",
    contactPreference: "Phone",
    monitoringConsent: true,
    caseRefNo: "CCTNS/PN/2024/0317",
    registeredDate: "2024-06-28",
  },
  {
    id: "MR-2024-005",
    victimId: "VIC-E2P7",
    victimName: "Deepa S.",
    district: "Latur",
    policeStation: "Cidco PS",
    stage: "Compensation / Relief",
    riskLevel: "Moderate",
    lastCheckIn: "2024-07-13",
    assignedCaseworker: "Meena Jadhav",
    followUpStatus: "Pending",
    protectionStatus: "Not Required",
    actionRequired: false,
    age: 38,
    gender: "Female",
    language: "Kannada",
    contactPreference: "WhatsApp",
    monitoringConsent: true,
    caseRefNo: "CCTNS/LT/2024/0228",
    registeredDate: "2024-04-10",
  },
  {
    id: "MR-2024-006",
    victimId: "VIC-F6Q2",
    victimName: "Vijay T.",
    district: "Nagpur",
    policeStation: "Nandanvan PS",
    stage: "Post-case Follow-up",
    riskLevel: "Low",
    lastCheckIn: "2024-07-15",
    assignedCaseworker: "Vikram Shinde",
    followUpStatus: "Completed",
    protectionStatus: "Not Required",
    actionRequired: false,
    age: 42,
    gender: "Male",
    language: "Marathi",
    contactPreference: "SMS",
    monitoringConsent: true,
    caseRefNo: "CCTNS/NG/2023/0891",
    registeredDate: "2023-11-02",
  },
  {
    id: "MR-2024-007",
    victimId: "VIC-G9R5",
    victimName: "Fatima R.",
    district: "Aurangabad",
    policeStation: "Nashik Road PS",
    stage: "Protection / Relocation",
    riskLevel: "High",
    lastCheckIn: "2024-07-11",
    assignedCaseworker: "Priya Deshmukh",
    followUpStatus: "Pending",
    protectionStatus: "Active",
    actionRequired: true,
    age: 27,
    gender: "Female",
    language: "Urdu",
    contactPreference: "Phone",
    monitoringConsent: true,
    caseRefNo: "CCTNS/AU/2024/0154",
    registeredDate: "2024-05-18",
  },
  {
    id: "MR-2024-008",
    victimId: "VIC-H4S8",
    victimName: "Mohan N.",
    district: "Solapur",
    policeStation: "Lakadganj PS",
    stage: "Case Closure",
    riskLevel: "Low",
    lastCheckIn: "2024-07-14",
    assignedCaseworker: "Rajesh Bhalerao",
    followUpStatus: "Completed",
    protectionStatus: "Not Required",
    actionRequired: false,
    age: 60,
    gender: "Male",
    language: "Marathi",
    contactPreference: "Phone",
    monitoringConsent: true,
    caseRefNo: "CCTNS/SL/2023/0763",
    registeredDate: "2023-09-14",
  },
];

export const mockActionLogs: ActionLog[] = [
  {
    id: "AL-001",
    dateTime: "2024-07-15 10:30",
    caseId: "MR-2024-001",
    caseworker: "Priya Deshmukh",
    actionType: "Counselling Referred",
    description: "Victim referred to district counsellor. Appointment scheduled for 2024-07-20.",
    status: "Pending",
    followUpDate: "2024-07-20",
  },
  {
    id: "AL-002",
    dateTime: "2024-07-14 14:15",
    caseId: "MR-2024-002",
    caseworker: "Rajesh Bhalerao",
    actionType: "Follow-up Completed",
    description: "Telephonic follow-up completed. Victim reported feeling safe. No immediate concerns.",
    status: "Completed",
    followUpDate: "2024-07-21",
  },
  {
    id: "AL-003",
    dateTime: "2024-07-14 11:00",
    caseId: "MR-2024-007",
    caseworker: "Priya Deshmukh",
    actionType: "Protection Support Initiated",
    description: "Relocation support requested. Coordination with SP office initiated.",
    status: "In Progress",
    followUpDate: "2024-07-17",
  },
  {
    id: "AL-004",
    dateTime: "2024-07-13 09:45",
    caseId: "MR-2024-004",
    caseworker: "Suresh Pawar",
    actionType: "Escalated to Designated Official",
    description: "High-risk case escalated to District Social Welfare Officer due to missed check-ins.",
    status: "Completed",
    followUpDate: "2024-07-16",
  },
  {
    id: "AL-005",
    dateTime: "2024-07-12 16:30",
    caseId: "MR-2024-005",
    caseworker: "Meena Jadhav",
    actionType: "Legal Aid Referral",
    description: "Victim referred to District Legal Services Authority for compensation claim support.",
    status: "Pending",
    followUpDate: "2024-07-19",
  },
  {
    id: "AL-006",
    dateTime: "2024-07-12 10:00",
    caseId: "MR-2024-003",
    caseworker: "Anita Meshram",
    actionType: "Rehabilitation Support",
    description: "Enrolled in state government skill development scheme. Documentation completed.",
    status: "Completed",
    followUpDate: "2024-07-26",
  },
  {
    id: "AL-007",
    dateTime: "2024-07-11 13:20",
    caseId: "MR-2024-006",
    caseworker: "Vikram Shinde",
    actionType: "Victim Contacted",
    description: "Post-closure check-in completed. Victim stable. No active concerns.",
    status: "Completed",
    followUpDate: "2024-08-11",
  },
];

export const mockAIInsights: Record<string, AIInsight> = {
  "MR-2024-001": {
    caseId: "MR-2024-001",
    riskCategory: "High",
    riskTrend: "Worsening",
    checkInTrend: "2 missed check-ins in last 7 days",
    contributingFactors: [
      "Missed check-ins",
      "Reported fear of retaliation",
      "Upcoming trial date",
      "Social isolation reported",
      "Legal uncertainty",
    ],
    suggestedIntervention: "Immediate telephonic contact. Refer to counsellor within 48 hours. Review protection status.",
    alertPriority: "Immediate",
    confidenceIndicator: 87,
  },
  "MR-2024-002": {
    caseId: "MR-2024-002",
    riskCategory: "Moderate",
    riskTrend: "Stable",
    checkInTrend: "1 missed check-in in last 14 days",
    contributingFactors: [
      "Investigation uncertainty",
      "Moderate social support present",
      "Mild anxiety symptoms reported",
    ],
    suggestedIntervention: "Schedule counselling session. Provide legal process update. Continue weekly monitoring.",
    alertPriority: "High",
    confidenceIndicator: 72,
  },
  "MR-2024-004": {
    caseId: "MR-2024-004",
    riskCategory: "High",
    riskTrend: "Worsening",
    checkInTrend: "3 missed check-ins in last 10 days",
    contributingFactors: [
      "Missed check-ins",
      "New complaint — acute distress",
      "No social support network identified",
      "Threat concerns reported",
      "Physical safety concerns",
    ],
    suggestedIntervention: "Urgent field visit required. Protection review mandatory. Escalate to District Officer.",
    alertPriority: "Immediate",
    confidenceIndicator: 91,
  },
  "MR-2024-007": {
    caseId: "MR-2024-007",
    riskCategory: "High",
    riskTrend: "Stable",
    checkInTrend: "1 missed check-in in last 7 days",
    contributingFactors: [
      "Active relocation in progress",
      "Reported fear of perpetrators",
      "Social isolation post-relocation",
      "Financial instability",
    ],
    suggestedIntervention: "Confirm safe relocation. Connect with local support group. Schedule bi-weekly check-ins.",
    alertPriority: "High",
    confidenceIndicator: 83,
  },
  "MR-2024-003": {
    caseId: "MR-2024-003",
    riskCategory: "Low",
    riskTrend: "Improving",
    checkInTrend: "All check-ins completed on schedule",
    contributingFactors: [
      "Strong family support",
      "Enrolled in skill programme",
      "No active threats",
    ],
    suggestedIntervention: "Continue monthly monitoring. Provide update on rehabilitation progress.",
    alertPriority: "Routine",
    confidenceIndicator: 65,
  },
};

export const heatmapData = [
  { area: "Sitabuldi", district: "Nagpur", risk: "High", cases: 8, x: 55, y: 32 },
  { area: "Nandanvan", district: "Nagpur", risk: "Moderate", cases: 4, x: 60, y: 38 },
  { area: "Lakadganj", district: "Nagpur", risk: "Low", cases: 2, x: 50, y: 36 },
  { area: "Amravati City", district: "Amravati", risk: "Moderate", cases: 5, x: 38, y: 28 },
  { area: "Achalpur", district: "Amravati", risk: "High", cases: 7, x: 33, y: 22 },
  { area: "Malegaon", district: "Nashik", risk: "Low", cases: 3, x: 20, y: 20 },
  { area: "Nashik Road", district: "Nashik", risk: "Moderate", cases: 4, x: 15, y: 28 },
  { area: "Cidco", district: "Aurangabad", risk: "High", cases: 6, x: 32, y: 48 },
  { area: "Hadapsar", district: "Pune", risk: "Moderate", cases: 5, x: 22, y: 65 },
  { area: "Kothrud", district: "Pune", risk: "Low", cases: 2, x: 18, y: 70 },
  { area: "Solapur Central", district: "Solapur", risk: "Low", cases: 3, x: 42, y: 72 },
  { area: "Latur City", district: "Latur", risk: "Moderate", cases: 4, x: 48, y: 80 },
  { area: "Kolhapur City", district: "Kolhapur", risk: "Low", cases: 2, x: 10, y: 82 },
];

export const dashboardStats = {
  totalActiveCases: 6,
  registeredVictims: 62,
  highRiskVictims: 4,
  pendingFollowUps: 3,
  counsellingReferrals: 23,
  protectionCases: 9,
  immediateActionRequired: 1,
  completedFollowUps: 31,
};

export const CASE_STAGES: CaseStage[] = [
  "Complaint Registration",
  "Investigation",
  "Trial",
  "Compensation / Relief",
  "Rehabilitation",
  "Protection / Relocation",
  "Case Closure",
  "Post-case Follow-up",
];
