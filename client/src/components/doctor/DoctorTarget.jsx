import React, { useState } from "react";
import DoctorTargetForm from "./DoctorTargetForm"; // Import the DoctorTarget component

const DoctorTarget = () => {
	const [targetValues, setTargetValues] = useState({
		mainQueueLimit: 20,
		waitingQueueLimit: 30,
		averageTimePerPatient: 15,
	});
	const [showTargetForm, setShowTargetForm] = useState(false);

	const handleShowForm = () => {
		setShowTargetForm(true);
	};

	const handleCloseForm = () => {
		setShowTargetForm(false);
	};

	const handleTargetSubmit = (formData) => {
		// Handle the submission of the form data
		console.log("Form Data:", formData);
		// Update the target values
		setTargetValues(formData);
		// Close the form
		handleCloseForm();
	};

	return (
		<div className="shadow-xl mt-20">
			{/* Today's Target */}
			<div className="bg-white p-6 rounded-lg mb-8">
				<h2 className="text-xl font-semibold mb-4">Today's Target</h2>
				<div className="flex items-center justify-center bg-slate-100 rounded-md p-3 mb-4">
					<div className="mr-8">
						<p className="text-gray-600">Queue Size</p>
						<p className="text-2xl font-bold">
							{targetValues.mainQueueLimit}
						</p>
					</div>
					<div className="mr-8">
						<p className="text-gray-600">Waiting Queue Size</p>
						<p className="text-2xl font-bold">
							{targetValues.waitingQueueLimit}
						</p>
					</div>
					<div>
						<p className="text-gray-600">Average Time</p>
						<p className="text-2xl font-bold">
							{targetValues.averageTimePerPatient} minutes
						</p>
					</div>
				</div>
				<button
					className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
					onClick={handleShowForm}
				>
					Set Target
				</button>
			</div>

			{/* Show DoctorTarget form */}
			{showTargetForm && (
				<DoctorTargetForm
					onSubmit={handleTargetSubmit}
					onCancel={handleCloseForm}
					initialValues={targetValues}
				/>
			)}
		</div>
	);
};

export default DoctorTarget;
