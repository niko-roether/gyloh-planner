import { Accordion, AccordionDetails, AccordionSummary, Card, makeStyles, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import React from "react";
import SubstitutionView from "./substitution_view";
import { COLUMN_TITLES, TimeTableSubViewProps, TimeTableViewEntryProps } from "./time_table_view";

const useStyles = makeStyles(theme => ({
	list: {
		margin: theme.spacing(3, 0)
	},
	topBar: {
		display: "flex",
		justifyContent: "space-between",
	},
	textWrapper: {
		height: "100%",
		flex: 4,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	},
	subTextWrapper: {
		width: "100%",
		maxWidth: 200,
		display: "inline-flex",
		justifyContent: "space-between"
	},
	buttonWrapper: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center"
	}
}))


const TimeTableMobileViewEntry: React.FC<TimeTableViewEntryProps> = ({ fields }) => {
	const classes = useStyles();

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<div className={classes.textWrapper}>
					<Typography variant="subtitle1">{fields.class.longName}</Typography>
					<span className={classes.subTextWrapper}>
						<Typography variant="subtitle2">{fields.subject.longName}</Typography>
						<Typography variant="subtitle2">{fields.lesson}</Typography>
					</span>
				</div>
			</AccordionSummary>
			<AccordionDetails>
				<TableContainer component={Card} variant="outlined">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell><b>{COLUMN_TITLES.teacher}</b></TableCell>
								<TableCell><SubstitutionView value={fields.teacher} current={c => c} subst={s => s} /></TableCell>
							</TableRow>
							<TableRow>
								<TableCell><b>{COLUMN_TITLES.room}</b></TableCell>
								<TableCell>
									{fields.rooms.map((room, i) => (
										<SubstitutionView key={i} value={room} current={r => r?.longName} subst={r => r?.longName} />
									))}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><b>{COLUMN_TITLES.info}</b></TableCell>
								<TableCell>{fields.info}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</AccordionDetails>
		</Accordion>
	);
}

const TimeTableMobileView: React.FC<TimeTableSubViewProps> = ({ data }) => {
	const classes = useStyles();
	
	const entries = data.map((ef, i) => (
		<TimeTableMobileViewEntry
			key={i}
			fields={ef}
		/>
	));

	return (
		<div className={classes.list}>
			{entries}
		</div>
	)
}

export default TimeTableMobileView;