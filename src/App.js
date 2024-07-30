// ** React Imports
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// ** Store & Actions
import { useSelector } from "react-redux";

// ** Custom Components
import AdminLayout from "layouts/Admin/Admin.js";
import LoginForm from "views/login/Login";
import ForgotPassword from "views/forgotpassowrd/verifyemail";
// import VerifyOtp from "views/forgotpassowrd/verifyotp";
import ResetPassword from "views/forgotpassowrd/Resetpassword";

const App = () => {
    const userStore = useSelector((state) => state.login);

    const isAuthenticated = userStore?.authUserItem?._id && userStore?.accessToken;

    return (
        <Routes>
            {!isAuthenticated && (
                <Route path="/" element={(<LoginForm />)} />
            )}
            {!isAuthenticated && (
                <Route path="/forgot-passowrd" element={(<ForgotPassword />)} />
            )}
            {/* {!isAuthenticated && (
                <Route path="/verifyotp" element={(<VerifyOtp />)} />
            )} */}
            {!isAuthenticated && (
                <Route path="/resetpassword/:token" element={(<ResetPassword />)} />
            )}

            {isAuthenticated && (
                <Route path="/admin/*" element={(<AdminLayout />)} />
            )}

            {isAuthenticated && (
                <Route path="*" element={(
                    <Navigate to="/admin/dashboard" replace />
                )} />
            )}

            {!isAuthenticated && (
                <Route path="*" element={(<Navigate to="/" replace />)} />
            )}
        </Routes>
    )
}

export default App;
