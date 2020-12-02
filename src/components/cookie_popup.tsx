import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";
import { COOKIE_INDEFINITE, setCookie, useCookie } from "../util/cookie_utils";

const ACCEPT_COOKIE = "accepted-cookies";

const CookiePopup: React.FC = () => {
	const [open, setOpen] = React.useState<boolean>(false);
	const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
	const accepted = useCookie(ACCEPT_COOKIE);
	if(accepted === "" && open == false) setOpen(true);

	const onClose = () => {
		setCookie(ACCEPT_COOKIE, "true", COOKIE_INDEFINITE, "/");
		setOpen(false);
		setDialogOpen(false);
	}

	return (
		<React.Fragment>
			<Snackbar
				anchorOrigin={{vertical: "bottom", horizontal: "center"}}
				open={open}
				onClose={() => onClose()}
				message="Diese Seite benutzt Cookies."
				action={
					<React.Fragment>
						<Button color="secondary" onClick={() => setDialogOpen(true)}>Mehr Info</Button>
						<IconButton aria-label="close" color="inherit" size="small" onClick={() => onClose()}>
							<CloseIcon />
						</IconButton>
					</React.Fragment>
				}
			/>
			<Dialog
				open={dialogOpen}
				onClose={onClose}
				aria-labelledby="cookie-popup-title"
				aria-describedby="cookie-popup-description"
			>
				<DialogTitle id="cookie-popup-title">Diese Seite benutzt Cookies.</DialogTitle>
				<DialogContent>
					<DialogContentText id="cookie-popup-description">
						Cookies werden benutzt um Teile der Funktionalität der Seite bereitzustellen. Es handelt sich hierbei ausschließlich um
						harmlose Daten; Es wird kein Versuch gemacht, sie persönlich zu identifizieren, und keine ihrer persönlichen Daten
						werden gespeichert oder geteilt.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color="secondary" autoFocus onClick={onClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}

export default CookiePopup;