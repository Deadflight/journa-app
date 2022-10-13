import React, { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks";

export const PublicRoutes: FC = () => {
	const { status } = useAppSelector((state) => state.auth);

	if (status === "authenticated") {
		return <Navigate to={"/"} />;
	}

	return <Outlet />;
};
