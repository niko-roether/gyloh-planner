import { IconButton } from "@material-ui/core";
import { BrightnessHigh as BrightnessHighIcon, BrightnessLow as BrightnessLowIcon } from "@material-ui/icons";
import React, { useContext } from "react";
import { ThemeContext } from "./theme_manager";

const ThemeSwitch: React.FC = () => {
	const { themeName, setTheme } = useContext(ThemeContext);
	const onClick = () => {
		setTheme(themeName == "light" ? "dark" : "light");
	}
	return (
		<IconButton onClick={onClick} color="inherit">
			{themeName == "light" ? <BrightnessHighIcon /> : <BrightnessLowIcon />}
		</IconButton>
	)
}

export default ThemeSwitch;