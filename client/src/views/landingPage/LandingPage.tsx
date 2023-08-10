import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NavBar1 from "../../components/navbar1/NavBar1";
import yunqueHerreroMP4 from "../../assets/yunque-herrero.mp4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import "./LandingPage.css";
// import ProductCard from "../../components/cardsProductos/ProductCard";
import axios from "axios";
import CardProductLanding from "../../components/cardsProductos/cardProductLanding/CardProductLanding";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
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
      <section className="container-fluid-md">
        <div className="row">
          {/* <div col-md-6="true"> */}
          <div className="col-md-6">
            <video muted autoPlay loop className="w-100">
              <source src={yunqueHerreroMP4} type="video/mp4" />
            </video>
            <div className="capa"></div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 justify-content-center">
            <div className="container text-center homeLanding ">
              <div className=" align-items-center content">
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
      </section>

      {/* <div className="container-md">
        <div className="row">
          <div className="col-12-md">
            <h2 className="h2Productosdestacados-Landing">
              Productos Destacados
            </h2>
            <hr className="h2Productosdestacados-Landing" />
          </div>
        </div>
      </div> */}

      {/* <section className="container-md">
        <div className="container-slider">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 justify-content-center">
            <div className="col">
              <Slider {...settings} className=" justify-content-center">
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
      </section> */}

      <div className="container-md">
        <div className="row">
          <div className="col-12-md">
            <section className="container-md">
              <div className="container-slider">
                <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 justify-content-center">
                  <div className="col">
                    <Slider {...settings} className="justify-content-center">
                      {products.map((product) => (
                        <Link
                          className="no-text-decoration"
                          to={`/product/id/${product._id}`}
                          key={`product-${product._id}`}
                        >
                          <CardProductLanding
                            key={product.id}
                            product={product}
                          />
                        </Link>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <section className="container-md">
        <div className="row">
          <div className="col-12-md">
            <h2 className="h2Productosdestacados-Landing">
              <span className="producto-span-color-amarillo">Productos </span>{" "}
              <span className="yellow-half">Destacados</span>{" "}
              <FaArrowCircleRight className="icon-rounded" />
            </h2>
            <hr className="h2Productosdestacados-Landing" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
