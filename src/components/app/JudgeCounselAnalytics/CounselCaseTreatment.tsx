import React from "react";
import NameCourtyearSuitNo from "../generalSharedComponents/NameCourtyearSuitNo";
import { CaseTreatmentParagraph } from "../generalSharedComponents/caseTreatmentParagraph";
type counselCaseTreatment = {
  caseTitle: string;
  caseDetails: [string, string, string];
  casesCited: string;
  outcome: string;
};
const CounselCaseTreatment: React.FC<counselCaseTreatment> = ({
  caseTitle,
  caseDetails,
  casesCited,
  outcome,
}) => {
  return (
    <section className="last:pb-10 ">
      <NameCourtyearSuitNo caseTitle={caseTitle} caseDetails={caseDetails} />

      <CaseTreatmentParagraph
        // practitioner_type="counsel"
        reason={casesCited}
        treatment={"Case cited"}
      />
      {/* <NameCourtyearSuitNo caseTitle={caseTitle} caseDetails={caseDetails} /> */}
      <CaseTreatmentParagraph
        // practitioner_type="counsel"
        reason={outcome}
        treatment={"Outcome"}
      />
      <hr className="my-5 h-0.5 bg-gray-600" />
    </section>
  );
};

export default CounselCaseTreatment;
