import React from "react";

import { DataProp } from "@app/types";
import { Head, View, Header } from "@app/components/ui";
import { BaseLayout } from "@app/components/layout";
import {} from "@app/utils/constants";
import getMarkdownData from "@app/utils/getMarkdown";
import { Markdown } from "@app/components";

const Page = ({ data }: { data: DataProp }) => {
  const { slug, content } = data;
  return (
    <BaseLayout>
      <Head title="Privacy Policy" />
      <Header links={[]} variants="default" />

      <View>
        <section className="max-container px-4 py-16 lg:px-10 min-h-screen">
          <div className="my-16 px-4 lg:px-[14rem]">
            <h2 className="text-2xl text-center mb-3">PRIVACY NOTICE</h2>
            <Markdown content={content} />
          </div>
        </section>
      </View>
    </BaseLayout>
  );
};

export const getServerSideProps = async () => {
  // Fetch data from external API
  const data = getMarkdownData("privacy.md");

  // Pass data to the page via props
  return { props: { data } };
};

export default Page;
