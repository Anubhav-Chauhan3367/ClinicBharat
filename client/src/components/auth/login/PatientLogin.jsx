import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PatientLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:3001/patient/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (response.ok) {
				// Successful login, update the authentication state
				const data = await response.json();
				data.user.role = "patient";
				login(data.user);
				navigate("/");
			} else {
				// Handle login errors, e.g., show an error message
				console.error("Login failed");
			}
		} catch (error) {
			// Handle network or other errors
			console.error(error);
		}
	};

	return (
		<div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4">Patient Login</h2>
			<form onSubmit={handleLogin}>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-600"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mt-1 p-2 w-full border rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-600"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mt-1 p-2 w-full border rounded-md"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default PatientLogin;
