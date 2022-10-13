import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { JournalApp } from "./JournalApp";
import { store } from "./store";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<JournalApp />
		</Provider>
	</React.StrictMode>
);
