import { Theme, Typography, TypographyProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
	heading: {
		margin: theme.spacing(6, 0, 3)
	},
}));

const Heading: React.FC<TypographyProps> = ({className, ...others}) => {
	const classes = useStyles();
	return <Typography {...others} className={classes.heading + " " + className} />
}

export default Heading;