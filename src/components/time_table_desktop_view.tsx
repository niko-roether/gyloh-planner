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
	firstCell: {
		fontWeight: "bold",
		background: theme.palette.grey[600],
		color: "#fff"
	}
}));


const TimeTableDesktopViewEntry: React.FC<TimeTableViewEntryProps> = ({ fieldsForClass }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			{fieldsForClass.fields.map((fields, i) => (
				<TableRow key={i} className={classes.row}>
					{i === 0 && 
						<TableCell rowSpan={fieldsForClass.fields.length} className={classes.firstCell}>
							{fieldsForClass.class}
						</TableCell>
					}
					<TableCell>{fields.lesson}</TableCell>
				 	<TableCell>{fields.subject}</TableCell>
				 	<TableCell>{fields.teacher}</TableCell>
				 	<TableCell>{fields.room}</TableCell>
					<TableCell>{fields.info}</TableCell>
				</TableRow>
			))}
		</React.Fragment>
	)
}

export interface TimeTableTableViewProps {
	table: TimeTable;
}

const TimeTableDesktopView: React.FC<TimeTableSubViewProps> = ({ data }) => {
	const classes = useStyles();

	const entries = data.map((ef, i) => (
		<TimeTableDesktopViewEntry 
		fieldsForClass={ef}
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