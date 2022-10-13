import React from "react";

export const getEnviroments = () => {
	import.meta.env;

	return {
		...import.meta.env,
	};
};
