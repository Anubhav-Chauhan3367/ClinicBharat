import React from "react";
import { useAuth } from "../../context/AuthContext";
import DoctorNavbar from "./DoctorNavbar";
import PatientNavbar from "./PatientNavbar";
import "../../tailwind.css";
import UnauthorizedNavbar from "./UnauthorizedNavbar";

function Navbar() {
	const { authState } = useAuth();
	let isDoctor = null;
	let isPatient = null;
	if (authState.user) {
		isDoctor = authState.user.role === "doctor";
		isPatient = authState.user.role === "patient";
	}
	return isDoctor ? (
		<DoctorNavbar />
	) : isPatient ? (
		<PatientNavbar />
	) : (
		<UnauthorizedNavbar />
	);
}

export default Navbar;
