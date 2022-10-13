import { chekingCredentials, logout, login, clearNotesLogout } from "../..";
import { IForm } from "../../../interfaces";
import { AppDispatch } from "../../store";
import {
	loginWithEmailPassword,
	registerUserWithEmailPassword,
	signInWithGoogle,
	logoutFirebase,
} from "../../../firebase";

export const checkingAuthentication = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(chekingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(chekingCredentials());
		const result = await signInWithGoogle();

		if (!result.ok)
			return dispatch(logout({ errorMessage: result.errorMessage }));

		dispatch(login(result));
	};
};

export const startCreatingUserWithEmailPassword = ({
	email = "",
	password,
	displayName = "",
}: IForm) => {
	return async (dispatch: AppDispatch) => {
		dispatch(chekingCredentials());

		const { ok, uid, photoURL, errorMessage } =
			await registerUserWithEmailPassword({
				email,
				password,
				displayName,
			});

		if (!ok) return dispatch(logout({ errorMessage }));

		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startLoginWithEmailPassword = ({
	email = "",
	password,
}: IForm) => {
	return async (dispatch: AppDispatch) => {
		dispatch(chekingCredentials());

		const { ok, uid, photoURL, errorMessage, displayName } =
			await loginWithEmailPassword({
				email,
				password,
			});
		if (!ok) return dispatch(logout({ errorMessage }));

		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startLogout = () => {
	return async (dispatch: AppDispatch) => {
		await logoutFirebase();
		dispatch(clearNotesLogout());
		dispatch(logout({ errorMessage: null }));
	};
};
