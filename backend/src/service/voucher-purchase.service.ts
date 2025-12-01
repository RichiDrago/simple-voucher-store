// DAL
import { VoucherPurchaseDAL } from "../dal/voucher-purchase.dal.js";

// DTO
import {
    CreateVoucherPurchaseDTO,
    UpdateVoucherPurchaseDTO,
    VoucherPurchaseResponseDTO,
} from "../dto/voucher-purchase.dto.js";

// Utils
import ApiError from "../utils/apiError.js";

// Consts
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";

export class VoucherPurchaseService {
    /**
     * Get all voucher purchases.
     */
    static async getAll(): Promise<VoucherPurchaseResponseDTO[]> {
        const purchases = await VoucherPurchaseDAL.getAllVoucherPurchases();

        return purchases.map((purchase) => {
            return new VoucherPurchaseResponseDTO(
                purchase.id,
                purchase.user_id,
                purchase.voucher_id,
                purchase.price_option,
                purchase.date,
                purchase.quantity
            );
        });
    }

    /**
     * Get voucher purchase by ID.
     */
    static async getById(id: string): Promise<VoucherPurchaseResponseDTO> {
        const purchase = await VoucherPurchaseDAL.findById(Number(id));

        if (!purchase) {
            throw new ApiError(
                httpStatusCodes.NOT_FOUND,
                apiResponse.error.VOUCHER_PURCHASE_NOT_FOUND
            );
        }

        return new VoucherPurchaseResponseDTO(
            purchase.id,
            purchase.user_id,
            purchase.voucher_id,
            purchase.price_option,
            purchase.date,
            purchase.quantity
        );
    }

    /**
     * Create a new voucher purchase.
     */
    static async create(dto: CreateVoucherPurchaseDTO): Promise<VoucherPurchaseResponseDTO> {
        const newPurchase = await VoucherPurchaseDAL.createVoucherPurchase(dto);

        return new VoucherPurchaseResponseDTO(
            newPurchase.id,
            newPurchase.user_id,
            newPurchase.voucher_id,
            newPurchase.price_option,
            newPurchase.date,
            newPurchase.quantity
        );
    }

    /**
     * Update voucher purchase by ID.
     */
    static async update(
        id: string,
        data: UpdateVoucherPurchaseDTO
    ): Promise<VoucherPurchaseResponseDTO> {
        const updatedPurchase = await VoucherPurchaseDAL.updateVoucherPurchase(
            Number(id),
            data
        );

        if (!updatedPurchase) {
            throw new ApiError(
                httpStatusCodes.NOT_FOUND,
                apiResponse.error.VOUCHER_PURCHASE_NOT_FOUND
            );
        }

        return new VoucherPurchaseResponseDTO(
            updatedPurchase.id,
            updatedPurchase.user_id,
            updatedPurchase.voucher_id,
            updatedPurchase.price_option,
            updatedPurchase.date,
            updatedPurchase.quantity
        );
    }

    /**
     * Delete voucher purchase by ID.
     */
    static async delete(id: string): Promise<void> {
        const purchase = await VoucherPurchaseDAL.findById(Number(id));

        if (!purchase) {
            throw new ApiError(
                httpStatusCodes.NOT_FOUND,
                apiResponse.error.VOUCHER_PURCHASE_NOT_FOUND
            );
        }

        await VoucherPurchaseDAL.deleteVoucherPurchase(Number(id));
    }
}
