// Model
import PriceOption from "../model/PriceOption.model.js";

export async function seedPriceOptions() {
    await PriceOption.bulkCreate(
        [
            {
                id: 1,
                price: 50,
            },
            {
                id: 2,
                price: 100,
            },
            {
                id: 3,
                price: 200,
            },
            {
                id: 4,
                price: 500,
            },
            {
                id: 5,
                price: 1000,
            },
        ],
        {
            ignoreDuplicates: true,
        }
    );
}
