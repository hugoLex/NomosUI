import React, { Fragment, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { Header } from "@app/components/ui";
import { ActionButtons } from "@app/components/shared";

type NavbarProps = PropsWithChildren & {
  referrer?: string;
};

type NavbarTitleProps = {
  title?: string;
  isTitle: boolean;
  className?: string;
};

const NavbarTitle = ({
  isTitle = false,
  title,
  className,
}: NavbarTitleProps) => {
  return (
    <div
      className={`flex-1 transition-all duration-300 ${
        isTitle ? "opacity-1 visible" : "opacity-0 invisible"
      }`}
    >
      <p
        className={`font-medium text-center  text-primary 
          ${title && title.length > 32 ? "truncate" : ""}
          ${className ? className : ""}
        `}
      >
        {title}
      </p>
    </div>
  );
};

const Navbar = ({ children, referrer }: NavbarProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    // Please what is referrer
    // uncomment and rewrite the code to ensure it works well
    // if (referrer) {
    //   router.push(referrer);
    // }
    router.back();
  };
  return (
    <Fragment>
      <Header>
        <div className="min-h-[44px] border-b border-solid bg-stone-50 border-stone-300 border-opacity-50 rounded-t-lg">
          <div className="flex gap-5 justify-between items-center px-4 md:px-8  w-full relative">
            <div className="flex items-center md:min-w-[10%] gap-2">
              {/* {referrer && ( */}
              <HiArrowUturnLeft
                className="inline-block items-center align-middle cursor-pointer text-gray-400"
                size={25}
                onClick={handleGoBack}
              />
              {/* )} */}
            </div>

            {!children && (
              <div className="flex-1 flex justify-end py-2.5">
                <ActionButtons />
              </div>
            )}
            {children && <div className="flex-1">{children}</div>}
          </div>
        </div>
      </Header>
    </Fragment>
  );
};

export { Navbar, NavbarTitle };
