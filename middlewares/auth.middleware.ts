import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";

import User from "../models/user.model";

// Validation middleware using Joi
export function validateUser(req: Request, res: Response, next: NextFunction) {
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
export function authenticateUser(req: Request, res: Response, next: NextFunction) {
	const token = req.header("Authorization");
	if (!token)
		return res
			.status(401)
			.json({ message: "Access denied. No token provided." });

	try {
		const decoded = jwt.verify(token, "your_secret_key");
		req.body = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid token." });
	}
}

// Authorization middleware for admin role
export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
	if (req.body.role !== "admin") {
		return res
			.status(403)
			.json({ message: "Forbidden. Admin access required." });
	}
	next();
}

// export default { validateUser, authenticateUser, authorizeAdmin };
