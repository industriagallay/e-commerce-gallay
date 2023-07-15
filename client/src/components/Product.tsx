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
        <div className="animated-text ">
          <h1>Comprá la Mejor calidad</h1>
          <br /> <h2> Envios a todo el país sin cargo </h2>
        </div>
      </div>
    </div>
  );
};

export default Products;
