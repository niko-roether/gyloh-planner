import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Card, Dialog, Divider, IconButton, List, ListItem, ListItemText, makeStyles, Slide, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { ArrowBack as ArrowBackIcon, Close as CloseIcon, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { Class } from "gyloh-webuntis-api";
import React from "react";
import SubstitutionView from "./substitution_view";
import { COLUMN_TITLES, TimeTableEntryFields, TimeTableEntryFieldsForClass, TimeTableSubViewProps, TimeTableViewEntryProps } from "./time_table_view";

const useStyles = makeStyles(theme => ({
	summary: {
		overflowX: "hidden",
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
		overflowX: "clip"
	}
}))

interface TimeTableMobileViewEntryProps {
	fields: TimeTableEntryFields
}

const TimeTableMobileViewEntry: React.FC<TimeTableMobileViewEntryProps> = ({ fields }) => {
	const classes = useStyles();
	return (
		<Accordion className={classes.accordion} square>
			<AccordionSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
				<Typography className={classes.subject}>{fields.subject.longName}</Typography>
				<Typography className={classes.lesson}>{fields.lesson}</Typography>
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

interface ClassPopupProps {
	data: TimeTableEntryFieldsForClass,
	open: boolean,
	onClose: () => void
}

const ClassPopup: React.FC<ClassPopupProps> = ({ data, open, onClose }) => {
	const classes = useStyles();

	const Transition = React.forwardRef((
		props: TransitionProps & { children?: React.ReactElement },
		ref: React.Ref<unknown>
	) => (
		<Slide direction="up" {...props} ref={ref} />
	));

	return (
		<Dialog fullScreen open={open} TransitionComponent={Transition} onClose={onClose}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" onClick={onClose} color="inherit"><CloseIcon /></IconButton>
					<Typography variant="h6">{data.class.longName}</Typography>
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
	const classes = useStyles();
	const [currentClass, setCurrentClass] = React.useState<Class | null>(null);

	const goToClass = (newClass: Class) => {
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
							primary={cls.longName} 
							secondary={`${length} ${length === 1 ? "Eintrag" : "Einträge"}`} 
						/>
					</ListItem>
				))}
			</List>
			{currentClass && <ClassPopup 
				data={data.find(d => d.class.shortName === currentClass.shortName) as TimeTableEntryFieldsForClass} 
				onClose={back} 
				open
				key={currentClass.shortName}
			/>}
		</React.Fragment>
	);
}

export default TimeTableMobileView;