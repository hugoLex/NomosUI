import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useGetAllJudgeQuery } from "@app/store/services/benchSlice";
import {
  ErrorView404,
  LoadingSpinner,
  LoadMoreBtn,
} from "@app/components/shared";
import { AllJudgesListResponseT } from "@app/store/services/types";
import BenchHeader from "../BenchHeader";
import Image from "next/image";

const AllJudgesView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<[] | AllJudgesListResponseT["judges"]>(
    []
  ); // Store accumulated data
  const { isError, isFetching, isLoading, data } = useGetAllJudgeQuery({
    page: currentPage,
  });
  // Update the accumulated data when new data is fetched
  useEffect(() => {
    if (data) {
      setAllData((prevData) => [...prevData, ...data.judges]); // Append new data
    }
  }, [data]);
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number
  };
  return (
    <>
      {(isFetching || isLoading) && <LoadingSpinner />}
      {isError && (
        <ErrorView404
          caption="No matching legal resources found"
          desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
        />
      )}
      {!isError && data?.judges && (
        <section className="relative mx-auto max-w-[1400px] py-6 ">
          <div className="px-16 max-md:px-5 max-w-full">
            <BenchHeader />
            {/* <hr /> */}
            <div className="lg:flex gap-[5%] justify-center relative ">
              <div className="basis-[65%]">
                {allData?.map((judge, idx) => (
                  <Fragment key={`judge-id${judge.judge_id}-${idx}`}>
                    <div className="pt-[46px]">
                      <div className="border- b border- solid border-gray- 200 flex items-center gap-[8px]  pb-[5px] mb- [15px]">
                        {/* <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.25 0.25C8.95117 0.25 8.65234 0.309766 8.37813 0.429297L1.01992 3.58281C0.552344 3.7832 0.25 4.24023 0.25 4.75C0.25 5.25977 0.552344 5.7168 1.01992 5.91719L8.37813 9.0707C8.65234 9.19023 8.95117 9.25 9.25 9.25C9.54883 9.25 9.84766 9.19023 10.1219 9.0707L17.4801 5.91719C17.9477 5.7168 18.25 5.25625 18.25 4.75C18.25 4.24375 17.9477 3.7832 17.4801 3.58281L10.1219 0.429297C9.84766 0.309766 9.54883 0.25 9.25 0.25ZM9.04258 1.97969C9.10938 1.95156 9.17969 1.9375 9.25 1.9375C9.32031 1.9375 9.39062 1.95156 9.45742 1.97969L15.9191 4.75L9.45742 7.52031C9.39062 7.54844 9.32031 7.5625 9.25 7.5625C9.17969 7.5625 9.10938 7.54844 9.04258 7.52031L2.58086 4.75L9.04258 1.97969ZM1.01992 8.08281C0.552344 8.2832 0.25 8.74023 0.25 9.25C0.25 9.75977 0.552344 10.2168 1.01992 10.4172L8.37813 13.5707C8.65234 13.6902 8.95117 13.75 9.25 13.75C9.54883 13.75 9.84766 13.6902 10.1219 13.5707L17.4801 10.4172C17.9477 10.2168 18.25 9.75625 18.25 9.25C18.25 8.74375 17.9477 8.2832 17.4801 8.08281L16.3832 7.61172L14.2422 8.5293L15.9191 9.25L9.45742 12.0203C9.39062 12.0484 9.32031 12.0625 9.25 12.0625C9.17969 12.0625 9.10938 12.0484 9.04258 12.0203L2.58086 9.25L4.25781 8.5293L2.1168 7.61172L1.01992 8.08281ZM1.01992 12.5828C0.552344 12.7832 0.25 13.2402 0.25 13.75C0.25 14.2598 0.552344 14.7168 1.01992 14.9172L8.37813 18.0707C8.65234 18.1902 8.95117 18.25 9.25 18.25C9.54883 18.25 9.84766 18.1902 10.1219 18.0707L17.4801 14.9172C17.9477 14.7168 18.25 14.2563 18.25 13.75C18.25 13.2437 17.9477 12.7832 17.4801 12.5828L16.3832 12.1117L14.2422 13.0293L15.9191 13.75L9.45742 16.5203C9.39062 16.5484 9.32031 16.5625 9.25 16.5625C9.17969 16.5625 9.10938 16.5484 9.04258 16.5203L2.58086 13.75L4.25781 13.0293L2.1168 12.1117L1.01992 12.5828Z"
                            fill="#13343B"
                          />
                        </svg> */}
                        <div className="relative rounded-full overflow-clip w-[40px] h-[40px] ">
                          <Image
                            className=""
                            style={{ objectFit: "cover" }}
                            fill
                            // width={50}
                            // height={50}
                            src={
                              "https://images.pexels.com/photos/8090145/pexels-photo-8090145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            }
                            loading="lazy"
                            // src={`/images/${"judge_analytics_av.jpg"}`}
                            alt="judge counsel profile"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/bench/judges?judgeId=${judge.judge_id}&judge=${judge.name}`}
                            className="text-base [1.125rem] font-normal leading- [28px] font-poppins"
                          >
                            {judge.name}
                          </Link>
                          <h3 className="text-base font-poppins font-normal text-lex-blue">
                            {judge.court}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* <h3 className="text-base font-poppins font-normal text-lex-blue">
                        {judge.court}
                      </h3> */}
                      {/* <h3 className=" flex items-center gap-[5px] mt-[2px] text-[.75rem] font-medium">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.51562 5.5C9.51562 6.63131 9.06621 7.71629 8.26625 8.51625C7.46629 9.31621 6.38131 9.76562 5.25 9.76562C4.11869 9.76562 3.03371 9.31621 2.23375 8.51625C1.43379 7.71629 0.984375 6.63131 0.984375 5.5C0.984375 4.36869 1.43379 3.28371 2.23375 2.48375C3.03371 1.68379 4.11869 1.23438 5.25 1.23438C6.38131 1.23438 7.46629 1.68379 8.26625 2.48375C9.06621 3.28371 9.51562 4.36869 9.51562 5.5ZM0 5.5C0 6.89239 0.553123 8.22775 1.53769 9.21231C2.52226 10.1969 3.85761 10.75 5.25 10.75C6.64239 10.75 7.97775 10.1969 8.96231 9.21231C9.94688 8.22775 10.5 6.89239 10.5 5.5C10.5 4.10761 9.94688 2.77226 8.96231 1.78769C7.97775 0.803123 6.64239 0.25 5.25 0.25C3.85761 0.25 2.52226 0.803123 1.53769 1.78769C0.553123 2.77226 0 4.10761 0 5.5ZM4.75781 2.71094V5.5C4.75781 5.66406 4.83984 5.81787 4.97725 5.91016L6.946 7.22266C7.17158 7.37441 7.47715 7.31289 7.62891 7.08525C7.78066 6.85762 7.71914 6.5541 7.4915 6.40234L5.74219 5.2375V2.71094C5.74219 2.43818 5.52275 2.21875 5.25 2.21875C4.97725 2.21875 4.75781 2.43818 4.75781 2.71094Z"
                            fill="#64645F"
                          />
                        </svg>
                        8 days ago
                      </h3> */}
                      <p className="text-sm text-[#4C4D50] [#64645F]">
                        {judge.profile ?? "Profile not yet available."}
                      </p>
                    </div>
                  </Fragment>
                ))}
                <LoadMoreBtn isFetching={isFetching} loadMore={loadMore} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AllJudgesView;
