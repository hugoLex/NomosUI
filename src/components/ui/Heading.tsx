import React, { ReactNode } from "react";

type Props = {
  classNames?: string;
  desc?: string | ReactNode;
  descClass?: string;
  title: string | ReactNode;
  titleClass?: string;
  variants: "h1" | "h2" | "h3" | "h4";
};

const Heading = ({
  classNames,
  desc,
  descClass,
  title,
  titleClass,
  variants = "h2",
}: Props) => {
  return (
    <div className={`w-full mb-8 lg:mb-12 ${classNames ? classNames : ""}`}>
      {variants === "h1" && (
        <h1 className={`mb-3  ${titleClass ? titleClass : ""}`}>{title}</h1>
      )}
      {variants === "h2" && (
        <h2 className={`mb-3 ${titleClass ? titleClass : ""}`}>{title}</h2>
      )}
      {variants === "h3" && (
        <h2 className={`mb-3 ${titleClass ? titleClass : ""}`}>{title}</h2>
      )}
      {variants === "h4" && (
        <h2 className={`mb-3 ${titleClass ? titleClass : ""}`}>{title}</h2>
      )}
      {desc && (
        <p
          className={`mb-3 max-sm:w-[80%] mx-auto ${
            descClass ? descClass : ""
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
};

export default Heading;
