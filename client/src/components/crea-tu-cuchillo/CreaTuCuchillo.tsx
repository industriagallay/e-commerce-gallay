import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fundicion from "../../assets/img/fundiciónPNG.png";
import "./CreaTuCuchillo.css";
import "animate.css";

const CreaTuCuchillo = () => {
  const location = useLocation();
  // Estado para almacenar el nombre de usuario
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Obtén el nombre de usuario del estado de ubicación
    const storedUsername = location.state && location.state.username;
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [location.state]); // Ejecutamos esto cada vez que cambia el estado de ubicación


  return (
    <div>
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
