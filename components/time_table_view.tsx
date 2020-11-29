import { Container, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Class, EntryInit, Room, Subject, Substitution, TimeTable } from "gyloh-webuntis-api";
import React from "react";
import TimeTableMobileView from "./time_table_mobile_view";
import TimeTableDesktopView from "./time_table_desktop_view";
import { Info as InfoIcon } from "@material-ui/icons";
import { Parser as HTMLParser } from "html-to-react";
 
const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.spacing(6),
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


const COLUMN_TITLES = {
	class: "Klasse",
	lesson: "Stunde",
	subject: "Fach",
	teacher: "Lehrer",
	room: "Raum",
	info: "Info",
}

export interface TimeTableViewEntryFields {
	class: Class,
	lesson: string,
	subject: Subject,
	teacher: string | Substitution<string>,
	rooms: (Room | Substitution<Room>)[],
	info: string
}

export interface TimeTableViewEntryProps {
	fields: TimeTableViewEntryFields;
}

export interface TimeTableSubViewProps {
	data: TimeTableViewEntryFields[];
}

export interface TimeTableViewProps {
	table: TimeTable;
}

function infoMessageCombine(info: string, message: string) {
	if(info !== "" && message !== "") return `${info}; ${message}`;
	if(info !== "") return info;
	return message;
}

const htmlParser = new HTMLParser();

const TimeTableView: React.FC<TimeTableViewProps> = ({ table }) => {
	const entryFields: TimeTableViewEntryFields[] = [];
	const classes = useStyles();
	const theme = useTheme();
	const useColumnView = useMediaQuery(theme.breakpoints.down("sm"));
	
	table.entries.forEach((entry) => entry.classes.forEach(
		(schoolClass) => {
			entryFields.push({
				class: schoolClass,
				lesson: entry.lesson,
				subject: entry.subject,
				teacher: entry.teacher,
				rooms: entry.rooms,
				info: infoMessageCombine(entry.info, entry.message),
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
				? <TimeTableMobileView data={entryFields} />
				: <TimeTableDesktopView data={entryFields} />
			}
		</Container>
	)
}

export {
	COLUMN_TITLES,
}

export default TimeTableView;