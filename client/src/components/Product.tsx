import React from "react";
import fundicion from "../assets/fundiciónPNG.png";
import NavBar2 from "./navbar2/NavBar2";
import "./navbar2/NavBar2.css";
import "./Product.css";
import "animate.css";

const Products = () => {
  return (
    <div>
      <NavBar2 />
      <div className="image-container">
        <img src={fundicion} className="img-fluid" alt="image-fundicion"></img>
        <h1 className="animated-text">
          Comprá la Mejor calidad <br />{" "}
          <h2> Envios a todo el país sin cargo </h2>
        </h1>
      </div>
    </div>
  );
};

export default Products;
