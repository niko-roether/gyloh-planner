import Head from "next/head";
import React from "react";
import FindTableForm from "../src/components/find_table_form";
import Page from "../src/components/page";
import TimeTableLoader from "../src/components/time_table_loader";

const TableFinder = () => {
	const [date, setDate] = React.useState<Date | null>(null);
	return (
		<Page title="Tabellenfinder">
			<Head>
				<title>Gyloh Planner | Tabellenfinder</title>
			</Head>
			<FindTableForm id="find-table-form" onSubmit={date => setDate(date)}/>
			{date && <TimeTableLoader date={date} />}
		</Page>
	);
}

export default TableFinder;