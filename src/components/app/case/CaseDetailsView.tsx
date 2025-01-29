import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { LuDot } from "react-icons/lu";
import { HiMiniListBullet, HiPlus } from "react-icons/hi2";
import { PiGavelThin } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { LiaBalanceScaleSolid } from "react-icons/lia";
// import { UseQueryToggler } from "@app/hooks/queryHandler";
import matter from "gray-matter";
import {
  ErrorView,
  SummaryPreview,
  SmallBtn,
  Markdown,
  Container,
} from "@app/components/shared";
import { useCaseQuery } from "@app/store/services/caseSlice";
import { Loader } from "@app/components/ui";
import { getMarkdownRemoteStream } from "@app/utils/getMarkdown";
import { useScrollspy } from "@app/hooks/useScrollspyHook";

import { TCaseDocument } from "@app/types";

type ContentOutline = "Judicial Panel" | "Decision history";
// | "judgement"
// | "ratio";

const contentOutline: ContentOutline[] = [
  "Judicial Panel",
  "Decision history",
  // "judgement",
  // "ratio",
];
const sections = [
  {
    id: "summary",
    label: "Summary",
  },

  {
    id: "judgement",
    label: "Judgement",
  },
  {
    id: "ratio",
    label: "Ratio",
  },
];
const CaseView = ({ id }: { id: string }) => {
  const { activeSection, sectionRefs, scrollToSection } = useScrollspy({
    sections,
  });

  const [tab, setTab] = useState<ContentOutline>("Judicial Panel");
  const { isError, isLoading, data } = useCaseQuery(id);
  // const { createQueryString, router, pathname, urlSearchParamsString } =
  //   UseQueryToggler();

  const [
    {
      case_summary,
      case_title,
      judgement,
      suit_number,
      court,
      court_division,
      jurisdiction,
      date_decided,
      lex_citation,
      decision_history,
      ratio_texts,
      judge_ids,
      judge_names,
      analysis_urls,
      subject_matters,
    },
    setCaseDocument,
  ] = useState<TCaseDocument>({
    case_summary: null,
    case_title: null,
    judgement: null,
    suit_number: null,
    court: null,
    court_division: null,
    jurisdiction: null,
    date_decided: null,
    lex_citation: null,
    decision_history: null,
    ratio_texts: [],
    judge_ids: [],
    judge_names: [],
    analysis_urls: [],
    subject_matters: [],
  });

  useEffect(() => {
    if (data) {
      const { case_data } = data;
      const { main_judgement_url: url } = case_data;
      if (url) {
        (async () => {
          try {
            const res = await axios.get(url);
            const { content } = matter(res.data);

            setCaseDocument({ ...case_data, judgement: content });
          } catch (error) {
            console.log(error);

            setCaseDocument({ ...case_data });
          }
        })();
      } else {
        setCaseDocument({ ...case_data });
      }
    }

    return () => {};
  }, [data]);

  return (
    <Container>
      {isLoading && (
        <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
          <Loader variant="classic" size={80} />
        </div>
      )}
      {isError && <ErrorView />}
      {data && (
        <div className="md:grid grid-cols-12 gap-8">
          <div className="col-span-8 lg:flex gap-3">
            <nav className="hidden lg:block fixed left-[100px] w-[120px] py-2 pr-2 shrink-0">
              <ul className="space-y-2 bg-gray -100 border-gray-200 border-solid border-l-2">
                {sections.map((section) => (
                  <li
                    className={`relative ${
                      activeSection === section.id
                        ? " border-spacing-x-48 before:absolute before:left-[-2px] before:h-[40px] before:w-[2px] before:bg-primary "
                        : null
                    }  `}
                    key={section.id}
                  >
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-2 py-2 rounded transition-colors ${
                        activeSection === section.id
                          ? "text-primary"
                          : " hover:text-primary text-black/50"
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="lg:pl-[150px] xl:pl-[50px]">
              {" "}
              <h3 className=" font-light text-[0.813rem] text-black/80  mt-2 pr-2.5 py-1 leading-[1.25rem]">
                CASE
              </h3>
              <h1
                id="searchQuery"
                className="text-xx font-normal mb-3 text-[#245b91]"
              >
                {case_title}
              </h1>
              <div className="inline-flex group items-center mb-6">
                <span className="relative first:pl-[0px] font-light text-[0.875rem] text-black/80  px-2.5 py-1 text-sm">
                  {court}
                </span>
                <LuDot className={`text-[#245b91] text-[25px]`} />
                <span className="relative first:pl-[0px] font-light text-[0.875rem] text-black/80  px-2.5 py-1 text-sm">
                  {date_decided}
                </span>
                <LuDot className={`text-[#245b91] text-[25px] `} />
                <span className="relative first:pl-[0px] font-light text-[0.875rem] text-black/80  px-2.5 py-1 text-sm">
                  {suit_number}
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
                  {lex_citation}
                </span>

                {/* <SmallTextBtn
                  smallBtnData={["LEX(1995)-CA/PH/105/94"]}
                  divStyle=""
                  btnStyle="border-white font-light  px-2 py-1 mb-[24px] bg-[rgb(159,197,248)] text-black/80"
                /> */}
              </div>
              <div
                id="summary"
                ref={(el) => (sectionRefs.current[0] = el)}
                className="p-4 bg-[#eaf0f2]/30 border w-full border-gray-200 rounded-lg flex flex-col justify-start items-start min-h-[10rem] mb-8"
              >
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
                  {case_summary && <SummaryPreview text={case_summary} />}
                </div>
              </div>
              {judgement && (
                <div
                  id="judgement"
                  ref={(el) => (sectionRefs.current[1] = el)}
                  className="has-[p]:text-sm"
                >
                  <h2 className="mt-[40px] mb-[30px] text-base font-normal font-rubik text-black/50 flex items-center gap-2 ">
                    <PiGavelThin size={19} className=" " />
                    Judgement
                  </h2>

                  <Markdown content={judgement} className="wrapper" />
                </div>
              )}
              {subject_matters.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {subject_matters.map((subjectMatter) => (
                    <button
                      type="button"
                      className={` px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium`}
                      key={subjectMatter}
                    >
                      {subjectMatter}
                    </button>
                  ))}
                  {/* <p className="text-[0.875rem] mt-[20px]">
                   </p> */}
                </div>
              )}
              <div
                ref={(el) => (sectionRefs.current[2] = el)}
                id="ratio"
                className="my-[40px] "
              >
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

                  {ratio_texts.map((itx, idx) => (
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
                      scrollToSection(item);
                      // router.push(
                      //   `${pathname}?${urlSearchParamsString}#${item}`
                      //   // `/${pathname}?${createQueryString("section", item)}#${item}`
                      // );
                    }}
                  >
                    {/* the icons on the buttons differ hence the logic  */}
                    {item}{" "}
                    {item === "Judicial Panel" ? <IoPeople /> : <HiPlus />}
                  </span>
                  {item == "Judicial Panel" && tab == "Judicial Panel" ? (
                    // <SmallTextBtn
                    //   smallBtnData={
                    //     caseDetail.judge_names.length > 0
                    //       ? caseDetail.judge_names
                    //       : ["Chibuike Ewenike", "Wendy Osuji"]
                    //   }
                    //   divStyle=""
                    //   btnStyle="text-[#008E00] bg-[#008E00]/10 text-xs px-3 py-1 rounded mt-2"
                    // />
                    <div className="flex items-center gap-2 flex-wrap">
                      {(judge_names.length > 0
                        ? judge_names
                        : ["Check back"]
                      ).map((judge) => (
                        <button
                          type="button"
                          className={` text-[#008E00] bg-[#008E00]/10 text-xs px-3 py-1 rounded"`}
                          key={judge}
                        >
                          {judge}
                        </button>
                      ))}
                    </div>
                  ) : item == "Decision history" &&
                    tab == "Decision history" ? (
                    <Fragment>
                      {decision_history !== null && (
                        <p className="text-[10px] pl-[20px] text-[rgb(0,0,0,0.8)] leading-[14px]">
                          {decision_history}
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
      )}
    </Container>
  );
};

export default CaseView;
