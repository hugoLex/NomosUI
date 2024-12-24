import React from "react";
import { MoreIcon, Share1Icon } from "@app/components/icons";
import { Button } from "../ui";

const ActionButtons = () => {
  return (
    <div
      className="w-[20%] inline-flex gap-4 justify-end 
    items-center self-stretch pl-2 text-sm
    font-medium leading-4 text-center text-white whitespace-nowrap"
    >
      <span role="button">
        <MoreIcon />
      </span>

      <Button label="share" className="primary" icon={<Share1Icon />} />
    </div>
  );
};

export default ActionButtons;
