import useQueryToggler from "@app/hooks/useQueryHandler";
import { X } from "lucide-react";

const StartLlmSearch = () => {
  const { searchParams, UpdateUrlParams } = useQueryToggler();
  const query_type = searchParams.get("query_type");
  return (
    <div
      className={` ${
        query_type !== "sematic_s" && "hidden"
      } mb-[20px] flex items-center justify-between bg-[#f5f5f2] border border-gray-300 px-4 py-2 rounded-md max-w -xl shadow-sm`}
    >
      <div className="flex items-center space-x-2">
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
        <div>
          <p className="text-sm font-medium text-gray-800">
            Need a deeper analysis of your question ?
          </p>
          <p className="text-sm text-gray-600">
            Click the button to get a deeper analysis of your question
          </p>
        </div>
      </div>
      <div
        onClick={() => {
          UpdateUrlParams("query_type", "llm_s");
        }}
        className="flex items-center space-x-2"
      >
        <button className="bg-[#007b83] text-white px-3 py-1.5 text-sm rounded-md hover:bg-[#00656c] transition-colors">
          Deep Analysis
        </button>
        {/* <button className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button> */}
      </div>
    </div>
  );
};

export default StartLlmSearch;
