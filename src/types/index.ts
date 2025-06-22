import type {
  ComponentType,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  SetStateAction,
} from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";

export * from "./library";
export * from "./search";
export * from "./taxonomy";
export * from "./analytics";

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
  // layout?: ComponentType;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type errorRTK = { data: { detail: string }; status: number };
export interface LayoutProp extends ComponentProps {}

export type LayoutContextProp = {
  isSearchModal: boolean;
  setIsSearchModal: Dispatch<SetStateAction<boolean>>;
  referrer?: string;
  setReferrer: Dispatch<SetStateAction<string | undefined>>;
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

export type MenuLink = LinkProps & {
  icon?: ReactElement;
  children?: MenuLink[];
};

export type Error = { detail: string; message?: string };
