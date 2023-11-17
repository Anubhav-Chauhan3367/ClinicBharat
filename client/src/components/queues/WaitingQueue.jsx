import React, { useState, useEffect } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import QueueCard from "./QueueCard";
import socketIOClient from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

import "react-vertical-timeline-component/style.min.css";

import { textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";

const WaitingQueue = () => {
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true); // Added loading state
	const { authState } = useAuth();
	const yourAuthToken = authState.user.jwtToken;

	const fetchInitialData = async () => {
		try {
			const response = await fetch(
				"http://localhost:3001/appointments/waiting-doctor",
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

		socket.on("appointmentUpdate", ({ updatedAppointment, queueType }) => {
			if (queueType === "waiting") {
				setAppointments((prevAppointments) =>
					prevAppointments.map((appointment) =>
						appointment._id === updatedAppointment._id
							? updatedAppointment
							: appointment
					)
				);
			}
		});

		socket.on("newAppointment", ({ newAppointment, queueType }) => {
			// console.log("newAppointment", newAppointment);
			if (queueType === "waiting") {
				setAppointments((prevAppointments) => {
					return [...prevAppointments, newAppointment];
				});
			}
		});

		socket.on(
			"appointmentCancelled",
			({ cancelledAppointmentId, queueType }) => {
				if (queueType === "waiting") {
					setAppointments((prevAppointments) =>
						prevAppointments.filter(
							(appointment) =>
								appointment._id !== cancelledAppointmentId
						)
					);
				}
			}
		);

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

			<div className="mt-20 flex rounded-md bg-purple-300 flex-col">
				{appointments.length === 0 ? (
					<div className="p-20 font-bold text-xl">
						No appointments are booked yet.
					</div>
				) : (
					<VerticalTimeline>
						{appointments.map((appointment) => (
							<QueueCard
								key={Math.random()}
								// appointment.patient._id
								appointment={appointment}
							/>
						))}
					</VerticalTimeline>
				)}
			</div>
		</>
	);
};

export default SectionWrapper(WaitingQueue, "waitingQueue");
