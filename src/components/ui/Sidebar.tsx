import React, { FC, Fragment, useState } from "react";
import Link from "next/link";

import { ComponentProps, LinkProps } from "@app/types";

import {
  CloseIcon,
  CompassIcon,
  ExpandIcon,
  LibraryIcon,
  LoginIcon,
  SearchIcon,
} from "../icons";

import { Modal } from ".";
import Image from "next/image";
import { logo, logoIcon } from "@app/assets";
import { useRouter } from "next/router";

type Variant = "default" | "empty";

interface SidebarProps extends ComponentProps {
  links?: LinkProps[];
  variants?: Variant;
}

const Sidebar: FC<SidebarProps> = ({ links, variants = "empty", children }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

  const showLogo = router.asPath !== "/";

  return (
    <Fragment>
      <aside
        className={`sticky top-0 hidden md:block bg-transparent h-screen overflow-y-auto transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[4rem]" : "w-[15rem]"
        }`}
      >
        <div
          className={`min-h-full w-full flex flex-col pt-3 pb-7 grow transition-all duration-300 ease-in-out`}
        >
          <div
            className={`flex items-center transition-all ${
              !isCollapsed
                ? "md:px-5 md:justify-center md:gap-4"
                : "md:justify-center"
            }`}
          >
            {showLogo && (
              <Link href={"/"} className="">
                {isCollapsed ? (
                  <Image src={logoIcon} alt="Logo" className="size-9" />
                ) : (
                  <Image
                    src={logo}
                    alt="Logo"
                    className="shrink-0 max-w-full aspect-[4.35]"
                  />
                )}
              </Link>
            )}
            <button
              title="Collapse"
              role="button"
              onClick={() => setIsCollapsed(true)}
              className={` bg-white/70 rounded-full p-2 ${
                isCollapsed ? "hidden" : "inline-block"
              }`}
            >
              <ExpandIcon className="rotate-180 size-[18px]" />
            </button>
          </div>
          <div className="grow flex-1">
            <div className="w-full px-4">
              <ul className="flex flex-col  py-3 mt-5 text-base font-medium leading-4 text-zinc-600 max-md:px-5">
                <li className="w-full">
                  <Link
                    href={"/"}
                    className={`flex items-center gap-1 text-center whitespace-nowrap text-cyan-950 ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <span className="inline-block shrink-0 w-5 aspect-[1.25]">
                      <SearchIcon />
                    </span>
                    <span className={isCollapsed ? "hidden" : "inline-block"}>
                      Search
                    </span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href={"/"}
                    className={`flex  items-center gap-1 mt-7 text-center whitespace-nowrap ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <span className="inline-block shrink-0 w-5 aspect-[1.25]">
                      <CompassIcon />
                    </span>
                    <span className={isCollapsed ? "hidden" : "inline-block"}>
                      Cases
                    </span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href={"/"}
                    className={`flex items-center gap-1 mt-7 text-center whitespace-nowrap ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <span className="inline-block shrink-0 w-5 aspect-[1.25]">
                      <LibraryIcon />
                    </span>
                    <span className={isCollapsed ? "hidden" : "inline-block"}>
                      Articles
                    </span>
                  </Link>
                </li>
                <li className="w-full">
                  <button
                    className={`w-full flex  items-center gap-1 mt-7 text-center whitespace-nowrap ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                    onClick={() => {
                      // setIsAuthModal(true)
                      router.push("/signin");
                    }}
                  >
                    <span className="inline-block shrink-0 w-5 aspect-[1.25]">
                      <LoginIcon />
                    </span>
                    <span className={isCollapsed ? "hidden" : "inline-block"}>
                      Sign in
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {isCollapsed ? (
              <span
                title="Expand"
                role="button"
                onClick={() => setIsCollapsed(false)}
                className="bg-white/70 focus:outline-none outline-none outline-transparent transition duration-300 ease-in-out font-sans  select-none items-center relative group/button  justify-center text-center  rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-base aspect-square h-10"
              >
                <ExpandIcon />
              </span>
            ) : (
              <div className="flex flex-col px-4 py-1.5 text-sm font-medium text-cyan-950 max-md:mt-10">
                <div className="leading-[143%]">Try Pro</div>
                <div className="leading-5 text-zinc-600">
                  Upgrade for image upload,
                  <br />
                  smarter AI, and more Pro
                  <br />
                  Search.
                </div>
                <div className="flex flex-col justify-center px-2 py-2.5 mt-1 w-full text-center rounded bg-stone-200 leading-[100%]">
                  <div className="flex gap-1 justify-center">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8f2d15a25a6f2034b84fe16cd98c898ce8ad590790a90d80211fe3313f7730c?"
                      className="shrink-0 aspect-[1.28] w-[18px]"
                    />
                    <div>Learn More</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

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
    </Fragment>
  );
};

export default Sidebar;
