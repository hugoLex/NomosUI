import React from "react";
import { MoreIcon, Share1Icon } from "@app/components/icons";
import { Button } from "../ui";
import useQueryToggler from "@app/hooks/useQueryHandler";

const ActionButtons = () => {
  const { openCloseMenu, isMenuOpen: isOpen } = useQueryToggler();
  return (
    <div
      className="w-[20%] z-[99999] relative inline-flex gap-4 justify-end 
    items-center self-stretch pl-2 text-sm
    font-medium leading-4 text-center text-white whitespace-nowrap"
    >
      <span onClick={openCloseMenu} role="button">
        <MoreIcon />
      </span>

      <Button label="share" className="primary" icon={<Share1Icon />} />
    </div>
  );
};

export default ActionButtons;
