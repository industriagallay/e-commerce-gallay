import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiRocketThruster } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import "./navbar3.css";
import Cookies from "js-cookie";

const NavBar3 = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const handleLinkClick = () => {
    closeNav(); // Cerrar el menú al hacer clic en un enlace
  };

  const handleLogout = () => {
    Cookies.remove("token"); // Elimina el token de las cookies
    navigate("/");
  };

  return (
    <div>
      <div className="container-fluid navbar-container">
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar2 navbar-expand-lg navbar-light">
            <Link
              className="navbar-logo"
              aria-current="page"
              to="/"
              onClick={closeNav}
            >
              <GiRocketThruster className="navbar-icon" />
              Gallay
            </Link>

            <button
              className={`navbar-toggler ${isNavOpen ? "" : "collapsed"}`}
              onClick={toggleNav}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={isNavOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`navbar-links-container ${isNavOpen ? "active" : ""}`}
            >
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-links navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      to="/home"
                      className="nav-link active"
                      aria-current="page"
                      onClick={handleLinkClick}
                    >
                      Inicio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/creatucuchillo"
                      className="nav-link active"
                      aria-current="page"
                      onClick={handleLinkClick}
                    >
                      Crea Tu Cuchillo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/help"
                      className="nav-link active"
                      aria-current="page"
                      onClick={handleLinkClick}
                    >
                      Ayuda
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/admin"
                      className="nav-link active"
                      aria-current="page"
                      onClick={handleLinkClick}
                    >
                      Panel de administrador{" "}
                    </Link>
                  </li>
                </ul>
                <div className="btn-iniciar-sesion-landing">
                  <button className="button-cerrar-sesion">
                    <span className="button_lg_cerrar-sesion">
                      <span className="button_sl_cerrar-sesion"></span>

                      <Link to="/" className="button_text_cerrar-sesion">
                        <button
                          className="button-cerrar-sesion-custom"
                          onClick={handleLogout}
                        >
                          Cerrar Sesión
                        </button>
                      </Link>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default NavBar3;