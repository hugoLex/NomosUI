import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Head, Loader } from "@app/components/ui";
import { AppLayout } from "@app/components/layout";
import { LibraryHeader } from "@app/components/app/library";
import { useGetCasesQuery } from "@app/store/services/librarySlice";
import { ErrorView404 } from "@app/components/shared";
import { FilterIcon2 } from "@app/components/icons";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@app/types";

type Case = {
  case_title: string;
  court: string;
  year_decided: number;
  area_of_law?: string;
  subject_matters?: string[];
};

const Page: NextPageWithLayout = () => {
  const title = "List";
  const router = useRouter();
  const { page } = router.query;
  const searchRef = useRef<HTMLTextAreaElement | null>(null);
  const { data, isError, isFetching, isLoading } = useGetCasesQuery({
    page,
  });

  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    if (data) {
      setCases((prev) => [...prev, ...data.cases]);
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
      <Head title={`Cases - ${title}`} />

      <LibraryHeader searchBtnRef={searchRef} />
      {isLoading && (
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

      {!isLoading && (
        <section className="relative w-full mx-auto max-w-[1100px] px-4 md:px-16 ">
          <div className={`py-6`}>
            <div className="md:grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <h1 className="text-xx font-normal mb-2">Library</h1>
                <h5 className="text-base text-[#9ea7b4] mb-4">Cases</h5>

                {cases.map((itx: Case, idx: number) => (
                  <div key={idx} className="space-y-2 mb-4">
                    <h5>{itx.case_title}</h5>
                    <div className="inline-flex gap-2">
                      <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                        {itx.court}
                      </span>
                      <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                        {itx.year_decided}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        {itx.area_of_law && (
                          <span className="text-[#008E00] bg-[#008E00]/10 text-xs px-3 py-1 rounded">
                            {itx.area_of_law}
                          </span>
                        )}
                      </div>

                      <p className="inline-flex gap-2">
                        {itx.subject_matters &&
                          itx.subject_matters.map((stx, idx) => (
                            <span
                              key={idx}
                              className=" text-xs px-3 py-1 rounded"
                            >
                              {stx}
                            </span>
                          ))}
                      </p>
                    </div>
                  </div>
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
                  <div className="space-y-3">
                    <div className="inline-flex space-x-1">
                      <FilterIcon2 />
                      <h5>Filter by Taxonomies</h5>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-[#eaf0f2] space-y-4 rounded-md">
                      <p className="text-sm">
                        Find cases by legal classification
                      </p>
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

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
