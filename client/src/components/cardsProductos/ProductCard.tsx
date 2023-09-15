import React, { useState, useEffect } from "react";
import ObjectIDProps from "bson-objectid";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
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
  categories: string;
  _id: ObjectIDProps;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  // hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onDelete,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHoverEnabled, _setIsHoverEnabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [_isLoggedIn, setIsLoggedIn] = useState(() => {
    const userToken = Cookies.get("token");
    return !!userToken;
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
    <div className="container ">
      <div
        className="col-inicio-sesion"
        onMouseEnter={isHoverEnabled ? onMouseEnter : undefined}
        onMouseLeave={onMouseLeave}
        onClick={(event) => {
          handleCardClick(event);
        }}
        style={{ cursor: "pointer" }}
        data-aos="fade-up"
        data-aos-offset="100"
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
              <h5 className="card-title-inicio-product">{product.name}</h5>
              <p className="card-text-inicio price">
                <span>$ {product.price}</span>
              </p>
            </div>
            <p className="card-stock-inicio">stock: {product.stock}</p>
            <div className="botonCarrito"> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
