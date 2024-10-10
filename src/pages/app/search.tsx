import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Head, Loader } from "@app/components/ui";
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
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@app/components/icons";
import {
  ArticleResults,
  CaseResults,
  LegislationResults,
  FilterOption,
  GenericObject,
  SearchData,
  SearchType,
  CaseDocuments,
  LegislationDocuments,
  ArticleDocuments,
} from "@app/types";
import {
  useArticlesSearchQuery,
  useCasesSearchQuery,
  useLLMSearchQuery,
  useLegislationsSearchQuery,
} from "@app/store/services/searchSlice";
import { flattenFilters } from "@app/utils/helpers";
import {
  dummyCasesResult,
  dummyArticleResult,
  dummyLegislationResult,
  dummyLLMResult,
  searchURL,
  searchOptions as defaultSearchOptions,
} from "@app/utils/constants";
import { useVisibility } from "@app/hooks";

type SearchDataResults = ArticleResults | CaseResults | LegislationResults;
type SearchDocuments =
  | CaseDocuments[]
  | LegislationDocuments[]
  | ArticleDocuments[];

const useSearch = (
  query: string,
  pageNumber: number | null,
  skip: boolean
): { data: SearchData; isError: boolean; isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<SearchData>({
    articlesData: null,
    casesData: null,
    llmData: null,
    legislationsData: null,
  });

  useEffect(() => {
    setIsLoading(true);
    setData({
      articlesData: null,
      casesData: null,
      llmData: null,
      legislationsData: null,
    });
  }, [query]);

  const { data: llmData, isError: llmError } = useLLMSearchQuery(query);

  const { data: casesData, isError: casesError } = useCasesSearchQuery({
    query,
    pageNumber,
  });

  const { data: articlesData, isError: articlesError } = useArticlesSearchQuery(
    {
      query,
      pageNumber,
    },
    { skip }
  );

  const { data: legislationsData, isError: legislationsError } =
    useLegislationsSearchQuery(
      {
        query,
        pageNumber,
      },
      { skip }
    );

  useEffect(() => {
    if (llmData) {
      setData((prev) => ({ ...prev, llmData }));
      setIsLoading(false);
    }

    if (casesData) {
      setData((prev) => ({ ...prev, casesData }));
      setIsLoading(false);
    }

    if ((llmError && casesError) || articlesError || legislationsError) {
      setIsError(true);
      setIsLoading(false);
    }

    return () => {};
  }, [
    articlesData,
    casesData,
    llmData,
    legislationsData,
    articlesError,
    casesError,
    legislationsError,
    llmError,
  ]);

  return {
    data: {
      articlesData: dummyArticleResult,
      legislationsData: dummyLegislationResult,
      llmData: dummyLLMResult,
      casesData: dummyCasesResult,
    },
    isError: false,
    isLoading: false,
  };
};

