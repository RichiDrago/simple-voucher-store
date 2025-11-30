// Logger
import logger from "../config/logger.js";

// Seeders
import { seedRoles } from "./Roles.seed.js";
import { seedUsers } from "./Users.seed.js";
import { seedPriceOptions } from "./PriceOptions.seed.js";
import { seedVouchers } from "./Voucher.seed.js";

export async function seedInitialData() {
    try {
        logger.info("Running database seed...");

        await seedRoles();
        await seedUsers();
        await seedPriceOptions();
        await seedVouchers();

        logger.info("Database seed completed.");
    } catch (error) {
        logger.error("Error during database seeding:", error);
    }
}
