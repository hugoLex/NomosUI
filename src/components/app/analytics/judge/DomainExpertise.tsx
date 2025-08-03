import React, { useState, useMemo } from "react";
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
import {
  Search,
  Scale,
  BookOpen,
  FileText,
  TrendingUp,
  Filter,
} from "lucide-react";
import { useQueryHandler } from "@app/hooks";
import { useGetJudgeAnalyticsQuery } from "@app/store/services/analyticsSlice";
import { skipToken } from "@reduxjs/toolkit/query";
type TdomainExpertise = {
  domain_expertise: {
    domain_groups: {
      area_of_law: {
        name: string;
        case_count: number;
      }[];
      legal_principles: {
        name: string;
        case_count: number;
      }[];
      subject_matter: {
        name: string;
        case_count: number;
      }[];
    };
  };
};
const LegalDomainDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { searchParams, close, removeQueryParam, UpdateUrlParams } =
    useQueryHandler();
  const judgeId = searchParams.get("judgeId");
  const judgeName = searchParams.get("judge");
  const {
    isError,
    isFetching,
    isLoading,
    data: JudgeAnalyticsData,
  } = useGetJudgeAnalyticsQuery(
    judgeId
      ? {
          judge_id: Number(judgeId),
          //   page: 1,
        }
      : skipToken
    //     // judge_id: parseInt(judgeId as unknown as string),
  );

  const mockData = {
    domain_expertise: {
      domain_groups: {
        area_of_law: [
          { name: "Constitutional Law", case_count: 5 },
          { name: "Civil Procedure", case_count: 2 },
          { name: "Criminal Law", case_count: 2 },
          { name: "Criminal Law and Procedure", case_count: 2 },
          { name: "Practice and Procedure", case_count: 1 },
          { name: "Appellate Practice and Procedure", case_count: 1 },
          { name: "Customary Law", case_count: 1 },
          { name: "Electoral Law", case_count: 1 },
          { name: "Estate Planning and Administration", case_count: 1 },
        ],
        legal_principles: [
          {
            name: "A party cannot be held responsible or punished for the mistake of his counsel if the party was not at fault.",
            case_count: 1,
          },
          {
            name: "A party who had the opportunity of being heard but failed to utilize same, cannot complain of breach of fair hearing.",
            case_count: 1,
          },
          {
            name: "A party who refuses or fails to take advantage of the fair hearing process created by the Court cannot turn around to accuse the Court of denying him fair hearing.",
            case_count: 1,
          },
          {
            name: "A purely civil matter with no element of criminality cannot result in a criminal charge and conviction",
            case_count: 1,
          },
          {
            name: "A right to appeal is a fundamental constitutional right and cannot be curtailed or fettered by any legislation unless by the Constitution itself.",
            case_count: 1,
          },
          {
            name: "A valid trust requires specific property, settlor's intent, and a lawful purpose; property obtained deceitfully cannot amount to a trust",
            case_count: 1,
          },
          {
            name: "A valid Will must satisfy statutory requirements (e.g., two subscribing witnesses)",
            case_count: 1,
          },
          {
            name: "A valid Will supersedes prior agreements for intestate distribution",
            case_count: 1,
          },
          { name: "Balance of probability", case_count: 1 },
          {
            name: "Breach of contract is not the same as criminal breach of trust",
            case_count: 1,
          },
        ],
        subject_matter: [
          { name: "Right to Fair Hearing", case_count: 2 },
          { name: "Jurisdiction of Courts", case_count: 2 },
          { name: "Pre-election Matters", case_count: 2 },
          { name: "Proof of Crime", case_count: 2 },
          { name: "Proof of Offence", case_count: 2 },
          { name: "Appellate Review", case_count: 2 },
          { name: "Competence of Grounds of Appeal", case_count: 1 },
          { name: "Confessional Statement", case_count: 1 },
          { name: "Confessional Statement Admissibility", case_count: 1 },
          { name: "Conspiracy to Murder", case_count: 1 },
        ],
      },
    },
  };
  const data: TdomainExpertise = JudgeAnalyticsData
    ? JudgeAnalyticsData
    : mockData;
  const colors = [
    "#1e40af",
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#dbeafe",
    "#1f2937",
    "#374151",
    "#6b7280",
    "#9ca3af",
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "areas", label: "Areas of Law", icon: Scale },
    { id: "principles", label: "Legal Principles", icon: BookOpen },
    { id: "subjects", label: "Subject Matter", icon: FileText },
  ];

  const totalCases = useMemo(() => {
    return data?.domain_expertise?.domain_groups?.area_of_law?.reduce(
      (sum, item) => sum + item.case_count,
      0
    );
  }, [data]);
  //   console.log(
  //     "data of total",
  //     data?.domain_expertise?.domain_groups?.area_of_law
  //   );
  const getFilteredData = (
    category: "subject_matter" | "legal_principles" | "area_of_law"
  ) => {
    const categoryData = data.domain_expertise.domain_groups[category];
    if (!searchTerm) return categoryData;

    return categoryData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const StatCard = ({
    title,
    value,
    // icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    // icon: typeof TrendingUp;
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
      {/* {subtitle && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-lexblue text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {subtitle}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-red-800"></div>
        </div>
      )} */}
    </div>
  );

  const DataTable = ({
    data,
    title,
  }: {
    data: Record<any, any>;
    title: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xx font-semibold text-lexblue font-gilda_Display">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item: Record<any, any>, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs truncate" title={item.name}>
                    {item.name}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.case_count}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {((item.case_count / totalCases) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Cases"
          value={totalCases}
          //   icon={FileText}
          color="#10B981"
        />
        <StatCard
          title="Areas of Law"
          value={data.domain_expertise.domain_groups.area_of_law.length}
          //   icon={Scale}
          color="#EF4444"
        />
        <StatCard
          title="Legal Principles"
          value={data.domain_expertise.domain_groups.legal_principles.length}
          //   icon={BookOpen}
          color="#3B82F6"
        />
        <StatCard
          title="Subject Matters"
          value={data.domain_expertise.domain_groups.subject_matter.length}
          //   icon={TrendingUp}
          color="#8B5CF6"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xx font-semibold text-lexblue font-gilda_Display mb-4">
            Areas of Law Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.domain_expertise.domain_groups.area_of_law}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="case_count" fill="#0e3165" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xx font-semibold text-lexblue font-gilda_Display mb-4">
            Case Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.domain_expertise.domain_groups.area_of_law}
                cx="50%"
                cy="50%"
                labelLine={false}
                // added ||0 for type safety chibs
                label={(data) => {
                  //   console.log("the data and umber", data);
                  return `${(((data.value || 0) / totalCases) * 100).toFixed(
                    0
                  )}%`;
                }}
                outerRadius={80}
                fill="#0e3165"
                dataKey="case_count"
              >
                {data.domain_expertise.domain_groups.area_of_law.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  )
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div
      onClick={(e) => {
        e?.stopPropagation();
      }}
      className=" bg-gray-50 "
      //   className="h-screen bg-gray-50 overflow-y-scroll pb-[100px]"
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-lexblue text-xx font-gilda_Display capitalize font-bold">
                    {judgeName}
                    {/* Domain Expertise */}
                  </h1>
                  <p className="text-powder_blue text-sm font-gilda_Display  font-medium">
                    Professional domain expertise dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-powder_blue text-lexblue"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen overflow-y-scroll pb-[250px]">
        {activeTab === "overview" && <OverviewTab />}

        {activeTab === "areas" && (
          <DataTable
            data={getFilteredData("area_of_law")}
            title="Areas of Law"
          />
        )}

        {activeTab === "principles" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xx font-semibold text-lexblue font-gilda_Display">
                Legal Principles
              </h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {getFilteredData("legal_principles").map((principle, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-base text-lexblue font-gilda_Display flex-1 mr-4">
                        {principle.name}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-lexblue whitespace-nowrap">
                        {principle.case_count} case
                        {principle.case_count !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "subjects" && (
          <DataTable
            data={getFilteredData("subject_matter")}
            title="Subject Matter"
          />
        )}
      </div>
    </div>
  );
};

export default LegalDomainDashboard;
