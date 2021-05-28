import { Theme, ThemeProvider } from "@material-ui/core";
import React from "react";

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
	const saved = localStorage.saved;
	if((saved == "light" || saved == "dark") && themeName != saved) setThemeName(saved);

	const setTheme = (name: ThemeName) => {
		setThemeName(name);
		localStorage.saved = name;
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