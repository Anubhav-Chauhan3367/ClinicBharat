const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
	console.log("In the patient routes!");
	res.send("<h1>Hello from Patient Routes!</h1>");
});

module.exports = router;
