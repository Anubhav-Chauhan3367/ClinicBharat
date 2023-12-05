import React from "react";
import { Link } from "react-router-dom";
import Logout from "../auth/logout/Logout";
import "../../tailwind.css";

function Navbar() {
	return (
		<nav className=" p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4 ml-20">
					<Link to="/">
						<img src="/logo.png" alt="Logo" className="h-12" />
					</Link>
				</div>
				<div className="flex items-center space-x-4 mr-20">
					<Link
						to="/"
						className="text-blue-800 font-medium border-spacing-4 hover:border-2 p-2 border-blue-800 focus:underline  focus:text-cyan-500 focus:decoration-solid focus:decoration-blue-800 focus-underline-offset-4 focus:decoration-2"
					>
						Dashboard
					</Link>
					<Link
						to="/clinics"
						className="text-blue-800 font-medium border-spacing-4 hover:border-2 p-2 border-blue-800 focus:underline  focus:text-cyan-500 focus:decoration-solid focus:decoration-blue-800 focus-underline-offset-4 focus:decoration-2"
					>
						Clinics
					</Link>
					<Link
						to="/queues"
						className="text-blue-800 font-medium border-spacing-4 hover:border-2 p-2 border-blue-800 focus:underline  focus:text-cyan-500 focus:decoration-solid focus:decoration-blue-800 focus-underline-offset-4 focus:decoration-2"
					>
						Queues
					</Link>
					{/* Add more navigation links or buttons here */}
					<Logout />
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
