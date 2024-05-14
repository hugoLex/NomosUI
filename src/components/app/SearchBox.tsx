import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col px-2.5 pt-4 pb-2.5 mt-9 rounded-md border border-solid shadow-sm bg-stone-50 border-stone-300 max-md:max-w-full">
      <textarea className="pb-2 text-base leading-6 bg-stone-50 text-zinc-600 max-md:max-w-full outline-none scrollbar-hide resize-none max-h-[45vh]">
        Ask anything...
      </textarea>
      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-0 justify-between py-2.5 text-sm font-medium leading-4 text-center whitespace-nowrap rounded-lg bg-stone-50 text-zinc-600">
          <div className="flex gap-1 justify-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcd69f5d70a90ba649fdba5691f5808d62fa116235fe03c0737ae43764d0e8c2?"
              className="shrink-0 aspect-[1.28] w-[18px]"
            />
            <div>Focus</div>
          </div>
          <div className="flex gap-1 justify-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4140c5c6d9365c34618f5a7d9a5428851ead47b0135a88082ff8f53e5addae9?"
              className="shrink-0 aspect-[1.22] w-[17px]"
            />
            <div>Attach</div>
          </div>
        </div>
        <div className="flex gap-0 justify-between rounded-full bg-stone-50">
          <div className="flex gap-2 my-auto">
            <div className="flex flex-col justify-center p-1 rounded-full border border-solid border-stone-300">
              <div className="flex flex-col justify-center fill-white fill-opacity-0">
                <div className="shrink-0 h-4 rounded-full shadow-sm bg-zinc-600" />
              </div>
            </div>
            <div className="my-auto text-sm font-medium leading-5 text-zinc-600">
              Pro
            </div>
          </div>
          <div className="flex justify-center items-center px-2 py-2.5 w-8 h-8 rounded-full bg-neutral-200">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/19378461672b722218affc3e2e71bdce51fde5674d43f96eea0307549375c70f?"
              className="aspect-[1.28] w-[18px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
