import React from "react";
import { IAuth } from "../../src/interfaces/auth";

export const initialState: IAuth = {
	status: "checking",
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authenticatedState: IAuth = {
	status: "authenticated",
	uid: "123ABC",
	email: "carlos@google.com",
	displayName: "Carlos",
	photoURL: "https://demo.jpg",
	errorMessage: null,
};

export const notAuthenticatedState: IAuth = {
	status: "not-authenticated",
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const demoUser: IAuth = {
	uid: "ABC1234",
	email: "demo@google.com",
	displayName: "Demo user",
	photoURL: "htttps://photo.jpg",
};
