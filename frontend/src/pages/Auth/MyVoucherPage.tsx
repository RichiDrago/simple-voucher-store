import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useVoucherPurchases } from "../../hooks/useVoucherPurchases";

// Types
import type { Column } from "../../components/Table";
import type { VoucherPurchase } from "../../types/voucherPurchase";

// Components
import { Page } from "../../components/Page";
import { Table } from "../../components/Table";
import InfoVoucherPurchase from "../../components/Dialog/InfoVoucherPurchase";
import DeleteVoucherPurchase from "../../components/Dialog/DeleteVoucherPurchase";

// Icons
import infoIcon from "/icons/info.svg";
import trashIcon from "/icons/trash.svg";

const TRANSLATION_NAMESPACE = "pages.myVouchers";

const MyVoucherPage = () => {
    // Hooks
    const { t } = useTranslation();
    const { user } = useAuth();
    const { data, loading, refetch } = useVoucherPurchases(user?.token);
    // Data
    const [columns] = useState<Column<VoucherPurchase>[]>([
        {
            header: t(`${TRANSLATION_NAMESPACE}.columns.voucher`),
            accessor: "voucher_id",
        },
        {
            header: t(`${TRANSLATION_NAMESPACE}.columns.priceOption`),
            accessor: "price_option",
        },
        {
            header: t(`${TRANSLATION_NAMESPACE}.columns.quantity`),
            accessor: "quantity",
        },
        {
            header: t(`${TRANSLATION_NAMESPACE}.columns.date`),
            accessor: "date",
        },
    ]);
    // Dialog
    const [selectedItem, setSelectedItem] = useState<VoucherPurchase>();
    const [showInfoVoucher, setShowInfoVoucher] = useState(false);
    const [showDeleteVoucher, setShowDeleteVoucher] = useState(false);

    const handleOpenInfo = (item: VoucherPurchase) => {
        setSelectedItem(item);
        setShowInfoVoucher(true);
    };

    const handleOpenDelete = (item: VoucherPurchase) => {
        setSelectedItem(item);
        setShowDeleteVoucher(true);
    };

    const filteredData = data?.filter((purchase) => purchase.user_id === user?.id) || [];

    return (
        <Page title={t(`${TRANSLATION_NAMESPACE}.title`)} subtitle={t(`${TRANSLATION_NAMESPACE}.subtitle`)}>
            <Table<VoucherPurchase>
                isLoading={loading}
                data={filteredData}
                columns={columns}
                emptyMessage={t(`${TRANSLATION_NAMESPACE}.emptyMessage`)}
                showPagination={false}
                rowActions={(_, row) => (
                    <div className="flex items-center justify-center gap-2">
                        <button className="rounded-md p-2 text-center hover:bg-gray-100" onClick={() => handleOpenInfo(row)}>
                            <img src={infoIcon} alt="info" className="size-5" />
                        </button>
                        <button className="rounded-md p-2 text-center hover:bg-gray-100" onClick={() => handleOpenDelete(row)}>
                            <img src={trashIcon} alt="delete" className="size-5" />
                        </button>
                    </div>
                )}
            />
            {/* Dialog */}
            <DeleteVoucherPurchase
                visible={showDeleteVoucher}
                changeVisibility={setShowDeleteVoucher}
                currentElement={selectedItem}
                refetchFunction={refetch}
            />
            <InfoVoucherPurchase visible={showInfoVoucher} changeVisibility={setShowInfoVoucher} currentElement={selectedItem} />
        </Page>
    );
};

export default MyVoucherPage;
