import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { db, storage } from "../config";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { TextField, Rating, Button, touchRippleClasses } from "@mui/material";
import cat from "../icons/cat.png";
import { useAllAnimals } from "../utils/useAllAnimals";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const StyledWrapper = styled.div`
	display: flex;
	margin: 15px 100px;
	/* justify-content: space-evenly; */
	overflow: hidden;
`;

const StyledForm = styled.form`
	margin: 20px;
	width: 300px;
	font-size: 20px;
	font-family: "Lato", sans-serif;
	display: flex;
	flex-direction: column;
	gap: 10px;
	.MuiTypography-root {
		font-size: 20px;
	}
	.MuiRating-root {
		font-size: 50px;
	}
	& input {
		/* outline: none; */
		/* border: 2px solid #00875a; */
		border-radius: 5px;
		height: 5px;
		background-color: white;
	}

	/* & button {
		border: 2px solid #00875a;
		border-radius: 5px;
		height: 50px;
	} */
`;

const StyledLabel = styled.label`
	display: inline-block;
`;

const StyledRating = styled(Rating)({
	"& .MuiRating-iconFilled": {
		color: "#ff6d75",
		fontSize: "50px",
	},
	"& .MuiRating-iconHover": {
		color: "#ff3d47",
		fontSize: "50px",
	},
});

const StyledImage = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${(props) => props.src});
	background-position: top;
	background-size: contain;
	background-repeat: no-repeat;
`;

const StyledDivImage = styled.div`
	width: 350px;
	height: 350px;
	/*// display: flex;*/
	box-shadow: 0px 0px 12px 0px rgba(66, 68, 90, 1);
	border-radius: 5px;
`;

const EmptyDiv = styled.div`
	width: 100%;
	height: 100%;
	/* border: 1px solid black; */
	background-image: url(${cat});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const StyledUpload = styled.div`
	width: 50%;
	margin: 20px;
	padding: 20px;
	display: flex;
	gap: 20px;
	flex-direction: column;
	justify-content: flex-start;
	font-family: "Lato", sans-serif;
`;

const StyledFormUpload = styled.form`
	display: flex;
	gap: 10px;
`;

