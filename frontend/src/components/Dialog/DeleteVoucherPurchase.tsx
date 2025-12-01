import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";

// Types
import type { BaseModalProperties } from "../../types/modalProps";
import type { VoucherPurchase } from "../../types/voucherPurchase";

// API
import { deleteVoucherPurchaseApi } from "../../api/voucherPurchase";

// Components
import Modal from "../Dialog";

// Utils
import { notifyApiError } from "../../utils/api";

const DeleteVoucherPurchase = ({
    visible,
    changeVisibility,
    currentElement,
    refetchFunction,
}: BaseModalProperties & {
    currentElement?: VoucherPurchase;
    refetchFunction?: () => void;
}) => {
    // Hooks
    const { t } = useTranslation();
    const { user } = useAuth();
    const notification = useNotification();

    if (!visible) return null;

    // Submit function

    const submitFunction = async () => {
        const response = await deleteVoucherPurchaseApi(user!.token, currentElement!.id);

        if (!response.success) {
            notifyApiError(response, notification);
            return false;
        }

        notification({
            type: "success",
            title: 200,
            message: "voucherPurchaseDeleted",
        });

        refetchFunction?.();

        return true;
    };

    return (
        <Modal
            size="medium"
            title={t(`components.dialog.deleteVoucherPurchase.title`)}
            buttonLabel={t("components.dialog.deleteVoucherPurchase.save")}
            hideModal={changeVisibility}
            submitFunction={submitFunction}
            showErrorText={false}
        >
            <div className="text-center">
                <p className="text-lg">{t(`components.dialog.deleteVoucherPurchase.text`)}</p>
            </div>
        </Modal>
    );
};

export default DeleteVoucherPurchase;
