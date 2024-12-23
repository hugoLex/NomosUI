import React from "react";
import Image from "next/image";

type ErrorMessage = {
  caption?: string;
  desc?: string;
};

export const ErrorView404 = ({ caption, desc }: ErrorMessage) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-[180px] h-[280px] relative">
        <Image
          className="bg-contain"
          src={"/images/undraw_no_data_re_kwbl.svg"}
          alt={""}
          fill
        />
      </div>
      <div className="max-w-[460px]">
        {caption && <p className="text-center">{caption}</p>}
        {!caption && <p>Not found</p>}
        {desc && <p className="text-center">{desc}</p>}
      </div>
    </div>
  );
};

export const ErrorView500 = ({ caption, desc }: ErrorMessage) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6">
      <div className="max-w-[180px] h-auto relative">
        <Image
          className="bg-contain"
          src={"/images/undraw_no_data_re_kwbl.svg"}
          alt={""}
          fill
        />
      </div>
      <div className="max-w-[460px]">
        {caption && <p className="text-center">{caption}</p>}
        {!caption && <p>Oppsss!... an error occurred.</p>}
        {desc && <p className="text-center">{desc}</p>}
      </div>
    </div>
  );
};

export const ErrorView = () => {
  return (
    <div className="flex-1 flex justify-center items-center self-stretch">
      <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
            {/* Heroicon name: outline/exclamation-triangle */}
            <svg
              className="h-6 w-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              Unknown error occurred.
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Follow these steps to resolve:
              </p>
              <ol className="text-sm text-gray-500 list-disc ml-8 mt-2 flex gap-2 flex-col">
                <li className="list-item list-disc">
                  Retry a different search term or keyword.
                </li>
                <li className="list-item list-disc">Reload the tab.</li>
                <li className="list-item list-disc">
                  Clear cache and reload the tab.
                </li>
                <li className="list-item list-disc">
                  Close and relaunch the browser.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
