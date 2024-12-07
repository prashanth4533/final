import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect the user to the login page
    navigate('/'); // Use navigate to redirect
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/home" className="nav-item">
          Logo
        </NavLink>
      </div>
      <div className="nav-links">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          Home
        </NavLink>
        <NavLink
          to="/Route"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          Route
        </NavLink>
        <NavLink
          to="/Payment"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          Payment
        </NavLink>
      </div>
      <div className="right-links">
        {/* Button triggers the handleLogout function */}
        <button className="btn" onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
