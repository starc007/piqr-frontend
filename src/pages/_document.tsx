import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        /> */}
        <meta property="og:image" content="/ogImage.png" />
        <meta property="og:url" content="https://piqr.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@piqr_hq" />
        <meta name="twitter:creator" content="@piqr_hq" />
        <meta name="twitter:image" content="/ogImage.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
