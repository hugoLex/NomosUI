"use client";
import React, { Fragment } from "react";

function Legalarguements({ data }: { data: { [key: string]: string[] } }) {
  return (
    <>
      {Object.keys(data).map((key, idx) => (
        <Fragment key={`key-argument-${key}`}>
          <h4 className="text-sm text-powder_blue mt-5">
            {idx == 0 ? `${key}'s Arguments:` : `${key}'s Counterarguments:`}
          </h4>
          <div className="text-lexblue text-sm ">
            {data[key].map((value, idx) => (
              <p
                key={`key-legal_argument-${idx}`}
                className="text-lexblue text-sm "
              >
                {value}
              </p>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
  //   return (
  //     <div>Legalarguements</div>
  //   )
}

export default Legalarguements;
