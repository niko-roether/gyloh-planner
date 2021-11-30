import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../src/createEmotionCache";
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
					<meta property="og:image" content={`https://${process.env.HOSTNAME}/logo.png`} />
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
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
		});

	const initialProps = await Document.getInitialProps(ctx);
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style 
			data-emotion={`${style.key} ${style.ids.join(" ")}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	))

	return {
		...initialProps,
		styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
	};
};