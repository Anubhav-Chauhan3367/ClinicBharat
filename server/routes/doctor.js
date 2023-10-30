const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
	console.log("In the doctor routes!");
	res.send("<h1>Hello from Doctor Routes!</h1>");
});

module.exports = router;
