import React, { Fragment } from "react";
import Image from "next/image";
import { Button, Head, Header } from "@app/components/ui";
import { RigthArrowIcon } from "@app/components/icons";

import cloud from "../../public/cloud.svg";
import { ErrorView500 } from "@app/components";

const Page = () => {
  return (
    <Fragment>
      <Head title="Not Found" />
      <Header />
      <main>
        <section>
          <ErrorView500 />
          <Button label="Back to home page" icon={<RigthArrowIcon />} />
        </section>
      </main>
    </Fragment>
  );
};

export default Page;
