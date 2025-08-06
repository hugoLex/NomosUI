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
import ChatbotApp from "../../chat/chatbot";

const ChatbotSideCover = () => {
  const { searchParams, removeQueryParam } = useQueryToggler();
  const right_cover_chatbot = searchParams.get("right_cover_chatbot");
  const new_case_id_slug = useParams();
  const { isError, isLoading, data } = useCaseQuery(
    new_case_id_slug ? (new_case_id_slug?.slug as string) : skipToken
    // new_case_id_slug ? new_case_id_slug?.slug[0] : skipToken
    // "ce1f8469-a471-4bda-ba5c-0d4719bc23fb"
  );

  const [expandedEvent, setExpandedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

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
      {right_cover_chatbot && (
        <div
          onClick={() => removeQueryParam("right_cover_chatbot")}
          className={` bg-red- 500 max-md:h idden backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl shadow-lg fixed top-[0px] [20px] right-[25px] h-[100%] [90%] z-[99999] w-[99%] 
                          `}
        >
          <div className="bg-white border-l border-gray-400/15 ml-auto  min-w-[500px] w-[60vw] h-screen shadow-overlay top-0 right-0 fixed  animate-in slide-in-from-right ">
            <div className="min-h-[64px] justify-between flex items-center p-3.5 bg-purple- 500 border-b border-b-black\50  ">
              <span
                className={` text-xx font-bold font-gilda_Display mb-3 text-lexblue`}
              >
                Chat with legal documents
              </span>

              <svg
                onClick={() => removeQueryParam("right_cover_chatbot")}
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
              className="overflow- scroll h- [100vh] pb-20 max-w- [700px] mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h -screen"
            >
              <ChatbotApp />
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotSideCover;
