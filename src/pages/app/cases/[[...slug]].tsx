import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
import { CaseHeader } from "@app/components/app";
import { AppLayout as Layout } from "@app/components/layout";

const Page = () => {
  const router = useRouter();

  const slug = String(router.query.slug);
  const title = slug.replace(/-/g, " ");
  const tabId: string = router.query.tab ? String(router.query.tab) : "case";

  return (
    <Fragment>
      <Head title={`Search Result - ${title}`} />
      <Layout>
        <CaseHeader />
        <section className="relative mx-auto max-w-[1100px] py-6 ">
          <div className="px-16 max-md:px-5 max-w-full">
            <div className="md:grid grid-cols-12 gap-8">
              <div className="col-span-8">
                {tabId === "case" && <div>Case details</div>}{" "}
                {tabId === "judgement" && <div>Judgement</div>}{" "}
                {tabId === "precedent" && <div>Precedent</div>}{" "}
                {tabId === "counsel" && <div>Counsel</div>}
              </div>
              <div className="col-span-4 self-baselane">
                <div className="sticky top-[68px]">
                  <Fragment />
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
