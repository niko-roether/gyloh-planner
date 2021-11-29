import { CssBaseline } from "@mui/material";
import Head from "next/head";
import React from "react";
import BackToTop from "./back_to_top";
import PageBar from "./page_bar";


export interface PageProps {
	title: string;
	backToTopVerticalOffset?: number;
}

const Page: React.FC<PageProps> = ({ title, backToTopVerticalOffset, children }) => {
	return (
		<div>
			<Head>
				<title>Gyloh Planner</title>
			</Head>
			<CssBaseline />
			<PageBar title={title} />
			<main>{children}</main>
			<BackToTop verticalOffset={backToTopVerticalOffset} />
		</div>
	);
}

export default Page;