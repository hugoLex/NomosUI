import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { ComponentProps } from "@app/types";

interface FooterProps extends ComponentProps {}

const Footer: FC<FooterProps> = ({ children }) => {
  return <footer className="bg-primary  overflow-y-hidden"></footer>;
};

export default Footer;
