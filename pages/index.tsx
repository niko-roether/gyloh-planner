import React from "react";
import Page from "../src/components/page";
import CurrentTimeTableLoader from "../src/components/current_time_table_loader";
import { useMediaQuery, useTheme } from "@mui/material";

interface HomeProps {
	dates: number[]
}

const Home: React.FC<HomeProps> = () => {
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Page title="Vertretungsplan" backToTopVerticalOffset={mobile ? 7 : 0 }>
			<CurrentTimeTableLoader num={3} />
		</Page>
	)
}

export default Home;