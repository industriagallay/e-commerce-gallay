import React, { useState, useEffect } from "react";
import "./CarritoCompras.css";
import { Link } from "react-router-dom";
import axios from "axios";


// Define un tipo para los elementos del carrito
export interface ICartItem {
  // imageUrl: string;
  productId: string;
  // cart: [];
  backgroundImage: string;
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

const CarritoCompra: React.FC<{
  clientId: string;
  // backgroundImage: string;
}> = ({ clientId }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

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

  return (
    <div className="container">
      <h2 className="h2carritodecompras">Carrito de Compras</h2>
      <div className="row">
        {cartItems.map((item) => (
          <div className="col-md-4" key={item._id}>
            <div className="card-carritocompraupdate">
              <img
                src={item.backgroundImage} // Reemplaza esto con la URL real de la imagen
                className="card-img-top product-imagecarritocompraupdate"
                alt={item.name}
              />
              <div className="card-bodycarritocompraupdate">
                <h5 className="card-titlecarritocompraupdate">{item.name}</h5>
                <p className="card-textcarritocompraupdate">
                  Precio: ${item.price}
                </p>
                <p className="card-textcarritocompraupdate">
                  Cantidad: {item.quantity}
                </p>
                <div className="input-groupcarritocompraupdate">
                  <input
                    type="number"
                    className="form-controlcarritocompraupdate"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      updateQuantity(item._id, newQuantity);
                    }}
                  />
                  <div className="input-group-appendcarritocompraupdate">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => removeFromCartHandler(item.productId)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout">
        <p className="preciototalcalculadototal">
          Total: ${calculateTotal(cartItems)}
        </p>
        <button className="botoncheckoutcompraca" onClick={checkout}>
          Realizar Pago
        </button>
      </div>
      <Link className="seguirComprando" to={"/home"}>
        {" "}
        Seguir Comprando{" "}
      </Link>
    </div>
  );
};

export default CarritoCompra;
