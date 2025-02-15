import React, { Fragment, useState } from "react";
import type { SetStateAction } from "react";
import {
  LuChevronRight,
  LuBriefcase,
  LuBook,
  LuFileText,
  LuX,
} from "react-icons/lu";
import { useTaxonomyData } from "@app/hooks/useTaxonomyData";
import { useGetTaxonomyDocumentQuery } from "@app/store/services/taxnomySlice";
import { Loader } from "@app/components/ui";
import { conceptDocuments as _docs } from "@app/utils/constants";
import { MappedTx, TaxonomyDocuments } from "@app/types";

// Document Panel Component
export const DocumentPanel = ({
  docId,
  onClose,
}: {
  docId: string | number;
  onClose: () => void;
}) => {
  const { data, isLoading, isError } = useGetTaxonomyDocumentQuery(
    docId as string
  );

  const getDocumentIcon = (type: any) => {
    switch (type) {
      case "case":
        return <LuBriefcase size={24} />;
      case "legislation":
        return <LuBook size={24} />;
      case "article":
        return <LuFileText size={18} />;
      default:
        return null;
    }
  };

  const getSourceData = (
    data: string | { year: number; court: string; citation: string }
  ) => {
    const { court, citation, year } =
      typeof data === "string" ? JSON.parse(data) : data;

    return (
      <div className="flex gap-2 mt-2 text-xs text-gray-500">
        {court && <span>Court: {court}</span>}
        {citation && <span>Citation: {citation}</span>}
        {year && <span>Citation: {year}</span>}
      </div>
    );
  };

  if (isLoading)
    return (
      <Fragment>
        <div className="flex justify-center items-center h-screen w-96 border-l bg-white shadow-lg">
          <Loader variant="classic" size={24} />
        </div>
      </Fragment>
    );

  if (isError) {
    return (
      <Fragment>
        <div className="w-96 border-l bg-white shadow-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-base font-semibold">Related Documents</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <LuX size={16} />
            </button>
          </div>
          <p>Failed to load related documents</p>
        </div>
      </Fragment>
    );
  }

  const { documents } = data as TaxonomyDocuments;
  return (
    <div className="w-96 border-l bg-white shadow-lg overflow-y-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-base font-semibold">Related Documents</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <LuX size={16} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.document_id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            // onClick={() => (window.location.href = doc.url)}
          >
            <div className="flex items-start gap-3">
              {getDocumentIcon(doc.doc_type)}
              <div>
                <h4 className="text-sm font-medium text-primary">
                  {doc.title}
                </h4>
                {/* <p className="text-sm text-gray-600 mt-1">{doc.summary}</p> */}
                {getSourceData(doc.source_data)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Area Details Component
export const TaxonomyAreaSummary = ({
  taxonomy,
  onConceptClick,
}: {
  taxonomy?: MappedTx;
  onConceptClick: Function;
}) => {
  if (!taxonomy) return <Fragment />;

  const Documents = ({ text = "documents" }) => (
    <Fragment>
      {taxonomy.document_breakdown && (
        <div className="text-sm text-gray-600">
          {
            Object.values(
              typeof taxonomy.document_breakdown === "string"
                ? JSON.parse(taxonomy.document_breakdown)
                : taxonomy.document_breakdown
            ).reduce((a, b) => Number(a) + Number(b), 0) as number
          }
          {text}
        </div>
      )}
    </Fragment>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{taxonomy.name}</h3>
        <Documents text={"total documents"} />
      </div>

      <div className="space-y-6 ">
        {taxonomy.children?.map((subject) => (
          <div key={subject.id}>
            {!subject.children && (
              <Fragment>
                <div className="flex flex-wrap">
                  <div
                    className="min-w-[33%] p-4 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => onConceptClick(subject)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-semibold">{subject.name}</h4>
                      <LuChevronRight size={16} className="text-gray-400" />
                    </div>
                    <Documents />
                  </div>
                </div>
              </Fragment>
            )}

            {subject.children && (
              <Fragment>
                <h4 className="font-medium text-xs mb-3 text-gray-700">
                  {subject.name}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {subject.children?.map(
                    (concept: {
                      id: React.Key | null | undefined;
                      name: string;
                      document_breakdown: any;
                    }) => (
                      <div
                        key={concept.id}
                        className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                        onClick={() => onConceptClick(concept)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{concept.name}</span>
                          <LuChevronRight size={16} className="text-gray-400" />
                        </div>
                        <Documents />
                        {/* <div className="mt-2 text-sm text-gray-600">
                        {Object.values(concept.document_breakdown).reduce(
                          (a, b) => a + b,
                          0
                        )}
                        documents
                      </div> */}
                      </div>
                    )
                  )}
                </div>
              </Fragment>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Area Summary Card Component
export const TaxonomySummaryCard = ({
  taxonomy,
  isSelected,
  onClick,
}: {
  taxonomy: MappedTx;
  isSelected: boolean;
  onClick: Function;
}) => {
  const totalDocs = taxonomy.document_breakdown
    ? (Object.values(
        typeof taxonomy.document_breakdown === "string"
          ? JSON.parse(taxonomy.document_breakdown)
          : taxonomy.document_breakdown
      ).reduce((a, b) => Number(a) + Number(b), 0) as number)
    : "";

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all w-full
        ${isSelected ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
      onClick={() => onClick(taxonomy.id)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">{taxonomy.name}</h3>
        <div className="text-sm text-gray-600">{totalDocs} documents</div>
      </div>
    </div>
  );
};
