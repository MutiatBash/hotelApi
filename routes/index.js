const express = require("express");
const router = express.Router();

const RoomTypeModel = require("../models/room-types.model");

//Post Method
router.post("/room-types", async (req, res) => {

	const { name } = req.body;

	try {
		const addData = await RoomTypeModel.create({ name });
		res.status(200).json(addData);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Get all 
router.get("/room-types", async (req, res) => {
	try {
		const data = await RoomTypeModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get by ID Method
router.get("/getOne/:id", (req, res) => {
	res.send("Get by ID API");
});

//Update by ID Method
router.patch("/update/:id", (req, res) => {
	res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
	res.send("Delete by ID API");
});

module.exports = router;
