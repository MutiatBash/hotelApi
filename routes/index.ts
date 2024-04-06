import express from "express";
const router = express.Router();
import roomRouter from "./rooms.route";
const middleware = require("../middlewares/auth.middleware");

router.use("/rooms", roomRouter);

export default router;
