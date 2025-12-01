// DTO used for update voucher request
export class UpdateVoucherDTO {
    name?: string;
    description?: string;

    constructor(name?: string, description?: string) {
        if (name !== undefined) this.name = name;
        if (description !== undefined) this.description = description;
    }
}

// DTO used for returning voucher data to the client
export class VoucherResponseDTO {
    id: number;
    name: string;
    description?: string;
    assets: string[];
    price_options?: number[];

    constructor(id: number, name: string, description?: string, assets: string[] = [], price_options: number[] = []) {
        this.id = id;
        this.name = name;
        if (description !== undefined) this.description = description;
        this.assets = assets;
        this.price_options = price_options;
    }
}
