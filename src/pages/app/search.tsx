import React, { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Head, Shimmer } from "@app/components/ui";
import {
  AppLayout as Layout,
  AppLayoutContext as LayoutContext,
} from "@app/components/layout";
import {
  DummyContentSidebar,
  SearchAIMetaResult,
  SearchHeader,
  SearchModal,
  SearchResultMeta,
} from "@app/components/app";
import { endpointAI, endpointSearch, searchService } from "@app/utils/";
import { AIResult, SearchResult } from "@app/types";

const Page = () => {
  const router = useRouter();

  const { q, page } = router.query;

  const query = String(q);
  const pageNumber = String(page);

  const [aiLoading, setAILoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [llmResult, setLLMResult] = useState<AIResult>();
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

  useEffect(() => {
    (async () => {
      setAILoading(true);
      try {
        const response = await endpointAI.get(`/ask?question=${query}`);

        if (response.status === 200) {
          setLLMResult(response.data as AIResult);
          setAILoading(false);
        }
      } catch (error) {
        console.log(error);
        setAILoading(false);
      }
    })();

    (async () => {
      setSearchLoading(true);
      try {
        const response = pageNumber
          ? await endpointSearch.get(`/search?query=${query}`)
          : await endpointSearch.get(
              `/search?query=${query}&page=${pageNumber}`
            );

        if (response.status === 200) {
          const { documents } = response.data;
          setSearchResult(documents as SearchResult[]);
          setSearchLoading(false);
        }
      } catch (error) {
        console.log(error);
        setSearchLoading(false);
      }
    })();

    return () => {};
  }, [query, pageNumber]);

  const results = new Array(15).fill({
    caseTitle: "John Doe vs Mike Doe",
    date: "1991-1-1",
    court: "High Court",
  });

  return (
    <Fragment>
      <Head title={`Search Result - ${q}`} />
      <Layout>
        <SearchHeader />
        <section className="flex justify-center items-center self-stretch py-6 ">
          <div className="px-16 max-md:px-5 max-w-full mx-auto max-w:[1100px]">
            <div className="md:grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <div className="flex flex-col">
                  <h1 className="text-xl font-normal mb-6">
                    Search result for: <span>{q}</span>
                  </h1>

                  {aiLoading && <Shimmer />}

                  {!aiLoading && llmResult && (
                    <SearchAIMetaResult
                      replies={llmResult?.replies}
                      meta={llmResult?.meta}
                    />
                  )}
                </div>
                <div className="my-6">
                  {searchLoading &&
                    results.map((itx, idx) => <Shimmer key={idx} />)}

                  {!searchLoading && searchResult.length > 0 && (
                    <Fragment>
                      <h2 className="text-xx font-normal mb-6">
                        Other sources
                      </h2>
                      <div>
                        {searchResult?.map(({ id, metadata }, idx) => (
                          <SearchResultMeta
                            key={id}
                            idx={String(idx + 1)}
                            caseTitle={metadata.case_title}
                            date={metadata.year}
                            court={metadata.court}
                          />
                        ))}
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
              <div className="col-span-4">
                <div className="sticky top-[68px]">
                  <DummyContentSidebar />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export default Page;
