import { Route, Routes } from "react-router";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
// Auth
import AuthLayout from "./pages/Auth/AuthLayout";
import VoucherPage from "./pages/Auth/VoucherPage";
import MyVoucherPage from "./pages/Auth/MyVoucherPage";

// Const
import { ROLE } from "./const/role";

function App() {
    return (
        <div className="h-screen w-screen">
            <Routes>
                {/* Login */}
                <Route path="/" element={<LoginPage />} />
                {/* Register */}
                <Route path="/register" element={<RegisterPage />} />
                {/* 404 Not Found */}
                <Route path="*" element={<NotFoundPage />} />
                <Route element={<AuthLayout privilege={ROLE.USER} />}>
                    {/* Voucher Page */}
                    <Route path="/vouchers" element={<VoucherPage />} />
                    {/* My Voucher Page */}
                    <Route path="/my-vouchers" element={<MyVoucherPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
