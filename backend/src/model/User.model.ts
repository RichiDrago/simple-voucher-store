import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";

import db from "../config/db.js";
import Role from "./Role.model.js";

// Utils
import { hashPassword } from "../utils/hash.js";

export interface UserAttributes {
    id: number;
    username: string;
    password: string;
    privilege_name: string;
}

export interface UserCreationAttributes extends Optional<
    UserAttributes,
    "id"
> {}

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    declare id: number;
    declare username: string;
    declare password: string;
    declare privilege_name: string;
    declare createdAt: string;
    declare updatedAt: string;
    declare Role: Role;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        privilege_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Role,
                key: "name",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
    },
    {
        sequelize: db,
        tableName: "User",
        hooks: {
            beforeSave: async (user) => {
                if (user.changed("password")) {
                    user.password = await hashPassword(user.password);
                }
            },
        },
    }
);

export default User;
