import express from "express";
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

import RoomTypeModel from "../models/room-types.model";
import RoomModel from "../models/rooms.model";
import RoomController from "../controllers/rooms.controllers";

import {
	validateUser,
	authenticateUser,
	authorizeAdmin,
} from "../middlewares/middleware";

//Create room type
router.post("/room-types", async (req: Request, res: Response) => {
	const { name } = req.body;

	try {
		const addData = await RoomTypeModel.create({ name });
		res.status(200).json(addData);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Get all room types
router.get("/room-types", async (req: Request, res: Response) => {
	try {
		const data = await RoomTypeModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all room with filters
router.get("/rooms", async (req: Request, res: Response) => {
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
router.post("/rooms", authenticateUser, RoomController.createRoom);

//Get room by ID Method
router.get("/rooms/:id", RoomController.findARoom);

//Update room by ID Method
router.patch("/rooms/:id", authenticateUser, RoomController.updateRoom);

//Delete by ID Method
router.delete("/rooms/:id", authenticateUser, authorizeAdmin, RoomController.deleteRoom);

router.get("/", RoomController.findAllRooms);

export default router;
