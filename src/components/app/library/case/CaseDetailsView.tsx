import React, { Fragment, MutableRefObject, useEffect, useState } from "react";
import { LuDot } from "react-icons/lu";
import { PiGavelThin } from "react-icons/pi";
import { LiaBalanceScaleSolid } from "react-icons/lia";

// import { UseQueryToggler } from "@app/hooks/queryHandler";
import { useScrollspy } from "@app/hooks/useScrollspyHook";
import { SummaryComponent, Markdown, Container } from "@app/components/shared";

import { getMarkdownRemoteStream } from "@app/utils/getMarkdown";

import CaseDetailsSidebarView from "./CaseDetailsSidebarView";
import { TCaseDocument } from "@app/types";

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

const CaseView = ({
  caseDocument,
  innerRef,
  quoteToHighlight,
}: {
  caseDocument: TCaseDocument;
  innerRef: MutableRefObject<any>;
  quoteToHighlight: string;
}) => {
  const { activeSection, sectionRefs, scrollToSection } = useScrollspy({
    sections,
  });

  const caseSidebarProps = {
    activeSection,
    scrollToSection,
    sections,
    caseDocument,
  };
  useEffect(() => {
    // After judgment loads, scroll to the highlighted section
    setTimeout(() => {
      const targetElement = document.getElementById("highlighted-quote");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300);
  }, [quoteToHighlight]);
  const ProcessJudgmentContent: React.FC<{ content: string }> = ({
    content,
  }) => {
    // test with AIMS Foods Limited v. Olufemi Fadeyi
    // let quoteToHighlight =
    //   "Ordinarily, a breach or non-compliance with or contravention of the Constitution or any of its provisions by a Court of law in the conduct of its judicial proceedings, would render the proceedings and any bye-product or outcome thereof, legally null and void for being unconstitutional.";
    if (!content || !quoteToHighlight || !content.includes(quoteToHighlight)) {
      return <Markdown content={content} />;
    }
    // Split the content at the quote
    const parts = content.split(quoteToHighlight);

    return (
      <>
        {/* Render first part */}
        {parts[0] && <Markdown content={parts[0]} />}

        {/* Render highlighted quote */}
        <div
          id="highlighted-quote"
          className="bg-yellow-200 p-4 border-l-4 border-yellow-500 mb-4"
        >
          <Markdown content={quoteToHighlight} />
        </div>

        {/* Render remaining content */}
        {parts[1] && <Markdown content={parts[1]} />}
      </>
    );
  };
  return (
    caseDocument && (
      <Container>
        <div className={`py-8  w-full md:min-w-[980px]`}>
          <div className="md:grid grid-cols-12 gap-8">
            <div className="col-span-4 self-baselane">
              <div className="sticky top-[68px]">
                <CaseDetailsSidebarView {...caseSidebarProps} />
              </div>
            </div>
            <div className="col-span-8 lg:flex gap-3 text-dark-2">
              <div className="block text-wrap overflow-x-hidden">
                <h3 className="hidden font-light text-[0.813rem]   mt-2 pr-2.5 py-1 leading-[1.25rem]">
                  CASE
                </h3>
                <h1
                  id="searchQuery"
                  ref={innerRef}
                  className="text-xx font-normal mb-3 text-[#245b91]"
                >
                  {caseDocument.case_title}
                </h1>

                <div className="inline-flex flex-wrap group items-center mb-4 gap-2 font-medium">
                  <span className="relative text-[0.875rem] text-black/80   py-1 text-sm">
                    {caseDocument.court}
                  </span>
                  <LuDot className={`text-[#245b91] text-[25px]`} />
                  <span className="relative  text-[0.875rem] text-black/80   py-1 text-sm">
                    {caseDocument.date_decided}
                  </span>
                  <LuDot className={`text-[#245b91] text-[25px] `} />
                  <span className="relative  text-[0.875rem] text-black/80  px-2. py-1 text-sm">
                    {caseDocument.suit_number}
                  </span>
                  <LuDot className={`text-[#245b91] text-[25px] `} />
                  <span className="relative text-[0.875rem] text-black/80   py-1 text-sm">
                    {caseDocument.lex_citation}
                  </span>
                </div>

                <div>
                  <h4 className="font-normal text-base mb-2">
                    Subject matter:
                  </h4>
                  {caseDocument.subject_matter &&
                    caseDocument.subject_matter.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        {caseDocument.subject_matter.map((subjectMatter) => (
                          <span
                            className={` px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium`}
                            key={subjectMatter}
                            title="Subject matter"
                          >
                            {subjectMatter}
                          </span>
                        ))}
                      </div>
                    )}
                </div>

                {caseDocument.case_summary && (
                  <div id="summary" ref={(el) => (sectionRefs.current[0] = el)}>
                    <SummaryComponent
                      summary={caseDocument.case_summary}
                      isCollapsible={false}
                    />
                  </div>
                )}

                <hr className="my-8" />
                {caseDocument.judgement && (
                  <div
                    id="judgement"
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className="has-[p]:text-sm"
                  >
                    <h4 className="mb-4 text-base text-dark-2 font-medium font-rubik  flex items-center gap-2 ">
                      <PiGavelThin size={19} className="hidden " />
                      Judgement
                    </h4>
                    {/* Render the full judgement with highlighted quoted part */}
                    <ProcessJudgmentContent content={caseDocument.judgement} />
                    {/* <Markdown
                      content={caseDocument.judgement}/> */}
                  </div>
                )}
                <hr className="my-8" />
                <div
                  ref={(el) => (sectionRefs.current[2] = el)}
                  id="ratio"
                  className="hidden my-[40px] "
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

                    {caseDocument.ratio_decidendi.map((itx, idx) => (
                      <p key={idx} className="text-[.88rem] my-1">
                        <LuDot
                          className={`text-[#245b91] text-[25px] inline-block`}
                        />
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
          </div>
        </div>
      </Container>
    )
  );
};

export default CaseView;
