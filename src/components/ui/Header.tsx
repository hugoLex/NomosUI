import React, { FC, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ComponentProps, LinkProps } from "@app/types";

import { CloseIcon, MenuIcon } from "../icons";
import { DetectOutsideClick } from "@app/hoc";

type Variant = "default" | "empty";

interface HeaderProps extends ComponentProps {
  links?: LinkProps[];
  variants?: Variant;
}

const Header: FC<HeaderProps> = ({ links, variants = "empty", children }) => {
  const router = useRouter();

  return (
    <header className="fixed top-0 w-full z-[999] bg-white shadow-sm"></header>
  );
};

export default Header;
