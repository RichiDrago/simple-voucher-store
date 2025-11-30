import morgan from "morgan";
import type { StreamOptions } from "morgan";
import chalk from "chalk";

// Utils
import logger from "../config/logger.js";

/**
 * Middleware for logging API requests and responses.
 */
const stream: StreamOptions = {
    write: (message: string): void => {
        // rimuovo spazi / newline finali
        const trimmed = message.trim();

        const [rawMethod, rawUrl, rawStatus, rawResponseTime] =
            trimmed.split("|");

        const method = (rawMethod ?? "").trim();
        const url = (rawUrl ?? "").trim();
        const status = (rawStatus ?? "").trim();
        const responseTime = (rawResponseTime ?? "").trim();

        let prettyMethod: string;
        let prettyStatus: string;
        const prettyUrl: string = chalk.underline(chalk.white(url));

        // Colore del metodo
        switch (method) {
            case "GET":
                prettyMethod = chalk.green(method);
                break;
            case "POST":
                prettyMethod = chalk.blue(method);
                break;
            case "PUT":
                prettyMethod = chalk.yellow(method);
                break;
            case "DELETE":
                prettyMethod = chalk.red(method);
                break;
            default:
                prettyMethod = chalk.white(method);
        }

        // Colore dello status
        switch (status) {
            case "200":
            case "201":
                prettyStatus = chalk.green(status);
                break;
            case "400":
                prettyStatus = chalk.yellow(status);
                break;
            case "500":
                prettyStatus = chalk.red(status);
                break;
            default:
                prettyStatus = chalk.white(status);
        }

        const log =
            `${prettyMethod} ${prettyUrl} ${prettyStatus} ${responseTime}`.replace(
                /\n/g,
                ""
            );

        logger.http(log);
    },
};

const apiLogger = morgan(":method|:url|:status|:response-time ms", {
    stream,
});

export default apiLogger;
