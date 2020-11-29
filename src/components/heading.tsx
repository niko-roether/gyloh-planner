import { makeStyles, Typography, TypographyProps } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
	heading: {
		margin: theme.spacing(6, 0, 3)
	},
}));

const Heading: React.FC<TypographyProps> = ({className, ...others}) => {
	const classes = useStyles();
	return <Typography {...others} className={classes.heading + " " + className} />
}

export default Heading;