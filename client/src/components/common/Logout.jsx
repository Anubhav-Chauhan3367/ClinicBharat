import React from "react";
import { useAuth } from "../../context/AuthContext";

function Logout() {
	const { user, logout } = useAuth();

	const handleLogout = () => {
		// Call the logout function from your global authentication context
		logout();
	};

	return (
		<div>
			{user && (
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
