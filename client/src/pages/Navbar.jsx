import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { capitalizeName } from "../utils/capitalizeName";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "admin" or "candidate"
  const name = localStorage.getItem("name");

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout successful");
    navigate("/login");
  };

  // Function to handle link click and collapse menu
  const handleNavLinkClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="" onClick={handleNavLinkClick}>
          <i className="bi bi-briefcase-fill me-2"></i>NoJobs
        </Link>

        {/* Toggle button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarNav"
        >
          {location.pathname === "/home" && (
            <ul className="navbar-nav mx-auto me-1">
              <li className="nav-item">
                <Link className="nav-link active" to="/home" onClick={handleNavLinkClick}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="" onClick={handleNavLinkClick}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="" onClick={handleNavLinkClick}>
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="" onClick={handleNavLinkClick}>
                  Contact
                </Link>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto gap-2">
            {!token ? (
              <>
                <li className="nav-item me-2">
                  <Link
                    className="btn btn-outline-light btn-sm d-inline-flex align-items-center gap-1 px-3"
                    to="/login"
                    onClick={handleNavLinkClick}
                  >
                    <i className="bi bi-box-arrow-in-right"></i> Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-outline-light btn-sm d-inline-flex align-items-center gap-1 px-3"
                    to="/signup"
                    onClick={handleNavLinkClick}
                  >
                    <i className="bi bi-pencil-square"></i> Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                {role === "admin" && (
                  <>
                    {location.pathname !== "/admin/home" && (
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          to="/admin/home"
                          onClick={handleNavLinkClick}
                        >
                          Home
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <span className="nav-link">👤 Admin</span>
                    </li>
                  </>
                )}

                {role === "candidate" && (
                  <li className="nav-item">
                    <span className="nav-link">👤 {capitalizeName(name)}</span>
                  </li>
                )}

                <li className="nav-item d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-outline-light btn-sm ms-lg-2 mt-lg-0"
                    onClick={() => {
                      handleLogout();
                      setIsCollapsed(true);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