export const AddPetForm = () => {
	const [animalData, setAnimalData] = useState({
		id: "",
		name: "",
		age: "",
		species: "",
		animalBehavior: 0,
		humanBehavior: 0,
		imageUrl: "",
		notes: "",
	});

	const [isProper, setIsProper] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [progress, setProgress] = useState(0);
	const formRef = useRef(null);

	const pathName = useLocation().pathname;

	const handleChange = (event) => {
		setAnimalData((prevFormData) => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value,
			};
		});
	};

	const handleChip = (event) => {
		setAnimalData((prevFormData) => {
			if (event.target.value.length < 15 || event.target.value.length > 15) {
				setIsProper(false);
			}
			if (event.target.value.length === 15) {
				setIsProper(true);
			}
			if (event.target.value.length > 0) {
				setIsEditing(true);
			}
			return {
				...prevFormData,
				[event.target.name]: event.target.value,
			};
		});
	};

	let navigate = useNavigate();

	function returnToAnimalList(event) {
		navigate(
			pathName.includes("/editanimaldetails")
				? "/animalslist"
				: "/adoptedanimalslist",
			{ replace: true }
		);
	}

	const addAnimal = async () => {
		await setDoc(doc(db, "animals", animalData.id), animalData);
	};
	const editAnimal = async () => {
		await setDoc(doc(db, "animals", animalData.id), animalData);
	};

	const formHandler = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		uploadFiles(file);
	};

	const uploadFiles = (file) => {
		if (!file) return;
		const storageRef = ref(storage, `/files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const prog = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(prog);
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) =>
					setAnimalData({
						...animalData,
						imageUrl: url,
					})
				);
			}
		);
	};

	const handleSumbit = (event) => {
		event.preventDefault();
		console.log(animalData);
		console.log(Object.values(animalData).every((item) => !!item));
		if (pathName === "/addpet") {
			if (isProper && Object.values(animalData).every((item) => !!item)) {
				addAnimal();
				setAnimalData({
					id: "",
					name: "",
					age: "",
					species: "",
					animalBehavior: 0,
					humanBehavior: 0,
					imageUrl: "",
					notes: "",
				});
				setProgress(0);
				setIsEditing(false);
				formRef.current.reset();
			}
			if (Object.values(animalData).some((item) => !item)) {
				alert("Fill in all fields");
			}
		} else {
			console.log("editing");
			editAnimal();
			returnToAnimalList();
		}
	};

	const { id } = useParams();

	const animals = useAllAnimals(
		pathName.includes("/editanimaldetails") ? "animals" : "adopted_animals"
	);

	useEffect(() => {
		const foundAnimal = animals.find((animal) => id === animal.id);
		if (!foundAnimal) {
			return;
		}
		setAnimalData({
			id: foundAnimal.id,
			name: foundAnimal.name,
			age: foundAnimal.age,
			species: foundAnimal.species,
			animalBehavior: foundAnimal.animalBehavior,
			humanBehavior: foundAnimal.humanBehavior,
			imageUrl: foundAnimal.imageUrl,
			notes: foundAnimal.notes,
		});
	}, [id, animals]);

	return (
		<StyledWrapper>
			<StyledUpload>
				<StyledDivImage>
					{animalData.imageUrl ? (
						<StyledImage src={animalData.imageUrl} />
					) : (
						<EmptyDiv></EmptyDiv>
					)}
				</StyledDivImage>
				<StyledFormUpload ref={formRef}>
					<input type="file" lang="en" onChange={formHandler} required />
					<h3 style={{ fontSize: "25px" }}>Uploaded {progress} %</h3>
				</StyledFormUpload>
			</StyledUpload>

			<StyledForm onSubmit={handleSumbit}>
				<StyledLabel htmlFor="id">Animal chip number (15 digits)</StyledLabel>
				{isEditing ? (
					isProper ? (
						<TextField
							variant="filled"
							focused
							color="success"
							id="id"
							placeholder="Enter chip number"
							value={animalData.id || ""}
							type="text"
							name="id"
							onChange={handleChip}
						></TextField>
					) : (
						<TextField
							error
							helperText="Incorrect chip number"
							id="id"
							placeholder="Enter chip number"
							value={animalData.id || ""}
							type="text"
							name="id"
							onChange={handleChip}
						></TextField>
					)
				) : (
					<TextField
						id="id"
						placeholder="Enter chip number"
						value={animalData.id || ""}
						type="text"
						name="id"
						onChange={handleChip}
					></TextField>
				)}
				<label htmlFor="name">Name</label>
				<TextField
					id="name"
					placeholder="Enter pet name"
					value={animalData.name || ""}
					type="text"
					name="name"
					onChange={handleChange}
					// required
				></TextField>
				<label htmlFor="age">Age</label>
				<TextField
					id="age"
					placeholder="Enter pet age"
					value={animalData.age || ""}
					type="text"
					name="age"
					onChange={handleChange}
					// required
				></TextField>
				<label htmlFor="species">Species</label>
				<TextField
					name="species"
					placeholder="Dog/Cat"
					value={animalData.species || ""}
					type="text"
					name="species"
					onChange={handleChange}
					// required
				></TextField>
				<label htmlFor="notes">Notes</label>
				<TextareaAutosize
					id="notes"
					aria-label="minimum height"
					minRows={1}
					style={{ fontSize: "20px" }}
					placeholder="Add note"
					value={animalData.notes || ""}
					type="text"
					name="notes"
					onChange={handleChange}
				></TextareaAutosize>
				<label component="legend" htmlFor="animalBehavior">
					Behavior around other animals
				</label>
				<StyledRating
					required
					value={Number(animalData.animalBehavior) || 0}
					onChange={handleChange}
					name="animalBehavior"
					precision={0.5}
					icon={<FavoriteIcon fontSize="inherit" />}
					emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
				/>
				<label component="legend" htmlFor="humanBehavior">
					Behavior around humans
				</label>
				<StyledRating
					required
					value={Number(animalData.humanBehavior) || 0}
					onChange={handleChange}
					name="humanBehavior"
					precision={0.5}
					icon={<FavoriteIcon fontSize="inherit" />}
					emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
				/>
				<Button
					variant="contained"
					color="success"
					type="submit"
					sx={{
						backgroundColor: "#00875a",
						color: "white",
						fontFamily: "Lato",
					}}
				>
					{pathName === "/addpet" ? "Add Pet" : "Confirm editing"}
				</Button>
			</StyledForm>
		</StyledWrapper>
	);
};
