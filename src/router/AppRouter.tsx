import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { JournalRoutes } from "../journal";
import { PrivateRoutes, PublicRoutes } from "./";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
	const router = createBrowserRouter([
		{
			element: <PublicRoutes />,
			children: [...AuthRoutes],
		},
		{
			element: <PrivateRoutes />,
			children: [...JournalRoutes],
		},
	]);

	const { status } = useCheckAuth();

	if (status === "checking") {
		return <CheckingAuth />;
	}

	return <RouterProvider router={router} />;
};
