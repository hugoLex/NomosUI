import React, { FC, createContext, useRef, useState } from "react";
import { ComponentProps, LayoutContextProp } from "@app/types";
import { SearchBoxModal, Sidebar } from "../shared";
import { menuList } from "@app/utils";
import { CloseIcon } from "../icons";
import { Modal } from "../ui";

export const AppLayoutContext = createContext<LayoutContextProp>({
  isSearchModal: false,
  setIsSearchModal: () => {},
});

export const AppLayout: FC<ComponentProps> = ({ children }) => {
  const [isSearchModal, setIsSearchModal] = useState<boolean>(false);
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

  const searchRef = useRef<HTMLTextAreaElement | null>(null);

  const props = { isSearchModal, setIsSearchModal };

  return (
    <AppLayoutContext.Provider value={props}>
      <div
        className="flex min-h-screen
       bg-[linear-gradient(0deg,#eaf0f2_0%,#eaf0f2_100%,#FFF)]"
      >
        <Sidebar links={menuList} />
        <main
          id="mainWrapper"
          className="relative grow lg:pr-2 lg:py-2 min-h-full "
        >
          <div className="relative flex flex-col w-full rounded-lg shadow-sm bg-stone-50 min-h-full">
            {children}
          </div>
        </main>
      </div>
      <SearchBoxModal innerRef={searchRef} />
      <Modal show={isAuthModal} toogleModal={() => setIsAuthModal(false)}>
        <div className="rounded-lg shadow-md  py-4 bg-stone-50 max-w-[600px]">
          <div className="flex justify-end px-4">
            <span role="button" onClick={() => setIsAuthModal(false)}>
              <CloseIcon />
            </span>
          </div>
          <div className="flex flex-col self-stretch ">
            <div className="flex flex-col px-4 w-full max-md:max-w-full">
              <h4 className="text-2xl font-thin text-center text-cyan-700  ">
                Welcome
              </h4>
              <div className="flex flex-col px-20 pt-2 text-base text-cyan-950 max-md:px-5 max-md:max-w-full">
                <div className="self-center text-center leading-[150%] text-zinc-600">
                  Sign in or sign up to continue
                </div>
                <div className="flex flex-col justify-center px-4 py-3 mx-3 mt-4 font-medium text-center rounded-full bg-stone-200 leading-[100%] max-md:mx-2.5">
                  <div className="flex gap-1 justify-center px-20 max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bf67acdac094c629d3dd740c18e6804e9780d149810f57515b4b7b186723170?"
                      className="shrink-0 w-5 aspect-[1.25]"
                    />
                    <div>Continue with Google</div>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-3 mx-3 mt-2 font-medium text-center rounded-full bg-stone-200 leading-[100%] max-md:mx-2.5">
                  <div className="flex gap-1 justify-center px-20 max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4036f020978bf42229aa9fe780e41e46e99dc92b9f4b6d86d95eec5491937b0?"
                      className="shrink-0 w-5 aspect-[1.25]"
                    />
                    <div>Continue with Apple</div>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-3 mx-3 mt-2 font-medium text-center rounded-full bg-stone-200 leading-[100%] max-md:mx-2.5">
                  <div className="flex gap-1 justify-center px-14 max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/da7376ee824de44cca1ee927454648a6feefcd40700c4afc9ff167ba3d95c642?"
                      className="shrink-0 w-5 aspect-[1.25]"
                    />
                    <div>Single Sign-on (SAML SSO)</div>
                  </div>
                </div>
                <div className="flex flex-col pt-4 pb-2.5 mx-3 mt-4 text-sm border-t border-solid border-stone-300 border-opacity-50 text-zinc-600 max-md:mx-2.5">
                  <div className="items-start px-4 pt-2.5 pb-3 whitespace-nowrap border border-solid bg-stone-50 border-stone-300 rounded-[32px] max-md:pr-5">
                    henry@example.com
                  </div>
                  <div className="self-center mt-4 font-medium text-center leading-[100%]">
                    Continue with Email
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </AppLayoutContext.Provider>
  );
};
