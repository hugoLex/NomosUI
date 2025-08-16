import React, { useState } from "react";
import { LuGavel, LuUsers, LuExternalLink } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@app/components/ui";
import { PersonnalData } from "@app/types";
import Link from "next/link";

const LegalPersonnelWidget = ({ data }: { data: PersonnalData }) => {
  const { judges, counsels } = data;
  const [activeTab, setActiveTab] = useState("judges");
  const judgesDispositionColour: { [key: string]: string } = {
    concurred: "text-[#6CCC7B]",
    dissented: "text-[#FEA03C]",
    "lead judge": "text-blue-500",
  };
  // console.log("counsels", counsels);
  const EmptyState = ({ type }: { type: any }) => (
    <div className="flex flex-col items-center justify-center py-6 text-gray-500">
      {type === "judges" ? (
        <>
          <LuGavel className="w-12 h-12 mb-3 text-gray-300" />
          <p>No judges have been assigned to this case yet</p>
        </>
      ) : (
        <>
          <LuUsers className="w-12 h-12 mb-3 text-gray-300" />
          <p>No counsel information available</p>
        </>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto  font-rubik">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab("judges")}
          className={`flex items-center space-x-2 px-4 pb-3 text-sm font-medium transition-colors ${
            activeTab === "judges"
              ? "border-b-2 border-[#245B91] text-[#245B91]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div
            className={`p-1.5 rounded-full ${
              activeTab === "judges" ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <LuGavel
              className={`w-4 h-4 ${
                activeTab === "judges" ? "text-[#245B91]" : "text-gray-500"
              }`}
            />
          </div>
          <span>Judges</span>
        </button>
        <button
          onClick={() => setActiveTab("counsel")}
          className={`flex items-center space-x-2 px-4 pb-3 text-sm font-medium transition-colors ${
            activeTab === "counsel"
              ? "border-b-2 border-[#245B91] text-[#245B91]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div
            className={`p-1.5 rounded-full ${
              activeTab === "counsel" ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <LuUsers
              className={`w-4 h-4 ${
                activeTab === "counsel" ? "text-[#245B91]" : "text-gray-500"
              }`}
            />
          </div>
          <span>Counsel</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-2">
        {activeTab === "judges" && (
          <div className="space-y-1">
            {judges.length > 0 ? (
              judges.map((judge, index) => (
                <div key={index}>
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          target="_blank"
                          // href={`/analytics/judges?judgeId=${judge.id}&judge=${judge.name}`}
                          href={`/analytics/judges?judgeId=${judge.id}&judge=${judge.name}`}
                          className="flex items-center justify-between py-1.5 px-2 text-inherit text-sm text-primary"
                        >
                          {judge.name}
                          <LuExternalLink className="w-4 h-4 text-gray-400" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>view profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span
                    className={`text-[10px] block mt-[-10px] ml-[10px] uppercase font-cabin ${
                      judgesDispositionColour[
                        judge.disposition?.toLowerCase() || ""
                      ] || "text-gray-500"
                    }`}
                  >
                    {judge?.disposition || "Judge"}
                  </span>{" "}
                </div>
              ))
            ) : (
              <EmptyState type="judges" />
            )}
          </div>
        )}

        {activeTab === "counsel" && (
          <div className="space-y-1">
            {counsels.length > 0 ? (
              counsels.map((counsel, index) => (
                <div key={index}>
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          target="_blank"
                          href={`/analytics/counsels?counselId=${counsel.id}&counsel=${counsel.name}`}
                          className="text-primary flex items-center justify-between py-1.5 px-2 text-inherit text-sm"
                        >
                          {counsel.name}
                          <LuExternalLink className="w-4 h-4 text-gray-400" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="text-sm">
                        <p>view profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-[10px] block mt-[-10px] ml-[10px] uppercase text-gray-500">
                    {counsel?.representation || "Counsel"}
                  </span>{" "}
                </div>
              ))
            ) : (
              <EmptyState type="counsel" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalPersonnelWidget;
