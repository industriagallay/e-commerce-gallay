import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import herramientas from "../../assets/herramientas.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import "./Login.css";
import "../../components/navbar2/NavBar2.css";
import NavBar1 from "../../components/navbar1/NavBar1";
import "../../components/navbar1/NavBar1.css";
import NavBar2 from "../../components/navbar2/NavBar2";

type FormValues = {
  firstName: string;
  email: string;
  password: string;
};

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const iniciarSesion = async (formData: FormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        formData
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      if (response.data.isAdmin === true) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        navigate("/admin");
      } else {
        // Almacena el nombre de usuario en el localStorage
        localStorage.setItem("username", response.data.firstName);
        setIsLoggedIn(true);
        navigate("/creatucuchillo", {
          state: { username: response.data.firstName },
        });
      }
    } catch (error) {
      swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al iniciar sesión!",
      });
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setIsAdmin(false); // Asegurarse de que isAdmin esté configurado como false al cerrar sesión
    navigate("/", { replace: true }); // Redirige a la landing ("/")
  };

  useEffect(() => {
    // Verifica si hay un usuario almacenado en el local storage
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setIsAdmin(parsedUser.isAdmin); // Setea el valor de isAdmin según el usuario almacenado
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? <NavBar2 handleLogout={handleLogout} /> : <NavBar1 />}

      <div className="container-md login">
        <div className="row">
          <div className="col-6">
            <img
              src={herramientas}
              className="imgbackground"
              alt="fondo-image"
            />

            <form
              className="Loginform ml-auto"
              onSubmit={handleSubmit(iniciarSesion)}
            >
              <div className="Loginheader">Bienvenido a Industria Gallay</div>
              <div className="Logininputs">
                <label htmlFor="email"></label>
                <input
                  type="text"
                  id="email"
                  placeholder="correo electrónico"
                  className="Logininput"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-danger">
                    El campo correo electrónico es requerido
                  </p>
                )}
                {""}

                <label htmlFor="password"></label>
                <input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  className="Logininput"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-danger">
                    El campo contraseña es requerido
                  </p>
                )}
                {""}
                <div className="Logincheckbox-container"></div>
                <button className="Loginsigin-btn" type="submit">
                  Iniciar Sesión
                </button>
                <Link to="/" aria-current="page" className="Loginforget">
                  Olvidaste tu contraseña?
                </Link>
                <p className="signup-link">
                  aún no tenes cuenta? <Link to="/signup">regístrate</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
