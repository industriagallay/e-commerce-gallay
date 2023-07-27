import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NavBar1 from "../../components/navbar1/NavBar1";
import yunqueHerreroMP4 from "../../assets/yunque-herrero.mp4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import "./LandingPage.css";
import { dataDigitalBestSeller } from "./data";

// interface Products {
//   _id: string;
//   title: string;
//   backgroundImage: string;
//   price: number;
//   category: string;
//   name: string;
//   desciption: string;
//   stock: number;
// }

const LandingPage: React.FC = () => {
  // const [products, setProducts] = useState<Products[]>([]);

  // useEffect(() => {
  // Hacemos la solicitud GET a la API para obtener los productos
  //   fetch("/api/getAllProductsHandler")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data))
  //     .catch((error) =>
  //       console.error("Error al obtener los productos:", error)
  //     );
  // }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="background-color">
      <NavBar1 />
      <div className="container-fluid-md">
        <div className="row">
          <div col-6="true">
            <video muted autoPlay loop>
              <source src={yunqueHerreroMP4} type="video/mp4" />
            </video>
            <div className="capa"></div>
          </div>

          <div className="container text-center homeLanding">
            <div className="row align-items-center content">
              <div className="texto-Industria1">
                <ul className="UL-blur">
                  <li className="LI-blur">I</li>
                  <li className="LI-blur">N</li>
                  <li className="LI-blur">D</li>
                  <li className="LI-blur">U</li>
                  <li className="LI-blur">S</li>
                  <li className="LI-blur">T</li>
                  <li className="LI-blur">R</li>
                  <li className="LI-blur">I</li>
                  <li className="LI-blur">A</li>
                </ul>
              </div>
              <div className="texto-Gallay2">
                <ul className="UL-blur">
                  <li className="LI-blur">G</li>
                  <li className="LI-blur">A</li>
                  <li className="LI-blur">L</li>
                  <li className="LI-blur">L</li>
                  <li className="LI-blur">A</li>
                  <li className="LI-blur">Y</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container">
        <div className="container-slider">
          <div className="row ">
            <Slider {...settings}>
              {dataDigitalBestSeller.map((item) => (
                <div className="card-landing-carousel" key={item.id}>
                  <div className="card-top-landing">
                    <img src={item.linkImg} alt={item.title} />
                    <h1>{item.title}</h1>
                  </div>
                  <div className="card-bottom-landing">
                    <h3>{item.price}</h3>
                    <p className="categoria">{item.category}</p>
                  </div>
                  <button className="bottom-card-landing">BOTTON</button>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
