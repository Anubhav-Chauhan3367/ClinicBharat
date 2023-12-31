import React, { useState, useEffect } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import AppointmentCard from "./AppointmentCard";
import socketIOClient from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

import "react-vertical-timeline-component/style.min.css";

import { textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";

const Appointments = ({ updateStats }) => {
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true); // Added loading state
	const { authState } = useAuth();
	const yourAuthToken = authState.user.jwtToken;

	const calculateStats = () => {
		const currentQueueSize = appointments.length; // Calculate current queue size
		const waitingQueueSize = 0; // Placeholder value for waiting queue size
		const avgWaitingTime = "15 mins"; // Placeholder value for average waiting time
		console.log(
			"currentQueueSize",
			currentQueueSize,
			waitingQueueSize,
			avgWaitingTime
		);
		// Call the updateStats function with calculated stats
		updateStats({
			currentQueueSize,
			waitingQueueSize,
			avgWaitingTime,
		});
	};

	const fetchInitialData = async () => {
		try {
			const response = await fetch(
				"http://localhost:3001/appointments/doctor",
				{
					headers: {
						Authorization: `Bearer ${yourAuthToken}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch appointments");
			}

			const data = await response.json();
			setAppointments(data);
			calculateStats(); // Calculate stats on initial data fetch
		} catch (error) {
			console.error("Error fetching initial data:", error);
		} finally {
			setLoading(false); // Set loading to false after data is fetched
		}
	};

	const setupSocket = () => {
		const socket = socketIOClient("http://localhost:3001/appointments", {
			headers: {
				Authorization: `Bearer ${yourAuthToken}`,
			},
			transports: ["websocket"],
		});

		socket.on("appointmentUpdate", (updatedAppointment) => {
			setAppointments((prevAppointments) =>
				prevAppointments.map((appointment) =>
					appointment._id === updatedAppointment._id
						? updatedAppointment
						: appointment
				)
			);
			calculateStats(); // Recalculate stats on appointment update
		});

		socket.on("newAppointment", (newAppointment) => {
			// console.log("newAppointment", newAppointment);
			setAppointments((prevAppointments) => {
				return [...prevAppointments, newAppointment];
			});
			calculateStats(); // Recalculate stats on new appointment
		});

		socket.on("appointmentCancelled", (cancelledAppointmentId) => {
			setAppointments((prevAppointments) =>
				prevAppointments.filter(
					(appointment) => appointment._id !== cancelledAppointmentId
				)
			);
			calculateStats(); // Recalculate stats on appointment cancellation
		});

		socket.on("connect_error", (error) => {
			console.error("Socket connection error:", error);
		});

		return socket;
	};

	useEffect(() => {
		// Fetch initial data
		fetchInitialData();

		// Setup WebSocket connection
		const socket = setupSocket();

		// Cleanup WebSocket connection on component unmount
		return () => {
			socket.disconnect();
		};
	}, []); // Empty dependency array ensures the effect runs only once

	if (loading) {
		// Render a loading spinner or message
		return <p>Loading...</p>;
	}

	return (
		<>
			<motion.div variants={textVariant()}>
				<h3 className="text-2xl font-medium mb-2">
					Your Upcoming Appointments:
				</h3>
			</motion.div>

			<div className="mt-20 flex bg-purple-300 flex-col">
				<VerticalTimeline>
					{appointments.map((appointment) => (
						<AppointmentCard
							key={appointment._id}
							appointment={appointment}
						/>
					))}
				</VerticalTimeline>
			</div>
		</>
	);
};

export default SectionWrapper(Appointments, "appointments");
