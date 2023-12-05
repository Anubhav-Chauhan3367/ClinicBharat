// QueuePool.jsx
import React, { useState } from "react";
import Queue from "./Queue"; // Import your Queue component
import { useDrop } from "react-dnd";

const QueuePool = ({ onAddQueue, onDeleteQueue, onAddAppointmentToQueue }) => {
	const [queues, setQueues] = useState([]);
	const [newQueueName, setNewQueueName] = useState("");

	const [, drop] = useDrop({
		accept: "APPOINTMENT",
		drop: (item, monitor) => {
			const didDrop = monitor.didDrop();
			if (didDrop) {
				return;
			}

			const { queueId } = item;
			const updatedQueues = queues.map((queue) =>
				queue.id === queueId
					? {
							...queue,
							appointments: [...queue.appointments, null], // Add an empty entry
					  }
					: queue
			);
			setQueues(updatedQueues);
		},
	});

	const handleAddQueue = () => {
		const newQueue = {
			id: Date.now(),
			name:
				newQueueName.trim() !== ""
					? newQueueName
					: `Queue ${queues.length + 1}`,
			appointments: [null], // Initial empty entry
		};
		setQueues([...queues, newQueue]);
		onAddQueue(newQueue);
		setNewQueueName(""); // Clear the input field
	};

	const handleDeleteQueue = (queueId) => {
		const updatedQueues = queues.filter((queue) => queue.id !== queueId);
		setQueues(updatedQueues);
		onDeleteQueue(queueId);
	};

	const handleAddAppointment = (queueId, appointment) => {
		const updatedQueues = queues.map((queue) =>
			queue.id === queueId
				? {
						...queue,
						appointments: [...queue.appointments, appointment],
				  }
				: queue
		);
		setQueues(updatedQueues);
		onAddAppointmentToQueue(queueId, appointment);
	};

	return (
		<div className="bg-gray-100 p-4 rounded shadow-md w-1/2 flex-col items-center justify-between mb-4">
			<h2 className="text-2xl font-semibold mb-4">Appointment Pool</h2>
			<div className="flex space-x-4">
				<div className="mb-4 flex items-center">
					<input
						type="text"
						className="border rounded px-2 py-1 mr-2 focus:outline-none focus:ring focus:border-blue-300"
						placeholder="New Queue Name"
						value={newQueueName}
						onChange={(e) => setNewQueueName(e.target.value)}
					/>
					<button
						className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 text-white py-2 px-4 rounded"
						onClick={handleAddQueue}
					>
						Create New Queue
					</button>
				</div>
			</div>
			<div ref={drop} className="flex flex-col space-y-4">
				{queues.map((queue) => (
					<Queue
						key={queue.id}
						queue={queue}
						onAddAppointment={(appointment) =>
							handleAddAppointment(queue.id, appointment)
						}
					/>
				))}
			</div>
		</div>
	);
};

export default QueuePool;
