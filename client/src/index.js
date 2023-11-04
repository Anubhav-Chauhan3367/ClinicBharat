import React from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const root = createRoot(document.getElementById("root"));

root.render(
	<AuthProvider>
		<App />
	</AuthProvider>
);
