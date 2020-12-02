import { Theme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { COOKIE_INDEFINITE, setCookie, useCookie } from "../util/cookie_utils";

export type ThemeName = "light" | "dark";

export interface ThemeManagerProps {
	lightTheme: Theme,
	darkTheme?: Theme,
	defaultTheme?: ThemeName
}

export const ThemeContext = React.createContext<({
	themeName: ThemeName;
	setTheme: (name: ThemeName) => void;
})>({
	themeName: "light",
	setTheme: () => null	
});

const THEME_COOKIE = "theme";

const ThemeManager: React.FC<ThemeManagerProps> = ({ lightTheme, darkTheme, defaultTheme = "light", children }) => {
	const [themeName, setThemeName] = React.useState<ThemeName>(defaultTheme);
	const saved = useCookie(THEME_COOKIE);
	if((saved == "light" || saved == "dark") && themeName != saved) setThemeName(saved);

	const setTheme = (name: ThemeName) => {
		setThemeName(name);
		setCookie(THEME_COOKIE, name, COOKIE_INDEFINITE, "/");
	}

	return (
		<ThemeContext.Provider value={{themeName, setTheme}}>
			<ThemeProvider theme={themeName == "light" ? lightTheme : darkTheme || lightTheme}>
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default ThemeManager;