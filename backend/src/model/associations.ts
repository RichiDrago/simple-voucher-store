// Models
import User from "./User.model.js";
import Role from "./Role.model.js";

export function initAssociations() {
    // User - Role Association
    User.belongsTo(Role, {
        foreignKey: "privilege_name",
        targetKey: "name",
    });
    Role.hasMany(User, {
        foreignKey: "privilege_name",
        sourceKey: "name",
    });
}
