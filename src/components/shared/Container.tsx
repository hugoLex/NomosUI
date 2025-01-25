import React, { FC, PropsWithChildren } from "react";

type ViewProp = PropsWithChildren & {
  className?: string;
};

const View: FC<ViewProp> = ({ children, className }) => {
  return (
    <section className="relative flex self-stretch min-h-screen mx-auto max-w-[1100px] px-16 max-md:px-5">
      {children}
    </section>
  );
};

export default View;
