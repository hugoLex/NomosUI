import React, { Fragment } from "react";
import { AppLayout } from "@app/components/layout";
import {
  AllCounselView,
  CounselDetailsView,
} from "@app/components/app/analytics";
import { NextPageWithLayout } from "@app/types";
import { useQueryHandler } from "@app/hooks";
import { Head } from "@app/components/ui";

const Page: NextPageWithLayout = () => {
  const { searchParams } = useQueryHandler();

  const counselId = searchParams.get("counselId");

  return (
    <Fragment>
      {!counselId && <AllCounselView />}
      {counselId && <CounselDetailsView />}
    </Fragment>
  );
};

Page.getLayout = (page) => (
  <Fragment>
    <Head title={`Counsels - List`} />
    <AppLayout className="h-screen">{page}</AppLayout>
  </Fragment>
);

export default Page;
