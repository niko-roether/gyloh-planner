import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import { tableToEntryFields } from "../util/time_table_utils";
import TimeTableDesktopView from "./time_table_desktop_view";


export interface BareTimeTableViewProps {
	table: TimeTable;
}

const BareTimeTableView: React.FC<BareTimeTableViewProps> = ({ table }) => {
	const entryFields = tableToEntryFields(table);

	entryFields.sort((a, b) => a.class.localeCompare(b.class, "de-DE", {numeric: true}));

	return <TimeTableDesktopView data={entryFields} fillUpScreen={true}/>;
}

export default BareTimeTableView;