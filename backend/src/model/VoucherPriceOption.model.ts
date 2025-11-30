import { DataTypes, Model } from "sequelize";

import db from "../config/db.js";
import PriceOption from "./PriceOption.model.js";
import Voucher from "./Voucher.model.js";

export interface VoucherPriceOptionAttributes {
    price_option_id: number;
    voucher_id: number;
}

export class VoucherPriceOption
    extends Model<VoucherPriceOptionAttributes>
    implements VoucherPriceOptionAttributes
{
    declare price_option_id: number;
    declare voucher_id: number;
}

VoucherPriceOption.init(
    {
        price_option_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: PriceOption,
                key: "id",
            },
        },
        voucher_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Voucher,
                key: "id",
            },
        },
    },
    {
        sequelize: db,
        tableName: "VoucherPriceOption",
    }
);

export default VoucherPriceOption;
