import { apollo } from "@/lib/apollo";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";

import { Inter } from "next/font/google";
import { gsap } from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  display: "swap",
  weight: "400",
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    
    
  }, []);

  return (
    <main className={inter.className}>
      <Head>
        <title>PEDRO MACHADO — portfolio</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#FDF9F3" />
        <meta name="description" content="El portfolio de Pedro Machado." />
        <meta property="og:title" content="Pedro Machado Portfolio"></meta>
        <meta property="og:image" content="/escape.jpg"></meta>
        <meta property="og:description" content="Mi bello portfolio!" />
      </Head>
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    </main>
  );
}
