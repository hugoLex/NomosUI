import "../assets/app.css";
import { Fragment } from "react";
import type { AppProps } from "next/app";

import type { NextPageWithLayout } from "@app/types";

import { inter, poppins, rubik } from "@app/assets/fonts";
import { NoSSR } from "@app/components/";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <NoSSR>
      <style>
        {`
          :root {
            --font-rubik: ${rubik.style.fontFamily};
            --font-inter: ${inter.style.fontFamily};
            --font-poppins:${poppins.style.fontFamily};
          
          }
        `}
      </style>
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </NoSSR>
  );
}

export default App;
