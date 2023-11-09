import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import AppointmentCard from "./AppointmentCard";

import "react-vertical-timeline-component/style.min.css";

import { textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";

const Appointments = () => {
	const appointments = [
		{ name: "John Doe" },
		{ name: "Jane Doe" },
		{ name: "John Smith" },
		{ name: "Jane Smith" },
	];

	return (
		<>
			<motion.div variants={textVariant()}>
				<h3 className="text-2xl font-medium mb-2">
					Your Upcoming Appointments:
				</h3>
			</motion.div>

			<div className="mt-20 flex flex-col">
				<VerticalTimeline>
					{appointments.map((appointment, index) => (
						<AppointmentCard
							key={Math.random() * 1000}
							appointment={appointment}
						/>
					))}
				</VerticalTimeline>
			</div>
		</>
	);
};

export default SectionWrapper(Appointments, "appointments");
