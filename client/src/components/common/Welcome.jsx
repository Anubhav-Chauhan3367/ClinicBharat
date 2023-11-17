import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { textVariant } from "../../utils/motion";
import SectionWrapper from "../../hoc/SectionWrapper";

const Welcome = () => {
	return (
		<div className="p-20">
			<motion.div variants={textVariant}>
				<h1 className="text-3xl font-bold mb-20 text-blue-700">
					Welcome to Clinic Care
				</h1>
			</motion.div>
			<h2 className="text-lg text-gray-600 mb-16">
				Your Health, Our Priority
			</h2>
			<h2 className="text-lg text-gray-600 mb-10 text-green-500">
				No More Waiting in Long Queues
			</h2>
			<p className="text-base text-gray-700 mb-6">
				At Clinic Care, we are committed to providing the best
				healthcare experience for our patients. From booking
				appointments to managing your health records, we're here to
				assist you.
			</p>
			<Link to="/register">
				<button className="bg-blue-500 text-white px-4 py-2 rounded-md">
					Get Started
				</button>
			</Link>
		</div>
	);
};

export default SectionWrapper(Welcome, "welcome");
