import { UseQueryToggler } from "@app/hooks/queryHandler";
import React from "react";
import { IoClose } from "react-icons/io5";
const Graphmodal = () => {
  const { removeQueryParam } = UseQueryToggler();
  return (
    <section className="fixed grid items-center z-[999]  justify-center h-dvh w-dvw top-0 bottom-0 right-0 left-0 opacity-100 delay-100 transition-opacity bg-[#ccdcf9]/50">
      <div className="px-5 flex flex-col w-[90vw] h-[80vh]  bg-white/90 mx-auto rounded-md">
        <div>
          <div className="flex items-center justify-between border-b border-solid border-dark-0 py-5  w-full">
            <h1 className="text-base">case timeline graph</h1>
            <IoClose
              className=" cursor-pointer"
              onClick={() => removeQueryParam("judgecounselgraph")}
            />
          </div>
          <p className="text-dark-0 mt-5">
            Dive into an ocean of knowledge with this thought-provoking post,
            {/* revered deeply within the supportive DEV Community. Developers of all
          levels are welcome to join and enhance our collective intelligence.
          Saying a simple 'thank you' can brighten someone's day. Share your
          gratitude in the comments below! On DEV, sharing ideas eases our path
          and fortifies our community connections. */}
          </p>
        </div>
        <div className="flex gap-5 items-center ml-auto mt-auto pb-10">
          <button className="w-40 md:px-2 py-2.5 px-2 whitespace-nowrap text-sm text-dark-0 bg-pale-blue rounded-md border-stone-300 border border-solid">
            Cancel
          </button>
          <button className="w-20 md:px-2 py-2.5 px-2 whitespace-nowrap text-sm text-pale-blue bg-primary rounded-md border-stone-300 border border-solid">
            ok
          </button>
        </div>
      </div>
    </section>
  );
};

export default Graphmodal;
