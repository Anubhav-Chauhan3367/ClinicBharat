// sockets/index.js

const appointmentsSocket = require("./appointmentsSocket");

const initializeSockets = (server) => {
	const io = require("socket.io")(server);

	// Initialize other socket namespaces or modules here if needed
	appointmentsSocket(io);
};

module.exports = initializeSockets;
