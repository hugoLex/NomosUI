import React, { FC, Fragment, useState } from "react";
import { AIResult } from "@app/types";
import { CaretDown, CaretUp } from "@app/components/icons";
import { SummaryPreview } from "@app/components";

const SearchAIMetaResult: FC<AIResult> = ({ llm, retriever, message }) => {
  const { replies } = llm;

  if (message) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <div className="p-4 bg-[#eaf0f2]/30 rounded-lg flex flex-col justify-start items-start min-h-[10rem] mb-8">
        <div className="flex flex-col self-stretch   justify-start items-start mb-6">
          <div className="flex flex-col my-3">
            <p>
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
              <span className="uppercase text-sm text-[#245b91] font-semibold">
                Law Lens
              </span>
            </p>
            <span className="text-xs">
              This is an ai generated answer. Please always check the
              references.
            </span>
          </div>
          <div className="my-1 border w-full border-gray-200 mb-3" />
          {replies.map((itx, idx) => {
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
      {retriever && (
        <div className="space-y-4">
          <h5 className="px-4">References</h5>
          <div className="flex">
            {retriever.documents.map(({ id, meta }, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-start items-start p-4 bg-[#eaf0f2]/30 rounded-lg"
              >
                <span className="text-xs font-bold">{meta.case_title}</span>
                <span className="text-xs">{meta.court}</span>
                <span className="text-xs">{meta.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SearchAIMetaResult;
