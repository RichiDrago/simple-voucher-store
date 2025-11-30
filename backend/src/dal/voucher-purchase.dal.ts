// Model
import VoucherPurchase from "../model/VoucherPurchase.model.js";
import Voucher from "../model/Voucher.model.js";

export class VoucherPurchaseDAL {
    static async getAllVoucherPurchases() {
        return VoucherPurchase.findAll({ include: Voucher });
    }

    static async findById(id: number) {
        return VoucherPurchase.findByPk(id, { include: Voucher });
    }

    static async createVoucherPurchase(data: {
        user_id: number;
        voucher_id: number;
        price_option: string;
        date: string;
        quantity: number;
    }) {
        return VoucherPurchase.create(data);
    }

    static async updateVoucherPurchase(
        id: number,
        data: Partial<{
            user_id: number;
            voucher_id: number;
            price_option: string;
            date: string;
            quantity: number;
        }>
    ) {
        await VoucherPurchase.update(data, { where: { id } });
        return this.findById(id);
    }

    static async deleteVoucherPurchase(id: number) {
        return VoucherPurchase.destroy({ where: { id } });
    }
}