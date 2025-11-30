// Model
import Asset from "../model/Asset.model.js";

export async function seedAssets() {
    await Asset.bulkCreate(
        [
            {
                id: 1,
                path: "/uploads/image1.jpg",
                voucher_id: 1,
            },
            {
                id: 2,
                path: "/uploads/image2.jpg",
                voucher_id: 2,
            },
            {
                id: 3,
                path: "/uploads/image3.jpg",
                voucher_id: 2,
            },
        ],
        {
            ignoreDuplicates: true,
        }
    );
}
