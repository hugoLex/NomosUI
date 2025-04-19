import React, { FC, Fragment, useState } from "react";
import Link from "next/link";
import {
  ArticleMetadata,
  CaseMetadata,
  GenericObject,
  LegislationMetadata,
  PrinciplesMetadata,
  SearchType,
  TSearchResultDocument,
} from "@app/types";
import { escapeRegExp } from "@app/utils";
import { HiOutlineDocumentText } from "react-icons/hi2";

import { LLMResult } from "@app/types";
import {
  Markdown,
  PreviewCard,
  SummaryComponent,
  SummaryPreview,
} from "@app/components/shared";
import { useQueryHandler } from "@app/hooks";
import FulljudgementModal from "../library/case/fulljudgementModal";
import { useCaseQuery } from "@app/store/services/caseSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import useFetchFullJudgementData from "@app/hooks/useFetchFullJudgementData";

export const SearchAIMetaResult: FC<{ data: LLMResult }> = (prop) => {
  const { data } = prop;

  if (typeof data === "string") {
    return <PreviewCard content={data} />;
  }
  console.log("Ai search is returning 2");
  return (
    <Fragment>
      <div className="space-y-4 mb-4">
        <h5>References</h5>
        {/* <div className="flex gap-4">
            {data.documents.map(({ id, meta }, idx) => {
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
          </div> */}
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
            {data.document_metadata.map((itx: GenericObject, idx: number) => {
              return (
                <Fragment key={`id-${idx}`}>
                  {/* <SummaryPreview text={itx} /> */}
                  {/* <p
                  className="text-black/80 text-sm leading-6 font-normal whitespace-preWrap"
                  dangerouslySetInnerHTML={{ __html: itx.trim().split("\n") }}
                /> */}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const SearchResultMeta = (prop: {
  index: string | number;
  data: TSearchResultDocument;
  type: SearchType;
}) => {
  const { index, data, type } = prop;
  const { occurrences, metadata } = data;
  let _link: string = "what is law";
  let _metadata: any;

  // console.log("Content and contex", metadata);
  // This is the logic for highlighting the full judgement
  const [quoteToHighlight, setQuoteToHighlight] = useState<{
    quote: string;
    citation: string | null;
    treatment_type: string;
  } | null>(null);
  // search using the case id or skip it
  // const { isError, isLoading, data:fullJudgement } = useCaseQuery(metadata.document_id??skipToken)
  // This is a hook to get the fullcase of any valid id
  const { fullJudgement } = useFetchFullJudgementData(metadata.document_id);
  // console.log("full judgement", fullJudgement);
  const { close, searchParams, router } = useQueryHandler();
  const showCaseSummary = searchParams.get("showCaseSummary");
  //  this opens the full case page and scrolls and highlights a portion of the case
  // const handleHighlightFullJudgement = (
  //   Text_highlighted: string,
  //   course_id: string
  // ) => {
  //   localStorage.setItem("caseData", JSON.stringify(Text_highlighted));
  //   router.push(
  //     `/library/cases/${
  //       course_id ? course_id : _link.replace(/\s/g, "-")
  //     }?title=${metadata.case_title}&tab=case`
  //   );
  // };
  const mappedAlphabets: { [key: number]: string } = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
  };
  const Occurrences = () =>
    (
      occurrences as {
        content: string;
        context: string;
        // keywords was added please update your type definition
        keywords: string[];
      }[]
    ).map(({ content, context, keywords }, ptx: number) => {
      // let fmtTxt: string = content.trim();
      // // if (typeof context === "string") {
      // console.log("full context", context);
      // fmtTxt = fmtTxt.replace(
      //   RegExp(escapeRegExp(`${context.trim()}`), "gi"),
      //   `<span class="bg-[#FFE89E]" onClick="${
      //     handleHighlightFullJudgement(  "hello world",
      //       "123456789")

      //   }">${context.trim()}<sup class="hover:bg-primary bg-[#e5e7eb] px-[0.3rem] text-[#111827] min-w-[1rem] text-center rounded-[0.3125rem] cursor-pointer align-middle font-mono text-[0.6rem] tabular-nums hover:text-white py-[0.1875rem]">${
      //     mappedAlphabets[ptx]
      //   }</sup></span>`
      // );

      const boldWords = keywords;
      // Create a regex pattern dynamically from the boldWords array
      // const regexPattern = new RegExp(`\\b(${boldWords.join("|")})\\b`, "gi");
      const contextResolved = context.trim().split(" ");
      const contextLength = contextResolved.length;

      // const renderTextWithBold = content
      //   .split(regexPattern)
      //   .map((word, index) =>
      //     boldWords.includes(word) ? <b key={index}>{word}</b> : word
      //   );

      return (
        <p className="text-sm mb-6 " key={ptx}>
          {/* Render highlighted quote */}
          <mark id="" className="bg-white [#FFECB3]">
            {content
              .trim()
              .split(" ")
              // .split(regexPatternHighlight)
              .map((word, index) => {
                return contextResolved.includes(word) ? (
                  // && index < contextLength
                  <span
                    className={`text-primary ${
                      boldWords.includes(word) ? "font-bold" : ""
                    } `}
                    key={index}
                  >
                    {" "}
                    {word}
                  </span>
                ) : (
                  <span
                    className={`${boldWords.includes(word) ? "font-bold" : ""}`}
                    key={index}
                  >
                    {" "}
                    {word}
                  </span>
                );
              })}
          </mark>

          <sup
            onClick={
              () =>
                setQuoteToHighlight({
                  citation: null,
                  quote: content.trim(),
                  treatment_type: "",
                })
              // This opens the full judgement page and highlights the content
              // handleHighlightFullJudgement(
              //   content.trim(),
              //   metadata?.document_id
              // )
            }
            className="hover:bg-primary bg-[#e5e7eb] px-[0.3rem] text-[#111827] min-w-[1rem] text-center rounded-[0.3125rem] cursor-pointer align-middle font-mono text-[0.6rem] tabular-nums hover:text-white py-[0.1875rem]"
          >
            {mappedAlphabets[ptx]}
          </sup>
        </p>
        // <p className="text-sm mb-6" key={ptx}>
        //   {/* Render first part */}
        //   {parts[0] && <span>{parts[0]} </span>}

        //   {/* Render highlighted quote */}
        //   <mark id="" className="bg-[#FFECB3]">
        //     {contextResolved.split(regexPattern).map((word, index) =>
        //       boldWords.includes(word) ? (
        //         <b className="text-primary font-bold" key={index}>
        //           {word}
        //         </b>
        //       ) : (
        //         word
        //       )
        //     )}
        //   </mark>

        //   {/* Render remaining content */}
        //   {parts[1] && <span>{parts[1]} </span>}
        //   <sup
        //     onClick={
        //       () =>
        //         setQuoteToHighlight({
        //           citation: null,
        //           quote: content.trim(),
        //           treatment_type: "",
        //         })
        //       // handleHighlightFullJudgement(
        //       //   content.trim(),
        //       //   metadata?.document_id
        //       // )
        //     }
        //     className="hover:bg-primary bg-[#e5e7eb] px-[0.3rem] text-[#111827] min-w-[1rem] text-center rounded-[0.3125rem] cursor-pointer align-middle font-mono text-[0.6rem] tabular-nums hover:text-white py-[0.1875rem]"
        //   >
        //     {mappedAlphabets[ptx]}
        //   </sup>
        // </p>
      );
      // return (
      //   <p
      //     key={ptx}
      //     // dangerouslySetInnerHTML={{ __html: fmtTxt }}
      //     className="text-sm mb-6"
      //   >
      //     {
      //       <span
      //         className="bg-[#FFE89E]"
      //         onClick={handleHighlightFullJudgement}
      //       >
      //         {context.trim()}
      //         <sup className="hover:bg-primary bg-[#e5e7eb] px-[0.3rem] text-[#111827] min-w-[1rem] text-center rounded-[0.3125rem] cursor-pointer align-middle font-mono text-[0.6rem] tabular-nums hover:text-white py-[0.1875rem]">
      //           {mappedAlphabets[ptx]}
      //         </sup>
      //       </span>
      //     }
      //   </p>
      // );
    });
  // console.log("Occurences updated", occurrences);
  return (
    <div className="mb-8 space-y-3 border-b border-b-primary/10 pb-5">
      {/* This is a modal to display the fullcase and highlighted area  */}
      {quoteToHighlight && fullJudgement && (
        <FulljudgementModal
          // innerRef={h2Ref}
          // id={caseId}
          setClickedQuote={setQuoteToHighlight}
          case_title={metadata.case_title}
          quoteToHighlight={quoteToHighlight}
          full_judgement={fullJudgement?.judgement}
        />
      )}
      <span className="text-[#008E00] bg-[#008E00]/10 text-xs px-3 py-1 rounded">
        {metadata.document_type}
      </span>

      <h3 className="text-base font-medium">
        <Link
          href={`/library/cases/${
            metadata.document_id
              ? metadata.document_id
              : _link.replace(/\s/g, "-")
          }?title=${metadata.case_title}&tab=case`}
          className="text-[#245b91]"
        >
          <span className="text-gray-500 ">{index}. </span>
          {type === "articles" && (metadata as ArticleMetadata).article_title}
          {type === "cases" && (metadata as CaseMetadata).case_title}
          {type === "legislations" &&
            (metadata as LegislationMetadata).document_title}
          {type === "principles" && (metadata as PrinciplesMetadata).case_title}
        </Link>
      </h3>

      {type === "articles" && (
        <p className="flex gap-x-4">
          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as ArticleMetadata).author}
          </span>
          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as ArticleMetadata).year}
          </span>
        </p>
      )}

      {type === "cases" && (
        <p className="flex gap-x-4">
          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as CaseMetadata).court}
          </span>
          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as CaseMetadata).year}
          </span>

          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as CaseMetadata).suit_number}
          </span>
        </p>
      )}

      {type === "legislations" && (
        <p className="flex gap-x-4">
          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            Section {(metadata as LegislationMetadata).section_number}
          </span>
          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as LegislationMetadata).year}
          </span>
        </p>
      )}

      {type === "principles" && (
        <p className="flex gap-x-4">
          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as PrinciplesMetadata).court}
          </span>
          {/* <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as PrinciplesMetadata).}
          </span> */}
        </p>
      )}

      <div>
        <Occurrences />
        {/* <p dangerouslySetInnerHTML={{ __html: fmtTxt }} className="text-sm" /> */}
        {/* when i wrote this logic, I understood it, as you read it God help you to understand it in your attempt to change it */}
        {/* God help us all 🤣🤣🤣? */}
        {/* {index == "1" && showCaseSummary !== null && showCaseSummary !== "1" ? (
          <>
            <HiOutlineDocumentText
              title="Case summary"
              onClick={() => close("showCaseSummary", index as string)}
              className="text-gray-500 my-5 cursor-pointer  mr-auto"
              size={19}
            />
            Summary
          </>
        ) : index !== "1" && showCaseSummary !== index ? (
          <HiOutlineDocumentText
            title="Case summary"
            onClick={() => close("showCaseSummary", index as string)}
            className="text-gray-500 my-5 cursor-pointer  mr-auto"
            size={19}
          />
        ) : null} */}
      </div>

      {/* {type === "cases" && (
        <Fragment>
          {showCaseSummary !== null && showCaseSummary === index && (
            <SummaryComponent summary={metadata.summary} isCollapsible />
          )}

          {showCaseSummary === null && index === "1" && (
            <SummaryComponent summary={metadata.summary} isCollapsible />
          )}
        </Fragment>
      )} */}
    </div>
  );
};
