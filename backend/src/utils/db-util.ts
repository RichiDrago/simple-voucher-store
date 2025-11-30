import db from "../config/db.js";

// Logger
import logger from "../config/logger.js";

// Util
import { sleep } from "./helper.js";

// Associations
import { initAssociations } from "../model/associations.js";

const connectionRetry = parseInt(process.env.DB_SLEEP_RETRY || "5000");

/**
 * Instance the connection with database.
 * Retry every connectionRetry
 */
const connectionToDatabase = async () => {
    let isConnected = false;

    while (!isConnected) {
        try {
            await db.authenticate();

            logger.info(
                "Connection with database has been established successfully."
            );

            initAssociations();

            await db.sync();

            isConnected = true;
        } catch (error) {
            if (error instanceof Error) {
                logger.error(
                    `Database connection error ${error.message} at ${error.stack}`
                );
            } else {
                logger.error(`Database connection error: ${String(error)}`);
            }
            await sleep(connectionRetry);
        }
    }
};

export { connectionToDatabase };
