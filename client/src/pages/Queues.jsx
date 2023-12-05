// Queues.jsx
import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppointmentPool from "../components/appointments/AppointmentPool";
import QueuePool from "../components/queues/QueuePool";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Queues = () => {
	const [appointmentPool, setAppointmentPool] = useState([]);
	const [queues, setQueues] = useState([]);
	const { authState } = useAuth(); // Get the auth token from the useAuth()
	console.log("authState:", authState);
	const yourAuthToken = authState.user.jwtToken;

	// Function to fetch appointments from the backend
	const fetchAppointments = async () => {
		try {
			const response = await fetch(
				"http://localhost:3001/appointments/doctor",
				{
					headers: {
						Authorization: `Bearer ${yourAuthToken}`,
						// Other headers if needed
					},
				}
			);
			const data = await response.json();
			console.log("Appointments:", data);
			setAppointmentPool(data);
		} catch (error) {
			console.error("Error fetching appointments:", error);
		}
	};

	// Fetch appointments when the component mounts
	useEffect(() => {
		fetchAppointments();
	}, []); // Empty dependency array means this effect runs once when the component mounts

	const addAppointmentToQueue = (queueId, appointment) => {
		const updatedQueues = queues.map((queue) =>
			queue.id === queueId
				? {
						...queue,
						appointments: [...queue.appointments, appointment],
				  }
				: queue
		);
		setQueues(updatedQueues);
	};

	const createQueue = (name) => {
		const newQueue = { id: Date.now(), name, appointments: [] };
		setQueues([...queues, newQueue]);
	};

	const removeAppointmentFromPool = (appointmentId) => {
		const updatedPool = appointmentPool.filter(
			(appointment) => appointment.id !== appointmentId
		);
		setAppointmentPool(updatedPool);
	};

	const moveAppointmentWithinQueue = (queueId, dragIndex, hoverIndex) => {
		const updatedQueues = queues.map((queue) =>
			queue.id === queueId
				? {
						...queue,
						appointments: arrayMove(
							queue.appointments,
							dragIndex,
							hoverIndex
						),
				  }
				: queue
		);
		setQueues(updatedQueues);
	};

	const arrayMove = (array, from, to) => {
		const newArray = [...array];
		newArray.splice(
			to < 0 ? newArray.length + to : to,
			0,
			newArray.splice(from, 1)[0]
		);
		return newArray;
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="min-h-screen flex gap-2 p-20 justify-around">
				<QueuePool />
				<AppointmentPool
					appointments={appointmentPool}
					onAddAppointmentToQueue={addAppointmentToQueue}
					onRemoveAppointmentFromPool={removeAppointmentFromPool}
				/>
			</div>
		</DndProvider>
	);
};

export default Queues;
