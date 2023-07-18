import React from "react";
import NavBar2 from "../navbar2/NavBar2";
import { Link } from "react-router-dom";
import herramientas from "../../assets/herramientas.png";
import "./Login.css";
import "../navbar2/NavBar2.css";

const Login = () => {
  return (
    <div>
      <NavBar2 />
      <div className="container-md login">
        <div className="row">
          <div className="col-6">
            <img
              src={herramientas}
              className="imgbackground"
              alt="fondo-image"
            />

            <form className="Loginform ml-auto">
              <div className="Loginheader">Bienvenido a Industria Gallay</div>
              <div className="Logininputs">
                <label htmlFor="Nombre de Usuario"></label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Nombre de Usuario"
                  className="Logininput"
                />

                <label htmlFor="Contraseña"></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  className="Logininput"
                />

                <div className="Logincheckbox-container"></div>
                <button className="Loginsigin-btn">Iniciar Sesión</button>
                <Link to="/" aria-current="page" className="Loginforget">
                  Olvidaste tu contraseña?
                </Link>
                <p className="signup-link">
                  aún no tenes cuenta? <Link to="/signup">registrate</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
