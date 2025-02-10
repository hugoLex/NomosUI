import { AppLayout } from "@app/components/layout";
import { Navbar, ErrorView404 } from "@app/components/shared";
import { Head, Loader } from "@app/components/ui";
import { useVisibility } from "@app/hooks";
import { useGetArticleQuery } from "@app/store/services/librarySlice";
import { NextPageWithLayout } from "@app/types";
import { useRouter } from "next/router";

import React, { Fragment, useRef } from "react";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const query = router.query;
  const slug = query.slug ? query.slug : "";
  const articleId = slug as string;

  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  const isTitle = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });

  const { data, isLoading, isError } = useGetArticleQuery(articleId);

  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Navbar query={""} isTitle={isTitle} />
        {/* Removed isTitle as it's always false*/}
        <div className="flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
          <Loader variant="classic" size={80} />
        </div>
      </Fragment>
    );
  }

  if (!data && isError) {
    // Simplified error check
    return (
      <Fragment>
        <Navbar query={""} isTitle />
        <ErrorView404
          caption="No matching legal resources found"
          desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
        />
      </Fragment>
    );
  }
  return <div>Article: {articleId}</div>;
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={"Article"} />
      <AppLayout>{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
