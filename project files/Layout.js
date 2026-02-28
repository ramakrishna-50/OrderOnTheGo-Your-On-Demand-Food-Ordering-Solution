import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Layout({ children, cart, search, setSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  if (hideNavbar) {
    return <>{children}</>;
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          🍔 OrderOnTheGo
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
          <Link to="/my-orders">My Orders</Link>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {children}
    </>
  );
}

export default Layout;