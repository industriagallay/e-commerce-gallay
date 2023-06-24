import React from "react";
import yunqueHerreroMP4 from "../assets/yunque-herrero.mp4";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div>
      <header>
        <a href="" className="brand">
          Gallay
        </a>
        <div className="navigation">
          <div className="navigation-items">
            <a href="">Home</a>
            <a href="">Products</a>
            <a href="">Help</a>
            <a href="">About</a>
          </div>
        </div>
      </header>
      <section className="home">
        <div className="content">
          <h1>
            Industria<span>Gallay</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
            unde et autem ipsam voluptates veniam blanditiis adipisci quam
            tempora{" "}
          </p>
          <a href="#">Iniciar Sesion</a>
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
          {/* <a href=""> <i className="fab fa-facebook"></i></a>
          <a href=""> <i className="fab fa-youtube"></i></a>
          <a href=""> <i className="fab fa-instagram"></i></a> */}
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

export default Home;
