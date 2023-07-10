import React from "react";
import NavBar1 from "../components/NavBar1";
import yunqueHerreroMP4 from "../assets/yunque-herrero.mp4";
import cuchillob1 from "../assets/cuchillob1.webp"
import cuchilloblanco from "../assets/cuchilloblanco.jpg"
import cuchilloblanco1 from "../assets/cuchilloblanco1.webp"
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div>
      <NavBar1/>
      <div className="container-fluid-md">
        <div className="row">
          <div col-6="true">
            <video muted autoPlay loop>
              <source src={yunqueHerreroMP4} type="video/mp4" />
            </video>
            <div className="capa"></div>
          </div>
        </div>
      </div>

      <div className="container text-center home">
        <div className="row align-items-center content">
          <div className="col-9 position-relative">
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

      <div className="text-caption position-absolute top-100 start-50 translate-middle-x">
        <div className="row">
          <p className="col order-last">ENVIOS A TODO EL PAÍS</p>
          <h2 className="col">GALLAY LA MEJOR CALIDAD</h2>
          <p className="col order-first">DESCUENTOS Y PRECIOS ÚNICOS</p>
        </div>
        <hr className="" />
      </div>

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
                  src={cuchillob1}
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
                  src={cuchilloblanco}
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
                  src={cuchilloblanco1}
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
