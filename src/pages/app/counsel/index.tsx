import { AppLayout } from "@app/components/layout";
import React, { Fragment } from "react";
import { Head } from "@app/components/ui";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import AllCounselView from "@app/components/app/JudgeCounselAnalytics/counsel/AllCounselView";
import CounselDetailsView from "@app/components/app/JudgeCounselAnalytics/counsel/CounselDetailsView";

function CounselAnalytics() {
  const { searchParams } = UseQueryToggler();

  const counselId = searchParams.get("counselId");

  return (
    <Fragment>
      <Head title={`Search Result - ${"Counsel"}`} />
      <AppLayout>
        {!counselId && <AllCounselView />}
        {counselId && <CounselDetailsView />}
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
