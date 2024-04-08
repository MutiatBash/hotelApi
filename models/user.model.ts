import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { required } from "joi";

const User = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["guest", "admin"],
			// default: "guest",
			required: true,
		},
	},
	{ timestamps: true }
);

// Hash password before saving
User.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	next();
});

const UserModel = model("user", User);

export default UserModel;
