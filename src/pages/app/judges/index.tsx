import { CaseTreatmentParagraph } from "@app/components/app/generalSharedComponents/caseTreatmentParagraph";
import NameCourtyearSuitNo from "@app/components/app/generalSharedComponents/NameCourtyearSuitNo";
import JudgeCounselHeadings from "@app/components/app/JudgeCounselAnalytics/JudgeCounselHeadings";
import JudgeCounselGraphLayout from "@app/components/app/JudgeCounselAnalytics/JudgeCounselGraphLayout";
import JudgesFeaturing_CounselAppearances from "@app/components/app/JudgeCounselAnalytics/JudgesFeaturing_CounselAppearances";
import JudgeCounselProfile from "@app/components/app/JudgeCounselAnalytics/profile";
import { AppLayout } from "@app/components/layout";
import React, { useState } from "react";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import Graphmodal from "@app/components/app/generalSharedComponents/Graphmodal";

function JudgeAnalytics() {
  const { searchParams } = UseQueryToggler();
  // const [about,name]=useState("")
  const profileName = "JSC Chukwudife Oputa";
  const text =
    "Dive into an ocean of knowledge with this thought-provoking post, revered deeply within the supportive DEV Community. Developers of all levels are welcome to join and enhance our collective intelligence. Saying a simple 'thank you' can brighten someone's day. Share your gratitude in the comments below! On DEV, sharing ideas eases our path and fortifies our community connections. Found this helpful? Sending a quick thanks to the author can be profoundly valued.";

  const AboutJudge: React.JSX.Element = (
    <>
      <h3 className="text-slate-gray text-[.875rem]">ABOUT</h3>
      <p className="font-rubik">{text}</p>
    </>
  );

  const judgecounselgraph = searchParams.get("judgecounselgraph");
  return (
    <AppLayout>
      <section className="lg:flex gap-[5%] relative ">
        {/* <section className="lg:flex gap-[5%] px-16 max-md:px-5 max-w-full"> */}
        <div className="basis-[55%]">
          <JudgeCounselHeadings
            heading1="Bench Intelligence"
            heading2="Judge analytics"
            style={{ ctnStyle: "", h1Style: "uppercase", h2Style: "string" }}
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
          <NameCourtyearSuitNo
            caseTitle="Nkemdillim v. Madukolu"
            caseDetails={[
              "Supreme Court",
              "20th January 2023",
              "SC/K/229/S/23",
            ]}
          />
          {[
            ["Concurred", text],
            ["Dissented", text],
          ].map(([treatment, text], index) => (
            <>
              <CaseTreatmentParagraph
                reason={text}
                treatment={treatment}
                key={index}
              />
              <hr />
            </>
          ))}
        </div>
        <JudgeCounselGraphLayout />
        {judgecounselgraph && <Graphmodal />}
      </section>
    </AppLayout>
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
