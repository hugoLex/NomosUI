import React, { useEffect, useRef, useState } from "react";
import JudgeCounselGraphLayout from "../JudgeCounselGraphLayout";
import Graphmodal from "../../generalSharedComponents/Graphmodal";
import JudgeCounselProfile from "../profile";
import JudgesFeaturing_CounselAppearances from "../JudgesFeaturing_CounselAppearances";
import JudgeCounselHeadings from "../JudgeCounselHeadings";
import { useGetJudgeAnalyticsQuery } from "@app/store/services/judgeAndCounselAnalytics";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import { useVisibility } from "@app/hooks";
import { SearchHeader } from "../../search";
// import JudgeCaseFeaturing from "./JudgeCaseFeaturing";
import BigLoadingSpinner from "../../generalSharedComponents/BigLoadingSpinner";
import { skipToken } from "@reduxjs/toolkit/query";
import Image from "next/image";
// import Link from "next/link";
import SmallTextBtn from "../../generalSharedComponents/SmallBtn";
import { IoClose } from "react-icons/io5";
import {
  JudgeInfoResponseT,
  JudgeProfileResponseT,
} from "@app/store/services/types";
import TextBox from "../../generalSharedComponents/TextBox";
import { LoadMoreBtn } from "../../generalSharedComponents/LoadMoreBtn";

