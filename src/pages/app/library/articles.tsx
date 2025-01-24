import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Head, Loader } from "@app/components/ui";
import { AppLayout } from "@app/components/layout";
import { LibraryHeader } from "@app/components/app/library";
import { useGetArticlesQuery } from "@app/store/services/librarySlice";
import { ErrorView404 } from "@app/components/shared";
import { FilterIcon2 } from "@app/components/icons";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@app/types";

type Article = {};

const Page: NextPageWithLayout = () => {
  const title = "List";
  const router = useRouter();
  const { page } = router.query;
  const searchRef = useRef<HTMLTextAreaElement | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const { data, isError, isFetching, isLoading } = useGetArticlesQuery({});

  useEffect(() => {
    if (data) {
      setArticles((prev) => [...prev, ...data.cases]);
    }
    return () => {};
  }, [data]);

  const loadMoreDocs = () => {
    const pageNumber = page ? Number(page) + 1 : 2;
    router.push(
      {
        pathname: "/library/cases",
        query: {
          page: pageNumber,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <Fragment>
      <Head title={`Artilces - ${title}`} />

      <LibraryHeader searchBtnRef={searchRef} />
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

      {data && (
        <section className="relative flex self-stretch min-h-screen">
          <div className={`py-6 px-16 max-md:px-5  mx-auto max-w-[1100px] `}>
            <div className="md:grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <h1 className="text-xx font-normal mb-2">Library</h1>
                <h5 className="text-base text-[#9ea7b4] mb-4">Cases</h5>

                {articles.map((itx, idx: number) => (
                  <div key={idx} className="space-y-2 mb-4"></div>
                ))}

                <div className="flex justify-center py-2.5">
                  <Button
                    label={`${isFetching ? "loading..." : "load more"}`}
                    onClick={loadMoreDocs}
                    className="primary"
                  />
                </div>
              </div>

              <div className="col-span-4">
                <div className="sticky md:top-[68px]">
                  <div>
                    <div className="inline-flex space-x-1">
                      <FilterIcon2 />
                      <h5>Filter by Taxonomies</h5>
                    </div>
                    <div className="p-4">
                      <p>Find cases by legal classification</p>
                      <Button label="Coming soon" className="primary" />
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={"Search"} />
      <AppLayout>{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
