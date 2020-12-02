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
})

const ThemeManager: React.FC<ThemeManagerProps> = ({ lightTheme, darkTheme, defaultTheme, children }) => {
	const [themeName, setThemeName] = React.useState<ThemeName>(defaultTheme || "light");

	if(!darkTheme) darkTheme = lightTheme;

	const theme = themeName == "light" ? lightTheme : darkTheme;

	return (
		<ThemeContext.Provider value={{themeName, setTheme: setThemeName}}>
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeManager;