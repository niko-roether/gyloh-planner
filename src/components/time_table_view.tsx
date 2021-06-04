import { Box, Button, Container, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography} from "@material-ui/core";
import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import TimeTableMobileView from "./time_table_mobile_view";
import TimeTableDesktopView from "./time_table_desktop_view";
import { Info as InfoIcon } from "@material-ui/icons";
import { Parser as HTMLParser } from "html-to-react";
import { tableToEntryFields, TimeTableEntryFieldsForClass } from "../util/time_table_utils";
 
const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.spacing(6),
		paddingBottom: theme.spacing(12),
		[theme.breakpoints.down("sm")]: {
			paddingLeft: 0,
			paddingRight: 0,
			paddingBottom: theme.spacing(1)
		}
	},
	headingContainer: {
		[theme.breakpoints.down("sm")]: {
			margin: theme.spacing(0, 2),
			fontSize: "0.8em"
		}
	},
	noEntries: {
		marginTop: theme.spacing(2),
		fontStyle: "italic"
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


const htmlParser = new HTMLParser();

export interface TimeTableSubViewProps {
	data: TimeTableEntryFieldsForClass[]
}

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

export interface TimeTableViewProps {
	table: TimeTable;
	refresh?: () => void
}

const TimeTableView: React.FC<TimeTableViewProps> = ({ table, refresh }) => {
	const classes = useStyles();
	
	const entryFields = tableToEntryFields(table);

	return (
		<Container className={classes.container}>
			<div className={classes.headingContainer}>
				<Typography variant="h4">
					Vertretungsplan {table.date.toLocaleDateString("de-De", {weekday: "short", day: "numeric", month: "numeric", year: "numeric"})}
				</Typography>
				<Box display="flex" alignItems="center">
					<Typography variant="subtitle1" display="inline">Stand {table.lastUpdate}</Typography>
					{refresh && (
						<Box ml={1} display="inline-block"><Button onClick={refresh} variant="contained" size="small">Aktualisieren</Button></Box>
					)}
				</Box>
			</div>
			<List>
				{table.messages.map((msg, i) => (
					<ListItem key={i}>
						<ListItemIcon><InfoIcon /></ListItemIcon>
						<ListItemText>{htmlParser.parse(msg.body)}</ListItemText>
					</ListItem>
				))}
			</List>
			{entryFields.length > 0 
				? <ResponsiveTimeTableView data={entryFields} />
				: <div className={classes.noEntries}>Keine Einträge</div>
			}
		</Container>
	)
}

export {
	COLUMN_TITLES,
	TimeTableMobileView,
	TimeTableDesktopView
}

export default TimeTableView;