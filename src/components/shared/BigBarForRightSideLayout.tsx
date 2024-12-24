import { UseQueryToggler } from "@app/hooks/queryHandler";
import { BigBarForRightSideLayoutProps } from "@app/types";
import Link from "next/link";
import React, { useState } from "react";

import { HiPlus } from "react-icons/hi2";

const BigBarForRightSideLayout: React.FC<BigBarForRightSideLayoutProps> = ({
  title,
  icon = <HiPlus />,
  style,
}) => {
  const { router, pathname, createQueryString } = UseQueryToggler();

  //   const [tab, setTab] = useState<string>("Judicial Panel");

  return (
    <Link
      // role="button"
      // className="flex items-center "
      href={`${pathname}?${createQueryString("judgecounselgraph", title)}`}
      className={`w-full flex justify-between items-center capitalize border border-gray-200 border-solid my-2 px-[20px] py-[8px] text-start text-[14px] rounded-md gap-2 hover:bg-neutral-200/50 ${"font-black text-[#245b91]"}`}
      // onClick={() => {
      //   setTab(title);
      //   router.push(
      // `/${pathname}?${urlString}#${title}`
      // `/${pathname}?${createQueryString("section", item)}#${item}`
      //   );
      // }}
    >
      {title} {icon}
    </Link>
  );
};

export default BigBarForRightSideLayout;