type stanceT = "Concurred" | "Dissented";
const JudgeDetailsView = () => {
  const { searchParams, close } = UseQueryToggler();
  const judgeId = searchParams.get("judgeId");
  const profile = searchParams.get("profile");

  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<
    [] | JudgeProfileResponseT["judge_info"][]
  >([]); // Store accumulated data

  const { isError, isFetching, isLoading, data } = useGetJudgeAnalyticsQuery(
    judgeId
      ? {
          judge_id: Number(judgeId),
          page: currentPage,
        }
      : skipToken
    //     // judge_id: parseInt(judgeId as unknown as string),
  );
  // Update the accumulated data when new data is fetched
  useEffect(() => {
    if (data) {
      setAllData((prevData) => [...prevData, data.judge_info]); // Append new data
    }
  }, [data]);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const isH1Visible = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });
  const searchRef = useRef<HTMLTextAreaElement | null>(null);

  const judgeName = searchParams.get("judge");
  const profileName = judgeName || data?.judge_info.name;
  const judgecounselgraph = searchParams.get("judgecounselgraph");
  // console.log("This is from judge components", isError, isLoading, data);
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number
  };

  return (
    <>
      <SearchHeader
        // uncomment the query out and use when the end point is ready
        // query={query}
        query={profileName ?? "Justice"}
        isH1Visible={isH1Visible}
        searchBtnRef={searchRef}
      />
      {(isFetching || isLoading) && <BigLoadingSpinner />}

      {/* {isError && (
          <ErrorView404
            caption="No matching legal resources found"
            desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
          />
        )} */}
      {!isFetching && !isError && data?.judge_info && (
        <section className="relative mx-auto w-full max-w-[1400px] py-6 ">
          <div className="px-16 max-md:px-5 max-w-full">
            <div className="">
              <section className="lg:flex gap-[2rem]  relative">
                {/* <section className="lg:flex gap-[5%] px-16 max-md:px-5 max-w-full"> */}
                <div className="basis-[30.7%]">
                  {/* <div className="basis-[22.7%]"> */}
                  <JudgeCounselHeadings
                    h1HeaderRef={h1Ref}
                    heading1=""
                    // heading1="Bench Intelligence"
                    heading2="Judge analytics"
                    style={{
                      ctnStyle: "",
                      h1Style: "uppercase hidden",
                      h2Style: "text-[30px]",
                    }}
                  />
                  <div className="font-paytone mt-[50px] bg-[#F6F7F7] py-[32px] px-[20px] shadow-sm">
                    <div className="relative rounded-full overflow-clip w-[130px] h-[130px] mx-auto">
                      <Image
                        className=""
                        style={{ objectFit: "cover" }}
                        fill
                        // width={50}
                        // height={50}
                        src={`/images/${"judge_analytics_av.jpg"}`}
                        alt="judge counsel profile"
                      />
                    </div>
                    <h3 className="text-[1.4rem] text-center font-paytone leading-none font-medium text-primary mt-[24px]">
                      {/* <h3 className="text-[1.875rem] font-medium text-primary my-5"> */}
                      {data.judge_info.name}
                    </h3>
                    <span className="text-[.8125rem] font-normal text-center text-[#6C757D] block mt-[5px] mb-[24px]">
                      JSC
                    </span>

                    <div className="flex gap -5 items-center justify-center mt-[20px] divide-x-2 border-t border-b border-gray-200 p-[16.4px]">
                      <div className="basis-1/2 text-[#2fa826]">
                        <h6 className="block text-center ">Concurred</h6>
                        <h6 className="text-center text-[.875rem]">
                          {data.judge_info.statistics.total_concurred}
                        </h6>
                      </div>
                      <div className="pl- [30px] basis-1/2 text-[#D71E30]">
                        <h6 className="block text-center">Dissented</h6>
                        <h6 className="text-center text-[.875rem] ">
                          {data.judge_info.statistics.total_dissented}
                        </h6>
                      </div>
                    </div>
                    <h2
                      onClick={() => close("profile", "true")}
                      // href={`/${""}`}
                      className="text-[.875rem] cursor-pointer text-primary font-bold flex justify-center mt-[32px] items-center gap-[5px]"
                    >
                      {/* <svg
                        className=""
                        width="17"
                        height="14"
                        viewBox="0 0 17 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.2057 0.679688H1.8724C1.13628 0.679688 0.539062 1.27691 0.539062 2.01302V2.45747H16.5391V2.01302C16.5391 1.27691 15.9418 0.679688 15.2057 0.679688ZM0.539062 11.7908C0.539062 12.5269 1.13628 13.1241 1.8724 13.1241H15.2057C15.9418 13.1241 16.5391 12.5269 16.5391 11.7908V3.34635H0.539062V11.7908ZM10.3168 5.34635C10.3168 5.22413 10.4168 5.12413 10.5391 5.12413H14.5391C14.6613 5.12413 14.7613 5.22413 14.7613 5.34635V5.7908C14.7613 5.91302 14.6613 6.01302 14.5391 6.01302H10.5391C10.4168 6.01302 10.3168 5.91302 10.3168 5.7908V5.34635ZM10.3168 7.12413C10.3168 7.00191 10.4168 6.90191 10.5391 6.90191H14.5391C14.6613 6.90191 14.7613 7.00191 14.7613 7.12413V7.56858C14.7613 7.6908 14.6613 7.7908 14.5391 7.7908H10.5391C10.4168 7.7908 10.3168 7.6908 10.3168 7.56858V7.12413ZM10.3168 8.90191C10.3168 8.77969 10.4168 8.67969 10.5391 8.67969H14.5391C14.6613 8.67969 14.7613 8.77969 14.7613 8.90191V9.34635C14.7613 9.46858 14.6613 9.56858 14.5391 9.56858H10.5391C10.4168 9.56858 10.3168 9.46858 10.3168 9.34635V8.90191ZM5.42795 5.12413C6.40851 5.12413 7.20573 5.92135 7.20573 6.90191C7.20573 7.88247 6.40851 8.67969 5.42795 8.67969C4.4474 8.67969 3.65017 7.88247 3.65017 6.90191C3.65017 5.92135 4.4474 5.12413 5.42795 5.12413ZM2.40295 10.7964C2.63628 10.0825 3.30573 9.56858 4.09462 9.56858H4.3224C4.66406 9.71024 5.03628 9.7908 5.42795 9.7908C5.81962 9.7908 6.19462 9.71024 6.53351 9.56858H6.76128C7.55017 9.56858 8.21962 10.0825 8.45295 10.7964C8.54184 11.0714 8.30851 11.3464 8.01962 11.3464H2.83628C2.5474 11.3464 2.31406 11.0686 2.40295 10.7964Z"
                          fill="#212121"
                        />
                      </svg> */}
                      View Profile
                    </h2>
                  </div>

                  {/* <JudgeCounselProfile
                    profilePicture="/images/judge-counsel-img-holder.jpg"
                    profileName={data.judge_info.name}
                  >
                    <>
                      <h3 className="text-slate-gray text-[.875rem]">ABOUT</h3>
                      <p className="font-">{data.judge_info.profile}</p>
                    </>
                  </JudgeCounselProfile> */}
                  {/* <JudgesFeaturing_CounselAppearances>
                    Cases featuring
                    <span className="text-lex-blue"> {profileName}</span>
                  </JudgesFeaturing_CounselAppearances> */}

                  {/* replace with payload   */}
                  {/* {data.judge_info.case_appearances.cases.map(
                    (appearance, index) => {
                      return (
                        <JudgeCaseFeaturing
                          key={appearance.suit_number}
                          caseTitle={
                            appearance.case_title ?? "Nkemdillim v. Madukolu"
                          }
                          caseDetails={[
                            appearance.court ?? "Court of appeal",

                            appearance.year
                              ? `${appearance.year}`
                              : "20th May 2024",
                            appearance.suit_number.toString() ??
                              "SC/K/229/S/23",
                          ]}
                          treatment={
                            (appearance.stance as stanceT) ?? "Concurred"
                          }
                          reason={text}
                        />
                      );
                    }
                  )} */}
                </div>
                <div className="basis-[66%] mt-[80px]">
                  {/*please remove the margin top  */}
                  {profile && (
                    <div className="relative  bg-[#F6F7F7] p-[16px] rounded-[6px] mb-[30px]">
                      <IoClose
                        onClick={() => close("profile", "")}
                        className="absolute text-red-600 top-[16px] right-[16px] cursor-pointer"
                        size={25}
                      />
                      <h3 className="font-medium text-base">Profile</h3>
                      <hr className="my-[15px]" />
                      <p>{data.judge_info.profile}</p>
                    </div>
                  )}
                  <div className="flex items-center border-b border-solid border-gray-200 pb-3 mb-3">
                    <select
                      className="appearance-auto  pr-4 outline-none"
                      name="sortBy"
                      id="hiee"
                    >
                      <option value={"Most recent"}>Most recent</option>
                      <option value={"Most popular"}>Most popular</option>
                    </select>
                    {/* <select
                      className=" appearance-auto  px-4 outline-none"
                      name="sortBy"
                      id="hiee"
                    >
                      <option value={"Most recent"}>Most recent</option>
                      <option value={"Most popular"}>Most popular</option>
                    </select> */}
                    <span className="ml-auto text-[#008E00] bg-[#008E00]/10 text-xs px-3 py-1 rounded">
                      {`${
                        data.judge_info.statistics.total_cases > 1
                          ? `${data.judge_info.statistics.total_cases} Cases`
                          : `${data.judge_info.statistics.total_cases} Case`
                      } `}
                    </span>
                  </div>

                  {/* <div className="font-paytone border-b border-solid border-gray-200 pb-3">
                    <h3 className="text-[.94rem] font-normal">05 May 2021</h3>
                    <p className="text-[.96rem] font-normal leading-[21px]">
                      A review of bank prudential regulations in Nigeria,
                      including with regard to senior management
                      responsibilities and remuneration, regulatory capital and
                      liquidity, and recovery and resolution.
                    </p>
                    <SmallTextBtn
                      smallBtnData={["Marriage", "constitution", "Election"]}
                      btnStyle="px-2 py-1 text-primary"
                      divStyle="flex gap-3 mt-3"
                    />
                  </div> */}

                  {data.judge_info.cases.map((item, index) => (
                    <div
                      key={item.document_id}
                      className="font-paytone pb-3 mt-[5px]"
                    >
                      <h3 className="text-[.94rem] font-normal">
                        {item.case_title}
                      </h3>
                      <p className="text-sm">{item.case_summary}</p>
                      <TextBox
                        smallBtnData={["Marriage", "constitution", "Election"]}
                        // btnStyle="px-2 py-1 text-primary"
                        divStyle="flex gap-3 mt-3"
                      />
                    </div>
                  ))}
                  <LoadMoreBtn isFetching={isFetching} loadMore={loadMore} />
                </div>
                {/* <JudgeCounselGraphLayout /> */}
                {/* {judgecounselgraph && <Graphmodal />} */}
              </section>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default JudgeDetailsView;
