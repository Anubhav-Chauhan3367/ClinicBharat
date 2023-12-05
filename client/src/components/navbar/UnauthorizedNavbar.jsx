import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedNavbar = () => {
	return (
		<nav className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4 ml-20">
					<Link to="/">
						<img src="/logo.png" alt="Logo" className="h-12" />
					</Link>
				</div>
				<div className="flex items-center space-x-4 mr-20">
					<Link
						to="/login"
						className="text-blue-800 font-medium border-spacing-4 hover:border-2 p-2 border-blue-800 focus:underline  focus:text-cyan-500 focus:decoration-solid focus:decoration-blue-800 focus-underline-offset-4 focus:decoration-2"
					>
						Login
					</Link>
					<Link
						to="/register"
						className="text-blue-800 font-medium hover:border-2 p-2 border-blue-800 focus:underline focus:text-cyan-500 focus:decoration-solid focus:decoration-blue-800 focus-underline-offset-4 focus:decoration-2"
					>
						Register
					</Link>
				</div>
			</div>
		</nav>
	);
};
export default UnauthorizedNavbar;
