import { useTranslation } from "react-i18next";
import { Link } from "react-router";

// Const
const TRANSLATION_NAMESPACE = "pages.notFound";

export const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-2/3 text-center">
                <p className="text-primary text-8xl font-bold"> {t(`${TRANSLATION_NAMESPACE}.titleShort`)} </p>
                <p className="text-secondary mb-5 text-3xl font-semibold"> {t(`${TRANSLATION_NAMESPACE}.title`)} </p>
                <p className="text-foreground mb-10 text-lg font-light"> {t(`${TRANSLATION_NAMESPACE}.description`)} </p>
                <Link to="/vouchers" className="bg-primary hover:bg-secondary rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white">
                    {t(`${TRANSLATION_NAMESPACE}.home`)}
                </Link>
            </div>
        </div>
    );
};
