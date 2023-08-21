import React from "react";
import { Link } from "react-router-dom";
import "./CardProductLanding.css";

interface CardProductLandingProps {
  product: Product;
}

interface Product {
  id: number;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
}

const CardProductLanding: React.FC<CardProductLandingProps> = ({ product }) => {
  return (
    //col-12 col-md-6 col-lg-4 col-xl-3 mb-4
    <div>
      <div className="container">
        <div className="row ">
          <div className="col-landing">
            <div className="card-landing-productos ">
              <div className="img-container-landing">
                <img
                  src={product.backgroundImage}
                  className="card-img-top-landing"
                  alt={product.name}
                />
                <div className="line-horizontal-landing"></div>
              </div>
              <div className="card-body-landing-productos ">
                <div className="price-container-landing">
                  {product.price > 2500 && (
                    <p className="card-text-landing discount-price-landing">
                      $ {(product.price * 0.9).toFixed(2)}
                    </p>
                  )}

                  <p className="card-text-landing price-landing">
                    <span>$ {product.price}</span>
                    {product.price > 2500 && (
                      <span className="price-off-landing">14% OFF</span>
                    )}
                    {product.price > 50 && (
                      <span className="additional-text-landing">
                        Mismo precio en 3 cuotas de 311 pesos con 67 centavos
                        $31.1,67 <br />
                        <span className="free-shipping-landing">
                          Envio Gratis ⚡ FULL
                        </span>
                      </span>
                    )}
                  </p>
                </div>
                <h5 className="card-title-inicio">{product.name}</h5>
                <p className="card-stock-landing">stock: {product.stock}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductLanding;
