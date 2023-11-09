import React, { useState } from "react";

const Tile = ({ list }) => {
	const [expanded, setExpanded] = useState(false);
	const [zoomed, setZoomed] = useState(false);
	const items = list.items;
	console.log(expanded);
	const toggleZoom = () => {
		// Zoom in on the image
		setZoomed(!zoomed);
	};
	const toggleExpansion = () => {
		setExpanded(!expanded);
	};

	return (
		<div className="relative rounded-lg bg-white shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer ">
			<div
				className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden"
				onMouseEnter={toggleZoom}
				onMouseLeave={toggleZoom}
				onClick={() => toggleExpansion()}
			>
				{/* Display a thumbnail or image here */}
				<div
					className="w-full h-full bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: "url(https://picsum.photos/200)",
					}}
				></div>
			</div>
			<div>
				{expanded && (
					<div className="mt-4">
						<ul className="mt-2">
							{items.map((item, index) => (
								<li key={index}>{item.name}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Tile;
