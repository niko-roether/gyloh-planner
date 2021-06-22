import { Box } from "@material-ui/core";
import { GylohWebUntis, TimeTable } from "gyloh-webuntis-api";
import { GetServerSideProps } from "next";
import React from "react";
import BareTimeTableView from "../../src/components/bare_time_table_view";
import { jsonEncodeTable, parseTable } from "../../src/util/api_util";

interface ShowCurrentTableProps {
	table: string | null;
}

const ShowCurrentTable = ({table}: ShowCurrentTableProps) => {
	if(!table) return <Box mt={3} textAlign="center">Ein Fehler ist aufgetreten.</Box>;
	return <BareTimeTableView table={parseTable(table)} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
	const table = (await GylohWebUntis.getCurrentTables(1))[0];
	return {props: {table: table ? jsonEncodeTable(table) : null}};
}

export default ShowCurrentTable;