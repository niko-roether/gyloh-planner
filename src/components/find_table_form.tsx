import { Box, Button, Input, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import Heading from "./heading";

const useStyles = makeStyles(theme => ({
	dateInput: {
		fontSize: "1em",
		marginLeft: theme.spacing(4),
		minWidth: "150px"
	},
	submitInput: {
		marginLeft: theme.spacing(2),
		verticalAlign: "baseline"
	},
	dateInputMobile: {
		fontSize: "0.85em",
		minWidth: "150px"
	}
}));

interface FindTableFormProps {
	id?: string;
	onSubmit?: (date: Date) => void;
}

const FindTableForm = ({id = "find-table-form", onSubmit}: FindTableFormProps) => {
	const classes = useStyles();
	const [canSubmit, setCanSubmit] = React.useState(false);
	const theme = useTheme();
	const mobileView = useMediaQuery(theme.breakpoints.down("sm"));

	const onDateChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newCanSubmit = e.target.value != "";
		if(canSubmit != newCanSubmit) setCanSubmit(newCanSubmit);
	}

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const date = new Date((e.target as any)[0].value);
		if(!date) return;
		onSubmit?.(date);
	}

	return (
		<Box mt={5} marginX="auto" width="95%" maxWidth="720px">
			<form id={id} onSubmit={e => submit(e)}>
				<Heading variant="h4">
					<Box display="flex" justifyContent="space-between" flexDirection={mobileView ? "column" : "row"} textAlign="center" alignItems="center">
						<label htmlFor="date-input">Finde Tabelle für den:</label>
						<span>
							<Input
								id="date-input"
								name="date"
								className={mobileView ? classes.dateInputMobile : classes.dateInput}
								type="date"
								color="secondary"
								onChange={onDateChange}
							/>
							<Button
								type="submit"
								size={mobileView ? "medium" : "large"}
								variant="contained"
								color="secondary"
								className={classes.submitInput}
								disabled={!canSubmit}
							>Finden</Button>
						</span>
					</Box>
				</Heading>
			</form>
		</Box>
	)
}

export default FindTableForm;