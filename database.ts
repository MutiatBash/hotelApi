import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.DATABASE_URI!, {
		});
		console.log(`MongoDB Connected: ${connect.connection.host}`);
	} catch (error:any) {
		console.error(error.message);
		process.exit(1);
	}
};

export default connectDB;
