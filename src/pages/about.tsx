import { Container, Link, Typography } from "@material-ui/core";
import React from "react";
import Heading from "../components/heading";
import Page from "../components/page";

const About: React.FC = () => {
	return (
		<Page title="About">
			<Container>
				<Heading variant="h3">Was Ist Das Hier?</Heading>
				<Typography paragraph>
					Diese Seite ist aus Frustration mit dem neuen Gyloh-Vertretungsplan entstanden, der
					diesmal nicht nur wieder unheimlich hässlich ist, sondern dazu noch nicht auf 
					Mobilgeräten nutzbar. Ich habe probiert, eine Website zu erstellen, bei der man
					nicht stunden lang warten muss, bis sich der Vertretungsplan entscheidet, die
					Informationen anzuzeigen, die man braucht, sondern die einem ein angenehmes
					Nutzererlebnis erlaubt.
				</Typography>
				<Typography paragraph>
					Der Sourcecode der Website und der Code, der mit der furchtbaren WebUntis API interagiert,
					sind komplett Open-Source und auf meinem <a href="https://github.com/nicholas-roether/">GitHub</a> zu finden.
				</Typography>
				<Typography paragraph>
					Zusätzlich stellt die Website eine rudimentäre <Link href="/api-reference">API</Link> 
					zur Verfügung, mit der ihr hoffentlich euren Spaß haben werdet ;)
				</Typography>
				<Typography paragraph>
					Falls du Fragen, Probleme oder Verbesserungsvorschläge hast, wende dich bitte an <a href="mailto:nicholas.roether@t-online.de">
					nicholas.roether@t-online.de </a> oder <a href="https://github.com/nicholas-roether/gyloh-planner/issues/new">
					poste ein Issue auf meinem Github.</a>
				</Typography>
			</Container>
		</Page>
	)
}

export default About;