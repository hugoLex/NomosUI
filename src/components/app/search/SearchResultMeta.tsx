import React, { Fragment, useState } from "react";
import Link from "next/link";
import { SearchResultDoc } from "@app/types";

const SummaryView = ({ content }: { content: string }) => {
  const [show, setShow] = useState<boolean>(false);
  const toogleShow = () => setShow(!show);

  return (
    <Fragment>
      <div className="summary">
        <div className={`preview ${show ? "extend" : ""}`}>
          <p
            className={`text ${show ? "full" : "short"}`}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
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
  const { id, content, metadata } = data;

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
      <SummaryView content={content} />
    </div>
  );
};

export default SearchResultMeta;
