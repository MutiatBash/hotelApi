import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import RoomController from "../controllers/rooms.controllers";

import RoomTypeModel from "../models/room-types.model";
import RoomModel from "../models/rooms.model";

import { authenticateUser } from "../middlewares/auth.middleware";
import User from "../models/user.model";


// Create room type
router.post("/room-types", async (req: Request, res: Response) => {
	const { name } = req.body;

	try {
		const addData = await RoomTypeModel.create({ name });
		res.status(200).json(addData);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

// Get all room types
router.get("/room-types", async (req: Request, res: Response) => {
	try {
		const data = await RoomTypeModel.find();
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});


//Create rooms
// router.get("/test", (req, res) => {
// 	res.send("Test route works");
// });

router.post("/", authenticateUser, RoomController.createRoom);

// Get All rooms
router.get("/", RoomController.findAllRooms);

//Get room by ID Method
router.get("/:id", RoomController.findARoom);

//Update room by ID Method
router.patch("/:id", RoomController.updateRoom);

//Delete by ID Method
router.delete("/:id", RoomController.deleteRoom);

// Get all room with filters
// router.get("/rooms", async (req: Request, res: Response) => {
// 	try {
// 		let query = {};
// 		if (req.query.search) {
// 			query.name = { $regex: req.query.search, $options: "i" };
// 		}
// 		if (req.query.roomType) {
// 			query.roomType = req.query.roomType;
// 		}
// 		if (req.query.minPrice || req.query.maxPrice) {
// 			query.price = {};
// 			if (req.query.minPrice) {
// 				query.price.$gte = parseInt(req.query.minPrice);
// 			} else {
// 				query.price.$gte = 0;
// 			}
// 			if (req.query.maxPrice) {
// 				query.price.$lte = parseInt(req.query.maxPrice);
// 			}
// 		}

// 		const rooms = await RoomModel.find(query);
// 		res.json(rooms);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: error.message });
// 	}
// });


export default router;
