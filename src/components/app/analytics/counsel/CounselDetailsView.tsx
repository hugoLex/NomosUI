import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import SmallTextBtn from "../../../shared/SmallBtn";
import { useVisibility } from "@app/hooks";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import { useGetCounselAnalyticsQuery } from "@app/store/services/benchSlice";
import { Loader } from "@app/components/ui";
import JudgeCounselHeadings from "../JudgeCounselHeadings";
import { skipToken } from "@reduxjs/toolkit/query";
import { CounselDetailT } from "@app/store/services/types";
import {
  LoadMoreBtn,
  TextBox,
  Container,
  Navbar,
} from "@app/components/shared/";
import { AppLayoutContext } from "@app/components/layout";

const CounselDetailsView = () => {
  const { referrer } = useContext(AppLayoutContext);

  const { searchParams, close } = UseQueryToggler();
  const counselId = searchParams.get("counselId");
  const profile = searchParams.get("profile");
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<
    [] | CounselDetailT["counsel_details"][]
  >([]); // Store accumulated data
  const { isError, isFetching, isLoading, data } = useGetCounselAnalyticsQuery(
    counselId
      ? {
          counsel_id: Number(counselId),
          page: 1,
        }
      : skipToken
  );
  // Update the accumulated data when new data is fetched
  useEffect(() => {
    if (data) {
      setAllData((prevData) => [...prevData, data.counsel_details]); // Append new data
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

  const counselName = searchParams.get("counsel");
  const profileName = counselName || data?.counsel_details.counsel_name;

  const AboutCounsel: React.JSX.Element = (
    <div>
      <h3 className="text-slate-gray text-[.875rem]">AREAS OF INTEREST</h3>
      <SmallTextBtn
        smallBtnData={[
          "Constitutional law",
          "Matrimonial causes",
          "Election petition",
        ]}
        divStyle="flex items-center gap-2 flex-wrap"
        btnStyle=" bg-[rgb(159,197,248)] px-2 py-1 text-black/80"
      />
      <h3 className="text-slate-gray text-[.875rem]">INDUSTRY FOCUS</h3>
      <SmallTextBtn
        smallBtnData={["Divous causes", "Constitutional law", "Election "]}
        divStyle="flex items-center gap-2 flex-wrap"
        btnStyle=" bg-[rgb(159,197,248)] px-2 py-1 text-black/80"
      />
    </div>
  );
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number
  };
  return (
    <>
      <Navbar query={profileName ?? "Counsel"} isTitle referrer={referrer} />
      {(isFetching || isLoading) && (
        <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-screen">
          <Loader variant="classic" size={80} />
        </div>
      )}

      {/* {isError && (
          <ErrorView404
            caption="No matching legal resources found"
            desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
          />
        )} */}
      {!isFetching && !isError && data?.counsel_details && (
        <Fragment>
          <Container>
            <div className="py-6">
              <div className="lg:flex gap-[2rem]  relative">
                <div className="basis-[30.7%]">
                  <JudgeCounselHeadings
                    h1HeaderRef={h1Ref}
                    heading1=""
                    heading2="Counsel analytics"
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
                        src={`/images/${"counsel_analytics_av.jpg"}`}
                        alt="judge counsel profile"
                      />
                    </div>
                    <h3 className="text-[1.4rem] text-center font-paytone leading-none font-medium text-primary mt-[24px]">
                      {data.counsel_details.counsel_name}
                    </h3>

                    <div className="flex gap -5 items-center justify-center mt-[20px] divide-x-2 border-t border-b border-gray-200 p-[16.4px]">
                      <div className="basis-1/2 text-[#2fa826]">
                        <h6 className="block text-center ">Win</h6>
                        <h6 className="text-center text-[.875rem]">
                          {data.performance_metrics.win_rate}
                        </h6>
                      </div>
                      <div className="pl- [30px] basis-1/2 text-[#D71E30]">
                        <h6 className="block text-center">Loss</h6>
                        <h6 className="text-center text-[.875rem] ">
                          {data.performance_metrics.win_rate}
                        </h6>
                      </div>
                    </div>
                    <h2
                      onClick={() => close("profile", "true")}
                      className="text-[.875rem] cursor-pointer text-primary font-bold flex justify-center mt-[32px] items-center gap-[5px]"
                    >
                      View Profile
                    </h2>
                  </div>
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
                      <p>{data.counsel_details.counsel_name}</p>
                    </div>
                  )}
                  <div className="flex items-center border-b border-solid border-gray-200 pb-3">
                    <select
                      className="appearance-auto  pr-4 outline-none"
                      name="sortBy"
                      id="Hi_Wendy"
                    >
                      <option value={"Most recent"}>Most recent</option>
                      <option value={"Most popular"}>Most popular</option>
                    </select>

                    <span className="ml-auto text-[#008E00] bg-[#008E00]/10 text-xs px-3 py-1 rounded">{`${
                      data.performance_metrics.total_cases > 1
                        ? `${data.performance_metrics.total_cases} Cases`
                        : `${data.performance_metrics.total_cases} Case`
                    } `}</span>
                  </div>

                  {data.counsel_details.cases.map((item, index) => (
                    <div
                      key={item.suit_number}
                      className="font-paytone pb-3 mt-[5px]"
                    >
                      <h3 className="text-[.94rem] font-normal">
                        {item.case_title}
                      </h3>
                      <p className="text-sm ">{item.case_summary}</p>
                      <TextBox
                        smallBtnData={item.subject_matters}
                        divStyle="flex gap-3 mt-3"
                      />
                    </div>
                  ))}
                  <LoadMoreBtn isFetching={isFetching} loadMore={loadMore} />
                </div>
              </div>
            </div>
          </Container>
        </Fragment>
      )}
    </>
  );
};

export default CounselDetailsView;
