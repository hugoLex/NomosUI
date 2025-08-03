// components/DocumentChat.tsx
import React, { useState, useRef, useEffect } from "react";
import { Send, Trash2, FileText } from "lucide-react";
import { ChatMessage, useChatbot } from "@app/hooks/useChatbot";
// import { useChatbot, ChatMessage } from "../hooks/useChatbot";

interface DocumentChatProps {
  documentId: string;
  documentTitle?: string;
  onClose?: () => void;
}

const DocumentChat: React.FC<DocumentChatProps> = ({
  documentId,
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

    return (
      <div
        key={message.id}
        className={`mb-4 ${isUser ? "ml-auto" : "mr-auto"} max-w-[80%]`}
      >
        <div
          className={`
            rounded-lg px-4 py-2 
            ${
              isUser
                ? "bg-blue-600 text-white ml-auto"
                : isProgress
                ? "bg-gray-100 text-gray-700 border-l-4 border-blue-500"
                : "bg-gray-100 text-gray-800"
            }
          `}
        >
          {/* Render markdown-style content */}
          <div className="prose prose-sm max-w-none">
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
          </div>

          {/* Timestamp */}
          <div
            className={`text-xs mt-2 ${
              isUser ? "text-blue-200" : "text-gray-500"
            }`}
          >
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-gray-800">
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
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
      <div className="border-t p-4">
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
      </div>
    </div>
  );
};

export default DocumentChat;
