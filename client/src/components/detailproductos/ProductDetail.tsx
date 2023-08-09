import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ObjectId from "bson-objectid";
import "./productosDetail.css";
import NavBar2 from "../navbar2/NavBar2";

interface Product {
  _id: ObjectId;
  name: string;
  description: string;
  backgroundImage: string;
  price: number;
  stock: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id !== undefined) {
      const fetchProductDetails = async (productId: string) => {
        try {
          const response = await axios.get<Product>(
            `http://localhost:3001/products/id/${encodeURIComponent(productId)}` // Encodificar el ID antes de enviarlo
          );
          const productData = response.data;
          setProduct(productData);
        } catch (error) {
          console.error("Error al obtener los detalles del producto:", error);
        }
      };

      fetchProductDetails(id);
    }
  }, [id]);

  return (
    <>
      <NavBar2
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="product-detail">
        {product ? (
          <div className="product-container">
            <div className="product-image">
              <img src={product.backgroundImage} alt={product.name} />
            </div>
            <div className="product-info">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Precio: ${product.price}</p>
              <p className="product-stock">Stock: {product.stock}</p>
              {/* Agregar más detalles según sea necesario */}
              <button className="add-to-cart-button">Agregar al carrito</button>
            </div>
          </div>
        ) : (
          <p>Cargando detalles del producto...</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
