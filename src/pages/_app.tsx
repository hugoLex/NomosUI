import { Fragment } from "react";
import { Provider } from "react-redux";
import Head from "next/head";

import { store } from "@app/store/store";

import type { AppProps } from "next/app";
import type { NextPageWithLayout } from "@app/types";

import { inter, poppins, rubik } from "@app/assets/fonts";
import { NoSSR } from "@app/components/";

import "../assets/app.css";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Remove the tag below because its a security risk */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta charSet="UTF-8" />
      </Head>

      <Provider store={store}>
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
      </Provider>
    </Fragment>
  );
}

export default App;
