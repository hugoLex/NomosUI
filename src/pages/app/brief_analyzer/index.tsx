import React, { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Head, Loader } from "@app/components/ui";
import { AppLayout } from "@app/components/layout";
import { logo2 } from "@app/assets";
import { NextPageWithLayout } from "@app/types";
import { RigthArrowIcon } from "@app/components/icons";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useBrief_analyzerMutation } from "@app/store/services/searchSlice";
import { useQueryHandler, useVisibility } from "@app/hooks";
import axios from "axios";
import {
  ActionButtons,
  Container,
  Markdown,
  Navbar,
  NavbarTitle,
} from "@app/components/shared";
import LoadingLg from "@app/components/app/authentication/LoadingLg";
import Riskanalysis from "../../../components/app/briefanalyzer/riskanalysis";
import Legalarguements from "../../../components/app/briefanalyzer/legalarguments";
import Partyclaims from "../../../components/app/briefanalyzer/partyclaims";
import { PenIcon } from "lucide-react";

const Page: NextPageWithLayout = () => {
  const { pathname, searchParams, UpdateUrlParams } = useQueryHandler();
  const [inputText, setInputText] = useState<string | undefined>(undefined);
  // const [partiesPrayerss, setPartiesPrayers] = useState<
  //   { [key: string]: string[] } | undefined
  // >(undefined);
  // const [case_crafter_data, setCase_crafter] = useState<string | undefined>(
  //   undefined
  // );
  const [editQuery, setEditQuery] = useState<string | null>(null);
  const [partToScrollTo, setPartToScrollTo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(
    "A man wanted to sell his car how ever his neighbor exchanged the car with his they went home happy. after a month the price of the man's car became twice of the value and he wants his car back"
  );
  const query = searchParams.get("q");
  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  const [brief_analyzer, { isLoading, isSuccess, data }] =
    useBrief_analyzerMutation();
  const router = useRouter();
  const isTitle = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });
  useEffect(() => {
    let isCancelled = false;

    (async function () {
      if (query && query?.length > 10) {
        try {
          const res = await brief_analyzer(query).unwrap();
          //   axios.post(
          //     "https://webapp.lexanalytics.ai/api/generate-brief",
          //     { case_description: inputText },
          //     {
          //       //   timeout: 10000, // 10 second timeout for fetching data
          //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //     }
          //   );
          if (res) {
            // console.log(JSON.stringify(res.markdown_brief));
            // setCase_crafter()
          }
          // Only process response if component is still mounted
          if (!isCancelled) {
            console.log("Information case brief analyzer", res);
            // Handle successful response here
            // e.g., setBriefData(res.data);
          }
        } catch (error) {
          console.error("Error calling brief analyzer API:", error);
          //   if (!isCancelled) {
          //     console.error("Error calling brief analyzer API:", error);

          //     // Handle different types of errors
          //     if (error?.response) {
          //       // Server responded with error status (4xx, 5xx)
          //       console.error("Response error:", error.response.status, error.response.data);
          //       // Handle specific status codes if needed
          //       if (error.response.status === 401) {
          //         // Handle authentication error
          //       } else if (error.response.status === 500) {
          //         // Handle server error
          //       }
          //     } else if (error.request) {
          //       // Request was made but no response received (network issues)
          //       console.error("Network error:", error.request);
          //     } else {
          //       // Something else happened
          //       console.error("Error:", error.message);
          //     }
          //   }
        }
      }
    })();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isCancelled = true;
    };
  }, [query]);
  const headings = [
    "1. CASE OVERVIEW",
    "2. BRIEF SUMMARY",
    "3. FACTS OF THE CASE/EVENTS",
    "4. JURISDICTION/COURT",
    "5. ISSUES FOR DETERMINATION",
    "6. CLAIMS BY PLAINTIFF: STRENGTHS & WEAKNESSES",
    "7. CLAIMS BY DEFENDANT: STRENGTHS & WEAKNESSES",
    "8. PRAYERS TO THE COURT/REMEDIES SOUGHT",
    "9. SUPPORTING EVIDENCE",
    "10. RELEVANT CASE PRECEDENTS",
    "11. SUPPORTING AUTHORITIES (LEGISLATION)",
    "12. LEGAL ARGUMENTS",
    "13. RISK ANALYSIS",
    "14. READING LIST",
  ];

  useEffect(() => {
    // After judgment loads, scroll to the highlighted section
    partToScrollTo &&
      setTimeout(() => {
        const targetElement = document.getElementById(partToScrollTo);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
  }, [partToScrollTo]);

  const onSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt?.preventDefault();

    const { currentTarget } = evt;

    if (inputText) {
      router.push({
        pathname: "/brief_analyzer",
        query: {
          q: inputText,
          query_type: "brief_analyzer",
        },
      });
    }

    currentTarget.reset();
  };

  //   function SearchTypePicker() {
  //     const options = [
  //       {
  //         value: "sematic_s",
  //         label: "Search",
  //         icon: "/images/search-01-stroke-rounded.svg",
  //         // <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
  //         //   <path d="M11 2.125a8.378 8.378 0 0 1 8.375 8.375c0 .767-.1 1.508-.304 2.22l-.029.085a.875.875 0 0 1-1.653-.566l.054-.206c.12-.486.182-.996.182-1.533A6.628 6.628 0 0 0 11 3.875 6.628 6.628 0 0 0 4.375 10.5a6.628 6.628 0 0 0 10.402 5.445c.943-.654 2.242-.664 3.153.109l.176.165.001.002 4.066 4.184a.875.875 0 0 1-1.256 1.22l-4.064-4.185-.104-.088c-.263-.183-.646-.197-.975.03l-.001.003A8.378 8.378 0 0 1 2.625 10.5 8.378 8.378 0 0 1 11 2.125Zm0 7.09a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z" />
  //         // </svg>
  //       },
  //       {
  //         value: "llm_s",
  //         label: "Analysis",
  //         icon: "/images/document-validation-stroke-rounded.svg",
  //         // <svg
  //         //   xmlns="http://www.w3.org/2000/svg"
  //         //   width="16"
  //         //   height="16"
  //         //   viewBox="0 0 24 24"
  //         //   color="currentColor"
  //         //   className="transition-colors duration-300  "
  //         //   fill="currentColor"
  //         //   fill-rule="evenodd"
  //         // >
  //         //   <path d="M8.175 13.976a.876.876 0 0 1 1.172-.04l.065.061.582.59c.196.194.395.388.596.576l.39.358c1.942 1.753 3.844 2.937 5.357 3.477.81.29 1.444.369 1.884.31.404-.055.61-.216.731-.446.135-.256.209-.678.116-1.31-.08-.546-.275-1.191-.59-1.91l-.141-.313-.034-.083a.875.875 0 0 1 1.575-.741l.042.079.161.353c.36.823.61 1.623.719 2.362.122.836.071 1.675-.3 2.38-.431.818-1.186 1.247-2.044 1.363-.823.111-1.756-.056-2.707-.396-1.912-.681-4.17-2.154-6.357-4.207a30.378 30.378 0 0 1-.63-.61l-.608-.615-.058-.068a.875.875 0 0 1 .079-1.17Zm.624-5.822a.876.876 0 0 1 1.216 1.258c-.396.383-.788.775-1.165 1.178-1.95 2.077-3.26 4.133-3.835 5.747-.29.81-.37 1.444-.31 1.884.055.404.215.61.444.731l.104.048c.261.103.654.149 1.207.068.623-.09 1.378-.333 2.224-.731a.875.875 0 0 1 .745 1.583c-.948.446-1.871.756-2.716.88-.784.114-1.57.078-2.246-.234l-.134-.066c-.817-.431-1.246-1.186-1.362-2.044-.112-.823.056-1.756.395-2.707.64-1.792 1.973-3.889 3.83-5.945l.377-.411c.402-.43.816-.843 1.226-1.239Zm8.5-4.954c.832-.122 1.67-.073 2.372.302h-.001c.814.432 1.243 1.185 1.36 2.042.11.823-.057 1.756-.396 2.707-.682 1.911-2.154 4.17-4.207 6.356h-.001c-.403.429-.818.846-1.236 1.236l-.068.057a.875.875 0 0 1-1.127-1.336l.582-.562c.193-.193.385-.39.573-.592l.359-.39c1.752-1.942 2.937-3.844 3.476-5.357.29-.811.37-1.444.31-1.884-.055-.404-.216-.61-.446-.731l-.003-.002c-.248-.132-.663-.207-1.293-.114-.62.09-1.37.332-2.208.73l-.083.034a.876.876 0 0 1-.667-1.615l.351-.161c.819-.36 1.616-.612 2.353-.72Zm-5.292 7.507a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM5.544 2.971c.823-.112 1.756.056 2.707.395 1.911.682 4.17 2.154 6.356 4.207.214.201.426.406.632.612l.604.625.057.068a.875.875 0 0 1-1.271 1.19l-.065-.063-.562-.582c-.193-.193-.39-.385-.592-.573-2.077-1.95-4.133-3.26-5.747-3.835-.811-.29-1.444-.37-1.884-.31-.404.055-.61.215-.731.444l-.002.004c-.132.248-.207.664-.114 1.294.08.543.275 1.184.588 1.898l.142.31.034.083a.875.875 0 0 1-1.572.746l-.043-.079-.161-.352c-.36-.819-.612-1.615-.72-2.352-.122-.832-.073-1.67.302-2.372.431-.814 1.185-1.242 2.042-1.358Z"></path>
  //         // </svg>
  //       },
  //     ];

  //     return (
  //       <div className="flex ">
  //         <div role="radiogroup" className="flex bg-[#e4edec] rounded-[.20rem]">
  //           {options.map((option) => (
  //             <button
  //               key={option.value}
  //               role="radio"
  //               //   aria-checked={selectedSearch === option.value}
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 // setSearchSelected(option.value);
  //               }}
  //               className={`flex ${
  //                 selectedSearch === option.value
  //                   ? "bg-[#fcfcfc] text-primary border-primary border rounded-[.20rem]"
  //                   : " text-black/70"
  //               } items-center px-3 py-2 relative font-cabin font-medium`}
  //             >
  //               <span className=" w-[16px] h-[16px] relative mr-2">
  //                 {<Image fill src={option.icon} alt={option.value} />}
  //               </span>
  //               <span className="text-sm leading-[1.125rem]">{option.label}</span>
  //             </button>
  //           ))}
  //         </div>
  //       </div>
  //     );
  //   }
  //   function splitWithDelimiter(text: string, delimiters: string[]) {
  //     // Escape special regex characters in the delimiters
  //     // const escapedDelimiters = delimiters.map((d) =>
  //     //   d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  //     // );

  //     // Join the escaped delimiters with | for alternation
  //     const pattern = `(${delimiters.join("|")})`;

  //     // Create the regex with the capture group
  //     const regex = new RegExp(pattern, "g");

  //     // Split while keeping the delimiters as separate elements
  //     return text.split(regex).filter((item) => item !== "");
  //   }
  //   function CaseTreatmentDetails() {
  //     if (data) {
  //       return data?.legal_brief.precedents.map((value, idx) => {
  //         // const treaments = [" "];
  //         const treaments = ["Persuasive", "Binding"];
  //         const result = splitWithDelimiter(value, treaments);
  //         console.log(result);
  //         const formattedResult = value.split(" ").map((valueToBeFormatted) => (
  //           <p
  //             key={`key-precendent-${idx}`}
  //             className={` ${
  //               valueToBeFormatted == "persuasive"
  //                 ? "text-red-500"
  //                 : "text-lexblue"
  //             }  text-sm `}
  //           >
  //             {valueToBeFormatted}
  //           </p>
  //         ));

  //         return formattedResult;
  //       });
  //     } else {
  //       return <p></p>;
  //     }
  //   }

  function PartiesPrayers() {
    if (data?.legal_brief.prayers) {
      return Object.keys(data?.legal_brief.prayers).map((key) => {
        // setPartiesPrayers((prev) => ({
        //   ...prev,
        //   [key]: data?.legal_brief.prayers[key],
        // }));

        return (
          <>
            <h4 className="text-sm text-powder_blue">
              <span className=" capitalize">{key}</span>'s Prayers:
            </h4>

            {data?.legal_brief.prayers[key].map((value, idx) => (
              <p
                key={`key-${key}_prayer-${idx}`}
                className="text-lexblue text-sm "
              >
                {value}
              </p>
            ))}
          </>
        );
      });
    } else {
      return <></>;
    }
  }
  //   useEffect(() => {
  //     data && PartiesPrayers();
  //   }, [data]);
  //   }, [data??Object.keys(data?.legal_brief.prayers)[0]]);
  //   console.log("prayers ready", partiesPrayers);
  return (
    <>
      {!query && (
        <Fragment>
          <Navbar>
            <div className="flex justify-between py-2.5">
              {/* <div className="md:flex justify-between py-2.5"> */}
              <NavbarTitle isTitle={!isTitle} title={query ?? ""} />
              <ActionButtons />
            </div>
          </Navbar>
          <section
            className="relative flex flex-col justify-center max-w-full mx-auto mb-auto
        md:w-[700px] self-stretch p-5"
          >
            <h1
              ref={h1Ref}
              className="mb-[8px] text-xx text-lexblue font-gilda_Display capitalize font-bold my-2"
            >
              Case Craft
            </h1>
            {/* <Link href={"/"} className="mx-auto">
              <Image
                src={logo2}
                alt="Logo"
                className="shrink-0 max-w-full w-72 aspect-[4.35]"
              />
            </Link> */}
            {/* <SearchBox /> */}

            {
              <div
                className="relative"
                // id={lookupId}
              >
                <p className="text-[#567C8A] text-sm">
                  Describe your legal issue in your own words - no legal jargon
                  required. Case craft will transform your plain English
                  description into a properly formatted legal brief that clearly
                  presents your case.
                </p>
                <form
                  id="searchBox"
                  onSubmit={onSearchSubmit}
                  //   onKeyDown={handleKeyDown}
                  className="relative flex flex-col gap-5 p-2.5 rounded-md mt-8 text-2xl duration-300
            transition-all bg-stone-50 ring-1 ring-[#d5e1e4] focus-within:ring-2 z-20"
                >
                  <ReactTextareaAutosize
                    maxRows={10}
                    placeholder="Get your brief crafted..."
                    onChange={(e) => setInputText(e.target.value)}
                    className={`p-2 font-rubik text-base placeholder:text-[17px] 
              leading-6 bg-stone-50 text-zinc-600
              outline-none scrollbar-hide resize-none max-h-[40vh]`}
                    autoFocus
                    // ref={inputRef}
                    // id={id}
                    // wrap="off"
                    // onKeyUp={handleKeyUp}
                  />

                  <div className="flex gap-5 w-full items-center justify-between text-sm font-medium text-zinc-600">
                    {/* <div className="flex items-center">
              <button
                type="button"
                className="flex gap-1 justify-center items-center
           hover:bg-neutral-200/50 transition-all px-3 py-1.5 rounded-xl"
              >
                <span className="size-[18px]">
                  <FilterIcon />
                </span>
                <span>Precise</span>
              </button>
              <button
                type="button"
                className="flex gap-1 justify-center items-center
           hover:bg-neutral-200/50 transition-all px-3 py-1.5 rounded-xl"
              >
                <span className="size-[18px]">
                  <ClipPaperIcon />
                </span>
                <span>Attach</span>
              </button>
            </div> */}
                    {/* <SearchTypePicker /> */}
                    <p></p>
                    <div className="flex gap-3 items-center justify-between">
                      {/* <label htmlFor="" className=" h-6 relative inline-block;">
              <Switch />
              Pro
            </label> */}

                      <button
                        type="submit"
                        form="searchBox"
                        className={`flex justify-center items-center px-2 py-2.5 w-8 h-8 rounded-full ${
                          inputText
                            ? inputText.length <= 3
                              ? "bg-neutral-200"
                              : "bg-primary"
                            : "bg-neutral-200"
                        }`}
                        // disabled={
                        //   inputText ? (inputText.length <= 3 ? true : false) : true
                        // }
                      >
                        <RigthArrowIcon />
                      </button>
                    </div>
                  </div>
                </form>

                {/* </DetectOutsideClick> */}
              </div>
            }
          </section>

          <footer className="mx-auto">
            <div
              className="flex items-center mt-5 text-sm leading-5
           text-zinc-500 p-3 max-md:mt-10 max-md:max-w-full"
            >
              <div className="flex gap-4 max-md:flex-wrap">
                <a className="hover:underline">FAQ</a>
                <a className="hover:underline">Privacy</a>
                <a className="hover:underline">About</a>
              </div>
            </div>
          </footer>
        </Fragment>
      )}
      {isLoading && (
        <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
          <Loader variant="classic" size={80} />
        </div>
      )}
      {query && !isLoading && (
        <Fragment>
          <Head title={`Case Craft - ${query ?? ""}`} />

          <Navbar>
            <div className="flex justify-between py-2.5">
              {/* <div className="md:flex justify-between py-2.5"> */}
              <NavbarTitle isTitle={!isTitle} title={query ?? ""} />
              <ActionButtons />
            </div>
          </Navbar>

          <Container>
            <div className="flex gap-5 ">
              <div className="case-headings pt-[50px]">
                <h2 className="text-lg font-gilda_Display font-semibold">
                  Case Headings
                </h2>
                <ul>
                  {headings.map((heading, index) => (
                    <li
                      onClick={() => setPartToScrollTo(heading)}
                      key={`heading-${index}`}
                      className="text-sm cursor-pointer my-5"
                    >
                      {heading}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-screen overflow-y-scroll">
                <div className={`py-8 w-full md:max-w-[772px] mx-auto`}>
                  <div className="">
                    <div className="">
                      {/* was 8 with the sidebar  */}
                      {/* <div className="col-span-8"> */}
                      <h1
                        ref={h1Ref}
                        className="text-xx text-lexblue font-gilda_Display capitalize font-bold my-2"
                      >
                        Case Craft
                      </h1>
                      <h5 className="text-base text-[#9ea7b4] ">
                        Professionally crafted case theory
                      </h5>
                      <div className="w-full    ">
                        {editQuery ? (
                          <textarea
                            rows={3} //the row should be determined the the size of the text
                            className="text-red-600 w-full text-wrap "
                            onChange={(
                              event: React.ChangeEvent<HTMLTextAreaElement>
                            ) => {
                              setSearchQuery(event?.target?.value);
                            }}
                            value={searchQuery || ""}
                          />
                        ) : (
                          <div className="max-h-[500px] overflow-y-clip relative">
                            <div className="mt-[30px] bg-[#eaf0f2]/30 rounded-lg px-4 py-3 relative">
                              <div className="flex justify-between">
                                <h4 className="text-sm font-medium">Brief</h4>{" "}
                                <div className=" ">
                                  <PenIcon
                                    size={14}
                                    onClick={() => setEditQuery("edit")}
                                    // onClick={() => setEditQuery((prev) => !prev)}
                                    className=" inline-block px-1 py-[0.5px] rounded-md text-sm bg-green-600  text-white"
                                  />
                                  {/* <button
                                   
                                  >
                                    Edit{" "}
                                  </button> */}
                                  <button
                                    className="ml-[10px] px-1 py-[0.5px] rounded-md text-sm bg-white hover:bg-gray-authinput"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      searchQuery &&
                                        navigator.clipboard.writeText(
                                          searchQuery
                                        );
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.7142857142857142"
                                      strokeLinecap="round"
                                      stroke-linejoin="round"
                                      className=" "
                                    >
                                      <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"></path>
                                      <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <hr className="mt-2 mb-5" />

                              <p className="line-clamp-3 relative text-sm font-poppins text-lexblue">
                                {searchQuery}
                              </p>
                            </div>

                            <div className="w-full absolute bottom-0 h-[52px] bg-[linear-gradient(transparent_0px,rgba(255,255,255,0.9)_52px,#fff_80px)]"></div>
                          </div>
                        )}
                        {editQuery == "edit" && (
                          <div className="flex gap-5">
                            <button
                              onClick={() => {
                                searchQuery && setEditQuery(null);
                                searchQuery &&
                                  UpdateUrlParams("q", searchQuery);
                              }}
                              // onClick={() => setEditQuery((prev) => !prev)}
                              className="px-1 py-[0.5px] rounded-md text-sm bg-red-600 text-white"
                            >
                              Search
                            </button>
                            <button
                              className="px-1 py-[0.5px] rounded-md text-sm bg-blue-600 text-white"
                              onClick={() => setEditQuery(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      {/* <h1
                    id="case_crafter"
                    ref={h1Ref}
                    className={`${
                      query && query?.length > 73 ? "text-sm" : "text-xx"
                    } font-normal mb-6`}
                  >
                    
                    <span
                      className={` text-lexblue font-gilda_Display capitalize font-bold`}
                    >
                      {query.slice(0, 73)}
                    </span>
                  </h1>  */}
                      {data && (
                        <div>
                          <section
                            id="1. CASE OVERVIEW"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              1. CASE OVERVIEW
                            </h3>
                            <h4 className="text-sm text-powder_blue">
                              Parties Involved:
                            </h4>
                            <div className="">
                              {data?.legal_brief.case_overview.parties.map(
                                ({ name, role }) => (
                                  <div key={"key" + name}>
                                    <span className="text-sm text-powder_blue font-normal">
                                      {role}:{" "}
                                    </span>
                                    <span className="text-lexblue font-normal text-sm">
                                      {name}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </section>

                          <section
                            id="2. BRIEF SUMMARY"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              2. BRIEF SUMMARY
                            </h3>
                            <p className="text-lexblue text-sm ">
                              {data?.legal_brief.summary}
                            </p>
                          </section>
                          <section
                            id="3. FACTS OF THE CASE/EVENTS"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              3. FACTS OF THE CASE/EVENTS
                            </h3>
                            <p className="text-lexblue text-sm ">
                              {data?.legal_brief.facts}
                            </p>
                          </section>
                          <section
                            id="4. JURISDICTION/COURT"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              4. JURISDICTION/COURT
                            </h3>
                            <p className="text-lexblue text-sm ">
                              {data?.legal_brief.jurisdiction}
                            </p>
                          </section>
                          <section
                            id="5. ISSUES FOR DETERMINATION"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              5. ISSUES FOR DETERMINATION
                            </h3>
                            {/* <h4 className="text-base">Parties Involved:</h4> */}
                            <div className="ml-[10px] text-sm text-lexblue">
                              {data?.legal_brief.issues.map(
                                ({ category, description }, idx) => (
                                  <div key={`${category}-${idx}`}>
                                    <h3 className="text-sm capitalize text-powder_blue">
                                      {category} Issue:{" "}
                                    </h3>
                                    <p className="text-lexblue text-sm">
                                      {description}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </section>
                          <section
                            id="6. CLAIMS BY PLAINTIFF: STRENGTHS & WEAKNESSES"
                            className="ml-[10px] text-sm text-powder_blue"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              6. CLAIMS BY PLAINTIFF: STRENGTHS & WEAKNESSES
                            </h3>
                            {data?.legal_brief?.plaintiff_claims && (
                              <Partyclaims
                                data={data?.legal_brief.plaintiff_claims}
                                party="Plaintiff"
                              />
                            )}
                          </section>
                          <section
                            id="7. CLAIMS BY DEFENDANT: STRENGTHS & WEAKNESSES"
                            className=""
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              7. CLAIMS BY DEFENDANT: STRENGTHS & WEAKNESSES
                            </h3>
                            {data?.legal_brief?.defendant_claims && (
                              <Partyclaims
                                data={data?.legal_brief.defendant_claims}
                                party="Defendant"
                              />
                            )}
                          </section>

                          {/* <section className="pb-5  border-b-[1px] border-gray-300">
                        <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                          6. CLAIMS BY PLAINTIFF: STRENGTHS & WEAKNESSES
                        </h3>
                        <div className="ml-[10px] text-sm text-powder_blue">
                          {data?.legal_brief.plaintiff_claims.map(
                            (
                              { assertion, strength, strengths, weaknesses },
                              idx
                            ) => (
                              <div key={`key-${assertion}-${idx}`}>
                                <h3 className="text-sm  text-powder_blue">
                                  {assertion}{" "}
                                  <button
                                    className={`${
                                      strength == "weak"
                                        ? "bg-red-400"
                                        : strength == "strong"
                                        ? "bg-lexblue"
                                        : "bg-powder_blue"
                                    }  text-white text-[8px] capitalize px-1 py-[.5px] rounded-sm`}
                                  >
                                    {strength}
                                  </button>
                                </h3>
                                <div>
                                  {strengths.map((value, idx) => (
                                    <p
                                      key={`strength-${idx}`}
                                      className="text-lexblue text-sm"
                                    >
                                      Strength: {value}
                                    </p>
                                  ))}
                                </div>
                                <div>
                                  {weaknesses.map((value, idx) => (
                                    <p
                                      key={`weakness-${idx}`}
                                      className="text-lexblue text-sm"
                                    >
                                      Weakness: {value}
                                    </p>
                                  ))}
                                </div>
                                
                              </div>
                            )
                          )}
                        </div>
                      </section> */}
                          {/* <section className="pb-5  border-b-[1px] border-gray-300">
                        <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                          7. CLAIMS BY DEFENDANT: STRENGTHS & WEAKNESSES
                        </h3>
                        <div className="ml-[10px] text-sm text-lexblue">
                          {data?.legal_brief.defendant_claims.map(
                            (
                              { assertion, strength, strengths, weaknesses },
                              idx
                            ) => (
                              <div key={`key-${assertion}-${idx}`}>
                                <h3 className="text-sm  text-powder_blue">
                                  {assertion}{" "}
                                  <button
                                    className={`${
                                      strength == "weak"
                                        ? "bg-red-400"
                                        : "bg-lexblue"
                                    }  text-white text-[8px] capitalize px-1 py-[.5px] rounded-sm`}
                                  >
                                    {strength}
                                  </button>
                                </h3>
                                <div>
                                  {strengths.map((value, idx) => (
                                    <p
                                      key={`strength-${idx}`}
                                      className="text-lexblue text-sm"
                                    >
                                      Strength: {value}
                                    </p>
                                  ))}
                                </div>
                                <div>
                                  {weaknesses.map((value, idx) => (
                                    <p
                                      key={`weakness-${idx}`}
                                      className="text-lexblue text-sm"
                                    >
                                      Weakness: {value}
                                    </p>
                                  ))}
                                </div>
                               
                              </div>
                            )
                          )}
                        </div>
                      </section> */}
                          <section
                            id="8. PRAYERS TO THE COURT/REMEDIES SOUGHT"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              8. PRAYERS TO THE COURT/REMEDIES SOUGHT
                            </h3>
                            <PartiesPrayers />
                          </section>
                          <section
                            id="9. SUPPORTING EVIDENCE"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              9. SUPPORTING EVIDENCE
                            </h3>
                            <p className="text-lexblue text-sm ">
                              {data?.legal_brief.evidence}
                            </p>
                          </section>
                          <section
                            id="10. RELEVANT CASE PRECEDENTS"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              10. RELEVANT CASE PRECEDENTS
                            </h3>
                            {/* <CaseTreatmentDetails /> */}
                            {data?.legal_brief.precedents.map((value, idx) => (
                              <p
                                key={`key-precendent-${idx}`}
                                className="text-lexblue text-sm "
                              >
                                {value}
                              </p>
                            ))}
                          </section>
                          <section
                            id="11. SUPPORTING AUTHORITIES (LEGISLATION)"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              11. SUPPORTING AUTHORITIES (LEGISLATION)
                            </h3>
                            <div className="text-lexblue text-sm ">
                              {data?.legal_brief.legislation.map(
                                (value, idx) => (
                                  <p
                                    key={`key-legislations-${idx}`}
                                    className="text-lexblue text-sm "
                                  >
                                    {value}
                                  </p>
                                )
                              )}
                            </div>
                          </section>
                          <section
                            id="12. LEGAL ARGUMENTS"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              12. LEGAL ARGUMENTS
                            </h3>
                            {data?.legal_brief?.legal_arguments && (
                              <Legalarguements
                                data={data?.legal_brief.legal_arguments}
                              />
                            )}
                            {/* <h4 className="text-sm text-powder_blue">
                          Plaintiff's Arguments:
                        </h4>
                        <div className="text-lexblue text-sm ">
                          {data?.legal_brief.legal_arguments.plaintiff.map(
                            (value, idx) => (
                              <p
                                key={`key-legal-arguments-${idx}`}
                                className="text-lexblue text-sm "
                              >
                                {value}
                              </p>
                            )
                          )}
                        </div>
                        <h4 className="text-sm text-powder_blue mt-5">
                          Defendant's Counterarguments:
                        </h4>
                        <div className="text-lexblue text-sm ">
                          {data?.legal_brief.legal_arguments.defendant.map(
                            (value, idx) => (
                              <p
                                key={`key-legislations-${idx}`}
                                className="text-lexblue text-sm "
                              >
                                {value}
                              </p>
                            )
                          )}
                        </div> */}
                          </section>
                          <section
                            id="13. RISK ANALYSIS"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              13. RISK ANALYSIS
                            </h3>
                            {data?.legal_brief?.risk_analysis && (
                              <Riskanalysis
                                data={data?.legal_brief.risk_analysis}
                              />
                            )}
                            {/* <h4 className="text-[1.1rem] text-powder_blue">
                          Defendant's Counterarguments:
                        </h4> */}
                            {/* <div className="text-lexblue text-sm ">
                          {data?.legal_brief.risk_analysis.plaintiff.map(
                            (value, idx) => (
                              <p
                                key={`key-defendant-risk-${idx}`}
                                className="text-lexblue text-sm "
                              >
                                Plaintiff's Risks:{" "}
                                <span className="">{value}</span>
                              </p>
                            )
                          )}
                        </div> */}
                            {/* <div className="text-lexblue text-sm ">
                          {data?.legal_brief.risk_analysis.defendant.map(
                            (value, idx) => (
                              <p
                                key={`key-defendant-risk-${idx}`}
                                className="text-lexblue text-sm "
                              >
                                Defendant's Risks:{" "}
                                <span className="">{value}</span>
                              </p>
                            )
                          )}
                        </div> */}
                          </section>
                          <section
                            id="14. READING LIST"
                            className="pb-5  border-b-[1px] border-gray-300"
                          >
                            <h3 className="my-[16px] text-[1.1rem] font-semibold text-powder_blue font-gilda_Display">
                              14. READING LIST
                            </h3>
                            <div className="text-lexblue text-sm ">
                              {data?.legal_brief?.reading_list.map(
                                (value, idx) => (
                                  <p
                                    key={`key-reading-list-${idx}`}
                                    className="text-lexblue text-sm "
                                  >
                                    <span className="">{idx + 1}.</span> {value}
                                    {/* Defendant's Risks: <span className="">{value}</span> */}
                                  </p>
                                )
                              )}
                            </div>
                          </section>
                          {/* <Markdown
                        content={data?.markdown_brief}
                        className="wrapper text-wrap overflow-x-hidden text-sm text-lexblue font-poppins"
                      /> */}
                        </div>
                      )}
                    </div>
                    <div className="pt-[50px]">
                      {[
                        ["share-knowledge-stroke-rounded.svg", "Share"],
                        ["file-download-stroke-rounded.svg", "Download"],
                      ].map(([icon, name]) => (
                        <button
                          key={name as string}
                          type="button"
                          className=" focus:outline-none outline-none outline-transparent transition duration-300 ease-out font-sans  select-none  relative group/button  justify-center text-center items-center rounded-full cursor-pointer active:scale-[0.97] active:duration-150  origin-center whitespace-nowrap inline-flex text-sm h-8 pl-2.5 pr-3"
                        >
                          {name === "Download" ? (
                            <a
                              href={
                                name === "Download"
                                  ? `https://webapp.lexanalytics.ai/api/ask/pdf?question=${encodeURIComponent(
                                      query ?? ""
                                    )}`
                                  : "#Llmanswer"
                              }
                              download
                              className="flex items-center min-w-0 font-medium gap-1.5 justify-center"
                            >
                              <div className="relative w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                                <Image
                                  width={16}
                                  height={16}
                                  src={`/images/icons/${icon}`}
                                  alt={name}
                                />
                              </div>
                              <div className="text-align-center relative truncate leading-loose -mb-px text-powder_blue">
                                {name}
                              </div>
                            </a>
                          ) : (
                            <div
                              // href={
                              //   name === "Download"
                              //     ? `https://webapp.lexanalytics.ai/api/ask/pdf?question=${encodeURIComponent(
                              //         query ?? ""
                              //       )}`
                              //     : "#Llmanswer"
                              // }
                              // download
                              className="flex items-center min-w-0 font-medium gap-1.5 justify-center"
                            >
                              <div className="relative w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                                <Image
                                  width={16}
                                  height={16}
                                  src={`/images/icons/${icon}`}
                                  alt={name}
                                />
                              </div>
                              <div className="text-align-center relative truncate leading-loose -mb-px text-powder_blue">
                                {name}
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Fragment>
      )}
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      {/* <Head title={"Case Crafter"} /> */}
      <AppLayout>{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
