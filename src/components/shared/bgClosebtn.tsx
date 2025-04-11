import useQueryToggler from "@app/hooks/useQueryHandler";
import React from "react";

// Define the props interface for the component
interface BgClosebtnProps {
  children: React.ReactNode; // Allows any valid React node as children
  classname?: string; // Optional prop of type string
}

function BgClosebtn({ children, classname }: BgClosebtnProps) {
  const { openCloseMenu, isMenuOpen } = useQueryToggler();

  return (
    <div
      onClick={openCloseMenu}
      className={` ${classname} max-md:hidden fixed top-[20px] right-[25px] h-[90%] ${
        isMenuOpen ? "z-[99999] w-[100%]" : "z-[1]"
      } bg-red- 600`}
    >
      {/* Render the children */}
      {children}
    </div>
  );
}

export default BgClosebtn;
