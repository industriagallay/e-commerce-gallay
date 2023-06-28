import React from "react";
import yunqueHerreroMP4 from "../assets/yunque-herrero.mp4";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div>
      <nav className="navbar">
        <Link className="nav-logo" aria-current="page" to="/">
          Gallay
        </Link>

        <div className="nav-items">
          <Link aria-current="page" to="/Home">
            Home
          </Link>

          <Link aria-current="page" to="/Products">
            Products
          </Link>

          <Link aria-current="page" to="/Help">
            Help
          </Link>

          <Link aria-current="page" to="/Login">
            Login
          </Link>
        </div>
      </nav>

      <section className="home">
        <div className="content">
          <h1>
            Industria
            <span>Gallay</span>
          </h1>
          <p>
            Loremd dolor sit amet, consectetur adipisicing elit. Debitis unde et
            autem ipsam voluptates veniam blanditiis adipisci quam tempora{" "}
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
