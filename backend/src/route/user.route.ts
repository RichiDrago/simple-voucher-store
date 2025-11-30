import express from "express";

// Controller
import userController from "../controller/user.controller.js";

// Validators
import {
    validateGetUserById,
    validateUpdateUser,
    validateDeleteUser,
} from "../middleware/validator/user.validator.js";

const userRouter = express.Router();

/**
 * @route GET /users
 * @desc  Get all users
 */
userRouter.get("/", userController.getAll);

/**
 * @route GET /users/:id
 * @route PUT /users/:id
 * @route DELETE /users/:id
 * @desc  Get, update, or delete user by ID
 */
userRouter
    .route("/:id")
    .get(validateGetUserById, userController.getById)
    .put(validateUpdateUser, userController.update)
    .delete(validateDeleteUser, userController.delete);

export default userRouter;
