import React from "react";
import { FirebaseAuth } from "../firebase";
import { useAppDispatch, useAppSelector } from "./";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { login, logout } from "../store";
import { startLoadingNotes } from "../store/slices/journal/journalThunks";

export const useCheckAuth = () => {
	const { status } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout({ errorMessage: null }));

			const { uid, email, displayName, photoURL } = user;

			dispatch(login({ uid, email, displayName, photoURL }));
			dispatch(startLoadingNotes());
		});
	}, []);

	return {
		status,
	};
};
