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

export type SearchResultMeta = {
  area_law: string[];
  case_title: string;
  court: string;
  source_id: string;
  year: string | number;
};

export type SearchResult = {
  id: string;
  content: string;
  metadata: SearchResultMeta;
  score: string;
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
