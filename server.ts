// importing packages
import express from "express";
import cors from "cors";
import connectDB from "./database";
import route from "./routes/rooms.route";
import authRoute from "./routes/auth.route";

require("dotenv").config();

// initializing express
const app = express();

// adding cors
app.use(cors());

// using express for json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// using the route
app.use("/api/v1", route);
app.use("/api/v1", authRoute);



// initializing Database
connectDB();

const port = process.env.PORT || 3001;

// listening to changes on port
app.listen(port, () => {
	console.log(`Server Started at ${port}`);
});
