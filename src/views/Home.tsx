import React from 'react'
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
        <video muted autoPlay loop> <source /></video>

</main>
  )
}

export default Home;


