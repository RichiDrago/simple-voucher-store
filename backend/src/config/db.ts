import { Sequelize } from "sequelize";

// Logger
import logger from "./logger.js";

// Util
import { sleep } from "../utils/helper.js";

// DB Config
const host = process.env.DB_HOST || "localhost";
const port = parseInt(process.env.DB_PORT || "3306");
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "secret";
const logging = process.env.DB_LOGGING === "true" || false;
const dbname = "SimpleVoucherStore";
const dialect = "mariadb";

const db = new Sequelize(dbname, user, password, {
    host,
    port,
    logging,
    dialect,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    retry: {
        max: 5,
    },
    define: {
        freezeTableName: true,
        //timestamps: true,
    },
});

export default db;
