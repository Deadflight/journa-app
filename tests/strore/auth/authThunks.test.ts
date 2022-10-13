import {
	chekingCredentials,
	login,
	logout,
} from "../../../src/store/slices/auth";
import {
	checkingAuthentication,
	startGoogleSignIn,
	startLoginWithEmailPassword,
	startLogout,
} from "../../../src/store/slices/auth/authThunks";
import { demoUser } from "../../fixtures/authFixtures";
import {
	loginWithEmailPassword,
	logoutFirebase,
	signInWithGoogle,
} from "../../../src/firebase/providers";
import { clearNotesLogout } from "../../../src/store";

jest.mock("../../../src/firebase/providers");

describe("Tests to authThunks.ts", () => {
	const dispatch = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test("should invoke the checkingAuthentication", async () => {
		await checkingAuthentication()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
	});

	test("should startGoogleSingin call checkignCredentials and login - Success", async () => {
		const loginData = { ok: true, ...demoUser };

		await signInWithGoogle.mockResolvedValue(loginData);

		//thunk
		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test("should startGoogleSingin call checkignCredentials and login - Error", async () => {
		const loginData = { ok: false, errorMessage: "Google Error" };

		await signInWithGoogle.mockResolvedValue(loginData);

		//thunk
		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
		expect(dispatch).toHaveBeenCalledWith(
			logout({ errorMessage: loginData.errorMessage })
		);
	});

	test("should startLoginWithEmailPassword call checkignCredentials and login - Success", async () => {
		const loginData = { ok: true, ...demoUser };
		const formData = { email: demoUser.email!, password: "123456" };

		await loginWithEmailPassword.mockResolvedValue(loginData);

		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
		expect(dispatch).toHaveBeenCalledWith(
			login({
				uid: demoUser.uid,
				displayName: demoUser.displayName,
				email: demoUser.email,
				photoURL: demoUser.photoURL,
			})
		);
	});

	test("should startlogout call logoutFirebase, clearNotes and logout", async () => {
		await startLogout()(dispatch);

		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
		expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: null }));
	});
});
