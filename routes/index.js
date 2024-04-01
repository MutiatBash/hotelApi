const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const RoomTypeModel = require("../models/room-types.model");
const RoomModel = require("../models/rooms.model");

const {
	validateUser,
	authenticateUser,
	authorizeAdmin,
} = require("../middlewares/middleware");

const User = require("../models/user.model");

//Create room type
router.post("/room-types", async (req, res) => {
	const { name } = req.body;

	try {
		const addData = await RoomTypeModel.create({ name });
		res.status(200).json(addData);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Get all room types
router.get("/room-types", async (req, res) => {
	try {
		const data = await RoomTypeModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all room with filters
router.get("/rooms", async (req, res) => {
	try {
		let query = {};
		if (req.query.search) {
			query.name = { $regex: req.query.search, $options: "i" };
		}
		if (req.query.roomType) {
			query.roomType = req.query.roomType;
		}
		if (req.query.minPrice || req.query.maxPrice) {
			query.price = {};
			if (req.query.minPrice) {
				query.price.$gte = parseInt(req.query.minPrice);
			} else {
				query.price.$gte = 0;
			}
			if (req.query.maxPrice) {
				query.price.$lte = parseInt(req.query.maxPrice);
			}
		}

		const rooms = await RoomModel.find(query);
		res.json(rooms);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
});

//Create rooms
router.post("/rooms", authenticateUser, async (req, res) => {
	const data = new RoomModel({
		name: req.body.name,
		roomType: req.body.roomType,
		price: req.body.price,
	});

	try {
		const addRoom = await data.save();
		res.status(200).json(addRoom);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Get room by ID Method
router.get("/rooms/:id", async (req, res) => {
	try {
		const data = await RoomModel.findById(req.params.id);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Update room by ID Method
router.patch("/rooms/:id", authenticateUser, async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const result = await RoomModel.findByIdAndUpdate(
			id,
			updatedData,
			options
		);

		res.send(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete by ID Method
router.delete("/rooms/:id", authenticateUser, authorizeAdmin, async (req, res) => {
	try {
		const id = req.params.id;
		const data = await RoomModel.findByIdAndDelete(id);
		res.send(`Room with name : ${data.name} has been deleted`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// // register user
// router.post("/register", validateUser, async (req, res) => {
// 	try {
// 		const { username, password, role } = req.body;
// 		const existingUser = await User.findOne({ username });
// 		if (existingUser)
// 			return res.status(400).json({ message: "User already exists." });
// 		const user = new User({ username, password, role });
// 		await user.save();
// 		res.status(201).json({ message: "User registered successfully." });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: "Server error." });
// 	}
// });

// // Login user route
// router.post("/login", async (req, res) => {
// 	try {
// 		const { username, password } = req.body;
// 		const user = await User.findOne({ username });
// 		if (!user)
// 			return res.status(400).json({ message: "Invalid credentials." });
// 		const isMatch = await bcrypt.compare(password, user.password);
// 		if (!isMatch)
// 			return res.status(400).json({ message: "Invalid credentials." });
// 		const token = jwt.sign(
// 			{ user: { id: user.id, role: user.role } },
// 			"your_secret_key"
// 		);
// 		res.json({ token });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: "Server error." });
// 	}
// });

module.exports = router;
