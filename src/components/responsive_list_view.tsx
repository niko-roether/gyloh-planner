import { Box, Button, CircularProgress, Hidden, MobileStepper, Paper, Step, StepButton, Stepper, Theme, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FiberManualRecord as CircleIcon, KeyboardArrowLeft as KeyboardArrowLeftIcon, KeyboardArrowRight as KeyboardArrowRightIcon, SvgIconComponent } from "@mui/icons-material";
import BackToTop from "./back_to_top";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
	step: {
		padding: theme.spacing(0, 5)
	},
	controls: {
		display: "flex",
		justifyContent: "center",
		padding: theme.spacing(0, 2),
	},
	desktopControlsWrapper: {
		position: "sticky",
		top: 0,
		zIndex: theme.zIndex.appBar - 1,
		padding: theme.spacing(2, 0)
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
	iconComponent?: SvgIconComponent;
	titles?: string[];
	componentProps?: P;
	loading?: boolean;
}

const ResponsiveListView: React.FC<ResponsiveListViewProps<any>> = ({component = "div", iconComponent = CircleIcon, children, componentProps, titles, loading = false}) => {
	const theme = useTheme();
	const [index, setIndex] = React.useState<number>(0);
	const classes = useStyles();

	const Component = component;
	const IconComponent = iconComponent;

	const elements = React.Children.toArray(children);
	
	const toNext = () => setIndex(prev => ++prev);
	const toPrev = () => setIndex(prev => --prev);

	return (
		<Component {...componentProps}>
			<Hidden mdUp>
				<Paper square>
					<MobileStepper
						variant="text"
						position="bottom"
						activeStep={index}
						steps={elements.length}
						className={classes.mobileStepper}
						nextButton={
							<Button size="medium" color="inherit" onClick={toNext} disabled={index === elements.length - 1}>
							Weiter
							{theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
							</Button>
						}
						backButton={
							<Button size="medium" color="inherit" onClick={toPrev} disabled={index === 0}>
							{theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
							Zurück
							</Button>
						}
					/>
				</Paper>
			</Hidden>
			<Hidden mdDown>
				<Paper square elevation={2} className={classes.desktopControlsWrapper}>
					<nav className={classes.controls}>
						<div className={classes.buttonContainer}>
							<Button variant="contained" color="secondary" onClick={toPrev} disabled={index === 0}>
								{theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
								Zurück
							</Button>
						</div>
						<Stepper activeStep={index} alternativeLabel nonLinear>
							{elements.map((_, i) => (
								<Step className={classes.step} key={i}>
									<StepButton onClick={() => setIndex(i)} icon={<IconComponent color={index === i ? "inherit" : "disabled"} />}>
										{titles ? titles[i] : i + 1}
									</StepButton>
								</Step>
							))}
						</Stepper>
						<div className={classes.buttonContainer}>
							<Button variant="contained" color="secondary" onClick={toNext} disabled={index === elements.length - 1}>
								Weiter
								{theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
							</Button>
						</div>
					</nav>
				</Paper>
			</Hidden>
			{loading ? (
				<Box marginX="auto" mt={4} textAlign="center">
					<CircularProgress color="secondary" />
				</Box>
			) : elements.map((e, i) => (
				<div key={i} style={{display: i === index ? "block" : "none"}}>
					{e}
				</div>
			))}
		</Component>
	)
}

export default ResponsiveListView;