import React, { useState } from "react";
import {
  User,
  Calendar,
  Scale,
  Trophy,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
  Briefcase,
} from "lucide-react";
import { useGetCounselAnalyticsQuery } from "@app/store/services/analyticsSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSearchParams } from "next/navigation";

const CounselProfileDashboard = () => {
  const [expandedCase, setExpandedCase] = useState<string | number | null>(
    null
  );
  const SearchParams = useSearchParams();
  const counselId = SearchParams.get("counselId");
  const { isError, isFetching, isLoading, data } = useGetCounselAnalyticsQuery(
    counselId
      ? {
          counsel_id: Number(counselId),
          page: 1,
        }
      : skipToken
  );
  //   const data = {
  //     user_id: "anonymous",
  //     counsel_details: {
  //       counsel_id: 69,
  //       counsel_name: "Afe Babalola",
  //       canonical_name: "Afe Babalola",
  //       title: "SAN",
  //       year_called_to_bar: 2025,
  //       bio: "This is a sample bio for Afe Babalola, a renowned legal practitioner with extensive experience in various fields of law. He has been involved in numerous high-profile cases and is known for his expertise in constitutional law, human rights, and commercial litigation.",
  //       law_firms: ["Afe Babalola & Co.", "AB Chambers"],
  //       cases: [
  //         {
  //           document_id: "dd44bd74-0ba4-486a-81db-d8884a569f30",
  //           case_title:
  //             "Miss O. A. Akintemi and 2 Ors v. Prof. C. A. Onwumechili and 2 Ors",
  //           suit_number: "SC65/1983",
  //           year_decided: 1985,
  //           court: "Supreme Court",
  //           role: "appellant",
  //           verdict: "Lost",
  //           disposition:
  //             "The Supreme Court dismissed the appeal, affirming the orders of dismissal made by the High Court of Oyo State and the Court of Appeal. The Court awarded N300 costs in favor of the respondents jointly against the appellants. The appellants' claims for mandamus, declaration, and injunction were denied, with the Court emphasizing that the matters fell within the University's domestic jurisdiction and that internal remedies had not been exhausted.",
  //           subject_matters: [
  //             "Affidavit Evidence",
  //             "Award of Degrees",
  //             "Certiorari",
  //             "Domestic Forum",
  //             "Examination Malpractice",
  //             "Joinder of Parties",
  //             "Judicial Review of Discretionary Powers",
  //             "Mandamus",
  //             "Ouster Clauses",
  //             "Powers of University Senate",
  //             "Powers of University Visitor",
  //             "Prerogative Writs",
  //             "Prohibition",
  //             "Right to Access to Court (Section 6(6)(b) of 1979 Constitution)",
  //             "University Administration",
  //           ],
  //           precedents_cited: [
  //             "Adesanya v. President of The Federal Republic of Nigeria (1981) 5 S.C. 5",
  //             "Attorney-General of Bendel State v. Attorney-General of The Federation (1982) 3 N.C.L.R",
  //             "Board of High School and Intermediate Exams v. D.A. S. - All India Law Reports S.C. 1110",
  //             "Dr. Sofekun v. Akinyemi & Ors. (1980) 5-7 S.C. 1",
  //             "His Highness Lamidi Olayiwola - Alafin of Oyo & Ors. v. Attorney-General of Oyo State & 2 Ors. S.C. 134/82 Unreported delivered on 27th June, 1984",
  //           ],
  //         },
  //       ],
  //     },
  //     performance_metrics: {
  //       win_rate: 0,
  //       total_cases: 1,
  //       case_distribution: {
  //         "Affidavit Evidence": 1,
  //       },
  //     },
  //   };

  const toggleCaseExpansion = (index: string | number) => {
    setExpandedCase(expandedCase === index ? null : index);
  };

  const getVerdictColor = (verdict: string) => {
    return verdict === "Won"
      ? "text-emerald-600 bg-emerald-50"
      : "text-red-600 bg-red-50";
  };

  const getRoleColor = (role: string) => {
    const colors = {
      appellant: "bg-blue-100 text-blue-800",
      respondent: "bg-purple-100 text-purple-800",
      plaintiff: "bg-green-100 text-green-800",
      defendant: "bg-orange-100 text-orange-800",
    };
    return (
      colors[role.toLowerCase() as keyof typeof colors] ||
      "bg-gray-100 text-gray-800"
    );
  };
  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const StatCard = ({
    title,
    value,
    // icon: Icon,
    color,
  }: {
    title: string;
    value: number | string;
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
  const OverviewTab = () => (
    <div className=" px-[32px]">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title=" Win Rate"
          value={`${Math.round(data.performance_metrics.win_rate * 100)}%`}
          //   icon={FileText}
          color="#10B981"
        />
        <StatCard
          title="Total Cases"
          value={data.performance_metrics.total_cases}
          //   icon={Scale}
          color="#EF4444"
        />
        <StatCard
          title="Specializations"
          value={Object.keys(data.performance_metrics.case_distribution).length}
          //   icon={BookOpen}
          color="#3B82F6"
        />
        {/* <StatCard
            title="Subject Matters"
            value={data.domain_expertise.domain_groups.subject_matter.length}
            //   icon={TrendingUp}
            color="#8B5CF6"
          /> */}
      </div>

      {/* Charts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        </div> */}
    </div>
  );
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="   h-screen overflow-y-auto pb-[100px]"
    >
      <div className="max-w-7xl mx-auto ">
        {/* Header Section */}
        <div className="  border-b border-b-white/20 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-xl font-bold text-lexblue mb-[10px] font-gilda_Display">
                  {data.counsel_details.counsel_name}
                </h1>

                <div className="flex items-center space-x-4 text-powder_blue text-sm font-gilda_Display  font-medium">
                  <span className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Counsel Title: {data.counsel_details.title ?? "Attorney"}
                  </span>
                  {data.counsel_details.year_called_to_bar && (
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Called to Bar: {data.counsel_details.year_called_to_bar}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="  mb-8">
          <OverviewTab />
        </div>

        {/* Cases Section */}
        <div className=" border border-white/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xx font-gilda_Display font-bold text-lexblue">
              Case Portfolio
            </h2>
            <div className="px-2 py-1 bg-indigo-100 text-lexblue rounded-full text-sm font-medium">
              {data.counsel_details.cases.length} Case
              {data.counsel_details.cases.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="space-y-6">
            {data.counsel_details.cases.map((case_item, index) => (
              <div
                key={case_item.document_id}
                className="bg-white  border-b border-gray-100 overflow-hidden  transition-all duration-300"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleCaseExpansion(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xx font-bold text-lexblue font-gilda_Display">
                        {case_item.case_title}
                      </h3>

                      <div className="inline-flex gap-2">
                        <span
                          title="Suit number"
                          className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium"
                        >
                          {case_item.suit_number}
                        </span>
                        <span
                          title="Year Decided"
                          className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium"
                        >
                          {case_item.year_decided}
                        </span>
                        <span
                          title="Court"
                          className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium"
                        >
                          {case_item.court}
                        </span>
                        <span
                          className={`px-2 py-[0.125rem] capitalize bg-stone-100 rounded text-center text-teal-900 text-sm font-medium ${getRoleColor(
                            case_item.role
                          )}`}
                        >
                          {case_item.role}
                        </span>
                        <span
                          className={`px-2 py-[0.125rem] bg-stone-100 rounded text-center  text-sm font-medium ${getVerdictColor(
                            case_item.verdict
                          )}`}
                        >
                          {case_item.verdict}
                        </span>
                      </div>
                    </div>

                    <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-all duration-700 ${
                          expandedCase === index ? "rotate-180 " : ""
                        } `}
                      />
                    </button>
                  </div>
                </div>

                {expandedCase === index && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-6 space-y-6">
                      <div>
                        <h4 className="text-xx font-semibold text-powder_blue font-gilda_Display mb-3">
                          Case Disposition
                        </h4>
                        <p className="text-lexblue font-gilda_Display leading-relaxed rounded-xl p-4 text-justify">
                          {case_item.disposition}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xx font-semibold text-powder_blue font-gilda_Display mb-3">
                          Subject Matters
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {case_item.subject_matters.map((matter, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-lexblue/10 text-lexblue rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                            >
                              {matter}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xx font-semibold text-powder_blue font-gilda_Display mb-3">
                          Precedents Cited
                        </h4>
                        <div className="space-y-2">
                          {case_item.precedents_cited.map((precedent, idx) => {
                            console.log("precedent citation", precedent);
                            return (
                              <div
                                key={idx}
                                className="p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg"
                              >
                                <p className="text-lex-blue text-sm font-medium">
                                  {typeof precedent === "string"
                                    ? precedent
                                        .replace(/[{}\"]/g, "")
                                        .replace("role: null, citation: ", "")
                                    : precedent.citation}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselProfileDashboard;
