import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { lightTheme as theme } from '../src/theme/theme';
import { SERVER } from '../src/config';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="de" prefix="og: https://ogp.me/ns#">
				<Head>
					{/* PWA primary color */}
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link rel="manifest" href="site.webmanifest" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>

					<meta name="title" content="Gyloh Planner" />
					<meta name="description" content="Eine öffentliche, nutzerfreundliche und responsive Web-App für den Vertretungsplan des Gymnasium Lohbrügge." />
					
					<meta property="og:title" content="Gyloh Planner" />
					<meta property="og:description" content="Eine öffentliche, nutzerfreundliche und responsive Web-App für den Vertretungsplan des Gymnasium Lohbrügge." />
					<meta property="og:locale" content="de_DE" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="android-chrome-512x512.png" />
					<meta property="og:image:width" content="512" />
					<meta property="og:image:height" content="512" />
					<meta property="og:image:type" content="image/png" />
					<meta property="og:image:alt" content="Gyloh-Planner-Logo" />
					<meta property="og:url" content={SERVER} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	try {
	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});
	} catch(e) {}

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
	};
};