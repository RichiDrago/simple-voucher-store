import { useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";

// Utils
import { getTokenExpiration } from "../../utils/token";

type AuthLayoutProps = {
    privilege: number;
};

const AuthLayout = ({ privilege }: AuthLayoutProps) => {
    // Hooks
    const { user, dataIsLoaded, setState } = useAuth();
    const notification = useNotification();
    const navigate = useNavigate();

    // Ref per il timer di scadenza del token
    const logoutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearLogoutTimer = () => {
        if (logoutTimeoutRef.current) {
            clearTimeout(logoutTimeoutRef.current);
            logoutTimeoutRef.current = null;
        }
    };

    const userNotAuthenticated = () => {
        clearLogoutTimer();

        setState({ type: "LOGOUT" });
        notification({
            type: "error",
            title: 401,
            message: "SESSION_EXPIRED",
        });
        navigate("/");
    };

    const userUnauthorized = () => {
        notification({
            type: "error",
            title: 401,
            message: "NOT_AUTHORIZED",
        });
        navigate("/home");
    };

    /**
     * Avvia un timer che allo scadere del token esegue il logout.
     */
    const startTokenExpirationTimer = (token: string) => {
        clearLogoutTimer();

        const expiresAt = getTokenExpiration(token);
        if (!expiresAt) {
            // Se non riesco a leggere l'exp, per sicurezza faccio logout immediato
            userNotAuthenticated();
            return;
        }

        const now = Date.now();
        const msUntilExpiry = expiresAt - now;

        if (msUntilExpiry <= 0) {
            // Token già scaduto
            userNotAuthenticated();
            return;
        }

        logoutTimeoutRef.current = setTimeout(() => {
            userNotAuthenticated();
        }, msUntilExpiry);
    };

    const checkIfUserIsAuthenticated = async (): Promise<boolean> => {
        if (!user || !user.token) {
            userNotAuthenticated();
            return false;
        }

        // Se il token è valido, faccio partire/riavvio il timer
        startTokenExpirationTimer(user.token);

        return true;
    };

    const checkIfUserIsAuthorized = () => {
        if (!user) {
            userNotAuthenticated();
            return;
        }

        if (user.privilege_level < privilege) {
            userUnauthorized();
        }
    };

    const checkUser = async () => {
        if (!dataIsLoaded) return;

        const isAuthenticated = await checkIfUserIsAuthenticated();
        if (!isAuthenticated) return;

        checkIfUserIsAuthorized();
    };

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            if (cancelled) return;
            await checkUser();
        };

        run();

        // cleanup: cancella timer e previene side effects dopo unmount
        return () => {
            cancelled = true;
            clearLogoutTimer();
        };
        // Rilancio il controllo quando:
        // - i dati dell’utente sono stati caricati
        // - cambia il token
        // - cambia il privilegio richiesto dal layout
    }, [dataIsLoaded, user?.token, privilege]);

    return <Outlet />;
};

export default AuthLayout;
