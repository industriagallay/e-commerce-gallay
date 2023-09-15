import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CarritoCompras.css";
import { Link } from "react-router-dom";
import axios from "axios";
import animation_llvcrs0g from "../../assets/animation_llvcrs0g_small.gif";

export interface ICartItem {
  productId: string;
  purchasesId: string;
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
  purchasesId: string;
  totalPrice: number;
}

const CarritoCompra: React.FC<ICarritoItemDataProps> = ({
  clientId,
  totalPrice,
}) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [productData, setProductData] = useState<IProductData | null>(null);
  const navigate = useNavigate();
  const [productDataMap, setProductDataMap] = useState<{
    [productId: string]: IProductData;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://industria-gallay-server.onrender.com/purchases/${clientId}`
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
          `https://industria-gallay-server.onrender.com/products/id/${productId}`
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
    try {
      if (!clientId) {
        return;
      }

      await axios.delete(
        `https://industria-gallay-server.onrender.com/purchases/${clientId}/products/${productId}`
      );

      const updatedPurchaseResponse = await axios.get(
        `https://industria-gallay-server.onrender.com/purchases/${clientId}`
      );

      if (updatedPurchaseResponse.data.length > 0) {
        const updatedPurchase = updatedPurchaseResponse.data[0];
        setCartItems(updatedPurchase.products);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

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

  const calculateTotal = (cart: ICartItem[]) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const checkout = async (clientId: string, totalPrice: number) => {
    try {
      await axios.post(
        `https://industria-gallay-server.onrender.com/purchases/generate/${clientId}`,
        {
          totalPrice,
        }
      );
      setCartItems([]);

      navigate("/compra-finalizada");
    } catch (error) {
      console.error("Error al cerrar la compra:", error);
    }
  };

  useEffect(() => {
    console.log({ a: "contenido del carrito", cartItems });
  }, []);

  useEffect(() => {
    const fetchProductData = async (productId: string) => {
      try {
        const response = await axios.get(
          `https://industria-gallay-server.onrender.com/products/id/${productId}`
        );
        setProductDataMap((prevProductDataMap) => ({
          ...prevProductDataMap,
          [productId]: response.data,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    cartItems.forEach((item) => {
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
    <div>
      <div className="container-fondo-blackCCC">
        <div className="parteObscura-carritoCCC">
          <h2 className="h2carritodecompras">Carrito de Compras</h2>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {cartItems.map((item) => (
            <div className="col-12 col-md-6 col-lg-4" key={item._id}>
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
            </div>
          ))}
        </div>
        <div className="container-md">
          <div className="row">
            <div className="col-6 resumen-card-carritocompraresumen">
              <h4 className="resumen-titulo-carritocompra">
                Resumen de Compra
              </h4>
              <div className="total-a-pagar-container">
                <p className="total-a-pagar-text">Total a Pagar:</p>
                <p className="total-a-pagar-amount">
                  ${calculateTotal(cartItems)}
                </p>
              </div>
              <button
                className="botoncheckoutcompraca"
                onClick={() => checkout(clientId, totalPrice)}
              >
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
    </div>
  );
};

export default CarritoCompra;
