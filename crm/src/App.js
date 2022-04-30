import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { OrderPage } from "./pages/orders/OrdersPage";
import { LoginPage } from "./pages/login/LoginPage";

import { useAuth } from "./context/AuthContext";
import { PrivateRoute } from "./components";
import NavBar from "./components/PrivateMenu";

export default function App() {
    const { isAuth, logout } = useAuth();

    return (
        <div className="container">
            {/* {isAuth && (
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>

                    <button onClick={logout}>Logout</button>
                </nav>
            )} */}

            <NavBar />
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
