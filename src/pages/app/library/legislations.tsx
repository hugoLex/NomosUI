import React, { Fragment } from "react";
import { Head } from "@app/components/ui";
import { AppLayout } from "@app/components/layout";

const Page = () => {
  const title = "List";
  return (
    <Fragment>
      <Head title={`Legislations`} />
      <AppLayout></AppLayout>
    </Fragment>
  );
};

export default Page;
