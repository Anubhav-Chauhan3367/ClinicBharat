const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
	console.log("In the common routes!");
	res.send("<h1>Hello from Common Routes!</h1>");
});

module.exports = router;
