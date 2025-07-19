
interface Duration {
  total_years: number;
  total_days: number;
}

interface TimelineEvent {
  id: number;
  date: string; // ISO date format (YYYY-MM-DD)
  court: string | null;
  order: number;
  description: string;
}

export interface Timeline {
  duration: Duration;
  events: TimelineEvent[];
}

// interface TimelineData {
//   timeline: Timeline;
// }



interface Ratio {
  id: number;
  text: string;
  // Add other properties that might exist in the ratio object
}

interface IssueWithRatio {
  id: number;
  issue: string;
  priority: number;
  ratios: Ratio[];
}

type IssuesWithRatios = IssueWithRatio[];
export type TCaseData = {
  timeline: Timeline;
  case_title: string | null;
  document_id: string | null;
  suit_number: string | null;
  court: string | null;
  court_division?: string | null;
  jurisdiction: string | null;
  date_decided: string | null;
  lex_citation: string | null;
  case_summary: string | null;
  decision_history: string | null;
  ratio_decidendi: string[];
  judge_ids: number[];
  judges: { id: string; name: string }[];
  counsels: { id: string; name: string }[];
  cause_of_action: string[];
  main_judgement_url: string | null;
  analysis_url: string | null;
  subject_matter: string[];
  issues_with_ratios: IssuesWithRatios
};

export type TPrecedentData = {
  citation_id: number;
  citation: string;
  citation_type: string;
  context: string;
  document_type?: string;
  subject_matters?: string[];
  treatment_type: string;
};

export type TCase = {
  user_id: string;
  case_data: TCaseData;
};

export type TPrecedent = {
  user_id: string;
  cited_cases: TPrecedentData[];
};

export type SelectedTreatment = "all" | "positive" | "negative" | "neutral";

export type TCaseDocument = Omit<TCaseData, "main_judgement_url"> & {
  judgement?: string | null;
};

export type LegalPersonnal = { id: string; name: string; title?: string, representation?: string | null; profile_url?: string | null };
export type JudicialPersonnal = { id: string; name: string; title?: string, disposition?: string | null; profile_url?: string | null };

export type PersonnalData = {
  judges: JudicialPersonnal[];
  counsels: LegalPersonnal[];
};
