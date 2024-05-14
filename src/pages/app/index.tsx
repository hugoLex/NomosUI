import React, { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Head, Header, Heading, Layout, View } from "@app/components";
import { NextPageWithLayout } from "@app/types";
import {} from "@app/assets";
import { useIsVisible } from "@app/hooks";
import { SearchBox } from "@app/components/app";

const Page: NextPageWithLayout = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  return (
    <Layout.AppLayout>
      <section className="flex flex-col justify-center px-8 pt-20 pb-4 max-w-full w-[768px] max-md:px-5">
        <div className="self-center mt-44 text-2xl text-center text-cyan-950 max-md:mt-10">
          Search like never before
        </div>
        <SearchBox />
        <div className="flex gap-2 mt-4 max-md:flex-wrap">
          <div className="flex flex-1 flex-auto gap-2 py-1.5 rounded-lg border border-solid border-stone-300 border-opacity-50">
            <div className="flex justify-center items-center px-1.5 py-1 w-8 h-8 rounded-md bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/386c05f7f3554f970c33f757629b7de7efcd1134c291d8289497d059dc1610f7?"
                className="w-5 aspect-square"
              />
            </div>
            <div className="my-auto text-sm font-medium leading-5 text-cyan-950">
              Upcoming AI events
            </div>
          </div>
          <div className="flex flex-1 flex-auto gap-2 py-1.5 rounded-lg border border-solid border-stone-300 border-opacity-50">
            <div className="flex justify-center items-center px-1.5 py-1 w-8 h-8 rounded-md bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/386c05f7f3554f970c33f757629b7de7efcd1134c291d8289497d059dc1610f7?"
                className="w-5 aspect-square"
              />
            </div>
            <div className="my-auto text-sm font-medium leading-5 text-cyan-950">
              Latest men's fashion trends summer 2024
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2 max-md:flex-wrap">
          <div className="flex flex-1 flex-auto gap-2 py-1.5 rounded-lg border border-solid border-stone-300 border-opacity-50">
            <div className="flex justify-center items-center px-1.5 py-1 w-8 h-8 rounded-md bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/386c05f7f3554f970c33f757629b7de7efcd1134c291d8289497d059dc1610f7?"
                className="w-5 aspect-square"
              />
            </div>
            <div className="my-auto text-sm font-medium leading-5 text-cyan-950">
              How is Perplexity AI different?
            </div>
          </div>
          <div className="flex flex-1 flex-auto gap-2 py-1.5 rounded-lg border border-solid border-stone-300 border-opacity-50">
            <div className="flex justify-center items-center px-1.5 py-1 w-8 h-8 rounded-md bg-stone-100">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/386c05f7f3554f970c33f757629b7de7efcd1134c291d8289497d059dc1610f7?"
                className="w-5 aspect-square"
              />
            </div>
            <div className="my-auto text-sm font-medium leading-5 text-cyan-950">
              Market size of the creator economy
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center content-center items-center px-16 mt-72 text-sm leading-5 text-zinc-600 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-4 max-md:flex-wrap">
            <div>Pro</div>
            <div>Enterprise</div>
            <div>Playground</div>
            <div>Blog</div>
            <div>Careers</div>
            <div className="flex gap-1">
              <div>English (English)</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/07d3aca2012748c4ff825edd245b5670b0eba0f6209bd3da91b67183d8f01480?"
                className="shrink-0 my-auto w-3.5 aspect-[1.41]"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout.AppLayout>
  );
};

export default Page;
