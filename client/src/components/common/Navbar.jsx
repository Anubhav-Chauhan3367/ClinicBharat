import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logout from "./Logout";
import "../../tailwind.css";

function Navbar() {
	const { authState } = useAuth();

	return (
		<nav className=" p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4 ml-20">
					<Link to="/">
						<img src="/logo.png" alt="Logo" className="h-20 w-80" />
					</Link>
					{/* Add more navigation links or buttons here */}
				</div>
				<div className="flex items-center space-x-4 mr-20">
					{authState.user ? (
						// User is logged in, show the Logout component
						<Logout />
					) : (
						// User is not logged in, show login and register buttons
						<>
							<Link
								to="/login"
								className="text-blue-800 font-medium hover:border-4 p-3 border-blue-800 focus:bg-blue-500 focus:text-white focus:border-2"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="text-blue-800 font-medium hover:border-4 p-3 border-blue-800 focus:bg-blue-500 focus:text-white focus:border-2"
							>
								Register
							</Link>
						</>
					)}
				</div>
			</div>
			{/* {authState.user && (
				<div className="text-white font-medium">
					{authState.user.role === "doctor" ? (
						<p>Welcome Doctor {authState.user.username}</p>
					) : authState.user.role === "patient" ? (
						<p>
							Rest up and feel better soon,{" "}
							{authState.user.username}!
						</p>
					) : null}
				</div>
			)} */}
		</nav>
	);
}

export default Navbar;
