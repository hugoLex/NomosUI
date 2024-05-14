import React, { Fragment } from "react";
import Image from "next/image";
import { Layout, View, Button, Head, Header } from "@app/components/";
import { RigthArrowIcon } from "@app/components/icons";

import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <Fragment>
      <Head title="Not Found" />
      <Header />
      <View>
        <section>
          <h1>404</h1>
        </section>
      </View>
    </Fragment>
  );
};

export default Page;
