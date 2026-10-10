export interface QuoteRequest {
  id: string;
  clientName: string;
  location: string;
  title: string;
  scopeType: string;
  stage: 'In Evaluation' | 'Pending Review' | 'Walkthrough Set' | 'Bid In Progress' | 'Approved';
  stageColor: string;
  notes: string;
  receivedTime: string;
  attachments?: string;
  phone?: string;
  email?: string;
  estimatedBudget?: string;
  targetDate?: string;
}

export interface Appointment {
  id: string;
  day: string; // 'Mon 04', 'Tue 05', etc.
  dateStr: string;
  time: string;
  title: string;
  clientName: string;
  address: string;
  notes: string;
  status: 'Completed' | 'Scheduled' | 'Confirmed' | 'Active';
  phone?: string;
}

export interface FleetUnit {
  id: string;
  name: string;
  type: string;
  image: string;
  activeAssignment: string;
  fieldStatus: string;
  equipmentOnboard: string;
  safetyBriefing: string;
  driver: string;
  fuel: string;
}

export interface EstimateCalculatorState {
  proposalId: string;
  clientName: string;
  projectTitle: string;
  timeline: string;
  carpenterHours: number;
  laborHours: number;
  techHours: number;
  dumpRuns: number;
  dustProtectionCost: number;
  dustProtectionType: string;
  dumpFees: number;
  matLumber: number;
  matFixtures: number;
  matHardware: number;
  overheadPercent: number;
}
