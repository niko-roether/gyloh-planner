import { Theme, ThemeProvider } from "@mui/material";
import React from "react";

export enum ThemeName {
	LIGHT = "light",
	DARK = "dark"
}

export interface ThemeManagerProps {
	lightTheme: Theme,
	darkTheme?: Theme,
	defaultTheme?: ThemeName
}

export const ThemeContext = React.createContext<({
	themeName: ThemeName;
	setTheme: (name: ThemeName) => void;
})>({
	themeName: ThemeName.LIGHT,
	setTheme: () => null	
});

interface ThemeManagerState {
	themeName: ThemeName;
}

class ThemeManager extends React.Component<ThemeManagerProps, ThemeManagerState> {
	constructor(props: ThemeManagerProps) {
		super(props);
		this.state = {themeName: ThemeName.LIGHT};
	}

	private setTheme(themeName: ThemeName) {
		this.setState({themeName});
		localStorage.setItem("theme", themeName);
	}

	render() {
		const {themeName} = this.state;
		const setTheme = (themeName: ThemeName) => this.setTheme(themeName);
		const {lightTheme, darkTheme, children} = this.props;
		return (
			<ThemeContext.Provider value={{themeName, setTheme}}>
				<ThemeProvider theme={themeName == "light" ? lightTheme : darkTheme || lightTheme}>
					{children}
				</ThemeProvider>
			</ThemeContext.Provider>
		);	
	}

	componentDidMount() {
		const storedTheme = localStorage.getItem("theme");
		if(storedTheme && (storedTheme == ThemeName.LIGHT || storedTheme == ThemeName.DARK))
			this.setTheme(storedTheme);
		else
			localStorage.setItem("theme", this.state.themeName);
	}
}

export default ThemeManager;