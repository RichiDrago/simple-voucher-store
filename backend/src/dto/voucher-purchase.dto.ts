// DTO used for create voucher purchase request
export class CreateVoucherPurchaseDTO {
    user_id: number;
    voucher_id: number;
    price_option: string;
    date: string;
    quantity: number;

    constructor(
        user_id: number,
        voucher_id: number,
        price_option: string,
        date: string,
        quantity: number
    ) {
        this.user_id = user_id;
        this.voucher_id = voucher_id;
        this.price_option = price_option;
        this.date = date;
        this.quantity = quantity;
    }
}

// DTO used for update voucher purchase request
export class UpdateVoucherPurchaseDTO {
    user_id?: number;
    voucher_id?: number;
    price_option?: string;
    date?: string;
    quantity?: number;

    constructor(
        user_id?: number,
        voucher_id?: number,
        price_option?: string,
        date?: string,
        quantity?: number
    ) {
        if (user_id !== undefined) this.user_id = user_id;
        if (voucher_id !== undefined) this.voucher_id = voucher_id;
        if (price_option !== undefined) this.price_option = price_option;
        if (date !== undefined) this.date = date;
        if (quantity !== undefined) this.quantity = quantity;
    }
}

// DTO used for returning voucher purchase data to the client
export class VoucherPurchaseResponseDTO {
    id: number;
    user_id: number;
    voucher_id: number;
    price_option: string;
    date: string;
    quantity: number;

    constructor(
        id: number,
        user_id: number,
        voucher_id: number,
        price_option: string,
        date: string,
        quantity: number
    ) {
        this.id = id;
        this.user_id = user_id;
        this.voucher_id = voucher_id;
        this.price_option = price_option;
        this.date = date;
        this.quantity = quantity;
    }
}
