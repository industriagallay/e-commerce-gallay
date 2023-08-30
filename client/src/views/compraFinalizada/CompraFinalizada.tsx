import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ClienteIdCompraProps {
  clientId: string;
}

interface Product {
  productId: string;
  quantity: number;
  price: number;
  _id: string;
}

interface LastPurchase {
  _id: string;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Otras propiedades que puedan estar presentes
}

const CompraFinalizada: React.FC<ClienteIdCompraProps> = ({ clientId }) => {
  const navigate = useNavigate();
  const [ultimaCompra, setUltimaCompra] = useState<LastPurchase | null>(null);

  useEffect(() => {
    const fetchUltimaCompra = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/purchases/${clientId}`
        );
        console.log(response.data);
        setUltimaCompra(response.data[0]);
      } catch (error) {
        console.error("Error al obtener la última compra:", error);
      }
    };

    fetchUltimaCompra();
  }, [clientId]);

  const handleHomePage = () => {
    navigate("/home");
  };

  if (!ultimaCompra) {
    return <p>Cargando la información de la compra...</p>;
  }

  return (
    <div className="compra-finalizada">
      <h2>Gracias por elegir Industria Gallay</h2>
      <h3>Resumen de la compra:</h3>
      <ul>
        {ultimaCompra.products.map((item, index) => (
          <li key={index}>
            Producto: {item.productId} - Cantidad: {item.quantity} - Precio: $
            {item.price}
          </li>
        ))}
      </ul>
      <h3>Datos para abonar:</h3>
      <p>Total a pagar: ${ultimaCompra.totalPrice}</p>
      <p>Estado de la compra: {ultimaCompra.status}</p>
      <p>Fecha de la compra: {ultimaCompra.createdAt}</p>
      <p>Por favor, realice el pago utilizando los datos proporcionados.</p>
      <button onClick={handleHomePage}>Volver al inicio</button>
    </div>
  );
};

export default CompraFinalizada;
