import React, { FormEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, TextField, Button, Link, Alert } from "@mui/material";
import { useForm, useAppDispatch, useAppSelector } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store";

const initialForm = {
	displayName: "",
	email: "",
	password: "",
};

const formValidations = {
	email: [(value: string) => value.includes("@"), "Invalid email"],
	password: [
		(value: string) => value.length >= 6,
		"Password must contain 6 characters",
	],
	displayName: [(value: string) => value.length >= 1, "The name is required"],
};

export const RegisterPage = () => {
	const {
		displayName,
		email,
		password,
		onInputChange,
		formState,
		displayNameValid,
		passwordValid,
		emailValid,
		isFormValid,
		formSubmitted,
		setFormSubmitted,
	} = useForm(initialForm, formValidations);
	const { status, errorMessage } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		setFormSubmitted(true);
		if (!isFormValid) return;
		dispatch(startCreatingUserWithEmailPassword(formState));
	};

	return (
		<form
			onSubmit={onSubmit}
			className="animate__animated animate__fadeIn animate__faster"
		>
			<Grid container>
				<Grid item xs={12} sx={{ mt: 2 }}>
					<TextField
						label="Name"
						type="text"
						placeholder="Name"
						name={"displayName"}
						value={displayName}
						onChange={onInputChange}
						fullWidth
						error={!!displayNameValid && formSubmitted}
						helperText={formSubmitted && displayNameValid}
					/>
				</Grid>
				<Grid item xs={12} sx={{ mt: 2 }}>
					<TextField
						label="Email"
						type="email"
						placeholder="example.email.com"
						name={"email"}
						value={email}
						error={!!emailValid && formSubmitted}
						helperText={formSubmitted && emailValid}
						onChange={onInputChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sx={{ mt: 2 }}>
					<TextField
						label="Password"
						type="password"
						placeholder="******"
						name={"password"}
						value={password}
						error={!!passwordValid && formSubmitted}
						helperText={formSubmitted && passwordValid}
						onChange={onInputChange}
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
				<Grid item xs={12} display={!!errorMessage ? "" : "none"}>
					<Alert severity="error">{errorMessage}</Alert>
				</Grid>
				<Grid item xs={12}>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						disabled={status === "checking"}
					>
						Create Account
					</Button>
				</Grid>
			</Grid>
			<Grid container direction={"row"} justifyContent="end">
				<Link component={RouterLink} color="inherit" to="/auth/login">
					Already have an Account?
				</Link>
			</Grid>
		</form>
	);
};
