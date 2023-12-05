import React from "react";
import { useDrag } from "react-dnd";
import AppointmentCard from "./AppointmentCard"; // Import the new AppointmentCard component

const DraggableAppointment = ({ appointment, onAddAppointmentToQueue }) => {
	const [{ isDragging }, drag] = useDrag({
		type: "APPOINTMENT",
		item: {
			type: "APPOINTMENT",
			id: appointment.id,
		},
	});

	const [isHovered, setIsHovered] = React.useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div
			ref={drag}
			className="relative mb-4"
			style={{ opacity: isDragging ? 0.5 : 1 }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Compact preview */}
			<div
				className={`bg-white p-4 border rounded shadow-md transition duration-300 cursor-pointer`}
			>
				<span className="text-lg font-medium">
					{appointment.patient.username}
				</span>
				{/* Add date, time, and status here */}
			</div>

			{/* "View Details" text */}
			<div
				className={`text-blue-500 cursor-pointer ${
					isHovered ? "block" : "hidden"
				}`}
			>
				View Details
			</div>

			{/* Detailed view when hovered */}
			{isHovered && (
				<div className="bg-white p-4 border rounded shadow-md hover:bg-blue-100 transition duration-300 cursor-pointer">
					<span className="text-lg font-medium">
						{appointment.name}
					</span>
					{/* Show the AppointmentCard when hovered */}
					<AppointmentCard
						appointment={appointment}
						onAddAppointmentToQueue={onAddAppointmentToQueue}
					/>
				</div>
			)}
		</div>
	);
};

const AppointmentPool = ({
	appointments,
	onAddAppointmentToQueue,
	onRemoveAppointmentFromPool,
}) => {
	return (
		<div className="bg-gray-100 p-4 rounded shadow-md w-1/2 flex-col items-center justify-between mb-4">
			<h2 className="text-2xl font-semibold mb-4">Appointment Pool</h2>
			<div className="grid grid-cols-1 gap-4 h-96 overflow-y-auto">
				{appointments.map((appointment) => (
					<DraggableAppointment
						key={appointment.id}
						appointment={appointment}
						onAddAppointmentToQueue={onAddAppointmentToQueue}
					/>
				))}
			</div>
		</div>
	);
};

export default AppointmentPool;
