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
    try {
      const res = await similarirtySearch({
        // content: query ?? "",
        content:
          "I have also found that the accused person had sexual intercourse with the prosecutrix. The cumulative effect of these findings is that the ingredients of an offence under Section 282 (1) (e) of the Penal Code have been made out by the prosecution.",
      }).unwrap();
      console.log("similarity search", res);
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
      {data?.related_chunks?.map((data, idx) => (
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

// export function App(props) {

// const context = [
//   "It is powerful, gentle, and endless.",
//   "helpful actions, or simply being there for someone",
//   "It helps us support each other during hard times and celebrate"
// ];

// const content = `Love is a beautiful feeling that connects people. It makes us care deeply for family, friends, and even strangers. Love is kind, patient, and forgiving. It helps us support each other during hard times and celebrate together in happy moments. True love is not selfish; it thinks of others first. Love can be shown through kind
//  words, warm hugs, helpful actions, or simply being there for someone. Even when people are far apart, love keeps hearts close. It is powerful, gentle, and endless. Love makes the world a brighter, better place for everyone.`;

// // Escape special characters for each context string
// const escapedContext = context.map(str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
// console.log(escapedContext)
// // Build the regex pattern with capturing group
// const pattern = `(${escapedContext.join('|')})`;
// const regex = new RegExp(pattern, 'g');

// // Split with capturing group so context strings are retained
// const splitted = content.split(regex);

// console.log(splitted);

//   return (
//     <div className='App'>
//       <h1>Hello React.</h1>
//       <h2>Start editing to see some magic happen!</h2>
//       <div>{splitted.map((item,idx)=>{
//         if(context.includes(item)){
//           return <span style={{color:"red"}} key={`key-of-item${idx}`}>{item}</span>
//         }
//         return <span key={`key-of-item${idx}`}>{item}</span>
//       })}</div>
//     </div>
//   );
// }
