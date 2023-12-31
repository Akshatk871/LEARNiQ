import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const [hasToken, setHasToken] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    navigate("/Home");
  };

  return (
    <div className="container-fluid cont1">
      <div className="row">
        <motion.div className="col-sm-7" whileHover={{ scale: 1 }}>
          <img
            src="images/learniq-logo.png"
            height="55px"
            width="55px"
            className="imgg"
            alt="LearnIQ Logo"
          />
          <img
            src="images/learniqtext.png"
            height="30px"
            width="140px"
            alt="LearnIQ Text"
          />
        </motion.div>
        <div className="col-sm-5">
          <nav className="navbar">
            {hasToken && (
              <>
                <ul className="navbar-nav">
                  <Link to="/Quiz" className="nav-link">
                    Quiz
                  </Link>
                </ul>
                <ul className="navbar-nav">
                  <Link to="/Dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </ul>
                <ul className="navbar-nav">
                  <Link to="/Lecture" className="nav-link">
                    Lectures
                  </Link>
                </ul>
              </>
            )}

            {hasToken && (
              <>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
