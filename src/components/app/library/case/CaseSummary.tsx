import { SummaryComponent } from "@app/components/shared";
import Link from "next/link";
import React, { useState } from "react";
type Case = {
  document_id: string;
  case_title: string;
  case_summary?: string;
  court: string;
  year_decided: number;
  area_of_law?: string[];
  subject_matters?: string[];
};
function CaseSummaryForIndex({
  area_of_law,
  case_title,
  case_summary,
  document_id,
  court,
  subject_matters,
  year_decided,
  idx,
}: Case & { idx: number }) {
  //   idx: number
  const [open, setopen] = useState<boolean>(false);

  return (
    <div key={idx} className="space-y-2 pb-8">
      <h5>
        <Link
          href={`/library/cases/${document_id}?title=${case_title}&tab=case`}
          className="text-powder_blue text-[1.1rem] font-semibold font-gilda_Display"
        >
          {idx + 1}. {case_title}
        </Link>
      </h5>
      <div className="inline-flex gap-2">
        <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-lexblue text-sm font-medium">
          {court}
        </span>
        <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-lexblue text-sm font-medium">
          {year_decided}
        </span>
      </div>

      <p className="flex items-center  gap-2 text-xs flex-wrap my-3">
        {area_of_law &&
          area_of_law.map((atx, adx) => (
            <span
              key={adx}
              title="Area of law"
              className="text-[#008E00] bg-[#008E00]/10 px-3 py-1 rounded"
            >
              {atx}
            </span>
          ))}

        {subject_matters &&
          subject_matters.map((stx, sdx) => (
            <span
              key={sdx}
              title="Subject matter"
              className="bg-stone-100 text-lexblue  px-3 py-1 rounded"
            >
              {stx}
            </span>
          ))}
      </p>

      {case_summary && (
        <SummaryComponent
          toogler={() => setopen(!open)}
          isCollapsed={open}
          summary={
            <div
              style={
                open
                  ? { maxHeight: "none" }
                  : {
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 9,
                    }
              }
              className=""
            >
              <h3 className="text-sm font-normal mb-2">
                {(case_summary as any)?.issues_for_determination}
              </h3>
              <h3 className="text-sm font-normal mb-2">
                {(case_summary as any)?.holding_and_reasoning}
              </h3>
              <h3 className="text-sm font-normal mb-2">
                {(case_summary as any)?.originating_court_and_claims}
              </h3>
              <h3 className="text-sm font-normal mb-2">
                {(case_summary as any)?.procedural_history}
              </h3>
              <h3 className="text-sm font-normal mb-2">
                {(case_summary as any)?.disposition}
              </h3>
              {!open && (
                <div className="w-full absolute bottom-0 h-[52px] bg-[linear-gradient(transparent_0px,rgba(255,255,255,0.9)_52px,#fff_80px)]"></div>
              )}
            </div>
          }
          isCollapsible={true}
        />
      )}

      {/* <p className="flex items-center  gap-2 text-xs flex-wrap my-3">
                          {area_of_law &&
                            area_of_law.map((atx, adx) => (
                              <span
                                key={adx}
                                title="Area of law"
                                className="text-[#008E00] bg-[#008E00]/10 px-3 py-1 rounded"
                              >
                                {atx}
                              </span>
                            ))}

                          {subject_matters &&
                            subject_matters.map((stx, sdx) => (
                              <span
                                key={sdx}
                                title="Subject matter"
                                className="bg-stone-100 text-teal-900  px-3 py-1 rounded"
                              >
                                {stx}
                              </span>
                            ))}
                        </p> */}
    </div>
  );
}

export default CaseSummaryForIndex;
