import React from "react";

function TabButtons({ activeTab, onTabChange, opt1, opt2 }) {
	return (
		<div className="flex justify-between mb-4 rounded-md">
			<button
				className={`py-2 px-4 text-gray-600 rounded-md focus:outline-none  hover:text-white hover:bg-blue-400 ${
					activeTab === "Email" ? "text-white bg-blue-600" : ""
				}`}
				onClick={() => onTabChange(opt1)}
			>
				{opt1}
			</button>
			<button
				className={`py-2 px-4 text-gray-600 rounded-md focus:outline-none  hover:text-white hover:bg-blue-400 ${
					activeTab === "SMS" ? "text-white bg-blue-600" : ""
				}`}
				onClick={() => onTabChange(opt2)}
			>
				{opt2}
			</button>
		</div>
	);
}

export default TabButtons;
