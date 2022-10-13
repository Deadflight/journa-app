import {
	authSlice,
	chekingCredentials,
	login,
	logout,
} from "../../../src/store/slices/auth/authSlice";
import {
	demoUser,
	initialState,
	notAuthenticatedState,
} from "../../fixtures/authFixtures";
import { IAuth } from "../../../src/interfaces/auth";
describe("Test for authSlices.ts", () => {
	test('should return the initialState and called "auth"', () => {
		expect(authSlice.name).toBe("auth");

		const state = authSlice.reducer(initialState, { type: "" });

		expect(state).toEqual(initialState);
	});

	test("should do the authentication", () => {
		const state = authSlice.reducer(initialState, login(demoUser));

		expect(state).toEqual<IAuth>({
			status: "authenticated",
			uid: demoUser.uid,
			email: demoUser.email,
			displayName: demoUser.displayName,
			photoURL: demoUser.photoURL,
			errorMessage: null,
		});
	});

	test("should do the logout without arguments", () => {
		const state = authSlice.reducer(initialState, logout({}));

		expect(state).toEqual({
			status: notAuthenticatedState.status,
			uid: notAuthenticatedState.uid,
			email: notAuthenticatedState.email,
			displayName: notAuthenticatedState.displayName,
			photoURL: notAuthenticatedState.photoURL,
			errorMessage: undefined,
		});
	});

	test("should do the logout and show Error message", () => {
		const state = authSlice.reducer(
			initialState,
			logout({ errorMessage: "Wrong credentials" })
		);

		expect(state).toEqual({
			status: notAuthenticatedState.status,
			uid: notAuthenticatedState.uid,
			email: notAuthenticatedState.email,
			displayName: notAuthenticatedState.displayName,
			photoURL: notAuthenticatedState.photoURL,
			errorMessage: "Wrong credentials",
		});
	});

	test("should change the status state to checking", () => {
		const state = authSlice.reducer(initialState, chekingCredentials());

		expect(state).toEqual({
			status: "checking",
			uid: notAuthenticatedState.uid,
			email: notAuthenticatedState.email,
			displayName: notAuthenticatedState.displayName,
			photoURL: notAuthenticatedState.photoURL,
			errorMessage: notAuthenticatedState.errorMessage,
		});
	});
});
