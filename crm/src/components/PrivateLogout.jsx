import { useAuth } from '../context/AuthContext';


export default function Logout() {
    const { isAuth, logout } = useAuth();

    return isAuth ? (
        <button onClick={logout}>Logout</button>
    ) : null;
}