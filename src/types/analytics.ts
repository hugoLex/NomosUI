// Type for the case details
type CaseDetail = {
  case_title: string; // case_title is a string
  suit_number: string; // suit_number is a string
  year: number; // year is a number
  court: string; // court is a string
  court_division: string | null; // court_division is a string or null
  counsel_role: string; // counsel_role is a string
  law_firm: string | null; // law_firm is a string or null
  case_outcome: string; // case_outcome is a string
  subject_matters: string[]; // subject_matters is an array of strings
};

// Type for expertise analytics
type ExpertiseArea = {
  counsel_id: number; // counsel_id is a number
  counsel_name: string; // counsel_name is a string
  area_of_law: string; // area_of_law is a string
  total_cases: number; // total_cases is a number
  courts_appeared: string[]; // courts_appeared is an array of strings
  precedents_cited: number; // precedents_cited is a number
  rank_in_area: number; // rank_in_area is a number
  cases: {
    document_id: string; // document_id is a string
    case_title: string; // case_title is a string
    court: string; // court is a string
    year: number; // year is a number
  }[];
};

// Type for the main data object
type CounselData = {
  case_details: {
    success: boolean; // success is a boolean
    total_cases: number; // total_cases is a number
    cases: CaseDetail[]; // cases is an array of CaseDetail objects
    error: string | null; // error is a string or null
  };
  expertise_analytics: {
    success: boolean; // success is a boolean
    areas: ExpertiseArea[]; // areas is an array of ExpertiseArea objects
    error: string | null; // error is a string or null
  };
};

// Type for pagination
type Pagination = {
  page: number; // page is a number
  per_page: number; // per_page is a number
  total_pages: number; // total_pages is a number
};

// Type for metadata
type Metadata = {
  timestamp: string; // timestamp is a string (ISO date)
  request_id: string; // request_id is a string
};

// Type for the full response
export type CounselProfileResponse = {
  user_id: string; // user_id is a string (e.g., 'anonymous')
  counsel_id: number; // counsel_id is a number
  counsel_name: string; // counsel_name is a string
  success: boolean; // success is a boolean
  data: CounselData; // data is of type CounselData
  pagination: Pagination; // pagination is of type Pagination
  metadata: Metadata; // metadata is of type Metadata
};
export type GetCounselAppearancesRequest = {
  counsel_id: number;
  page: number;
};

// Type for the judge information
type Judge = {
  judge_id: number; // judge_id is a number
  name: string; // name is a string
  profile: string | null; // profile is a string or null
  court: string; // court is a string
  division: string | null; // division is a string or null
  jurisdiction: string; // jurisdiction is a string
  total_cases: number; // total_cases is a number
  subject_matters: string[]; // subject_matters is an array of strings
};

// Type for the full response structure
export type JudgeInfoResponseT = {
  user_id: string; // user_id is a string
  judges: Judge[]; // judges is an array of Judge objects
};

// Judge details page
interface Case {
  year: number;
  court: string;
  case_title: string;
  document_id: string;
  suit_number: string;
  case_summary: string;
  judge_stance: "Concurring" | "Dissented" | "Lead Judgment" | "Other"; // you can extend this list as needed
  is_lead_judge: boolean;
  area_of_law: string[];
  subject_matters: string[];
}

interface JudgeStatisticsT {
  total_cases: number;
  total_concurred: number;
  total_dissented: number;
  total_lead_judgments: number;
}

interface JudgeInfoT {
  judge_id: number;
  name: string;
  profile: string;
  statistics: JudgeStatisticsT;
  cases: Case[];
}

interface JudgeJudicialMetricsT {
  concurrence_rate: number;
  dissent_rate: number;
  lead_judgment_rate: number;
}

export interface JudgeProfileResponseT {
  user_id: string;
  judge_info: JudgeInfoT;
  judicial_metrics: JudgeJudicialMetricsT;
  page: number;
}

// All judges list

interface JudgeInfoT {
  judge_id: number;
  name: string;
  original_name: string;
  profile: string;
  court: string;
  division: string;
  matching_case_count: string;
  jurisdiction: string;
  total_cases: number;
  match_context: { field: string, highlight: string }
}

export interface AllJudgesListResponseT {
  user_id: string;
  page: number;
  judges: JudgeInfoT[];
}

interface CounselT {
  counsel_id: number;
  counsel_name: string;
  total_cases: number;
  law_firms: string[];
  total_cases_won: number;
  total_cases_lost: number;
}

export interface CounselResponseT {
  user_id: string;
  page: number;
  counsels: CounselT[];
}

// Represents the details of the counsel (lawyer)
interface CounselDetailsT {
  counsel_id: number;
  counsel_name: string;
  law_firms: string[];
  cases: CounselCaseT[];
}

// Represents a case with its relevant details
interface CounselCaseT {
  role: string;
  court: string;
  verdict: string;
  case_title: string;
  document_id: string;
  suit_number: string;
  case_summary: string;
  year_decided: number;
  subject_matters: string[];
  precedents_cited: CounselPrecedentT[];
}

// Represents a precedent cited in a case
interface CounselPrecedentT {
  role: string;
  citation: string;
}

// Represents performance metrics of the counsel
interface CounselPerformanceMetricsT {
  win_rate: number;
  total_cases: number;
  case_distribution: Record<string, number>;
}

// Main interface for user data, including counsel and performance metrics
export interface CounselDetailT {
  user_id: string;
  counsel_details: CounselDetailsT;
  performance_metrics: CounselPerformanceMetricsT;
  page: number;
}
