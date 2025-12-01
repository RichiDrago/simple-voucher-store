import { createContext, useEffect, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";

// Models and API
import type { AuthUser } from "../types/auth";
import { extractUserDataFromToken } from "../utils/token";

type AuthContextType = {
    user: AuthUser | null;
    dataIsLoaded: boolean;
};

const authReducer = (
    state: AuthContextType,
    action: {
        type: "SET_USER" | "SET_DATA_IS_LOADED" | "LOGOUT";
        payload?: (AuthUser & { rememberMe: boolean }) | boolean;
    }
): AuthContextType => {
    switch (action.type) {
        case "SET_USER": {
            const { token, rememberMe } = action.payload as AuthUser & { rememberMe?: boolean };
            if (rememberMe) localStorage.setItem("token", token);
            return { ...state, user: action.payload as AuthUser };
        }

        case "SET_DATA_IS_LOADED":
            return { ...state, dataIsLoaded: true };

        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export const AuthContext = createContext<
    {
        setState: Dispatch<{
            type: "SET_DATA_IS_LOADED" | "LOGOUT" | "SET_USER";
            payload?: (AuthUser & { rememberMe: boolean }) | undefined;
        }>;
    } & AuthContextType
>({
    user: null,
    dataIsLoaded: false,
    setState: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useReducer(authReducer, {
        user: null,
        dataIsLoaded: false,
    });

    useEffect(() => {
        const loadUserDataFromLocalStorage = () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            const user: AuthUser = extractUserDataFromToken(token);
            setState({ type: "SET_USER", payload: { ...user, rememberMe: true } });
        };

        const loadDataFromLocalStorage = () => {
            loadUserDataFromLocalStorage();
            setState({ type: "SET_DATA_IS_LOADED" });
        };

        loadDataFromLocalStorage();
    }, []);

    return <AuthContext.Provider value={{ ...state, setState }}>{children}</AuthContext.Provider>;
}
