import styled from "styled-components";
import Header from "@/components/Header";

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
			<Header />
			<Container>
				Hello World
			</Container>
		</>
	)
}
