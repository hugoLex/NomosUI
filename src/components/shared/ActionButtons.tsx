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
      className=" max-w-[200px] z-[99999] relative inline-flex gap-4 justify-end 
    items-center self-stretch pl-2 text-sm
    font-medium leading-4 text-center text-white whitespace-nowrap min-h-[36px]"
    >
      <span className="mr-[20px]" onClick={openCloseMenu} role="button">
        <MoreIcon />
      </span>
      {/* The trinity components, Avatarbtn, DropdownMenuDemo and BgClosebtn must be used together to get the present ux, to ensure flexibility in the use of the components
      it is separated, hence you can position the component any where and still get the functionality.
      by including pathname === "<add the path where you want the component to work or not work in>" you can control whether it appears or not in a page
      e.g pathname === "/" && "hidden", the component will not appear in home*/}
      {/* Avatarbtn toggles DropdownMenuDemo to open and close */}
      <Avatarbtn classname={` ml-0 ${pathname === "/" && "hidden"} `} />
      {/* DropdownMenuDemo is the main component with menu buttons  */}
      <DropdownMenuDemo
        classname={` ${
          pathname === "/" && "hidden"
        } [&>div]:top-[20px] [&>div]:right-[-32px]  `}
      />
      {/* This is a background that covers the full screen, 
      hence when you click outside the DropdownMenuDemo, 
      it closes DropdownMenuDemo. 
      You can add DropdownMenuDemo and Avatarbtn in BgClosebtn as it's children, 
      how ever you can add an element when you place them outside BgClosebtn*/}
      <BgClosebtn>
        <span></span>
      </BgClosebtn>
      {/* <Button label="share" className="primary" icon={<Share1Icon />} /> */}
    </div>
  );
};

export default ActionButtons;
