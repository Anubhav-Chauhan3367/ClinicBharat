import React, { useState } from "react";
// import EmailVerification from "../components/common/EmailVerification";
import SMSVerification from "../components/common/SmsVerification";
// import TabButtons from "../components/common/TabButtons"; // Import the TabButtons component

function VerificationTabs() {
	// const [activeTab, setActiveTab] = useState("email");

	// const handleTabChange = (tab) => {
	// 	setActiveTab(tab);
	// };

	return (
		<div className="min-h-screen flex items-center justify-center p-10">
			<div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4">Verify Phone.</h2>
				<SMSVerification />
				{/* <TabButtons
					activeTab={activeTab}
					onTabChange={handleTabChange}
					opt1="Email"
					opt2="SMS"
				/>
				{activeTab === "Email" ? (
					<EmailVerification />
				) : (
					<SMSVerification />
				)} */}
			</div>
		</div>
	);
}

export default VerificationTabs;
