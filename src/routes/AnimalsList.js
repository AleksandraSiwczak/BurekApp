import { db } from "../config.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { PageLayout } from "../components/PageLayout.js";
import { Main } from "../components/Main.js";
import { AnimalDetails } from "../components/AnimalDetails";
import { AnimalTile } from "../components/AnimalTile.js";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "animate.css";
import { useAllAnimals } from "../utils/useAllAnimals.js";

const AnimalListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	height: 100%;
`;

export const SearchBar = styled.div`
	width: 250px;
	height: 40px;
	margin: 50px auto 50px auto;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SearchBarInput = styled.input`
	margin: 10px 0 10px 0;
	height: 40px;
	width: 200px;
	border-radius: 4px;
	border: 2px solid #00875a;
	text-indent: 20px;
	font-family: "Short Stack", cursive;
	outline: none;
	cursor: pointer;
`;

const StyledImg = styled.img`
	margin-left: 10px;
`;

export const AnimalsList = () => {
	// const [animals, setAnimals] = useState([]);
	const [animalDetailId, setAnimalDetailId] = useState(null);
	const [query, setQuery] = useState("");
	const { pathname } = useLocation();

	const toggleDetailsList = (id) => {
		setAnimalDetailId((oldId) => (oldId === id ? null : id));
	};

	const animalsCollectionName =
		pathname === "/animalslist" ? "animals" : "adopted_animals";

	const animals = useAllAnimals(animalsCollectionName);

	return (
		<PageLayout>
			<Main>
				<AnimalListWrapper>
					<SearchBar>
						<SearchBarInput
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Enter animal's name"
						/>
						<StyledImg
							src={process.env.PUBLIC_URL + "/iconmonstr-magnifier-5-240.png"}
							alt="search"
							style={{ height: "30px", width: "30px" }}
						/>
					</SearchBar>

					<AnimalTile
						animals={animals}
						animalDetailId={animalDetailId}
						query={query}
						toggleDetailsList={toggleDetailsList}
					/>
				</AnimalListWrapper>
			</Main>
		</PageLayout>
	);
};
