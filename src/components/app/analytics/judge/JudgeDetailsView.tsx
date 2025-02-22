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
} from "@app/components/shared/";
import { AppLayoutContext } from "@app/components/layout";
import { useGetJudgeAnalyticsQuery } from "@app/store/services/analyticsSlice";
import JudgeCounselHeadings from "../JudgeCounselHeadings";
import { JudgeProfileResponseT } from "@app/types/analytics";

type stanceT = "Concurred" | "Dissented";

const JudgeDetailsView = () => {
  const { referrer } = useContext(AppLayoutContext);
  const { searchParams, close } = useQueryHandler();
  const judgeId = searchParams.get("judgeId");
  const profile = searchParams.get("profile");
  const judgeName = searchParams.get("judge");
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
          <div className="py-6">
            <div className="lg:flex gap-[2rem]  relative">
              <div className="basis-[30.7%]">
                <JudgeCounselHeadings
                  h1HeaderRef={h1Ref}
                  heading1=""
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

                  <span className="ml-auto text-[#008E00] bg-[#008E00]/10 text-xs px-3 py-1 rounded">
                    {`${
                      data.judge_info.statistics.total_cases > 1
                        ? `${data.judge_info.statistics.total_cases} Cases`
                        : `${data.judge_info.statistics.total_cases} Case`
                    } `}
                  </span>
                </div>

                {data.judge_info.cases.map((item, index) => (
                  <div
                    key={item.document_id}
                    className="font-paytone pb-3 space-y-3"
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
                        {item.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      {item.area_of_law &&
                        item.area_of_law.map((subjectMatter) => (
                          <span
                            className={` px-2 py-[0.125rem] text-[#008E00] bg-[#008E00]/10 rounded text-center  text-sm font-normal`}
                            key={subjectMatter}
                            title="A"
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
                    <p className="text-sm">{item.case_summary}</p>
                  </div>
                ))}
                {data.judge_info.cases.length > 9 && (
                  <LoadMoreBtn isFetching={isFetching} loadMore={loadMore} />
                )}
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default JudgeDetailsView;
