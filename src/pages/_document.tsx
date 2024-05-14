// customizing the site doc
import { Html, Head, Main, NextScript } from "next/document";

const NextDocument = () => {
  return (
    <Html lang="en">
      <Head>
        {/* <link
              rel="preconnect"
              href="https://fonts.googleapis.com"
            />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap"
              rel="stylesheet"
            /> */}
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default NextDocument;
