import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";

import db from "../config/db.js";

export interface PriceOptionAttributes {
    id: number;
    price: number;
}

export interface PriceOptionCreationAttributes extends Optional<
    PriceOptionAttributes,
    "id"
> {}

export class PriceOption
    extends Model<PriceOptionAttributes, PriceOptionCreationAttributes>
    implements PriceOptionAttributes
{
    declare id: number;
    declare price: number;
}

PriceOption.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: "PriceOption",
    }
);

export default PriceOption;
