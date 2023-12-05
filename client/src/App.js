import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Verification from "./pages/Verification";
import Clinics from "./pages/Clinics";
import Queues from "./pages/Queues";

function AppRouter() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/verify" element={<Verification />} />
				<Route path="/clinics" element={<Clinics />} />
				<Route path="/queues" element={<Queues />} />
				<Route
					path="*"
					element={
						<div className="min-h-screen flex align-middle justify-center">
							<h1 className="mt-56 text-red-500 font-semibold text-xl">
								404 Not Found
							</h1>
						</div>
					}
				/>
			</Routes>
			<Footer />
		</Router>
	);
}

export default AppRouter;
