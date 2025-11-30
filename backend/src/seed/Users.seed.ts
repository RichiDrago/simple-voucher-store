// Model
import User from "../model/User.model.js";

// Utils
import { hashPassword } from "../utils/hash.js";

export async function seedUsers() {
    await User.bulkCreate(
        [
            {
                id: 1,
                username: "admin",
                password: await hashPassword("admin"),
                privilege_name: "admin",
            },
            {
                id: 2,
                username: "user",
                password: await hashPassword("user"),
                privilege_name: "user",
            },
        ],
        {
            ignoreDuplicates: true,
        }
    );
}
