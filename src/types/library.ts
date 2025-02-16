export type TCaseData = {
  case_title: string | null;
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
  counsels: string[];
  cause_of_action: string[];
  main_judgement_url: string | null;
  analysis_url: string | null;
  subject_matter: string[];
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
