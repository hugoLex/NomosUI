import React, { useState } from "react";
import {
  LuChevronDown,
  LuTrendingUp,
  LuSearch,
  LuBookmark,
} from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@app/components/ui";
import { useRouter } from "next/router";

const TrendingSearchWidget = ({
  trendingSearches = [],
}: {
  trendingSearches: { text: string; usage_count: number; type: string }[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const router = useRouter();

  // Empty state
  if (trendingSearches.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto my-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <LuSearch className="w-4 h-4" />
            <span>No trending searches yet. Be the first to explore!</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-100 hover:border-gray-200 transition-all cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Collapsed View */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-3 overflow-x-hidden">
            <div className="bg-slate-50 p-2 rounded">
              <LuTrendingUp className="text-slate-400 w-5 h-5" />
            </div>
            <span className="text-gray-700 font-medium">Trending:</span>

            {trendingSearches.slice(0, 3).map((trending, tdx) => {
              return (
                <TooltipProvider key={tdx}>
                  <Tooltip>
                    <TooltipTrigger
                      onClick={() => {
                        console.log("clicked");
                        router.push({
                          pathname: "/search",
                          query: {
                            q: trending.text,
                          },
                        });
                      }}
                      className="inline-flex items-center"
                    >
                      <span className="inline-block hover:bg-gray-100 px-1 rounded-md text-gray-900 truncate max-w-[150px]">
                        {trending.text}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className=" max-w-[300px]">{trending.text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
          {trendingSearches.length > 3 && (
            <LuChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isExpanded ? "transform rotate-180" : ""
              }`}
            />
          )}
        </div>

        {/* Expanded View */}
        {trendingSearches.length > 3 && (
          <div
            className={`overflow-hidden transition-all duration-200 ${
              isExpanded ? "max-h-48" : "max-h-0"
            }`}
          >
            <div className="p-3 pt-0">
              {trendingSearches.slice(3).map((search, sdx) => (
                <div
                  key={sdx}
                  onClick={() => {
                    console.log("clicked");
                    router.push({
                      pathname: "/search",
                      query: {
                        q: search.text,
                      },
                    });
                  }}
                  className="flex items-center justify-between py-2 pl-8 hover:bg-gray-50 rounded cursor-pointer group"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="bg-slate-50 p-1.5 rounded">
                      <LuSearch className="text-slate-400 w-4 h-4" />
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-gray-700 truncate max-w-md">
                            {search.text}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{search.text}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {/* <span className="text-gray-500 text-sm">
                  {search.searches.toLocaleString()} searches
                </span> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingSearchWidget;
