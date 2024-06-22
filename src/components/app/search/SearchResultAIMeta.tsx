import React, { FC, Fragment } from "react";
import { AIResult } from "@app/types";

const SearchAIMetaResult: FC<AIResult> = ({ replies, meta }) => {
  return (
    <div className="p-4 bg-[#eaf0f2] rounded-lg flex-col justify-start items-start inline-flex">
      <div className="self-stretch  flex-col justify-start items-start flex">
        <div className="self-stretch pb-4 justify-start items-end inline-flex">
          <div className="grow shrink  border-b border-stone-300/opacity-50 justify-between items-start flex">
            <div className="grow shrink basis-0 self-stretch justify-start items-center gap-4 flex">
              {/* <div className="flex-col justify-start items-start inline-flex">
                <div className="self-stretch  bg-stone-100 rounded-md flex-col justify-start items-start flex">
                  <img
                    className="w-[45px]  relative"
                    src="https://via.placeholder.com/45x45"
                 
                  />
                </div>
              </div> */}
              <div className="flex-col justify-start items-start inline-flex">
                {/* <div className="self-stretch  flex-col justify-start items-start flex">
                  <div className="text-cyan-950 text-lg font-medium  leading-7">
                    Law
                  </div>
                </div> */}
                <div className="self-stretch  flex-col justify-start items-start flex">
                  <div className="text-zinc-600 text-sm font-normal  leading-tight">
                    {replies.map((itx, idx) => (
                      <Fragment key={`id-${idx}`}>
                        <p
                          className="text-justify whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: itx }}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className=" self-stretch justify-end items-start flex">
              <div className=" px-2 py-1.5 bg-stone-200 rounded-full justify-center items-center flex">
                <div className="justify-center items-center gap-1 flex">
                  <div className="w-[15px] h-3 px-[2.25px] pt-[3.75px] pb-[2.25px] justify-center items-center flex" />
                  <div className="flex-col justify-start items-center inline-flex">
                    <div className="text-center text-cyan-950 text-xs font-medium  leading-3">
                      More
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="relative">
          <div className="flex  justify-start items-start ">
            <div className="self-stretch flex-col justify-start items-start inline-flex">
              <div className="text-cyan-950 text-sm font-medium  leading-tight">
                Definition
              </div>
            </div>
            <div className=" flex-col justify-start items-start inline-flex">
              <div className="text-zinc-600 text-sm font-normal  leading-tight">
                A set of rules created and enforceable by social or governmental
                institutions
                <br />
                to regulate behavior, with its precise definition being a matter
                of longstanding
                <br />
                debate.
              </div>
            </div>
          </div>

          <div className="flex justify-start items-start ">
            <div className="self-stretch flex-col justify-start items-start inline-flex">
              <div className="text-cyan-950 text-sm font-medium  leading-tight">
                Creation
              </div>
            </div>
            <div className=" flex-col justify-start items-start inline-flex">
              <div>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  Laws can be made by
                </span>
                <span className="text-zinc-600 text-sm font-normal  underline leading-tight">
                  legislatures
                </span>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  ,
                </span>
                <span className="text-zinc-600 text-sm font-normal  underline leading-tight">
                  executives
                </span>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  via decrees and regulations, or
                  <br />
                  established by
                </span>
                <span className="text-zinc-600 text-sm font-normal  underline leading-tight">
                  judges
                </span>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  through precedent, notably in
                </span>
                <span className="text-zinc-600 text-sm font-normal  underline leading-tight">
                  common law
                  <br />
                </span>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  jurisdictions.
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start ">
            <div className="self-stretch flex-col justify-start items-start inline-flex">
              <div className="text-cyan-950 text-sm font-medium  leading-tight">
                Forms
              </div>
            </div>
            <div className=" flex-col justify-start items-start inline-flex">
              <div>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  Includes
                </span>
                <span className="text-zinc-600 text-sm font-normal  underline leading-tight">
                  statutes
                </span>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  ,
                </span>
                <span className="text-zinc-600 text-sm font-normal  underline leading-tight">
                  decrees
                </span>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  ,
                </span>
                <span className="text-zinc-600 text-sm font-normal  underline leading-tight">
                  regulations
                </span>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  ,
                </span>
                <span className="text-zinc-600 text-sm font-normal  underline leading-tight">
                  contracts
                </span>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  , and
                </span>
                <span className="text-zinc-600 text-sm font-normal  underline leading-tight">
                  arbitration agreements
                </span>
                <span className="text-zinc-600 text-sm font-normal  leading-tight">
                  .
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SearchAIMetaResult;
