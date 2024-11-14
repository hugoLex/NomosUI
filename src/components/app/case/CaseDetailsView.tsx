import React, { Fragment, useState } from "react";
import { GenericObject } from "@app/types";
import { SummaryPreview } from "@app/components";
import { LuDot } from "react-icons/lu";
import { HiMiniListBullet } from "react-icons/hi2";
const CaseView = ({ data }: { data: GenericObject }) => {
  const { title, summary, judgement } = data;
  type ContentOutline = "summary" | "ratio" | "judgement" | "Decision history";
  const [tab, setTab] = useState<ContentOutline>("summary");

  const contentOutline: ContentOutline[] = [
    "summary",
    "ratio",
    "judgement",
    "Decision history",
  ];

  return (
    <Fragment>
      <div className="col-span-8 space-y-2">
        <h1
          id="searchQuery"
          className="text-xx font-normal mb-6 text-[#245b91]"
        >
          {title}
        </h1>
        <div className="flex group items-center">
          {/* <div className="relative max-md:group-[:nth-child(5)_&]:first:h-[3.143rem] md:group-[:nth-child(5)_&]:first:w-[6.88075rem] lg:group-[:nth-child(5)_&]:first:w-[8.88075rem] w-[3.57556rem] h-[3.84813rem] md:w-[4.46975rem] lg:w-[6.24756rem] md:h-[5rem] lg:h-[6.7238rem] "> */}
          {["Court of appeal", "20th May 2024", "CA/K/229/S/96"].map(
            (item, index) => (
              <h3 className="relative first:pl-[0px] font-light text-[0.875rem] text-black/80 hover:bg-neutral-200/50 mt-2 px-2.5 py-1 text-sm">
                <LuDot
                  className={` ${
                    index == 2 ? "hidden" : ""
                  } text-[#245b91] text-[25px] absolute right-[-13px] top-[1px]`}
                />
                {item}
              </h3>
            )
          )}
        </div>
        <h6 className="font-light text-[0.875rem] text-black/80 hover:bg-neutral-200/50  pr-2.5 pb-1 text-sm">
          {"LEX(1995)-CA/PH/105/94"}
        </h6>
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
                Essential details and core rulings at a glance
              </span>
            </div>
            <div className="my-1 border w-full border-gray-200 mb-3" />
            <SummaryPreview text={summary} />
          </div>
        </div>

        <div className="">
          <h2 className="mt-[40px] text-base text-[#000000] px- 4 font-normal">
            Judgement
          </h2>
          <p className="text-[0.875rem]">{judgement}</p>
        </div>
      </div>
      <div className="col-span-4 self-baselane">
        <div className="sticky top-[68px] space-y-2">
          <h5 className="relative text-base font-normal font-rubik">
            <HiMiniListBullet className="absolute left-[-30px] top-[4px]" />
            Content Outline
          </h5>
          <div className="flex flex-col  gap-1">
            {contentOutline.map((item) => (
              <span
                key={item}
                role="button"
                // className="flex items-center "

                className={` capitalize border border-gray-200 border-solid my-2 px-[20px] py-[8px] text-start text-[14px] rounded-md gap-2  text-black/80 hover:bg-neutral-200/50 ${
                  tab === item ? "font-black text-[#245b91]" : ""
                }`}
                onClick={() => setTab(item)}
              >
                {item}
              </span>
            ))}
            {/* <span
              role="button"
              className={`${
                tab === "judgement" ? "font-black text-[#245b91]" : ""
              }`}
              onClick={() => setTab("judgement")}
            >
              Judgement
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
                tab === "Decision history" ? "font-black text-[#245b91]" : ""
              }`}
              onClick={() => setTab("Decision history")}
            >
              Decision history
            </span> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CaseView;
