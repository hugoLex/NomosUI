import React, { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
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

const Page = () => {
  const router = useRouter();

  const { q, page } = router.query;

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
                  <SearchAIMetaResult />
                </div>
                <div className="my-6">
                  <h2 className="text-xx font-normal mb-6">Other sources</h2>
                  <div>
                    {results.map((itx, idx) => (
                      <SearchResultMeta
                        key={idx}
                        idx={String(idx + 1)}
                        caseTitle={itx.caseTitle}
                        date={itx.date}
                        court={itx.court}
                      />
                    ))}
                  </div>
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
