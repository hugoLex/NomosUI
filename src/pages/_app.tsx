import { Fragment } from "react";
import { Provider } from "react-redux";
import Head from "next/head";
import { store } from "@app/store/store";
import { NoSSR } from "@app/components/shared";
import { AppPropsWithLayout } from "@app/types";
import { inter, poppins, rubik, roboto } from "@app/assets/fonts";
import "../assets/app.css";

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

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
            --font-inter: ${roboto.style.fontFamily};
            --font-poppins:${poppins.style.fontFamily};
            
          }
        `}
          </style>
          <Fragment>{getLayout(<Component {...pageProps} />)}</Fragment>
        </NoSSR>
      </Provider>
    </Fragment>
  );
}

export default App;
