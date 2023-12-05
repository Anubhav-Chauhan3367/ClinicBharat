// Queue.js
import React from "react";
import { useDrop } from "react-dnd";
import Appointment from "../appointments/Appointment";

const Queue = ({ queue, onMoveAppointment }) => {
	const [, drop] = useDrop({
		accept: "APPOINTMENT",
		drop: (item) =>
			onMoveAppointment(queue.id, item.index, queue.appointments.length),
	});

	return (
		<div
			style={{
				border: "1px solid black",
				padding: "10px",
				margin: "10px",
			}}
			ref={drop}
		>
			<h3>{queue.name}</h3>
			{queue.appointments.map((appointment, index) => (
				<Appointment
					key={appointment.id}
					appointment={appointment}
					index={index}
				/>
			))}
		</div>
	);
};

export default Queue;
