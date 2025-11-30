import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";

import db from "../config/db.js";
import Voucher from "./Voucher.model.js";

export interface AssetAttributes {
    id: number;
    path: string;
    voucher_id: number;
}

export interface AssetCreationAttributes extends Optional<
    AssetAttributes,
    "id"
> {}

export class Asset
    extends Model<AssetAttributes, AssetCreationAttributes>
    implements AssetAttributes
{
    declare id: number;
    declare path: string;
    declare voucher_id: number;
}

Asset.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        voucher_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Voucher,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    {
        sequelize: db,
        tableName: "Asset",
    }
);

export default Asset;
