// Type for the case details
type CaseDetail = {
    case_title: string;     // case_title is a string
    suit_number: string;    // suit_number is a string
    year: number;           // year is a number
    court: string;          // court is a string
    court_division: string | null;  // court_division is a string or null
    counsel_role: string;   // counsel_role is a string
    law_firm: string | null; // law_firm is a string or null
    case_outcome: string;   // case_outcome is a string
    subject_matters: string[]; // subject_matters is an array of strings
  };
  
  // Type for expertise analytics
  type ExpertiseArea = {
    counsel_id: number;           // counsel_id is a number
    counsel_name: string;         // counsel_name is a string
    area_of_law: string;          // area_of_law is a string
    total_cases: number;          // total_cases is a number
    courts_appeared: string[];    // courts_appeared is an array of strings
    precedents_cited: number;     // precedents_cited is a number
    rank_in_area: number;         // rank_in_area is a number
    cases: {
      document_id: string;        // document_id is a string
      case_title: string;         // case_title is a string
      court: string;              // court is a string
      year: number;               // year is a number
    }[];
  };
  
  // Type for the main data object
  type CounselData = {
    case_details: {
      success: boolean;           // success is a boolean
      total_cases: number;       // total_cases is a number
      cases: CaseDetail[];       // cases is an array of CaseDetail objects
      error: string | null;      // error is a string or null
    };
    expertise_analytics: {
      success: boolean;          // success is a boolean
      areas: ExpertiseArea[];    // areas is an array of ExpertiseArea objects
      error: string | null;      // error is a string or null
    };
  };
  
  // Type for pagination
  type Pagination = {
    page: number;     // page is a number
    per_page: number; // per_page is a number
    total_pages: number; // total_pages is a number
  };
  
  // Type for metadata
  type Metadata = {
    timestamp: string;   // timestamp is a string (ISO date)
    request_id: string;  // request_id is a string
  };
  
  // Type for the full response
  export type CounselProfileResponse = {
    user_id: string;    // user_id is a string (e.g., 'anonymous')
    counsel_id: number; // counsel_id is a number
    counsel_name: string; // counsel_name is a string
    success: boolean;    // success is a boolean
    data: CounselData;   // data is of type CounselData
    pagination: Pagination; // pagination is of type Pagination
    metadata: Metadata;    // metadata is of type Metadata
  };
  export type GetCounselAppearancesRequest = {
    counsel_id: number;
page: number;
}