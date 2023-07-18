import React from "react";
import NavBar1 from "../components/navbar1/NavBar1";
import yunqueHerreroMP4 from "../assets/yunque-herrero.mp4";
import arte1 from "../assets/arte1.PNG.png";
import arte2 from "../assets/arte2.PNG.png";
import arte3 from "../assets/arte3.PNG.png";
import "animate.css";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div>
      <NavBar1 />
      <div className="container-fluid-md">
        <div className="row">
          <div col-6="true">
            <video muted autoPlay loop>
              <source src={yunqueHerreroMP4} type="video/mp4" />
            </video>
            <div className="capa"></div>
          </div>

          <div className="container text-center homeLanding">
            <div className="row align-items-center content">
              <div className="texto-Industria1">
                <ul className="UL-blur">
                  <li className="LI-blur">I</li>
                  <li className="LI-blur">N</li>
                  <li className="LI-blur">D</li>
                  <li className="LI-blur">U</li>
                  <li className="LI-blur">S</li>
                  <li className="LI-blur">T</li>
                  <li className="LI-blur">R</li>
                  <li className="LI-blur">I</li>
                  <li className="LI-blur">A</li>
                </ul>
              </div>
              <div className="texto-Gallay2">
                <ul className="UL-blur">
                  <li className="LI-blur">G</li>
                  <li className="LI-blur">A</li>
                  <li className="LI-blur">L</li>
                  <li className="LI-blur">L</li>
                  <li className="LI-blur">A</li>
                  <li className="LI-blur">Y</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="text-caption position-absolute top-100 start-50 translate-middle-x">
          <div className="row">
            <p className="col order-last animate__animated animate__fadeIn">
              ENVIOS A TODO EL PAÍS
            </p>
            <h2 className="col animate__animated animate__jackInTheBox">
              GALLAY LA MEJOR CALIDAD
            </h2>
            <p className="col order-first animate__animated animate__fadeIn">
              DESCUENTOS Y PRECIOS ÚNICOS
            </p>
          </div>
          <hr className="" />
        </div>
      </section>
      {/* <div className="text-caption position-absolute top-100 start-50 translate-middle-x">
        <div className="row">
          <div className="col order-last animate__animated animate__fadeIn">
            <p>ENVIOS A TODO EL PAÍS</p>
          </div>
        </div>
        <div className="row">
          <div className="col animate__animated animate__jackInTheBox">
            <h2>GALLAY LA MEJOR CALIDAD</h2>
          </div>
        </div>
        <div className="row">
          <div className="col order-first animate__animated animate__fadeIn">
            <p>DESCUENTOS Y PRECIOS ÚNICOS</p>
          </div>
        </div>
        <hr />
      </div> */}

      <div className="carousel-wrapper my-5">
        <div className="carousel-container col-12">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-wrap="false"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner" data-bs-interval="5000">
              <div className="carousel-item active">
                <img
                  src={arte1}
                  className="d-block w-100 carousel-image"
                  alt="image-cuchillo"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="h5carrousel">First slide label</h5>
                  <p className="pcarrousel">
                    Some representative placeholder content for the first slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src={arte2}
                  className="d-block w-100 carousel-image"
                  alt="image-cuchillo"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="h5carrousel">Second slide label</h5>
                  <p className="pcarrousel">
                    Some representative placeholder content for the second
                    slide.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src={arte3}
                  className="d-block w-100 carousel-image"
                  alt="image-cuchillo"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="h5carrousel">Third slide label</h5>
                  <p className="pcarrousel">
                    Some representative placeholder content for the third slide.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
