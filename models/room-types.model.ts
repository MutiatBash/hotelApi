import { Schema, model } from "mongoose";

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

export default RoomTypeModel;
