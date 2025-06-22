"use client";
import React from "react";

function Riskanalysis({ data }: { data: { [key: string]: string[] } }) {
  return Object.keys(data).map((key) => {
    return (
      <div key={`key-risks-${key}`} className="text-lexblue text-sm ">
        {data[key].map((value, idx) => (
          <p key={`key-${key}-risk-${idx}`} className="text-lexblue text-sm ">
            <span className="capitalize">{key}</span>'s Risks:{" "}
            <span className="">{value}</span>
          </p>
        ))}
      </div>
    );
  });

  //   return <div>Riskanalysis</div>;
}

export default Riskanalysis;
