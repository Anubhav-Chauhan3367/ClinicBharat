// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
	isAuthenticated: false,
	user: null,
};

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		default:
			return state;
	}
};

const AuthProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, initialState);

	// Get the authentication state from local storage on component mount
	useEffect(() => {
		const storedAuthState = JSON.parse(localStorage.getItem("authState"));
		if (storedAuthState) {
			dispatch({ type: "LOGIN", payload: storedAuthState.user });
		}
	}, []);

	const login = (user) => {
		dispatch({ type: "LOGIN", payload: user });

		// Save the authentication state to local storage
		localStorage.setItem(
			"authState",
			JSON.stringify({ isAuthenticated: true, user })
		);
	};

	const logout = () => {
		dispatch({ type: "LOGOUT" });

		// Remove the authentication state from local storage
		localStorage.removeItem("authState");
	};

	return (
		<AuthContext.Provider value={{ authState, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuth };
