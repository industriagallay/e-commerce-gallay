import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import herramientas from "../../assets/herramientas.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import NavBar1 from "../../components/navbar1/NavBar1";
import NavBar2 from "../../components/navbar2/NavBar2";
import "./Login.css";
import "../../components/navbar2/NavBar2.css";
import "../../components/navbar1/NavBar1.css";

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
      console.log({ a: response.data });
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
    const token = localStorage.getItem("token");
    // Leer la información de autenticación del localStorage o sesión

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log({ a: token });
    if (token) {
      // Si el token existe, el usuario está loggeado
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="background-herramientas">
      <div>
        {isLoggedIn ? (
          <NavBar2
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => {}} // Proporciona cualquier función para onClick
            handleLogout={handleLogout} // Asignar la función handleLogout al botón de cerrar sesión
          />
        ) : (
          <NavBar1 />
        )}
      </div>

      <div className="container-md login">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-12 col-md-12 col-sm-12 mx-auto">
            <form className="Loginform " onSubmit={handleSubmit(iniciarSesion)}>
              <div className="Loginheader Loginform">Bienvenido</div>
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
