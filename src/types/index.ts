import React, {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { NextPage } from "next";
import { SearchResultMeta } from "@app/components/app";

export * from "./cases";
export * from "./search";

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
