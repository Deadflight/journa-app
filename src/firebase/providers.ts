import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";
import { IForm } from "../interfaces";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider);

		console.log(result);
		// const credentials = GoogleAuthProvider.credentialFromResult(result);

		const { displayName, email, photoURL, uid } = result?.user!;

		return {
			ok: true,
			//User Info
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		const email = error.customData.email;
		const credential = GoogleAuthProvider.credentialFromError(error);

		return {
			ok: false,
			errorMessage,
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
		};
	}
};

export const registerUserWithEmailPassword = async ({
	email,
	password,
	displayName,
}: IForm) => {
	try {
		const resp = await createUserWithEmailAndPassword(
			FirebaseAuth,
			email!,
			password!
		);
		const { uid, photoURL } = resp.user;
		await updateProfile(FirebaseAuth.currentUser!, {
			displayName,
		});

		return {
			ok: true,
			uid,
			photoURL,
			displayName,
		};
	} catch (error: any) {
		return {
			ok: false,
			errorMessage: error.message,
			uid: null,
			photoURL: null,
			displayName: null,
		};
	}
};

export const loginWithEmailPassword = async ({ email, password }: IForm) => {
	try {
		const resp = await signInWithEmailAndPassword(
			FirebaseAuth,
			email!,
			password!
		);

		const { uid, photoURL, displayName } = resp.user;

		return {
			ok: true,
			uid,
			photoURL,
			displayName,
		};
	} catch (error: any) {
		return {
			ok: false,
			errorMessage: error.message,
			uid: null,
			photoURL: null,
			displayName: null,
		};
	}
};

export const logoutFirebase = async () => {
	return await FirebaseAuth.signOut();
};
