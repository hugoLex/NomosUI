import React, { FC, createContext, useState } from "react";
import { ComponentProps, LayoutContextProp } from "@app/types";
import { Sidebar } from "../ui";

export const AppLayoutContext = createContext<LayoutContextProp>({
  isSearchModal: false,
  setIsSearchModal: () => {},
});

export const AppLayout: FC<ComponentProps> = ({ children }) => {
  const [isSearchModal, setIsSearchModal] = useState<boolean>(false);

  const props = { isSearchModal, setIsSearchModal };

  return (
    <AppLayoutContext.Provider value={props}>
      <div
        className="flex min-h-screen md:h-screen
       bg-[linear-gradient(0deg,#eaf0f2_0%,#eaf0f2_100%,#FFF)]"
      >
        <Sidebar />
        <main
          id="mainWrapper"
          className="relative grow lg:pr-2 lg:py-2 overflow-y-auto md:h-full "
        >
          <div className="relative flex flex-col w-full rounded-lg shadow-sm bg-stone-50 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </AppLayoutContext.Provider>
  );
};
