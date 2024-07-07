import React, { Fragment, useState } from "react";
import Link from "next/link";
import { SearchResultDoc } from "@app/types";
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
  data: SearchResultDoc;
}) => {
  const { index, data } = prop;
  const { id, content, context, metadata } = data;

  let fmtTxt: string = content;

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

  const link = "what is law";
  return (
    <div className="mb-4 space-y-3">
      <h3 className="text-base font-medium">
        <Link href={`/cases/${id ? id : link.replace(/\s/g, "-")}`}>
          <span>{index}. </span> {metadata.case_title}
        </Link>
      </h3>

      <p className="flex gap-x-4">
        <span className="px-2 py-[9px] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
          {metadata.year}
        </span>
        <span className="px-2 py-[9px] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
          {metadata.court}
        </span>
      </p>

      <p
        dangerouslySetInnerHTML={{ __html: fmtTxt }}
        className="text-[0.875rem]"
      />
    </div>
  );
};

export default SearchResultMeta;
