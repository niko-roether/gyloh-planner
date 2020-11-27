import { makeStyles, Paper, StyledComponentProps, StyledProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Class, Entry, EntryInit, Message, Room, Subject, Substitution, TimeTable } from "gyloh-webuntis-api";
import React from "react";
import SubstitutionView from "./substitution_view";

const useStyles = makeStyles(theme => ({
	tableContainer: {
		// maxHeight: 440,
	},
	tableHeaderCell: {
		fontWeight: "bold",
		background: theme.palette.grey[900],
		color: "#fff"
	},
	firstCell: {
		fontWeight: "bold"
	}
}));

export enum TimeTableColumn {
	CLASS,
	LESSON,
	TIME,
	SUBJECT,
	TEACHER,
	ROOM,
	INFO,
	MESSAGE
}

const columnTitles = new Map<TimeTableColumn, string>([
	[TimeTableColumn.CLASS, 	"Klasse"],
	[TimeTableColumn.LESSON, 	"Stunde"],
	[TimeTableColumn.TIME, 		"Zeit"],
	[TimeTableColumn.SUBJECT, 	"Fach"],
	[TimeTableColumn.TEACHER, 	"Lehrer"],
	[TimeTableColumn.ROOM, 		"Raum"],
	[TimeTableColumn.INFO, 		"Info"],
	[TimeTableColumn.MESSAGE, 	"Nachricht"]
]);

const defaultColumns = [
	TimeTableColumn.LESSON,
	TimeTableColumn.SUBJECT,
	TimeTableColumn.TEACHER,
	TimeTableColumn.ROOM,
	TimeTableColumn.INFO,
	TimeTableColumn.MESSAGE
];

interface TimeTableViewEntryFields extends Omit<EntryInit, "classes"> {
	class: Class;
}

export interface TimeTableViewEntryProps {
	fields: TimeTableViewEntryFields;
	columns: TimeTableColumn[];
	className?: string;
}

const TimeTableViewEntry: React.FC<TimeTableViewEntryProps> = ({ fields, columns, className }) => {
	const classes = useStyles();
	return (
		<TableRow className={className}>
			{columns.map((column, i) => (
				<TableCell key={i} className={i === 0 ? classes.firstCell : ""}>
					{(() => {
						switch(column) {
							case TimeTableColumn.CLASS: return fields.class.longName;
							case TimeTableColumn.LESSON: return fields.lesson;
							case TimeTableColumn.TIME: return fields.time;
							case TimeTableColumn.SUBJECT: return fields.subject.longName;
							case TimeTableColumn.TEACHER:
								return (
									<SubstitutionView value={fields.teacher}>
										{(current, subst) => <span>{current} <s>{subst}</s></span>}
									</SubstitutionView>
								);
							case TimeTableColumn.ROOM:
								return  fields.rooms.map(room => (
									<SubstitutionView value={room}>
										{(current, subst) => <span>{current?.longName} <s>{subst?.longName}</s></span>}
									</SubstitutionView>
								));
							case TimeTableColumn.INFO: return fields.info;
							case TimeTableColumn.MESSAGE: return fields.message;
						}
					})()}
				</TableCell>
			))}
		</TableRow>
	)
}

export interface TimeTableViewProps {
	table: TimeTable;
	columns?: TimeTableColumn[]
}


const TimeTableView: React.FC<TimeTableViewProps> = ({ table, columns = defaultColumns }) => {
	const classes = useStyles();
	const completeColumns = [TimeTableColumn.CLASS, ...columns];

	const entries = table.entries.map((entry, i) => entry.classes.map((schoolClass, j) => (
		<TimeTableViewEntry 
			fields={{
				class: schoolClass,
				...entry
			}}
			columns={completeColumns}
			key={i + j / entry.classes.length}
		/>
	)));

	return (
		<TableContainer /*component={Paper}*/ className={classes.tableContainer}>
			<Table stickyHeader style={{display: "inline-block"}}>
				<TableHead>
					<TableRow>
						{completeColumns.map((column, i) => (
							<TableCell key={i} className={classes.tableHeaderCell}>
								{columnTitles.get(column)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{entries}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default TimeTableView;