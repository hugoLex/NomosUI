export type TCaseData = {
  case_title: string;
  suit_number: string;
  court: string;
  court_division: string | null;
  jurisdiction: string;
  date_decided: string;
  lex_citation: string;
  main_judgement_url: string | null;
  case_summary: string;
  decision_history: string | null;
  ratio_texts: string[];
  judge_ids: number[];
  judge_names: string[];
  analysis_urls: string[];
  subject_matters: string[];
};

export type TPrecedentData = {
  citation_id: number;
  citation: string;
  citation_type: string;
  document_type?: string;
  context: string;
  subject_matters: string[];
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
