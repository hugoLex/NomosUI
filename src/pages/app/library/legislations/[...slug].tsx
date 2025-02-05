import { AppLayout } from "@app/components/layout";
import { Head } from "@app/components/ui";
import { NextPageWithLayout } from "@app/types";

import React, { Fragment } from "react";

const Page: NextPageWithLayout = () => {
  return <div>Legislation</div>;
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={"Legislation"} />
      <AppLayout>{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
