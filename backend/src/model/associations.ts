// Models
import User from "./User.model.js";
import Role from "./Role.model.js";
import Asset from "./Asset.model.js";
import Voucher from "./Voucher.model.js";
import VoucherPurchase from "./VoucherPurchase.model.js";
import VoucherPriceOption from "./VoucherPriceOption.model.js";
import PriceOption from "./PriceOption.model.js";

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

    // Asset - Voucher Association
    Asset.belongsTo(Voucher, {
        foreignKey: "voucher_id",
        targetKey: "id",
    });
    Voucher.hasMany(Asset, {
        foreignKey: "voucher_id",
        sourceKey: "id",
    });

    // User - VoucherPurchase Association
    VoucherPurchase.belongsTo(User, {
        foreignKey: "user_id",
        targetKey: "id",
    });
    User.hasMany(VoucherPurchase, {
        foreignKey: "user_id",
        sourceKey: "id",
    });

    // Voucher - VoucherPurchase Association
    VoucherPurchase.belongsTo(Voucher, {
        foreignKey: "voucher_id",
        targetKey: "id",
    });
    Voucher.hasMany(VoucherPurchase, {
        foreignKey: "voucher_id",
        sourceKey: "id",
    });

    // Voucher - VoucherPriceOption- PriceOption Association
    Voucher.belongsToMany(PriceOption, {
        through: VoucherPriceOption,
        foreignKey: "voucher_id",
    });
    PriceOption.belongsToMany(Voucher, {
        through: VoucherPriceOption,
        foreignKey: "price_option_id",
    });
}
