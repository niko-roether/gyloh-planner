import { CssBaseline } from "@material-ui/core";
import { Head } from "next/document";
import React from "react";
import CookiePopup from "./cookie_popup";
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
			<CookiePopup />
		</div>
	);
}

export default Page;