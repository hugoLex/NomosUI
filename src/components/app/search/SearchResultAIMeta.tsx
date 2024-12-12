import React, { FC, Fragment, useState } from "react";
import { AIResult, LLMResult } from "@app/types";
import { SummaryPreview } from "@app/components";

const SearchAIMetaResult: FC<LLMResult> = (prop) => {
  const { detail, message, llm, retriever } = prop;

  if (detail) {
    return <Fragment />;
  }

  return (
    <Fragment>
      {retriever && (
        <div className="space-y-4 mb-4">
          <h5 className="px-4">References</h5>
          <div className="flex">
            {retriever.documents.map(({ id, meta }, idx) => {
              return (
                <div
                  key={id}
                  className="flex flex-col justify-start items-start p-4 bg-[#eaf0f2]/30 rounded-lg"
                >
                  <span className="text-xs font-bold">{meta.case_title}</span>
                  <span className="text-xs text-[#9ea7b4]">{meta.court}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="p-4 bg-[#eaf0f2]/30 rounded-lg flex flex-col justify-start items-start min-h-[10rem] mb-4">
        <div className="flex flex-col self-stretch   justify-start items-start mb-6">
          <div className="inline-flex my-3 gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              fill="none"
              height={40}
              width={40}
              className="inline-block"
            >
              <path
                stroke="#385CAD"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16.355 26.506L15 31.25l-1.355-4.744a7.5 7.5 0 00-5.151-5.15L3.75 20l4.744-1.355a7.5 7.5 0 005.15-5.151L15 8.75l1.355 4.744a7.5 7.5 0 005.151 5.15L26.25 20l-4.744 1.355a7.5 7.5 0 00-5.15 5.151zm14.076-11.982L30 16.25l-.431-1.726a5.625 5.625 0 00-4.093-4.093L23.75 10l1.726-.431a5.625 5.625 0 004.093-4.093L30 3.75l.431 1.726a5.625 5.625 0 004.093 4.093L36.25 10l-1.726.431a5.625 5.625 0 00-4.093 4.093zm-2.274 19.755L27.5 36.25l-.657-1.971a3.75 3.75 0 00-2.372-2.372L22.5 31.25l1.971-.657a3.75 3.75 0 002.372-2.372l.657-1.971.657 1.971a3.75 3.75 0 002.372 2.372l1.971.657-1.971.657a3.75 3.75 0 00-2.372 2.372z"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <span className="uppercase text-sm text-[#245b91] font-semibold inline-block">
                Law Lens
              </span>

              <span className="text-xs">
                This is an ai generated answer. Please always check the
                references.
              </span>
            </div>
          </div>
          <div className="my-1 border w-full border-gray-200 mb-3" />
          {llm.replies.map((itx, idx) => {
            return (
              <Fragment key={`id-${idx}`}>
                <SummaryPreview text={itx} />
                {/* <p
                  className="text-black/80 text-sm leading-6 font-normal whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: itx.trim().split("\n") }}
                /> */}
              </Fragment>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchAIMetaResult;
