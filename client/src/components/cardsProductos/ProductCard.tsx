import React, { useState, useEffect } from "react";
import ObjectIDProps from "bson-objectid";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ObjectId from "bson-objectid";
import "./ProdctCard.css";

interface ProductCardProps {
  product: Product;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onClick: (product: Product) => void;
  onDelete: () => void;
}

interface Product {
  _id: ObjectIDProps;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onDelete,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userToken = Cookies.get("token");
    return !!userToken; // Convierte el token en un valor booleano
  });

  const verificarAutenticacion = async (token: string | undefined) => {
    if (token) {
      try {
        const decoded = decodeToken(token) as { isAdmin: boolean };

        setIsLoggedIn(true);
        setIsAdmin(decoded.isAdmin);
      } catch (error) {
        console.error("Error parsing token:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const userToken = Cookies.get("token");
    verificarAutenticacion(userToken);
  }, [location]);

  const handleDeleteProduct = async () => {
    const productId = new ObjectId(product._id.toString());

    try {
      setIsHoverEnabled(false);

      const swalResult = await Swal.fire({
        title:
          "Estas seguro de eliminar este producto? la accion es irreversible",
        showCancelButton: true,
        confirmButtonText: "Borrar",
      });

      if (swalResult.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:3001/products/${productId}`
        );

        if (response.status === 200) {
          Swal.fire("Producto borrado correctamente!", "", "success");
          window.location.reload();
        } else {
          Swal.fire("No se pudo borrar el producto", "", "error");
        }
      } else if (swalResult.isDenied) {
        Swal.fire("La accion fue cancelada", "", "info");
      }

      setIsHoverEnabled(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Ocurrio un error inesperado!",
      });
    }
  };

  const handleCardClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isAdmin) {
      navigate(`/product/edit/${product._id}`);
    } else {
      onClick(product);
      navigate(`/product/id/${product._id}`);
    }
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    //col-12 col-md-6 col-lg-4 col-xl-3 mb-4
    <div className="container ">
      <div
        className={`col-inicio-sesion ${
          product.price > 2500 && isHoverEnabled ? "hovered" : ""
        }`}
        onMouseEnter={isHoverEnabled ? onMouseEnter : undefined}
        onMouseLeave={onMouseLeave}
        onClick={(event) => {
          handleCardClick(event);
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="card-inicio-productos h-100">
          <div className="img-container">
            {isAdmin && (
              <>
                <button onClick={handleDeleteClick} className="botonBorrar">
                  <p className="paragraph"> borrar producto </p>
                  <span className="icon-wrapper">
                    <svg
                      className="icon"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </button>{" "}
              </>
            )}
            <img
              src={product.backgroundImage}
              className="card-img-top-inicio"
              alt={product.name}
            />
            <div className="line-horizontal"></div>
          </div>
          <div className="card-body-inicio-productos">
            <div className="price-container">
              {product.price > 2500 && hovered && (
                <p className="card-text-inicio discount-price">
                  $ {(product.price * 0.9).toFixed(2)}
                </p>
              )}

              <p className="card-text-inicio price">
                <span>$ {product.price}</span>
                {product.price > 2500 && (
                  <span className="price-off">14% OFF</span>
                )}
                {product.price > 50 && (
                  <span className="additional-text">
                    Mismo precio en 3 cuotas de 311 pesos con 67 centavos
                    $31.1,67 <br />
                    <span className="free-shipping">Envio Gratis ⚡ FULL</span>
                  </span>
                )}
              </p>
            </div>
            <h5 className="card-title-inicio">{product.name}</h5>
            <p className="card-stock-inicio">stock: {product.stock}</p>
            <div className="botonCarrito"> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
