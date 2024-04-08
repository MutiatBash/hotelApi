"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing packages
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const rooms_route_1 = __importDefault(require("./routes/rooms.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
require("dotenv").config();
// initializing express
const app = (0, express_1.default)();
// adding cors
app.use((0, cors_1.default)());
// using express for json
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// using the route
app.use("/api/v1", rooms_route_1.default);
app.use("/api/v1", auth_route_1.default);
// initializing Database
(0, database_1.default)();
const port = process.env.PORT || 3001;
// listening to changes on port
app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});
