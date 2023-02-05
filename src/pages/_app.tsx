import type { AppProps } from 'next/app'
import {ThemeProvider} from "styled-components";
import {Light} from "@/styles/PressoTheme";
import GlobalStyle from "@/styles/GlobalStyle";
import {Reset} from "styled-reset";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Reset />
			<ThemeProvider theme={Light}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
