import { Fab, Theme, useScrollTrigger } from "@mui/material";
import "@emotion/react";
import { makeStyles } from "@mui/styles"
import { ArrowUpward as ArrowUpwardIcon } from "@mui/icons-material";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
	button: {
		position: "fixed",
		right: theme.spacing(2),
		bottom: theme.spacing(2),
		transition: theme.transitions.create("opacity")
	}
}));

export interface BackToTopProps {
	verticalOffset?: number;
}

const BackToTop = ({ verticalOffset }: BackToTopProps) => {
	const classes = useStyles();
	const shown = useScrollTrigger({ threshold: 300, disableHysteresis: true });
	return (
		<Fab color="secondary" disabled={!shown} className={classes.button} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} sx={{ marginBottom: verticalOffset ?? 0, opacity: shown ? 1 : 0 }}>
			<ArrowUpwardIcon />
		</Fab>
	)
}

export default BackToTop;