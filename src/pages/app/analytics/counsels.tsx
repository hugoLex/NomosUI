import React, { Fragment } from "react";
import { AppLayout } from "@app/components/layout";
import {
  AllCounselView,
  CounselDetailsView,
} from "@app/components/app/analytics";
import { NextPageWithLayout } from "@app/types";
import { useQueryHandler } from "@app/hooks";

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

Page.getLayout = (page) => <AppLayout className="h-screen">{page}</AppLayout>;

export default Page;
