import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";

import db from "../config/db.js";
import type Asset from "./Asset.model.js";
import type PriceOption from "./PriceOption.model.js";

export interface VoucherAttributes {
    id: number;
    name: string;
    description?: string;
}

export interface VoucherCreationAttributes extends Optional<
    VoucherAttributes,
    "id"
> {}

export class Voucher
    extends Model<VoucherAttributes, VoucherCreationAttributes>
    implements VoucherAttributes
{
    declare id: number;
    declare name: string;
    declare description: string;
    declare Assets: Asset[];
    declare PriceOptions: PriceOption[];
}

Voucher.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        tableName: "Voucher",
    }
);

export default Voucher;
