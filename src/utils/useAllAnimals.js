import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config.js";

export const useAllAnimals = (animalsCollectionName) => {
	const [animals, setAnimals] = useState([]);

	useEffect(() => {
		const unsub = onSnapshot(
			collection(db, animalsCollectionName),
			(snapshot) => {
				const animalsList = snapshot.docs.map((doc) => doc.data());
				setAnimals(animalsList);
			}
		);
		return () => unsub();
	}, [animalsCollectionName]);
	return animals;
};
