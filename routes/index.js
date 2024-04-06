"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const rooms_route_1 = __importDefault(require("./rooms.route"));
const middleware = require("../middlewares/auth.middleware");
router.use("/rooms", rooms_route_1.default);
exports.default = router;
