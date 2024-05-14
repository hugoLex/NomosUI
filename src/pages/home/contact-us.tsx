import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Footer,
  Head,
  Header,
  BaseLayout,
  View,
  Heading,
} from "@app/components/ui";

import { NextPageWithLayout } from "@app/types";

const Page: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Head title="Contact Us" />
      <View className="mt-24">
        <p>Contact</p>
      </View>
    </Fragment>
  );
};

Page.getLayout = BaseLayout;

export default Page;
