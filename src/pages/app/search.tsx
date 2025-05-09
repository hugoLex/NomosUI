import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button, Head, Loader } from "@app/components/ui";
import { AppLayout, AppLayoutContext } from "@app/components/layout";
import {
  SearchAIMetaResult,
  SearchFilterDrawer,
  SearchFilterSidebar,
  SearchResultMeta,
} from "@app/components/app/search";
import { CloseIcon } from "@app/components/icons";
import {
  FilterOption,
  GenericObject,
  LLMResult,
  NextPageWithLayout,
  SearchResultDocumentMetaDocType,
  SearchType,
  TSearchData,
  TSearchResultClassifier,
  TSearchResultDocument,
  TSearchResultDocuments,
} from "@app/types";
import {
  searchQueryUtil,
  useQuery_route_classifierQuery,
  //   useLlm_searchQuery,
  useSearchQuery,
  useSemantic_searchQuery,
} from "@app/store/services/searchSlice";
import { flattenFilters } from "@app/utils/helpers";
import {
  searchURL,
  searchOptions as defaultSearchOptions,
} from "@app/utils/constants";
import { useVisibility } from "@app/hooks";
import {
  ActionButtons,
  Container,
  ErrorView404,
  Navbar,
  NavbarTitle,
} from "@app/components/shared";
import { paginateData } from "@app/utils";
import useQueryToggler from "@app/hooks/useQueryHandler";
import BgClosebtn from "@app/components/shared/bgClosebtn";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import StartLlmSearch from "@app/components/shared/proupgrade";

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { setReferrer } = useContext(AppLayoutContext);
  const { q, page, type } = router.query;
  const query = String(q);
  const pageNumber = page ? Number(page) : undefined;
  // const isPrev = pageNumber && pageNumber !== 1 ? false : true;
  const {
    searchParams,
    UpdateUrlParams,
    pathname,
    createQueryString,
    removeQueryParam,
  } = useQueryToggler();
  const activeTab_query_type = searchParams.get("query_type") || "sematic_s";
  const BgClosebtn_State = searchParams.get("menu");
  const right_cover_menu = searchParams.get("right_cover_menu");
  const h1Ref = useRef<HTMLHeadingElement | null>(null);

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
  // const {
  //   data: search_classifier,
  //   isError: isError_clas,
  //   isFetching: isFetching_clas,
  //   isLoading: Isloading_clas,
  // } = useQuery_route_classifierQuery(query ? query : skipToken);
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

  const isTitle = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });

  const { isError, isFetching, isLoading, data } = useSearchQuery(
    skipToken //uncomment later if i am to use the former end point
    // {
    //   query: `question=${query}&format=markdown`,
    //   pageNumber,
    //   searchType: type as SearchResultDocumentMetaDocType | undefined,
    // },
    // {
    //   // refetchOnMountOrArgChange: true,
    // }
  );
  //   console.log("The query is classified as:", search_classifier?.classification);
  const {
    data: sementic_data,
    isLoading: sem_loading,
    isFetching: sem_fetching,
    isError: sem_error,
    refetch,
  } = useSemantic_searchQuery(
    query ? query : skipToken
    // search_classifier?.classification === "semantic" ? query : skipToken
  );
  const [llm_data, setLlm_data] = useState<
    | string
    | {
        markdown: string;
      }
    | undefined
  >();

  // Initial data load
  useEffect(() => {
    setReferrer(router.asPath);

    if (sem_loading || sem_fetching) {
      setSearchOptions(defaultSearchOptions);
      setSearchDocuments(null);
      setSearchType("cases");
    }
    // console.log("search result test", sementic_data);
    if (sementic_data) {
      if ((sementic_data as TSearchResultDocuments)?.searchID) {
        const searchOptionList: FilterOption[] = [];
        const searchtype: string[] = [];
        const {
          searchID,
          articles: articlesData,
          cases: casesData,
          legislation: legislationsData,
          principles: principlesData,
          filter_elements,
          total,
          results_per_document_type,
        } = sementic_data as TSearchResultDocuments;

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
        }

        casesData
          ? setSearchType("cases")
          : legislationsData
          ? setSearchType("legislations")
          : articlesData
          ? setSearchType("articles")
          : setSearchType("principles");

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
  }, [
    // sem_loading,
    // search_classifier?.classification,
    // sem_fetching,
    sementic_data,
    setReferrer,
    router.asPath,
  ]);

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

  if (sem_fetching || sem_loading)
    return (
      <Fragment>
        <Head title={`Search Result - ${q}`} />
        <Navbar />

        <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
          <Loader variant="classic" size={80} />
        </div>
      </Fragment>
    );

  if (sem_error)
    return (
      <Fragment>
        <Head title={`Search Result - ${q}`} />
        <Navbar />
        <ErrorView404
          caption="No matching legal resources found"
          desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
        />
      </Fragment>
    );
  // console.log("semantic data", sementic_data);
  return (
    <Fragment>
      <Head title={`Search Result - ${q}`} />

      <Navbar>
        <div className="md:flex justify-between py-2.5">
          <NavbarTitle isTitle={!isTitle} title={query} />
          <ActionButtons />
        </div>
      </Navbar>

      {!sem_fetching && !sem_error && (
        <Container>
          <div className={`py-8 w-full md:max-w-[772px] mx-auto`}>
            <div className="">
              {/* <div className="md:grid justify-center grid-cols-12 gap-8"> */}
              {/* Search sidebar */}
              {/* <div className="col-span-4">
                <div className="sticky md:top-[68px]">
                  <SearchFilterSidebar
                    data={searchOptions}
                    handleSelection={handleSelection}
                    handleSelectedSearchType={handleSelectedSearchType}
                    defaultValue={searchType as string}
                  />
                </div>
              </div> */}
              {/* Search results */}
              <div className="">
                {/* was 8 with the sidebar  */}
                {/* <div className="col-span-8"> */}
                <h1
                  id="searchQuery"
                  ref={h1Ref}
                  className={`${
                    q && q?.length > 73 ? "text-lg" : "text-xx"
                  } font-normal mb-6`}
                >
                  {/* Relevant sources for: */}
                  <span
                    className={` text-[#245b91] font-gilda_Display capitalize font-bold`}
                  >
                    {q}
                  </span>
                </h1>

                {/* Filter  {resultData.llm =List */}
                {allFilters.length > 0 && (
                  <div className="flex gap-3 flex-wrap mb-4 items-center">
                    <p>Applied Filters</p>
                    {selectedOptions
                      .filter((elem) => elem.options.length > 0)
                      .map((filter) => (
                        <div key={filter.id} className=" flex flex-wrap gap-2">
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
                  {/* {
                    isTitle && (
                      <StartLlmSearch />
                    )
                    
                  } */}
                  <div
                    className={`mb-6 ${
                      !isTitle ? "pt-[30px] pb- [20px]" : null
                    }  sticky z-[1] top-[55px] bg-white [rgb(250,250,249)] `}
                  >
                    {" "}
                    <StartLlmSearch />
                    <div className=" flex gap-[32px] items-center border-b border-gray-200 font-gilda_Display">
                      {sementic_data && (
                        <button
                          className={`pt-2 px- 4 pb-[20px] font-medium flex items-center ${
                            activeTab_query_type === "sematic_s"
                              ? "text-blue-600 border-b-2 border-blue-600 "
                              : "text-gray-500 hover:text-gray-700 "
                          }`}
                          onClick={() =>
                            UpdateUrlParams("query_type", "sematic_s")
                          }
                        >
                          CASES
                          {sementic_data && (
                            <button className="p-1 py-[2px] text-black text-[10px] bg-gray-black rounded-md ml-[2px]">
                              {
                                (
                                  sementic_data as TSearchResultDocuments & {
                                    total_results: number;
                                  }
                                )?.total_results
                              }
                            </button>
                          )}
                          {/* Search */}
                        </button>
                      )}
                      {llm_data ? (
                        <button
                          className={`pt-2 pb-[20px] px- 4 font-medium ${
                            activeTab_query_type === "llm_s"
                              ? "text-blue-600 border-b-2 border-blue-600 pb-[20px]"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => UpdateUrlParams("query_type", "llm_s")}
                        >
                          Deep Analysis
                        </button>
                      ) : (
                        <button
                          className={`py-2 px- 4 font-medium text-gray-500 opacity-0
                          `}
                        >
                          Deep Analysis
                        </button>
                      )}
                      <button
                        className="ml-auto w-[73.41px] h-[32px] flex gap-1 items-center"
                        onClick={() => {
                          UpdateUrlParams("right_cover_menu", "true");
                        }}
                        // onClick={() => UpdateUrlParams("menu", "true")}
                        type="button"
                      >
                        <span className="flex-shrink-0">Filters</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7142857142857142"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="tabler-icon tabler-icon-arrow-up-right duration-150"
                        >
                          <path d="M17 7l-10 10"></path>
                          <path d="M8 7l9 0l0 9"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {!searchDocuments?.documents && <Fragment />}
                  {activeTab_query_type === "llm_s" && (
                    //   {llm_search_data && activeTab_query_type === "llm_s" && (
                    <SearchAIMetaResult setLlm_data={setLlm_data} />
                    // <SearchAIMetaResult data={llm_search_data} />
                  )}
                  {right_cover_menu && (
                    <div
                      onClick={() => removeQueryParam("right_cover_menu")}
                      className={` bg-red- 500 max-md:h idden fixed top-[20px] right-[25px] h-[90%] z-[99999] w-[99%]
                      `}
                    >
                      <div className="bg-white ml-auto  min-w-[500px] w-[40vw] h-screen shadow-overlay top-0 right-0 fixed  animate-in slide-in-from-right ">
                        <div className="min-h-[64px] justify-between flex items-center p-3.5 bg-purple- 500 border-b border-b-black\50  ">
                          <span>Tasks</span>
                          <svg
                            onClick={() => removeQueryParam("right_cover_menu")}
                            className="ml-auto cursor-pointer"
                            width="16"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line
                              x1="4"
                              y1="4"
                              x2="20"
                              y2="20"
                              stroke="black"
                              strokeWidth="2"
                            />
                            <line
                              x1="20"
                              y1="4"
                              x2="4"
                              y2="20"
                              stroke="black"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <BgClosebtn classname={`${activeTab_query_type === "right_cover_menu"    && "hidden"}`}><></></BgClosebtn> */}
                </Fragment>

                {/* Search result */}
                {(activeTab_query_type === "sematic_s" ||
                  activeTab_query_type !== "llm_s") && (
                  <div className="my-6 ">
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
                )}
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
              activeTab_query_type === "sematic_s" &&
              searchDocuments.documents.length < searchDocuments.total && (
                <div className="flex justify-center py-2.5">
                  <Button
                    label={"load more"}
                    onClick={loadMoreDocs}
                    className="primary"
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
        </Container>
      )}
    </Fragment>
  );
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      <AppLayout className="h-screen">{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
