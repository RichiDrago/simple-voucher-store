import { useEffect, useRef, useState } from "react";

// API
import { authLoginApi } from "../api/auth";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

// Types
import type { AuthUser } from "../types/auth";

// Utils
import { extractUserDataFromToken } from "../utils/token";
import { notifyApiError } from "../utils/api";

const TRANSLATION_NAMESPACE = "pages.login";

const LoginPage = () => {
    // Hooks
    const { t } = useTranslation();
    const navigate = useNavigate();
    const notification = useNotification();
    const { setState } = useAuth();
    // State
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberMeRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const username = usernameRef.current!.value!;
        const password = passwordRef.current!.value!;
        const rememberMe = rememberMeRef.current!.checked;

        const response = await authLoginApi(username, password);

        if (!response.success || !response.data) {
            notifyApiError(response, notification);
            setLoading(false);
            return;
        }

        notification({
            type: "success",
            title: response.httpCode,
            message: t("login"),
        });

        setLoading(false);

        const { jwtToken } = response.data;

        const user: AuthUser = extractUserDataFromToken(jwtToken);

        console.log(rememberMe);

        setState({
            type: "SET_USER",
            payload: { ...user, rememberMe },
        });

        navigate("/vouchers");
    };

    const handleGoToRegister = () => {
        navigate("/register");
    };

    // ONLY DEVELOPMENT

    useEffect(() => {
        usernameRef.current!.value = "user";
        passwordRef.current!.value = "user";
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-200/30">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white px-8 py-10 shadow-lg">
                {/* Header  */}
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-semibold text-black"> {t(`${TRANSLATION_NAMESPACE}.title`)}</p>
                    <p className="text-lg text-gray-500"> {t(`${TRANSLATION_NAMESPACE}.subtitle`)}</p>
                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            {t(`${TRANSLATION_NAMESPACE}.username`)}
                        </label>
                        <input
                            id="username"
                            type="username"
                            required
                            className="focus:ring-primary block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:outline-none"
                            placeholder={t(`${TRANSLATION_NAMESPACE}.exampleUsername`)}
                            ref={usernameRef}
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            {t(`${TRANSLATION_NAMESPACE}.password`)}
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="focus:ring-primary block w-full rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:outline-none"
                            placeholder="••••••••"
                            ref={passwordRef}
                        />
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" ref={rememberMeRef} />
                            <span className="text-gray-700">{t(`${TRANSLATION_NAMESPACE}.rememberMe`)}</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary-dark focus:ring-primary w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition focus:ring-2 focus:ring-offset-1 focus:outline-none"
                        disabled={loading}
                    >
                        {t(`${TRANSLATION_NAMESPACE}.${loading ? "submiting" : "submit"}`)}
                    </button>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-center text-xs text-gray-500">
                    <div className="flex space-x-2">
                        <p className="">{t(`${TRANSLATION_NAMESPACE}.noAccount`)}</p>
                        <button type="button" className="text-primary hover:text-primary-dark font-medium" onClick={handleGoToRegister}>
                            {t(`${TRANSLATION_NAMESPACE}.register`)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
