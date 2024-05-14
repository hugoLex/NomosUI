import React, { FC, useState } from "react";
import { useRouter } from "next/router";

import { ComponentProps } from "@app/types";
import { Footer, Header } from "../ui";
import { LayoutContext } from ".";

const BaseLayout: FC<ComponentProps> = ({ children }) => {
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
