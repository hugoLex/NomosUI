"use client";
import { useSimilarity_searchMutation } from "@app/store/services/searchSlice";
import React, { useEffect, useState } from "react";
import { SimilaritySearchResultMeta } from "./SearchResultMeta";
import useQueryToggler from "@app/hooks/useQueryHandler";
import { Loader } from "@app/components/ui";

export default function RelatedContent() {
  const { searchParams, UpdateUrlParams } = useQueryToggler();
  const query = searchParams.get("right_cover_menu");
  const [similarirtySearch, { isError, isSuccess, data, isLoading }] =
    useSimilarity_searchMutation();
  const [state, setState] = useState<{ [key: string]: string | any }>();

  async function Search() {
    //   async function Search(e: any) {
    // e?.stopPropagation();
    if (!query) {
      return;
    }
    try {
      const res = await similarirtySearch({
        // content: query ?? "",
        content: query,
        // "I have also found that the accused person had sexual intercourse with the prosecutrix. The cumulative effect of these findings is that the ingredients of an offence under Section 282 (1) (e) of the Penal Code have been made out by the prosecution.",
      }).unwrap();
      //   console.log("similarity search", res);
      //   console.log("similarity search", JSON.stringify(res));
    } catch (error) {
      console.log("error from similarity search", error);
    }
  }

  useEffect(() => {
    query && Search();
    setState(data);
  }, [query]);
  if (isLoading) {
    return (
      <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[500px]">
        <Loader variant="classic" size={80} />
      </div>
    );
  }

  return (
    <div className="relative pt-[50px]  z-50 bg-red -600 h-full overflow-scroll scrollbar">
      {data?.cases?.map((data, idx) => (
        <SimilaritySearchResultMeta
          index={idx + 1}
          key={data?.chunk_id}
          data={data}
        />
      ))}
      {/* <button
        type="button"
        className="text-xx bg-blue-700 p-2"
        onClick={Search}
      >
        {isLoading ? "Start similarity search" : "SIMILARITY SEARCH"}
      </button> */}
    </div>
  );
}
