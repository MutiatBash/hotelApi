import { Schema, model } from "mongoose";

const RoomType = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const RoomTypeModel = model("room-types", RoomType);

export default RoomTypeModel;
