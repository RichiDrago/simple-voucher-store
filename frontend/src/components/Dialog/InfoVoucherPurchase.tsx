import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";

// Types
import type { BaseModalProperties } from "../../types/modalProps";
import type { VoucherPurchase } from "../../types/voucherPurchase";
import type { Voucher } from "../../types/voucher";

// API
import { getVoucherApi } from "../../api/voucher";

// Components
import Modal from "../Dialog";
import { ImageCarousel } from "../Carousel";

// Utils
import { notifyApiError } from "../../utils/api";

const InfoVoucherPurchase = ({
    visible,
    changeVisibility,
    currentElement,
}: BaseModalProperties & {
    currentElement?: VoucherPurchase;
}) => {
    // Hooks
    const { t } = useTranslation();
    const { user } = useAuth();
    const notification = useNotification();
    // State
    const [voucher, setVoucher] = useState<Voucher>();

    useEffect(() => {
        if (!visible || !currentElement) return;

        const fetchVoucherDetails = async () => {
            if (!user) return;

            const response = await getVoucherApi(user.token, currentElement.voucher_id);

            if (response.httpCode !== 200 || !response.data) {
                notifyApiError(response, notification);
                return;
            }

            console.log(response.data);

            setVoucher(response.data);
        };

        fetchVoucherDetails();
    }, [visible]);

    if (!visible) return null;

    // Submit function

    const submitFunction = async () => {
        return true;
    };

    return (
        <Modal
            size="medium"
            title={t(`components.dialog.infoVoucherPurchase.title`)}
            buttonLabel={t("components.dialog.infoVoucherPurchase.save")}
            hideModal={changeVisibility}
            submitFunction={submitFunction}
            showErrorText={false}
        >
            {/* Voucher */}
            <div>
                <p className="text-lg font-semibold">{t("components.dialog.infoVoucherPurchase.voucherName")}</p>
                <p className="text-lg">{voucher?.name}</p>
            </div>
            {/* Voucher description */}
            <div>
                <p className="text-lg font-semibold">{t("components.dialog.infoVoucherPurchase.voucherDescription")}</p>
                <p className="text-lg">{voucher?.description}</p>
            </div>
            {/* Voucher assets */}
            <div>
                <p className="mb-2 text-lg font-semibold">{t("components.dialog.infoVoucherPurchase.voucherAssets")}</p>
                <ImageCarousel images={(voucher?.assets || []).map((asset) => `http://localhost:3000${asset}`)} />
            </div>
            {/* Price Option */}
            <div>
                <p className="text-lg font-semibold">{t("components.dialog.infoVoucherPurchase.priceOption")}</p>
                <p className="text-lg">{currentElement?.price_option}</p>
            </div>
            {/* Quantity */}
            <div>
                <p className="text-lg font-semibold">{t("components.dialog.infoVoucherPurchase.quantity")}</p>
                <p className="text-lg">{currentElement?.quantity}</p>
            </div>
            {/* Date */}
            <div>
                <p className="text-lg font-semibold">{t("components.dialog.infoVoucherPurchase.date")}</p>
                <p className="text-lg">{currentElement?.date}</p>
            </div>
        </Modal>
    );
};

export default InfoVoucherPurchase;
