import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import useSWR from "swr";
import { getTable } from "../api_consume/consume_table";
import TimeTableView from "./time_table_view";

interface TimeTableLoaderProps {
	date: Date | number | string
}

const TimeTableLoader: React.FC<TimeTableLoaderProps> = ({ date }) => {
	if(!(date instanceof Date)) date = new Date(date);
	const res = useSWR(`table-${date.toISOString().split("T")[0]}`, () => getTable(date), {
		refreshInterval: 20000,
	});
	if(res.error) return <Box textAlign="center" mt={4} fontStyle="italic">{res.error.message}</Box>
	if(!res.data) return <Box textAlign="center" mt={4}><CircularProgress color="secondary" /></Box>
	return <TimeTableView table={res.data} />
}

export default TimeTableLoader;