import React, { Fragment, useState } from "react";
import Link from "next/link";
import {
  ArticleDocuments,
  ArticleMetadata,
  CaseMetadata,
  CaseDocuments,
  LegislationDocuments,
  LegislationMetadata,
  SearchType,
  TSearchResultDocument,
} from "@app/types";
import { escapeRegExp } from "@app/utils";
import SmallTextBtn from "../generalSharedComponents/SmallBtn";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { UseQueryToggler } from "@app/hooks/queryHandler";

const SummaryView = ({
  content,
  context,
}: {
  content: string;
  context: string;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const toogleShow = () => setShow(!show);

  console.log(content.split(context).length);

  return (
    <Fragment>
      <div className="summary">
        <div className={`preview `}>
          <p className={`text ${show ? "full" : "short"}`}>
            {[
              ...content.split(context).slice(0, 1),
              context,
              ...content.split(context).slice(1),
            ].map((group) => {
              return (
                <span
                  className={` ${group === context ? "bg-[#FFE89E]" : ""} px-1`}
                  key={group}
                >
                  {group}
                </span>
              );
            })}
          </p>
          {/* {content.length > 24 && (
            <span onClick={toogleShow}>{show ? "collapse" : "See more"}</span>
          )} */}
        </div>
      </div>
    </Fragment>
  );
};

const SummaryComponent = () => {
  const { close, searchParams } = UseQueryToggler();
  // const [showCaseSummary, setShowCaseSummary] = useState(index);
  return (
    <div className="text-[.88rem] mt-[30px] bg-[rgb(255,229,153,0.25)]  border-[rgb(255,229,153)] border-solid border rounded-md px-2 pt-3 relative">
      <button type="button" className="">
        Summary
      </button>
      <hr className="mt-2 mb-5" />
      <p>
        A final decision is one that leaves nothing to be judicially determined
        or ascertained thereafter, in order to render it effective and capable
        of execution, and is absolute, complete, and certain.
      </p>
      <div className="flex gap-5 items-center py-5">
        <SmallTextBtn
          smallBtnData={["Judgement"]}
          divStyle=""
          btnStyle="border-white font-light  px-2 py-1  bg-[rgb(159,197,248)] text-black/80"
        />
        <SmallTextBtn
          smallBtnData={["Precedent analytics"]}
          divStyle=""
          btnStyle="border-white font-light  px-2 py-1  bg-[rgb(159,197,248)] text-black/80"
        />
        <RiCloseLine
          onClick={() => close("showCaseSummary", undefined)}
          className="text-pink-600 ml-auto cursor-pointer"
          size={19}
        />
      </div>
    </div>
  );
};

const SearchResultMeta = (prop: {
  index: string | number;
  data: TSearchResultDocument;
  type: SearchType;
}) => {
  const { index, data, type } = prop;
  const { id, content, context, metadata } = data;
  let _link: string = "what is law";
  let fmtTxt: string = content;
  let _metadata: any;

  const { close, searchParams } = UseQueryToggler();
  const showCaseSummary = searchParams.get("showCaseSummary");

  if (typeof context === "string") {
    fmtTxt = fmtTxt.replace(
      RegExp(escapeRegExp(`${context}`), "gi"),
      `<span class=\"bg-[#FFE89E]\">${context}</span>`
    );
  } else {
    context.forEach((txt, idx) => {
      fmtTxt = fmtTxt.replace(
        RegExp(escapeRegExp(`${txt}`), "gi"),
        `<span class=\"bg-[#FFE89E]\">${txt}</span>`
      );
    });
  }

  return (
    <div className="mb-8 space-y-3">
      <h3 className="text-base font-medium">
        <Link
          href={`/cases/${id ? id : _link.replace(/\s/g, "-")}`}
          className="text-[#245b91]"
        >
          <span className="text-gray-500">{index}. </span>
          {type === "articles" && (metadata as ArticleMetadata).article_title}
          {type === "cases" && (metadata as CaseMetadata).case_title}
          {type === "legislations" &&
            (metadata as LegislationMetadata).document_title}
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

      <div>
        <p
          dangerouslySetInnerHTML={{ __html: fmtTxt }}
          className="text-[0.875rem]"
        />
        {/* when i wrote this logic, I understood it, as you read it God help you to understand it in your attempt to change it */}
        {index == "1" && showCaseSummary !== null && showCaseSummary !== "1" ? (
          <HiOutlineDocumentText
            title="Case summary"
            onClick={() => close("showCaseSummary", index as string)}
            className="text-gray-500 my-5 cursor-pointer  mr-auto"
            size={19}
          />
        ) : index !== "1" && showCaseSummary !== index ? (
          <HiOutlineDocumentText
            title="Case summary"
            onClick={() => close("showCaseSummary", index as string)}
            className="text-gray-500 my-5 cursor-pointer  mr-auto"
            size={19}
          />
        ) : null}
      </div>

      {showCaseSummary == index ? (
        <SummaryComponent />
      ) : index == "1" && showCaseSummary == null ? (
        <SummaryComponent />
      ) : null}
    </div>
  );
};

export default SearchResultMeta;
