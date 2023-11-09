import React from "react";
import { useAuth } from "../context/AuthContext";
import DoctorDashboard from "../components/dashboard/DoctorDashboard";
import PatientDashboard from "../components/dashboard/PatientDashboard";

function Dashboard() {
	const { authState } = useAuth();
	console.log(authState);

	return (
		<div className="min-h-screen flex justify-center text-center">
			{authState.user ? (
				<div>
					{authState.user.role === "doctor" ? (
						<DoctorDashboard />
					) : authState.user.role === "patient" ? (
						<PatientDashboard />
					) : null}
				</div>
			) : (
				<p>
					You are not logged in. Please log in to access the
					dashboard.
				</p>
			)}
		</div>
	);
}

export default Dashboard;
