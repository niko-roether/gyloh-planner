import { createMuiTheme, SimplePaletteColorOptions } from "@material-ui/core";


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
	}
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
	}
})

export {
	lightTheme,
	darkTheme
}