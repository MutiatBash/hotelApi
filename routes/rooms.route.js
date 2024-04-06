"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const room_types_model_1 = __importDefault(require("../models/room-types.model"));
const rooms_controllers_1 = __importDefault(require("../controllers/rooms.controllers"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
//Create room type
router.post("/room-types", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const addData = yield room_types_model_1.default.create({ name });
        res.status(200).json(addData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
//Get all room types
router.get("/room-types", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield room_types_model_1.default.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
//Get all room with filters
// router.get("/rooms", async (req: Request, res: Response) => {
// 	try {
// 		let query = {};
// 		if (req.query.search) {
// 			query.name = { $regex: req.query.search, $options: "i" };
// 		}
// 		if (req.query.roomType) {
// 			query.roomType = req.query.roomType;
// 		}
// 		if (req.query.minPrice || req.query.maxPrice) {
// 			query.price = {};
// 			if (req.query.minPrice) {
// 				query.price.$gte = parseInt(req.query.minPrice);
// 			} else {
// 				query.price.$gte = 0;
// 			}
// 			if (req.query.maxPrice) {
// 				query.price.$lte = parseInt(req.query.maxPrice);
// 			}
// 		}
// 		const rooms = await RoomModel.find(query);
// 		res.json(rooms);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: error.message });
// 	}
// });
//Create rooms
router.post("/rooms", rooms_controllers_1.default.createRoom);
//Get room by ID Method
router.get("/rooms/:id", rooms_controllers_1.default.findARoom);
//Update room by ID Method
router.patch("/rooms/:id", auth_middleware_1.authenticateUser, rooms_controllers_1.default.updateRoom);
//Delete by ID Method
router.delete("/rooms/:id", auth_middleware_1.authenticateUser, auth_middleware_1.authorizeAdmin, rooms_controllers_1.default.deleteRoom);
router.get("/rooms", rooms_controllers_1.default.findAllRooms);
exports.default = router;
