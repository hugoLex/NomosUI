import React, {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { NextPage } from "next";
import { SearchResultMeta } from "@app/components/app";

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };

export type GenericObject = { [key: string]: any };

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

export interface LayoutProp extends ComponentProps {}

export type LayoutContextProp = {
  isSearchModal: boolean;
  setIsSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ComponentProps extends PropsWithChildren {
  className?: string;
}

export interface ListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export type FilterOption = { id: string; label?: string; options: any[] };

export type LinkProps = { path: string; label: string };

export type DataProp = {
  content: string;
  slug: string;
};

export type PlatformOS = "Android" | "iOS" | "Linux" | "MacOS" | "Windows";

export type SiteMode = "isLive" | "isComingSoon" | "isMaintenance";

export type TabItem = { active: boolean; id: string; label: string };

export type Case = {};

export type Legislation = {};

export type Article = {};

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

export type LLMData = {
  llm: { replies: string[] };
  retriever?: { documents: { id: string; meta: AIResultMeta }[] };
};

export type LLMError = { detail: string; message?: string };

export type LLMResult = LLMData & LLMError;

export type AIResult = {
  llm: { replies: string[] };
  retriever?: { documents: { id: string; meta: AIResultMeta }[] };
  message?: string;
};

export type SearchData = {
  articlesData: ArticleResults | null;
  legislationsData: LegislationResults | null;
  llmData: AIResult | null;
  casesData: CaseResults | null;
};

export type SearchDataResults =
  | ArticleResults
  | CaseResults
  | LegislationResults;

export type SearchDocuments =
  | CaseDocuments[]
  | LegislationDocuments[]
  | ArticleDocuments[];

export type SearchType = "articles" | "cases" | "legislations";

export type TreatmentTypes =
  | "Positive"
  | "Neutral"
  | "Negative"
  | "Cited by counsel";

export type BigBarForRightSideLayoutProps = {
  title: string;
  icon?: React.ReactElement;
  style: { ctnStyle: string; icon: string };
};

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
  year?: string | number | string[] | number[];
};

export type TSearchResultDocument = {
  id: string;
  content: string;
  context: string | string[];
  metadata: SearchResultDocumentMeta;
};

export type TSearchResultDocumentType = {
  article?: number;
  case?: number;
  legislation?: number;
  principle?: number;
};

export type TSearchResultDocumentsFilter = {
  article: ArticleFilter | null;
  case: CasesFilter | null;
  legislation: LegislationFilter | null;
};

export type TSearchResultDocuments = Omit<TSearchData, "llmData"> & {
  searchID: string;
  query: string;
  total: number;
  results_per_document_type: TSearchResultDocumentType;
  filter_elements: TSearchResultDocumentsFilter;
};

export type TSearchResultData = {
  llmResult: LLMResult | null;
  searchResult: TSearchResultDocuments | null;
};

export type TSearchData = {
  articles: TSearchResultDocument[] | null;
  case: TSearchResultDocument[] | null;
  legislation: TSearchResultDocument[] | null;
  llm: LLMResult | null;
  principle: TSearchResultDocument[] | null;
};
