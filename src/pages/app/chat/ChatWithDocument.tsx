// "use client";

// import { useEffect, useState } from "react";
// import { streamChatFromDocument } from "./streamChatFromDocument";
// // import { streamChatFromDocument } from "@/lib/streamChatFromDocument";

// interface ChatWithDocumentProps {
//   query: string;
//   documentId: string;
//   sessionId: string;
// }

// export default function ChatWithDocument({
//   query,
//   documentId,
//   sessionId,
// }: ChatWithDocumentProps) {
//   const [responseText, setResponseText] = useState("");
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     const startStream = async () => {
//       setResponseText("");
//       setIsStreaming(true);
//       setError(null);

//       try {
//         await streamChatFromDocument(
//           { query, document_id: documentId, session_id: sessionId },
//           (chunk) => {
//             if (isMounted) {
//               setResponseText((prev) => prev + chunk);
//             }
//           }
//         );
//       } catch (err: any) {
//         setError(err.message || "Streaming error occurred.");
//       } finally {
//         setIsStreaming(false);
//       }
//     };

//     startStream();

//     return () => {
//       isMounted = false;
//     };
//   }, [query, documentId, sessionId]);
//   console.log("data now coming", responseText);
//   return (
//     <div className="max-w-2xl mx-auto mt-6 p-4 border rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">📚 Chat With Document</h2>

//       {isStreaming && (
//         <p className="text-gray-500 mb-2 animate-pulse">
//           🔍 Analyzing document...
//         </p>
//       )}
//       {error && <p className="text-red-600">❌ {error}</p>}

//       <div className="whitespace-pre-wrap font-mono bg-gray-100 p-4 rounded min-h-[100px]">
//         {responseText || "Waiting for response..."}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { streamSSEChatFromDocument } from "./streamChatFromDocument";
// import { streamSSEChatFromDocument } from "@/lib/streamSSEChat";

export default function ChatWithDocument({
  query,
  documentId,
  sessionId,
}: {
  query: string;
  documentId: string;
  sessionId: string;
}) {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [endedInfo, setEndedInfo] = useState<{
    session_id: string;
    document_id: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;

    setText("");
    setError(null);
    setEndedInfo(null);
    setIsStreaming(true);

    streamSSEChatFromDocument(
      { query, document_id: documentId, session_id: sessionId },
      (token) => {
        if (mounted) setText((prev) => prev + token);
      },
      (info) => {
        setIsStreaming(false);
        setEndedInfo(info);
      },
      (errMsg) => {
        setError(errMsg);
        setIsStreaming(false);
      }
    ).catch((err) => {
      setError("Connection failed");
      setIsStreaming(false);
    });

    return () => {
      mounted = false;
    };
  }, [query, documentId, sessionId]);
  // console.log("streaming data", query, documentId, sessionId);
  // console.log("streaming data", text);
  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📚 Chat With Document</h2>

      {isStreaming && (
        <p className="text-gray-500 mb-2 animate-pulse">
          🔍 Streaming response...
        </p>
      )}
      {error && <p className="text-red-600">❌ {error}</p>}

      <div className="whitespace-pre-wrap font-mono bg-gray-100 p-4 rounded min-h-[120px]">
        {text || "Waiting for response..."}
      </div>

      {endedInfo && (
        <p className="mt-2 text-sm text-gray-600">
          ✅ Completed for document ID: <code>{endedInfo.document_id}</code>
        </p>
      )}
    </div>
  );
}
