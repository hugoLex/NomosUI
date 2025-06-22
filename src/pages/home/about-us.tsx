import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { NextPageWithLayout } from "@app/types";
import { Head, Heading } from "@app/components/ui";
import { BaseLayout } from "@app/components/layout";

import {} from "@app/assets";

const Page: NextPageWithLayout = () => {
  return (
    <BaseLayout>
      <Head title="About Us" />
      <main className="my-[6rem]">
        {/* About Us */}
        <p>About</p>
      </main>
    </BaseLayout>
  );
};

export default Page;
