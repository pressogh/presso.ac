import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components";
import { Light } from "@/styles/PressoTheme";
import GlobalStyle from "@/styles/GlobalStyle";
import { Reset } from "styled-reset";
import Head from "next/head";
import 'react-notion-x/src/styles.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>PRESSO / Kanghyoek Lee</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Reset />

			<ThemeProvider theme={Light}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
