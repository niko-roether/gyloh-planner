import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router"
import ThemeManager, { ThemeName } from "../src/components/theme_manager";
import { darkTheme, lightTheme } from "../src/theme/theme";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
	return (
		<ThemeManager lightTheme={lightTheme} darkTheme={darkTheme} defaultTheme={ThemeName.LIGHT}>
			<Component {...pageProps} />
		</ThemeManager>
	);
}

export default App;