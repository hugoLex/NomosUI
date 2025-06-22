import React, { memo } from "react";
import NextHead from "next/head";

const Head = ({ title }: { title: string }) => {
  return (
    <NextHead>
      <title>{` ${title ?? "App"} | Lexanalytics `}</title>
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default Head;
