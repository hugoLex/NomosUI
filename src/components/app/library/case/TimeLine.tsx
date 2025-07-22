import useQueryToggler from "@app/hooks/useQueryHandler";
import { useCaseQuery } from "@app/store/services/caseSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Scale,
  FileText,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from "lucide-react";
import { Timeline } from "@app/types";

// function Time_lineSideCover() {
//   const { searchParams, removeQueryParam } = useQueryToggler();
//   const right_cover_menu = searchParams.get("right_cover_menu");
//   const new_case_id_slug = useParams();
//   const { isError, isLoading, data } = useCaseQuery(
//     new_case_id_slug ? (new_case_id_slug?.slug as string) : skipToken
//     // new_case_id_slug ? new_case_id_slug?.slug[0] : skipToken
//     // "ce1f8469-a471-4bda-ba5c-0d4719bc23fb"
//   );
//   //   type Ttimeline={timeline:string,[key: string]: any};
//   const caseData = data?.case_data;
// //   console.log(
// //     "case data from cases query",
// //     JSON.stringify(data?.case_data?.timeline, null, 2)
// //   );
//   return (
//     <div>
//       {right_cover_menu && (
//         <div
//           onClick={() => removeQueryParam("right_cover_menu")}
//           className={` bg-red- 500 max-md:h idden fixed top-[20px] right-[25px] h-[90%] z-[99999] w-[99%]
//                           `}
//         >
//           <div className="bg-white ml-auto  min-w-[500px] w-[50vw] h-screen shadow-overlay top-0 right-0 fixed  animate-in slide-in-from-right ">
//             <div className="min-h-[64px] justify-between flex items-center p-3.5 bg-purple- 500 border-b border-b-black\50  ">
//               <span
//                 className={` text-lexblue text-xx font-gilda_Display capitalize font-bold`}
//               >
//                 Time line Content
//               </span>

//               <svg
//                 onClick={() => removeQueryParam("right_cover_menu")}
//                 className="ml-auto cursor-pointer"
//                 width="16"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <line
//                   x1="4"
//                   y1="4"
//                   x2="20"
//                   y2="20"
//                   stroke="black"
//                   strokeWidth="2"
//                 />
//                 <line
//                   x1="20"
//                   y1="4"
//                   x2="4"
//                   y2="20"
//                   stroke="black"
//                   strokeWidth="2"
//                 />
//               </svg>
//             </div>
//             {/* <RelatedContent /> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Time_lineSideCover;

