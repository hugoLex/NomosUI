import React, { Fragment, useState } from "react";
import type { SetStateAction } from "react";
import Link from "next/link";
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
import { GenericObject, MappedTx, TaxonomyDocuments } from "@app/types";

export const DocumentLinks = ({
  docId,
  onClose,
}: {
  docId: string | number;
  onClose: () => void;
}) => {
  const { data, isLoading, isFetching, isError } = useGetTaxonomyDocumentQuery(
    docId as string
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-full w-ful">
        <Loader variant="classic" size={16} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <div className="rounded-full bg-gray-100 p-4">
          <LuBook className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="mt-3 text-sm font-medium text-gray-700">
          No documents available
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          There are no documents in this category yet.
        </p>
      </div>
    );
  }

  const { documents } = data as TaxonomyDocuments;

  const getLinkType = (type: any, id: string, title: string) => {
    console.log(type);
    switch (type) {
      case "case":
        return `/library/cases/${id}?title=${title}&tab=case`;
      case "legislation":
        return `/library/legislations/${id}?title=${title}`;
      case "article":
        return `/library/articles/${id}?title=${title}`;
      default:
        return "";
    }
  };

  const getSourceData = (data: string | GenericObject) => {
    const doc = typeof data === "string" ? JSON.parse(data) : data;

    return (
      <Fragment>
        <div className="mt-2 flex flex-col space-y-1 text-xs">
          <p className="text-gray-700 " style={{ fontSize: "13.5px" }}>
            <span>{doc.court}</span>
            <span> {doc.year}</span>
          </p>
          <p className="text-gray-700 truncate" style={{ fontSize: "13.5px" }}>
            {doc.citation}
          </p>
        </div>
      </Fragment>
    );
  };

  return documents.map((document: GenericObject) => (
    <Link
      key={document.id}
      href={`${getLinkType(
        document.doc_type,
        document.document_id,
        document.title
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-md border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200  block"
    >
      <div className="flex items-start">
        <div className="mr-3 flex-shrink-0">
          <LuFileText className="h-5 w-5 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          {/* min-w-0 prevents overflow */}
          <div className="flex items-center">
            <h3
              className="font-medium text-blue-600 truncate mr-2 text-sm"
              style={{ fontSize: "14px" }}
              title={document.title}
            >
              {document.title}
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 flex-shrink-0 ml-auto"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
          {getSourceData(document.source_data)}
        </div>
      </div>
    </Link>
  ));
};

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
