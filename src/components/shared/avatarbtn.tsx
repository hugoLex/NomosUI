import useQueryToggler from "@app/hooks/useQueryHandler";
import Image from "next/image";
import React from "react";

function Avatarbtn({ classname }: { classname?: string }) {
  const { openCloseMenu, isMenuOpen: isOpen } = useQueryToggler();

  return (
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
      className={` ${classname} relative  w-[20px] h-[20px] ml-auto overflow-clip rounded-full cursor-pointer`}
    >
      <Image fill src="/images/auth_pixel.jpeg" alt="@shadcn" />
    </div>
  );
}

export default Avatarbtn;
