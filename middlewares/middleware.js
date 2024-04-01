const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const User = require("../models/user.model"); 

// Validation middleware using Joi
function validateUser(req, res, next) {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error)
		return res.status(400).json({ message: error.details[0].message });
	next();
}

// Authentication middleware using JWT
function authenticateUser(req, res, next) {
	const token = req.header("Authorization");
	if (!token)
		return res
			.status(401)
			.json({ message: "Access denied. No token provided." });

	try {
		const decoded = jwt.verify(token, "your_secret_key");
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid token." });
	}
}

// Authorization middleware for admin role
function authorizeAdmin(req, res, next) {
	if (req.user.role !== "admin") {
		return res
			.status(403)
			.json({ message: "Forbidden. Admin access required." });
	}
	next();
}

module.exports = { validateUser, authenticateUser, authorizeAdmin };
