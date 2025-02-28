import { useRecaptcha } from "@app/hooks";
import React, { useState, useEffect, useRef } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import {
  LuThumbsUp,
  LuThumbsDown,
  LuMessageSquare,
  LuSend,
  LuAlertCircle,
} from "react-icons/lu";

const FeedbackWidget = () => {
  const isCaptchaLoaded = useRecaptcha();
  const [comment, setComment] = useState("");
  const [voted, setVoted] = useState<string | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const captchaRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const CHAR_LIMIT = 200;

  const handleVote = (vote: string) => {
    setVoted(vote);
    // Optionally auto-show comment box when voting
    setShowCommentBox(true);
    setError("");
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= CHAR_LIMIT) {
      setComment(input);
      setError("");
    } else {
      setError(`Maximum character limit of ${CHAR_LIMIT} reached`);
    }
  };

  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
    setError("");

    // Focus on comment box when opened
    if (!showCommentBox) {
      setTimeout(() => {
        commentRef.current?.focus();
      }, 100);
    }
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLElement>
  ) => {
    e.preventDefault();

    if (!isCaptchaLoaded) {
      setError("Please wait while we verify your request");
      return;
    }

    // For demonstration purposes:
    const simulatedBotDetection = Math.random() > 0.95; // 5% chance to simulate bot detection

    if (simulatedBotDetection) {
      setError("Suspicious activity detected. Please try again later.");
      return;
    }
    HTMLFormElement;

    // Here you would handle the actual submission
    console.log("Feedback submitted:", { vote: voted, comment });

    // Show success message
    setSubmitted(true);

    // Reset form after delay
    setTimeout(() => {
      setComment("");
      setShowCommentBox(false);
      setSubmitted(false);
    }, 3000);
  };

  const getCharCountClass = () => {
    const remainingChars = CHAR_LIMIT - comment.length;
    if (remainingChars <= 20) return "text-red-500";
    if (remainingChars <= 50) return "text-yellow-500";
    return "text-gray-400";
  };

  return (
    <div className="w-full max-w-lg font-rubik mb-8">
      <div className="flex flex-col">
        <h2 className="text-sm font-medium text-gray-700 mb-3">
          Do you agree with this Relationship treatment?
        </h2>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleVote("like")}
            className={`flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 p-2
              ${
                voted === "like"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-500"
              }`}
            aria-label="Like"
          >
            <LuThumbsUp
              className={`h-5 w-5 transition-transform duration-300 ${
                voted === "like" ? "scale-110" : ""
              }`}
            />
          </button>

          <button
            onClick={() => handleVote("dislike")}
            className={`flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 p-2
              ${
                voted === "dislike"
                  ? "bg-red-100 text-red-600"
                  : "text-gray-500"
              }`}
            aria-label="Dislike"
          >
            <LuThumbsDown
              className={`h-5 w-5 transition-transform duration-300 ${
                voted === "dislike" ? "scale-110" : ""
              }`}
            />
          </button>

          <button
            onClick={toggleCommentBox}
            className={`flex items-center space-x-1 rounded-full px-3 py-2 transition-all duration-300 hover:bg-gray-100
              ${
                showCommentBox ? "bg-blue-100 text-blue-600" : "text-gray-500"
              }`}
            aria-label="Comment"
          >
            <LuMessageSquare className="h-5 w-5" />
            <span className="text-sm">Comment</span>
          </button>
        </div>
      </div>

      {(showCommentBox || submitted) && (
        <div
          className={`mt-4 transition-all duration-300 ${
            submitted ? "opacity-100" : ""
          }`}
        >
          {submitted ? (
            <div className="animate-fadeIn rounded-lg bg-green-50 p-4 text-center text-green-700">
              <p className="font-medium mb-1">Thank you for your feedback!</p>
              <p className="text-sm">
                We appreciate your input and will use it to improve our
                services.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <textarea
                  ref={commentRef}
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Kindly leave a comment here..."
                  className="w-full min-h-[48px] max-h-[120px] rounded-lg border border-gray-300 py-3 px-4 text-gray-700 transition-all duration-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none overflow-auto"
                  rows={
                    comment.length > 80
                      ? Math.min(Math.ceil(comment.length / 40), 3)
                      : 1
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  className={`absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300
                    ${
                      comment.length > 0
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  disabled={comment.length === 0}
                >
                  <LuSend className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2 flex justify-between text-xs">
                <span
                  className={`${
                    error ? "text-red-500" : "invisible"
                  } flex items-center`}
                >
                  {error ? (
                    <>
                      <LuAlertCircle className="mr-1 h-3 w-3" />
                      {error}
                    </>
                  ) : (
                    "No error"
                  )}
                </span>
                <span
                  className={`${getCharCountClass()} transition-colors duration-300`}
                >
                  {comment.length}/{CHAR_LIMIT}
                </span>
              </div>

              {/* Hidden reCAPTCHA container */}
              <div ref={captchaRef} className="hidden"></div>
            </form>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FeedbackWidget;
