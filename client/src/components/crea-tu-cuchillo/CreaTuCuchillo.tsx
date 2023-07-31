import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fundicion from "../../assets/img/fundiciónPNG.png";
import "./CreaTuCuchillo.css";
import "animate.css";
import NavBar2 from "../navbar2/NavBar2";
import NavBar1 from "../navbar1/NavBar1";

const CreaTuCuchillo = () => {
  const location = useLocation();
  // Estado para almacenar el nombre de usuario
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Obtén el nombre de usuario del estado de ubicación
    const storedUsername = location.state && location.state.username;
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [location.state]); // Ejecutamos esto cada vez que cambia el estado de ubicación

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setIsAdmin(false); // Asegurarse de que isAdmin esté configurado como false al cerrar sesión
    navigate("/", { replace: true }); // Redirige a la landing ("/")
  };

  return (
    <div>
      {isLoggedIn ? <NavBar2 handleLogout={handleLogout} /> : <NavBar1 />}
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
