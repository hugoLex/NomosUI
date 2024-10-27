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
} from "@app/types";
import { escapeRegExp } from "@app/utils";

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

const SearchResultMeta = (prop: {
  index: string | number;
  data: ArticleDocuments | CaseDocuments | LegislationDocuments;
  type: SearchType;
}) => {
  const { index, data, type } = prop;
  const { id, content, context, metadata } = data;

  let _link: string = "what is law";
  let fmtTxt: string = content;
  let _metadata: any;

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

      <p
        dangerouslySetInnerHTML={{ __html: fmtTxt }}
        className="text-[0.875rem]"
      />
    </div>
  );
};

export default SearchResultMeta;
