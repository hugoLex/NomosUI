import React, { FC, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { ComponentProps, LinkProps } from "@app/types";

import {
  CloseIcon,
  CollapseIcon,
  CompassIcon,
  ExpandIcon,
  LibraryIcon,
  LoginIcon,
  MenuIcon,
  SearchIcon,
} from "../icons";
import { DetectOutsideClick } from "@app/hoc";
import { logo, logoIcon } from "@app/assets";
import { spawn } from "child_process";

type Variant = "default" | "empty";

interface SidebarProps extends ComponentProps {
  links?: LinkProps[];
  variants?: Variant;
}

const Sidebar: FC<SidebarProps> = ({ links, variants = "empty", children }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <aside className="hidden md:block bg-transparent">
      <div
        className={`relative overflow-hidden group/bar transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[5.625rem]" : "w-[15rem]"
        }`}
      >
        <div
          className={`fixed z-20 h-full transition-all duration-300 ease-in-out bg-transparent py-3 ${
            isCollapsed ? "w-[5.625rem]" : "w-[15rem]"
          }`}
        >
          <div className="sticky top-0 flex h-full flex-col justify-between overflow-y-auto overflow-x-hidden pt-3 pb-2 scrollbar-hide ">
            <div className="grow">
              <div className="flex gap-4 justify-between items-center px-4 py-0.5">
                {isCollapsed && (
                  <Link
                    href={"/"}
                    className="transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    <Image src={logoIcon} alt="Logo" />
                  </Link>
                )}

                {!isCollapsed && (
                  <div className="flex items-center gap-4 ">
                    <Link href={"/"} className="inline-block">
                      <Image
                        src={logo}
                        alt="Logo"
                        className="shrink-0 max-w-full aspect-[4.35]"
                      />
                    </Link>

                    <span
                      title="Collapse"
                      role="button"
                      onClick={() => setIsCollapsed(true)}
                      className="inline-block"
                    >
                      <CollapseIcon />
                    </span>
                  </div>
                )}
              </div>
              <div>
                <ul className="flex flex-col px-4 py-3 mt-5 text-base font-medium leading-4 text-zinc-600 max-md:px-5">
                  <li>
                    <Link
                      href={"/"}
                      className="flex items-center gap-1 whitespace-nowrap text-cyan-950"
                    >
                      <span className="inline-block shrink-0 w-5 aspect-[1.25]">
                        <SearchIcon />
                      </span>
                      <span className="inline-block">Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/"}
                      className="flex items-center gap-1 mt-7 whitespace-nowrap"
                    >
                      <span className="inline-block shrink-0 w-5 aspect-[1.25]">
                        <CompassIcon />
                      </span>
                      <span className="inline-block">Discover</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/"}
                      className="flex  items-center gap-1 mt-7 text-center whitespace-nowrap"
                    >
                      <span className="inline-block shrink-0 w-5 aspect-[1.25]">
                        <LibraryIcon />
                      </span>
                      <span className="inline-block">Library</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/"}
                      className="flex items-center gap-1 mt-7 text-center"
                    >
                      <span className="inline-block shrink-0 w-5 aspect-[1.25]">
                        <LoginIcon />
                      </span>
                      <span className="inline-block">Sign in</span>
                    </Link>
                  </li>
                </ul>
                <div className="justify-center items-center px-16 py-3 mx-4 mt-4 text-base font-medium leading-4 text-center text-white bg-cyan-700 rounded-full max-md:px-5 max-md:mx-2.5">
                  Sign Up
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              {isCollapsed && (
                <span
                  title="Expand"
                  role="button"
                  onClick={() => setIsCollapsed(false)}
                  className="bg-[#E8E8E3] focus:outline-none outline-none outline-transparent transition duration-300 ease-in-out font-sans  select-none items-center relative group/button  justify-center text-center  rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-base aspect-square h-10"
                >
                  <ExpandIcon />
                </span>
              )}
              {!isCollapsed && (
                <div className="flex flex-col px-4 py-1.5 mt-96 text-sm font-medium text-cyan-950 max-md:mt-10">
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
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
