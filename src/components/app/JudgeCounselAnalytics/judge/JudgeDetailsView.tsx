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
import Image from "next/image";
import Link from "next/link";
import SmallTextBtn from "../../generalSharedComponents/SmallBtn";

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
        <section className="relative mx-auto w-full max-w-[1400px] py-6 ">
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
                  <div className="font-roboto">
                    <div className="relative rounded-full overflow-clip w-[80px] h-[80px]">
                      <Image
                        className=""
                        style={{ objectFit: "cover" }}
                        fill
                        // width={50}
                        // height={50}
                        src={`/images/${"judge-counsel-img-holder.jpg"}`}
                        alt="judge counsel profile"
                      />
                    </div>
                    <h3 className="text-[1.875rem] font-medium text-primary my-5">
                      {"Chiamaka Uzokwe Sassy JSC"}
                    </h3>
                    <Link href={`/${""}`} className="text-[.94rem] font-normal">
                      Supreme Court
                    </Link>
                    <Link
                      href={`/${""}`}
                      className="text-[.875rem] font-bold flex items-center gap-[5px] underline underline-offset-2"
                    >
                      <svg
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
                      </svg>
                      View Biography
                    </Link>
                  </div>

                  <div>
                    <div className="flex items-center border-b border-solid border-gray-200 pb-3">
                      <select
                        className=" appearance-auto  pr-4"
                        name="sortBy"
                        id="hiee"
                      >
                        <option value={"Most popular"}>Most popular</option>
                        <option value={"Most recent"}>Most recent</option>
                      </select>
                      <select
                        className=" appearance-auto  px-4"
                        name="sortBy"
                        id="hiee"
                      >
                        <option value={"Most popular"}>Most popular</option>
                        <option value={"Most recent"}>Most recent</option>
                      </select>
                      <span className="ml-auto">{`${"100"} Cases`}</span>
                    </div>

                    <div className="font-roboto border-b border-solid border-gray-200 pb-3">
                      <h3 className="text-[.94rem] font-normal">05 May 2021</h3>
                      <p className="text-[.96rem] font-bold leading-[21px]">
                        A review of bank prudential regulations in Nigeria,
                        including with regard to senior management
                        responsibilities and remuneration, regulatory capital
                        and liquidity, and recovery and resolution.
                      </p>
                      <SmallTextBtn
                        smallBtnData={["Marriage", "constitution", "Election"]}
                        btnStyle="px-2 py-1 text-primary"
                        divStyle="flex gap-3 mt-3"
                      />
                    </div>
                    <button className="mt-5 rounded-[6px] text-[.875rem] px-[20px] py-[9px] bg-red-600 border-gray-200 boder font-bold text-white">
                      Load more
                    </button>
                    <div>
                      <h3>About me</h3>
                      <hr />
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more- or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English. Many
                        desktop publishing packages and web page editors now use
                        Lorem Ipsum as their default model text, and a search
                        for 'lorem ipsum' will uncover many web sites still in
                        their infancy. Various versions have evolved over the
                        years, sometimes by accident, sometimes on purpose
                        (injected humour and the like).
                      </p>
                    </div>
                  </div>

                  {/* <JudgeCounselProfile
                    profilePicture="/images/judge-counsel-img-holder.jpg"
                    profileName={data.judge_info.name}
                  >
                    <>
                      <h3 className="text-slate-gray text-[.875rem]">ABOUT</h3>
                      <p className="font-rubik">{data.judge_info.profile}</p>
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
