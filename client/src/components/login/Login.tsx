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
              <div className="Loginheader">Login</div>
              <div className="Logininputs">
                <label htmlFor="username"></label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="Logininput"
                />

                <label htmlFor="password"></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="Logininput"
                />

                <div className="Logincheckbox-container">
                  <label className="Logincheckbox">
                    <input type="checkbox" id="checkbox" />
                  </label>
                  <label htmlFor="checkbox" className="Logincheckbox-text">
                    Remember me
                  </label>
                </div>
                <button className="Loginsigin-btn">Registrarse</button>
                <Link to="/" aria-current="page" className="Loginforget">
                  Forget password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
