import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiRocketThruster } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import "./NavBar2.css";

interface NavBar2Props {
  handleLogout: () => void; // Define la prop handleLogout como una función sin parámetros y sin valor de retorno
}

const NavBar2: React.FC<NavBar2Props> = ({ handleLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const cerrarSesion = () => {
    // Remove user data from local storage when logging out
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div className="navbar-container">
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className=" navbar2 bg-dark navbar-expand-md navbar-light container-fluid">
            <Link className="navbar2-logo" aria-current="page" to="/">
              <GiRocketThruster className="navbar2-icon" />
              Gallay
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar2-toggler-icon"></span>
            </button>

            <div className="navbar2-links-container">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar2-links navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      to="/home"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/creatucuchillo"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Crea Tu Cuchillo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/help"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Ayuda
                    </Link>
                  </li>
                  {/* <div className="btn-iniciar-sesion2-landing">
                    <button className="button-iniciar2-sesion">
                      <span className="button_lg_iniciar2-sesion">
                        <span className="button_sl_iniciar2-sesion"></span>

                        <Link
                          to="/login"
                          className="button_text_iniciar2-sesion"
                    
                        >
                          Iniciar Sesión
                        </Link>
                      </span>
                    </button>
                  </div> */}

                  <button onClick={cerrarSesion}>Cerrar Sesión</button>
                </ul>
              </div>
            </div>
          </nav>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default NavBar2;
