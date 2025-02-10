import React, {
  Fragment,
  PropsWithChildren,
  RefObject,
  useContext,
} from "react";
import { useRouter } from "next/router";

import { Header } from "@app/components/ui";
import { ActionButtons } from "@app/components/shared";

import { HiArrowUturnLeft } from "react-icons/hi2";

type NavbarProps = PropsWithChildren & {
  query: string;
  isTitle: boolean;
  referrer?: string;
};

const Navbar = ({
  children,
  query,
  isTitle = false,
  referrer,
}: NavbarProps) => {
  const router = useRouter();
  const handleGoBack = () => {
    if (referrer) {
      router.push(referrer);
    }
  };
  return (
    <Fragment>
      <Header>
        <div
          className="border-b border-solid bg-stone-50 
        border-stone-300 border-opacity-50 rounded-t-lg"
        >
          <div
            className="flex gap-5 justify-between  
          items-center px-4 md:px-8 py-2.5 w-full relative"
          >
            <div className="flex items-center w-[20%] pb-2 gap-2">
              {referrer && (
                <HiArrowUturnLeft
                  className="inline-block items-center align-middle cursor-pointer text-gray-400"
                  size={25}
                  onClick={handleGoBack}
                />
              )}
            </div>

            <div
              className={`flex-1 transition-all duration-300 ${
                !isTitle ? "opacity-1 visible" : "opacity-0 invisible"
              }`}
            >
              <p
                className={`font-medium text-center mx-auto max-w-[50%] text-primary ${
                  query.length > 32 ? "truncate" : ""
                }`}
              >
                {query}
              </p>
            </div>

            {!children && <ActionButtons />}
            {children && children}
          </div>
        </div>
      </Header>
    </Fragment>
  );
};

export default Navbar;
