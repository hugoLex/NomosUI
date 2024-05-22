import React, { FC, createContext, useState } from "react";
import { useRouter } from "next/router";

import { ComponentProps, LayoutContextProp } from "@app/types";
import { Footer, Header } from "../ui";

export const BaseLayoutContext = createContext<LayoutContextProp>({
  isSearchModal: false,
  setIsSearchModal: () => {},
});

export const BaseLayout: FC<ComponentProps> = ({ children }) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [isSearchModal, setIsSearchModal] = useState<boolean>(false);

  const props = { isSearchModal, setIsSearchModal };

  return (
    <BaseLayoutContext.Provider value={props}>
      <Header variants="default"></Header>
      {children}
      <Footer />
    </BaseLayoutContext.Provider>
  );
};
export default BaseLayout;
