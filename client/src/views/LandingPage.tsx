import React from "react";
import { Link } from "react-router-dom";
import { GiRocketThruster } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import yunqueHerreroMP4 from "../assets/yunque-herrero.mp4";
import cuchillo2 from "../assets/cuchillo2.jpg";
import proyecto1 from "../assets/proyecto1.png.png";
import cuchillo3 from "../assets/cuchillo3.jpeg";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div>
      <div className="container-fluid navbar-container">
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar navbar-expand-md navbar-light">
            <Link className="navbar-logo" aria-current="page" to="/">
              <GiRocketThruster className="navbar-icon" />
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
              <span className="navbar-toggler-icon"></span>
            </button>
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
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/products"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/help"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Help
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Signup
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </div>
      <div className="container-fluid-md">
        <div className="row">
          <div col-6>
            <video muted autoPlay loop>
              <source src={yunqueHerreroMP4} type="video/mp4" />
            </video>
            <div className="capa"></div>
          </div>
        </div>
      </div>

      <div className="container text-center home">
        <div className="row align-items-center content">
          <div className="col-9">
            <h1>
              {" "}
              Industria <span> Gallay </span>
            </h1>
          </div>
          <p>
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed et
            labore ipsum accusamus beatae. Libero repellendus incidunt provident
            ea minus magni vero necessitatibus, doloribus rerum quae, temporibus
            officia laborum quod!
          </p>
        </div>
      </div>
      <div className="carousel-container">
        <div
          id="carouselExampleControlsNoTouching"
          className="carousel slide"
          data-bs-touch="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={proyecto1} className="d-block w-90" alt="cuchillo" />
            </div>
            <div className="carousel-item">
              <img src={cuchillo2} className="d-block w-90" alt="cuchillo" />
            </div>
            <div className="carousel-item">
              <img src={cuchillo3} className="d-block w-90" alt="cuchillo" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <footer className="seccion-oscura d-flex flex-column align-items-center justify-content-center">
        <Link className="navbar-footer" aria-current="page" to="/">
          <GiRocketThruster className="footer-icon" />
          Gallay
        </Link>
        {/* <img className="footer-logo" src="../Mi-Portfolio/image/icon.png.png" alt="Logo del portafolio"/> */}
        <p className="footer-texto text-center">
          Industria Gallay
          <br />
          vos lo pedis nosotros lo hacemos
        </p>
        <div className="iconos-redes-sociales d-flex flex-wrap align-items-center justify-content-center">
          <a href="" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-youtube"></i>
          </a>
          <a
            href="mailto:alanabelpereyra322@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-envelope-at-fill"></i>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
        <div className="derechos-de-autor">
          Creado por Jon Nahuel Pereyra y Alan Abel pereyra (2023) &#169;
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
