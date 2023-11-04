const { validationResult } = require("express-validator");

// Middleware to check for validation errors and attach them to the request object
const validate = (req, res, next) => {
	const errors = validationResult(req);
	console.log(errors);
	console.log(errors.isEmpty());
	console.log(req.body);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	next();
};

module.exports = {
	validate,
};
