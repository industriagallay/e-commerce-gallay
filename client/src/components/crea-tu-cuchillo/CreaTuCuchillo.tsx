import React, { useEffect, useState } from "react";
import fundicion from "../../assets/fundiciónPNG.png";
import NavBar2 from "../navbar2/NavBar2";
import "../navbar2/NavBar2.css";
import "./CreaTuCuchillo.css";
import "animate.css";

const CreaTuCuchillo = () => {
  // Estado para almacenar el nombre de usuario
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el nombre de usuario almacenado en el localStorage al cargar el componente.
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Ejecutamos esto solo una vez al cargar el componente

  return (
    <div>
      <NavBar2 />
      <div className="image-container">
        <img src={fundicion} className="img-fluid" alt="image-fundicion"></img>
        <div className="animated-text ">
          <h1>Bienvenido y Gracias por elegirnos {username}</h1>
          <br /> <h2> Envios a todo el país sin cargo </h2>
        </div>
      </div>
    </div>
  );
};

export default CreaTuCuchillo;
