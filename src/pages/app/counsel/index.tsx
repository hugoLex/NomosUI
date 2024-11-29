import { CaseTreatmentParagraph } from "@app/components/app/generalSharedComponents/caseTreatmentParagraph";
import JudgeCounselHeadings from "@app/components/app/JudgeCounselAnalytics/JudgeCounselHeadings";
import JudgeCounselGraphLayout from "@app/components/app/JudgeCounselAnalytics/JudgeCounselGraphLayout";
import JudgesFeaturing_CounselAppearances from "@app/components/app/JudgeCounselAnalytics/JudgesFeaturing_CounselAppearances";
import JudgeCounselProfile from "@app/components/app/JudgeCounselAnalytics/profile";
import { AppLayout } from "@app/components/layout";
import NameCourtyearSuitNo from "@app/components/app/generalSharedComponents/NameCourtyearSuitNo";
import SmallTextBtn from "@app/components/app/generalSharedComponents/SmallBtn";
import React, { useState } from "react";
import CounselCaseTreatment from "@app/components/app/JudgeCounselAnalytics/CounselCaseTreatment";

function CounselAnalytics() {
  // const [about,name]=useState("")
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
    <AppLayout>
      <section className="lg:flex gap-[5%]">
        <div className="basis-[55%]">
          <JudgeCounselHeadings
            heading1="LEGAL LEVERAGE"
            heading2="Counsel analytics"
            style={{ ctnStyle: "", h1Style: "uppercase", h2Style: "string" }}
          />
          <JudgeCounselProfile
            profilePicture="/images/judge-counsel-img-holder.jpg"
            profileName="Jide Taiwo Esq"
          >
            {AboutCounsel}
          </JudgeCounselProfile>
          <JudgesFeaturing_CounselAppearances>
            Appearance
          </JudgesFeaturing_CounselAppearances>
          <CounselCaseTreatment
            caseTitle="Nkemdillim v. Madukolu"
            caseDetails={[
              "Supreme Court",
              "20th January 2023",
              "SC/K/229/S/23",
            ]}
            outcome={text}
            casesCited={text}
          />
        </div>
        <JudgeCounselGraphLayout />
      </section>
    </AppLayout>
  );
}

export default CounselAnalytics;
