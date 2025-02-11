import React, { Fragment } from "react";
import { NextPageWithLayout } from "@app/types";
import { AppLayout } from "@app/components/layout";
import { Container } from "@app/components/shared";
import { Head } from "@app/components/ui";

const Page: NextPageWithLayout = () => {
  return (
    <Container>
      <div className="flex flex-col gap-14 justify-center items-center py-6 min-h-screen">
        <h1>Taxonmy Page</h1>
        <p>Pgae coming soon!</p>
      </div>
    </Container>
  );
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={`Taxonomy`} />
      <AppLayout className="h-screen">{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
