import React from "react";
import { Head, Header } from "@app/components/ui";
import { BaseLayout } from "@app/components/layout";
import { getMarkdownLocalStream } from "@app/utils/getMarkdown";
import { DataProp, NextPageWithLayout } from "@app/types";
import { Markdown } from "@app/components/shared";

const Page = ({ data }: { data: DataProp }) => {
  const { slug, content } = data;
  return (
    <BaseLayout>
      <Head title="Terms of use" />
      <Header variants="default" />
      <main>
        <section className="max-container px-4 py-16 lg:px-10 min-h-screen">
          <div className="my-16 px-4 lg:px-[14rem]">
            <h2 className="text-2xl text-center mb-3">TERMS AND CONDITIONS</h2>
            <Markdown content={content} />
          </div>
        </section>
      </main>
    </BaseLayout>
  );
};

export const getServerSideProps = async () => {
  // Fetch data from external API
  const data = getMarkdownLocalStream("terms.md");

  // Pass data to the page via props
  return { props: { data } };
};

export default Page;
