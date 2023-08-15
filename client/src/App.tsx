import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (userJson) {
      const user = JSON.parse(userJson);

      // Verificar si el usuario es admin
      if (user.isAdmin === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      // El usuario está autenticado
      setIsLoggedIn(true);
    } else {
      // El usuario no está autenticado
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn && isAdmin ? (
        <NavBar3 onClick={() => {}} handleLogout={handleLogout} />
      ) : isLoggedIn ? (
        <NavBar2 onClick={() => {}} cerrarSesionProp={handleLogout} />
      ) : (
        <NavBar1 />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/creatucuchillo" element={<CreaTuCuchillo />} />
        <Route path="/help" element={<Help />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/product/id/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
