import React, { useState } from "react";
import yunqueHerreroMP4 from "../assets/yunque-herrero.mp4";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GiRocketThruster } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link className="navbar-logo" aria-current="page" to="/">
              <GiRocketThruster
                className="navbar-icon"
                onClick={closeMobileMenu}
              />
              Gallay
            </Link>

            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/help"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Help
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    

      <section className="home">
        <div className="content">
          <h1>
            Industria
            <span>Gallay</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
            unde et autem ipsam voluptates veniam blanditiis adipisci quam
            tempora{" "}
          </p>
          <Link aria-current="page" to="/SignUp">
            Iniciar Sesión
          </Link>
        </div>
        <div className="media-icons">
          <a href=" ">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="">
            <i className="bi bi-youtube"></i>
          </a>
        </div>
      </section>
      <div></div>
      <video muted autoPlay loop>
        <source src={yunqueHerreroMP4} type="video/mp4" />
      </video>
      <div className="capa"></div>
    </div>
  );
};

export default LandingPage;
