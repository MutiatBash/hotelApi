import  { Schema, model } from "mongoose";
import mongoose from "mongoose";
// import RoomType from "../models/room-types.model";

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

export default RoomModel;
