"use client";
import React, { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import ReactTextareaAutosize from "react-textarea-autosize";
interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  isDelivered?: boolean;
}

export default function ChatInterface(): JSX.Element {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (): void => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Messages Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Blue message (sent) */}
        <MessageSent />
        {/* Gray message (received) */}
        <MessageReceived />
      </div>

      {/* Message Input Area */}
      <div className="border-t border-gray-200 p-4 bg-[#EEF2F780]">
        <div className="flex items-center space-x-2">
          {/* Emoji button */}
          <button className="flex-shrink-0 px-[12px] py-[5.568px] bg-[#EEF2F7] text-gray-400 hover:text-gray-600 transition-colors">
            <Smile size={20} />
          </button>

          {/* Message input */}
          <div className="flex-1 relative items-center h-full">
            <ReactTextareaAutosize
              maxRows={10}
              placeholder={`Enter your message...`}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setMessage(e.target.value)
              }
              //   className={`px-2 font-rubik text-base placeholder:text-[17px]
              //       leading-6 bg-stone-50 text-zinc-600
              //       outline-none scrollbar-hide resize-none max-h-[30vh]`}
              className="w-full px-4 text-justify py-2 pr-12 border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
              // ref={inputRef}
              // id={id}
              // onKeyUp={handleKeyUp}
            />
            {/* Attachment button */}
            <button
              className="
            
            
            absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Paperclip size={20} />
            </button>
          </div>

          {/* Send button */}
          <button
            onClick={handleSendMessage}
            className="flex-shrink-0 px-[12px] py-[5px] bg-blue-500 h-[32px] w-[44px] text-white rounded-[5px] hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function MessageSent() {
  return (
    <div className="flex justify-end">
      <div className="max-w-xs lg:max-w-md">
        <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3">
          <p className="text-sm leading-relaxed">
            I appreciate your honesty. Can you elaborate on some of those
            challenges? I want to understand how we can support you better in
            the future.
          </p>
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-400">8:27 am ✓</span>
        </div>
      </div>
    </div>
  );
}

function MessageReceived() {
  return (
    <div className="flex justify-start">
      <div className="max-w-xs lg:max-w-md">
        <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
          <p className="text-sm leading-relaxed">
            Thanks, Emily. I appreciate your support. Overall, I&apos;m
            optimistic about our team&apos;s performance and looking forward to
            tackling new challenges in the next quarter.
          </p>
        </div>
        <div className="flex justify-start mt-1">
          <span className="text-xs text-gray-400">8:29 am</span>
        </div>
      </div>
    </div>
  );
}
