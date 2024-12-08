import React from "react";
import NameCourtyearSuitNo from "../../generalSharedComponents/NameCourtyearSuitNo";
import { CaseTreatmentParagraph } from "../../generalSharedComponents/caseTreatmentParagraph";

type JudgeCaseFeaturingProps = {
  caseTitle: string;
  caseDetails: [string, string, string];
  reason: string;
  treatment: "Concurred" | "Dissented";
};

const JudgeCaseFeaturing: React.FC<JudgeCaseFeaturingProps> = ({
  caseTitle,
  caseDetails,
  reason,
  treatment,
}) => {
  return (
    <>
      <NameCourtyearSuitNo caseTitle={caseTitle} caseDetails={caseDetails} />

      <CaseTreatmentParagraph
        reason={reason}
        treatment={treatment ?? "Concurred"}
      />
      <hr />
    </>
  );
};

export default JudgeCaseFeaturing;
