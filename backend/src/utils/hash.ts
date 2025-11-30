import bcrypt from "bcrypt";

// Logger
import logger from "../config/logger.js";

/**
 * Hashes a password using bcrypt.
 */
export const hashPassword = async (password: string): Promise<string> => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        logger.error("Error hashing password:", error);
        throw error;
    }
};

/**
 * Compares a plain text password with a hashed password.
 */
export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        logger.error("Error comparing passwords:", error);
        throw error;
    }
};
