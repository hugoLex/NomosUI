import React, {
  Fragment,
  MutableRefObject,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FilterIcon2, MoreIcon } from "@app/components/icons";
import PrecedenceTreatment from "./PrecedenceTreatment";
import { usePrecedenCitedQuery } from "@app/store/services/caseSlice";
import { Container, ErrorView } from "@app/components/shared";
import { Loader } from "@app/components/ui";
import { dummyCaseDetails } from "@app/utils";
import FeedbackWidget from "./FeedbackWidget";
import { SelectedTreatment, TPrecedentData } from "@app/types";
import useQueryToggler from "@app/hooks/useQueryHandler";
import { QuoteHighlighterData } from "@app/pages/app/library/cases/[slug]";

const PrecedentView = ({
  case_title,
  id,
  setClickedQuote,
  innerRef,
}: {
  id: string;
  case_title: string;
  // to set quote on the full judgement to get it highlighted
  setClickedQuote: React.Dispatch<
    React.SetStateAction<QuoteHighlighterData | null>
  >;
  innerRef: MutableRefObject<any>;
}) => {
  const { precedentData } = dummyCaseDetails;
  // to update the url params
  // const { UpdateUrlParams } = useQueryToggler();
  const [cases, setCases] = useState<TPrecedentData[]>([]);
  const [selectedTreatment, setSelectedTreatment] =
    useState<SelectedTreatment>("all");
  const { isLoading, isError, data } = usePrecedenCitedQuery(id);

  useEffect(() => {
    if (data) {
      const { citations } = data;
      setCases((prev) => Array.from(new Set([...prev, ...citations])));
    }

    return () => {};
  }, [data]);

  const handleTreatmentSelection = (_id: SelectedTreatment) =>
    setSelectedTreatment(_id);

  return (
    <Container>
      {isLoading && (
        <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-screen">
          <Loader variant="classic" size={80} />
        </div>
      )}

      {isError && <ErrorView />}

      {data && (
        <div className="pb-6 pt- [60px] md:flex g rid gri d-cols-12 max-w-[772px] mx-auto gap-8">
          {/* <div className="col-span-4 self-baselane">
            <div className="sticky top-[68px]  py-[2rem]">
             

              <h5 className="relative flex gap-2 items-center pl- [8px] text-base text-[#171F46] font-midium font-rubik">
                <FilterIcon2 />
                Filter Treatments
              </h5>
             
              <PrecedenceTreatment selectedTreatment={selectedTreatment} />
            </div>
          </div> */}
          <div className="col- span-8 ">
            <p className="hidden font-light uppercase text-[0.813rem] text-black/80  mt-2 pr-2.5 py-1 leading-[1.25rem]">
              Judicial insight
            </p>
            <h2
              ref={innerRef}
              id="Judicialinsight"
              className="text-xx text-lexblue font-gilda_Display capitalize font-bold mb-2 "
            >
              Precedent analytics
            </h2>
            <h4 className="text-base font-normal text-[#9ea7b4] mb-4 text-wrap">
              These are cases referenced in
              <span className="text-primary/60"> {case_title}</span>
            </h4>
            <div className="space-y-4">
              {cases !== null &&
                cases.map(
                  ({ citation_id, citation, context, treatment_type }, idx) => (
                    <Fragment key={citation_id ?? idx}>
                      <div className="relative space-y-2">
                        <div className="flex gap-3">
                          <span className="text-gray-500">{idx + 1}.</span>
                          {/* make the text to be first letter capital letter and others small */}
                          <h5
                            onClick={() => {
                              setClickedQuote({
                                quote: context,
                                citation: citation,
                                treatment_type: treatment_type,
                              });
                              // UpdateUrlParams("tab", "case");
                            }}
                            className="text-powder_blue text-[1.1rem] font-semibold font-gilda_Display capitalize cursor-pointer hover:underline "
                          >
                            {citation}
                          </h5>
                        </div>

                        <div className="flex flex-wrap text-xs">
                          <span className="text-[#008E00] bg-[#008E00]/10 px-3 py-1 rounded">
                            {treatment_type}
                          </span>
                          {/* <span
                          className={`text-[0.875rem] mt-[10px] block ${
                            "positive" == "positive" ? "text-[#11AB45]" : ""
                          } gray-200`}
                        >
                          {treatment_type}
                        </span> */}
                        </div>
                        <p
                          // set the quote to highlight state and navigate to the full judgement page
                          onClick={() => {
                            setClickedQuote({
                              quote: context,
                              citation: citation,
                              treatment_type: treatment_type,
                            });
                            // UpdateUrlParams("tab", "case");
                          }}
                          className="text-[0.875rem] gray-200 text-lexblue"
                        >
                          {context}
                        </p>
                      </div>

                      <div className="hidden">
                        <div className="flex justify-end mb-2">
                          <span role="button">
                            <MoreIcon />
                          </span>
                        </div>
                        <hr className="mt-3 mb-6" />
                      </div>

                      <FeedbackWidget />
                      <div className="mb-8  border-t border-t-primary/10 pb-5"></div>
                    </Fragment>
                  )
                )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PrecedentView;
