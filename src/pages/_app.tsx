import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router"

import "../../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return <Component {...pageProps} />
}

export default MyApp;