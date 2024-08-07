import React, { FC, createContext, useState } from "react";
import { useRouter } from "next/router";

import { ComponentProps, LayoutContextProp } from "@app/types";

export const AuthLayoutContext = createContext<LayoutContextProp>({
  isSearchModal: false,
  setIsSearchModal: () => {},
});

export const AuthLayout: FC<ComponentProps> = ({ children }) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [isSearchModal, setIsSearchModal] = useState<boolean>(false);

  const props = { isSearchModal, setIsSearchModal };

  return (
    <AuthLayoutContext.Provider value={props}>
      <main
        className="min-h-screen md:h-screen
       bg-[linear-gradient(0deg,#eaf0f2_0%,#eaf0f2_100%,#FFF)]"
      >
        <div
          id="mainWrapper"
          className="relative grow lg:px-2 lg:py-2 overflow-y-auto md:h-full "
        >
          <div className="flex flex-col w-full rounded-lg shadow-sm bg-stone-50 min-h-full">
            {children}
          </div>
        </div>
      </main>
    </AuthLayoutContext.Provider>
  );
};
export default AuthLayout;
