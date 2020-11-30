import { Button, Hidden, makeStyles, MobileStepper, Paper, Step, StepButton, Stepper, useTheme } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { CalendarToday, KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(theme => ({
	stepper: {
		flex: 4
	},
	controls: {
		display: "flex",
		margin: "auto"
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
	mobileStepper: {
		borderTop: `1px ${theme.palette.divider} solid`,
	}
}));

export interface ResponsiveListViewProps<P> {
	component?: React.ElementType<P>;
	titles?: string[];
	componentProps?: P;
	breakpoint?: Breakpoint
}

const ResponsiveListView: React.FC<ResponsiveListViewProps<any>> = ({component = "div", breakpoint = "sm", children, componentProps, titles}) => {
	const theme = useTheme();
	const [index, setIndex] = React.useState<number>(0);
	const classes = useStyles();

	const Component = component;

	const elements = React.Children.toArray(children);
	
	const toNext = () => setIndex(prev => ++prev);
	const toPrev = () => setIndex(prev => --prev);

	return (
		<Component {...componentProps}>
			<Paper square>
				<Hidden mdUp>
					<MobileStepper 
						variant="text"
						position="static"
						activeStep={index}
						steps={elements.length}
						className={classes.mobileStepper}
						nextButton={
							<Button size="small" onClick={toNext} disabled={index === elements.length - 1}>
							Weiter
							{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
							</Button>
						}
						backButton={
							<Button size="small" onClick={toPrev} disabled={index === 0}>
							{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
							Zurück
							</Button>
						}
					/>
				</Hidden>
				<Hidden smDown>
					<nav className={classes.controls}  style={{maxWidth: 300 * elements.length}}>
						<div className={classes.buttonContainer}>
							<Button variant="contained" color="primary" onClick={toPrev} disabled={index === 0}>
								{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
								Zurück
							</Button>
						</div>
						<Stepper className={classes.stepper} activeStep={index} alternativeLabel nonLinear>
							{elements.map((_, i) => (
								<Step key={i}>
									<StepButton onClick={() => setIndex(i)} icon={<CalendarToday color={index === i ? "inherit" : "action"} />}>
										{titles ? titles[i] : i}
									</StepButton>
								</Step>
							))}
						</Stepper>
						<div className={classes.buttonContainer}>
							<Button variant="contained" color="primary" onClick={toNext} disabled={index === elements.length - 1}>
								Weiter
								{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
							</Button>
						</div>
					</nav>
				</Hidden>
			</Paper>
			{elements.map((e, i) => (
				<div key={i} style={{display: i === index ? "block" : "none"}}>
					{e}
				</div>
			))}
		</Component>
	)
}

export default ResponsiveListView;