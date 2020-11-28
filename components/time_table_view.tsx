import { Container, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Class, EntryInit, TimeTable } from "gyloh-webuntis-api";
import React from "react";
import TimeTableMobileView from "./time_table_mobile_view";
import TimeTableDesktopView from "./time_table_desktop_view";
import { Info as InfoIcon } from "@material-ui/icons";
import { Parser as HTMLParser } from "html-to-react";
 
const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.spacing(3),
		paddingBottom: theme.spacing(12),
		[theme.breakpoints.down("sm")]: {
			paddingLeft: 0,
			paddingRight: 0,
			paddingBottom: theme.spacing(6)
		}
	},
	headingContainer: {
		[theme.breakpoints.down("sm")]: {
			margin: theme.spacing(0, 2),
			fontSize: "0.8em"
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

const htmlParser = new HTMLParser();

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
		<Container className={classes.container}>
			<div className={classes.headingContainer}>
				<Typography variant="h4">Vertretungsplan {table.date.toLocaleDateString("de-De")}</Typography>
				<Typography variant="subtitle1">Stand {table.lastUpdate}</Typography>
			</div>
			<List>
				{table.messages.map((msg, i) => (
					<ListItem key={i}>
						<ListItemIcon><InfoIcon /></ListItemIcon>
						<ListItemText>{htmlParser.parse(msg.body)}</ListItemText>
					</ListItem>
				))}
			</List>
			{useColumnView 
				? <TimeTableMobileView data={entryFields} columns={completeColumns} />
				: <TimeTableDesktopView data={entryFields} columns={completeColumns} />
			}
		</Container>
	)
}

export {
	COLUMN_TITLES,
	infoMessageCombine
}

export default TimeTableView;