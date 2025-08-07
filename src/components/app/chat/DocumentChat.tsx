// components/DocumentChat.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Trash2,
  FileText,
  Paperclip,
  Smile,
  ImageIcon,
  MenuIcon,
} from "lucide-react";
import { ChatMessage, useChatbot } from "@app/hooks/useChatbot";
import { Markdown } from "@app/components/shared";
import { DropdownMenuChat } from "./profileDropDown";
import Link from "next/link";
import { RiMenu4Line, RiProfileFill } from "react-icons/ri";
import Image from "next/image";
import ReactTextareaAutosize from "react-textarea-autosize";
import { IoMenuOutline } from "react-icons/io5";

// import { useChatbot, ChatMessage } from "../hooks/useChatbot";

interface DocumentChatProps {
  documentId: string;
  documentTitle?: string;
  onClose?: () => void;
}

const DocumentChat: React.FC<DocumentChatProps> = ({
  documentId,
  // documentId = "cca34a12-17a2-464c-a4a6-0f3b3a93e4c6",
  documentTitle,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    sessions,
    isStreaming,
    error,
    sendMessage,
    clearConversation,
    getSession,
  } = useChatbot();

  const session = sessions[documentId];
  const messages = session?.messages || [];
  // console.log("DocumentChat messages:", session);
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;

    const query = inputValue.trim();
    setInputValue("");
    await sendMessage(documentId, query);
  };

  const handleClear = async () => {
    if (window.confirm("Clear conversation history for this document?")) {
      await clearConversation(documentId);
    }
  };

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.type === "user";
    const isProgress =
      message.content.includes("🔍") || message.content.includes("📖");
    console.log("DocumentChat messages:", message);
    return (
      <div
        key={message.id}
        className={`mb-4 ${isUser ? "ml-auto" : "mr-auto"} max-w-[80%]`}
      >
        <div
          className={`
            rounded-2xl rounded-br-md px-4 py-2 
            ${
              isUser
                ? "bg-blue-500 text-white ml-auto"
                : isProgress
                ? "bg-gray-100 text-gray-700 "
                : "bg-gray-100 text-gray-800"
            }
          `}
        >
          {/* Render markdown-style content */}

          {/* <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3"> */}

          <Markdown
            className=" text- justify leading-relaxed"
            content={message.content}
          />

          {/* {message.content} */}

          {/* </div> */}

          {/* <div className=" max-w-none">
            {message.content.split("\n").map((line, index) => {
              // Handle markdown bold
              if (line.includes("**")) {
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={index} className="mb-1">
                    {parts.map((part, i) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={i}>{part.slice(2, -2)}</strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </p>
                );
              }
              return line ? (
                <p key={index} className="mb-1">
                  {line}
                </p>
              ) : (
                <br key={index} />
              );
            })}
          </div> */}

          {/* Timestamp */}
          <div
            className={`text-xs mt-2 ${
              isUser ? "text-blue-200" : "text-gray-500 "
            }`}
          >
            {new Date(message?.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      // onClick={(e: any) => e.stopPropagation()}
      className="  bg-white border rounded-lg shadow-lg h-screen overflow-y-scroll pb-[100px]"
    >
      <div className="px-[24px] py-[18px] flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="relative rounded-full overflow-clip w-[40px] h-[40px] ">
            <Image
              className=""
              style={{ objectFit: "cover" }}
              fill
              src={`/images/${"judge_analytics_av.jpg"}`}
              loading="lazy"
              alt="judge counsel profile"
            />
          </div>
          <div>
            <Link
              href={`/analytics/judges`}
              className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
            >
              Chibuike Ewenike
            </Link>
            <h3 className="text-xs font-normal text-lex-blue">typing...</h3>
            {/* <h3 className="text-sm text-lex-blue font-normal">
                    Cases count: {"100"}
                  </h3> */}
          </div>
        </div>

        <div className="relative flex gap-[1.5rem] items-center">
          <Link href={""}>
            <ImageIcon />
          </Link>
          <Link href={""}>
            <MenuIcon />
          </Link>
          {/* this is to show or hide the drop down  */}
          <DropdownMenuChat classname="" isOpen="false" />
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-xx font-normal text-gray-800">
              {documentTitle || `Document ${documentId.slice(0, 8)}`}
            </h3>
            <p className="text-xs text-gray-500">Document Chat</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleClear}
            disabled={isStreaming || messages.length === 0}
            className="p-2 text-gray-500 hover:text-red-600 disabled:opacity-50"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
              title="Close chat"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow -y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8 pb-[130px]">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Start a conversation about this document</p>
            <p className="text-sm">
              Ask questions about the case, evidence, or legal principles
            </p>
          </div>
        ) : (
          messages.map(renderMessage)
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-[#EEF2F780]">
        <div className="flex items-center space-x-2">
          {/* Emoji button */}
          <button className="flex-shrink-0 px-[12px] py-[5.568px] bg-[#EEF2F7] text-gray-400 hover:text-gray-600 transition-colors">
            <Smile size={20} />
          </button>

          {/* Message input */}
          <div className="flex-1 relative items-center h-full">
            <ReactTextareaAutosize
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                isStreaming
                  ? "Generating response..."
                  : "Ask about this document..."
              }
              disabled={isStreaming}
              maxRows={10}
              // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              //   // setMessage(e.target.value)
              // }}
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
            // onClick={handleSendMessage}
            onClick={handleSubmit}
            className="flex-shrink-0 px-[12px] py-[5px] bg-blue-500 h-[32px] w-[44px] text-white rounded-[5px] hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            // disabled={!message.trim()}
            disabled={isStreaming || !inputValue.trim()}
          >
            {isStreaming ? "..." : <Send size={18} />}
          </button>
        </div>
      </div>
      {/* <div className="  border-t p-4 ">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              isStreaming
                ? "Generating response..."
                : "Ask about this document..."
            }
            disabled={isStreaming}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isStreaming || !inputValue.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{isStreaming ? "Sending..." : "Send"}</span>
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default DocumentChat;
