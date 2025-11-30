import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";

import db from "../config/db.js";
import User from "./User.model.js";
import Voucher from "./Voucher.model.js";

export interface VoucherPurchaseAttributes {
    id: number;
    user_id: number;
    voucher_id: number;
    price_option: string;
    date: string;
    quantity: number;
}

export interface VoucherPurchaseCreationAttributes extends Optional<
    VoucherPurchaseAttributes,
    "id"
> {}

export class VoucherPurchase
    extends Model<VoucherPurchaseAttributes, VoucherPurchaseCreationAttributes>
    implements VoucherPurchaseAttributes
{
    declare id: number;
    declare user_id: number;
    declare voucher_id: number;
    declare price_option: string;
    declare date: string;
    declare quantity: number;
}

VoucherPurchase.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        voucher_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Voucher,
                key: "id",
            },
        },
        price_option: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: "VoucherPurchase",
    }
);

export default VoucherPurchase;
