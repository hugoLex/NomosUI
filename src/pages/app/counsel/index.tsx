import { CaseTreatmentParagraph } from "@app/components/app/generalSharedComponents/caseTreatmentParagraph";
import JudgeCounselHeadings from "@app/components/app/JudgeCounselAnalytics/JudgeCounselHeadings";
import JudgeCounselGraphLayout from "@app/components/app/JudgeCounselAnalytics/JudgeCounselGraphLayout";
import JudgesFeaturing_CounselAppearances from "@app/components/app/JudgeCounselAnalytics/JudgesFeaturing_CounselAppearances";
import JudgeCounselProfile from "@app/components/app/JudgeCounselAnalytics/profile";
import { AppLayout } from "@app/components/layout";
import NameCourtyearSuitNo from "@app/components/app/generalSharedComponents/NameCourtyearSuitNo";
import SmallTextBtn from "@app/components/app/generalSharedComponents/SmallBtn";
import React, { Fragment, useRef, useState } from "react";
import CounselCaseTreatment from "@app/components/app/JudgeCounselAnalytics/CounselCaseTreatment";
import { CaseHeader, SearchHeader } from "@app/components/app";
import { Head, Loader } from "@app/components/ui";
import { useVisibility } from "@app/hooks";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import { useGetCounselAnalyticsQuery } from "@app/store/services/judgeAndCounselAnalytics";

function CounselAnalytics() {
  // const [about,name]=useState("")
  const { isError, isFetching, isLoading, data } = useGetCounselAnalyticsQuery({
    counsel_id: 80,
    page: 1,
  });
  const { searchParams } = UseQueryToggler();

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
    <Fragment>
      <Head title={`Search Result - ${"Counsel"}`} />
      <AppLayout>
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
      </AppLayout>
    </Fragment>

    // <AppLayout>
    //   <section className="lg:flex gap-[5%]">
    //     <div className="basis-[55%]">
    //       <JudgeCounselHeadings
    //         heading1="LEGAL LEVERAGE"
    //         heading2="Counsel analytics"
    //         style={{ ctnStyle: "", h1Style: "uppercase", h2Style: "string" }}
    //       />
    //       <JudgeCounselProfile
    //         profilePicture="/images/judge-counsel-img-holder.jpg"
    //         profileName="Jide Taiwo Esq"
    //       >
    //         {AboutCounsel}
    //       </JudgeCounselProfile>
    //       <JudgesFeaturing_CounselAppearances>
    //         Appearance
    //       </JudgesFeaturing_CounselAppearances>
    //       <CounselCaseTreatment
    //         caseTitle="Nkemdillim v. Madukolu"
    //         caseDetails={[
    //           "Supreme Court",
    //           "20th January 2023",
    //           "SC/K/229/S/23",
    //         ]}
    //         outcome={text}
    //         casesCited={text}
    //       />
    //     </div>
    //     <JudgeCounselGraphLayout />
    //   </section>
    // </AppLayout>
  );
}

export default CounselAnalytics;
