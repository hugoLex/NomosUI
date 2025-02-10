import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { GiSplash } from "react-icons/gi";
import { useGetAllJudgeQuery } from "@app/store/services/benchSlice";
import {
  ErrorView404,
  LoadingSpinner,
  LoadMoreBtn,
  Container,
  Navbar,
} from "@app/components/shared";
import { AllJudgesListResponseT } from "@app/store/services/types";

import { HiMiniPlus } from "react-icons/hi2";
import { AppLayoutContext } from "@app/components/layout";
import router, { useRouter } from "next/router";

const AllJudgesView = () => {
  const router = useRouter();
  const { setReferrer } = useContext(AppLayoutContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<[] | AllJudgesListResponseT["judges"]>(
    []
  ); // Store accumulated data
  const { isError, isFetching, isLoading, data } = useGetAllJudgeQuery({
    page: currentPage,
  });

  // Update the accumulated data when new data is fetched
  useEffect(() => {
    setReferrer(router.asPath);
    if (data) {
      setAllData((prev) => Array.from(new Set([...prev, ...data.judges]))); // Append new data
    }
  }, [data, router.asPath, setReferrer]);
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number
  };

  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Navbar query={""} isTitle />
        {/* Removed isH1Visible as it's always false*/}
        <div className="flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-screen">
          <LoadingSpinner variant="big" />
        </div>
      </Fragment>
    );
  }

  if (!data && isError) {
    // Simplified error check
    return (
      <Fragment>
        <Navbar query={""} isTitle />
        <ErrorView404
          caption="No matching legal resources found"
          desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar query={""} isTitle />

      {allData && (
        <Container className="">
          <div className="flex  py-4 w-full md:min-w-[980px]">
            <div className="flex-1 self-stretch grow">
              <div className="my-8">
                <h1 className="text-xx font-normal my-2">Judges</h1>
                <h5 className="text-base text-[#9ea7b4] ">All justices</h5>
                <div className="mt-8 grid max-lg:grid-rows-2 lg:grid-cols-2 lg:justify-center gap-5">
                  <div className="flex gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] ">
                    <svg
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
                    </svg>

                    <span>Thread</span>
                    <HiMiniPlus className="ml-auto" />
                  </div>
                  <div className="flex gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] ">
                    <GiSplash />
                    <span>Page</span>
                    <HiMiniPlus className="ml-auto" />
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
                            href={`/analytics/judge?judgeId=${judge.judge_id}&judge=${judge.name}`}
                            className="text-base [1.125rem] font-normal leading- [28px] font-poppins"
                          >
                            {judge.name}
                          </Link>
                          <h3 className="text-xs font-normal text-lex-blue">
                            {judge.court}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-[#4C4D50]">
                        {judge.profile ?? "Profile not yet available."}
                      </p>
                    </div>
                  </div>
                ))}
                <LoadMoreBtn isFetching={isFetching} loadMore={loadMore} />
              </div>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default AllJudgesView;
