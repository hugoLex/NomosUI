import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button, Head, Loader } from "@app/components/ui";
import {
  AppLayout as Layout,
  AppLayoutContext as LayoutContext,
} from "@app/components/layout";
import {
  SearchAIMetaResult,
  SearchFilterDrawer,
  SearchFilterSidebar,
  SearchHeader,
  SearchResultMeta,
} from "@app/components/app";
import { CloseIcon } from "@app/components/icons";
import {
  FilterOption,
  GenericObject,
  SearchResultDocumentMetaDocType,
  SearchType,
  TSearchData,
  TSearchResultDocument,
} from "@app/types";
import { useSearchQuery } from "@app/store/services/searchSlice";
import { flattenFilters } from "@app/utils/helpers";
import {
  searchURL,
  searchOptions as defaultSearchOptions,
} from "@app/utils/constants";
import { useVisibility } from "@app/hooks";
import { ErrorView404 } from "@app/components";
import { paginateData } from "@app/utils";

const Page = () => {
  const router = useRouter();
  const { q, page, type } = router.query;
  const query = String(q);
  const pageNumber = page ? Number(page) : undefined;
  const isPrev = pageNumber && pageNumber !== 1 ? false : true;

  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const searchRef = useRef<HTMLTextAreaElement | null>(null);

  const [isFilterDrawer, setIsFilterDrawer] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<SearchType>("cases");
  const [selectedDataOptions, setSelectedDataOptions] =
    useState<FilterOption | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<FilterOption[]>([]);
  const [searchOptions, setSearchOptions] =
    useState<FilterOption[]>(defaultSearchOptions);
  const [filterData, setFilterData] = useState<TSearchResultDocument[] | null>(
    null
  );
  const [
    {
      searchID,
      articlesData,
      casesData,
      llmData,
      legislationsData,
      principlesData,
    },
    setSearchData,
  ] = useState<TSearchData>({
    articlesData: null,
    casesData: null,
    llmData: null,
    legislationsData: null,
    principlesData: null,
    searchID: "",
  });

  const [searchDocuments, setSearchDocuments] = useState<{
    searchID: string;
    documents: TSearchResultDocument[];
    total: number;
  } | null>(null);

  const isH1Visible = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });

  const { isError, isFetching, isLoading, data } = useSearchQuery(
    {
      query,
      pageNumber,
      searchType: type as SearchResultDocumentMetaDocType | undefined,
    },
    {
      // refetchOnMountOrArgChange: true,
    }
  );

  // Initial data load
  useEffect(() => {
    if (isLoading || isFetching) {
      setSearchOptions(defaultSearchOptions);
      setSearchDocuments(null);
      setSearchType("cases");
    }

    if (data) {
      const { llmResult, searchResult } = data;

      if (llmResult !== null) {
        setSearchData((prev) => ({ ...prev, llmData: llmResult }));
      }

      if (searchResult !== null) {
        const searchOptionList: FilterOption[] = [];
        const {
          searchID,
          articles: articlesData,
          cases: casesData,
          legislation: legislationsData,
          principles: principlesData,
          filter_elements,
          total,
          results_per_document_type,
        } = searchResult;

        const {
          article: articlesTotal,
          case: casesTotal,
          legislation: legislationsTotal,
          principle: principlesTotal,
        } = results_per_document_type;

        const {
          article: articleFilters,
          case: caseFilters,
          legislation: legislationFitlers,
          principle: principleFilters,
        } = filter_elements;

        if (articleFilters && articlesTotal) {
          const { article_title, author, area_of_law } = articleFilters;
          const options = [
            {
              id: "article_tile",
              label: "Article Title",
              options: article_title,
            },
            { id: "author", label: "Author", options: author },
            { id: "area_of_law", label: "Area of Law", options: area_of_law },
          ];

          searchOptionList.push({
            id: "articles",
            label: `Articles (${articlesTotal})`,
            options,
          });

          if (!casesData) {
            setSearchType("articles");
          }
        }

        if (caseFilters && casesTotal) {
          const { court, area_of_law, year } = caseFilters;
          const options = [
            { id: "court", label: "Court", options: court },
            { id: "area_of_law", label: "Area of Law", options: area_of_law },
            { id: "year", label: "Year", options: year },
          ];

          searchOptionList.push({
            id: "cases",
            label: `Cases (${casesTotal})`,
            options,
          });
        }

        if (legislationFitlers && legislationsTotal) {
          const { document_title, section_number } = legislationFitlers;
          const options = [
            {
              id: "document_title",
              label: "Document Title",
              options: document_title,
            },
            {
              id: "section_number",
              label: "Section Number",
              options: section_number,
            },
          ];

          searchOptionList.push({
            id: "legislations",
            label: `Legislations (${legislationsTotal})`,
            options,
          });

          if (!casesData || !articlesData) {
            setSearchType("legislations");
          }
        }

        if (principleFilters && principlesTotal) {
          const { court, subject_matter, year } = principleFilters;
          const options: FilterOption[] = [
            { id: "court", label: "Court", options: court },
            {
              id: "subject_matter",
              label: "Subject matter",
              options: subject_matter,
            },
            { id: "year", label: "Year", options: year ? year : [] },
          ];

          searchOptionList.push({
            id: "principles",
            label: `Principles (${principlesTotal})`,
            options,
          });

          if (!casesData || !articlesData || !legislationsData) {
            setSearchType("principles");
          }
        }

        setSearchOptions(searchOptionList);
        setSearchData((prev) => ({
          ...prev,
          articlesData:
            articlesData && articlesTotal
              ? { documents: articlesData, total: articlesTotal }
              : null,
          casesData:
            casesData && casesTotal
              ? { documents: casesData, total: casesTotal }
              : null,
          legislationsData:
            legislationsData && legislationsTotal
              ? { documents: legislationsData, total: legislationsTotal }
              : null,
          principlesData:
            principlesData && principlesTotal
              ? { documents: principlesData, total: principlesTotal }
              : null,
          searchID,
        }));
      }
    }

    return () => {};
  }, [isLoading, isFetching, data]);

  useEffect(() => {
    const offset = 0,
      limit = 5;

    if (searchType === "cases" && casesData !== null) {
      const documents: TSearchResultDocument[] = paginateData(
        casesData.documents,
        offset,
        limit
      );

      setSearchDocuments({
        searchID,
        documents,
        total: casesData.total,
      });
    }

    if (searchType === "articles" && articlesData !== null) {
      const documents: TSearchResultDocument[] = paginateData(
        articlesData.documents,
        offset,
        limit
      );

      setSearchDocuments({
        searchID,
        documents,
        total: articlesData.total,
      });
    }

    if (searchType === "legislations" && legislationsData !== null) {
      const documents: TSearchResultDocument[] = paginateData(
        legislationsData.documents,
        offset,
        limit
      );
      setSearchDocuments({
        searchID,
        documents,
        total: legislationsData.total,
      });
    }

    if (searchType === "principles" && principlesData !== null) {
      const documents: TSearchResultDocument[] = paginateData(
        principlesData.documents,
        offset,
        limit
      );
      setSearchDocuments({
        searchID,
        documents,
        total: principlesData.total,
      });
    }

    return () => {};
  }, [
    searchType,
    searchID,
    casesData,
    articlesData,
    legislationsData,
    principlesData,
  ]);

  //  selected filter search
  useEffect(() => {
    const searchId: string =
      searchDocuments !== null ? searchDocuments.searchID : "";
    const fetchFilter = async () => {
      const { area_of_law, court, year } = selectedOptions.reduce(
        (acc, curr) => {
          const { id, options } = curr;
          // const key = id.split(" ").join("_").toLowerCase();
          return { ...acc, [id]: options };
        },
        {} as GenericObject
      );

      const applyCourt =
        court && court.length > 0 ? `&court=${court.join(" ")}` : "";
      const applyYear =
        year && year.length > 0 ? `&year=${year.join(" ")}` : "";
      const appyAreaOfLaw =
        area_of_law && area_of_law.length > 0
          ? `&area_of_law=${area_of_law.join(" ")}`
          : "";
      const applyFilters = `${applyCourt}${applyYear}${appyAreaOfLaw}`;

      try {
        const res = await fetch(
          `${searchURL}/filter?search_id=${searchId}${applyFilters}`
        );
        const data = (await res.json()) as TSearchResultDocument[];
        setFilterData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedOptions.length !== 0) {
      // fetchFilter();
    }

    return () => {};
  }, [searchDocuments, selectedOptions]);

  const allFilters = flattenFilters(selectedOptions);

  const removeFilter = (_id: string, _option: string) => {
    setSelectedOptions((prev) => [
      ...prev.filter(({ id }) => id !== _id),
      {
        id: _id,
        options:
          prev
            .find(({ id }) => id === _id)
            ?.options.filter((y) => y !== _option) || [],
      },
    ]);
  };

  const handleSelection = (_id: string, _idx: string) => {
    const filteredSelection = searchOptions.filter(({ id }) => id === _id)[0];
    const filteredDataOption = filteredSelection.options.filter(
      ({ id }) => id === _idx
    )[0];

    setSelectedDataOptions(filteredDataOption);

    if (!isFilterDrawer) {
      setIsFilterDrawer(true);
    }
  };

  const handleSelectedOption = (_id: string, option: any) => {
    const previousOptions =
      selectedOptions.find(({ id }) => id === _id)?.options || [];

    const hasOption = previousOptions?.includes(option);

    setSelectedOptions((prev) => [
      ...prev.filter(({ id }) => id !== _id),
      {
        id: _id,
        options: hasOption
          ? previousOptions.filter((x) => x !== option)
          : [...previousOptions, option],
      },
    ]);
  };

  const handleSelectedSearchType = (_id: SearchType) => {
    setSearchType(_id);

    router.push(
      {
        pathname: "/search",
        query: {
          ...router.query,
          filter: _id,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  // const prevPage = () => {
  //   const url = {
  //     pathname: `/search`,
  //     query: { ...router.query, page: Number(pageNumber) - 1 },
  //   };
  //   router.push(url, undefined, {
  //     shallow: true,
  //   });
  // };

  // const nextPage = () => {
  //   let next: number;

  //   pageNumber ? (next = Number(pageNumber) + 1) : (next = 2);

  //   const url = {
  //     pathname: router.pathname,
  //     query: { ...router.query, page: next },
  //   };

  //   router.push(url, undefined, { shallow: true });
  // };

  const loadMoreDocs = () => {
    if (searchDocuments) {
      const offset =
        searchDocuments.documents.length > 0
          ? searchDocuments.documents.length + 1
          : 0;
      let docs: TSearchResultDocument[] = [];

      switch (searchType) {
        case "articles":
          docs = paginateData(
            articlesData ? articlesData?.documents : [],
            offset,
            5
          );
          break;

        case "cases":
          docs = paginateData(casesData ? casesData?.documents : [], offset, 5);

          break;

        case "legislations":
          docs = paginateData(
            legislationsData ? legislationsData?.documents : [],
            offset,
            5
          );

          break;

        case "principles":
          docs = paginateData(
            principlesData ? principlesData?.documents : [],
            offset,
            5
          );

          break;
      }

      setSearchDocuments((prev) =>
        prev
          ? {
              ...prev,
              documents: [...prev.documents, ...docs],
            }
          : prev
      );
    }
  };

  return (
    <Fragment>
      <Head title={`Search Result - ${q}`} />
      <Layout className="h-screen">
        <SearchHeader
          query={query}
          isH1Visible={isH1Visible}
          searchBtnRef={searchRef}
        />

        {(isFetching || isLoading) && (
          <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
            <Loader variant="classic" size={80} />
          </div>
        )}

        {isError && (
          <ErrorView404
            caption="No matching legal resources found"
            desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
          />
        )}

        {!isFetching && !isError && (
          <section className="relative flex self-stretch min-h-screen">
            <div
              className={`py-6 px-16 max-md:px-5  mx-auto max-w-[1100px]
                  `}
              // ${ isFilterDrawer ? "w-[80%] flex-1" : ""  }
            >
              <div className="md:grid grid-cols-12 gap-8">
                <div className="col-span-8">
                  <h1
                    id="searchQuery"
                    ref={h1Ref}
                    className="text-xx font-normal mb-6"
                  >
                    Legal findings:
                    <span className="text-[#245b91]"> {q}</span>
                  </h1>

                  {/* Filter  {resultData.llm =List */}
                  {allFilters.length > 0 && (
                    <div className="flex gap-3 flex-wrap mb-4 items-center">
                      <p>Applied Filters</p>
                      {selectedOptions
                        .filter((elem) => elem.options.length > 0)
                        .map((filter) => (
                          <div
                            key={filter.id}
                            className=" flex flex-wrap gap-2"
                          >
                            {filter.options.map((option, idx) => (
                              <Fragment key={idx}>
                                <span className="flex gap-2 items-center px-2 py-[0.125rem] bg-stone-100 rounded text-[0.8rem] text-center text-teal-900 text-sm font-normal">
                                  {option}
                                  <CloseIcon
                                    width={18}
                                    height={18}
                                    role="button"
                                    stroke="#000"
                                    onClick={() =>
                                      removeFilter(filter.id, option)
                                    }
                                  />
                                </span>
                              </Fragment>
                            ))}
                          </div>
                        ))}
                    </div>
                  )}

                  {/* LLM result */}
                  <Fragment>
                    {llmData === null && <Fragment />}
                    {llmData !== null && (
                      <SearchAIMetaResult
                        detail={llmData.detail}
                        llm={{
                          replies: llmData.llm.replies,
                        }}
                        message={llmData.message}
                        retriever={llmData.retriever}
                      />
                    )}
                  </Fragment>

                  {/* Search result */}
                  <div className="my-6">
                    {allFilters.length === 0 && (
                      <Fragment>
                        {searchDocuments &&
                          searchDocuments.documents?.map((data, idx) => (
                            <SearchResultMeta
                              key={`${data.metadata.document_id}-${idx}`}
                              index={String(idx + 1)}
                              data={data}
                              type={searchType}
                            />
                          ))}
                      </Fragment>
                    )}

                    {allFilters.length > 0 &&
                      filterData &&
                      filterData.length > 0 && (
                        <Fragment>
                          <div>
                            {filterData?.map((data, idx) => (
                              <SearchResultMeta
                                key={data.metadata.document_id}
                                index={String(idx + 1)}
                                data={data}
                                type={searchType}
                              />
                            ))}
                          </div>
                        </Fragment>
                      )}
                  </div>
                </div>

                {/* Search sidebar */}
                <div className="col-span-4">
                  <div className="sticky md:top-[68px]">
                    <SearchFilterSidebar
                      data={searchOptions}
                      handleSelection={handleSelection}
                      handleSelectedSearchType={handleSelectedSearchType}
                      defaultValue={searchType}
                    />
                  </div>
                </div>
              </div>

              {/* Search result pagination */}
              {/* {searchDocuments && (
                <div className="flex flex-col justify-center gap-2">
                  <div className="inline-flex justify-content-center gap-8 mx-auto">
                    <button
                      id="prev"
                      className={`gap-3 hover:opacity-40 ${
                        isPrev ? "hidden" : "inline-flex"
                      }`}
                      disabled={isPrev}
                      onClick={prevPage}
                    >
                      <ArrowLeftIcon stroke="black" />
                      Previous
                    </button>
                    {searchDocuments.total > 5 && (
                      <button
                        id="next"
                        className={`inline-flex gap-3 hover:opacity-40`}
                        disabled={
                          data.search.length < 9 ? true : false //why setting isDisabled again
                        }
                        onClick={nextPage}
                      >
                        Next <ArrowRightIcon stroke="black" />
                      </button>
                    )}
                  </div>
                  <div
                    className={`text-center my-3 ${
                      !isPrev ? "block" : "hidden"
                    }`}
                  >
                    <span>Page No: {pageNumber ?? "1"}</span>
                  </div>
                </div>
              )} */}

              {searchDocuments &&
                searchDocuments.documents.length < searchDocuments.total && (
                  <div className="flex justify-center py-2.5">
                    <Button
                      label={"load more"}
                      onClick={loadMoreDocs}
                      className="hover:bg-primary/75 bg-primary text-white h-[36px]"
                    />
                  </div>
                )}
            </div>

            {/* Filter drawer */}
            <SearchFilterDrawer
              isShow={isFilterDrawer}
              label={searchType as string}
              data={selectedDataOptions}
              selectedOptions={selectedOptions}
              closeDrawer={() => setIsFilterDrawer(false)}
              onSelectedOption={handleSelectedOption}
            />
          </section>
        )}
      </Layout>
    </Fragment>
  );
};

export default Page;
