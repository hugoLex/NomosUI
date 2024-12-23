import React, { Fragment, useMemo, useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { MoreIcon } from "@app/components/icons";
import PrecedenceTreatment from "./PrecedenceTreatment";
import { usePrecedentQuery } from "@app/store/services/caseSlice";
import { ErrorView } from "@app/components/shared";
import { Loader } from "@app/components/ui";
import { dummyCaseDetails } from "@app/utils";
import { SelectedTreatment } from "@app/types";

const PrecedentView = ({ id }: { id: string }) => {
  const { precedentData } = dummyCaseDetails;

  const [selectedTreatment, setSelectedTreatment] =
    useState<SelectedTreatment>("all");
  const { isLoading, isError, data } = usePrecedentQuery(id);

  const cases = useMemo(() => {
    if (data) {
      const { cited_cases } = data;
      return cited_cases;
    }
    return null;
  }, [data]);

  const handleTreatmentSelection = (_id: SelectedTreatment) =>
    setSelectedTreatment(_id);

  if (isLoading) return <Loader />;

  if (isError) return <ErrorView />;

  return (
    <Fragment>
      <section className="relative mx-auto max-w-[1100px] py-6 ">
        <div className="px-16 max-md:px-5 max-w-full">
          <div className="md:grid grid-cols-12 gap-8">
            <div className="col-span-8">
              <p className=" font-light uppercase text-[0.813rem] text-black/80  mt-2 pr-2.5 py-1 leading-[1.25rem]">
                Judicial insight
              </p>
              <h2
                id="searchQuery"
                className="text-xx font-normal text-[#245b91] mb-6"
              >
                Precedent analytics
              </h2>
              {cases !== null &&
                cases.map(
                  ({ citation_id, citation_type, citation, context }, idx) => (
                    <Fragment key={citation_id ?? idx}>
                      <div className="relative">
                        <span className="text-gray-500 absolute -left-5 top-0">
                          {idx + 1}.
                        </span>
                        {/* make the text to be first letter capital letter and others small */}
                        <h5 className="text-base capitalize">{citation}</h5>
                        <span
                          className={`text-[0.875rem] mt-[10px] block ${
                            "positive" == "positive" ? "text-[#11AB45]" : ""
                          } gray-200`}
                        >
                          {citation_type}
                        </span>
                        <p className="text-[0.875rem] gray-200 ">{context}</p>
                      </div>
                      <div className="flex justify-end mb-2">
                        <span role="button">
                          <MoreIcon />
                        </span>
                      </div>
                      <hr className="mt-3 mb-6" />
                    </Fragment>
                  )
                )}
            </div>
            <div className="col-span-4 self-baselane">
              <div className="sticky top-[68px]  py-[2rem]">
                {/* <div className="sticky top-[68px] bg-gray-100 p-[2rem]"> */}
                {/* <div className="flex gap-2 items-center"> */}

                <h5 className="relative flex gap-2 items-center pl- [8px] text-base text-[#171F46] font-midium font-rubik">
                  <HiAdjustmentsHorizontal
                    size={24}
                    className=""
                    // className="absolute left-[-20px] top-[4px]"
                  />
                  Filter Treatments
                </h5>
                {/* </div> */}
                {/* <div>
            <p>Positive</p>
            <p>Neutral</p>
            <p>Negative</p>
            <p>Cited by counsel</p>
          </div> */}
                <PrecedenceTreatment selectedTreatment={selectedTreatment} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default PrecedentView;
