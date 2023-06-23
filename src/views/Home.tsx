import React from "react";
import yunqueHerreroMP4 from "../assets/yunque-herrero.mp4"
import "./Home.css"

const Home = () => {
  return (
    <main id="hero">
    <div className="promo">
        <h1>¿Estas listo para unas vacacioones
            increibles?</h1>
            <p> ALOJAMIENTO, VUELOS, EQUIPAJE Y MUCHO MAS</p>
            <button type="button">EMPIEZA HOY</button>
        </div>
        <video muted autoPlay loop>  
        <source src={yunqueHerreroMP4} type='video/mp4'/>
        </video>
      <div className="capa"></div>
</main>
  )
}

export default Home;


