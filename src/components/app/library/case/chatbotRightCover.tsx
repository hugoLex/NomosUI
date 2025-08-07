import useQueryToggler from "@app/hooks/useQueryHandler";
import React, { useState, useMemo } from "react";
import ChatbotApp from "../../chat/chatbot";

const ChatbotSideCover = () => {
  const { searchParams, removeQueryParam } = useQueryToggler();
  const right_cover_chatbot = searchParams.get("right_cover_chatbot");

  return (
    <div>
      {right_cover_chatbot && (
        <div
          onClick={() => removeQueryParam("right_cover_chatbot")}
          className={` bg-red- 500 max-md:h idden backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl shadow-lg fixed top-[0px] [20px] right-[25px] h-[100%] [90%] z-[99999] w-[99%] 
                          `}
        >
          <div className="bg-white border-l border-gray-400/15 ml-auto  min-w-[500px] w-[50vw] h-screen shadow-overlay top-0 right-[-40px] fixed  animate-in slide-in-from-right ">
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
              {/* <ChatIndex /> */}
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotSideCover;
