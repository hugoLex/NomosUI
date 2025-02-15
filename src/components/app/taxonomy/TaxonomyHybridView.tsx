import React, { useState } from "react";
import type { SetStateAction } from "react";
import { LuSearch, LuBriefcase, LuBook, LuFileText } from "react-icons/lu";
import {
  TaxonomySummaryCard,
  TaxonomyAreaSummary,
  DocumentPanel,
} from "./RenderComponents";
import { MappedTx, Taxonomy } from "@app/types";
import { topLevelAreas as _topDocs } from "@app/utils/constants";

// Main Component
const TaxonomyHybridView = ({ data }: { data: MappedTx[] }) => {
  console.log(data);
  // State declarations
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("all");
  const [selectedAreaCard, setSelectedAreaCard] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState<Taxonomy | null>(null);
  const [showDocPanel, setShowDocPanel] = useState(false);

  const handleConceptClick = (concept: SetStateAction<Taxonomy | null>) => {
    console.log(concept);
    setSelectedConcept(concept);
    setShowDocPanel(true);
  };

  const filteredAreas = data.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50  rounded-t-lg">
      {/* Search and Document Type Filters */}
      <div className=" p-4 bg-white border-b  rounded-t-lg">
        <div className="hidden items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <LuSearch
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search taxonomy..."
              className="w-full pl-10 pr-4 py-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div
            className={`flex items-center gap-1 cursor-pointer p-2 rounded
              ${selectedDocType === "case" ? "bg-blue-50" : ""}`}
            onClick={() => setSelectedDocType("case")}
          >
            <LuBriefcase size={16} /> Cases
          </div>
          <div
            className={`flex items-center gap-1 cursor-pointer p-2 rounded
              ${selectedDocType === "legislation" ? "bg-blue-50" : ""}`}
            onClick={() => setSelectedDocType("legislation")}
          >
            <LuBook size={16} /> Legislation
          </div>
          <div
            className={`flex items-center gap-1 cursor-pointer p-2 rounded
              ${selectedDocType === "article" ? "bg-blue-50" : ""}`}
            onClick={() => setSelectedDocType("article")}
          >
            <LuFileText size={16} /> Articles
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-y-hidden">
        {/* Left Panel: Areas of Law */}
        <div className="w-72 border-r bg-white p-4 overflow-y-auto">
          <h3 className="text-base font-semibold mb-4">Areas of Law</h3>
          <div className="space-y-3 overflow-y-auto">
            {filteredAreas.map((area) => (
              <TaxonomySummaryCard
                key={area.id}
                taxonomy={area}
                isSelected={selectedAreaCard === area.id}
                onClick={setSelectedAreaCard}
              />
            ))}
          </div>
        </div>

        {/* Right Panel: Area Details */}
        <div className="flex-1 flex overflow-y-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedAreaCard ? (
              <TaxonomyAreaSummary
                taxonomy={filteredAreas.find((a) => a.id === selectedAreaCard)}
                onConceptClick={handleConceptClick}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select an area of law to view details
              </div>
            )}
          </div>

          {/* Document Panel */}
          {showDocPanel && selectedConcept && (
            <DocumentPanel
              docId={selectedConcept.id}
              onClose={() => setShowDocPanel(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxonomyHybridView;
