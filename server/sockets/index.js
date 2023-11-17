// sockets/index.js
let io;

module.exports = {
	init: (server) => {
		io = require("socket.io")(server);

		io.on("error", (error) => {
			console.error("Socket.IO Error:", error);
		});

		return io;
	},
	getIO: () => {
		if (!io) {
			throw new Error("Socket.IO not initialized");
		}

		return io;
	},
};
