import { ObjectId } from "mongoose";

interface Room {
	name: string;
	roomType: ObjectId;
	price: number;
}

export { Room };
