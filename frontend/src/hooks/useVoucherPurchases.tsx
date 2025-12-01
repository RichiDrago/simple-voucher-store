import { useEffect, useState, useCallback } from "react";

// Types
import type { VoucherPurchase } from "../types/voucherPurchase";

// API
import { getVoucherPurchasesApi } from "../api/voucherPurchase";

type UseVoucherPurchasesState = {
    data: VoucherPurchase[] | undefined;
    loading: boolean;
    error: string | null;
};

export const useVoucherPurchases = (token?: string) => {
    const [state, setState] = useState<UseVoucherPurchasesState>({
        data: undefined,
        loading: false,
        error: null,
    });

    const fetchVoucherPurchases = useCallback(async () => {
        if (!token) return;

        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await getVoucherPurchasesApi(token);

        const { success, data, result } = response;

        if (!success) {
            setState({
                data: undefined,
                loading: false,
                error: result.message ?? "Si è verificato un errore",
            });
            return;
        }

        setState({
            data,
            loading: false,
            error: null,
        });
    }, [token]);

    useEffect(() => {
        if (!token) return; // se token mancante → non chiamare API
        fetchVoucherPurchases();
    }, [token, fetchVoucherPurchases]);

    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
        refetch: fetchVoucherPurchases,
    };
};
