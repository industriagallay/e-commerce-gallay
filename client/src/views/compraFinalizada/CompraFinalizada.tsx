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
  const [isLoading, setIsLoading] = useState(true);
  const [ultimaCompra, setUltimaCompra] = useState<LastPurchase | null>(null);
  const [productNames, setProductNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchUltimaCompra = async () => {
      setTimeout(async () => {
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

            const productIds = anteultimaCompra.products.map(
              (item: { productId: string }) => item.productId
            );
            const productNames = await getProductNames(productIds);
            setProductNames(productNames);
          }
        } catch (error) {
          console.error("Error al obtener la anteúltima compra:", error);
        } finally {
          setIsLoading(false);
        }
      }, 3000);
    };
    fetchUltimaCompra();
  }, [clientId]);

  const getProductNames = async (productIds: string[]) => {
    try {
      const productNamesPromises = productIds.map(async (productId) => {
        const response = await axios.get(`${apiUrl}/products/id/${productId}`);
        return response.data.name;
      });
      const names = await Promise.all(productNamesPromises);
      return names;
    } catch (error) {
      console.error("Error al obtener nombres de productos:", error);
      return [];
    }
  };

  const handleHomePage = () => {
    setUltimaCompra(null);
    navigate("/home");
  };

  return (
    <div>
      {isLoading ? (
        <div className="loader position-absolute">
          Loading
          <span></span>
        </div>
      ) : (
        <div className="compra-finalizada">
          <div className="container-texto-inicio-compraFinaliZada">
            <h2 className="Titutlo-comprafinalizadaH2">
              Gracias por elegir Industria Gallay
            </h2>
            <h3 className="resumenh3">Resumen de la compra</h3>
          </div>
          <div className="container mb-5">
            <ul className="list-group datos-compra-finalizada">
              {ultimaCompra?.products.map((item, index) => (
                <li
                  className="list-group-item list-group-item-comprafinalizada-product"
                  key={index}
                >
                  <div className="row">
                    <div className="col-md-4">
                      <span className="Producto-comprafinalizada">
                        Producto: {productNames[index] || item.productId}
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
          <h3 className="datosparabonar-C-finalizada">
            Datos para abonar <br /> CVU: 0000003100078622123854
          </h3>
          <h3 className="text-center">
            Para finalizar la compra, envia el comprobante de pago a
            industriagallay@gmail.com
          </h3>
          <hr />
          <p className="totalapafar-Compra-finalizada">
            Total a pagar: ${ultimaCompra?.totalPrice}
          </p>
          <p className="fechadelacompra-comprafinalizada">
            Fecha de la compra:{" "}
            {moment(ultimaCompra?.createdAt).format("D/M/YYYY H:mm")}
          </p>
          <p className="parrafoProporcionados">
            Por favor, realiza el pago utilizando los datos proporcionados y te
            llegara un mail indicando la modalidad del envio.
          </p>
          <button
            className="botonVolveral-inicio-comprafinalizada my-5"
            onClick={handleHomePage}
          >
            Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
};

export default CompraFinalizada;
