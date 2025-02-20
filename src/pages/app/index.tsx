import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
import { SearchBox } from "@app/components/shared";
import { AppLayout } from "@app/components/layout";
import { logo2 } from "@app/assets";
import { NextPageWithLayout } from "@app/types";
import { useSearchTrendingQuery } from "@app/store/services/searchSlice";

const Page: NextPageWithLayout = () => {
  const [trendingSearches, setTrendingSearches] = useState<any[]>([]);
  const { data, isError } = useSearchTrendingQuery({});

  useEffect(() => {
    if (data) {
      const { trending_searches } = data;
      setTrendingSearches(trending_searches);
    }
  }, [data]);

  return (
    <Fragment>
      <section
        className="relative flex flex-col justify-center max-w-full m-auto
        md:w-[700px] self-stretch p-5"
      >
        <Link href={"/"} className="mx-auto">
          <Image
            src={logo2}
            alt="Logo"
            className="shrink-0 max-w-full w-72 aspect-[4.35]"
          />
        </Link>
        <SearchBox />

        {trendingSearches.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Trending Searches</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {trendingSearches.map((trend) => (
                <button
                  key={trend.text}
                  className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
                  // onClick={() => handleTrendClick(trend)}
                >
                  {trend.text}
                  <span className="ml-2 text-xs text-gray-500">
                    {trend.usage_count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <Link
          href={"/signin"}
          className={
            "hidden w-full md:w-fit md:mx-auto px-16 py-2.5 mt-10 font-medium  text-white bg-primary rounded-full hover:opacity-80 font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-in-out  select-none  relative group/button cursor-pointer active:scale-95 origin-center whitespace-nowrap"
          }
        >
          Sign In
        </Link>
      </section>

      <footer className="mx-auto">
        <div
          className="flex items-center mt-5 text-sm leading-5
           text-zinc-500 p-3 max-md:mt-10 max-md:max-w-full"
        >
          <div className="flex gap-4 max-md:flex-wrap">
            <a className="hover:underline">FAQ</a>
            <a className="hover:underline">Privacy</a>
            <a className="hover:underline">About</a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={"Search"} />
      <AppLayout>{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
