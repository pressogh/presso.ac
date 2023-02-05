import type { AppProps } from 'next/app'
import {ThemeProvider} from "styled-components";
import {Light} from "@/styles/PressoTheme";
import GlobalStyle from "@/styles/GlobalStyle";
import {AppLayout} from "@/layouts/AppLayout";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={Light}>
			<AppLayout>
				<GlobalStyle />
				<Component {...pageProps} />
			</AppLayout>
		</ThemeProvider>
	);
}
