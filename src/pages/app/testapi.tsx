import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

// Define interfaces for the response data structure
interface Case {
  metadata: {
    case_title: string;
  };
  occurrences: Array<{
    context?: string;
    content?: string;
  }>;
}

interface SearchResults {
  markdown_content?: string;
  cases?: Case[];
}

export default function SearchComponent(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [processingMessage, setProcessingMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    setProcessingMessage("");
    setError("");

    try {
      const response = await axios.get<SearchResults>(
        `https://webapp.lexanalytics.ai/api/semantic/search`,
        // `https://webapp.lexanalytics.ai/api/semantic/search?query=${query}`,
        {
          params: { query },
        }
      );
      //   const headersObj: Record<string, string> = {};

      //   //   Convert all headers to an object if meta.response exists
      //   if (response?.headers) {
      //     // Headers object is an iterable
      //     response.headers.forEach((value: string, key: string) => {
      //       headersObj[key] = value;
      //     });
      //   }
      //   console.log("headers from fetch", headersObj);
      // Check for processing message in headers
      const message = response.headers["x-processing-message"];
      //   const message = response.headers["x-processing-message"];
      console.log("header from response", message);
      if (message) {
        setProcessingMessage(message as string);
      }

      // Set results
      console.log(response);
      console.log("Headers from axios", message);
      setResults(response.data);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.detail || err.message
        : (err as Error).message;

      setError("Error searching: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Legal Search</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your legal question..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      {/* Processing Message Banner */}
      {processingMessage && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 mb-4 rounded flex items-center">
          <div className="animate-spin mr-3 h-5 w-5 border-t-2 border-blue-500 rounded-full"></div>
          <p>{processingMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="border rounded p-4">
          {/* For markdown content */}
          {results.markdown_content ? (
            <div className="prose max-w-none">
              <ReactMarkdown>{results.markdown_content}</ReactMarkdown>
            </div>
          ) : (
            /* For JSON response */
            <div>
              <h2 className="text-xl font-semibold mb-3">Results</h2>
              {results.cases?.map((item, i) => (
                <div key={i} className="mb-4 border-b pb-3">
                  <h3 className="font-medium">{item.metadata.case_title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.occurrences[0]?.context ||
                      item.occurrences[0]?.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
