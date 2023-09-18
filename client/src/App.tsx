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
import Cookies from "js-cookie";
import ObjectIDProps from "bson-objectid";
import { decodeToken } from "react-jwt";
import CarritoCompra from "./components/carritoDeCompras/CarritoCompras";
import UpdateProductBtn from "../src/components/BotonEditarProducto/UpdateProductBtn";
import CompraFinalizada from "./views/compraFinalizada/CompraFinalizada";
import EligeTuHoja from "./components/eligeTuHoja/EligeTuHoja";
import Loader from "./components/loader/Loader";
import AOS from 'aos';
import 'aos/dist/aos.css';
import NoHayBusqueda from "./components/loader/nohaybusqueda/NoHayBusqueda";





export interface ProductCardProps {
  product: Product;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onClick: (product: Product) => void;
  onDelete: () => void;
}

export interface Product {
  _id: ObjectIDProps;
  name: string;
  description: string;
  backgroundImage: string;
  stock: number;
  price: number;
  categories: string[];
}

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [clientId, setClientId] = useState<string>("");
  const [purchasesId, _setPurchasesId] = useState<string>("");
  const [selectedProduct, _setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userToken = Cookies.get("token");
    return !!userToken;
  });

  useEffect(() => {
    const userToken = Cookies.get("token");
    if (userToken) {
      const decoded = decodeToken(userToken) as { _id: string };
      setClientId(decoded._id);
    }
  }, []);

  const verificarAutenticacion = async (token: string | undefined) => {
    if (token) {
      try {
        const decoded = decodeToken(token) as { isAdmin: boolean; _id: string };
        setIsLoggedIn(true);
        setIsAdmin(decoded.isAdmin);
        setClientId(decoded?._id);
      } catch (error) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setClientId("");
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setClientId("");
    }
  };

  useEffect(() => {
    const userToken = Cookies.get("token");
    verificarAutenticacion(userToken);
  }, [location]);

  return (
    <>
      {isLoggedIn && isAdmin && <NavBar3 />}
      {isLoggedIn && !isAdmin && <NavBar2 clientId={clientId} />}
      {!isLoggedIn && <NavBar1 />}
      <Routes>
        <Route path="/" element={<LandingPage clientId={clientId} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/creatucuchillo" element={<CreaTuCuchillo  clientId={clientId}/>} />
        <Route path="eligetuhoja" element={<EligeTuHoja clientId={clientId}/>} />
        <Route path="/loader" element={<Loader />}/>
        <Route path="/nohaybusqueda" element={<NoHayBusqueda />}/>
        <Route path="/help" element={<Help />} />
        <Route
          path="/admin"
          element={<DashboardAdmin isAdmin={isAdmin} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/product/edit/:id"
          element={
            <UpdateProductBtn
              product={selectedProduct ?? undefined}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
            />
          }
        />
        <Route
          path="/product/id/:id"
          element={<ProductDetail clientId={clientId} />}
        />

        <Route
          path="/carritocompra"
          element={
            <CarritoCompra
              clientId={clientId}
              purchasesId={purchasesId}
              totalPrice={0}
            />
          }
        />
        <Route
          path="/compra-finalizada"
          element={<CompraFinalizada clientId={clientId} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
