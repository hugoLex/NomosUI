import React, { FC, Fragment } from "react";
import { AIResult } from "@app/types";

const SearchAIMetaResult: FC<AIResult> = ({ replies, meta }) => {
  return (
    <div className="p-4 bg-[#eaf0f2]/30 rounded-lg flex-col justify-start items-start inline-flex">
      <div className="flex flex-col self-stretch   justify-start items-start ">
        {replies.map((itx, idx) => (
          <Fragment key={`id-${idx}`}>
            <p
              className="text-black/80 text-sm leading-6 font-normal text-justify whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: itx }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SearchAIMetaResult;
