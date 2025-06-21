import { GenericObject } from ".";

export type SearchResultMeta = {
  area_of_law?: string[];
  year?: string | number | string[] | number[];
};

export type SearchResult = {
  id: string;
  content: string;
  context: string | string[];
  metadata: SearchResultMeta;
};

export type SearchResults = {
  search_id: string;
  filter_elements: any[];
  documents: SearchResult[];
};

export type ArticleFilter = SearchResultMeta & {
  article_title: string[];
  author: string[];
};

export type ArticleMetadata = SearchResultMeta & {
  article_title: string;
  author: string;
};

export type ArticleDocuments = Omit<SearchResult, "metadata"> & {
  metadata: ArticleMetadata;
  score: number;
};

export type ArticleResults = Omit<
  SearchResults,
  "documents" | "filter_elements"
> & {
  documents: ArticleDocuments[];
  filter_elements: ArticleFilter;
  total_articles: number;
};

export type CasesFilter = SearchResultMeta & {
  court: string[];
};

export type CaseMetadata = SearchResultMeta & {
  case_title: string;
  court: string;
  source_id: string;
  suit_number: string;
};

export type CaseDocuments = Omit<SearchResult, "metadata"> & {
  metadata: CaseMetadata;
  score: number;
};

export type CaseResults = Omit<
  SearchResults,
  "documents" | "filter_elements"
> & {
  documents: CaseDocuments[];
  filter_elements: CasesFilter;
  total_cases: number;
};

export type LegislationFilter = SearchResultMeta & {
  document_title: string[];
  section_number: string[];
};

export type LegislationMetadata = SearchResultMeta & {
  document_title: string;
  part_title: string;
  part: string;
  section_number: string;
};

export type PrinciplesFilter = {
  case_title: string[];
  court: string[];
  subject_matter: string[];
  year?: string[] | number[];
};

export type PrinciplesMetadata = SearchResultMeta & {
  document_id: string;
  case_title: string;
  year: string | null | null;
  court: string;
  subject_matter: string[];
};

export type LegislationDocuments = Omit<SearchResult, "metadata"> & {
  metadata: LegislationMetadata;
  score: number;
};

export type LegislationResults = Omit<
  SearchResults,
  "documents" | "filter_elements"
> & {
  documents: LegislationDocuments[];
  filter_elements: LegislationFilter;
  total_legislation: number;
};

export type AIResultMeta = {
  case_title: string;
  court: string;
  year: string | number;
};

export type LLMResult = GenericObject | string;

export type AIResult = {
  llm: { replies: string[] };
  retriever?: { documents: { id: string; meta: AIResultMeta }[] };
  message?: string;
};

export type SearchType = "articles" | "cases" | "legislations" | "principles";

export type SearchResultDocumentMetaDocType =
  | "article"
  | "case"
  | "legislation"
  | "principle";

export type SearchResultDocumentMeta = {
  area_of_law?: string[];
  article_title?: string;
  author?: string;
  case_title?: string;
  court?: string;
  document_id: string;
  document_type: SearchResultDocumentMetaDocType;
  document_title?: string;
  part_title?: string;
  part?: string;
  section_number?: string;
  source_id?: string;
  suit_number?: string;
  subject_matter?: string[];
  summary?: string;
  year?: string | number | string[] | number[];
};

export type TSearchResultDocument = {
  occurrences: { content: string; context: string[] }[];
  metadata: SearchResultDocumentMeta;
};

export type TSearchResultDocumentType = {
  article?: number;
  case?: number;
  legislation?: number;
  principle?: number;
};

export type TSearchResultDocumentsFilter = {
  article?: ArticleFilter;
  case?: CasesFilter;
  legislation?: LegislationFilter;
  principle?: PrinciplesFilter;
};

export type TSearchResultClassifier = {
  classification: string;
  confidence: number;
  is_complex: boolean;
  query: string;
  session_id: string;
  user_message: string;
};



export type TSearchResultDocuments = {
  searchID: string;
  query: string;
  total: number;
  results_per_document_type: TSearchResultDocumentType;
  filter_elements: TSearchResultDocumentsFilter;
  articles?: TSearchResultDocument[];
  cases?: TSearchResultDocument[];
  legislation?: TSearchResultDocument[];
  principles?: TSearchResultDocument[];
};

export type TSearchResultData = {
  llmResult: LLMResult | null;
  searchResult: TSearchResultDocuments | null;
};

export type TSearchData = {
  searchID: string;
  llmData: LLMResult | null;
  articlesData: { documents: TSearchResultDocument[]; total: number } | null;
  casesData: { documents: TSearchResultDocument[]; total: number } | null;
  legislationsData: {
    documents: TSearchResultDocument[];
    total: number;
  } | null;
  principlesData: { documents: TSearchResultDocument[]; total: number } | null;
};

export type Suggestion = {
  id: string;
  relevance: number;
  text: string;
  type: string;
};

export type SearchSuggestion = {
  query: string;
  suggestions: Suggestion[];
  user_id: string;
};



interface DocumentMetadata {
  id: string;
  score: number;
  document_id: string;
  case_title: string;
}

interface DecomposedQuestion {
  question: string;
  answer: string;
}

export interface LegalAnalysisLLMResponse {
  original_question: string;
  decomposed_questions: DecomposedQuestion[];
  final_answer: string;
  document_metadata: DocumentMetadata[];
}