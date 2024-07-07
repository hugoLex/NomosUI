import React, {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { NextPage } from "next";

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

export type LinkProps = { path: string; label: string };

export type DataProp = {
  content: string;
  slug: string;
};

export type PlatformOS = "Android" | "iOS" | "Linux" | "MacOS" | "Windows";

export type SiteMode = "isLive" | "isComingSoon" | "isMaintenance";

export type TabItem = { active: boolean; id: string; label: string };

export type SearchResultDocMeta = {
  area_of_law: string[];
  case_title: string;
  court: string;
  source_id: string;
  year: string | number;
};

export type SearchResultFilter = {
  court: string[];
  area_of_law: string[];
  year: string[];
};

export type SearchData = {
  llmResult: AIResult | null;
  searchResult: SearchResult | null;
};

export type SearchResultDoc = {
  id: string;
  content: string;
  context: string | string[];
  metadata: SearchResultDocMeta;
  score: string | number;
};

export type SearchResult = {
  search_id: string;
  filter_elements: SearchResultFilter;
  documents: SearchResultDoc[];
};

export type AIResultMeta = {
  case_title: string;
  court: string;
  year: string | number;
};

export type AIResult = {
  replies: string[];
  meta: AIResultMeta;
};

export type GenericObject = { [key: string]: any };
