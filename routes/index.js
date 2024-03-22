const express = require("express");
const router = express.Router();

const RoomTypeModel = require("../models/room-types.model");
const RoomModel = require("../models/rooms.model");

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

//Create rooms
router.post("/rooms", async (req, res) => {
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
router.patch("/rooms/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const result = await RoomModel.findByIdAndUpdate(id, updatedData, options);

		res.send(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete by ID Method
router.delete("/rooms/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const data = await RoomModel.findByIdAndDelete(id);
		res.send(`Room with name : ${data.name} has been deleted..`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
