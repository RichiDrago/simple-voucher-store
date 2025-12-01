import React from "react";
import { useTranslation } from "react-i18next";

// Components
import { Loading } from "./Loading";

const TRANSLATION_NAMESPACE = "components.table";

// Icons
import arrowLeftIcon from "/icons/arrow-left.svg";
import arrowRightIcon from "/icons/arrow-right.svg";

export type Column<T> = {
    /** Testo dell’header */
    header: string;
    /** Chiave dell’oggetto da mostrare in questa colonna */
    accessor: keyof T;
    className?: string;
    cell?: (value: T[keyof T], row: T) => React.ReactNode;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    rowKey?: keyof T; // Campo da usare come key unica (se non definito, uso l’indice)
    isLoading: boolean;
    emptyMessage: string;
    showPagination?: boolean;
    itemForPage?: number;
    itemForPageValues?: number[];
    handleChangeItemForPage?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handlePreviousPage?: () => void;
    handleNextPage?: () => void;
    /** Nodo custom per la colonna azioni: decidi tu cosa renderizzare */
    rowActions?: (id: T[keyof T] | undefined, row: T) => React.ReactNode;
};

export const Table = <T,>({
    columns,
    data,
    rowKey,
    isLoading = false,
    emptyMessage = "No data available",
    showPagination = true,
    itemForPage = 10,
    itemForPageValues = [10, 20, 50, 100],
    handleChangeItemForPage,
    handlePreviousPage,
    handleNextPage,
    rowActions,
}: DataTableProps<T>) => {
    // Hooks
    const { t } = useTranslation();

    const isEmpty = !data || data.length === 0;

    // Loading state or empty state
    if (isLoading || isEmpty) {
        return (
            <div className="flex flex-1 items-center justify-center">
                {isLoading ? <Loading /> : <p className="text-foreground text-xl italic">{emptyMessage}</p>}
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200">
            {/* Table */}
            <div className="max-h-[calc(100vh-312px)] flex-1 overflow-y-auto">
                <table className="w-full divide-y divide-slate-200 text-center text-sm">
                    {/*  Headers */}
                    <thead className="bg-primary sticky top-0 z-10">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={String(col.accessor)}
                                    scope="col"
                                    className={`px-4 py-2 text-center text-xs font-semibold text-white uppercase ${col.className ?? ""}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                            {rowActions && <th scope="col"></th>}
                        </tr>
                    </thead>
                    {/* Body */}
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, index) => {
                            const key = rowKey ? String(row[rowKey]) : index;
                            const id = rowKey ? row[rowKey] : undefined;

                            return (
                                <tr key={key} className="transition-colors hover:bg-slate-50">
                                    {columns.map((col) => {
                                        const rawValue = row[col.accessor];
                                        return (
                                            <td
                                                key={String(col.accessor)}
                                                className={`px-4 py-2 text-center align-middle text-slate-800 ${col.className ?? ""}`}
                                            >
                                                {col.cell ? col.cell(rawValue, row) : (rawValue as React.ReactNode)}
                                            </td>
                                        );
                                    })}

                                    {rowActions && <td className="px-4 py-2 text-center align-middle text-slate-800">{rowActions(id, row)}</td>}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            {showPagination && (
                <div className="flex justify-end space-x-12 border-t-2 border-gray-200 p-2 px-4">
                    {/* Item for page */}
                    <div className="flex items-center space-x-4">
                        <p>{t(`${TRANSLATION_NAMESPACE}.itemForPage`)}</p>
                        <select
                            className="w-20 rounded-md border border-gray-400 p-1 text-center text-xl"
                            value={itemForPage}
                            onChange={handleChangeItemForPage}
                        >
                            {itemForPageValues.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Page number */}
                    <div className="space-x-2">
                        <button className="rounded-lg p-2 hover:bg-gray-200" onClick={handlePreviousPage}>
                            <img src={arrowLeftIcon} alt="previous" />
                        </button>
                        <button className="rounded-lg p-2 hover:bg-gray-200" onClick={handleNextPage}>
                            <img src={arrowRightIcon} alt="next" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
