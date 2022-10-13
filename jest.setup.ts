import "whatwg-fetch"; // <-- yarn add whatwg-fetch
import "setimmediate";
import { getEnviroments } from "./src/helpers/getEnviroments";

require("dotenv").config({
	path: ".env.test",
});
jest.setTimeout(30000);

jest.mock("./src/helpers/getEnviroments.ts", () => ({
	getEnviroments: () => ({
		...process.env,
	}),
}));
