import React, {
  FC,
  Fragment,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { AppLayoutContext } from "@app/components/layout";

import { ComponentProps, MenuLink } from "@app/types";

import {
  ExpandIcon,
  LoginIcon,
  Search2,
  Library2,
  Bench2,
  FilterIcon3,
  PlusIcon,
} from "../icons";

import { logo, logoIcon } from "@app/assets";
import { getCookie } from "@app/utils";

type Variant = "default" | "empty";

interface SidebarProps extends ComponentProps {
  links?: MenuLink[];
  variants?: Variant;
}

const MenuIcons = ({ path }: { path: string }) => {
  return (
    <Fragment>
      <span className="inline-block shrink-0 w-5 aspect-[1.25] align-middle">
        {path === "/" && <Search2 />}
        {path === "/library" && <Library2 />}
        {path === "/analytics" && <Bench2 />}
        {path === "/taxonomy" && <FilterIcon3 />}
      </span>
    </Fragment>
  );
};

const Sidebar: FC<SidebarProps> = ({ links, variants = "empty", children }) => {
  const router = useRouter();
  const { setIsSearchModal } = useContext(AppLayoutContext);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const isHome = router.asPath === "/";
  const sidebarWidth = isCollapsed ? "md:w-[90px]" : "md:w-[220px]";

  useEffect(() => {
    const isSidebar = getCookie("isSidebar");

    if (isSidebar) {
      isSidebar === "true" ? setIsCollapsed(true) : setIsCollapsed(false);
    }

    return () => {};
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    document.cookie = `isSidebar=${!isCollapsed}`;
  };

  return (
    <Fragment>
      <aside
        className={`relative hidden md:block bg-transparent 
          h-screen overflow-y-auto transition-all duration-500
         ease-in-out z-10 `}
      >
        <div className={`isolate h-full ${sidebarWidth}`}>
          <div className={`fixed h-full ${sidebarWidth}`}>
            <div
              className={`hidden min-h-full md:flex flex-col  pt-3 
            pb-7 grow ${sidebarWidth} overflow-x-hidden`}
            >
              {/* Logo */}
              <div
                className={`flex py-2.5 items-center transition-all ${
                  !isCollapsed
                    ? "px-4 max-md:px-5 md:justify-center md:gap-4"
                    : "md:justify-center"
                }${isCollapsed && isHome ? "hidden" : ""}`}
              >
                <Link
                  title="Home Page"
                  href={"/"}
                  className={`transition-all duration-200  ${
                    isHome ? "invisible opacity-0" : "visible opacity-100"
                  }`}
                >
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

                <button
                  title="Collapse"
                  role="button"
                  onClick={toggleSidebar}
                  className={` bg-white/70 rounded-full p-2 ${
                    isCollapsed ? "hidden" : "inline-block"
                  }`}
                >
                  <ExpandIcon className="rotate-180 size-[18px]" />
                </button>
              </div>

              {/* Menu */}
              <div className="flex-1">
                <div className="flex justify-center my-6 px-4 max-md:px-5">
                  <div
                    role="button"
                    onClick={() => {
                      setIsSearchModal(true);
                    }}
                    className={`inline-flex items-center text-sm bg-white text-center rounded-full border border-gray-50 ${
                      isCollapsed
                        ? "h-10 w-10 justify-center hover:scale-125"
                        : "py-2 px-4 w-full"
                    }`}
                  >
                    <PlusIcon />
                    {!isCollapsed && <span>New Search</span>}
                  </div>
                </div>

                <ul className="flex flex-col gap-2 py-3 w-full ">
                  {links &&
                    links.map(({ label, children, path }, idx) => (
                      <Fragment key={path}>
                        <li
                          title={label}
                          className={`relative w-full min-h-10 flex flex-col justify-center group text-base font-medium 
                          leading-4 text-zinc-600 px-4 max-md:px-5 `}
                        >
                          {!children && (
                            <Link
                              href={path}
                              className={`flex items-center gap-1 text-center whitespace-nowrap 
                               ${isCollapsed ? "justify-center" : ""}
                              ${
                                path === router.asPath
                                  ? "text-primary font-medium"
                                  : "hover:text-primary"
                              }
                              `}
                            >
                              <MenuIcons path={path} />
                              <span
                                className={
                                  isCollapsed ? "hidden" : "inline-block pl-2"
                                }
                              >
                                {label}
                              </span>
                            </Link>
                          )}

                          {children && (
                            <Fragment>
                              <span
                                role="button"
                                className={`flex items-center gap-1 text-center
                               whitespace-nowrap  ${
                                 isCollapsed ? "justify-center" : "pb-2"
                               }`}
                                id={`menu-item-${idx}`}
                                aria-expanded="true"
                                aria-haspopup="true"
                              >
                                <MenuIcons path={path} />
                                <span
                                  className={
                                    isCollapsed ? "hidden" : "inline-block pl-2"
                                  }
                                >
                                  {label}
                                </span>
                              </span>
                              <ul
                                className={`space-y-2 transition-all ${
                                  isCollapsed
                                    ? `absolute opacity-0 invisible 
                                bg-white drop-shadow-md rounded z-10 -top-3 p-2 left-full translate-z-0 min-w-[8rem]
                                  group-hover:opacity-100 group-hover:visible group-hover:translate-z-[5%]
                                  `
                                    : "relative ml-4"
                                }`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby={`menu-item-${idx}`}
                                tabIndex={-1}
                              >
                                {children.map(
                                  ({
                                    label: subLabel,
                                    path: subPath,
                                    children,
                                  }) => (
                                    <li
                                      key={subPath}
                                      title={subLabel}
                                      className="border-l border-[#64645F]"
                                    >
                                      <Link
                                        href={`${path}${subPath}`}
                                        className={`text-center whitespace-nowrap 
                                       
                                  ${
                                    `${path}${subPath}` === router.asPath
                                      ? "text-primary font-medium"
                                      : "hover:text-primary"
                                  }
                                        `}
                                      >
                                        <span className="pl-2 text-sm">
                                          {subLabel}
                                        </span>
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </Fragment>
                          )}

                          {isCollapsed && path === router.asPath && (
                            <div className="absolute rounded-l-sm w-[3px] h-full right-0 top-0 bg-primary" />
                          )}
                        </li>
                      </Fragment>
                    ))}

                  <li title="Sign in" className="w-full hidden">
                    <Link
                      href={"/signin"}
                      className={`w-full flex  items-center gap-1 text-center whitespace-nowrap ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <span className="inline-block shrink-0 w-5 aspect-[1.25]">
                        <LoginIcon />
                      </span>
                      <span
                        className={`hover:text-primary ${
                          isCollapsed ? "hidden" : "inline-block pl-2"
                        }`}
                      >
                        Sign in
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Extras */}
              <div className="flex flex-col items-center justify-center">
                {isCollapsed ? (
                  <span
                    title="Expand"
                    role="button"
                    onClick={toggleSidebar}
                    className="bg-white/70 focus:outline-none outline-none outline-transparent transition duration-300 ease-in-out font-sans  select-none items-center relative group/button  justify-center text-center  rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-base aspect-square h-10"
                  >
                    <ExpandIcon />
                  </span>
                ) : (
                  <Fragment>
                    <div className="md:hidden flex flex-col px-4 py-1.5 text-sm font-medium text-cyan-950 max-md:mt-10">
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
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default memo(Sidebar);
