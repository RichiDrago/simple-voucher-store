import express from "express";

// Controller
import authController from "../controller/auth.controller.js";

// Validators
import { validateLogin, validateRegister } from "../middleware/validator/auth.validator.js";

const authRouter = express.Router();

/**
 * @route POST /auth/login
 * @desc  User login
 */
authRouter.post("/login", validateLogin, authController.login);

/**
 * @route POST /auth/register
 * @desc  User registration
 */
authRouter.post("/register", validateRegister, authController.register);

export default authRouter;
