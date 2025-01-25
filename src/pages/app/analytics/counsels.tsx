import React, { Fragment } from "react";
import { Head } from "@app/components/ui";
import { AppLayout } from "@app/components/layout";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import {
  AllCounselView,
  CounselDetailsView,
} from "@app/components/app/analytics";
import { NextPageWithLayout } from "@app/types";

const Page: NextPageWithLayout = () => {
  const { searchParams } = UseQueryToggler();

  const counselId = searchParams.get("counselId");

  return (
    <Fragment>
      <Head title={`Counsel - ${"List"}`} />
      {!counselId && <AllCounselView />}
      {counselId && <CounselDetailsView />}
    </Fragment>
  );
};

Page.getLayout = (page) => <AppLayout className="h-screen">{page}</AppLayout>;

export default Page;
