const { Schema, model } = require("mongoose");

const Room = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 50,
		},
		roomType: {
			type: String,
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
