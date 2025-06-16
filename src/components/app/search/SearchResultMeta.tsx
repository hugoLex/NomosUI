import React, {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  ArticleMetadata,
  CaseMetadata,
  GenericObject,
  LegalAnalysisLLMResponse,
  LegislationMetadata,
  PrinciplesMetadata,
  SearchType,
  TSearchResultDocument,
} from "@app/types";
import { escapeRegExp } from "@app/utils";
import { HiMinus, HiOutlineDocumentText } from "react-icons/hi2";

import { LLMResult } from "@app/types";
import {
  Markdown,
  PreviewCard,
  SummaryComponent,
  // SummaryPreview,
} from "@app/components/shared";
import { useQueryHandler } from "@app/hooks";
import FulljudgementModal from "../library/case/fulljudgementModal";
import { useCaseQuery } from "@app/store/services/caseSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import useFetchFullJudgementData from "@app/hooks/useFetchFullJudgementData";
import {
  searchQueryUtil,
  // useLlm_searchMutation,
  useLlm_searchQuery,
  useQuery_route_classifierQuery,
} from "@app/store/services/searchSlice";
import useQueryToggler from "@app/hooks/useQueryHandler";
import { Loader } from "@app/components/ui";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Minus, PlusIcon } from "lucide-react";
type TclasifierResult = {
  query: string;
  classification: string;
  user_message: string;
};
export const SearchAIMetaResult = ({
  setLlm_data,
}: {
  setLlm_data: Dispatch<
    SetStateAction<
      | string
      | LegalAnalysisLLMResponse
      //  {
      //     markdown: string;
      //   }
      | undefined
    >
  >;
}) => {
  // export const SearchAIMetaResult: FC<{ data: LLMResult }> = (prop) => {
  const { searchParams } = useQueryToggler();
  const query = searchParams.get("q");
  const query_type = searchParams.get("query_type");
  // console.log("query from llm page", query);

  const {
    data: llm_search_data,
    error,
    isLoading: llm_loading,
    isFetching,
  } = useLlm_searchQuery(query_type === "llm_s" && query ? query : skipToken);
  useEffect(() => {
    llm_search_data && setLlm_data(llm_search_data);
  }, [llm_search_data]);
  // console.log(
  //   "returned from llm",
  //   llm_loading,
  //   "fetching",
  //   isFetching,
  //   "error",
  //   error
  // );
  // console.log("returned from llm", llm_search_data, llm_loading, error);

  if (query_type === "llm_s" && (llm_loading || isFetching)) {
    return (
      <div className="flex items-center justify-center min-h-[500px] bg-gray-100">
        <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-2xl shadow-xl">
          <p className="text-gray-700 text-lg text-center max-w-md">
            Analyzing your legal question to provide a comprehensive
            response.....
          </p>
          <div className="flex items-center justify-center">
            <Loader variant="classic" size={20} />
          </div>
        </div>
      </div>
    );
  }
  llm_search_data && console.log(llm_search_data, error);
  // if (llm_search_data && typeof llm_search_data === "string") {
  //   return <PreviewCard content={llm_search_data?.slice(13).slice(0, -3)} />;
  // }

  function splitWithDelimiter(text: string, delimiters: string[]) {
    // Escape special regex characters in the delimiters
    // const escapedDelimiters = delimiters.map((d) =>
    //   d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    // );

    // Join the escaped delimiters with | for alternation
    const pattern = `(${delimiters.join("|")})`;

    // Create the regex with the capture group
    const regex = new RegExp(pattern, "g");

    // Split while keeping the delimiters as separate elements
    return text.split(regex).filter((item) => item !== "");
  }
  if (llm_search_data) {
    // Check if llm_search_data is an object with a markdown property
    const markdownContent =
      typeof llm_search_data === "object" && llm_search_data !== null
        ? (llm_search_data as LegalAnalysisLLMResponse).final_answer || ""
        : // ? (llm_search_data as { markdown: string }).markdown || ""
        typeof llm_search_data === "string"
        ? llm_search_data
        : "";

    if (markdownContent) {
      // Example usage
      const headingsToHighlight = [
        "## Answer:",
        "## Legal Framework:",
        "## Introduction:",
        "## Analysis:",
        "## Conclusion:",
      ];
      const result = splitWithDelimiter(markdownContent, headingsToHighlight);
      // console.log("split text ready for mapping", result);
      const replacedText = result.map((text, idx) =>
        headingsToHighlight.includes(text) ? (
          <h3
            key={"replaced" + idx}
            className={`  ${
              text === "## Answer"
                ? "text-lg font-bold"
                : "text-[1.1rem] font-semibold text-powder_blue"
            }  font-gilda_Display `}
          >
            {text.replaceAll("#", "")}
          </h3>
        ) : (
          <p
            key={"replaced" + idx}
            className={`relative ${idx == 0 && "hidden"} 
              `}
          >
            <Markdown
              content={text}
              className="wrapper text-wrap overflow-x-hidden text-sm text-lexblue font-poppins"
            />
          </p>
        )
      );
      // console.log(replacedText);
      // const displayText = markdownContent.split("## Answer");
      // console.log(displayText);
      return (
        <>
          <div id="Llmanswer" className="">
            {replacedText}
          </div>
          {[
            ["share-knowledge-stroke-rounded.svg", "Share"],
            ["file-download-stroke-rounded.svg", "Download"],
          ].map(([icon, name]) => (
            <button
              key={name as string}
              type="button"
              className=" focus:outline-none outline-none outline-transparent transition duration-300 ease-out font-sans  select-none  relative group/button  justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150  origin-center whitespace-nowrap inline-flex text-sm h-8 pl-2.5 pr-3"
            >
              {name === "Download" ? (
                <a
                  href={
                    name === "Download"
                      ? `https://webapp.lexanalytics.ai/api/ask/pdf?question=${encodeURIComponent(
                          query ?? ""
                        )}`
                      : "#Llmanswer"
                  }
                  download
                  className="flex items-center min-w-0 font-medium gap-1.5 justify-center"
                >
                  <div className="relative w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                    <Image
                      width={16}
                      height={16}
                      src={`/images/icons/${icon}`}
                      alt={name}
                    />
                  </div>
                  <div className="text-align-center relative truncate leading-loose -mb-px text-powder_blue">
                    {name}
                  </div>
                </a>
              ) : (
                <div
                  // href={
                  //   name === "Download"
                  //     ? `https://webapp.lexanalytics.ai/api/ask/pdf?question=${encodeURIComponent(
                  //         query ?? ""
                  //       )}`
                  //     : "#Llmanswer"
                  // }
                  // download
                  className="flex items-center min-w-0 font-medium gap-1.5 justify-center"
                >
                  <div className="relative w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                    <Image
                      width={16}
                      height={16}
                      src={`/images/icons/${icon}`}
                      alt={name}
                    />
                  </div>
                  <div className="text-align-center relative truncate leading-loose -mb-px text-powder_blue">
                    {name}
                  </div>
                </div>
              )}
            </button>
          ))}
          <div className="mb-8 space-y-3 border-b border-b-primary/10 pb-5"></div>
          <div className=" relative   ">
            {llm_search_data.decomposed_questions?.map(
              ({ question, answer }, index) => (
                <details
                  key={`QandA-${index}`}
                  className=" group md:rounded-[0.5rem] py-[.5rem] "
                >
                  <summary className="flex justify-between text-[0.65406rem] md:text-[1.1rem] text-powder_blue font-bold md:font-normal  list-none">
                    {question}
                    <button className="h-[20px] cursor-pointer pointer-events-none">
                      {/* <svg
                        className="pointer-events-none cursor-pointer rotate-[360deg] group-open:rotate-[-90deg] fill-current opacity-75 w-4 h-4 mr-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        >
                        <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                      </svg> */}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7333333333333334"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className=" cursor-pointer  group-open:hidden fill-current opacity-75  "
                      >
                        <path d="M12 5l0 14"></path>
                        <path d="M5 12l14 0"></path>
                      </svg>
                      <HiMinus className="hidden group-open:inline-block cursor-pointer  fill-current opacity-75" />
                    </button>
                  </summary>
                  <p className="pt-[1rem] text-[0.54506rem] md:text-sm ml-2 ">
                    <Markdown
                      content={answer}
                      className="wrapper text-wrap overflow-x-hidden text-lexblue font-poppins leading-6"
                    />
                  </p>
                </details>
              )
            )}
          </div>
          {/* <PreviewCard content={markdownContent} /> */}
        </>
      );
    }
  }

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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// {(llm_search_data?.document_metadata).map(
//   (itx: GenericObject, idx: number) => {
//     return (
//       <Fragment key={`id-${idx}`}>
//         {/* <SummaryPreview text={itx} /> */}
//         {/* <p
//       className="text-black/80 text-sm leading-6 font-normal whitespace-preWrap"
//       dangerouslySetInnerHTML={{ __html: itx.trim().split("\n") }}
//     /> */}
//       </Fragment>
//     );
//   }
// )}

export const SearchResultMeta = (prop: {
  index: string | number;
  data: TSearchResultDocument;
  type: SearchType;
}) => {
  const { searchParams } = useQueryToggler();

  const query = searchParams.get("q");
  const { index, data, type } = prop;
  const { occurrences, metadata } = data;
  let _link: string = "what is law";
  let _metadata: any;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("usestate for llm invalidate tags ran");
    dispatch(searchQueryUtil.invalidateTags(["LlmSearch"]));
  }, [query]);
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
  // const { close, searchParams, router } = useQueryHandler();
  // const showCaseSummary = searchParams.get("showCaseSummary");
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
    4: "e",
    5: "f",
    6: "g",
    7: "h",
    8: "i",
    9: "j",
    10: "k",
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
        <p className="text-sm mb-6 text- primary" key={ptx}>
          {/* Render highlighted quote */}
          <mark id="" className="bg-transparent text-[#0E3165] font -poppins">
            {content
              .trim()
              .split(" ")
              // .split(regexPatternHighlight)
              .map((word, index) => {
                return contextResolved.includes(word) ? (
                  // && index < contextLength
                  <span
                    className={`text -primary ${
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
  const pageNumberMapping: { [index: number]: number } = {
    6: 2,
    11: 3,
    16: 4,
    21: 5,
  };

  function SubQuery() {
    const [open, setopen] = useState<boolean>(false);

    return (
      <div className="mt-[8px] mb-[8px] border-l-2 py-1.5 border-lexblue bg-gray flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-[8px] text-super shrink-0 -translate-y-px rotate-180"
        >
          <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
          <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
        </svg>
        <p
          className={`text-sm text-gray-authinput ${
            open ? null : "line-clamp-3"
          } `}
        >
          The extends keyword restricts T so that only types compatible with
          FormikValues can The extends keyword restricts T so that only types
          compatible with FormikValues can The extends keyword restricts T so
          that only types compatible with FormikValues canThe extends keyword
          restricts T so that only types compatible with FormikValues can
          compatible with FormikValues can The extends keyword restricts T so
          that only types compatible with FormikValues canThe extends keyword
          restricts T so that only types compatible with FormikValues can
          {/* {open && <span>...</span>} */}
        </p>
        {open ? (
          <Minus
            className="cursor-pointer flex-shrink-0"
            size={18}
            onClick={() => setopen(false)}
          />
        ) : (
          <svg
            onClick={() => setopen(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7333333333333334"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=" cursor-pointer fill-current opacity-75 flex-shrink-0 "
          >
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
          </svg>
          // <PlusIcon
          //   className="cursor-pointer"
          //   size={50}
          //   onClick={() => setopen(true)}
          // />
        )}
      </div>
    );
  }
  // console.log("Occurences updated", occurrences);
  return (
    <div
      className={`mb-8 space-y-3 border-b border-b-primary/10 pb-5`}
      // className={`mb-8 space-y-3 border-b ${
      //   Object.keys(pageNumberMapping).includes(String(Number(index) + 1))
      //     ? "border-b-lexblue"
      //     : "border-b-primary/10"
      // }  pb-5`}
    >
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
      {/* THIS INDICATES WHERE 2 STARTS FROM  */}
      {Object.keys(pageNumberMapping).includes(index as string) && (
        <span className="mx-auto max-w-[100px] block text-white bg-lexblue text-base px-3 py-1 mt -8 mb-8 rounded font-gilda_Display">
          PAGE {pageNumberMapping[Number(index)]}
        </span>
      )}
      <span className="text-powder_blue bg-[#008E00]/10 text-xs px-3 py-1 rounded font-gilda_Display">
        {metadata.document_type}
      </span>

      <h3 className="text-[1.1rem] font-semibold font-gilda_Display">
        <Link
          href={`/library/cases/${
            metadata.document_id
              ? metadata.document_id
              : _link.replace(/\s/g, "-")
          }?title=${metadata.case_title}&tab=case`}
          className="text-powder_blue"
        >
          <span className="text-gray-500 ">{index}. </span>
          {type === "articles" && (metadata as ArticleMetadata).article_title}
          {type === "cases" && (metadata as CaseMetadata).case_title}
          {type === "legislations" &&
            (metadata as LegislationMetadata).document_title}
          {type === "principles" && (metadata as PrinciplesMetadata).case_title}
        </Link>
        {/* {button} */}
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
        <p className="flex gap-x-4 font-poppins">
          <span className="px-2 py-[0.125rem] bg-[#eaf0f2] stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as CaseMetadata).court}
          </span>
          <span className="px-2 py-[0.125rem] bg-[#eaf0f2] stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as CaseMetadata).year}
          </span>

          <span className="px-2 py-[0.125rem] bg-[#eaf0f2] stone-100 rounded text-center text-teal-900 text-sm font-medium">
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
          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-gilda_Display font-medium">
            {(metadata as PrinciplesMetadata).court}
          </span>
          {/* <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
            {(metadata as PrinciplesMetadata).}
          </span> */}
        </p>
      )}

      <div>
        <SubQuery />
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
