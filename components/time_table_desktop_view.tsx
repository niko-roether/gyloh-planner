import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, useTheme } from "@material-ui/core";
import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import SubstitutionView from "./substitution_view";
import { COLUMN_TITLES, infoMessageCombine, TimeTableColumn, TimeTableSubViewProps, TimeTableViewEntryProps } from "./time_table_view";

const useStyles = makeStyles(theme => ({
	tableContainer: {
		maxHeight: "min(80vh, 700px)",
		marginTop: theme.spacing(3)
	},
	tableHeaderCell: {
		fontWeight: "bold",
		background: theme.palette.grey[900],
		color: "#fff"
	},
	row: {
		"&:nth-child(odd)": {
			background: theme.palette.grey[100],
		}	
	},
	cell: {
		"&:first-child": {
			fontWeight: "bold",
		}
	}
}));


const TimeTableDesktopViewEntry: React.FC<TimeTableViewEntryProps> = ({ fields, columns, className }) => {
	const classes = useStyles();
	const theme = useTheme();
	const shortNames = useMediaQuery(theme.breakpoints.down("md"));
	const shorterNames = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<TableRow className={className}>
			{columns.map((column, i) => (
				<TableCell key={i} className={classes.cell}>
					{(() => {
						switch(column) {
							case TimeTableColumn.CLASS: return shorterNames ? fields.class.shortName : fields.class.longName;
							case TimeTableColumn.LESSON: return fields.lesson;
							case TimeTableColumn.TIME: return fields.time;
							case TimeTableColumn.SUBJECT: return shorterNames ? fields.subject.shortName : fields.subject.longName;
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
							case TimeTableColumn.INFO_MESSAGE_COMBINE: return infoMessageCombine(fields.info, fields.message);
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

const TimeTableDesktopView: React.FC<TimeTableSubViewProps> = ({ data, columns }) => {
	const classes = useStyles();

	const entries = data.map((ef, i) => (
		<TimeTableDesktopViewEntry 
		fields={ef}
		columns={columns}
		key={i}
		className={classes.row}
	/>
	))

	return (
		<TableContainer component={Paper} className={classes.tableContainer}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						{columns.map((column, i) => (
							<TableCell key={i} className={classes.tableHeaderCell}>
								{COLUMN_TITLES.get(column)}
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

export default TimeTableDesktopView;