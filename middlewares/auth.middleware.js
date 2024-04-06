"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticateUser = exports.validateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
// Validation middleware using Joi
function validateUser(req, res, next) {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
}
exports.validateUser = validateUser;
// Authentication middleware using JWT
function authenticateUser(req, res, next) {
    const token = req.header("Authorization");
    if (!token)
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "your_secret_key");
        req.body = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
}
exports.authenticateUser = authenticateUser;
// Authorization middleware for admin role
function authorizeAdmin(req, res, next) {
    if (req.body.role !== "admin") {
        return res
            .status(403)
            .json({ message: "Forbidden. Admin access required." });
    }
    next();
}
exports.authorizeAdmin = authorizeAdmin;
// export default { validateUser, authenticateUser, authorizeAdmin };
