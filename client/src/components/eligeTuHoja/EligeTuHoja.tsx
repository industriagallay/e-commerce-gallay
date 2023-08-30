import React, { Key, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import fundicion from "../../assets/img/fundiciónPNG.png";
import Slider from "react-slick";
import "./EligeTuHoja.css"
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

interface Product {
  _id: Key | null | undefined;
  // _id: Object;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
  categories: string;
}

const EligeTuCuchillo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const location = useLocation();
  // Estado para almacenar el nombre de usuario
  const [username, setUsername] = useState<string | null>(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:3001/products"
        );
        console.log({ a: response });
        //logica filtrado por categoria
        setProducts(response.data);
        // setFilteredProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);









  useEffect(() => {
    // Obtén el nombre de usuario del estado de ubicación
    const storedUsername = location.state && location.state.username;
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [location.state]); // Ejecutamos esto cada vez que cambia el estado de ubicación

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div>
      <div className="container-12-lg image-container">
        <div className="row">
          <div className="col">
            <img
              src={fundicion}
              className="img-fluid"
              alt="image-fundicion"
            ></img>
            <div className="animated-text">
              <h1>Bienvenido y Gracias por elegirnos {username}</h1>
              <br /> <h2> Envios a todo el país sin cargo </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 container-h1elegituhoja">
            <h1 className="h1elegituhoja"> Elegí Tu Hoja</h1>
          </div>
          <div className="row">
            <div className="col-12 containerSubtextoHoja">
              <h2 className="h2subtextocreatucuchilloHoja">
                {" "}
                en estos 4 sencillos pasos obtendras tu cuchillo favorito
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 containerIconosHojas">
            <div className="container-icono1 col-12 col-md-2 ">
              <i className="bi bi-1-circle bi-1-circle-paso1hoja">
                <span className="spanpaso1hoja"> eligí tu Hoja </span>
              </i>
            </div>
            <div className="containericono2 col-12 col-md-2 ">
              <i className="bi bi-2-circle bi-2-circle-paso2hoja">
                <span className="spanpaso2hoja"> eligí tu hoja </span>
              </i>
            </div>
            <div className="containericono3 col-12 col-md-2">
              <i className="bi bi-3-circle bi-3-circle-paso3hoja">
                <span className="spanpaso3hoja"> creando tu cuchillo </span>
              </i>
            </div>
            <div className="containericono4 col-12 col-md-2 ">
              <i className="bi bi-4-circle bi-4-circle-paso4hoja">
                <span className="spanpaso4hoja"> realizar pago </span>
              </i>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="cabosh2Hojas">Hojas</h2>
          </div>
          <div className="row">
          <div className="containersliderhojas col-12">
              <Slider {...settings}>
                {products.map((product) => (
                  <div key={product._id} className="card-hojas">
                    <img className="imagehojasproduct" src={product.backgroundImage} alt={product.name} />
                    <div className="card-content-hojas">
                      <h3 className="productname-hojas">{product.name}</h3>
                      {/* <p className="product-description-cabo">{product.description}</p> */}
                      <p className="product-category-hojas">Categoría: {product.categories}</p>
                      <Link to="/eligetuhoja" className="elegir-button">
                        Elegir
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligeTuCuchillo;
