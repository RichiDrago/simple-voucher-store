// Model
import VoucherPriceOption from "../model/VoucherPriceOption.model.js";

export async function seedVoucherPriceOptions() {
    await VoucherPriceOption.bulkCreate(
        [
            {
                price_option_id: 1,
                voucher_id: 1,
            },
            {
                price_option_id: 2,
                voucher_id: 1,
            },
            {
                price_option_id: 3,
                voucher_id: 2,
            },
            {
                price_option_id: 1,
                voucher_id: 2,
            },
            {
                price_option_id: 2,
                voucher_id: 2,
            },
            {
                price_option_id: 4,
                voucher_id: 3,
            },
            {
                price_option_id: 5,
                voucher_id: 3,
            },
        ],
        {
            ignoreDuplicates: true,
        }
    );
}
