// DAL
import { VoucherDAL } from "../dal/voucher.dal.js";

// DTO
import { UpdateVoucherDTO, VoucherResponseDTO } from "../dto/voucher.dto.js";

// Utils
import ApiError from "../utils/apiError.js";

// Consts
import apiResponse from "../const/apiResponse.js";
import httpStatusCodes from "../const/httpStatusCodes.js";

export class VoucherService {
    /**
     * Get all vouchers.
     */
    static async getAll(): Promise<VoucherResponseDTO[]> {
        const vouchers = await VoucherDAL.getAllVouchers();

        return vouchers.map((voucher) => {
            return new VoucherResponseDTO(
                voucher.id,
                voucher.name,
                voucher.description ?? null,
                voucher.Assets ? voucher.Assets.map((asset) => asset.path) : [],
                voucher.PriceOptions
                    ? voucher.PriceOptions.map((po) => po.price)
                    : []
            );
        });
    }

    /**
     * Get voucher by ID.
     */
    static async getById(id: string): Promise<VoucherResponseDTO> {
        const voucher = await VoucherDAL.findById(Number(id));

        if (!voucher) {
            throw new ApiError(
                httpStatusCodes.NOT_FOUND,
                apiResponse.error.VOUCHER_NOT_FOUND
            );
        }

        return new VoucherResponseDTO(
            voucher.id,
            voucher.name,
            voucher.description ?? null,
            voucher.Assets ? voucher.Assets.map((asset) => asset.path) : [],
            voucher.PriceOptions
                ? voucher.PriceOptions.map((po) => po.price)
                : []
        );
    }

    /**
     * Update voucher by ID.
     */
    static async update(
        id: string,
        data: UpdateVoucherDTO
    ): Promise<VoucherResponseDTO> {
        const updatedVoucher = await VoucherDAL.updateVoucher(Number(id), data);

        if (!updatedVoucher) {
            throw new ApiError(
                httpStatusCodes.NOT_FOUND,
                apiResponse.error.VOUCHER_NOT_FOUND
            );
        }

        return new VoucherResponseDTO(
            updatedVoucher.id,
            updatedVoucher.name,
            updatedVoucher.description ?? null
        );
    }

    /**
     * Delete voucher by ID.
     */
    static async delete(id: string): Promise<void> {
        const voucher = await VoucherDAL.findById(Number(id));

        if (!voucher) {
            throw new ApiError(
                httpStatusCodes.NOT_FOUND,
                apiResponse.error.VOUCHER_NOT_FOUND
            );
        }

        await VoucherDAL.deleteVoucher(Number(id));
    }
}
