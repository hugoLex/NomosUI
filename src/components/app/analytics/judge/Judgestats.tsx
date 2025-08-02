import { useQueryHandler } from "@app/hooks";
import { JudgeProfileResponseT } from "@app/types";
import React from "react";
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

const JudicialMetricsDashboard = ({
  judicialMetrics,
  statistics,
}: {
  judicialMetrics: JudgeProfileResponseT["judicial_metrics"];
  statistics: JudgeProfileResponseT["judge_info"]["statistics"];
}) => {
  const { searchParams, close, removeQueryParam, UpdateUrlParams } =
    useQueryHandler();
  const judgeName = searchParams.get("judge");
  // Sample data based on your interface
  //   const judicialMetrics = {
  //     concurrence_rate: 90,
  //     dissent_rate: 0,
  //     role_distribution: {
  //       lead_judge: 1,
  //       trial_judge: 0,
  //       amicus: 0,
  //       appellate: 0,
  //       concurred: 9,
  //       dissented: 0,
  //     },
  //   };

  //   const statistics = {
  //     total_cases: 10,
  //     total_concurred: 9,
  //     total_dissented: 0,
  //     total_lead_judgments: 1,
  //     total_trial_judge: 0,
  //     total_amicus: 0,
  //     total_appellate: 0,
  //   };

  // Prepare data for charts
  const roleDistributionData = [
    { name: "Lead Judge", value: judicialMetrics.role_distribution.lead_judge },
    {
      name: "Trial Judge",
      value: judicialMetrics.role_distribution.trial_judge,
    },
    { name: "Amicus", value: judicialMetrics.role_distribution.amicus },
    { name: "Appellate", value: judicialMetrics.role_distribution.appellate },
    { name: "Concurred", value: judicialMetrics.role_distribution.concurred },
    { name: "Dissented", value: judicialMetrics.role_distribution.dissented },
  ].filter((item) => item.value > 0);

  const statisticsData = [
    { name: "Total Cases", value: statistics.total_cases },
    { name: "Concurred", value: statistics.total_concurred },
    { name: "Dissented", value: statistics.total_dissented },
    { name: "Lead Judgments", value: statistics.total_lead_judgments },
    { name: "Trial Judge", value: statistics.total_trial_judge },
    { name: "Amicus", value: statistics.total_amicus },
    { name: "Appellate", value: statistics.total_appellate },
  ];

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

  const MetricCard = ({
    title,
    value,
    subtitle,
    color = "blue",
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    color: string;
  }) => (
    <div
      className="bg-white rounded-lg shadow-md p-6 border-l-4 relative group cursor-pointer"
      style={{ borderLeftColor: color }}
    >
      <h3 className="text-[1.125rem] font-semibold text-lexblue mb- 2">
        {value}
      </h3>
      <div className="text-sm text-powder_blue font-cabin mb-1">{title}</div>
      {subtitle && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-lexblue text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {subtitle}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-red-800"></div>
        </div>
      )}
    </div>
    // <div
    //   className="bg-white rounded-lg shadow-md p-6 border-l-4"
    //   style={{ borderLeftColor: color }}
    // >
    //   <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    //   <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    //   {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    // </div>
  );

  return (
    <div className="h-screen bg-gray-50 p-6 pt-[50px] pb-[100px] overflow-y-scroll">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-lexblue mb-[50px] font-gilda_Display">
          {judgeName}
        </h1>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Concurrence Rate"
            value={`${judicialMetrics.concurrence_rate}%`}
            subtitle="Rate of agreement with majority"
            color="#10B981"
          />
          <MetricCard
            title="Dissent Rate"
            value={`${judicialMetrics.dissent_rate}%`}
            subtitle="Rate of disagreement"
            color="#EF4444"
          />
          <MetricCard
            title="Total Cases"
            value={statistics.total_cases}
            subtitle="Cases handled"
            color="#3B82F6"
          />
          <MetricCard
            title="Lead Judgments"
            value={statistics.total_lead_judgments}
            subtitle="Cases led as primary judge"
            color="#8B5CF6"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-8">
          {/* Role Distribution Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-4">
            <h2 className="text-xl font-semibold text-lexblue font-gilda_Display mb-4">
              Role Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart className="w-[70%]">
                <Pie
                  data={roleDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  //   labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  //   label={({ name, value }:{name:string;value:number}) => `${name}: ${value}`}
                  outerRadius={80}
                  //   fill="#8884d8"
                  fill="#0E3165"
                  dataKey="value"
                  //   className="fill-lexblue"
                >
                  {roleDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Statistics Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-3">
            <h2 className="text-xl font-semibold text-lexblue mb-4 font-gilda_Display">
              Case Statistics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statisticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" className="fill-lexblue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Statistics Table */}
        <div className="bg-white rounded-lg shadow-md p-6 ">
          <h2 className="text-xl font-semibold text-lexblue mb-4 font-gilda_Display">
            Detailed Statistics
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total Cases
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {statistics.total_cases}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    100%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Concurred Cases
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {statistics.total_concurred}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(
                      (statistics.total_concurred / statistics.total_cases) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Dissented Cases
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {statistics.total_dissented}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(
                      (statistics.total_dissented / statistics.total_cases) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Lead Judgments
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {statistics.total_lead_judgments}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(
                      (statistics.total_lead_judgments /
                        statistics.total_cases) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Trial Judge Cases
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {statistics.total_trial_judge}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(
                      (statistics.total_trial_judge / statistics.total_cases) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Amicus Cases
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {statistics.total_amicus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(
                      (statistics.total_amicus / statistics.total_cases) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Appellate Cases
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {statistics.total_appellate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(
                      (statistics.total_appellate / statistics.total_cases) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudicialMetricsDashboard;
