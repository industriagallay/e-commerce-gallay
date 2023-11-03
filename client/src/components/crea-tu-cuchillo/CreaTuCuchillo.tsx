import React, { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fundicion from "../../assets/img/fundiciónPNG.png";
import Slider from "react-slick";
import "./CreaTuCuchillo.css";
import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Swal from "sweetalert2";
import { apiUrl } from "../../url";

interface Product {
  clientId: string;
  _id: Key | null | undefined;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
  categories: string;
}

interface CreaTuCuchilloProps {
  clientId: string;
}

const CreaTuCuchillo: React.FC<CreaTuCuchilloProps> = ({ clientId }) => {
  const [_cartUpdate, setCartUpdate] = useState<number>(0);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoaded, setProductsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  const addToCaboHandler = async (product: Product) => {
    try {
      const { _id: productId, price } = product;
      const quantity = 1;

      if (!clientId) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Registrate para acceder a nuestros Productos",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/login");
        return;
      }

      if (!purchaseId) {
        const createPurchaseResponse = await axios.post(
          `${apiUrl}/purchases/${clientId}`,

          {
            products: [
              {
                productId,
                quantity,
                price,
              },
            ],
            totalPrice: price,
          }
        );
        const createdPurchase = createPurchaseResponse.data;
        setPurchaseId(createdPurchase._id);
      } else {
        await axios.post(`${apiUrl}/purchases/${clientId}/products`, {
          productId,
          quantity,
          price,
        });
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "producto agregado correctamente!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/eligetuhoja");
      setCartUpdate((prevValue) => prevValue + 1);
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      if (!productsLoaded) {
        const response = await axios.get<Product[]>(`${apiUrl}/products`);
        const handleProducts = response.data.filter((product) =>
          product.categories.includes("handle")
        );

        const copiedHandleProducts = handleProducts.map((product) => ({
          ...product,
        }));

        setProducts(copiedHandleProducts);
        setProductsLoaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  let slidesToShow = 2;

  if (window.innerWidth <= 768 && window.innerWidth > 390) {
    slidesToShow = 2;
  } else if (window.innerWidth <= 390) {
    slidesToShow = 1;
  }

  settings.slidesToShow = slidesToShow;

  return (
    <div>
      <div className="container-12-lg image-container">
        <div className="row">
          <div className="col">
            <img
              src={fundicion}
              className="img-fluid full-width-image-121"
              alt="image-fundicion"
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="h1elegitucabo"> Elegí Tu Cabo</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2 className="h2subtextocreatucuchillo">
              {" "}
              en estos 4 sencillos pasos obtendrás tu cuchillo favorito
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12  ">
            <i className="bi bi-1-circle bi-1-circle-paso1">
              <span className="spanpaso1"> eligí tu cabo </span>
            </i>
          </div>
          <div className="col-12  ">
            <i className="bi bi-2-circle bi-2-circle-paso2">
              <span className="spanpaso2"> eligí tu hoja </span>
            </i>
          </div>
          <div className="col-12 ">
            <i className="bi bi-3-circle bi-3-circle-paso3">
              <span className="spanpaso3"> procesando </span>
            </i>
          </div>
          <div className="col-12  ">
            <i className="bi bi-4-circle bi-4-circle-paso4">
              <span className="spanpaso4"> realizar pago </span>
            </i>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="cabosh2cabos">Cabos</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="containerslidercaboss">
              <Slider {...settings}>
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="card-cabo col-lg-4 col-md-6 col-sm-12"
                  >
                    <img
                      className="imagecaboproduct"
                      src={product.backgroundImage}
                      alt={product.name}
                    />
                    <div className="card-content-cabo">
                      <h3 className="productname-cabo">{product.name}</h3>
                      <p className="product-description-cabo">
                        {product.description.length > 30
                          ? `${product.description.substring(0, 30)}...`
                          : product.description}
                      </p>

                      <button
                        onClick={() => addToCaboHandler(product)}
                        className="elegir-button"
                      >
                        Elegir
                      </button>
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

export default CreaTuCuchillo;
