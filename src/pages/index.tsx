import Head from 'next/head'
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 1000px;
	@media (max-width: 1000px) {
		width: 100%;
	}
`
export default function Home() {
	return (
		<>
			<Head>
				<title>presso / Kanghyoek Lee</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container>
				Hello World
			</Container>
		</>
	)
}
