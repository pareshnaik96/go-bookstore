import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { logout } from '../../features/auth/authSlice'; 
import { useNavigate } from 'react-router-dom';
import '../../style/Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="navbar-toggle" onClick={toggleMenu}>
                    <FaBars size={24} />
                </div>
                <Link to="/dashboard" className="nav-button">Home</Link>
            </nav>

            <div className={menuOpen ? "side-menu open" : "side-menu closed"}>
                <div className="close-button" onClick={toggleMenu}>
                    <FaTimes size={24} />
                </div>
                <Link to="/orders" className="side-link">Orders</Link>
                {/* <Link to="/authors" className="side-link">Authors</Link> */}
                {/* <Link to="/genres" className="side-link">Genres</Link> */}
                <Link to="/about" className="side-link">About</Link>
                {<button className="logout-button" onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    );
};

export default Navbar;
