import React, { FC, Fragment, useState } from "react";
import { AIResult } from "@app/types";
import { CaretDown, CaretUp } from "@app/components/icons";

const SearchAIMetaResult: FC<AIResult> = ({ replies, meta }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const isShow = replies[0].length > 100 && true;

  return (
    <div className="flex flex-col self-stretch   justify-start items-start ">
      {replies.map((itx, idx) => {
        return (
          <Fragment key={`id-${idx}`}>
            <div className="inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                width={14}
                height={14}
                viewBox="0 0 24 24"
                className="hidden"
              >
                <path
                  d="M12,22H5c-1.654,0-3-1.346-3-3V5c0-1.654,1.346-3,3-3h4.515c.163,0,.325,.008,.485,.023V7c0,1.654,1.346,3,3,3h5.813c.633,.017,1.142-.639,.969-1.248-.311-1.217-.945-2.329-1.833-3.217l-3.485-3.485c-1.322-1.322-3.08-2.05-4.95-2.05H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h7c.552,0,1-.448,1-1s-.448-1-1-1Zm0-19.341c.379,.218,.732,.488,1.05,.806l3.485,3.485c.314,.314,.583,.668,.803,1.05h-4.338c-.551,0-1-.449-1-1V2.659Zm11.707,19.634l-3.957-3.957,1.586-1.586c.39,.516,1.135,.703,1.621,.207,.391-.391,.391-1.023,0-1.414l-4.5-4.5c-.391-.391-1.023-.391-1.414,0s-.391,1.023,0,1.414l.056,.056-4.586,4.586-.056-.056c-.391-.391-1.023-.391-1.414,0s-.391,1.023,0,1.414l4.5,4.5c.195,.195,.451,.293,.707,.293,1.033,.006,1.335-1.367,.5-1.914l1.586-1.586,3.957,3.957c.904,.931,2.345-.511,1.414-1.414Zm-9.78-3.78l4.586-4.586,1.41,1.41-4.586,4.586-1.41-1.41ZM4,8c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1s-.448,1-1,1h-2c-.552,0-1-.448-1-1Zm9,5H5c-.552,0-1-.448-1-1s.448-1,1-1H13c.552,0,1,.448,1,1s-.448,1-1,1Zm-5,2c.552,0,1,.448,1,1s-.448,1-1,1h-3c-.552,0-1-.448-1-1s.448-1,1-1h3Z"
                  stroke="#245b91"
                />
              </svg>
              <span className="uppercase text-sm">Law Lens</span>
            </div>
            <div className="my-1 border w-full border-gray-200" />
            <div className={`summary preview relative overflow-y-hidden`}>
              <p
                className={`text overflow-hidden transition-all duration-500 ${
                  isShow && isCollapsed ? "h-[12rem]" : "h-auto"
                }`}
              >
                {itx
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
            {/* <p
                className="text-black/80 text-sm leading-6 font-normal whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: itx.trim().split("\n") }}
              /> */}
          </Fragment>
        );
      })}
    </div>
  );
};

export default SearchAIMetaResult;
