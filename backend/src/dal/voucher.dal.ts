// Model
import Voucher from "../model/Voucher.model.js";
import Asset from "../model/Asset.model.js";
import PriceOption from "../model/PriceOption.model.js";

export class VoucherDAL {
    static async getAllVouchers() {
        return Voucher.findAll({
            include: [Asset, PriceOption],
        });
    }

    static async findById(id: number) {
        return Voucher.findByPk(id, {
            include: Asset,
        });
    }

    static async createVoucher(data: { name: string; description?: string }) {
        return Voucher.create(data);
    }

    static async updateVoucher(
        id: number,
        data: Partial<{
            name: string;
            description?: string;
        }>
    ) {
        await Voucher.update(data, { where: { id } });
        return this.findById(id);
    }

    static async deleteVoucher(id: number) {
        return Voucher.destroy({ where: { id } });
    }
}
