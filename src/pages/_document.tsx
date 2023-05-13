import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#FDF9F3" />
        <meta name="description" content="El portfolio de Pedro Machado." />
        <meta property="og:title" content="Pedro Machado Portfolio"></meta>
        <meta property="og:image" content="/escape.jpg"></meta>
        <meta property="og:description" content="Mi bello portfolio!" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
