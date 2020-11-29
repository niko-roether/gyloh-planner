import { Box, Button, ButtonGroup, IconButton, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import React from "react";

export interface ResponsiveListViewProps<P> {
	component?: React.ElementType<P>;
	titles?: string[];
	componentProps?: P;
	breakpoint?: Breakpoint
}

const ResponsiveListView: React.FC<ResponsiveListViewProps<any>> = ({component = "div", breakpoint = "sm", children, componentProps, titles}) => {
	const theme = useTheme();
	const mobileView = useMediaQuery(theme.breakpoints.down(breakpoint));
	const [mobileIndex, setMobileIndex] = React.useState<number>(0);

	const Component = component;

	if(!mobileView) return <Component {...componentProps}>{children}</Component>;

	const elements = React.Children.toArray(children);

	
	const onTabChange = (event: React.ChangeEvent<{}>, newTab: number) => setMobileIndex(newTab);

	return (
		<Component {...componentProps}>
			<Paper square>
				<Tabs
					value={mobileIndex}
					onChange={onTabChange}
					variant="fullWidth"
				>
					{elements.map((e, i) => (
						<Tab key={i} label={titles ? titles[i] || i : i} />
					))}
				</Tabs>
			</Paper>
			<div>
				{elements[mobileIndex]}
			</div>
		</Component>
	)
}

export default ResponsiveListView;