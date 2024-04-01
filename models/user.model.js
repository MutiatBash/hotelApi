const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
			default: "guest",
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

module.exports = UserModel;
