import React, { useState, useEffect } from "react";
import "./CarritoCompras.css";
import { Link } from "react-router-dom";
import axios from "axios";

import animation_llvcrs0g from "../../assets/animation_llvcrs0g_small.gif";


// Define un tipo para los elementos del carrito
export interface ICartItem {
  // imageUrl: string;
  productId: string;
  backgroundImage: string;
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

interface IProductData {
  quantity: number;
  _id: string;
  name: string;
  backgroundImage: string;
  price: number;
  stock: number;
}

interface ICarritoItemDataProps {
  clientId: string;
}

const CarritoCompra: React.FC<ICarritoItemDataProps> = ({ clientId }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [productData, setProductData] = useState<IProductData | null>(null);
  const [productDataMap, setProductDataMap] = useState<{
    [productId: string]: IProductData;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/purchases/${clientId}`
        );



        console.log(response.data);

        const cartData = response.data[0].products;
        setCartItems(cartData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [clientId]);

  useEffect(() => {
    const fetchProductData = async (productId: string) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/id/${productId}`
        );
        setProductData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    cartItems.forEach((item) => {
      fetchProductData(item.productId);
    });
  }, [cartItems]);

  const removeFromCartHandler = async (productId: string) => {
    console.log("Eliminar producto con ID:", productId);

    try {
      if (!clientId) {
        console.log({ clientId });
        return;
      }
      // Realiza una solicitud HTTP DELETE para eliminar el producto del carrito
      const response = await axios.delete(
        `http://localhost:3001/purchases/${clientId}/products/${productId}`
      );
      console.log({ a: response.data });

      // Actualiza el estado local del carrito después de la eliminación
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.productId !== productId)
      );
      console.log({ setCartItems });
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId: string, newQuantity: number) => {
    // Actualizar la cantidad del producto en el carrito local
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Función para disminuir la cantidad de un producto en el carrito
  const decrementQuantity = (productId: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.productId === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  // Función para aumentar la cantidad de un producto en el carrito
  const incrementQuantity = (productId: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Función para calcular el total del carrito
  const calculateTotal = (cart: ICartItem[]) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /// Función para realizar el pago
  const checkout = () => {
    // Implementa la lógica para realizar el pago aquí.
    // Esto podría implicar hacer una solicitud HTTP para procesar el pago.
    // Una vez que el pago se haya realizado con éxito, puedes vaciar el carrito.
    // También puedes mostrar un mensaje de confirmación al usuario.
  };

  useEffect(() => {
    console.log({ a: "contenido del carrito", cartItems });
  }, []);

  useEffect(() => {
    const fetchProductData = async (productId: string) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/id/${productId}`
        );
        // Usar el productId como clave para almacenar el productData en el mapa
        setProductDataMap((prevProductDataMap) => ({
          ...prevProductDataMap,
          [productId]: response.data,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    cartItems.forEach((item) => {
      // Verificar si el productData ya está en el mapa antes de hacer la solicitud
      if (!productDataMap[item.productId]) {
        fetchProductData(item.productId);
      }
    });
  }, [cartItems, productDataMap]);

  if (!productData) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h2 className="h2carritodecompras">Carrito de Compras</h2>
        <p>El carrito está vacío...</p>
        <img
          src={animation_llvcrs0g}
          alt="Carrito Vacío"
          className="gif-carrito-vacio"
        />
        <Link className="seguirComprando" to={"/home"}>
          Seguir Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="h2carritodecompras">Carrito de Compras</h2>
      <div className="row">
        {cartItems.map((item) => (
          <div className="col-md-4" key={item._id}>
            <div className="card-carritocompraupdate">
              <img
                src={productDataMap[item.productId]?.backgroundImage}
                className="card-img-top product-imagecarritocompraupdate"
                alt={productDataMap[item.productId]?.name}
              />
              <div className="card-bodycarritocompraupdate">
                <h5 className="card-titlecarritocompraupdate">
                  {productData.name}
                </h5>
              </div>

              <div className="card-bodycarritocompraupdate">
                <p className="card-textcarritocompraupdate">
                  Precio: ${item.price}
                </p>
                <p className="card-textcarritocompraupdate">
                  Cantidad: {item.quantity}
                </p>




                <div className="input-group input-group-sm">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-secondarymenos"
                      type="button"
                      onClick={() => decrementQuantity(item.productId)}
                    >
                      -
                    </button>
                  </div>
                  <input
                    type="number"
                    className="form-control form-control-lg text-center"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      updateQuantity(item._id, newQuantity);
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondarymas"
                      type="button"
                      onClick={() => incrementQuantity(item.productId)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
              </div>
              <div className="input-group-appendcarritocompraupdate">
                <button
                  className="btn btn-outline-secondaryeliminar"
                  type="button"
                  onClick={() => removeFromCartHandler(item.productId)}
                >
                  eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container-md">
        <div className="row">
          <div className="col-4 resumen-card-carritocompraresumen">
            <h4 className="resumen-titulo-carritocompra">Resumen de Compra</h4>
            <div className="total-a-pagar-container">
              <p className="total-a-pagar-text">Total a Pagar:</p>
              <p className="total-a-pagar-amount">
                ${calculateTotal(cartItems)}
              </p>
            </div>
            <button className="botoncheckoutcompraca " onClick={checkout}>
              Realizar Pago
            </button>
            <div className="checkout">
              <Link className="seguirComprando" to={"/home"}>
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoCompra;
