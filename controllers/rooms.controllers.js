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
const rooms_service_1 = __importDefault(require("../services/rooms.service"));
class RoomController {
    // create a room
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqBody = req.body;
            // check if room exists
            const existingRoom = yield rooms_service_1.default.findRoom({
                name: reqBody.name.toLowerCase(),
            });
            if (existingRoom) {
                res.status(403).json({
                    success: false,
                    message: "Room already exists",
                });
            }
            // if no existing room
            const newRoom = yield rooms_service_1.default.create(reqBody);
            res.status(201).json({
                success: true,
                message: "Room created",
                data: newRoom,
            });
        });
    }
    // update a room
    updateRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomId = req.params.id;
            const updateRoom = req.body;
            // check if room exists
            const existingRoom = yield rooms_service_1.default.findRoom({
                _id: roomId,
            });
            if (!existingRoom) {
                res.status(403).json({
                    success: false,
                    message: "Room doesn't exists",
                });
            }
            // check for uniqueness and fetching existing room with the name to update
            if (updateRoom.name) {
                const existingRoomName = yield rooms_service_1.default.findRoom({
                    name: updateRoom.name.toLowerCase(),
                });
                if (existingRoomName._id.toString() !== roomId) {
                    res.status(403).json({
                        success: false,
                        message: "Room with that name already exists",
                    });
                }
            }
            // if everything is fine
            const updatedRoom = yield rooms_service_1.default.update(roomId, updateRoom);
            res.status(201).json({
                success: true,
                message: "Room updated",
                data: updatedRoom,
            });
        });
    }
    // delete a room
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomId = req.params.id;
            // check if room exists
            const existingRoom = yield rooms_service_1.default.findRoom({
                _id: roomId,
            });
            if (!existingRoom) {
                res.status(403).json({
                    success: false,
                    message: "Room to delete doesn't exists",
                });
            }
            // if room to delete exists
            const deletedRoom = yield rooms_service_1.default.delete(roomId);
            res.status(201).json({
                success: true,
                message: "Room deleted successfully",
                data: deletedRoom,
            });
        });
    }
    // find a single room
    findARoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomId = req.params.id;
            // check if room exists
            const existingRoom = yield rooms_service_1.default.findRoom({
                _id: roomId,
            });
            if (!existingRoom) {
                res.status(403).json({
                    success: false,
                    message: "Room doesn't exists",
                });
            }
            res.status(201).json({
                success: true,
                message: "Room found successfully",
                data: existingRoom,
            });
        });
    }
    // find all rooms
    findAllRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchedRooms = yield rooms_service_1.default.findAll({});
            res.status(201).json({
                success: true,
                message: "Rooms found successfully",
                data: fetchedRooms,
            });
        });
    }
}
exports.default = new RoomController();
