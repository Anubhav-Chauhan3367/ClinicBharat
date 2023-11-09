import React from "react";
import Tile from "../common/Tile";
import { useAuth } from "../../context/AuthContext";
import Appointments from "../appointments/Appointments";

const DoctorDashboard = () => {
	const { authState } = useAuth();
	const user = authState.user;
	const list = {
		title: "tile",
		items: [
			{ name: "Dr. John Doe" },
			{ name: "Mr. John Snow" },
			{ name: "Matthew Murdock" },
		],
	};
	return (
		<div className="grid grid-flow-dense">
			<div className="min-h-screen">
				<h1 className="text-3xl text-blue-800 font-semibold mt-8 mb-10">
					Dashboard
				</h1>
				<h3 className="text-6xl font-semibold mb-2 relative inline-block">
					<span className="bg-gradient-to-r from-blue-500 to-purple-500 via-green-500 text-transparent bg-clip-text">
						Welcome, {user.username}
					</span>
				</h3>
				{/* <div className="mt-20 bg-white grid grid-cols-4 gap-4">
					<Tile list={list}></Tile>
					<Tile list={list}></Tile>
					<Tile list={list}></Tile>
					<Tile list={list}></Tile>
				</div> */}
			</div>

			<div>
				<Appointments />
			</div>
		</div>
	);
};

export default DoctorDashboard;
