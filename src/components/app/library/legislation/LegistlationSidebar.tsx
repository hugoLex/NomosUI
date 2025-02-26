import { GenericObject } from "@app/types";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import {
  LuChevronDown,
  LuChevronUp,
  LuFileText,
  LuSearch,
  LuX,
} from "react-icons/lu";

const LegislativeSidebar = ({ sections = [] }) => {
  const [expandedChapters, setExpandedChapters] = useState<GenericObject>({
    chapter1: true, // First chapter expanded by default
  });
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // References for scrolling elements into view
  const sectionRefs = useRef<GenericObject>({});

  // Sample data structure for legislative documents - use passed sections if available
  const legislativeStructure =
    sections.length > 0
      ? sections
      : [
          {
            id: "chapter1",
            chapterNumber: "Chapter 1",
            title: "Preliminary Provisions",
            sections: [
              {
                id: "section1",
                title: "Section 1: Short Title and Commencement",
              },
              { id: "section2", title: "Section 2: Interpretation" },
              { id: "section3", title: "Section 3: Application" },
            ],
          },
          {
            id: "chapter2",
            chapterNumber: "Chapter 2",
            title: "Fundamental Rights and Duties",
            sections: [
              { id: "section4", title: "Section 4: Right to Life" },
              { id: "section5", title: "Section 5: Right to Equality" },
              {
                id: "section6",
                title:
                  "Section 6: Right to Privacy and Freedom of Movement that spans across multiple lines to demonstrate truncation",
              },
            ],
          },
          {
            id: "chapter3",
            chapterNumber: "Chapter 3",
            title:
              "Administrative Provisions with a very long title that should be truncated to maintain consistent layout throughout the sidebar navigation",
            sections: [
              { id: "section7", title: "Section 7: Appointment of Officers" },
              { id: "section8", title: "Section 8: Powers and Functions" },
              {
                id: "section9",
                title:
                  "Section 9: Administrative Procedures and Regulatory Framework for Implementation of Provisions",
              },
            ],
          },
        ];

  // If no sections are available, show empty state
  const hasContent =
    sections.length > 0 || legislativeStructure[0].sections.length > 0;

  // Search functionality
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    // Prevent form submission and page refresh
    if (event) event.preventDefault();

    // Clean the search term
    const cleanedTerm = searchTerm
      .trim()
      .replace(/[^\w\s]/gi, "")
      .toLowerCase();

    if (cleanedTerm === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Search for matching chapters and sections
    const results: any[] = [];

    legislativeStructure.forEach((chapter) => {
      // Check if chapter matches
      if (
        chapter.chapterNumber.toLowerCase().includes(cleanedTerm) ||
        chapter.title.toLowerCase().includes(cleanedTerm)
      ) {
        results.push({ type: "chapter", id: chapter.id });
      }

      // Check if any sections match
      chapter.sections.forEach((section) => {
        if (section.title.toLowerCase().includes(cleanedTerm)) {
          results.push({
            type: "section",
            id: section.id,
            chapterId: chapter.id,
          });
        }
      });
    });

    setSearchResults(results);

    // Expand chapters that have matching sections
    const chaptersToExpand: GenericObject = {};
    results.forEach((result) => {
      if (result.type === "section") {
        chaptersToExpand[result.chapterId] = true;
      }
    });

    setExpandedChapters((prev) => ({
      ...prev,
      ...chaptersToExpand,
    }));

    // If there's a result, scroll the first one into view
    if (results.length > 0) {
      setTimeout(() => {
        const firstResult = results[0];
        scrollToItem(firstResult.id);
      }, 100);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  };

  const scrollToItem = (id: string) => {
    if (sectionRefs.current[id]) {
      sectionRefs.current[id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Update search results when search term changes
  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchTerm]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Navigation logic would go here
  };

  return (
    <div
      className={`flex h-[calc(100vh-100px)] w-full flex-col border-r border-gray-200  font-rubik scrollbar`}
    >
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 ">
        <div className="flex items-center gap-2 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <LuFileText className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-base font-medium text-gray-800">
            Arrangement of Sections
          </h2>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="border-t border-gray-100 px-4 py-2"
        >
          <div className="relative flex items-center">
            <LuSearch className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chapters and sections..."
              className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-10 text-sm focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 rounded-full p-1 hover:bg-gray-100"
              >
                <LuX className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {hasContent ? (
          legislativeStructure.map((chapter) => (
            <div
              key={chapter.id}
              className="mb-3"
              ref={(el) => (sectionRefs.current[chapter.id] = el)}
            >
              <button
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full rounded-md p-2 text-left transition-colors hover:bg-blue-50 ${
                  searchResults.some(
                    (r) => r.type === "chapter" && r.id === chapter.id
                  )
                    ? "bg-yellow-50 ring-2 ring-yellow-200"
                    : ""
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    {chapter.chapterNumber}
                  </span>
                  <span className="truncate text-sm text-gray-700">
                    {chapter.title}
                  </span>
                </div>
                <div className="mt-1 flex justify-end">
                  {expandedChapters[chapter.id] ? (
                    <LuChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <LuChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              </button>

              {expandedChapters[chapter.id] && (
                <div className="ml-4 mt-1 space-y-1 animate-fadeIn">
                  {chapter.sections.map((section) => (
                    <button
                      key={section.id}
                      ref={(el) => (sectionRefs.current[section.id] = el)}
                      onClick={() => handleSectionClick(section.id)}
                      className={`flex w-full items-center rounded-md p-2 text-left text-sm transition-all duration-200 
                        ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : searchResults.some(
                                (r) =>
                                  r.type === "section" && r.id === section.id
                              )
                            ? "bg-yellow-50 ring-2 ring-yellow-200 text-gray-800"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      <LuFileText
                        className={`mr-2 h-4 w-4 flex-shrink-0 ${
                          activeSection === section.id
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="truncate">{section.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center px-4 text-center">
            <div className="rounded-full bg-gray-100 p-6">
              <LuFileText className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-base font-medium text-gray-700">
              No sections available
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              There are no sections to display for this document yet.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Sections will appear here when they are added to the document.
            </p>
          </div>
        )}

        {isSearching && searchResults.length === 0 && (
          <div className="mt-6 flex flex-col items-center justify-center px-4 text-center">
            <div className="rounded-full bg-gray-100 p-4">
              <LuSearch className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-700">
              No results found
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Try adjusting your search terms to find what you&apos;re looking
              for.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes highlight {
          0% {
            background-color: rgba(252, 211, 77, 0.3);
          }
          50% {
            background-color: rgba(252, 211, 77, 0.5);
          }
          100% {
            background-color: rgba(252, 211, 77, 0.3);
          }
        }
        .highlight {
          animation: highlight 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LegislativeSidebar;
