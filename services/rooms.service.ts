
import RoomModel from "../models/rooms.model";
import Room from "../interfaces/room.interface";
import { FilterQuery, UpdateQuery } from "mongoose";

class RoomService {
	// create a room
	async create(room: Room) {
		return await RoomModel.create(room);
	}

	// update a room
	async update(id: string, roomUpdate: UpdateQuery<Room>) {
		return await RoomModel.findByIdAndUpdate(id, roomUpdate, {
			new: true,
		});
	}

	// delete a room
	async delete(id: string) {
		return await RoomModel.findByIdAndDelete(id);
	}

	// find a single room
	async findRoom(filter: FilterQuery<Room>) {
		return await RoomModel.findOne(filter);
	}

	// find all rooms
	async findAll(filter: FilterQuery<Room>) {
		return await RoomModel.find(filter);
	}
}

export default new RoomService();
