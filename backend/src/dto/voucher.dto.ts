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

    constructor(id: number, name: string, description?: string) {
        this.id = id;
        this.name = name;
        if (description !== undefined) this.description = description;
    }
}
