import React from "react";
import Image from "next/image";
import {
  placeholder1,
  placeholder2,
  placeholder3,
  placeholder4,
  placeholder5,
} from "@app/assets";

export const DummyContentSidebar = () => (
  <div className="flex flex-col self-stretch ">
    <div className="w-full">
      <Image src={placeholder1} alt="placholder" className="w-full" />
    </div>
    <div className="w-full grid grid-cols-2">
      <div>
        <Image
          src={placeholder2}
          alt="placholder"
          className="w-full object-cover aspect-auto"
        />
      </div>
      <div>
        <Image
          src={placeholder3}
          alt="placholder"
          className="w-full h-full object-cover aspect-auto"
        />
      </div>
      <div>
        <Image
          src={placeholder4}
          alt="placholder"
          className="w-full object-cover aspect-auto"
        />
      </div>
      <div>
        <Image
          src={placeholder5}
          alt="placholder"
          className="w-full object-cover aspect-auto"
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
