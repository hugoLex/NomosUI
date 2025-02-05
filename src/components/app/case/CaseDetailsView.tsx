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
import { SummaryComponent } from "@app/components/shared";

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
        <div className="md:grid grid-cols-12 gap-8 py-8">
          <div className="col-span-8 lg:flex gap-3 text-dark-2">
            <div className="block">
              <h3 className="hidden font-light text-[0.813rem]   mt-2 pr-2.5 py-1 leading-[1.25rem]">
                CASE
              </h3>
              <h1
                id="searchQuery"
                className="text-xx font-normal mb-3 text-[#245b91]"
              >
                {case_title}
              </h1>
              <div className="inline-flex flex-wrap group items-center mb-4 gap-2">
                <span className="relative  font-light text-[0.875rem] text-black/80   py-1 text-sm">
                  {court}
                </span>
                <LuDot className={`text-[#245b91] text-[25px]`} />
                <span className="relative  font-light text-[0.875rem] text-black/80   py-1 text-sm">
                  {date_decided}
                </span>
                <LuDot className={`text-[#245b91] text-[25px] `} />
                <span className="relative font-light text-[0.875rem] text-black/80  px-2. py-1 text-sm">
                  {suit_number}
                </span>
                <LuDot className={`text-[#245b91] text-[25px] `} />
                <span className="relative  font-light text-[0.875rem] text-black/80   py-1 text-sm">
                  {lex_citation}
                </span>
              </div>
              {subject_matters.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {subject_matters.map((subjectMatter) => (
                    <button
                      type="button"
                      className={` px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium`}
                      key={subjectMatter}
                    >
                      {subjectMatter}
                    </button>
                  ))}
                </div>
              )}
              {case_summary && (
                <div id="summary" ref={(el) => (sectionRefs.current[0] = el)}>
                  <SummaryComponent summary={case_summary} />
                </div>
              )}
              <hr className="my-8" />
              {judgement && (
                <div
                  id="judgement"
                  ref={(el) => (sectionRefs.current[1] = el)}
                  className="has-[p]:text-sm"
                >
                  <h4 className="mb-4 text-base text-dark-2 font-normal font-rubik  flex items-center gap-2 ">
                    <PiGavelThin size={19} className="hidden " />
                    Judgement
                  </h4>
                  <Markdown content={judgement} className="wrapper" />
                </div>
              )}
              <hr className="my-8" />
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
              <nav className="py-2 pr-2 shrink-0">
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
              {contentOutline.map((item) => (
                <div key={item} className="flex flex-col  gap-1">
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
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CaseView;
