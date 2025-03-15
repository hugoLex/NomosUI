import React, { useEffect } from "react";
import { Markdown } from "@app/components/shared";
function FulljudgementModal({
  quoteToHighlight,
  full_judgement,
  case_title,
  setClickedQuote,
}: {
  //   id: string;
  //   case_title: string;
  quoteToHighlight: string;
  full_judgement?: string | null;
  case_title: string;
  // to set quote on the full judgement to get it highlighted
  setClickedQuote: React.Dispatch<React.SetStateAction<string | null>>;
  //   innerRef: MutableRefObject<any>;
}) {
  useEffect(() => {
    // After judgment loads, scroll to the highlighted section
    setTimeout(() => {
      const targetElement = document.getElementById("highlighted-quote");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300);
  }, [quoteToHighlight]);
  const ProcessJudgmentContent: React.FC<{ content: string }> = ({
    content,
  }) => {
    // let quoteToHighlight =
    //   "Ordinarily, a breach or non-compliance with or contravention of the Constitution or any of its provisions by a Court of law in the conduct of its judicial proceedings, would render the proceedings and any bye-product or outcome thereof, legally null and void for being unconstitutional.";

    // test with AIMS Foods Limited v. Olufemi Fadeyi
    if (!content || !quoteToHighlight || !content.includes(quoteToHighlight)) {
      return <Markdown content={content} />;
    }
    // Split the content at the quote
    const parts = content.split(quoteToHighlight);

    return (
      <>
        {/* Render first part */}
        {parts[0] && <Markdown content={parts[0]} />}

        {/* Render highlighted quote */}
        <div
          id="highlighted-quote"
          className="bg-yellow-200 p-4 border-l-4 border-yellow-500 mb-4"
        >
          <Markdown content={quoteToHighlight} />
        </div>

        {/* Render remaining content */}
        {parts[1] && <Markdown content={parts[1]} />}
      </>
    );
  };

  return (
    <>
      {quoteToHighlight && (
        <div className="fixed inset-0 bg-white bg-opacity-[0.9] z-[1] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl h-[90%] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {case_title ? case_title : "Loading..."}
                {/* Adebayo V. The State (2014) LPELR-22988 (SC) */}
              </h3>
              <button
                onClick={() => setClickedQuote(null)}
                className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {!full_judgement ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                // <div
                //   dangerouslySetInnerHTML={{
                //     __html: processJudgmentContent(
                //       currentJudgment.content,
                //       clickedQuote
                //     ),
                //   }}
                // >
                <ProcessJudgmentContent content={full_judgement} />
                // </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FulljudgementModal;
