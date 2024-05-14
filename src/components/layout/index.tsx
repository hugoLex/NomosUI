import { Fragment, createContext } from "react";
import { ComponentProps, LayoutContextProp } from "@app/types";
import BaseLayout from "./BaseLayout";
import AppLayout from "./AppLayout";

export const LayoutContext = createContext<LayoutContextProp>({
  storeRedirect: () => {
    console.log("default");
  },
});

export const Layout = () => <Fragment></Fragment>;

Layout.BaseLayout = BaseLayout;
Layout.AppLayout = AppLayout;
