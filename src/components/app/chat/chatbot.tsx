// Main ChatbotApp.tsx

import { MessageCircle } from "lucide-react";
import { useState } from "react";
import DocumentChat from "./DocumentChat";
import DocumentSelector from "./DocumentSelector";
import useQueryToggler from "@app/hooks/useQueryHandler";

// import DocumentSelector from "./components/DocumentSelector";
// import DocumentChat from "./components/DocumentChat";
interface Document {
  id: string;
  title: string;
  court?: string;
  year?: string;
  type?: string;
}
const ChatbotApp: React.FC = () => {
  const { searchParams } = useQueryToggler();
  const [searchTerm, setSearchTerm] = useState("");
  // for testing purposes, I am using a static list of documents
  const docId = "cca34a12-17a2-464c-a4a6-0f3b3a93e4c6";
  // searchParams.get("documentId") || "cca34a12-17a2-464c-a4a6-0f3b3a93e4c6";
  const docTitle =
    searchParams.get("title") || "test document title vs sample document";

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    docId
      ? {
          id: docId,
          title: docTitle,
          court: "Court of Appeal",
          year: "2019",
          type: "Criminal Law",
        }
      : null
  );

  // Sample documents - replace with your actual data
  const documents: Document[] = [
    {
      id: "cca34a12-17a2-464c-a4a6-0f3b3a93e4c6",
      title: "Gabriel Tormua Suswam v. Federal Republic of Nigeria",
      court: "Court of Appeal",
      year: "2019",
      type: "Criminal Law",
    },
    {
      id: "3289732c-1c87-4aee-8f02-c45eab323c21",
      title: "Addo v. The State",
      court: "Court of Appeal",
      year: "2016",
      type: "Criminal Law",
    },
    // Add more documents...
  ];

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Document Selector */}
      {/* <DocumentSelector
        documents={documents}
        onSelectDocument={setSelectedDocument}
        selectedDocumentId={selectedDocument?.id}
      /> */}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col  ">
        {selectedDocument ? (
          <DocumentChat
            documentId={selectedDocument.id}
            documentTitle={selectedDocument.title}
            onClose={() => setSelectedDocument(null)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium mb-2">Legal Document Chat</h3>
              <p>Select a document from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotApp;
