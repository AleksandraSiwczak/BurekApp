import styled from "styled-components";
import { AnimalDetails } from "../components/AnimalDetails";
import { useLocation } from "react-router-dom";
import { AdoptedAnimalDetails } from "./AdoptedAnimalDetails";

const AnimalListBar = styled.div`
	margin-left: 25px;
	display: flex;
	width: 800px;
	height: 100px;
	/* border: 1px solid #00875a; */
	background-color: white;
	border-radius: 5px;
	box-shadow: 4px 0px 12px 0px rgba(66, 68, 90, 1);
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
	z-index: 1;
	font-size: 1.4rem;
`;

const StyledImgBox = styled.div`
	height: 100%;
	width: 100px;
	font-size: 50px;
	/* border-right: 2px solid #00875a; */
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	border-radius: 5px 0 0 5px;
	box-shadow: 0px 0px 12px 0px rgba(66, 68, 90, 1);
`;
const StyledButton = styled.button`
	height: 60px;
	width: 60px;
	border-radius: 5px;
	background-color: #00875a;
	color: white;
	margin-right: 10px;
	border: none;
	cursor: pointer;
	box-shadow: 0px 0px 12px 0px rgba(66, 68, 90, 1);
`;

export const AnimalTile = ({
	animals,
	animalDetailId,
	query,
	toggleDetailsList,
}) => {
	const pathName = useLocation().pathname;
	return (
		<>
			{animals
				.filter((animal) => {
					if (query === "") {
						return animal;
					} else if (
						animal.name.toLowerCase().includes(query.toLocaleLowerCase())
					) {
						return animal;
					}
				})
				.map((animal) => {
					const { id } = animal;
					const isExpanded = animalDetailId === animal.id;
					return (
						<>
							<AnimalListBar key={animal.id}>
								<StyledImgBox
									style={{ backgroundImage: `url(${animal.imageUrl})` }}
								></StyledImgBox>
								<p>{animal.name}</p>
								<StyledButton
									onClick={() => toggleDetailsList(id)}
									style={{
										backgroundColor: isExpanded ? "#e06648" : "#00875a",
										boxShadow: isExpanded
											? "inset 0px -1px 2px 1px rgba(102, 102, 102, 0.73)"
											: "0px 1px 2px 1px rgba(102, 102, 102, 0.73)",
									}}
								>
									{!isExpanded ? "Show details" : "Hide details"}
								</StyledButton>
							</AnimalListBar>
							{isExpanded &&
								(pathName === "/animalslist" ? (
									<AnimalDetails
										isExpanded={isExpanded}
										animal={animal}
										animals={animals}
									/>
								) : (
									<AdoptedAnimalDetails
										isExpanded={isExpanded}
										animal={animal}
										animals={animals}
									/>
								))}
						</>
					);
				})}
		</>
	);
};
