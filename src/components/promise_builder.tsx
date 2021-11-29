import { Box, CircularProgress } from "@mui/material";
import React from "react";

export interface PromiseBuilderProps<T> {
	promise: Promise<T>
	placeholder?: React.ReactElement,
	children?: (value: T) => JSX.Element | null
}

const DefaultPromiseBuilderPlaceholder: React.FC = () => {
	return (
		<Box textAlign="center" width="100%">
			<CircularProgress color="secondary" />
		</Box>
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