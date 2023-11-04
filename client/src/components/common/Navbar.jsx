import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logout from "./Logout";

function Navbar() {
	const { user } = useAuth();

	return (
		<nav className="bg-blue-500 p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Link to="/" className="text-white font-bold text-lg">
						Your App
					</Link>
					{/* Add more navigation links or buttons here */}
				</div>
				<div className="flex items-center space-x-4">
					{user ? (
						// User is logged in, show the Logout component
						<Logout />
					) : (
						// User is not logged in, show login and register buttons
						<>
							<Link
								to="/login"
								className="text-white font-medium hover:underline"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="text-white font-medium hover:underline"
							>
								Register
							</Link>
						</>
					)}
				</div>
			</div>
			{user && (
				<div className="text-white font-medium">
					{user.payload.role === "doctor" ? (
						<p>Welcome Doctor {user.payload.name}</p>
					) : user.payload.role === "patient" ? (
						<p>
							Rest up and feel better soon, {user.payload.name}!
						</p>
					) : null}
				</div>
			)}
		</nav>
	);
}

export default Navbar;
