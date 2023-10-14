import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CompraFinalizada.css";
import moment from "moment";
import { apiUrl } from "../../url";

interface ClienteIdCompraProps {
  clientId: string;
}

interface Purchase {
  _id: string;
  idClient: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
    _id: string;
  }>;
  totalPrice: number;
  selectedStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
}

const CompraFinalizada: React.FC<ClienteIdCompraProps> = ({ clientId }) => {
  const navigate = useNavigate();
  const [_isLoading, setIsLoading] = useState(true);
  const [ultimaCompra, setUltimaCompra] = useState<LastPurchase | null>(null);
  console.log(ultimaCompra);

  useEffect(() => {
    const fetchUltimaCompra = async () => {
      try {
        const response = await axios.get(`${apiUrl}/purchases/${clientId}`);
        if (response.data.length >= 2) {
          const sortedPurchases = response.data.sort(
            (a: Purchase, b: Purchase) => {
              const dateA: Date = new Date(a.createdAt);
              const dateB: Date = new Date(b.createdAt);
              return dateB.getTime() - dateA.getTime();
            }
          );

          const anteultimaCompra = sortedPurchases[1];
          setUltimaCompra(anteultimaCompra);
        }
      } catch (error) {
        console.error("Error al obtener la anteúltima compra:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUltimaCompra();
  }, [clientId]);

  const handleHomePage = () => {
    setUltimaCompra(null);
    navigate("/home");
  };

  if (!ultimaCompra) {
    return <p>Cargando la información de la compra...</p>;
  }

  return (
    <div>
      <div className="compra-finalizada">
        <div className="container-texto-inicio-compraFinaliZada">
          <h2 className="Titutlo-comprafinalizadaH2">
            Gracias por elegir Industria Gallay
          </h2>
          <h3 className="resumenh3">Resumen de la compra</h3>
        </div>
        <div className="container">
          <ul className="list-group datos-compra-finalizada">
            {ultimaCompra.products.map((item, index) => (
              <li
                className="list-group-item list-group-item-comprafinalizada-product"
                key={index}
              >
                <div className="row">
                  <div className="col-md-4">
                    <span className="Producto-comprafinalizada">
                      Producto: {item.productId}
                    </span>
                  </div>
                  <div className="col-md-4">
                    <span className="cantidad-comprafinaliza">
                      - Cantidad: {item.quantity}
                    </span>
                  </div>
                  <div className="col-md-4">
                    <span className="precio-comprafinalizada">
                      - Precio: ${item.price}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <h3 className="datosparabonar-C-finalizada">Datos para abonar</h3>
        <p className="totalapafar-Compra-finalizada">
          Total a pagar: ${ultimaCompra.totalPrice}
        </p>
        <p className="fechadelacompra-comprafinalizada">
          Fecha de la compra:{" "}
          {moment(ultimaCompra.createdAt).format("D/M/YYYY H:mm")}
        </p>
        <p className="parrafoProporcionados">
          Por favor, realice el pago utilizando los datos proporcionados.
        </p>
        <button
          className="botonVolveral-inicio-comprafinalizada"
          onClick={handleHomePage}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default CompraFinalizada;
