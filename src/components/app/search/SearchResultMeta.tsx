import React, { Fragment, useState } from "react";
import Link from "next/link";
import {
  ArticleMetadata,
  CaseMetadata,
  LegislationMetadata,
  PrinciplesMetadata,
  SearchType,
  TSearchResultDocument,
} from "@app/types";
import { escapeRegExp } from "@app/utils";
import SmallTextBtn from "../../shared/SmallBtn";
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

const SummaryComponent = ({ summary }: { summary?: string }) => {
  const { close, searchParams } = UseQueryToggler();
  // const [showCaseSummary, setShowCaseSummary] = useState(index);

  const defaultSummary = ` A final decision is one that leaves nothing to be judicially determined
        or ascertained thereafter, in order to render it effective and capable
        of execution, and is absolute, complete, and certain.`;

  return (
    <div className="mt-[30px] bg-[#eaf0f2]/30 rounded-lg px-4 pt-3 relative">
      <div className="flex justify-between">
        <p className="text-sm">Summary</p>
        <RiCloseLine
          onClick={() => close("showCaseSummary", undefined)}
          className="text-pink-600 ml-auto cursor-pointer"
          size={19}
        />
      </div>
      <hr className="mt-2 mb-5" />
      <p className="text-sm flex-wrap">{summary ?? defaultSummary}</p>
      <div className="flex gap-5 items-center py-5">
        <SmallTextBtn
          smallBtnData={["Judgement"]}
          divStyle=""
          btnStyle="border-white font-light bg-primary  px-3 py-1 text-white/80"
        />
        {/* <SmallTextBtn
          smallBtnData={["Precedent analytics"]}
          divStyle=""
          btnStyle="border-white font-light bg-primary  px-3 py-1 text-white/80"
        /> */}
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
  const { content, context, metadata } = data;
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
          <span className="text-gray-500">{index}. </span>
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
        <p dangerouslySetInnerHTML={{ __html: fmtTxt }} className="text-sm" />
        {/* when i wrote this logic, I understood it, as you read it God help you to understand it in your attempt to change it */}
        {/* God help us all 🤣🤣🤣? */}
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

      {type === "cases" && (
        <Fragment>
          {showCaseSummary !== null && showCaseSummary === index && (
            <SummaryComponent summary={metadata.summary} />
          )}

          {showCaseSummary === null && index === "1" && (
            <SummaryComponent summary={metadata.summary} />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default SearchResultMeta;
