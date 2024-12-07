import { CaseTreatmentParagraph } from "@app/components/app/generalSharedComponents/caseTreatmentParagraph";
import NameCourtyearSuitNo from "@app/components/app/generalSharedComponents/NameCourtyearSuitNo";
import JudgeCounselHeadings from "@app/components/app/JudgeCounselAnalytics/JudgeCounselHeadings";
import JudgeCounselGraphLayout from "@app/components/app/JudgeCounselAnalytics/JudgeCounselGraphLayout";
import JudgesFeaturing_CounselAppearances from "@app/components/app/JudgeCounselAnalytics/JudgesFeaturing_CounselAppearances";
import JudgeCounselProfile from "@app/components/app/JudgeCounselAnalytics/profile";
import { AppLayout } from "@app/components/layout";
import React, { Fragment, useRef } from "react";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import Graphmodal from "@app/components/app/generalSharedComponents/Graphmodal";
import { Head } from "@app/components/ui";
import { SearchHeader } from "@app/components/app";
import JudgeCaseFeaturing from "@app/components/app/JudgeCounselAnalytics/JudgeCaseFeaturing";
import { useVisibility } from "@app/hooks";
import { useGetJudgeAnalyticsQuery } from "@app/store/services/judgeAndCounselAnalytics";

function JudgeAnalytics() {
  const { isError, isLoading, data } = useGetJudgeAnalyticsQuery({
    judge_id: 2,
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

  const judgeName = searchParams.get("judge");
  const profileName = judgeName || "JSC Chukwudife Oputa";
  const text =
    "Dive into an ocean of knowledge with this thought-provoking post, revered deeply within the supportive DEV Community. Developers of all levels are welcome to join and enhance our collective intelligence. Saying a simple 'thank you' can brighten someone's day. Share your gratitude in the comments below! On DEV, sharing ideas eases our path and fortifies our community connections. Found this helpful? Sending a quick thanks to the author can be profoundly valued.";

  const AboutJudge: React.JSX.Element = (
    <>
      <h3 className="text-slate-gray text-[.875rem]">ABOUT</h3>
      <p className="font-rubik">{text}</p>
    </>
  );

  const judgecounselgraph = searchParams.get("judgecounselgraph");
  console.log("This is from judge components", isError, isLoading, data);
  if (isLoading) return <p>Its loading</p>;
  return (
    <Fragment>
      <Head title={`Search Result - ${"title"}`} />
      <AppLayout>
        <SearchHeader
          // uncomment the query out and use when the end point is ready
          // query={query}
          query={profileName}
          isH1Visible={isH1Visible}
          searchBtnRef={searchRef}
        />
        {/* <CaseHeader /> */}
        <section className="relative mx-auto max-w-[1400px] py-6 ">
          <div className="px-16 max-md:px-5 max-w-full">
            <div className="">
              <section className="lg:flex gap-[5%] justify-between relative ">
                {/* <section className="lg:flex gap-[5%] px-16 max-md:px-5 max-w-full"> */}
                <div className="basis-[65%]">
                  <JudgeCounselHeadings
                    h1HeaderRef={h1Ref}
                    heading1="Bench Intelligence"
                    heading2="Judge analytics"
                    style={{
                      ctnStyle: "",
                      h1Style: "uppercase",
                      h2Style: "string",
                    }}
                  />
                  <JudgeCounselProfile
                    profilePicture="/images/judge-counsel-img-holder.jpg"
                    profileName={profileName}
                  >
                    {AboutJudge}
                  </JudgeCounselProfile>
                  <JudgesFeaturing_CounselAppearances>
                    Cases featuring
                    <span className="text-lex-blue"> {profileName}</span>
                  </JudgesFeaturing_CounselAppearances>

                  {/* replace with payload   */}
                  {data?.appearances.map((appearance, index) => {
                    return (
                      <JudgeCaseFeaturing
                        key={index}
                        caseTitle={
                          appearance.case_title ?? "Nkemdillim v. Madukolu"
                        }
                        caseDetails={[
                          appearance.court,
                          appearance.date,
                          appearance.case_id.toString() ?? "SC/K/229/S/23",
                        ]}
                        treatment={appearance.outcome}
                        reason={text}
                      />
                    );
                  })}
                </div>
                <JudgeCounselGraphLayout />
                {judgecounselgraph && <Graphmodal />}
              </section>
            </div>
          </div>
        </section>
      </AppLayout>
    </Fragment>
  );
}

export default JudgeAnalytics;

{
  /* <div className="flex justify-end mb-2">
        <span role="button">
          <MoreIcon />
        </span>
      </div>
      <hr className="mt-3 mb-6" /> */
}
