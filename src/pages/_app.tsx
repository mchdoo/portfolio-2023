import { apollo } from "@/lib/apollo";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Head } from "next/document";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    </main>
  );
}
