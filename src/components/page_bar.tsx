import { AppBar, Slide, Toolbar, Typography, useScrollTrigger } from "@material-ui/core";
import React from "react";
import PageNav from "./page_nav";


interface PageBarProps {
	title: string
}

const PageBar: React.FC<PageBarProps> = ({ title }) => {
	const trigger = useScrollTrigger({ target: typeof window === "undefined" ? undefined : window});
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			<AppBar position="sticky">
				<Toolbar>
					<PageNav />
					<Typography variant="h6">Gyloh Planner</Typography>
					&nbsp;/&nbsp;
					<Typography variant="subtitle1">{title}</Typography>
				</Toolbar>
			</AppBar>
		</Slide>
	);
}

export default PageBar;