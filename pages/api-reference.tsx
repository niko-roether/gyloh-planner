import { Container, Link, makeStyles, Typography } from "@material-ui/core";
import { GylohWebUntis } from "gyloh-webuntis-api";
import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import Heading from "../src/components/heading";
import Page from "../src/components/page";
import { SERVER } from "../src/config";

const useStyles = makeStyles(theme => ({
	example: {
		maxHeight: "80vh",
		overflow: "auto"
	}
}));

interface ApiReferenceProps {
	example: string;
	exampleDate: number;
}

const ApiReference: React.FC<ApiReferenceProps> = ({ example, exampleDate }) => {
	const classes = useStyles();

	return (
		<Page title="API-Referenz">
			<Head>
				<title>Gyloh Planner | Api-Referenz</title>
			</Head>
			<Container>
				<Heading variant="h3" id="api-reference">API-Referenz</Heading>
				<Typography paragraph>
					Dieser Server stellt eine rudimentäre REST API zur Verfügung. Sie erlaubt, die Vertretungsplandaten entweder 
					eine bestimmte Anzahl an <Link href="#current-tables" color="secondary">aktuellen Plänen</Link> (d. h. entweder von Heute, oder von 
					nächsten Schultag an bis zu einer beliebingen Anzahl in die Zukunft), oder den Plan für 
					einen <Link href="#specific-tables" color="secondary">bestimmten Tag</Link>, falls er existiert, abzurufen.
				</Typography>
				<Typography paragraph>
					Für eine Erklärung des Ausgabeformats siehe <Link href="#output-format" color="secondary">Ausgabeformat</Link>, und
					für ein Beispiel siehe <Link href="#example" color="secondary">Beispiel</Link>.
				</Typography>

				<Heading variant="h4" id="current-tables">Aktuelle Vertretungspläne</Heading>
				<Typography paragraph>
					Aktuelle Pläne können unter <code>{SERVER}/api/tables/current?num=[num]</code> gefunden werden, wobei <code>[num]</code>
					die Anzahl an Plänen ist, die abgerufen werden sollen, anfangend mit dem nächsten Schultag.
				</Typography>
				<Typography paragraph>
					Die Ergebnisse werden in Form eines Arrays an Vertretungsplänen ausgegeben (Siehe <Link href="#output-format" color="secondary">Ausgabeformat</Link>).
				</Typography>

				<Heading variant="h4" id="specific-tables">Bestimmte Vertretungspläne</Heading>
				<Typography paragraph>
					Bestimmte Vertretungspläne können unter <code>{SERVER}/api/tables/get?date=[date]</code> gefunden werden, 
					wobei <code>[date]</code> das entsprechende Datum ist. Ich empfehle als Format einen Timestamp in Form der Anzahl an 
					Millisekunden seit dem 1.1.1970 00:00:00 UTC zu verwenden, da diese auch für die Rückgabe verwendet werden, aber es kann auch
					ein <Link href="https://www.iso.org/iso-8601-date-and-time-format.html" color="secondary">ISO 8601-Formatiertes Datum</Link> (YYYY-MM-DD) oder 
					ein <Link href="https://tools.ietf.org/html/rfc2822#section-3.3" color="secondary">IETF-konformer Timestamp nach RFC 2822</Link> verwendet werden.
				</Typography>
				<Typography paragraph>
					Hierbei muss natürlich angemerkt werden, dass die Möglichkeit besteht, dass für einen bestimmten Tag kein Plan existiert.
					In diesem Fall gibt die API null zurück.
				</Typography>
				<Typography paragraph>
					Im Allgemeinen erfolgt die Ausgabe in entweder einem leeren Objekt, oder einem Vertretungsplan 
					(Siehe <Link href="#output-format" color="secondary">Ausgabeformat</Link>).
				</Typography>

				<Heading variant="h4" id="output-format">Ausgabeformat</Heading>
				<Typography paragraph>
					Sämtliche Ausgaben erfolgen im JSON-Format, auch im Fall eines Fehlers.
				</Typography>

				<Heading variant="h5" id="output-format-general">Allgemein</Heading>
				<Typography paragraph>
					Das allgemeine Ausgabeformat, dem alle Antworten dieser API folgen, hat folgendes Format:
				</Typography>
				<SyntaxHighlighter language="json">
					{
						'{\n' +
						'   "data": ...,\n' +
						'   "error": "Error message"\n' + 
						'}'
					}
				</SyntaxHighlighter>
				<Typography paragraph>
					Das Format der <code>"data"</code>-Eigenschaft ist abhängig von der Anfrage, die gemacht wurde, 
					aber <code>"error"</code> ist immer ein String, der eine Fehlerbeschreibung beinhaltet.
				</Typography>
				<Typography paragraph>
					Da Daten nur ausgegeben werden können, wenn kein Fehler aufgetreten ist, und Fehler bedeuten, das
					keine Daten ausgegeben werden können, wird immer nur <b>eine</b> dieser Eigenschaften tatsächlich in
					einer Antwort enthalten sein, und die Präsenz der <code>"error"</code>-Eigenschaft als Indiz genommmen
					werden kann, dass tatsächlich ein Fehler stattfand und keine Daten in der Antwort enthalten sind.
				</Typography>

				<Heading variant="h5" id="output-format-table">Vertretungspläne</Heading>
				<Typography paragraph>
					{/* TODO update this if necessary */}
					Alle Ausgaben dieser API beinhalten Vertretungspläne. Diese haben das folgende Format:
				</Typography>
				<SyntaxHighlighter language="json">
					{
						'{\n' +
						'   // Ein timestamp in Form der Millisekunden seit dem 1.1.1970, 00:00:00 UTC.\n' +
						'   "date": 1606690800000,\n' +
						'   // Text, der indiziert, wann der Vertretungsplan zum letzten mal aktualisiert wurde.\n' +
						'   // Kein garantiertes standartisertes Format.\n' +
						'   "lastUpdate": "27.11.2020 17:42:07", \n' +
						'   "affectedClasses": [\n' +
						'      // Ein Array an Klassen, die von diesem Vertretungsplan betroffen sind.\n' + 
						'      {\n' +
						'         // Der Kurze, relativ unverständliche Name für die Klasse, der auf dem offiziellen Vertretungsplan verwendet wird.\n' +
						'         "shortName": "S1/2_Nat",\n' +
						'         // Der lang ausgeschriebene Name der Klasse.\n' +
						'         "longName": "S1/2 NuT-Profil",\n' +
						'      },\n' +
						'      // ...\n' +
						'   ],\n' +
						'   "messages": [\n' +
						'      // Ein Array an Nachrichten für den Tag. Sie werden im offiziellen Vertretungsplan über der Tabelle angezeigt.\n' +
						'      {\n' +
						'         // Dieses Feld wird von der WebUntis-API ausgegeben, aber das Gyloh scheint es nicht zu benutzen.\n' +
						'         //  Es ist bis jetzt immer ein leerer String gewesen.\n' +
						'         "subject": "",\n' +
						'         // Der tatsächliche Text der Nachricht.\n' + 
						'         // Aufgrund der Art und weise, wie der Gyloh-Vertretungsplan fuktioniert, enthält er HTML-Tags.\n' +
						'         "body": "<b>Das Profil S3/4_Nat (Ot) hat ab der 3. Std. Unterricht!</b>",\n' +
						'      },\n' +
						'      // ...\n' + 
						'   ],\n' +
						'   "entries": [\n' +
						'      // Der Array, der die tatsächlichen Einträge in den Vertretungsplan enthält.\n' +
						'      {\n' +
						'         // Ein String, der indiziert, welche Stunde(n) dieser Eintrag beeinflusst.\n' +
						'         "lesson": "1 - 2",\n' +
						'         // Ein String, der die Uhrzeit indiziert, auf die sich dieser Eintrag bezieht. Kein garantiertes standartisiertes Format.\n' +
						'         "time": "07:55-09:25",\n' +
						'         "classes": [\n' +
						'            // Ein Array an den Klassen, die dieser Eintrag beeinflusst.\n' +
						'            {\n' +
						'               // Der Kurze, relativ unverständliche Name für die Klasse, der auf dem offiziellen Vertretungsplan verwendet wird.\n' +
						'               "shortName": "S1/2_Ku",\n' +
						'               // Der lang ausgeschriebene Name der Klasse, wie beispielsweise "S1/2 Geschichtsprofil".\n' +
						'               "longName": "S1/2 Kunstprofil"\n' +
						'            },\n' +
						'            // ...\n' +
						'         ],\n' +
						'         "rooms": [\n' +
						'            // Ein Array an Räumen, in denen der Unterricht stattfindet.\n' +
						'            // In fast allen Fällen ist das nur einer, es sei den die Klasse wird in mehrere Räume aufgeteilt.\n' +
						'            // Wichtig: Einträge in diesem Array können auch eine Vertretung sein. (Siehe "Vertretungen")\n' +
						'            {\n' +
						'                // Der Kurze, relativ unverständliche Name für diesen Raum, der auf dem offiziellen Vertretungsplan verwendet wird.\n' +
						'               "shortName": "BGeo",\n' +
						'               // Der lang ausgeschriebene Name des Raumes, wie beispielsweise "Physikraum 2" oder "Sporthalle 3".\n' +
						'               "longName": "Geografieraum"\n' +
						'            },\n' +
						'            ...\n' +
						'         ],\n' +
						'         // Entweder das Kürzel eines Lehrers, oder eine Vertretung mit solchen. (Siehe "Vertretungen").\n' +
						'         "teacher": "Ho",\n' +
						'         // Ein kurzer Infotext zur Natur dieses Eintrags, wie "EVA" oder "Raumänderung".\n' +
						'         "info": "EVA",\n' +
						'         // Eine Nachricht vom Lehrer.\n' +
						'         "message": "Bitte Geosachen mitbringen"\n' +
						'         // In der Webapp auf diesem Server werden die "info"- und "message"-Eigenschaften in eine Tabellenspalte kombiniert,\n' +
						'         // da meistens nur einer der beiden tatsächlich Text zu einthalten scheint.\n' +
						'      },\n' +
						'      ...\n' +
						'   ],\n' +
						'}'
					}
				</SyntaxHighlighter>
				
				<Heading variant="h5" id="output-format-substitutions">Vertretungen</Heading>
				<Typography paragraph>
					Leider ist dies der unintuitivste Teil der API, aber ich habe keine bessere Lösung gefunden.
				</Typography>
				<Typography paragraph>
					Die Felder <code>"room"</code> und <code>"teacher"</code> eines Vertretungsplaneintrags können neben
					ihrem Standartformat auch das Vertretungs-Format haben. Es repräsentiert, dass anstatt dem normalen Lehrer,
					oder Raum, ein Vertretungslehrer unterrichtet, oder der Unterricht in einem anderen Raum stattfindet.
				</Typography>
				<Typography paragraph>
					Das Format sieht folgendermaßen aus:
				</Typography>
				<SyntaxHighlighter language="json">
					{
						'{\n' +
						'   "current": ...,\n' +
						'   "subst": ...,\n' +
						'}\n'
					}
				</SyntaxHighlighter>
				<Typography paragraph>
					Die beiden Felder <code>"current"</code> und <code>"subst"</code> sind hierbei im ursprünglichen Format
					des Feldes in dem sich die Vertretung befindet (d. h. sie sind Strings wenn die Vertretung im <code>"lehrer"</code>-Feld ist, etc.).
				</Typography>
				<Typography paragraph>
					Hierbei beinhaltet <code>"current"</code> den <b>derzeitigen</b> Lehrer oder Raum, d. h. den <em>Vertretungslehrer</em> oder den
					Raum, in dem der Untericht nun <em>ausnahmsweise stattfindet</em>.
				</Typography>
				<Typography paragraph>
					<code>"subst"</code> beinhaltet den <b>normalen</b> Lehrer oder Raum, also der Lehrer der diese Stunden in diesem Fach normalerweise
					unterrichtet, aber vertreten wird, oder der Raum, in dem der Unterricht normalerweise stattfindet.
				</Typography>

				<Heading variant="h4" id="example">Beispiel</Heading>
				<Typography paragraph>
					Dies ist ein Beispieloutput für das Abrufen eines aktuellen Vertretungsplans am {new Date(exampleDate).toLocaleDateString("de-DE")}.
				</Typography>
				<SyntaxHighlighter language="json" className={classes.example}>{example}</SyntaxHighlighter>
			</Container>
		</Page>
	)
}

export const getStaticProps: GetStaticProps<ApiReferenceProps> = async () => {
	const res = await GylohWebUntis.getCurrentTables(1);
	const dateParsed = res.map(table => {
		return {
			...table,
			date: table.date.getTime()
		}
	});
	return {
		props: {
			example: JSON.stringify({
				data: dateParsed
			}, null, 3),
			exampleDate: Date.now()
		}
	}
}

export default ApiReference;