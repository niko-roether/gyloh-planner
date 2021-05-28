import React from "react";
import ResponsiveListView from "./responsive_list_view";
import { CalendarToday as CalenderIcon } from "@material-ui/icons";
import { TimeTable } from "gyloh-webuntis-api";
import TimeTableView from "./time_table_view";
import { getCurrentTables } from "../api_consume/consume_table";

export interface CurrentTimeTableLoaderProps {
	num: number
}

const CurrentTimeTableLoader = ({num}: CurrentTimeTableLoaderProps) => {
	const [tables, setTables] = React.useState<TimeTable[] | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);

	const refresh = () => {
		setLoading(true);
		getCurrentTables(num).then(tables => {
			if(tables) setTables(tables);
			else setError(true);
			setLoading(false);
		});
	}

	if(!tables && !loading && !error) refresh();

	return (
		<ResponsiveListView 
			iconComponent={CalenderIcon}
			titles={tables?.map(t => t.date.toLocaleDateString("de-DE")) ?? Array(num).fill("loading...")}
			loading={!tables}
		>
			{tables && !error ? tables.map((t, i) => (
				<TimeTableView table={t} key={i}/>
			)) : "Ein Fehler ist aufgetreten."}
		</ResponsiveListView>
	)
}

export default CurrentTimeTableLoader;