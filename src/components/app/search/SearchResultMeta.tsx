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

  const escCxt = RegExp(escapeRegExp(`${context}`), "gi");

  const fmtTextCont = content.replace(
    escCxt,
    `<span class=\"bg-[#FFE89E]\">${Text}</span>`
  );

  const link = "what is law";
  return (
    <div className="mb-4">
      <h3 className="text-base font-medium mb-2">
        <Link href={`/cases/${id ? id : link.replace(/\s/g, "-")}`}>
          <span>{index}. </span> {metadata.case_title}
        </Link>
      </h3>
      <p className="flex gap-x-4">
        <span className="h-8 px-2 py-[9px] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
          {metadata.year}
        </span>
        <span className="h-8 px-2 py-[9px] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
          {metadata.court}
        </span>
      </p>

      <p>{fmtTextCont}</p>
    </div>
  );
};

export default SearchResultMeta;
