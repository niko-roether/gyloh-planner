import { AppBar, makeStyles, Slide, Toolbar, Typography, useMediaQuery, useScrollTrigger, useTheme } from "@material-ui/core";
import React from "react";
import PageNav from "./page_nav";
import ThemeSwitch from "./theme_switch";

const useStyles = makeStyles({
	heading: {
		flexGrow: 1,
		display: "inline-flex",
		alignItems: "center",
		flexWrap: "wrap",
	}
})

interface PageBarProps {
	title: string
}

const PageBar: React.FC<PageBarProps> = ({ title }) => {
	const classes = useStyles();
	const trigger = useScrollTrigger({ target: typeof window === "undefined" ? undefined : window});
	const theme = useTheme();
	const smallSubtitle = useMediaQuery(theme.breakpoints.down("xs"));
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			<AppBar position="sticky">
				<Toolbar>
					<PageNav />
					<span className={classes.heading}>
						<Typography variant="h6">Gyloh Planner&nbsp;</Typography>
						<Typography variant={smallSubtitle ? "subtitle2" : "subtitle1"}>/ {title}</Typography>
					</span>
					<ThemeSwitch />
				</Toolbar>
			</AppBar>
		</Slide>
	);
}

export default PageBar;