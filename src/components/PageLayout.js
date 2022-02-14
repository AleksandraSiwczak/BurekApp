import styled from "styled-components";
import { NavBar } from "../components/NavBar";

import "../styles.css";

const StyledPageLayout = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PageLayout = (props) => {
	return (
		<StyledPageLayout>
			<NavBar />
			{props.children}
		</StyledPageLayout>
	);
};
