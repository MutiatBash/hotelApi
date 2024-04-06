"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
// import RoomType from "../models/room-types.model";
const Room = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    roomType: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const RoomModel = (0, mongoose_1.model)("rooms", Room);
exports.default = RoomModel;
