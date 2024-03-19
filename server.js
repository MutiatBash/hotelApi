// importing packages
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./database");
const route = require("./routes");

require("dotenv").config();

// initializing express
const app = express();

// using express for json
app.use(express.json());

// initializing Database
connectDB();

// using the route
app.use("/api/v1", route);

const port = process.env.PORT || 3001;

// listening to changes on port
app.listen(port, () => {
	console.log(`Server Started at ${port}`);
});
