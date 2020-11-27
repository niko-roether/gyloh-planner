import { CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import PageBar from "./page_bar";

const useStyles = makeStyles(theme => ({
	page: {
		height: "100vh",
	},
	main: {
		// height: `calc(100vh - ${theme.mixins.toolbar.height})`
	}
}));

export interface PageProps {
	title: string;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
	const classes = useStyles();
	return (
		<div className={classes.page}>
			<CssBaseline />
			<PageBar title={title} />
			<main className={classes.main}>{children}</main>
		</div>
	);
}

export default Page;