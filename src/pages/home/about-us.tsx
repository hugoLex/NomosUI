import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { NextPageWithLayout } from "@app/types";
import { Head, View, Heading } from "@app/components/ui";
import { BaseLayout } from "@app/components/layout";

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
