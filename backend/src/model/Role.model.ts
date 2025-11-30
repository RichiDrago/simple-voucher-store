import { DataTypes, Model } from "sequelize";

import db from "../config/db.js";

export interface RoleAttributes {
    name: string;
    privilege: number;
}

export interface RoleCreationAttributes extends RoleAttributes {}

export class Role
    extends Model<RoleAttributes, RoleAttributes>
    implements RoleAttributes
{
    declare name: string;
    declare privilege: number;
    declare createdAt: string;
    declare updatedAt: string;
}

Role.init(
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        privilege: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        sequelize: db,
        tableName: "Role",
    }
);

export default Role;
