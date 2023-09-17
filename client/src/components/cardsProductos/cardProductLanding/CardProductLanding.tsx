import React from "react";
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
                  <h5 className="card-title-inicio">{product.name}</h5>
                  <p className="card-text-landing price-landing">
                    <span className="text-primary">$ {product.price}</span>
                  </p>
                </div>
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
