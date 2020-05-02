import React from "react";
import Head from "next/head";

import "../assets/styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Rohmad Arifin</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
