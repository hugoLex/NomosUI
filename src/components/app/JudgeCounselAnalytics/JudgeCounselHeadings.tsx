import React from "react";

type HeadingProps = {
  heading1: string;
  heading2: string;
  style: { ctnStyle: string; h1Style: string; h2Style: string };
};

const JudgeCounselHeadings: React.FC<HeadingProps> = ({
  heading1,
  heading2,
  style,
}) => {
  return (
    <div className={` ${style.ctnStyle} `}>
      <h3
        className={` ${style.h1Style} font-light text-[0.813rem] text-black/80  mt-2 pr-2.5 py-1 leading-[1.25rem]`}
      >
        {heading1}
      </h3>
      <h1
        id=""
        className={` ${style.h2Style} text-xx font-normal mb-3 text-[#245b91]`}
      >
        {heading2}
      </h1>
    </div>
  );
};

export default JudgeCounselHeadings;
