import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "../../../interfaces";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		status: "checking", // 'not-authenticated, 'authenticated', 'checking'
		uid: null,
		email: null,
		displayName: null,
		photoURL: null,
		errorMessage: null,
	} as IAuth,
	reducers: {
		login: (state, { payload }: PayloadAction<IAuth>) => {
			state.status = "authenticated";
			state.uid = payload.uid;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.photoURL = payload.photoURL;
			state.errorMessage = null;
		},
		logout: (
			state,
			{
				payload = { errorMessage: null },
			}: PayloadAction<{ errorMessage?: string | null }>
		) => {
			state.status = "not-authenticated";
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoURL = null;
			state.errorMessage = payload.errorMessage;
		},
		chekingCredentials: (state) => {
			state.status = "checking";
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, chekingCredentials } = authSlice.actions;
