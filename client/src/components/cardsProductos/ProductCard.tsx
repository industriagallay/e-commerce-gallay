import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./ProdctCard.css";

interface ProductCardProps {
  product: Product;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface Product {
  id: number;
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
}) => {
  return (
    <div className="container col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div
        className={`col-inicio-sesion ${
          product.price > 2500 && hovered ? "hovered" : ""
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="card-inicio-productos h-100">
          <div className="img-container">
            <img
              src={product.backgroundImage}
              className="card-img-top-inicio"
              alt={product.name}
            />
            <div className="line-horizontal"></div>
          </div>
          <div className="card-body-inicio-productos ">
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
            <h6 className="card-description-inicio">{product.description}</h6>
            <p className="card-stock-inicio">stock: {product.stock}</p>
            <Link to="/" className="">
              <button className="add-to-cart-btn justify-content-start">
                Sumar al carrito
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
