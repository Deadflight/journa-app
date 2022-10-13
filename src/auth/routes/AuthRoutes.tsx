import React from "react";
import { LoginPage, RegisterPage } from "../pages";
import { RouteObject, Navigate } from "react-router-dom";
import { AuthLayout } from "../layouts";

export const AuthRoutes: RouteObject[] = [
	{
		path: "auth",
		children: [
			{
				path: "login",
				element: (
					<AuthLayout title="Login">
						<LoginPage />
					</AuthLayout>
				),
			},
			{
				path: "register",
				element: (
					<AuthLayout title="Register">
						<RegisterPage />
					</AuthLayout>
				),
			},
		],
	},
	{
		path: "auth/*",
		element: <Navigate to={"/auth/login"} />,
	},
];
