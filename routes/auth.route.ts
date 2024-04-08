import express, { Request, Response } from "express";
import { authenticateUser, validateUser } from "../middlewares/auth.middleware";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

const router = express.Router();

interface CustomRequest extends Request {
	token?: string;
}

router.post("/register", validateUser, async (req, res) => {
	try {
		const { username, password, role } = req.body;

		// Check if username already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username already exists." });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user with role
		const newUser = new User({ username, password: hashedPassword, role });
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

router.post(
	"/login",
	authenticateUser,
	async (req: CustomRequest, res: Response) => {
		try {
			// Generate a JWT token
			const token = req.token; // Access the token set by the authenticateUser middleware
			if (!token) {
				return res.status(401).json({ message: "Authentication failed." });
			}

			res.status(200).json({ message: "Login successful", token });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}
);

export default router;
