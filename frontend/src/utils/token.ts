// Model
import type { AuthUser } from "../types/auth";

const decodeJwtToken = (token: string) => {
    const claims = atob(token.split(".")[1]);
    return JSON.parse(claims);
};

const extractUserDataFromToken = (token: string): AuthUser => {
    const userData = decodeJwtToken(token);

    return {
        id: userData.id,
        username: userData.username,
        privilege_name: userData.privilege_name,
        privilege_level: userData.privilege_level,
        token,
    };
};

const getTokenExpiration = (token: string): number | null => {
    try {
        const parts = token.split(".");
        if (parts.length < 2) return null;

        const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        if (!payload.exp) return null;

        // exp è in secondi -> converto in millisecondi
        return payload.exp * 1000;
    } catch {
        return null;
    }
};

export { decodeJwtToken, extractUserDataFromToken, getTokenExpiration };
