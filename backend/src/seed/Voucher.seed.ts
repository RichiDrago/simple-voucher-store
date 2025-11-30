// Model
import Voucher from "../model/Voucher.model.js";

export async function seedVouchers() {
    await Voucher.bulkCreate(
        [
            {
                id: 1,
                name: "SUMMER21",
                description: "Summer 2021 Discount Voucher",
            },
            {
                id: 2,
                name: "WELCOME10",
                description: "10% Off for New Users",
            },
            {
                id: 3,
                name: "FREESHIP",
                description: "Free Shipping on Orders Over $50",
            },
        ],
        {
            ignoreDuplicates: true,
        }
    );
}
