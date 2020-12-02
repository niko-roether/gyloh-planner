import { Theme, ThemeProvider } from "@material-ui/core";
import { NextPageContext } from "next";
import React from "react";
import { getCookie, setCookie } from "../util/cookie_utils";

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

interface ThemeManagerState {
	themeName: ThemeName
}

class ThemeManager extends React.Component<ThemeManagerProps, ThemeManagerState> {
	private static readonly COOKIE = "theme";

	constructor(props: ThemeManagerProps) {
		super(props);
		this.state = {
			themeName: props.defaultTheme || "light"
		}
	}

	private setCookie(name: ThemeName) {
		setCookie(ThemeManager.COOKIE, name, 2629746000, "/");
	}

	private setTheme(name: ThemeName) {
		this.setCookie(name);
		this.setState({ themeName: name});
	}

	private getSavedTheme(): string | null {
		return getCookie(ThemeManager.COOKIE);
	}

	componentDidMount() {
		const themeName = this.getSavedTheme();
		if(themeName == "light" || themeName == "dark")
			this.setTheme(themeName);
	}

	render() {
		const { themeName } = this.state;
		const { children, lightTheme, darkTheme } = this.props;
		const theme = themeName == "light" ? lightTheme : darkTheme || lightTheme;
		return (
			<ThemeContext.Provider value={{themeName, setTheme: (name: ThemeName) => this.setTheme(name)}}>
				<ThemeProvider theme={theme}>
					{children}
				</ThemeProvider>
			</ThemeContext.Provider>
		);
	}
}

export default ThemeManager;