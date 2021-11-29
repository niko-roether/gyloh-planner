import { createTheme, SimplePaletteColorOptions } from "@mui/material";

const breakpoints = {
	values: {
		xs: 0,
		sm: 600,
		md: 760,
		lg: 1280,
		xl: 1920
	}
}

const primary: SimplePaletteColorOptions = {
	main: "#002860",
	contrastText: "#fff",
}

const secondary: SimplePaletteColorOptions = {
	main: "#6184d8",
	contrastText: "#fff",
}

const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary,
		secondary,
		background: {
			default: "#f5f5f5",
			paper: "#fff"
		}
	},
	breakpoints
});

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary,
		secondary,
		background: {
			default: "#2a2a2e",
			paper: "#2a2a2e"
		}
	},
	breakpoints
})

export {
	lightTheme,
	darkTheme
}