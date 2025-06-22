"use client";
import { useSimilarity_searchMutation } from "@app/store/services/searchSlice";
import React from "react";

function RelatedContent() {
  const [similarirtySearch, { isError, isSuccess, data, isLoading }] =
    useSimilarity_searchMutation();

  async function Search(e: any) {
    e?.stopPropagation();
    try {
      const res = await similarirtySearch({
        content:
          "I have also found that the accused person had sexual intercourse with the prosecutrix. The cumulative effect of these findings is that the ingredients of an offence under Section 282 (1) (e) of the Penal Code have been made out by the prosecution.",
      }).unwrap();
      console.log("similarity search", JSON.stringify(res));
    } catch (error) {
      console.log("error from similarity search", error);
    }
  }
  return (
    <div className="relative z-50 bg-red-600 h-full">
      <h3 className=" capitalize pl-1 pr-2 py-[0.125rem] bg-[#EBF2FF] stone-100 rounded text-center text-[#245B91] text-sm font-medium">
        Similarly
      </h3>
      <button
        type="button"
        className="text-xx bg-blue-700 p-2"
        onClick={Search}
      >
        {isLoading ? "Start similarity search" : "SIMILARITY SEARCH"}
      </button>
    </div>
  );
}

export default RelatedContent;
