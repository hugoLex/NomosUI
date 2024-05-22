import React, { FC, createContext, useState } from "react";
import { useRouter } from "next/router";

import { ComponentProps, LayoutContextProp } from "@app/types";
import { Sidebar, View } from "../ui";
import { SearchModal } from "../app";

export const AppLayoutContext = createContext<LayoutContextProp>({
  isSearchModal: false,
  setIsSearchModal: () => {},
});

export const AppLayout: FC<ComponentProps> = ({ children }) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [isSearchModal, setIsSearchModal] = useState<boolean>(false);

  const props = { isSearchModal, setIsSearchModal };

  return (
    <AppLayoutContext.Provider value={props}>
      <div className="flex h-full min-h-[100vh] bg-[linear-gradient(0deg,#F3F3EE_0%,#F3F3EE_100%,#FFF)]">
        <Sidebar />
        <View className="grow lg:pr-2 lg:py-2">
          <div className="h-full w-full rounded-lg shadow-sm bg-stone-50 max-md:max-w-full">
            {children}
          </div>
        </View>
        <SearchModal />
      </div>
    </AppLayoutContext.Provider>
  );
};
