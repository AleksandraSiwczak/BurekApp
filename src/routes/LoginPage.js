import { useState, useEffect } from "react";
import styled from "styled-components";

import { Main } from "../components/Main";
import { loginUserWithEmail } from "../config";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { TextField, Rating, Button, touchRippleClasses } from "@mui/material";

const StyledLoginForm = styled.form`
	height: 90vh;
	width: 15vw;
	min-height: 100px;
	min-width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	& input {
		margin: 10px 0 10px 0;
		height: 40px;
		border-radius: 4px;
		border: 2px solid #00875a;
		text-indent: 20px;
		font-family: "Short Stack", cursive;
	}
	& button {
		font-family: "Short Stack", cursive;
		height: 40px;
		margin-top: 10px;
		border: 2px solid #00875a;
		border-radius: 4px;
		background-color: lightgray;
	}
	& img {
		align-self: center;
	}
`;
const StyledHeader = styled.h1`
	margin-bottom: 7vh;
	/* font-family: "Short Stack", cursive; */
	font-family: "Amatic SC", cursive;
	font-size: 50px;
	color: #e06648;
	align-self: center;
	& span {
		color: #00875a;
		font-family: "Amatic SC", cursive;
	}
`;
const StyledFooter = styled.footer`
	height: 10vh;
	width: 100%;
	background-color: #e06648;
	/* background-color: coral; */
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledText = styled.span`
	color: white;
	text-indent: 1vw;
	font-size: 1rem;
	font-family: "Amatic SC", cursive;
	font-weight: bold;

	/* z-index: 1; */
	& a {
		text-decoration: none;
		color: white;
		padding: 0 1vw 0 1vw;
		font-size: 1.5rem;
		font-family: "Amatic SC", cursive;
	}
	& a:hover {
		color: #0f573f;
	}
`;

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUserWithEmail(email, password, setCurrentUser);
	};
	useEffect(() => {
		if (currentUser) {
			navigate("/navigation");
		}
	}, [navigate, currentUser]);

	return (
		<>
			<Main>
				<StyledLoginForm>
					<StyledHeader>
						Log into <span>BurekApp</span>
					</StyledHeader>
					<input
						type="email"
						name="email"
						placeholder="E-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></input>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></input>
					<button type="submit" onClick={handleSubmit}>
						Login
					</button>
					<img src={process.env.PUBLIC_URL + "/dogo.gif"} width="600px" />
				</StyledLoginForm>
			</Main>
			<StyledFooter>
				<StyledText>
					Created by:
					<a href="https://github.com/przemekk922" target="_blank">
						{" "}
						Przemysław Kalinowski
					</a>
					<a href="https://github.com/MariuszWalusiak" target="_blank">
						Mariusz Walusiak
					</a>
					<a href="https://github.com/AleksandraSiwczak" target="_blank">
						Aleksandra Siwczak
					</a>
					<a href="https://github.com/Rafal-Welzant" target="_blank">
						Rafał Welzant
					</a>
					<a href="https://github.com/JanKrysztop" target="_blank">
						Jan Krysztop
					</a>
				</StyledText>
			</StyledFooter>
		</>
	);
};
