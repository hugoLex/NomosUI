// components/DocumentSelector.tsx

import useQueryToggler from "@app/hooks/useQueryHandler";
import { Search, MessageCircle } from "lucide-react";
import { useState } from "react";

interface Document {
  id: string;
  title: string;
  court?: string;
  year?: string;
  type?: string;
}

interface DocumentSelectorProps {
  documents: Document[];
  onSelectDocument: (document: Document) => void;
  selectedDocumentId?: string;
}
const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  documents,
  onSelectDocument,
  selectedDocumentId,
}) => {
  const { searchParams } = useQueryToggler();
  const [searchTerm, setSearchTerm] = useState("");
  // for testing purposes, I am using a static list of documents
  const docId = "cca34a12-17a2-464c-a4a6-0f3b3a93e4c6";
  // searchParams.get("documentId") || "cca34a12-17a2-464c-a4a6-0f3b3a93e4c6";
  const docTitle =
    searchParams.get("title") || "test document title vs sample document";
  documents = [
    {
      id: docId,
      title: docTitle,
      court: "Court of Appeal",
      year: "2019",
      type: "Criminal Law",
    },
  ];
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.court?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[250px] bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Legal Documents
        </h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onSelectDocument(doc)}
            className={`
              p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors
              ${
                selectedDocumentId === doc.id
                  ? "bg-blue-50 border-r-4 border-r-blue-500"
                  : ""
              }
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 truncate">
                  {doc.title}
                </h3>
                {(doc.court || doc.year) && (
                  <p className="text-sm text-gray-500 mt-1">
                    {doc.court} {doc.year && `(${doc.year})`}
                  </p>
                )}
                {doc.type && (
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mt-2">
                    {doc.type}
                  </span>
                )}
              </div>

              <MessageCircle className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
            </div>
          </div>
        ))}

        {filteredDocuments.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            <p>No documents found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentSelector;
