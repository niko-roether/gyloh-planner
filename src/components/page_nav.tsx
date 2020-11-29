import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer } from "@material-ui/core";
import { CalendarToday as CalendarTodayIcon, Close as CloseIcon, Code as CodeIcon, Feedback as FeedbackIcon, Info as InfoIcon, Menu as MenuIcon } from "@material-ui/icons";
import React from "react";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
	menuButton: {
		marginRight: theme.spacing(1)
	},
	toolbar: {
		...theme.mixins.toolbar,
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(0.5)
	},
	drawerContent: {
		width: "100vw",
		maxWidth: 270
	}
}));

const NAV_STATE_SESSION_KEY = "page-nav-state";

const PageNav: React.FC = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState<boolean>(Boolean(sessionStorage.getItem(NAV_STATE_SESSION_KEY)));
	const onOpen = () => {
		setOpen(true);
		sessionStorage.setItem(NAV_STATE_SESSION_KEY, "open");
	}
	const onClose = () => {
		setOpen(false);
		sessionStorage.setItem(NAV_STATE_SESSION_KEY, "");
	}

	return (
		<React.Fragment>
			<IconButton edge="start" color="inherit" className={classes.menuButton} onClick={() => setOpen(true)}>
				<MenuIcon />
			</IconButton>
			<SwipeableDrawer
				anchor="left"
				open={open}
				onOpen={onOpen}
				onClose={onClose}
			>
				<aside className={classes.drawerContent}>
					<div className={classes.toolbar}>
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						<Link href="/">
							<ListItem button>
								<ListItemIcon><CalendarTodayIcon /></ListItemIcon>
								<ListItemText>Vertretungsplan</ListItemText>
							</ListItem>
						</Link>
						<Link href="/about">
							<ListItem button>
								<ListItemIcon><InfoIcon /></ListItemIcon>
								<ListItemText>Was Ist Das Hier?</ListItemText>
							</ListItem>
						</Link>
						<Link href="/feedback">
							<ListItem button>
								<ListItemIcon><FeedbackIcon /></ListItemIcon>
								<ListItemText>Feedback</ListItemText>
							</ListItem>
						</Link>
						<Link href="/api-reference">
							<ListItem button>
								<ListItemIcon><CodeIcon /></ListItemIcon>
								<ListItemText>API-Referenz</ListItemText>
							</ListItem>
						</Link>
					</List>
				</aside>
			</SwipeableDrawer>
		</React.Fragment>
	);
}

export default PageNav;