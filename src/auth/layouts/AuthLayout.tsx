import React, { FC, PropsWithChildren } from "react";
import { Grid, Typography } from "@mui/material";

interface Props {
	title: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({
	children,
	title,
}) => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
		>
			<Grid
				item
				xs={12}
				className="box-shadow"
				sx={{
					backgroundColor: "white",
					padding: 3,
					borderRadius: 2,
					width: { sm: 400 },
				}}
			>
				<Typography variant={"h5"} sx={{ mb: 1 }}>
					{title}
				</Typography>
				{children}
			</Grid>
		</Grid>
	);
};
