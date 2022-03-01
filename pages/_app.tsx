import React from "react";
import ThemeManager, { ThemeContext, ThemeName } from "../src/components/theme_manager";
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
			<ThemeManager lightTheme={lightTheme} darkTheme={darkTheme} defaultTheme={ThemeName.LIGHT}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
					<ThemeContext.Consumer>
						{({themeName: ThemeName}) => ((
							<meta name="theme-color" content={(themeName == ThemeName.LIGHT ? lightTheme : darkTheme).palette.background.default} />
						))}
					</ThemeContext.Consumer>
				</Head>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeManager>
		</CacheProvider>
	);
}

export default App;
