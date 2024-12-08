import React, { useRef } from "react";
import JudgeCounselGraphLayout from "../JudgeCounselGraphLayout";
import Graphmodal from "../../generalSharedComponents/Graphmodal";
import JudgeCounselProfile from "../profile";
import JudgesFeaturing_CounselAppearances from "../JudgesFeaturing_CounselAppearances";
import JudgeCounselHeadings from "../JudgeCounselHeadings";
import { useGetJudgeAnalyticsQuery } from "@app/store/services/judgeAndCounselAnalytics";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import { useVisibility } from "@app/hooks";
import { SearchHeader } from "../../search";
import JudgeCaseFeaturing from "./JudgeCaseFeaturing";
import BigLoadingSpinner from "../../generalSharedComponents/BigLoadingSpinner";
import { skipToken } from "@reduxjs/toolkit/query";

type stanceT = "Concurred" | "Dissented";
const JudgeDetailsView = () => {
  const { searchParams } = UseQueryToggler();
  const judgeId = searchParams.get("judgeId");
  const { isError, isFetching, isLoading, data } = useGetJudgeAnalyticsQuery(
    judgeId
      ? {
          judge_id: Number(judgeId),
          page: 1,
        }
      : skipToken
    //     // judge_id: parseInt(judgeId as unknown as string),
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

  const judgeName = searchParams.get("judge");
  const profileName = judgeName || data?.judge_info.name;
  const text =
    "Dive into an ocean of knowledge with this thought-provoking post, revered deeply within the supportive DEV Community. Developers of all levels are welcome to join and enhance our collective intelligence. Saying a simple 'thank you' can brighten someone's day. Share your gratitude in the comments below! On DEV, sharing ideas eases our path and fortifies our community connections. Found this helpful? Sending a quick thanks to the author can be profoundly valued.";
  const judgecounselgraph = searchParams.get("judgecounselgraph");
  console.log("This is from judge components", isError, isLoading, data);

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
                    profileName={data.judge_info.name}
                  >
                    <>
                      <h3 className="text-slate-gray text-[.875rem]">ABOUT</h3>
                      <p className="font-rubik">{data.judge_info.profile}</p>
                    </>
                  </JudgeCounselProfile>
                  <JudgesFeaturing_CounselAppearances>
                    Cases featuring
                    <span className="text-lex-blue"> {profileName}</span>
                  </JudgesFeaturing_CounselAppearances>

                  {/* replace with payload   */}
                  {data.judge_info.case_appearances.cases.map(
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
                  )}
                </div>
                <JudgeCounselGraphLayout />
                {judgecounselgraph && <Graphmodal />}
              </section>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default JudgeDetailsView;
