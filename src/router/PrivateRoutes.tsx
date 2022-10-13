import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export const PrivateRoutes: FC = () => {
	const { status } = useAppSelector((state) => state.auth);

	if (status === "not-authenticated") return <Navigate to="/auth/login" />;

	return <Outlet />;
};
