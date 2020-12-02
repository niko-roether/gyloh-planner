import { Container, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Class, Room, Subject, Substitution, TimeTable } from "gyloh-webuntis-api";
import React from "react";
import TimeTableMobileView from "./time_table_mobile_view";
import TimeTableDesktopView from "./time_table_desktop_view";
import { Info as InfoIcon } from "@material-ui/icons";
import { Parser as HTMLParser } from "html-to-react";
import SubstitutionView from "./substitution_view";
 
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

export interface TimeTableEntryFields {
	lesson: string,
	subject: string,
	teacher: React.ReactNode
	room: React.ReactNode
	info: React.ReactNode
}

export interface TimeTableEntryFieldsForClass {
	class: string,
	fields: TimeTableEntryFields[]
}

export interface TimeTableViewEntryProps {
	fieldsForClass: TimeTableEntryFieldsForClass;
}

export interface TimeTableSubViewProps {
	data: TimeTableEntryFieldsForClass[];
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

const ResponsiveTimeTableView: React.FC<TimeTableSubViewProps> = ({ data }) => {
	return (
		<React.Fragment>
			<Hidden mdUp>
				<TimeTableMobileView data={data} />
			</Hidden>
			<Hidden smDown>
				<TimeTableDesktopView data={data} />
			</Hidden>
		</React.Fragment>
	)
}

const TimeTableView: React.FC<TimeTableViewProps> = ({ table }) => {
	const entryFields: TimeTableEntryFieldsForClass[] = [];
	const classes = useStyles();
	
	table.affectedClasses.forEach(
		affectedClass => {
			entryFields.push({
				class: affectedClass.longName,
				fields: table.entries
					.filter(entry => entry.classes.some(cls => cls.shortName === affectedClass.shortName))
					.map(entry => ({
						lesson: entry.lesson,
						subject: entry.subject.longName,
						teacher: <SubstitutionView value={entry.teacher} current={c => c} subst={p => p} />,
						room: (
							<span>
								{entry.rooms.map((room, i) => (
									<React.Fragment>
										<SubstitutionView value={room} current={c => c?.longName} subst={s => s?.longName} />
										{i !== entry.rooms.length - 1 && <span>, </span>}
									</React.Fragment>
								))}
							</span>
						),
						info: infoMessageCombine(entry.info, entry.message)
					}))
			});
		}
	);

	console.log(entryFields);

	entryFields.sort((a, b) => a.class.localeCompare(b.class, "de-DE", {numeric: true}));

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
			<ResponsiveTimeTableView data={entryFields} />
		</Container>
	)
}

export {
	COLUMN_TITLES,
}

export default TimeTableView;