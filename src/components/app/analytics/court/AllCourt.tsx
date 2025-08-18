"use client";
import { Container, ErrorView404, Navbar } from "@app/components/shared";
import { DashboardSkeletonLoader } from "@app/components/shared/DashboardSkeletonLoader";
import useDebounce from "@app/hooks/useDebounce";
import {
  useGetAllCourtsQuery,
  useGetDecisionPatternsQuery,
  useGetDivisionSpecializationQuery,
  useGetJurisdictionalAnalysisQuery,
  useGetLegalIssueEvolutionQuery,
  useGetPrecedentInfluenceQuery,
} from "@app/store/services/analyticsSlice";
import {
  TDecisionPatterns,
  TdivisionSpecialization,
  TLegalIssueEvolution,
  TPrecedentInfluence,
} from "@app/types";
import { urlFilterAndBuilder } from "@app/utils/helpers";
import { skipToken } from "@reduxjs/toolkit/query";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// Define color scheme as CSS variables for consistent use
const colors = {
  primaryDark: "#0E3165",
  brightCyan: "#6EF1FB",
  mutedBlue: "#95B3BD",
  brightYellow: "#FFF95D",
};

type Court = {
  id: number;
  name: string;
};

type CourtsDropdownProps = {
  courts: Court[];
  onSelect: (court: Court) => void;
};

