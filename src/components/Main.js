import styled from "styled-components";
import "../styles.css";

const StyledMainContent = styled.main`
	grid-area: main;
	background-color: #efefef;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
export const Main = (props) => {
	return <StyledMainContent>{props.children}</StyledMainContent>;
};
