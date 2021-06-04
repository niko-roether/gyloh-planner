import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { TimeTable } from "gyloh-webuntis-api";
import React from "react";
import { TimeTableViewEntryProps } from "../util/time_table_utils";
import { COLUMN_TITLES, TimeTableSubViewProps } from "./time_table_view";

const useStyles = makeStyles(theme => ({
	tableContainer: {
		maxHeight: "min(80vh, 700px)",
		marginTop: theme.spacing(3)
	},
	tableHeaderCell: {
		fontWeight: "bold",
		background: theme.palette.common.black,
		color: theme.palette.common.white
	},
	firstCell: {
		fontWeight: "bold",
		background: theme.palette.grey[theme.palette.type == "light" ? 200 : 900]
	},
	row: {
		"&:nth-child(odd)": {
			background: theme.palette.action.hover
		}	
	},
	screenFillingTable: {
		margin: 0,
		padding: 0,
		borderRadius: 0
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

export interface TimeTableTableDesktopViewProps extends TimeTableSubViewProps {
	fillUpScreen?: boolean;
}

const TimeTableDesktopView: React.FC<TimeTableTableDesktopViewProps> = ({ data, fillUpScreen = false }) => {
	const classes = useStyles();

	const entries = data.map((ef, i) => (
		<TimeTableDesktopViewEntry 
		fieldsForClass={ef}
		key={i}
	/>
	))

	return (
		<TableContainer component={Paper} className={fillUpScreen ? classes.screenFillingTable : classes.tableContainer}>
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