import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { useAuth } from "../../context/AuthContext";

const QueueCard = ({ appointment }) => {
	const appointmentDate = new Date(appointment.appointment_date);
	const { authState } = useAuth();
	const yourAuthToken = authState.user.jwtToken;

	const formattedDate = appointmentDate.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const formattedTime = appointmentDate.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
	});

	const handleAction = async (action) => {
		// Perform the action based on the button clicked
		switch (action) {
			case "late":
				// Code to handle marking as late
				break;
			case "cancel":
				// Send a request to cancel the appointment
				const response = await fetch(
					`localhost:3001/appointments/${appointment._id}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${yourAuthToken}`,
						},
					}
				);

				if (response.ok) {
					// Handle successful cancellation
					appointment.status = "cancelled";
					console.log("Appointment cancelled successfully");
				} else {
					// Handle error in cancellation
					console.error("Failed to cancel appointment");
				}
				break;
			case "completed":
				// Code to handle marking as completed
				break;
			default:
				break;
		}
	};

	return (
		<VerticalTimelineElement
			contentStyle={{
				background:
					appointment.status === "cancelled" ? "#FFD699" : "#1d1836",
				color: "#fff",
			}}
			contentArrowStyle={{ borderRight: "7px solid  #232631" }}
		>
			<div>
				<h3 className="text-white text-[24px] font-bold">
					Patient's Name:
					<span className="text-green-200">
						{` ${appointment.patient.username}`}
					</span>
				</h3>

				<p className="text-secondary text-[16px] font-semibold">
					{formattedDate} at {formattedTime}
				</p>
				<p className="text-secondary text-[16px] font-semibold">
					{appointment.status}
				</p>
				<div className="flex flex-col lg:flex-row gap-4 mt-3 lg:justify-between">
					<button
						className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700 text-white px-4 py-2 rounded-md transition duration-300"
						onClick={() => handleAction("late")}
					>
						Mark as Late
					</button>
					<button
						className="bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-700 text-white px-4 py-2 rounded-md mt-2 lg:mt-0 transition duration-300"
						onClick={() => handleAction("cancel")}
					>
						Cancel
					</button>
					<button
						className="bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700 text-white px-4 py-2 rounded-md mt-2 lg:mt-0 transition duration-300"
						onClick={() => handleAction("completed")}
					>
						Completed
					</button>
				</div>
			</div>
		</VerticalTimelineElement>
	);
};

export default QueueCard;
