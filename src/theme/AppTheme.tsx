import React, { FC, PropsWithChildren, ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { purpleTheme } from "./";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const AppTheme: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ThemeProvider theme={purpleTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
