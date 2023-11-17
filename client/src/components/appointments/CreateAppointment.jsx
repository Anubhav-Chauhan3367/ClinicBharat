import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CreateAppointment = () => {
	const { authState } = useAuth();
	const [formData, setFormData] = useState({
		patient: `${authState.user._id}`,
		doctor: "",
		booking_time: "",
		appointment_date: "",
		status: "scheduled", // Default status
		notes: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3001/appointments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authState.user.jwtToken}`,
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				navigate("/");
			} else {
				// Handle errors or display an error message to the user
			}
		} catch (error) {
			console.error("Error creating appointment:", error);
		}
	};

	return (
		<div className="w-[100%] bg-purple-300 rounded-lg pt-4 text-blue-900 mx-auto">
			<h1 className="text-2xl text-center mb-4">Create an Appointment</h1>
			<form
				onSubmit={handleSubmit}
				className=" shadow-md  px-8 pt-6 pb-8 mb-4"
			>
				<div className="mb-4">
					<label
						className="block text-blue-900 text-sm font-bold mb-2"
						htmlFor="doctor"
					>
						Doctor ID
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						name="doctor"
						value={formData.doctor}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-blue-900 text-sm font-bold mb-2"
						htmlFor="booking_time"
					>
						Booking Time
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
						type="datetime-local"
						name="booking_time"
						value={formData.booking_time}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-blue-900 text-sm font-bold mb-2"
						htmlFor="appointment_date"
					>
						Appointment Date
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
						type="datetime-local"
						name="appointment_date"
						value={formData.appointment_date}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-blue-900 text-sm font-bold mb-2"
						htmlFor="status"
					>
						Status
					</label>
					<div className="flex items-center">
						<input
							type="radio"
							name="status"
							value="scheduled"
							checked={formData.status === "scheduled"}
							onChange={handleChange}
						/>
						<label className="ml-2 mr-4">Scheduled</label>

						<input
							type="radio"
							name="status"
							value="late"
							checked={formData.status === "late"}
							disabled
						/>
						<label className="ml-2 mr-4">Late</label>

						<input
							type="radio"
							name="status"
							value="completed"
							checked={formData.status === "completed"}
							disabled
						/>
						<label className="ml-2">Completed</label>
					</div>
				</div>
				<div className="mb-6">
					<label
						className="block text-blue-900 text-sm font-bold mb-2"
						htmlFor="notes"
					>
						Notes
					</label>
					<textarea
						className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:shadow-outline"
						name="notes"
						value={formData.notes}
						onChange={handleChange}
					/>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Create Appointment
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateAppointment;
