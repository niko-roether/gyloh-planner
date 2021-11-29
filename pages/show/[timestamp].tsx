import { Box } from "@mui/material";
import { GylohWebUntis, TimeTable } from "gyloh-webuntis-api";
import { GetServerSideProps } from "next";
import React from "react";
import BareTimeTableView from "../../src/components/bare_time_table_view";
import { jsonEncodeTable, parseTable } from "../../src/util/api_util";

interface ShowCurrentTableProps {
	table: string | null;
}

const ShowSpecificTable = ({table}: ShowCurrentTableProps) => {
	if(!table) return <Box mt={3} textAlign="center">Ein Fehler ist aufgetreten.</Box>;
	return <BareTimeTableView table={parseTable(table)} />;
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const dateString = query["timestamp"];
	if(typeof dateString !== "string") return {props: {table: null}};
	const date = new Date(dateString);
	const table = await GylohWebUntis.getTable(date);
	return {props: {table: table ? jsonEncodeTable(table) : null}};
}

export default ShowSpecificTable;