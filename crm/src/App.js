import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { OrderPage } from "./pages/orders/OrdersPage";
import { LoginPage } from "./pages/login/LoginPage";
import { PrivateRoute } from "./components";
import Logout from "./components/PrivateLogout";

export default function App() {
    return (
        <div className="container">
            <Logout />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <OrderPage />
                        </PrivateRoute>
                    }
                />

                <Route path="login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}
