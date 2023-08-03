import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NavBar1 from "../../components/navbar1/NavBar1";
import yunqueHerreroMP4 from "../../assets/yunque-herrero.mp4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import "./LandingPage.css";
// import { dataDigitalBestSeller } from "./data";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
}

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        // Handle error, e.g., show an error message
      }
    };

    fetchProducts();
  }, []);

  const getProducts = async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:3001/products"
      );
      return response.data; // Assuming the server returns an array of products
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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
              {products.map((product) => (
                <div className="card-landing-carousel" key={product.id}>
                  <div className="tpb">
                    <div className="card-top-landing">
                      <img src={product.backgroundImage} alt={product.name} />
                      <h1>{product.name}</h1>
                    </div>
                    <div className="card-bottom-landing">
                      <h3>{product.price}</h3>
                      <p className="categoria">{product.stock}</p>
                    </div>
                    <Link to="/" className="">
                      <button className="bottom-card-landing justify-content-start">
                        Sumar al Carrito
                      </button>
                    </Link>
                  </div>
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
