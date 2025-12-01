export type AuthUser = {
    id: number;
    username: string;
    privilege_name: "admin" | "user";
    privilege_level: number;
    token: string;
};

export type AuthApiResponse = {
    jwtToken: string;
};