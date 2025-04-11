import { useState } from "react";

type MenuItemProps = {
  label: string;
  shortcut?: string;
  disabled?: boolean;
};

import Image from "next/image";
import Cookies from "js-cookie";
import useQueryToggler from "@app/hooks/useQueryHandler";
import { useFetchUserInfoQuery } from "@app/store/services/authenticationslice";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
export function DropdownMenuDemo() {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const
  const user_id = Cookies.get("user_id");
  const refresh_token = Cookies.get("refresh_token");
  const { data } = useFetchUserInfoQuery(user_id ?? skipToken);
  console.log("User info", data);
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
  const { openCloseMenu, isMenuOpen: isOpen } = useQueryToggler();
  return (
    <div className="relative inline-bl ock text-right pb-[8px]">
      {/* Trigger Button */}
      <div
        // onClick={() => setIsOpen(!isOpen)}
        onClick={
          openCloseMenu
          //   () => {
          //   if (isOpen === "true") {
          //     removeQueryParam("menu");
          //   }
          //   if (!isOpen) {
          //     UpdateUrlParams("menu", "true");
          //   }
          // }
        }
        className="relative w-[20px] h-[20px] ml-auto overflow-clip rounded-full cursor-pointer"
      >
        <Image fill src="/images/auth_pixel.jpeg" alt="@shadcn" />
      </div>
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors w-[100px] "
      >
      
      </button> */}

      {/* Dropdown Menu */}
      {isOpen == "true" && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {/* My Account */}
            <div className="px-4 py-2 text-sm truncate font-medium text-gray-700">
              {data && data.full_name}
            </div>
            <div className="border-t border-gray-200"></div>

            {/* Group 1 */}
            <div className="space-y-1">
              <MenuItem label="Profile" shortcut="⇧⌘P" />
              <MenuItem label="Billing" shortcut="⌘B" />
              <MenuItem label="Settings" shortcut="⌘S" />
              {/* <MenuItem label="Keyboard shortcuts" shortcut="⌘K" /> */}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Group 2 */}
            <div className="space-y-1">
              {/* <MenuItem label="Team" /> */}

              {/* Submenu */}
              <div className="relative">
                {/* <button
                  onClick={() => setSubMenuOpen(!subMenuOpen)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                >
                  Invite users
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button> */}

                {subMenuOpen && (
                  <div className="absolute right-full top-0 ml-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <MenuItem label="Email" />
                      <MenuItem label="Message" />
                      <div className="border-t border-gray-200"></div>
                      <MenuItem label="More..." />
                    </div>
                  </div>
                )}
              </div>

              {/* <MenuItem label="New Team" shortcut="⌘+T" /> */}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Remaining Items */}
            {/* <MenuItem label="GitHub" /> */}
            <MenuItem label="Support" />
            {/* <MenuItem label="API" disabled /> */}

            <div className="border-t border-gray-200"></div>

            {refresh_token ? (
              <MenuItem label="Log out" shortcut="⇧⌘Q" />
            ) : (
              <Link
                className={`w-full text-left px-4 py-2 text-sm ${"text-gray-700 hover:bg-gray-100"} flex justify-between items-center`}
                href={"/auth/login"}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for menu items
const MenuItem: React.FC<MenuItemProps> = ({
  label,
  shortcut,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("user_id");
        //   api.dispatch(logOut());
        window.location.href = "/auth/login";
      }}
      className={`w-full text-left px-4 py-2 text-sm ${
        disabled ? "text-gray-400" : "text-gray-700 hover:bg-gray-100"
      } flex justify-between items-center`}
    >
      {label}
      {shortcut && <span className="text-xs text-gray-500">{shortcut}</span>}
    </button>
  );
};
