import React, { FC, Fragment } from "react";
import { AIResult } from "@app/types";

const SearchAIMetaResult: FC<AIResult> = ({ replies, meta }) => {
  return (
    <div className="p-4 bg-[#eaf0f2]/30 rounded-lg flex-col justify-start items-start inline-flex">
      <div className="flex flex-col self-stretch   justify-start items-start ">
        {replies.map((itx, idx) => {
          return (
            <Fragment key={`id-${idx}`}>
              {itx
                .trim()
                .split("\n")
                .map((txt, _key) => (
                  <Fragment key={_key}>
                    <p
                      className="text-black/80 text-sm leading-6 font-normal whitespace-pre-wrap mb-2"
                      dangerouslySetInnerHTML={{ __html: txt.trim() }}
                    />
                  </Fragment>
                ))}
              {/* <p
                className="text-black/80 text-sm leading-6 font-normal whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: itx.trim().split("\n") }}
              /> */}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SearchAIMetaResult;
