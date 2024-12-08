import React, { useRef } from "react";
import SmallTextBtn from "../../generalSharedComponents/SmallBtn";
import { useVisibility } from "@app/hooks";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import { useGetCounselAnalyticsQuery } from "@app/store/services/judgeAndCounselAnalytics";
import { SearchHeader } from "../../search";
import { Loader } from "@app/components/ui";
import JudgeCounselGraphLayout from "../JudgeCounselGraphLayout";
import CounselCaseTreatment from "./CounselCaseTreatment";
import JudgeCounselProfile from "../profile";
import JudgesFeaturing_CounselAppearances from "../JudgesFeaturing_CounselAppearances";
import JudgeCounselHeadings from "../JudgeCounselHeadings";
import { skipToken } from "@reduxjs/toolkit/query";

const CounselDetailsView = () => {
  const { searchParams } = UseQueryToggler();
  const counselId = searchParams.get("counselId");
  const { isError, isFetching, isLoading, data } = useGetCounselAnalyticsQuery(
    counselId
      ? {
          counsel_id: Number(counselId),
          page: 1,
        }
      : skipToken
  );

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
  const profileName = counselName || data?.counsel_name;
  const text =
    "Dive into an ocean of knowledge with this thought-provoking post, revered deeply within the supportive DEV Community. Developers of all levels are welcome to join and enhance our collective intelligence. Saying a simple 'thank you' can brighten someone's day. Share your gratitude in the comments below! On DEV, sharing ideas eases our path and fortifies our community connections. Found this helpful? Sending a quick thanks to the author can be profoundly valued.";

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
  return (
    <>
      <SearchHeader
        // uncomment the query out and use when the end point is ready
        // query={query}
        query={profileName ?? "Counsel"}
        isH1Visible={isH1Visible}
        searchBtnRef={searchRef}
      />
      {(isFetching || isLoading) && (
        <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
          <Loader variant="classic" size={80} />
        </div>
      )}

      {/* {isError && (
          <ErrorView404
            caption="No matching legal resources found"
            desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
          />
        )} */}
      {!isFetching && !isError && data?.counsel_name && (
        <section className="relative mx-auto max-w-[1400px] py-6 ">
          <div className="px-16 max-md:px-5 max-w-full">
            <div className="">
              {/* <section className="lg:flex gap-[5%] justify-between relative "> */}
              <section className="lg:flex gap-[5%]">
                <div className="basis-[65%]">
                  <JudgeCounselHeadings
                    h1HeaderRef={h1Ref}
                    heading1="LEGAL LEVERAGE"
                    heading2="Counsel analytics"
                    style={{
                      ctnStyle: "",
                      h1Style: "uppercase",
                      h2Style: "string",
                    }}
                  />
                  <JudgeCounselProfile
                    profilePicture="/images/judge-counsel-img-holder.jpg"
                    profileName={data.counsel_name}
                  >
                    {AboutCounsel}
                  </JudgeCounselProfile>
                  <JudgesFeaturing_CounselAppearances>
                    Appearance
                  </JudgesFeaturing_CounselAppearances>
                  {data.data.case_details.cases.map((case_) => (
                    <CounselCaseTreatment
                      key={case_.suit_number}
                      caseTitle={
                        case_.case_title ?? "Chibuike v. Ichie Billions"
                      }
                      caseDetails={[
                        case_.court ?? "Supreme Court",
                        case_.year ? `${case_.year}` : "20th January 2023",
                        case_.suit_number ?? "SC/K/229/S/23",
                      ]}
                      outcome={case_.case_outcome}
                      casesCited={case_.subject_matters}
                    />
                  ))}
                  {/* <CounselCaseTreatment
                      caseTitle="Nkemdillim v. Madukolu"
                      caseDetails={[
                        "Supreme Court",
                        "20th January 2023",
                        "SC/K/229/S/23",
                      ]}
                      outcome={text}
                      casesCited={[text]}
                    /> */}
                </div>
                <JudgeCounselGraphLayout />
              </section>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CounselDetailsView;
