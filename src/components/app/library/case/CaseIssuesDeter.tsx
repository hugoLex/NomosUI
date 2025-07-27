"use client";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Scale,
  FileText,
  Hash,
  ChevronUp,
} from "lucide-react";
import { number } from "yup";
import { useParams } from "next/navigation";
import { useCaseQuery } from "@app/store/services/caseSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { Loader } from "@app/components/ui";
import { mappedAlphabets } from "@app/utils";
import { QuoteHighlighterData } from "@app/pages/app/library/cases/[slug]";
import { DashboardSkeletonLoader } from "@app/components/shared/DashboardSkeletonLoader";
import Link from "next/link";

interface LegalRatio {
  id: number;
  text: string;
}

interface LegalIssue {
  id: number;
  issue: string;
  priority: number;
  ratios: LegalRatio[];
}

interface CaseData {
  issues_with_ratios?: LegalIssue[];
  innerRef?: React.MutableRefObject<any>;
  isTitle?: boolean;
  setClickedQuote: React.Dispatch<
    React.SetStateAction<QuoteHighlighterData | null>
  >;
}

export default function CaseIssuesForDeterminatonComponent({
  issues_with_ratios,
  innerRef,
  isTitle,
  setClickedQuote,
}: CaseData) {
  const new_case_id_slug = useParams();
  const { isError, isLoading, data } = useCaseQuery(
    new_case_id_slug ? (new_case_id_slug?.slug as string) : skipToken
    // new_case_id_slug ? new_case_id_slug?.slug[0] : skipToken
    // "ce1f8469-a471-4bda-ba5c-0d4719bc23fb"
  );
  const caseData = data?.case_data?.issues_with_ratios;
  const [expandedIssues, setExpandedIssues] = useState<Set<number>>(
    new Set([0])
  );

  const toggleIssue = (index: number) => {
    setExpandedIssues((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "bg-red-50 border-red-200 text-red-800";
      case 2:
        return "bg-amber-50 border-amber-200 text-amber-800";
      case 3:
        return "bg-green-50 border-green-200 text-green-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1:
        return "High Priority";
      case 2:
        return "Medium Priority";
      case 3:
        return "Low Priority";
      default:
        return "Standard";
    }
  };
  // console.log(
  //   "issues for determination",
  //   caseData,
  //   "the full data",
  //   data?.case_data
  // );

  if (isLoading)
    return (
      <div className="max-w-[1100px] px-[60px] mx-auto w-full ">
        <DashboardSkeletonLoader />;
      </div>
    );

  return (
    <div className=" max-w-[972px] mx-auto pt-[30px] pb-[70px] px- [64px] bg- gray-50 min-h-screen">
      {/* Header */}
      <div className="mb- 8">
        <div className="flex items-center gap-3 mb- 4">
          {/* <div className="p-3 bg-indigo-600 rounded-lg shadow-md">
            <Scale className="w-8 h-8 text-white" />
          </div> */}
          <div className="">
            <h1
              ref={innerRef}
              className="text-xx font-gilda_Display capitalize  font-bold text-lexblue"
            >
              Issues for determination
            </h1>
            <p className="text-base font-normal text-[#9ea7b4] mb-4 text-wrap mt-1">
              Issues and Ratios Overview
            </p>
          </div>
        </div>

        {/* <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-900">
                  {caseData ? caseData?.length : ""} Legal Issues
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">
                  {caseData
                    ? caseData.reduce(
                        (acc, issue) =>
                          acc +
                          (typeof issue?.ratios?.length === "number"
                            ? issue.ratios.length
                            : 0),
                        0
                      )
                    : ""}{" "}
                  Total Ratios
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Issues List */}
      <div className="space-y-0 6">
        {caseData ? (
          caseData?.map((issue, idx) => {
            const isExpanded = expandedIssues.has(idx);
            const spiltIssues = issue?.issue.split(
              /(?<=[A-Z] - )(?=[A-Z]*[a-z])/
            );
            // console.log(result);

            return (
              <div
                key={issue?.id}
                className={` relative ${
                  !isExpanded && "border-b"
                } border-b-gray-200 pb-5  `}
              >
                {/* Issue Header */}
                <div
                  title={`There are ${issue.ratios?.length ?? 0} ratio${
                    issue.ratios?.length > 1 ? "s" : ""
                  } CLICK TO EXPAND/COLLAPSE   `}
                  className="sticky top-[95px] pt-2 6 cursor-pointer  transition-colors duration-150"
                  onClick={() => toggleIssue(idx)}
                >
                  <div className="flex items-start gap -4">
                    {/* <div className="flex-shrink-0 mt-1 ">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div> */}

                    <div className="flex-1 min-w-0 flex mt- 6 justify-between">
                      {/* <div className="flex items-start justify-between gap-4 mb -3">
                        <div className="  flex items-center gap-3">
                          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                            Issue #{index + 1}
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(
                              issue.priority
                            )}`}
                          >
                            {getPriorityLabel(issue.priority)}
                          </span>
                        </div>
                        <div className="opacity-0 flex ml-auto  items-center gap-2 text-sm text-gray-500 flex-shrink-0">
                          <Hash className="w-4 h-4" />
                          <span>
                            {issue.ratios?.length ?? 0} ratio
                            {issue.ratios?.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div> */}

                      <p
                        // href={"#"}
                        // style={{ zIndex: 10 - idx }}
                        className="  bg-white pt-5  h- [100px] text-powder_blue text-[1.1rem] font-semibold font-gilda_Display capitalize cursor-pointer hove r:underline"
                      >
                        <span className="text-gray-500 inline-block mr-2">
                          {idx + 1}.
                        </span>{" "}
                        {/* {issue.issue} */}
                        {
                          spiltIssues[0]
                          // ?.replace(/[\s-]+$/, "")
                        }{" "}
                        <br />
                        <span className="inline-block mt-1">
                          {spiltIssues?.length == 2 &&
                            spiltIssues[1]?.replace(/[\s-]+$/, "")}{" "}
                        </span>
                      </p>
                      <div className="flex-shrink-0 mt- 1 pt-5">
                        <ChevronDown
                          size={30}
                          className={` text-gray-500 transition-all duration-700 ${
                            isExpanded && "rotate-180 "
                          }`}
                        />
                        {/* {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ratios Section */}
                {isExpanded && (
                  <div
                    className={` transition-all duration-700 border-b border- gray-100 bg- gray-50`}
                  >
                    <div className="p-6">
                      {/* <div className="flex items-center gap-2 mb-4">
                        <Scale className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-semibold text-gray-900 text-xx font-gilda_Display">
                          Legal Ratios
                        </h3>
                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full border">
                          {issue.ratios?.length ?? 0} item
                          {issue.ratios?.length > 1 ? "s" : ""}
                        </span>
                      </div> */}

                      <div className="space-y-4">
                        {issue?.ratios?.length > 0 ? (
                          issue.ratios?.map((ratio, ratioIndex) => (
                            <div
                              key={ratio.id}
                              className="bg- white round ed-lg p -5 bor der border-gray -200 shadow- sm hover:shadow- md transition-shad ow duration-200"
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 pt-2">
                                  <div className="w-2 8 h-2 8 bg- indigo-100 text-primary rounded- full flex items-center justify-center text-xs font-semibold">
                                    {mappedAlphabets[ratioIndex]}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  {/* <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                      Ratio ID: {ratio.id}
                                    </span>
                                  </div> */}
                                  <p
                                    title="Click to read in main judgement"
                                    onClick={(e) => {
                                      e?.stopPropagation();
                                      // set the quote to highlight state and navigate to the full judgement page
                                      setClickedQuote({
                                        quote: ratio?.text,
                                        citation: "",
                                        treatment_type: "",
                                      });
                                    }}
                                    className="text-[0.875rem] cursor-pointer text-lexblue [#FFECBC] leading-relaxed text-justify"
                                  >
                                    {ratio.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>
                            <p>No ratio found for this issue</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-6">
            No issues found for this case.
          </p>
        )}
      </div>

      {/* Footer Summary */}
      {/* <div
        className={`mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${
          isTitle && "fixed"
        } bottom-0 w-full max-w-[972px]`}
      >
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Displaying{" "}
            <span className="font-semibold text-gray-900">
              {caseData?.length}
            </span>{" "}
            legal issues with a total of{" "}
            <span className="font-semibold text-gray-900">
              {caseData
                ? caseData.reduce(
                    (acc, issue) =>
                      acc +
                      (typeof issue?.ratios?.length === "number"
                        ? issue.ratios.length
                        : 0),
                    0
                  )
                : ""}
            </span>{" "}
            associated ratios
          </p>
        </div>
      </div> */}
    </div>
  );
}

//  [
//       {
//         id: 161,
//         issue:
//           "CONSTITUTIONAL LAW - JUDICIARY AND JUSTICE ADMINISTRATION - Whether the judgment of the lower Court delivered on the 7th day of June, 2018 outside the 90 days limited by Section 294(1) of the 1999 Constitution as amended is null and void.",
//         priority: 1,
//         ratios: [
//           {
//             id: 463,
//             text: "Pursuant to the provisions of Section 294(1) of the 1999 Constitution (as amended), all Courts of law in Nigeria; particularly superior Courts of record established directly under the Constitution, have a legal duty and a binding judicial obligation to deliver their judgments/decisions in writing not later than ninety (90) days after conclusion of evidence and final addresses in all cases/matters brought before them and furnish all the parties with duly authenticated copies thereof within seven (7) days of the delivery thereof.",
//           },
//           {
//             id: 464,
//             text: "The constitutional provision limiting the time for delivery of judgment to 90 days is mandatory and not directory, and any judgment delivered beyond this period is null and void ab initio.",
//           },
//           {
//             id: 465,
//             text: "Where a court fails to deliver judgment within the constitutionally prescribed time limit, such failure renders the entire proceedings nugatory and of no legal effect.",
//           },
//         ],
//       },
//       {
//         id: 162,
//         issue:
//           "EVIDENCE - BURDEN OF PROOF - Whether the plaintiff has discharged the burden of proof required to establish his case on the balance of probabilities.",
//         priority: 2,
//         ratios: [
//           {
//             id: 466,
//             text: "In civil proceedings, the standard of proof required is proof on the balance of probabilities, which means that the case of one party is more probable than that of the other.",
//           },
//           {
//             id: 467,
//             text: "The burden of proof lies on the party who asserts the affirmative of any proposition, and this burden does not shift throughout the trial.",
//           },
//         ],
//       },
//     ]
