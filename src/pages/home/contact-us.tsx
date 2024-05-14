import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { NextPageWithLayout } from "@app/types";
import { Footer, Head, Header, Layout, View, Heading } from "@app/components";

const { BaseLayout } = Layout;

const Page: NextPageWithLayout = () => {
  return (
    <BaseLayout>
      <Head title="Contact Us" />
      <View className="mt-24">
        <p>Contact</p>
      </View>
    </BaseLayout>
  );
};

export default Page;
