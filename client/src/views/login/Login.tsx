import React from "react";
import NavBar2 from "../../components/navbar2/NavBar2";
import { Link } from "react-router-dom";
import herramientas from "../../assets/herramientas.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import "./Login.css";
import "../../components/navbar2/NavBar2.css";

type FormValues = {
  firstName: string;
  email: string;
  password: string;
};

const Login = () => {
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
      /*usamos el localstorage para guardar el nombre del usuario y renderizarlo en el compopnente products*/
      localStorage.setItem("username", response.data.firstName);

      navigate("/creatucuchullo");
    } catch (error) {
      swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error al iniciar sesión!",
      });
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar2 />
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

                <label htmlFor="password">Contraseña</label>
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