const LegalTime_lineSideCover = () => {
  const { searchParams, removeQueryParam } = useQueryToggler();
  const right_cover_menu = searchParams.get("right_cover_menu");
  const new_case_id_slug = useParams();
  const { isError, isLoading, data } = useCaseQuery(
    new_case_id_slug ? (new_case_id_slug?.slug as string) : skipToken
    // new_case_id_slug ? new_case_id_slug?.slug[0] : skipToken
    // "ce1f8469-a471-4bda-ba5c-0d4719bc23fb"
  );
  //   type Ttimeline={timeline:string,[key: string]: any};

  //   console.log(
  //     "case data from cases query",
  //     JSON.stringify(data?.case_data?.timeline, null, 2)
  //   );
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  //   const timelineData = {
  //     duration: {
  //       total_years: 4,
  //       total_days: 143,
  //     },
  //     events: [
  //       {
  //         id: 211,
  //         date: "2015-09-17",
  //         court: null,
  //         order: 1,
  //         description:
  //           "Pre-judgment interest on the claimed sum was reckoned from this date.",
  //       },
  //       {
  //         id: 212,
  //         date: "2016-01-01",
  //         court: "Court",
  //         order: 1,
  //         description:
  //           "Case registered/marked ID/ADR/232/2016 for Alternative Dispute Resolution (ADR).",
  //       },
  //       {
  //         id: 213,
  //         date: "2016-11-09",
  //         court: "Court",
  //         order: 1,
  //         description: "Respondent filed a motion for summary judgment.",
  //       },
  //       {
  //         id: 214,
  //         date: "2016-12-09",
  //         court: "Court",
  //         order: 1,
  //         description:
  //           "Writ of Summons and Statement of Claim filed by the Respondent.",
  //       },
  //       {
  //         id: 215,
  //         date: "2017-04-04",
  //         court: "Court",
  //         order: 1,
  //         description:
  //           "Appellant filed a motion on notice to refer the matter for Alternative Dispute Resolution (ADR).",
  //       },
  //       {
  //         id: 216,
  //         date: "2017-05-23",
  //         court: "Court",
  //         order: 1,
  //         description:
  //           "Hearing where the Lower Court determined the Appellant's motion of 04-04-2017, stating it was 'superfluous' as it was already an ADR matter. The court advised parties to use the Lagos Settlement Week in June and directed the Defendant to file a Statement of Defence and Counter Affidavit.",
  //       },
  //       {
  //         id: 217,
  //         date: "2017-09-27",
  //         court: "Court",
  //         order: 1,
  //         description: "Matter adjourned for further directions.",
  //       },
  //       {
  //         id: 218,
  //         date: "2018-02-22",
  //         court: "Court",
  //         order: 1,
  //         description:
  //           "Respondent's motion for summary judgment heard by the Lower Court; judgment reserved.",
  //       },
  //       {
  //         id: 219,
  //         date: "2018-05-30",
  //         court: "Court",
  //         order: 1,
  //         description: "Original date reserved for judgment delivery.",
  //       },
  //       {
  //         id: 220,
  //         date: "2018-06-07",
  //         court: "Court",
  //         order: 1,
  //         description:
  //           "High Court of Lagos State, Ikeja Division, delivered its Ruling, granting the Respondent's motion for summary judgment against the Appellant. This judgment was delivered 103 days after the hearing, exceeding the 90-day constitutional limit.",
  //       },
  //       {
  //         id: 221,
  //         date: "2018-06-07",
  //         court: "Court",
  //         order: 2,
  //         description:
  //           "Notice of Appeal filed by the Appellant, challenging the High Court's ruling.",
  //       },
  //       {
  //         id: 222,
  //         date: "2018-08-30",
  //         court: "Court",
  //         order: 1,
  //         description: "Appellant's brief filed.",
  //       },
  //       {
  //         id: 223,
  //         date: "2018-10-05",
  //         court: "Court",
  //         order: 1,
  //         description: "Respondent's brief filed.",
  //       },
  //       {
  //         id: 224,
  //         date: "2020-02-06",
  //         court: "Court",
  //         order: 1,
  //         description:
  //           "Court of Appeal delivered its judgment, dismissing the appeal and affirming the Ruling of the Lower Court.",
  //       },
  //     ],
  //   };
  const timelineData = data?.case_data?.timeline;

  const getEventType = (description: string) => {
    if (
      description.toLowerCase().includes("judgment") ||
      description.toLowerCase().includes("ruling")
    )
      return "judgment";
    if (
      description.toLowerCase().includes("motion") ||
      description.toLowerCase().includes("filed")
    )
      return "filing";
    if (
      description.toLowerCase().includes("hearing") ||
      description.toLowerCase().includes("heard")
    )
      return "hearing";
    if (description.toLowerCase().includes("appeal")) return "appeal";
    return "general";
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "judgment":
        return "bg-red-100 border-red-300 text-red-800";
      case "filing":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "hearing":
        return "bg-green-100 border-green-300 text-green-800";
      case "appeal":
        return "bg-purple-100 border-purple-300 text-purple-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredEvents = useMemo(() => {
    let events = timelineData?.events;
    // let events = timelineData.events;

    if (searchTerm) {
      events = events?.filter((event) =>
        event.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (filterType !== "all") {
      events = events?.filter(
        (event) => getEventType(event?.description) === filterType
      );
    }

    return events;
  }, [searchTerm, filterType]);

  interface DateRange {
    startDate: string;
    endDate: string;
    daysBetween: number;
  }
  function getTimelineDateRange(timelineData: Timeline): DateRange | null {
    const events = timelineData.events;

    if (events.length === 0) {
      return null;
    }

    // Sort events by date to ensure we get the actual first and last chronologically
    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const startDate = sortedEvents[0].date;
    const endDate = sortedEvents[sortedEvents.length - 1].date;

    // Calculate days between
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const daysBetween = Math.ceil(
      (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      startDate,
      endDate,
      daysBetween,
    };
  }

  const toggleEventExpansion = (eventId: any) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };
  if (!timelineData) return null;
  return (
    <div>
      {right_cover_menu && (
        <div
          onClick={() => removeQueryParam("right_cover_menu")}
          className={` bg-red- 500 max-md:h idden fixed top-[20px] right-[25px] h-[90%] z-[99999] w-[99%] 
                          `}
        >
          <div className="bg-white ml-auto  min-w-[500px] w-[50vw] h-screen shadow-overlay top-0 right-0 fixed  animate-in slide-in-from-right ">
            <div className="min-h-[64px] justify-between flex items-center p-3.5 bg-purple- 500 border-b border-b-black\50  ">
              <span
                className={` text-xx font-bold font-gilda_Display mb-3 text-lexblue`}
              >
                Time line Content
              </span>

              <svg
                onClick={() => removeQueryParam("right_cover_menu")}
                className="ml-auto cursor-pointer"
                width="16"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="4"
                  y1="4"
                  x2="20"
                  y2="20"
                  stroke="black"
                  strokeWidth="2"
                />
                <line
                  x1="20"
                  y1="4"
                  x2="4"
                  y2="20"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div
              onClick={(e: any) => e.stopPropagation()}
              className="overflow-scroll h-[100vh] pb-20 max-w-[700px] mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen"
            >
              {/* Header */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-8 h-8 text-blue-600" />
                  <h1 className="text-xx font-bold font-gilda_Display  text-lexblue">
                    Legal Case Timeline
                  </h1>
                </div>

                {/* Case Summary */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-slate-700">
                        Duration
                      </span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">
                      {timelineData?.duration?.total_years} Years
                    </p>
                    <p className="text-sm text-slate-600">
                      {timelineData?.duration?.total_days} days total
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-slate-700 flex-shrink-0">
                        Total Events
                      </span>
                    </div>
                    <p className="text-base font-semibold text-green-600">
                      {timelineData?.events?.length}{" "}
                      <span className="text-[10px] text-slate-600">
                        Court proceedings
                      </span>
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-slate-700">
                        Case Period
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-purple-600">
                      {getTimelineDateRange(timelineData)?.startDate} -
                      {getTimelineDateRange(timelineData)?.endDate}
                    </p>
                    <p className="text-sm text-slate-600">Full case span</p>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search timeline events..."
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e?.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <select
                      className="pl-10 pr-8 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[180px]"
                      value={filterType}
                      onChange={(e) => setFilterType(e?.target?.value)}
                    >
                      <option value="all">All Events</option>
                      <option value="judgment">Judgments</option>
                      <option value="filing">Filings</option>
                      <option value="hearing">Hearings</option>
                      <option value="appeal">Appeals</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-slate-50">
                  <h2 className="text-xx font-bold font-gilda_Display mb-3 text-lexblue">
                    Case Timeline
                  </h2>
                  <p className="font-cabin mt-1 text-sm ">
                    Chronological record of all court proceedings
                  </p>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>

                  {filteredEvents?.map((event, index) => {
                    const eventType = getEventType(event?.description);
                    const isExpanded = expandedEvent === event?.id;
                    const isImportant =
                      eventType === "judgment" || eventType === "appeal";

                    return (
                      <div
                        key={event.id}
                        className="relative pl-16 pr-6 py-6 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        {/* Timeline Dot */}
                        <div
                          className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                            isImportant
                              ? "bg-red-500 border-red-200"
                              : "bg-blue-500 border-blue-200"
                          } transform -translate-x-1/2`}
                        ></div>

                        {/* Event Content */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {/* Date and Court */}
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                                <Calendar className="w-4 h-4" />
                                {formatDate(event?.date)}
                              </span>

                              {event?.court && (
                                <span className="text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded">
                                  {event?.court}
                                </span>
                              )}

                              <span
                                className={`text-xs px-2 py-1 rounded-full border ${getEventTypeColor(
                                  eventType
                                )}`}
                              >
                                {eventType?.charAt(0)?.toUpperCase() +
                                  eventType?.slice(1)}
                              </span>
                            </div>

                            {/* Description */}
                            <div className="prose prose-slate max-w-none">
                              <p
                                className={`text-slate-700 leading-relaxed ${
                                  isExpanded || event?.description?.length < 150
                                    ? ""
                                    : "line-clamp-2"
                                }`}
                              >
                                {event?.description}
                              </p>

                              {event?.description?.length > 150 && (
                                <button
                                  onClick={() =>
                                    toggleEventExpansion(event?.id)
                                  }
                                  className="inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                >
                                  {isExpanded ? (
                                    <>
                                      Show Less{" "}
                                      <ChevronUp className="w-4 h-4" />
                                    </>
                                  ) : (
                                    <>
                                      Show More{" "}
                                      <ChevronDown className="w-4 h-4" />
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Event ID */}
                          <div className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded">
                            #{event?.id}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredEvents?.length === 0 && (
                  <div className="p-12 text-center text-slate-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No events found</p>
                    <p>Try adjusting your search terms or filters</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-slate-600">
                <p className="text-sm">
                  This timeline provides a comprehensive overview of all
                  recorded court proceedings.
                  <br />
                  For legal advice, please consult with a qualified attorney.
                </p>
              </div>
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalTime_lineSideCover;
