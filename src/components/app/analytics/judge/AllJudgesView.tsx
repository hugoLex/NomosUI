import React, {
  Fragment,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { GiSplash } from "react-icons/gi";
import { useGetAllJudgeQuery } from "@app/store/services/analyticsSlice";
import {
  ErrorView404,
  LoadingSpinner,
  LoadMoreBtn,
  Container,
  Navbar,
  NavbarTitle,
} from "@app/components/shared";
import { AllJudgesListResponseT } from "@app/types/analytics";

import { HiMiniPlus } from "react-icons/hi2";
import { AppLayoutContext } from "@app/components/layout";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
import { SearchBoxRef } from "@app/components/shared/SearchBoxLegalAnalysis";
import { JudgeIndexSearchBox } from "./searchbox";
import useDebounce from "@app/hooks/useDebounce";
import { useSearchParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import useQueryToggler from "@app/hooks/useQueryHandler";
import { DashboardSkeletonLoader } from "@app/components/shared/DashboardSkeletonLoader";
type JudgeFilterState = {
  query?: string;
  case_title?: string;
  law_firm?: string;
  specialization?: string;
  page?: number;
  limit?: number;
};
const AllJudgesView = () => {
  const ref = useRef<SearchBoxRef | null>(null);
  const { UpdateUrlParams, searchParams, removeQueryParam } = useQueryToggler();
  // console.log("state of ref", ref);
  const router = useRouter();
  const newQuery = useSearchParams().get("query");
  const { setReferrer } = useContext(AppLayoutContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState<string | null>(null);
  const [allData, setAllData] = useState<[] | AllJudgesListResponseT["judges"]>(
    []
  ); // Store accumulated data
  const searchTerm = useDebounce(inputText, 500); // Reduced debounce time for better UX

  const [filters, setFilters] = useState<JudgeFilterState>({
    query: "",
    case_title: "",
    law_firm: "",
    specialization: "",
    page: 1,
    limit: 10,
  });
  const { isError, isFetching, isLoading, data } = useGetAllJudgeQuery(
    searchTerm
      ? {
          params: `query=${searchTerm}`,
        }
      : {
          params: `query=${""}`,
        }
    // : skipToken
  );
  // console.log("Data from judges", JSON.stringify(data && data.judges[0]));
  // Update the accumulated data when new data is fetched
  useEffect(() => {
    setReferrer(router.asPath);
    if (data) {
      setAllData((prev) => [...data.judges]); // Append new data
      // setAllData((prev) => Array.from(new Set([...prev, ...data.judges]))); // Append new data
    }
  }, [data, router.asPath, setReferrer]);
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number
  };
  useEffect(() => {
    setInputText(newQuery);
    // if (!newQuery) {
    //   UpdateUrlParams("query", "a");
    //   // setInputText("");
    // }
  }, [newQuery]);

  function extractAndWrapWords(text: string): React.JSX.Element[] {
    // Extract the marked content (the "quote" to highlight)
    const markMatch = text.match(/<mark>(.*?)<\/mark>/);
    if (!markMatch) {
      // No marked content, return all words as blue spans
      const words = text.split(/\s+/).filter((word) => word.trim());
      return words.map((word, index) => (
        <span key={`normal-${index}`} className="text-blue-500">
          {word}
        </span>
      ));
    }

    const markedContent = markMatch[1];

    // Split the text by the marked content
    const parts = text.split(`<mark>${markedContent}</mark>`);

    const result: React.JSX.Element[] = [];

    // Process first part (before marked content)
    if (parts[0]) {
      const beforeWords = parts[0].split(/\s+/).filter((word) => word.trim());
      beforeWords.forEach((word, index) => {
        result.push(
          <span
            key={`before-${index}`}
            className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
          >
            {" "}
            {word}
          </span>
        );
      });
    }

    // Process marked content (highlighted part)
    const markedWords = markedContent
      .split(/\s+/)
      .filter((word) => word.trim());
    markedWords.forEach((word, index) => {
      result.push(
        <span
          key={`marked-${index}`}
          className="text-[1.1rem] text-lexblue bg-[#FFECBC] font-semibold  font-gilda_Display"
        >
          {" "}
          {word}
        </span>
      );
    });

    // Process remaining content (after marked content)
    if (parts[1]) {
      const afterWords = parts[1].split(/\s+/).filter((word) => word.trim());
      afterWords.forEach((word, index) => {
        result.push(
          <span
            key={`after-${index}`}
            className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
          >
            {" "}
            {word}
          </span>
        );
      });
    }

    return result;
  }

  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Navbar />
        {/* Removed isH1Visible as it's always false*/}
        <div className=" flex-1 flex flex-col justify-center items-center py-6 w-full md:max-w-[772px] mx-auto">
          <DashboardSkeletonLoader />
          {/* <Loader variant="classic" size={80} /> */}
        </div>
      </Fragment>
    );
  }

  if (!data && isError) {
    // Simplified error check
    return (
      <Fragment>
        <Navbar />
        <ErrorView404
          caption="No matching legal resources found"
          desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />
      {allData && (
        <Container className="">
          <div className="flex  py-4 w-full md:max-w-[772px] mx-auto">
            {/* <div className="flex  py-4 w-full md:min-w-[980px]"> */}
            <div className="flex-1 self-stretch grow">
              <div className="my-8">
                <h1 className="text-xx text-lexblue font-gilda_Display  font-bold my-2">
                  Judge index
                </h1>
                <h5 className="text-base text-[#9ea7b4] ">All justices</h5>
                <JudgeIndexSearchBox
                  practitionerType={"judge"}
                  innerRef={ref}
                />
                <div className="mt-8 grid max-lg:grid-rows-2 lg:grid-cols-2 lg:justify-center gap-5">
                  <div className="flex gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] ">
                    {/* <svg
                      width="16"
                      height="11"
                      viewBox="0 0 16 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.1299 2.23906H8.04152V3.81406H15.1299V2.23906ZM15.1299 5.38906H8.04152V6.96406H15.1299V5.38906ZM8.04152 0.664062H0.953125V2.23906H8.04152V0.664062ZM8.04152 3.81406H0.953125V5.38906H8.04152V3.81406ZM8.04152 6.96406H0.953125V8.53906H8.04152V6.96406ZM15.1299 8.53906H8.04152V10.1141H15.1299V8.53906Z"
                        fill="black"
                      />
                    </svg> */}

                    <div className="relative  w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                      <Image
                        width={16}
                        height={16}
                        src={`/images/icons/${"filter-vertical-stroke-rounded.svg"}`}
                        alt={"analytics-02-stroke-rounded"}
                      />
                    </div>
                    <span>Filter</span>
                    {/* <HiMiniPlus className="ml-auto" /> */}
                  </div>
                  <div
                    onClick={() => {
                      // setInputText("a");
                      removeQueryParam("query");
                      // UpdateUrlParams("query", "a");
                    }}
                    className="cursor-pointer flex gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] "
                  >
                    <div className="relative  w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                      <Image
                        width={16}
                        height={16}
                        src={`/images/icons/${"circle-arrow-reload-02-stroke-rounded.svg"}`}
                        alt={"analytics-02-stroke-rounded"}
                      />
                    </div>
                    {/* <GiSplash /> */}
                    <span>Reset</span>
                    {/* <HiMiniPlus className="ml-auto" /> */}
                  </div>
                </div>
              </div>

              <div className=" mb-8 space-y-4">
                {allData?.map((judge, idx) => (
                  <div
                    key={`judge-id${judge.judge_id}-${idx}`}
                    className="flex gap-3 min-w-full"
                  >
                    <span className="text-gray-500 mt-3 ">{idx + 1}.</span>
                    <div className="border-b border-solid border-gray-200 space-y-3 pb-3 w-full">
                      <div className="flex items-center gap-[8px]">
                        <div className="relative rounded-full overflow-clip w-[40px] h-[40px] ">
                          <Image
                            className=""
                            style={{ objectFit: "cover" }}
                            fill
                            src={`/images/${"judge_analytics_av.jpg"}`}
                            loading="lazy"
                            alt="judge counsel profile"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/analytics/judges?judgeId=${judge.judge_id}&judge=${judge.original_name}`}
                            className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
                          >
                            {newQuery != "a" &&
                            judge?.match_context?.field == "name"
                              ? extractAndWrapWords(
                                  judge?.match_context?.highlight
                                )
                              : judge?.original_name}
                            {/* {judge.original_name} */}
                          </Link>
                          <h3 className="text-xs font-normal text-lex-blue">
                            {judge.court}
                          </h3>
                          <h3 className="text-sm text-lex-blue font-normal">
                            Cases count: {judge?.matching_case_count}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-lexblue font-poppins">
                        {judge.profile ?? "Profile not yet available."}
                      </p>
                    </div>
                  </div>
                ))}
                <LoadMoreBtn
                  className="min-w-[109.67px] mx-auto"
                  isFetching={isFetching}
                  loadMore={loadMore}
                />
              </div>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default AllJudgesView;
