import React from "react";

function Partyclaims({
  data,
  party,
}: {
  data: {
    assertion: string;
    strength: "WEAK" | "NEUTRAL" | "STRONG" | string;
    strengths: string[];
    weaknesses: string[];
  }[];
  party: string;
}) {
  return data.map(({ assertion, strength, strengths, weaknesses }, idx) => (
    //   {data[key].map(({ assertion, strength, strengths, weaknesses }, idx) => (

    <div key={`key-claims-${idx}`}>
      <h3 className="text-sm  text-powder_blue">
        {assertion}{" "}
        <button
          className={`${
            strength == "weak"
              ? "bg-red-400"
              : strength == "strong"
              ? "bg-lexblue"
              : "bg-powder_blue"
          }  text-white text-[8px] capitalize px-1 py-[.5px] rounded-sm`}
        >
          {strength}
        </button>
      </h3>
      <div>
        {strengths.map((value, idx) => (
          <p key={`strength-${idx}`} className="text-lexblue text-sm">
            Strength: {value}
          </p>
        ))}
      </div>
      <div>
        {weaknesses.map((value, idx) => (
          <p key={`weakness-${idx}`} className="text-lexblue text-sm">
            Weakness: {value}
          </p>
        ))}
      </div>
      {/* <p className="text-lexblue text-sm">
            {strength}
          </p> */}
    </div>
  ));

  //   return (
  //     <div>Partyclaims</div>
  //   )
}

export default Partyclaims;
