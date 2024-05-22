import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { NextPageWithLayout } from "@app/types";
import { Head, View, Heading } from "@app/components/ui";
import { BaseLayout } from "@app/components/layout";

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
