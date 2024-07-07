import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { Head, Loader, Shimmer } from "@app/components/ui";
import {
  AppLayout as Layout,
  AppLayoutContext as LayoutContext,
} from "@app/components/layout";
import {
  FilterSideBar,
  SearchAIMetaResult,
  SearchHeader,
  SearchResultMeta,
} from "@app/components/app";
import { GenericObject, SearchData, SearchResult } from "@app/types";
import {
  useFilterCasesQuery,
  useSearchCasesQuery,
} from "@app/store/services/searchSlice";
import { useGetAIQuery } from "@app/store/services/aiSlice";
import { flattenFilters } from "@app/utils/helpers";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Filter2Icon,
} from "@app/components/icons";
import {
  dummySearchResult as searchResult,
  dummyLLMResult as llmResult,
  searchURL,
} from "@app/utils/constants";

const useSearch = (query: string, pageNumber: string | number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<SearchData>({
    llmResult: null,
    searchResult: null,
  });

  const { data: llmResult, isError: llmError } = useGetAIQuery(query);

  const { data: searchResult, isError: searchError } = useSearchCasesQuery({
    query: String(query),
    pageNumber: String(pageNumber),
  });

  useEffect(() => {
    if (llmResult) {
      setData((prev) => ({ ...prev, llmResult }));
      setIsLoading(false);
    }

    if (searchResult) {
      setData((prev) => ({ ...prev, searchResult }));
      setIsLoading(false);
    }

    if (llmError && searchError) {
      setIsError(true);
      setIsLoading(false);
    }

    return () => {};
  }, [llmResult, searchResult, llmError, searchError]);

  return { data, isError, isLoading };
};

const Page = () => {
  const router = useRouter();

  const { q, page } = router.query;

  const query = String(q);
  const pageNumber = page ? String(page) : "1";
  const isPrev = pageNumber && Number(pageNumber) !== 1 ? false : true;

  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const searchRef = useRef<HTMLTextAreaElement | null>(null);

  const [filters, setFilters] = useState<
    { header: string; options: string[] }[]
  >([]);

  const [filterData, setFilterData] = useState<SearchResult | null>(null);

  // For test
  // const isSuccess = true,
  //   isError = false,
  //   isLoading = false;

  // For production
  const { data, isError, isLoading } = useSearch(query, pageNumber);

  const { llmResult, searchResult } = data;

  useEffect(() => {
    const fetchFilter = async () => {
      const { area_of_law, court, year } = filters.reduce((acc, curr) => {
        const { header, options } = curr;
        const key = header.split(" ").join("_").toLowerCase();
        return { ...acc, [key]: options };
      }, {} as GenericObject);

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
          `${searchURL}/filter?search_id=${searchResult?.search_id}${applyFilters}`
        );
        const data = (await res.json()) as SearchResult;
        setFilterData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (filters.length !== 0) {
      fetchFilter();
    }

    return () => {};
  }, [searchResult, filters]);

  const allFilters = flattenFilters(filters);

  const removeFilter = (header: string, option: string) => {
    setFilters((prev) => [
      ...prev.filter((x) => x.header !== header),
      {
        header,
        options:
          prev
            .find((x) => x.header === header)
            ?.options.filter((y) => y !== option) || [],
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

  return (
    <Fragment>
      <Head title={`Search Result - ${q}`} />
      <Layout>
        <SearchHeader query={query} h1Ref={h1Ref} searchBtnRef={searchRef} />

        {isLoading && (
          <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-full">
            <Loader />
          </div>
        )}

        {!isLoading && !isError && (
          <Fragment>
            <section className="flex justify-center items-center self-stretch py-6 ">
              <div className="px-16 max-md:px-5  mx-auto max-w-[1100px]">
                <div className="md:grid grid-cols-12 gap-8">
                  <div className="col-span-8">
                    <div className="flex flex-col">
                      <h1
                        id="searchQuery"
                        ref={h1Ref}
                        className="text-xx font-normal mb-6"
                      >
                        Legal findings:
                        <span className="text-[#245b91]"> {q}</span>
                      </h1>

                      {allFilters.length > 0 && (
                        <div className="flex gap-3 flex-wrap">
                          <Fragment>
                            {/* <p
                            className="py-0.5 px-3 rounded-xl flex gap-1 text-white 
                      items-center text-sm bg-primary"
                          >
                            <Filter2Icon className="fill-white size-3" />
                            <span className="ml-2">Filter</span>
                            <span className="text-sm">
                              ({allFilters.length})
                            </span>
                          </p> */}
                            <p className="">Applied Filters</p>
                          </Fragment>
                          {filters
                            .filter((elem) => elem.options.length > 0)
                            .map((filter) => (
                              <div
                                key={filter.header}
                                className=" flex flex-wrap gap-2"
                              >
                                {filter.options.map((option, idx) => (
                                  <Fragment key={idx}>
                                    {/* <div className="text-sm font-normal py-0.5 px-3 rounded-xl flex gap-2 bg-black/5">
                                    <span>{option}</span>
                                    <button
                                      className="text-red-600"
                                      onClick={() =>
                                        removeFilter(filter.header, option)
                                      }
                                    >
                                      x
                                    </button>
                                  </div> */}
                                    <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-[0.8rem] text-center text-teal-900 text-sm font-normal">
                                      {option}
                                    </span>
                                  </Fragment>
                                ))}
                              </div>
                            ))}
                        </div>
                      )}

                      {llmResult !== null && (
                        <SearchAIMetaResult
                          replies={llmResult.llm?.replies}
                          meta={llmResult.llm?.meta}
                        />
                      )}
                    </div>

                    <div className="my-6">
                      {allFilters.length === 0 &&
                        searchResult &&
                        searchResult.documents.length > 0 && (
                          <Fragment>
                            <div>
                              {searchResult.documents?.map((data, idx) => (
                                <SearchResultMeta
                                  key={data.id}
                                  index={String(idx + 1)}
                                  data={data}
                                />
                              ))}
                            </div>
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
                                />
                              ))}
                            </div>
                          </Fragment>
                        )}
                    </div>
                  </div>
                  {searchResult && (
                    <div className="col-span-4">
                      <div className="sticky md:top-[68px]">
                        <FilterSideBar
                          data={searchResult.filter_elements}
                          filters={filters}
                          setFilters={setFilters}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <section className="flex flex-col justify-center gap-2">
              <div className="inline-flex justify-content-center gap-8 mx-auto">
                <button
                  id="prev"
                  className={`inline-flex gap-3 ${isPrev ? "opacity-50" : ""}`}
                  disabled={isPrev}
                  onClick={prevPage}
                >
                  <ArrowLeftIcon stroke="black" />
                  Previous
                </button>
                <button
                  id="next"
                  className={`inline-flex gap-3`}
                  // disabled={
                  //   data.search.length < 9 ? true : false //why setting isDisabled again
                  // }
                  onClick={nextPage}
                >
                  Next <ArrowRightIcon stroke="black" />
                </button>
              </div>
              <div className="text-center my-3">
                <span>Page No: {pageNumber ?? "1"}</span>
              </div>
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
