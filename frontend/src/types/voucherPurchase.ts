export type NewVoucherPurchase = {
    user_id: number;
    voucher_id: number;
    price_option: string;
    date: string;
    quantity: number;
};

export type VoucherPurchase = NewVoucherPurchase & {
    id: number;
};
