import React, { FC, Fragment, PropsWithChildren, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { ComponentProps } from "@app/types";
import { Button, Footer, Header, Sidebar } from "../ui";

import { LayoutContext } from ".";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const values = {};

  return (
    <LayoutContext.Provider value={values}>
      <Header variants="default"></Header>
      {children}
      <Footer />
    </LayoutContext.Provider>
  );
};
export default BaseLayout;
