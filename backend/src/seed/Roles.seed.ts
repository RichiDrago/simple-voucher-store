// Model
import Role from "../model/Role.model.js";

export async function seedRoles() {
    await Role.bulkCreate(
        [
            { name: "admin", privilege: 2 },
            { name: "user", privilege: 1 },
        ],
        {
            ignoreDuplicates: true,
        }
    );
}
