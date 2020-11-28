import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
	defaultPlaceholder: {
		textAlign: "center",
		margin: theme.spacing(8, "auto")
	}
}));

export interface PromiseBuilderProps<T> {
	promise: Promise<T>
	placeholder?: React.ReactElement,
	children?: (value: T) => React.ReactElement | null
}

const DefaultPromiseBuilderPlaceholder: React.FC = () => {
	const classes = useStyles();
	return (
		<div className={classes.defaultPlaceholder}>
			<CircularProgress />
		</div>
	);
}

function PromiseBuilder<T>({ promise, placeholder, children}: PromiseBuilderProps<T>): React.ReactElement {
	const [data, setData] = React.useState<T | null>(null);
	promise.then(d => setData(d));
	if(data == null) return placeholder || <DefaultPromiseBuilderPlaceholder />
	return children?.call(null, data) || <div />;
}

export default PromiseBuilder;

export {
	DefaultPromiseBuilderPlaceholder
}