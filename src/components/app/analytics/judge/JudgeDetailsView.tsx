import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { skipToken } from "@reduxjs/toolkit/query";
import { useVisibility, useQueryHandler } from "@app/hooks";
import { Loader, Head } from "@app/components/ui";
import {
  ActionButtons,
  Container,
  LoadMoreBtn,
  Navbar,
  NavbarTitle,
  SummaryComponent,
} from "@app/components/shared/";
import { AppLayoutContext } from "@app/components/layout";
import { useGetJudgeAnalyticsQuery } from "@app/store/services/analyticsSlice";
import JudgeCounselHeadings from "../JudgeCounselHeadings";
import { JudgeProfileResponseT } from "@app/types/analytics";
import JudicialMetricsDashboard from "./Judgestats";
import LegalDomainDashboard from "./DomainExpertise";
import { TrendingUp } from "lucide-react";

type stanceT = "Concurred" | "Dissented";

const JudgeDetailsView = () => {
  const { referrer } = useContext(AppLayoutContext);
  const { searchParams, close, removeQueryParam, UpdateUrlParams } =
    useQueryHandler();
  const judgeId = searchParams.get("judgeId");
  const profile = searchParams.get("profile");
  const judgeName = searchParams.get("judge");
  const right_cover_menu = searchParams.get("judicial_stats");
  const right_cover_menu_for_legal_domain = searchParams.get("legal_domain");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen] = useState(new Set([0]));
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
  // console.log("Data from judges", data);
  // console.log(
  //   "Data from judges metrics",
  //   JSON.stringify(data && data.judicial_metrics)
  // );
  // console.log(
  //   "Data from judges statistics",
  //   JSON.stringify(data?.judge_info?.statistics)
  // );
  // console.log(
  //   "Data from judges",
  //   JSON.stringify({
  //     domain_expertise: {
  //       domain_groups: {
  //         area_of_law: data?.domain_expertise.domain_groups.area_of_law?.slice(
  //           0,
  //           10
  //         ),
  //         legal_principles:
  //           data?.domain_expertise.domain_groups.legal_principles?.slice(0, 10),
  //         subject_matter:
  //           data?.domain_expertise.domain_groups.subject_matter?.slice(0, 10),
  //       },
  //     },
  //   })
  // );

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
  const judgeStance: { [key: string]: string } = {
    dissented: "bg-[#D71E30]/70 ",
    Concurred: "bg-[#2fa826]/70",
    LEAD_OPINION: "bg-[#0e3165]/70",
  };
  const profileName = judgeName || data?.judge_info.name;

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number
  };

  return (
    <>
      <Head title={`Judge - ${profileName}`} />

      <Navbar referrer={referrer}>
        <div className="flex justify-between py-2.5">
          <NavbarTitle
            isTitle={!isH1Visible}
            title={profileName ?? "Justice"}
          />
          <ActionButtons />
        </div>
      </Navbar>

      {(isFetching || isLoading) && (
        <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-screen">
          <Loader variant="classic" size={80} />
        </div>
      )}

      {!isFetching && !isError && data?.judge_info && (
        <Container>
          {right_cover_menu && (
            <div
              onClick={() => removeQueryParam("judicial_stats")}
              className={` bg-red- 500 max-md:h idden backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl shadow-lg fixed top-[0px] [20px] right-[25px] h-[100%] [90%] z-[99999] w-[99%]
                                `}
            >
              <div className="bg-white border-l border-gray-400/15 ml-auto  min-w-[500px] w-[63vw] h-screen shadow-overlay top-0 right-[-30px] fixed  animate-in slide-in-from-right ">
                <div className="min-h-[64px] justify-between flex items-center p-3.5 bg-purple- 500 border-b border-b-black\50  ">
                  <span
                    className={` text-lexblue text-xx font-gilda_Display capitalize font-bold`}
                  >
                    Judicial Statistics
                  </span>

                  <svg
                    onClick={() => removeQueryParam("judicial_stats")}
                    className="ml-auto cursor-pointer"
                    width="16"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="4"
                      y1="4"
                      x2="20"
                      y2="20"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <line
                      x1="20"
                      y1="4"
                      x2="4"
                      y2="20"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <JudicialMetricsDashboard
                  judicialMetrics={data?.judicial_metrics}
                  statistics={data?.judge_info?.statistics}
                />
              </div>
            </div>
          )}
          {right_cover_menu_for_legal_domain && (
            <div
              onClick={() => removeQueryParam("legal_domain")}
              className={` bg-red- 500 max-md:h idden backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl shadow-lg fixed top-[0px] [20px] right-[25px] h-[100%] [90%] z-[99999] w-[99%]
                                `}
            >
              <div className="bg-white border-l border-gray-400/15 ml-auto  min-w-[500px] w-[63vw] h-screen shadow-overlay top-0 right-[-30px] fixed  animate-in slide-in-from-right ">
                <div className="min-h-[64px] justify-between flex items-center p-3.5 pl-[32px] bg-purple- 500 border-b border-b-black\50  ">
                  <span
                    className={` text-lexblue text-xx font-gilda_Display capitalize font-bold`}
                  >
                    Legal domains
                  </span>

                  <svg
                    onClick={() => removeQueryParam("judicial_stats")}
                    className="ml-auto cursor-pointer"
                    width="16"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="4"
                      y1="4"
                      x2="20"
                      y2="20"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <line
                      x1="20"
                      y1="4"
                      x2="4"
                      y2="20"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <LegalDomainDashboard />
              </div>
            </div>
          )}
          <div className="py-6">
            <div className="lg:flex gap-[2rem]  relative">
              <div className="basis-[30.7%]">
                <Link href={"/analytics/judges"}>
                  <JudgeCounselHeadings
                    h1HeaderRef={h1Ref}
                    heading1=""
                    heading2="Judge analytics"
                    style={{
                      ctnStyle: "",
                      h1Style: "uppercase hidden",
                      h2Style: "text-[30px]",
                    }}
                  />{" "}
                </Link>
                <div className="font-paytone mt-[50px] bg-[#F6F7F7] py-[32px] px-[20px] shadow-sm">
                  <div className="relative rounded-full overflow-clip w-[130px] h-[130px] mx-auto">
                    <Image
                      className=""
                      style={{ objectFit: "cover" }}
                      fill
                      src={`/images/${"judge_analytics_av.jpg"}`}
                      alt="judge counsel profile"
                    />
                  </div>
                  <h3 className="text-[1.4rem] text-center font-paytone leading-none font-medium text-primary mt-[24px]">
                    {data.judge_info.name}
                  </h3>
                  <span className="text-[.8125rem] font-normal text-center text-[#6C757D] block mt-[5px] mb-[24px]">
                    JSC
                  </span>

                  <div className="flex gap-3 items-center justify-center mt-[20px] divide-x-2 border-t border-b border-gray-200 p-[16.4px]">
                    <div className="basis-1/2 text-lexblue">
                      <h6 className="block text-center ">Lead</h6>
                      <h6 className="text-center text-[.875rem]">
                        {data.judge_info.statistics.total_lead_judgments}
                      </h6>
                    </div>
                    <div className="basis-1/2 text-[#2fa826] pl-3">
                      <h6 className="block text-center ">Concurred</h6>
                      <h6 className="text-center text-[.875rem]">
                        {data.judge_info.statistics.total_concurred}
                      </h6>
                    </div>
                    <div className="pl- [30px] basis-1/2 text-[#D71E30] pl-3">
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
                    View Profile
                  </h2>
                </div>
              </div>
              <div className="basis-[66%] mt-[80px]">
                {profile && (
                  <div className="relative  bg-[#F6F7F7] p-[16px] rounded-[6px] mb-[30px]">
                    <IoClose
                      onClick={() => close("profile", "")}
                      className="absolute text-red-600 top-[16px] right-[16px] cursor-pointer"
                      size={25}
                    />
                    <h3 className="font-medium text-base">Profile</h3>
                    <hr className="my-[15px]" />
                    <p>{data?.judge_info?.profile}</p>
                  </div>
                )}
                <div className="flex gap-5 items-center border-b border-solid border-gray-200 pb-3 mb-3">
                  <div className="flex items-center gap-[5px]">
                    <div className="relative w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                      <Image
                        width={16}
                        height={16}
                        src={`/images/icons/${"analytics-02-stroke-rounded.svg"}`}
                        alt={"analytics-02-stroke-rounded"}
                      />
                    </div>
                    <h3
                      onClick={() => UpdateUrlParams("judicial_stats", "true")}
                      className="text-lexblue text-base font-poppins font-normal cursor-pointer"
                    >
                      Judge statistics
                    </h3>{" "}
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <div className="relative w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                      {/* <Image
                        width={16}
                        height={16}
                        src={`/images/icons/${"analytics-02-stroke-rounded.svg"}`}
                        alt={"analytics-02-stroke-rounded"}
                      /> */}
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <h3
                      onClick={() => UpdateUrlParams("legal_domain", "true")}
                      className="text-lexblue text-base font-poppins font-normal cursor-pointer"
                    >
                      Domain expertise
                    </h3>{" "}
                  </div>
                  {/* <select
                    className="appearance-auto  pr-4 outline-none"
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

                <div className="h-screen overflow-y-scroll pb-[50px]">
                  {data.judge_info?.cases?.map((item, index) => (
                    <div
                      key={item.document_id}
                      className="font-paytone pb-3 space-y-3 "
                    >
                      <h3 className="text-base font-semibold text-primary">
                        <Link
                          href={`/library/cases/${item.document_id}?title=${item.case_title}&tab=case`}
                        >
                          {item.case_title}
                        </Link>
                      </h3>

                      <div className="inline-flex gap-2">
                        <span
                          title="Year"
                          className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium"
                        >
                          {item.court}
                        </span>
                        <span
                          title="Year"
                          className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium"
                        >
                          {item.year}
                        </span>
                        <span
                          title="Judge stance"
                          className={` ${
                            // ""
                            judgeStance[item.judge_stance]
                          } px-2 py-[0.125rem] rounded bg- lexblue text-center text-white text-sm font-medium`}
                        >
                          {item?.judge_stance == "LEAD_OPINION"
                            ? "Lead judgement"
                            : item?.judge_stance}
                        </span>
                        {/* <span
                        title="Year"
                        className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium"
                      >
                        {item.year}
                      </span> */}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        {item.area_of_law &&
                          item.area_of_law.map((subjectMatter) => (
                            <span
                              className={` px-2 py-[0.125rem] text-[#008E00] bg-[#008E00]/10 rounded text-center  text-sm font-normal`}
                              key={subjectMatter}
                              title="Area of law"
                            >
                              {subjectMatter}
                            </span>
                          ))}
                        {item.subject_matters &&
                          item.subject_matters.map((subjectMatter) => (
                            <span
                              className={` px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-normal`}
                              key={subjectMatter}
                              title="Subject matter"
                            >
                              {subjectMatter}
                            </span>
                          ))}
                      </div>

                      {/* <p className="text-sm text-justify">
                      {item?.holding_and_reasoning}
                    </p> */}

                      <div
                        className="pb-[30px]"
                        id="summary"
                        // ref={(el) => (sectionRefs.current[0] = el)}
                      >
                        <SummaryComponent
                          toogler={() => {
                            setOpen((prev) => {
                              const newSet = new Set(prev);
                              if (newSet.has(index)) {
                                newSet.delete(index);
                              } else {
                                newSet.add(index);
                              }
                              return newSet;
                            });
                          }}
                          isCollapsed={isOpen.has(index)}
                          header={"Holding and reasoning"}
                          summary={
                            <div
                              style={
                                // open
                                // item?.holding_and_reasoning
                                isOpen.has(index)
                                  ? { maxHeight: "none" }
                                  : {
                                      overflow: "hidden",
                                      display: "-webkit-box",
                                      WebkitBoxOrient: "vertical",
                                      WebkitLineClamp: 5,
                                    }
                              }
                              className={` relative  
                                                ${
                                                  ""
                                                  // open ? null : "line-clamp-6"
                                                }
                                               `}
                            >
                              <h3 className="text-sm text- lexblue font-normal mb-2">
                                {/* <span className="uppercase block font-poppins text-gray-500 text-sm font-medium mb-1">
                                Holding and reasoning:
                              </span> */}

                                {item?.holding_and_reasoning}
                              </h3>

                              {!open && (
                                <div className="w-full absolute bottom-0 h-[52px] bg-[linear-gradient(transparent_0px,rgba(255,255,255,0.9)_52px,#fff_80px)]"></div>
                              )}
                              {/* <button
                                                onClick={() => {
                                                  setopen(!open);
                                                  window?.scrollTo({ top: 0, behavior: "smooth" });
                                                }}
                                                className={`p-2 bg-primary text-white text-sm rounded mt-2 ${
                                                  open ? "bg-gray-300" : "bg-primary"
                                                }`}
                                              >
                                                {open ? "Show less" : "View more"}
                                              </button> */}
                            </div>
                          }
                          isCollapsible={true}
                        />
                      </div>
                    </div>
                  ))}
                  {data.judge_info.cases.length > 9 && (
                    <LoadMoreBtn isFetching={isFetching} loadMore={loadMore} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default JudgeDetailsView;
