import React from "react";
import { useAuth } from "../../../context/AuthContext";

function Logout() {
	console.log("Logout");
	const { authState, logout } = useAuth();

	// console.log(authState.user.jwtToken + " " + authState.user.role);
	const handleLogout = async () => {
		console.log("handleLogout");
		// Call the logout function from your global authentication context
		if (authState.user.role === "patient") {
			console.log("patient");
			try {
				// Make an HTTP request to your backend's /logout route using fetch
				const response = await fetch(
					"http://localhost:3001/patient/logout",
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${authState.user.jwtToken}`, // Set the token in the Authorization header
						},
					}
				);

				if (response.ok) {
					// After a successful response, call the logout function from your global authentication context

					// console.log(response);
					logout();
				} else {
					// Handle logout failure
					console.error("Logout failed:", response.status);
				}
			} catch (error) {
				console.error("Logout failed:", error);
			}
		} else {
			// console.log("doctor");
			try {
				// Make an HTTP request to your backend's /logout route using fetch
				const response = await fetch(
					"http://localhost:3001/doctor/logout",
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${authState.user.jwtToken}`, // Set the token in the Authorization header
						},
					}
				);

				if (response.ok) {
					// After a successful response, call the logout function from your global authentication context
					logout();
				} else {
					// Handle logout failure
					console.error("Logout failed:", response.status);
				}
			} catch (error) {
				console.error("Logout failed:", error);
			}
		}
	};

	return (
		<div>
			{authState.user && (
				<button
					onClick={handleLogout}
					className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
				>
					Logout
				</button>
			)}
		</div>
	);
}

export default Logout;
