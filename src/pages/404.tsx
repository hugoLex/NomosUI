import React, { Fragment } from "react";
import Image from "next/image";
import { Button, Head, Header } from "@app/components/ui";
import { RigthArrowIcon } from "@app/components/icons";

import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <Fragment>
      <Head title="Not Found" />
      <Header />
      <main>
        <section>
          <h1>404</h1>
        </section>
      </main>
    </Fragment>
  );
};

export default Page;
