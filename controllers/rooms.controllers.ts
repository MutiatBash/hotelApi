import RoomService from "../services/rooms.service";
import { Request, Response } from "express";

class RoomController {
	// create a room
	async createRoom(req: Request, res: Response) {
		const reqBody = req.body;

		// check if room exists
		const existingRoom = await RoomService.findRoom({
			name: reqBody.name.toLowerCase(),
		});

		if (existingRoom) {
			res.status(403).json({
				success: false,
				message: "Room already exists",
			});
		}

		// if no existing room
		const newRoom = await RoomService.create(reqBody);

		res.status(201).json({
			success: true,
			message: "Room created",
			data: newRoom,
		});
	}

	// update a room
	async updateRoom(req: Request, res: Response) {
		const roomId = req.params.id;
		const updateRoom = req.body;

		// check if room exists
		const existingRoom = await RoomService.findRoom({
			_id: roomId,
		});

		if (!existingRoom) {
			res.status(403).json({
				success: false,
				message: "Room doesn't exists",
			});
		}

		// check for uniqueness
		if (updateRoom.name) {
			const existingRoomWithUpdateName = await RoomService.findRoom({
				name: updateRoom.toLowerCase(),
			});

			if (
				existingRoomWithUpdateName._id.toString() !==
				existingRoom._id.toString()
			) {
				res.status(403).json({
					success: false,
					message: "Room with update name already exists",
				});
			}
		}

		// if everything is fine
		const updatedRoom = await RoomService.update(roomId, updateRoom);

		res.status(201).json({
			success: true,
			message: "Room updated",
			data: updatedRoom,
		});
	}

	// delete a room
	async deleteRoom(req: Request, res: Response) {
		const roomId = req.params.id;

		// check if room exists
		const existingRoom = await RoomService.findRoom({
			_id: roomId,
		});

		if (!existingRoom) {
			res.status(403).json({
				success: false,
				message: "Room to delete doesn't exists",
			});
		}

		// if room to delete exists
		const deletedRoom = await RoomService.delete(roomId);

		res.status(201).json({
			success: true,
			message: "Room deleted successfully",
			data: deletedRoom,
		});
	}

	// find a single room
	async findARoom(req: Request, res: Response) {
		const roomId = req.params.id;

		// check if room exists
		const existingRoom = await RoomService.findRoom({
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
	}

	// find all rooms
	async findAllRooms(req: Request, res: Response) {
		const fetchedRooms = await RoomService.findAll({});

		res.status(201).json({
			success: true,
			message: "Rooms found successfully",
			data: fetchedRooms,
		});
	}
}

export default new RoomController();
