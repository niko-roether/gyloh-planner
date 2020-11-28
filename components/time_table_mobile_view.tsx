import { Button, ButtonBase, CardActionArea, Collapse, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Table, TableCell, TableRow } from "@material-ui/core";
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import React, { useState } from "react";
import SubstitutionView from "./substitution_view";
import { COLUMN_TITLES, infoMessageCombine, TimeTableColumn, TimeTableSubViewProps, TimeTableViewEntryProps } from "./time_table_view";

const useStyles = makeStyles(theme => ({
	tableHead: {
		fontWeight: "bold",
	},
	tableRow: {
		"&:nth-child(4n+1), &:nth-child(4n+2)": {
			background: theme.palette.grey[100]
		}
	},
	tableCell: {
		minWidth: 80
	},
	tableButtonCell: {
		textAlign: "center"
	},
	tableContentCell: {
		paddingTop: 0,
		paddingBottom: 0,
		border: "none"
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
		<React.Fragment>
			<TableRow className={classes.tableRow}>
				{prominentColumns.map((column, i) => {
					let data;
					let className = classes.tableCell;
					switch(column) {
						case TimeTableColumn.CLASS:
							data = fields.class.shortName;
							className = classes.tableHead;
							break;
						case TimeTableColumn.SUBJECT:
							data = fields.subject.shortName;
							break;
						case TimeTableColumn.LESSON:
							data = fields.lesson;
							break;
						case TimeTableColumn.INFO_MESSAGE_COMBINE:
							data = infoMessageCombine(fields.info, fields.message);
					}
					return <TableCell key={i} className={className}>{data}</TableCell>
				})}
				<TableCell align="center">
					<IconButton size="small" onClick={toggleOpen}>
						{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell className={classes.tableContentCell} colSpan={prominentColumns.length + 1}>
					<Collapse appear={false} in={open}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sed molestias quibusdam quis ex soluta quos. Iste suscipit voluptas sequi itaque vel cupiditate eligendi maxime perferendis, laborum consequuntur incidunt nam.
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
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
		<Table size="small">
			{entries}
		</Table>
	)
}

export default TimeTableMobileView;