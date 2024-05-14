import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { NextPageWithLayout } from "@app/types";
import { Head, Layout, View, Heading } from "@app/components";

const { BaseLayout } = Layout;

import {} from "@app/assets";

const Page: NextPageWithLayout = () => {
  return (
    <BaseLayout>
      <Head title="About Us" />
      <View className="my-[6rem]">
        {/* About Us */}
        <p>About</p>
      </View>
    </BaseLayout>
  );
};

export default Page;
