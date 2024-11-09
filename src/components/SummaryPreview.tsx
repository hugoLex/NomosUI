import React, { Fragment, useState } from "react";
import { CaretDown, CaretUp } from "./icons";

const SummaryPreview = ({ text }: { text: string }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const isShow = text.length > 100 ? true : false;

  return (
    <div className={`summary preview relative overflow-y-hidden`}>
      <p
        className={`text overflow-hidden transition-all duration-500 ${
          isShow && isCollapsed ? "h-[12rem]" : "h-auto"
        }`}
      >
        {text
          .trim()
          .split("\n")
          .map((txt, _key) => (
            <Fragment key={_key}>
              <span
                className={`text-black/80 text-sm leading-6 
                          font-normal whitespace-pre-wrap mb-2
                         `}
                dangerouslySetInnerHTML={{ __html: txt.trim() }}
              />
            </Fragment>
          ))}
      </p>
      {isShow && (
        <div
          className={`text-end my-3 ${
            isCollapsed
              ? "inline-flex items-end justify-center absolute  transition duration-75 top-[60%] blurred h-[65px] w-full"
              : ""
          }`}
        >
          <span
            role="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`inline-flex gap-2 items-center text-sm transition-all px-3 py-1.5 rounded-xl ${
              isCollapsed
                ? "bg-neutral-200/80 hover:bg-neutral-200"
                : "bg-neutral-200 hover:bg-neutral-200/50"
            }`}
          >
            {isCollapsed && (
              <Fragment>
                expand <CaretDown />
              </Fragment>
            )}
            {!isCollapsed && (
              <Fragment>
                collapse <CaretUp />
              </Fragment>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default SummaryPreview;