const Page = () => {
  const router = useRouter();
  const { q, page } = router.query;
  const query = String(q);
  const pageNumber = page ? Number(page) : null;
  const isPrev = pageNumber && pageNumber !== 1 ? false : true;

  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const searchRef = useRef<HTMLTextAreaElement | null>(null);

  const [prefetch, setPrefetch] = useState<boolean>(true);
  const [isFilterDrawer, setIsFilterDrawer] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<SearchType>("cases");
  const [filterData, setFilterData] = useState<SearchDataResults | null>(null);
  const [selectedDataOptions, setSelectedDataOptions] =
    useState<FilterOption | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<FilterOption[]>([]);
  const [searchOptions, setSearchOptions] =
    useState<FilterOption[]>(defaultSearchOptions);

  const isH1Visible = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });

  const { data, isError, isLoading } = useSearch(query, pageNumber, prefetch);
  const { articlesData, casesData, llmData, legislationsData } = data;

  const SearchDocuments = useMemo((): {
    documents: SearchDocuments;
    total: number;
  } | null => {
    if (searchType === "cases" && casesData) {
      const { documents, total_cases } = casesData;
      return { documents, total: total_cases };
    }
    if (searchType === "articles" && articlesData) {
      const { documents, total_articles } = articlesData;
      return { documents, total: total_articles };
    }
    if (searchType === "legislations" && legislationsData) {
      const { documents, total_legislation } = legislationsData;
      return { documents, total: total_legislation };
    }
    return null;
  }, [searchType, casesData, articlesData, legislationsData]);

  useEffect(() => {
    if (casesData !== null) {
      const { filter_elements, documents } = casesData;
      const { area_of_law, court, year } = filter_elements;
      const options = [
        { id: "court", label: "Court", options: court },
        { id: "area_of_law", label: "Area of Law", options: area_of_law },
        { id: "year", label: "Year", options: year },
      ];

      setSearchOptions((prev) =>
        prev.map((itx) => {
          return itx.id === "cases" ? { ...itx, options } : itx;
        })
      );
      setPrefetch(true);
    }

    if (articlesData !== null) {
      const { filter_elements } = articlesData;
      const { article_title, author, area_of_law } = filter_elements;
      const options = [
        { id: "article_tile", label: "Article Title", options: article_title },
        { id: "author", label: "Author", options: author },
        { id: "area_of_law", label: "Area of Law", options: area_of_law },
      ];
      setSearchOptions((prev) =>
        prev.map((itx) => {
          return itx.id === "articles" ? { ...itx, options } : itx;
        })
      );
    }

    if (legislationsData !== null) {
      const { filter_elements } = legislationsData;
      const { document_title, section_number } = filter_elements;
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
      setSearchOptions((prev) =>
        prev.map((itx) => {
          return itx.id === "legislations" ? { ...itx, options } : itx;
        })
      );
    }

    return () => {};
  }, [prefetch, casesData, articlesData, legislationsData]);

  useEffect(() => {
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
          `${searchURL}/filter?search_id=${casesData?.search_id}${applyFilters}`
        );
        const data = (await res.json()) as SearchDataResults;
        setFilterData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedOptions.length !== 0) {
      fetchFilter();
    }

    return () => {};
  }, [casesData, selectedOptions]);

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

  const prevPage = () => {
    const url = {
      pathname: `/search`,
      query: { ...router.query, page: Number(pageNumber) - 1 },
    };
    router.push(url, undefined, {
      shallow: true,
    });
  };

  const nextPage = () => {
    let next: number;

    pageNumber ? (next = Number(pageNumber) + 1) : (next = 2);

    const url = {
      pathname: router.pathname,
      query: { ...router.query, page: next },
    };

    router.push(url, undefined, { shallow: true });
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

  const handleSelectedSearchType = (_id: any) => setSearchType(_id);

  return (
    <Fragment>
      <Head title={`Search Result - ${q}`} />
      <Layout className="h-screen">
        <SearchHeader
          query={query}
          isH1Visible={isH1Visible}
          searchBtnRef={searchRef}
        />

        {isLoading && (
          <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
            <Loader variant="classic" size={80} />
          </div>
        )}

        {!isLoading && !isError && (
          <Fragment>
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

                    <Fragment>
                      {llmData === null && <Loader variant="classic" />}
                      {llmData !== null && (
                        <SearchAIMetaResult
                          llm={llmData.llm}
                          retriever={llmData.retriever}
                        />
                      )}
                    </Fragment>

                    <div className="my-6">
                      {allFilters.length === 0 && SearchDocuments && (
                        <Fragment>
                          {SearchDocuments.documents?.map((data, idx) => (
                            <SearchResultMeta
                              key={data.id}
                              index={String(idx + 1)}
                              data={data}
                              type={searchType}
                            />
                          ))}
                        </Fragment>
                      )}

                      {allFilters.length > 0 &&
                        filterData &&
                        filterData.documents.length > 0 && (
                          <Fragment>
                            <div>
                              {filterData.documents?.map((data, idx) => (
                                <SearchResultMeta
                                  key={data.id}
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

                  {SearchDocuments && (
                    <div className="col-span-4">
                      <div className="sticky md:top-[68px]">
                        <SearchFilterSidebar
                          data={searchOptions}
                          handleSelection={handleSelection}
                          handleSelectedSearchType={handleSelectedSearchType}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {SearchDocuments && (
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
                      <button
                        id="next"
                        className={`inline-flex gap-3 hover:opacity-40`}
                        // disabled={
                        //   data.search.length < 9 ? true : false //why setting isDisabled again
                        // }
                        onClick={nextPage}
                      >
                        Next <ArrowRightIcon stroke="black" />
                      </button>
                    </div>
                    <div
                      className={`text-center my-3 ${
                        !isPrev ? "block" : "hidden"
                      }`}
                    >
                      <span>Page No: {pageNumber ?? "1"}</span>
                    </div>
                  </div>
                )}
              </div>

              <SearchFilterDrawer
                isShow={isFilterDrawer}
                label={searchType.toString()}
                data={selectedDataOptions}
                selectedOptions={selectedOptions}
                closeDrawer={() => setIsFilterDrawer(false)}
                onSelectedOption={handleSelectedOption}
              />
            </section>
          </Fragment>
        )}

        {!isLoading && isError && (
          <div className="flex-1 flex justify-center items-center self-stretch">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                  {/* Heroicon name: outline/exclamation-triangle */}
                  <svg
                    className="h-6 w-6 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Unknown error occurred.
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Follow these steps to resolve:
                    </p>
                    <ol className="text-sm text-gray-500 list-disc ml-8 mt-2 flex gap-2 flex-col">
                      <li className="list-item list-disc">
                        Retry a different search term or keyword.
                      </li>
                      <li className="list-item list-disc">Reload the tab.</li>
                      <li className="list-item list-disc">
                        Clear cache and reload the tab.
                      </li>
                      <li className="list-item list-disc">
                        Close and relaunch the browser.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </Fragment>
  );
};

export default Page;
