import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import yunqueHerreroMP4 from "../../assets/yunque-herrero.mp4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import "./LandingPage.css";
import axios from "axios";
import CardProductLanding from "../../components/cardsProductos/cardProductLanding/CardProductLanding";
import { Link } from "react-router-dom";
import { apiUrl } from "../../url";

interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
  id: number;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
  clientId: string;
  categories: string;
}

interface LandingPageProps {
  clientId: string;
}

const LandingPage: React.FC<LandingPageProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${apiUrl}/products`);

        const handleProducts = response.data.filter((product) =>
          product.categories.includes("knife")
        );
        setProducts(handleProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
          slidesToShow: 1,
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
      <div id="hero">
        <section className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <video muted autoPlay loop className="img-fluid d-block mx-auto">
                <source src={yunqueHerreroMP4} type="video/mp4" />
              </video>
              <div className="capa"></div>
            </div>

            <div className="col-12 text-center homeLanding my-6">
              <div className="texto-Industria1">
                <ul className="UL-blur" style={{ fontSize: "5vw" }}>
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

                <div className="texto-Gallay2">
                  <ul className="UL-blur" style={{ fontSize: "5vw" }}>
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
        </section>
      </div>
      <section className="container mt-3 mt-md-9 p-0">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="container">
              <Slider {...settings}>
                {products.map((product) => (
                  <Link
                    className="no-text-decoration"
                    to={`/product/id/${product._id}`}
                    key={`product-${product._id}`}
                  >
                    <CardProductLanding key={product.id} product={product} />
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
