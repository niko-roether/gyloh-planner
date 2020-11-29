import { Card, Collapse, List, makeStyles, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import React, { useState } from "react";
import SubstitutionView from "./substitution_view";
import { COLUMN_TITLES, infoMessageCombine, TimeTableColumn, TimeTableSubViewProps, TimeTableViewEntryProps } from "./time_table_view";

const useStyles = makeStyles(theme => ({
	card: {
		padding: theme.spacing(2, 3),
		margin: theme.spacing(2, 1),
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


const TimeTableMobileViewEntry: React.FC<TimeTableViewEntryProps> = ({ fields, columns, className}) => {
	const [open, setOpen] = useState<boolean>(false);
	const toggleOpen = () => setOpen(prev => !prev);
	const classes = useStyles();

	const prominentColumns = columns.filter(c => [
		TimeTableColumn.CLASS,
		TimeTableColumn.SUBJECT,
		TimeTableColumn.LESSON,
	].includes(c));

	return (
		<Card className={classes.card + " " + className} variant="outlined" onClick={toggleOpen}>
			<div className={classes.topBar}>
				<div className={classes.textWrapper}>
					{prominentColumns.includes(TimeTableColumn.CLASS) && 
						<Typography variant="subtitle1">{fields.class.longName}</Typography>
					}
					<span className={classes.subTextWrapper}>
						{prominentColumns.includes(TimeTableColumn.SUBJECT) &&
							<Typography variant="subtitle2">{fields.subject.longName}</Typography>
						}
						{prominentColumns.includes(TimeTableColumn.LESSON) &&
							<Typography variant="subtitle2">{fields.lesson}</Typography>
						}
					</span>
				</div>
				<div className={classes.buttonWrapper}>
					{open ? <ExpandLessIcon color="action" /> : <ExpandMoreIcon color="action" />}
				</div>
			</div>
			<Collapse appear={false} in={open}>
				<Table>
					<TableBody>
						<TableRow>
							{columns.filter(c => !prominentColumns.includes(c)).map((column, i) => {
								const name = COLUMN_TITLES.get(column);
								let data;
								switch(column) {
									case TimeTableColumn.TEACHER:
										data = <SubstitutionView value={fields.teacher} current={c => c} subst={s => s} />
										break;
									case TimeTableColumn.ROOM:
										data = fields.rooms.map((room, i) => (
											<SubstitutionView key={i} value={room} current={r => r?.longName} subst={r => r?.longName} />
										));
										break;
									case TimeTableColumn.INFO:
										data = fields.info;
										break;
									case TimeTableColumn.MESSAGE:
										data = fields.message;
										break;
									case TimeTableColumn.INFO_MESSAGE_COMBINE:
										data = infoMessageCombine(fields.info, fields.message);
								}
								return (
									<React.Fragment>
										<TableCell><b>{name}</b></TableCell>
										<TableCell>{data}</TableCell>
									</React.Fragment>
								)
							})}
						</TableRow>
					</TableBody>
				</Table>
			</Collapse>
		</Card>
	);
}

const TimeTableMobileView: React.FC<TimeTableSubViewProps> = ({ data, columns}) => {
	const entries = data.map((ef, i) => (
		<TimeTableMobileViewEntry
			key={i}
			fields={ef}
			columns={columns}
		/>
	));

	return (
		<React.Fragment>
			{entries}
		</React.Fragment>
	)
}

export default TimeTableMobileView;