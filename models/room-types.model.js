const { Schema, model } = require("mongoose");

const RoomType = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 50,
		},
	},
	{ timestamps: true }
);

const RoomTypeModel = model("room-types", RoomType);

module.exports = RoomTypeModel;
