import React, { useState } from "react";
import DoctorLogin from "../components/doctor/DoctorLogin";
import PatientLogin from "../components/patient/PatientLogin";

function Login() {
	const [activeTab, setActiveTab] = useState("doctor");

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-10">
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

				{activeTab === "doctor" ? <DoctorLogin /> : <PatientLogin />}
			</div>
		</div>
	);
}

export default Login;
