import { CssBaseline } from "@material-ui/core";
import React from "react";
import PageBar from "./page_bar";


export interface PageProps {
	title: string;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
	return (
		<div>
			<CssBaseline />
			<PageBar title={title} />
			<main>{children}</main>
		</div>
	);
}

export default Page;