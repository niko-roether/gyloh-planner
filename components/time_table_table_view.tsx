import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Class, EntryInit, TimeTable } from "gyloh-webuntis-api";
import React from "react";
import SubstitutionView from "./substitution_view";

const useStyles = makeStyles(theme => ({
	tableContainer: {
		height: "80vh",
		maxHeight: "700",
		marginTop: theme.spacing(2)
	},
	tableHeaderCell: {
		fontWeight: "bold",
		background: theme.palette.grey[900],
		color: "#fff"
	},
	row: {
		"&:nth-child(odd)": {
			background: theme.palette.grey[200],
		}	
	},
	cell: {
		"&:first-child": {
			fontWeight: "bold",
			background: theme.palette.grey[200],
		}
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
	MESSAGE,
	INFO_MESSAGE_COMBINE
}

const columnTitles = new Map<TimeTableColumn, string>([
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

const defaultColumns = [
	TimeTableColumn.LESSON,
	TimeTableColumn.SUBJECT,
	TimeTableColumn.TEACHER,
	TimeTableColumn.ROOM,
	TimeTableColumn.INFO_MESSAGE_COMBINE
];

interface TimeTableTableViewEntryFields extends Omit<EntryInit, "classes"> {
	class: Class;
}

export interface TimeTableTableViewEntryProps {
	fields: TimeTableTableViewEntryFields;
	columns: TimeTableColumn[];
	className?: string;
}

const TimeTableTableViewEntry: React.FC<TimeTableTableViewEntryProps> = ({ fields, columns, className }) => {
	const classes = useStyles();
	const theme = useTheme();
	const shortNames = useMediaQuery<Theme>(theme.breakpoints.down("md"));
	return (
		<TableRow className={className}>
			{columns.map((column, i) => (
				<TableCell key={i} className={classes.cell}>
					{(() => {
						switch(column) {
							case TimeTableColumn.CLASS: return shortNames ? fields.class.shortName : fields.class.longName;
							case TimeTableColumn.LESSON: return fields.lesson;
							case TimeTableColumn.TIME: return fields.time;
							case TimeTableColumn.SUBJECT: return shortNames ? fields.subject.shortName : fields.subject.longName;
							case TimeTableColumn.TEACHER:
								return (
									<SubstitutionView 
										value={fields.teacher}
										current={c => c}
										subst={s => s}
									/>
								);
							case TimeTableColumn.ROOM:
								return  fields.rooms.map((room, i) => (
									<SubstitutionView 
										key={i} value={room}
										current={c => (shortNames ? c?.shortName : c?.longName)}
										subst={s => (shortNames ? s?.shortName : s?.longName)}
									/>
								));
							case TimeTableColumn.INFO: return fields.info;
							case TimeTableColumn.MESSAGE: return fields.message;
							case TimeTableColumn.INFO_MESSAGE_COMBINE:
								if(fields.info !== "" && fields.message !== "") return `${fields.info}; ${fields.message}`;
								if(fields.info !== "") return fields.info;
								return fields.message;
						}
					})()}
				</TableCell>
			))}
		</TableRow>
	)
}

export interface TimeTableTableViewProps {
	table: TimeTable;
	columns?: TimeTableColumn[]
}

const TimeTableTableView: React.FC<TimeTableTableViewProps> = ({ table, columns = defaultColumns }) => {
	const classes = useStyles();
	const completeColumns = [TimeTableColumn.CLASS, ...columns];

	const entryFields: TimeTableTableViewEntryFields[] = [];
	
	table.entries.forEach((entry) => entry.classes.forEach(
		(schoolClass) => {
			entryFields.push({
				class: schoolClass,
				...entry
			})
		}
	));

	entryFields.sort((a, b) => a.class.shortName.localeCompare(b.class.shortName, "de-DE", {numeric: true}))

	const entries = entryFields.map((ef, i) => (
		<TimeTableTableViewEntry 
		fields={ef}
		columns={completeColumns}
		key={i}
		className={classes.row}
	/>
	))

	return (
		<TableContainer component={Paper} className={classes.tableContainer}>
			<Table stickyHeader>
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

export default TimeTableTableView;