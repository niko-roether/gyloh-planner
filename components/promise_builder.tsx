import { Box, CircularProgress, Container, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
	defaultPlaceholder: {
		textAlign: "center",
		width: "100%",
		margin: theme.spacing(8, "auto")
	}
}));

export interface PromiseBuilderProps<T> {
	promise: Promise<T>
	placeholder?: React.ReactElement,
	children?: (value: T) => JSX.Element[] | JSX.Element | null
}

const DefaultPromiseBuilderPlaceholder: React.FC = () => {
	const classes = useStyles();
	return (
		<Box textAlign="center">
			<CircularProgress />
		</Box>
	);
}

function PromiseBuilder<T>({ promise, placeholder, children}: PromiseBuilderProps<T>): React.ReactElement {
	const [data, setData] = React.useState<T | null>(null);
	promise.then(d => setData(d));
	if(data == null) return placeholder || <DefaultPromiseBuilderPlaceholder />
	return (
		<React.Fragment>
			{children?.call(null, data) || <div />}
		</React.Fragment>
	);
}

export default PromiseBuilder;

export {
	DefaultPromiseBuilderPlaceholder
}