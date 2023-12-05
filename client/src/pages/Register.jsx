import React, { useState } from "react";
import DoctorRegistration from "../components/auth/register/DoctorRegistration";
import PatientRegistration from "../components/auth/register/PatientRegistration";

function Register() {
	const [activeTab, setActiveTab] = useState("doctor");

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
				<div className="flex justify-between mb-4">
					<button
						className={`py-2 px-4 text-gray-600 focus:outline-none ${
							activeTab === "doctor" ? "text-blue-500" : ""
						}`}
						onClick={() => handleTabChange("doctor")}
					>
						Doctor
					</button>
					<button
						className={`py-2 px-4 text-gray-600 focus:outline-none ${
							activeTab === "patient" ? "text-blue-500" : ""
						}`}
						onClick={() => handleTabChange("patient")}
					>
						Patient
					</button>
				</div>

				<div className="registration-form">
					{activeTab === "doctor" ? (
						<DoctorRegistration />
					) : (
						<PatientRegistration />
					)}
				</div>
			</div>
		</div>
	);
}

export default Register;
