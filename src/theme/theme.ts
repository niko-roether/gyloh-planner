import { createMuiTheme, SimplePaletteColorOptions } from "@material-ui/core";
import createBreakpoints, { BreakpointOverrides } from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({
	values: {
		xs: 0,
		sm: 600,
		md: 760,
		lg: 1280,
		xl: 1920
	}
})

const primary: SimplePaletteColorOptions = {
	main: "#002860",
	contrastText: "#fff",
}

const secondary: SimplePaletteColorOptions = {
	main: "#6184d8",
	contrastText: "#fff",
}

const lightTheme = createMuiTheme({
	palette: {
		type: "light",
		primary,
		secondary,
		background: {
			default: "#f5f5f5",
			paper: "#fff"
		}
	},
	breakpoints
});

const darkTheme = createMuiTheme({
	palette: {
		type: "dark",
		primary,
		secondary,
		background: {
			default: "#2a2a2e",
			paper: "#38383d"
		}
	},
	breakpoints
})

export {
	lightTheme,
	darkTheme
}