import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../../context/AuthContext";

const DoctorTargetForm = ({
	onSubmit,
	onCancel,
	initialValues = {
		mainQueueLimit: 20,
		waitingQueueLimit: 30,
		averageTimePerPatient: 15,
	},
}) => {
	const [mainQueueLimit, setMainQueueLimit] = useState(
		initialValues.mainQueueLimit
	);
	const [waitingQueueLimit, setWaitingQueueLimit] = useState(
		initialValues.waitingQueueLimit
	);
	const [averageTimePerPatient, setAverageTimePerPatient] = useState(
		initialValues.averageTimePerPatient
	);

	const { authState } = useAuth();
	const yourAuthToken = authState.user.jwtToken;

	const handleCancel = () => {
		// Handle cancel action
		onCancel();
	};

	const handleSubmit = async () => {
		try {
			// Validate and submit the form
			const formData = {
				mainQueueLimit,
				waitingQueueLimit,
				averageTimePerPatient,
			};

			// Use the fetch API to submit the form data
			const response = await fetch(
				"http://localhost:3001/doctor/set-target",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${yourAuthToken}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to submit form data");
			}

			// Call the onSubmit function to handle the submission
			onSubmit(formData);
		} catch (error) {
			console.error("Error submitting form data:", error);
		}
	};

	return (
		<div
			className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center"
			onClick={handleCancel}
		>
			<motion.div
				className="bg-white p-8 rounded-lg w-96"
				initial={{ opacity: 0, scale: 0.4 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				onClick={(e) => e.stopPropagation()} // Prevent form click from triggering backdrop click
			>
				<h2 className="text-xl font-semibold mb-4">Set Targets</h2>

				{/* Main Queue Limit */}

				<div className="mb-4">
					<label
						htmlFor="mainQueueLimit"
						className="block text-sm font-medium text-gray-700"
					>
						Main Queue Limit
					</label>
					<input
						type="number"
						id="mainQueueLimit"
						className="mt-1 p-2 border rounded-md w-full"
						value={mainQueueLimit}
						onChange={(e) => setMainQueueLimit(e.target.value)}
					/>
				</div>

				{/* Waiting Queue Limit */}
				<div className="mb-4">
					<label
						htmlFor="waitingQueueLimit"
						className="block text-sm font-medium text-gray-700"
					>
						Waiting Queue Limit
					</label>
					<input
						type="number"
						id="waitingQueueLimit"
						className="mt-1 p-2 border rounded-md w-full"
						value={waitingQueueLimit}
						onChange={(e) => setWaitingQueueLimit(e.target.value)}
					/>
				</div>

				{/* Average Time Per Patient */}
				<div className="mb-6">
					<label
						htmlFor="averageTimePerPatient"
						className="block text-sm font-medium text-gray-700"
					>
						Average Time Per Patient (minutes)
					</label>
					<input
						type="number"
						id="averageTimePerPatient"
						className="mt-1 p-2 border rounded-md w-full"
						value={averageTimePerPatient}
						onChange={(e) =>
							setAverageTimePerPatient(e.target.value)
						}
					/>
				</div>

				{/* Buttons */}
				<div className="flex justify-end">
					<button
						className="mr-2 bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button
						className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default DoctorTargetForm;
