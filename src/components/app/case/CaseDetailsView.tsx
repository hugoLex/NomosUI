import React, { Fragment, useEffect, useMemo, useState } from "react";
import { GenericObject, TCase, TCaseData } from "@app/types";
import { ErrorView, SummaryPreview } from "@app/components";
import { LuDot } from "react-icons/lu";
import { HiMiniListBullet, HiPlus } from "react-icons/hi2";
import { PiGavelThin } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import SmallTextBtn from "../generalSharedComponents/SmallBtn";
import axios from "axios";
import { useCaseQuery } from "@app/store/services/caseSlice";
import { Loader } from "@app/components/ui";
import { title } from "process";
// import SmallTextBtn from "./SmallBtn";
type ContentOutline =
  | "Judicial Panel"
  | "Decision history"
  | "judgement"
  | "ratio";

const contentOutline: ContentOutline[] = [
  "Judicial Panel",
  "Decision history",
  "judgement",
  "ratio",
];

const CaseView = ({ id }: { id: string }) => {
  const [tab, setTab] = useState<ContentOutline>("Judicial Panel");
  const [judgement, setJudgment] = useState<any>();

  const { isError, isLoading, data } = useCaseQuery(id);
  const { createQueryString, router, pathname, urlSearchParamsString } =
    UseQueryToggler();

  const caseDetail = useMemo(() => {
    if (data) {
      const { case_data } = data;

      return case_data;
    }
    return null;
  }, [data]);

  useEffect(() => {
    if (caseDetail !== null && caseDetail.main_judgement_url !== null) {
      (async () => {
        try {
          const res = await axios.get("");

          if (res.status === 200) {
            console.log(res.data);
            setJudgment("");
          }
        } catch (error: any) {
          console.log(error);
        }
      })();
    }

    return () => {};
  }, [caseDetail]);

  if (isLoading)
    return (
      <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
        <Loader variant="classic" size={80} />
      </div>
    );

  if (isError)
    return (
      <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
        <ErrorView />
      </div>
    );

  return (
    caseDetail !== null && (
      <section className="relative mx-auto max-w-[1100px] py-6 ">
        <div className="px-16 max-md:px-5 max-w-full">
          <div className="md:grid grid-cols-12 gap-8">
            <div className="col-span-8 space- y-2">
              <h3 className=" font-light text-[0.813rem] text-black/80  mt-2 pr-2.5 py-1 leading-[1.25rem]">
                CASE
              </h3>
              <h1
                id="searchQuery"
                className="text-xx font-normal mb-3 text-[#245b91]"
              >
                {caseDetail.case_title}
              </h1>
              <div className="inline-flex group items-center mb-6">
                {/* <div className="relative max-md:group-[:nth-child(5)_&]:first:h-[3.143rem] md:group-[:nth-child(5)_&]:first:w-[6.88075rem] lg:group-[:nth-child(5)_&]:first:w-[8.88075rem] w-[3.57556rem] h-[3.84813rem] md:w-[4.46975rem] lg:w-[6.24756rem] md:h-[5rem] lg:h-[6.7238rem] "> */}

                <span className="relative first:pl-[0px] font-light text-[0.875rem] text-black/80  px-2.5 py-1 text-sm">
                  {caseDetail.court}
                </span>
                <LuDot className={`text-[#245b91] text-[25px]`} />
                <span className="relative first:pl-[0px] font-light text-[0.875rem] text-black/80  px-2.5 py-1 text-sm">
                  {caseDetail.date_decided}
                </span>
                <LuDot className={`text-[#245b91] text-[25px] `} />
                <span className="relative first:pl-[0px] font-light text-[0.875rem] text-black/80  px-2.5 py-1 text-sm">
                  {caseDetail.suit_number}
                </span>

                {/* {["Court of appeal", "20th May 2024", "CA/K/229/S/96"].map(
            (item, index) => (
              <span
                key={index}
                className="relative first:pl-[0px] font-light text-[0.875rem] text-black/80  px-2.5 py-1 text-sm"
              >
                <LuDot
                  className={` ${
                    index == 2 ? "hidden" : ""
                  } text-[#245b91] text-[25px] absolute right-[-13px] top-[1px]`}
                />
                {item}
              </span>
            )
          )} */}
              </div>

              <div className="mb-6">
                <span className="border-white font-light  px-2 py-1 mb-[24px] bg-[rgb(159,197,248)] text-black/80">
                  {caseDetail.lex_citation}
                </span>

                {/* <SmallTextBtn
          smallBtnData={["LEX(1995)-CA/PH/105/94"]}
          divStyle=""
          btnStyle="border-white font-light  px-2 py-1 mb-[24px] bg-[rgb(159,197,248)] text-black/80"
        /> */}
              </div>

              <div className="p-4 bg-[#eaf0f2]/30 border w-full border-gray-200 rounded-lg flex flex-col justify-start items-start min-h-[10rem] mb-8">
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
                  <SummaryPreview text={caseDetail.case_summary} />
                </div>
              </div>

              <div id="judgement" className="">
                <h2 className="mt-[40px] mb-[30px] text-base font-normal font-rubik text-black/50 flex items-center gap-2 ">
                  <PiGavelThin size={19} className=" " />
                  Judgement
                </h2>
                <SmallTextBtn
                  smallBtnData={
                    caseDetail.subject_matters.length > 0
                      ? caseDetail.subject_matters
                      : [
                          "Constitutional law",
                          "Matrimonial causes",
                          "Election petition",
                          "Murder",
                          "Terrorism",
                          "Customary law",
                          "Appeal",
                        ]
                  }
                  divStyle="flex items-center gap-2 flex-wrap"
                  btnStyle=" bg-[rgb(159,197,248)] px-2 py-1 text-black/80"
                />
                <p className="text-[0.875rem] mt-[20px]">
                  {judgement ? "" : ""}
                </p>
              </div>

              <div id="ratio" className="my-[40px] ">
                <h2 className="mt-[40px] text-base font-normal font-rubik text-black/50 flex items-center gap-2 ">
                  <LiaBalanceScaleSolid size={19} className=" " />
                  Ratio
                </h2>
                {/* please check this ration text to ensure correct rendering */}

                <div className="text-[.88rem] mb-6 mt-[30px] bg-[rgb(255,229,153,0.25)]  border-[rgb(255,229,153)] border-solid border rounded-md px-2 py-3">
                  {/* A final decision is one that leaves nothing to be judicially
              determined or ascertained thereafter, in order to render it
              effective and capable of execution, and is absolute, complete, and
              certain. */}

                  {caseDetail.ratio_texts.map((itx, idx) => (
                    <p key={idx} className="text-[.88rem] my-1">
                      <LuDot
                        className={`text-[#245b91] text-[25px] inline-block`}
                      />{" "}
                      {itx}
                    </p>
                  ))}
                </div>

                {/* {caseDetail.ratio_texts.map((itx, idx) => (
              <p key={idx} className="text-[.88rem] my-1">
                {itx}
              </p>
            ))} */}
              </div>
            </div>
            <div className="col-span-4 self-baselane">
              <div className="sticky top-[68px] space-y-2">
                <h5 className="flex items-center gap-4 text-base font-normal font-rubik">
                  <HiMiniListBullet size={24} className="" />
                  Content Outline
                </h5>
                {/* <div className="flex flex-col  gap-1"> */}
                {contentOutline.map((item) => (
                  <div key={item} className="fle x flex- col  gap-1">
                    <span
                      role="button"
                      // className="flex items-center "

                      className={`flex justify-between items-center capitalize border border-gray-200 border-solid my-2 px-[20px] py-[8px] text-start text-[14px] rounded-md gap-2  text-black/80 hover:bg-neutral-200/50 ${
                        tab === item ? "font-black text-[#245b91]" : ""
                      }`}
                      onClick={() => {
                        setTab(item);
                        router.push(
                          `${pathname}?${urlSearchParamsString}#${item}`
                          // `/${pathname}?${createQueryString("section", item)}#${item}`
                        );
                      }}
                    >
                      {/* the icons on the buttons differ hence the logic  */}
                      {item}{" "}
                      {item === "Judicial Panel" ? <IoPeople /> : <HiPlus />}
                    </span>
                    {item == "Judicial Panel" && tab == "Judicial Panel" ? (
                      <SmallTextBtn
                        smallBtnData={
                          caseDetail.judge_names.length > 0
                            ? caseDetail.judge_names
                            : ["Chibuike Ewenike", "Wendy Osuji"]
                        }
                        divStyle=""
                        btnStyle="border-[rgb(249,203,156,0.5)] text-[#f9cb9c] bg-[rgb(255,229,153,0.5)] mt-2"
                      />
                    ) : item == "Decision history" &&
                      tab == "Decision history" ? (
                      <Fragment>
                        {caseDetail.decision_history !== null && (
                          <p className="text-[10px] pl-[20px] text-[rgb(0,0,0,0.8)] leading-[14px]">
                            {caseDetail.decision_history}
                          </p>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment />
                    )}
                  </div>
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
            </span>  */}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default CaseView;
