import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MainQueue from "../queues/MainQueue";
import DoctorTarget from "../doctor/DoctorTarget";
import WaitingQueue from "../queues/WaitingQueue";
import TabButtons from "../common/TabButtons";

const DoctorDashboard = () => {
	const { authState } = useAuth();
	const user = authState.user;

	const [activeTab, setActiveTab] = useState("MainQueue");
	console.log("activeTab", activeTab);
	return (
		<div className="grid grid-flow-dense">
			<div className="min-h-screen">
				<h1 className="text-3xl text-blue-800 font-semibold mt-8 mb-10">
					Dashboard
				</h1>
				<h3 className="text-6xl font-semibold mb-2 relative inline-block">
					<span className="bg-gradient-to-r from-blue-500 to-purple-500 via-green-500 text-transparent bg-clip-text">
						Welcome Dr., {user.username}
					</span>
				</h3>
				<DoctorTarget />
			</div>
			<div id="queue" className="min-h-screen">
				<TabButtons
					activeTab={activeTab}
					onTabChange={(tab) => setActiveTab(tab)}
					opt1="MainQueue"
					opt2="WaitingQueue"
				/>

				{/* Conditional rendering based on the active tab */}
				{activeTab === "MainQueue" && <MainQueue />}
				{activeTab === "WaitingQueue" && <WaitingQueue />}
			</div>
		</div>
	);
};

export default DoctorDashboard;
