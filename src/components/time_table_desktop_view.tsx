import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import SubstitutionView from "./substitution_view";
import { COLUMN_TITLES, TimeTableSubViewProps, TimeTableViewEntryProps } from "./time_table_view";

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


const TimeTableDesktopViewEntry: React.FC<TimeTableViewEntryProps> = ({ fields }) => {
	const classes = useStyles();
	return (
		<TableRow className={classes.row}>
			<TableCell>{fields.class.longName}</TableCell>
			<TableCell>{fields.lesson}</TableCell>
			<TableCell>{fields.subject.longName}</TableCell>
			<TableCell><SubstitutionView value={fields.teacher} current={c => c} subst={s => s} /></TableCell>
			<TableCell>
				{fields.rooms.map((room, i) => (
					<SubstitutionView key={i} value={room} current={c => c?.longName} subst={s => s?.longName} />
				))}
			</TableCell>
			<TableCell>{fields.info}</TableCell>
		</TableRow>
	)
}

export interface TimeTableTableViewProps {
	table: TimeTable;
}

const TimeTableDesktopView: React.FC<TimeTableSubViewProps> = ({ data }) => {
	const classes = useStyles();

	const entries = data.map((ef, i) => (
		<TimeTableDesktopViewEntry 
		fields={ef}
		key={i}
	/>
	))

	return (
		<TableContainer component={Paper} className={classes.tableContainer}>
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className={classes.tableHeaderCell}>{COLUMN_TITLES.class}</TableCell>
						<TableCell className={classes.tableHeaderCell}>{COLUMN_TITLES.lesson}</TableCell>
						<TableCell className={classes.tableHeaderCell}>{COLUMN_TITLES.subject}</TableCell>
						<TableCell className={classes.tableHeaderCell}>{COLUMN_TITLES.teacher}</TableCell>
						<TableCell className={classes.tableHeaderCell}>{COLUMN_TITLES.room}</TableCell>
						<TableCell className={classes.tableHeaderCell}>{COLUMN_TITLES.info}</TableCell>
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