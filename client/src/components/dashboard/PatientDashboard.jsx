import React from "react";
import Tile from "../common/Tile";
import { useAuth } from "../../context/AuthContext";

const PatientDashboard = () => {
	const { authState } = useAuth();
	const user = authState.user;
	const nearbyDoctors = [{ name: "Dr. John Doe" }, { name: "Dr. Jane Doe" }];
	const list = { role: user.role, items: nearbyDoctors };
	return (
		<div>
			<h1 className="text-3xl font-semibold mb-4">Patient Dashboard</h1>
			<h3 className="text-2xl font-semibold mb-2">
				Choose from the best Doctors Nearby
			</h3>
			<h3 className="text-xl font-medium mb-2">Find Nearby Doctors:</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Tile list={list} />
			</div>
		</div>
	);
};

export default PatientDashboard;
