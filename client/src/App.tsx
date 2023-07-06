
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Products from "./components/Products";
import Help from "./components/Help";
import LandingPage from "./views/LandingPage";
import "./app.css"

const App = () => {
  return (
    <>
      <Routes>
         
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/help" element={<Help />} />
       
      </Routes>
    </>
  );
};

export default App;
