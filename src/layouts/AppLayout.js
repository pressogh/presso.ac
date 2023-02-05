import styled from "styled-components";

const Centering = styled.div`
	display: flex;
  	justify-content: center;
`;

const FixedWidth = styled.div`
	width: 1000px;
	@media (max-width: 1000px) {
		width: 100%;
	}
`;

export const AppLayout = ({ children }) => {
	return (
		<Centering>
			<FixedWidth>{ children }</FixedWidth>
		</Centering>
	)
}
