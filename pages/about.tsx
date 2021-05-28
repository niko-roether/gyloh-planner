import { Container, Link, Typography } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import Heading from "../src/components/heading";
import Page from "../src/components/page";

const About: React.FC = () => {
	return (
		<Page title="About">
			<Head>
				<title>Gyloh Planner | About</title>
			</Head>
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
					sind komplett Open-Source und auf meinem <Link href="https://github.com/nicholas-roether/" color="secondary">GitHub</Link> zu finden.
				</Typography>
				<Typography paragraph>
					Zusätzlich stellt die Website eine rudimentäre <Link href="/api-reference" color="secondary">API</Link> zur 
					Verfügung, mit der ihr hoffentlich euren Spaß haben werdet ;)
				</Typography>
				<Typography paragraph>
					Falls du Fragen, Probleme oder Verbesserungsvorschläge hast, wende dich bitte an <Link href="mailto:nicholas.roether@t-online.de" color="secondary">
					nicholas.roether@t-online.de</Link> oder <Link href="https://github.com/nicholas-roether/gyloh-planner/issues/new" color="secondary">
					poste ein Issue auf meinem GitHub.</Link>
				</Typography>
			</Container>
		</Page>
	)
}

export default About;