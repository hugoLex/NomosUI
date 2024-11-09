import React, { Fragment, useState } from "react";
import { GenericObject } from "@app/types";
import { SummaryPreview } from "@app/components";

const CaseView = ({ data }: { data: GenericObject }) => {
  const { title, summary, judgement } = data;
  const [tab, setTab] = useState<"summary" | "ratio" | "judgement">("summary");
  return (
    <Fragment>
      <div className="col-span-8 space-y-4">
        <h1
          id="searchQuery"
          className="text-xx font-normal mb-6 text-[#245b91]"
        >
          {title}
        </h1>
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
                  Summary
                </span>
              </p>
              <span className="text-xs">
                This is an ai generated answer. Please always check the
                references.
              </span>
            </div>
            <div className="my-1 border w-full border-gray-200 mb-3" />
            <SummaryPreview text={summary} />
          </div>
        </div>

        <div className="">
          <p className="text-[0.875rem]">{judgement}</p>
        </div>
      </div>
      <div className="col-span-4 self-baselane">
        <div className="sticky top-[68px] space-y-2">
          <h5 className="font-medium">Document Tabs</h5>
          <div className="flex flex-col  gap-1">
            <span
              role="button"
              className={`${
                tab === "summary" ? "font-black text-[#245b91]" : ""
              }`}
              onClick={() => setTab("summary")}
            >
              Summary
            </span>
            <span
              role="button"
              className={`${
                tab === "ratio" ? "font-black text-[#245b91]" : ""
              }`}
              onClick={() => setTab("ratio")}
            >
              Ratio
            </span>
            <span
              role="button"
              className={`${
                tab === "judgement" ? "font-black text-[#245b91]" : ""
              }`}
              onClick={() => setTab("judgement")}
            >
              Judgement
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CaseView;
