import React from "react";

const DoctorStats = ({
	currentQueueSize,
	waitingQueueSize,
	avgWaitingTime,
}) => {
	// These could be the values fetched from the backend
	// const currentQueueSize = 10;
	// const waitingQueueSize = 5;
	// const avgWaitingTime = "15 mins";
	// Add more fields as per requirement

	return (
		<div className="p-4 bg-white rounded-md shadow-md mt-20">
			<h2 className="text-2xl font-bold mb-4">Doctor Statistics</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="border p-4 rounded-md text-center">
					<h3 className="text-lg font-semibold">
						Current Queue Size
					</h3>
					<p className="text-4xl font-bold text-blue-500">
						{currentQueueSize}
					</p>
				</div>
				<div className="border p-4 rounded-md text-center">
					<h3 className="text-lg font-semibold">
						Waiting Queue Size
					</h3>
					<p className="text-4xl font-bold text-yellow-500">
						{waitingQueueSize}
					</p>
				</div>
				<div className="border p-4 rounded-md text-center">
					<h3 className="text-lg font-semibold">Avg. Waiting Time</h3>
					<p className="text-4xl font-bold text-green-500">
						{avgWaitingTime}
					</p>
				</div>
				{/* Add more similar divs for additional statistics */}
			</div>
		</div>
	);
};

export default DoctorStats;
