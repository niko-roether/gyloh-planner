import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, Table, TableCell, TableRow } from "@material-ui/core";
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import React, { useState } from "react";
import SubstitutionView from "./substitution_view";
import { COLUMN_TITLES, infoMessageCombine, TimeTableColumn, TimeTableSubViewProps, TimeTableViewEntryProps } from "./time_table_view";

const useStyles = makeStyles({
	tableHead: {
		fontWeight: "bold",
		border: "none"
	},
	tableCell: {
		border: "none"
	}
})


const TimeTableColumnViewEntry: React.FC<TimeTableViewEntryProps> = ({ fields, columns, className}) => {
	const [open, setOpen] = useState<boolean>(false);
	const toggleOpen = () => setOpen(prev => !prev);
	const classes = useStyles();

	return (
		<div className={className}>
			<ListItem button onClick={toggleOpen}>
				<ListItemText 
					primary={columns.includes(TimeTableColumn.CLASS) ? fields.class.longName : ""} 
					secondary={
						<span>
							{columns.includes(TimeTableColumn.SUBJECT) ? fields.subject.longName : ""}
							&nbsp;
							{columns.includes(TimeTableColumn.LESSON) ? `(${fields.lesson})` : ""}
						</span>
					}
				/>
				<ListItemIcon>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</ListItemIcon>
			</ListItem>
			<Collapse in={open}>
				<Table size="small">
					{columns
						.filter(column => ![TimeTableColumn.CLASS, TimeTableColumn.SUBJECT, TimeTableColumn.LESSON].includes(column))
						.map(column => {
							let value;
							switch(column) {
								case TimeTableColumn.INFO:
									value = fields.info;
									break;
								case TimeTableColumn.INFO_MESSAGE_COMBINE:
									value = infoMessageCombine(fields.info, fields.message);
									break;
								case TimeTableColumn.MESSAGE:
									value = fields.message;
									break;
								case TimeTableColumn.ROOM:
									value = fields.rooms.map((room, i) => (
										<SubstitutionView 
											key={i} 
											value={room}
											current={c => c?.longName}
											subst={s => s?.longName}
										/>
									));
									break;
								case TimeTableColumn.TEACHER:
									value = (
										<SubstitutionView
											value={fields.teacher}
											current={c => c}
											subst={s => s}
										/>
									)
									break;
								case TimeTableColumn.TIME:
									value = fields.time;
									break;
							}
							return (
								<TableRow>
									<TableCell component={"th"} className={classes.tableHead}>{COLUMN_TITLES.get(column)}</TableCell>
									<TableCell className={classes.tableCell}>{value}</TableCell>
								</TableRow>
							)
						})
					}
				</Table>
			</Collapse>
			<Divider />
		</div>
	);
}

const TimeTableColumnView: React.FC<TimeTableSubViewProps> = ({ data, columns}) => {
	const entries = data.map((ef, i) => (
		<TimeTableColumnViewEntry 
			fields={ef}
			columns={columns}
		/>
	));

	return (
		<List>
			{entries}
		</List>
	)
}

export default TimeTableColumnView;