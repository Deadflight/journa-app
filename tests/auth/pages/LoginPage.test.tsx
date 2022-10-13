import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/slices/auth/authThunks", () => ({
	startGoogleSignIn: () => mockStartGoogleSignIn,
	startLoginWithEmailPassword: ({ email, password }) => {
		return () => mockStartLoginWithEmailPassword({ email, password });
	},
}));

jest.mock("react-redux", () => ({
	...jest.requireActual("react-redux"),
	useDispatch: () => (fn: any) => fn(),
}));

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	preloadedState: {
		auth: notAuthenticatedState,
	},
});

describe("Tests for <LoginPage/>", () => {
	beforeEach(() => jest.clearAllMocks());

	test("should render the component properly", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
	});

	test("should call the google button and startGoogleSignIn", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		const googleBtn = screen.getByLabelText("google-btn");

		fireEvent.click(googleBtn);

		expect(mockStartGoogleSignIn).toHaveBeenCalled();
	});

	test("should call startLoginWithEmailPassword", () => {
		const email = "carlos@google.com";
		const password = "123456";

		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		const emailField = screen.getByRole("textbox", { name: "Email" });
		fireEvent.change(emailField, { target: { name: "email", value: email } });

		const passwordFiled = screen.getByTestId("password");

		fireEvent.change(passwordFiled, {
			target: { name: "password", value: password },
		});

		const loginForm = screen.getByLabelText("submit-form");
		fireEvent.submit(loginForm);

		expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
			email,
			password,
		});
	});
});
