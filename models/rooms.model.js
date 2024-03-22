const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const RoomType = require("./room-types.model")

const Room = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 50,
		},
		roomType: {
			type: mongoose.Schema.Types.ObjectId,
            ref:'RoomType',
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const RoomModel = model("rooms", Room);

module.exports = RoomModel;
