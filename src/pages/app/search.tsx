import React, { Fragment, useEffect, useRef, useState } from "react";
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
  FilterOption,
  GenericObject,
  SearchData,
  SearchType,
  SearchDataResults,
  SearchDocuments,
} from "@app/types";
import { useBaseSearchQuery } from "@app/store/services/searchSlice";
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
import { ErrorView404 } from "@app/components";

const Page = () => {
  const router = useRouter();
  const { q, page } = router.query;
  const query = String(q);
  const pageNumber = page ? Number(page) : undefined;
  const isPrev = pageNumber && pageNumber !== 1 ? false : true;

  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const searchRef = useRef<HTMLTextAreaElement | null>(null);

  const [isFilterDrawer, setIsFilterDrawer] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<SearchType>("cases");
  const [filterData, setFilterData] = useState<SearchDataResults | null>(null);
  const [selectedDataOptions, setSelectedDataOptions] =
    useState<FilterOption | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<FilterOption[]>([]);
  const [searchOptions, setSearchOptions] =
    useState<FilterOption[]>(defaultSearchOptions);
  const [
    { articlesData, casesData, legislationsData, llmData },
    setSearchData,
  ] = useState<SearchData>({
    articlesData: null,
    casesData: null,
    legislationsData: null,
    llmData: null,
  });
  const [searchDocuments, setSearchDocuments] = useState<{
    documents: SearchDocuments;
    total: number;
  } | null>(null);

  const isH1Visible = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });

  const { isError, isLoading, isFetching, data } = useBaseSearchQuery(
    { query, pageNumber, searchType },
    {
      // refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      const { llmData, casesData, articlesData, legislationsData } = data;

      setSearchData({
        articlesData: articlesData,
        casesData: casesData,
        llmData: llmData,
        legislationsData: legislationsData,
      });

      if (casesData) {
        const { filter_elements, total_cases } = casesData;
        const { area_of_law, court, year } = filter_elements;
        const options = [
          { id: "court", label: "Court", options: court },
          { id: "area_of_law", label: "Area of Law", options: area_of_law },
          { id: "year", label: "Year", options: year },
        ];

        setSearchOptions((prev) =>
          prev.map((itx) => {
            return itx.id === "cases"
              ? { ...itx, label: `Cases (${total_cases})`, options }
              : itx;
          })
        );
      }

      if (articlesData) {
        const { filter_elements, total_articles } = articlesData;
        const { article_title, author, area_of_law } = filter_elements;
        const options = [
          {
            id: "article_tile",
            label: "Article Title",
            options: article_title,
          },
          { id: "author", label: "Author", options: author },
          { id: "area_of_law", label: "Area of Law", options: area_of_law },
        ];

        if (!casesData || !legislationsData) {
          setSearchType("articles");
        }
        setSearchOptions((prev) =>
          prev.map((itx) => {
            return itx.id === "articles"
              ? { ...itx, label: `Articles (${total_articles})`, options }
              : itx;
          })
        );
      }

      if (legislationsData) {
        const { filter_elements, total_legislation } = legislationsData;
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

        if (!casesData || !articlesData) {
          setSearchType("legislations");
        }

        setSearchOptions((prev) =>
          prev.map((itx) => {
            return itx.id === "legislations"
              ? {
                  ...itx,
                  label: `Legislations (${total_legislation})`,
                  options,
                }
              : itx;
          })
        );
      }

      if (!casesData) {
        setSearchOptions((prev) => prev.filter((itx) => itx.id !== "cases"));
      }

      if (!articlesData) {
        setSearchOptions((prev) => prev.filter((itx) => itx.id !== "articles"));
      }

      if (!legislationsData) {
        setSearchOptions((prev) =>
          prev.filter((itx) => itx.id !== "legislations")
        );
      }
    }

    return () => {};
  }, [data]);

  useEffect(() => {
    if (searchType === "cases" && casesData) {
      const { documents, total_cases } = casesData;
      setSearchDocuments({ documents, total: total_cases });
    }

    if (searchType === "articles" && articlesData) {
      const { documents, total_articles } = articlesData;
      setSearchDocuments({ documents, total: total_articles });
    }

    if (searchType === "legislations" && legislationsData) {
      const { documents, total_legislation } = legislationsData;
      setSearchDocuments({ documents, total: total_legislation });
    }

    return () => {};
  }, [searchType, casesData, articlesData, legislationsData]);

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
                    {!llmData && <Loader variant="classic" />}
                    {llmData && (
                      <SearchAIMetaResult
                        llm={llmData.llm}
                        retriever={llmData.retriever}
                        message={llmData.message}
                      />
                    )}
                  </Fragment>

                  <div className="my-6">
                    {allFilters.length === 0 && searchDocuments && (
                      <Fragment>
                        {searchDocuments.documents?.map((data, idx) => (
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

                {searchDocuments && (
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
                )}
              </div>

              {searchDocuments && (
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
                        // disabled={
                        //   data.search.length < 9 ? true : false //why setting isDisabled again
                        // }
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
        )}
      </Layout>
    </Fragment>
  );
};

export default Page;
