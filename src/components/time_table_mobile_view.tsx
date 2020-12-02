import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Card, Dialog, IconButton, List, ListItem, ListItemText, makeStyles, Slide, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography, useTheme } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Close as CloseIcon, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import React from "react";
import { COLUMN_TITLES, TimeTableEntryFields, TimeTableEntryFieldsForClass, TimeTableSubViewProps } from "./time_table_view";

const useStyles = makeStyles(theme => ({
	summary: {
		overflow: "hidden",
		width: "100%"
	},
	subject: {
		flexBasis: "70%",
		flexShrink: 0,
	},
	lesson: {
		color: theme.palette.text.secondary
	},
	dialogContent: {
		paddingTop: theme.spacing(3)
	},
	dialogHeading: {
		paddingLeft: theme.spacing(1)
	},
	accordion: {
		overflowX: "clip",
	},
}))

interface TimeTableMobileViewEntryProps {
	fields: TimeTableEntryFields
}

const TimeTableMobileViewEntry: React.FC<TimeTableMobileViewEntryProps> = ({ fields }) => {
	const classes = useStyles();
	return (
		<Accordion className={classes.accordion} square>
			<AccordionSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.subject}>{fields.subject}</Typography>
				<Typography className={classes.lesson}>{fields.lesson}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<TableContainer component={Card} variant="outlined">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell><b>{COLUMN_TITLES.teacher}</b></TableCell>
								<TableCell>{fields.teacher}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><b>{COLUMN_TITLES.room}</b></TableCell>
								<TableCell>{fields.room}</TableCell>
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

interface ClassPopupProps {
	data: TimeTableEntryFieldsForClass,
	open: boolean,
	onClose: () => void
}

const ClassPopup: React.FC<ClassPopupProps> = ({ data, open, onClose }) => {
	const classes = useStyles();
	const theme = useTheme();

	const Transition = React.forwardRef((
		props: TransitionProps & { children?: React.ReactElement },
		ref: React.Ref<unknown>
	) => (
		<Slide direction="up" {...props} ref={ref} />
	));

	return (
		<Dialog fullScreen open={open} TransitionComponent={Transition} onClose={onClose} PaperProps={{style: {backgroundColor: theme.palette.background.default}}}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" onClick={onClose} color="inherit"><CloseIcon /></IconButton>
					<Typography variant="h6">{data.class}</Typography>
				</Toolbar>
			</AppBar>
			<main className={classes.dialogContent}>
				<Typography variant="h5" gutterBottom className={classes.dialogHeading}>Einträge</Typography>
				<List>
					{data.fields.map((fields, i) => <TimeTableMobileViewEntry fields={fields} key={i} />)}
				</List>
			</main>
		</Dialog>
	);
}

const TimeTableMobileView: React.FC<TimeTableSubViewProps> = ({ data }) => {
	const [currentClass, setCurrentClass] = React.useState<string | null>(null);

	const goToClass = (newClass: string) => {
		window.scrollTo({top: 0, behavior: "smooth"});
		setCurrentClass(newClass);
	}

	const back = () => setCurrentClass(null)
	
	return (
		<React.Fragment>
			<List>
				{data.map(({ class: cls, fields: { length } }, i) => (
					<ListItem key={i} button onClick={() => goToClass(cls)} divider>
						<ListItemText 
							primary={cls} 
							secondary={`${length} ${length === 1 ? "Eintrag" : "Einträge"}`} 
						/>
					</ListItem>
				))}
			</List>
			<Box textAlign="center" marginY={2}>
					<Button variant="contained" onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
						Zurück nach oben	
					</Button>
			</Box>
			{currentClass && <ClassPopup 
				data={data.find(d => d.class === currentClass) as TimeTableEntryFieldsForClass} 
				onClose={back} 
				open
				key={currentClass}
			/>}
		</React.Fragment>
	);
}

export default TimeTableMobileView;