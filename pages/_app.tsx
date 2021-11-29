import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router"
import ThemeManager, { ThemeName } from "../src/components/theme_manager";
import { darkTheme, lightTheme } from "../src/theme/theme";
import polyfill from "../src/polyfill";

import "../styles/styles.css";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
	React.useEffect(() => polyfill());
	return (
		<ThemeManager lightTheme={lightTheme} darkTheme={darkTheme} defaultTheme={ThemeName.LIGHT}>
			<Component {...pageProps} />
		</ThemeManager>
	);
}

export default App;