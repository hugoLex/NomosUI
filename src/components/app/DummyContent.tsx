import React from "react";

export const DummyContentSidebar = () => (
  <div className="flex flex-col self-stretch ">
    <div className="flex flex-col justify-center w-full rounded-md shadow-md bg-stone-100">
      <img loading="lazy" srcSet="..." className="w-full aspect-[1.96]" />
    </div>
    <img loading="lazy" srcSet="..." className="mt-2 w-full aspect-[1.67]" />
    <div className="flex flex-col justify-center px-4 py-2.5 mt-2 w-full text-sm font-medium leading-5 rounded-md border border-dashed border-stone-300 border-opacity-50 text-cyan-950">
      <div className="flex gap-5 justify-between py-0.5">
        <div className="flex gap-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8412eb1f26a412742db199a7615d8233045eaaa8b627062f46527bdcbfac1a8?"
            className="shrink-0 my-auto aspect-[1.28] w-[18px]"
          />
          <div>Search Videos</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e02270f9a27858299accae141db289c8dbaada782e950f5e4f2263a2880db5ac?"
          className="shrink-0 self-start w-5 aspect-[1.25]"
        />
      </div>
    </div>
    <div className="flex flex-col justify-center px-4 py-2.5 mt-2 w-full text-sm font-medium leading-5 rounded-md border border-dashed border-stone-300 border-opacity-50 text-cyan-950">
      <div className="flex gap-5 justify-between py-0.5">
        <div className="flex gap-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6193bce175ab01e5a2bc21c1620d88c86ae724116a95b2470d72953d98683db4?"
            className="shrink-0 my-auto aspect-[1.28] w-[18px]"
          />
          <div>Generate Image</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e02270f9a27858299accae141db289c8dbaada782e950f5e4f2263a2880db5ac?"
          className="shrink-0 self-start w-5 aspect-[1.25]"
        />
      </div>
    </div>
  </div>
);

export const DummyContentDetails = () => (
  <div className="flex flex-col ">
    <div className="w-full text-base font-medium leading-6 text-cyan-700 max-md:max-w-full">
      how center a div
    </div>
    <div className="w-full text-base leading-6 text-zinc-600 max-md:max-w-full">
      To center a div in CSS, there are several methods you can use based on
      your specific
      <br />
      requirements: 1. Using Flexbox: Flexbox is a modern and versatile method
      for centering…
    </div>
    <div className="hidden gap-5 justify-between mt-1 w-full max-md:flex-wrap max-md:max-w-full">
      <div className="flex gap-1 px-5 my-auto text-xs font-medium leading-4 text-zinc-600">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a7dc82d80b7814a60587de6af409f4f734c9d2de6fec42bf5fac469a7c287c2?"
          className="shrink-0 my-auto aspect-square w-[11px]"
        />
        <div>8 days ago</div>
      </div>
      <div className="flex gap-1 justify-between px-2 py-2.5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/334db60c70807fdcabad8c6c9e43b29b3772ed0f10ec34d303ed900ff19be20d?"
          className="shrink-0 aspect-[1.22] w-[17px]"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/44decc762b666cc1620330ebc374c3f8bbbfe3cdd6115a29ad09c1ee7b705052?"
          className="shrink-0 aspect-[1.22] w-[17px]"
        />
      </div>
    </div>
  </div>
);
