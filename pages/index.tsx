import React from "react";
import Page from "../src/components/page";
import CurrentTimeTableLoader from "../src/components/current_time_table_loader";

interface HomeProps {
	dates: number[]
}

const Home: React.FC<HomeProps> = () => {
	return (
		<Page title="Vertretungsplan">
			<CurrentTimeTableLoader num={3} />
		</Page>
	)
}

export default Home;