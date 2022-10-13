import React from "react";
import { RouteObject, Navigate } from "react-router-dom";
import { JournalPage } from "../pages";
import { JournalLayout } from "../layouts";

export const JournalRoutes: RouteObject[] = [
	{
		path: "/",
		element: (
			<JournalLayout>
				<JournalPage />
			</JournalLayout>
		),
	},
	{
		path: "/*",
		element: <Navigate to={"/"} />,
	},
];
