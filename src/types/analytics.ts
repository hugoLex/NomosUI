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
  title: string;
  statistics: JudgeStatisticsT;
  cases: Case[];
}

interface JudgeJudicialMetricsT {
  concurrence_rate: number;
  dissent_rate: number;
  lead_judgment_rate: number;
}

// export interface JudgeProfileResponseT {
//   user_id: string;
//   judge_info: JudgeInfoT;
//   judicial_metrics: JudgeJudicialMetricsT;
//   page: number;
// }








export interface JudgeProfileResponseT {
  user_id: string;
  judge_info: {
    judge_id: number;
    name: string;
    profile: null | string;
    title: string;
    cases: {
      document_id: string;
      case_title: string;
      year: number;
      court: string;
      suit_number: string;
      judge_stance: string;
      is_lead_judge: boolean;
      holding_and_reasoning: string;
      area_of_law: string[];
      subject_matters: string[];
      // please review the presence of this field or otherwise in the data returned
      // case_summary: string
      // holding_and_reasoning: string
    }[];
    appointments: unknown[];
    statistics: {
      total_cases: number;
      total_concurred: number;
      total_dissented: number;
      total_lead_judgments: number;
      total_trial_judge: number;
      total_amicus: number;
      total_appellate: number;
    };
  };
  judicial_metrics: {
    concurrence_rate: number;
    dissent_rate: number;
    role_distribution: {
      lead_judge: number;
      trial_judge: number;
      amicus: number;
      appellate: number;
      concurred: number;
      dissented: number;
    };
  };
  domain_expertise: {
    domain_groups: {
      area_of_law: { name: string; case_count: number }[];
      legal_principles: { name: string; case_count: number }[];
      subject_matter: { name: string; case_count: number }[];
    };
  };
  temporal_patterns: {
    yearly_activity: { year: number; case_count: number; lead_count: number }[];
    trend_direction: string;
  };
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
  title: string | null;

  year_called_to_bar: string | null;
  law_firms: string[];
  cases: CounselCaseT[];
}

// Represents a case with its relevant details
interface CounselCaseT {
  role: string;
  court: string;
  verdict: string;
  disposition: string;
  case_title: string;
  document_id: string;
  suit_number: string;
  case_summary: string;
  year_decided: number;
  subject_matters: string[];
  precedents_cited: CounselPrecedentT[] | string[];
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





type TCourtDetailsResult = {
  court_name: string;
  division_name: string;
  legal_domain_name: string;
  case_count: number;
  pct_of_division_cases: number;
  pct_of_domain_cases: number;
  specialization_score: number;
  appellant_win_percentage: number;
  decided_cases: number;
  win_rate_vs_court_avg: number;
  win_rate_vs_overall_avg: number;
};



export type TdivisionSpecialization = {
  user_id: string;
  data: {
    count: number;
    min_cases_threshold: number;
    results: TCourtDetailsResult[];
  };
};











export type TJurisdictionalAnalysis = {
  user_id: string;
  data: {
    total_courts: number;
    courts_analyzed: number;
    min_cases_threshold: number;
    results: {
      court_name: string;
      division: string;
      legal_areas: {
        legal_area: string;
        case_count: number;
        pct_of_court_caseload: number;
        pct_of_all_domain_cases: number;
        specialization_index: number;
        court_rank_in_domain: number;
      }[];
    }[];
  };
};


export type TLegalIssueEvolution = {
  user_id: string;
  data: {
    total_decades: number;
    filters: {
      court_id: string | null;
      start_year: number;
      end_year: number;
      legal_area: string;
    };
    results: {
      legal_area: string;
      decade: number;
      unique_issues: number;
      case_count: number;
      avg_ratios_per_issue: number;
      trending_terms: {
        word: string;
        frequency: number;
      }[];
    }[];
  };
};

export type TDecisionPatterns = {
  user_id: string;
  data: {
    count: number;
    filters: {
      court_id: number | null;
      start_year: number;
      end_year: number;
      legal_area: string | null;
    };
    results: {
      court_name: string;
      division: string;
      legal_area: string;
      total_years: number;
      total_cases: number;
      overall_appellant_win_pct: number;
      win_pct_stddev: number;
      yearly_trends: {
        year: number;
        cases: number;
        win_pct: number;
        yoy_change: number;
      }[];
    }[];
  };
};

export type TPrecedentInfluence = {
  user_id: string;
  data: {
    count: number;
    min_citations_threshold: number;
    filters: {
      court_id: number | null;
      cited_court_id: number;
    };
    results: {
      citing_court: string;
      cited_court: string;
      citing_cases: number;
      cited_cases: number;
      total_citations: number;
      pct_of_all_citations: number;
      reciprocal_citations: number;
      citing_court_id: number;
      cited_court_id: number;
      treatment_breakdown: {
        treatment: string;
        count: number;
        percentage: number;
      }[];
    }[];
  };
};

export type TCourtsDirectory = {
  user_id: string;
  courts: {
    id: number;
    name: string;
  }[];
};

export type TLegalAreasDirectory = {
  user_id: string;
  legal_areas: {
    id: number;
    name: string;
  }[];
};
