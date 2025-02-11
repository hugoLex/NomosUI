export type TCaseData = {
  case_title: string | null;
  suit_number: string | null;
  court: string | null;
  court_division?: string | null;
  jurisdiction: string | null;
  date_decided: string | null;
  lex_citation: string | null;
  main_judgement_url?: string | null;
  case_summary: string | null;
  decision_history?: string | null;
  ratio_decidendi: string[];
  judge_ids: number[];
  judges: { id: string; name: string }[];
  counsels: string[];
  cause_of_action?: string[];
  analysis_url: string[];
  subject_matters?: string[];
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

export type TCaseDocument = Omit<TCaseData, "main_judgement_url"> & {
  judgement?: string | null;
};
