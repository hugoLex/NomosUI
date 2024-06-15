import React, { Fragment, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Head, Header, Heading, View } from '@app/components/ui';
import { AppLayout as Layout } from '@app/components/layout';
import { logo, logoIcon } from '@app/assets';
import { NextPageWithLayout } from '@app/types';
import {} from '@app/assets';
import { useIsVisible } from '@app/hooks';
import { SearchBox } from '@app/components/app';

const Page: NextPageWithLayout = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  return (
    <Fragment>
      <Head title={'Search'} />
      <Layout>
        <section className="flex justify-center items-center self-stretch">
          <div className="flex flex-col justify-center max-w-full w-[768px] mx-auto ">
            <h2 className="hidden self-center font-normal mt-44 text-2xl text-center text-cyan-950 max-md:mt-10">
              Search like never before
            </h2>
            <div className="mt-44 text-2xl text-center text-cyan-950 max-md:mt-10">
              <SearchBox />
            </div>
            <div className="flex gap-2 mt-4 max-md:flex-wrap">
              <div className="flex flex-1  gap-2 py-1.5 rounded-lg border border-solid border-stone-300 border-opacity-50">
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
              <div className="flex flex-1  gap-2 py-1.5 rounded-lg border border-solid border-stone-300 border-opacity-50">
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
              <div className="flex flex-1  gap-2 py-1.5 rounded-lg border border-solid border-stone-300 border-opacity-50">
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
          </div>
        </section>
        <footer className="hidden bottom-0">
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
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/386c05f7f3554f970c33f757629b7de7efcd1134c291d8289497d059dc1610f7?'
                  className='w-5 aspect-square'
                />
              </div>
              <div className='my-auto text-sm font-medium leading-5 text-cyan-950'>
                Upcoming AI events
              </div>
            </button>
            <button
              className='flex gap-2 p-1.5 w-full rounded-lg hover:bg-neutral-100
             border border-solid border-stone-300/50'>
              <div className='flex justify-center items-center px-1.5 py-1 w-8 h-8 rounded-md bg-stone-100'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/386c05f7f3554f970c33f757629b7de7efcd1134c291d8289497d059dc1610f7?'
                  className='w-5 aspect-square'
                />
              </div>
              <div className='my-auto text-sm font-medium leading-5 text-cyan-950'>
                Latest men's fashion trends summer 2024
              </div>
            </button>
          </div>

          <button
            className={
              'w-full md:w-fit md:mx-auto px-16 py-2.5 mt-10 font-medium  text-white bg-primary rounded-full hover:opacity-80 font-sans focus:outline-none outline-none outline-transparent transition duration-300 ease-in-out  select-none  relative group/button cursor-pointer active:scale-95 origin-center whitespace-nowrap'
            }>
            Sign In
          </button>
        </section>

        <footer className='mx-auto'>
          <div
            className='flex items-center mt-5 text-sm leading-5
           text-zinc-500 p-3 max-md:mt-10 max-md:max-w-full'>
            <div className='flex gap-4 max-md:flex-wrap'>
              <a className='hover:underline'>FAQ</a>
              <a className='hover:underline'>Privacy</a>
              <a className='hover:underline'>About</a>
            </div>
          </div>
        </footer>
      </Layout>
    </Fragment>
  );
};

export default Page;
