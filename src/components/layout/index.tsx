import { ComponentProps } from "@app/types";
import { Fragment, createContext } from "react";
import BaseLayout from "./BaseLayout";
import AppLayout from "./AppLayout";

export interface LayoutProp extends ComponentProps {}

export type LayoutContextProp = {};

export const LayoutContext = createContext<LayoutContextProp>({
  storeRedirect: () => {
    console.log("default");
  },
});

export const Layout = () => <Fragment></Fragment>;

Layout.BaseLayout = BaseLayout;
Layout.AppLayout = AppLayout;
