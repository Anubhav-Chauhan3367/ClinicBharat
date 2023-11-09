import React, { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SMSVerification() {
	const [otp, setOtp] = useState("");
	const { login } = useAuth();
	const [verificationMessage, setVerificationMessage] = useState("");

	const navigate = useNavigate();

	const handleVerification = async () => {
		try {
			// Make an API request to your server to verify the OTP
			const response = await fetch("http://localhost:3001/verify-phone", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ otp }),
			});

			if (response.ok) {
				// OTP verified successfully, update authentication state
				// Successful verification
				setVerificationMessage("Verification successful!");
				// Update the authentication state or perform other actions
				login();
				// Redirect the user to the dashboard or another page
				navigate("/dashboard");
			} else {
				// Handle verification errors, e.g., show an error message
				console.error("Verification failed");
				setVerificationMessage(
					"Verification failed. Please check the OTP."
				);
			}
		} catch (error) {
			// Handle network or other errors
			console.error(error);
			setVerificationMessage("An error occurred. Please try again.");
		}
	};

	return (
		<div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4">SMS Verification</h2>
			<form onSubmit={handleVerification}>
				<div className="mb-4">
					<input
						type="text"
						id="otp"
						name="otp"
						placeholder="Enter OTP"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						className="mt-1 p-2 w-full border rounded-md"
						required
					/>
				</div>
				<button
					type="submit"
					onClick={handleVerification}
					className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4 w-full"
				>
					Verify Phone Number
				</button>
				{verificationMessage && (
					<p className="mt-4 text-center text-green-600">
						{verificationMessage}
					</p>
				)}
			</form>
		</div>
	);
}

export default SMSVerification;
