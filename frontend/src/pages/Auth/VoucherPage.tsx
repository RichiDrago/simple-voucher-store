import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useVouchers } from "../../hooks/useVoucher";

// Types
import type { Column } from "../../components/Table";
import type { Voucher } from "../../types/voucher";

// Components
import { Page } from "../../components/Page";
import { Table } from "../../components/Table";
import InfoVoucher from "../../components/Dialog/InfoVoucher";
import AddVoucherPurchase from "../../components/Dialog/AddVoucherPurchase";

// Icons
import infoIcon from "/icons/info.svg";
import plusIcon from "/icons/plus.svg";

const TRANSLATION_NAMESPACE = "pages.vouchers";

const VoucherPage = () => {
    // Hooks
    const { t } = useTranslation();
    const { user } = useAuth();
    const { data, loading } = useVouchers(user?.token);
    // Data
    const [columns] = useState<Column<Voucher>[]>([
        {
            header: t(`${TRANSLATION_NAMESPACE}.columns.name`),
            accessor: "name",
        },
        {
            header: t(`${TRANSLATION_NAMESPACE}.columns.description`),
            accessor: "description",
        },
        {
            header: t(`${TRANSLATION_NAMESPACE}.columns.priceOptions`),
            accessor: "price_options",
            cell: (value) => {
                if (typeof value === "object") return value.join(", ");
                return value;
            },
        },
    ]);
    // Dialog
    const [selectedItem, setSelectedItem] = useState<Voucher>();
    const [showInfoVoucher, setShowInfoVoucher] = useState(false);
    const [showDeleteVoucher, setShowDeleteVoucher] = useState(false);

    const handleOpenInfo = (item: Voucher) => {
        setSelectedItem(item);
        setShowInfoVoucher(true);
    };

    const handleOpenAdd = (item: Voucher) => {
        setSelectedItem(item);
        setShowDeleteVoucher(true);
    };

    return (
        <Page title={t(`${TRANSLATION_NAMESPACE}.title`)} subtitle={t(`${TRANSLATION_NAMESPACE}.subtitle`)}>
            <Table<Voucher>
                isLoading={loading}
                data={data || []}
                columns={columns}
                emptyMessage={t(`${TRANSLATION_NAMESPACE}.emptyMessage`)}
                showPagination={false}
                rowActions={(_, row) => (
                    <div className="flex items-center justify-center gap-2">
                        <button className="rounded-md p-2 text-center hover:bg-gray-100" onClick={() => handleOpenInfo(row)}>
                            <img src={infoIcon} alt="info" className="size-5" />
                        </button>
                        <button className="rounded-md p-2 text-center hover:bg-gray-100" onClick={() => handleOpenAdd(row)}>
                            <img src={plusIcon} alt="plus" className="size-5" />
                        </button>
                    </div>
                )}
            />
            {/* Dialog */}
            <InfoVoucher visible={showInfoVoucher} changeVisibility={() => setShowInfoVoucher(false)} currentElement={selectedItem} />
            <AddVoucherPurchase visible={showDeleteVoucher} changeVisibility={() => setShowDeleteVoucher(false)} currentElement={selectedItem} />
        </Page>
    );
};

export default VoucherPage;
