import { NavLink } from "react-router-dom";
import styled from "styled-components";

import "../styles.css";

const StyledNavigation = styled.div`
	/* padding: 150px; */
	height: 100vh;
	background-color: #efefef;
	display: grid;
	grid-template-columns: 0.5fr 0.5fr;
	grid-template-rows: 0.5fr 0.5fr;

	/* margin: 10% auto; */

	/* grid-gap: 200px; */
	/* grid-template-areas:
		"animals" "calendar"
		"adopted" "addpet"; */
	& :hover {
		font-size: 6.5vh;
		transition: all 0.5s ease-in-out;
		transform: scale(1.1);
	}
`;

const StyledAnimalsBar = styled.div`
	border-radius: 5px;
	width: 33vh;
	height: 33vh;
	margin-left: 50%;
	margin-top: 10%;
	background-color: #00875a;
	/* grid-area: animals; */
	/* justify-content: center;*/
	align-self: center;
	justify-self: center;
	box-shadow: 0px 0px 24px 0px rgba(66, 68, 90, 1);
`;

const StyledLink = styled.div`
	display: flex;
	height: 33vh;
	width: 33vh;
	align-items: center;
	justify-content: center;
	font-size: 6vh;
	font-weight: bold;
	font-family: "Amatic SC", cursive;
	color: white;
`;
const StyledCalendarBar = styled.div`
	border-radius: 5px;
	height: 33vh;
	width: 33vh;
	margin-right: 50%;
	margin-top: 10%;
	background-color: #e06648;
	/* grid-area: calendar; */
	align-self: center;
	justify-self: center;
	box-shadow: 0px 0px 24px 0px rgba(66, 68, 90, 1);
`;
const StyledAdoptedBar = styled.div`
	border-radius: 5px;
	height: 33vh;
	width: 33vh;
	margin-left: 50%;
	margin-bottom: 10%;
	margin-top: 15%;
	background-color: #e06648;
	/* grid-area: adopted; */
	align-self: center;
	justify-self: center;
	box-shadow: 0px 0px 24px 0px rgba(66, 68, 90, 1);
`;
const StyledAddPetBar = styled.div`
	border-radius: 5px;
	height: 33vh;
	width: 33vh;
	margin-right: 50%;
	margin-bottom: 10%;
	margin-top: 15%;
	background-color: #00875a;
	/* grid-area: addpet; */
	align-self: center;
	justify-self: center;
	box-shadow: 0px 0px 24px 0px rgba(66, 68, 90, 1);
`;

export const Navigation = () => {
	return (
		<StyledNavigation>
			<StyledAnimalsBar>
				<NavLink to="/addpet">
					<StyledLink>ADD PET</StyledLink>
				</NavLink>
			</StyledAnimalsBar>

			<StyledCalendarBar>
				<NavLink to="/animalslist">
					<StyledLink>ANIMALS</StyledLink>
				</NavLink>
			</StyledCalendarBar>

			<StyledAdoptedBar>
				<NavLink to="/adoptedanimalslist">
					<StyledLink>ADOPTED</StyledLink>
				</NavLink>
			</StyledAdoptedBar>
			<StyledAddPetBar>
				<NavLink to="/calendar">
					<StyledLink>CALENDAR</StyledLink>
				</NavLink>
			</StyledAddPetBar>
		</StyledNavigation>
	);
};
