import React, { FC, useState } from "react";

type AccordionProps = {
  body: string;
  bodyColor?: string;
  titleColor?: string;
  title: string;
};

const Accordion: FC<AccordionProps> = ({
  body,
  bodyColor,
  title,
  titleColor,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className={`border-b border-solid  py-4 scrollbar-hide 
     ${bodyColor ? bodyColor : "border-black"}
     `}
    >
      <button
        className={`${
          titleColor ? titleColor : ""
        } py-2 text-[1.125rem] font-semibold font-paytone w-full text-start`}
        onClick={() => setIsActive(!isActive)}
      >
        <span className="inline-block">{isActive ? "-" : "+"}</span>
        <span className={`inline-block ml-3 ${titleColor ? titleColor : ""}`}>
          {title}
        </span>
      </button>
      <div className={`relative ml-6 ${isActive ? "show" : "hide"} `}>
        <div
          className={` absolute -top-1 left-0 w-[3px] h-auto min-h-full rounded 
          ${bodyColor ? "bg-white" : "bg-black"}
          `}
        />
        <p className={`${bodyColor ? bodyColor : ""} ms-3`}>{body}</p>
      </div>
    </div>
  );
};

export default Accordion;
