import { makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Class, EntryInit, TimeTable } from "gyloh-webuntis-api";
import React from "react";
import TimeTableColumnView from "./time_table_column_view";
import TimeTableTableView from "./time_table_table_view";

const useStyles = makeStyles(theme => ({
	container: {
		width: "90%",
		maxWidth: 1200,
		margin: theme.spacing(4, "auto"),
		[theme.breakpoints.down("sm")]: {
			width: "100%"
		}
	},
	heading: {
		[theme.breakpoints.down("sm")]: {
			margin: theme.spacing(0, 2)
		}
	}
}))

export enum TimeTableColumn {
	CLASS,
	LESSON,
	TIME,
	SUBJECT,
	TEACHER,
	ROOM,
	INFO,
	MESSAGE,
	INFO_MESSAGE_COMBINE
}

const COLUMN_TITLES = new Map<TimeTableColumn, string>([
	[TimeTableColumn.CLASS, 				"Klasse"],
	[TimeTableColumn.LESSON, 				"Stunde"],
	[TimeTableColumn.TIME, 					"Zeit"],
	[TimeTableColumn.SUBJECT, 				"Fach"],
	[TimeTableColumn.TEACHER, 				"Lehrer"],
	[TimeTableColumn.ROOM, 					"Raum"],
	[TimeTableColumn.INFO, 					"Info"],
	[TimeTableColumn.MESSAGE, 				"Nachricht"],
	[TimeTableColumn.INFO_MESSAGE_COMBINE, 	"Info"]
]);

const DEFAULT_COLUMNS = [
	TimeTableColumn.LESSON,
	TimeTableColumn.SUBJECT,
	TimeTableColumn.TEACHER,
	TimeTableColumn.ROOM,
	TimeTableColumn.INFO_MESSAGE_COMBINE
];

export interface TimeTableViewEntryFields extends Omit<EntryInit, "classes"> {
	class: Class;
}

export interface TimeTableViewEntryProps {
	fields: TimeTableViewEntryFields;
	columns: TimeTableColumn[];
	className?: string;
}

export interface TimeTableSubViewProps {
	data: TimeTableViewEntryFields[];
	columns: TimeTableColumn[];
}

export interface TimeTableViewProps {
	table: TimeTable;
	columns?: TimeTableColumn[];
}

function infoMessageCombine(info: string, message: string) {
	if(info !== "" && message !== "") return `${info}; ${message}`;
	if(info !== "") return info;
	return message;
}

const TimeTableView: React.FC<TimeTableViewProps> = ({ table, columns = DEFAULT_COLUMNS}) => {
	const completeColumns = [TimeTableColumn.CLASS, ...columns];
	const entryFields: TimeTableViewEntryFields[] = [];
	const classes = useStyles();
	const theme = useTheme();
	const useColumnView = useMediaQuery(theme.breakpoints.down("sm"));
	
	table.entries.forEach((entry) => entry.classes.forEach(
		(schoolClass) => {
			entryFields.push({
				class: schoolClass,
				...entry
			})
		}
	));

	entryFields.sort((a, b) => a.class.shortName.localeCompare(b.class.shortName, "de-DE", {numeric: true}))

	return (
		<div className={classes.container}>
			<Typography className={classes.heading} variant="h4">Vertretungsplan {table.date.toLocaleDateString("de-De")}</Typography>
			{useColumnView 
				? <TimeTableColumnView data={entryFields} columns={completeColumns} />
				: <TimeTableTableView data={entryFields} columns={completeColumns} />
			}
		</div>
	)
}

export {
	COLUMN_TITLES,
	infoMessageCombine
}

export default TimeTableView;