import { Markdown } from "@app/components/shared";
import { TCaseDocument } from "@app/types";
import React from "react";
import { LuDot } from "react-icons/lu";

type SectionFullJudgementProps = {
  full_judgement?: string | null | undefined;
  innerRef?: React.MutableRefObject<any>;
  isTitle?: boolean;
  caseDocument: TCaseDocument | null;
};

function SectionFullJudgement({
  full_judgement,
  caseDocument,
  innerRef,
}: SectionFullJudgementProps) {
  //   console.log("full_judgement", full_judgement);
  return (
    <div
      //   ref={innerRef}
      className=" max-w-[900px] mx-auto pt-[30px] pb-[70px] px- [64px] bg- gray-50 min-h-screen"
    >
      {/* <div className="flex-1  p-6 font-poppins text-base scrollbar overflow-y-auto scrollbar space-y -4 "> */}
      {!caseDocument ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div>
          <div>
            <h1
              id="FullJudgement"
              ref={innerRef}
              className="text-xx font-bold font-gilda_Display mb-3 text-lexblue"
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
            <h4 className="uppercase block font-poppins text-gray-500 text-sm font-medium mb-1">
              Causes of action :
            </h4>
            {caseDocument?.causes_of_action &&
              caseDocument.causes_of_action.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {caseDocument?.causes_of_action?.map((cause_of_action) => (
                    <span
                      className={`text-[#008E00] bg-[#008E00]/10 px-3 py-1 rounded  text-center text-xs font-normal `}
                      key={cause_of_action}
                      title="Cause of action"
                    >
                      {cause_of_action}
                    </span>
                  ))}
                </div>
              )}
            {/* <h4 className="font-normal text-base mb-2">
                                Subject matter:
                              </h4> */}
            {/* {caseDocument.subject_matter &&
                                caseDocument.subject_matter.length > 0 && (
                                  <div className="flex items-center gap-2 flex-wrap mb-4">
                                    {caseDocument?.subject_matter?.map((subjectMatter) => (
                                      <span
                                        className={` px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium`}
                                        key={subjectMatter}
                                        title="Subject matter"
                                      >
                                        {subjectMatter}
                                      </span>
                                    ))}
                                  </div>
                                )} */}
          </div>
          {/* <div
           dangerouslySetInnerHTML={{
             __html: processJudgmentContent(
               currentJudgment.content,
               clickedQuote
             ),
           }}
         > */}
          <Markdown
            className="text-sm text-lexblue font-poppins m-0 text-justify"
            content={caseDocument.judgement || ""}
          />
          {/* <ProcessJudgmentContent content={full_judgement} /> */}
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default SectionFullJudgement;
