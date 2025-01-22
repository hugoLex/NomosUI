import React, { useRef } from "react";
import { SearchBarAnalytics } from "@app/components/shared";
import { LibraryHeader } from "../library";

const BenchHeader = () => {
  const searchRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    // <div className="[&_.alterpadding]:px-0">
    <LibraryHeader searchBtnRef={searchRef} />
    // </div>
    // <div className="flex justify-between pb-[32px] pt-[15px] font-rubik ">
    //   <h3 className=" flex items-center gap-5 ">
    //     <svg
    //       className=""
    //       width="35"
    //       height="31"
    //       viewBox="0 0 35 31"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M15.875 3.5625C15.3594 3.5625 14.9375 3.98438 14.9375 4.5V15.75V27C14.9375 27.5156 15.3594 27.9375 15.875 27.9375H30.875C31.3906 27.9375 31.8125 27.5156 31.8125 27V4.5C31.8125 3.98438 31.3906 3.5625 30.875 3.5625H15.875ZM12.125 4.5C12.125 2.43164 13.8066 0.75 15.875 0.75H30.875C32.9434 0.75 34.625 2.43164 34.625 4.5V27C34.625 29.0684 32.9434 30.75 30.875 30.75H15.875C13.8066 30.75 12.125 29.0684 12.125 27V4.5ZM6.5 4.96875C6.5 4.18945 7.12695 3.5625 7.90625 3.5625C8.68555 3.5625 9.3125 4.18945 9.3125 4.96875V26.5312C9.3125 27.3105 8.68555 27.9375 7.90625 27.9375C7.12695 27.9375 6.5 27.3105 6.5 26.5312V4.96875ZM0.875 7.78125C0.875 7.00195 1.50195 6.375 2.28125 6.375C3.06055 6.375 3.6875 7.00195 3.6875 7.78125V23.7188C3.6875 24.498 3.06055 25.125 2.28125 25.125C1.50195 25.125 0.875 24.498 0.875 23.7188V7.78125Z"
    //         fill="#13343B"
    //       />
    //     </svg>
    //     <span className="text-[1.875rem] font-normal">Library</span>
    //   </h3>

    //   <SearchBarAnalytics classname="basis-[56%]" type="counsel" />
    // </div>
  );
};

export default BenchHeader;
