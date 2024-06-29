import React, { Fragment, useContext, useEffect, useState } from "react";
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
import { SearchData } from "@app/types";
import { useSearchCasesQuery } from "@app/store/services/searchSlice";
import { useGetAIQuery } from "@app/store/services/aiSlice";
import { flattenFilters } from "@app/utils/helpers";
import { Filter2Icon } from "@app/components/icons";

const useSearch = (query: string | undefined, pageNumber: string | number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<SearchData>({
    llmResult: null,
    searchResult: null,
  });

  const {
    data: llmResult,
    isError: llmError,
    isFetching: fetchingLLM,
    isLoading: loadingLLM,
    isSuccess: llmSuccess,
  } = useGetAIQuery(String(query));

  const {
    data: searchResult,
    isError: searchError,
    isFetching: fetchingSearch,
    isLoading: loadingSearch,
    isSuccess: searchSuccess,
  } = useSearchCasesQuery({
    query: String(query),
    pageNumber: String(pageNumber),
  });

  useEffect(() => {
    const isLoadingLLM = loadingLLM || fetchingLLM ? true : false;
    const isLoadingSearch = loadingSearch || fetchingSearch ? true : false;

    if (isLoadingLLM || isLoadingSearch) {
      setIsError(false);
      setIsSuccess(false);
      setIsLoading(true);
    }

    if (llmSuccess && llmResult) {
      setData((prev) => ({ ...prev, llmResult }));
      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    }

    if (searchSuccess && searchResult) {
      setData((prev) => ({ ...prev, searchResult }));
      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    }

    if (llmError && searchError) {
      setIsSuccess(false);
      setIsLoading(false);
      setIsError(true);
    }

    return () => {};
  }, [
    fetchingLLM,
    fetchingSearch,
    loadingLLM,
    loadingSearch,
    llmResult,
    searchResult,
    llmSuccess,
    searchSuccess,
    llmError,
    searchError,
  ]);

  return { data, isError, isLoading, isSuccess };
};

const Page = () => {
  const router = useRouter();

  const { q, page } = router.query;

  const query = q ? String(q) : undefined;
  const pageNumber = page ? String(page) : "1";

  const { data, isError, isLoading, isSuccess } = useSearch(query, pageNumber);

  // const results = new Array(15).fill({
  //   caseTitle: 'John Doe vs Mike Doe',
  //   date: '1991-1-1',
  //   court: 'High Court',
  // });

  const [filters, setFilters] = useState<
    { header: string; options: string[] }[]
  >([]);

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

  return (
    <Fragment>
      <Head title={`Search Result - ${q}`} />
      <Layout>
        <SearchHeader />
        {isLoading && (
          <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-full">
            <Loader />
          </div>
        )}

        {isSuccess && (
          <section className="flex justify-center items-center self-stretch py-6 ">
            <div className="px-16 max-md:px-5  mx-auto max-w-[1100px]">
              <div className="md:grid grid-cols-12 gap-8">
                <div className="col-span-8">
                  <div className="flex flex-col">
                    <h1 className="text-xx font-normal mb-6 text-center">
                      Search result for: <span>{q}</span>
                    </h1>

                    {allFilters.length > 0 && (
                      <div className="flex gap-3 flex-wrap">
                        <p
                          className="py-0.5 px-3 rounded-xl flex gap-1 text-white 
                      items-center text-sm bg-primary"
                        >
                          <Filter2Icon className="fill-white size-3" />
                          <span className="ml-2">Filter</span>
                          <span className="text-sm">({allFilters.length})</span>
                        </p>
                        {filters
                          .filter((elem) => elem.options.length > 0)
                          .map((filter) => (
                            <div
                              key={filter.header}
                              className=" flex flex-wrap gap-2"
                            >
                              {filter.options.map((option, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm font-normal py-0.5 px-3 rounded-xl flex gap-2 bg-black/5"
                                >
                                  <span>{option}</span>
                                  <button
                                    className="text-red-600"
                                    onClick={() =>
                                      removeFilter(filter.header, option)
                                    }
                                  >
                                    x
                                  </button>
                                </div>
                              ))}
                            </div>
                          ))}
                      </div>
                    )}

                    {data.llmResult !== null && (
                      <SearchAIMetaResult
                        replies={data.llmResult?.replies}
                        meta={data.llmResult?.meta}
                      />
                    )}
                  </div>

                  <div className="my-6">
                    {data.searchResult !== null &&
                      data.searchResult.documents.length > 0 && (
                        <Fragment>
                          <div>
                            {data.searchResult.documents?.map((data, idx) => (
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
                {data.searchResult && (
                  <div className="col-span-4">
                    <div className="sticky md:top-[68px]">
                      <FilterSideBar
                        data={data}
                        filters={filters}
                        setFilters={setFilters}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {isError && (
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
