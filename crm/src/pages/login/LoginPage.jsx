import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthForm from "./AuthForm";
import {  Typography } from 'antd';
import "../../App.css";

const { Title } = Typography;

export function LoginPage() {
    const { isAuth, login } = useAuth();

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container-login">  
            <Title align="center">Авторизация</Title>
            <AuthForm onLogin={login} />
        </div>)
}