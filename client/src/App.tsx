import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUpForm from "./components/SignUpForm";
import Products from "./components/Product";
import Help from "./components/Help";
import LandingPage from "./views/LandingPage";
import Footer from "./components/Footer";

import "./app.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
