import React, { Fragment, useState } from "react";
import { CaretDown, CaretUp } from "./icons";

const SummaryPreview = ({ text }: { text: string }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const isShow = text.length > 100 ? true : false;

  return (
    <div className={`summary preview pb-5 relative overflow-y -hidden`}>
      <p
        className={`text overflow-hidden transition-all duration-500 ${
          isShow && isCollapsed ? "h-[5rem]" : "h-auto"
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
          className={`text-end pt-6 pb-4 ${
            isCollapsed
              ? "inline-flex items-end blurred justify-center absolute z-50 transition duration-75 bottom-0  h-[65px] w-full"
              : ""
          }`}
        >
          <span
            role="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`inline-flex gap-2 items-center text-sm transition-all px-3 py-1.5 rounded ${
              isCollapsed
                ? "bg-neutral-200/80 hover:bg-neutral-200"
                : "bg-neutral-200 hover:bg-neutral-200/50"
            }`}
          >
            {isCollapsed && (
              <Fragment>
                Expand <CaretDown />
              </Fragment>
            )}
            {!isCollapsed && (
              <Fragment>
                Collapse <CaretUp />
              </Fragment>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default SummaryPreview;
