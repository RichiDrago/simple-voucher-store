import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";

// Types
import type { BaseModalProperties } from "../../types/modalProps";
import type { NewVoucherPurchase } from "../../types/voucherPurchase";
import type { Voucher } from "../../types/voucher";

// API
import { createVoucherPurchaseApi } from "../../api/voucherPurchase";

// Components
import Modal from "../Dialog";

// Utils
import { notifyApiError } from "../../utils/api";

const AddVoucherPurchase = ({
    visible,
    changeVisibility,
    currentElement,
}: BaseModalProperties & {
    currentElement?: Voucher;
}) => {
    // Hooks
    const { t } = useTranslation();
    const { user } = useAuth();
    const notification = useNotification();
    // Refs
    const priceOptionRef = useRef<HTMLSelectElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);

    if (!visible) return null;

    // Submit function

    const submitFunction = async () => {
        const price_option = priceOptionRef.current!.value;
        const quantity = parseInt(quantityRef.current!.value);

        const newVoucherPurchase: NewVoucherPurchase = {
            user_id: user!.id,
            voucher_id: currentElement!.id,
            price_option,
            date: new Date().toDateString(),
            quantity,
        };

        const response = await createVoucherPurchaseApi(user!.token, newVoucherPurchase);

        if (!response.success) {
            notifyApiError(response, notification);
            return false;
        }

        notification({
            type: "success",
            title: 200,
            message: "voucherPurchaseCreated",
        });

        return true;
    };

    return (
        <Modal
            size="medium"
            title={t(`components.dialog.addVoucherPurchase.title`)}
            buttonLabel={t("components.dialog.addVoucherPurchase.save")}
            hideModal={changeVisibility}
            submitFunction={submitFunction}
            showErrorText={false}
        >
            {/* Selected voucher */}
            <div>
                <p className="text-lg font-semibold">{t("components.dialog.addVoucherPurchase.voucher")}</p>
                <p className="text-lg">{currentElement?.name}</p>
            </div>
            {/* Price option */}
            <div className="space-y-2">
                <label htmlFor="priceOption" className="block text-sm font-medium text-gray-700">
                    {t("components.dialog.addVoucherPurchase.priceOption")}
                </label>
                <select
                    id="priceOption"
                    ref={priceOptionRef}
                    className="focus:ring-primary block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:outline-none"
                >
                    {currentElement?.price_options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            {/* Quantity */}
            <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    {t("components.dialog.addVoucherPurchase.quantity")}
                </label>
                <input
                    id="quantity"
                    type="number"
                    defaultValue={1}
                    min={1}
                    ref={quantityRef}
                    className="focus:ring-primary block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:outline-none"
                />
            </div>
        </Modal>
    );
};

export default AddVoucherPurchase;