function CourtsDropdown({ courts, onSelect }: CourtsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  const handleSelect = (court: Court) => {
    setSelectedCourt(court);
    onSelect(court);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50"
      >
        {selectedCourt ? selectedCourt.name : "Select a court"}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {courts.map((court) => (
            <li
              key={court.id}
              onClick={() => handleSelect(court)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {court.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Reusable component for the explanatory section at the top of each tab
const ExplanatorySection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-6 border-l-4" style={{ borderColor: colors.brightCyan }}>
    <div className="pl-4">
      <h3
        className="text-xx font-bold mb-2"
        style={{ color: colors.primaryDark }}
      >
        {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
);

// Reusable component for usage instructions
const UsageInstructions = ({ instructions }: { instructions: string }) => (
  <div
    className="mt-6 p-4 rounded-md"
    style={{ backgroundColor: `${colors.primaryDark}10` }}
  >
    <h4 className="font-bold mb-2" style={{ color: colors.primaryDark }}>
      How to Use This Data
    </h4>
    <p className="text-gray-700">{instructions}</p>
  </div>
);

// Reusable dropdown component
// const Dropdown = ({
//   label,
//   options,
//   value,
//   onChange,
// }: {
//   label: string;
//   options: { value: string; label: string }[];
//   value: string;
//   onChange: (e: string) => void;
// }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
//       //   style={{ outlineColor: colors.brightCyan }}
//     >
//       {options.map((option: { value: string; label: string }) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   </div>
// );

const Dropdown = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || "Select...";

  return (
    <div className="mb-4" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {/* Trigger */}
      <button
        type="button"
        className="w-full p-2 border border-gray-300 rounded-md flex justify-between items-center bg-white focus:outline-none focus:ring-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedLabel}</span>
        <span className="ml-2">▾</span>
      </button>

      {/* Options */}
      {isOpen && (
        <ul className="mt-1 border border-gray-300 rounded-md bg-white shadow-md max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                option.value === value ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Reusable button component
const Button = ({
  label,
  onClick,
  primary = true,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
}) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-md font-medium transition-colors"
    style={{
      backgroundColor: primary ? colors.primaryDark : "white",
      color: primary ? "white" : colors.primaryDark,
      border: primary ? "none" : `1px solid ${colors.primaryDark}`,
    }}
  >
    {label}
  </button>
);

// Empty state component for tables
const EmptyState = ({
  message,
  ctaText,
}: {
  message: string;
  ctaText: string;
}) => (
  <div className="border border-dashed rounded-md p-8 bg-gray-50 text-center">
    <div
      className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full"
      style={{ backgroundColor: `${colors.brightCyan}20` }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke={colors.primaryDark}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    </div>
    <h3
      className="text-lg font-medium mb-2"
      style={{ color: colors.primaryDark }}
    >
      No Data to Display
    </h3>
    <p className="text-gray-600 mb-4">{message}</p>
    <p className="text-sm font-medium" style={{ color: colors.primaryDark }}>
      {ctaText}
    </p>
  </div>
);

// Tab content components - Empty States
const DivisionSpecializationTab = () => {
  // const [range, setRange] = useState<{
  //   limit: number;
  //   min_cases: number;
  // }>({ limit: 20, min_cases: 5 });
  const [minCases, setMinCases] = useState("5");
  const [limit, setLimit] = useState("20");
  const {
    data: divisionSpecialization,
    error,
    isLoading,
  } = useGetDivisionSpecializationQuery(
    urlFilterAndBuilder({
      limit: Number(limit),
      min_cases: Number(minCases),
    })
  );
  // console.log("This is data from court", data, error);
  const mockData = {
    user_id: "user123",
    data: {
      count: 15,
      min_cases_threshold: 5,
      results: [
        {
          court_name: "Supreme Court",
          division_name: "Constitutional Division",
          legal_domain_name: "Constitutional Law",
          case_count: 78,
          pct_of_division_cases: 42.5,
          pct_of_domain_cases: 35.8,
          specialization_score: 15.2,
          appellant_win_percentage: 38.4,
          decided_cases: 72,
          win_rate_vs_court_avg: 5.3,
          win_rate_vs_overall_avg: 8.7,
        },
        // Additional results...
      ],
    },
  };
  const data =
    divisionSpecialization && divisionSpecialization.data.results.length > 0
      ? divisionSpecialization
      : mockData;
  const SpecializationDataTable = ({
    results,
  }: {
    results: TdivisionSpecialization["data"]["results"];
  }) => {
    if (!results || results.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No specialization data available
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Court & Division
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Legal Domain
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cases
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization Score
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appellant Win %
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  vs Court Avg
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.court_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.division_name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {item.legal_domain_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.pct_of_domain_cases.toFixed(1)}% of domain cases
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {item.case_count}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.pct_of_division_cases.toFixed(1)}% of division
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {item.specialization_score.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {item.appellant_win_percentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.decided_cases} decided
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className={`text-sm font-medium ${
                        item.win_rate_vs_court_avg > 0
                          ? "text-green-600"
                          : item.win_rate_vs_court_avg < 0
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {item.win_rate_vs_court_avg > 0 ? "+" : ""}
                      {item.win_rate_vs_court_avg.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      vs overall: {item.win_rate_vs_overall_avg > 0 ? "+" : ""}
                      {item.win_rate_vs_overall_avg.toFixed(1)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {results.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 text-sm text-gray-500">
            Showing {results.length} specialization records (minimum {minCases}{" "}
            cases)
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-4">
      <ExplanatorySection
        title="What This Shows"
        description="This analysis reveals which court divisions specialize in particular legal areas and how this specialization affects case outcomes. Use this to identify divisions with deep expertise in specific legal domains and understand their ruling tendencies."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h4
            className="font-medium mb-4"
            style={{ color: colors.primaryDark }}
          >
            Controls
          </h4>
          <Dropdown
            label="Minimum Cases"
            value={minCases}
            onChange={setMinCases}
            options={[
              { value: "1", label: "1 (Show All)" },
              { value: "5", label: "5 (Recommended)" },
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "50", label: "50" },
            ]}
          />
          <Dropdown
            label="Results Limit"
            value={limit}
            onChange={setLimit}
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
            ]}
          />
          <div className="mt-6 flex space-x-3">
            <Button label="Generate Analysis" onClick={() => {}} />
            {/* <Button label="Export" onClick={() => {}} primary={false} /> */}
          </div>
        </div>
        <div className="md:col-span-2">
          {isLoading ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-gray-500">
                Loading specialization data...
              </div>
            </div>
          ) : error ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-red-600">
                Error loading data: {String(error) || "Unknown error"}
              </div>
            </div>
          ) : data && data.data && data.data.results?.length > 0 ? (
            <SpecializationDataTable results={data.data.results} />
          ) : (
            <>
              <EmptyState
                message="Set your parameters and click 'Generate Analysis' to see which court divisions specialize in particular legal areas."
                ctaText="Recommended: Start with default parameters to get an overview."
              />
              <UsageInstructions instructions="Higher specialization scores indicate divisions that handle a significant portion of cases in this legal domain. Compare the appellant win rates to identify which specialized divisions tend to favor appellants vs. respondents. This can inform your litigation strategy when appearing before these divisions." />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
// const DivisionSpecializationTab = () => {
//   // const [range, setRange] = useState<{
//   //   limit: number;
//   //   min_cases: number;
//   // }>({ limit: 20, min_cases: 5 });
//   const [minCases, setMinCases] = useState("5");
//   const [limit, setLimit] = useState("20");
//   const { data, error, isLoading } = useGetDivisionSpecializationQuery({
//     limit: Number(limit),
//     min_cases: Number(minCases),
//   });
//   // console.log("This is data from court", data, error);
//   return (
//     <div className="py-4">
//       <ExplanatorySection
//         title="What This Shows"
//         description="This analysis reveals which court divisions specialize in particular legal areas and how this specialization affects case outcomes. Use this to identify divisions with deep expertise in specific legal domains and understand their ruling tendencies."
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
//           <h4
//             className="font-medium mb-4"
//             style={{ color: colors.primaryDark }}
//           >
//             Controls
//           </h4>

//           <Dropdown
//             label="Minimum Cases"
//             value={minCases}
//             onChange={setMinCases}
//             options={[
//               { value: "1", label: "1 (Show All)" },
//               { value: "5", label: "5 (Recommended)" },
//               { value: "10", label: "10" },
//               { value: "20", label: "20" },
//               { value: "50", label: "50" },
//             ]}
//           />

//           <Dropdown
//             label="Results Limit"
//             value={limit}
//             onChange={setLimit}
//             options={[
//               { value: "10", label: "10" },
//               { value: "20", label: "20" },
//               { value: "50", label: "50" },
//               { value: "100", label: "100" },
//             ]}
//           />

//           <div className="mt-6 flex space-x-3">
//             <Button label="Generate Analysis" onClick={() => {}} />
//             <Button label="Export" onClick={() => {}} primary={false} />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <EmptyState
//             message="Set your parameters and click 'Generate Analysis' to see which court divisions specialize in particular legal areas."
//             ctaText="Recommended: Start with default parameters to get an overview."
//           />

//           <UsageInstructions instructions="Higher specialization scores indicate divisions that handle a significant portion of cases in this legal domain. Compare the appellant win rates to identify which specialized divisions tend to favor appellants vs. respondents. This can inform your litigation strategy when appearing before these divisions." />
//         </div>
//       </div>
//     </div>
//   );
// };

const JurisdictionalAnalysisTab = () => {
  const [minCases, setMinCases] = useState("5");
  const [limit, setLimit] = useState("20");
  const [range, setRange] = useState<{
    limit: number;
    min_cases: number;
  }>({ limit: 20, min_cases: 5 });
  const {
    data: jurisdictonalAnalysisData,
    error,
    isLoading,
  } = useGetJurisdictionalAnalysisQuery(
    urlFilterAndBuilder({ limit, min_cases: minCases })
  );

  const mockData = {
    user_id: "user123",
    data: {
      total_courts: 12,
      courts_analyzed: 8,
      min_cases_threshold: 5,
      results: [
        {
          court_name: "Court of Appeal",
          division: "Civil Division",
          legal_areas: [
            {
              legal_area: "Contract Law",
              case_count: 125,
              pct_of_court_caseload: 32.5,
              pct_of_all_domain_cases: 28.7,
              specialization_index: 9.3,
              court_rank_in_domain: 1,
            },
            {
              legal_area: "Tort Law",
              case_count: 98,
              pct_of_court_caseload: 25.4,
              pct_of_all_domain_cases: 22.1,
              specialization_index: 5.6,
              court_rank_in_domain: 2,
            },
            // Additional legal areas...
          ],
        },
        // Additional courts...
      ],
    },
  };
  const data =
    jurisdictonalAnalysisData &&
    jurisdictonalAnalysisData?.data?.results?.length > 0
      ? jurisdictonalAnalysisData
      : mockData;
  // Component to render the jurisdictional analysis data
  const JurisdictionalAnalysisResults = ({
    analysisData,
  }: {
    analysisData: any;
  }) => {
    if (!analysisData?.data?.results) return null;

    const { total_courts, courts_analyzed, min_cases_threshold, results } =
      analysisData.data;

    return (
      <div className="space-y-6">
        {/* Summary Statistics */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3
            className="font-semibold text-lg mb-3"
            style={{ color: colors.primaryDark }}
          >
            Analysis Summary
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Courts:</span> {total_courts}
            </div>
            <div>
              <span className="font-medium">Courts Analyzed:</span>{" "}
              {courts_analyzed}
            </div>
            <div>
              <span className="font-medium">Min Cases Threshold:</span>{" "}
              {min_cases_threshold}
            </div>
          </div>
        </div>

        {/* Courts Results */}
        {results.map((court: any, courtIndex: number) => (
          <div
            key={courtIndex}
            className="bg-white border rounded-lg shadow-sm"
          >
            <div className="bg-gray-100 px-6 py-3 border-b">
              <h4
                className="font-semibold"
                style={{ color: colors.primaryDark }}
              >
                {court.court_name}
              </h4>
              {court.division && (
                <p className="text-sm text-gray-600 mt-1">{court.division}</p>
              )}
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Legal Area</th>
                      <th className="text-right py-2 font-medium">Cases</th>
                      <th className="text-right py-2 font-medium">
                        % of Court
                      </th>
                      <th className="text-right py-2 font-medium">
                        % of Domain
                      </th>
                      <th className="text-right py-2 font-medium">
                        Spec. Index
                      </th>
                      <th className="text-right py-2 font-medium">
                        Court Rank
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {court.legal_areas?.map((area: any, areaIndex: number) => (
                      <tr key={areaIndex} className="border-b border-gray-100">
                        <td className="py-3 font-medium">{area.legal_area}</td>
                        <td className="py-3 text-right">{area.case_count}</td>
                        <td className="py-3 text-right">
                          {area.pct_of_court_caseload}%
                        </td>
                        <td className="py-3 text-right">
                          {area.pct_of_all_domain_cases}%
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              area.specialization_index >= 8
                                ? "bg-green-100 text-green-800"
                                : area.specialization_index >= 5
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {area.specialization_index}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-medium">
                            #{area.court_rank_in_domain}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="py-4">
      <ExplanatorySection
        title="What This Shows"
        description="This analysis identifies which courts specialize in which legal areas, revealing their jurisdictional focus. Use this to understand which courts have the most experience with particular types of cases."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h4
            className="font-medium mb-4"
            style={{ color: colors.primaryDark }}
          >
            Controls
          </h4>
          <Dropdown
            label="Minimum Cases"
            value={minCases}
            onChange={setMinCases}
            options={[
              { value: "1", label: "1 (Show All)" },
              { value: "5", label: "5 (Recommended)" },
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "50", label: "50" },
            ]}
          />
          <Dropdown
            label="Results Limit"
            value={limit}
            onChange={setLimit}
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
            ]}
          />
          <div className="mt-6">
            <Button label="Generate Analysis" onClick={() => {}} />
          </div>
        </div>
        <div className="md:col-span-2">
          {data ? (
            <JurisdictionalAnalysisResults analysisData={data} />
          ) : (
            <>
              <EmptyState
                message="Generate an analysis to see which courts specialize in which legal areas and their jurisdictional focus."
                ctaText="Use this to understand which courts have the most experience with your case type."
              />
              <UsageInstructions instructions="Look for courts with high specialization indices in your case's legal domain, as these courts have significant experience in these matters. The percentage columns show both how important this domain is to the court and how dominant the court is within this domain." />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// const JurisdictionalAnalysisTab = () => {
//   const [range, setRange] = useState<{
//     limit: number;
//     min_cases: number;
//   }>({ limit: 20, min_cases: 5 });
//   const { data, error, isLoading } = useGetJurisdictionalAnalysisQuery(range);
//   const [minCases, setMinCases] = useState("5");
//   const [limit, setLimit] = useState("20");

//   return (
//     <div className="py-4">
//       <ExplanatorySection
//         title="What This Shows"
//         description="This analysis identifies which courts specialize in which legal areas, revealing their jurisdictional focus. Use this to understand which courts have the most experience with particular types of cases."
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
//           <h4
//             className="font-medium mb-4"
//             style={{ color: colors.primaryDark }}
//           >
//             Controls
//           </h4>

//           <Dropdown
//             label="Minimum Cases"
//             value={minCases}
//             onChange={setMinCases}
//             options={[
//               { value: "1", label: "1 (Show All)" },
//               { value: "5", label: "5 (Recommended)" },
//               { value: "10", label: "10" },
//               { value: "20", label: "20" },
//               { value: "50", label: "50" },
//             ]}
//           />

//           <Dropdown
//             label="Results Limit"
//             value={limit}
//             onChange={setLimit}
//             options={[
//               { value: "10", label: "10" },
//               { value: "20", label: "20" },
//               { value: "50", label: "50" },
//               { value: "100", label: "100" },
//             ]}
//           />

//           <div className="mt-6">
//             <Button label="Generate Analysis" onClick={() => {}} />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <EmptyState
//             message="Generate an analysis to see which courts specialize in which legal areas and their jurisdictional focus."
//             ctaText="Use this to understand which courts have the most experience with your case type."
//           />

//           <UsageInstructions instructions="Look for courts with high specialization indices in your case's legal domain, as these courts have significant experience in these matters. The percentage columns show both how important this domain is to the court and how dominant the court is within this domain." />
//         </div>
//       </div>
//     </div>
//   );
// };

const LegalIssueEvolutionTab = () => {
  const [court, setCourt] = useState("");
  const [startYear, setStartYear] = useState("1980");
  const [endYear, setEndYear] = useState("2025");
  const [legalArea, setLegalArea] = useState("");
  const [limit, setLimit] = useState("50");
  const [shouldGenerateAnalysis, setGenerateAnalysis] = useState(false);
  const compiledParams = urlFilterAndBuilder({
    court,
    start_year: startYear,
    end_year: endYear,
    legal_area: legalArea,
    limit,
  });
  const searchTerm = useDebounce(compiledParams, 900); // Reduced debounce time for better UX
  const {
    data: LegalIssueEvolutionData,
    error,
    isLoading,
  } = useGetLegalIssueEvolutionQuery(
    shouldGenerateAnalysis ? searchTerm : skipToken
  );

  const mockData: TLegalIssueEvolution = {
    user_id: "user123",
    data: {
      total_decades: 4,
      filters: {
        court_id: null,
        start_year: 2000,
        end_year: 2025,
        legal_area: "Criminal Law",
      },
      results: [
        {
          legal_area: "Criminal Law",
          decade: 2020,
          unique_issues: 45,
          case_count: 132,
          avg_ratios_per_issue: 2.3,
          trending_terms: [
            { word: "cybercrime", frequency: 28 },
            { word: "digital", frequency: 22 },
            { word: "jurisdiction", frequency: 18 },
            // Additional terms...
          ],
        },
        {
          legal_area: "Criminal Law",
          decade: 2010,
          unique_issues: 52,
          case_count: 187,
          avg_ratios_per_issue: 2.1,
          trending_terms: [
            { word: "terrorism", frequency: 34 },
            { word: "money", frequency: 29 },
            { word: "laundering", frequency: 25 },
            // Additional terms...
          ],
        },
        // Additional decades...
      ],
    },
  };
  const data = LegalIssueEvolutionData;
  // && LegalIssueEvolutionData?.data.results?.length > 0
  //   ? LegalIssueEvolutionData
  //   : mockData;
  // Component to render trending terms
  const TrendingTerms = ({
    trending_terms,
    decade,
  }: {
    trending_terms: TLegalIssueEvolution["data"]["results"][0]["trending_terms"];
    decade: TLegalIssueEvolution["data"]["results"][0]["decade"];
  }) => (
    <div className="mb-6">
      <h5 className="font-medium text-gray-800 mb-3">
        {decade}s Trending Terms
      </h5>
      <div className="flex flex-wrap gap-2">
        {trending_terms.slice(0, 10).map((term, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 flex items-center gap-1"
          >
            {term.word}
            <span className="text-xs bg-blue-200 px-1 rounded">
              {term.frequency}
            </span>
          </span>
        ))}
      </div>
    </div>
  );

  // Component to render decade statistics
  const DecadeCard = ({
    result,
  }: {
    result: TLegalIssueEvolution["data"]["results"][0];
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4
            className="text-xl font-semibold"
            style={{ color: colors.primaryDark }}
          >
            {result.decade}s
          </h4>
          <p className="text-gray-600">{result.legal_area}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {result.case_count}
          </div>
          <div className="text-sm text-gray-500">Total Cases</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-lg font-semibold text-gray-800">
            {result.unique_issues}
          </div>
          <div className="text-xs text-gray-600">Unique Issues</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-lg font-semibold text-gray-800">
            {result.avg_ratios_per_issue}
          </div>
          <div className="text-xs text-gray-600">Avg Ratios/Issue</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-lg font-semibold text-gray-800">
            {Math.round(result.case_count / result.unique_issues)}
          </div>
          <div className="text-xs text-gray-600">Cases/Issue</div>
        </div>
      </div>

      {result.trending_terms && result.trending_terms.length > 0 && (
        <TrendingTerms
          trending_terms={result.trending_terms}
          decade={result.decade}
        />
      )}
    </div>
  );

  // Component to render summary statistics
  const SummaryStats = ({ data }: { data: TLegalIssueEvolution["data"] }) => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: colors.primaryDark }}
      >
        Analysis Summary
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {data.total_decades}
          </div>
          <div className="text-sm text-gray-600">Decades Analyzed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {data.results.reduce((sum, r) => sum + r.case_count, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Cases</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {data.results.reduce((sum, r) => sum + r.unique_issues, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Issues</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {(
              data.results.reduce((sum, r) => sum + r.avg_ratios_per_issue, 0) /
              data.results.length
            ).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Avg Ratios</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white rounded border">
        <div className="text-sm text-gray-600">
          <strong>Filters Applied:</strong>
          {data.filters.court_id
            ? ` Court ID: ${data.filters.court_id}`
            : " All Courts"}{" "}
          |
          {data.filters.legal_area
            ? ` ${data.filters.legal_area}`
            : " All Legal Areas"}{" "}
          |{data.filters.start_year}-{data.filters.end_year}
        </div>
      </div>
    </div>
  );

  // Component to render evolution timeline
  const EvolutionTimeline = ({
    results,
  }: {
    results: TLegalIssueEvolution["data"]["results"];
  }) => (
    <div className="mb-6">
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: colors.primaryDark }}
      >
        Evolution Timeline
      </h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        {results.map((result, index) => (
          <div key={index} className="relative flex items-center mb-8">
            <div className="absolute left-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
            <div className="ml-12 flex-1">
              <div className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {result.decade}s
                    </h4>
                    <p className="text-sm text-gray-600">
                      {result.case_count} cases • {result.unique_issues} unique
                      issues
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">
                      {result.avg_ratios_per_issue} avg ratios
                    </div>
                  </div>
                </div>
                {result.trending_terms && result.trending_terms.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {result.trending_terms.slice(0, 5).map((term, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {term.word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-4">
      <ExplanatorySection
        title="What This Shows"
        description="This analysis tracks how legal issues and their terminology have evolved over time. Use this to understand historical trends in legal reasoning and identify emerging legal concepts."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h4
            className="font-medium mb-4"
            style={{ color: colors.primaryDark }}
          >
            Controls
          </h4>

          <Dropdown
            label="Court (Optional)"
            value={court}
            onChange={setCourt}
            options={[
              { value: "", label: "All Courts" },
              { value: "1", label: "Supreme Court" },
              { value: "2", label: "Court of Appeal" },
              { value: "3", label: "High Court" },
            ]}
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Year
              </label>
              <input
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Year
              </label>
              <input
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <Dropdown
            label="Legal Area (Optional)"
            value={legalArea}
            onChange={setLegalArea}
            options={[
              { value: "", label: "All Areas" },
              { value: "contract", label: "Contract Law" },
              { value: "tort", label: "Tort Law" },
              { value: "property", label: "Property Law" },
            ]}
          />

          <Dropdown
            label="Results Limit"
            value={limit}
            onChange={setLimit}
            options={[
              { value: "20", label: "20" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
            ]}
          />

          <div className="mt-6">
            <Button
              label="Generate Analysis"
              onClick={() => {
                setGenerateAnalysis(true);
              }}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Loading legal issue evolution data...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-red-800 mb-2">
                Error Loading Data
              </h4>
              <p className="text-red-600 text-sm">
                There was an error loading the legal issue evolution data.
                Please try again.
              </p>
            </div>
          )}

          {/* Data Display */}
          {data && data.data && (
            <div>
              <SummaryStats data={data.data} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: colors.primaryDark }}
                  >
                    Decade Analysis
                  </h3>
                  {data.data.results.map((result, index) => (
                    <DecadeCard key={index} result={result} />
                  ))}
                </div>

                <div>
                  <EvolutionTimeline results={data.data.results} />
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!data && !isLoading && !error && (
            <>
              <EmptyState
                message="Select your parameters and generate an analysis to see how legal issues and terminology have evolved over time."
                ctaText="Filter by court and legal area or view trends across all courts and domains."
              />

              <div className="mt-6">
                <h4
                  className="font-medium mb-2"
                  style={{ color: colors.primaryDark }}
                >
                  Trending Terms Preview
                </h4>
                <div className="flex flex-wrap gap-2 mt-4 opacity-50">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500">
                    Select parameters above
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500">
                    Generate analysis
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500">
                    View trending terms
                  </span>
                </div>
              </div>

              <UsageInstructions instructions="Look for shifts in terminology and issue frequency over time to understand how courts have changed their approach to particular legal questions. The trending terms section reveals key concepts that have gained importance in each era, which can inform how you frame arguments in historical context." />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
// const LegalIssueEvolutionTab = () => {
//   // const [range, setRange] = useState<{
//   //   limit: number;
//   //   min_cases: number;
//   // }>({ limit: 20, min_cases: 5 });
//   const [court, setCourt] = useState("");
//   const [startYear, setStartYear] = useState("1980");
//   const [endYear, setEndYear] = useState("2025");
//   const [legalArea, setLegalArea] = useState("");
//   const [limit, setLimit] = useState("50");
//   const { data, error, isLoading } = useGetLegalIssueEvolutionQuery({
//     court,
//     startYear,
//     endYear,
//     legalArea,
//     limit,
//   });
//   // console.log("This is data from court", data, error);
//   return (
//     <div className="py-4">
//       <ExplanatorySection
//         title="What This Shows"
//         description="This analysis tracks how legal issues and their terminology have evolved over time. Use this to understand historical trends in legal reasoning and identify emerging legal concepts."
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
//           <h4
//             className="font-medium mb-4"
//             style={{ color: colors.primaryDark }}
//           >
//             Controls
//           </h4>

//           <Dropdown
//             label="Court (Optional)"
//             value={court}
//             onChange={setCourt}
//             options={[
//               { value: "", label: "All Courts" },
//               { value: "1", label: "Supreme Court" },
//               { value: "2", label: "Court of Appeal" },
//               { value: "3", label: "High Court" },
//             ]}
//           />

//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Start Year
//               </label>
//               <input
//                 type="number"
//                 value={startYear}
//                 onChange={(e) => setStartYear(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 End Year
//               </label>
//               <input
//                 type="number"
//                 value={endYear}
//                 onChange={(e) => setEndYear(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           <Dropdown
//             label="Legal Area (Optional)"
//             value={legalArea}
//             onChange={setLegalArea}
//             options={[
//               { value: "", label: "All Areas" },
//               { value: "contract", label: "Contract Law" },
//               { value: "tort", label: "Tort Law" },
//               { value: "property", label: "Property Law" },
//             ]}
//           />

//           <Dropdown
//             label="Results Limit"
//             value={limit}
//             onChange={setLimit}
//             options={[
//               { value: "20", label: "20" },
//               { value: "50", label: "50" },
//               { value: "100", label: "100" },
//             ]}
//           />

//           <div className="mt-6">
//             <Button label="Generate Analysis" onClick={() => {}} />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <EmptyState
//             message="Select your parameters and generate an analysis to see how legal issues and terminology have evolved over time."
//             ctaText="Filter by court and legal area or view trends across all courts and domains."
//           />

//           <div className="mt-6">
//             <h4
//               className="font-medium mb-2"
//               style={{ color: colors.primaryDark }}
//             >
//               Trending Terms Preview
//             </h4>
//             <div className="flex flex-wrap gap-2 mt-4 opacity-50">
//               <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500">
//                 Select parameters above
//               </span>
//               <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500">
//                 Generate analysis
//               </span>
//               <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500">
//                 View trending terms
//               </span>
//             </div>
//           </div>

//           <UsageInstructions instructions="Look for shifts in terminology and issue frequency over time to understand how courts have changed their approach to particular legal questions. The trending terms section reveals key concepts that have gained importance in each era, which can inform how you frame arguments in historical context." />
//         </div>
//       </div>
//     </div>
//   );
// };

// const DecisionPatternsTab = () => {
//   const [court_id, setCourt] = useState("");
//   const [start_year, setStartYear] = useState("1980");
//   const [end_year, setEndYear] = useState("2025");
//   const [legal_area, setLegalArea] = useState("");
//   const [limit, setLimit] = useState("50");
//   const {} = useGetDecisionPatternsQuery({
//     start_year: Number(start_year),
//     court_id: Number(court_id),
//     end_year: Number(end_year),
//     legal_area,
//     limit: Number(limit),
//   });
//   return (
//     <div className="py-4">
//       <ExplanatorySection
//         title="What This Shows"
//         description="This analysis reveals consistency patterns in court decisions over time and across legal domains. Use this to identify trends in judicial approach and potential shifts in legal interpretation."
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
//           <h4
//             className="font-medium mb-4"
//             style={{ color: colors.primaryDark }}
//           >
//             Controls
//           </h4>

//           <Dropdown
//             label="Court"
//             value={court_id}
//             onChange={setCourt}
//             options={[
//               { value: "", label: "All Courts" },
//               { value: "1", label: "Supreme Court" },
//               { value: "2", label: "Court of Appeal" },
//               { value: "3", label: "High Court" },
//             ]}
//           />

//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Start Year
//               </label>
//               <input
//                 type="number"
//                 value={start_year}
//                 onChange={(e) => setStartYear(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 End Year
//               </label>
//               <input
//                 type="number"
//                 value={end_year}
//                 onChange={(e) => setEndYear(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           <Dropdown
//             label="Legal Area"
//             value={legal_area}
//             onChange={setLegalArea}
//             options={[
//               { value: "", label: "All Areas" },
//               { value: "contract", label: "Contract Law" },
//               { value: "tort", label: "Tort Law" },
//               { value: "property", label: "Property Law" },
//             ]}
//           />

//           <Dropdown
//             label="Results Limit"
//             value={limit}
//             onChange={setLimit}
//             options={[
//               { value: "20", label: "20" },
//               { value: "50", label: "50" },
//               { value: "100", label: "100" },
//             ]}
//           />

//           <div className="mt-6">
//             <Button label="Generate Analysis" onClick={() => {}} />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           <EmptyState
//             message="Generate an analysis to see patterns in court decisions over time and assess judicial consistency."
//             ctaText="Select a court and legal area to analyze decision patterns relevant to your case."
//           />

//           <div className="mt-6">
//             <h4
//               className="font-medium mb-2"
//               style={{ color: colors.primaryDark }}
//             >
//               Win Rate Trends Preview
//             </h4>
//             <div className="mt-4 p-4 border rounded-md bg-gray-50">
//               <div className="text-center text-gray-500 py-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-12 w-12 mx-auto mb-2 text-gray-300"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                   />
//                 </svg>
//                 <p>Win rate trends will appear here after analysis</p>
//               </div>
//             </div>
//           </div>

//           <UsageInstructions instructions="Review the consistency of win rates over time to assess how predictable a court's decisions are in your legal area. Sudden changes in win rates may indicate shifts in judicial approach or legal doctrine. The standard deviation column shows how consistent the court's decisions have been." />
//         </div>
//       </div>
//     </div>
//   );
// };

// const PrecedentInfluenceTab = () => {
//   const [citingCourt, setCitingCourt] = useState("");
//   const [citedCourt, setCitedCourt] = useState("");
//   const [minCitations, setMinCitations] = useState("5");
//   const [limit, setLimit] = useState("20");
//   const compiledUrl = urlFilterAndBuilder({
//     limit: limit,
//     court_id: citingCourt,
//     cited_court_id: citedCourt,
//     min_citations: minCitations,
//   });
//   const { data, isError, error, isLoading, isFetching } =
//     useGetPrecedentInfluenceQuery(compiledUrl);

//   return (
//     <div className="py-4">
//       <ExplanatorySection
//         title="What This Shows"
//         description="This analysis reveals how courts influence each other through precedent citations. Use this to understand the flow of legal doctrine between courts and identify which courts have the most precedential impact."
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
//           <h4
//             className="font-medium mb-4"
//             style={{ color: colors.primaryDark }}
//           >
//             Controls
//           </h4>

//           <Dropdown
//             label="Citing Court"
//             value={citingCourt}
//             onChange={setCitingCourt}
//             options={[
//               { value: "", label: "All Courts" },
//               { value: "1", label: "Court of Appeal" },
//               { value: "2", label: "Supreme Court" },
//               { value: "3", label: "High Court" },
//             ]}
//           />

//           <Dropdown
//             label="Cited Court"
//             value={citedCourt}
//             onChange={setCitedCourt}
//             options={[
//               { value: "", label: "All Courts" },
//               { value: "1", label: "Court of Appeal" },
//               { value: "2", label: "Supreme Court" },
//               { value: "3", label: "High Court" },
//             ]}
//           />

//           <Dropdown
//             label="Minimum Citations"
//             value={minCitations}
//             onChange={setMinCitations}
//             options={[
//               { value: "1", label: "1 (Show All)" },
//               { value: "5", label: "5 (Recommended)" },
//               { value: "10", label: "10" },
//               { value: "20", label: "20" },
//             ]}
//           />

//           <Dropdown
//             label="Results Limit"
//             value={limit}
//             onChange={setLimit}
//             options={[
//               { value: "10", label: "10" },
//               { value: "20", label: "20" },
//               { value: "50", label: "50" },
//             ]}
//           />

//           <div className="mt-6">
//             <Button label="Generate Analysis" onClick={() => {}} />
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           {isLoading || isFetching ? (
//             <DashboardSkeletonLoader />
//           ) : (
//             <EmptyState
//               message="Generate an analysis to see how courts influence each other through precedent citations."
//               ctaText="Try selecting a specific court pair, like Court of Appeal citing Supreme Court."
//             />
//           )}

//           <div className="mt-6">
//             <h4
//               className="font-medium mb-2"
//               style={{ color: colors.primaryDark }}
//             >
//               Citation Treatment Breakdown Preview
//             </h4>
//             <div className="p-4 border rounded-md bg-gray-50">
//               <div className="text-center text-gray-500 py-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-12 w-12 mx-auto mb-2 text-gray-300"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
//                   />
//                 </svg>
//                 <p>
//                   Citation treatment breakdown will appear here after analysis
//                 </p>
//               </div>
//             </div>
//           </div>

//           <UsageInstructions instructions="Courts with high citation counts have strong influence over other courts' decisions. Review the treatment breakdown to see how citations are used—'Applied' and 'Followed' treatments indicate strong positive influence, while 'Distinguished' or 'Not Followed' suggest limitations. When preparing arguments, prioritize precedents from courts that strongly influence your target court." />
//         </div>
//       </div>
//     </div>
//   );
// };

// Main dashboard component

const DecisionPatternsTab = () => {
  const [court_id, setCourt] = useState("");
  const [start_year, setStartYear] = useState("1980");
  const [end_year, setEndYear] = useState("2025");
  const [legal_area, setLegalArea] = useState("");
  const [limit, setLimit] = useState("50");

  // Mock data for demonstration - replace with actual API call
  const mockData = {
    user_id: "user123",
    data: {
      count: 18,
      filters: {
        court_id: 2,
        start_year: 2015,
        end_year: 2025,
        legal_area: null,
      },
      results: [
        {
          court_name: "Court of Appeal",
          division: "Criminal Division",
          legal_area: "Criminal Law",
          total_years: 10,
          total_cases: 428,
          overall_appellant_win_pct: 32.5,
          win_pct_stddev: 4.7,
          yearly_trends: [
            {
              year: 2025,
              cases: 42,
              win_pct: 37.5,
              yoy_change: 2.1,
            },
            {
              year: 2024,
              cases: 45,
              win_pct: 35.4,
              yoy_change: 1.8,
            },
            {
              year: 2023,
              cases: 38,
              win_pct: 33.6,
              yoy_change: -1.2,
            },
          ],
        },
        {
          court_name: "Court of Appeal",
          division: "Civil Division",
          legal_area: "Contract Law",
          total_years: 8,
          total_cases: 312,
          overall_appellant_win_pct: 41.2,
          win_pct_stddev: 3.8,
          yearly_trends: [
            {
              year: 2025,
              cases: 35,
              win_pct: 43.1,
              yoy_change: 3.2,
            },
            {
              year: 2024,
              cases: 40,
              win_pct: 39.9,
              yoy_change: -0.8,
            },
          ],
        },
      ],
    },
  };
  const searchTerms = urlFilterAndBuilder({
    start_year: Number(start_year),
    court_id: Number(court_id),
    end_year: Number(end_year),
    legal_area,
    limit: Number(limit),
  });
  const compiledParams = useDebounce(searchTerms, 900);
  const { data: decisionPatternData, isLoading } =
    useGetDecisionPatternsQuery(compiledParams);
  const data =
    decisionPatternData && decisionPatternData?.data?.results?.length > 0
      ? decisionPatternData
      : mockData; // Fallback to mock data
  const DecisionPatternsResults = ({
    data,
  }: {
    data: TDecisionPatterns | undefined;
  }) => {
    if (!data?.data?.results?.length) {
      return (
        <EmptyState
          message="Generate an analysis to see patterns in court decisions over time and assess judicial consistency."
          ctaText="Select a court and legal area to analyze decision patterns relevant to your case."
        />
      );
    }

    const results = data.data.results;

    return (
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4
            className="font-medium mb-4"
            style={{ color: colors.primaryDark }}
          >
            Analysis Summary
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: colors.primaryDark }}
              >
                {data.data.count}
              </div>
              <div className="text-sm text-gray-600">Patterns Found</div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: colors.primaryDark }}
              >
                {results
                  .reduce((sum, r) => sum + r.total_cases, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Cases</div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: colors.primaryDark }}
              >
                {Math.round(
                  results.reduce(
                    (sum, r) => sum + r.overall_appellant_win_pct,
                    0
                  ) / results.length
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Avg Win Rate</div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: colors.primaryDark }}
              >
                {Math.round(
                  (results.reduce((sum, r) => sum + r.win_pct_stddev, 0) /
                    results.length) *
                    10
                ) / 10}
              </div>
              <div className="text-sm text-gray-600">Avg Consistency</div>
            </div>
          </div>
        </div>

        {/* Individual Court Patterns */}
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h4
                    className="font-medium"
                    style={{ color: colors.primaryDark }}
                  >
                    {result.court_name}
                  </h4>
                  <div className="text-sm text-gray-600 mt-1">
                    {result.division} • {result.legal_area}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-lg font-bold"
                    style={{ color: colors.primaryDark }}
                  >
                    {result.overall_appellant_win_pct}%
                  </div>
                  <div className="text-sm text-gray-600">Overall Win Rate</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Key Metrics */}
                <div className="lg:col-span-1">
                  <h5
                    className="font-medium mb-3"
                    style={{ color: colors.primaryDark }}
                  >
                    Key Metrics
                  </h5>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Cases:</span>
                      <span className="font-medium">
                        {result.total_cases.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Years Analyzed:</span>
                      <span className="font-medium">{result.total_years}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consistency (σ):</span>
                      <span
                        className={`font-medium ${
                          result.win_pct_stddev < 5
                            ? "text-green-600"
                            : result.win_pct_stddev > 10
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {result.win_pct_stddev}%
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-xs text-gray-500 mb-1">
                        Consistency Rating:
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          result.win_pct_stddev < 5
                            ? "text-green-600"
                            : result.win_pct_stddev > 10
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {result.win_pct_stddev < 5
                          ? "Very Consistent"
                          : result.win_pct_stddev > 10
                          ? "Variable"
                          : "Moderately Consistent"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Yearly Trends Table */}
                <div className="lg:col-span-2">
                  <h5
                    className="font-medium mb-3"
                    style={{ color: colors.primaryDark }}
                  >
                    Recent Yearly Trends
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-2 text-left font-medium text-gray-700">
                            Year
                          </th>
                          <th className="px-3 py-2 text-right font-medium text-gray-700">
                            Cases
                          </th>
                          <th className="px-3 py-2 text-right font-medium text-gray-700">
                            Win Rate
                          </th>
                          <th className="px-3 py-2 text-right font-medium text-gray-700">
                            Change
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearly_trends
                          .slice(0, 5)
                          .map((trend, tIndex) => (
                            <tr
                              key={tIndex}
                              className="border-b border-gray-100"
                            >
                              <td className="px-3 py-2 font-medium">
                                {trend.year}
                              </td>
                              <td className="px-3 py-2 text-right">
                                {trend.cases}
                              </td>
                              <td className="px-3 py-2 text-right font-medium">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                                    trend.win_pct >
                                    result.overall_appellant_win_pct
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {trend.win_pct}%
                                </span>
                              </td>
                              <td className="px-3 py-2 text-right">
                                <span
                                  className={`inline-flex items-center text-xs ${
                                    trend.yoy_change > 0
                                      ? "text-green-600"
                                      : trend.yoy_change < 0
                                      ? "text-red-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {trend.yoy_change > 0 ? "+" : ""}
                                  {trend.yoy_change}%
                                  {trend.yoy_change > 0
                                    ? " ↗"
                                    : trend.yoy_change < 0
                                    ? " ↘"
                                    : " →"}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Trend Indicator */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pattern Assessment:</span>
                  <span
                    className={`font-medium ${
                      result.yearly_trends[0]?.yoy_change > 2
                        ? "text-green-600"
                        : result.yearly_trends[0]?.yoy_change < -2
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {result.yearly_trends[0]?.yoy_change > 2
                      ? "Improving trend for appellants"
                      : result.yearly_trends[0]?.yoy_change < -2
                      ? "Declining trend for appellants"
                      : "Stable pattern"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="py-4">
      <ExplanatorySection
        title="What This Shows"
        description="This analysis reveals consistency patterns in court decisions over time and across legal domains. Use this to identify trends in judicial approach and potential shifts in legal interpretation."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h4
            className="font-medium mb-4"
            style={{ color: colors.primaryDark }}
          >
            Controls
          </h4>

          <Dropdown
            label="Court"
            value={court_id}
            onChange={setCourt}
            options={[
              { value: "", label: "All Courts" },
              { value: "1", label: "Supreme Court" },
              { value: "2", label: "Court of Appeal" },
              { value: "3", label: "High Court" },
            ]}
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Year
              </label>
              <input
                type="number"
                value={start_year}
                onChange={(e) => setStartYear(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Year
              </label>
              <input
                type="number"
                value={end_year}
                onChange={(e) => setEndYear(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <Dropdown
            label="Legal Area"
            value={legal_area}
            onChange={setLegalArea}
            options={[
              { value: "", label: "All Areas" },
              { value: "contract", label: "Contract Law" },
              { value: "tort", label: "Tort Law" },
              { value: "property", label: "Property Law" },
            ]}
          />

          <Dropdown
            label="Results Limit"
            value={limit}
            onChange={setLimit}
            options={[
              { value: "20", label: "20" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
            ]}
          />

          <div className="mt-6">
            <Button label="Generate Analysis" onClick={() => {}} />
          </div>
        </div>

        <div className="md:col-span-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading decision patterns...</p>
              </div>
            </div>
          ) : (
            <DecisionPatternsResults data={data} />
          )}

          <UsageInstructions instructions="Review the consistency of win rates over time to assess how predictable a court's decisions are in your legal area. Sudden changes in win rates may indicate shifts in judicial approach or legal doctrine. The standard deviation column shows how consistent the court's decisions have been." />
        </div>
      </div>
    </div>
  );
};
const PrecedentInfluenceTab = () => {
  const [citingCourt, setCitingCourt] = useState("");
  const [citedCourt, setCitedCourt] = useState("");
  const [minCitations, setMinCitations] = useState("5");
  const [limit, setLimit] = useState("20");
  const compiledUrl = urlFilterAndBuilder({
    limit: limit,
    court_id: citingCourt,
    cited_court_id: citedCourt,
    min_citations: minCitations,
  });
  const {
    data: PrecedentInfluencedata,
    isError,
    error,
    isLoading,
    isFetching,
  } = useGetPrecedentInfluenceQuery(compiledUrl);
  const { data: allCourts } = useGetAllCourtsQuery("");
  // console.log("this is the data for all courts", allCourts);
  // console.log(
  //   "This is data from Precedent Influence Tab",
  //   PrecedentInfluencedata,
  //   error
  // );
  const data = {
    user_id: "user123",
    data: {
      count: 12,
      min_citations_threshold: 5,
      filters: {
        court_id: null,
        cited_court_id: 1,
      },
      results: [
        {
          citing_court: "Court of Appeal",
          cited_court: "Supreme Court",
          citing_cases: 187,
          cited_cases: 95,
          total_citations: 312,
          pct_of_all_citations: 42.8,
          reciprocal_citations: 22,
          citing_court_id: 2,
          cited_court_id: 1,
          treatment_breakdown: [
            {
              treatment: "FOLLOWED",
              count: 156,
              percentage: 50.0,
            },
            {
              treatment: "DISTINGUISHED",
              count: 87,
              percentage: 27.9,
            },
            {
              treatment: "DISCUSSED",
              count: 42,
              percentage: 13.5,
            },
            {
              treatment: "CRITICIZED",
              count: 27,
              percentage: 8.6,
            },
          ],
        },
        // Additional results...
      ],
    },
  };
  const renderTreatmentBreakdown = (
    treatmentBreakdown: TPrecedentInfluence["data"]["results"][0]["treatment_breakdown"]
  ) => {
    const getTreatmentColor = (treatment: string) => {
      switch (treatment) {
        case "FOLLOWED":
        case "APPLIED":
          return "bg-green-100 text-green-800";
        case "DISTINGUISHED":
        case "NOT FOLLOWED":
          return "bg-red-100 text-red-800";
        case "DISCUSSED":
        case "MENTIONED":
          return "bg-blue-100 text-blue-800";
        case "CRITICIZED":
          return "bg-orange-100 text-orange-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <div className="space-y-2">
        {treatmentBreakdown.map((treatment, index) => (
          <div key={index} className="flex justify-between items-center">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getTreatmentColor(
                treatment.treatment
              )}`}
            >
              {treatment.treatment}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{treatment.count}</span>
              <span className="text-xs text-gray-500">
                ({treatment.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderResultsTable = () => {
    if (!data?.data?.results?.length) return null;

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3
            className="text-lg font-medium"
            style={{ color: colors.primaryDark }}
          >
            Precedent Influence Analysis
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Found {data.data.count} court relationships (minimum{" "}
            {data.data.min_citations_threshold} citations)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Court Relationship
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Citation Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Influence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Treatment Breakdown
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.data.results.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {result.citing_court}
                      </div>
                      <div className="text-sm text-gray-500">
                        citing {result.cited_court}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>
                        <strong>{result.total_citations}</strong> total
                        citations
                      </div>
                      <div className="text-gray-600">
                        {result.citing_cases} citing cases •{" "}
                        {result.cited_cases} cited cases
                      </div>
                      {result.reciprocal_citations > 0 && (
                        <div className="text-blue-600 text-xs">
                          {result.reciprocal_citations} reciprocal citations
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {result.pct_of_all_citations}%
                      </div>
                      <div className="text-gray-500 text-xs">
                        of all citations
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      {renderTreatmentBreakdown(result.treatment_breakdown)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  const COLORS = [
    "#567c8a",
    // "#0088FE",
    "#0E3165",
    // "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];
  return (
    <div className="py-4">
      <ExplanatorySection
        title="What This Shows"
        description="This analysis reveals how courts influence each other through precedent citations. Use this to understand the flow of legal doctrine between courts and identify which courts have the most precedential impact."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h4
            className="font-medium mb-4"
            style={{ color: colors.primaryDark }}
          >
            Controls
          </h4>

          <Dropdown
            label="Citing Court"
            value={citingCourt}
            onChange={setCitingCourt}
            options={[
              { value: "", label: "All Courts" },
              { value: "1", label: "Court of Appeal" },
              { value: "2", label: "Supreme Court" },
              { value: "3", label: "High Court" },
            ]}
          />

          <Dropdown
            label="Cited Court"
            value={citedCourt}
            onChange={setCitedCourt}
            options={
              allCourts?.courts && allCourts?.courts?.length > 0
                ? allCourts?.courts?.map((court) => ({
                    value: court?.id?.toString(),
                    label: court.name,
                  }))
                : [
                    { value: "1", label: "Court of Appeal" },
                    { value: "2", label: "Supreme Court" },
                    { value: "3", label: "High Court" },
                  ]
            }
          />

          <Dropdown
            label="Minimum Citations"
            value={minCitations}
            onChange={setMinCitations}
            options={[
              { value: "1", label: "1 (Show All)" },
              { value: "5", label: "5 (Recommended)" },
              { value: "10", label: "10" },
              { value: "20", label: "20" },
            ]}
          />

          <Dropdown
            label="Results Limit"
            value={limit}
            onChange={setLimit}
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "50", label: "50" },
            ]}
          />

          <div className="mt-6">
            <Button label="Generate Analysis" onClick={() => {}} />
          </div>
        </div>

        <div className="md:col-span-2">
          {isLoading || isFetching ? (
            <DashboardSkeletonLoader />
          ) : data?.data?.results?.length ? (
            <>
              {renderResultsTable()}

              <div className="mt-6">
                <h4
                  className="font-medium mb-2"
                  style={{ color: colors.primaryDark }}
                >
                  Citation Treatment Summary
                </h4>
                <div className="p-4 border rounded-md bg-blue-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        {data.data.results.reduce(
                          (sum, result) =>
                            sum +
                            (result.treatment_breakdown.find(
                              (t) => t.treatment === "FOLLOWED"
                            )?.count || 0),
                          0
                        )}
                      </div>
                      <div className="text-xs text-gray-600">Followed</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-600">
                        {data.data.results.reduce(
                          (sum, result) =>
                            sum +
                            (result.treatment_breakdown.find(
                              (t) => t.treatment === "DISTINGUISHED"
                            )?.count || 0),
                          0
                        )}
                      </div>
                      <div className="text-xs text-gray-600">Distinguished</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {data.data.results.reduce(
                          (sum, result) =>
                            sum +
                            (result.treatment_breakdown.find(
                              (t) => t.treatment === "DISCUSSED"
                            )?.count || 0),
                          0
                        )}
                      </div>
                      <div className="text-xs text-gray-600">Discussed</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-600">
                        {data.data.results.reduce(
                          (sum, result) =>
                            sum +
                            (result.treatment_breakdown.find(
                              (t) => t.treatment === "CRITICIZED"
                            )?.count || 0),
                          0
                        )}
                      </div>
                      <div className="text-xs text-gray-600">Criticized</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Treatment Breakdown Chart */}
              <div className="bg-white rounded-lg shadow-md p-6 col-span-4">
                <h2 className="text-xl font-semibold text-lexblue font-gilda_Display mb-4">
                  Treatment Breakdown
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart className="w-[70%]">
                    <Pie
                      data={data.data.results[0].treatment_breakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      //   labelLine={false}
                      label={(entry) => `${entry.treatment}: ${entry.count}`}
                      //   label={({ name, value }:{name:string;value:number}) => `${name}: ${value}`}
                      outerRadius={80}
                      //   fill="#8884d8"
                      fill="#0E3165"
                      dataKey="count"
                      //   className="fill-lexblue"
                    >
                      {data.data.results[0].treatment_breakdown.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <EmptyState
              message="Generate an analysis to see how courts influence each other through precedent citations."
              ctaText="Try selecting a specific court pair, like Court of Appeal citing Supreme Court."
            />
          )}

          <UsageInstructions instructions="Courts with high citation counts have strong influence over other courts' decisions. Review the treatment breakdown to see how citations are used—'Applied' and 'Followed' treatments indicate strong positive influence, while 'Distinguished' or 'Not Followed' suggest limitations. When preparing arguments, prioritize precedents from courts that strongly influence your target court." />
        </div>
      </div>
    </div>
  );
};

const CourtAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState("division");

  const tabs = [
    { id: "division", label: "Division Specialization" },
    { id: "jurisdictional", label: "Jurisdictional Analysis" },
    { id: "evolution", label: "Legal Issue Evolution" },
    { id: "decisions", label: "Decision Patterns" },
    { id: "precedent", label: "Precedent Influence" },
  ];

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "division":
        return <DivisionSpecializationTab />;
      case "jurisdictional":
        return <JurisdictionalAnalysisTab />;
      case "evolution":
        return <LegalIssueEvolutionTab />;
      case "decisions":
        return <DecisionPatternsTab />;
      case "precedent":
        return <PrecedentInfluenceTab />;
      default:
        return <DivisionSpecializationTab />;
    }
  };
  //  if (isLoading) {
  //     // Early return for loading state
  //     return (
  //       <Fragment>
  //         <Navbar />
  //         {/* Removed isH1Visible as it's always false*/}
  //         <div className=" flex-1 flex flex-col justify-center items-center py-6 w-full md:max-w-[772px] mx-auto">
  //           <DashboardSkeletonLoader />
  //           {/* <Loader variant="classic" size={80} /> */}
  //         </div>
  //       </Fragment>
  //     );
  //   }

  //   if (!data && isError) {
  //     // Simplified error check
  //     return (
  //       <Fragment>
  //         <Navbar />
  //         <ErrorView404
  //           caption="No matching legal resources found"
  //           desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
  //         />
  //       </Fragment>
  //     );
  //   }
  return (
    <Fragment>
      <Navbar />

      {/* <Container className=""> */}
      <div className="flex  py-4 w-full md:max-w-[900px] mx-auto">
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header
            className="py-4"
            style={{ backgroundColor: colors.primaryDark }}
          >
            <div className="container mx-auto px-4">
              <h1 className="text-xx font-bold text-white font-gilda_Display">
                Court Analytics Dashboard
              </h1>
              <p className="text-white opacity-80 text-sm mt-1 font-cabin">
                Insight tools for legal professionals
              </p>
            </div>
          </header>

          {/* Tab Navigation */}
          <div
            className="bg-white shadow-sm"
            // style={{ borderBottom: `3px solid ${colors.brightCyan}` }}
          >
            <div className="relative container mx-auto px-4">
              <div className=" flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 font-medium uppercase text-sm font-poppins whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "border-b-2 border-b-[#245b91] text-black/80"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    // style={{
                    //   borderColor:
                    //     activeTab === tab.id
                    //       ? colors.brightYellow
                    //       : "transparent",
                    //   color:
                    //     activeTab === tab.id ? colors.primaryDark : "#718096",
                    //   fontWeight: activeTab === tab.id ? "600" : "400",
                    // }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="pl- 16 border-b z- [999] border-solid border-stone-300 border-opacity-50 absolute left-0 top-[44px] w-full  max-w-[1000px]"></div>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="container mx-auto px-4 py-6">
            {renderTabContent()}
          </main>

          {/* Footer */}
          <footer className="bg-white py-4 border-t border-gray-200 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleString()}
                  {/* Last updated: August 16, 2025 */}
                </div>
                <div>
                  <Button
                    label="Help & Documentation"
                    onClick={() => {}}
                    primary={false}
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>{" "}
      </div>
      {/* </Container> */}
    </Fragment>
  );
};

export default CourtAnalyticsDashboard;
