import React from "react";
import { MoreIcon, Share1Icon } from "@app/components/icons";
import { Button } from "../ui";
import useQueryToggler from "@app/hooks/useQueryHandler";
import Image from "next/image";
import { DropdownMenuDemo } from "../app/authentication/auth_and_profile";
import Avatarbtn from "./avatarbtn";
import BgClosebtn from "./bgClosebtn";

const ActionButtons = () => {
  const { openCloseMenu, isMenuOpen: isOpen, pathname } = useQueryToggler();

  return (
    <div
      className="w-[20%] z-[99999] relative inline-flex gap-4 justify-end 
    items-center self-stretch pl-2 text-sm
    font-medium leading-4 text-center text-white whitespace-nowrap"
    >
      <span className="mr-[20px]" onClick={openCloseMenu} role="button">
        <MoreIcon />
      </span>
      <BgClosebtn>
        <Avatarbtn classname={` ${pathname === "/" && "hidden"} `} />
        <DropdownMenuDemo
          classname={` ${
            pathname === "/" && "hidden"
          } [&>div]:top-[20px] [&>div]:right-[-15px]  `}
        />
      </BgClosebtn>
      {/* <Button label="share" className="primary" icon={<Share1Icon />} /> */}
    </div>
  );
};

export default ActionButtons;
