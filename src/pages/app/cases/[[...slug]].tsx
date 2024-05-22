import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
import {
  CaseHeader,
  DummyContentDetails,
  DummyContentSidebar,
} from "@app/components/app";
import { AppLayout as Layout } from "@app/components/layout";

const Page = () => {
  const router = useRouter();

  const slug = String(router.query.slug);
  const title = slug.replace(/-/g, " ");
  const tabId = String(router.query.tab);

  const data = new Array(15).fill(<DummyContentDetails />);

  return (
    <Fragment>
      <Head title={`Search Result - ${title}`} />
      <Layout>
        <CaseHeader />
        <section className="flex justify-center items-center self-stretch py-6 ">
          <div className="px-16 max-md:px-5 max-w-full">
            <div className="md:grid grid-cols-12 gap-8">
              <div className="col-span-8">
                {tabId === "case" &&
                  data.map((i, idx) => <Fragment key={idx}>{i}</Fragment>)}
                {tabId === "judgement" && <p>Case judgement</p>}
                {tabId === "precedent" && <p>Case precedent</p>}
                {tabId === "counsel" && <p>Case counsel</p>}
              </div>
              <div className="col-span-4 self-baselane">
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
