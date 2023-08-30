import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CarritoCompras.css";
import { Link } from "react-router-dom";
import axios from "axios";
import animation_llvcrs0g from "../../assets/animation_llvcrs0g_small.gif";

export interface ICartItem {
  // imageUrl: string;
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
}

const CarritoCompra: React.FC<ICarritoItemDataProps> = ({ clientId }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [purchasesId, setPurchasesId] = useState();
  const [productData, setProductData] = useState<IProductData | null>(null);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [productDataMap, setProductDataMap] = useState<{
    [productId: string]: IProductData;
  }>({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/purchases/${clientId}`
      );

      const purchaseData = response.data[0];
      const cartData = purchaseData.products;

      const purchasesId = purchaseData._id;

      setCartItems(cartData);
      setPurchasesId(purchasesId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProductDataMap({});
    fetchData();
  }, [clientId]);

  useEffect(() => {
    const fetchProductData = async (productId: string) => {
      if (!productDataMap[productId]) {
        // Verificar si los datos ya están en el map
        try {
          const response = await axios.get(
            `http://localhost:3001/products/id/${productId}`
          );
          setProductDataMap((prevProductDataMap) => ({
            ...prevProductDataMap,
            [productId]: response.data,
          }));
        } catch (error) {
          console.log(error);
        }
      }
    };

    cartItems.forEach((item) => {
      fetchProductData(item.productId);
    });
  }, [cartItems, productDataMap]);

  const removeFromCartHandler = async (productId: string) => {
    try {
      if (!clientId) {
        return;
      }

      await axios.delete(
        `http://localhost:3001/purchases/${clientId}/products/${productId}`
      );

      const updatedPurchaseResponse = await axios.get(
        `http://localhost:3001/purchases/${clientId}`
      );

      if (updatedPurchaseResponse.data.length > 0) {
        const updatedPurchase = updatedPurchaseResponse.data[0];
        setCartItems(updatedPurchase.products);

        setProductDataMap({});

        const newTotalPrice = calculateTotal(updatedPurchase.products);
        console.log({ pur: purchasesId });
        await axios.put(
          `http://localhost:3001/purchases/update/${purchasesId}`,
          {
            totalPrice: newTotalPrice,
          }
        );
      } else {
        setCartItems([]);
        setProductDataMap({});
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
    const newTotal = calculateTotal(cartItems);
    setTotalPrice(newTotal);
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
    const newTotalPrice = calculateTotal(cartItems);
    setTotalPrice(newTotalPrice);
  };

  const calculateTotal = (cart: ICartItem[]) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const checkout = async () => {
    try {
      if (cartItems.length > 0) {
        await axios.post(`http://localhost:3001/purchases/${clientId}`, {
          products: cartItems,
          totalPrice: calculateTotal(cartItems),
        });
        navigate("/compra-finalizada");
      }
    } catch (error) {
      console.error(error);
    }
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
                  {productData?.name}
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
          <div className="col-4 resumen-card-carritocompraresumen">
            <h4 className="resumen-titulo-carritocompra">Resumen de Compra</h4>
            <div className="total-a-pagar-container">
              <p className="total-a-pagar-text">Total a Pagar:</p>
              <p className="total-a-pagar-amount">
                ${calculateTotal(cartItems)}
              </p>
            </div>
            <button
              className="botoncheckoutcompraca"
              onClick={() => checkout()}
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
  );
};

export default CarritoCompra;
