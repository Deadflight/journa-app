import React, { FormEvent, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, TextField, Button, Link, Alert } from "@mui/material";
import { useForm, useAppDispatch, useAppSelector } from "../../hooks";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store";

const initialForm = {
	email: "",
	password: "",
};

const formValidations = {
	email: [(value: string) => value.includes("@"), "Invalid email"],
	password: [
		(value: string) => value.length >= 6,
		"Password must contain 6 characters",
	],
};

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const { status, errorMessage } = useAppSelector((state) => state.auth);

	const {
		email,
		password,
		onInputChange,
		formState,
		isFormValid,
		formSubmitted,
		passwordValid,
		emailValid,
		setFormSubmitted,
	} = useForm(initialForm, formValidations);

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		setFormSubmitted(true);
		if (!isFormValid) return;
		dispatch(startLoginWithEmailPassword(formState));
	};

	const isAuthenticating = useMemo(() => status === "checking", [status]);

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	};

	return (
		<form
			onSubmit={onSubmit}
			className="animate__animated animate__fadeIn animate__faster"
			aria-label="submit-form"
		>
			<Grid container>
				<Grid item xs={12} sx={{ mt: 2 }}>
					<TextField
						label="Email"
						type="email"
						placeholder="example.email.com"
						fullWidth
						inputProps={{
							"data-testid": "password",
						}}
						name="email"
						value={email}
						onChange={onInputChange}
						error={!!emailValid && formSubmitted}
						helperText={formSubmitted && emailValid}
					/>
				</Grid>
				<Grid item xs={12} sx={{ mt: 2 }}>
					<TextField
						label="Password"
						type="password"
						placeholder="******"
						fullWidth
						value={password}
						name="password"
						onChange={onInputChange}
						error={!!passwordValid && formSubmitted}
						helperText={formSubmitted && passwordValid}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
				<Grid item xs={12} display={!!errorMessage ? "" : "none"}>
					<Alert severity="error">{errorMessage}</Alert>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button
						type={"submit"}
						variant="contained"
						fullWidth
						disabled={isAuthenticating}
					>
						Login
					</Button>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button
						variant="contained"
						fullWidth
						onClick={onGoogleSignIn}
						disabled={isAuthenticating}
						aria-label={"google-btn"}
					>
						Google
					</Button>
				</Grid>
			</Grid>
			<Grid container direction={"row"} justifyContent="end">
				<Link component={RouterLink} color="inherit" to="/auth/register">
					Create Account?
				</Link>
			</Grid>
		</form>
	);
};
