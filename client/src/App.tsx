import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./home/Home";
import SignUpForm from "./views/signUpForm/SignUpForm";
import CreaTuCuchillo from "./components/crea-tu-cuchillo/CreaTuCuchillo";
import Help from "./components/help/Help";
import LandingPage from "./views/landingPage/LandingPage";
import Login from "./views/login/Login";
import Footer from "./components/Footer/Footer";
import DashboardAdmin from "./views/admin/DashboardAdmin";
import ProductDetail from "./components/detailproductos/ProductDetail";
import NavBar3 from "../src/components/navbar3/NavBar3";
import NavBar1 from "../src/components/navbar1/NavBar1";
import NavBar2 from "../src/components/navbar2/NavBar2";
import UpdateProduct from "../src/components/BotonEditarProducto/UpdateProductBtn";
import Cookies from "js-cookie";
import ObjectIDProps from "bson-objectid";
import { decodeToken } from "react-jwt";
// import { Product } from "./types";
import CarritoCompra from "./components/carritoDeCompras/CarritoCompras";
// import axios from "axios";


interface ProductCardProps {
  product: Product;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onClick: (product: Product) => void;
  onDelete: () => void;
}

interface Product {
  _id: ObjectIDProps;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
}

const App: React.FC<ProductCardProps> = ({ product }) => {
const [clientId, setClientId] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userToken = Cookies.get("token");
    return !!userToken; // Convierte el token en un valor booleano
  });
  

  // Luego, en algún lugar de tu código, obtén y establece clientId
  useEffect(() => {
    const userToken = Cookies.get("token");
    if (userToken) {
      const decoded = decodeToken(userToken) as { _id: string };
      console.log({ z: decoded._id });
      setClientId(decoded._id);
    }
  }, []); // El segundo argumento es un arreglo vacío para que este efecto se ejecute solo una vez al montar el componente.

  const verificarAutenticacion = async (token: string | undefined) => {
    console.log({ token });
    if (token) {
      try {
        const decoded = decodeToken(token) as { isAdmin: boolean; _id: string }; // Decodifica el token y obtén el clientId

        console.log({ decoded });
       
        setIsLoggedIn(true);
        setIsAdmin(decoded.isAdmin);
        setClientId(decoded?._id); // Establece el clientId en el estado
      } catch (error) {
        console.error("Error parsing token:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
        setClientId(""); // Cambia "" a null en caso de error
      }
    } else {
      console.log("555555555")
      setIsLoggedIn(false);
      setIsAdmin(false);
      setClientId(""); // Cambia "" a null cuando no hay token
    }
  };

  useEffect(() => {
    const userToken = Cookies.get("token");
    console.log({ userToken });
    verificarAutenticacion(userToken);
  }, [location]);

  return (
    <>
      {isLoggedIn && isAdmin && <NavBar3 />}
      {isLoggedIn && !isAdmin && <NavBar2 />}
      {!isLoggedIn && <NavBar1 />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/creatucuchillo" element={<CreaTuCuchillo />} />
        <Route path="/help" element={<Help />} />
        <Route path="/admin" element={<DashboardAdmin />} />

        <Route
          path="/product/id/:id"
          element={
            <ProductDetail
              clientId={clientId}            
          
            />
          }
        />
        <Route
          path="/carritocompra"
          element={
            <CarritoCompra
              clientId={clientId}
            />
          }

        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
