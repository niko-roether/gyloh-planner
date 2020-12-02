import { AppBar, makeStyles, Slide, Toolbar, Typography, useScrollTrigger } from "@material-ui/core";
import React, { useContext } from "react";
import PageNav from "./page_nav";
import { ThemeContext } from "./theme_manager";
import ThemeSwitch from "./theme_switch";

const useStyles = makeStyles({
	grow: {
		flexGrow: 1
	}
})

interface PageBarProps {
	title: string
}

const PageBar: React.FC<PageBarProps> = ({ title }) => {
	const classes = useStyles();
	const trigger = useScrollTrigger({ target: typeof window === "undefined" ? undefined : window});
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			<AppBar position="sticky">
				<Toolbar>
					<PageNav />
					<Typography variant="h6">Gyloh Planner</Typography>
					&nbsp;/&nbsp;
					<Typography variant="subtitle1">{title}</Typography>
					<div className={classes.grow} />
					<ThemeSwitch />
				</Toolbar>
			</AppBar>
		</Slide>
	);
}

export default PageBar;