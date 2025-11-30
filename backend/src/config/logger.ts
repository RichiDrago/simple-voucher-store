import { createLogger, transports, format, addColors, Logger } from "winston";
import "dotenv/config";

const { combine, timestamp, colorize, align, printf, errors } = format;

/**
 * Custom color definitions for log levels.
 */
addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "cyan",
    http: "magenta",
});

/**
 * Winston logger configuration.
 * @type {Logger}
 */
const logger: Logger = createLogger({
    level: process.env.LOG_LEVEL || "error",
    format: combine(
        errors({ stack: true }),
        align(),
        timestamp({ format: "MM/DD/YYYY HH:mm:ss" }),
        colorize({ all: process.env.NODE_ENV !== "production" }),
        printf((info) => {
            if (info.error) {
                const message = (
                    typeof info.message === "string"
                        ? info.message
                        : String(info.message)
                ).replace(/\t/g, "");

                return `[${info.timestamp}] ${message}`;
            }

            if (info.stack) {
                const msg =
                    typeof info.message === "string"
                        ? info.message
                        : String(info.message);
                return `[${info.timestamp}] ${info.level}: ${msg}\n    ${info.stack}`;
            }

            const msg =
                typeof info.message === "string"
                    ? info.message
                    : String(info.message);
            return `[${info.timestamp}] ${info.level}: ${msg}`;
        })
    ),
    transports: [new transports.Console()],
    exceptionHandlers: [
        new transports.Console(),
        new transports.File({ filename: "./logs/exceptions.log" }),
    ],
    rejectionHandlers: [
        new transports.Console(),
        new transports.File({ filename: "./logs/rejections.log" }),
    ],
});

export default logger;
