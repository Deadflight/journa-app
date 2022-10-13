import React, { FC, PropsWithChildren } from "react";
import { Box, Toolbar } from "@mui/material";
import { Navbar, Sidebar } from "../components";

const drawerWidth = 240;

export const JournalLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Box
			sx={{ display: "flex" }}
			className="animate__animated animate__fadeIn animate__faster"
		>
			<Navbar drawerWidth={drawerWidth} />

			<Sidebar drawerWidth={drawerWidth} />

			<Box
				component={"main"}
				sx={{
					flexGrow: 1,
					p: 3,
				}}
			>
				<Toolbar />

				{children}
			</Box>
		</Box>
	);
};
