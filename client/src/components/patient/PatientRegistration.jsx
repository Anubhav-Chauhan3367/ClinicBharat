import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientRegistration() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const navigate = useNavigate();

	const handleRegistration = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:3001/patient/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, email, password, phone }),
				}
			);

			if (response.ok) {
				// Successful registration, update the authentication state
				navigate("/login");
			} else {
				// Handle registration errors, e.g., show an error message
				console.error("Registration failed");
			}
		} catch (error) {
			// Handle network or other errors
			console.error(error);
		}
	};

	return (
		<div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4">Patient Registration</h2>
			<form onSubmit={handleRegistration}>
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-600"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="mt-1 p-2 w-full border rounded-md"
						required
					/>
				</div>
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
				<div className="mb-4">
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-600"
					>
						Phone
					</label>
					<input
						type="number"
						id="phone"
						name="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="mt-1 p-2 w-full border rounded-md"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full"
				>
					Register
				</button>
			</form>
		</div>
	);
}

export default PatientRegistration;
