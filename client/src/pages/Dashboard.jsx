import React from "react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
	const { user } = useAuth();

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
				{user && user.payload ? (
					<h1 className="text-2xl font-bold">
						{user.payload.role === "doctor"
							? `Welcome Doctor ${user.payload.name}`
							: user.payload.role === "patient"
							? `Rest up and feel better soon, ${user.payload.name}!`
							: null}
					</h1>
				) : (
					<p>
						You are not logged in. Please log in to access the
						dashboard.
					</p>
				)}
			</div>
		</div>
	);
}

export default Dashboard;
