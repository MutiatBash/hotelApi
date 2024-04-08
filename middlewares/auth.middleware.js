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
exports.authorizeAdmin = exports.authenticateUser = exports.validateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Validation middleware using Joi
function validateUser(req, res, next) {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).required(),
        role: joi_1.default.string().valid("guest", "admin"),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}
exports.validateUser = validateUser;
function authenticateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = yield user_model_1.default.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials." });
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials." });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username, role: user.role }, "your_secret_key", { expiresIn: "1h" });
            console.log(token);
            req.user = user;
            req.token = token;
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error." });
        }
    });
}
exports.authenticateUser = authenticateUser;
function authorizeAdmin(req, res, next) {
    const user = req.user;
    if (!user || user.role !== "admin") {
        return res
            .status(403)
            .json({ message: "Forbidden. Admin access required." });
    }
    next();
}
exports.authorizeAdmin = authorizeAdmin;
exports.default = { validateUser, authenticateUser, authorizeAdmin };
