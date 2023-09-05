import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Loader.css"
import anime from 'animejs';


const Loader: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
  
    const timeoutId = setTimeout(() => {
      navigate("/compra-finalizada");
    }, 5000);


    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);



// Wrap every letter in a span
useEffect(() => {
    // Función para verificar si el elemento textWrapper existe antes de acceder a él
    const initAnimation = () => {
      const textWrapper = document.querySelector('.ml16');
      if (!textWrapper) return; 

      const textContent = textWrapper.textContent;
      if (textContent === null) return; // Verifica si textContent es nulo

      textWrapper.innerHTML = textContent.replace(/\S/g, "<span class='letter'>$&</span>");

      anime.timeline({ loop: true })
        .add({
          targets: '.ml16 .letter',
          translateY: [-100, 0],
          easing: "easeOutExpo",
          duration: 1400,
          delay: (_el, i) => 30 * i
        }).add({
          targets: '.ml16',
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        });
    };

    initAnimation();
  }, []);


  return (
    <div className="container-spinner"> 
      <h1 className="ml16">Cargando pedido</h1>
    </div>
  );
};

export default Loader;