import React from "react";
import Link from "next/link";

type SearchResultMetaProp = {
  idx: string;
  caseTitle: string;
  date: string | number;
  court: string;
};

const SearchResultMeta = (prop: SearchResultMetaProp) => {
  const { idx, caseTitle, date, court } = prop;

  const link = "what is law";
  return (
    <div className="mb-4">
      <h3 className="text-base font-medium mb-2">
        <Link href={`/cases/${link.replace(/\s/g, "-")}`}>
          <span>{idx}. </span> {caseTitle}
        </Link>
      </h3>
      <p className="flex gap-x-4">
        <span className="h-8 px-2 py-[9px] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
          {date}
        </span>
        <span className="h-8 px-2 py-[9px] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
          {court}
        </span>
      </p>
    </div>
  );
};

export default SearchResultMeta;
