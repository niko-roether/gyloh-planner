import React from "react";
import ThemeManager, { ThemeName } from "../src/components/theme_manager";
import { darkTheme, lightTheme } from "../src/theme/theme";
import { CacheProvider } from "@emotion/react";
import polyfill from "../src/polyfill";

import "../styles/styles.css";
import createEmotionCache from "../src/createEmotionCache";
import { CssBaseline } from "@mui/material";
import Head from "next/head";

const clientEmotionCache = createEmotionCache();

const App = ({Component, emotionCache = clientEmotionCache, pageProps}: any) => {
	React.useEffect(() => polyfill());
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeManager lightTheme={lightTheme} darkTheme={darkTheme} defaultTheme={ThemeName.LIGHT}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeManager>
		</CacheProvider>
	);
}

export default App;