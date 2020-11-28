import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
	defaultPlaceholder: {
		margin: theme.spacing(2, "auto")
	}
}));

interface PromiseBuilderProps<T> {
	promise: Promise<T>
	placeholder?: React.ReactElement,
	children?: (value: T) => React.ReactElement
}

const DefaultPromiseBuilderPlaceholder: React.FC = () => {
	const classes = useStyles();
	return <CircularProgress className={classes.defaultPlaceholder} />;
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