import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

import User from "../models/user.model";

interface CustomRequest extends Request {
	user?: any;
	token?: any;
}

// Validation middleware using Joi
export function validateUser(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().min(6).required(),
		role: Joi.string().valid("guest", "admin").required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	next();
}

export async function authenticateUser(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const { username, password, role } = req.body;

	try {
		console.log("Username:", username); // Log username
		console.log("Password to check:", password); // Log password for comparison

		const user = await User.findOne({ username });
		console.log("Retrieved User:", user);
        
		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		console.log("Password:", isMatch);
		if (!isMatch) {
			return res.status(401).json({ message: "Password incorrect" });
		}

		const token = jwt.sign(
			{ userId: user._id, username: user.username, role: user.role },
			"your_secret_key",
			{ expiresIn: "1h" }
		);

		console.log(token);
		req.user = user;
		req.token = token;
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error." });
	}
}

export function authorizeAdmin(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const user = req.user;
	if (!user || user.role !== "admin") {
		return res
			.status(403)
			.json({ message: "Forbidden. Admin access required." });
	}
	next();
}

export default { validateUser, authenticateUser, authorizeAdmin };
