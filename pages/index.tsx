import React from "react";
import Page from "../src/components/page";
import ResponsiveListView from "../src/components/responsive_list_view";
import { GetServerSideProps } from "next";
import { GylohWebUntis, TimeTable } from "gyloh-webuntis-api";
import TimeTableLoader from "../src/components/time_table_loader";
import { CalendarToday } from "@material-ui/icons";
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