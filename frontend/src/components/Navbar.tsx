import { useTranslation } from "react-i18next";
import { Link } from "react-router";

// Images
import logo from "/logo.png";

const NavbarItem = ({ to, label }: { to: string; label: string }) => {
    return (
        <Link to={to} className="text-primary hover:text-secondary rounded-lg p-2 px-4 text-xl font-bold">
            {label}
        </Link>
    );
};

export const Navbar = () => {
    const { t } = useTranslation();

    return (
        <div className="flex bg-white p-2 shadow-sm">
            {/* Logo */}
            <div className="">
                <img src={logo} alt="Logo" className="m-2 h-8" />
            </div>
            {/* Navigation buttons */}
            <div className="flex flex-1 items-center justify-center">
                <div className="space-x-4">
                    <NavbarItem to="/vouchers" label={t("components.navbar.vouchers")} />
                    <NavbarItem to="/my-vouchers" label={t("components.navbar.myVouchers")} />
                </div>
            </div>
            {/* Account */}
            <div className="w-42">{/* Placeholder for account info */}</div>
        </div>
    );
};
