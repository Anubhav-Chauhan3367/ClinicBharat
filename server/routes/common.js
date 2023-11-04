const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
	const dummyData = {
		message: "Hello from Common Routes!",
		data: {
			key1: "value1",
			key2: "value2",
			key3: "value3",
		},
	};

	res.json(dummyData);
});

module.exports = router;
