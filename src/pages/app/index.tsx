import React, { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Head, Header, Heading } from "@app/components/ui";
import { SearchBox } from "@app/components/app/search";
import { Mentions } from "@app/components/shared";
import { AppLayout } from "@app/components/layout";
import { logo, logo2, logoIcon } from "@app/assets";
import { NextPageWithLayout } from "@app/types";

const Page: NextPageWithLayout = () => {
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

        <div className=" hidden  gap-2 mt-4 max-md:flex-wrap">
          <button
            className="flex gap-2 p-1.5 w-full rounded-lg hover:bg-neutral-100
             border border-solid border-stone-300/50"
          >
            <div
              className="flex justify-center items-center p-1
               w-8 h-8 rounded-md bg-stone-100"
            >
              <Image
                loading="lazy"
                alt=""
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/386c05f7f3554f970c33f757629b7de7efcd1134c291d8289497d059dc1610f7?"
                fill
                className="w-5 aspect-square"
              />
            </div>
            <div className="my-auto text-sm font-medium leading-5 text-cyan-950">
              Upcoming AI events
            </div>
          </button>
          <button
            className="flex gap-2 p-1.5 w-full rounded-lg hover:bg-neutral-100
             border border-solid border-stone-300/50"
          >
            <div className="flex justify-center items-center px-1.5 py-1 w-8 h-8 rounded-md bg-stone-100">
              <Image
                loading="lazy"
                alt=""
                fill
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/386c05f7f3554f970c33f757629b7de7efcd1134c291d8289497d059dc1610f7?"
                className="w-5 aspect-square"
              />
            </div>
            <div className="my-auto text-sm font-medium leading-5 text-cyan-950">
              Latest men&apos;s fashion trends summer 2024
            </div>
          </button>
        </div>

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
