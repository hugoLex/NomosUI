import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { Head, BaseLayout, View, Heading } from "@app/components/ui";

import { NextPageWithLayout } from "@app/types";

import {} from "@app/assets";

const Page: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Head title="About Us" />
      <View className="my-[6rem]">
        {/* About Us */}
        <p>About</p>
      </View>
    </Fragment>
  );
};

Page.getLayout = BaseLayout;

export default Page;
