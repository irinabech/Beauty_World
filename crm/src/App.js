import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { LoginPage } from "./features/login/LoginPage";
import { OrderPage } from "./features/orders/OrdersPage";

export default function App() {
    return (
        <div>
            <h1>Welcome to React Router!</h1>

            <ul>
                <li>
                    <Link to="/">Заявки</Link>
                </li>
                <li>
                    <Link to="/login">Авторизация</Link>
                </li>
            </ul>

            <Routes>
                <Route path="/" element={<OrderPage />} />
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}
