import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDXlI-dUGXOv7caVziGPKpeJrdTdKF_N6w",
	authDomain: "burek-f67fb.firebaseapp.com",
	projectId: "burek-f67fb",
	storageBucket: "burek-f67fb.appspot.com",
	messagingSenderId: "305518071051",
	appId: "1:305518071051:web:5db5fb79d1eb474658260e",
	measurementId: "G-WJEHQD0Z92",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

const registerUserWithEmail = async (name, email, password, callback) => {
	const response = await createUserWithEmailAndPassword(auth, email, password);
	const user = response.user;
	alert("Uzytkownik zarejestrowany");
	callback(user);
	//TODO: store info about logged user in store / context

	await addDoc(collection(db, "users"), {
		uid: user.uid,
		name,
		authProvider: "local",
		email,
	});
};

const loginUserWithEmail = async (email, password, callback) => {
	await signInWithEmailAndPassword(auth, email, password).then((response) => {
		console.log(response);
		callback(response);
	});
};

export { db, auth, registerUserWithEmail, loginUserWithEmail, storage };
