import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    const { isAuth, logout } = useAuth();

    return isAuth ? (
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
    ) : null;
}