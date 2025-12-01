import { useTranslation } from "react-i18next";

// Types
import type { BaseModalProperties } from "../../types/modalProps";
import type { Voucher } from "../../types/voucher";

// Components
import Modal from "../Dialog";
import { ImageCarousel } from "../Carousel";

const InfoVoucher = ({
    visible,
    changeVisibility,
    currentElement,
}: BaseModalProperties & {
    currentElement?: Voucher;
}) => {
    // Hooks
    const { t } = useTranslation();

    if (!visible) return null;

    // Submit function

    const submitFunction = async () => {
        return true;
    };

    return (
        <Modal
            size="medium"
            title={t(`components.dialog.infoVoucher.title`)}
            buttonLabel={t("components.dialog.infoVoucher.save")}
            hideModal={changeVisibility}
            submitFunction={submitFunction}
            showErrorText={false}
        >
            {/* Voucher */}
            <div>
                <p className="text-lg font-semibold">{t("components.dialog.infoVoucher.name")}</p>
                <p className="text-lg">{currentElement?.name}</p>
            </div>
            {/* Voucher description */}
            <div>
                <p className="text-lg font-semibold">{t("components.dialog.infoVoucher.description")}</p>
                <p className="text-lg">{currentElement?.description}</p>
            </div>
            {/* Voucher assets */}
            <div>
                <p className="mb-2 text-lg font-semibold">{t("components.dialog.infoVoucher.assets")}</p>
                <ImageCarousel images={(currentElement?.assets || []).map((asset) => `http://localhost:3000${asset}`)} />
            </div>
            {/* Price Option */}
            <div>
                <p className="text-lg font-semibold">{t("components.dialog.infoVoucher.priceOptions")}</p>
                <p className="text-lg">{currentElement?.price_options.join(", ")}</p>
            </div>
        </Modal>
    );
};

export default InfoVoucher;
