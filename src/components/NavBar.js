import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import "../styles.css";

const StyledNavBar = styled.nav`
	grid-area: nav;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	color: white;
	background-color: #e06648;
	font-family: "Amatic SC", cursive;
	top: 0;
	position: sticky;
	z-index: 2;
`;

const StyledP = styled.p`
	color: ${(props) => (props.isActive ? "#0f573f" : "white")};
	/* border-bottom: ${(props) =>
		props.isActive ? "2px solid white" : "2px solid transparent"}; */
		
	padding: 25px;
	text-decoration: none;
	font-size: 30px;
	font-weight: bold;
	text-justify: center;
	text-align: center;
	position: relative;s
	/* &:hover {
		font-size: 35px;
	} */
	/* &::after {
		content: " ";
		display: flex;
		background: white;
		position: absolute;
		width: 0;
		height: 6px;
		bottom: 0;
		left: 0;
		right: 0;
		transition: 300ms width;
		justify-content: center;
	}
	&:hover::after {
		width: 100%;
	} */
`;

const StyledLink = styled(NavLink)`
	display: flex;
	align-items: center;

	& :hover {
		transition: all 0.3s ease-in-out;
		transform: scale(1.1);
	}
`;
export const NavBar = () => {
	const { pathname: pathName } = useLocation();

	return (
		<StyledNavBar>
			<StyledLink to="/navigation">
				<StyledP isActive={pathName === "/navigation"}>Main Page</StyledP>
			</StyledLink>

			<StyledLink to="/addpet">
				<StyledP isActive={pathName === "/addpet"}>Add Pet</StyledP>
			</StyledLink>
			<StyledLink to="/animalslist">
				<StyledP isActive={pathName === "/animalslist"}>Animals</StyledP>
			</StyledLink>
			<StyledLink to="/adoptedanimalslist">
				<StyledP isActive={pathName === "/adoptedanimalslist"}>
					Adopted Animals
				</StyledP>
			</StyledLink>
			<StyledLink to="/calendar">
				<StyledP isActive={pathName === "/calendar"}>Calendar</StyledP>
			</StyledLink>
		</StyledNavBar>
	);
};
