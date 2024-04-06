"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomType = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const RoomTypeModel = (0, mongoose_1.model)("room-types", RoomType);
exports.default = RoomTypeModel;
