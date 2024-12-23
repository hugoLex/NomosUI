import React, { FC, Fragment, useState } from "react";
import { AIResult, LLMResult } from "@app/types";
import { SummaryPreview } from "@app/components/shared";

const SearchAIMetaResult: FC<LLMResult> = (prop) => {
  const { detail, message, llm, retriever } = prop;

  if (detail) {
    return <Fragment />;
  }

  return (
    <Fragment>
      {retriever && (
        <div className="space-y-4 mb-4">
          <h5>References</h5>
          <div className="flex gap-4">
            {retriever.documents.map(({ id, meta }, idx) => {
              if (meta.case_title === "" && meta.court === "") {
                return <Fragment key={idx} />;
              }

              return (
                <div
                  key={id}
                  className="flex flex-col justify-start items-start p-4 bg-[#eaf0f2]/30 roundedLg"
                >
                  <span className="text-xs font-bold">{meta.case_title}</span>
                  <span className="text-xs text-[#9ea7b4]">{meta.court}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="p-4 bg-[#eaf0f2]/30 roundedLg flex flex-col justify-start items-start min-h-[10rem] mb-4">
        <div className="flex flex-col self-stretch   justify-start items-start mb-6">
          <div className="inline-flex my-3 gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#000000"
              fill="none"
            >
              <path
                d="M16.0001 16.5L20 20.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 11.5C18 15.366 14.866 18.5 11 18.5C7.13401 18.5 4 15.366 4 11.5C4 7.63404 7.13401 4.50003 11 4.50003"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 3.50003L15.7579 4.19706C16.0961 5.11105 16.2652 5.56805 16.5986 5.90142C16.932 6.2348 17.389 6.4039 18.303 6.74211L19 7.00003L18.303 7.25795C17.389 7.59616 16.932 7.76527 16.5986 8.09864C16.2652 8.43201 16.0961 8.88901 15.7579 9.803L15.5 10.5L15.2421 9.803C14.9039 8.88901 14.7348 8.43201 14.4014 8.09864C14.068 7.76527 13.611 7.59616 12.697 7.25795L12 7.00003L12.697 6.74211C13.611 6.4039 14.068 6.2348 14.4014 5.90142C14.7348 5.56805 14.9039 5.11105 15.2421 4.19706L15.5 3.50003Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                  className="text-black/80 text-sm leading-6 font-normal whitespace-preWrap"
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
