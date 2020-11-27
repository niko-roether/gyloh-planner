import { AppBar, IconButton, makeStyles, Slide, Toolbar, Typography, useScrollTrigger } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(theme => ({
	menuButton: {
		marginRight: theme.spacing(1)
	}
}));

interface PageBarProps {
	title: string
}

const PageBar: React.FC<PageBarProps> = ({ title }) => {
	const trigger = useScrollTrigger({ target: typeof window === "undefined" ? undefined : window});
	const classes = useStyles();
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton edge="start" color="inherit" className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">Gyloh Vertretungsplan</Typography>
					&nbsp;
					<Typography variant="subtitle1">/ {title}</Typography>
				</Toolbar>
			</AppBar>
		</Slide>
	);
}

export default PageBar;