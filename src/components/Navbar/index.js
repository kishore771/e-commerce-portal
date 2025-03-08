import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for menu toggle
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle dropdown

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove auth token
    navigate("/login"); // Redirect to login
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">E-Commerce Portal</h1>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Links (Hidden on Desktop, Dropdown in Mobile) */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {isAuthenticated ? (
          <>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><Link to="/invoices" onClick={() => setMenuOpen(false)}>Invoices</Link></li>
            <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

