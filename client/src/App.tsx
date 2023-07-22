import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import SignUpForm from "./views/signUpForm/SignUpForm";
import CreaTuCuchillo from "./components/crea-tu-cuchillo/CreaTuCuchillo";
import Help from "./components/help/Help";
import LandingPage from "./views/landingPage/LandingPage";
import Login from "./views/login/Login";
import Footer from "./components/Footer/Footer";
import "./app.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="Login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/creatucuchillo" element={<CreaTuCuchillo />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
