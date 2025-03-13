import { GenericObject, MappedTx } from "@app/types";
import Link from "next/link";
import React, { useState, useEffect, Fragment } from "react";
import {
  LuChevronRight,
  LuSearch,
  LuX,
  LuBook,
  LuChevronDown,
} from "react-icons/lu";

import { taxonomyData } from "@app/utils";
import { DocumentLinks } from "./RenderComponents";

const TaxonomyMainView = ({ data = [] }: { data: MappedTx[] }) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<any>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);
  const [filteredCategories, setFilteredCategories] =
    useState<GenericObject[]>(data);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    GenericObject[]
  >([]);
  const [searchLocation, setSearchLocation] = useState<string>("domain"); // 'domain' or 'subject'

  // Function to count documents for a subject matter
  const getDocumentCount = (subjectMatter: string) => {
    const count =
      filteredSubcategories.find(({ name }) => name === subjectMatter)
        ?.total_documents || 0;

    if (count === 0) {
      return ""; // Return empty string for zero documents
    }

    if (count >= 1000) {
      return `${Math.floor(count / 1000)}k`;
    }

    return count;
  };

  // Handle search functionality
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCategories(data);
      setFilteredSubcategories(
        activeCategory
          ? data.find(({ name }) => name === activeCategory)?.children || []
          : []
      );
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    if (searchLocation === "domain") {
      // Search in legal domains
      const results = data.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredCategories(results);

      // If there's a result, auto-select it
      if (results.length > 0 && !data.find((c) => c.name === activeCategory)) {
        setActiveCategory(results[0].name);

        // Find a matching subcategory
        const subcategories =
          data.find(({ name }) => name === activeCategory)?.children || [];
        if (subcategories.length > 0) {
          setActiveSubcategory(subcategories[0].name);
        }
      }

      // Update filtered subcategories based on active category
      if (activeCategory) {
        setFilteredSubcategories(
          data.find(({ name }) => name === activeCategory)?.children || []
        );
      }
    } else {
      // Search in subject matters across all categories
      let foundSubcategories: any[] = [];

      // Keep all categories visible when searching in subject matters
      setFilteredCategories(data);

      // Search in all subcategories
      for (const category in data) {
        const matchingSubcategories = data[category].children.filter(
          (subcategory) =>
            subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (matchingSubcategories.length > 0) {
          foundSubcategories = [
            ...foundSubcategories,
            ...matchingSubcategories,
          ];
        }
      }

      // If searching in subject matters, filter the subcategories of active category
      // if (activeCategory) {
      //   foundSubcategories = foundSubcategories.filter((subcategory) =>
      //     data
      //       .find(activeCategory)
      //       ?.children.some((s) => s.id === subcategory.id)
      //   );
      // }

      setFilteredSubcategories(foundSubcategories);

      // If no active category but found subcategories, try to determine the category
      if (!activeCategory && foundSubcategories.length > 0) {
        // Find which category this subcategory belongs to
        for (const category in data) {
          if (
            data
              .find(({ name }) => name === category)
              ?.children.some((s) => s.id === foundSubcategories[0].id)
          ) {
            setActiveCategory(category);
            setActiveSubcategory(foundSubcategories[0].name);
            break;
          }
        }
      }
    }
  }, [data, searchTerm, searchLocation, activeCategory]);

  // Update filtered subcategories when active category changes
  useEffect(() => {
    if (activeCategory) {
      const subcategories =
        data.find(({ name }) => name === activeCategory)?.children || [];
      if (searchTerm && searchLocation === "subject") {
        setFilteredSubcategories(
          subcategories.filter((subcategory) =>
            subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      } else {
        setFilteredSubcategories(subcategories);
      }
    } else {
      setFilteredSubcategories([]);
    }
  }, [data, activeCategory, searchLocation, searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setActiveSubcategory(null); // Clear subcategory selection when category changes

    // Don't automatically select first subcategory
    // Let user explicitly select a subject matter to show documents
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    setActiveSubcategory(subcategoryName);
    setSelectedSubcategory(
      filteredSubcategories.find(({ name }) => name === subcategoryName) || {}
    );
  };

  const handleSearchLocationChange = (location: string) => {
    setSearchLocation(location);
    setShowDropdown(false);
  };
  return (
    <div className="w-full font-rubik">
      {/* Centered Container with Title and Content */}
      <div className="max-w-6xl mx-auto">
        {/* Title at the top */}
        <h1 className="hidden text-2xl font-semi-bold mb-6">
          Legal Taxonomy Demo
        </h1>

        {/* Search Box */}
        <div className="mb-6 py-3 bg-gray-50 rounded-lg">
          <div className="relative flex">
            {/* Search dropdown selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="inline-flex items-center px-3 py-2 border border-gray-200 bg-white text-sm rounded-l-md focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
              >
                <span className="mr-1">
                  {searchLocation === "domain"
                    ? "Legal domain"
                    : "Subject matter"}
                </span>
                <LuChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showDropdown && (
                <div className="absolute z-[100] mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => handleSearchLocationChange("domain")}
                      className={`block px-4 py-2 text-sm text-left w-full ${
                        searchLocation === "domain"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      role="menuitem"
                    >
                      Legal domain
                    </button>
                    <button
                      onClick={() => handleSearchLocationChange("subject")}
                      className={`block px-4 py-2 text-sm text-left w-full ${
                        searchLocation === "subject"
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      role="menuitem"
                    >
                      Subject matter
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search input */}
            <div className="relative flex-1">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  searchLocation === "domain"
                    ? "Search legal domain..."
                    : "Search subject matter..."
                }
                className="w-full rounded-r-md border border-gray-200 py-2 pl-10 pr-10 text-sm focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 border-l-0"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
                >
                  <LuX className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Add 25px spacing here */}
        <div className="hidden h-25" style={{ height: "25px" }}></div>

        {/* Taxonomy Container */}
        <div className="grid grid-cols-3 w-full">
          {/* Legal Domain Column (renamed from Areas of Law) */}
          <div className=" pr-4 relative ">
            {/* Card header with dark blue background - fixed */}
            <div className="bg-primary text-white py-2 px-4 rounded-t-md mb-2 sticky top-0">
              <h2 className="text-base font-normal text-inherit">
                Legal domain
              </h2>
            </div>

            <div className="space-y-0 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar">
              {filteredCategories.map((category) => (
                <div key={category.id} className="relative">
                  {/* Connector line */}
                  <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-300"></div>

                  {/* Horizontal connector line */}
                  <div className="absolute left-3 top-1/2 w-3 h-px bg-gray-300"></div>

                  <div
                    onClick={() => handleCategoryClick(category.name)}
                    className={`pl-6 pr-3 py-2 rounded-md cursor-pointer transition-all duration-200 ml-7
                      ${
                        activeCategory === category.name
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {category.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider line */}
            <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
          </div>

          {/* Subject Matter Column (renamed from Subcategories) */}
          <div className=" px-4 relative ">
            {/* Card header with dark blue background - fixed */}
            <div className="bg-primary text-white py-2 px-4 rounded-t-md mb-2 sticky top-0">
              <h2 className="text-base font-normal text-inherit">
                Subject matter
              </h2>
            </div>

            {activeCategory ? (
              <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar">
                {filteredSubcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    onClick={() => handleSubcategoryClick(subcategory.name)}
                    // the first name is always repeating the name of the legal domain hence this logic
                    // if this is fixed then remove this logic
                    className={` 
                      ${
                        subcategory.document_breakdown !== null && "hidden"
                      } px-3 py-2 rounded-md cursor-pointer transition-all duration-200 flex justify-between items-center
                      ${
                        activeSubcategory === subcategory.name
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span>{subcategory.name}</span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">
                        {getDocumentCount(subcategory.name)}
                      </span>
                      <LuChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-60 text-center px-4">
                <div className="rounded-full bg-gray-100 p-4">
                  <LuChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-3 text-sm font-medium text-gray-700">
                  No legal domain selected
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Please select a legal domain from the first column to view
                  subject matters.
                </p>
              </div>
            )}

            {/* Divider line */}
            <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
          </div>

          {/* Related Documents Column */}
          <div className=" pl-4 ">
            {/* Card header with dark blue background - fixed */}
            <div className="bg-primary text-white py-2 px-4 rounded-t-md mb-2 sticky top-0 ">
              <h2 className="text-base text-inherit font-normal">
                Related Documents
              </h2>
            </div>

            {activeSubcategory && (
              <Fragment>
                <DocumentLinks
                  docId={selectedSubcategory.id}
                  onClose={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                <div className="hidden space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar">
                  {filteredSubcategories[activeSubcategory]?.map(
                    (document: GenericObject) => (
                      <Link
                        key={document.id}
                        href={`/documents/${document.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" p-3 rounded-md border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 bg-white block"
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1 flex-shrink-0">
                            <LuBook className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1 flex-shrink-0">
                            {" "}
                            {/* min-w-0 prevents overflow */}
                            <div className="flex items-center">
                              <h3
                                className="font-medium text-blue-600 truncate mr-2 text-sm"
                                style={{ fontSize: "14px" }}
                                title={document.name}
                              >
                                {document.name}
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
                            <div className="mt-2 flex flex-col space-y-1 text-xs">
                              <p
                                className="text-gray-700 truncate"
                                style={{ fontSize: "13.5px" }}
                              >
                                {document.court}
                              </p>
                              <p
                                className="text-gray-700"
                                style={{ fontSize: "13.5px" }}
                              >
                                {document.citation1}
                              </p>
                              <p
                                className="text-gray-700"
                                style={{ fontSize: "13.5px" }}
                              >
                                {document.citation2}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  )}

                  {(!filteredCategories[activeSubcategory] ||
                    filteredCategories[activeSubcategory].length === 0) && (
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
                  )}
                </div>
              </Fragment>
            )}

            {!activeSubcategory && (
              <div className="flex flex-col items-center justify-center h-60 text-center px-4">
                <div className="rounded-full bg-gray-100 p-4">
                  <LuBook className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-3 text-sm font-medium text-gray-700">
                  No subject matter selected
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Please select a subject matter from the second column to view
                  related documents.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxonomyMainView;
