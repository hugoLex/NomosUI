import React, { Fragment } from "react";
import Image from "next/image";
import { Button, Head, Header } from "@app/components/ui";
import { RigthArrowIcon } from "@app/components/icons";

import { useRouter } from "next/router";
import { ErrorView404 } from "@app/components/shared";

const Page = () => {
  const router = useRouter();
  return (
    <Fragment>
      <Head title="Not Found" />
      <Header />
      <main>
        <ErrorView404 />
      </main>
    </Fragment>
  );
};

export default Page;
